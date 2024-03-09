"use strict";var key_w=false;var key_s=false;var key_a=false;var key_d=false;var mouseclick=false;var eventlock="";var key_i=false;var key_o=false;var stringx="";var stringz="";var mh;function mouse_event()
{if(event.target===document.getElementById("button_up"))
{key_w=true;navigator.vibrate(40);}
else if(event.target===document.getElementById("button_down"))
{key_s=true;navigator.vibrate(40);}
else if(event.target===document.getElementById("button_left"))
{key_a=true;navigator.vibrate(40);}
else if(event.target===document.getElementById("button_right"))
{key_d=true;navigator.vibrate(40);}
else if(dialog2!==""&&(event.target===document.getElementById("dialog_text")||event.target===document.getElementById("dialog_background")||event.target===document.getElementById("dialog_head")||event.target===document.getElementById("dialog_name")||event.target===document.getElementById("click")))
{shelfanswer=0;if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE!==0&&cut!==CUT_CUTSCENE_BLACKINTRO&&svineri_timer<=0)
{cut++;sound_play(sound_click);}}
else if(dialog2!==""&&(event.target===document.getElementById("dialog_text2")||event.target===document.getElementById("dialog_background2")||event.target===document.getElementById("dialog_head2")||event.target===document.getElementById("dialog_name2")||event.target===document.getElementById("click2")))
{shelfanswer=1;if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE!==0&&cut!==CUT_CUTSCENE_BLACKINTRO&&svineri_timer<=0)
{cut++;sound_play(sound_click);}}
else if(dialog3!==""&&(event.target===document.getElementById("dialog_text3")||event.target===document.getElementById("dialog_background3")||event.target===document.getElementById("dialog_head3")||event.target===document.getElementById("dialog_name3")||event.target===document.getElementById("click3")))
{shelfanswer=2;if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE!==0&&cut!==CUT_CUTSCENE_BLACKINTRO&&svineri_timer<=0)
{cut++;sound_play(sound_click);}}
else
{if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE!==0&&cut!==CUT_CUTSCENE_BLACKINTRO&&dialog2===""&&svineri_timer<=0)
{cut++;sound_play(sound_click);}
if(interact_timer<=0)mouseclick=true;if(cut%MODULUS_FREEROAM_OR_RACE===0&&shot_timer<=60)
{if(interact_timer<=0)
{let whichf=-1;for(let t=0;t<4;t++)
{if(fayah_timer[t]<=0)whichf=t;}
if(whichf!==-1)
{fayah_timer[whichf]=50;}}}
game_speed=1;}}
function mouseup_event()
{if(event.target===document.getElementById("button_play")||event.target===document.getElementById("button_continue"))
{if(cut===CUT_SPLASHSCREEN)
{splashscreen_click_starttime=performance.now();cut=CUT_SPLASHSCREEN_WAIT;}
else if(cut===CUT_PAUSEMENU)
{if(last_cut_before_pause===CUT_SPLASHSCREEN)
{splashscreen_click_starttime=performance.now();cut=CUT_SPLASHSCREEN_WAIT;}
else
{cut=last_cut_before_pause;sound_pause.currentTime=0;sound_pause.play();}}}
else if(event.target===document.getElementById("button_fullscreen"))
{let elem=document.documentElement;if(elem.requestFullscreen)elem.requestFullscreen();else if(elem.webkitRequestFullscreen)elem.webkitRequestFullscreen();else if(elem.msRequestFullscreen)elem.msRequestFullscreen();else if(mozRequestFullScreen)elem.mozRequestFullScreen();if(document.exitFullscreen)document.exitFullscreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen();else if(document.msExitFullscreen)document.msExitFullscreen();else if(mozExitFullScreen)elem.mozExitFullScreen();}
else if(event.target===document.getElementById("button_pause"))
{if(cut!==CUT_PAUSEMENU){last_cut_before_pause=cut;cut=CUT_PAUSEMENU;}
else cut=last_cut_before_pause;sound_play(sound_pause);}
else if(event.target===document.getElementById("button_up"))
{key_w=false;}
else if(event.target===document.getElementById("button_down"))
{key_s=false;}
else if(event.target===document.getElementById("button_left"))
{key_a=false;}
else if(event.target===document.getElementById("button_right"))
{key_d=false;}
else
{mouseclick=false;}}
function onDocumentKeyDown(event)
{if(event.which===73)key_i=true;else if(key_i===true&&event.which===79)key_o=true;else if(key_o===true&&event.which===80)game_speed*=2;else{key_i=false;key_o=false;}
if(event.which===85)game_speed=1;if(event.which===87||event.which===38){key_w=true;event.preventDefault();}
if(event.which===83||event.which===40){key_s=true;event.preventDefault();}
if(event.which===65||event.which===37){key_a=true;event.preventDefault();}
if(event.which===68||event.which===39){key_d=true;event.preventDefault();}
if(event.which===32||event.which===13)
{if(cut===CUT_SPLASHSCREEN)
{splashscreen_click_starttime=performance.now();cut=CUT_SPLASHSCREEN_WAIT;}
else if(cut===CUT_PAUSEMENU)
{if(last_cut_before_pause===CUT_SPLASHSCREEN)
{splashscreen_click_starttime=performance.now();cut=CUT_SPLASHSCREEN_WAIT;}
else
{cut=last_cut_before_pause;sound_pause.currentTime=0;sound_pause.play();}}
event.preventDefault();if(cut>=0&&cut%MODULUS_FREEROAM_OR_RACE!==0&&cut!==CUT_CUTSCENE_BLACKINTRO&&dialog2===""&&svineri_timer<=0)
{cut++;sound_play(sound_click);}
if(interact_timer<=0)mouseclick=true;if(cut%MODULUS_FREEROAM_OR_RACE===0&&shot_timer<=60)
{if(interact_timer<=0)
{let whichf=-1;for(let t=0;t<4;t++)
{if(fayah_timer[t]<=0)whichf=t;}
if(whichf!==-1)
{fayah_timer[whichf]=50;}}}}
if(event.which===49){if(shelf_flames.visible===false)shelf_flames.visible=true;else shelf_flames.visible=false;}
if(event.which===50){if(shelf_epa.visible===false)shelf_epa.visible=true;else shelf_epa.visible=false;}
if(event.which===51){if(shelf_racing.visible===false)shelf_racing.visible=true;else shelf_racing.visible=false;}
if(event.which===52){if(shelf_pipe.visible===false)shelf_pipe.visible=true;else shelf_pipe.visible=false;}
if(event.which===53){if(shelf_beard.visible===false)shelf_beard.visible=true;else shelf_beard.visible=false;}
if(event.which===77)
{let sx=Math.floor(x_to_x_in_chunk(player.position.x));let sz=Math.floor(x_to_x_in_chunk(player.position.z));if(sx<1)sx=1;if(sx>48)sx=48;if(sz<1)sz=1;if(sz>48)sz=48;minecraft_o=minecraft_o+"\nif (fi1 === "+ci1+" && fj1 === "+cj1+") { for (let fi = "+(sx-1)+"; fi <= "+(sx+1)+"; fi++) { for (let fj = "+(sz-1)+"; fj <= "+(sz+1)+"; fj++) { hm["+ci1+"]["+cj1+"][fi][fj] = "+(mh-0.3).toFixed(1)+"; } } }";}
if(event.which===78)
{let sx=Math.floor(x_to_x_in_chunk(player.position.x));let sz=Math.floor(x_to_x_in_chunk(player.position.z));if(sx<3)sx=3;if(sx>46)sx=46;if(sz<3)sz=3;if(sz>46)sz=46;minecraft_o=minecraft_o+"\nif (fi1 === "+ci1+" && fj1 === "+cj1+") { for (let fi = "+(sx-3)+"; fi <= "+(sx+3)+"; fi++) { for (let fj = "+(sz-3)+"; fj <= "+(sz+3)+"; fj++) { hm["+ci1+"]["+cj1+"][fi][fj] = "+(mh-0.3).toFixed(1)+"; } } }";}
if(event.which===66)
{let sx=Math.floor(x_to_x_in_chunk(player.position.x));let sz=Math.floor(x_to_x_in_chunk(player.position.z));minecraft_o=minecraft_o+"\nif (fi1 === "+ci1+" && fj1 === "+cj1+") om["+ci1+"]["+cj1+"]["+sx+"]["+sz+"] = ASCEND_HOUSE;";}
if(event.which===86)
{let sx=Math.floor(x_to_x_in_chunk(player.position.x));let sz=Math.floor(x_to_x_in_chunk(player.position.z));minecraft_o=minecraft_o+"\nif (fi1 === "+ci1+" && fj1 === "+cj1+") om["+ci1+"]["+cj1+"]["+sx+"]["+sz+"] = ASCEND_SKYSCRAPER;";}
if(event.which===90)
{mh=height_get(player);}
if(event.which===81)
{console.log(minecraft_o);minecraft_o="";}
if(event.which===84)
{minecraft_o=minecraft_o+"\nif (ci1 >= "+ci1+"-1 && ci1 <= "+ci1+"+1 && cj1 >= "+cj1+"-1 && cj1 <= "+cj1+"+1) talk_char(sprite_talk_"+cookie_talk_i+", "+player.position.x.toFixed(1)+", "+player.position.z.toFixed(1)+", CUT_CUTSCENE_TALK_"+cookie_talk_i+"); else sprite_talk_"+cookie_talk_i+".visible = false;"
cookie_talk_i++;}
if(event.which===88)
{if(stringx==="")stringx=Math.floor(player.position.x);else stringx=stringx+", "+Math.floor(player.position.x);if(stringz==="")stringz=Math.floor(player.position.z);else stringz=stringz+", "+Math.floor(player.position.z);console.log("x_array = [ "+stringx+" ];");console.log("z_array = [ "+stringz+" ];");}
if(event.which===71)
{}
if(event.which===72)
{window.alert("HELLO.THIS.IS.THE.DOGERT.ERROR. SO.SORRY.FOR.BEING.THAT.GUY.BUT. PLEASE.DONT.PRESS.H.BECAUSE.IT.REMINDS.ME.OF.HÅRASS. /DOGERT");}};document.addEventListener("keydown",onDocumentKeyDown);function onDocumentKeyUp(event)
{if(event.which===87||event.which===38)key_w=false;if(event.which===83||event.which===40)key_s=false;if(event.which===65||event.which===37)key_a=false;if(event.which===68||event.which===39)key_d=false;if(event.which===32||event.which===13)mouseclick=false;};document.addEventListener("keyup",onDocumentKeyUp);function touch_start(e)
{if(eventlock==="")eventlock="touch";if(eventlock==="touch"){mouse_event();}}
document.addEventListener("touchstart",touch_start);function touch_end(e)
{if(eventlock==="touch")mouseup_event();}
document.addEventListener("touchend",touch_end);function mouseDown(event)
{if(eventlock==="")eventlock="mouse";if(eventlock==="mouse")mouse_event();}
document.addEventListener("mousedown",mouseDown);function mouseUp(event)
{if(eventlock==="mouse")mouseup_event();}
document.addEventListener("mouseup",mouseUp);window.addEventListener("contextmenu",function(e)
{if(cut!==CUT_PAUSEMENU)e.preventDefault();},false);