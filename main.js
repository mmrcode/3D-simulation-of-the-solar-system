/*
  Solar System Simulation - Frontend Assignment
  Name: Mohammad Muqsit Raja
  Date: 04-07-2025
  Description: 3D Solar System using Three.js (with speed controls, pause/resume, dark/light mode)
*/

// List of planets (name, color, size, distance, speed)
const PLANETS = [
  { name: 'Mercury', color: 0xb1b1b1, size: 0.38, distance: 12, speed: 4.8 },
  { name: 'Venus',   color: 0xeedc82, size: 0.95, distance: 16, speed: 3.5 },
  { name: 'Earth',   color: 0x3d9be9, size: 1,    distance: 22, speed: 2.98 },
  { name: 'Mars',    color: 0xc1440e, size: 0.53, distance: 28, speed: 2.41 },
  { name: 'Jupiter', color: 0xe3c07b, size: 11.2, distance: 36, speed: 1.31 },
  { name: 'Saturn',  color: 0xf7e7b6, size: 9.45, distance: 46, speed: 0.97 },
  { name: 'Uranus',  color: 0x7fffd4, size: 4,    distance: 56, speed: 0.68 },
  { name: 'Neptune', color: 0x4166f5, size: 3.88, distance: 66, speed: 0.54 },
];

const SUN = { size: 3.5, color: 0xffd700 };

// Some global variables (not the best practice, but easier for a small project)
let scene, camera, renderer, clock;
let planetObjs = [], planetData = [];
let isPaused = false;
let animationId = null;
let isLightMode = false;

// Initialize everything
function init() {
  // Set up the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101014); // dark bg

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 30, 60);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Lighting (Sun is the light source)
  const sunLight = new THREE.PointLight(0xffffff, 2, 200);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // Sun (just a yellow sphere)
  const sunGeo = new THREE.SphereGeometry(SUN.size, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({ color: SUN.color });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sunMesh);

  // Planets
  PLANETS.forEach((planet, i) => {
    // NOTE: All planets are just colored spheres, not textured
    const geo = new THREE.SphereGeometry(planet.size, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color: planet.color });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    planetObjs.push(mesh);
    planetData.push({
      angle: Math.random() * Math.PI * 2, // random start
      speed: planet.speed / 100, // scale for animation
      baseSpeed: planet.speed / 100,
      distance: planet.distance,
      size: planet.size,
    });
  });

  createSpeedControls();

  clock = new THREE.Clock();

  window.addEventListener('resize', onWindowResize);

  // Debug
  console.log('Scene initialized!');
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
  // TODO: Maybe make canvas fill more of the screen on mobile?
}

// Animation loop
function animate() {
  if (isPaused) return;
  animationId = requestAnimationFrame(animate);
  const delta = clock.getDelta();

  // Move each planet
  planetObjs.forEach((mesh, i) => {
    const data = planetData[i];
    data.angle += data.speed * delta * 2 * Math.PI; // full orbit
    const x = Math.cos(data.angle) * data.distance;
    const z = Math.sin(data.angle) * data.distance;
    mesh.position.set(x, 0, z);
    mesh.rotation.y += 0.01; // self-rotation
  });

  renderer.render(scene, camera);
}

// Create the speed sliders for each planet
function createSpeedControls() {
  const controlsDiv = document.getElementById('controls');
  PLANETS.forEach((planet, i) => {
    const group = document.createElement('div');
    group.className = 'control-group';
    const label = document.createElement('label');
    label.textContent = planet.name + ' Speed';
    label.setAttribute('for', 'speed-' + i);
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0.1';
    input.max = '2.0';
    input.step = '0.01';
    input.value = planetData[i] ? planetData[i].speed : planet.speed / 100;
    input.id = 'speed-' + i;
    input.addEventListener('input', (e) => {
      planetData[i].speed = parseFloat(e.target.value);
      // Debug: print new speed
      console.log(planet.name + ' speed:', planetData[i].speed);
    });
    group.appendChild(label);
    group.appendChild(input);
    controlsDiv.appendChild(group);
  });
}

// Pause/Resume animation
function pauseResumeHandler() {
  const btn = document.getElementById('pause-btn');
  isPaused = !isPaused;
  if (isPaused) {
    btn.textContent = 'Resume';
    if (animationId) cancelAnimationFrame(animationId);
    // NOTE: Animation is paused
    console.log('Animation paused');
  } else {
    btn.textContent = 'Pause';
    animate();
    console.log('Animation resumed');
  }
}

// Toggle dark/light mode
function themeToggleHandler() {
  const btn = document.getElementById('theme-toggle');
  isLightMode = !isLightMode;
  document.body.classList.toggle('light-mode', isLightMode);
  btn.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
  if (scene) {
    scene.background = new THREE.Color(isLightMode ? 0xe6e6e6 : 0x101014);
  }
  // TODO: Maybe change planet colors for light mode?
}

// Entry point
window.onload = () => {
  init();
  animate();
  document.getElementById('pause-btn').onclick = pauseResumeHandler;
  document.getElementById('theme-toggle').onclick = themeToggleHandler;
  // NOTE: All set up!
}; 