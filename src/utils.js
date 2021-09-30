import {
    Vector3,
    PointerDragBehavior,
} from "@babylonjs/core";

export function createRedSpherePointerDragBehavior(meshes) {
    const [redSphere, greenBox, blueBox, purpleDonut, whiteBox] = meshes
    const redSphereDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) });
    redSphereDragBehavior.useObjectOrientationForDragging = false;
    let canDrag = true;

    redSphereDragBehavior.validateDrag = targetPosition => {
        if (targetPosition.x > -65) {
            canDrag = false
            return false
        }
        canDrag = true
        return true
    }

    redSphereDragBehavior.onDragStartObservable.add((event) => {
        console.log("dragStart");
        console.log(event);
    });
    redSphereDragBehavior.onDragObservable.add((event) => {

        if (canDrag && (whiteBox.scaling.x > 0 || event.dragDistance < 0)) {
            redSphereDragBehavior.moveAttached = true
            greenBox.position.z = greenBox.position.z + event.dragDistance;
            blueBox.position.x = blueBox.position.x - event.dragDistance;
            purpleDonut.position.z = purpleDonut.position.z - event.dragDistance;

            whiteBox.scaling.x = whiteBox.scaling.x - (event.dragDistance / 50);
            whiteBox.scaling.z = whiteBox.scaling.z - (event.dragDistance / 50);
        }
    });
    redSphereDragBehavior.onDragEndObservable.add((event) => {
        console.log("dragEnd");
        console.log(event);
    });

    redSphere.addBehavior(redSphereDragBehavior);
}

//Move vertically
export function createGreenBoxPointerDragBehavior(meshes) {
    const [redSphere, greenBox, blueBox, purpleDonut, whiteBox] = meshes
    const greenBoxDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(0, 0, 1) });
    greenBoxDragBehavior.useObjectOrientationForDragging = false;

    greenBoxDragBehavior.onDragStartObservable.add((event) => {
        console.log("dragStart");
        console.log(event);
    });
    greenBoxDragBehavior.onDragObservable.add((event) => {
        redSphere.position.z = redSphere.position.z + event.dragDistance;
        blueBox.position.z = blueBox.position.z + event.dragDistance;
        purpleDonut.position.z = purpleDonut.position.z + event.dragDistance;
        whiteBox.position.z = whiteBox.position.z + event.dragDistance;
    });
    greenBoxDragBehavior.onDragEndObservable.add((event) => {
        console.log("dragEnd");
        console.log(event);
    });

    greenBox.addBehavior(greenBoxDragBehavior);
}

// Move Horizontally
export function createBlueBoxPointerDragBehavior(meshes) {
    const [redSphere, greenBox, blueBox, purpleDonut, whiteBox] = meshes
    const blueBoxDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) });
    blueBoxDragBehavior.useObjectOrientationForDragging = false;

    blueBoxDragBehavior.onDragStartObservable.add((event) => {
        console.log("dragStart");
        console.log(event);
    });
    blueBoxDragBehavior.onDragObservable.add((event) => {
        greenBox.position.x = greenBox.position.x + event.dragDistance;
        redSphere.position.x = redSphere.position.x + event.dragDistance;
        purpleDonut.position.x = purpleDonut.position.x + event.dragDistance;
        whiteBox.position.x = whiteBox.position.x + event.dragDistance;
    });
    blueBoxDragBehavior.onDragEndObservable.add((event) => {
        console.log("dragEnd");
        console.log(event);
    });

    blueBox.addBehavior(blueBoxDragBehavior);
}


//Rotate the white box
export function createPurpleDonutPointerDragBehavior(meshes) {
    const [, , , purpleDonut, whiteBox] = meshes
    const purpleDonutDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0) });
    purpleDonutDragBehavior.useObjectOrientationForDragging = false;

    purpleDonutDragBehavior.onDragStartObservable.add((event) => {
        console.log("dragStart");
        console.log(event);
    });
    purpleDonutDragBehavior.onDragObservable.add((event) => {
        console.log('event', event)
        whiteBox.rotation.y = whiteBox.rotation.y + (event.dragDistance / 50);
    });
    purpleDonutDragBehavior.onDragEndObservable.add((event) => {
        console.log("dragEnd");
        console.log(event);
    });

    purpleDonutDragBehavior.moveAttached = false;
    purpleDonut.addBehavior(purpleDonutDragBehavior);
}