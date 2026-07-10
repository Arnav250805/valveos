import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

// Loads one .glb file, gives it a semi-glossy steel material, drops it in the scene
function Model({ url }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        obj.material = new THREE.MeshStandardMaterial({
          color: "#8b949e",
          metalness: 0.4,
          roughness: 0.35,
        });
      }
    });
    return clone;
  }, [scene]);
  return <primitive object={model} />;
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#20242b" }}>
      <Canvas shadows camera={{ position: [0.3, 0.22, 0.3], fov: 45 }}>
        {/* low fill so the shape's own shading reads; one strong key light for depth */}
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
          <Center>
            <Model url="/valve.glb" />
          </Center>
        </Suspense>

        {/* image-based lighting: highlights slide across the curves and reveal form */}
        <Suspense fallback={null}>
          <Environment preset="warehouse" />
        </Suspense>

        {/* soft shadow beneath the part to ground it and add depth */}
        <ContactShadows
          position={[0, -0.09, 0]}
          opacity={0.5}
          scale={0.6}
          blur={2.5}
          far={0.3}
        />

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/valve.glb");
