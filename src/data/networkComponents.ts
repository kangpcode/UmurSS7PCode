import type { SS7Component, NetworkTopology } from '../types/ss7';

export const ss7Components: SS7Component[] = [
  {
    id: 'msc-1',
    name: 'Mobile Switching Center',
    type: 'MSC',
    description: 'Central switching office that coordinates call setup, routing, and handovers',
    position: { x: 0, y: 0, z: 0 },
    status: 'active',
    connections: ['hlr-1', 'vlr-1', 'smsc-1', 'stp-1']
  },
  {
    id: 'hlr-1',
    name: 'Home Location Register',
    type: 'HLR',
    description: 'Database containing subscriber information and current location',
    position: { x: -200, y: -100, z: 0 },
    status: 'active',
    connections: ['msc-1', 'vlr-1']
  },
  {
    id: 'vlr-1',
    name: 'Visitor Location Register',
    type: 'VLR',
    description: 'Temporary database for roaming subscribers in the area',
    position: { x: 200, y: -100, z: 0 },
    status: 'active',
    connections: ['msc-1', 'hlr-1']
  },
  {
    id: 'smsc-1',
    name: 'SMS Center',
    type: 'SMSC',
    description: 'Store-and-forward center for SMS messages',
    position: { x: 0, y: 150, z: 0 },
    status: 'active',
    connections: ['msc-1', 'hlr-1']
  },
  {
    id: 'stp-1',
    name: 'Signal Transfer Point',
    type: 'STP',
    description: 'Packet switch that routes SS7 messages between signaling points',
    position: { x: -100, y: 50, z: 0 },
    status: 'active',
    connections: ['msc-1', 'stp-2']
  },
  {
    id: 'stp-2',
    name: 'Signal Transfer Point 2',
    type: 'STP',
    description: 'Redundant STP for network reliability',
    position: { x: 100, y: 50, z: 0 },
    status: 'active',
    connections: ['stp-1']
  }
];

export const networkTopology: NetworkTopology = {
  components: ss7Components,
  connections: [
    { from: 'msc-1', to: 'hlr-1', type: 'signaling', protocol: 'MAP' },
    { from: 'msc-1', to: 'vlr-1', type: 'signaling', protocol: 'MAP' },
    { from: 'msc-1', to: 'smsc-1', type: 'signaling', protocol: 'MAP' },
    { from: 'msc-1', to: 'stp-1', type: 'signaling', protocol: 'SCCP' },
    { from: 'hlr-1', to: 'vlr-1', type: 'signaling', protocol: 'MAP' },
    { from: 'smsc-1', to: 'hlr-1', type: 'signaling', protocol: 'MAP' },
    { from: 'stp-1', to: 'stp-2', type: 'signaling', protocol: 'MTP3' }
  ]
};