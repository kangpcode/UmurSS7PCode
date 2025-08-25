import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SMSFlowSimulator from './SMSFlowSimulator';
import NetworkVisualization from './NetworkVisualization';
import type { SignalingStep } from '../types/ss7';

export default function SMSSimulationView() {
  const [currentStep, setCurrentStep] = useState<SignalingStep | null>(null);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  const handleStepChange = (step: SignalingStep) => {
    setCurrentStep(step);
    
    // Map step locations to component IDs and highlight appropriate connections
    const connectionMap: { [key: string]: string[] } = {
      'Sender Device': [],
      'MSC': ['msc-1-smsc-1', 'msc-1-hlr-1'],
      'SMSC': ['smsc-1-hlr-1', 'smsc-1-msc-1'],
      'HLR': ['hlr-1-smsc-1', 'hlr-1-vlr-1'],
      'Recipient MSC': ['msc-1-vlr-1'],
      'Recipient Device': []
    };
    
    const connections = connectionMap[step.from] || [];
    setActiveConnections(connections);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 xl:grid-cols-2 gap-6"
    >
      {/* SMS Flow Simulator */}
      <div>
        <SMSFlowSimulator onStepChange={handleStepChange} />
      </div>

      {/* Network Visualization with Flow */}
      <div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Message Flow Visualization</h3>
          <NetworkVisualization
            activeComponent={null}
            onComponentClick={() => {}}
            activeConnections={activeConnections}
          />
          {currentStep && (
            <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <div className="text-sm">
                <span className="text-cyan-400 font-semibold">Current Step: </span>
                <span className="text-white">{currentStep.from} → {currentStep.to}</span>
              </div>
              <div className="text-xs text-gray-300 mt-1">
                {currentStep.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}