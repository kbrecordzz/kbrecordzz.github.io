// basic.js
// images, sounds, etc (files)
// kbrecordzz 2023

// det finns fel � i namn tror jag!!

"use strict";

var mobile = false;

var gamehasstarted = false;

// DEBUG
var game_speed = 1;
var minecraft = false;
var minecraft_o = "";
var chaosmode = 0;

// cut
var cut;
var lastcut;
var startcut;
var bet_started = false;
var start_hour;
var last_cut_before_pause = 0;
var last_cut_before_talk = 0;
var last_cut_before_race = 0;
var next_cut_after_blackintro;
var iwillbeback = false;
var q;
var g;
var interact_timer = 0;
var move_player = true;
var lookheight = 0;
var splashscreen_click_starttime = 0;
var r_click_on = 0;
var r_click_obj;
var r_click_dist;
var r_click_cut;

// dialog
var dialog = "";
var last_dialog = "";
var now_char = 0;
var dialog2 = "";
var last_dialog2 = "";
var now_char2 = 0;
var dialog3 = "";
var last_dialog3 = "";
var now_char3 = 0;
var shelfanswer = 0;
var head;
var looking_at_object;
var tempfov;

// camera
var camera_strive_x = 0;
var camera_strive_z = 0;
var camera_strive_y = 0;
var from_x = 0;
var from_z = 0;

// race
var race_number = 0;
var race_startedtimer;
var race_wrongwaytimer;
var player_lap = 0;			// annan sak än lap!
var cz_lap = new Array();
var winner = -1;
var cz_leader = 99;
var race_state = 0;			// race state for all
var race_countdown_started = false;
var race_after_started = false;
var player_checkpoint = 0;
var player_exactcheckpoint = 0;
var countdown_start;
var mesh_checkpoint_x = new Array();
var mesh_checkpoint_z = new Array();
var cz_checkpoint = new Array();	// current checkpoint for player and czs
var cz_race_state = new Array();	// race state for each individual cz

// cars
var speed = 0;
var speedchange = 1;
var turbo_timer = 0;
var washingmachine_timer = 0;
var jump_timer = 0;
var cz_turned_on = new Array();
var cz_speed = new Array();
var cz_turbo_timer = new Array();
var cz_jump_timer = new Array();
var cz_goal_x = new Array();
var cz_goal_z = new Array();
var cz_goal_distx = new Array();
var cz_goal_distz = new Array();
var cz_goal_temporaryfollow_x = new Array();
var cz_goal_temporaryfollow_z = new Array();
var cz_goal_temporaryfollow_dist = new Array();
var cz_goal_temporaryfollow_distx = new Array();
var cz_goal_temporaryfollow_distz = new Array();
var cz_goal_array_x = new Array();
var cz_goal_array_z = new Array();
var cz_goal_lap = new Array();

// physics
var height = 0;				// current height (y)
var inair = false;
var air_start;				// for car land sound
var gravityinc = 0;
var lastheight = 0;
var drown_count = 0;
var lastlandpos_x = -1;
var lastlandpos_z = -1;
var collision_timer = 0;
var lastpos_x = 0;
var lastpos_z = 0;
var lastpos_y = 0;
var lastpos_x_before_collision = 0;
var lastpos_z_before_collision = 0;
var cz_height = new Array();
var cz_inair = new Array();
var cz_air_start = new Array();
var cz_gravityinc = new Array();
var cz_lastheight = new Array();
var cz_lastlandpos_x = new Array();
var cz_lastlandpos_z = new Array();
var cz_collision_timer = 0;

// sound
var sound_car_is_playing = false;
var audiocontext;
var source;
var ie_music;	// IE
var sound_cz_car_is_playing = new Array();
var music_what_is_playing = 1;		// 2 = cut music is playing, 1 = nothing is playing, 0 = chunk music is playing
var current_song_playing = "";

// game functions
var faraway_cylinder = new Array();
let cyl_geom = new THREE.CylinderGeometry(0.3, 0.3, 100, 6);
let cyl_mate = new THREE.MeshBasicMaterial({color: 0x6dfa0f});
let cyl_mate_race = new THREE.MeshBasicMaterial({color: 0x2d41ff});
var race_faraway_1 = new THREE.Mesh(cyl_geom, cyl_mate_race);
race_faraway_1.material.fog = false;
scene.add(race_faraway_1);
var akerpoints = 0;

var bhagz_fuckyou = 0;
var bhagz_scartcable = 0;
var bhagz_bitchslap = 0;

var areatext_timer = 0;

for (let t = 0; t < NUMBER_OF_CARS; t++)
{
	cz_lap[t] = 0;

	cz_checkpoint[t] = 0;
	cz_race_state[t] = 0;

	cz_turned_on[t] = 0;
	cz_speed[t] = 0;
	cz_turbo_timer[t] = 0;
	cz_jump_timer[t] = 0;
	cz_goal_x[t] = 0;
	cz_goal_z[t] = 0;
	cz_goal_distx[t] = 0;
	cz_goal_distz[t] = 0;
	cz_goal_temporaryfollow_x[t] = 0;
	cz_goal_temporaryfollow_z[t] = 0;
	cz_goal_temporaryfollow_dist[t] = 0;
	cz_goal_temporaryfollow_distx[t] = 0;
	cz_goal_temporaryfollow_distz[t] = 0;
	cz_goal_lap[t] = 0;

	cz_height[t] = 0;
	cz_inair[t] = false;
	cz_air_start[t] = 0;
	cz_gravityinc[t] = 0;
	cz_lastheight[t] = 0;
	cz_lastlandpos_x[t] = 0;
	cz_lastlandpos_z[t] = 0;

	sound_cz_car_is_playing[t] = false;

	faraway_cylinder[t] = new THREE.Mesh(cyl_geom, cyl_mate);
	faraway_cylinder[t].material.fog = false;
	scene.add(faraway_cylinder[t]);
}

// LOCKED 231007 - create texture material
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

// LOCKED 231007 - create sound
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

// LOCKED 231007 - create sprite
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

// LOCKED 231007 - create pointsprites material
function psp(file, fsize)
{
	// standard values (for IE)
	if (!(fsize >= 0)) fsize = 2;

	let material = new THREE.PointsMaterial({size: fsize, map: loader.load("files/" + file), depthTest: true, transparent: true});
	material.alphaTest = 0.5;	// this removes the imaginary annoying "boxes" around the tree sprites
	return material;
}

// create the room
const mesh_room_wall = new THREE.Mesh(new THREE.BoxGeometry(3.1, 1.2+0.3, 3.1), new THREE.MeshLambertMaterial({map: loader.load(""), side: THREE.BackSide}));
const mesh_room_floor = new THREE.Mesh(new THREE.BoxGeometry(3.1+0.5, 1.2, 3.1+0.5), new THREE.MeshLambertMaterial({map: loader.load(""), side: THREE.BackSide}));
var room = new THREE.Object3D();
room.add(mesh_room_wall, mesh_room_floor);
scene.add(room);
room.visible = false;
room.position.set(start_chunk_x*(chunkwidth-1)+(chunkwidth*0.5)-0.5, 100, start_chunk_z*(chunkwidth-1)+(chunkwidth*0.5)-0.5);

// intro logo
const mat_logo = new THREE.MeshPhongMaterial({map: loader.load("files/worldmap.jpg")});
mat_logo.map.repeat.set(1,1);
mat_logo.map.wrapS = THREE.MirroredRepeatWrapping;
mat_logo.map.wrapT = THREE.MirroredRepeatWrapping;
const mesh_logo = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 64), mat_logo);
scene.add(mesh_logo);
mesh_logo.rotation.y -= 1.25;
const mesh_logo_text = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), new THREE.MeshBasicMaterial({map: loader.load("files/cropped-test-6.png"), transparent: true, side: THREE.DoubleSide, alphaTest: 0.5}));
const mesh_logo_text2 = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), new THREE.MeshBasicMaterial({map: loader.load("files/asdq_credits.png"), transparent: true, side: THREE.DoubleSide, alphaTest: 0.5}));
const mesh_logo_ep = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.5), new THREE.MeshBasicMaterial({map: loader.load("files/coollogo_com-7701368.png"), transparent: true, side: THREE.DoubleSide, alphaTest: 0.5}));
mesh_logo.add(mesh_logo_text);
mesh_logo.add(mesh_logo_text2);
mesh_logo.add(mesh_logo_ep);
mesh_logo_text.position.z += 1.4;
mesh_logo_text2.position.z -= 1.4;
mesh_logo_text2.rotation.y = Math.PI;
mesh_logo_ep.scale.y = 2;
mesh_logo_ep.rotation.y = Math.PI;
const mesh_logo_string = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3, 4), new THREE.MeshBasicMaterial({map: loader.load("files/pinne.jpg")}));
scene.add(mesh_logo_string);
scene.add(mesh_logo_ep);


// must be loaded here?
var mat_asphalt = tex("goldel2.png");

// SPRITES									//size
const sprite_ui_mouseclick		= spr("ui_mouse_click.png",		0.6);
const sprite_iloveyou			= spr("iloveyou.png",			1.2);

const rndc = [ "adele_ny3.png", "C_dg.png", "C_daddy.png", "C_dogert.png", "omalley_fez.png", "C_harass.png", "mrs_superconductor2.png", "polish_cow2.png", "epper2.png" ];
const rndc_which = Math.floor(7*pseudorandom(navigator.userAgent[0].charCodeAt() + navigator.platform[0].charCodeAt() + navigator.appVersion[0].charCodeAt()));

const sprite_intro_a			= spr(rndc[rndc_which+0]);
const sprite_intro_b			= spr(rndc[rndc_which+1]);
const sprite_intro_c			= spr(rndc[rndc_which+2]);
sprite_intro_a.material.transparent = true;
sprite_intro_b.material.transparent = true;
sprite_intro_c.material.transparent = true;
sprite_intro_a.material.opacity = 0;
sprite_intro_b.material.opacity = 0;
sprite_intro_c.material.opacity = 0;

var sprite_fayah			= [ spr("fire1_.png"), spr("fire1_.png"), spr("fire1_.png"), spr("fire1_.png") ];
var fayah_timer				= [ 0, 0, 0, 0 ];
var sprite_efayah			= spr("fire1e.png", 1);
var shot_timer = 0;
var efayah_timer = 0;
var eshot_timer = 0;
var eshot_whosshot = -1;
var sprite_fff1				= spr("fff1.png");
var sprite_fff2				= spr("fff2.png");
var sprite_fff3				= spr("fff3.png");
var sprite_fff4				= spr("fff4.png");
var erand = 1;

var sprite_bullseye			= spr("bullseyes.png", 0.5); sprite_bullseye.visible = true;		// till�gg fps EP2!

var sprite_energydrink			= spr("energydrink.png");
var sprite_energydrink2			= spr("energydrink.png");
var sprite_energydrink3			= spr("energydrink.png");
var sprite_energydrink4			= spr("energydrink.png");
var sprite_energydrink5			= spr("energydrink.png");

var sprite_washingmachine		= spr("washingmachine2.png", 1.4, 1.6);
var sprite_washingmachine2		= spr("washingmachine2.png", 1.4, 1.6);
var sprite_washingmachine3		= spr("washingmachine2.png", 1.4, 1.6);
var sprite_washingmachine4		= spr("washingmachine2.png", 1.4, 1.6);

var sprite_trampoline			= spr("trampoline.png");

var sprite_gym_thing = new Array();
for (let t = 0; t < 8; t++) sprite_gym_thing[t] = spr("gym_thing_2.png");
sprite_gym_thing[3] = spr("a_red_punching_bag-removebg-preview.png");
sprite_gym_thing[2] = spr("dumbbell.png");
sprite_gym_thing[5] = spr("dumbbell.png");
var dumbbell_up = 1;
var lopband = 0.02;
var sprite_gym_thing_trash = new Array();
for (let t = 0; t < 8; t++) sprite_gym_thing_trash[t] = spr("gym_thing_2_trash.png");

var sprite_freeroam_1_muffins		= spr("muffins.png", 1.3);

var sprite_harassplane1			= spr("airplane.png",			8);		sprite_harassplane1.oname = "One of Hårass' many airplanes";
var sprite_harassplane2			= spr("airplane.png",			8);
var sprite_harassplane3			= spr("airplane.png",			8);
var sprite_harassplane4			= spr("airplane.png",			8);

var sprite_dogertbush			= spr("dogertbush.png");

var sprite_worker			= spr("a_frog_combined_with_a_human-removebg-preview.png");	sprite_worker.oname = "GarkPark";
var sprite_workerrail			= spr("a_loose_piece_of_railroad-removebg-preview.png", 1.);
var sprite_workerrail2			= spr("a_loose_piece_of_railroad-removebg-preview.png", 1.2);
var sprite_workerrail3			= spr("a_loose_piece_of_railroad-removebg-preview.png", 1.2);

var sprite_cdplayer			= spr("cdplayer.png");

var sprite_magnet1			= spr("C_oballin.png",			1.13);		sprite_magnet1.oname = "Bug Huntington";
var sprite_magnet2			= spr("cooldude.png",			1.15);		sprite_magnet2.oname = "Archibald Slams";
var sprite_magnet3			= spr("octopussy.png",			1.5);		sprite_magnet3.oname = "Beppe";
var sprite_magnet4			= spr("arctichare2.png");				sprite_magnet4.oname = "Ufer Crisp";
var sprite_magnet5			= spr("polarbear2.png",			1.1);		sprite_magnet5.oname = "Piano Reeves";
var sprite_magnet6			= spr("bird_baby.png",			3);		sprite_magnet6.oname = "Midnight Rider";
var sprite_table = new Array();
sprite_table[0] = spr("table.png", 0.7);
sprite_table[1] = spr("table.png", 0.75);
sprite_table[2] = spr("table.png", 0.7);
sprite_table[3] = spr("table.png", 0.7);
sprite_table[4] = spr("table.png", 1);
sprite_table[5] = spr("table.png", 1);
var sprite_festivalsign			= spr("science.png",			8);
var sprite_festival			= spr("festival.png",			8);

var sprite_cappy			= spr("cappy.png");					sprite_cappy.oname = "Capy";

var sprite_glock			= spr("a_gun_1_-removebg-preview.png");			sprite_glock.oname = "Gun";

var sprite_license_3_car1		= spr("cardogerts.png",			2, 0.9);
var sprite_license_3_car2		= spr("cardogerts.png",			2, 0.9);

var sprite_license_kocar = new Array();
for (let t = 0; t < 5; t++) sprite_license_kocar[t] = spr("car_polish_cow.png");
var sprite_license_5_motcar		= spr("daddycar.png",			1.5);

var sprite_armpuffies			= spr("armpuffies.png", 0.75);
var sprite_magnetdrown_seal		= spr("sealy.png");					sprite_magnetdrown_seal.oname = "Beppe";
var sprite_magnetdrown_magnet = new Array();
for (let t = 0; t < 6; t++) sprite_magnetdrown_magnet[t] = spr("magnet.png", 2);

var sprite_fire = new Array();
for (let t = 0; t < 9; t++)
{
	if (t < 8)
	{
		sprite_fire[t] = new Array();
		sprite_fire[t][0] = spr("fire1.png");
		sprite_fire[t][1] = spr("fire2.png");
		sprite_fire[t][2] = spr("fire3.png");
		sprite_fire[t][3] = spr("fire4.png");
	}
	else
	{
		sprite_fire[t] = new Array();
		sprite_fire[t][0] = spr("fire1.png", 6);
		sprite_fire[t][1] = spr("fire2.png", 6);
		sprite_fire[t][2] = spr("fire3.png", 6);
		sprite_fire[t][3] = spr("fire4.png", 6);
	}
}

var sprite_killepper_bomb		= spr("bomb.png");

var sprite_antique = new Array();
for (let t = 0; t < 50; t++) sprite_antique[t] = spr("antique1.png");

var sprite_harassfan_seal		= spr("seal.png");			sprite_harassfan_seal.oname = "Beppe";

var sprite_magnetfactory_lift		= spr("red_platform.png");

var sprite_spacebar_tiger		= spr("tiger.png");

var sprite_talk_capy			= spr("cappy.png");			sprite_talk_capy.oname = "Capy";
var sprite_talk_turf			= spr("turf2.png");			sprite_talk_turf.oname = "Turf";
var sprite_talk_nubbs			= spr("turf2.png");			sprite_talk_nubbs.oname = "Nubbs";
var sprite_talk_otter			= spr("otter.png");			sprite_talk_otter.oname = "Jybbe";
var sprite_talk_sheep			= spr("sheep.png");			sprite_talk_sheep.oname = "Dr. Vanish";
var sprite_talk_bear			= spr("bear.png");			sprite_talk_bear.oname = "Bamse Lite";
var sprite_talk_bhagz			= spr("bhagz.png");			sprite_talk_bhagz.oname = "Bhagz";
var sprite_talk_suit			= spr("suit.png");			sprite_talk_suit.oname = "Tristan Schultz";
var sprite_talk_tiger			= spr("tiger.png");			sprite_talk_tiger.oname = "DingaDonga ChingaChonga Chikablow Kakadoo Bibakaw Aparatiff BebeKanga MemeManga Olsen";
var sprite_talk_zanzibae		= spr("zanzibae_new.png");		sprite_talk_zanzibae.oname = "DJ Zanzibae";
var sprite_talk_snake			= spr("snake.png");			sprite_talk_snake.oname = "Shelby Snake";
var sprite_talk_disonesty		= spr("C_disonesty.png");		sprite_talk_disonesty.oname = "Disonesty";
var sprite_talk_seal			= spr("seal.png");			sprite_talk_seal.oname = "Chikalong Tabing";
var sprite_talk_weesel			= spr("weesel.png");			sprite_talk_weesel.oname = "Gamanto Hidayat";
var sprite_talk_moose			= spr("moose_new.png");			sprite_talk_moose.oname = "Moster Savage";
var sprite_talk_harassdad		= spr("C_harass.png");			sprite_talk_harassdad.oname = "Harass";
var sprite_talk_baltabird		= spr("baltabird.png");			sprite_talk_baltabird.oname = "George \"The Whisperer\" Rosenfeld";
var sprite_talk_aff			= spr("aff_new.png",1.5);			sprite_talk_aff.oname = "Aff";
var sprite_talk_magnetguard		= spr("magnetguard.png");		sprite_talk_magnetguard.oname = "Rusty McFuckFace";
var sprite_talk_magnetguard2		= spr("magnetguard.png");		sprite_talk_magnetguard2.oname = "Brett Savage";		// not related to adele!
var sprite_talk_magnetguard3		= spr("magnetguard.png");		sprite_talk_magnetguard3.oname = "The Fist";
var sprite_talk_magnetguard4		= spr("magnetguard.png");		sprite_talk_magnetguard4.oname = "Ricard� C�rdoba";
var sprite_talk_1 = spr("a_superhuman_robot_machine_with_a_huge_club-removebg-preview.png"); sprite_talk_1.oname = "Hud";
var sprite_talk_2 = spr("beafer.png");						sprite_talk_2.oname = "Leafblower Dadason";
var sprite_talk_3 = spr("jae-park-7GX5aICb5i4-unsplash-removebg-preview.png");	sprite_talk_3.oname = "Kattlillan";
var sprite_talk_4 = spr("hang-niu-Tn8DLxwuDMA-unsplash-removebg-preview.png");	sprite_talk_4.oname = "Mysan";
var sprite_talk_5 = spr("kabo-sR0cTmQHPug-unsplash-removebg-preview.png");	sprite_talk_5.oname = "Gustaf";
var sprite_talk_6 = spr("cyrus-chew-Dl39g6QhOIM-unsplash-removebg-preview.png"); sprite_talk_6.oname = "Catherine";
var sprite_talk_7 = spr("jack-dong-yJozLVBxNA0-unsplash-removebg-preview.png");	sprite_talk_7.oname = "Michael Catson";
var sprite_talk_8 = spr("a_muscular_reindeer-removebg-preview.png");		sprite_talk_8.oname = "Aristoteles Fuckhard";
var sprite_talk_9 = spr("a_big_stone_with_muscles-removebg-preview_new.png");	sprite_talk_9.oname = "Rauserwelt Stonehenge";
var sprite_talk_10 = spr("a_wise_wolf-removebg-preview_new.png");		sprite_talk_10.oname = "Big Ridah";
var sprite_talk_11 = spr("a_dachshund_with_very_short_legs-removebg-preview.png"); sprite_talk_11.oname = "Dickh";
var sprite_talk_12 = spr("sheepie-removebg-preview.png");			sprite_talk_12.oname = "Baba Black (too controversial for the group)";
var sprite_talk_13 = spr("an_eel_seen_from_the_front-removebg-preview_new.png"); sprite_talk_13.oname = "Johnny Racer";
var sprite_talk_14 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_14.oname = "Mary Cogarnagh";
var sprite_talk_15 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_15.oname = "Francesco";
var sprite_talk_16 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_16.oname = "Jamal";
var sprite_talk_17 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_17.oname = "Monique";
var sprite_talk_18 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_18.oname = "Eric Laithwaite";
var sprite_talk_19 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_19.oname = "Theodora Riverdale";
var sprite_talk_20 = spr("bear_.png");						sprite_talk_20.oname = "Bamse Patreon";
var sprite_talk_21 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_21.oname = "Birnak";
var sprite_talk_22 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_22.oname = "Nithilius Loret";
var sprite_talk_23 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_23.oname = "Harvey Aucaman";
var sprite_talk_24 = spr("a_fat_bear_with_a_polish_shirt-removebg-preview.png"); sprite_talk_24.oname = "Yuri";
var sprite_talk_25 = spr("sheep_dixonmilano.png");				sprite_talk_25.oname = "Dixon Milano";
var sprite_talk_26 = spr("a_ferret_looking_like_an_old_university_professor-removebg-preview.png"); sprite_talk_26.oname = "Jorgen Wallenstam";
var sprite_talk_27 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_27.oname = "Council of Beavers - Councilor #1 - \"Cecil\"";
var sprite_talk_28 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_28.oname = "Council of Beavers - Councilor #2 - \"Jose\"";
var sprite_talk_29 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_29.oname = "Council of Beavers - Councilor #3 - \"Arthur\"";
var sprite_talk_30 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_30.oname = "Council of Beavers - Councilor #4 - \"Heather\"";
var sprite_talk_31 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_31.oname = "Council of Beavers - Councilor #5 - \"Candice\"";
var sprite_talk_32 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_32.oname = "Council of Beavers - Councilor #6 - \"Cedric\"";
var sprite_talk_33 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_33.oname = "Council of Beavers - Councilor #7 - \"Serenity\"";
var sprite_talk_34 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_34.oname = "Council of Beavers - Councilor #8 - \"Nicholas\"";
var sprite_talk_35 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_35.oname = "Council of Beavers - Councilor #9 - \"LaShonda\"";
var sprite_talk_36 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_36.oname = "Council of Beavers - Councilor #10 - \"Reneaye\"";
var sprite_talk_37 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_37.oname = "Council of Beavers - Councilor #11 - \"Eaves\"";
var sprite_talk_38 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_38.oname = "Council of Beavers - Councilor #12 - \"Aénedor\"";
var sprite_talk_39 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_39.oname = "Council of Beavers - Councilor #13 - \"Tinglyn\"";
var sprite_talk_40 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_40.oname = "Council of Beavers - Councilor #14 - \"Shanticia\"";
var sprite_talk_41 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_41.oname = "Council of Beavers - Councilor #15 - \"Bertrand\"";
var sprite_talk_42 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_42.oname = "Council of Beavers - Councilor #16 - \"Nich�las\"";
var sprite_talk_43 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_43.oname = "Council of Beavers - Councilor #17 - \"Solomon\"";
var sprite_talk_44 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_44.oname = "Council of Beavers - Councilor #18 - \"Jewel\"";
var sprite_talk_45 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_45.oname = "Council of Beavers - Councilor #19 - \"Princess\"";
var sprite_talk_46 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_46.oname = "Council of Beavers - Councilor #20 - \"Lucian\"";
var sprite_talk_47 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_47.oname = "Council of Beavers - Councilor #21 - \"Hubert\"";
var sprite_talk_48 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_48.oname = "Council of Beavers - Councilor #22 - \"Jessie\"";
var sprite_talk_49 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_49.oname = "Council of Beavers - Councilor #23 - \"Alice\"";
var sprite_talk_50 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_50.oname = "Council of Beavers - Councilor #24 - \"Sylvester\"";
var sprite_talk_51 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_51.oname = "Council of Beavers - Councilor #25 - \"Shareen\"";
var sprite_talk_52 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_52.oname = "Council of Beavers - Councilor #26 - \"Constantin\"";
var sprite_talk_53 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_53.oname = "Council of Beavers - Councilor #27 - \"Melvin\"";
var sprite_talk_54 = spr("a_beaver_in_a_suit-removebg-preview.png");            sprite_talk_54.oname = "Council of Beavers - Councilor #28 - \"Hailee\"";
var sprite_talk_55 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_55.oname = "Council of Beavers - Councilor #29 - \"Cherry\"";
var sprite_talk_56 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_56.oname = "Council of Beavers - Councilor #30 - \"Savannah\"";
var sprite_talk_57 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_57.oname = "Council of Beavers - Councilor #31 - \"Lewis\"";
var sprite_talk_58 = spr("a_beaver_in_a_suit-removebg-preview.png");		sprite_talk_58.oname = "Council of Beavers - Councilor #32 - \"Richard\"";
var sprite_talk_59 = spr("a_female_possum-removebg-preview.png");		sprite_talk_59.oname = "The Mangler";
var sprite_talk_60 = spr("fishis.png");						sprite_talk_60.oname = "Martin Ricky";
var sprite_talk_61 = spr("bear_.png");						sprite_talk_61.oname = "Bamse Premium";
var sprite_talk_62 = spr("a_black_peacock-removebg-preview.png");		sprite_talk_62.oname = "Child Boswald";
var sprite_talk_63 = spr("a_CD-removebg-preview.png");				sprite_talk_63.oname = "DJ Fizzt";	sprite_talk_63.position.x = 1470;	sprite_talk_63.position.z = 1489;
var sprite_talk_64 = spr("neck-removebg-preview.png");				sprite_talk_64.oname = "The Neck";
var sprite_talk_65 = spr("a_fat_and_sturdy_toad-removebg-preview.png");		sprite_talk_65.oname = "Kent Emerson";
var sprite_talk_66 = spr("ben-shanks-fOFOBKwqdfA-unsplash-removebg-preview.png"); sprite_talk_66.oname = "Bus Johnson";
var sprite_talk_67 = spr("a_dolphin-removebg-preview.png");			sprite_talk_67.oname = "Benjamin Acosta";
var sprite_talk_68 = spr("a_dolphin-removebg-preview.png");			sprite_talk_68.oname = "Benjamin Acosta";
var sprite_talk_69 = spr("a_salt_bottle_with_a_wide_toothy_smile-removebg-preview.png"); sprite_talk_69.oname = "Stewart Lennart";
var sprite_talk_70 = spr("a_weird_power_wash_machine-removebg-preview.png");	sprite_talk_70.oname = "Harpu Vitas";
var sprite_talk_71 = spr("a_fat_and_sturdy_toad-removebg-preview.png");		sprite_talk_71.oname = "Roger Smith";
var sprite_talk_72 = spr("sheepe.png");						sprite_talk_72.oname = "Steven Rockvelle";
var sprite_talk_73 = spr("a_ladybird-removebg-preview.png");			sprite_talk_73.oname = "Perhaps Wellingstone";
var sprite_talk_74 = spr("a_raven-removebg-preview.png");			sprite_talk_74.oname = "AHM";
var sprite_talk_75 = spr("cappy_.png");						sprite_talk_75.oname = "Bara";
var sprite_talk_76 = spr("cappy_.png");						sprite_talk_76.oname = "Capy";
//var sprite_talk_77 = spr("arctichare2.png");					sprite_talk_77.oname = "Arctic Hare";
var sprite_talk_78 = spr("a_dachshund_with_very_short_legs-removebg-preview.png"); sprite_talk_78.oname = "M'Baby";
var sprite_talk_79 = spr("a_hyena-removebg-preview.png");			sprite_talk_79.oname = "Bob Lester";
var sprite_talk_80 = spr("a_wise_wolf-removebg-preview_new.png");		sprite_talk_80.oname = "The Guardian of Life";
var sprite_talk_81 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_81.oname = "Natascha";
var sprite_talk_82 = spr("an_octopus_with_giant_biceps-removebg-preview.png");	sprite_talk_82.oname = "Annabelle Tinglyn";
var sprite_talk_83 = spr("baltabird.png");					sprite_talk_83.oname = "Balt Qwisney";
var sprite_talk_84 = spr("a_lemur_with_glasses_and_a_suit-removebg-preview.png"); sprite_talk_84.oname = "Morten Ollon";
var sprite_talk_85 = spr("A_GOAT_IN_A_UNIFORM-removebg-preview.png");		sprite_talk_85.oname = "Goran";
var sprite_talk_86 = spr("ekorr.png");						sprite_talk_86.oname = "Ek Ollon";
//var sprite_talk_87 = spr("magnetguard.png");
//var sprite_talk_88 = spr("magnetguard.png");
//var sprite_talk_89 = spr("magnetguard.png");
var sprite_talk_90 = spr("a_very_cute_baby_capybara_in_blue_clothes-removebg-preview.png"); sprite_talk_90.oname = "Klint LaValle";

var sprite_talk_92 = spr("originalharass.png");					sprite_talk_92.oname = "Hårass";
var sprite_talk_93 = spr("a_fat_blobfish_wearing_a_shirt-removebg-preview.png");sprite_talk_92.oname = "Mamma Mammson";
var sprite_talk_94 = spr("20230923_134450-removebg-preview.png");		sprite_talk_94.oname = "Stefano DiPripedo";
var sprite_talk_95 = spr("a_fat_pimp-removebg-preview.png");			sprite_talk_95.oname = "HoeMoe";
var sprite_talk_96 = spr("bird_baby.png");					sprite_talk_96.oname = "Lil' Shit";
var sprite_talk_97 = spr("a_tired_rat_that_is_a_janitor_1_-removebg-preview.png"); sprite_talk_97.oname = "Rigatoni";
//var sprite_talk_98 = spr("rumbleraz.png");					sprite_talk_98.oname = "Rumble Raz";
//var sprite_talk_99 = spr("waffle.png");						sprite_talk_99.oname = "Volme";
var sprite_talk_100 = spr("a_frog_combined_with_a_human-removebg-preview.png");	sprite_talk_100.oname = "GarkPark";
var sprite_talk_101 = spr("a_happy_reindeer-removebg-preview.png");		sprite_talk_101.oname = "Rudolf Nissen";
var sprite_talk_102 = spr("a_happy_santa_claus-removebg-preview_new.png");		sprite_talk_102.oname = "Nisse Rudolfsson";
var sprite_talk_103 = spr("cow1.png");						sprite_talk_103.oname = "The 40 year old suspect";
var sprite_talk_104 = spr("cow3.png");						sprite_talk_103.oname = "His brother";
var sprite_talk_105 = spr("mysterious_glowing_cube_with_strange_markings_etch-removebg-preview.png"); sprite_talk_105.oname = "The 3D cube";
var sprite_talk_106 = spr("horace.png");					sprite_talk_106.oname = "Horace Engdahl";
var sprite_talk_107 = spr("sprite_shelf.png");					sprite_talk_107.oname = "shelf";
var sprite_talk_108 = spr("C_harass.png");					sprite_talk_108.oname = "Hårass";
var sprite_talk_109 = spr("C_harass.png");					sprite_talk_109.oname = "Hårass";
var sprite_talk_110 = spr("a_playful_cat-removebg-preview.png");		sprite_talk_110.oname = "Solo";
var sprite_talk_111 = spr("a_playful_cat_1_-removebg-preview.png");		sprite_talk_111.oname = "Kaktus";
var sprite_talk_112 = spr("a_cute_cat_1_-removebg-preview.png");		sprite_talk_112.oname = "Pus";
var sprite_talk_113 = spr("a_cute_cat-removebg-preview.png");			sprite_talk_113.oname = "Kang";
var sprite_talk_114 = spr("puppy.png");						sprite_talk_114.oname = "Mrs Superconductor's Nr. 1 Lover";
var sprite_talk_115 = spr("20230923_130038-removebg-preview_new.png");		sprite_talk_115.oname = "Stefano DiPripedo's mom";
var sprite_talk_116 = spr("computer.png");					sprite_talk_116.oname = "Unreasonably Sexy Math Teacher";
var sprite_talk_117 = spr("a_round_bear-like_wanderer_called_Baba__1_-removebg-preview.png"); sprite_talk_117.oname = "Baba Blue";
var sprite_talk_118 = spr("a_round_bear-like_wanderer_called_Baba__2_-removebg-preview.png"); sprite_talk_118.oname = "Baba Yellow";
var sprite_talk_119 = spr("a_round_bear-like_wanderer_called_Baba__3_-removebg-preview.png"); sprite_talk_119.oname = "Baba Brown";
var sprite_talk_120 = spr("a_round_bear-like_wanderer_called_Baba_-removebg-preview.png"); sprite_talk_120.oname = "Baba Purple";
var sprite_talk_121 = spr("crocodile.png");					sprite_talk_121.oname = "Jasminette";
var sprite_talk_122 = spr("arctichare2.png");					sprite_talk_122.oname = "Enuf Widabolshit";
var sprite_talk_123 = spr("Real_photograph_of_tardigrade_sexy_in_front_of_cam-removebg-preview.png"); sprite_talk_123.oname = "Slophsky Nut";
var sprite_talk_124 = spr("a_frog_combined_with_a_human-removebg-preview.png");	sprite_talk_124.oname = "Lily Frogers";
var sprite_talk_125 = spr("a_fat_and_sturdy_toad-removebg-preview.png");	sprite_talk_125.oname = "Ted Salamanderson";
var sprite_talk_126 = spr("wizzy.png");						sprite_talk_126.oname = "Wizzy";
var sprite_talk_127 = spr("a_little_dark_wizard_man_that_is_kinda_cute_1_-removebg-preview_new.png"); sprite_talk_127.oname = "Wobby";
var sprite_talk_128 = spr("blackhole.png");					sprite_talk_128.oname = "Space Vagina";
var sprite_talk_129 = spr("rumbleraz.png");					sprite_talk_129.oname = "Rumble Raz";
var sprite_talk_130 = spr("sheepie-removebg-preview.png");			sprite_talk_130.oname = "John Lowe";
var sprite_talk_131 = spr("a_long_log_standing_upright-removebg-preview.png");	sprite_talk_131.oname = "Ghost";
var sprite_talk_132 = spr("an_eager_eagle_holding_a_microphone-removebg-preview_new.png"); sprite_talk_132.oname = "Janet Spice";
var sprite_talk_133 = spr("an_eager_eagle_holding_a_microphone-removebg-preview_new.png"); sprite_talk_133.oname = "Janet Spice";
var sprite_talk_134 = spr("an_eager_eagle_holding_a_microphone-removebg-preview_new.png"); sprite_talk_134.oname = "Janet Spice";
var sprite_talk_135 = spr("bearfree.png");					sprite_talk_135.oname = "Bamse Freemium";
var sprite_talk_136 = spr("a_superhuman_robot_machine_with_a_huge_club-removebg-preview.png"); sprite_talk_136.oname = "Brutus Force";
var sprite_talk_137 = spr("phone.png");
var sprite_talk_138 = spr("sheep.png");						sprite_talk_138.oname = "Geoff Pesos";
var sprite_talk_139 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_139.oname = "BinocuLars";
var sprite_talk_140 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_140.oname = "BinocuLars";
var sprite_talk_141 = spr("fishis.png");					sprite_talk_141.oname = "Martin Ricky";
var sprite_talk_142 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_142.oname = "BinocuLars";

//var sprite_talk_144 = spr("magnetguard.png");
//var sprite_talk_145 = spr("phone.png");
var sprite_talk_146 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_146.oname = "BinocuLars";
//var sprite_talk_147 = spr("sheep.png");						sprite_talk_147.oname = "Grangas";
//var sprite_talk_148 = spr("octopussy.png");					sprite_talk_148.oname = "Legolas Victorino";
var sprite_talk_148 = spr("modular_item-removebg-preview.png", 0.7);			sprite_talk_148.oname = "BinocuLars";
var sprite_talk_149 = spr("modular_item-removebg-preview.png", 0.7);			sprite_talk_149.oname = "BinocuLars";
var sprite_talk_150 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_150.oname = "BinocuLars";
var sprite_talk_151 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_151.oname = "BinocuLars";
var sprite_talk_152 = spr("C_oballin.png");					sprite_talk_152.oname = "O'Ballin";
var sprite_talk_153 = spr("polisbil.png");					sprite_talk_153.oname = "Bella";
var sprite_talk_154 = spr("a_crypto_mining_cowboy-removebg-preview.png");	sprite_talk_154.oname = "Bitcoin Cowboy";
var sprite_talk_155 = spr("modular_item-removebg-preview.png", 0.7);			sprite_talk_155.oname = "BinocuLars";
var sprite_talk_156 = spr("notepad.png");
var sprite_talk_157 = spr("notepad.png");
var sprite_talk_158 = spr("notepad.png");
var sprite_talk_159 = spr("notepad.png");
var sprite_talk_160 = spr("notepad.png");
var sprite_talk_161 = spr("notepad.png");
var sprite_talk_162 = spr("notepad.png");
var sprite_talk_163 = spr("flag_race.png", 3);
var sprite_talk_164 = spr("dog_funny.png");					sprite_talk_164.oname = "Djohnny";
var sprite_talk_165 = spr("bird.png");						sprite_talk_165.oname = "George \"Sad\" Larsen";
var sprite_talk_166 = spr("an_animal_with_2000s_nu_metal_spikes_haircut_1_-removebg-preview.png"); sprite_talk_166.oname = "Turbo";
var sprite_talk_167 = spr("a_wise_wolf-removebg-preview_new.png");		sprite_talk_167.oname = "The Guardian of Life";
var sprite_talk_168 = spr("waffle.png");					sprite_talk_168.oname = "Volme";
var sprite_talk_169 = spr("computer.png");					sprite_talk_169.oname = "Unreasonably Sexy Math Teacher";
var sprite_talk_170 = spr("cow3.png");						sprite_talk_170.oname = "Mark";
var sprite_talk_171 = spr("bathroom.jpg");					sprite_talk_171.oname = "The Perfect Bathroom";
var sprite_talk_172 = spr("beafer.png");					sprite_talk_172.oname = "Mona Chefumbo";
var sprite_talk_173 = spr("beafer.png");					sprite_talk_173.oname = "Disese Chefumbo";
var sprite_talk_174 = spr("rumbleraz.png");					sprite_talk_174.oname = "Harald Svinulfsson";
//var sprite_talk_175 = spr("cow3.png");
var sprite_talk_176 = spr("the_planet_saturn-removebg-preview.png");		sprite_talk_176.oname = "Intertwine";
var sprite_talk_177 = spr("swane.png");						sprite_talk_177.oname = "Septembert";
var sprite_talk_178 = spr("baywaatch.png");					sprite_talk_178.oname = "2Mas";	
var sprite_talk_179 = spr("saville.png");					sprite_talk_179.oname = "Saville";
var sprite_talk_180 = spr("a_fat_blobfish_wearing_a_shirt-removebg-preview.png"); sprite_talk_180.oname = "Baby Yoda with a dadbod";
var sprite_talk_181 = spr("a_dusty_car-removebg-preview.png");			sprite_talk_181.oname = "Redacted";
var sprite_talk_182 = spr("a_country_singer-removebg-preview.png");		sprite_talk_182.oname = "Babe McCowell";
var sprite_talk_183 = spr("beaverlog_new.png");					sprite_talk_183.oname = "Michael Quiggly";
var sprite_talk_184 = spr("diogoalves.png");					sprite_talk_184.oname = "Graham Fuckpissshit";
var sprite_talk_185 = spr("a_wise_wolf-removebg-preview_new.png");		sprite_talk_185.oname = "Portsmouth Reykjadottir";
var sprite_talk_186 = spr("Real_photograph_of_tardigrade_sexy_in_front_of_cam-removebg-preview.png"); sprite_talk_186.oname = "Olmo V. Acuum";
//var sprite_talk_187 = spr("swane.png");						sprite_talk_187.oname = "Orar Påkem";
var sprite_talk_188 = spr("an_easter_egg-removebg-preview.png");		sprite_talk_188.oname = "Kutan Abscess";
var sprite_talk_189 = spr("an_easter_bunny-removebg-preview.png");		sprite_talk_189.oname = "Furunkel Karbunkel";
var sprite_talk_190 = spr("jesus_christ_in_a_cool_pose-removebg-preview.png");	sprite_talk_190.oname = "Jesus G. Christ";
var sprite_talk_191 = spr("an_easter_egg-removebg-preview.png");		sprite_talk_191.oname = "Denise Abscess";
var sprite_talk_192 = spr("an_easter_bunny-removebg-preview.png");		sprite_talk_192.oname = "Angela Karbunkel";
var sprite_talk_193 = spr("a_lemur_with_glasses_and_a_suit-removebg-preview.png"); sprite_talk_193.oname = "Big Dude";
var sprite_talk_194 = spr("a_black_peacock-removebg-preview.png");		sprite_talk_194.oname = "Son Boswald";
//var sprite_talk_195 = spr("phone.png");
var sprite_talk_196 = spr("phone.png");
var sprite_talk_197 = spr("sprite_cow.png");
var sprite_talk_198 = spr("magnetguard.png");
var sprite_talk_199 = spr("magnetguard.png");
var sprite_talk_200 = spr("flag_race.png", 3);
var sprite_talk_201 = spr("flag_race.png", 3);
var sprite_talk_202 = spr("flag_race.png", 3);
var sprite_talk_203 = spr("flag_race.png", 3);
var sprite_talk_204 = spr("bhagz.png");						sprite_talk_204.oname = "Bhagz";
var sprite_talk_205 = spr("selling.png");					sprite_talk_205.oname = "Kay Bao";

var sprite_talk_208 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_208.oname = "BinocuLars";

var sprite_talk_212 = spr("an_eager_eagle_holding_a_microphone-removebg-preview_new.png"); sprite_talk_212.oname = "Janet Spice";
var sprite_talk_213 = new THREE.PointLight(0xFFFF34, 3, 25); scene.add(sprite_talk_213);
var sprite_talk_214 = spr("darkcloud.png", 18);
var sprite_talk_215 = spr("polygan.png", 8);
var sprite_talk_216 = spr("gymsign.png", 2);
var sprite_talk_217 = spr("hongkongsign.png", 6);
var sprite_talk_218 = spr("dogertforbid.png", 3);
var sprite_talk_219 = spr("volcanomap.png", 2);

var sprite_talk_227 = spr("C_harass.png");					sprite_talk_227.oname = "Hårass";
var sprite_talk_228 = spr("C_harass.png");					sprite_talk_228.oname = "Hårass";
var sprite_talk_229 = spr("C_harass.png");					sprite_talk_229.oname = "Hårass";
var sprite_talk_230 = spr("C_harass.png");					sprite_talk_230.oname = "Hårass";
var sprite_talk_231 = spr("C_harass.png");					sprite_talk_231.oname = "Hårass";
var sprite_talk_232 = spr("C_harass.png");					sprite_talk_232.oname = "Hårass";
var sprite_talk_233 = spr("C_harass.png");					sprite_talk_233.oname = "Hårass";
var sprite_talk_234 = spr("C_harass.png");					sprite_talk_234.oname = "Hårass";
var sprite_talk_235 = spr("C_harass.png");					sprite_talk_235.oname = "Hårass";
var sprite_talk_236 = spr("C_harass.png");					sprite_talk_236.oname = "Hårass";
var sprite_talk_237 = spr("C_harass.png");					sprite_talk_237.oname = "Hårass";
var sprite_talk_238 = spr("C_harass.png");					sprite_talk_238.oname = "Hårass";
var sprite_talk_239 = spr("C_harass.png");					sprite_talk_239.oname = "Hårass";

var sprite_talk_240 = spr("bear_.png");						sprite_talk_240.oname = "Bamse Mortenson";

var sprite_talk_241 = spr("harassyes.png", 2);
var sprite_talk_242 = spr("harassno.png", 2);
var sprite_talk_243 = spr("harassrocks(1)(1).png", 2, 8);

var sprite_talk_244 = spr("a_photorealistic_campfire_1_-removebg-preview.png", 2);

var sprite_talk_245 = spr("hamster_baby.png", 0.4);				sprite_talk_245.oname = "Ledge";
var sprite_talk_246 = spr("BRA ADELE.png", 1.2, 0.7);				sprite_talk_246.oname = "Roger Fuckpissshit";
var sprite_talk_247 = spr("mountaingoat.png");					sprite_talk_247.oname = "Babs";
var sprite_talk_248 = spr("brutusice.png", 1.8);				sprite_talk_248.oname = "Brutus Ice";
//var sprite_talk_249 = spr("

// race
var sprite_talk_250 = spr("flag_race.png", 3);

var sprite_talk_251 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_251.oname = "BinocuLars";
var sprite_talk_252 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_252.oname = "BinocuLars";
var sprite_talk_253 = spr("modular_item-removebg-preview.png", 0.7);		sprite_talk_253.oname = "BinocuLars";

var sprite_talk_254 = spr("notepad.png");

var sprite_talk_255 = spr("sprite_sushi_ep2.png", 0.7);				sprite_talk_255.oname = "Oshikko Pantsu";
var sprite_talk_256 = spr("sprite_cow_polishwife.png", 0.8);			sprite_talk_256.oname = "Polish Wife";

var sprite_talk_257 = spr("epper2.png", 1.1);					sprite_talk_257.oname = "'Epper";

const sprite = new Array();
sprite[CAR_ADELE]			= spr("adele_ny3.png",	 		0.9);
sprite[CAR_DARK_GANDALF]		= spr("C_dg.png",			1.2);
sprite[CAR_DADDY]			= spr("C_daddy.png");
sprite[CAR_DOGERT]			= spr("C_dogert.png",			1);
sprite[CAR_OMALLEY]			= spr("omalley_fez.png",		0.7);
sprite[CAR_HARASS]			= spr("C_harass.png",			0.7);
sprite[CAR_DISONESTY]			= spr("");
sprite[CAR_MRS_SUPERCONDUCTOR]		= spr("mrs_superconductor2.png",	1.1);
sprite[CAR_POLISH_COW]			= spr("polish_cow2.png",		1.1);
sprite[CAR_EPPER]			= spr("epper2.png");

const sprite_pil = new Array();
sprite_pil[CAR_ADELE]			= spr("adele_ny3_pil.png", 		3.6, 0.9);
sprite_pil[CAR_DARK_GANDALF]		= spr("C_dg_pil.png",			4.8, 1.2);
sprite_pil[CAR_DADDY]			= spr("C_daddy_pil(1).png",		4, 1);
sprite_pil[CAR_DOGERT]			= spr("C_dogert_pil.png",		4, 1);
sprite_pil[CAR_OMALLEY]			= spr("omalley_pil.png",		2.8, 0.7);
sprite_pil[CAR_HARASS]			= spr("C_harass_pil.png",		2.8, 0.7);
sprite_pil[CAR_DISONESTY]		= spr("");
sprite_pil[CAR_MRS_SUPERCONDUCTOR]	= spr("mrs_superconductor2_pil.png",	4.4, 1.1);
sprite_pil[CAR_POLISH_COW]		= spr("polish_cow2_pil.png",		4.4, 1.1);
sprite_pil[CAR_EPPER]			= spr("epper2_pil.png",			4, 1);

const sprite_bak = new Array();
sprite_bak[CAR_ADELE]			= spr("C_adele_bak.png",		0.9);
sprite_bak[CAR_DARK_GANDALF]		= spr("C_dg_bak.png",			1.2);
sprite_bak[CAR_DADDY]			= spr("C_daddy_bak.png");
sprite_bak[CAR_DOGERT]			= spr("C_dogert_bak.png",		1);
sprite_bak[CAR_OMALLEY]			= spr("omalley_bak.png",		0.7);
sprite_bak[CAR_HARASS]			= spr("C_harass_bak.png",		0.7);
sprite_bak[CAR_DISONESTY]		= spr("");
sprite_bak[CAR_MRS_SUPERCONDUCTOR]	= spr("mrs_superconductor2.png",	1.1);		// ,,, l�gg till fler bak-sprites f�r karakt�rer!
sprite_bak[CAR_POLISH_COW]		= spr("polish_cow2_bak.png",		1.1);
sprite_bak[CAR_EPPER]			= spr("epper2_bak.png");

const bak_shelf				= spr("C_shelf.png",			0.4);
var sprite_shelf_epper			= spr("C_shelf_epper.png",		0.4);
var shelf				= spr("car_shelf.png",			0.6);
var shelf_flames			= spr("shelf_flames.png",		0.6);	shelf_flames.visible = false;
var shelf_epa				= spr("shelf_epa.png",			0.6);	shelf_epa.visible = false;
var shelf_racing			= spr("shelf_racing.png",		0.6);	shelf_racing.visible = false;
var shelf_pipe				= spr("shelf_pipe.png",			0.6);	shelf_pipe.visible = false;
var shelf_beard				= spr("shelf_beard.png",		0.6);	shelf_beard.visible = false;

// cars must be created after cz sprites so they get drawn in the correct order
const player				= spr("bomb.png");
player.visible = false;

const cz = new Array();
cz[CAR_ADELE]				= spr("car_adele.png",			0.95);
cz[CAR_DARK_GANDALF]			= spr("car_dg.png",			0.9);
cz[CAR_DADDY]				= spr("daddycar.png",			1.12);
cz[CAR_DOGERT]				= spr("car_dogert.png",			0.8);
cz[CAR_OMALLEY]				= spr("car_omalley.png",		0.75);
cz[CAR_HARASS]				= spr("car_harass_3.png",		0.9);
cz[CAR_DISONESTY]			= spr("",				0.75);
cz[CAR_MRS_SUPERCONDUCTOR]		= spr("car_mrs_superconductor.png",	0.95);
cz[CAR_POLISH_COW]			= spr("polish_bicycle.png",		1.2);	//car_polish_cow.png",		0.75);
cz[CAR_EPPER]				= spr("car_epper.png",			0.75);

// SOUNDS									// vol	// loop
//const sound_carstart			= snd("sound_carstart.mp3",		0.75,	false);		// is in loadfirst.js
const sound_crash			= snd("sound_carland2.mp3",		0.5,	false);
const sound_car				= snd("car4.mp3",			0.8);
const sound_cz_car = new Array();
for (let t = 0; t < NUMBER_OF_CARS; t++) sound_cz_car[t] = snd("car4.mp3");
const sound_collision			= snd("collision.mp3",			0.7,	false);
const sound_grass			= snd("grass.mp3",			0.7);
const sound_water			= snd("water.mp3",			0.7);
const sound_splash			= snd("water_splash.mp3",		0.85,	false);
const sound_error			= snd("error.mp3",			0.85,	false);
const sound_countdown			= snd("sound_countdown.mp3",		0.6,	false);
const sound_checkpoint			= snd("sound_checkpoint.mp3",		1,	false);
const sound_lapfanfare			= snd("lapfanfare.mp3",			1,	false);
const sound_poof			= snd("firestop.mp3",			0.6,	false);
const sound_click			= snd("ui_click.mp3",			1,	false);
const sound_pause			= snd("ui_pause.mp3",			0.9,	false);
const sound_explosion2			= snd("softer explosion.mp3",		0.4,	false);
const sound_firesvada			= snd("firesvada.mp3",			1);
const sound_cartoon			= snd("cartoon.mp3",			0.8,	false);
const sound_laser			= snd("laser.mp3",			0.4,	false);
const sound_ring			= snd("ring.mp3",			1,	false);
const sound_phoneclick			= snd("phoneclick.mp3",			0.4,	false);
const sound_punch			= snd("sound_punch.mp3",		0.47,	false);
const sound_washingmachine		= snd("washingmachine.mp3",		0.38);
const sound_washingmachine2		= snd("washingmachine.mp3",		0.38);
const sound_washclick			= snd("washclick.mp3",			0.5,	false);
const sound_manlygrunt			= snd("manlygrunt.mp3",			0.7,	false);
const sound_treadmill			= snd("treadmill.mp3",			0.8,	false);
const sound_dreamintro			= snd("dreamintro.mp3",			0.8,	false);
const sound_bombdrop			= snd("bombdrop.mp3",			1,	false);
const sound_bomb			= snd("bomb.mp3",			1,	false);
const sound_glasshatter			= snd("glasshatter.mp3",		1,	false);
const sound_boing			= snd("boing.mp3",			0.8,	false);
const sound_chainsaw			= snd("chainsaw.mp3",			0.9,	false);
const sound_gun				= snd("gun.mp3",			0.67,	false);
const sound_gunshot			= snd("gunshot.mp3",			0.84,	false);
const sound_grasscut			= snd("grasscut.mp3",			0.6,	false);
const sound_sodadrink			= snd("sodadrink.mp3",			0.8,	false);
const sound_banjokazooie		= snd("yt1s.com - Select Sound Effect BanjoKazooie Music.mp3",	1, false);

const sound_adele			= snd("adele.mp3",			1,	false);
const sound_dark_gandalf		= snd("dark_gandalf.mp3",		0.87,	false);
const sound_daddy			= snd("daddy.mp3",			1,	false);
const sound_dogert			= snd("dogert.mp3",			1,	false);
const sound_omalley			= snd("omalley.mp3",			1,	false);
const sound_harass			= snd("sound_harass2.mp3",		1,	false);
//
const sound_mrs_superconductor		= snd("sound_mrs_superconductor.mp3",	0.5,	false);
const sound_polish_cow			= snd("sound_polish_cow.mp3",		1,	false);
const sound_epper			= snd("epper.mp3",			0.8,	false);

const sound_cz				= snd("talkcute.mp3",	  		1,	false);


// race
var mesh_checkpoint_current = spr("flag_green.png", 4);
mesh_checkpoint_current.material.fog = false;
scene.add(mesh_checkpoint_current);
var mesh_checkpoint_current_faraway = spr("flag_green.png", 4);
mesh_checkpoint_current_faraway.material.fog = false;
scene.add(mesh_checkpoint_current_faraway);
var mesh_checkpoint_finish = spr("flag_finish.png", 4);
mesh_checkpoint_finish.material.fog = false;
scene.add(mesh_checkpoint_finish);

var mesh_sun = new THREE.Mesh(new THREE.SphereGeometry(8, 32, 32), tex("sun.jpg"));
scene.add(mesh_sun);

// train
// collision box?!
var mesh_train = new THREE.Mesh(new THREE.BoxGeometry(16, 2.5, 1.5), tex("trainwall.jpg", 9,1));
scene.add(mesh_train);
mesh_train.visible = false;

// rings
var mesh_globe = new THREE.Mesh(new THREE.SphereGeometry(24, 32, 32), tex("worldmap.jpg", 1,-1));
scene.add(mesh_globe);
mesh_globe.visible = false;
var mesh_space = new THREE.Mesh(new THREE.CylinderGeometry(73, 73, 50*16, 32), tex("black.png", 2,2));
mesh_space.material.side = THREE.BackSide;
scene.add(mesh_space);
mesh_space.visible = false;
