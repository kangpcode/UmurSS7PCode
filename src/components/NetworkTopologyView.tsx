import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NetworkVisualization from './NetworkVisualization';
import ComponentDetails from './ComponentDetails';
import type { SS7Component, SignalingStep } from '../types/ss7';

export default function NetworkTopologyView() {
  const [selectedComponent, setSelectedComponent] = useState<SS7Component | null>(null);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  const handleComponentClick = (component: SS7Component) => {
    setSelectedComponent(component);
    
    // Highlight connections for selected component
    const connections = component.connections.map(connId => `${component.id}-${connId}`);
    setActiveConnections(connections);
  };

  const handleSignalingStep = (step: SignalingStep) => {
    // This would be called from SMS simulation to highlight network paths
    console.log('Signaling step:', step);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 xl:grid-cols-3 gap-6"
    >
      {/* Network Visualization */}
      <div className="xl:col-span-2">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">SS7 Network Topology</h3>
          <NetworkVisualization
            activeComponent={selectedComponent?.id || null}
            onComponentClick={handleComponentClick}
            activeConnections={activeConnections}
          />
          <div className="mt-4 text-sm text-gray-400">
            <p>Interactive 3D visualization of SS7 network components.</p>
            <p>Click on nodes to view detailed information and highlight connections.</p>
          </div>
        </div>
      </div>

      {/* Component Details */}
      <div className="xl:col-span-1">
        <ComponentDetails component={selectedComponent} />
      </div>
    </motion.div>
  );
}