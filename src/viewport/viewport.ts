import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitController } from "./cameraControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = "char-viewport";
document.body.appendChild( renderer.domElement );

const gltfLoader = new GLTFLoader();
gltfLoader.load("src/assets/model.gltf",
    (obj) => {
        //rotates the model so that it faces the viewer;
        obj.scene.rotateY(Math.PI);
        scene.add(obj.scene);
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log(error);
    }
)
// objLoader.load("src/assets/model.obj", 
//     (obj) => {
//         const texture = textureLoader.load("src/assets/steve.png");
//         const material = new THREE.MeshBasicMaterial({
//             map: texture
//         })

//         obj.traverse((child) => {
//             if (child instanceof THREE.Mesh) {
//                 child.material = material;
//             }
//         })

//         obj.updateMatrixWorld();
//         scene.add( obj );
//     },
//     // called when loading is in progress
    
// )


const light = new THREE.AmbientLight(0x404040, 50);
scene.add(light);

camera.position.z = 3;
camera.position.y = 5;

const cameraController = new OrbitController(camera, 5, new THREE.Vector3(0, 1, 0), 0.8726);

function animate() {
  renderer.render( scene, camera );

  cameraController.update();
}

renderer.setAnimationLoop( animate );