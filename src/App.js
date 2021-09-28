import React from 'react';
import {
  MeshBuilder,
  Vector3,
  ArcRotateCamera,
  Color3,
  Scene,
  PointLight,
  StandardMaterial,
  PointerDragBehavior
} from "@babylonjs/core";

import SceneComponent from "./components/SceneComponent/SceneComponent";
import {createBlueBoxPointerDragBehavior, createGreenBoxPointerDragBehavior, createPurpleDonutPointerDragBehavior, createRedSpherePointerDragBehavior} from './utils'

function App() {
  const [onRender, setOnRender] = React.useState((scene) => { })

  const createScene = (scene) => {
    const canvas = scene.getEngine().getRenderingCanvas();
    const engine = scene.getEngine();

    //var scene = new Scene(engine);
    var camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);
    camera.setPosition(new Vector3(20, 200, 400));
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;

    camera.attachControl(canvas, true);

    // Light
    var light = new PointLight("omni", new Vector3(50, 200, 0), scene);

    //Materials
    var groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.specularColor = Color3.Black();

    var redMat = new StandardMaterial("ground", scene);
    redMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    redMat.specularColor = new Color3(0.4, 0.4, 0.4);
    redMat.emissiveColor = Color3.Red();

    var greenMat = new StandardMaterial("ground", scene);
    greenMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    greenMat.specularColor = new Color3(0.4, 0.4, 0.4);
    greenMat.emissiveColor = Color3.Green();

    var blueMat = new StandardMaterial("ground", scene);
    blueMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = Color3.Blue();

    var purpleMat = new StandardMaterial("ground", scene);
    purpleMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    purpleMat.specularColor = new Color3(0.4, 0.4, 0.4);
    purpleMat.emissiveColor = Color3.Purple();

    /*************************************Meshes****************************************/
    // Ground
    var ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, scene, false);
    ground.material = groundMaterial;

    // Meshes
    var whiteBox = MeshBuilder.CreateBox("white", {size: 30}, scene);
    whiteBox.position.y = 10;

    var redSphere = MeshBuilder.CreateSphere("red", { diameter: 20 }, scene);
    redSphere.material = redMat;
    redSphere.position.y = 10;
    redSphere.position.x -= 100;

    var greenBox = MeshBuilder.CreateBox("green", { size: 20 }, scene);
    greenBox.material = greenMat;
    greenBox.position.z -= 100;
    greenBox.position.y = 10;

    var blueBox = MeshBuilder.CreateBox("blue", { size: 20 }, scene);
    blueBox.material = blueMat;
    blueBox.position.x += 100;
    blueBox.position.y = 10;

    var purpleDonut = MeshBuilder.CreateTorus("red", { diameter: 30, thickness: 10 }, scene);
    purpleDonut.material = purpleMat;
    purpleDonut.position.y = 10;
    purpleDonut.position.z += 100;

    const meshes = [redSphere, greenBox, blueBox, purpleDonut, whiteBox]

    createRedSpherePointerDragBehavior(meshes);
    createGreenBoxPointerDragBehavior(meshes);
    createBlueBoxPointerDragBehavior(meshes);
    createPurpleDonutPointerDragBehavior(meshes);

    return scene;
  }

  return (
    <div>
      <SceneComponent antialias onSceneReady={createScene} onRender={onRender} />
    </div>
  );
}

export default App;


