import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { useControls } from "leva";
import * as THREE from "three";

// -------- ASSEMBLY DEFINITION --------
// Starting guesses. You'll fine-tune every number live with the sliders.
// position = metres, rotation = degrees, scale = multiplier.
const PARTS = [
  { id: "valve", url: "/valve.glb", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1.0 },
  { id: "bracket", url: "/bracket.glb", position: [0, 0.15, 0], rotation: [-90, 0, -90], scale: 0.73 },
  { id: "actuator", url: "/actuator.glb", position: [0, 0.17, 0], rotation: [0, 0, 0], scale: 0.55 },
  { id: "sov", url: "/sov.glb", position: [0.05, 0.23, 0], rotation: [0, -180, -180], scale: 0.46 },
  { id: "lsb", url: "/lsb.glb", position: [0, 0.33, 0], rotation: [-90, 0, -91], scale: 0.85 },
  { id: "afr", url: "/afr.glb", position: [0.04, 0.21, 0.05], rotation: [0, 90, 0], scale: 0.49 },
];

const D2R = Math.PI / 180;

function Part({ id, url, position, rotation, scale }) {
  const { scene } = useGLTF(url);

  // recenter to bottom-centre + repaint steel
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

  // one folder of live sliders per part
  const c = useControls(id, {
    px: { value: position[0], min: -0.4, max: 0.4, step: 0.001, label: "pos x" },
    py: { value: position[1], min: -0.2, max: 0.6, step: 0.001, label: "pos y" },
    pz: { value: position[2], min: -0.4, max: 0.4, step: 0.001, label: "pos z" },
    rx: { value: rotation[0], min: -180, max: 180, step: 1, label: "rot x" },
    ry: { value: rotation[1], min: -180, max: 180, step: 1, label: "rot y" },
    rz: { value: rotation[2], min: -180, max: 180, step: 1, label: "rot z" },
    s: { value: scale, min: 0.1, max: 2, step: 0.01, label: "scale" },
  });

  return (
    <primitive
      object={model}
      position={[c.px, c.py, c.pz]}
      rotation={[c.rx * D2R, c.ry * D2R, c.rz * D2R]}
      scale={c.s}
    />
  );
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#20242b" }}>
      <Canvas shadows camera={{ position: [0.34, 0.28, 0.55], fov: 45 }}>
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
          {PARTS.map((p) => (
            <Part key={p.id} {...p} />
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

        <OrbitControls makeDefault target={[0, 0.16, 0]} />
      </Canvas>
    </div>
  );
}

PARTS.forEach((p) => useGLTF.preload(p.url));
