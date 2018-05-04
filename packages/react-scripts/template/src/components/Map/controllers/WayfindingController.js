import {Scene, Group} from 'three';
import { Path  } from '@adactive/adsum-web-map';
import ObjectsLoader from "../objectsLoader/ObjectsLoader";
import PathSectionDrawer from "./PathSectionDrawer";
import sceneController from './SceneController';

import CustomUserObject from "./CustomUserObject";
import customDotPathBuilder from "./CustomDotPathBuilder";

class WayfindingController {
    constructor() {
        this.awm = null;
        this.current = null;
        this.locked = false;
        this.objectsLoader = null;
        this.pathPattern = null;
    }

    init(awm) { // TODO ASYNC
        this.awm = awm;
        this.objectsLoader = new ObjectsLoader(this.awm);
        customDotPathBuilder.init(awm); // TODO
        this.loadPathPattern();  // TODO ASYNC
        this.loadUserObject();  // TODO ASYNC
        return this;
    }

    loadPathPattern() { // TODO params
        this.objectsLoader.createJSON3DObj('assets/3dModels/path_default.json').then(
            (pathPattern) => {
                if (pathPattern instanceof Scene && pathPattern.children.length === 1) {
                    const group = new Group();
                    group.add(pathPattern.children[0]);
                    pathPattern = group;
                }
                pathPattern.scale.multiplyScalar(10); // TODO
                pathPattern.traverse((obj) => {

                    if(obj.name === "outline") {
                        obj.position.set(0.05, 0.68, -0.33);
                    }
                    obj.updateMatrixWorld();
                });
                this.pathPattern = pathPattern;

            }
        )
    }

    loadUserObject() {
        const customUserObject = new CustomUserObject(this.awm);
        this.awm.objectManager.user._dispose();
        return customUserObject.createDefault(
            this.awm.projector.meterToAdsumDistance(3),
            { placeId: Symbol('UserPlace') },
            Symbol('UserPositionId'),
        ).then(
            (customUserObject)=> {
                this.awm.objectManager.user = customUserObject;
                return this.awm.setDeviceId(1062, false); // TODO
            }
        );
    }

    createPathPattern() {
        return this.pathPattern.clone();
    }

    goTo(object) {
        if (this.current !== null) {
            // Remove previously drawn paths
            this.awm.wayfindingManager.removePath(this.current);
        }

        // Get the object location
        const location = this.awm.wayfindingManager.locationRepository.get(object.placeId);

        // Create path from user location (null) and object location
        this.current = new Path(null, location);

        // Compute the path to find the shortest path
        return this.awm.wayfindingManager.computePath(this.current)
            .then(() => {

                customDotPathBuilder.buildMerged(this.current.pathSections);

                // The path is computed, and we have now access to path.pathSections which represents all steps
                // We will chain our promises
                let promise = Promise.resolve();
                for(const pathSection of this.current.pathSections) {
                    // Do the floor change
                    const floor = pathSection.ground.isFloor ? pathSection.ground : null;
                    //promise = promise.then(() => this.awm.sceneManager.setCurrentFloor(floor));
                    promise = promise.then(() => sceneController.setCurrentFloor(floor === null? null :  floor.id)); // TODO Customize for decathlon
                    promise = promise.then(() => this.awm.cameraManager.centerOnFloor(floor));

                    // Draw the step
                    promise = promise.then(() => this.drawPathSection(pathSection));
                    //promise = promise.then(() => this.awm.wayfindingManager.drawPathSection(pathSection));

                    // Add a delay of 1.5 seconds
                    promise = promise.then(() => new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    }));
                }

                return promise;
            });
    }

    drawPathSection(pathSection) {
        this.awm.wayfindingManager.removePathSection(pathSection);

        const pathSectionObject = customDotPathBuilder.build(pathSection);

       const drawer = new PathSectionDrawer(
            pathSectionObject,
            this.awm.cameraManager,
            this.awm.wayfindingManager.projector,
        );

        return drawer.draw();
    }

}

const wayfindingController = new WayfindingController();
export default wayfindingController;