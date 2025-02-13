import * as BABYLON from 'https://cdn.babylonjs.com/babylon.js';
import * as MindAR from 'https://cdn.jsdelivr.net/npm/mind-ar@latest/dist/mindar-image-three.prod.js';

window.onload = async function () {
    // Initialize MindAR for image tracking
    const mindarThree = new MindAR.MindARThree({
        container: document.body,
        imageTargetSrc: "https://github.com/pfrgi/Soiree/targets.mind", // Replace with your .mind URL = DONE
    });

    const { renderer, scene, camera } = mindarThree;

    // Create Babylon.js Engine
    const babylonCanvas = document.createElement("canvas");
    document.body.appendChild(babylonCanvas);
    
    const engine = new BABYLON.Engine(babylonCanvas, true);
    const babylonScene = new BABYLON.Scene(engine);
    
    // Create a basic camera
    const babylonCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), babylonScene);
    babylonCamera.attachControl(babylonCanvas, true);

    // Create a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), babylonScene);

    // Create a 3D box to display on image tracking
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.2 }, babylonScene);
    box.position.y = 0.1;

    // Add animation to the box
    scene.add(box);

    // Start MindAR tracking
    await mindarThree.start();

    // Render Loop
    engine.runRenderLoop(() => {
        renderer.render(scene, camera);
        babylonScene.render();
    });

    // Resize handling
    window.addEventListener("resize", () => {
        engine.resize();
    });
};
