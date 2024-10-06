// input.js
// user input
// kbrecordzz 2024

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

var terr = [ "phaser_tjorn_berg.jpg", "phaser_tjorn.jpg", "phaser_tjorn_red.jpg", "phaser_tjorn_green.jpg", "tjorn_aker.jpg", "tjorn_aker2.jpg", "tjorn_skog1.jpg", "tjorn_skog2.jpg", "tjorn_skog3.jpg", "tjorn_skogmedaker.jpg", "tjorn_helaker.jpg" ];
var tw = 0;
var trre = [ "newtree.png", "tree_tjorn.png", "tree_norway.png", "hongtree.png", "greenpine.png" ];
var twr = 0;
var thhe = [ "polish_house_2.jpg", "skyscraper1.jpg", "20230627_115817.png", "swedishwall.png", "ind1.png", "house_municipality.png", "cd2.jpg", "castle_house2.jpg" ];
var twh = 0;

var cti = 1001;

// abstraction
function mouse_event()
{
	if (event.target === document.getElementById("button_up"))
	{
		key_w = true;
		navigator.vibrate(40);
		if (minecraft === true) player.position.z -= 1;
	}
	else if (event.target === document.getElementById("button_down"))
	{
		key_s = true;
		navigator.vibrate(40);
		if (minecraft === true) player.position.z += 1;
	}
	else if (event.target === document.getElementById("button_left"))
	{
		key_a = true;
		navigator.vibrate(40);
		if (minecraft === true) player.position.x -= 1;
	}
	else if (event.target === document.getElementById("button_right"))
	{
		key_d = true;
		navigator.vibrate(40);
		if (minecraft === true) player.position.x += 1;
	}
	// DEBUG - kopia av det i keyboard!!
	else if (event.target === document.getElementById("d_house"))
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		minecraft_o = minecraft_o + "<br>if (fi1 === " + ci1 + " && fj1 === " + cj1 + ") om[" + ci1 + "][" + cj1 + "][" + sx + "][" + sz + "] = ASCEND_HOUSE;";

		let tmpbox = box("prisonwall.jpg", 1,1);
		tmpbox.position.set(Math.floor(player.position.x), height_get_xz(Math.floor(player.position.x),Math.floor(player.position.z))+0.5, Math.floor(player.position.z));
		tmpbox.rotation.y = 0;
		tmpbox.visible = true;
	}
	else if (event.target === document.getElementById("d_zero"))
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		if (sx < 4) sx = 2;
		if (sx > 45) sx = 47;
		if (sz < 4) sz = 2;
		if (sz > 45) sz = 47;
		minecraft_o = minecraft_o + "<br>if (fi1 === " + ci1 + " && fj1 === " + cj1 + ") { for (let fi = " + (sx-1) + "; fi <= " + (sx+1) + "; fi++) { for (let fj = " + (sz-1) + "; fj <= " + (sz+1) + "; fj++) { om[" + ci1 + "][" + cj1 + "][fi][fj] = 0; } } }";
	}
	else if (event.target === document.getElementById("d_htree"))
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		if (Math.random() > 0.3) minecraft_o = minecraft_o + "<br>if (fi1 === " + ci1 + " && fj1 === " + cj1 + ") om[" + ci1 + "][" + cj1 + "][" + sx + "][" + sz + "] = ASCEND_TREE;";
		else minecraft_o = minecraft_o + "<br>if (fi1 === " + ci1 + " && fj1 === " + cj1 + ") om[" + ci1 + "][" + cj1 + "][" + sx + "][" + sz + "] = ASCEND_BUSH;";

		let tmpspr = spr("greenpine.png", 2);
		tmpspr.position.set(Math.floor(player.position.x), height_get_xz(Math.floor(player.position.x),Math.floor(player.position.z))+0.8, Math.floor(player.position.z));
		tmpspr.rotation.y = 0;
		tmpspr.visible = true;
	}
	else if (event.target === document.getElementById("d_getheight"))
	{
		mh = height_get(player);
	}
	else if (event.target === document.getElementById("d_putheight"))
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		if (sx < 2) sx = 2;
		if (sx > 47) sx = 47;
		if (sz < 2) sz = 2;
		if (sz > 47) sz = 47;
		minecraft_o = minecraft_o + "<br>if (fi1 === " + ci1 + " && fj1 === " + cj1 + ") { for (let fi = " + (sx-1) + "; fi <= " + (sx+1) + "; fi++) { for (let fj = " + (sz-1) + "; fj <= " + (sz+1) + "; fj++) { hm[" + ci1 + "][" + cj1 + "][fi][fj] = " + (mh-0.3).toFixed(1) + "; } } }";
	}
	else if (event.target === document.getElementById("d_putheight2"))
	{
		let sx = Math.floor(x_to_x_in_chunk(player.position.x));
		let sz = Math.floor(x_to_x_in_chunk(player.position.z));
		if (sx < 4) sx = 4;
		if (sx > 45) sx = 45;
		if (sz < 4) sz = 4;
		if (sz > 45) sz = 45;
		minecraft_o = minecraft_o + "<br>if (fi1 === " + ci1 + " && fj1 === " + cj1 + ") { for (let fi = " + (sx-3) + "; fi <= " + (sx+3) + "; fi++) { for (let fj = " + (sz-3) + "; fj <= " + (sz+3) + "; fj++) { hm[" + ci1 + "][" + cj1 + "][fi][fj] = " + (mh-0.3).toFixed(1) + "; } } }";
	}
	else if (event.target === document.getElementById("d_ground"))
	{
		tw++;
		if (tw > 10) tw = 0;
		let materialx = tex(terr[tw]);
		mesh_terrain[ci1][cj1].material = materialx;

		minecraft_o = "else :::" + ci1 + "," + cj1 + "<br>\t{<br>\t\tmat_terrain = tex(\"" + terr[tw] + "\");<br>\t}";
	}
	else if (event.target === document.getElementById("d_trees"))
	{
		twr++;
		if (twr > 4) twr = 0;
		let materialx = psp(trre[twr], 4.5);
		pointsprites_trees[ci1][cj1].material = materialx;

		minecraft_o = "else :::" + ci1 + "," + cj1 + "<br>\t{<br>\t\tmat_trees = psp(\"" + trre[twr] + "\", 4.5);<br>\t}";
	}
	else if (event.target === document.getElementById("d_chouses"))
	{
		twh++;
		if (twh > 7) twh = 0;
		let materialx = tex(thhe[twh]);
		mesh_houses[ci1][cj1].material = materialx;

		minecraft_o = "else :::" + ci1 + "," + cj1 + "<br>\t{<br>\t\tmat_houses = tex(\"" + thhe[twh] + "\");<br>\t}";
	}
	else if (event.target === document.getElementById("d_character"))
	{
		minecraft_o = "\nif (ci1 >= " + ci1 + "-1 && ci1 <= " + ci1 + "+1 && cj1 >= " + cj1 + "-1 && cj1 <= " + cj1 + "+1) talk_char(s_" + cti + ", " + player.position.x.toFixed(1) + ", " + player.position.z.toFixed(1) + ", CUT_CUTSCENE_TALK_" + cti + "); else s_" + cti + ".visible = false;";
		minecraft_o = minecraft_o + "<br><br>if (ci1 >= " + ci1 + "-1 && ci1 <= " + ci1 + "+1 && cj1 >= " + cj1 + "-1 && cj1 <= " + cj1 + "+1) { place_sprite_noidle(s_" + cti + ", " + player.position.x.toFixed(1) + ", " + player.position.z.toFixed(1) + "); s_" + cti + ".visible = true; } else { s_" + cti + ".visible = false; }";
		cti++;
	}
	else if (event.target === document.getElementById("d_plus"))
	{
		cti += 10;
	}
	else if (event.target === document.getElementById("d_position"))
	{
		if (stringx === "") stringx = Math.floor(player.position.x);
		else stringx = stringx + ", " + Math.floor(player.position.x);
		if (stringz === "") stringz = Math.floor(player.position.z);
		else stringz = stringz + ", " + Math.floor(player.position.z);
		document.getElementById("minecraft_output").innerHTML = "x_array = [ " + stringx + " ];<br>z_array = [ " + stringz + " ];<br>" + ci1 + "," + cj1;// + "<br>height: " + height_get(player);
	}
	else if (event.target === document.getElementById("d_minecraft"))
	{
		if (minecraft === false) minecraft = true;
		else if (minecraft === true) minecraft = false;
	}
	else if (event.target === document.getElementById("d_code"))
	{
		document.getElementById("minecraft_output").innerHTML = minecraft_o;
		minecraft_o = "";
		stringx = "";
		stringz = "";
	}
	//
	else
	{
		// DEBUG
		game_speed = 1;
	}
}

// abstraction
function mouseup_event()
{
	if (event.target === document.getElementById("button_play"))
	{
		// samma som i ENTER/SPACE!!
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

	if (minecraft === true)
	{
		if (event.which === 87 || event.which === 38) player.position.z -= 1;
		if (event.which === 83 || event.which === 40) player.position.z += 1;
		if (event.which === 65 || event.which === 37) player.position.x -= 1;
		if (event.which === 68 || event.which === 39) player.position.x += 1;
	}

	if (event.which === 32 || event.which === 13)
	{
		// samma som i mouse på buttons!!
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

		event.preventDefault();		// prevent scrolling down with SPACE/ENTER

		mouseclick = true;
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

	if (eventlock === "touch") { mouse_event(); }
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
//window.addEventListener("contextmenu", function (e)
//{
//	if (cut !== CUT_PAUSEMENU) e.preventDefault();
//}, false);
