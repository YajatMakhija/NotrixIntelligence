"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import { NotrixOSWorld } from "./NotrixOSWorld";
import { LOOP_SEC } from "./constants";

function SimulationClock({
  onTick,
}: {
  onTick: (elapsed: number) => void;
}) {
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (start.current === null) start.current = clock.elapsedTime;
    onTick(clock.elapsedTime - start.current);
  });

  return null;
}

function Scene({ onTick }: { onTick: (elapsed: number) => void }) {
  const [elapsed, setElapsed] = useState(0);

  return (
    <>
      <SimulationClock
        onTick={(t) => {
          setElapsed(t);
          onTick(t);
        }}
      />
      <NotrixOSWorld elapsed={elapsed} />
    </>
  );
}

export function NotrixOSCanvas({
  onTimeUpdate,
}: {
  onTimeUpdate?: (t: number) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 38, near: 0.1, far: 100 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: "#FAFAFA" }}
    >
      <Suspense fallback={null}>
        <Scene onTick={onTimeUpdate ?? (() => {})} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export { LOOP_SEC };
