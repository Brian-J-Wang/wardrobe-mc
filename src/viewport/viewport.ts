import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitController } from "./cameraControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
mtlLoader.load('assets/model.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load("assets/model.obj", 
        (obj) => {
            console.log("scene loaded");
            scene.add( obj );
        },
        // called when loading is in progress
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    )
});


camera.position.z = 50;
camera.position.y = 2;

const cameraController = new OrbitController(camera, 5, new THREE.Vector3(0, 1, 0), 50);

function animate() {
  renderer.render( scene, camera );

  cameraController.update();
}

renderer.setAnimationLoop( animate );