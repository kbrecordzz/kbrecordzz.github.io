// basic.js
// images, sounds, etc (files)
// kbrecordzz 2024

"use strict";

var mobile = false;

// DEBUG
var game_speed = 1;
var minecraft = false;
var minecraft_o = "";
var chaosmode = 0;

// snowboard
var x_speed = 0;
var z_speed = 0;
var rot_speed = 0.01;

// cut
var cut;
var lastcut;
var bet_started = false;
var start_hour;
var last_cut_before_pause = 0;
var next_cut_after_blackintro;
var q;
var g;
var move_player = true;
var lookheight = 0;
var splashscreen_click_starttime = 0;
var splashscreen_very_starttime = 0;

// dialog
var dialog = "";
var last_dialog = "";
var now_char = 0;
var head;
var looking_at_object;

// camera
var camera_strive_x = 0;
var camera_strive_z = 0;
var camera_strive_y = 0;
var camera_rotx_strive = 0;
var camera_rotx_temp = 0;
var camera_rotz_strive = 0;
var camera_rotz_temp = 0;
var from_x = 0;
var from_z = 0;
var from_y = 0;
var ays = 0;

// race
var race_number = 0;
var mesh_checkpoint_x = new Array();
var mesh_checkpoint_z = new Array();

// physics
var height = 0;				// current height (y)
var inair = false;
var air_start;				// for car land sound
var jump_start = 0;
var gravityinc = 0;
var lastheight = 0;
var last_lutning = 0;
var lastpos_x = 0;
var lastpos_z = 0;
var lastpos_y = 0;
var lastdiff_x = 0;
var lastdiff_z = 0;
var lastpos_x2 = 0;
var lastpos_z2 = 0;

// sound
var audiocontext;
var source;
var ie_music;	// IE
var music_what_is_playing = 1;		// 2 = cut music is playing, 1 = nothing is playing, 0 = chunk music is playing
var current_song_playing = "";

// create texture material
function tex(file, r1, r2, mirrored)
{
	// standard values (for IE)
	if (!(r1 >= -10)) r1 = 1;
	if (!(r2 >= -10)) r2 = 1;
	if (mirrored !== false && mirrored !== true) mirrored = false;

	let material;
	material = new THREE.MeshLambertMaterial({map: loader.load("files/" + file)});	// MeshBasicMaterial doesn't get affected by light. change light manually by changing Color instead
	material.map.repeat.x = r1;
	material.map.repeat.y = r2;
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

// create sound
function snd(file, fvolume, floop)
{
	// standard values (for IE)
	if (!(fvolume >= 0)) fvolume = 1;
	if (floop !== false && floop !== true) floop = true;

	let sound = new Audio("files/" + file);
	sound.loop = floop;
	sound.volume = fvolume;
	return sound;
}

// create sprite
function spr(file, size, width)
{
	// standard values (for IE)
	if (!(size >= 0)) size = 1;
	if (!(width >= 0)) width = size;

	let material = new THREE.SpriteMaterial({map: loader.load("files/" + file)});
	material.map.minFilter = 1004;
	material.map.magFilter = 1004; // this turns off the blurriness of the pixel art
	material.alphaTest = 0.5;
	let sprite = new THREE.Sprite(material);
	sprite.scale.set(width, size, size);
	scene.add(sprite);
	sprite.visible = false;
	return sprite;
}

// create pointsprites material
function psp(file, fsize)
{
	// standard values (for IE)
	if (!(fsize >= 0)) fsize = 2;

	let material = new THREE.PointsMaterial({size: fsize, map: loader.load("files/" + file), depthTest: true, transparent: true});
	material.alphaTest = 0.5;	// this removes the imaginary annoying "boxes" around the tree sprites
	return material;
}

// create light source
function lgt(color, strength)
{
	// standard values (for IE)
	if (!(strength >= 0)) strength = 3;

	let flight = new THREE.PointLight(color, strength, 25);
	scene.add(flight);
	flight.visible = false;
	return flight;
}

// create cylinder
function cyl(file, radius, fheight)
{
	// standard values (for IE)
	if (!(radius >= 0)) radius = 1.5;
	if (!(fheight >= 0)) fheight = 3;

	let f3d = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, fheight, 16), new THREE.MeshLambertMaterial({map: loader.load("files/" + file)}));
	scene.add(f3d);
	f3d.visible = false;
	return f3d;
}

// create box
function box(file, fwidth, flength, fheight)
{
	// standard values (for IE)
	if (!(fwidth >= 0)) fwidth = 1;
	if (!(flength >= 0)) flength = 1;
	if (!(fheight >= 0)) fheight = 1;

	let f3d = new THREE.Mesh(new THREE.BoxGeometry(fwidth, fheight, flength), new THREE.MeshLambertMaterial({map: loader.load("files/" + file)}));
	scene.add(f3d);
	f3d.visible = false;
	return f3d;
}


// must be loaded here?
var mat_asphalt = tex("goldel2.png"); mat_asphalt.color = new THREE.Color(0x6666AA);


// SPRITES									//size
const sprite_ui_mouseclick		= spr("ui_mouse_click.png",		0.6);

var s_1001 = spr("C_shelf.png", 3); s_1001.material.color = new THREE.Color(0x00FF00);

var snowboard_center = spr("snowboard_center.png", 0.7);
var snowboard_left = spr("snowboard_left.png", 0.85);
var snowboard_right = spr("snowboard_right.png", 0.85);
var s_1008 = spr("C_shelf.png", 0.75);
var s_1008_strive = 0;
var dirt = new THREE.Sprite(new THREE.SpriteMaterial({map: loader.load("files/dirt_01.png")}));
var dirt2 = new THREE.Sprite(new THREE.SpriteMaterial({map: loader.load("files/dirt_02.png")}));
var dirt3 = new THREE.Sprite(new THREE.SpriteMaterial({map: loader.load("files/dirt_03.png")}));
s_1008.add(dirt);
s_1008.add(dirt2);
s_1008.add(dirt3);
dirt.scale.set(0.4,0.4,0.4);
dirt.position.y -= 0.5;
dirt.position.z -= 0.5;
dirt2.scale.set(0.4,0.4,0.4);
dirt2.position.y -= 0.5;
dirt2.position.z -= 0.5;
dirt3.scale.set(0.4,0.4,0.4);
dirt3.position.y -= 0.5;
dirt3.position.z -= 0.5;

// cars must be created after cz sprites so they get drawn in the correct order
const player				= spr("stick.png");
player.visible = false;

const sprite_adele			= spr("stick.png");


// SOUNDS									// vol	// loop
//const sound_carstart			= snd("sound_carstart.mp3",		0.75,	false);		// is in loadfirst.js
//const sound_crash			= snd("sound_carland2.mp3",		0.5,	false);
//const sound_collision			= snd("collision.mp3",			0.7,	false);
//const sound_error			= snd("error.mp3",			0.85,	false);
//const sound_countdown			= snd("sound_countdown.mp3",		0.6,	false);
//const sound_checkpoint			= snd("sound_checkpoint.mp3",		1,	false);
//const sound_lapfanfare			= snd("lapfanfare.mp3",			0.6,	false);		// sänkte volym, gör på EP1 EP2?
const sound_click			= snd("ui_click.mp3",			0.6,	false);		// sänkte volym, gör på EP1 EP2?
const sound_pause			= snd("ui_pause.mp3",			0.9,	false);
const sound_dreamintro			= snd("dreamintro.mp3",			0.8,	false);

const sound_adele			= snd("adele.mp3",			1,	false);

//const sound_endingfanfare		= snd("fanfare_ending.mp3",		1,	false);
//const sound_dath			= snd("sounddath.mp3",			0.8,	false);

const sound_skiing			= snd("skiing.mp3",			0.8);
const sound_sliding			= snd("sliding.mp3",			0.3);


// sun
var mesh_sun = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 32), tex("sun.jpg"));
mesh_sun.material.color = new THREE.Color(0xFFFFBB);
mesh_sun.material.fog = false;
scene.add(mesh_sun);
