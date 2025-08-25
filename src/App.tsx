import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import NetworkTopologyView from './components/NetworkTopologyView';
import SMSSimulationView from './components/SMSSimulationView';
import SecurityAwareness from './components/SecurityAwareness';

function App() {
  const [activeTab, setActiveTab] = useState('network');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'network':
        return <NetworkTopologyView />;
      case 'simulation':
        return <SMSSimulationView />;
      case 'security':
        return <SecurityAwareness />;
      default:
        return <NetworkTopologyView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Educational Disclaimer */}
      <footer className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Educational Simulation Platform</h4>
            <p className="text-sm text-gray-400 max-w-3xl mx-auto">
              UmurSS7PCode is designed exclusively for educational purposes to demonstrate SS7 signaling 
              protocols and SMS transmission workflows. This simulation does not access real telecommunications 
              networks and is intended to promote understanding of network security and proper system design.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © 2024 UmurSS7PCode - Educational Simulation Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;