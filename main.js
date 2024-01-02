import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

const canvasDiv = document.getElementById('canvasDiv');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  canvasDiv.offsetWidth / canvasDiv.offsetHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('canvas'),
});
renderer.setSize(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
renderer.setPixelRatio(devicePixelRatio);

// Create a sphere
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load('./assets/globe.jpg'),
    },
  },
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);
atmosphere.scale.set(1.2, 1.2, 1.2);
scene.add(atmosphere);

// Create group (like scene)
const group = new THREE.Group();
group.add(sphere);
scene.add(group);

// Create starfield
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;

  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


// Shift camera position from center
camera.position.z = 15;

let mouse = {
  x: 0,
  y: 0,
};
let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);

  renderer.render(scene, camera);

  // Rotate starfield
  stars.rotation.y -= 0.0001;
  stars.rotation.z -= 0.0001;

  // Rotate globe
  sphere.rotation.y += 0.0015;
  gsap.to(group.rotation, {
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2,
  });
}

animate();

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 - 1;
})