import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 7000;

function sphere(i: number, n: number, r: number): [number, number, number] {
  const y = 1 - (i / (n - 1)) * 2;
  const rad = Math.sqrt(1 - y * y);
  const theta = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r];
}

function torusKnot(i: number, n: number): [number, number, number] {
  const p = 2;
  const q = 3;
  const scale = 0.55;
  const tube = 0.3;
  const u = (i / n) * Math.PI * 2 * p;
  const r = 2 + Math.cos((q / p) * u);
  const x = r * Math.cos(u) * scale;
  const y = r * Math.sin(u) * scale;
  const z = Math.sin((q / p) * u) * scale;
  const a = (i * 2.399963) % (Math.PI * 2);
  const jitter = tube * Math.sqrt(((i * 7919) % 1000) / 1000);
  return [x + Math.cos(a) * jitter, y + Math.sin(a) * jitter, z + Math.cos(a * 1.7) * jitter];
}

function lattice(i: number, n: number): [number, number, number] {
  const side = Math.ceil(Math.cbrt(n));
  const x = i % side;
  const y = Math.floor(i / side) % side;
  const z = Math.floor(i / (side * side));
  const s = 2.6 / side;
  return [(x - side / 2) * s, (y - side / 2) * s, (z - side / 2) * s];
}

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPixelRatio;
  attribute vec3 aSphere;
  attribute vec3 aKnot;
  attribute vec3 aGrid;
  attribute float aSeed;
  varying float vGlow;

  void main() {
    float m1 = smoothstep(0.0, 1.0, clamp(uMorph, 0.0, 1.0));
    float m2 = smoothstep(0.0, 1.0, clamp(uMorph - 1.0, 0.0, 1.0));
    vec3 p = mix(mix(aSphere, aKnot, m1), aGrid, m2);

    float wobble = sin(uTime * 0.8 + aSeed * 6.2831) * 0.035;
    p += normalize(p + 0.0001) * wobble;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(1.4, 3.2, step(0.965, aSeed));
    gl_PointSize = size * uPixelRatio * (6.0 / -mv.z);
    vGlow = step(0.965, aSeed);
  }
`;

const fragment = /* glsl */ `
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 ink = vec3(0.949, 0.937, 0.91);
    vec3 signal = vec3(1.0, 0.357, 0.141);
    vec3 col = mix(ink, signal, vGlow);
    float alpha = smoothstep(0.5, 0.1, d) * mix(0.55, 1.0, vGlow);
    gl_FragColor = vec4(col, alpha);
  }
`;

/** Stable pseudo-random in [0, 1) per index, so the cloud looks the same every load. */
const hash = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function buildAttributes() {
  const s = new Float32Array(COUNT * 3);
  const k = new Float32Array(COUNT * 3);
  const l = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    s.set(sphere(i, COUNT, 1.45), i * 3);
    k.set(torusKnot(i, COUNT), i * 3);
    l.set(lattice(i, COUNT), i * 3);
    seed[i] = hash(i);
  }
  return { sphere: s, knot: k, grid: l, seed };
}

function Points({ morph }: { morph: React.RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const current = useRef(0);

  const attrs = useMemo(() => buildAttributes(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    [],
  );

  useFrame((state, delta) => {
    current.current = THREE.MathUtils.damp(current.current, morph.current ?? 0, 3.2, delta);
    const mat = matRef.current;
    if (mat) {
      mat.uniforms.uMorph.value = current.current;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y += delta * 0.12;
    pts.rotation.x = THREE.MathUtils.damp(pts.rotation.x, state.pointer.y * 0.35, 2, delta);
    pts.rotation.z = THREE.MathUtils.damp(pts.rotation.z, -state.pointer.x * 0.2, 2, delta);
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attrs.sphere, 3]} />
        <bufferAttribute attach="attributes-aSphere" args={[attrs.sphere, 3]} />
        <bufferAttribute attach="attributes-aKnot" args={[attrs.knot, 3]} />
        <bufferAttribute attach="attributes-aGrid" args={[attrs.grid, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[attrs.seed, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleSculpture({ morph }: { morph: React.RefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <Points morph={morph} />
    </Canvas>
  );
}
