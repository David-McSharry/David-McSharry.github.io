var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initCube();
    initCamera();
    initRenderer();

    let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

// Initialize event listeners
function initEventListeners() {
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
}

// Event listener for when the mouse button is pressed down
function onDocumentMouseDown(event) {
  event.preventDefault();
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

// Event listener for when the mouse button is released
function onDocumentMouseUp(event) {
  event.preventDefault();
  isDragging = false;
}

// Event listener for when the mouse is moved
function onDocumentMouseMove(event) {
  event.preventDefault();
  if (isDragging) {
    let deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };

    // Update the rotation of the cube based on the cursor movement
    cube.rotation.y += deltaMove.x * 0.01;
    cube.rotation.x += deltaMove.y * 0.01;

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }
}

// Call the initEventListeners function
initEventListeners();


    document.body.appendChild(renderer.domElement);

}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initCube() {
    cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
    scene.add(cube);
}

function rotateCube() {
    cube.rotation.x -= SPEED;
    cube.rotation.y -= SPEED;
    cube.rotation.y -= SPEED;
}

function render() {
    requestAnimationFrame(render);
    rotateCube();
    renderer.render(scene, camera);
}

init();
render();