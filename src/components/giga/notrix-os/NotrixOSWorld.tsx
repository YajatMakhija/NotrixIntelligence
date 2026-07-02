"use client";

import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  COLORS,
  DEPT_META,
  DEPT_POSITIONS,
  DEPARTMENTS,
  type DeptIconType,
  LOOP_SEC,
  MODULES,
  SCENES,
  TOOLS,
  TOOL_POSITIONS,
  lerp,
  sceneWeight,
  smoothstep,
} from "./constants";

/* ────────────────────────── Materials ────────────────────────── */

function glassMaterial(color = "#ffffff", transmission = 0.92) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.15,
    roughness: 0.06,
    transmission,
    thickness: 0.9,
    ior: 1.45,
    transparent: true,
    opacity: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.4,
  });
}

/* ────────────────────────── Energy channels ────────────────────────── */

function Photon({
  curve,
  phase,
  active,
  color,
}: {
  curve: THREE.CatmullRomCurve3;
  phase: number;
  active: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const speed = 0.18 + active * 0.55;
    const t = (clock.elapsedTime * speed + phase) % 1;
    const p = curve.getPoint(t);
    ref.current.position.copy(p);

    const tangent = curve.getTangent(t);
    ref.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      tangent.normalize(),
    );

    const base = 0.03 + active * 0.05;
    ref.current.scale.set(base, base * (2 + active * 3), base);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.35 + active * 0.6;
  });

  return (
    <mesh ref={ref}>
      <capsuleGeometry args={[0.5, 1, 4, 8]} />
      <meshBasicMaterial color={color} transparent blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function EnergyTube({
  from,
  to,
  active,
  color = COLORS.cyan,
  photons = 4,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  active: number;
  color?: string;
  photons?: number;
}) {
  const curve = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    mid.y += 0.6 + from.distanceTo(to) * 0.18;
    const q1 = from.clone().lerp(mid, 0.5);
    q1.y += 0.2;
    return new THREE.CatmullRomCurve3([from, q1, mid, to]);
  }, [from, to]);

  const tubeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!tubeRef.current) return;
    const mat = tubeRef.current.material as THREE.MeshPhysicalMaterial;
    mat.opacity = 0.14 + active * 0.32;
    mat.emissiveIntensity = 0.12 + active * 0.7;
  });

  return (
    <group>
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 48, 0.03 + active * 0.02, 10, false]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.2}
          transmission={0.7}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      {Array.from({ length: photons }).map((_, i) => (
        <Photon
          key={i}
          curve={curve}
          phase={i / photons}
          active={active}
          color={color}
        />
      ))}
    </group>
  );
}

/* ────────────────────────── Scene 1 assembly dust ────────────────────────── */

function AssemblyParticles({ t }: { t: number }) {
  const ref = useRef<THREE.Points>(null);
  const assemble = smoothstep(0, 4.5, t);

  const positions = useMemo(() => {
    const count = 340;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.sin(i * 0.7) * 2.4;
      const a = i * 0.4;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(i * 1.3) * 2.2;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current || assemble > 0.96) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const swirl = clock.elapsedTime * 0.3;
    for (let i = 0; i < attr.count; i++) {
      const px = positions[i * 3];
      const py = positions[i * 3 + 1];
      const pz = positions[i * 3 + 2];
      const ang = Math.atan2(pz, px) + swirl * (1 - assemble);
      const rad = Math.hypot(px, pz);
      attr.setXYZ(
        i,
        lerp(Math.cos(ang) * rad, 0, assemble),
        lerp(py, 0, assemble),
        lerp(Math.sin(ang) * rad, 0, assemble),
      );
    }
    attr.needsUpdate = true;
  });

  if (assemble > 0.96) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={COLORS.cyan}
        transparent
        opacity={(1 - assemble) * 0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ────────────────────────── Core: quantum AI processor ────────────────────────── */

function CoreRipples({ intensity }: { intensity: number }) {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

  useFrame(({ clock }) => {
    refs.forEach((r, i) => {
      if (!r.current) return;
      const phase = (clock.elapsedTime * 0.35 + i / refs.length) % 1;
      const s = lerp(0.6, 2.6, phase);
      r.current.scale.setScalar(s);
      const mat = r.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - phase) * 0.14 * (0.4 + intensity);
    });
  });

  return (
    <>
      {refs.map((r, i) => (
        <mesh key={i} ref={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.02, 12, 64]} />
          <meshBasicMaterial
            color={COLORS.cyan}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

function OrbitingGlyphs({ intensity }: { intensity: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.5;
  });
  return (
    <group ref={ref}>
      {MODULES.map((_, i) => {
        const a = (i / MODULES.length) * Math.PI * 2;
        const r = 0.72;
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 2) * 0.1, Math.sin(a) * r]}>
            <octahedronGeometry args={[0.045, 0]} />
            <meshStandardMaterial
              color={COLORS.cyan}
              emissive={COLORS.cyan}
              emissiveIntensity={0.6 + intensity}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function NotrixCore({ t }: { t: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const breathe = sceneWeight(t, SCENES.awaken.start, LOOP_SEC, 2);
  const assemble = smoothstep(0.5, 4.5, t);
  const orchestrate = sceneWeight(t, SCENES.orchestration.start, SCENES.orchestration.end, 1.5);
  const burst = orchestrate * (0.5 + Math.sin(t * 8) * 0.5);
  const pulse = 1 + Math.sin(t * 3) * 0.04 * (1 + orchestrate * 2);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const s = assemble * pulse;
      groupRef.current.scale.setScalar(Math.max(0.001, s));
      groupRef.current.rotation.y = clock.elapsedTime * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = clock.elapsedTime * 0.4;
      innerRef.current.rotation.y = clock.elapsedTime * 0.6;
    }
  });

  const shellMat = useMemo(() => glassMaterial(COLORS.indigo, 0.86), []);

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        {/* Outer frosted glass shell */}
        <mesh material={shellMat}>
          <icosahedronGeometry args={[0.58, 3]} />
        </mesh>
        {/* Mid distortion layer */}
        <mesh>
          <icosahedronGeometry args={[0.44, 2]} />
          <MeshDistortMaterial
            color={COLORS.cyan}
            transparent
            opacity={0.28}
            distort={0.3}
            speed={2.2}
            roughness={0.1}
          />
        </mesh>
        {/* Luminous inner core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial
            color={COLORS.cyan}
            emissive={COLORS.cyan}
            emissiveIntensity={1.4 + burst * 2.5}
            metalness={0.4}
            roughness={0.15}
            toneMapped={false}
          />
        </mesh>

        <OrbitingGlyphs intensity={orchestrate} />

        <pointLight
          intensity={1.4 + orchestrate * 3 + burst}
          color={COLORS.cyan}
          distance={7}
        />

        {/* Rotating orbital rings with labels */}
        {MODULES.map((mod, i) => {
          const angle = (i / MODULES.length) * Math.PI * 2;
          const ringR = 0.95 + (i % 3) * 0.14;
          return (
            <group key={mod} rotation={[i * 0.42, angle, i * 0.27]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[ringR, 0.016, 16, 96]} />
                <meshPhysicalMaterial
                  color={COLORS.silver}
                  metalness={0.95}
                  roughness={0.12}
                  emissive={COLORS.indigo}
                  emissiveIntensity={0.1 + orchestrate * 0.4}
                />
              </mesh>
              {/* traveling node on the ring */}
              <RingNode radius={ringR} speed={0.5 + i * 0.12} intensity={orchestrate} />
              <Text
                position={[ringR + 0.16, 0, 0]}
                fontSize={0.07}
                color={COLORS.graphite}
                anchorX="left"
                fillOpacity={0.5 + assemble * 0.45}
              >
                {mod}
              </Text>
            </group>
          );
        })}

        <CoreRipples intensity={orchestrate} />
      </Float>

      {/* Breathing volumetric halo */}
      {breathe > 0.1 && (
        <mesh scale={[1 + breathe * 0.3, 1 + breathe * 0.3, 1 + breathe * 0.3]}>
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshBasicMaterial
            color={COLORS.cyan}
            transparent
            opacity={0.035 * breathe * (1 + Math.sin(t * 4) * 0.5)}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

function RingNode({
  radius,
  speed,
  intensity,
}: {
  radius: number;
  speed: number;
  intensity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const a = clock.elapsedTime * speed;
    ref.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial
        color={COLORS.cyan}
        emissive={COLORS.cyan}
        emissiveIntensity={1 + intensity * 2}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ────────────────────────── Contextual department icons ────────────────────────── */

function DeptIcon({
  type,
  color,
  active,
}: {
  type: DeptIconType;
  color: string;
  active: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * (0.4 + active * 0.6);
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.4 + active * 0.8}
      metalness={0.5}
      roughness={0.25}
      toneMapped={false}
    />
  );

  const content = () => {
    switch (type) {
      case "code":
        return (
          <>
            {[-0.05, 0, 0.05].map((y, i) => (
              <mesh key={i} position={[0, y, 0]} scale={[0.12 - i * 0.02, 0.012, 0.012]}>
                <boxGeometry />
                {mat}
              </mesh>
            ))}
          </>
        );
      case "chart":
        return (
          <>
            {[0.04, 0.08, 0.06, 0.1].map((h, i) => (
              <mesh key={i} position={[-0.06 + i * 0.04, h / 2 - 0.05, 0]} scale={[0.02, h, 0.02]}>
                <boxGeometry />
                {mat}
              </mesh>
            ))}
          </>
        );
      case "coin":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 20]} />
            {mat}
          </mesh>
        );
      case "person":
        return (
          <>
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              {mat}
            </mesh>
            <mesh position={[0, -0.04, 0]}>
              <cylinderGeometry args={[0.03, 0.055, 0.07, 12]} />
              {mat}
            </mesh>
          </>
        );
      case "neural":
        return (
          <mesh>
            <icosahedronGeometry args={[0.08, 1]} />
            {mat}
          </mesh>
        );
      case "doc":
        return (
          <mesh>
            <boxGeometry args={[0.08, 0.11, 0.008]} />
            {mat}
          </mesh>
        );
      case "gear":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.06, 0.02, 6, 12]} />
            {mat}
          </mesh>
        );
      case "chat":
        return (
          <RoundedBox args={[0.11, 0.08, 0.02]} radius={0.02} smoothness={3}>
            {mat}
          </RoundedBox>
        );
      case "server":
        return (
          <>
            {[-0.045, 0, 0.045].map((y, i) => (
              <mesh key={i} position={[0, y, 0]}>
                <boxGeometry args={[0.1, 0.03, 0.06]} />
                {mat}
              </mesh>
            ))}
          </>
        );
      case "funnel":
        return (
          <mesh rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.07, 0.1, 16, 1, true]} />
            {mat}
          </mesh>
        );
      default:
        return null;
    }
  };

  return <group ref={ref}>{content()}</group>;
}

/* ────────────────────────── Living department pods ────────────────────────── */

function PodInternals({ color, active }: { color: string; active: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const barRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (ringRef.current) ringRef.current.rotation.z = clock.elapsedTime * (0.6 + active);
    barRefs.current.forEach((b, i) => {
      if (!b) return;
      const h = 0.04 + (Math.sin(clock.elapsedTime * 3 + i) * 0.5 + 0.5) * (0.05 + active * 0.08);
      b.scale.y = h / 0.05;
    });
  });

  return (
    <group>
      {/* inner rotating ring */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.008, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 + active}
          toneMapped={false}
        />
      </mesh>
      {/* mini waveform bars (holographic panel) */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) barRefs.current[i] = el;
          }}
          position={[-0.06 + i * 0.04, 0.14, 0.16]}
          scale={[0.015, 1, 0.015]}
        >
          <boxGeometry args={[1, 0.05, 1]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function DepartmentPod({
  name,
  position,
  rise,
  active,
}: {
  name: string;
  position: [number, number, number];
  rise: number;
  active: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const meta = DEPT_META[name as (typeof DEPARTMENTS)[number]];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = lerp(-4, position[1], rise);
    ref.current.rotation.y = clock.elapsedTime * (0.12 + (Math.abs(position[0]) % 3) * 0.04);
  });

  return (
    <group ref={ref} position={[position[0], -4, position[2]]}>
      <Float speed={1.4} floatIntensity={0.25} rotationIntensity={0.1}>
        {/* Frosted glass capsule body */}
        <RoundedBox args={[0.5, 0.42, 0.5]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.92}
            thickness={0.6}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.9}
            emissive={meta.accent}
            emissiveIntensity={0.04 + active * 0.3}
          />
        </RoundedBox>

        {/* Metallic outer ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.014, 12, 48]} />
          <meshStandardMaterial
            color={COLORS.silver}
            metalness={0.95}
            roughness={0.15}
            emissive={meta.accent}
            emissiveIntensity={0.15 + active * 0.6}
          />
        </mesh>

        {/* Internal activity + contextual icon */}
        <PodInternals color={meta.accent} active={active} />
        <group position={[0, 0.01, 0]}>
          <DeptIcon type={meta.icon} color={meta.accent} active={active} />
        </group>

        <Sparkles
          count={10}
          scale={0.55}
          size={1.4}
          speed={0.4}
          opacity={0.3 + active * 0.4}
          color={meta.accent}
        />

        <Text
          position={[0, -0.34, 0]}
          fontSize={0.085}
          color={COLORS.graphite}
          anchorX="center"
          fillOpacity={0.5 + rise * 0.5}
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

/* ────────────────────────── Premium tool logo cards ────────────────────────── */

function ToolCard({
  name,
  position,
  visible,
  active,
}: {
  name: string;
  position: [number, number, number];
  visible: number;
  active: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + seed) * 0.1;
    ref.current.rotation.y =
      Math.sin(clock.elapsedTime * 0.4 + seed) * 0.3 + active * clock.elapsedTime * 0.4;
  });

  if (visible < 0.04) return null;

  return (
    <group ref={ref} position={position} scale={visible}>
      {/* Glass tile */}
      <RoundedBox args={[0.66, 0.66, 0.09]} radius={0.09} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.94}
          thickness={0.5}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.72 * visible}
        />
      </RoundedBox>

      {/* Glowing metallic edge frame */}
      <mesh position={[0, 0, 0.05]}>
        <torusGeometry args={[0.42, 0.01, 8, 4]} />
        <meshStandardMaterial
          color={COLORS.silver}
          metalness={0.95}
          roughness={0.15}
          emissive={COLORS.cyan}
          emissiveIntensity={0.15 + active * 0.8}
        />
      </mesh>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.075}
        maxWidth={0.55}
        textAlign="center"
        color={COLORS.graphite}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.6 + active * 0.4}
      >
        {name}
      </Text>

      {active > 0.3 && (
        <Sparkles count={8} scale={0.7} size={2} speed={0.6} opacity={active} color={COLORS.cyan} />
      )}
    </group>
  );
}

/* ────────────────────────── Living memory constellation ────────────────────────── */

function MemoryOcean({ t }: { t: number }) {
  const weight = sceneWeight(t, SCENES.memory.start, LOOP_SEC, 2);
  const growth = smoothstep(SCENES.memory.start, LOOP_SEC, t);
  const ref = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, colors, count } = useMemo(() => {
    const c = 1400;
    const pos = new Float32Array(c * 3);
    const col = new Float32Array(c * 3);
    const c1 = new THREE.Color(COLORS.indigo);
    const c2 = new THREE.Color(COLORS.violet);
    for (let i = 0; i < c; i++) {
      const r = 2.5 + Math.random() * 9;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = -3.5 - Math.random() * 2.2;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const c3 = c1.clone().lerp(c2, Math.random());
      col[i * 3] = c3.r;
      col[i * 3 + 1] = c3.g;
      col[i * 3 + 2] = c3.b;
    }
    return { positions: pos, colors: col, count: c };
  }, []);

  const linePositions = useMemo(() => {
    const segs = 260;
    const arr = new Float32Array(segs * 6);
    for (let i = 0; i < segs; i++) {
      const a = Math.floor(Math.random() * count);
      let b = Math.floor(Math.random() * count);
      if (b === a) b = (b + 1) % count;
      arr[i * 6] = positions[a * 3];
      arr[i * 6 + 1] = positions[a * 3 + 1];
      arr[i * 6 + 2] = positions[a * 3 + 2];
      arr[i * 6 + 3] = positions[b * 3];
      arr[i * 6 + 4] = positions[b * 3 + 1];
      arr[i * 6 + 5] = positions[b * 3 + 2];
    }
    return arr;
  }, [positions, count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < attr.count; i++) {
        const y = positions[i * 3 + 1];
        attr.setY(i, y + Math.sin(clock.elapsedTime * 0.5 + i * 0.01) * 0.025 * weight);
      }
      attr.needsUpdate = true;
    }
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.12 * growth * weight;
    }
  });

  if (weight < 0.05) return null;

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.4 * weight}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* growing neural links */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={COLORS.indigo}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ────────────────────────── Cinematic camera ────────────────────────── */

function CameraRig({ t }: { t: number }) {
  const current = useRef(new THREE.Vector3(0, 0.5, 9));
  const lookCurrent = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera, clock }) => {
    const slowOrbit = clock.elapsedTime * 0.06;
    const drift = Math.sin(clock.elapsedTime * 0.5) * 0.12;
    const micro = Math.cos(clock.elapsedTime * 0.9) * 0.06;

    let x = 0;
    let y = 0.5;
    let z = 7;
    let orbit = 0;

    if (t < 5) {
      const p = smoothstep(0, 5, t);
      z = lerp(9.5, 5.6, p);
      y = lerp(0, 0.4, p);
    } else if (t < 10) {
      const p = smoothstep(5, 10, t);
      z = lerp(5.6, 11, p);
      y = lerp(0.4, 1.9, p);
    } else if (t < 18) {
      const p = smoothstep(10, 18, t);
      z = lerp(11, 9, p);
      y = lerp(1.9, 3.3, p);
      orbit = lerp(0, 0.5, p);
    } else if (t < 26) {
      const p = smoothstep(18, 26, t);
      z = lerp(9, 6.8, p);
      y = lerp(3.3, 1.1, p);
      orbit = lerp(0.5, 1.6, p);
    } else {
      const p = smoothstep(26, 35, t);
      y = lerp(1.1, -1.2, p);
      z = lerp(6.8, 16, p);
      orbit = lerp(1.6, 2.4, p);
    }

    const total = orbit + slowOrbit;
    const px = Math.sin(total) * z + x + drift;
    const pz = Math.cos(total) * z;

    const target = new THREE.Vector3(px, y + micro, pz);
    current.current.lerp(target, 0.045);
    camera.position.copy(current.current);

    const lookTarget = new THREE.Vector3(0, t > 26 ? -0.6 : 0, 0);
    lookCurrent.current.lerp(lookTarget, 0.05);
    camera.lookAt(lookCurrent.current);

    if ("fov" in camera) {
      const cam = camera as THREE.PerspectiveCamera;
      const targetFov = lerp(38, 30, smoothstep(26, 35, t));
      cam.fov = lerp(cam.fov, targetFov, 0.05);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/* ────────────────────────── World ────────────────────────── */

export function NotrixOSWorld({ elapsed }: { elapsed: number }) {
  const t = elapsed % LOOP_SEC;
  const core = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const workforceW = sceneWeight(t, SCENES.workforce.start, SCENES.workforce.end + 8, 2);
  const orchestrateW = sceneWeight(t, SCENES.orchestration.start, SCENES.orchestration.end, 2);
  const toolsW = sceneWeight(t, SCENES.tools.start, SCENES.tools.end, 2);
  const memoryW = sceneWeight(t, SCENES.memory.start, LOOP_SEC, 2);

  const deptActive = (i: number) => {
    const base = workforceW;
    if (orchestrateW > 0.3) {
      const wave = smoothstep(11 + i * 0.4, 14 + i * 0.4, t);
      return Math.max(base * 0.5, wave);
    }
    return base;
  };

  const engPos = DEPT_POSITIONS[0];

  return (
    <>
      <color attach="background" args={[COLORS.bg]} />
      <fog attach="fog" args={[COLORS.bg, 9, 30]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 9, 6]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} color={COLORS.indigo} />
      <pointLight position={[0, -2, 5]} intensity={0.5} color={COLORS.violet} />
      <hemisphereLight args={["#ffffff", COLORS.silver, 0.5]} />

      <CameraRig t={t} />

      {/* Atmospheric floating dust */}
      <Sparkles
        count={200}
        scale={[16, 11, 16]}
        size={1.1}
        speed={0.12}
        opacity={0.22 + smoothstep(0, 3, t) * 0.18}
        color={COLORS.silver}
      />
      {/* Foreground particles crossing camera */}
      <Sparkles
        count={40}
        scale={[10, 6, 4]}
        position={[0, 0, 4]}
        size={2.4}
        speed={0.5}
        opacity={0.12}
        color={COLORS.cyan}
      />

      <AssemblyParticles t={t} />

      <NotrixCore t={t} />

      {DEPARTMENTS.map((dept, i) => (
        <DepartmentPod
          key={dept}
          name={dept}
          position={[DEPT_POSITIONS[i].x, DEPT_POSITIONS[i].y, DEPT_POSITIONS[i].z]}
          rise={workforceW}
          active={deptActive(i)}
        />
      ))}

      {workforceW > 0.2 &&
        DEPT_POSITIONS.map((pos, i) => (
          <EnergyTube
            key={`tube-${i}`}
            from={core}
            to={new THREE.Vector3(pos.x, pos.y * workforceW, pos.z)}
            active={deptActive(i) * (0.4 + orchestrateW * 0.8)}
            color={i % 3 === 0 ? COLORS.cyan : i % 3 === 1 ? COLORS.violet : COLORS.emerald}
          />
        ))}

      {/* Parallel reasoning beams — Scene 3 */}
      {orchestrateW > 0.4 &&
        [0, 1, 2].map((i) => (
          <EnergyTube
            key={`beam-${i}`}
            from={core}
            to={
              new THREE.Vector3(
                DEPT_POSITIONS[i + 1].x,
                DEPT_POSITIONS[i + 1].y,
                DEPT_POSITIONS[i + 1].z,
              )
            }
            active={orchestrateW}
            color={COLORS.amber}
            photons={6}
          />
        ))}

      {/* Premium tool cards — Scene 4 */}
      {TOOLS.map((tool, i) => (
        <ToolCard
          key={tool}
          name={tool}
          position={TOOL_POSITIONS[i]}
          visible={toolsW}
          active={toolsW * smoothstep(19 + i * 0.5, 21 + i * 0.5, t)}
        />
      ))}

      {toolsW > 0.3 &&
        [0, 3, 6].map((i) => (
          <EnergyTube
            key={`tool-link-${i}`}
            from={new THREE.Vector3(engPos.x, engPos.y, engPos.z)}
            to={new THREE.Vector3(...TOOL_POSITIONS[i])}
            active={toolsW * smoothstep(19 + i * 0.4, 21 + i * 0.4, t)}
            color={COLORS.cyan}
          />
        ))}

      <MemoryOcean t={t} />

      {memoryW > 0.5 && (
        <Sparkles
          count={450}
          scale={[17, 4, 17]}
          position={[0, -4, 0]}
          size={1.8}
          speed={0.6}
          opacity={0.42 * memoryW}
          color={COLORS.indigo}
        />
      )}
    </>
  );
}
