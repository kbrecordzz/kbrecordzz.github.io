// ascend.js
// creates, and shows and hides terrain chunks and objects (trees, houses, etc)
// kbrecordzz 2024

"use strict";

var coverage = [];
for (let t = 0; t < 200; t++)
{
	coverage[t] = 0;
}

// ------------------------ //
// ---- CONSTANTS, ETC ---- //
// ------------------------ //
const chunkwidth		= 50;

const ASCEND_ROAD		= 1;
const ASCEND_ROADLIGHT		= 5;
const ASCEND_TREE		= 20;
const ASCEND_BUSH		= 30;
const ASCEND_GRASS		= 40;
const ASCEND_HOUSE		= 50;
const ASCEND_SKYSCRAPER		= 60;
const ASCEND_BARN		= 70;

const CHUNK_DONOTHING		= 0;
const CHUNK_SHOW		= 1;
const CHUNK_HIDE		= 2;

// SCENE, CAMERAS, HTML CANVASES, LIGHTS, FOGS
var scene = new THREE.Scene();
//scene.background = new THREE.Color(0x44AAFF);
var camera_main = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.5, 9999999);//125);
var camera_splashscreen = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 125);
var camera_cutscene = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 125);
var camera = camera_main;
var renderer;

var light = new THREE.AmbientLight(0xFFFFD5, 1.31);
scene.add(light);
scene.fog = new THREE.Fog();

var loader = new THREE.TextureLoader();

// race checkpoint
var roadblock_x;
var roadblock_z;
var checkstep_x = new Array();
var checkstep_z = new Array();	// xz for part steps between checkpoints

// some materials
var mat_trees;
var mat_bushes;
var mat_grass;
var mat_terrain;
var mat_houses;
var mat_skyscrapers;
var mat_barns;

// these are here to be loaded as early as possible
var mat_skybox = new THREE.MeshLambertMaterial({map: loader.load("files/blue.jpg"), side: THREE.BackSide, fog: false});
var mat_cloudbox = new THREE.MeshLambertMaterial({map: loader.load("files/clouds.png"), transparent: true});//side: THREE.DoubleSide, transparent: true});
mat_skybox.map.wrapS = THREE.MirroredRepeatWrapping;
mat_skybox.map.wrapT = THREE.MirroredRepeatWrapping;
mat_skybox.map.repeat.x = 8;
mat_skybox.map.repeat.y = 4;
var geometry_skybox;
var geometry_cloudbox;
var mesh_skybox;
var mesh_cloudbox;

var cloudbox_animate;

var sealevel = -1;
var highness;
var wideness;				// decides the shape of the terrain

var start_chunk_x = 40;
var start_chunk_z = 37;

var ci1;		// current_chunk_x
var cj1;		// current_chunk_z

var last_chunk_x = 0;
var last_chunk_z = 0;

var frame_counter = -1;
var blackintro_frame_counter;
var main_loop_counter;		// counter for internal loop in one frame

// chunk creation
var chunk_process = new Array();
var chunk_process_x;
var chunk_process_z;
for (chunk_process_x = 0; chunk_process_x < 46; chunk_process_x++)
{
	chunk_process[chunk_process_x] = new Array();
	for (chunk_process_z = 0; chunk_process_z < 46; chunk_process_z++)
	{
		chunk_process[chunk_process_x][chunk_process_z] = 0;

coverage[0]++;
	}
}

chunk_process_x = 0;
chunk_process_z = 0;

// dynamic loading of terrain
var to_load_chunk_x = new Array();
var to_load_chunk_z = new Array();
for (let t = 0; t < 25; t++)	// 25 = 5x5 chunks
{
	to_load_chunk_x[t] = 7;
	to_load_chunk_z[t] = 7;
}
var dynload_hm_to_load_i = 0;
var dynload_objects_to_load_i = 0;

var continue_create = 0;
var continue_create2 = 0;
var continue_create3 = 0;
var continue_createb = 0;
var continue_create2b = 0;
var continue_create3b = 0;

var nextpart_start = 0;
var dynload_objects_skipping = 0;
var dynload_height_skipping = 0;

var i_continue = 0;
var j_continue = 0;
var i_continueb = 0;
var j_continueb = 0;


// ---------------------------- //
// create level variable arrays //
// ---------------------------- //
// Graham Relf, Forest (1983), heightmap generation algorithm
var profile = [
 77, 80, 84, 88, 92, 96,101,104,108,112,115,118,120,123,126,129,131,133,134,134,133,133,131,130,129,126,123,122,122,122,123,125,126,130,134,137,137,138,138,137,
135,133,129,123,118,111,105,101, 97, 93, 90, 86, 82, 78, 74, 71, 69, 67, 67, 67, 66, 67, 69, 71, 73, 74, 73, 73, 71, 69, 66, 62, 58, 54, 52, 52, 54, 55, 58, 59,
 62, 63, 63, 65, 65, 65, 66, 66, 67, 69, 70, 73, 77, 80, 82, 85, 88, 90, 93, 95, 96, 96, 96, 96, 93, 92, 90, 85, 80, 75, 71, 67, 63, 60, 58, 55, 52, 50, 47, 44,
 43, 41, 40, 39, 36, 35, 33, 32, 30, 28, 24, 20, 15, 11,  7,  3,  2,  2,  2,  2,  2,  2,  3,  6,  7, 10, 11, 15, 18, 22, 24, 25, 25, 26, 26, 25, 25, 25, 25, 25,
 26, 28, 29, 30, 33, 36, 37, 39, 39, 40, 40, 40, 39, 39, 39, 37, 37, 37, 36, 36, 36, 35, 35, 33, 33, 32, 30, 28, 25, 20, 15, 11, 10,  9,  9,  9,  9, 11, 14, 15,
 17, 17, 18, 18, 18, 18, 18, 18, 17, 17, 17, 15, 14, 13, 11, 11, 10, 10, 10, 11, 13, 14, 17, 20, 22, 25, 28, 30, 35, 39, 41, 45, 50, 58, 63, 69, 73, 77, 80, 82,
 84, 84, 85, 85, 84, 84, 82, 81, 80, 75, 73, 71, 71, 73, 74, 75 ];

var profile_star = [ 14, 18, 42, 47, 47, 51, 55, 8, 63, 14, 15, 2, 21, 23, 29, 3, 34, 36, 38, 40, 42, 5, 6, 9 ];	// another random profile

var profile_weird = [
2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 7, 4, 3, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2,
2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 7, 4, 3, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2,
2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 7, 4, 3, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2,
2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 7, 4, 3, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2,
2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 7, 4, 3, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2,
2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 7, 4, 3, 5, 4, 5, 4, 3, 2, 3, 5, 6, 8, 12, 12, 12, 5, 4, 5, 4, 3, 2,
2, 6, 9, 5, 1, 4, 12, 2, 2, 2, 5, 11, 13, 7, 5, 6 ];

// weights for terrain generator
var a, b, c, d, e;			// height
var da, db, dc, dd, de;			// height details
var ta, tb, tc, td, te;			// trees
var dta, dtb, dtc, dtd, dte;		// trees details

// seed and related values
var seed;
var weights_seed;			// not the same as seed
var master;
var master2;
var change4;
var change5;

var hm = new Array();			// heightmap
var chunkmap = new Array();		// same as heightmap but at a larger scale for chunks, 4 points per chunk (one for each chunk corner)
var om = new Array();			// "objects map" - trees, houses, etc
var hm_is_loaded = new Array();		// array that says which chunks have loaded heightmap etc
var objects_is_loaded = new Array();	// array that says which chunks have loaded objects etc
var large_arrays_is_created = new Array();

var mesh_terrain = new Array();
var mesh_houses = new Array();
var mesh_skyscrapers = new Array();
var mesh_barns = new Array();
var pointsprites_trees = new Array();
var pointsprites_bushes = new Array();
var pointsprites_grass = new Array();
var ver_terrain = [];
var ver_houses = [];
var ver_skyscrapers = [];
var ver_barns = [];
var ver_trees = [];
var ver_bushes = [];
var ver_grass = [];

var ver_rain = [];
var pointsprites_snow;
var geometry_rain;
var mat_snow;

var uv_terrain = new Float32Array(28812);	// 28812 = 49*49*12 (heightvalues per chunk, times UV values per heightvalue)
//var uv_terrain = new Float32Array(28812);	// 30000 is slightly more than 324*84 (324 is the largest amount of houses/skyscrapers/barns in any chunk, i think)
//var normals = new Float32Array(28812);

// variables
let _1D49 = 1/49;

// UV for terrain mesh
for (let uvi = 0; uvi < 28812; uvi += 12)
{
	let current_line = Math.floor(uvi/(49*12));

	// variables
	let uviD12Mcurrent_lineX49 = uvi/12-current_line*49;

				  // x on the texture							  // y on the texture		        // corners on the 3d triangle
	uv_terrain[uvi]		= (_1D49+(_1D49)*(uviD12Mcurrent_lineX49));	uv_terrain[uvi+1]	= (current_line*(_1D49));		// 1
	uv_terrain[uvi+2]	= ((_1D49)*(uviD12Mcurrent_lineX49));		uv_terrain[uvi+3]	= (_1D49+current_line*(_1D49));		// 2
	uv_terrain[uvi+4]	= ((_1D49)*(uviD12Mcurrent_lineX49));		uv_terrain[uvi+5]	= (current_line*(_1D49));		// 3
	uv_terrain[uvi+6]	= (_1D49+(_1D49)*(uviD12Mcurrent_lineX49));	uv_terrain[uvi+7]	= (current_line*(_1D49));		// 4 (är samma som 1)		// g�r denna �verfl�dig?
	uv_terrain[uvi+8]	= (_1D49+(_1D49)*(uviD12Mcurrent_lineX49));	uv_terrain[uvi+9]	= (_1D49+current_line*(_1D49));		// 5
	uv_terrain[uvi+10]	= (_1D49*(uviD12Mcurrent_lineX49));		uv_terrain[uvi+11]	= (_1D49+current_line*(_1D49));		// 6 (är samma som 2)		// g�r denna �verfl�dig?

	// just setting all these to the same values. it seems to work, don't know why. and it's faster than three.js's computeVertexNormals()
//	normals[uvi] = 0.05;		normals[uvi+1] = 0.05;
//	normals[uvi+2] = 0.05;		normals[uvi+3] = 0.05;
//	normals[uvi+4] = 0.05;		normals[uvi+5] = 0.05;
//	normals[uvi+6] = 0.05;		normals[uvi+7] = 0.05;
//	normals[uvi+8] = 0.05;		normals[uvi+9] = 0.05;
//	normals[uvi+10] = 0.05;		normals[uvi+11] = 0.05;
}

var uv_attribute_terrain = new THREE.BufferAttribute(new Float32Array(uv_terrain), 2);
//var normals_attribute = new THREE.BufferAttribute(new Float32Array(uv_terrain), 2);

// UV for houses
for (let uvi = 0; uvi < 30000; uvi += 84)
{
	// walls (all are the same)
	for (let t = 0; t < 4; t++)
	{
		uv_terrain[uvi+12*t] = 0.5; uv_terrain[uvi+12*t+1] = 0;
		uv_terrain[uvi+12*t+2] = 1; uv_terrain[uvi+12*t+3] = 0;
		uv_terrain[uvi+12*t+4] = 1; uv_terrain[uvi+12*t+5] = 13;

		uv_terrain[uvi+12*t+6] = 1; uv_terrain[uvi+12*t+7] = 13;
		uv_terrain[uvi+12*t+8] = 0.5; uv_terrain[uvi+12*t+9] = 13;
		uv_terrain[uvi+12*t+10] = 0.5; uv_terrain[uvi+12*t+11] = 0;

coverage[1]++;
	}

	// roof
	uv_terrain[uvi+48] = 0.5; uv_terrain[uvi+49] = 0;
	uv_terrain[uvi+50] = 0; uv_terrain[uvi+51] = 0;
	uv_terrain[uvi+52] = 0; uv_terrain[uvi+53] = 0.5;
	uv_terrain[uvi+54] = 0; uv_terrain[uvi+55] = 0.5;
	uv_terrain[uvi+56] = 0.5; uv_terrain[uvi+57] = 0.5;
	uv_terrain[uvi+58] = 0.5; uv_terrain[uvi+59] = 0;

	uv_terrain[uvi+60] = 0.5; uv_terrain[uvi+61] = 0.5;
	uv_terrain[uvi+62] = 0; uv_terrain[uvi+63] = 0.5;
	uv_terrain[uvi+64] = 0; uv_terrain[uvi+65] = 1;
	uv_terrain[uvi+66] = 0; uv_terrain[uvi+67] = 1;
	uv_terrain[uvi+68] = 0.5; uv_terrain[uvi+69] = 1;
	uv_terrain[uvi+70] = 0.5; uv_terrain[uvi+71] = 0.5;

	// tak"nock"
	uv_terrain[uvi+72] = 0; uv_terrain[uvi+73] = 0;
	uv_terrain[uvi+74] = 0.25; uv_terrain[uvi+75] = 0.5;	// längst upp på tak"nocken"
	uv_terrain[uvi+76] = 0.5; uv_terrain[uvi+77] = 0;

	uv_terrain[uvi+78] = 0.5; uv_terrain[uvi+79] = 0;
	uv_terrain[uvi+80] = 0.25; uv_terrain[uvi+81] = 0.5;	// längst upp på tak"nocken"
	uv_terrain[uvi+82] = 0; uv_terrain[uvi+783] = 0;
}

var uv_attribute_houses = new THREE.BufferAttribute(new Float32Array(uv_terrain), 2);

// make arrays empty
//normals = new Float32Array(0);
//uv_terrain = new Float32Array(0);
//uv_terrain = new Float32Array(0);


// --------------------------- //
// ---- GENERAL FUNCTIONS ---- //
// --------------------------- //
//
function hexcol(fobject, hex)
{
	fobject.r = ( hex >> 16 & 255 ) / 255;
	fobject.g = ( hex >> 8 & 255 ) / 255;
	fobject.b = ( hex & 255 ) / 255;
}

//* convert x or z position to chunk number
function x_to_chunk_no(x) { return Math.floor(x/49); }

//* convert x or z position to x or z position relative to chunk
//function x_to_x_in_chunk(x) { return x-(x_to_chunk_no(x)*49); }

function x_to_x_in_chunk(x) { return x-(Math.floor(x/49)*49); }

//* convert chunk-relative x or z position to "real" x or z position
function x_in_chunk_to_x(fi1, fi) { return 49*fi1+fi; }

//* get distance between two points
function distance_get_xz(fx1, fz1, fx2, fz2) { let sqrta = fx2-fx1, sqrtb = fz2-fz1; return Math.sqrt(sqrta*sqrta + sqrtb*sqrtb); }

//function distance_get_xz_pre(fx_dist, fz_dist) { return fx_dist*fx_dist + fz_dist*fz_dist; }	// utan Math.sqrt

//* get distance between two czs/objects
function distance_get(fobject1, fobject2) { return Math.sqrt((fobject2.position.x-fobject1.position.x)*(fobject2.position.x-fobject1.position.x) + (fobject2.position.z-fobject1.position.z)*(fobject2.position.z-fobject1.position.z)); }	// distance between two objects

//* get height at position, not exact height but heightgrid height
function height_get_xz(x, z)
{
	let x_floor = Math.floor(x);
	let z_floor = Math.floor(z);
//	return hm[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];
	return hm[Math.floor(x_floor/49)][Math.floor(z_floor/49)][x_floor-(Math.floor(x_floor/49)*49)][z_floor-(Math.floor(z_floor/49)*49)];
}

//* get exact height at position (interpolates between four points (height values) to find out the exact value - https://codeplea.com/triangular-interpolation)
function height_get_xz_exact(x, z)
{
	// check if you're in the first or second triangle, for height value interpolation
	// then create values for height value interpolation
	let p_xf = Math.floor(x), p_zf = Math.floor(z);
	let p_xc = Math.ceil(x), p_zc = Math.ceil(z);
	let p_xd = x-p_xf, p_zd = z-p_zf;
	let p_value;

	let ixf = x_to_chunk_no(p_xf), izf = x_to_chunk_no(p_zf);
	let ixc = x_to_chunk_no(p_xf+1), izc = x_to_chunk_no(p_zf+1);
	let xf = x_to_x_in_chunk(p_xf), zf = x_to_x_in_chunk(p_zf);
	let xc = x_to_x_in_chunk(p_xf+1), zc = x_to_x_in_chunk(p_zf+1);

	// first triangle
	if (p_xd + p_zd < 1)
	{
		if (hm_is_loaded[x_to_chunk_no(p_xf)][x_to_chunk_no(p_zf)] === 1)
		{
			if (hm[ixf][izf][xf][zf] === undefined) throw new Error("ixf = " + ixf + ", izf = " + izf + ", xf = " + xf + ", zf = " + zf);
			else p_value = (1-p_xd-p_zd)*hm[ixf][izf][xf][zf] + p_zd*hm[ixf][izc][xf][zc] + p_xd*hm[ixc][izf][xc][zf];		// calculate interpolated value for point p from "weights"

coverage[2]++;
		}
		else return 1;

coverage[3]++;
	}
	// second triangle
	else
	{
		if (hm_is_loaded[x_to_chunk_no(p_xc)][x_to_chunk_no(p_zc)] === 1)
		{
			p_value = (p_xd+p_zd-1)*hm[ixc][izc][xc][zc] + (1-p_zd)*hm[ixc][izf][xc][zf] + (1-p_xd)*hm[ixf][izc][xf][zc];		// calculate interpolated value for point p from "weights"

coverage[4]++;
		}
		else return 1;

coverage[5]++;
	}

	return p_value+0.3;							// 0.3 is for looks inside the game
}

//* get exact height at a cz's/object's position
function height_get(fobject)
{
	return height_get_xz_exact(fobject.position.x, fobject.position.z);
}

//* get object value (another thing than cz/object. this is part of the terrain: trees, houses, etc) at cz's/object's position
function object_get(object)
{
	let x_floor = Math.floor(object.position.x), z_floor = Math.floor(object.position.z);
	let object_code = om[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];
	return object_code;
}

// get pseudorandom value. always returns the same value if number is the same
//function pseudorandom(number) { return 29.197483*number - Math.floor(29.197483*number); }
function pseudorandom(number) { return Math.sin(number); }	// kanske ta bort funktionen ocks�? bara Math.sin() eller cos osv direkt i koden? kan bli -1 ocks�!


// ------------------------------------- //
// ---- CHOOSE THE TERRAIN SETTINGS ---- //
// ------------------------------------- //
//: From Graham Relf's game The Forest. All terrain creation in the game is based on this
function grelf() { return profile[a & 0xFF] + profile[b & 0xFF] + profile[c & 0xFF] + profile[d & 0xFF] + profile[e & 0xFF]; }

//: variation on grelf()
function grelf3() { return profile[c & 0xFF] + profile[a & 0xFF] + (-profile[d & 0xFF]) + profile[e & 0xFF] + (-profile[b & 0xFF]); }

//: a more "high-res" version of grelf()
function grelf_detail() { return profile[da & 0xFF] + profile[db & 0xFF] + profile[dc & 0xFF] + profile[dd & 0xFF] + profile[de & 0xFF]; }

//: variation on grelf_detail()
function grelf_detail2() { return profile[dd & 0x3] + profile[dc & 0x21] + profile[db & 0x11] + profile[de & 0x3] + profile[da & 0x3]; }

//: just a bit different grelf(), i think
function grelf_objects() { return profile[da/2 & 0xF] + profile[db & 0xFF] + profile[dc/2 & 0xF] + profile[dd/2 & 0xF] + profile[de/2 & 0xF]; }

//: a more "high-res" version of grelf_objects(), i think
function grelf_objects_detail() { return profile[(dta*2) & 0xF] + profile[(dtb*2) & 0xF] + profile[(dtc*2) & 0xF] + profile[(dtd*2) & 0xF] + profile[(dte*2) & 0xF]; }

//: just a bit different grelf(), i think
function grelf_houses() { return 2*profile[a & 0xFF] - profile[c & 0xFF] - 3*profile[d & 0xFF]; }

//: a high-res version of grelf()
function grelf_weird() { return profile_weird[c & 0xFF] + profile_weird[a & 0xFF] + (-profile_weird[d & 0xFF]) + profile_weird[e & 0xFF] + (-profile_weird[b & 0xFF]); }

//: here i set values that decide how the weights in set_weights() will turn out (= how the terrain will look)
function set_wideness_highness(fi1, fj1)
{
	wideness = 4*seed;
	highness = 100*seed;
	weights_seed = 3;

	master = (((seed*10-Math.floor(seed*10))*30)/9+1)*0.5;
	master2 = (seed*111-Math.floor(seed*111))*20;
	change4 = seed*21-Math.floor(seed*21);
	change5 = seed*17-Math.floor(seed*17);
}

//: here weights get set that decide how the hm and object generation will turn out. everything here should come originally from the seed variable
function set_weights(fi1, fj1, fi, fj)
{
	// 50 = chunkwidth, 49 = chunkwidth-1
	let fx = fi1*50+fi;
	let fz = fj1*50+fj;

	// make it right at the end of chunks too
	if (fi === 49) fx++;
	if (fj === 49) fz++;

	// variables so I don't have to calculate the same thing over and over
	let fxXwideness = fx*wideness;
	let _12XfxXwideness = 12*fxXwideness;
	let fzXwideness = fz*wideness;
	let master2XfzXwideness = master2*fzXwideness;

	// main weights
	a = ((weights_seed&2)*  _12XfxXwideness + (weights_seed&6)*4.2 *master2XfzXwideness) * 0.01;
	b = ((weights_seed&7)*12.6 *fxXwideness + (weights_seed&4)*     master2XfzXwideness*0.6) * 0.01;
	c = ((weights_seed&4)*  _12XfxXwideness + (weights_seed&9)*12  *change4*master2XfzXwideness) * 0.01;
	d = ((weights_seed&8)*12.6 *fxXwideness + (weights_seed&1)*12  *change5*master2XfzXwideness) * 0.01;
	e = ((weights_seed&3)*  _12XfxXwideness + (weights_seed&5)*6.6 *master2XfzXwideness) * 0.01;

	// variables
	let fxXwidenessX0_1 = fx*wideness*0.1;

	// detail weights
	da = (weights_seed&4)*(master2+1)*fxXwidenessX0_1 + (weights_seed&3)*0.7*fzXwideness;
	db = (weights_seed&1)*(1-master2)*fxXwidenessX0_1 + (weights_seed&4)*1.1*fzXwideness;
	dc = (weights_seed&3)*(master2+8)*fxXwidenessX0_1 + (weights_seed&2)*1.4*fzXwideness;
	dd = (weights_seed&5)*(master2*1)*fxXwidenessX0_1 + (weights_seed&3)*1.3*fzXwideness;
	de = (weights_seed&6)*(5/master2)*fxXwidenessX0_1 + (weights_seed&3)*1.1*fzXwideness;

	// variables
	let fzXwidenessX0_6 = fzXwideness*0.6;
	let masterPmaster2XfzXwidenessX0_6 = (master+master2)*fzXwidenessX0_6;

	// tree weights
	ta = 1.8   *fxXwideness + 1.2  *masterPmaster2XfzXwidenessX0_6;
	tb = 2.4   *fxXwideness + 0.6  *(master-master2)*fzXwidenessX0_6;
	tc = 3     *fxXwideness + 14.4 *masterPmaster2XfzXwidenessX0_6;
	td = 3.6   *fxXwideness + 1.8  *(master-master2)*fzXwidenessX0_6;
	te = 4.2   *fxXwideness + 12.6 *masterPmaster2XfzXwidenessX0_6;

	// tree details weights
	dta = 1.2  *fxXwideness + 1.8 *fzXwideness;
	dtb = 0.6  *fxXwideness + 2.4 *fzXwideness;
	dtc = 14.4 *fxXwideness + 3   *fzXwideness;
	dtd = 1.8  *fxXwideness + 3.6 *fzXwideness;
	dte = 12.6 *fxXwideness + 4.2 *fzXwideness;
}

//: tilts a whole chunk. complicated to explain but it's cool and effective
function calculate_chunklevel(fi1, fj1, fi, fj)
{
	// interpolation in triangle, read about the calculation here: https://codeplea.com/triangular-interpolation
	// height values for points in triangle

	// check if you're in the first or second triangle, for height value interpolation
	// then create values for height value interpolation
	let p_x = fi*0.02, p_z = fj*0.02;
	let p_value;

	// first triangle
	if (p_x + p_z < 1)
	{
		p_value = (1-p_x-p_z)*chunkmap[fi1][fj1] + p_z*chunkmap[fi1][fj1+1] + p_x*chunkmap[fi1+1][fj1];		// calculate interpolated value for point p from "weights"

coverage[6]++;
	}
	// second triangle
	else
	{
		p_value = (p_x+p_z-1)*chunkmap[fi1+1][fj1+1] + (1-p_z)*chunkmap[fi1+1][fj1] + (1-p_x)*chunkmap[fi1][fj1+1];		// calculate interpolated value for point p from "weights"

coverage[7]++;
	}

	return p_value;
}


// -------------------------------------------------------------------------------------- //
// ---- CREATE THE HEIGHTMAP (terrain) AND THE OBJECTS (trees, houses, roads) ARRAYS ---- //
// -------------------------------------------------------------------------------------- //
//- abstraction for race_create()
function add_road_block(fx, fz)
{
	// här kan man räkna ut några fi1 och fj1 i början! men se till att det g�att!
	let xj1mm = x_to_chunk_no(fz-2);
	let xj1m = x_to_chunk_no(fz-1);
	let xj1 = x_to_chunk_no(fz);
	let xj1p = x_to_chunk_no(fz-1);
	let xj12 = x_to_chunk_no(fz+2);
	let xj13 = x_to_chunk_no(fz+3);

	// "4-filig v�g"
	let xi1 = x_to_chunk_no(fx-1);
	om[xi1][xj1m][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz-1)] = 0;
	om[xi1][xj1][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz)] = 0;
	om[xi1][xj1p][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+1)] = 0;
	om[xi1][xj12][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+2)] = 0;

	xi1 = x_to_chunk_no(fx);
	om[xi1][xj1m][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz-1)] = 0;
	om[xi1][xj1][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz)] = 0;
	om[xi1][xj1p][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+1)] = 0;
	om[xi1][xj12][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+2)] = 0;

	xi1 = x_to_chunk_no(fx+1);
	om[xi1][xj1m][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz-1)] = 0;
	om[xi1][xj1][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz)] = 0;
	om[xi1][xj1p][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+1)] = 0;
	om[xi1][xj12][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+2)] = 0;

	xi1 = x_to_chunk_no(fx+2);
	om[xi1][xj1m][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz-1)] = 0;
	om[xi1][xj1][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz)] = 0;
	om[xi1][xj1p][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+1)] = 0;
	om[xi1][xj12][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+2)] = 0;
}

//- creates a road, from an array of coordinates, that can be used for race. it also adds a bit of randomization in between the coordinates. unlike most other world generation that is automatic from simple seed values etc, this is semi-manual.
function race_create(x_array, z_array, number)
{
	mesh_checkpoint_x[number] = new Array();
	mesh_checkpoint_z[number] = new Array();

	checkstep_x[number] = new Array();
	checkstep_z[number] = new Array();

	let check_x;
	let check_z;

	let array_pos = 0;
	let k = 0;

	while (array_pos < x_array.length-1)
	{
		mesh_checkpoint_x[number][k] = x_array[array_pos];
		mesh_checkpoint_z[number][k] = z_array[array_pos];
		k++;

		let step = 0;

		// create new race checkpoint
		let startpos_x = check_x;
		let startpos_z = check_z;

		check_x = x_array[array_pos];
		check_z = z_array[array_pos];

		while (distance_get_xz(check_x,check_z, startpos_x,startpos_z) > 1)
		{
			let delta_x = check_x-startpos_x;
			let delta_z = check_z-startpos_z;

			delta_x += delta_x;
			delta_z += delta_z;

			let delta_x_u;
			let delta_z_u;
			let delta_x_low;
			let delta_z_low;

			if (delta_x < 0) delta_x_u = delta_x*-1; else delta_x_u = delta_x;
			if (delta_z < 0) delta_z_u = delta_z*-1; else delta_z_u = delta_z;

			if (delta_x_u > delta_z_u)
			{
				if (delta_z_u > 1)
				{
					delta_x_low = Math.round(delta_x/delta_z_u);
					if (delta_z > 0) delta_z_low = 1; else delta_z_low = -1;

coverage[8]++;
				}
				else
				{
					if (delta_x > 0) delta_x_low = 2; else delta_x_low = -2;
					delta_z_low = 0;

coverage[9]++;
				}

coverage[10]++;
			}
			else
			{
				if (delta_x_u > 1)
				{
					delta_z_low = Math.round(delta_z/delta_x_u);
					if (delta_x > 0) delta_x_low = 1; else delta_x_low = -1;

coverage[11]++;
				}
				else
				{
					if (delta_z > 0) delta_z_low = 2; else delta_z_low = -2;
					delta_x_low = 0;

coverage[12]++;
				}

coverage[13]++;
			}
			if (delta_x_low > 6) delta_x_low = 6;
			else if (delta_x_low < -6) delta_x_low = -6;
			if (delta_z_low > 6) delta_z_low = 6;
			else if (delta_z_low < -6) delta_z_low = -6;

			if (delta_x_low >= 0) roadblock_x = startpos_x+delta_x_low;
			else roadblock_x = startpos_x+delta_x_low;
			if (delta_z_low >= 0) roadblock_z = startpos_z+delta_z_low;
			else roadblock_z = startpos_z+delta_z_low;

			checkstep_x[number][step] = roadblock_x;
			checkstep_z[number][step] = roadblock_z;		// part steps between checkpoints
			step++;

			let xxx;
			let zzz;

			if (delta_x_low >= 0) xxx = 1; else xxx = -1;
			if (delta_z_low >= 0) zzz = 1; else zzz = -1;

			// blocks between the "main" road blocks
			if (delta_x_low >= 0)
			{
				while (xxx < delta_x_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint_x[number][k] = x_array[array_pos];
					mesh_checkpoint_z[number][k] = z_array[array_pos];
					k++;
					xxx += 2;

coverage[14]++;
				}
				xxx -= 2;

coverage[15]++;
			}
			else
			{
				while (xxx > delta_x_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint_x[number][k] = x_array[array_pos];
					mesh_checkpoint_z[number][k] = z_array[array_pos];
					k++;
					xxx -= 2;

coverage[16]++;
				}
				xxx += 2;

coverage[17]++;
			}
			if (delta_z_low >= 0)
			{
				while (zzz < delta_z_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint_x[number][k] = x_array[array_pos];
					mesh_checkpoint_z[number][k] = z_array[array_pos];
					k++;
					zzz += 2;

coverage[18]++;
				}
				zzz -= 2;

coverage[19]++;
			}
			else
			{
				while (zzz > delta_z_low)
				{
					add_road_block(startpos_x+xxx, startpos_z+zzz);
					mesh_checkpoint_x[number][k] = x_array[array_pos];
					mesh_checkpoint_z[number][k] = z_array[array_pos];
					k++;
					zzz -= 2;


coverage[20]++;
				}
				zzz += 2;

coverage[21]++;
			}

			add_road_block(roadblock_x, roadblock_z);		// continue the "main" road block
			mesh_checkpoint_x[number][k] = x_array[array_pos];
			mesh_checkpoint_z[number][k] = z_array[array_pos];
			k++;

			startpos_x = roadblock_x; startpos_z = roadblock_z;	// start next loop...

coverage[22]++;
		}

		array_pos++;

coverage[23]++;
	}
}

//: creating a lake/hole in ONE chunk. or mountain
function terrain_amplify(th, fi1, fj1, fi, fj, depth)
{
	// 49 = 49, 24.5 = 0.5*49
	let power_x, power_z;
	if (fi < 24.5) power_x = fi;
	else power_x = 49-fi;
	if (fj < 24.5) power_z = fj;
	else power_z = 49-fj;
	th += 0.0005*power_x*power_z*(depth*100-th);

	return th;
}

//: creating a lake/hole in 4 chunks. or mountain
function terrain_amplify_4chunks(fi1_start, fj1_start, fi1, fj1, fi, fj, depth, fpower)
{
	depth *= -1;	// konstig fix...

	let origo_x = (fi1_start+1)*49;
	let origo_z = (fj1_start+1)*49;
	let power_x, power_z;
	if (x_in_chunk_to_x(fi1, fi) < origo_x) power_x = 49-(origo_x-x_in_chunk_to_x(fi1, fi));		// make the lake deeper closer to an "origo" point in the middle
	else power_x = 49-(x_in_chunk_to_x(fi1, fi)-origo_x);
	if (x_in_chunk_to_x(fj1, fj) < origo_z) power_z = 49-(origo_z-x_in_chunk_to_x(fj1, fj));
	else power_z = 49-(x_in_chunk_to_x(fj1, fj)-origo_z);
	hm[fi1][fj1][fi][fj] -= fpower*0.0000005*power_x*power_x*power_z*power_z*(depth*100-hm[fi1][fj1][fi][fj]);
}

//: make plains in terrain
function terrain_make_plains(th, fi1, fj1, fi, fj, base)
{
	if (th < base)
	{
		th = base+th*0.5;

		// these many lines is for the transition between terrain_make_plains and mountains, and so it all feels natural, i think
		if (th-base > 0.5) th = base+(th-base)*0.05;
		else if (th-base > 1) th = base+(th-base)*0.1;
		else if (th-base > 1.5) th = base+(th-base)*0.15;
		else if (th-base > 2) th = base+(th-base)*0.2;
		else if (th-base > 2.5) th = base+(th-base)*0.25;
		else if (th-base > 3) th = base+(th-base)*0.3;
		else if (th-base > 3.5) th = base+(th-base)*0.35;
		else if (th-base > 4) th = base+(th-base)*0.4;
		else if (th-base > 4.5) th = base+(th-base)*0.45;
		else if (th-base > 5) th = base+(th-base)*0.5;

coverage[24]++;
	}

	return th;
}

//: generate heightvalues to the hm[][][][] array
function calculate_height(fi1, fj1, fi, fj)
{
	hm[fi1][fj1][fi][fj] = 9*(fi1 + fi/50) + 0.07*grelf() + 0.001*grelf_detail()*(fi1-20 + fi/50);
}

//: heightvalues generated by the in-game "minecraft" editor. this runs only one time per chunk, otherwise it's very slow. these should get added after everything else (if everything is set up right).
function calculate_height_after(fi1, fj1)
{
}

//: generate object values to the om[][][][] array
function generate_objects_array(fi1, fj1, fi, fj)
{
	// ---- TREES ---- //
	if (hm[fi1][fj1][fi][fj] > sealevel+0.5)
	{
		let curve_trees = grelf3()+grelf_objects();
		// ---- tweaking ---- //
		// curve_trees += osv...

		// f�rre tr�d �t v�st och syd
		let westnsouth = 0.3*(fi1-26)+(fj1-26);
		let treemin = 570-40;
		let treemax = 600+40;

		// f�rre tr�d riktigt l�ngt ner (f�rmodligen precis vid havet)

		// ---- auto generating ---- //
		if (curve_trees > treemin && curve_trees < treemax)		// godtyckligt
		{
			// calculate slope
			let c = 0, l = 0, r = 0, m = 0;
			if (fi+1 < chunkwidth-1) c = Math.abs(hm[fi1][fj1][fi+1][fj]-hm[fi1][fj1][fi][fj]);
			if (fj+1 < chunkwidth-1) l = Math.abs(hm[fi1][fj1][fi][fj+1]-hm[fi1][fj1][fi][fj]);
			if (fi-1 > 0) r = Math.abs(hm[fi1][fj1][fi-1][fj]-hm[fi1][fj1][fi][fj]);
			if (fj-1 > 0) m = Math.abs(hm[fi1][fj1][fi][fj-1]-hm[fi1][fj1][fi][fj]);

			let szl = c+l+r+m;

			// only make tree if steep slope, otherwise cancel out
			// f�rre tr�d ju h�gre upp, och ocks� d�r baserat p� syd och v�st
			//if (//szl > 5)
			//{
				// glesare ju l�ngre v�st och syd - f�renkla koden!!
				if (pseudorandom(fi*fj+fi1*fj1) > hm[fi1][fj1][fi][fj]/400+0.05)
				{
					om[fi1][fj1][fi][fj] = ASCEND_TREE;
		
				// "seed" system (this is REAL tree seeds and not random number seed
				if (Math.floor(curve_trees) % 5 === 0)	// not in dark gandalf's house
				{
					let seed_length = Math.floor(pseudorandom(fi*fj)*10);
					if (seed_length > 5) seed_length = 10;
					else seed_length = 1;
					if (fi-seed_length > 0 && fj-seed_length > 0 && om[fi1][fj1][fi-seed_length][fj-seed_length] !== ASCEND_ROAD)
					{
						// seed for new bush
						if (Math.floor(curve_trees) % 3 === 0)
						{
							if (hm[fi1][fj1][fi-seed_length][fj-seed_length] > sealevel+0.5 && om[fi1][fj1][fi-seed_length][fj-seed_length] !== ASCEND_ROAD) om[fi1][fj1][fi-seed_length][fj-seed_length] = ASCEND_BUSH;	// throw seed diagonally

coverage[25]++;
						}
						else
						{
							if (hm[fi1][fj1][fi-seed_length][fj] > sealevel+0.5 && om[fi1][fj1][fi-seed_length][fj] !== ASCEND_ROAD) om[fi1][fj1][fi-seed_length][fj] = ASCEND_GRASS;			// throw seed straight to the i direction

coverage[26]++;
						}

coverage[27]++;
					}

coverage[28]++;
				}

coverage[29]++;
				}

coverage[30]++;
			//}

coverage[31]++;
		}
		else if (curve_trees > treemin-10 && (fi % 8 === 0 || fj % 16 === 0))
		{
			om[fi1][fj1][fi][fj] = ASCEND_BUSH;

coverage[32]++;
		}

coverage[33]++;
	}

	// ---- manual additions ---- //

	// ---- HOUSES ---- //
	let curve_objects = grelf_objects()*highness*0.0001-grelf_objects_detail()*highness*0.0002;
	if (curve_objects > -0.2) { curve_objects = -100; }
	if (curve_objects < (-0.1/master2)+2 && hm[fi1][fj1][fi][fj] > sealevel+1
	    && (((fi1*3/fj1/fi*2/fj)*100)-(Math.floor((fi1*3/fj1/fi*2/fj)*100)) <= 0.6)	// något från itch release som tar bort lite hus
	    && om[fi1][fj1][fi][fj] !== ASCEND_ROAD		// make sure that you don't add a house where there is a road
	    && (fi > 0 && fi < 49 && fj > 0 && fj < 50)		// ... (I had to add this because the dynamic loading seems to do things in the wrong order sometimes...)
	    && (fi % 3 === 0 && fj % 3 === 0))
	{
		let curve_houses = grelf_houses()*highness*0.0005;

		// ---- tweaking ---- //
		if (fi1 === 37 && fj1 === 36)
		{ }
		else curve_houses += 10000;

		// ---- auto generating ---- //
		if (curve_houses <= 0.5)
		{
			// calculate slope
			let c = 0, l = 0, r = 0, m = 0;
			if (fi+1 < chunkwidth-1) c = Math.abs(hm[fi1][fj1][fi+1][fj]-hm[fi1][fj1][fi][fj]);
			if (fj+1 < chunkwidth-1) l = Math.abs(hm[fi1][fj1][fi][fj+1]-hm[fi1][fj1][fi][fj]);
			if (fi-1 > 0) r = Math.abs(hm[fi1][fj1][fi-1][fj]-hm[fi1][fj1][fi][fj]);
			if (fj-1 > 0) m = Math.abs(hm[fi1][fj1][fi][fj-1]-hm[fi1][fj1][fi][fj]);

			// only make house if not steep slope, otherwise cancel out
			if (c+l+r+m <= 5)
			{
				let housetype = ((curve_objects*-0.1)/(curve_objects*-0.1+1))*9*9;

				// knasa till hustyperna med en annan profil
				if (((fi1*7/fj1/fi*11/fj)*100)-(Math.floor((fi1*7/fj1/fi*11/fj)*100)) > 0.6)
				{
					housetype += profile_star[(fi1*50+fi)*31+(fj1*50+fj)*11 & 0xF]*0.01;

coverage[34]++;
				}

				housetype = Math.floor(housetype);

				if (housetype < 7)
				{
					om[fi1][fj1][fi][fj] = ASCEND_HOUSE;

coverage[35]++;
				}
				else if (housetype >= 7 && housetype < 8.5)
				{
					if ((fi >= 4 && fi <= 45) && (fj >= 4 && fj <= 45))	// 45 = chunkwdith-5. detta för att det ska se bra ut när hus tänds och släcks när man åker in i nya chunks
					{
						// variation
						if (fi1 % 9 < 3 && fj1 % 3 === 0) {}
						else om[fi1][fj1][fi][fj] = ASCEND_SKYSCRAPER;

coverage[36]++;
					}

coverage[37]++;
				}
				else
				{
					if ((fi >= 4 && fi <= 45) && (fj >= 4 && fj <= 45))
					{
						om[fi1][fj1][fi][fj] = ASCEND_BARN;

coverage[38]++;
					}

coverage[39]++;
				}

coverage[40]++;
			}

coverage[41]++;
		}

coverage[42]++;
	}

	// ---- manual additions ---- //
}

//: objects generated by the in-game "minecraft" editor. this runs only one time per chunk, otherwise it's very slow. these should get added after everything else (if everything is set up right).
function generate_objects_array_after(fi1, fj1)
{
}


// ---------------------------------------------------------------------- //
// ---- CREATE THE 3D MESHES FOR THE TERRAIN CHUNKS AND HOUSES/TREES ---- //
// ---------------------------------------------------------------------- //
//% create terrain vertices from hm
function create_terrain_3d_vertices(fi1, fj1, fi, fj)
{
	// create first triangle
	ver_terrain.push(49*fi1+fi, hm[fi1][fj1][fi][fj+1], 49*fj1+fj+1);
	ver_terrain.push(49*fi1+fi+1, hm[fi1][fj1][fi+1][fj], 49*fj1+fj);
	ver_terrain.push(49*fi1+fi, hm[fi1][fj1][fi][fj], 49*fj1+fj);

	// create second triangle
	ver_terrain.push(49*fi1+fi, hm[fi1][fj1][fi][fj+1], 49*fj1+fj+1);
	ver_terrain.push(49*fi1+fi+1, hm[fi1][fj1][fi+1][fj+1], 49*fj1+fj+1);
	ver_terrain.push(49*fi1+fi+1, hm[fi1][fj1][fi+1][fj], 49*fj1+fj);
}

//% create house vertices
function create_objects_3d_ver_houses(fi1, fj1, fi, fj, ver_array, hght, roofheight)
{
	let h = hm[fi1][fj1][fi][fj];
	let cx = x_in_chunk_to_x(fi1, fi);
	let cz = x_in_chunk_to_x(fj1, fj);
	let und = 20-hght;

	// first wall
	ver_array.push(cx, h-und, cz);		// first triangle
	ver_array.push(cx, h-und, cz+1);
	ver_array.push(cx, h+hght, cz+1);
	ver_array.push(cx, h+hght, cz+1);	// second triangle
	ver_array.push(cx, h+hght, cz);
	ver_array.push(cx, h-und, cz);

	// second wall
	ver_array.push(cx+1, h-und, cz);
	ver_array.push(cx, h-und, cz);
	ver_array.push(cx, h+hght, cz);
	ver_array.push(cx, h+hght, cz);
	ver_array.push(cx+1, h+hght, cz);
	ver_array.push(cx+1, h-und, cz);

	// third wall
	ver_array.push(cx+1, h-und, cz+1);
	ver_array.push(cx+1, h-und, cz);
	ver_array.push(cx+1, h+hght, cz);
	ver_array.push(cx+1, h+hght, cz);
	ver_array.push(cx+1, h+hght, cz+1);
	ver_array.push(cx+1, h-und, cz+1);

	// fourth wall
	ver_array.push(cx, h-und, cz+1);
	ver_array.push(cx+1, h-und, cz+1);
	ver_array.push(cx+1, h+hght, cz+1);
	ver_array.push(cx+1, h+hght, cz+1);
	ver_array.push(cx, h+hght, cz+1);
	ver_array.push(cx, h-und, cz+1);

	// roof
	let lngns = 1;
	let widns = 1;

	ver_array.push(cx, h+hght, cz);
	ver_array.push(cx, h+hght, cz+widns);
	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz+widns);
	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz+widns);
	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz);
	ver_array.push(cx, h+hght,cz);

	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz);
	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz+widns);
	ver_array.push(cx+lngns, h+hght, cz+widns);
	ver_array.push(cx+lngns, h+hght, cz+widns);
	ver_array.push(cx+lngns, h+hght, cz);
	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz);

	ver_array.push(cx, h+hght, cz);
 	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz);
	ver_array.push(cx+lngns, h+hght, cz);

	ver_array.push(cx+lngns, h+hght, cz+widns);
	ver_array.push(cx+lngns*0.5, h+hght+roofheight, cz+widns);
	ver_array.push(cx, h+hght, cz+widns);
}

//% create vertices for object mesh/sprites/etc
function create_objects_3d_vertices(fi1, fj1, fi, fj, number)
{
	if (om[fi1][fj1][fi][fj] === ASCEND_TREE)
	{
		if (fi-1 > 0 && fj-1 > 0)
		{
			let vran = 0.5 * (Math.random()-0.5);
			ver_trees.push(fi1*49+fi + vran, hm[fi1][fj1][fi][fj], fj1*49+fj + vran);

coverage[43]++;
		}

coverage[44]++;
	}
	else if (om[fi1][fj1][fi][fj] === ASCEND_BUSH)
	{
		if (fi-1 > 0 && fj-1 > 0)
		{
			ver_bushes.push(fi1*49+fi, hm[fi1][fj1][fi][fj], fj1*49+fj);

			// "seed" system
			if (!(fi1 === 38 && fj1 === 39) && Math.floor(fi+fj) % 3 === 0)		// not in dark gandalf's house
			{
				let seed_length = Math.floor(pseudorandom(fi)*10);
				if (seed_length > 5) seed_length = 10;
				else seed_length = 1;
				if (fi+seed_length < chunkwidth-1 && fj+seed_length < chunkwidth-1)
				{
					// seed for new bush
					if (Math.floor(fi+fj) % 6 === 0)
					{
						if (om[fi1][fj1][fi+seed_length][fj+seed_length] !== ASCEND_ROAD && hm[fi1][fj1][fi+seed_length][fj+seed_length] > sealevel+0.5)
						{
							om[fi1][fj1][fi+seed_length][fj+seed_length] = ASCEND_GRASS;	// throw seed diagonally

coverage[45]++;
						}

coverage[46]++;
					}
					else
					{
						if (om[fi1][fj1][fi][fj+seed_length] !== ASCEND_ROAD && hm[fi1][fj1][fi][fj+seed_length] > sealevel+0.5)
						{
							om[fi1][fj1][fi+seed_length][fj] = ASCEND_GRASS;		// throw seed straight to the i direction

coverage[47]++;
						}

coverage[48]++;
					}

coverage[49]++;
				}

coverage[50]++;
			}

coverage[51]++;
		}

coverage[52]++;
	}
	else if (om[fi1][fj1][fi][fj] === ASCEND_GRASS)
	{
		if (fi-1 > 0 && fj-1 > 0)
		{
			ver_grass.push(fi1*49+fi, hm[fi1][fj1][fi][fj], fj1*49+fj);

coverage[53]++;
		}

coverage[54]++;
	}
	else if (om[fi1][fj1][fi][fj] === ASCEND_HOUSE)
	{
		if (fi1 % 5 > 5*pseudorandom(fi1)) create_objects_3d_ver_houses(fi1, fj1, fi, fj, ver_houses, 1.1, 0.4);
		else create_objects_3d_ver_houses(fi1, fj1, fi, fj, ver_houses, 1.2, 0.7);

coverage[55]++;
	}
	else if (om[fi1][fj1][fi][fj] === ASCEND_SKYSCRAPER)
	{
		if ((fi1 >= 29 && fi1 <= 32) && (fj1 >= 28 && fj1 <= 34)) create_objects_3d_ver_houses(fi1, fj1, fi, fj, ver_skyscrapers, 5, 0.3);
		else create_objects_3d_ver_houses(fi1, fj1, fi, fj, ver_skyscrapers, 5, 0);

coverage[56]++;
	}
	else if (om[fi1][fj1][fi][fj] === ASCEND_BARN)
	{
		create_objects_3d_ver_houses(fi1, fj1, fi, fj, ver_barns, 1, 0.5);

coverage[57]++;
	}
}

//% dynamic function for creating meshes (and pointsprites, etc) from vertices
function create_3d_meshes(fi1, fj1)
{
	let geometry_terrain = new THREE.BufferGeometry();
	geometry_terrain.setAttribute('position', new THREE.Float32BufferAttribute(ver_terrain, 3));
	ver_terrain.length = 0;	// make array empty
	geometry_terrain.setAttribute('normal', uv_attribute_terrain);	// apparently, this works as well as computeVertexNormals(). don't know why, because they're all the same values, no computation made
	geometry_terrain.setAttribute('uv', uv_attribute_terrain);
	mat_terrain = tex("");		// sätter denna för att kunna lägga på en grund-färg eller nåt

	let geometry_houses = new THREE.BufferGeometry();
	geometry_houses.setAttribute('position', new THREE.Float32BufferAttribute(ver_houses, 3));
	ver_houses.length = 0;
	geometry_houses.setAttribute('normal', uv_attribute_terrain);
	geometry_houses.setAttribute('uv', uv_attribute_houses);
	mat_houses = tex("");

	let geometry_skyscrapers = new THREE.BufferGeometry();
	geometry_skyscrapers.setAttribute('position', new THREE.Float32BufferAttribute(ver_skyscrapers, 3));
	ver_skyscrapers.length = 0;
	geometry_skyscrapers.setAttribute('normal', uv_attribute_terrain);
	geometry_skyscrapers.setAttribute('uv', uv_attribute_houses);
	mat_skyscrapers = tex("");

	let geometry_barns = new THREE.BufferGeometry();
	geometry_barns.setAttribute('position', new THREE.Float32BufferAttribute(ver_barns, 3));
	ver_barns.length = 0;
	geometry_barns.setAttribute('normal', uv_attribute_terrain);
	geometry_barns.setAttribute('uv', uv_attribute_houses);
	mat_barns = tex("");

	let geometry_trees = new THREE.BufferGeometry();
	geometry_trees.setAttribute('position', new THREE.Float32BufferAttribute(ver_trees, 3));
	ver_trees.length = 0;
	mat_trees = psp("greenpine.png", 4.5);

	let geometry_bushes = new THREE.BufferGeometry();
	geometry_bushes.setAttribute('position', new THREE.Float32BufferAttribute(ver_bushes, 3));
	ver_bushes.length = 0;
	mat_bushes = psp("tree_norway.png", 2);	// !!

	let geometry_grass = new THREE.BufferGeometry();
	geometry_grass.setAttribute('position', new THREE.Float32BufferAttribute(ver_grass, 3));
	ver_grass.length = 0;
	mat_grass = psp("");//grass_xp.png");	// !!


	// tex() k�rs on�digt m�nga g�nger h�r?!

	mat_terrain = tex("phaser_snow.jpg");
//	hexcol(mat_terrain.color, 0xFFFFFF);		// manual per-terrainchunk lighting

	mat_houses = tex("norwayshouse(1).jpg");
	mat_barns = tex("norwayshouse(1).jpg");
	mat_skyscrapers = tex("norwayshouse(1).jpg");

	mesh_terrain[fi1][fj1] = new THREE.Mesh(geometry_terrain, mat_terrain);
//	mesh_terrain[fi1][fj1].material.wireframe = true;
	scene.add(mesh_terrain[fi1][fj1]);
	mesh_terrain[fi1][fj1].visible = false;		// these are for the cases where the meshes are created, and immediately .visible = false. That little pop-in & pop-out takes unnecessary draw calls

	mesh_houses[fi1][fj1] = new THREE.Mesh(geometry_houses, mat_houses);
	scene.add(mesh_houses[fi1][fj1]);
	mesh_houses[fi1][fj1].visible = false;

	mesh_skyscrapers[fi1][fj1] = new THREE.Mesh(geometry_skyscrapers, mat_skyscrapers);
	scene.add(mesh_skyscrapers[fi1][fj1]);
	mesh_skyscrapers[fi1][fj1].visible = false;

	mesh_barns[fi1][fj1] = new THREE.Mesh(geometry_barns, mat_barns);
	scene.add(mesh_barns[fi1][fj1]);
	mesh_barns[fi1][fj1].visible = false;

	pointsprites_trees[fi1][fj1] = new THREE.Points(geometry_trees, mat_trees);
	pointsprites_trees[fi1][fj1].position.y = mat_trees.size*0.25;
	scene.add(pointsprites_trees[fi1][fj1]);
	pointsprites_trees[fi1][fj1].visible = false;

	pointsprites_bushes[fi1][fj1] = new THREE.Points(geometry_bushes, mat_bushes);
	pointsprites_bushes[fi1][fj1].position.y = mat_bushes.size*0.25;
	scene.add(pointsprites_bushes[fi1][fj1]);
	pointsprites_bushes[fi1][fj1].visible = false;

	pointsprites_grass[fi1][fj1] = new THREE.Points(geometry_grass, mat_grass);
	pointsprites_grass[fi1][fj1].position.y = mat_grass.size*0.25;
	scene.add(pointsprites_grass[fi1][fj1]);
	pointsprites_grass[fi1][fj1].visible = false;
}

// --------------------------------------------------------------- //
// ---- SHOW AND HIDE THE TERRAIN CHUNKS AND THE HOUSES/TREES ---- //
// --------------------------------------------------------------- //
//% show and hide terrain chunks
function show_and_hide_terrain_chunks()
{
	// wrap around arrays
	if (chunk_process_z >= 44) { chunk_process_x++; chunk_process_z = 0; }
	if (chunk_process_x >= 44) { chunk_process_x = 0; chunk_process_z = 0; }

	if (chunk_process[chunk_process_x][chunk_process_z] === CHUNK_SHOW)
	{
		if (!(mesh_terrain[chunk_process_x][chunk_process_z] === undefined))		mesh_terrain[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_houses[chunk_process_x][chunk_process_z] === undefined))		mesh_houses[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_skyscrapers[chunk_process_x][chunk_process_z] === undefined))	mesh_skyscrapers[chunk_process_x][chunk_process_z].visible = true;
		if (!(mesh_barns[chunk_process_x][chunk_process_z] === undefined))		mesh_barns[chunk_process_x][chunk_process_z].visible = true;
		if (!(pointsprites_trees[chunk_process_x][chunk_process_z] === undefined))	pointsprites_trees[chunk_process_x][chunk_process_z].visible = true;
		if (!(pointsprites_bushes[chunk_process_x][chunk_process_z] === undefined))	pointsprites_bushes[chunk_process_x][chunk_process_z].visible = true;
		if (!(pointsprites_grass[chunk_process_x][chunk_process_z] === undefined))	pointsprites_grass[chunk_process_x][chunk_process_z].visible = true;

		chunk_process[chunk_process_x][chunk_process_z] = CHUNK_DONOTHING;
		chunk_process_z++;

coverage[58]++;
	}
	else if (chunk_process[chunk_process_x][chunk_process_z] === CHUNK_HIDE)
	{
		if (!(mesh_terrain[chunk_process_x][chunk_process_z] === undefined))		mesh_terrain[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_houses[chunk_process_x][chunk_process_z] === undefined))		mesh_houses[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_skyscrapers[chunk_process_x][chunk_process_z] === undefined))	mesh_skyscrapers[chunk_process_x][chunk_process_z].visible = false;
		if (!(mesh_barns[chunk_process_x][chunk_process_z] === undefined))		mesh_barns[chunk_process_x][chunk_process_z].visible = false;
		if (!(pointsprites_trees[chunk_process_x][chunk_process_z] === undefined))	pointsprites_trees[chunk_process_x][chunk_process_z].visible = false;
		if (!(pointsprites_bushes[chunk_process_x][chunk_process_z] === undefined))	pointsprites_bushes[chunk_process_x][chunk_process_z].visible = false;
		if (!(pointsprites_grass[chunk_process_x][chunk_process_z] === undefined))	pointsprites_grass[chunk_process_x][chunk_process_z].visible = false;

		chunk_process[chunk_process_x][chunk_process_z] = CHUNK_DONOTHING;
		chunk_process_z++;

coverage[59]++;
	}

	// other values, go to next chunk
	else chunk_process_z++;
}

//% hide some things that should only be seen in the current chunk (to save draw calls so the game is faster)
function hide_bushes_grass_etc_outside_current_chunk()
{
	// first, hide everything except terrain in 5x5 chunks around current chunk
	for (let t = ci1-2; t <= ci1+2; t++)
	{
		for (let u = cj1-2; u <= cj1+2; u++)
		{
			if (!(mesh_houses[t][u] === undefined))			mesh_houses[t][u].visible = false;
			if (!(mesh_skyscrapers[t][u] === undefined))		mesh_skyscrapers[t][u].visible = false;
			if (!(mesh_barns[t][u] === undefined))			mesh_barns[t][u].visible = false;
			if (!(pointsprites_trees[t][u] === undefined))		pointsprites_trees[t][u].visible = false;
			if (!(pointsprites_bushes[t][u] === undefined))		pointsprites_bushes[t][u].visible = false;
			if (!(pointsprites_grass[t][u] === undefined))		pointsprites_grass[t][u].visible = false;

coverage[60]++;
		}

coverage[61]++;
	}

	// then, show skyscrapers, roads, roadlights and trees in 3x3 chunks around current chunk
	for (let t = ci1-1; t <= ci1+1; t++)
	{
		for (let u = cj1-1; u <= cj1+1; u++)
		{
			if (!(mesh_skyscrapers[t][u] === undefined))		mesh_skyscrapers[t][u].visible = true;
			if (!(pointsprites_trees[t][u] === undefined))		pointsprites_trees[t][u].visible = true;
			if (!(pointsprites_bushes[t][u] === undefined))		pointsprites_bushes[t][u].visible = true;

coverage[62]++;
		}

coverage[63]++;
	}

	// then, show houses, skyscrapers, barns, trees, bushes and grass in the current chunk
	if (!(mesh_houses[ci1][cj1] === undefined))		mesh_houses[ci1][cj1].visible = true;
	if (!(mesh_skyscrapers[ci1][cj1] === undefined))	mesh_skyscrapers[ci1][cj1].visible = true;
	if (!(mesh_barns[ci1][cj1] === undefined))		mesh_barns[ci1][cj1].visible = true;
	if (!(pointsprites_trees[ci1][cj1] === undefined))	pointsprites_trees[ci1][cj1].visible = true;
	if (!(pointsprites_bushes[ci1][cj1] === undefined))	pointsprites_bushes[ci1][cj1].visible = true;
	if (!(pointsprites_grass[ci1][cj1] === undefined))	pointsprites_grass[ci1][cj1].visible = true;

	// show houses, barns and roadlights in near chunks too
	if (x_to_x_in_chunk(player.position.x) >= 40)
	{
		if (!(mesh_houses[ci1+1][cj1] === undefined))			mesh_houses[ci1+1][cj1].visible = true;
		if (!(mesh_barns[ci1+1][cj1] === undefined))			mesh_barns[ci1+1][cj1].visible = true;

coverage[64]++;
	}
	if (x_to_x_in_chunk(player.position.z) >= 40)
	{
		if (!(mesh_houses[ci1][cj1+1] === undefined))			mesh_houses[ci1][cj1+1].visible = true;
		if (!(mesh_barns[ci1][cj1+1] === undefined))			mesh_barns[ci1][cj1+1].visible = true;

coverage[65]++;
	}
	if (x_to_x_in_chunk(player.position.x) <= 10)
	{
		if (!(mesh_houses[ci1-1][cj1] === undefined))			mesh_houses[ci1-1][cj1].visible = true;
		if (!(mesh_barns[ci1-1][cj1] === undefined))			mesh_barns[ci1-1][cj1].visible = true;

coverage[66]++;
	}
	if (x_to_x_in_chunk(player.position.z) <= 10)
	{
		if (!(mesh_houses[ci1][cj1-1] === undefined))			mesh_houses[ci1][cj1-1].visible = true;
		if (!(mesh_barns[ci1][cj1-1] === undefined))			mesh_barns[ci1][cj1-1].visible = true;

coverage[67]++;
	}
}


// --------------------------------------------------------------- //
// ---- FUNCTIONS THAT DO ALL THESE THINGS IN THE RIGHT ORDER ---- //
// --------------------------------------------------------------- //

//% creates the terrain. runs at the start. also, a lot of code that just lies outside of functions in ascend.js also runs at start, before this.
function ascend_intro(master_seed)
{
	cloudbox_animate = 0;

	// rain & fume
	for (let t = -50; t < 50; t += 2)
	{
		for (let u = -20; u < 20; u += 2)
		{
			for (let v = -50; v < 50; v += 2)
			{
				// rain
				let randt, randu, randv;
				// if state is for the upper and lower half to look the same, so i can "loop" the rain
				if (u < 0)
				{
					let u2 = u+20;
					randt = 4*(pseudorandom(t+u2+v)-0.5);
					randu = 4*(pseudorandom(t-u2+v)-0.5);
					randv = 4*(pseudorandom(t+u2-v)-0.5);

coverage[68]++;
				}
				else
				{
					randt = 4*(pseudorandom(t+u+v)-0.5);
					randu = 4*(pseudorandom(t-u+v)-0.5);
					randv = 4*(pseudorandom(t+u-v)-0.5);

coverage[69]++;
				}
				ver_rain.push(t+randt, u+randu, v+randv);

coverage[70]++;
			}

coverage[71]++;
		}

coverage[72]++;
	}

	// snow (ateranvander rain)
	geometry_rain = new THREE.BufferGeometry();
	geometry_rain.setAttribute('position', new THREE.Float32BufferAttribute(ver_rain, 3));
	mat_snow = psp("snow.png", 0.2);
	pointsprites_snow = new THREE.Points(geometry_rain, mat_snow);
	scene.add(pointsprites_snow);
//	ver_rain.length = 0;

	//					     radius top		radius bot	height		segments
	geometry_skybox = new THREE.CylinderGeometry(120,		120,		50*8,		32);
	geometry_cloudbox = new THREE.CylinderGeometry(120,		119.8,		0,		32);

	// materials are loaded in beginning of ascend.js!

	mesh_skybox = new THREE.Mesh(geometry_skybox, mat_skybox);
	
	mesh_cloudbox = new THREE.Mesh(geometry_cloudbox, mat_cloudbox);
	scene.add(mesh_skybox);
	scene.add(mesh_cloudbox);

	seed = master_seed;
	master = (((seed*10-Math.floor(seed*10))*30)/9+1)/2;
	master2 = (seed*111-Math.floor(seed*111))*20;
	change4 = seed*21-Math.floor(seed*21);
	change5 = seed*17-Math.floor(seed*17);

	// loop for creating arrays
	// (has to loop through whole level, that's why this is a separate loop)
	for (let i1 = 7; i1 < 46; i1++)
	{
		large_arrays_is_created[i1] = new Array();
		hm[i1] = new Array();
		chunkmap[i1] = new Array();
		om[i1] = new Array();
		hm_is_loaded[i1] = new Array();
		objects_is_loaded[i1] = new Array();
		mesh_terrain[i1] = new Array();
		mesh_houses[i1] = new Array();
		mesh_skyscrapers[i1] = new Array();
		mesh_barns[i1] = new Array();
		pointsprites_trees[i1] = new Array();
		pointsprites_bushes[i1] = new Array();
		pointsprites_grass[i1] = new Array();

		for (let j1 = 7; j1 < 46; j1++)
		{
			large_arrays_is_created[i1][j1] = 0;
			hm_is_loaded[i1][j1] = 0;
			objects_is_loaded[i1][j1] = 0;

			if (i1 >= 9 && i1 <= 44 && j1 >= 9 && j1 <= 44)
			{
				// this randomizes the chunkmap a bit. it will more often be less majestic. because more majestic looks very "geometric"
				if (pseudorandom(i1+j1) < 0.7) chunkmap[i1][j1] = pseudorandom(i1*j1)*0.3;
				else chunkmap[i1][j1] = pseudorandom(i1*j1)*0.7;

				if (i1 >= 40-3 && i1 <= 40+3 && j1 >= 37-3 && j1 <= 37+3)
				create_too_large_arrays(i1, j1);	// only create large arrays for the chunks we start with

coverage[73]++;
			}

coverage[74]++;
		}

coverage[75]++;
	}


// is any of these in water? i hope not, because water should not be able to save in

	// create heightmap and objects map for 5x5 chunks around start_chunk
	for (let i1 = start_chunk_x-3; i1 <= start_chunk_x+3; i1++)
	{
		for (let j1 = start_chunk_z-3; j1 <= start_chunk_z+3; j1++)
		{
			set_wideness_highness(i1, j1);
			for (let i = 0; i < 50; i += 2)
			{
				for (let j = 0; j < 50; j += 2)
				{
					// Graham Relf, Forest (1983), heightmap generation algorithm
					// with my own modification
					set_weights(i1, j1, i, j);
					calculate_height(i1, j1, i, j);
					generate_objects_array(i1, j1, i, j);

					// laddtid halverad med interpolering
					// men nu nar jag bara kor varannan, skapas ocksa bara vartannat objekt ocksa??
					if (i >= 2 && j >= 2)
					{
						hm[i1][j1][i-1][j-1] = 0.5 * (hm[i1][j1][i-2][j-2] + hm[i1][j1][i][j]);
						hm[i1][j1][i-1][j] = 0.5 * (hm[i1][j1][i-2][j] + hm[i1][j1][i][j]);
						hm[i1][j1][i][j-1] = 0.5 * (hm[i1][j1][i][j-2] + hm[i1][j1][i][j]);
						hm[i1][j1][i-2][j-1] = 0.5 * (hm[i1][j1][i-2][j-2] + hm[i1][j1][i-2][j]);
						hm[i1][j1][i-1][j-2] = 0.5 * (hm[i1][j1][i-2][j-2] + hm[i1][j1][i][j-2]);
						generate_objects_array(i1, j1, i-1, j-1);
						generate_objects_array(i1, j1, i-1, j);
						generate_objects_array(i1, j1, i, j-1);
						generate_objects_array(i1, j1, i-2, j-1);
						generate_objects_array(i1, j1, i-1, j-2);

coverage[76]++;
					}

coverage[77]++;
				}

coverage[78]++;
			}
			// forsta och sista block ska vara samma (vid chunkgrans mellan tva chunks)
			for (let j = 0; j < 50; j++)
			{
				set_weights(i1, j1, 0, j);
				calculate_height(i1, j1, 0, j);
			//	generate_objects_array(i1, j1, 0, j);
				set_weights(i1+1, j1, 0, j);
				calculate_height(i1, j1, 49, j);
			//	generate_objects_array(i1, j1, 0, j);

coverage[79]++;
			}
			for (let i = 0; i < 50; i++)
			{
				set_weights(i1, j1, i, 0);
				calculate_height(i1, j1, i, 0);
			//	generate_objects_array(i1, j1, i, 0);
				set_weights(i1, j1+1, i, 0);
				calculate_height(i1, j1, i, 49);

coverage[80]++;
			}
			calculate_height_after(i1, j1);
			generate_objects_array_after(i1, j1);

			hm_is_loaded[i1][j1] = 1;

coverage[81]++;
		}

coverage[82]++;
	}

	// ------------------------- //
	// race:s (manual additions) //
	// ------------------------- //

	let x_array = new Array(), z_array = new Array();

	// BACKE TEST
//	x_array = [ 1985, 1979, 1965, 1948, 1932, 1897, 1878, 1842, 1821, 1799, 1780, 1760, 1741, 1717, 1691, 1666, 1631 ];
//	z_array = [ 1839, 1854, 1866, 1878, 1889, 1914, 1930, 1969, 1964, 1945, 1933, 1921, 1909, 1909, 1911, 1910, 1895 ];
//	race_create(x_array, z_array, 1);

	// create meshes etc for 5x5 chunks around start_chunk
	// kan det racka att ladda in bara de narmsta objekten i borjan? och sa laddas resten in, forhoppningsvis i tid, av dynamic loading?
	// isf, sparar en sekund pa kass dator!
	for (let i1 = start_chunk_x-2; i1 <= start_chunk_x+2; i1++)
	{
		for (let j1 = start_chunk_z-2; j1 <= start_chunk_z+2; j1++)
		{
			for (let i = 0; i < 49; i++)
			{
				for (let j = 0; j < 49; j++)
				{
					// denna tar bort roadlights om de ar for manga i rad. kan bli konstigt...
					// det h�r �r enda s�ttet hittills som jag lyckats f� v�gen att k�nna av sin egen riktning - OMGJORD
					if ((i <= 1 || i >= 48 || j <= 1 || j >= 48) && om[i1][j1][i][j] === ASCEND_ROADLIGHT) om[i1][j1][i][j] = 0;
					if (i >= 2 && i <= 47 && j >= 2 && j <= 47 && om[i1][j1][i][j] === ASCEND_ROADLIGHT)
					{
						if (om[i1][j1][i-2][j-2] === ASCEND_ROADLIGHT) om[i1][j1][i-2][j-2] = 0;
						if (om[i1][j1][i-2][j-1] === ASCEND_ROADLIGHT) om[i1][j1][i-2][j-1] = 0;
						if (om[i1][j1][i-2][j] === ASCEND_ROADLIGHT) om[i1][j1][i-2][j] = 0;
						if (om[i1][j1][i-2][j+1] === ASCEND_ROADLIGHT) om[i1][j1][i-2][j+1] = 0;
						if (om[i1][j1][i-2][j+2] === ASCEND_ROADLIGHT) om[i1][j1][i-2][j+2] = 0;
						if (om[i1][j1][i-1][j-2] === ASCEND_ROADLIGHT) om[i1][j1][i-1][j-2] = 0;
						if (om[i1][j1][i-1][j-1] === ASCEND_ROADLIGHT) om[i1][j1][i-1][j-1] = 0;
						if (om[i1][j1][i-1][j] === ASCEND_ROADLIGHT) om[i1][j1][i-1][j] = 0;
						if (om[i1][j1][i-1][j+1] === ASCEND_ROADLIGHT) om[i1][j1][i-1][j+1] = 0;
						if (om[i1][j1][i-1][j+2] === ASCEND_ROADLIGHT) om[i1][j1][i-1][j+2] = 0;
						if (om[i1][j1][i][j-2] === ASCEND_ROADLIGHT) om[i1][j1][i][j-2] = 0;
						if (om[i1][j1][i][j-1] === ASCEND_ROADLIGHT) om[i1][j1][i][j-1] = 0;
						if (om[i1][j1][i][j+1] === ASCEND_ROADLIGHT) om[i1][j1][i][j+1] = 0;
						if (om[i1][j1][i][j+2] === ASCEND_ROADLIGHT) om[i1][j1][i][j+2] = 0;
						if (om[i1][j1][i+1][j-2] === ASCEND_ROADLIGHT) om[i1][j1][i+1][j-2] = 0;
						if (om[i1][j1][i+1][j-1] === ASCEND_ROADLIGHT) om[i1][j1][i+1][j-1] = 0;
						if (om[i1][j1][i+1][j] === ASCEND_ROADLIGHT) om[i1][j1][i+1][j] = 0;
						if (om[i1][j1][i+1][j+1] === ASCEND_ROADLIGHT) om[i1][j1][i+1][j+1] = 0;
						if (om[i1][j1][i+1][j+2] === ASCEND_ROADLIGHT) om[i1][j1][i+1][j+2] = 0;
						if (om[i1][j1][i+2][j-2] === ASCEND_ROADLIGHT) om[i1][j1][i+2][j-2] = 0;
						if (om[i1][j1][i+2][j-1] === ASCEND_ROADLIGHT) om[i1][j1][i+2][j-1] = 0;
						if (om[i1][j1][i+2][j] === ASCEND_ROADLIGHT) om[i1][j1][i+2][j] = 0;
						if (om[i1][j1][i+2][j+1] === ASCEND_ROADLIGHT) om[i1][j1][i+2][j+1] = 0;
						if (om[i1][j1][i+2][j+2] === ASCEND_ROADLIGHT) om[i1][j1][i+2][j+2] = 0;

coverage[83]++;
					}
					create_objects_3d_vertices(i1, j1, i, j);
					create_terrain_3d_vertices(i1, j1, i, j);

coverage[84]++;
				}

coverage[85]++;
			}
			create_3d_meshes(i1, j1);
			objects_is_loaded[i1][j1] = 1;

coverage[86]++;
		}

coverage[87]++;
	}

	ci1 = start_chunk_x;
	cj1 = start_chunk_z;

	// create actual 3d canvas (after splash screen)
	if (mobile === true) renderer = new THREE.WebGLRenderer({antialias: false});	//!!
	else renderer = new THREE.WebGLRenderer({antialias: true});
	document.body.appendChild(renderer.domElement);		// canvas from webGLrenderer() is added to HTML document
}

//! runs every frame and updates the 3D terrain etc
function ascend_main()
{
	mesh_skybox.material = mat_skybox;	mesh_skybox.material.needsUpdate = true;	mesh_skybox.color = new THREE.Color(0xEDE7C9);

	// this is instead of a while loop, that would make the game stuck until the loop was done.
	main_loop_counter = 0;
	while (main_loop_counter < 3000)	// how many times this loop should run per frame.
						// many loops (~1000) = everything gets done fast but might be laggy on bad computers.
						// few loops (~200) = not laggy on bad computers but everything gets done slow
	{
		if (main_loop_counter < 40) show_and_hide_terrain_chunks();
		dynload_hm();
		dynload_objects();

		main_loop_counter++;

coverage[88]++;
	}

	mesh_sun.position.set(player.position.x+79, 100*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)) - 36, player.position.z+79);
	mesh_sun.rotation.y = lookat_datass(mesh_sun, player);

	mesh_skybox.position.set(camera.position.x, camera.position.y, camera.position.z);
	mesh_cloudbox.position.set(camera.position.x, camera.position.y, camera.position.z);

	if (cloudbox_animate < 1) cloudbox_animate += 0.0001; else cloudbox_animate = 0;
	mat_cloudbox.map.offset.x = cloudbox_animate;
	mat_cloudbox.map.offset.y = cloudbox_animate;

	create_terrain_chunks_before_showing_them();
	hide_bushes_grass_etc_outside_current_chunk();
}

//% function for creating a few time-consuming laaarge arrays. this is made into a function so we can create only the arrays we need, when we need them. creating all of them at the same time will take too long time.
function create_too_large_arrays(fi1, fj1)
{
	if (large_arrays_is_created[fi1][fj1] === 0)
	{
		hm[fi1][fj1] = new Array();
		om[fi1][fj1] = new Array();
		for (let fi = 0; fi < 50; fi++)		// �ndrade chunkwidth till 50 231002
		{
			hm[fi1][fj1][fi] = new Float32Array(50);
			om[fi1][fj1][fi] = new Float32Array(50);

coverage[89]++;
		}
		large_arrays_is_created[fi1][fj1] = 1;

coverage[90]++;
	}
}

//% dynamic heightmap generation
function dynload_hm()
{
	if (main_loop_counter < 200 && nextpart_start === 0)
	{
		// If j is at end of chunk, wrap to start of chunk (j = 0) and move i one up (i++). (wrap around array of hm positions)
		if (j_continue >= chunkwidth)
		{
			continue_create3 = 0;
			i_continue += 2;
			j_continue = 0;

coverage[91]++;
		}
		// If i is at end of chunk, move to next chunk (j1++). (i = 0)
		if (i_continue >= chunkwidth)
		{
			continue_create2 = 0;
			if (dynload_height_skipping === 0)
			{
				// forsta och sista block ska vara samma (vid chunkgrans mellan tva chunks)
				for (let j = 0; j < 50; j++)
				{
					set_weights(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], 0, j);
					calculate_height(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], 0, j);
					// generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], 0, j);
					set_weights(to_load_chunk_x[dynload_hm_to_load_i]+1, to_load_chunk_z[dynload_hm_to_load_i], 0, j);
					calculate_height(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], 49, j);
					// generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], 0, j);

coverage[92]++;
				}
				for (let i = 0; i < 50; i++)
				{
					set_weights(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i, 0);
					calculate_height(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i, 0);
					// generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i, 0);
					set_weights(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i]+1, i, 0);
					calculate_height(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i, 49);

coverage[93]++;
				}
				calculate_height_after(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i]);
				generate_objects_array_after(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i]);
				hm_is_loaded[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]] = 1;

coverage[94]++;
			}
			nextpart_start = 1;
			dynload_hm_to_load_i++;
			i_continue = 0;

coverage[95]++;
		}
		// If j1 is at end of level, wrap to start of level (j1 = 0) and move i1 one up (i1++). (wrap around array of chunks)
		if (dynload_hm_to_load_i >= 25)	// 25 = 5x5 chunks?
		{
			continue_create = 0;
			dynload_hm_to_load_i = 0;

coverage[96]++;
		}
		// As long as j1 hasn't "gone too far" in the level, do the i,j loop.
		if (dynload_hm_to_load_i < 25)
		{
			// skip unnecessary chunks
			if (hm_is_loaded[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]] === 1) dynload_height_skipping = 1;
			else dynload_height_skipping = 0;

			// If this is an unnecessary chunk, skip this whole loop.
			if (dynload_height_skipping === 1) { i_continue = chunkwidth; }
			// If not, do the loop.
			else
			{
				// Do this first. Then set continue_create2 to 1 so we can continue.
				if (continue_create2 === 0)
				{
					create_too_large_arrays(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i]);

					i_continue = 0;
					set_wideness_highness(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue, j_continue);
					continue_create2 = 1;

coverage[97]++;
				}
				// Continue with doing this (only if continue_create2 is 1).
				// As long as i hasn't "gone too far" in the chunk, do the j loop.
				if (i_continue < chunkwidth)
				{
					// Do this first. Then set continue_create3 to 1 so we can continue.
					if (continue_create3 === 0)
					{
						j_continue = 0;
						continue_create3 = 1;

coverage[98]++;
					}
					// Continue with doing this (only if continue_create3 is 1).
					// As long as j hasn't "gone too far" in the chunk, do the main loop.
					// ----
					// jag tror det ibland blir fel (spelet låser sig) när man åkt en bit
					// för att hm- och objects-array:erna skapas dynamiskt.
					// om de inte hunnit skapas när man ska hämta data från dem så låses spelet.
					// därför kollar jag om array:en har skapats först här
					if (j_continue < chunkwidth && large_arrays_is_created[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]] === 1)
					{
						// Graham Relf, Forest (1983), heightmap generation algorithm
						// with my own modification
						set_weights(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue, j_continue);
						calculate_height(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue, j_continue);
						generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue, j_continue);

						// laddtid halverad med interpolering
						// men nu nar jag bara kor varannan, skapas ocksa bara vartannat objekt ocksa??
						if (i_continue >= 2 && j_continue >= 2)
						{
hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-1][j_continue-1] = 0.5 * (hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-2] + hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue]);
hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-1][j_continue] = 0.5 * (hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue] + hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue]);
hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue-1] = 0.5 * (hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue-2] + hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue]);
hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-1] = 0.5 * (hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-2] + hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue]);
hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-1][j_continue-2] = 0.5 * (hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-2] + hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue-2]);
generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue-1, j_continue-1);
generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue-1, j_continue);
generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue, j_continue-1);
generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue-2, j_continue-1);
generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i], to_load_chunk_z[dynload_hm_to_load_i], i_continue-1, j_continue-2);

coverage[99]++;
						}

						j_continue += 2;

coverage[100]++;
					}

coverage[101]++;
				}

coverage[102]++;
			}

coverage[103]++;
		}

coverage[104]++;
	}
}

//% dynamic objects generation
function dynload_objects()
{
	if (main_loop_counter < 200 && nextpart_start === 1)
	{
		// wrap around arrays
		if (j_continueb >= chunkwidth-1)
		{
			continue_create3b = 0;
			i_continueb++;
			j_continueb = 0;

coverage[105]++;
		}
		if (i_continueb >= chunkwidth-1)
		{
			continue_create2b = 0;
			nextpart_start = 0;
			if (dynload_objects_skipping === 0)
			{
				create_3d_meshes(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i]);
				objects_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]] = 1;

coverage[106]++;
			}
			dynload_objects_to_load_i++;
			i_continueb = 0;

coverage[107]++;
		}
		if (dynload_objects_to_load_i >= 25)
		{
			continue_createb = 0;
			dynload_objects_to_load_i = 0;

coverage[108]++;
		}
		if (dynload_objects_to_load_i < 25)
		{
			// skip unnecessary chunks
			if (objects_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]] === 1) dynload_objects_skipping = 1;
			else if (hm_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]] === 0) dynload_objects_skipping = 1;	// skip object creation if hm hasn't been created for the chunk
			else dynload_objects_skipping = 0;

			if (dynload_objects_skipping === 1) i_continueb = chunkwidth;
			else
			{
				if (continue_create2b === 0)
				{
					i_continueb = 0;
					continue_create2b = 1;

coverage[109]++;
				}
				if (i_continueb < chunkwidth-1)
				{
					if (continue_create3b === 0)
					{
						j_continueb = 0;
						continue_create3b = 1;

coverage[110]++;
					}
					if (j_continueb < chunkwidth-1 && large_arrays_is_created[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]])
					{
						// bara f�r kortare namn:
						let ii1 = to_load_chunk_x[dynload_objects_to_load_i];
						let jj1 = to_load_chunk_z[dynload_objects_to_load_i];

						// denna tar bort roadlights om de ar for manga i rad. kan bli konstigt...
						// det h�r �r enda s�ttet hittills som jag lyckats f� v�gen att k�nna av sin egen riktning - OMGJORD
						if ((i_continueb <= 1 || i_continueb >= 48 || j_continueb <= 1 || j_continueb >= 48) && om[ii1][jj1][i_continueb][j_continueb] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb][j_continueb] = 0;
						if (i_continueb >= 2 && i_continueb <= 47 && j_continueb >= 2 && j_continueb <= 47 && om[ii1][jj1][i_continueb][j_continueb] === ASCEND_ROADLIGHT)
						{
							if (om[ii1][jj1][i_continueb-2][j_continueb-2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-2][j_continueb-2] = 0;
							if (om[ii1][jj1][i_continueb-2][j_continueb-1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-2][j_continueb-1] = 0;
							if (om[ii1][jj1][i_continueb-2][j_continueb] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-2][j_continueb] = 0;
							if (om[ii1][jj1][i_continueb-2][j_continueb+1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-2][j_continueb+1] = 0;
							if (om[ii1][jj1][i_continueb-2][j_continueb+2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-2][j_continueb+2] = 0;
							if (om[ii1][jj1][i_continueb-1][j_continueb-2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-1][j_continueb-2] = 0;
							if (om[ii1][jj1][i_continueb-1][j_continueb-1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-1][j_continueb-1] = 0;
							if (om[ii1][jj1][i_continueb-1][j_continueb] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-1][j_continueb] = 0;
							if (om[ii1][jj1][i_continueb-1][j_continueb+1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-1][j_continueb+1] = 0;
							if (om[ii1][jj1][i_continueb-1][j_continueb+2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb-1][j_continueb+2] = 0;
							if (om[ii1][jj1][i_continueb][j_continueb-2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb][j_continueb-2] = 0;
							if (om[ii1][jj1][i_continueb][j_continueb-1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb][j_continueb-1] = 0;
							if (om[ii1][jj1][i_continueb][j_continueb+1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb][j_continueb+1] = 0;
							if (om[ii1][jj1][i_continueb][j_continueb+2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb][j_continueb+2] = 0;
							if (om[ii1][jj1][i_continueb+1][j_continueb-2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+1][j_continueb-2] = 0;
							if (om[ii1][jj1][i_continueb+1][j_continueb-1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+1][j_continueb-1] = 0;
							if (om[ii1][jj1][i_continueb+1][j_continueb] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+1][j_continueb] = 0;
							if (om[ii1][jj1][i_continueb+1][j_continueb+1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+1][j_continueb+1] = 0;
							if (om[ii1][jj1][i_continueb+1][j_continueb+2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+1][j_continueb+2] = 0;
							if (om[ii1][jj1][i_continueb+2][j_continueb-2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+2][j_continueb-2] = 0;
							if (om[ii1][jj1][i_continueb+2][j_continueb-1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+2][j_continueb-1] = 0;
							if (om[ii1][jj1][i_continueb+2][j_continueb] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+2][j_continueb] = 0;
							if (om[ii1][jj1][i_continueb+2][j_continueb+1] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+2][j_continueb+1] = 0;
							if (om[ii1][jj1][i_continueb+2][j_continueb+2] === ASCEND_ROADLIGHT) om[ii1][jj1][i_continueb+2][j_continueb+2] = 0;

coverage[111]++;
						}
						create_objects_3d_vertices(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i], i_continueb, j_continueb);
						create_terrain_3d_vertices(to_load_chunk_x[dynload_objects_to_load_i], to_load_chunk_z[dynload_objects_to_load_i], i_continueb, j_continueb);
						j_continueb++;

coverage[112]++;
					}

coverage[113]++;
				}

coverage[114]++;
			}

coverage[115]++;
		}

coverage[116]++;
	}
}

//% add and remove chunks when moving into a new place
function create_terrain_chunks_before_showing_them()
{
	// tell game to hide 7x7 chunks around current chunk
	if (ci1 !== last_chunk_x || cj1 !== last_chunk_z)
	{
		for (let t = ci1-3; t <= ci1+3; t++)
		{
			for (let u = cj1-3; u <= cj1+3; u++)
			{
				chunk_process[t][u] = CHUNK_HIDE;

coverage[117]++;
			}

coverage[118]++;
		}

coverage[119]++;
	}

	// then, tell game to show 5x5 chunks around current chunk
	for (let t = ci1-2; t <= ci1+2; t++)
	{
		for (let u = cj1-2; u <= cj1+2; u++)
		{
			chunk_process[t][u] = CHUNK_SHOW;

coverage[120]++;
		}

coverage[121]++;
	}

	// tell game to create 5x5 chunks around current chunk
	if (ci1 !== last_chunk_x || cj1 !== last_chunk_z)
	{
		// create current chunk first
		to_load_chunk_x[0] = ci1;
		to_load_chunk_z[0] = cj1;
		let n = 1;		// anv�nds inte till n�got?
		for (let t = ci1-2; t <= ci1+2; t++)
		{
			for (let u = cj1-2; u <= cj1+2; u++)
			{
				// skip current chunk
				if (!(t === ci1 && u === cj1))
				{
					to_load_chunk_x[n] = t;
					to_load_chunk_z[n] = u;

coverage[122]++;
				}
				n++;

coverage[123]++;
			}

coverage[124]++;
		}

coverage[125]++;
	}

	last_chunk_x = ci1;
	last_chunk_z = cj1;
}



