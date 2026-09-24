// A photo that trails the cursor over the services list. The plane bends with pointer
// velocity, splits its colour channels when moving fast, and melts from one service's
// photo to the next through a noise dissolve.
import * as THREE from 'three';
import { coverFn, snoise3 } from './noise';

type FrameSet = Set<() => void>;
const glFrames = (): FrameSet => {
  const w = window as unknown as { __glFrames?: FrameSet };
  return (w.__glFrames ||= new Set());
};

const vert = /* glsl */ `
uniform vec2 uVel;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 p = position;
  p.x += sin(uv.y * 3.14159) * uVel.x * 0.28;
  p.y += sin(uv.x * 3.14159) * uVel.y * 0.28;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec2 uImgA;
uniform vec2 uImgB;
uniform vec2 uPlane;
uniform float uMix;
uniform float uAlpha;
uniform float uTime;
uniform vec2 uVel;
varying vec2 vUv;
${snoise3}
${coverFn}
void main(){
  float n = snoise(vec3(vUv * 3.5, uTime * 0.4)) * 0.5 + 0.5;
  float edge = n * 0.6 + vUv.y * 0.4;
  float m = uMix * 1.5 - 0.25;
  float k = 1.0 - smoothstep(m - 0.12, m + 0.12, edge * 1.24 - 0.12);
  float s = length(uVel) * 0.03;
  vec2 ua = coverUv(vUv, uPlane, uImgA);
  vec2 ub = coverUv(vUv, uPlane, uImgB);
  vec3 a = vec3(texture2D(uA, ua + vec2(s, 0.0)).r, texture2D(uA, ua).g, texture2D(uA, ua - vec2(s, 0.0)).b);
  vec3 b = vec3(texture2D(uB, ub + vec2(s, 0.0)).r, texture2D(uB, ub).g, texture2D(uB, ub - vec2(s, 0.0)).b);
  vec3 col = mix(b, a, k);
  // rounded corners
  float r = 14.0;
  vec2 q = abs(vUv - 0.5) * uPlane - (uPlane * 0.5 - r);
  float sd = length(max(q, 0.0)) - r;
  float alpha = uAlpha * smoothstep(1.0, -1.0, sd);
  gl_FragColor = vec4(col, alpha);
}
`;

export type HoverReveal = { show: (i: number) => void; hide: () => void; dispose: () => void };

export function createHoverReveal(canvas: HTMLCanvasElement, sources: string[]): HoverReveal {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  canvas.style.opacity = '0';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
  const loader = new THREE.TextureLoader();
  const blank = new THREE.DataTexture(new Uint8Array([27, 43, 74, 255]), 1, 1);
  blank.needsUpdate = true;
  const textures: THREE.Texture[] = sources.map((src) => {
    const t = loader.load(src);
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    return t;
  });
  const size = (t: THREE.Texture) => {
    const img = t.image as HTMLImageElement | undefined;
    return new THREE.Vector2(img?.width || 1408, img?.height || 768);
  };
  const planeW = Math.min(420, window.innerWidth * 0.3);
  const planeH = planeW * 1.22;
  const uniforms = {
    uA: { value: blank as THREE.Texture },
    uB: { value: blank as THREE.Texture },
    uImgA: { value: new THREE.Vector2(1408, 768) },
    uImgB: { value: new THREE.Vector2(1408, 768) },
    uPlane: { value: new THREE.Vector2(planeW, planeH) },
    uMix: { value: 1 },
    uAlpha: { value: 0 },
    uTime: { value: 0 },
    uVel: { value: new THREE.Vector2() },
  };
  const material = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, transparent: true });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 24, 24), material);
  mesh.scale.set(planeW, planeH, 1);
  scene.add(mesh);

  let w = window.innerWidth;
  let h = window.innerHeight;
  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.left = -w / 2;
    camera.right = w / 2;
    camera.top = h / 2;
    camera.bottom = -h / 2;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const pointer = { x: w / 2, y: h / 2 };
  const pos = { x: w / 2, y: h / 2 };
  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  let alphaTarget = 0;
  let current = -1;
  let mixing = false;
  const clock = new THREE.Clock();
  let raf = 0;
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;
    const px = pos.x;
    const py = pos.y;
    pos.x += (pointer.x - pos.x) * 0.14;
    pos.y += (pointer.y - pos.y) * 0.14;
    const vx = THREE.MathUtils.clamp((pos.x - px) / 40, -1, 1);
    const vy = THREE.MathUtils.clamp(-(pos.y - py) / 40, -1, 1);
    uniforms.uVel.value.x += (vx - uniforms.uVel.value.x) * 0.2;
    uniforms.uVel.value.y += (vy - uniforms.uVel.value.y) * 0.2;
    uniforms.uAlpha.value += (alphaTarget - uniforms.uAlpha.value) * 0.12;
    if (mixing) {
      uniforms.uMix.value = Math.min(1, uniforms.uMix.value + dt * 2.2);
      if (uniforms.uMix.value >= 1) mixing = false;
    }
    mesh.position.set(pos.x - w / 2 + planeW * 0.15, h / 2 - pos.y, 0);
    mesh.rotation.z = -uniforms.uVel.value.x * 0.12;
    // Nothing on screen: hide the layer entirely instead of compositing an empty canvas.
    if (uniforms.uAlpha.value < 0.002 && alphaTarget === 0) {
      if (canvas.style.opacity !== '0') {
        renderer.clear();
        canvas.style.opacity = '0';
      }
      return;
    }
    canvas.style.opacity = '1';
    renderer.render(scene, camera);
  };
  const loop = () => {
    raf = requestAnimationFrame(loop);
    frame();
  };
  glFrames().add(frame);
  loop();

  return {
    show: (i: number) => {
      if (i === current) {
        alphaTarget = 1;
        return;
      }
      const t = textures[i];
      const fresh = uniforms.uAlpha.value < 0.05;
      uniforms.uB.value = uniforms.uA.value;
      uniforms.uImgB.value = uniforms.uImgA.value;
      uniforms.uA.value = t;
      uniforms.uImgA.value = size(t);
      uniforms.uMix.value = fresh ? 1 : 0;
      mixing = !fresh;
      current = i;
      alphaTarget = 1;
    },
    hide: () => {
      alphaTarget = 0;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      glFrames().delete(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      textures.forEach((t) => t.dispose());
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    },
  };
}
