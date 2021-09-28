import { Engine, Scene } from '@babylonjs/core';
import React from 'react';

const SceneComponent = ({
    antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest
}) => {
    const reactCanvas = React.useRef(null);

    React.useEffect(() => {
        console.log('entroi')
        if(reactCanvas.current){
            const engine = new Engine(reactCanvas.current,antialias,engineOptions,adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);

            if(scene.isReady()){
                onSceneReady(scene);
            } else{
                scene.onReadyObservable.addOnce((scene) => onSceneReady(scene))
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function'){
                    console.log('onRender function')
                    onRender(scene);}
                scene.render();
            });

            const resize = () => {
                scene.getEngine().resize();
            }

            if (window) window.addEventListener('resize', resize);

            return () => {
                scene.getEngine().dispose();

                if(window) {
                    window.removeEventListener('resize', resize);
                }
            }
        }
    }, [reactCanvas, onRender])

    return <canvas style={{width:'30rem', height:'30rem'}} ref={reactCanvas} {...rest}/>
}

export default SceneComponent;