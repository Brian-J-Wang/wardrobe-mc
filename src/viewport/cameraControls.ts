import * as THREE from "three"



export class OrbitController {
    camera: THREE.PerspectiveCamera;
    focalPoint: THREE.Vector3;
    maxPhiAngle: number;
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

        //calculates the theta and phi based on current camera position;
        const { x, y, z} = camera.position;
        this.theta = Math.atan(y / x);
        this.phi = Math.acos(z / Math.sqrt((x ** 2) + (y ** 2) + (z ** 2)));


        this.beginListening();
    }

    beginListening() {
        console.log("here");
        document.addEventListener("mousemove", this.updateInternal.bind(this))
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

        console.log(this.deltaTheta);
    } 

    update() {
        this.phi += this.deltaPhi;
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