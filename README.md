# 🌌 INNOVERSE 3.0 — National Level AI & Tech Hackathon

<div align="center">

![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.186.1-black?style=for-the-badge&logo=three.js&logoColor=white)
![Oxlint](https://img.shields.io/badge/Oxlint-1.81.0-orange?style=for-the-badge)

<p align="center">
  <b>A cinematic, high-performance web experience engineered for 1,500+ builders, hackers, and visionaries.</b>
  <br />
  Featuring interactive Three.js 3D Earth globe visualizations, real-time telemetry, track selection matrix, and glassmorphic UI.
</p>

[**Explore Tracks**](#-hackathon-tracks--bounties) • [**Tech Stack**](#-tech-stack) • [**Quickstart**](#-getting-started) • [**Architecture**](#-project-structure)

</div>

---

## ⚡ Overview

**INNOVERSE 3.0** is the official portal for the national-level 24-hour hackathon bringing together developer squads from across the country to construct autonomous artificial intelligence, decentralized systems, and moonshot innovations.

### Key Highlights
- **Fixed Team Size**: Strictly 3 members per team.
- **Registration Fee**: ₹300 per team.
- **₹35,000 Prize Pool**: Dedicated prizes for separate BCA and MCA tracks (₹12,000 First Prize, ₹6,000 Second Prize each).
- **Two-Phase Selection**: Preliminary Round (Online idea & abstract review) ➔ Final Round (Shortlisted teams for the 24-hour on-campus hackathon at KLS GIT Belagavi).
- **200+ Premier Institutions**: Builders from across India competing under independent evaluation rubrics.

---

## 🚀 Features & Aesthetics

- 🌐 **Interactive Three.js 3D Earth Globe**: Real-time canvas globe rendering continents, orbital communication arcs, customizable rotation speed, and atmospheric shader glow.
- ⏱️ **HUD Telemetry & Live Countdown**: Real-time launch counter down to the second with terminal-style controls and telemetry indicators.
- 🌌 **8 Complete Hackathon Mission Sections**: Hero, About & Constellation, 5 Problem Arenas, 24h Event Timeline, Prizes Podiums & Bounties, Sponsors Alliance, FAQ Accordion, and Mission Control Footer.
- 🎨 **Cosmic & Glassmorphism Aesthetics**: Built with deep space gradients, custom Google Typography (*Space Grotesk, Syne, Inter, JetBrains Mono*), and responsive layouts.
- 🎛️ **Interactive Modals**:
  - **Tracks Modal**: Detailed breakdowns of track challenges, recommended tech stacks, and dedicated bounties.
  - **Registration Modal**: Hacker application and digital boarding pass portal.

---

## 🏆 Hackathon Tracks & Bounties

| Track | Arena & Focus | Tech Stack Highlights | Bounty Pool |
| :--- | :--- | :--- | :---: |
| 🤖 **Autonomous AI & Swarm Intelligence** | Multi-agent autonomous architectures, recursive reasoning, agentic workflows | `LangGraph`, `AutoGPT`, `Claude Tool Use`, `Local LLMs` | **₹15,000** |
| ⛓️ **Decentralized Compute & Cryptography** | Decentralized AI inference, zero-knowledge verifiable ML proofs, GPU grids | `zk-SNARKs`, `Bittensor`, `EigenLayer`, `Distributed GPU` | **₹12,000** |
| 🥽 **Spatial Computing & Next-Gen Interfaces** | Human-machine synthesis, WebXR spatial computing, 3D generative rendering | `Three.js`, `WebGPU`, `Vision Pro`, `NeRFs` | **₹10,000** |
| 📡 **Intelligent Edge & Neural Hardware** | Quantized models on robotics, microcontrollers, ambient IoT sensors | `ESP32`, `TinyML`, `Rust`, `WebAssembly` | **₹8,000** |
| 🚀 **Open Innovation & Wildcard Moonshots** | High-ambition projects: climate intelligence, synthetic bio, quantum simulations | `Open-Source`, `Moonshot`, `Zero-to-One` | **₹5,000** |

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) with custom typography and color tokens
- **3D Graphics & Canvas**: [Three.js](https://threejs.org/) + [@splinetool/react-spline](https://spline.design/)
- **Icons & Micro-interactions**: [Lucide React](https://lucide.dev/) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📁 Project Structure

```text
INNOVERCE/
├── public/                 # Static assets (3D textures, logos, astronaut assets)
├── src/
│   ├── assets/             # Bundled visual assets & images
│   ├── components/
│   │   ├── AboutConstellation3D.jsx   # 3D interactive node constellation canvas
│   │   ├── AboutSection.jsx           # Ecosystem metrics, prizes, & highlights
│   │   ├── CosmicBackground.jsx       # Dynamic starfield background simulation
│   │   ├── FaqSection.jsx             # Comprehensive mission FAQ accordion
│   │   ├── Footer.jsx                 # Mission control footer & venue telemetry
│   │   ├── HeroSection.jsx            # Main hero with 3D Globe, title, and countdown
│   │   ├── Navbar.jsx                 # Glassmorphic top navigation with telemetry
│   │   ├── Preloader.jsx              # Audio-visual boot sequence preloader
│   │   ├── PrizesSection.jsx          # Podium awards, ₹50k prize pool & bounties
│   │   ├── RegisterModal.jsx          # Hacker onboarding & boarding pass modal
│   │   ├── SponsorsSection.jsx        # Cloud partners, compute grants & alliance
│   │   ├── ThreeEarthGlobe.jsx        # Three.js photorealistic Earth globe with arcs
│   │   ├── TimelineSection.jsx        # 24-hour event timeline & mission roadmap
│   │   ├── TracksModal.jsx            # 5 track challenge modal with bounty details
│   │   └── TracksSection.jsx          # Dedicated interactive 5 mission problem arenas
│   ├── App.css
│   ├── App.jsx             # Top-level state and layout container
│   ├── index.css           # Tailwind v4 import & custom font configurations
│   └── main.jsx            # Application entry point
├── index.html              # HTML shell with Google Fonts and meta tags
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration with Tailwind CSS plugin
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher recommended
- **npm** / **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adi-200409/INNOVERCE.git
   cd INNOVERCE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds optimized production bundle in the `dist/` directory. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs `oxlint` to perform ultra-fast static analysis and linting. |

---

## 🛡️ License & Acknowledgements

Created with ❤️ for the national developer community participating in **INNOVERSE 3.0**.
All rights reserved.
