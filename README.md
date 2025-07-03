# 3D Solar System Simulation (Three.js Assignment)

---
Student: Mohammmad Muqsit Raja
Date: 04/07/2025
---
[![View Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=github)](https://mmrcode.github.io/3D-simulation-of-the-solar-system/)

## Features
- 3D simulation of the solar system using Three.js
- Sun at the center, 8 planets orbiting with realistic distances and speeds
- Each planet rotates and orbits the Sun
- Realistic lighting and camera
- Responsive, mobile-friendly layout
- Control panel to adjust the orbital speed of each planet in real-time
- **Pause/Resume** button to stop and resume the animation
- **Dark/Light mode toggle** for UI and 3D scene

## How to Run
1. Download or clone this repository.
2. Open `index.html` in any modern web browser (no build step required).

## Usage
- **Pause/Resume:** Click the "Pause" button to stop the animation. Click "Resume" to continue.
- **Dark/Light Mode:** Click the "Light Mode" button to switch to a light theme. Click "Dark Mode" to switch back.
- **Speed Controls:** Use the sliders to adjust the orbital speed of each planet in real-time.

## File Structure
- `index.html` – Main HTML file, includes Three.js, sets up the layout and containers
- `style.css` – Styles for layout, controls, responsiveness, and theme switching
- `main.js` – All Three.js logic: scene setup, planets, animation, speed controls, pause/resume, and theme toggle
- `README.md` – This file

## Code Overview
- **Three.js** is used to create the 3D scene, Sun, and planets.
- Each planet is a sphere with its own color, size, distance, and speed.
- The animation loop updates each planet's position and rotation.
- The control panel is generated dynamically and allows real-time speed adjustment for each planet.
- Pause/Resume and Dark/Light mode features are implemented with plain JavaScript.

## Notes / TODOs
- I used spheres for all planets (no textures, just colors)
- The orbits are not shown visually (could add circles for orbits as a bonus)
- Might add background stars or labels if I have time
- If you resize the window, the canvas should adjust (but let me know if it looks weird!)

## Requirements
- Modern browser (Chrome, Firefox, Edge, Safari)
- No build tools or server required

---

**Demo Video**: See the attached video for a walkthrough and demonstration. 

Subject line: Frontend Assignment – Mohammad Muqsit Raja 
