"use strict";player.rotation.y=0;let cookie_cut=parseInt(params.cut);if(cookie_cut>=0)
{startcut=cookie_cut;}
else if(document.cookie.search("cookie_cut3=")!==-1)
{let kaka_cut1=document.cookie.split("cookie_cut3=");let kaka_cut2=kaka_cut1[1].split(";");startcut=parseInt(kaka_cut2[0]);}
else
{startcut=CUT_FREEROAM_MRSS;player.rotation.y=1.734;}
if(startcut===0)throw new Error();document.getElementById("save_text").href="?x="+start_chunk_x+"&z="+start_chunk_z+"&cut="+startcut;ascend_intro(0.6511030308479817);document.getElementById("loadingscreen").style.visibility="hidden";document.getElementsByTagName("body")[0].style.backgroundColor="#000000";frame_counter=FRAMES_PER_HOUR*9;const url=new URL(location.protocol+"\/\/"+location.host+location.pathname);history.pushState({},"",url);if(start_x[start_chunk_x][start_chunk_z]>0)
{player.position.x=start_x[start_chunk_x][start_chunk_z];player.position.z=start_z[start_chunk_x][start_chunk_z];}
else
{player.position.x=start_chunk_x*49+25;player.position.z=start_chunk_z*49+25;}
looking_at_object=player;cut=CUT_SPLASHSCREEN;if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))mobile=false;else mobile=true;let lowres=1;let lowres_count=0;let highfps_count=0;var lastframe;function main()
{let frame_start=performance.now();ci1=Math.floor((player.position.x)/49);cj1=Math.floor((player.position.z)/49);if(1===0){if(chaosmode===0)
{game_speed=1;if(Math.random()>0.5)key_w=true;if(Math.random()>0.999)key_w=false;if(Math.random()>0.9)key_a=true;if(Math.random()>0.99)key_a=false;if(Math.random()>0.9)key_d=true;if(Math.random()>0.99)key_d=false;if(Math.random()>0.999)key_s=true;if(Math.random()>0.9)key_s=false;if(Math.random()>0.99)mouseclick=true;else mouseclick=false;if(cut%MODULUS_FREEROAM_ONLY===0&&Math.random()>0.9995)ts_end(cut+100);if(Math.random()>0.999)q+=2;if(Math.random()>0.9998)player.position.x+=50;if(Math.random()>0.9998)player.position.x-=50;if(Math.random()>0.9998)player.position.z+=50;if(Math.random()>0.9998)player.position.z-=50;for(let t=0;t<NUMBER_OF_CARS;t++)
{if(cz_turned_on[t]===1)
{if(distance_get(player,cz[t])>50)player.position.set(cz[t].position.x,0,cz[t].position.z);if(distance_get(player,cz[t])>3)player.rotation.y=lookat_datass(player,cz[t]);}}
if(cut%MODULUS_FREEROAM_OR_RACE!==0&&Math.random()>0.9)cut++;if(shelfanswer===0)shelfanswer=1;else shelfanswer=0;if(Math.random()>0.999)chaosmode=1;if(Math.random()>0.5)
{if(cut%MODULUS_FREEROAM_OR_RACE===0&&shot_timer<=60)
{if(interact_timer<=0)
{let whichf=-1;for(let t=0;t<4;t++)
{if(fayah_timer[t]<=0)whichf=t;}
if(whichf!==-1)
{fayah_timer[whichf]=50;}}}}}
else if(chaosmode===1)
{game_speed=2;if(Math.random()>0.7)key_w=true;if(Math.random()>0.9)key_w=false;if(Math.random()>0.8)key_a=true;if(Math.random()>0.99)key_a=false;if(Math.random()>0.8)key_d=true;if(Math.random()>0.99)key_d=false;if(Math.random()>0.999)key_s=true;if(Math.random()>0.9)key_s=false;if(Math.random()>0.99)mouseclick=true;else mouseclick=false;if(cut%MODULUS_FREEROAM_ONLY===0&&Math.random()>0.9995)ts_end(cut+100);if(Math.random()>0.9997)q+=4;if(Math.random()>0.9998)player.position.x+=50;if(Math.random()>0.9998)player.position.x-=50;if(Math.random()>0.9998)player.position.z+=50;if(Math.random()>0.9998)player.position.z-=50;if(cut%MODULUS_FREEROAM_OR_RACE!==0&&Math.random()>0.9)cut++;if(Math.random()>0.999)chaosmode=0;}}
camera_cutscene.fov=60;lookheight=0;move_player=false;speedchange=1;from_x=0;from_z=0;from_y=0;hide_cut_sprites();sprite_ui_mouseclick.position.set(player.position.x,shelf.position.y+1.3,player.position.z);sprite_ui_mouseclick.visible=false;sprite_iloveyou.position.set(player.position.x,shelf.position.y+0.8,player.position.z);sprite_iloveyou.visible=false;if(frame_counter%(60*20)===0)drown_count=0;if(drown_count>=5)
{sprite_ui_mouseclick.visible=true;if(ci1!==last_chunk_x||cj1!==last_chunk_z)drown_count=0;if(mouseclick===true)
{drown_count=0;if(start_x[ci1][cj1]>0)
{player.position.x=start_x[ci1][cj1];player.position.z=start_z[ci1][cj1];}
else
{player.position.x=ci1*49+25;player.position.z=cj1*49+25;}}}
if(player.position.x<=26*49){player.position.x=26*49;if(cut!==CUT_CUTSCENE_OUTRO){sound_error.play();}}
if(player.position.x>=41*49+49){player.position.x=41*49+49;if(cut!==CUT_CUTSCENE_OUTRO){sound_error.play();}}
if(player.position.z<=26*49){player.position.z=26*49;if(cut!==CUT_CUTSCENE_OUTRO){sound_error.play();}}
if(player.position.z>=41*49+49){player.position.z=41*49+49;if(cut!==CUT_CUTSCENE_OUTRO){sound_error.play();}}
if(player.position.x<26*49||player.position.z<26*49||player.position.x>42*49||player.position.z>42*49)throw new Error("player is outside of world, position: "+player.position.x+" "+player.position.z);layout_set();if(cut%MODULUS_FREEROAM_OR_RACE===0)chunk_set();cut_set();if(cut===CUT_CUTSCENE_RECAP)player.position.y=100;if(cut%MODULUS_FREEROAM_OR_RACE===0){for(let t=0;t<NUMBER_OF_CARS;t++){if(cz_turned_on[t]===1){if(cz_goal_x[t]<=0||cz_goal_z[t]<=0)throw new Error("goal for character "+t+" is <= 0");}}}
camera_set();sprite_fff1.visible=false;sprite_fff2.visible=false;sprite_fff3.visible=false;sprite_fff4.visible=false;if(frame_counter%20>15)sprite_fff1.visible=true;else if(frame_counter%20>10)sprite_fff2.visible=true;else if(frame_counter%20>5)sprite_fff3.visible=true;else sprite_fff4.visible=true;let brealrot=player.rotation.y-(2*Math.PI)*Math.floor(player.rotation.y/(2*Math.PI));sprite_bullseye.position.x=player.position.x+1*(Math.cos(Math.PI*0.5-brealrot));sprite_bullseye.position.z=player.position.z+1*(Math.sin(Math.PI*0.5-brealrot));sprite_bullseye.position.y=player.position.y+1;if((cut%MODULUS_FREEROAM_OR_RACE===0&&cut%MODULUS_FREEROAM_ONLY!==0&&race_state===RACE_DURING)||cut===CUT_FREEROAM_HARASSFAN)sprite_bullseye.visible=true;else sprite_bullseye.visible=false;ascend_main();if(cut%MODULUS_FREEROAM_OR_RACE===0)
{light_set();fog_set();}
if(cut===CUT_CUTSCENE_BOMB||cut===CUT_CUTSCENE_BOMB+1||cut===CUT_CUTSCENE_BOMB+2)fog_set();room.position.set(player.position.x,100,player.position.z);if(cut!==CUT_PAUSEMENU){last_cut_before_pause=cut;}
if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE===0&&cut!==CUT_FREEROAM_INTRO&&cut!==CUT_FREEROAM_1B&&cut!==CUT_FREEROAM_1C&&cut!==CUT_FREEROAM_1D&&cut!==CUT_FREEROAM_1E&&cut!==CUT_FREEROAM_1F&&cut!==CUT_FREEROAM_CARCHASE2&&cut!==CUT_FREEROAM_CARCHASE3&&cut!==CUT_FREEROAM_CARCHASE4&&cut!==CUT_FREEROAM_LICENSE_2&&cut!==CUT_FREEROAM_LICENSE_3&&cut!==CUT_FREEROAM_LICENSE_4&&cut!==CUT_FREEROAM_LICENSE_5&&cut!==CUT_FREEROAM_MAGNETFACTORY_X)
{if(ci1>=26&&ci1<=41&&cj1>=26&&cj1<=41)
{if(frame_counter%30===0)document.cookie="cookie_cut3="+cut+"; expires=Thu, 18 Dec 2099 12:00:00 UTC";if(start_x[ci1][cj1]>0)
{if(frame_counter%30===5)document.cookie="cookie_x3="+ci1+"; expires=Thu, 18 Dec 2099 12:00:00 UTC";if(frame_counter%30===10)document.cookie="cookie_z3="+cj1+"; expires=Thu, 18 Dec 2099 12:00:00 UTC";}
if(last_cut_before_pause===0)throw new Error();if(frame_counter%30===20)document.getElementById("save_text").href="?x="+ci1+"&z="+cj1+"&cut="+last_cut_before_pause;}}
if(cut%MODULUS_FREEROAM_OR_RACE===0)
{last_cut_before_talk=cut;cars_control();cars_physics();if(frame_counter%5===0)cars_sound();}
else
{sound_washingmachine.pause();sound_car.pause();sound_car_is_playing=false;for(let t=0;t<NUMBER_OF_CARS;t++)
{sound_cz_car[t].pause();sound_cz_car_is_playing=false;}
sound_grass.pause();sound_water.pause();}
if(cut%MODULUS_FREEROAM_ONLY===0)last_cut_before_race=cut;if(lastcut%MODULUS_FREEROAM_OR_RACE!==0&&cut%MODULUS_FREEROAM_OR_RACE===0)interact_timer=60;if((cut%MODULUS_FREEROAM_OR_RACE===0&&cut%MODULUS_FREEROAM_ONLY!==0&&race_state===RACE_DURING)||cut===CUT_FREEROAM_HARASSFAN)
{gameplay_fps();}
else
{for(let t=0;t<4;t++)sprite_fayah[t].visible=false;sprite_efayah.visible=false;}
if(cut<CUT_RACE_RINGS&&player.position.x>=1905&&player.position.x<=1910&&player.position.z>=1398&&player.position.z<=1523)
{player.position.x=lastpos_x;player.position.z=lastpos_z;speed*=-1;sound_error.play();}
if((cut<CUT_FREEROAM_MAGNETFACTORY_V||cut===CUT_FREEROAM_MAGNETFACTORY)&&player.position.x>=1803&&player.position.x<=1910&&player.position.z>=1453&&player.position.z<=1458)
{player.position.x=lastpos_x;player.position.z=lastpos_z;speed*=-1;sound_error.play();}
if(cut<=CUT_FREEROAM_MAGNETFACTORY_X&&player.position.x>=1811&&player.position.x<=1865&&player.position.z>=1369&&player.position.z<=1377)
{player.position.x=lastpos_x;player.position.z=lastpos_z;speed*=-1;sound_error.play();}
if(cut!==CUT_FREEROAM_RACE_SHORT_AFTER&&player.position.x>=1862&&player.position.x<=1963&&player.position.z>=1368&&player.position.z<=1377)
{player.position.x=lastpos_x;player.position.z=lastpos_z;speed*=-1;sound_error.play();}
if(interact_timer>0){sprite_ui_mouseclick.visible=false;interact_timer--;}
if(collision_timer>0)collision_timer--;if(cz_collision_timer>0)cz_collision_timer--;if(turbo_timer>0)turbo_timer--;for(let t=0;t<NUMBER_OF_CARS;t++)cz_turbo_timer[t]--;if(areatext_timer>0)
{areatext_timer--;document.getElementById("area").style.visibility="visible";if(areatext_timer>200)document.getElementById("area").style.opacity=1-0.01*(areatext_timer-200);if(areatext_timer<100)document.getElementById("area").style.opacity=0.01*(areatext_timer-100);}
else
{document.getElementById("area").style.visibility="hidden";}
if(washingmachine_timer>0)washingmachine_timer--;else sound_washingmachine.pause();if(cut%MODULUS_FREEROAM_OR_RACE!==0)sprite_washingmachine.visible=false;if(jump_timer>0)jump_timer--;for(let t=0;t<NUMBER_OF_CARS;t++)cz_jump_timer[t]--;if((cut===CUT_FREEROAM_AUCTION||(q>2&&cut===CUT_FREEROAM_SVINERI_1))&&ci1===38&&cj1===34)
{let tx=Math.floor(x_to_x_in_chunk(player.position.x))-3;let tz=Math.floor(x_to_x_in_chunk(player.position.z))-3;let tx2=Math.floor(x_to_x_in_chunk(cz[CAR_DARK_GANDALF].position.x))-3;let tz2=Math.floor(x_to_x_in_chunk(cz[CAR_DARK_GANDALF].position.z))-3;let akerpos=45*3*tx+3*tz+1;let akerpos2=45*3*tx2+3*tz2+1;if(akerpos>=0&&akerpos<6075)
{if(!(pointsprites_aker===undefined))
{if(pointsprites_aker.geometry.attributes.position.array[akerpos]>-100)
{if(player.position.x>=1867&&player.position.x<=1896&&player.position.z>=1684&&player.position.z<=1716)
{if(speed>=0.13)
{speed-=0.065;if(cut===CUT_FREEROAM_AUCTION)akerpoints++;sound_play(sound_glasshatter);pointsprites_aker.geometry.attributes.position.array[akerpos]=-100;pointsprites_aker.geometry.attributes.position.needsUpdate=true;if(cut===CUT_FREEROAM_SVINERI_1&&q>2)ts_end(CUT_FREEROAM_AUCTION);}
else
{let sfac=speed;if(speed<0)sfac=-speed;if(sfac<0.3)sound_crash.volume=sfac*2;else sound_crash.volume=0.6;sound_crash.play();speed*=-1;player.position.x=lastpos_x;player.position.z=lastpos_z;}}}}}
if(akerpos2>=0&&akerpos2<6075)
{if(!(pointsprites_aker===undefined))
{if(pointsprites_aker.geometry.attributes.position.array[akerpos2]>-100)
{if(cut===CUT_FREEROAM_AUCTION)akerpoints++;sound_play(sound_glasshatter);pointsprites_aker.geometry.attributes.position.array[akerpos2]=-100;pointsprites_aker.geometry.attributes.position.needsUpdate=true;}}}}
let quiz_total=quiz1_correct+quiz2_correct+quiz3_correct+quiz4_correct+quiz5_correct+quiz6_correct+quiz7_correct+quiz8_correct+quiz9_correct+quiz10_correct;if(cut===CUT_FREEROAM_MAGNETFACTORY_X&&quiz_total>=8){sound_play(sound_lapfanfare);ts_end(CUT_FREEROAM_QUIZ);}
lastpos_x=player.position.x;lastpos_z=player.position.z;lastpos_y=player.position.y;if(height_get(player)>sealevel+0.4)
{lastlandpos_x=player.position.x;lastlandpos_z=player.position.z;}
lastcut=cut;renderer.render(scene,camera);if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE===0)frame_counter+=game_speed;if(frame_counter>FRAMES_PER_DAY)frame_counter=0;mouseclick=false;let frame_end=performance.now();requestAnimationFrame(main);if(performance.now()-lastframe<14)highfps_count++;if(frame_counter%(60*10)===0)highfps_count=0;if(highfps_count>=100)
{console.log("highfps");while(performance.now()-frame_start<15){}}
if(frame_end-frame_start>=16.67)lowres_count++;else lowres_count-=0.1;if(frame_counter%(60*20)===0)lowres_count=0;if(lowres_count>=10)lowres=0.75;else if(lowres_count<-10)lowres=1;lastframe=performance.now();}
requestAnimationFrame(main);