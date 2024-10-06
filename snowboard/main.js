// main.js
// the main game loop
// kbrecordzz 2024

"use strict";

ascend_intro(0.3175);

//document.getElementById("loadingscreen").style.visibility = "hidden";
//document.getElementsByTagName("body")[0].style.backgroundColor = "#000000";
//document.getElementById("vhs-filter").style.visibility = "visible";
//document.getElementById("vhs-filter3").style.visibility = "visible";

player.position.x = start_chunk_x*49+25;
player.position.z = start_chunk_z*49+25;
player.position.y = height_get(player);

player.rotation.y = -1;

s_1008_strive = player.position.y;

cut = CUT_SPLASHSCREEN;
splashscreen_very_starttime = performance.now();

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) mobile = false;	// ej klockren!
else mobile = true;

let lowres = 1;
let lowres_count = 0;

let highfps_count = 0;

var lastframe;

// main game loop
function main()
{
	let frame_start = performance.now();

	ci1 = Math.floor((player.position.x)/49);
	cj1 = Math.floor((player.position.z)/49);

	// DEBUG bug huntington
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
		if (cut % MOD_FREEROAM_ONLY === 0 && Math.random() > 0.9995) ts_end(cut+100);
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
		if (cut % MOD_FREEROAM_OR_RACE !== 0 && Math.random() > 0.9) cut++;
		if (Math.random() > 0.999) chaosmode = 1;

		if (Math.random() > 0.5)
		{
			if (cut % MOD_FREEROAM_OR_RACE === 0 && shot_timer <= 60)
			{
				if (interact_timer <= 0)
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
		if (cut % MOD_FREEROAM_ONLY === 0 && Math.random() > 0.9995) ts_end(cut+100);
		if (Math.random() > 0.9997) q += 4;
		if (Math.random() > 0.9998) player.position.x += 50;
		if (Math.random() > 0.9998) player.position.x -= 50;
		if (Math.random() > 0.9998) player.position.z += 50;
		if (Math.random() > 0.9998) player.position.z -= 50;
		if (cut % MOD_FREEROAM_OR_RACE !== 0 && Math.random() > 0.9) cut++;
		if (Math.random() > 0.999) chaosmode = 0;
	}
	}

	// out of bounds
	if (player.position.x <= 12*49) { player.position.x = 12*49; sound_error.play(); }
	if (player.position.x >= 41*49+49) { player.position.x = 41*49+49; sound_error.play(); }
	if (player.position.z <= 12*49) { player.position.z = 12*49; sound_error.play(); }
	if (player.position.z >= 41*49+49) { player.position.z = 41*49+49; sound_error.play(); }

	if (player.position.x < 12*49 || player.position.z < 12*49 || player.position.x > 42*49 || player.position.z > 42*49) throw new Error("player is outside of world, position: " + player.position.x + " " + player.position.z);

	layout_set();

	pointsprites_snow.position.y -= 0.1;
	if (pointsprites_snow.position.y < camera.position.y) pointsprites_snow.position.y = camera.position.y+20;
	else if (pointsprites_snow.position.y > camera.position.y+40) pointsprites_snow.position.y = camera.position.y+20;
	pointsprites_snow.position.x = ci1*(chunkwidth-1)+48;
	pointsprites_snow.position.z = cj1*(chunkwidth-1)+48;

	scene.background = new THREE.Color(0x44AAFF);

	cut_set();
	camera_set();

	ascend_main();

	light.intensity = 1.2;

	scene.fog.far = 200;
	scene.fog.color.r = 0x78/255;
	scene.fog.color.g = 0x78/255;
	scene.fog.color.b = 0xFF/255;

	if (cut !== CUT_PAUSEMENU) { last_cut_before_pause = cut; }		// finns ocksa i input.js!


	// ------------------- //
	// ---- SNOWBOARD ---- //
	// ------------------- //

	if (cut >= 0)
	{
		// gravity
		height = height_get(player);

		if (player.position.y-height < 0.3)//(3-rot_speed)*0.1)
		{
			gravityinc = 0;
			player.position.y = height;
		}
		else// if (player.position.y > height)
		{
		//	let hopppower = -0.5*last_lutning;
		//	if (hopppower >= 0.1) hopppower = 0.1;
		//	player.position.y += hopppower;		// hoppa på ramper t.ex.
			gravityinc += 0.0035;
			player.position.y -= gravityinc;
		}

		// go slower uphill
		if ((lastheight > height && player.position.y-height < 0.3) || (lastheight < height && player.position.y-height < 0.3))
		{
			if (rot_speed > 0.01)
			{
				if (lastheight > height) rot_speed += (lastheight-height)*0.02;
				else if (lastheight < height) rot_speed -= (height-lastheight)*0.02;
			//	{
				//	if (rot_speed >= 0.1) rot_speed -= (height-lastheight)*0.02;
				//	else rot_speed -= (height-lastheight)*0.025;
			//		rot_speed -= (height-lastheight)*0.02
			//	}
			}
			last_lutning = (lastheight-height);
		}

		lastheight = height;

		// räkna ut lutning
		// check if you're in the first or second triangle, for height value interpolation
		// then create values for height value interpolation
		let p_xf = Math.floor(player.position.x), p_zf = Math.floor(player.position.z);

		let ixf = x_to_chunk_no(p_xf), izf = x_to_chunk_no(p_zf);
		let ixc = x_to_chunk_no(p_xf+1), izc = x_to_chunk_no(p_zf+1);
		let xf = x_to_x_in_chunk(p_xf), zf = x_to_x_in_chunk(p_zf);
		let xc = x_to_x_in_chunk(p_xf+1), zc = x_to_x_in_chunk(p_zf+1);

		let hx0z0 = hm[ixf][izf][xf][zf];
		let hx1z0 = hm[ixc][izf][xc][zf];
		let hx0z1 = hm[ixf][izc][xf][zc];
		let hx1z1 = hm[ixc][izc][xc][zc];

		let vx = ((hx1z0-hx0z0) + (hx1z1-hx0z1)) / 2;
		let vz = ((hx0z1-hx0z0) + (hx1z1-hx1z0)) / 2;

		if (player.position.y-height < 0.3)
		{
			x_speed -= 0.004*vx;
			z_speed -= 0.004*vz;
		}

		// om lutningen är tillräckligt stor, putt spelaren lite åt det hållet
		let x_change = x_speed / (20*(rot_speed+0.001));
		let z_change = z_speed / (20*(rot_speed+0.001));
		if (x_change > 0.01) x_change = 0.01;
		if (z_change > 0.01) z_change = 0.01;
		if (x_change < -0.01) x_change = -0.01;
		if (z_change < -0.01) z_change = -0.01;

		// om man åker slalom, öka mängden spelaren putts
		if (key_a === true || key_d === true)
		{
			if (key_w === false)
			{
				if (rot_speed > 0.08)
				{
					x_change *= 1.5;
					z_change *= 1.5;
				}
			}
			else if (key_w === true)
			{
				if (rot_speed > 0.08)
				{
					x_change *= 1.15;
					z_change *= 1.15;
				}
			}
		}

		// putt spelaren nerför lutningar
		player.position.x += x_change;
		player.position.z += z_change;

		// friktion på xz-lutning-hastighet?
	//	if (x_speed > 0) x_speed -= 0.001; else if (x_speed < 0) x_speed += 0.001;
	//	if (z_speed > 0) z_speed -= 0.001; else if (z_speed < 0) z_speed += 0.001;

		dirt.visible = false;
		dirt2.visible = false;
		dirt3.visible = false;
		snowboard_center.material.rotation = 0;
		if (key_w === true)
		{
			if (key_a === true)
			{
				let turnpower = rot_speed*0.5; // / (4*(player.position.y-height_get(player)));
				if (turnpower > 0.2) turnpower = 0.2;
				if (turnpower <= 0.1) turnpower = 0.1;
				player.rotation.y += 0.04 * turnpower;
				if (snowboard_center.material.rotation < 0.1)
				{
				//	s_1008.material.rotation += 0.01;
					snowboard_center.material.rotation = 0.2;
				}
			}
			if (key_d === true)
			{
				let turnpower = rot_speed*0.5; // / (4*(player.position.y-height_get(player)));
				if (turnpower > 0.2) turnpower = 0.2;
				if (turnpower <= 0.1) turnpower = 0.1;
				player.rotation.y -= 0.04 * turnpower;
				if (snowboard_center.material.rotation > -0.1)
				{
				//	s_1008.material.rotation -= 0.01;
					snowboard_center.material.rotation = -0.2;
				}
			}
			snowboard_left.visible = false; snowboard_center.visible = true; snowboard_right.visible = false;
			sound_sliding.pause();
			if (player.position.y < height_get(player)+0.1) sound_skiing.play(); else sound_skiing.pause();

		//	if (frame_counter % 15 < 5) { dirt.visible = true; dirt2.visible = false; dirt3.visible = false; }
		//	else if (frame_counter % 15 < 10) { dirt.visible = false; dirt2.visible = true; dirt3.visible = false; }
		//	else { dirt.visible = false; dirt2.visible = false; dirt3.visible = true; }
		//	dirt.material.color = new THREE.Color(0xFF0000);
		//	dirt2.material.color = new THREE.Color(0xFF0000);
		//	dirt3.material.color = new THREE.Color(0xFF0000);
		//	dirt.position.x = 0;
		//	dirt2.position.x = 0;
		//	dirt3.position.x = 0;
		}
		else if (key_w === false)
		{
			if (key_a === true)
			{
				let turnpower = 0.2 * ( rot_speed*5 );// / (8*(player.position.y-height_get(player))) );
				if (turnpower > 0.6) turnpower = 0.6;
				if (turnpower <= 0) turnpower = 0;
				player.rotation.y += 0.03 * turnpower;
			//	if (turnpower >= 0.1)
			//	{
					snowboard_left.visible = true; snowboard_center.visible = false; snowboard_right.visible = false;
					if (frame_counter % 15 < 5) { dirt.visible = true; dirt2.visible = false; dirt3.visible = false; }
					else if (frame_counter % 15 < 10) { dirt.visible = false; dirt2.visible = true; dirt3.visible = false; }
					else { dirt.visible = false; dirt2.visible = false; dirt3.visible = true; }
					dirt.material.color = new THREE.Color(0xFFFFFF);
					dirt2.material.color = new THREE.Color(0xFFFFFF);
					dirt3.material.color = new THREE.Color(0xFFFFFF);
					dirt.position.x = -0.5;
					dirt2.position.x = -0.5;
					dirt3.position.x = -0.5;
					sound_skiing.pause();
					sound_sliding.play();
			//	}
				if (rot_speed >= 0.0004) rot_speed -= 0.0004;
			}
			else if (key_d === true)
			{
				let turnpower = 0.2 * ( rot_speed*5 );// / (8*(player.position.y-height_get(player))) );
				if (turnpower > 0.6) turnpower = 0.6;
				if (turnpower <= 0) turnpower = 0;
				player.rotation.y -= 0.03 * turnpower;
			//	if (turnpower >= 0.1)
			//	{
					snowboard_left.visible = false; snowboard_center.visible = false; snowboard_right.visible = true;
					if (frame_counter % 15 < 5) { dirt.visible = true; dirt2.visible = false; dirt3.visible = false; }
					else if (frame_counter % 15 < 10) { dirt.visible = false; dirt2.visible = true; dirt3.visible = false; }
					else { dirt.visible = false; dirt2.visible = false; dirt3.visible = true; }
					dirt.material.color = new THREE.Color(0xFFFFFF);
					dirt2.material.color = new THREE.Color(0xFFFFFF);
					dirt3.material.color = new THREE.Color(0xFFFFFF);
					dirt.position.x = 0.5;
					dirt2.position.x = 0.5;
					dirt3.position.x = 0.5;
					sound_skiing.pause();
					sound_sliding.play();
			//	}
				if (rot_speed >= 0.0004) rot_speed -= 0.0004;
			}
			else
			{
				snowboard_left.visible = false; snowboard_center.visible = true; snowboard_right.visible = false;
				sound_sliding.pause();
				if (player.position.y < height_get(player)+0.1) sound_skiing.play(); else sound_skiing.pause();
			}
		}
		if (key_w === true) { if (rot_speed < 0.2) { rot_speed += 0.006; } }
		if (key_s === true) { if (rot_speed >= 0.004) { rot_speed -= 0.004; } }

		// max normal hastighet överhuvudtaget
		if (rot_speed >= 0.3) rot_speed = 0.3;

		// friktion på normal hastighet?
		if (rot_speed >= 0.0003) rot_speed -= 0.0003;

		// friktion vid träd
		if (object_get(player) === ASCEND_TREE) { if (rot_speed > 0.1) { rot_speed *= 0.9; } }
		else if (object_get(player) === ASCEND_BUSH) { if (rot_speed > 0.1) { rot_speed *= 0.95; } }

		// normal hastighet
		//player.translateZ(rot_speed);
		xz_move(player, rotation_real_get(player.rotation.y), rot_speed);

		if (s_1008_strive < player.position.y) s_1008_strive += 0.75 * Math.abs(s_1008_strive-player.position.y);
		if (s_1008_strive > player.position.y) s_1008_strive -= 0.75 * Math.abs(s_1008_strive-player.position.y);
		s_1008.position.set(player.position.x, s_1008_strive+0.3, player.position.z);
		s_1008.rotation.y = player.rotation.y;
		s_1008.visible = true;
		snowboard_center.position.set(player.position.x, s_1008_strive, player.position.z);
		snowboard_left.position.set(player.position.x, s_1008_strive, player.position.z);
		snowboard_right.position.set(player.position.x, s_1008_strive, player.position.z);
	}

// ------------------- //


//	last_chunk_x = ci1;		// in create_terrain_chunks_before_showing_them()
//	last_chunk_z = cj1;

	lastdiff_x = player.position.x-lastpos_x;
	lastdiff_z = player.position.z-lastpos_z;
	lastpos_x = player.position.x;
	lastpos_z = player.position.z;
	lastpos_y = player.position.y;

if (minecraft === true)
{
	s_1001.position.set(player.position.x, player.position.y+0.5, player.position.z);	// minecraft!!
	s_1001.visible = true;
}
else s_1001.visible = false;

	lastcut = cut;

	renderer.render(scene, camera);

	if (cut >= 0) frame_counter += game_speed;
	if (frame_counter > FRAMES_PER_DAY) frame_counter = 0;

	mouseclick = false;
	let frame_end = performance.now();

	requestAnimationFrame(main);

	// new limit fps
	if (performance.now()-lastframe < 14) highfps_count++;
	if (frame_counter % (60*10) === 0) highfps_count = 0;		// se om detta intervall är rimligt för skärmar med hög refresh rate!! denna funktion behöver utvecklas och testas noga efter att projektet är klart.
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
