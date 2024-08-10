// kbz.js
// kbrecordzz 2024

"use strict";

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x73205D);
var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 2, 1250);
var renderer;

var light = new THREE.AmbientLight(0xFFFFD5, 1.31);
scene.add(light);

var loader = new THREE.TextureLoader();

// these are here to be loaded as early as possible
var mat_cloudbox = new THREE.MeshLambertMaterial({map: loader.load("cropped-test-6.gif"), side: THREE.DoubleSiide, transparent: true});
mat_cloudbox.map.minFilter = THREE.NearestFilter;
mat_cloudbox.map.magFilter = THREE.NearestFilter;
mat_cloudbox.transparent = true;
mat_cloudbox.opacity = 0.75;
mat_cloudbox.map.wrapS = THREE.MirroredRepeatWrapping;
mat_cloudbox.map.wrapT = THREE.MirroredRepeatWrapping;
mat_cloudbox.map.repeat.set(0.1,0.1);
var geometry_cloudbox;
var mesh_cloudbox;
var mesh_cloudbox2;

var cloudbox_animate = 0.2;

const FRAMES_PER_HOUR			= 834;
const FRAMES_PER_DAY			= 20000;

var mobile = false;

var camera_strive_x = 0;
var camera_strive_z = 0;
var camera_strive_y = 0;


// intro logo
const mesh_logo = new THREE.Mesh(new THREE.BoxGeometry(2,1.33,0.3), new THREE.MeshPhongMaterial({map: loader.load("ep3.png")}));
var rotationrikt = 0;
const m2 = new THREE.Mesh(new THREE.BoxGeometry(2.01,1.33,0.29), new THREE.MeshPhongMaterial({map: loader.load("blackcover.jpg")}));
scene.add(mesh_logo);
mesh_logo.add(m2);
mesh_logo.rotation.y -= 1;
mesh_logo.name = "NOTACARCLUB";
m2.name = "NOTACARCLUB";

const mesh_snowboard = new THREE.Mesh(new THREE.PlaneGeometry(1.5,0.7), new THREE.MeshPhongMaterial({map: loader.load("legendary_logo.png"), transparent: true}));
var rotationrikt2 = 0;
scene.add(mesh_snowboard);
mesh_snowboard.rotation.y += 2.25;
mesh_snowboard.name = "SNOWBOARD";


var lz = new THREE.PointLight(0xFFD700, 0.3);
scene.add(lz);
lz.intensity = 1.5;

var eventlock = "";		// for deciding if mouse or touch should be used (only ONE of them!)

const raycaster = new THREE.Raycaster();
const raycaster2 = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const mouse2 = new THREE.Vector2();

function onMouseMove(event)
{
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	const intersects = raycaster.intersectObjects(scene.children, true);

	if (intersects.length > 0)
	{
		const firstObject = intersects[0].object;
		if (firstObject.name === "NOTACARCLUB") { mesh_logo.material.color = new THREE.Color(0x99FF66); document.body.style.cursor = "pointer"; }
		else { mesh_logo.material.color = new THREE.Color(0xFFFFFF); document.body.style.cursor = "default"; }
		
		if (firstObject.name === "SNOWBOARD") { mesh_snowboard.material.color = new THREE.Color(0x99FF66); document.body.style.cursor = "pointer"; }
		else { mesh_snowboard.material.color = new THREE.Color(0xFFFFFF); document.body.style.cursor = "default"; }
	}
}
window.addEventListener('mousemove', onMouseMove, false);

var touchstartx, touchstarty;

function touch_start(e)
{
	if (eventlock === "") eventlock = "touch";

	touchstartx = event.touches[0].clientX;
	touchstarty = event.touches[0].clientY;
}
document.addEventListener("touchstart", touch_start);

function touch_end(event)
{
	if (eventlock === "touch")
	{
		mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

		mouse2.x = (touchstartx / window.innerWidth) * 2 - 1;
		mouse2.y = - (touchstarty / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		raycaster2.setFromCamera(mouse2, camera);

		const intersects = raycaster.intersectObjects(scene.children, true);
		const intersects2 = raycaster2.intersectObjects(scene.children, true);

		if (intersects.length > 0 && intersects2.length > 0)
		{
			if (intersects[0].object.name === "NOTACARCLUB" && intersects2[0].object.name === "NOTACARCLUB") window.open("https://notacarclub.kbrecordzz.com/", "_blank");
			else if (intersects[0].object.name === "SNOWBOARD" && intersects2[0].object.name === "SNOWBOARD") window.open("https://snowboard.kbrecordzz.com/", "_blank");
		}
	}
}
document.addEventListener("touchend", touch_end);

function mouseDown(event)
{
	if (eventlock === "") eventlock = "mouse";
}
document.addEventListener("mousedown", mouseDown);

function mouseUp(event)
{
	if (eventlock === "mouse")
	{
		if (event.button === 0 || event.button === 1)
		{
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObjects(scene.children, true);

			if (intersects.length > 0)
			{
				if (intersects[0].object.name === "NOTACARCLUB") window.open("https://notacarclub.kbrecordzz.com/", "_blank");
				else if (intersects[0].object.name === "SNOWBOARD") window.open("https://snowboard.kbrecordzz.com/", "_blank");
			}
		}
	}
}
document.addEventListener("mouseup", mouseUp);

//					     radius top		radius bot	height		segments
geometry_cloudbox = new THREE.CylinderGeometry(120,		119.8,		1,		32);

mesh_cloudbox = new THREE.Mesh(geometry_cloudbox, mat_cloudbox);
mesh_cloudbox2 = new THREE.Mesh(geometry_cloudbox, mat_cloudbox);
scene.add(mesh_cloudbox);
scene.add(mesh_cloudbox2);

// create actual 3d canvas (after splash screen)
renderer = new THREE.WebGLRenderer({antialias: true});
document.body.appendChild(renderer.domElement);		// canvas from webGLrenderer() is added to HTML document

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = false;	// ej klockren!
else mobile = true;

lz.position.set(camera.position.x,camera.position.y,camera.position.z);

light.intensity = 1.4;
lz.intensity = 1.4;

light.color.set(new THREE.Color(0.94, 0.79, 0.84));

// main game loop
function main()
{
	lz.position.x += 0.01;
	lz.position.y += 0.01;
	lz.position.z += 0.01;

	lz.rotation.y += 1;

	// LAYOUT
	// portrait
	if (window.innerHeight > window.innerWidth)
	{
		mesh_logo.scale.set(0.7,0.7,0.7);
		mesh_logo.position.set(camera.position.x-3, camera.position.y+0.35, camera.position.z+2.66);

		document.getElementById("title").style = 
			"visibility: visible; position: absolute; top: 5%; left: 50%; transform: translateX(-50%); image-rendering: pixelated; height: 13vh;";

		document.getElementById("by").style = 
			"visibility: visible; position: absolute; top: 18%; left: 50%; transform: translateX(-50%);";
		document.getElementById("by_text").style = 
			"font-size: 2vh;";
		document.getElementById("by_image").style = 
			"position: relative; top: 1vh; height: 4vh;";

		document.getElementById("notacarclub").style = 
			"visibility: visible; position: absolute; top: 55%; left: 50%; transform: translateX(-50%); width: 90%; font-size: 2.5vh; line-height: 3vh; background-color: rgb(150,50,115,0.75); border: 1px solid #6DFA0F";
		document.getElementById("notacarclub_description").style.fontSize = "2vh";
		
		document.getElementById("snowboard").style = 
			"visibility: visible; position: absolute; top: 51%; left: 50vw+50vh; transform: translateX(80%); font-size: 2.4vh; line-height: 3.3vh; padding-left: 1%; padding-right: 1%; background-color: rgb(150,50,115,0.75); border: 1px solid #6DFA0F";
		document.getElementById("snowboard_description").style.fontSize = "2vh";
		
		document.getElementById("about").style = 
		  "position: absolute; visibility: visible; bottom: 1vh; left: 1vh; font-size: 2vh;";
	}
	// landscape
	else
	{
	// landscape (mobile)
	if (mobile === true)
	{
		mesh_logo.scale.set(1.35,1.35,1.35);
		mesh_logo.position.set(camera.position.x-3, camera.position.y-0.23, camera.position.z+2.66);

		document.getElementById("title").style = 
			"visibility: visible; position: absolute; top: 3%; left: 50%; transform: translateX(-50%); image-rendering: pixelated; height: 20vh;";

		document.getElementById("by").style = 
			"visibility: visible; position: absolute; top: 22%; left: 50%; transform: translateX(-50%);";
		document.getElementById("by_text").style = 
			"font-size: 4vh;";
		document.getElementById("by_image").style = 
			"position: relative; top: 1.5vh; height: 6vh;";

		document.getElementById("notacarclub").style = 
			"visibility: visible; position: absolute; top: 80%; left: 50%; transform: translateX(-50%); font-size: 4.4vh; line-height: 5.5vh; padding-left: 1%; padding-right: 1%; background-color: rgb(150,50,115,0.75); border: 1px solid #6DFA0F";
		document.getElementById("notacarclub_description").style.fontSize = "3.8vh";
		
		document.getElementById("snowboard").style = 
			"visibility: visible; position: absolute; top: 51%; left: 50vw+50vh; transform: translateX(80%); font-size: 2.4vh; line-height: 3.3vh; padding-left: 1%; padding-right: 1%; background-color: rgb(150,50,115,0.75); border: 1px solid #6DFA0F";
		document.getElementById("snowboard_description").style.fontSize = "2vh";
		
		document.getElementById("about").style = 
		  "position: absolute; visibility: visible; bottom: 1vh; left: 1vh; font-size: 3.8vh;";
	}
	// landscape (desktop)
	else
	{
		mesh_logo.scale.set(0.8,0.8,0.8);
		mesh_logo.position.set(camera.position.x-3, camera.position.y+0.35, camera.position.z+2.66);
		
		mesh_snowboard.scale.set(0.7,0.7,0.7);
		mesh_snowboard.position.set(camera.position.x-3, camera.position.y-0.5, camera.position.z+1);

		document.getElementById("title").style = 
			"visibility: visible; position: absolute; top: 5%; left: 50%; transform: translateX(-50%); image-rendering: pixelated; height: 13vh;";

		document.getElementById("by").style = 
			"visibility: visible; position: absolute; top: 18%; left: 50%; transform: translateX(-50%);";
		document.getElementById("by_text").style = 
			"font-size: 2vh;";
		document.getElementById("by_image").style = 
			"position: relative; top: 1vh; height: 4vh;";

		document.getElementById("notacarclub").style = 
			"visibility: visible; position: absolute; top: 58%; left: 50%; transform: translateX(-50%); font-size: 2.4vh; line-height: 3.3vh; padding-top: 1vh; padding-left: 1.5vh; padding-right: 1.5vh; background-color: rgb(150,50,115,0.75); border: 1px solid #6DFA0F;";
		document.getElementById("notacarclub_description").style.fontSize = "2vh";
		
		document.getElementById("snowboard").style = 
			"visibility: visible; position: absolute; top: 75%; left: 50%; transform: translateX(60%); font-size: 2.4vh; line-height: 3.3vh; padding-top: 1vh; padding-left: 1.5vh; padding-right: 1.5vh; background-color: rgb(150,50,115,0.75); border: 1px solid #6DFA0F";
		document.getElementById("snowboard_description").style.fontSize = "2vh";
		
		document.getElementById("about").style = 
		  "position: absolute; visibility: visible; bottom: 1vh; left: 1vh; font-size: 2.2vh;";
	}
	}
	//

	// rotate logos
	if (rotationrikt === 0)
	{
		mesh_logo.rotation.y += 0.001;
		if (mesh_logo.rotation.y > -0.5) rotationrikt = 1;
	}
	if (rotationrikt === 1)
	{
		mesh_logo.rotation.y -= 0.001
		if (mesh_logo.rotation.y < -1) rotationrikt = 0;
	}
	
	if (rotationrikt2 === 0)
	{
		mesh_snowboard.rotation.y += 0.003;
		if (mesh_snowboard.rotation.y > 2.7) rotationrikt2 = 1;
	}
	if (rotationrikt2 === 1)
	{
		mesh_snowboard.rotation.y -= 0.003;
		if (mesh_snowboard.rotation.y < 1.3) rotationrikt2 = 0;
	}

	if (mobile === true) renderer.setPixelRatio(window.devicePixelRatio*0.3);
	else renderer.setPixelRatio(window.devicePixelRatio*0.7);

	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

	camera.position.x = 1691;
	camera.position.z = 1838;
	camera.position.y = 5;
	camera.rotation.set(0, camera.rotation.y, 0);

	mesh_cloudbox.position.set(camera.position.x, camera.position.y+20, camera.position.z);
	mesh_cloudbox2.position.set(camera.position.x, camera.position.y-15, camera.position.z);

	if (cloudbox_animate < 1) cloudbox_animate += 0.00003; else cloudbox_animate = 0;
	mat_cloudbox.map.offset.set(cloudbox_animate, cloudbox_animate);

	renderer.render(scene, camera);

	requestAnimationFrame(main);
}
requestAnimationFrame(main);
