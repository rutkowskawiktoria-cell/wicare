// One WebGL canvas for the whole Signature page. Every "view" is tied to a DOM element and
// drawn with a scissor into that element's rectangle each frame, so a single context powers
// the depth-parallax hero, the chapter transitions, the 3D glass wordmark and every photo.
import * as THREE from 'three';
import { coverFn, snoise3 } from './noise';

type FrameSet = Set<() => void>;
const glFrames = (): FrameSet => {
  const w = window as unknown as { __glFrames?: FrameSet };
  return (w.__glFrames ||= new Set());
};

export type ViewCtx = { rect: DOMRect; t: number; dt: number; vel: number };
export type View = {
  el: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.Camera;
  order: number;
  update?: (c: ViewCtx) => void;
  dispose: () => void;
};

const quadVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }
`;

export class Stage {
  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;
  views: View[] = [];
  loader = new THREE.TextureLoader();
  private raf = 0;
  private last = performance.now();
  private t = 0;
  private lastY = 0;
  vel = 0;
  private frameFn: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.autoClear = false;
    this.renderer.setScissorTest(true);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.lastY = window.scrollY;
    this.frameFn = () => this.frame();
    glFrames().add(this.frameFn);
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      this.frame();
    };
    loop();
  }

  texture(src: string, srgb = false) {
    return new Promise<THREE.Texture>((resolve, reject) => {
      this.loader.load(
        src,
        (t) => {
          t.minFilter = THREE.LinearFilter;
          t.generateMipmaps = false;
          if (srgb) t.colorSpace = THREE.SRGBColorSpace;
          resolve(t);
        },
        undefined,
        reject,
      );
    });
  }

  add(v: View) {
    this.views.push(v);
    this.views.sort((a, b) => a.order - b.order);
    return v;
  }

  private frame() {
    const now = performance.now();
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.t += dt;
    // scroll velocity in viewport-heights per second, smoothed
    const y = window.scrollY;
    const raw = dt > 0 ? (y - this.lastY) / window.innerHeight / dt : 0;
    this.lastY = y;
    this.vel += (THREE.MathUtils.clamp(raw, -4, 4) - this.vel) * 0.12;

    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const size = this.renderer.getSize(new THREE.Vector2());
    if (size.x !== w || size.y !== h) this.renderer.setSize(w, h, false);

    const r = this.renderer;
    r.setClearColor(0x000000, 0); // a view with a scene.background changes it; reset every frame
    r.setScissor(0, 0, w, h);
    r.setViewport(0, 0, w, h);
    r.clear();
    for (const v of this.views) {
      const rect = v.el.getBoundingClientRect();
      if (rect.bottom < -2 || rect.top > h + 2 || rect.width < 2 || rect.height < 2) continue;
      v.update?.({ rect, t: this.t, dt, vel: this.vel });
      const gy = h - rect.bottom;
      r.setViewport(rect.left, gy, rect.width, rect.height);
      r.setScissor(rect.left, gy, rect.width, rect.height);
      r.render(v.scene, v.camera);
    }
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    glFrames().delete(this.frameFn);
    this.views.forEach((v) => v.dispose());
    this.views = [];
    this.renderer.dispose();
  }
}

/* ------------------------------------------------------------------ */
/* Photo view: scroll-velocity warp, hover ripple, noisy reveal         */
/* ------------------------------------------------------------------ */
const imageFrag = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uBox;
uniform vec2 uImg;
uniform float uVel;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;
uniform float uZoom;
uniform float uReveal;
uniform float uDim;
varying vec2 vUv;
${snoise3}
${coverFn}
void main(){
  vec2 uv = vUv;
  float asp = uBox.x / uBox.y;
  // velocity warp: the frame content bows like cloth when you scroll fast
  uv.y += sin(uv.x * 3.14159) * uVel * 0.035;
  // hover ripple around the cursor
  vec2 p = vec2(uv.x * asp, uv.y);
  vec2 m = vec2(uMouse.x * asp, uMouse.y);
  float d = distance(p, m);
  uv += (uv - uMouse) / max(d, 0.001) * sin(d * 34.0 - uTime * 4.0) * exp(-d * 6.0) * 0.006 * uHover;
  float z = 1.0 + uZoom + abs(uVel) * 0.04 + uHover * 0.035;
  uv = (uv - 0.5) / z + 0.5;
  vec2 cuv = coverUv(uv, uBox, uImg);
  float s = abs(uVel) * 0.006 + uHover * 0.0015;
  vec3 col = vec3(texture2D(uTex, cuv + vec2(s, 0.0)).r, texture2D(uTex, cuv).g, texture2D(uTex, cuv - vec2(s, 0.0)).b);
  col *= 1.0 - uDim;
  // reveal: noisy wipe upward
  float n = snoise(vec3(vUv * 3.0, uTime * 0.2)) * 0.5 + 0.5;
  float edge = (1.0 - vUv.y) * 0.75 + n * 0.25;
  float a = smoothstep(edge - 0.04, edge + 0.04, uReveal * 1.1);
  gl_FragColor = vec4(col, a);
}
`;

export function imageView(stage: Stage, el: HTMLElement, src: string, opts: { order?: number; dim?: number } = {}) {
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const uniforms = {
    uTex: { value: null as THREE.Texture | null },
    uBox: { value: new THREE.Vector2(1, 1) },
    uImg: { value: new THREE.Vector2(1408, 768) },
    uVel: { value: 0 },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uZoom: { value: 0 },
    uReveal: { value: 0 },
    uDim: { value: opts.dim ?? 0 },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: quadVert, fragmentShader: imageFrag, uniforms, transparent: true, depthTest: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  scene.add(mesh);
  let hoverTarget = 0;
  const mTarget = new THREE.Vector2(0.5, 0.5);
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    mTarget.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
  };
  const enter = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') hoverTarget = 1;
  };
  const leave = () => (hoverTarget = 0);
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerenter', enter);
  el.addEventListener('pointerleave', leave);
  stage.texture(src).then((t) => {
    uniforms.uTex.value = t;
    const img = t.image as HTMLImageElement;
    uniforms.uImg.value.set(img.width, img.height);
  });
  const view: View & { uniforms: typeof uniforms } = {
    el,
    scene,
    camera,
    order: opts.order ?? 10,
    uniforms,
    update: ({ rect, t, vel }) => {
      if (!uniforms.uTex.value) return;
      uniforms.uBox.value.set(rect.width, rect.height);
      uniforms.uTime.value = t;
      uniforms.uVel.value = vel;
      uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.08;
      uniforms.uMouse.value.lerp(mTarget, 0.15);
    },
    dispose: () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      mat.dispose();
      mesh.geometry.dispose();
      uniforms.uTex.value?.dispose();
    },
  };
  return stage.add(view) as typeof view;
}

/* ------------------------------------------------------------------ */
/* Hero: 2.5D depth parallax, dolly into the lit glass, portal to room  */
/* ------------------------------------------------------------------ */
const heroFrag = /* glsl */ `
precision highp float;
uniform sampler2D uA;
uniform sampler2D uDepth;
uniform sampler2D uB;
uniform vec2 uBox;
uniform vec2 uImgA;
uniform vec2 uImgB;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uReveal;
uniform float uTime;
uniform float uVel;
varying vec2 vUv;
${snoise3}
${coverFn}
void main(){
  vec2 uv = vUv;
  float asp = uBox.x / uBox.y;
  vec2 F = vec2(0.74, 0.52);                       // the lit glass wall
  float dolly = pow(uScroll, 1.5);
  vec2 zuv = F + (uv - F) / (1.0 + dolly * 2.4 + (1.0 - uReveal) * 0.12);
  vec2 cA = coverUv(zuv, uBox, uImgA);
  float depth = texture2D(uDepth, cA).r;
  // parallax: near pixels move more than far pixels
  vec2 par = uMouse * (depth - 0.4) * 0.028 + vec2(0.0, (depth - 0.5) * dolly * 0.05);
  cA = coverUv(zuv + par, uBox, uImgA);
  float ca = 0.0012 + dolly * 0.012 + abs(uVel) * 0.004;
  vec2 dir = normalize(uv - F + 1e-4) * ca;
  vec3 a = vec3(texture2D(uA, cA + dir).r, texture2D(uA, cA).g, texture2D(uA, cA - dir).b);

  // the room inside, slowly settling
  vec2 zb = 0.5 + (uv - 0.5) / (1.18 - 0.18 * smoothstep(0.4, 1.0, uScroll));
  vec3 b = texture2D(uB, coverUv(zb, uBox, uImgB)).rgb;

  // portal: an organic hole opens from the glass wall
  float n = snoise(vec3(uv * vec2(asp, 1.0) * 2.4, uTime * 0.15));
  float r = smoothstep(0.38, 0.78, uScroll) * 1.9;
  float dist = distance(uv * vec2(asp, 1.0), F * vec2(asp, 1.0)) + n * 0.09;
  float portal = 1.0 - smoothstep(r - 0.05, r + 0.02, dist);
  float rim = (smoothstep(r - 0.1, r - 0.02, dist) - smoothstep(r - 0.02, r + 0.04, dist)) * step(0.001, r);
  vec3 col = mix(a, b, portal) + vec3(1.0, 0.86, 0.66) * rim * 0.55;

  // cinematic grade + vignette + grain
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, mix(vec3(0.04, 0.07, 0.13), col, smoothstep(0.0, 0.6, lum)), 0.3);
  float vig = smoothstep(1.3, 0.35, length((uv - 0.5) * vec2(asp * 0.8, 1.0)));
  col *= mix(0.55, 1.0, vig);
  float g = fract(sin(dot(uv * uBox + uTime * 60.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.045;
  // arrival from black
  col *= smoothstep(0.0, 1.0, uReveal);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function heroView(stage: Stage, el: HTMLElement, srcs: { a: string; depth: string; b: string }) {
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const uniforms = {
    uA: { value: null as THREE.Texture | null },
    uDepth: { value: null as THREE.Texture | null },
    uB: { value: null as THREE.Texture | null },
    uBox: { value: new THREE.Vector2(1, 1) },
    uImgA: { value: new THREE.Vector2(1376, 768) },
    uImgB: { value: new THREE.Vector2(1408, 768) },
    uMouse: { value: new THREE.Vector2() },
    uScroll: { value: 0 },
    uReveal: { value: 0 },
    uTime: { value: 0 },
    uVel: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: quadVert, fragmentShader: heroFrag, uniforms, depthTest: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  scene.add(mesh);
  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const mTarget = new THREE.Vector2();
  const move = (e: PointerEvent) => mTarget.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  if (!coarse) window.addEventListener('pointermove', move, { passive: true });
  const ready = Promise.all([stage.texture(srcs.a), stage.texture(srcs.depth), stage.texture(srcs.b)]).then(([a, d, b]) => {
    uniforms.uA.value = a;
    uniforms.uDepth.value = d;
    uniforms.uB.value = b;
    const ia = a.image as HTMLImageElement;
    const ib = b.image as HTMLImageElement;
    uniforms.uImgA.value.set(ia.width, ia.height);
    uniforms.uImgB.value.set(ib.width, ib.height);
  });
  const view: View & { uniforms: typeof uniforms; ready: Promise<void> } = {
    el,
    scene,
    camera,
    order: 0,
    uniforms,
    ready,
    update: ({ rect, t, vel }) => {
      if (!uniforms.uA.value) return;
      uniforms.uBox.value.set(rect.width, rect.height);
      uniforms.uTime.value = t;
      uniforms.uVel.value = vel;
      if (coarse) mTarget.set(Math.sin(t * 0.4) * 0.5, Math.cos(t * 0.33) * 0.3);
      uniforms.uMouse.value.lerp(mTarget, 0.06);
    },
    dispose: () => {
      window.removeEventListener('pointermove', move);
      mat.dispose();
      mesh.geometry.dispose();
      [uniforms.uA.value, uniforms.uDepth.value, uniforms.uB.value].forEach((x) => x?.dispose());
    },
  };
  return stage.add(view) as typeof view;
}

/* ------------------------------------------------------------------ */
/* Chapters: one frame, three photographs, ink-wipe transitions         */
/* ------------------------------------------------------------------ */
const chapterFrag = /* glsl */ `
precision highp float;
uniform sampler2D uT0;
uniform sampler2D uT1;
uniform sampler2D uT2;
uniform vec2 uBox;
uniform vec2 uImg;
uniform float uProgress;   // 0..2
uniform float uTime;
uniform float uVel;
varying vec2 vUv;
${snoise3}
${coverFn}
vec3 tex(int i, vec2 uv){
  vec2 c = coverUv(uv, uBox, uImg);
  if (i == 0) return texture2D(uT0, c).rgb;
  if (i == 1) return texture2D(uT1, c).rgb;
  return texture2D(uT2, c).rgb;
}
void main(){
  vec2 uv = vUv;
  float p = clamp(uProgress, 0.0, 2.0);
  int i = int(min(floor(p), 1.0));
  float f = p - float(i);
  if (p >= 2.0) { i = 1; f = 1.0; }
  float k = smoothstep(0.25, 0.75, f);             // the wipe happens mid-chapter-scroll
  uv.y += sin(uv.x * 3.14159) * uVel * 0.03;
  float push = 1.0 + 0.08 * (1.0 - fract(p + 0.0001));
  vec2 za = 0.5 + (uv - 0.5) / (1.0 + 0.1 * k + 0.02);
  vec2 zb = 0.5 + (uv - 0.5) / (1.12 - 0.1 * k);
  float n = snoise(vec3(uv * vec2(uBox.x / uBox.y, 1.0) * 2.2, uTime * 0.1)) * 0.5 + 0.5;
  float edge = uv.x * 0.6 + n * 0.4;
  float m = smoothstep(edge - 0.06, edge + 0.06, k * 1.15);
  vec3 a = tex(i, za + vec2(m * 0.02, 0.0));
  vec3 b = tex(i + 1, zb - vec2((1.0 - m) * 0.02, 0.0));
  vec3 col = mix(a, b, m);
  float rim = smoothstep(edge - 0.1, edge - 0.02, k * 1.15) - m;
  col += vec3(0.42, 0.66, 0.81) * clamp(rim, 0.0, 1.0) * 0.45;
  float vig = smoothstep(1.2, 0.4, length(vUv - 0.5) * 1.3);
  col *= mix(0.7, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function chapterView(stage: Stage, el: HTMLElement, srcs: string[]) {
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const uniforms = {
    uT0: { value: null as THREE.Texture | null },
    uT1: { value: null as THREE.Texture | null },
    uT2: { value: null as THREE.Texture | null },
    uBox: { value: new THREE.Vector2(1, 1) },
    uImg: { value: new THREE.Vector2(1408, 768) },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uVel: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: quadVert, fragmentShader: chapterFrag, uniforms, depthTest: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  scene.add(mesh);
  Promise.all(srcs.map((s) => stage.texture(s))).then(([a, b, c]) => {
    uniforms.uT0.value = a;
    uniforms.uT1.value = b;
    uniforms.uT2.value = c;
    const ia = a.image as HTMLImageElement;
    uniforms.uImg.value.set(ia.width, ia.height);
  });
  const view: View & { uniforms: typeof uniforms } = {
    el,
    scene,
    camera,
    order: 5,
    uniforms,
    update: ({ rect, t, vel }) => {
      if (!uniforms.uT2.value) return;
      uniforms.uBox.value.set(rect.width, rect.height);
      uniforms.uTime.value = t;
      uniforms.uVel.value = vel;
    },
    dispose: () => {
      mat.dispose();
      mesh.geometry.dispose();
      [uniforms.uT0.value, uniforms.uT1.value, uniforms.uT2.value].forEach((x) => x?.dispose());
    },
  };
  return stage.add(view) as typeof view;
}

/* ------------------------------------------------------------------ */
/* Glass wordmark: the WiCare logo as real 3D glass                     */
/* ------------------------------------------------------------------ */
export async function glassView(stage: Stage, el: HTMLElement, opts: { font: string; backdrop: string; lite?: boolean }) {
  const [{ FontLoader }, { TextGeometry }, { RoomEnvironment }] = await Promise.all([
    import('three/examples/jsm/loaders/FontLoader.js'),
    import('three/examples/jsm/geometries/TextGeometry.js'),
    import('three/examples/jsm/environments/RoomEnvironment.js'),
  ]);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 13);
  stage.renderer.toneMapping = THREE.ACESFilmicToneMapping; // only built-in materials use it (the glass)
  stage.renderer.toneMappingExposure = 1.15;
  const pmrem = new THREE.PMREMGenerator(stage.renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.background = new THREE.Color(0x070d19);

  // backdrop: the villa, far behind the glass, so the letters refract it
  const bgTex = await stage.texture(opts.backdrop, true);
  const bgImg = bgTex.image as HTMLImageElement;
  const bgAspect = bgImg.width / bgImg.height;
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(22 * bgAspect * 0.6, 22 * 0.6), new THREE.MeshBasicMaterial({ map: bgTex, color: new THREE.Color(0.78, 0.82, 0.9) }));
  bg.position.z = -6;
  scene.add(bg);

  const font = new FontLoader().parse(await (await fetch(opts.font)).json());
  const mk = (text: string) =>
    new TextGeometry(text, { font, size: 1.6, depth: 0.42, curveSegments: opts.lite ? 6 : 12, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.045, bevelSegments: opts.lite ? 3 : 6 });
  const gWi = mk('Wi');
  const gCare = mk('Care');
  gWi.computeBoundingBox();
  gCare.computeBoundingBox();
  const wWi = gWi.boundingBox!.max.x - gWi.boundingBox!.min.x;
  const wCare = gCare.boundingBox!.max.x - gCare.boundingBox!.min.x;
  const gap = -0.02;
  const total = wWi + gap + wCare;
  const glass = (tint: string) =>
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(tint),
      metalness: 0,
      roughness: 0.02,
      transmission: 1,
      thickness: 1.3,
      ior: 1.5,
      dispersion: 4,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      attenuationColor: new THREE.Color(tint),
      attenuationDistance: 2.4,
      envMapIntensity: 2,
      specularIntensity: 1,
    });
  const matWi = glass('#EEF4FB');
  const matCare = glass('#6BA8CE');
  const group = new THREE.Group();
  const mWi = new THREE.Mesh(gWi, matWi);
  const mCare = new THREE.Mesh(gCare, matCare);
  mWi.position.set(-total / 2 - gWi.boundingBox!.min.x, -0.62, -0.21);
  mCare.position.set(-total / 2 + wWi + gap - gCare.boundingBox!.min.x, -0.62, -0.21);
  group.add(mWi, mCare);
  scene.add(group);
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3, 4, 6);
  const rim = new THREE.DirectionalLight(0x9cc6e2, 3);
  rim.position.set(-4, 3, -5);
  const fill = new THREE.PointLight(0x6ba8ce, 30, 20);
  fill.position.set(0, -2, 4);
  scene.add(key, rim, fill);

  const mTarget = new THREE.Vector2();
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    mTarget.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
  };
  window.addEventListener('pointermove', move, { passive: true });
  const state = { progress: 0 };
  const m = new THREE.Vector2();
  const view: View & { state: typeof state } = {
    el,
    scene,
    camera,
    order: 20,
    state,
    update: ({ rect, t }) => {
      const cam = camera as THREE.PerspectiveCamera;
      cam.aspect = rect.width / rect.height;
      // keep the word ~62% of the frame width
      const visW = 2 * cam.position.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.aspect;
      group.scale.setScalar(Math.min(1.25, (visW * (cam.aspect < 1 ? 0.86 : 0.62)) / total));
      cam.updateProjectionMatrix();
      m.lerp(mTarget, 0.06);
      const p = state.progress;
      group.rotation.y = (1 - p) * -1.35 + Math.sin(t * 0.35) * 0.12 + m.x * 0.35;
      group.rotation.x = (1 - p) * 0.35 + m.y * -0.22;
      group.position.y = Math.sin(t * 0.6) * 0.06;
      bg.position.x = -m.x * 0.6;
      bg.position.y = -m.y * 0.35;
    },
    dispose: () => {
      window.removeEventListener('pointermove', move);
      gWi.dispose();
      gCare.dispose();
      matWi.dispose();
      matCare.dispose();
      bgTex.dispose();
      env.dispose();
      pmrem.dispose();
    },
  };
  return stage.add(view) as typeof view;
}
