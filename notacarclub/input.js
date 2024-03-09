// input.js
// user input
// kbrecordzz 2023

"use strict";

var key_w = false;
var key_s = false;
var key_a = false;
var key_d = false;

var mouseclick = false;

var eventlock = "";		// for deciding if mouse or touch should be used (only ONE of them!)

// DEBUG
var key_i = false;
var key_o = false;
var stringx = "";
var stringz = "";
var mh;

// abstraction
function mouse_event()
{
	if (event.target === document.getElementById("button_up"))
	{
		key_w = true;
	}
	else if (event.target === document.getElementById("button_down"))
	{
		key_s = true;
	}
	else if (event.target === document.getElementById("button_left"))
	{
		key_a = true;
	}
	else if (event.target === document.getElementById("button_right"))
	{
		key_d = true;
	}
	else if (dialog2 !== "" && (event.target === document.getElementById("dialog_text") || event.target === document.getElementById("dialog_background") || event.target === document.getElementById("dialog_head") || event.target === document.getElementById("dialog_name") || event.target === document.getElementById("click")))
	{
		shelfanswer = 0;
		if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE !== 0 && cut !== CUT_CUTSCENE_BLACKINTRO)
		{
			cut++;
			sound_play(sound_click);
		}
	}
	else if (dialog2 !== "" && (event.target === document.getElementById("dialog_text2") || event.target === document.getElementById("dialog_background2") || event.target === document.getElementById("dialog_head2") || event.target === document.getElementById("dialog_name2") || event.target === document.getElementById("click2")))
	{
		shelfanswer = 1;
		if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE !== 0 && cut !== CUT_CUTSCENE_BLACKINTRO)
		{
			cut++;
			sound_play(sound_click);
		}
	}
	else if (dialog3 !== "" && (event.target === document.getElementById("dialog_text3") || event.target === document.getElementById("dialog_background3") || event.target === document.getElementById("dialog_head3") || event.target === document.getElementById("dialog_name3") || event.target === document.getElementById("click3")))
	{
		shelfanswer = 2;
		if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE !== 0 && cut !== CUT_CUTSCENE_BLACKINTRO)
		{
			cut++;
			sound_play(sound_click);
		}
	}
	else
	{
		// MOUSE mouseclick_action
		if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE !== 0 && cut !== CUT_CUTSCENE_BLACKINTRO && dialog2 === "")
		{
			cut++;
			sound_play(sound_click);
		}
		if (interact_timer <= 0) mouseclick = true;

		if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cz_turned_on[CAR_DISONESTY] === 1 && shot_timer <= 60)
		{
			let whichf = -1;
			for (let t = 0; t < 3; t++)
			{
				if (fayah_timer[t] <= 0) whichf = t;
			}
			if (whichf !== -1)
			{
				fayah_timer[whichf] = 60;
				sound_play(sound_gun);
				sprite_fayah[whichf].position.set(player.position.x, player.position.y+0.5, player.position.z);
				sprite_fayah[whichf].rotation.y = player.rotation.y;
			}
		}

		// DEBUG
		game_speed = 1;
	}
}

// abstraction
function mouseup_event()
{
	if (event.target === document.getElementById("button_play") || event.target === document.getElementById("button_continue"))
	{
		if (cut === CUT_SPLASHSCREEN)
		{
			splashscreen_click_starttime = performance.now();
			cut = CUT_SPLASHSCREEN_WAIT;
		}
		else if (cut === CUT_PAUSEMENU)
		{
			if (last_cut_before_pause === CUT_SPLASHSCREEN)
			{
				splashscreen_click_starttime = performance.now();
				cut = CUT_SPLASHSCREEN_WAIT;
			}
			else
			{
				cut = last_cut_before_pause;

				sound_pause.currentTime = 0;
				sound_pause.play();
			}
		}
	}
	else if (event.target === document.getElementById("button_fullscreen"))
	{
		let elem = document.documentElement;

		if (elem.requestFullscreen) elem.requestFullscreen();
		else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
		else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
		else if (mozRequestFullScreen) elem.mozRequestFullScreen();

		if (document.exitFullscreen) document.exitFullscreen();
		else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
		else if (document.msExitFullscreen) document.msExitFullscreen();
		else if (mozExitFullScreen) elem.mozExitFullScreen();
	}
	else if (event.target === document.getElementById("button_pause"))
	{
		if (cut !== CUT_PAUSEMENU) { last_cut_before_pause = cut; cut = CUT_PAUSEMENU; }
		else cut = last_cut_before_pause;

		sound_play(sound_pause);
	}
	else if (event.target === document.getElementById("dvdmenu_1"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1583;
		player.position.z = 1798;
		player.rotation.y = 0.37;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(32+u,36+v);
			}
		}
		next_cut_after_blackintro = CUT_CUTSCENE_WAKEUP;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_2"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1802;
		player.position.z = 1690;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(36+u,34+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_EPPER;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_3"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = freeroam_magnetday_position_x;
		player.position.z = freeroam_magnetday_position_z;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(30+u,29+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_MAGNETDAY;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_4"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1888;
		player.position.z = 1924;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(38+u,39+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_DGCHILL;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_5"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1682;
		player.position.z = 1841;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(34+u,37+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_4;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_6"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1678;
		player.position.z = 1818;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(34+u,37+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_GOINGHOME;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_7"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = carclub_position_x+2;
		player.position.z = carclub_position_z+4;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(34+u,37+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_KILLEPPER;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_8"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1843+4;
		player.position.z = 1402;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(37+u,28+v);
			}
		}
		next_cut_after_blackintro = CUT_FREEROAM_MAGNETFACTORY;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("dvdmenu_9"))
	{
		bet_started = false;
		pause_all_cz_sounds();
		dialog = "";
		dialog2 = "";
		dialog3 = "";
		document.getElementById("area").innerHTML = "";

		player.position.x = 1843+4;
		player.position.z = 1402;
		for (let u = -2; u <= 2; u++)
		{
			for (let v = -2; v <= 2; v++)
			{
				create_one(37+u,28+v);
			}
		}
		next_cut_after_blackintro = CUT_CUTSCENE_BLOOPERS;
		cut = CUT_CUTSCENE_BLACKINTRO;
	}
	else if (event.target === document.getElementById("button_up"))
	{
		key_w = false;
	}
	else if (event.target === document.getElementById("button_down"))
	{
		key_s = false;
	}
	else if (event.target === document.getElementById("button_left"))
	{
		key_a = false;
	}
	else if (event.target === document.getElementById("button_right"))
	{
		key_d = false;
	}
	else
	{
		mouseclick = false;		// MOUSE mouseup action
	}
}

function onDocumentKeyDown(event)
{
	// DEBUG
	if (event.which === 73) key_i = true;
	else if (key_i === true && event.which === 79) key_o = true;
	else if (key_o === true && event.which === 80) game_speed *= 2;
	else { key_i = false; key_o = false; }

	if (event.which === 85) game_speed = 1;

	// WASD
	if (event.which === 87 || event.which === 38) { key_w = true; event.preventDefault(); }		// prevent scrolling with arrow keys
	if (event.which === 83 || event.which === 40) { key_s = true; event.preventDefault(); }
	if (event.which === 65 || event.which === 37) { key_a = true; event.preventDefault(); }
	if (event.which === 68 || event.which === 39) { key_d = true; event.preventDefault(); }

	if (event.which === 32 || event.which === 13)
	{
		event.preventDefault();		// prevent scrolling down with SPACE/ENTER

		// SPACE/ENTER mouseclick_action - ska vara samma som mus!!
		if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE !== 0 && cut !== CUT_CUTSCENE_BLACKINTRO && dialog2 === "")
		{
			cut++;
			sound_play(sound_click);
		}
		if (interact_timer <= 0) mouseclick = true;

		if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cz_turned_on[CAR_DISONESTY] === 1 && shot_timer <= 60)
		{
			let whichf = -1;
			for (let t = 0; t < 3; t++)
			{
				if (fayah_timer[t] <= 0) whichf = t;
			}
			if (whichf !== -1)
			{
				fayah_timer[whichf] = 60;
				sound_play(sound_gun);
				sprite_fayah[whichf].position.set(player.position.x, player.position.y+0.5, player.position.z);
				sprite_fayah[whichf].rotation.y = player.rotation.y;
			}
		}
	}

	// numbers
	if (event.which === 49) { if (shelf_flames.visible === false) shelf_flames.visible = true; else shelf_flames.visible = false; }
	if (event.which === 50) { if (shelf_epa.visible === false) shelf_epa.visible = true; else shelf_epa.visible = false; }
	if (event.which === 51) { if (shelf_racing.visible === false) shelf_racing.visible = true; else shelf_racing.visible = false; }
	if (event.which === 52) { if (shelf_pipe.visible === false) shelf_pipe.visible = true; else shelf_pipe.visible = false; }
	if (event.which === 53) { if (shelf_beard.visible === false) shelf_beard.visible = true; else shelf_beard.visible = false; }

	// DEBUG
	if (event.which === 77)		// M
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		if (sx < 1) sx = 1;
		if (sx > 48) sx = 48;
		if (sz < 1) sz = 1;
		if (sz > 48) sz = 48;
		minecraft_o = minecraft_o + "\nif (fi1 === " + ci1 + " && fj1 === " + cj1 + ") { for (let fi = " + (sx-1) + "; fi <= " + (sx+1) + "; fi++) { for (let fj = " + (sz-1) + "; fj <= " + (sz+1) + "; fj++) { hm[" + ci1 + "][" + cj1 + "][fi][fj] = " + (mh-0.3).toFixed(1) + "; } } }";
	}
	if (event.which === 78)		// N
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		if (sx < 3) sx = 3;
		if (sx > 46) sx = 46;
		if (sz < 3) sz = 3;
		if (sz > 46) sz = 46;
		minecraft_o = minecraft_o + "\nif (fi1 === " + ci1 + " && fj1 === " + cj1 + ") { for (let fi = " + (sx-3) + "; fi <= " + (sx+3) + "; fi++) { for (let fj = " + (sz-3) + "; fj <= " + (sz+3) + "; fj++) { hm[" + ci1 + "][" + cj1 + "][fi][fj] = " + (mh-0.3).toFixed(1) + "; } } }";
	}
	if (event.which === 66)		// B
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		minecraft_o = minecraft_o + "\nif (fi1 === " + ci1 + " && fj1 === " + cj1 + ") om[" + ci1 + "][" + cj1 + "][" + sx + "][" + sz + "] = ASCEND_HOUSE;";
	}
	if (event.which === 86)		// V
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		minecraft_o = minecraft_o + "\nif (fi1 === " + ci1 + " && fj1 === " + cj1 + ") om[" + ci1 + "][" + cj1 + "][" + sx + "][" + sz + "] = ASCEND_SKYSCRAPER;";
	}
	if (event.which === 90)		// Z
	{
		mh = height_get(player);
	}
	if (event.which === 81)		// Q
	{
		console.log(minecraft_o);
		minecraft_o = "";
	}

	if (event.which === 88)		// X
	{
		if (stringx === "") stringx = Math.floor(player.position.x);
		else stringx = stringx + ", " + Math.floor(player.position.x);
		if (stringz === "") stringz = Math.floor(player.position.z);
		else stringz = stringz + ", " + Math.floor(player.position.z);
		console.log("x_array = [ " + stringx + " ];");
		console.log("z_array = [ " + stringz + " ];");
	}

	if (event.which === 71)		// G
	{
	//	ts_end(cut+100);
	}

	if (event.which === 72)		// H
	{
		window.alert("HELLO.THIS.IS.THE.DOGERT.ERROR. SO.SORRY.FOR.BEING.THAT.GUY.BUT. PLEASE.DONT.PRESS.H.BECAUSE.IT.REMINDS.ME.OF.HÅRASS. /DOGERT");
	}
};
document.addEventListener("keydown", onDocumentKeyDown);

function onDocumentKeyUp(event)
{
	if (event.which === 87 || event.which === 38) key_w = false;
	if (event.which === 83 || event.which === 40) key_s = false;
	if (event.which === 65 || event.which === 37) key_a = false;
	if (event.which === 68 || event.which === 39) key_d = false;

	if (event.which === 32 || event.which === 13) mouseclick = false;		// SPACE/ENTER mouseup action
};
document.addEventListener("keyup", onDocumentKeyUp);

function touch_start(e)
{
	if (eventlock === "") eventlock = "touch";

	if (eventlock === "touch") mouse_event();
}
document.addEventListener("touchstart", touch_start);

function touch_end(e)
{
	if (eventlock === "touch") mouseup_event();
}
document.addEventListener("touchend", touch_end);

function mouseDown(event)
{
	if (eventlock === "") eventlock = "mouse";

	if (eventlock === "mouse") mouse_event();
}
document.addEventListener("mousedown", mouseDown);

function mouseUp(event)
{
	if (eventlock === "mouse") mouseup_event();
}
document.addEventListener("mouseup", mouseUp);

// disable left button menu
window.addEventListener("contextmenu", function (e)
{
	if (cut !== CUT_PAUSEMENU) e.preventDefault();
}, false);
