import MouseLookController from './MouseLookController.js';
import {Renderer, Scene, Node, Mesh, Primitive, PerspectiveCamera, vec4, vec3, CubeMapMaterial, Light} from '../lib/engine/index.js';
import PhongMaterial from '../lib/engine/src/materials/PhongMaterial.js';
import {BasicMaterial} from "../lib/engine";

// Create a Renderer and append the canvas element to the DOM.
let renderer = new Renderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let time = 0.001;

// A scenegraph consists of a top-level Node, called Scene and an arbitrary number of nodes forming a DAG.
const scene = new Scene();

// We load some textures and instantiate materials from them:
const sunTexture = renderer.loadTexture('resources/sun.jpg');
const earthTexture = renderer.loadTexture('resources/earth_daymap.jpg');
const moonTexture = renderer.loadTexture('resources/moon.jpg');
const mercuryTexture = renderer.loadTexture('resources/mercury_daymap.jpg');
const marsTexture = renderer.loadTexture('resources/mars.jpg');
const jupiterTexture = renderer.loadTexture('resources/jupiter.jpg');



const light = new Light(
{
    ambient: vec4.fromValues(0.2, 0.2, 0.2, 1.0), // Svak generell belysning i scenen
    diffuse: vec4.fromValues(1.0, 1.0, 1.0, 1.0), // Diffust lys som sprer seg jevnt
    specular:vec4.fromValues(1.0, 1.0, 1.0, 1.0) // Sterkt speilreflekterende lys
});

scene.add(light);


const sunMaterial = new BasicMaterial({
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    ambient: vec4.fromValues(0.5, 0.5, 0.5, 1.0),
    specular: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    shininess: 32.0,
    map: sunTexture,
    lightAmbient: light.ambient,
    lightDiffuse: light.diffuse,
    lightSpecular: light.specular
});

const earthMaterial = new PhongMaterial({
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    ambient: vec4.fromValues(0.5, 0.5, 0.5, 1.0),
    specular: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    shininess: 32.0,
    map: earthTexture,
    lightAmbient: light.ambient,
    lightDiffuse: light.diffuse,
    lightSpecular: light.specular
});

const moonMaterial = new PhongMaterial({
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    ambient: vec4.fromValues(0.3, 0.3, 0.3, 1.0),
    specular: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    shininess: 32.0,
    map: moonTexture,
    lightAmbient: light.ambient,
    lightDiffuse: light.diffuse,
    lightSpecular: light.specular
});

const mercuryMaterial = new PhongMaterial({
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    ambient: vec4.fromValues(0.5, 0.5, 0.5, 1.0),
    specular: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    shininess: 32.0,
    map: mercuryTexture,
    lightAmbient: light.ambient,
    lightDiffuse: light.diffuse,
    lightSpecular: light.specular
});

const marsMaterial = new PhongMaterial({
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    ambient: vec4.fromValues(0.5, 0.5, 0.5, 1.0),
    specular: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    shininess: 32.0,
    map: marsTexture,
    lightAmbient: light.ambient,
    lightDiffuse: light.diffuse,
    lightSpecular: light.specular
});

const jupiterMaterial = new PhongMaterial({
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    ambient: vec4.fromValues(0.5, 0.5, 0.5, 1.0),
    specular: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    shininess: 32.0,
    map: jupiterTexture,
    lightAmbient: light.ambient,
    lightDiffuse: light.diffuse,
    lightSpecular: light.specular
});

// A Primitive consists of geometry and a material.
// We create a sphere Primitive using the static method 'createSphere'.
// The generated geometry is called a UV-sphere and it has 32 vertical and horizontal subdivisions (latitude and longitude).
// Additionally, we specify that we want the Primitive to be drawn with sunMaterial.
const sunPrimitive = Primitive.createSphere(sunMaterial, 32, 32);
// A Primitive is only drawn as part of a Mesh,
// so we instantiate a new Mesh with the sunPrimitive.
// (A Mesh can consist of multiple Primitives. )
const sun = new Mesh([sunPrimitive]);

const mercuryPrimitive = Primitive.from(sunPrimitive, mercuryMaterial);
const earthPrimitive = Primitive.from(sunPrimitive, earthMaterial);
const moonPrimitive = Primitive.from(sunPrimitive, moonMaterial);
const marsPrimitive = Primitive.from(sunPrimitive, marsMaterial);
const jupiterPrimitive = Primitive.from(sunPrimitive, jupiterMaterial);

// Finally, we add the sun to our scene.
// Only meshes that have been added to our scene, either as a child or as a descendant, will be drawn.
scene.add(sun);

// Next we create a Node that represents the Earths orbit.
// This node is not translated at all, because we want it to be centered inside the sun.
// It is however rotated in the update-loop at starting at line 215.

const mercuryOrbitNode = new Node(scene);
const earthOrbitNode = new Node(scene);
const marsOrbitNode = new Node(scene);
const jupiterOrbitNode = new Node(scene)


// This node represents the center of the earth.

const mercuryCenterNode = new Node(mercuryOrbitNode);

const earthCenterNode = new Node(earthOrbitNode);
const moonOrbitNode = new Node(earthCenterNode);
const moonCenterNode = new Node(moonOrbitNode);

const marsCenterNode = new Node(marsOrbitNode);
const jupiterCenterNode = new Node(jupiterOrbitNode);




// We translate it along the x-axis to a suitable position.
// When the earthOrbitNode is rotated, this node will orbit about the center of the sun.

//                  SUN
mercuryCenterNode.setTranslation(1.45, 0, 0);

earthCenterNode.setTranslation(11.45, 0, 0);
moonCenterNode.setTranslation(1.45,0,0)

marsCenterNode.setTranslation(14.45,0,0)
jupiterOrbitNode.setTranslation(77.8,0,0)


// Create a new Mesh for the Planets & moons.
const mercury = new Mesh([mercuryPrimitive]);

const earth = new Mesh([earthPrimitive]);
const moon = new Mesh([moonPrimitive]);

const mars = new Mesh([marsPrimitive]);
const jupiter = new Mesh([jupiterPrimitive])
// We add it to the earthCenterNode, so that it orbits around the sun.
mercuryCenterNode.add(mercury);

earthCenterNode.add(earth);
moonCenterNode.add(moon);

marsCenterNode.add(mars);
jupiterCenterNode.add(jupiter);
// True scale: earth.setScale(0.0091, 0.0091, 0.0091);
mercury.setScale(0.031, 0.031, 0.031);

earth.setScale(0.091, 0.091, 0.091); // 10 times larger than irl
moon.setScale(0.051,0.051,0.051);

mars.setScale(0.140, 0.140, 0.141);
jupiter.setScale(0.439,0.439,0.439)


// We create a Node representing movement, in order to decouple camera rotation.
// We do this so that the skybox follows the movement, but not the rotation of the camera.
const player = new Node();

let skyBoxMaterial = new CubeMapMaterial({
    map: renderer.loadCubeMap([
        'resources/skybox/right.png',
        'resources/skybox/left.png',
        'resources/skybox/top.png',
        'resources/skybox/bottom.png',
        'resources/skybox/front.png',
        'resources/skybox/back.png'
    ])
});

let skyBoxPrimitive = Primitive.createCube(skyBoxMaterial, true); // Second argument tells the createBox function to invert the faces and normals of the box.

let skyBox = new Mesh([skyBoxPrimitive]);
skyBox.setScale(1500, 1500, 1500);

// Attaching the skybox to the player gives the illusion that it is infinitely far away.
player.add(skyBox);

// We create a PerspectiveCamera with a fovy of 70, aspectRatio, and near and far clipping plane.
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.setTranslation(0, 0, 5);

player.add(camera);

scene.add(player);

// We need to update some properties in the camera and renderer if the window is resized.
window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);


// We create a MouseLookController to enable controlling camera pitch and yaw with mouse input.
const mouseLookController = new MouseLookController(camera);

// We attach a click lister to the canvas-element so that we can request a pointer lock.
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
const canvas = renderer.domElement;
canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
});

let yaw = 0;
let pitch = 0;
function updateCamRotation(event) {
    // Add mouse movement to the pitch and yaw variables so that we can update the camera rotation in the loop below.
    yaw -= event.movementX * 0.001;
    pitch -= event.movementY * 0.001;
}

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
        canvas.addEventListener('mousemove', updateCamRotation, false);
    } else {
        canvas.removeEventListener('mousemove', updateCamRotation, false);
    }
});


let move = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    speed: 0.05
};

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === 'KeyW') {
        move.forward = true;
    } else if (e.code === 'KeyS') {
        move.backward = true;
    } else if (e.code === 'KeyA') {
        move.left = true;
    } else if (e.code === 'KeyD') {
        move.right = true;
    } else if (e.code === 'ArrowUp') {
        time = Math.min(time * 1.05, 10);
    } else if (e.code === 'ArrowDown') {
        time = Math.max(0.000001, time * 0.95);
    }
});

window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.code === 'KeyW') {
        move.forward = false;
    } else if (e.code === 'KeyS') {
        move.backward = false;
    } else if (e.code === 'KeyA') {
        move.left = false;
    } else if (e.code === 'KeyD') {
        move.right = false;
    }
});

// We create a vec to hold the players velocity (this way we avoid allocating a new one every frame).
const velocity = vec3.fromValues(0.0, 0.0, 0.0);

const TICK_RATE = 1000 / 60; // 60 fps is the reference Hz.

let then = 0;
function loop(now) {

    let delta = now - then;
    then = now;

    const deltaCorrection = (delta / TICK_RATE); // The deviation factor from the targeted TICK_RATE of 60 Hz

    const moveSpeed = move.speed * deltaCorrection;

    // Reduce accumulated velocity by 25% each frame.
    vec3.scale(velocity, velocity, 0.75);
    //vec3.set(velocity, 0.0, 0.0, 0.0); // (Alternatively remove it completely, feels more responsive?)

    if (move.left) {
        velocity[0] -= moveSpeed;
    }

    if (move.right) {
        velocity[0] += moveSpeed;
    }

    if (move.forward) {
        velocity[2] -= moveSpeed;
    }

    if (move.backward) {
        velocity[2] += moveSpeed;
    }

    // Given the accumulated mouse movement this frame, use the mouse look controller to calculate the new rotation of the camera.
    mouseLookController.update(pitch, yaw);

    // Camera rotation is represented as a quaternion.
    // We rotate the velocity vector based the cameras rotation in order to translate along the direction we're looking.
    const translation = vec3.transformQuat(vec3.create(), velocity, camera.rotation);
    player.applyTranslation(...translation);

    // Animate bodies:
    const orbitalRotationFactor = time * deltaCorrection; // The amount the earth rotates about the sun every tick.
    earthOrbitNode.rotateY(orbitalRotationFactor);
    moonOrbitNode.rotateY(orbitalRotationFactor*12);
    mercuryOrbitNode.rotateY(orbitalRotationFactor*3);
    marsOrbitNode.rotateY(orbitalRotationFactor/2);
    jupiterOrbitNode.rotateY(orbitalRotationFactor);


    jupiter.rotateY(orbitalRotationFactor*4330);
    mars.rotateY(orbitalRotationFactor *365)

    earth.rotateY(orbitalRotationFactor * 365); // The Earth rotates approx. 365 times per year.
    moon.rotateY(orbitalRotationFactor * 12);

    mercury.rotateY(orbitalRotationFactor * 88)
    sun.rotateY(orbitalRotationFactor * 25); // The Sun rotates approx. 25 times per year.

    // Reset mouse movement accumulator every frame.
    yaw = 0;
    pitch = 0;

    // Update the world matrices of the entire scene graph.
    scene.update();

    // Render the scene.
    renderer.render(scene, camera);

    // Ask the the browser to draw when it's convenient
    window.requestAnimationFrame(loop);

}

window.requestAnimationFrame(loop);