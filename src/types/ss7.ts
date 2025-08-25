export interface SS7Component {
  id: string;
  name: string;
  type: 'MSC' | 'HLR' | 'VLR' | 'SMSC' | 'STP' | 'BSC' | 'BTS';
  description: string;
  position: { x: number; y: number; z?: number };
  status: 'active' | 'inactive' | 'processing';
  connections: string[];
}

export interface SMSMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: number;
  currentLocation: string;
  path: string[];
  status: 'pending' | 'routing' | 'delivered' | 'failed';
}

export interface SignalingStep {
  id: string;
  from: string;
  to: string;
  message: string;
  protocol: string;
  description: string;
  timestamp: number;
}

export interface NetworkTopology {
  components: SS7Component[];
  connections: Array<{
    from: string;
    to: string;
    type: 'signaling' | 'data';
    protocol: string;
  }>;
}