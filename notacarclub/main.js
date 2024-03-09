// main.js
// the main game loop
// kbrecordzz 2023

// läs igenom hela story-dialogen från början till slut på EPISODE 1!! leta efter plotholes och få det rimligt, ladda in hela storyn i huvudet i ett svep, utan att stoppa

// gör race ceremony: http://kissobajs.se/g87jklaaaamn2/f/files/coollogo_com-230432517.png, http://kissobajs.se/g87jklaaaamn2/f/files/coollogo_com-155074877.png

// invert på UI inte på mobilen!!

// karaktärerna måste synas bättre när de inte har cylinder. på något sätt!! byt till en större sprite som är samma sprite fast med en grön grej ovanför, som ett bra mellanting som inte ökar drawcalls?

// paus-menyn!!

// antingen, ta bort allas cookies, eller gör en tydlig knapp "START FROM THE BEGINNING". för nu är det EPISODE 1!!

// testa allting på mobil främst!!

// korrekt teckenkodning!! jag tror alla Hårass är utbytta nu. å måste skrivas på ett speciellt sätt. stora Å också. inga ä och ö tror jag för det är på engelska... Ã¥

// gör ny world map!!

// lägg in NPCs i 'epper land

"use strict";

// copy from CUT_SPLASHSCREEN:
// this must be put at the start, in case the player pauses and uses the "save and continue" link before doing anything else
// get cut from URL
// add functionality for IE?!! i have that for x and z!
let cookie_cut = parseInt(params.cut);
if (cookie_cut >= 0)
{
	startcut = cookie_cut;
}
// get cut from cookies
else if (document.cookie.search("cookie_cut=") !== -1)
{
	let kaka_cut1 = document.cookie.split("cookie_cut=");
	let kaka_cut2 = kaka_cut1[1].split(";");
	startcut = parseInt(kaka_cut2[0]);
}
// cut if the first time playing
else
{
	startcut = CUT_CUTSCENE_WAKEUP;
}

if (startcut === 0) throw new Error();
document.getElementById("save_text").href = "?x=" + start_chunk_x + "&z=" + start_chunk_z + "&cut=" + startcut;

// LOCKED 231012:
ascend_intro(0.6511030308479817);

document.getElementById("loadingscreen").style.visibility = "hidden";
document.getElementsByTagName("body")[0].style.backgroundColor = "#000000";
document.getElementById("vhs-filter").style.visibility = "visible";

frame_counter = FRAMES_PER_HOUR*9;	// start game in the morning

const url = new URL(location.protocol + "\/\/" + location.host + location.pathname);
history.pushState({}, "", url);

// LOCKED 231007:
if (start_x[start_chunk_x][start_chunk_z] > 0)
{
	player.position.x = start_x[start_chunk_x][start_chunk_z];
	player.position.z = start_z[start_chunk_x][start_chunk_z];
}
// this shouldn't happen
else
{
	player.position.x = start_chunk_x*49+25;
	player.position.z = start_chunk_z*49+25;
//	throw new Error();
}
player.rotation.y = 0;

looking_at_object = player;

cut = CUT_SPLASHSCREEN;

// LOCKED 231012:
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = false;	// ej klockren!
else mobile = true;

let lowres = 1;
let lowres_count = 0;

var lastframe;
// main game loop
function main()
{
	// LOCKED 231012:
	let frame_start = performance.now();

	// LOCKED 231012:
	ci1 = Math.floor((player.position.x)/49);
	cj1 = Math.floor((player.position.z)/49);

	// DEBUG chaos monkey
	if (1 === 0) {
	if (chaosmode === 0)
	{
		game_speed = 2;
		if (Math.random() > 0.5) key_w = true;
		if (Math.random() > 0.999) key_w = false;
		if (Math.random() > 0.9) key_a = true;
		if (Math.random() > 0.99) key_a = false;
		if (Math.random() > 0.9) key_d = true;
		if (Math.random() > 0.99) key_d = false;
		if (Math.random() > 0.999) key_s = true;
		if (Math.random() > 0.9) key_s = false;
		if (Math.random() > 0.99) mouseclick = true; else mouseclick = false;
		if (cut % MODULUS_FREEROAM_ONLY === 0 && Math.random() > 0.9995) ts_end(cut+100);
		if (Math.random() > 0.999) q += 2;
		if (Math.random() > 0.9998) player.position.x += 50;
		if (Math.random() > 0.9998) player.position.x -= 50;
		if (Math.random() > 0.9998) player.position.z += 50;
		if (Math.random() > 0.9998) player.position.z -= 50;
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (cz_turned_on[t] === 1)
			{
				if (distance_get(player, cz[t]) > 50) player.position.set(cz[t].position.x, 0, cz[t].position.z);
				if (distance_get(player, cz[t]) > 3) player.rotation.y = lookat_datass(player, cz[t]);
			}
		}
		if (cut % MODULUS_FREEROAM_OR_RACE !== 0 && Math.random() > 0.9) cut++;
		if (shelfanswer === 0) shelfanswer = 1; else shelfanswer = 0;
		if (Math.random() > 0.999) chaosmode = 1;
	}
	else if (chaosmode === 1)
	{
		game_speed = 2;
		if (Math.random() > 0.7) key_w = true;
		if (Math.random() > 0.9) key_w = false;
		if (Math.random() > 0.8) key_a = true;
		if (Math.random() > 0.99) key_a = false;
		if (Math.random() > 0.8) key_d = true;
		if (Math.random() > 0.99) key_d = false;
		if (Math.random() > 0.999) key_s = true;
		if (Math.random() > 0.9) key_s = false;
		if (Math.random() > 0.99) mouseclick = true; else mouseclick = false;
		if (cut % MODULUS_FREEROAM_ONLY === 0 && Math.random() > 0.9995) ts_end(cut+100);
		if (Math.random() > 0.9997) q += 4;
		if (Math.random() > 0.9998) player.position.x += 50;
		if (Math.random() > 0.9998) player.position.x -= 50;
		if (Math.random() > 0.9998) player.position.z += 50;
		if (Math.random() > 0.9998) player.position.z -= 50;
		if (cut % MODULUS_FREEROAM_OR_RACE !== 0 && Math.random() > 0.9) cut++;
		if (Math.random() > 0.999) chaosmode = 0;
	}
	// testa kor riktigt fort for att testa terrang-skapandet
	}

	// override in cut_set() if you want to change:
	camera_cutscene.fov = 60;
	lookheight = 0;
	move_player = false;
	speedchange = 1;
	from_x = 0;
	from_z = 0;
	hide_cut_sprites();

	// miner
	sprite_adele_surprised.visible = false;
	sprite_adele_silent.visible = false;
	sprite_adele_laughing.visible = false;
	sprite_adele_nice.visible = false;
	sprite_dg_right.visible = false;
	sprite_dg_sad.visible = false;
	sprite_dg_communism.visible = false;
	sprite_daddy_confused.visible = false;
	sprite_daddy_happy.visible = false;
	sprite_daddy_blue.visible = false;
	sprite_daddy_anime.visible = false;
	sprite_omalley_blue.visible = false;
	sprite_omalley_yellow.visible = false;
	sprite_omalley_pink.visible = false;
	sprite_omalley_italy.visible = false;

	sprite_ui_mouseclick.position.set(player.position.x, shelf.position.y+1.3, player.position.z);
	sprite_ui_mouseclick.visible = false;
	sprite_iloveyou.position.set(player.position.x, shelf.position.y+0.8, player.position.z);
	sprite_iloveyou.visible = false;

	// automatic rescue UI. rest is in functions.js
	if (frame_counter % (60*20) === 0) drown_count = 0;
	if (drown_count >= 5)
	{
		sprite_ui_mouseclick.visible = true;
		if (mouseclick === true)
		{
			drown_count = 0;

			// denna skulle i praktiken kunna släppa spelaren mitt i havet när den ska rädda en från drunkning...!!
			if (start_x[ci1][cj1] > 0)
			{
				player.position.x = start_x[ci1][cj1];
				player.position.z = start_z[ci1][cj1];
			}
			else
			{
				player.position.x = ci1*49+25;
				player.position.z = cj1*49+25;
			}
		}
	}

	// out of bounds
	if (player.position.x <= 26*49) { player.position.x = 26*49; sound_error.play(); }
	if (player.position.x >= 41*49+49) { player.position.x = 41*49+49; sound_error.play(); }
	if (player.position.z <= 26*49) { player.position.z = 26*49; sound_error.play(); }
	if (player.position.z >= 41*49+49) { player.position.z = 41*49+49; sound_error.play(); }

	if (player.position.x < 26*49 || player.position.z < 26*49 || player.position.x > 42*49 || player.position.z > 42*49) throw new Error("player is outside of world, position: " + player.position.x + " " + player.position.z);

	layout_set();
	if (cut % MODULUS_FREEROAM_OR_RACE === 0) chunk_set();
	cut_set();
	if (cut % MODULUS_FREEROAM_OR_RACE === 0) { for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { if (cz_goal_x[t] <= 0 || cz_goal_z[t] <= 0) throw new Error("goal for character " + t + " is <= 0"); } } }
	camera_set();
	ascend_main();
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		if (cut >= CUT_FREEROAM_MAGNETFACTORY_4) { light.intensity = 1.3; light.color = new THREE.Color(0xA3F778); } else { light_set(); }
	}
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		if (cut >= CUT_FREEROAM_MAGNETFACTORY_4) scene.fog.far = 9999999; else fog_set();
	}

	// miner - de måste vara här, om de är i cut_set() så sätts inte höjden rätt!
	sprite_adele_surprised.position.set(sprite[CAR_ADELE].position.x, sprite[CAR_ADELE].position.y, sprite[CAR_ADELE].position.z);
	sprite_adele_silent.position.set(sprite[CAR_ADELE].position.x, sprite[CAR_ADELE].position.y, sprite[CAR_ADELE].position.z);
	sprite_adele_laughing.position.set(sprite[CAR_ADELE].position.x, sprite[CAR_ADELE].position.y, sprite[CAR_ADELE].position.z);
	sprite_adele_nice.position.set(sprite[CAR_ADELE].position.x, sprite[CAR_ADELE].position.y, sprite[CAR_ADELE].position.z);
	sprite_dg_right.position.set(sprite[CAR_DARK_GANDALF].position.x, sprite[CAR_DARK_GANDALF].position.y, sprite[CAR_DARK_GANDALF].position.z);
	sprite_dg_sad.position.set(sprite[CAR_DARK_GANDALF].position.x, sprite[CAR_DARK_GANDALF].position.y, sprite[CAR_DARK_GANDALF].position.z);
	sprite_dg_communism.position.set(sprite[CAR_DARK_GANDALF].position.x, sprite[CAR_DARK_GANDALF].position.y, sprite[CAR_DARK_GANDALF].position.z);
	sprite_daddy_confused.position.set(sprite[CAR_DADDY].position.x, sprite[CAR_DADDY].position.y, sprite[CAR_DADDY].position.z);
	sprite_daddy_happy.position.set(sprite[CAR_DADDY].position.x, sprite[CAR_DADDY].position.y, sprite[CAR_DADDY].position.z);
	sprite_daddy_blue.position.set(sprite[CAR_DADDY].position.x, sprite[CAR_DADDY].position.y, sprite[CAR_DADDY].position.z);
	sprite_daddy_anime.position.set(sprite[CAR_DADDY].position.x, sprite[CAR_DADDY].position.y, sprite[CAR_DADDY].position.z);
	sprite_omalley_blue.position.set(sprite[CAR_OMALLEY].position.x, sprite[CAR_OMALLEY].position.y, sprite[CAR_OMALLEY].position.z);
	sprite_omalley_yellow.position.set(sprite[CAR_OMALLEY].position.x, sprite[CAR_OMALLEY].position.y, sprite[CAR_OMALLEY].position.z);
	sprite_omalley_pink.position.set(sprite[CAR_OMALLEY].position.x, sprite[CAR_OMALLEY].position.y, sprite[CAR_OMALLEY].position.z);
	sprite_omalley_italy.position.set(sprite[CAR_OMALLEY].position.x, sprite[CAR_OMALLEY].position.y, sprite[CAR_OMALLEY].position.z);

	room.position.set(player.position.x, 100, player.position.z);

	if (cut !== CUT_PAUSEMENU) { last_cut_before_pause = cut; }		// finns ocksa i input.js!

	// save progress
	if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE === 0 && cut !== CUT_FREEROAM_INTRO && cut !== CUT_FREEROAM_1B && cut !== CUT_FREEROAM_1C && cut !== CUT_FREEROAM_1D && cut !== CUT_FREEROAM_1E && cut !== CUT_FREEROAM_1F && cut !== CUT_FREEROAM_CARCHASE2 && cut !== CUT_FREEROAM_CARCHASE3 && cut !== CUT_FREEROAM_CARCHASE4 && cut !== CUT_FREEROAM_LICENSE_2 && cut !== CUT_FREEROAM_LICENSE_3 && cut !== CUT_FREEROAM_LICENSE_4 && cut !== CUT_FREEROAM_LICENSE_5)
	{
		if (ci1 >= 26 && ci1 <= 41 && cj1 >= 26 && cj1 <= 41)
		{
			if (frame_counter % 30 === 0)	document.cookie = "cookie_cut=" + cut + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";

			// lagg in vilka chunks man inte kan spara vid!
			if (start_x[ci1][cj1] > 0)
			{
				if (frame_counter % 30 === 5)	document.cookie = "cookie_x=" + ci1 + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
				if (frame_counter % 30 === 10)	document.cookie = "cookie_z=" + cj1 + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
			}

			if (last_cut_before_pause === 0) throw new Error();
			if (frame_counter % 30 === 20) document.getElementById("save_text").href = "?x=" + ci1 + "&z=" + cj1 + "&cut=" + last_cut_before_pause;
		}
	}

	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		last_cut_before_talk = cut;

		cars_control();
		cars_physics();
		if (frame_counter % 5 === 0) cars_sound();
	}
	else
	{
		// stop car sound in cutscenes
		sound_car.pause();
		sound_car_is_playing = false;
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			sound_cz_car[t].pause();
			sound_cz_car_is_playing = false;
		}
		sound_grass.pause();
		sound_water.pause();
	}
	if (cut % MODULUS_FREEROAM_ONLY === 0) last_cut_before_race = cut;

	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cz_turned_on[CAR_DISONESTY] === 1)
	{
		gameplay_fps();	
	}
	else
	{
		// resets things that get changed in gameplay_fps()
		cz[CAR_DISONESTY].material.color.setHex(0xFFFFFF);
		shelf.material.color.setHex(0xFFFFFF);
		bak_shelf.material.color.setHex(0xFFFFFF);
		sprite_shelf_epper.material.color.setHex(0xFFFFFF);
	}

	if (lastcut % MODULUS_FREEROAM_OR_RACE !== 0 && cut % MODULUS_FREEROAM_OR_RACE === 0) interact_timer = 60;
	if (interact_timer > 0) { sprite_ui_mouseclick.visible = false; interact_timer--; }

	if (collision_timer > 0) collision_timer--;
	if (cz_collision_timer > 0) cz_collision_timer--;

	if (turbo_timer > 0) turbo_timer--;
	for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turbo_timer[t]--;

	if (areatext_timer > 0)
	{
		areatext_timer--;
		document.getElementById("area").style.visibility = "visible";

		if (areatext_timer > 200) document.getElementById("area").style.opacity = 1-0.01*(areatext_timer-200);
		if (areatext_timer < 100) document.getElementById("area").style.opacity = 0.01*(areatext_timer-100);
 	}
	else 
	{
		document.getElementById("area").style.visibility = "hidden";
	}

	if (washingmachine_timer > 0) washingmachine_timer--;
	else sound_washingmachine.pause();
	// not used for czs

	if (jump_timer > 0) jump_timer--;
	for (let t = 0; t < NUMBER_OF_CARS; t++) cz_jump_timer[t]--;

	// aker
	if (ci1 === 27 && cj1 === 36)
	{
		let tx = Math.floor(x_to_x_in_chunk(player.position.x))-3;
		let tz = Math.floor(x_to_x_in_chunk(player.position.z))-3;

		let akerpos = 45*3*tx+3*tz + 1;

		// kolla om man är utanför!
		if (akerpos >= 0 && akerpos < 6075)
		{
			if (pointsprites_aker.geometry.attributes.position.array[akerpos] > -100)
			{
				sound_play(sound_grasscut);

				pointsprites_aker.geometry.attributes.position.array[akerpos] = -100;		// y?
				pointsprites_aker.geometry.attributes.position.needsUpdate = true;
			}
		}
	}

//	last_chunk_x = ci1;		// in create_terrain_chunks_before_showing_them()
//	last_chunk_z = cj1;

	// LOCKED 231012:
	lastpos_x = player.position.x;
	lastpos_z = player.position.z;
	lastpos_y = player.position.y;

	if (height_get(player) > sealevel+0.4)
	{
		lastlandpos_x = player.position.x;
		lastlandpos_z = player.position.z;
	}
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (cz_turned_on[t] === 1)
		{
		//	console.log("t: " + t);		// DEBUG
			if (height_get(cz[t]) > sealevel+0.4)
			{
				cz_lastlandpos_x[t] = cz[t].position.x;
				cz_lastlandpos_z[t] = cz[t].position.z;
			}
		}
	}

	lastcut = cut;

	renderer.render(scene, camera);

	if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE === 0) frame_counter += game_speed;
	if (frame_counter > FRAMES_PER_DAY) frame_counter = 0;

	mouseclick = false;
	// limit fps - LOCKED 231012:
	let frame_end = performance.now();
//	while (performance.now()-frame_start < 16.67) {
//		if (performance.now()-music_last > musicdelay) { sequencer_play(); music_last = performance.now(); }
//	}

	requestAnimationFrame(main);

	// automatic low resolution if too bad performance
	if (frame_end-frame_start >= 16.67) lowres_count++;
	else lowres_count -= 0.1;
	if (frame_counter % (60*20) === 0) lowres_count = 0;

	if (lowres_count >= 10) lowres = 0.75;
	else if (lowres_count < -10) lowres = 1;
}
requestAnimationFrame(main);
