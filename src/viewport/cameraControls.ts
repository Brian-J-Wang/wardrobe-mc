import * as THREE from "three"
import { PI } from "three/tsl";



export class OrbitController {
    camera: THREE.PerspectiveCamera;
    focalPoint: THREE.Vector3;
    //also mesured in radians
    maxPhiAngle: number;
    minPhiAngle: number;
    //angles are measured in radians
    rho: number;
    theta: number = 0;
    deltaTheta: number = 0;
    phi: number = 0;
    deltaPhi: number = 0;

    constructor(camera: THREE.PerspectiveCamera, radius: number, focalPoint: THREE.Vector3, maxPhiAngle: number) { 
        this.camera = camera;
        this.rho = radius;
        this.focalPoint = focalPoint;
        this.maxPhiAngle = maxPhiAngle;
        this.minPhiAngle = Math.PI - maxPhiAngle;

        //calculates the theta and phi based on current camera position;
        const { x, y, z} = camera.position;
        this.theta = Math.atan(y / x);
        this.phi = Math.acos(z / Math.sqrt((x ** 2) + (y ** 2) + (z ** 2)));


        this.beginListening();
    }

    beginListening() {
        console.log("here");

        //TODO: change the 
        document.addEventListener("mousemove", this.updateInternal.bind(this));
    }

    //deltaTheta is tied to 
    updateInternal(mouse: MouseEvent) {
        if (mouse.buttons == 1) {
            if (mouse.movementX != 0) {
                this.deltaTheta += mouse.movementX / 200;
            }
            if (mouse.movementY != 0) {
                this.deltaPhi += mouse.movementY / 200;
            }   
        }
    } 

    update() {
        this.phi -= this.deltaPhi;

        if (this.phi <= this.maxPhiAngle) {
            this.phi = this.maxPhiAngle;
        } else if (this.phi >= this.minPhiAngle) {
            this.phi = this.minPhiAngle;
        }

        this.theta += this.deltaTheta;
        const x = this.rho * Math.sin(this.phi) * Math.cos(this.theta);
        const z = this.rho * Math.sin(this.phi) * Math.sin(this.theta);
        const y = this.rho * Math.cos(this.phi);
        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.focalPoint);

        this.deltaPhi = 0;
        this.deltaTheta = 0;
    }
}