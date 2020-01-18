// Three.js requires a Scene, Camera and Renderer.

const scene = new THREE.Scene(); // Three.js scene is the canvas for all 3D objects
// scene.background = new THREE.Color(0x111111); // simple color, not needed
backgroundLoader = new THREE.TextureLoader(); // Used to Load in a background image rather than just a plain background
backgroundLoader.setCrossOrigin("");
bgTexture = backgroundLoader.load(
  "images/star-sky-background.jpg",
  texture => {
    const img = texture.image;
    bgWidth = img.width;
    bgHeight = img.height;
  }
);
scene.background = bgTexture;

const camera = new THREE.PerspectiveCamera( // Camera setup is always required
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.rotation.y = (45 / 180) * Math.PI; // Sets up camera position
camera.position.x = 1100;
camera.position.y = 20;
camera.position.z = 1000;

const hlight = new THREE.AmbientLight(0x404040, 6); // sets up scene lighting. Ambient Light effects all objects
scene.add(hlight);
directionalLight = new THREE.DirectionalLight(0xffffff, 10); // Directional light highlights certain objects.
directionalLight.position.set(0, 1, 0); // sets directional light to be from the top down to cast shadows correctly
directionalLight.castShadow = true;

const light = new THREE.PointLight(0xffffff, 1);
directionalLight.position.set(100, 1000, 100); // sets from above
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // anti-aliasing makes 3D look better
renderer.setSize(window.innerWidth, window.innerHeight); // Sets the scene size to match browser window
document.body.appendChild(renderer.domElement); // elements created by the renderer added to html body

const controls = new THREE.OrbitControls(camera, renderer.domElement); // Needed for Orbital controls to work

const xwingLoader = new THREE.GLTFLoader();

xwingLoader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {
  const xwing = gltf.scene.children[0]; // Adds the 3D model to gltf.scene.children[0].
  xwing.scale.set(7, 7, 7); // changes the 3D Model size
		scene.add( gltf.scene );

	},
	function ( onStart ) {

		console.log( 'Started Loading' );

	},
	// called while loading is progressing
	function ( onLoad ) {

		console.log( 'completed Loading' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const yodaLoader = new THREE.GLTFLoader(); // loads in the loader file
yodaLoader.load("yoda/scene.gltf", gltf => {
  const yoda = gltf.scene.children[0]; // get the 3d model
  yoda.scale.set(10, 10, 10); // reduce model size by half
  yoda.position.z -= 175;
  yoda.position.y += 45;
  yoda.visible = false;
  yoda.name = "yoda";
  scene.add(gltf.scene);
});

// Three.js loader to track object load progress - moved to the three.js file


// cube creation to act as hotspots which can be clicked on the 3D model:

const xwingObjects = []; // Array to store all boxes once they have been created, used by a raycaster to detect if objects have been selected

const geometryR2d2 = new THREE.BoxGeometry(50, 50, 50); // skeleton of the object, defining its size etc
const geometryThrust = new THREE.BoxGeometry(50, 50, 200);
const geometryCockpit = new THREE.BoxGeometry(50, 30, 80);
const geometryCannons = new THREE.BoxGeometry(27, 30, 350);
const geometryNose = new THREE.BoxGeometry(45, 45, 70);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Skin of the object
material.transparent = true; // required is you want to use an opacity settings on the material color
material.opacity = 0; // opacity used for when setting up the mesh locations so that the boxes can be seen

const r2d2Cube = new THREE.Mesh(geometryR2d2, material);
scene.add(r2d2Cube); // cube is created and added to the scene
r2d2Cube.name = "r2d2Cube"; // cube is named so that it can easily be accessed and referenced
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

const raycaster = new THREE.Raycaster(); // new raycaster setup to identify what is being clicked.
const mouse = new THREE.Vector2(); // mouse needs setup as a 2D object so that raycaster knows what is being looked at

// Event Listeners
const rebelButton = document.getElementsByTagName("img"); // returns an array of elements
rebelButton[0].addEventListener("click", yodaReveal);
document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("touchstart", onDocumentTouchStart, false); // enables on mobile / touch devices
document.addEventListener("mousemove", onMouseMove);

animate(); // animation loop to keep updating scene

// Function used to allow raycaster to work on touch devices
function onDocumentTouchStart(event) {
  event.preventDefault();
  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown(event);
}

// Function controls what happens when mouse is pressed. Raycaster is used to see if mouse is over the location of a hotspot
function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1; // mouse needs setup based on the screen size so that it is accurate
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(xwingObjects); // Intersects is an array of objects hit by the ray caster
  if (intersects.length === 0) {
    intersects[0] = {}; // just setting up an empty object to avoid errors
    intersects[0].object = {}; // setting up an object within the object to avoid errors
    intersects[0].object.name = "placeholder"; // giving empty object a  name to avoid errors
  }

  // Switch statement controls what happens when each hotspot is pressed
  switch (intersects[0].object.name) {
    case "thrusterOne":
      document.getElementById("component").innerHTML =
        "Engines - 4 x Incom 4L4 Fusail Thrusters";
      break;
    case "thrusterTwo":
      document.getElementById("component").innerHTML =
        "Engines - 4 x Incom 4L4 Fusail Thrusters";
      break;
    case "thrusterThree":
      document.getElementById("component").innerHTML =
        "Engines - 4 x Incom 4L4 Fusail Thrusters";
      break;
    case "thrusterFour":
      document.getElementById("component").innerHTML =
        "Engines - 4 x Incom 4L4 Fusail Thrusters";
      break;
    case "r2d2Cube":
      document.getElementById("component").innerHTML =
        "Astromech Droid - Navigation / Repair system";
      break;
    case "cockpit":
      document.getElementById("component").innerHTML =
        "Cockpit - houses pilot, ejector seat, life-support system, and comms equipment";
      break;
    case "noseCone":
      document.getElementById("component").innerHTML =
        "Nose Cone - houses sensor and targeting systems (for when the force isn't being used)";
      break;
    case "cannonOne":
      document.getElementById("component").innerHTML =
        "Armaments - 4 x Taim and Bak KX9 Laser Cannons";
      break;
    case "cannonTwo":
      document.getElementById("component").innerHTML =
        "Armaments - 4 x Taim and Bak KX9 Laser Cannons";
      break;
    case "cannonThree":
      document.getElementById("component").innerHTML =
        "Armaments - 4 x Taim and Bak KX9 Laser Cannons";
      break;
    case "cannonFour":
      document.getElementById("component").innerHTML =
        "Armaments - 4 x Taim and Bak KX9 Laser Cannons";
      break;
  }
}

// Function sets a recursive animation loop - animate is constantly called to check for three.js scene updates and to keep rendering any changes
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Easter egg - when rebel symbol is clicked, 'The Child' appears on top of X-wing Fighter!
function yodaReveal() {
  if (scene.children[13].children[0].visible) {
    scene.children[13].children[0].visible = false;
  } else {
    scene.children[13].children[0].visible = true;
  }
}

// function to check if mouse should be a pointer (pointer when over an interactive object)
function onMouseMove() {
  mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(xwingObjects);

  if (intersects.length === 0) {
    // Sets up a placeholder to avoid error if no intersects are detected
    intersects[0] = {}; // just setting up an empty object to avoid errors
    intersects[0].object = {}; // setting up an object within the object to avoid errors
    intersects[0].object.name = "placeholder"; // giving empty object a  name to avoid errors
  }

  if (
    intersects[0].object.name === "cannonOne" ||
    intersects[0].object.name === "cannonTwo" ||
    intersects[0].object.name === "cannonThree" ||
    intersects[0].object.name === "cannonFour" ||
    intersects[0].object.name === "r2d2Cube" ||
    intersects[0].object.name === "noseCone" ||
    intersects[0].object.name === "thrusterOne" ||
    intersects[0].object.name === "thrusterTwo" ||
    intersects[0].object.name === "thrusterThree" ||
    intersects[0].object.name === "thrusterFour" ||
    intersects[0].object.name === "cockpit"
  ) {
    $("html,body").css("cursor", "pointer"); // mouse cursor change using jQuery
  } else if (intersects[0].object.name === "placeholder") {
    $("html,body").css("cursor", "default"); // mouse cursor change using jQuery
  }
}
