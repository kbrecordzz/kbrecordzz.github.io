// kbz.js
// kbrecordzz 2024

"use strict";

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x73205D);
var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 2, 1250);
var renderer;

var loader = new THREE.TextureLoader();

// these are here to be loaded as early as possible
var mat_cloudbox = new THREE.MeshLambertMaterial({map: loader.load("cropped-test-6.gif"), transparent: true});
mat_cloudbox.map.minFilter = THREE.NearestFilter;
mat_cloudbox.map.magFilter = THREE.NearestFilter;
mat_cloudbox.transparent = true;
mat_cloudbox.opacity = 0.75;
mat_cloudbox.map.repeat.x = 0.1;
mat_cloudbox.map.repeat.y = 0.1;
//					                               radius top	 radius bot	height	segments
var geometry_cloudbox = new THREE.CylinderGeometry(120,		119.8,		1,		32);
var mesh_cloudbox = new THREE.Mesh(geometry_cloudbox, mat_cloudbox);
var mesh_cloudbox2 = new THREE.Mesh(geometry_cloudbox, mat_cloudbox);
scene.add(mesh_cloudbox);
scene.add(mesh_cloudbox2);

var cloudbox_animate = 0.2; 

// create actual 3d canvas (after splash screen)
renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas"), antialias: true});
//document.body.appendChild(renderer.domElement);		// canvas from webGLrenderer() is added to HTML document

var mobile;
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = false;	// ej klockren!
else mobile = true;

var light = new THREE.AmbientLight(new THREE.Color(0.94, 0.79, 0.84), 1.4);
scene.add(light);

camera.rotation.y = 2.2933;

camera.position.x = 1691;
camera.position.z = 1838;
camera.position.y = 5;

mesh_cloudbox.position.set(camera.position.x, camera.position.y+20, camera.position.z);
mesh_cloudbox2.position.set(camera.position.x, camera.position.y-15, camera.position.z);

// main game loop
function main()
{
	// portrait
	if (window.innerHeight > window.innerWidth)
	{
		document.getElementById("img1").style.width = "20vh";
		document.getElementById("img2").style.width = "20vh";
	}
	// layout
	else
	{
		if (mobile === true) document.getElementById("logo").style.width = "10vh";
		else document.getElementById("logo").style.width = "20vh";
		
		document.getElementById("img1").style.width = "40vh";
		document.getElementById("img2").style.width = "40vh";
	}
	
	if (mobile === true) renderer.setPixelRatio(window.devicePixelRatio*0.4);
	else renderer.setPixelRatio(window.devicePixelRatio*0.8);

	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (cloudbox_animate < 1) cloudbox_animate += 0.00003; else cloudbox_animate = 0;
	mat_cloudbox.map.offset.x = cloudbox_animate;
	mat_cloudbox.map.offset.y = cloudbox_animate;

	renderer.render(scene, camera);

	requestAnimationFrame(main);
}
requestAnimationFrame(main);
