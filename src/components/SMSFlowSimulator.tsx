import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, MessageCircle, User, Check } from 'lucide-react';
import type { SMSMessage, SignalingStep } from '../types/ss7';

const smsFlowSteps: SignalingStep[] = [
  {
    id: 'step-1',
    from: 'Sender Device',
    to: 'MSC',
    message: 'SMS Submit',
    protocol: 'GSM',
    description: 'Mobile device submits SMS to serving MSC',
    timestamp: 0
  },
  {
    id: 'step-2',
    from: 'MSC',
    to: 'SMSC',
    message: 'Forward SMS',
    protocol: 'MAP',
    description: 'MSC forwards SMS to SMS Center for processing',
    timestamp: 1000
  },
  {
    id: 'step-3',
    from: 'SMSC',
    to: 'HLR',
    message: 'Routing Info Request',
    protocol: 'MAP',
    description: 'SMSC queries HLR for recipient routing information',
    timestamp: 2000
  },
  {
    id: 'step-4',
    from: 'HLR',
    to: 'SMSC',
    message: 'Routing Info Response',
    protocol: 'MAP',
    description: 'HLR provides serving MSC address for recipient',
    timestamp: 3000
  },
  {
    id: 'step-5',
    from: 'SMSC',
    to: 'Recipient MSC',
    message: 'Forward SMS',
    protocol: 'MAP',
    description: 'SMSC forwards SMS to recipient\'s serving MSC',
    timestamp: 4000
  },
  {
    id: 'step-6',
    from: 'Recipient MSC',
    to: 'Recipient Device',
    message: 'SMS Deliver',
    protocol: 'GSM',
    description: 'MSC delivers SMS to recipient device',
    timestamp: 5000
  },
  {
    id: 'step-7',
    from: 'Recipient Device',
    to: 'Recipient MSC',
    message: 'Delivery Ack',
    protocol: 'GSM',
    description: 'Device acknowledges SMS delivery',
    timestamp: 6000
  },
  {
    id: 'step-8',
    from: 'Recipient MSC',
    to: 'SMSC',
    message: 'Delivery Report',
    protocol: 'MAP',
    description: 'MSC reports successful delivery to SMSC',
    timestamp: 7000
  }
];

interface SMSFlowSimulatorProps {
  onStepChange: (step: SignalingStep) => void;
}

export default function SMSFlowSimulator({ onStepChange }: SMSFlowSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message] = useState<SMSMessage>({
    id: 'msg-1',
    sender: '+1234567890',
    recipient: '+0987654321',
    content: 'Hello! This is a test SMS message.',
    timestamp: Date.now(),
    currentLocation: 'Sender Device',
    path: [],
    status: 'pending'
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < smsFlowSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep < smsFlowSteps.length) {
            onStepChange(smsFlowSteps[nextStep]);
            return nextStep;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, onStepChange]);

  const handlePlay = () => {
    if (currentStep >= smsFlowSteps.length - 1) {
      setCurrentStep(0);
      onStepChange(smsFlowSteps[0]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    onStepChange(smsFlowSteps[0]);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    onStepChange(smsFlowSteps[stepIndex]);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          SMS Flow Simulation
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">From: {message.sender}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">To: {message.recipient}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-300">Message: "{message.content}"</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {smsFlowSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
              index === currentStep
                ? 'border-cyan-500 bg-cyan-500/10'
                : index < currentStep
                ? 'border-green-500 bg-green-500/10'
                : 'border-gray-600 bg-gray-700/50'
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === currentStep
                  ? 'bg-cyan-500 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">{step.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold text-white">{step.to}</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                    {step.protocol}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{step.description}</p>
                <p className="text-xs text-cyan-400 font-mono mt-1">{step.message}</p>
              </div>
            </div>

            <AnimatePresence>
              {index === currentStep && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  className="absolute bottom-0 left-0 h-1 bg-cyan-500 rounded-b-lg"
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}