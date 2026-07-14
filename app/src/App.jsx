import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// -------- BUILD SEQUENCE --------
// Each step adds one part. `position/rotation/scale` = its final assembled spot.
// `insert` = where it flies IN from (offset along its insertion axis).
const STEPS = [
  {
    id: "valve",
    url: "/valve.glb",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1.0,
    insert: [0, -0.2, 0],
    title: "Mount the bare valve",
    tool: "Bench vice",
    torque: "—",
    checks: ["Fail-to-open orientation", "Flange faces to the line"],
  },
  {
    id: "bracket",
    url: "/bracket.glb",
    position: [-0.022, 0.15, 0],
    rotation: [90, 0, -90],
    scale: 0.73,
    insert: [0, 0.18, 0],
    title: "Fit the mounting bracket",
    tool: "Allen key 6 mm",
    torque: "15 Nm",
    checks: ["Bracket seated on valve pad", "ISO 5211 holes aligned"],
  },
  {
    id: "coupling",
    url: "/coupling.glb",
    position: [0, 0.105, 0],
    rotation: [0, 0, 0],
    scale: 1.0,
    insert: [0, 0.12, 0],
    title: "Fit the drive coupling",
    tool: "Allen key 4 mm",
    torque: "—",
    checks: ["Coupling seated on valve stem", "Square drive engaged"],
  },
  {
    id: "actuator",
    url: "/actuator.glb",
    position: [0, 0.17, 0],
    rotation: [0, 0, 0],
    scale: 0.55,
    insert: [0, 0.3, 0],
    title: "Mount the actuator",
    tool: "Spanner 17 mm",
    torque: "25 Nm",
    checks: ["Coupling engaged on stem", "Actuator square to valve"],
  },
  {
    id: "sov",
    url: "/sov.glb",
    position: [0.05, 0.23, 0],
    rotation: [0, -180, -180],
    scale: 0.46,
    insert: [0.22, 0, 0],
    title: "Fit the solenoid valve (SOV)",
    tool: "Allen key 4 mm",
    torque: "—",
    checks: ["NAMUR gasket in place", "Ports 1-2-3-4 correct"],
  },
  {
    id: "afr",
    url: "/afr.glb",
    position: [0.04, 0.21, 0.05],
    rotation: [0, 90, 0],
    scale: 0.49,
    insert: [0, 0, 0.28],
    title: "Fit the air filter regulator",
    tool: "Spanner 14 mm",
    torque: "—",
    checks: ["Bowl drain pointing down", "Set 4-6 bar"],
  },
  {
    id: "lsb",
    url: "/lsb.glb",
    position: [-0.05, 0.33, 0],
    rotation: [-90, 0, -91],
    scale: 0.85,
    insert: [0, 0.22, 0],
    title: "Fit the limit switch box",
    tool: "Spanner / screwdriver",
    torque: "—",
    checks: [
      "Integral bracket seated square on actuator top",
      "Shaft engaged in pinion BEFORE nuts pulled",
      "Cams set OPEN / CLOSED",
    ],
    // LSB ships with its bracket integral (no separate riser); the bracket mesh
    // reveals together with the box as one unit.
    extras: [
      { url: "/lsbmount.glb", position: [0, 0.258, 0], rotation: [0, 0, 0], scale: 1.0, insert: [0, 0.22, 0] },
    ],
  },
];

const D2R = Math.PI / 180;

function Part({ url, position, rotation, scale, insert, revealed }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const t = useRef(0); // 0 = flown out / hidden, 1 = fully placed

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material = new THREE.MeshStandardMaterial({
          color: "#8b949e",
          metalness: 0.4,
          roughness: 0.35,
        });
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const c = box.getCenter(new THREE.Vector3());
    clone.position.set(-c.x, -box.min.y, -c.z);
    const g = new THREE.Group();
    g.add(clone);
    return g;
  }, [scene]);

  useFrame((_, dt) => {
    const target = revealed ? 1 : 0;
    t.current = THREE.MathUtils.damp(t.current, target, 6, dt);
    if (ref.current) {
      ref.current.visible = t.current > 0.002;
      const k = 1 - t.current; // how far along the insertion offset it still is
      ref.current.position.set(
        position[0] + insert[0] * k,
        position[1] + insert[1] * k,
        position[2] + insert[2] * k
      );
    }
  });

  return (
    <primitive
      ref={ref}
      object={model}
      rotation={[rotation[0] * D2R, rotation[1] * D2R, rotation[2] * D2R]}
      scale={scale}
    />
  );
}

function Scene({ step }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.7} />
      <directionalLight position={[0, 2, -6]} intensity={0.9} />

      <Suspense fallback={null}>
        {STEPS.map((s, i) => (
          <group key={s.id}>
            <Part {...s} revealed={i < step} />
            {(s.extras || []).map((e, j) => (
              <Part key={s.id + "-x" + j} {...e} revealed={i < step} />
            ))}
          </group>
        ))}
      </Suspense>

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
      </Suspense>

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={0.9}
        blur={2.5}
        far={0.6}
      />
      <OrbitControls makeDefault target={[0, 0.18, 0]} />
    </>
  );
}

export default function App() {
  const [step, setStep] = useState(1); // number of parts placed (1..STEPS.length)
  const total = STEPS.length;
  const current = STEPS[step - 1];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#20242b", position: "relative" }}>
      <Canvas shadows camera={{ position: [0.34, 0.28, 0.55], fov: 45 }}>
        <Scene step={step} />
      </Canvas>

      {/* --- step info panel --- */}
      <div style={panelStyle}>
        <div style={{ fontSize: 13, letterSpacing: 1, opacity: 0.6 }}>
          STEP {step} / {total}
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "6px 0 14px" }}>
          {current.title}
        </div>
        <Row label="Part" value={current.id.toUpperCase()} />
        <Row label="Tool" value={current.tool} />
        <Row label="Torque" value={current.torque} />
        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>CHECKS</div>
        <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
          {current.checks.map((c) => (
            <li key={c} style={{ marginBottom: 4 }}>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* --- prev / next --- */}
      <div style={controlsStyle}>
        <button
          style={{ ...btn, opacity: step <= 1 ? 0.35 : 1 }}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step <= 1}
        >
          ‹ Prev
        </button>
        <button
          style={{ ...btn, opacity: step >= total ? 0.35 : 1 }}
          onClick={() => setStep((s) => Math.min(total, s + 1))}
          disabled={step >= total}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <span style={{ opacity: 0.6 }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const panelStyle = {
  position: "absolute",
  top: 24,
  left: 24,
  width: 300,
  padding: "18px 20px",
  background: "rgba(20,24,30,0.82)",
  color: "#e8ecf1",
  borderRadius: 12,
  fontFamily: "system-ui, sans-serif",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const controlsStyle = {
  position: "absolute",
  bottom: 28,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 14,
};

const btn = {
  padding: "14px 30px",
  fontSize: 18,
  fontWeight: 600,
  color: "#fff",
  background: "#2f6fed",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontFamily: "system-ui, sans-serif",
};

STEPS.forEach((s) => {
  useGLTF.preload(s.url);
  (s.extras || []).forEach((e) => useGLTF.preload(e.url));
});
