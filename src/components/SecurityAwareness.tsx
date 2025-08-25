import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Eye, Lock, Info, ExternalLink } from 'lucide-react';

const vulnerabilities = [
  {
    id: 'location-tracking',
    title: 'Location Tracking',
    severity: 'High',
    description: 'SS7 protocols can be exploited to track mobile device locations in real-time.',
    impact: 'Privacy violation, stalking, surveillance',
    mitigation: 'Network-level authentication, encrypted signaling'
  },
  {
    id: 'sms-interception',
    title: 'SMS Interception',
    severity: 'High',
    description: 'Attackers can intercept and read SMS messages including 2FA codes.',
    impact: 'Account compromise, financial fraud, privacy breach',
    mitigation: 'End-to-end encryption, alternative authentication methods'
  },
  {
    id: 'call-interception',
    title: 'Call Interception',
    severity: 'Critical',
    description: 'Voice calls can be intercepted and recorded without user knowledge.',
    impact: 'Privacy violation, industrial espionage, blackmail',
    mitigation: 'Voice encryption, secure communication apps'
  },
  {
    id: 'service-disruption',
    title: 'Service Disruption',
    severity: 'Medium',
    description: 'SS7 attacks can disrupt mobile services and cause denial of service.',
    impact: 'Communication outage, business disruption',
    mitigation: 'Network monitoring, traffic filtering, redundancy'
  }
];

const securityMeasures = [
  {
    title: 'Network Firewalls',
    description: 'Deploy SS7 firewalls to filter and monitor signaling traffic',
    icon: Shield
  },
  {
    title: 'Authentication',
    description: 'Implement strong authentication between network elements',
    icon: Lock
  },
  {
    title: 'Monitoring',
    description: 'Continuous monitoring of SS7 traffic for anomalies',
    icon: Eye
  },
  {
    title: 'Encryption',
    description: 'Use encrypted signaling protocols where possible',
    icon: Lock
  }
];

export default function SecurityAwareness() {
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/20 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">SS7 Security Awareness</h3>
          <p className="text-gray-400">Understanding vulnerabilities and protection measures</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vulnerabilities */}
        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Known Vulnerabilities
          </h4>
          <div className="space-y-3">
            {vulnerabilities.map((vuln) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedVulnerability === vuln.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
                onClick={() => setSelectedVulnerability(
                  selectedVulnerability === vuln.id ? null : vuln.id
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-white">{vuln.title}</h5>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                    {vuln.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{vuln.description}</p>
                
                {selectedVulnerability === vuln.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-600"
                  >
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-red-400">Impact:</span>
                        <p className="text-sm text-gray-300">{vuln.impact}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-green-400">Mitigation:</span>
                        <p className="text-sm text-gray-300">{vuln.mitigation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Measures */}
        <div>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Protection Measures
          </h4>
          <div className="space-y-3">
            {securityMeasures.map((measure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <measure.icon className="w-5 h-5 text-green-400" />
                  <h5 className="font-semibold text-white">{measure.title}</h5>
                </div>
                <p className="text-sm text-gray-300">{measure.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h5 className="font-semibold text-white mb-2">Educational Purpose</h5>
                <p className="text-sm text-gray-300 mb-3">
                  This simulation is designed for educational purposes only. Understanding 
                  these vulnerabilities helps network operators implement proper security measures.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Learn more about SS7 security
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}