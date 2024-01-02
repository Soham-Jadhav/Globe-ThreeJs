import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
// console.log(vertexShader);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Create a sphere
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
// const material = new THREE.MeshBasicMaterial({ 
//   // color: 0xff0000, 
//   map: new THREE.TextureLoader().load('./assets/globe.jpg'),
// });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Shift camera position from center
camera.position.z = 15;

let animationId;

function animate() {
  animationId = requestAnimationFrame(animate);

  // renderer.setSize(innerWidth, innerHeight);
  renderer.render(scene, camera);
}

animate();