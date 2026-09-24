// Thousands of points sampled from the WiCare wordmark. They start as drifting sea spray
// and assemble into the logo as `progress` goes 0 → 1; the cursor pushes them aside.
import * as THREE from 'three';

type FrameSet = Set<() => void>;
const glFrames = (): FrameSet => {
  const w = window as unknown as { __glFrames?: FrameSet };
  return (w.__glFrames ||= new Set());
};

const vert = /* glsl */ `
uniform float uProgress;
uniform float uTime;
uniform vec3 uMouse;
uniform float uSize;
uniform float uPR;
attribute vec3 aStart;
attribute vec3 aColor;
attribute float aRand;
varying vec3 vColor;
varying float vAlpha;
float easeInOut(float t){ return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }
void main(){
  float p = easeInOut(clamp(uProgress * 1.45 - aRand * 0.45, 0.0, 1.0));
  vec3 pos = mix(aStart, position, p);
  float loose = 1.0 - p * 0.85;
  pos.x += sin(uTime * 0.55 + aRand * 24.0) * 0.06 * loose;
  pos.y += cos(uTime * 0.45 + aRand * 31.0) * 0.06 * loose;
  pos.z += sin(uTime * 0.7 + aRand * 13.0) * 0.25 * loose;
  vec2 dm = pos.xy - uMouse.xy;
  float dist = length(dm);
  float force = smoothstep(1.6, 0.0, dist) * uMouse.z;
  pos.xy += normalize(dm + 1e-4) * force * 0.85;
  pos.z += force * 1.5;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPR * (0.7 + aRand * 0.9) * (14.0 / -mv.z);
  vColor = aColor;
  vAlpha = 0.28 + 0.72 * p;
}
`;

const frag = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

export type ParticleLogo = { setProgress: (p: number) => void; dispose: () => void };

export function createParticleLogo(canvas: HTMLCanvasElement, opts: { fontFamily: string; parts: { text: string; color: string }[] }): ParticleLogo {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  const pr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(pr);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 18);

  // 1. Draw the wordmark offscreen and sample it.
  const small = window.innerWidth < 700;
  const W = 1400;
  const H = 380;
  const off = document.createElement('canvas');
  off.width = W;
  off.height = H;
  const ctx = off.getContext('2d')!;
  const fontPx = 300;
  ctx.font = `700 ${fontPx}px ${opts.fontFamily}`;
  ctx.textBaseline = 'middle';
  const widths = opts.parts.map((p) => ctx.measureText(p.text).width);
  const kern = -0.025 * fontPx;
  const total = widths.reduce((a, b) => a + b, 0) + kern * (opts.parts.length - 1);
  let x = (W - total) / 2;
  opts.parts.forEach((p, i) => {
    ctx.fillStyle = p.color;
    ctx.fillText(p.text, x, H / 2);
    x += widths[i] + kern;
  });
  const data = ctx.getImageData(0, 0, W, H).data;
  const step = small ? 5 : 3;
  const pos: number[] = [];
  const col: number[] = [];
  const start: number[] = [];
  const rand: number[] = [];
  const worldW = 10;
  const scale = worldW / W;
  for (let yy = 0; yy < H; yy += step) {
    for (let xx = 0; xx < W; xx += step) {
      const i = (yy * W + xx) * 4;
      if (data[i + 3] < 140) continue;
      pos.push((xx - W / 2) * scale, -(yy - H / 2) * scale, 0);
      col.push(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
      const r = Math.random();
      rand.push(r);
      // spray: a wide, shallow cloud drifting from the lower right like sea mist
      start.push((Math.random() - 0.35) * 26, (Math.random() - 0.6) * 14, (Math.random() - 0.5) * 16);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3));
  geo.setAttribute('aStart', new THREE.Float32BufferAttribute(start, 3));
  geo.setAttribute('aRand', new THREE.Float32BufferAttribute(rand, 1));
  const uniforms = {
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(99, 99, 0) },
    uSize: { value: small ? 3.2 : 2.6 },
    uPR: { value: pr },
  };
  const material = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, material);
  scene.add(points);

  // 2. Fit the logo to the viewport width.
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const visW = visH * camera.aspect;
    points.scale.setScalar(Math.min(1.25, (visW * 0.84) / worldW));
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // 3. Cursor → point in the logo plane (local units).
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  const mTarget = new THREE.Vector3(99, 99, 0);
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY < r.top || e.clientY > r.bottom) {
      mTarget.z = 0;
      return;
    }
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
    if (ray.ray.intersectPlane(plane, hit)) {
      mTarget.set(hit.x / points.scale.x, hit.y / points.scale.y, 1);
    }
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  let visible = true;
  // IO can batch several entries for one target — the last one is the current state.
  const io = new IntersectionObserver((entries) => (visible = entries[entries.length - 1].isIntersecting));
  io.observe(canvas);
  const clock = new THREE.Clock();
  let raf = 0;
  const frame = () => {
    if (!visible) return;
    uniforms.uTime.value = clock.getElapsedTime();
    const m = uniforms.uMouse.value;
    m.x += (mTarget.x - m.x) * 0.12;
    m.y += (mTarget.y - m.y) * 0.12;
    m.z += (mTarget.z - m.z) * 0.08;
    points.rotation.y = Math.sin(uniforms.uTime.value * 0.2) * 0.08 * (1 - uniforms.uProgress.value * 0.6);
    renderer.render(scene, camera);
  };
  const loop = () => {
    raf = requestAnimationFrame(loop);
    frame();
  };
  glFrames().add(frame);
  loop();

  return {
    setProgress: (p: number) => {
      uniforms.uProgress.value = p;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      glFrames().delete(frame);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
