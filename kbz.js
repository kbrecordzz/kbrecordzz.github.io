// ascend.js
// creates, and shows and hides terrain chunks and objects (trees, houses, etc)
// kbrecordzz 2023

"use strict";

var starttime = performance.now();

// SCENE, CAMERAS, HTML CANVASES, LIGHTS, FOGS
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x44AAFF);
var camera_main = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 2, 125);
var camera_splashscreen = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 125);
var camera_cutscene = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 125);
var camera = camera_main;
var renderer;

var light = new THREE.AmbientLight(0xFFFFD5, 1.31);
scene.add(light);
scene.fog = new THREE.Fog();

var loader = new THREE.TextureLoader();

// these are here to be loaded as early as possible
var mat_skybox = new THREE.MeshLambertMaterial({map: loader.load("files/blue.jpg"), side: THREE.BackSide}); mat_skybox.color = new THREE.Color(0x88DDFF);
var mat_cloudbox = new THREE.MeshLambertMaterial({map: loader.load("files/clouds.png"), side: THREE.DoubleSiide, transparent: true});
mat_skybox.map.wrapS = THREE.MirroredRepeatWrapping;
mat_skybox.map.wrapT = THREE.MirroredRepeatWrapping;
mat_skybox.map.repeat.set(8,4);
var geometry_skybox;
var geometry_cloudbox;
var mesh_skybox;
var mesh_cloudbox;

var cloudbox_animate;

var sealevel = -1;

// level start point
var start_chunk_x = 34;
var start_chunk_z = 37;

var frame_counter;

// functions.js
// game functions
// kbrecordzz 2023
"use strict";
const MODULUS_FREEROAM_OR_RACE		= 50;
const MODULUS_FREEROAM_ONLY		= 100;
const FRAMES_PER_HOUR			= 834;
const FRAMES_PER_DAY			= 20000;
var CUT_SPLASHSCREEN			= -2;
var splashscreen_started		= false;

// basic.js
// images, sounds, etc (files)
// kbrecordzz 2023

// det finns fel Å i namn tror jag!!

"use strict";

var mobile = false;

// DEBUG
var game_speed = 1;

var cut;
var startcut;
var start_hour;
var move_player = true;
var lookheight = 0;
var splashscreen_click_starttime = 0;

var camera_strive_x = 0;
var camera_strive_z = 0;
var camera_strive_y = 0;
var from_x = 0;
var from_z = 0;
var from_y = 0;

// create sprite
function spr(file, size, width)
{
	// standard values (for IE)
	if (!(size >= 0)) size = 1;
	if (!(width >= 0)) width = size;

	let material = new THREE.SpriteMaterial({map: loader.load("files/" + file)});
	material.map.minFilter = THREE.NearestFilter;
	material.map.magFilter = THREE.NearestFilter; // this turns off the blurriness of the pixel art
	material.alphaTest = 0.5;
	let sprite = new THREE.Sprite(material);
	sprite.scale.set(width, size, size);
	scene.add(sprite);
	sprite.visible = false;
	return sprite;
}

// create texture material
function tex(file, r1, r2, mirrored)
{
	// standard values (for IE)
	if (!(r1 >= -10)) r1 = 1;
	if (!(r2 >= -10)) r2 = 1;
	if (mirrored !== false && mirrored !== true) mirrored = false;

	let material;
	material = new THREE.MeshLambertMaterial({map: loader.load("files/" + file)});
	material.map.repeat.set(r1,r2);
	if (mirrored === true)
	{
		material.map.wrapS = THREE.MirroredRepeatWrapping;
		material.map.wrapT = THREE.MirroredRepeatWrapping;
	}
	else
	{
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
	}
	material.alphaTest = 0.5;
	return material;
}

// intro logo
var f1;
let iii = Math.random();
f1 = "files/html5_cover5.png";

const mat_logo = new THREE.MeshPhongMaterial({map: loader.load("ep3.png")});
mat_logo.map.repeat.set(1,1);
mat_logo.map.wrapS = THREE.MirroredRepeatWrapping;
mat_logo.map.wrapT = THREE.MirroredRepeatWrapping;
const mesh_logo = new THREE.Mesh(new THREE.BoxGeometry(2,1.33,0.3), new THREE.MeshPhongMaterial({map: loader.load(f1)}));

var rotationrikt = 0;

const m2 = new THREE.Mesh(new THREE.BoxGeometry(2.01,1.33,0.29), new THREE.MeshPhongMaterial({map: loader.load("files/blackcover.jpg")}));
scene.add(mesh_logo);
mesh_logo.add(m2);
mesh_logo.rotation.y -= 1;

mesh_logo.name = "NOTACARCLUB";
m2.name = "NOTACARCLUB";


// cars must be created after cz sprites so they get drawn in the correct order
const player				= spr("bomb.png");
player.visible = false;

var lz = new THREE.PointLight(0xFFD700, 0.3);
scene.add(lz);

var mesh_sun = new THREE.Mesh(new THREE.SphereGeometry(8, 32, 32), tex("sun.jpg"));
scene.add(mesh_sun);
// input.js
// user input
// kbrecordzz 2023

"use strict";

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
			}
		}
	}
}
document.addEventListener("mouseup", mouseUp);

// main.js
// the main game loop
// kbrecordzz 2023

"use strict";

cloudbox_animate = 0;

//					     radius top		radius bot	height		segments
geometry_skybox = new THREE.CylinderGeometry(120,		120,		50*8,		32);
geometry_cloudbox = new THREE.CylinderGeometry(120,		119.8,		1,		32);

// materials are loaded in beginning of ascend.js!

mesh_skybox = new THREE.Mesh(geometry_skybox, mat_skybox);
mesh_cloudbox = new THREE.Mesh(geometry_cloudbox, mat_cloudbox);
scene.add(mesh_skybox);
scene.add(mesh_cloudbox);

// create actual 3d canvas (after splash screen)
renderer = new THREE.WebGLRenderer({antialias: true});
document.body.appendChild(renderer.domElement);		// canvas from webGLrenderer() is added to HTML document

frame_counter = FRAMES_PER_HOUR*9;	// start game in the morning

player.position.x = start_chunk_x*49+25;
player.position.z = start_chunk_z*49+25;

cut = CUT_SPLASHSCREEN;

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = false;	// ej klockren!
else mobile = true;

lz.position.set(camera.position.x,camera.position.y,camera.position.z);

// main game loop
function main()
{
	lz.position.x += 0.01;
	lz.position.y += 0.01;
	lz.position.z += 0.01;

	lz.intensity = 1.5;
	lz.rotation.y += 1;

	// override in cut_set() if you want to change:
	camera_cutscene.fov = 60;
	lookheight = 0;
	move_player = false;
	from_x = 0;
	from_z = 0;
	from_y = 0;

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
			"visibility: visible; position: absolute; top: 55%; left: 50%; transform: translateX(-50%); width: 90%; font-size: 2.5vh; line-height: 3vh; background-color: rgb(0,0,0,0.2);";
		document.getElementById("notacarclub_open").style = 
			"position: relative; top: 0.4vh; height: 2.7vh;";
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
			"visibility: visible; position: absolute; top: 80%; left: 50%; transform: translateX(-50%); font-size: 4.4vh; line-height: 5.5vh; padding-left: 1%; padding-right: 1%; background-color: rgb(0,0,0,0.2);";
		document.getElementById("notacarclub_open").style = 
			"position: relative; top: 0.8vh; height: 5vh;";
	}
	// landscape (desktop)
	else
	{
		mesh_logo.scale.set(0.9,0.9,0.9);
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
			"visibility: visible; position: absolute; top: 58%; left: 50%; transform: translateX(-50%); font-size: 2.7vh; line-height: 3.3vh; padding-left: 1%; padding-right: 1%; background-color: rgb(0,0,0,0.2);";
		document.getElementById("notacarclub_open").style = 
			"position: relative; top: 0.5vh; height: 3vh;";
	}
	}
	//

	mesh_logo.visible = true;

	if (rotationrikt === 0)
	{
		mesh_logo.rotation.y += 0.001;
		if (mesh_logo.rotation.y > -0.5) rotationrikt = 1;
	}
	if (rotationrikt === 1)
	{
		mesh_logo.rotation.y -= 0.001;
		if (mesh_logo.rotation.y < -1) rotationrikt = 0;
	}

	mesh_skybox.rotation.y += 0.001;

	if (mobile === true) renderer.setPixelRatio(window.devicePixelRatio*0.3);
	else renderer.setPixelRatio(window.devicePixelRatio*0.7);

	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

	camera = camera_splashscreen;
	if (splashscreen_started === false)
	{
		camera.rotation.y = Math.PI*0.73;
		splashscreen_started = true;
	}

	camera.position.x = player.position.x;
	camera.position.z = player.position.z;
	//	if (height_get(camera)+5 >= sealevel+1) camera.position.y = height_get(camera)+5;
	camera.position.y = sealevel+1+5;
	camera.rotation.set(0, camera.rotation.y, 0);

	mesh_skybox.position.set(camera.position.x, sealevel-0.4*0.5*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)), camera.position.z);
	mesh_cloudbox.position.set(camera.position.x, mesh_skybox.position.y+20, camera.position.z);

	if (cloudbox_animate < 1) cloudbox_animate += 0.0001; else cloudbox_animate = 0;
	mat_cloudbox.map.offset.set(cloudbox_animate, cloudbox_animate);

	renderer.render(scene, camera);

	requestAnimationFrame(main);
}
requestAnimationFrame(main);
