import * as THREE from 'three';
import "./app.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
//Scene
//Creating a new 3d Scene. Like a project in Blender
const scene = new THREE.Scene();
//Creating the geometry
//Creating a new Capsule 
const geometry = new THREE.CapsuleGeometry(1,1,8,16);
//Every Mesh needs a material
const material = new THREE.MeshBasicMaterial({color: "#3ca345" });
//Adding the mesh and material into one object.
const capsule = new THREE.Mesh(geometry, material);
//Adding the capsule to the scene
scene.add(capsule);
//Adding a light
const light = new THREE.PointLight(
  //takes in color, intensity and light falloff
  0xffffff, 1, 100
)
//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
light.position.set(0,10,10)
scene.add(light)
//Camera
const camera = new THREE.PerspectiveCamera(
  //Takes in FOV, Aspect Ration,  
  45, sizes.width / sizes.height);
//when the scene first loads, the camera and object are stacked
//So you need to reposition the camera before startup
camera.position.z = 5
scene.add(camera)



//Renderer
const canvas = document.querySelector('.webgl')



const render = new THREE.WebGL1Renderer({canvas})
render.setSize(sizes.width,sizes.height)
render.render(scene,camera)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
//Resize 
window.addEventListener('resize',() => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update Camera
  camera.aspect = sizes.width / sizes.height; 
  camera.updateProjectionMatrix()
  render.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  render.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop()