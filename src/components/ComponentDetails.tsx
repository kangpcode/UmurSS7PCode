import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, MessageCircle, Radio, Zap, Network } from 'lucide-react';
import type { SS7Component } from '../types/ss7';

interface ComponentDetailsProps {
  component: SS7Component | null;
}

const getComponentIcon = (type: string) => {
  switch (type) {
    case 'MSC': return Server;
    case 'HLR': return Database;
    case 'VLR': return Database;
    case 'SMSC': return MessageCircle;
    case 'STP': return Network;
    case 'BSC': return Radio;
    case 'BTS': return Zap;
    default: return Server;
  }
};

const getComponentDetails = (type: string) => {
  const details = {
    MSC: {
      fullName: 'Mobile Switching Center',
      purpose: 'Central switching office that coordinates call setup, routing, and handovers',
      functions: [
        'Call routing and switching',
        'Handover management',
        'Authentication procedures',
        'Charging and billing',
        'SMS routing'
      ],
      protocols: ['MAP', 'ISUP', 'SCCP', 'TCAP']
    },
    HLR: {
      fullName: 'Home Location Register',
      purpose: 'Master database containing subscriber information and services',
      functions: [
        'Subscriber profile storage',
        'Location tracking',
        'Service authorization',
        'Authentication key management',
        'Call forwarding settings'
      ],
      protocols: ['MAP', 'SCCP', 'TCAP']
    },
    VLR: {
      fullName: 'Visitor Location Register',
      purpose: 'Temporary database for roaming subscribers in the coverage area',
      functions: [
        'Temporary subscriber data',
        'Location area updates',
        'Roaming management',
        'Local authentication',
        'Service restrictions'
      ],
      protocols: ['MAP', 'SCCP', 'TCAP']
    },
    SMSC: {
      fullName: 'Short Message Service Center',
      purpose: 'Store-and-forward center for SMS messages',
      functions: [
        'SMS message storage',
        'Message forwarding',
        'Delivery confirmation',
        'Message queuing',
        'Retry mechanisms'
      ],
      protocols: ['MAP', 'SMPP', 'SCCP']
    },
    STP: {
      fullName: 'Signal Transfer Point',
      purpose: 'Packet switch that routes SS7 messages between signaling points',
      functions: [
        'Message routing',
        'Load balancing',
        'Network resilience',
        'Protocol conversion',
        'Traffic monitoring'
      ],
      protocols: ['MTP1', 'MTP2', 'MTP3', 'SCCP']
    }
  };
  
  return details[type as keyof typeof details] || details.MSC;
};

export default function ComponentDetails({ component }: ComponentDetailsProps) {
  if (!component) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-400 text-center">
          Click on a network component to view detailed information
        </p>
      </div>
    );
  }

  const Icon = getComponentIcon(component.type);
  const details = getComponentDetails(component.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-lg p-6 h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{component.type}</h3>
          <p className="text-gray-400 text-sm">{details.fullName}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold mb-2">Status</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            component.status === 'active' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {component.status.toUpperCase()}
          </span>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Purpose</h4>
          <p className="text-gray-300 text-sm">{details.purpose}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Key Functions</h4>
          <ul className="space-y-1">
            {details.functions.map((func, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                {func}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Protocols Used</h4>
          <div className="flex flex-wrap gap-2">
            {details.protocols.map((protocol) => (
              <span
                key={protocol}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-mono"
              >
                {protocol}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Connections</h4>
          <div className="flex flex-wrap gap-2">
            {component.connections.map((connId) => (
              <span
                key={connId}
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
              >
                {connId.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}