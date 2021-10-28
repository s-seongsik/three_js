import * as THREE from '../three.js-master/build/three.module.js';
import Stats from '../three.js-master/examples/jsm/libs/stats.module.js';

import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from '../three.js-master/examples/jsm/environments/RoomEnvironment.js';

import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../three.js-master/examples/jsm/loaders/DRACOLoader.js';


let mixer;

const clock = new THREE.Clock();
const container = document.getElementById( 'container' );

const stats = new Stats();
container.appendChild( stats.dom );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild( renderer.domElement );

const pmremGenerator = new THREE.PMREMGenerator( renderer );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '../static/three.js-master/examples/js/libs/draco/gltf/' );

const loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );
loader.load( '../static/three.js-master/examples/models/gltf/LittlestTokyo.glb', function ( gltf ) {

    const model = gltf.scene;
    model.position.set( 1, 1, 0 );
    model.scale.set( 0.01, 0.01, 0.01 );
    scene.add( model );

    mixer = new THREE.AnimationMixer( model );
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    animate();

}, undefined, function ( e ) {

    console.error( e );

} );


window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};


function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    mixer.update( delta );

    controls.update();

    stats.update();

    renderer.render( scene, camera );

}