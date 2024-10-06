// functions.js
// game functions
// kbrecordzz 2024

"use strict";

const CAR_ADELE				= 0;

const FRAMES_PER_HOUR			= 834;
const FRAMES_PER_DAY			= 20000;

const MAX_SPEED_ROAD			= 0.10;
const MAX_SPEED_REVERSE_ROAD		= -0.05;
const MAX_SPEED_OFFROAD			= 0.07;
const MAX_SPEED_REVERSE_OFFROAD		= -0.04;
const ACCELERATION_ROAD			= 0.00012;
const ACCELERATION_OFFROAD		= 0.00007;
const TURN_SPEED			= 0.024;

const FRICTION_FORWARD_ROAD		= 0.00082;
const FRICTION_BACKWARD_ROAD		= 0.0014;
const FRICTION_FORWARD_OFFROAD		= 0.001;
const FRICTION_BACKWARD_OFFROAD		= 0.001;


// inga cut-varden far tas bort eller andras. bara laggas till
const CUT_SPLASHSCREEN			= -2;
var splashscreen_started		= false;

const CUT_SPLASHSCREEN_WAIT		= -1;

const CUT_PAUSEMENU			= -3;

const CUT_CUTSCENE_BLACKINTRO		= 10;
var cutscene_blackintro_started		= false;

const CUT_FREEROAM_INTRO2		= 2000;
var freeroam_intro2_started		= false;


// get current in-game time. you set minutes_resolution to 15 you get the current quarter, 60 you get the current hour, and so on. the game's time comes from frame_counter which increases with 1 every frame, so it's good to be able to get less exact time
function get_time_by_minutes_resolution(minutes_resolution) { return Math.floor(frame_counter/(FRAMES_PER_HOUR*(minutes_resolution/60))) * (minutes_resolution/60); }

// my own version of lookAt() that only works in x and z dimensions (=you can't look upwards). for characters/objects. because rotations and quaternions suck
function lookat_datass(fobject1, fobject2) { return Math.atan2((fobject2.position.x-fobject1.position.z), -(fobject2.position.x-fobject1.position.x)) - 1.5707963267948966; }

// my own version of lookAt() that only works in x and z dimensions (=you can't look upwards). for xz positions. because rotations and quaternions suck
function lookat_datass_xz(fx1, fz1, fx2, fz2) { return Math.atan2((fz2-fz1), -(fx2-fx1)) - 0.5*Math.PI; }

// my own version of translateZ() because you know why.
function xz_move(fobject, frotation, fspeed)
{
	fobject.position.x += fspeed * Math.sin(frotation);
	fobject.position.z += fspeed * Math.cos(frotation);
}

// get the actual rotation in radians. my own function because the standard functions don't work (because rotations and quaternions suck). angle can't be less than -1000*Math.PI I guess?
function rotation_real_get(angle) { return (angle + 31415.92653589793) % (6.283185307179586); }

//_ sets character name & image and plays character sound at dialogue
function dialog_set_metadata(at_object)
{
	sound_adele.pause();

	if (at_object === sprite_adele)		{ if (sound_adele.paused === true)	{ sound_adele.play(); }		head = "C_adele_head.png";		name = "Adele"; }
}

//_ shows dialogue BETween cutscenes. dialogue changes by timer
function bet_pers(at_object, fdialog)
{
	// only do this once at the start of the dialog
	if (last_dialog !== fdialog)
	{
		dialog_set_metadata(at_object);								// play sound, set head image variable and name variable
		if (head.includes("files/") === true) document.getElementById("dialog_head").src = head;
		else document.getElementById("dialog_head").src = "files/" + head;			// set head image in HTML document
		document.getElementById("dialog_name").innerHTML = name;				// set name in HTML document
		dialog = fdialog;									// set dialog text variable
	}

	rolling_dialog();										// set dialog text in HTML document
}

//_ rolling text in dialog
function rolling_dialog()
{
	if (dialog !== last_dialog) now_char = 0;

	if (now_char < dialog.length)
	{
		now_char += 2;
		document.getElementById("dialog_text").innerHTML = dialog.substring(0, now_char);
	}

	last_dialog = dialog;
}

// timescene abstraction
function ts_start()
{
	if (bet_started === false)
	{
		start_hour = get_time_by_minutes_resolution(15);
		bet_started = true;
	}
}

// timescene abstraction
function ts_end(fcut)
{
	dialog = "";
	bet_started = false;
	cut = fcut;
}

// timescene abstraction
function ts_end_to_room(fcut)
{
	dialog = "";
	bet_started = false;
//	cut = fcut;

	next_cut_after_blackintro = fcut;		// sätts i början av main.js
	cut = CUT_CUTSCENE_BLACKINTRO;
}

// timescene abstraction
function ts_end_from_talk(fcut)
{
	dialog = "";
	bet_started = true;
	cut = fcut;
}

// timescene abstraction
function ts_during()
{
	q = (get_time_by_minutes_resolution(15)-start_hour);
	if (q < 0) q += 24;
}

//! updates all layout
function layout_set()
{
	// kopia av konstgjord loading screen!!
	if (performance.now()-splashscreen_very_starttime > 1000)
	{
	if (cut < 0 || frame_counter % 10 === 0)		// for optimizing
	{
		// portrait
		if (window.innerHeight > window.innerWidth)
		{
			document.getElementById("count_3").style = 
				"position: fixed; top: 17vh; left: 41vw; width: 18vw;\
				display: block;";
			document.getElementById("count_2").style = 
				"position: fixed; top: 17vh; left: 41vw; width: 18vw;\
				display: block;";
			document.getElementById("count_1").style = 
				"position: fixed; top: 17vh; left: 41vw; width: 18vw;\
				display: block;";
			document.getElementById("wrongway").style = 
				"position: fixed; top: 17vh; left: 20vw; width: 60vw;\
				display: block;";

			document.getElementById("dialog_background").style = 
				"position: fixed; top: 54%; left: 50%; transform: translateX(-50%); width: 50vh; max-width: 98vw; height: 17.5vh;\
				display: block;\
				border: 0px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("dialog_head").style = 
				"position: fixed; top: -11.2vh; left: 50%; transform: translateX(-48vw); height: 11vh;\
				image-rendering: pixelated;";

			document.getElementById("dialog_name").style = 
				"position: relative; top: 0.5vh; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 2.3vh; color: white; font-family: 'kbfont'; text-align: left;";

			document.getElementById("dialog_text").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 2.2vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";

			document.getElementById("dvdmenu").style =
				"position: fixed; top: 10vh; left: 50%; transform: translateX(-50%); height: 40vh; width: 60vh; max-width: 95vw;\
				display: block;\
				padding: 1vh;\
				font-size: 2.4vh; color: white; font-family: 'kbfont'; text-align: left; word-break; break-word;";

			document.getElementById("dvdmenu_image").style = 
				"position: relative; top: 0vw; left: 50% transform: translate(-50%, 0%); width: 100%;\
				display: block;";

			document.getElementById("credits_background").style = 
				"position: fixed; top: 70vh; left: 50%; transform: translateX(-50%); width: 35vh; height: 20vh;\
				display: block;";

			document.getElementById("credits_text").style = 
				"position: relative; top: 1vw; left: 50%; transform: translate(-50%, 0%); width: 68vh; max-width: 95vw;\
				display: block;\
				font-size: 1.9vh; color: lightgray; font-family: 'kbfont'; text-align: center; line-height: 110%;";

			document.getElementById("dialog_background").style.cursor = "pointer";

			document.getElementById("button_pause").style =
				"position: fixed; top: 1vh; left: 1vh; height: 5.7vh; width: 5.7vh;\
				display: flex; cursor: pointer;\
				border: 0.5vh solid; border-color: #2d41ff;\
				background: none; box-sizing: border-box;\
				font-size: 4.6vh; color: #2d41ff; font-family: 'kbfont'; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 1vh; right: 1vh; height: 3.7vh; width: 3.7vh;\
				display: flex; cursor: pointer;\
				border: 0.5vh dashed; border-color: rgb(115, 32, 93);\
				background: none; box-sizing: border-box;";

			document.getElementById("button_left").style = 
				"position: fixed; bottom: 14%; left: 2vh; width: 8vh; height: 8vh;\
				display: flex;\
				border: 0.5vh solid; border-color: #2d41ff;\
				background: none;\
				font-size: 7vh; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_right").style = 
				"position: fixed; bottom: 9%; left: 12vh; width: 8vh; height: 8vh;\
				display: flex;\
				border: 0.5vh solid; border-color: #2d41ff;\
				background: none;\
				font-size: 7vh; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_down").style = 
				"position: fixed; bottom: 7%; right: 8vh; width: 7vh; height: 7vh;\
				display: flex;\
				border: 0.5vh solid; border-color: red;\
				background: none;\
				font-size: 3vh; color: red; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_up").style = 
				"position: fixed; bottom: 16%; right: 3vh; width: 9vh; height: 9vh;\
				display: flex;\
				border: 0.5vh solid; border-color: #6DFA0F;\
				background: none;\
				font-size: 11vh; color: #6DFA0F; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_play").style = 
				"position: fixed; top: 55%; left: 50%; transform: translateX(-50%); width: 45vh; max-width: 95vw;\
				display: block; cursor: pointer;";
		}
		// landscape
		else
		{
		// landscape (mobile)
		if (mobile === true)
		{
			document.getElementById("count_3").style = 
				"position: fixed; top: 25vh; left: 45vw; width: 10vw;\
				display: block;";
			document.getElementById("count_2").style = 
				"position: fixed; top: 25vh; left: 45vw; width: 10vw;\
				display: block;";
			document.getElementById("count_1").style = 
				"position: fixed; top: 25vh; left: 45vw; width: 10vw;\
				display: block;";
			document.getElementById("wrongway").style = 
				"position: fixed; top: 25vh; left: 30vw; width: 40vw;\
				display: block;";

			document.getElementById("dialog_background").style = 
				"position: fixed; top: 0.5vh; left: 14vw; width: 72vw; height: 10vw;\
				display: block;\
				border: 0.1vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("dialog_head").style = 
				"position: fixed; top: 0.6vh; left: 14.4vw; height: 9.3vw;\
				image-rendering: pixelated;";

			document.getElementById("dialog_name").style = 
				"position: relative; left: 15%; width: 82%; line-height: 0%;\
				display: block;\
				font-size: 1.8vw; color: white; font-family: 'kbfont'; text-align: left;";

			document.getElementById("dialog_text").style = 
				"position: relative; left: 15%; width: 82%;\
				display: block;\
				font-size: 1.8vw; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 105%;";

			document.getElementById("dvdmenu").style =
				"position: fixed; left: 8vw; top: 1vw; width: 60vw;\
				display: block;\
				padding: 1vw;\
				font-size: 2vw; color: white; font-family: 'kbfont'; text-align: left; word-break; break-word;";

			document.getElementById("dvdmenu_image").style = 
				"position: relative; top: 0vw; left: 50% transform: translate(-50%, 0%); width: 40%;\
				display: block;";

			document.getElementById("credits_background").style = 
				"position: fixed; bottom: 2vh; right: 11vw; width: 11vw;\
				display: block;";

			document.getElementById("credits_text").style = 
				"position: relative; top: 1vw; left: 50%; transform: translate(-50%, 0%); width: 30vw;\
				display: block;\
				font-size: 1.6vw; color: lightgray; font-family: 'kbfont'; text-align: center; line-height: 110%;";

			document.getElementById("dialog_background").style.cursor = "pointer";

			document.getElementById("button_pause").style =
				"position: fixed; top: 1vw; left: 1vw; width: 4.8vw; height: 4.8vw;\
				display: flex; cursor: pointer;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 4.5vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 1vw; right: 1vw; width: 2.7vw; height: 2.7vw;\
				display: block; cursor: pointer;\
				border: 0.5vw dashed; border-color: rgb(115, 32, 93);\
				background: none;";

			document.getElementById("button_left").style = 
				"position: fixed; bottom: 16%; left: 7%; width: 8vw; height: 8vw;\
				display: flex;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 12vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_right").style = 
				"position: fixed; bottom: 8%; left: 17%; width: 8vw; height: 8vw;\
				display: flex;\
				border: 0.5vw solid; border-color: #2d41ff;\
				background: none;\
				font-size: 12vw; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_down").style = 
				"position: fixed; bottom: 7%; right: 18%; width: 7vw; height: 7vw;\
				display: flex;\
				border: 0.5vw solid; border-color: red;\
				background: none;\
				font-size: 5vw; color: red; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_up").style = 
				"position: fixed; bottom: 17%; right: 7%; width: 9vw; height: 9vw;\
				display: flex;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: none;\
				font-size: 17vw; color: #6DFA0F; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_play").style = 
				"position: fixed; bottom: 0vh; left: 31vw; width: 38vw;\
				display: block; cursor: pointer;";
		}
		// landscape (desktop)
		else
		{
			document.getElementById("count_3").style = 
				"position: fixed; top: 20vh; left: 45vw; width: 10vw;\
				display: block;";
			document.getElementById("count_2").style = 
				"position: fixed; top: 20vh; left: 45vw; width: 10vw;\
				display: block;";
			document.getElementById("count_1").style = 
				"position: fixed; top: 20vh; left: 45vw; width: 10vw;\
				display: block;";
			document.getElementById("wrongway").style = 
				"position: fixed; top: 20vh; left: 30vw; width: 40vw;\
				display: block;";

			document.getElementById("dialog_background").style = 
				"position: fixed; top: 2vh; left: 50%; transform: translateX(-50%); width: 90vh; height: 15vh;\
				display: block;\
				border: 1px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";

			document.getElementById("dialog_head").style = 
				"position: fixed; top: 1.8vh; left: 50%; transform: translateX(-44vh); height: 13vh;\
				image-rendering: pixelated;";

			document.getElementById("dialog_name").style = 
				"position: relative; top: 0.5vh; left: 17%; width: 82%; line-height: 25%;\
				display: block;\
				font-size: 2.6vh; color: white; font-family: 'kbfont'; text-align: left;";

			document.getElementById("dialog_text").style = 
				"position: relative; left: 17%; width: 82%;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";

			document.getElementById("dvdmenu").style =
				"position: fixed; top: 14vh; left: 50%; transform: translateX(-50%); height: 50vh; width: 75vh;\
				display: block;\
				padding: 1.6vh;\
				font-size: 2.5vh; color: white; font-family: 'kbfont'; text-align: left; line-height: 3.5vh; word-break; break-word; letter-spacing: 0.2vh;";

			document.getElementById("dvdmenu_image").style = 
				"position: relative; top: 0vw; left: 50% transform: translate(-50%, 0%); width: 100%;\
				display: block; image-rendering: pixelated;";

			document.getElementById("credits_background").style = 
				"position: fixed; bottom: 10vh; right: 1vh; width: 36vh; height: 25vh;\
				display: block;";

			document.getElementById("credits_text").style = 
				"position: relative; top: 0vw; left: 50%; transform: translate(-50%, 0%); width: 100%;\
				display: block;\
				font-size: 2.2vh; color: lightgray; font-family: 'kbfont'; text-align: center; line-height: 110%;";

			document.getElementById("dialog_background").style.cursor = "pointer";
 
			document.getElementById("button_pause").style =
				"position: fixed; top: 2vh; left: 2vh; height: 6vh; width: 6vh;\
				display: flex; cursor: pointer;\
				border: 0.65vh solid; border-color: #2d41ff;\
				background: none; box-sizing: border-box;\
				font-size: 4.5vh; color: #2d41ff; font-family: 'kbfont'; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_fullscreen").style = 
				"position: fixed; top: 2vh; right: 2vh; height: 4vh; width: 4vh;\
				display: flex; cursor: pointer;\
				border: 0.65vh dashed; border-color: rgb(115, 32, 93);\
				background: none; box-sizing: border-box;";

			document.getElementById("button_left").style = 
				"position: fixed; bottom: 16vh; left: 6vh; width: 6vh; height: 6vh;\
				display: flex;\
				border: 0.5vh solid; border-color: #2d41ff;\
				background: none;\
				font-size: 6vh; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_right").style = 
				"position: fixed; bottom: 9vh; left: 16vh; width: 6vh; height: 6vh;\
				display: flex;\
				border: 0.5vh solid; border-color: #2d41ff;\
				background: none;\
				font-size: 6vh; color: #2d41ff; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_down").style = 
				"position: fixed; bottom: 7vh; right: 14vh; width: 5vh; height: 5vh;\
				display: flex;\
				border: 0.5vh solid; border-color: red;\
				background: none;\
				font-size: 2.5vh; color: red; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_up").style = 
				"position: fixed; bottom: 16vh; right: 7vh; width: 7vh; height: 7vh;\
				display: flex;\
				border: 0.5vh solid; border-color: #6DFA0F;\
				background: none;\
				font-size: 8vh; color: #6DFA0F; justify-content: center; align-items: center; line-height: 0;";

			document.getElementById("button_play").style = 
				"position: fixed; bottom: 4vh; left: 50%; transform: translateX(-50%); width: 45vh;\
				display: block; cursor: pointer;";
		}
		}
	}

	// hide things because of pause, splash, etc
	if (cut === CUT_CUTSCENE_BLACKINTRO)
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "hidden";
		document.getElementById("credits_background").style.visibility = "hidden";
		if (mobile === true)
		{
			document.getElementById("button_left").style.visibility = "hidden";
			document.getElementById("button_right").style.visibility = "hidden";
			document.getElementById("button_down").style.visibility = "hidden";
			document.getElementById("button_up").style.visibility = "hidden";
		}
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else if (cut >= 0)
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "visible";
		document.getElementById("credits_background").style.visibility = "hidden";
		if (mobile === true)
		{
			document.getElementById("button_left").style.visibility = "visible";
			document.getElementById("button_right").style.visibility = "visible";
			document.getElementById("button_down").style.visibility = "visible";
			document.getElementById("button_up").style.visibility = "visible";
		}
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else if (cut === CUT_PAUSEMENU)
	{
		document.getElementById("button_left").style.visibility = "hidden";
		document.getElementById("button_right").style.visibility = "hidden";
		document.getElementById("button_down").style.visibility= "hidden";
		document.getElementById("button_up").style.visibility = "hidden";

		if (last_cut_before_pause === CUT_SPLASHSCREEN)
		{
			document.getElementById("dvdmenu").style.visibility = "visible";
			document.getElementById("button_pause").style.visibility = "visible";
			document.getElementById("credits_background").style.visibility = "visible";

			document.getElementById("button_play").style.visibility = "visible";
		}
		else
		{
			document.getElementById("dvdmenu").style.visibility = "visible";
			document.getElementById("button_pause").style.visibility = "visible";
			document.getElementById("credits_background").style.visibility = "visible";
			document.getElementById("button_play").style.visibility = "hidden";
		}
	}
	else if (cut === CUT_SPLASHSCREEN_WAIT)
	{
		document.getElementById("dvdmenu").style.visibility = "visible";
		document.getElementById("button_pause").style.visibility = "hidden";
		document.getElementById("credits_background").style.visibility = "hidden";
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else
	{
		document.getElementById("dvdmenu").style.visibility = "visible";
		document.getElementById("button_pause").style.visibility = "visible";
		document.getElementById("credits_background").style.visibility = "hidden";

		document.getElementById("button_play").style.visibility = "visible";
	}

	// hide things because of dialogue (and pause menu...))
	if (dialog === "" || cut < 0) { document.getElementById("dialog_background").style.visibility = "hidden"; }
	else { document.getElementById("dialog_background").style.visibility = "visible"; }

	// hide things because of cut type (%50)
	// hide things because of freeroam timescene "q" variable

	// WASD
	if (cut >= 0)
	{
		document.getElementById("button_left").style.visibility = "visible";
		document.getElementById("button_right").style.visibility = "visible";
		document.getElementById("button_down").style.visibility = "visible";
		document.getElementById("button_up").style.visibility = "visible";
	}
	else
	{
		document.getElementById("button_left").style.visibility = "hidden";
		document.getElementById("button_right").style.visibility = "hidden";
		document.getElementById("button_down").style.visibility = "hidden";
		document.getElementById("button_up").style.visibility = "hidden";
	}

	// just hide things. show them somewhere else
	document.getElementById("count_3").style.visibility = "hidden";
	document.getElementById("count_2").style.visibility = "hidden";
	document.getElementById("count_1").style.visibility = "hidden";
	document.getElementById("wrongway").style.visibility = "hidden";

	// button responsiveness
	if (key_w === true) document.getElementById("button_up").style.filter = "invert(100%)";
	else document.getElementById("button_up").style.filter = "";
	if (key_s === true) document.getElementById("button_down").style.filter = "invert(100%)";
	else document.getElementById("button_down").style.filter = "";
	if (key_a === true) document.getElementById("button_left").style.filter = "invert(100%)";
	else document.getElementById("button_left").style.filter = "";
	if (key_d === true) document.getElementById("button_right").style.filter = "invert(100%)";
	else document.getElementById("button_right").style.filter = "";
	}
}

//! updates the camera
function camera_set()
{
	if (cut < 0 || frame_counter % 10 === 0)		// for optimization
	{
	if (mobile === true) renderer.setPixelRatio(lowres*window.devicePixelRatio*0.5);
	else renderer.setPixelRatio(lowres*window.devicePixelRatio*0.5);

	if (window.innerHeight > window.innerWidth)
	{
		camera.aspect = window.innerWidth/(window.innerHeight*0.54);
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight*0.54);
	}
	else
	{
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	}

	// SPLASH SCREEN
	if (cut < 0)
	{
		camera = camera_splashscreen;

		if (splashscreen_started === false)
		{
			camera.rotation.y = Math.PI*0.75;
			splashscreen_started = true;
		}

		if (cut === CUT_SPLASHSCREEN_WAIT)
		{
		}
		else
		{
			camera.position.x = player.position.x;
			camera.position.z = player.position.z;
			camera.position.y = height_get(camera)+5;
			camera.rotation.set(0, camera.rotation.y, 0);
		}

		if (cut < CUT_SPLASHSCREEN_WAIT)
		{
			if (key_a) camera.rotation.y += 0.015;
			if (key_d) camera.rotation.y -= 0.015;
			if (key_w) camera.fov -= 1;
			if (key_s) camera.fov += 1;
		}
	}

	// FREEROAM OR RACE
	else if (cut >= 0)
	{
		camera = camera_main;

		if (minecraft !== true)
		{
		let camera_distance_from_player;
		if (mobile === true) camera_distance_from_player = 2.25;
		else camera_distance_from_player = 2.75;

		camera.rotation.x = 0;
		camera.rotation.z = 0;

		if (camera.rotation.y < (player.rotation.y+Math.PI))
		{
			if ((player.rotation.y+Math.PI)-camera.rotation.y > 0.5) camera.rotation.y += 0.03 * Math.abs(player.rotation.y+Math.PI-camera.rotation.y);
			else camera.rotation.y += 0.12 * Math.pow(Math.abs(player.rotation.y+Math.PI-camera.rotation.y), 2);
		}
		else if (camera.rotation.y > (player.rotation.y+Math.PI))
		{
			if (camera.rotation.y-(player.rotation.y+Math.PI) > 0.5) camera.rotation.y -= 0.03 * Math.abs(player.rotation.y+Math.PI-camera.rotation.y);
			else camera.rotation.y -= 0.12 * Math.pow(Math.abs(player.rotation.y+Math.PI-camera.rotation.y), 2);
		}

		// vid start
		if (frame_counter < 0) camera.rotation.y = player.rotation.y + Math.PI;

		let realrot = player.rotation.y - (2*Math.PI)*Math.floor(player.rotation.y/(2*Math.PI));

		camera_strive_x = player.position.x - camera_distance_from_player*(Math.cos(Math.PI*0.5-realrot));
		camera_strive_z = player.position.z - camera_distance_from_player*(Math.sin(Math.PI*0.5-realrot));

		let strive_dist_x = camera.position.x-camera_strive_x;
		let strive_dist_z = camera.position.z-camera_strive_z;
		if (camera.position.x-camera_strive_x < -0.01) camera.position.x -= 0.4*strive_dist_x;		// det är 0.3*strive_dist_x som gör wobblingen i kameran när man åker för snabbt!
		else if (camera.position.x-camera_strive_x > 0.01) camera.position.x -= 0.4*strive_dist_x;
		if (camera.position.z-camera_strive_z < -0.01) camera.position.z -= 0.4*strive_dist_z;
		else if (camera.position.z-camera_strive_z > 0.01) camera.position.z -= 0.4*strive_dist_z;

		if (mobile === true) camera_strive_y = player.position.y+1.6;	// tillägg EP2 för mobile!!
		else camera_strive_y = s_1008_strive+0.9;//1.6;//player.position.y+0.6;
		let strive_dist_y = camera.position.y-camera_strive_y;
		if (camera.position.y-camera_strive_y < -0.01) camera.position.y -= 0.34*strive_dist_y;	
		else if (camera.position.y-camera_strive_y > 0.01) camera.position.y -= 0.34*strive_dist_y;

		if (distance_get(camera, player) > 5) camera.position.set(camera_strive_x, camera_strive_y, camera_strive_z);
		}
		else
		{
			camera.position.x = player.position.x;
			camera.position.z = player.position.z+30;//35;
			camera.position.y = player.position.y + 20;//30;
			camera.rotation.y = 0;
			camera.rotation.z = 0;
			camera.rotation.x = -0.6;
		}
	}
}

//+ play a sound from the START!
function sound_play(fsound)
{
	fsound.currentTime = 0;
	fsound.play();
}

//+ plays mp3 file with Web Audio API
function music_play(file, fvolume, floop, fspeed)
{
	// standard values (for IE)
	if (!(fvolume >= 0)) fvolume = 1;
	if (floop !== false && floop !== true) floop = true;
	if (!(fspeed >= 0)) fspeed = 1;

	if (current_song_playing !== file)
	{
	// check if not IE
	if (window.AudioContext)
	{
		if (audiocontext !== undefined) audiocontext.suspend();

		current_song_playing = file;

		if (file !== "")
		{
			audiocontext = new AudioContext();

			let gainnode = audiocontext.createGain();

			let url = "files/" + file;
			let request = new XMLHttpRequest();
			request.open("GET", url, true);
			request.responseType = "arraybuffer";

			request.onload = function()
			{
				audiocontext.decodeAudioData(request.response, function(buffer)
				{
					source = audiocontext.createBufferSource();
					source.buffer = buffer;
					source.loop = floop;
					source.connect(audiocontext.destination);
					source.connect(gainnode);
					gainnode.connect(audiocontext.destination);
					gainnode.gain.value = fvolume;
					source.playbackRate.value = fspeed;
					source.start(0);
				});
			};

			request.send();
		}
	}
	// IE
	else
	{
		if (file !== "")
		{
			ie_music = snd(file, fvolume, floop);
		//	ie_music.currentTime = 0;
			ie_music.play();
		}
	//	else ie_music.pause();
	}
	}
}

//* talk_char() but for characters that stand still
function talk_char_still(fsprite, fpos_x, fpos_z)
{
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;

	fsprite.position.x = fpos_x;
	fsprite.position.z = fpos_z;
	fsprite.position.y = height_get(fsprite);
	fsprite.position.y = height_get(fsprite)+(fsprite.scale.x*0.25);

	// collision
//	if (distance_get(player, fsprite) < 1.5)
//	{
//		rot_speed *= -1;
//		player.position.x = lastpos_x2;
//		player.position.z = lastpos_z2;
//	}
//	else
//	{
//		lastpos_x2 = player.position.x;
//		lastpos_z2 = player.position.z;
//	}
}

//! everything related to cut value. one big part of it is a list of where all characters should be placed and move towards at certain events, and one big part is the full list of story dialogue. there's also a bit other stuff.
function cut_set()
{
	document.getElementById("snowflake").style = "position: fixed; visibility: hidden;";
	let top;

	if (cut < 0)
	{
		if (cut === CUT_SPLASHSCREEN)
		{
			// konstgjord laddningstid på en sekund, där terräng och bilder kan hinna laddas in och visas först när de är färdigladdade (förhoppningsvis!)
			if (performance.now()-splashscreen_very_starttime > 1000)
			{
				document.getElementById("loadingscreen").style.visibility = "hidden";
				document.getElementById("loadingbackground").style.visibility = "hidden";
				document.getElementsByTagName("body")[0].style.backgroundColor = "#000000";
			//	document.getElementById("vhs-filter").style.visibility = "visible";
			//	document.getElementById("vhs-filter3").style.visibility = "visible";
			}
		}
	//	else
	//	{
	//	}

		if (cut === CUT_SPLASHSCREEN_WAIT)
		{
			if (performance.now()-splashscreen_click_starttime > 1000)
			{
			//	next_cut_after_blackintro = CUT_FREEROAM_INTRO2;		// sätts i början av main.js
			//	ts_end(CUT_CUTSCENE_BLACKINTRO);
				ts_end(CUT_FREEROAM_INTRO2);
			}
			else
			{
				// DENNA KOD FORTSÄTTER I CUT_FREEROAM_INTRO2!!
				sound_carstart.play();
				top = 0.17 * (performance.now()-splashscreen_click_starttime) - 190;
				document.getElementById("snowflake").style = "position: fixed; visibility: visible; top: " + top + "vh; left: 0; width: 100vw; image-rendering: pixelated; transform: rotate(" + top + "deg);";
			}
		}
	}


	// CUTS
	else if (cut === CUT_CUTSCENE_BLACKINTRO)
	{
		// at the start of the cut
		if (cutscene_blackintro_started === false)
		{
			blackintro_frame_counter = 0;

			music_play("");
			music_what_is_playing = 1;

			cutscene_blackintro_started = true;
		}

		// during the whole cut
		blackintro_frame_counter++;

		if (blackintro_frame_counter >= 100)
		{
			player.position.y = height_get(player);
			cutscene_blackintro_started = false;
			ts_end(next_cut_after_blackintro);
		}
	}

	else if (cut === CUT_FREEROAM_INTRO2)
	{
		// at the start of the cut
		if (freeroam_intro2_started === false)
		{
			freeroam_intro2_started = true;
		}

		// FORTSÄTTNING PÅ KOD FRÅN CUT_SPLASHSCREEN_WAIT!!
		if (performance.now()-splashscreen_click_starttime < 2000)
		{
			top = 0.17 * (performance.now()-splashscreen_click_starttime) - 190;
			document.getElementById("snowflake").style = "position: fixed; visibility: visible; top: " + top + "vh; left: 0; width: 100vw; image-rendering: pixelated; transform: rotate(" + top + "deg);";
		}
	
		// during the whole cut
	}



	//;; dialog & events
	switch (cut) {
		// CUT_SPLASHSCREEN
		case -2:

		// CUT_SPLASHSCREEN_WAIT
		break; case -1:

		// CUT_PAUSEMENU
		break; case -3:

		// CUT_CUTSCENE_BLACKINTRO
		break; case 10:
		ts_start();		//KEEP!
		ts_during();		//KEEP!

		// CUT_FREEROAM_INTRO2
		break; case 2000:
		ts_start();
		ts_during();
		switch (q) {
			case 0:
			break; case 0.25:bet_pers(sprite_adele, "Welcome to my legendary snowboard camp! Let's get going!");
			//CODE: ts_end_to_room(CUT_CUTSCENE_ROOMTEST);
			break; case 0.5:dialog = "";
		}

		break; default: throw new Error();//ts_end(cut+50);
	}
}
