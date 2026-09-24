// Full-bleed photo rendered through a fragment shader: a liquid lens follows the cursor
// (ripples + chromatic split that grow with pointer speed), the whole image shimmers like
// water, melts as you scroll away, and arrives through a noisy wipe with a glowing rim.
import * as THREE from 'three';
import { coverFn, snoise3 } from './noise';

type FrameSet = Set<() => void>;
const glFrames = (): FrameSet => {
  const w = window as unknown as { __glFrames?: FrameSet };
  return (w.__glFrames ||= new Set());
};

const vert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uMouse;
uniform float uVel;
uniform float uTime;
uniform float uReveal;
uniform float uScroll;
uniform float uHover;
varying vec2 vUv;
${snoise3}
${coverFn}
void main(){
  vec2 uv = vUv;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  vec2 m = vec2(uMouse.x * asp, uMouse.y);
  float d = distance(p, m);
  float n = snoise(vec3(uv * 2.2, uTime * 0.12));
  float n2 = snoise(vec3(uv * 6.0 + 3.0, uTime * 0.22));

  float lens = smoothstep(0.42, 0.0, d) * uHover;
  float ripple = sin(d * 42.0 - uTime * 3.4) * 0.5 + 0.5;
  vec2 dir = (p - m) / max(d, 1e-4);
  vec2 disp = vec2(dir.x / asp, dir.y) * lens * (0.012 + uVel * 0.05) * (0.35 + ripple);
  disp += vec2(n, n2) * (0.003 + uScroll * 0.055);

  vec2 zuv = (uv - 0.5) / (1.0 + uScroll * 0.2) + 0.5;
  vec2 cuv = coverUv(zuv + disp, uRes, uImg);
  float shift = (0.002 + uVel * 0.018 + uScroll * 0.014) * (0.35 + lens);
  vec3 col;
  col.r = texture2D(uTex, cuv + vec2(shift, 0.0)).r;
  col.g = texture2D(uTex, cuv).g;
  col.b = texture2D(uTex, cuv - vec2(shift, 0.0)).b;

  // brand grade: cool the shadows toward navy/steel
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, mix(vec3(0.07, 0.12, 0.22), col, smoothstep(0.0, 0.55, lum)), 0.35);
  // a caustic glint that rides the lens
  col += vec3(0.42, 0.66, 0.81) * lens * ripple * 0.08;

  // arrival: noisy wipe from the bottom with a glowing steel-blue rim
  float edge = (n * 0.5 + 0.5) * 0.35 + (1.0 - uv.y) * 0.65;
  float t = uReveal * 1.4 - 0.2;
  float vis = smoothstep(edge - 0.03, edge + 0.02, t);
  float rim = smoothstep(edge - 0.09, edge - 0.02, t) * (1.0 - vis);
  col = mix(vec3(0.106, 0.169, 0.290), col, vis) + vec3(0.42, 0.66, 0.81) * rim * 1.6;

  float vig = smoothstep(1.25, 0.3, length((uv - vec2(0.5, 0.45)) * vec2(asp * 0.75, 1.0)));
  col *= mix(0.62, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

export type LiquidHero = {
  uniforms: Record<string, { value: unknown }> & { uReveal: { value: number }; uScroll: { value: number } };
  dispose: () => void;
};

export function createLiquidHero(canvas: HTMLCanvasElement, src: string, onReady?: () => void): LiquidHero {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const uniforms = {
    uTex: { value: null as THREE.Texture | null },
    uRes: { value: new THREE.Vector2(1, 1) },
    uImg: { value: new THREE.Vector2(1408, 768) },
    uMouse: { value: new THREE.Vector2(0.68, 0.5) },
    uVel: { value: 0 },
    uTime: { value: 0 },
    uReveal: { value: 0 },
    uScroll: { value: 0 },
    uHover: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  let ready = false;
  new THREE.TextureLoader().load(src, (tex) => {
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    uniforms.uTex.value = tex;
    const img = tex.image as HTMLImageElement;
    uniforms.uImg.value.set(img.width, img.height);
    ready = true;
    onReady?.();
  });

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const target = { x: 0.68, y: 0.5 };
  let vel = 0;
  let hoverTarget = coarse ? 0.45 : 0;
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY > r.bottom || e.clientY < r.top) {
      hoverTarget = 0;
      return;
    }
    const x = (e.clientX - r.left) / r.width;
    const y = 1 - (e.clientY - r.top) / r.height;
    vel = Math.min(vel + Math.hypot(x - target.x, y - target.y) * 5, 1.4);
    target.x = x;
    target.y = y;
    hoverTarget = 1;
  };
  if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });

  let visible = true;
  // IO can batch several entries for one target — the last one is the current state.
  const io = new IntersectionObserver((entries) => (visible = entries[entries.length - 1].isIntersecting));
  io.observe(canvas);

  const clock = new THREE.Clock();
  let raf = 0;
  const frame = () => {
    if (!visible || !ready) return;
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    if (coarse) {
      // no cursor on phones: let a slow current drift across the image instead
      target.x = 0.62 + Math.sin(t * 0.35) * 0.22;
      target.y = 0.45 + Math.cos(t * 0.27) * 0.18;
      vel = 0.06 + Math.sin(t * 0.9) * 0.03;
    }
    const m = uniforms.uMouse.value;
    m.x += (target.x - m.x) * 0.1;
    m.y += (target.y - m.y) * 0.1;
    vel *= 0.93;
    uniforms.uVel.value += (vel - uniforms.uVel.value) * 0.2;
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.05;
    renderer.render(scene, camera);
  };
  const loop = () => {
    raf = requestAnimationFrame(loop);
    frame();
  };
  glFrames().add(frame);
  loop();

  return {
    uniforms: uniforms as unknown as LiquidHero['uniforms'],
    dispose: () => {
      cancelAnimationFrame(raf);
      glFrames().delete(frame);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      io.disconnect();
      (uniforms.uTex.value as THREE.Texture | null)?.dispose();
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    },
  };
}
