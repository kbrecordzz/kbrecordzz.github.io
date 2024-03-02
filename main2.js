// main.js
// the main game loop
// kbrecordzz 2023

// PERFORMANCE!! MÄT!!

// vid publicering:
// diff med filer i files-mapp, EP1 / EP2
// kolla publish.txt

// race varv!!

// race avsluta tillbaka till cut!!
// tog bort iwillbeback = false fr ts_end_from_talk(). det borde hjälpa. men kanske påverkar det något annat. !! för det är att prata med talk-karaktärer under race som gör att man blablabla... men detta är inte anledningen att flag-race inte funkar i EP1, där sätts inte ens iwillbeback alls. extra fel, det funkar helt enkelt inte. ta bort flaggorna där!!
// NEJ det funkade inte, så tog bort möjligheten att prata med NPCs under race helt istället. detta måste testas noggrannt och även omvänt (testa NPCs utanför race typ)!! fundera också på om det finns något mer ställe under race där man kan ts_end()a och därmed false:a iwillbeback.

// RECAP kulor!! testa på alla 3 enheter!

//lägg in tidsgräns på alla dogert challenges!!

// portal: länk för att spela i ett eget fönster? för båda EPISODES? vad kan det påverka när det gäller sparande och annat, osv?!!

// cookies kan sparas dubbelt (på /f och på /f/), men har bara sett det på test-sidan.!!

// skjuta varandra i race, testa!!

// sätt på FPS och bullseye-sikte efter FREEROAM_WASHING_2, för det är då hårass ger det till dig.

// volym på all musik!!
// kolla så att musiken funkar rätt, startar och slutar rätt, osv!! testa en eller fler hel genomspelning med ljud på!!

// gör så att alla race är tydliga!!
// testa race med alla olika vinnare, se vad som händer.

// 'epper race avslutas inte rätt när man spelar det från ett annat ställe i storyn. man är kvar i race-cut för evigt!!? men på tjörn-race funkar det
// köra race i andra cuts, hur blir det om man klickar sig ut ur wrongway-delen? vilken cut kommer man till då?!! det verkar som att denna funkar nu.

// testa starta spelet från början!!

// stor bokstav, rätt stavning, rätt stavning/stil på namn. konsekvent i allt!! Rätt stora och små bokst på namn t.ex. osv!!
// renskriv: sök på " i " " i'm " för att se vilka som har gammal dålig stavning!!
// kör spellcheck!!
// korrekt teckenkodning!! å måste skrivas på ett speciellt sätt. stora Å också. Ã¥. kolla å ä ö osv...

// man skulle tekniskt sett kunna bli fast på små öar. vad gör man då, startar om spelet? ja det kan man göra, för spelet sparas aldrig på dessa små öar (förmodligen darkwaters). lägg en tvättmaskin på varje liten ö, åtminstone i darkwaters! för andra små eventuella öar så får man starta om spelet, men kolla ändå om det finns några sådana! med tvättmaskin måste man också kunna åka tillbaka hela vägen innan tvättmaskinen tar slut. sedan bör det finnas fler tvättmaskiner på havsbotten.
// testa att spara ifrån en massa ställen på havsbotten!

// pistolskott när man trycker för att prata med talk-karaktär! har tagit bort det nu, hoppas allt funkar.

// layout background_head är lite konstigt placerad på mobil ibland..!!
// kolla head_2 på landscape mobile!!
// shelf's huvud ska inte visas under shelfanswer i portrait! och kanske inte i mobile landscape heller?
// shelf är kanske för långt ner på skärmen i mobile landscape?!

// govern men Kolla igenom EP1 och se så att det går ihop logiskt!!
// (the govern men) läs igenom hela story-dialogen från början till slut på EPISODE 1!! leta efter plotholes och få det rimligt, ladda in hela storyn i huvudet i ett svep, utan att stoppa
// inte så jättemycket dialog-snack på samma gång. fokusera mer i början. det viktiga roliga bra ska vara med, annat får komma senare utspritt kanske typ.!!

// FILES-ÄNDRINGAR! o'malley fick en fez. hur löser jag detta så att han inte har fez i EP1 men har det i EP2? jag bytte namn på omalley.png t omalley_fez.png o använder bara det filnamnet i EP2. kolla bakåtkompabilitet osv!!

// alla länkar på index info-sidorna osv ska vara target=_blank så att man aldrig kan råka hoppa ur sin spelprogress!!

// lägg in länk till EP2 i episode 1-filerna. enda ändringen i EP1 efter release?!! och, förminska avsnitten till 3 i antal!!
// copy link to continue playing in another browser - separat sparning för varje episode, är det tydligt för spelaren?!!
// se till att allt länkar till ____2.php-filer osv, även i index2.php och info2.php, inget får råka länka tillbaka till första avsnittet!!

// byt ut cookie_cut cookie_x cookie_z till nya nummer, och gör rätt länk i "START FROM THE BEGINNING" (i index.php och info.php? vet inte om något mer ställe?). för nu är det EPISODE [insert episode number]!!

"use strict";

// copy from CUT_SPLASHSCREEN:
// this must be put at the start, in case the player pauses and uses the "save and continue" link before doing anything else
// get cut from URL
// ,,, add functionality for IE?! i have that for x and z!
let cookie_cut = parseInt(params.cut);
if (cookie_cut >= 0)
{
	startcut = cookie_cut;
}
// get cut from cookies
else if (document.cookie.search("cookie_cut2=") !== -1)
{
	let kaka_cut1 = document.cookie.split("cookie_cut2=");
	let kaka_cut2 = kaka_cut1[1].split(";");
	startcut = parseInt(kaka_cut2[0]);
}
// cut if the first time playing
else
{
//	startcut = CUT_CUTSCENE_WAKEUP;		// EP1
	startcut = CUT_CUTSCENE_RECAP;	// ny start-cut!! och ny start-position, haftlan. se till att alla länkar i index2 info2 osv är rätt!!
}

if (startcut === 0) throw new Error();
document.getElementById("save_text").href = "?x=" + start_chunk_x + "&z=" + start_chunk_z + "&cut=" + startcut;

// LOCKED 231012:
ascend_intro(0.6511030308479817);

document.getElementById("loadingscreen").style.visibility = "hidden";
document.getElementsByTagName("body")[0].style.backgroundColor = "#000000";

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

let highfps_count = 0;

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
		game_speed = 1;
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

		if (Math.random() > 0.5)
		{
			if (cut % MODULUS_FREEROAM_OR_RACE === 0 && shot_timer <= 60)
			{
				if (interact_timer <= 0)		// ny check fps EP2!
				{
					let whichf = -1;
					for (let t = 0; t < 4; t++)
					{
						if (fayah_timer[t] <= 0) whichf = t;
					}
					if (whichf !== -1)
					{
						fayah_timer[whichf] = 50;
					}
				}
			}
		}
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
	}

	// override in cut_set() if you want to change:
	camera_cutscene.fov = 60;
	lookheight = 0;
	move_player = false;
	speedchange = 1;
	from_x = 0;
	from_z = 0;
	hide_cut_sprites();

	sprite_ui_mouseclick.position.set(player.position.x, shelf.position.y+1.3, player.position.z);
	sprite_ui_mouseclick.visible = false;
	sprite_iloveyou.position.set(player.position.x, shelf.position.y+0.8, player.position.z);
	sprite_iloveyou.visible = false;

	document.getElementById("kula1").style.visibility = "hidden";
	document.getElementById("kula2").style.visibility = "hidden";
	document.getElementById("kula3").style.visibility = "hidden";
	document.getElementById("kula4").style.visibility = "hidden";
	document.getElementById("kula5").style.visibility = "hidden";
	document.getElementById("kula6").style.visibility = "hidden";

	// automatic rescue UI. rest is in functions.js
	if (frame_counter % (60*20) === 0) drown_count = 0;
	if (drown_count >= 5)
	{
		sprite_ui_mouseclick.visible = true;
		if (ci1 !== last_chunk_x || cj1 !== last_chunk_z) drown_count = 0;	// !!
		if (mouseclick === true)
		{
			drown_count = 0;

			// denna skulle i praktiken kunna släppa spelaren mitt i havet när den ska rädda en från drunkning...!
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
	if (cut === CUT_CUTSCENE_RECAP) player.position.y = 100;	// tillägg för cutscene i början!
	if (cut % MODULUS_FREEROAM_OR_RACE === 0) { for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { if (cz_goal_x[t] <= 0 || cz_goal_z[t] <= 0) throw new Error("goal for character " + t + " is <= 0"); } } }
	camera_set();

sprite_fff1.visible = false;
sprite_fff2.visible = false;
sprite_fff3.visible = false;
sprite_fff4.visible = false;
if (frame_counter % 20 > 15) sprite_fff1.visible = true;
else if (frame_counter % 20 > 10) sprite_fff2.visible = true;
else if (frame_counter % 20 > 5) sprite_fff3.visible = true;
else sprite_fff4.visible = true;

	// fps tillägg EP2!
	let brealrot = player.rotation.y - (2*Math.PI)*Math.floor(player.rotation.y/(2*Math.PI));

	sprite_bullseye.position.x = player.position.x + 1*(Math.cos(Math.PI*0.5-brealrot));
	sprite_bullseye.position.z = player.position.z + 1*(Math.sin(Math.PI*0.5-brealrot));
	sprite_bullseye.position.y = player.position.y + 1;

	if (cut % MODULUS_FREEROAM_OR_RACE === 0) sprite_bullseye.visible = true;
	else sprite_bullseye.visible = false;

	ascend_main();
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		if (cut >= CUT_FREEROAM_MAGNETFACTORY_4) { light.intensity = 1.3; light.color = new THREE.Color(0xA3F778); } else { light_set(); }
	}
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		if (cut >= CUT_FREEROAM_MAGNETFACTORY_4) scene.fog.far = 9999999; else fog_set();
	}

	room.position.set(player.position.x, 100, player.position.z);

	if (cut !== CUT_PAUSEMENU) { last_cut_before_pause = cut; }		// finns ocksa i input.js!

	// save progress
	if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE === 0 && cut !== CUT_FREEROAM_INTRO && cut !== CUT_FREEROAM_1B && cut !== CUT_FREEROAM_1C && cut !== CUT_FREEROAM_1D && cut !== CUT_FREEROAM_1E && cut !== CUT_FREEROAM_1F && cut !== CUT_FREEROAM_CARCHASE2 && cut !== CUT_FREEROAM_CARCHASE3 && cut !== CUT_FREEROAM_CARCHASE4 && cut !== CUT_FREEROAM_LICENSE_2 && cut !== CUT_FREEROAM_LICENSE_3 && cut !== CUT_FREEROAM_LICENSE_4 && cut !== CUT_FREEROAM_LICENSE_5)
	{
		if (ci1 >= 26 && ci1 <= 41 && cj1 >= 26 && cj1 <= 41)
		{
			if (frame_counter % 30 === 0)	document.cookie = "cookie_cut2=" + cut + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";

			// lagg in vilka chunks man inte kan spara vid!
			if (start_x[ci1][cj1] > 0)
			{
				if (frame_counter % 30 === 5)	document.cookie = "cookie_x2=" + ci1 + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
				if (frame_counter % 30 === 10)	document.cookie = "cookie_z2=" + cj1 + "; expires=Thu, 18 Dec 2099 12:00:00 UTC";
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
		sound_washingmachine.pause();
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

	if (lastcut % MODULUS_FREEROAM_OR_RACE !== 0 && cut % MODULUS_FREEROAM_OR_RACE === 0) interact_timer = 60;	// flyttar upp den hit!

	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		gameplay_fps();	
	}
	else
	{
		// resets things that get changed in gameplay_fps()
		for (let t = 0; t < 4; t++) sprite_fayah[t].visible = false;
		sprite_efayah.visible = false;
	}

	// EP2!! keep player out of magnet island
	if (player.position.z <= 1524 && player.position.x >= 1627)
	{
		player.position.x = lastpos_x;
		player.position.z = lastpos_z;
		speed *= -1;
		sound_error.play();
		cc(shelf, "Oh no! The magnetic field of this area is too strong!");
	}

//	if (lastcut % MODULUS_FREEROAM_OR_RACE !== 0 && cut % MODULUS_FREEROAM_OR_RACE === 0) interact_timer = 60;	// gammal position
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
	// not used for characters
	if (cut % MODULUS_FREEROAM_OR_RACE !== 0) sprite_washingmachine.visible = false;

	if (jump_timer > 0) jump_timer--;
	for (let t = 0; t < NUMBER_OF_CARS; t++) cz_jump_timer[t]--;

	// aker
	// vad händer om man redan har skördat en del innan riktiga gameplay-cut:en körs?
	if (ci1 === 27 && cj1 === 36)
	{
		let tx = Math.floor(x_to_x_in_chunk(player.position.x))-3;
		let tz = Math.floor(x_to_x_in_chunk(player.position.z))-3;

		let akerpos = 45*3*tx+3*tz + 1;

		// kolla om man är utanför!
		if (akerpos >= 0 && akerpos < 6075)
		{
			if (!(pointsprites_aker === undefined))		// !!
			{
			if (pointsprites_aker.geometry.attributes.position.array[akerpos] > -100)
			{
				akerpoints++;

				sound_play(sound_grasscut);

				pointsprites_aker.geometry.attributes.position.array[akerpos] = -100;		// y?
				pointsprites_aker.geometry.attributes.position.needsUpdate = true;
			}
			}
		}
	}

//	last_chunk_x = ci1;		// in create_terrain_chunks_before_showing_them()
//	last_chunk_z = cj1;

	// LOCKED 231012:
	lastpos_x = player.position.x;
	lastpos_z = player.position.z;
	lastpos_y = player.position.y;

	if (height_get(player) > sealevel+0.4 && start_x[ci1][cj1] >= 0 && start_z[ci1][cj1] >= 0)		// la till så att man inte sparar lastlandpos i chunks där man inte kan spara. det är ofta vatten-chunks där man kan fastna och inte kommer tillbaka till land. det finns tvättmaskiner, men här är en extra koll som gör att man inte blir fast mitt ute på havet!! kan bli störande om man hamnar på ett ställe där man inte förväntar sig, så testa
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
	let frame_end = performance.now();

	requestAnimationFrame(main);

	// new limit fps
	if (performance.now()-lastframe < 14) highfps_count++;
	if (frame_counter % (60*10) === 0) highfps_count = 0;		// se om detta intervall är rimligt för skärmar med hög refresh rate!!
	if (highfps_count >= 100)
	{
console.log("highfps");
		while (performance.now()-frame_start < 15) { }
	}

	// automatic low resolution if too bad performance
	if (frame_end-frame_start >= 16.67) lowres_count++;
	else lowres_count -= 0.1;
	if (frame_counter % (60*20) === 0) lowres_count = 0;

	if (lowres_count >= 10) lowres = 0.75;
	else if (lowres_count < -10) lowres = 1;

	lastframe = performance.now();
}
requestAnimationFrame(main);
