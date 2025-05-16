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
objLoader.load("src/assets/model.obj", 
    (obj) => {
        obj.updateMatrixWorld();
        scene.add( obj );

        const box = new THREE.Box3().setFromObject(obj);
        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());
        console.log(boxSize);
        console.log(boxCenter);
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

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

camera.position.z = 10;
camera.position.y = 5;

const cameraController = new OrbitController(camera, 5, new THREE.Vector3(0, 1, 0), 50);

function animate() {
  renderer.render( scene, camera );

  cameraController.update();
}

renderer.setAnimationLoop( animate );