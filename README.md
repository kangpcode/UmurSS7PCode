# UmurSS7PCode - SS7 Network Simulation Platform

![UmurSS7PCode](https://img.shields.io/badge/UmurSS7PCode-Educational%20Platform-cyan)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.158.0-green)

## 🎯 Overview

UmurSS7PCode is an educational simulation platform designed to demonstrate SS7 (Signaling System 7) network protocols and SMS message forwarding workflows in a safe, controlled environment. This platform provides interactive visualizations and step-by-step simulations to help users understand telecommunications signaling without accessing real network infrastructure.

## ⚠️ Educational Disclaimer

**This platform is designed exclusively for educational purposes.** It does not access, exploit, or interact with real telecommunications networks. The simulations are theoretical demonstrations intended to promote understanding of network security and proper system design.

## ✨ Features

### 🌐 Interactive Network Topology
- **3D Network Visualization**: Interactive Three.js-powered 3D visualization of SS7 network components
- **Component Details**: Detailed information about MSC, HLR, VLR, SMSC, and STP components
- **Connection Mapping**: Visual representation of signaling connections and protocols
- **Real-time Highlighting**: Dynamic highlighting of active network paths

### 📱 SMS Flow Simulation
- **Step-by-Step Process**: Interactive simulation of SMS message routing
- **Protocol Visualization**: Display of MAP, SCCP, TCAP, and other SS7 protocols
- **Timing Simulation**: Realistic timing for each signaling step
- **Message Tracking**: Visual tracking of message path through network components

### 🔒 Security Awareness
- **Vulnerability Education**: Information about known SS7 security vulnerabilities
- **Protection Measures**: Best practices for network security
- **Risk Assessment**: Understanding of potential impacts and mitigations
- **Educational Resources**: Links to additional security resources

### 🎨 Modern UI/UX
- **Dark Theme Interface**: Professional telecommunications dashboard design
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions
- **Interactive Elements**: Hover states, tooltips, and click interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kangpcode/umurss7pcode.git
   cd umurss7pcode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the platform

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development with full TypeScript support
- **Vite 5.4.2**: Fast build tool and development server
- **Tailwind CSS 3.4.1**: Utility-first CSS framework for styling

### 3D Visualization
- **Three.js 0.158.0**: 3D graphics library for network visualization
- **@react-three/fiber 8.15.0**: React renderer for Three.js
- **@react-three/drei 9.88.0**: Useful helpers and abstractions for Three.js

### Animation & Interaction
- **Framer Motion 10.16.0**: Production-ready motion library for React
- **Lucide React 0.344.0**: Beautiful & consistent icon toolkit

### Development Tools
- **ESLint**: Code linting and quality assurance
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing

## 📚 Usage Guide

### Navigation

The platform consists of three main sections:

1. **Network Topology**: Interactive 3D visualization of SS7 components
2. **SMS Simulation**: Step-by-step SMS message flow demonstration
3. **Security**: Educational content about SS7 vulnerabilities and protection

### Network Topology View

- Click on network nodes to view detailed component information
- Observe connection highlighting when components are selected
- Use mouse controls to rotate, zoom, and pan the 3D visualization
- Read component details in the side panel

### SMS Simulation View

- Use Play/Pause controls to start/stop the simulation
- Click on individual steps to jump to specific points in the flow
- Watch real-time network highlighting as messages flow through components
- Read detailed descriptions of each signaling step

### Security Awareness

- Click on vulnerability cards to expand detailed information
- Learn about protection measures and best practices
- Understand the educational purpose and ethical considerations

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_APP_TITLE=UmurSS7PCode
VITE_APP_VERSION=1.0.0
```

### Customization

The platform can be customized by modifying:

- **Network Components**: Edit `src/data/networkComponents.ts`
- **SMS Flow Steps**: Modify `src/components/SMSFlowSimulator.tsx`
- **Styling**: Update Tailwind classes or add custom CSS
- **3D Visualization**: Adjust Three.js components in `src/components/NetworkVisualization.tsx`

## 🤝 Contributing

We welcome contributions to improve the educational value of this platform:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Maintain the educational focus of the platform
- Ensure all code is well-documented and typed
- Follow the existing code style and conventions
- Add tests for new features when applicable
- Update documentation as needed

## 📖 Educational Resources

### SS7 Protocol Stack
- **MTP (Message Transfer Part)**: Layers 1-3 of SS7 protocol stack
- **SCCP (Signaling Connection Control Part)**: Network layer protocol
- **TCAP (Transaction Capabilities Application Part)**: Application layer protocol
- **MAP (Mobile Application Part)**: GSM-specific application protocol

### Network Components
- **MSC (Mobile Switching Center)**: Central switching office
- **HLR (Home Location Register)**: Subscriber database
- **VLR (Visitor Location Register)**: Temporary subscriber database
- **SMSC (SMS Center)**: SMS store-and-forward center
- **STP (Signal Transfer Point)**: SS7 message router

## 🔒 Security & Ethics

This platform is created with the following principles:

- **Educational Purpose Only**: No real network access or exploitation
- **Security Awareness**: Promoting understanding of vulnerabilities
- **Ethical Use**: Encouraging responsible security practices
- **Transparency**: Open-source code for educational review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Telecommunications industry professionals for protocol documentation
- Open-source community for the excellent tools and libraries
- Educational institutions promoting network security awareness
- Contributors who help improve this educational platform

## 📞 Support

For questions, issues, or educational inquiries:

- Create an issue on GitHub
- Check the documentation in the `docs/` folder
- Review the code comments for implementation details

---

**Remember**: This platform is for educational purposes only. Always use telecommunications knowledge responsibly and ethically.