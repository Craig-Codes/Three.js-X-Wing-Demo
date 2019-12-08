/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-use-before-define
// sets up scene, camera , lighting and loads 3d object (and objects to click within object!)

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x111111); // simple color, not needed
backgroundLoader = new THREE.TextureLoader();
backgroundLoader.setCrossOrigin("");
bgTexture = backgroundLoader.load(
  "/Three.js-X-Wing-Demo/images/star-sky-background.jpg",
  texture => {
    const img = texture.image;
    bgWidth = img.width;
    bgHeight = img.height;
  }
);
scene.background = bgTexture;

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 1100;
camera.position.y = 20;
camera.position.z = 1000;

const hlight = new THREE.AmbientLight(0x404040, 6); // soft white light
scene.add(hlight);
directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 1, 0); // sets from above
directionalLight.castShadow = true;

const light = new THREE.PointLight(0xffffff, 1);
directionalLight.position.set(100, 1000, 100); // sets from above
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // anti-aliasing makes it look better!
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // element created by the renderer is added to html body

const controls = new THREE.OrbitControls(camera, renderer.domElement); // Needed for Orbital controls to work

const xwingLoader = new THREE.GLTFLoader(); // loads in the loader file
xwingLoader.load("scene.gltf", gltf => {
  const xwing = gltf.scene.children[0]; // get the 3d model
  xwing.scale.set(7, 7, 7); // reduce model size by half
  scene.add(gltf.scene);
});

const yodaLoader = new THREE.GLTFLoader(); // loads in the loader file
yodaLoader.load("/Three.js-X-Wing-Demo/yoda/scene.gltf", gltf => {
  const yoda = gltf.scene.children[0]; // get the 3d model
  yoda.scale.set(10, 10, 10); // reduce model size by half
  console.log(yoda);
  yoda.position.z -= 175;
  yoda.position.y += 45;
  yoda.visible = false;
  yoda.name = "yoda";
  scene.add(gltf.scene);
});

// cube creation:
const xwingObjects = [];

const geometryR2d2 = new THREE.BoxGeometry(50, 50, 50); // skelleton of the object
const geometryThrust = new THREE.BoxGeometry(50, 50, 200); // skelleton of the object
const geometryCockpit = new THREE.BoxGeometry(50, 30, 80); // skelleton of the object
const geometryCannons = new THREE.BoxGeometry(27, 30, 350);
const geometryNose = new THREE.BoxGeometry(45, 45, 70);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Skin of the object
material.transparent = true;
material.opacity = 0; // opacity used for when setting up the mesh locations so that the boxes can be seen

const r2d2Cube = new THREE.Mesh(geometryR2d2, material);
scene.add(r2d2Cube); // cube is created and added to the scene
r2d2Cube.name = "r2d2Cube";
xwingObjects.push(r2d2Cube); // push into an array used by raycaster
r2d2Cube.position.y += 50;
r2d2Cube.position.z -= 90;

const thrusterOne = new THREE.Mesh(geometryThrust, material);
scene.add(thrusterOne);
thrusterOne.name = "thrusterOne";
xwingObjects.push(thrusterOne);
thrusterOne.position.y += 45;
thrusterOne.position.z -= 200;
thrusterOne.position.x -= 70;

const thrusterTwo = new THREE.Mesh(geometryThrust, material);
thrusterTwo.name = "thrusterTwo";
xwingObjects.push(thrusterTwo);
thrusterTwo.position.y += 45;
thrusterTwo.position.z -= 200;
thrusterTwo.position.x += 70;
scene.add(thrusterTwo);

const thrusterThree = new THREE.Mesh(geometryThrust, material);
thrusterThree.name = "thrusterThree";
xwingObjects.push(thrusterThree);
thrusterThree.position.y -= 42;
thrusterThree.position.z -= 200;
thrusterThree.position.x += 70;
scene.add(thrusterThree);

const thrusterFour = new THREE.Mesh(geometryThrust, material);
thrusterFour.name = "thrusterFour";
xwingObjects.push(thrusterFour);
thrusterFour.position.y -= 42;
thrusterFour.position.z -= 200;
thrusterFour.position.x -= 70;
scene.add(thrusterFour);

const cockpit = new THREE.Mesh(geometryCockpit, material);
cockpit.name = "cockpit";
xwingObjects.push(cockpit);
cockpit.position.y += 45;
cockpit.position.z -= 10;
scene.add(cockpit);

const cannonOne = new THREE.Mesh(geometryCannons, material);
cannonOne.name = "cannonOne";
xwingObjects.push(cannonOne);
cannonOne.position.y += 90;
cannonOne.position.z -= 72;
cannonOne.position.x -= 246;
scene.add(cannonOne);

const cannonTwo = new THREE.Mesh(geometryCannons, material);
cannonTwo.name = "cannonTwo";
xwingObjects.push(cannonTwo);
cannonTwo.position.y += 90;
cannonTwo.position.z -= 72;
cannonTwo.position.x += 246;
scene.add(cannonTwo);

const cannonThree = new THREE.Mesh(geometryCannons, material);
cannonThree.name = "cannonThree";
xwingObjects.push(cannonThree);
cannonThree.position.y -= 90;
cannonThree.position.z -= 72;
cannonThree.position.x += 246;
scene.add(cannonThree);

const cannonFour = new THREE.Mesh(geometryCannons, material);
cannonFour.name = "cannonFour";
xwingObjects.push(cannonFour);
cannonFour.position.y -= 90;
cannonFour.position.z -= 72;
cannonFour.position.x -= 246;
scene.add(cannonFour);

const noseCone = new THREE.Mesh(geometryNose, material);
noseCone.name = "noseCone";
xwingObjects.push(noseCone);
noseCone.position.y += 10;
noseCone.position.z += 250;
scene.add(noseCone);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



function onDocumentTouchStart(event) {
  event.preventDefault();

  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown(event);
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(xwingObjects); // Intersects is an array of objects hit by the ray caster
  if (intersects.length === 0) {
    intersects[0] = {}; // just setting up an empty object to avoid errors
    intersects[0].object = {}; // setting up an object within the object to avoid errors
    intersects[0].object.name = "placeholder"; // giving empty object a  name to avoid errors
  }

  if (intersects[0].object.name === "r2d2Cube") {
    console.log("R2D2");
    document.getElementById("component").innerHTML =
      "Astromech Droid - Navigation / Repair system";
  }
  if (
    intersects[0].object.name === "thrusterOne" ||
    intersects[0].object.name === "thrusterTwo" ||
    intersects[0].object.name === "thrusterThree" ||
    intersects[0].object.name === "thrusterFour"
  ) {
    console.log("Thruster");
    document.getElementById("component").innerHTML =
      "Engines - 4 x Incom 4L4 Fusail Thrusters";
  }
  if (intersects[0].object.name === "cockpit") {
    console.log("cockpit");
    document.getElementById("component").innerHTML =
      "Cockpit - houses pilot, ejector seat, life-support system, and comms equipment";
  }
  if (
    intersects[0].object.name === "cannonOne" ||
    intersects[0].object.name === "cannonTwo" ||
    intersects[0].object.name === "cannonThree" ||
    intersects[0].object.name === "cannonFour"
  ) {
    console.log("cannon");
    document.getElementById("component").innerHTML =
      "Armament - 4 x Taim and Bak KX9 Laser Cannons";
  }
  if (intersects[0].object.name === "noseCone") {
    console.log("noseCone");
    document.getElementById("component").innerHTML =
      "Nose Cone - houses sensor and targeting systems (for when the force isn't being used)";
  }
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

const rebelButton = document.getElementsByTagName("img"); // returns an array of elements
rebelButton[0].addEventListener("click", yodaReveal);

function yodaReveal() {
  if (scene.children[13].children[0].visible) {
    scene.children[13].children[0].visible = false;
  } else {
    scene.children[13].children[0].visible = true; // makes yoda visible on x-wing
  }
}

// function to check if mouse should be a pointer (pointer when over an interactive object)
 function onMouseMove(){
   console.log("mouse is moving");
   mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(xwingObjects); 
   
   if(intersects.length > 0){
     $('html,body').css('cursor','pointer');//mouse cursor change
   } else {
       $('html,body').css('cursor','cursor');
     }
   }

document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("touchstart", onDocumentTouchStart, false); // enables on mobile / touch devices
window.addEventListener("mousemove", onMouseMove);

animate(); // animation loop to keep updating scene
