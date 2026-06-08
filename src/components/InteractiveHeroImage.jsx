import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

export default function InteractiveHeroImage() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <pointLight position={[-2, -2, -5]} color="#f8fafc" intensity={0.5} />
      
      {/* Floating animation wrapper */}
      <Float
        speed={2} 
        rotationIntensity={1} 
        floatIntensity={2} 
      >
        {/* The 3D Sphere geometry */}
        <Sphere visible args={[1, 100, 200]} scale={1.8}>
          {/* Material that distorts like water/liquid metal */}
          <MeshDistortMaterial 
            color="#0ea5e9" /* Matches your accent color */
            attach="material" 
            distort={0.4} 
            speed={2} 
            roughness={0.2}
            metalness={0.8}
            emissive="#0ea5e9"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
      
      {/* Allows the user to rotate the object with their mouse */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}
