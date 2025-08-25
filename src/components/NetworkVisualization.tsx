import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { SS7Component } from '../types/ss7';
import { ss7Components } from '../data/networkComponents';

interface NetworkNodeProps {
  component: SS7Component;
  isActive: boolean;
  onClick: (component: SS7Component) => void;
}

function NetworkNode({ component, isActive, onClick }: NetworkNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(hovered ? 1.2 : isActive ? 1.1 : 1);
    }
  });

  const getColor = () => {
    if (isActive) return '#00ffff';
    switch (component.type) {
      case 'MSC': return '#ff6b6b';
      case 'HLR': return '#4ecdc4';
      case 'VLR': return '#45b7d1';
      case 'SMSC': return '#96ceb4';
      case 'STP': return '#feca57';
      default: return '#ddd';
    }
  };

  return (
    <group position={[component.position.x / 100, component.position.y / 100, component.position.z || 0]}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onClick={() => onClick(component)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={getColor()} emissive={getColor()} emissiveIntensity={0.2} />
      </Sphere>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {component.type}
      </Text>
    </group>
  );
}

interface ConnectionLineProps {
  from: THREE.Vector3;
  to: THREE.Vector3;
  isActive: boolean;
}

function ConnectionLine({ from, to, isActive }: ConnectionLineProps) {
  const points = [from, to];
  
  return (
    <Line
      points={points}
      color={isActive ? '#00ffff' : '#333'}
      lineWidth={isActive ? 3 : 1}
      transparent
      opacity={isActive ? 0.8 : 0.3}
    />
  );
}

interface NetworkVisualizationProps {
  activeComponent: string | null;
  onComponentClick: (component: SS7Component) => void;
  activeConnections: string[];
}

export default function NetworkVisualization({ 
  activeComponent, 
  onComponentClick, 
  activeConnections 
}: NetworkVisualizationProps) {
  return (
    <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {ss7Components.map((component) => (
          <NetworkNode
            key={component.id}
            component={component}
            isActive={component.id === activeComponent}
            onClick={onComponentClick}
          />
        ))}
        
        {ss7Components.map((component) =>
          component.connections.map((connId) => {
            const target = ss7Components.find(c => c.id === connId);
            if (!target) return null;
            
            const from = new THREE.Vector3(
              component.position.x / 100,
              component.position.y / 100,
              component.position.z || 0
            );
            const to = new THREE.Vector3(
              target.position.x / 100,
              target.position.y / 100,
              target.position.z || 0
            );
            
            const isActive = activeConnections.includes(`${component.id}-${connId}`);
            
            return (
              <ConnectionLine
                key={`${component.id}-${connId}`}
                from={from}
                to={to}
                isActive={isActive}
              />
            );
          })
        )}
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}