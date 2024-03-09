"use strict";const chunkwidth=50;const ASCEND_ROAD=1;const ASCEND_ROADLIGHT=5;const ASCEND_TREE=20;const ASCEND_BUSH=30;const ASCEND_GRASS=40;const ASCEND_HOUSE=50;const ASCEND_SKYSCRAPER=60;const ASCEND_BARN=70;const CHUNK_DONOTHING=0;const CHUNK_SHOW=1;const CHUNK_HIDE=2;var scene=new THREE.Scene();scene.background=new THREE.Color(0x44AAFF);var camera_main=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,2,125);var camera_splashscreen=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,125);var camera_cutscene=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,125);var camera=camera_main;var renderer;var light=new THREE.AmbientLight(0xFFFFD5,1.31);scene.add(light);scene.fog=new THREE.Fog();var loader=new THREE.TextureLoader();var roadblock_x;var roadblock_z;var checkstep_x=new Array();var checkstep_z=new Array();var mat_roadlights;var mat_trees;var mat_bushes;var mat_grass;var mat_terrain;var mat_houses;var mat_skyscrapers;var mat_barns;var mat_skybox=new THREE.MeshLambertMaterial({map:loader.load("files/blue.jpg"),side:THREE.BackSide});var mat_skybox2=new THREE.MeshLambertMaterial({map:loader.load("files/starry.jpg"),side:THREE.BackSide});var mat_cloudbox=new THREE.MeshLambertMaterial({map:loader.load("files/clouds.png"),side:THREE.DoubleSiide,transparent:true});mat_skybox.map.wrapS=THREE.MirroredRepeatWrapping;mat_skybox.map.wrapT=THREE.MirroredRepeatWrapping;mat_skybox.map.repeat.set(8,4);mat_skybox2.map.wrapS=THREE.MirroredRepeatWrapping;mat_skybox2.map.wrapT=THREE.MirroredRepeatWrapping;mat_skybox2.map.repeat.set(8,4);var geometry_skybox;var geometry_cloudbox;var mesh_skybox;var mesh_cloudbox;var area_water;var mat_water=new THREE.MeshLambertMaterial({map:loader.load("files/texture_water_2.jpg")});mat_water.map.repeat.set(96,168);mat_water.map.wrapS=THREE.RepeatWrapping;mat_water.map.wrapT=THREE.RepeatWrapping;mat_water.alphaTest=0.5;mat_water.transparent=true;mat_water.opacity=0.9;var water_animate;var cloudbox_animate;var sealevel=-1;var highness;var wideness;var start_chunk_x;var start_chunk_z;var start_x=new Array();var start_z=new Array();var params={};var parser=document.createElement('a');parser.href=window.location;var query=parser.search.substring(1);var vars=query.split('&');for(var i=0;i<vars.length;i++)
{var pair=vars[i].split('=');var key=decodeURIComponent(pair[0]);var value=decodeURIComponent(pair[1]);if(typeof params[key]==='undefined')params[key]=value;else if(Array.isArray(params[key]))params[key].push(value);else params[key]=[params[key],value];}
var cookie_x=parseInt(params.x);var cookie_z=parseInt(params.z);if(cookie_x>=0&&cookie_z>=0)
{start_chunk_x=cookie_x;start_chunk_z=cookie_z;}
else if(document.cookie.search("cookie_x3=")!==-1&&document.cookie.search("cookie_z3=").length!==-1)
{let kaka_x1=document.cookie.split("cookie_x3=");let kaka_x2=kaka_x1[1].split(";");start_chunk_x=parseInt(kaka_x2[0]);let kaka_z1=document.cookie.split("cookie_z3=");let kaka_z2=kaka_z1[1].split(";");start_chunk_z=parseInt(kaka_z2[0]);}
else
{start_chunk_x=34;start_chunk_z=37;}
var ci1;var cj1;var last_chunk_x=0;var last_chunk_z=0;var frame_counter;var blackintro_frame_counter;var main_loop_counter;var chunk_process=new Array();var chunk_process_x;var chunk_process_z;for(chunk_process_x=0;chunk_process_x<46;chunk_process_x++)
{chunk_process[chunk_process_x]=new Array();for(chunk_process_z=0;chunk_process_z<46;chunk_process_z++)
{chunk_process[chunk_process_x][chunk_process_z]=0;}}
chunk_process_x=0;chunk_process_z=0;var to_load_chunk_x=new Array();var to_load_chunk_z=new Array();for(let t=0;t<25;t++)
{to_load_chunk_x[t]=21;to_load_chunk_z[t]=21;}
var dynload_hm_to_load_i=0;var dynload_objects_to_load_i=0;var continue_create=0;var continue_create2=0;var continue_create3=0;var continue_createb=0;var continue_create2b=0;var continue_create3b=0;var nextpart_start=0;var dynload_objects_skipping=0;var dynload_height_skipping=0;var i_continue=0;var j_continue=0;var i_continueb=0;var j_continueb=0;var profile=[77,80,84,88,92,96,101,104,108,112,115,118,120,123,126,129,131,133,134,134,133,133,131,130,129,126,123,122,122,122,123,125,126,130,134,137,137,138,138,137,135,133,129,123,118,111,105,101,97,93,90,86,82,78,74,71,69,67,67,67,66,67,69,71,73,74,73,73,71,69,66,62,58,54,52,52,54,55,58,59,62,63,63,65,65,65,66,66,67,69,70,73,77,80,82,85,88,90,93,95,96,96,96,96,93,92,90,85,80,75,71,67,63,60,58,55,52,50,47,44,43,41,40,39,36,35,33,32,30,28,24,20,15,11,7,3,2,2,2,2,2,2,3,6,7,10,11,15,18,22,24,25,25,26,26,25,25,25,25,25,26,28,29,30,33,36,37,39,39,40,40,40,39,39,39,37,37,37,36,36,36,35,35,33,33,32,30,28,25,20,15,11,10,9,9,9,9,11,14,15,17,17,18,18,18,18,18,18,17,17,17,15,14,13,11,11,10,10,10,11,13,14,17,20,22,25,28,30,35,39,41,45,50,58,63,69,73,77,80,82,84,84,85,85,84,84,82,81,80,75,73,71,71,73,74,75];var profile_star=[14,18,42,47,47,51,55,8,63,14,15,2,21,23,29,3,34,36,38,40,42,5,6,9];var profile_weird=[2,3,5,6,8,12,12,12,5,4,5,4,3,2,3,5,6,8,7,4,3,5,4,5,4,3,2,3,5,6,8,12,12,12,5,4,5,4,3,2,2,3,5,6,8,12,12,12,5,4,5,4,3,2,3,5,6,8,7,4,3,5,4,5,4,3,2,3,5,6,8,12,12,12,5,4,5,4,3,2,2,3,5,6,8,12,12,12,5,4,5,4,3,2,3,5,6,8,7,4,3,5,4,5,4,3,2,3,5,6,8,12,12,12,5,4,5,4,3,2,2,3,5,6,8,12,12,12,5,4,5,4,3,2,3,5,6,8,7,4,3,5,4,5,4,3,2,3,5,6,8,12,12,12,5,4,5,4,3,2,2,3,5,6,8,12,12,12,5,4,5,4,3,2,3,5,6,8,7,4,3,5,4,5,4,3,2,3,5,6,8,12,12,12,5,4,5,4,3,2,2,3,5,6,8,12,12,12,5,4,5,4,3,2,3,5,6,8,7,4,3,5,4,5,4,3,2,3,5,6,8,12,12,12,5,4,5,4,3,2,2,6,9,5,1,4,12,2,2,2,5,11,13,7,5,6];var a,b,c,d,e;var da,db,dc,dd,de;var ta,tb,tc,td,te;var dta,dtb,dtc,dtd,dte;var seed;var weights_seed;var master;var master2;var change4;var change5;var hm=new Array();var chunkmap=new Array();var om=new Array();var hm_is_loaded=new Array();var objects_is_loaded=new Array();var large_arrays_is_created=new Array();var mesh_terrain=new Array();var mesh_houses=new Array();var mesh_skyscrapers=new Array();var mesh_barns=new Array();var mesh_roads=new Array();var pointsprites_roadlights=new Array();var pointsprites_trees=new Array();var pointsprites_bushes=new Array();var pointsprites_grass=new Array();var ver_terrain=[];var ver_houses=[];var ver_skyscrapers=[];var ver_barns=[];var ver_roads=[];var ver_roadlights=[];var ver_trees=[];var ver_bushes=[];var ver_grass=[];var ver_rain=[];var ver_fume=[];var ver_aker=[];var pointsprites_rain;var pointsprites_snow;var pointsprites_fume;var pointsprites_aker;var geometry_rain;var geometry_aker;var mat_rain;var mat_snow;var mat_fume;var mat_aker;var uv_terrain=new Float32Array(28812);var uv_roads=new Float32Array(8400);var uv_houses=new Float32Array(30000);var normals=new Float32Array(28812);let _1D49=1/49;for(let uvi=0;uvi<28812;uvi+=12)
{let current_line=Math.floor(uvi/(49*12));let uviD12Mcurrent_lineX49=uvi/12-current_line*49;uv_terrain[uvi]=(_1D49+(_1D49)*(uviD12Mcurrent_lineX49));uv_terrain[uvi+1]=(current_line*(_1D49));uv_terrain[uvi+2]=((_1D49)*(uviD12Mcurrent_lineX49));uv_terrain[uvi+3]=(_1D49+current_line*(_1D49));uv_terrain[uvi+4]=((_1D49)*(uviD12Mcurrent_lineX49));uv_terrain[uvi+5]=(current_line*(_1D49));uv_terrain[uvi+6]=(_1D49+(_1D49)*(uviD12Mcurrent_lineX49));uv_terrain[uvi+7]=(current_line*(_1D49));uv_terrain[uvi+8]=(_1D49+(_1D49)*(uviD12Mcurrent_lineX49));uv_terrain[uvi+9]=(_1D49+current_line*(_1D49));uv_terrain[uvi+10]=(_1D49*(uviD12Mcurrent_lineX49));uv_terrain[uvi+11]=(_1D49+current_line*(_1D49));normals[uvi]=0.05;normals[uvi+1]=0.05;normals[uvi+2]=0.05;normals[uvi+3]=0.05;normals[uvi+4]=0.05;normals[uvi+5]=0.05;normals[uvi+6]=0.05;normals[uvi+7]=0.05;normals[uvi+8]=0.05;normals[uvi+9]=0.05;normals[uvi+10]=0.05;normals[uvi+11]=0.05;}
for(let uvi=0;uvi<8400;uvi+=12)
{uv_roads[uvi]=0+uvi;uv_roads[uvi+1]=1+uvi;uv_roads[uvi+2]=1+uvi;uv_roads[uvi+3]=0+uvi;uv_roads[uvi+4]=0+uvi;uv_roads[uvi+5]=0+uvi;uv_roads[uvi+6]=1+uvi;uv_roads[uvi+7]=1+uvi;uv_roads[uvi+8]=0+uvi;uv_roads[uvi+9]=1+uvi;uv_roads[uvi+10]=0+uvi;uv_roads[uvi+11]=0+uvi;}
for(let uvi=0;uvi<30000;uvi+=84)
{for(let t=0;t<4;t++)
{uv_houses[uvi+12*t]=0.5;uv_houses[uvi+12*t+1]=0;uv_houses[uvi+12*t+2]=1;uv_houses[uvi+12*t+3]=0;uv_houses[uvi+12*t+4]=1;uv_houses[uvi+12*t+5]=13;uv_houses[uvi+12*t+6]=1;uv_houses[uvi+12*t+7]=13;uv_houses[uvi+12*t+8]=0.5;uv_houses[uvi+12*t+9]=13;uv_houses[uvi+12*t+10]=0.5;uv_houses[uvi+12*t+11]=0;}
uv_houses[uvi+48]=0.5;uv_houses[uvi+49]=0;uv_houses[uvi+50]=0;uv_houses[uvi+51]=0;uv_houses[uvi+52]=0;uv_houses[uvi+53]=0.5;uv_houses[uvi+54]=0;uv_houses[uvi+55]=0.5;uv_houses[uvi+56]=0.5;uv_houses[uvi+57]=0.5;uv_houses[uvi+58]=0.5;uv_houses[uvi+59]=0;uv_houses[uvi+60]=0.5;uv_houses[uvi+61]=0.5;uv_houses[uvi+62]=0;uv_houses[uvi+63]=0.5;uv_houses[uvi+64]=0;uv_houses[uvi+65]=1;uv_houses[uvi+66]=0;uv_houses[uvi+67]=1;uv_houses[uvi+68]=0.5;uv_houses[uvi+69]=1;uv_houses[uvi+70]=0.5;uv_houses[uvi+71]=0.5;uv_houses[uvi+72]=0;uv_houses[uvi+73]=0;uv_houses[uvi+74]=0.25;uv_houses[uvi+75]=0.5;uv_houses[uvi+76]=0.5;uv_houses[uvi+77]=0;uv_houses[uvi+78]=0.5;uv_houses[uvi+79]=0;uv_houses[uvi+80]=0.25;uv_houses[uvi+81]=0.5;uv_houses[uvi+82]=0;uv_houses[uvi+783]=0;}
var uv_attribute_terrain=new THREE.BufferAttribute(new Float32Array(uv_terrain),2);var uv_attribute_roads=new THREE.BufferAttribute(new Float32Array(uv_roads),2);var uv_attribute_houses=new THREE.BufferAttribute(new Float32Array(uv_houses),2);var normals_attribute=new THREE.BufferAttribute(new Float32Array(normals),2);normals=new Float32Array(0);uv_terrain=new Float32Array(0);uv_roads=new Float32Array(0);uv_houses=new Float32Array(0);function hexcol(fobject,hex)
{fobject.r=(hex>>16&255)/255;fobject.g=(hex>>8&255)/255;fobject.b=(hex&255)/255;}
function x_to_chunk_no(x){return Math.floor(x/49);}
function x_to_x_in_chunk(x){return x-(x_to_chunk_no(x)*49);}
function x_in_chunk_to_x(fi1,fi){return 49*fi1+fi;}
function distance_get_xz(fx1,fz1,fx2,fz2){return Math.sqrt((fx2-fx1)*(fx2-fx1)+(fz2-fz1)*(fz2-fz1));}
function distance_get_oval_xz(fx1,fz1,fx2,fz2,factorx,factorz){return Math.sqrt((fx2-fx1)*(fx2-fx1)*factorx+(fz2-fz1)*(fz2-fz1)*factorz);}
function distance_get(fobject1,fobject2){return Math.sqrt((fobject2.position.x-fobject1.position.x)*(fobject2.position.x-fobject1.position.x)+(fobject2.position.z-fobject1.position.z)*(fobject2.position.z-fobject1.position.z));}
function height_get_xz(x,z)
{let x_floor=Math.floor(x);let z_floor=Math.floor(z);return hm[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];}
function height_get_xz_exact(x,z)
{let p_xf=Math.floor(x),p_zf=Math.floor(z);let p_xc=Math.ceil(x),p_zc=Math.ceil(z);let p_xd=x-p_xf,p_zd=z-p_zf;let p_value;let ixf=x_to_chunk_no(p_xf),izf=x_to_chunk_no(p_zf);let ixc=x_to_chunk_no(p_xf+1),izc=x_to_chunk_no(p_zf+1);let xf=x_to_x_in_chunk(p_xf),zf=x_to_x_in_chunk(p_zf);let xc=x_to_x_in_chunk(p_xf+1),zc=x_to_x_in_chunk(p_zf+1);if(p_xd+p_zd<1)
{if(hm_is_loaded[x_to_chunk_no(p_xf)][x_to_chunk_no(p_zf)]===1)
{if(hm[ixf][izf][xf][zf]===undefined)throw new Error("ixf = "+ixf+", izf = "+izf+", xf = "+xf+", zf = "+zf);else p_value=(1-p_xd-p_zd)*hm[ixf][izf][xf][zf]+p_zd*hm[ixf][izc][xf][zc]+p_xd*hm[ixc][izf][xc][zf];}
else return 1;}
else
{if(hm_is_loaded[x_to_chunk_no(p_xc)][x_to_chunk_no(p_zc)]===1)
{p_value=(p_xd+p_zd-1)*hm[ixc][izc][xc][zc]+(1-p_zd)*hm[ixc][izf][xc][zf]+(1-p_xd)*hm[ixf][izc][xf][zc];}
else return 1;}
return p_value+0.3;}
function height_get(fobject)
{return height_get_xz_exact(fobject.position.x,fobject.position.z);}
function object_get(object)
{let x_floor=Math.floor(object.position.x),z_floor=Math.floor(object.position.z);let object_code=om[x_to_chunk_no(x_floor)][x_to_chunk_no(z_floor)][x_to_x_in_chunk(x_floor)][x_to_x_in_chunk(z_floor)];return object_code;}
function pseudorandom(number){return 29.197483*number-Math.floor(29.197483*number);}
function grelf(){return profile[a&0xFF]+profile[b&0xFF]+profile[c&0xFF]+profile[d&0xFF]+profile[e&0xFF];}
function grelf3(){return profile[c&0xFF]+profile[a&0xFF]+(-profile[d&0xFF])+profile[e&0xFF]+(-profile[b&0xFF]);}
function grelf_detail(){return profile[da&0xFF]+profile[db&0xFF]+profile[dc&0xFF]+profile[dd&0xFF]+profile[de&0xFF];}
function grelf_detail2(){return profile[dd&0x31]+profile[dc&0x21]+profile[db&0x11]+profile[de&0x3]+profile[da&0x3];}
function grelf_objects(){return profile[da/2&0xF]+profile[db&0xFF]+profile[dc/2&0xF]+profile[dd/2&0xF]+profile[de/2&0xF];}
function grelf_objects_detail(){return profile[(dta*2)&0xF]+profile[(dtb*2)&0xF]+profile[(dtc*2)&0xF]+profile[(dtd*2)&0xF]+profile[(dte*2)&0xF];}
function grelf_houses(){return 2*profile[a&0xFF]-profile[c&0xFF]-3*profile[d&0xFF];}
function grelf_weird(){return profile_weird[c&0xFF]+profile_weird[a&0xFF]+(-profile_weird[d&0xFF])+profile_weird[e&0xFF]+(-profile_weird[b&0xFF]);}
function set_wideness_highness(fi1,fj1)
{if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35)){highness=95;wideness=25;seed=0.6511030308479817;weights_seed=3;}
else if((fi1>=33&&fi1<=35)&&(fj1>=33&&fj1<=35)){highness=110;wideness=3;seed=0.6514484815558458;weights_seed=2;}
else if((fi1>=36&&fi1<=41)&&(fj1>=27&&fj1<=32)){highness=200;wideness=0.05;seed=0.6511030308479817;weights_seed=2;}
else if((fi1>=33&&fi1<=35)&&(fj1>=28&&fj1<=32)){highness=25;wideness=3;seed=0.77783324;weights_seed=2;}
else if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38)){highness=15;wideness=4;seed=0.6602099002976599;weights_seed=2;}
else if((fi1>=29&&fi1<=30)&&(fj1>=35&&fj1<=40)){highness=25;wideness=1.5;seed=0.6511030308479817;weights_seed=2;}
else if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41)){highness=20;wideness=3;seed=0.6511030308479817;weights_seed=2;}
else if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41)){highness=38;wideness=6;seed=0.6511030308479817;weights_seed=3;}
else if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34)){highness=21;wideness=3;seed=0.6511030308479817;weights_seed=2;}
else if(fi1===32&&fj1===35){highness=10;wideness=5;seed=0.6511030308479817;weights_seed=2;}
else if(fi1===31&&fj1===35){highness=30;wideness=3.8;seed=0.6511030308479817;weights_seed=2;}
else if(fi1===31&&fj1===38){highness=30;wideness=3.8;seed=0.6511030308479817;weights_seed=2;}
else if(fi1===28&&fj1===33){highness=28;wideness=7;seed=0.8126634736;weights_seed=1;}
else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41)){highness=28;wideness=7;seed=0.8126634736;weights_seed=1;}
else if((fi1>=26&&fi1<=30)&&fj1===41){highness=28;wideness=7;seed=0.8126634736;weights_seed=1;}
else if((fi1>=26&&fi1<=27)&&(fj1>=26&&fj1<=31)){highness=25;wideness=1;seed=0.77783324;weights_seed=1;}
else{highness=0;wideness=0;seed=0.6511030308479817;weights_seed=2;}
master=(((seed*10-Math.floor(seed*10))*30)/9+1)*0.5;master2=(seed*111-Math.floor(seed*111))*20;change4=seed*21-Math.floor(seed*21);change5=seed*17-Math.floor(seed*17);}
function set_weights(fi1,fj1,fi,fj)
{let fx=fi1*50+fi;let fz=fj1*50+fj;if(fi===49)fx++;if(fj===49)fz++;let fxXwideness=fx*wideness;let _12XfxXwideness=12*fxXwideness;let fzXwideness=fz*wideness;let master2XfzXwideness=master2*fzXwideness;a=((weights_seed&2)*_12XfxXwideness+(weights_seed&6)*4.2*master2XfzXwideness)*0.01;b=((weights_seed&7)*12.6*fxXwideness+(weights_seed&4)*master2XfzXwideness*0.6)*0.01;c=((weights_seed&4)*_12XfxXwideness+(weights_seed&9)*12*change4*master2XfzXwideness)*0.01;d=((weights_seed&8)*12.6*fxXwideness+(weights_seed&1)*12*change5*master2XfzXwideness)*0.01;e=((weights_seed&3)*_12XfxXwideness+(weights_seed&5)*6.6*master2XfzXwideness)*0.01;let fxXwidenessX0_1=fx*wideness*0.1;da=(weights_seed&4)*(master2+1)*fxXwidenessX0_1+(weights_seed&3)*0.7*fzXwideness;db=(weights_seed&1)*(1-master2)*fxXwidenessX0_1+(weights_seed&4)*1.1*fzXwideness;dc=(weights_seed&3)*(master2+8)*fxXwidenessX0_1+(weights_seed&2)*1.4*fzXwideness;dd=(weights_seed&5)*(master2*1)*fxXwidenessX0_1+(weights_seed&3)*1.3*fzXwideness;de=(weights_seed&6)*(5/master2)*fxXwidenessX0_1+(weights_seed&3)*1.1*fzXwideness;let fzXwidenessX0_6=fzXwideness*0.6;let masterPmaster2XfzXwidenessX0_6=(master+master2)*fzXwidenessX0_6;ta=1.8*fxXwideness+1.2*masterPmaster2XfzXwidenessX0_6;tb=2.4*fxXwideness+0.6*(master-master2)*fzXwidenessX0_6;tc=3*fxXwideness+14.4*masterPmaster2XfzXwidenessX0_6;td=3.6*fxXwideness+1.8*(master-master2)*fzXwidenessX0_6;te=4.2*fxXwideness+12.6*masterPmaster2XfzXwidenessX0_6;dta=1.2*fxXwideness+1.8*fzXwideness;dtb=0.6*fxXwideness+2.4*fzXwideness;dtc=14.4*fxXwideness+3*fzXwideness;dtd=1.8*fxXwideness+3.6*fzXwideness;dte=12.6*fxXwideness+4.2*fzXwideness;}
function calculate_chunklevel(fi1,fj1,fi,fj)
{let p_x=fi*0.02,p_z=fj*0.02;let p_value;if(p_x+p_z<1)
{p_value=(1-p_x-p_z)*chunkmap[fi1][fj1]+p_z*chunkmap[fi1][fj1+1]+p_x*chunkmap[fi1+1][fj1];}
else
{p_value=(p_x+p_z-1)*chunkmap[fi1+1][fj1+1]+(1-p_z)*chunkmap[fi1+1][fj1]+(1-p_x)*chunkmap[fi1][fj1+1];}
return p_value;}
function add_road_block(fx,fz)
{let xj1mm=x_to_chunk_no(fz-2);let xj1m=x_to_chunk_no(fz-1);let xj1=x_to_chunk_no(fz);let xj1p=x_to_chunk_no(fz-1);let xj12=x_to_chunk_no(fz+2);let xj13=x_to_chunk_no(fz+3);let xi1=x_to_chunk_no(fx-2);if(om[xi1][xj1mm][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz-2)]!==ASCEND_ROAD)om[xi1][xj1mm][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz-2)]=ASCEND_ROADLIGHT;if(om[xi1][xj1m][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz-1)]!==ASCEND_ROAD)om[xi1][xj1m][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz-1)]=ASCEND_ROADLIGHT;if(om[xi1][xj1][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz)]!==ASCEND_ROAD)om[xi1][xj1][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz)]=ASCEND_ROADLIGHT;if(om[xi1][xj1p][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz+1)]!==ASCEND_ROAD)om[xi1][xj1p][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz+1)]=ASCEND_ROADLIGHT;if(om[xi1][xj12][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz+2)]!==ASCEND_ROAD)om[xi1][xj12][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz+2)]=ASCEND_ROADLIGHT;if(om[xi1][xj13][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz+3)]!==ASCEND_ROAD)om[xi1][xj13][x_to_x_in_chunk(fx-2)][x_to_x_in_chunk(fz+3)]=ASCEND_ROADLIGHT;xi1=x_to_chunk_no(fx-1);if(om[xi1][xj1mm][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz-2)]!==ASCEND_ROAD)om[xi1][xj1mm][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz-2)]=ASCEND_ROADLIGHT;if(om[xi1][xj13][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+3)]!==ASCEND_ROAD)om[xi1][xj13][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+3)]=ASCEND_ROADLIGHT;xi1=x_to_chunk_no(fx);if(om[xi1][xj1mm][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz-2)]!==ASCEND_ROAD)om[xi1][xj1mm][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz-2)]=ASCEND_ROADLIGHT;if(om[xi1][xj13][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+3)]!==ASCEND_ROAD)om[xi1][xj13][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+3)]=ASCEND_ROADLIGHT;xi1=x_to_chunk_no(fx+1);if(om[xi1][xj1mm][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz-2)]!==ASCEND_ROAD)om[xi1][xj1mm][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz-2)]=ASCEND_ROADLIGHT;if(om[xi1][xj13][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+3)]!==ASCEND_ROAD)om[xi1][xj13][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+3)]=ASCEND_ROADLIGHT;xi1=x_to_chunk_no(fx+2);if(om[xi1][xj1mm][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz-2)]!==ASCEND_ROAD)om[xi1][xj1mm][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz-2)]=ASCEND_ROADLIGHT;if(om[xi1][xj13][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+3)]!==ASCEND_ROAD)om[xi1][xj13][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+3)]=ASCEND_ROADLIGHT;xi1=x_to_chunk_no(fx+3);if(om[xi1][xj1mm][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz-2)]!==ASCEND_ROAD)om[xi1][xj1mm][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz-2)]=ASCEND_ROADLIGHT;if(om[xi1][xj1m][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz-1)]!==ASCEND_ROAD)om[xi1][xj1m][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz-1)]=ASCEND_ROADLIGHT;if(om[xi1][xj1][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz)]!==ASCEND_ROAD)om[xi1][xj1][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz)]=ASCEND_ROADLIGHT;if(om[xi1][xj1p][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz+1)]!==ASCEND_ROAD)om[xi1][xj1p][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz+1)]=ASCEND_ROADLIGHT;if(om[xi1][xj12][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz+2)]!==ASCEND_ROAD)om[xi1][xj12][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz+2)]=ASCEND_ROADLIGHT;if(om[xi1][xj13][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz+3)]!==ASCEND_ROAD)om[xi1][xj13][x_to_x_in_chunk(fx+3)][x_to_x_in_chunk(fz+3)]=ASCEND_ROADLIGHT;xi1=x_to_chunk_no(fx-1);om[xi1][xj1m][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz-1)]=ASCEND_ROAD;om[xi1][xj1][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz)]=ASCEND_ROAD;om[xi1][xj1p][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+1)]=ASCEND_ROAD;om[xi1][xj12][x_to_x_in_chunk(fx-1)][x_to_x_in_chunk(fz+2)]=ASCEND_ROAD;xi1=x_to_chunk_no(fx);om[xi1][xj1m][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz-1)]=ASCEND_ROAD;om[xi1][xj1][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz)]=ASCEND_ROAD;om[xi1][xj1p][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+1)]=ASCEND_ROAD;om[xi1][xj12][x_to_x_in_chunk(fx)][x_to_x_in_chunk(fz+2)]=ASCEND_ROAD;xi1=x_to_chunk_no(fx+1);om[xi1][xj1m][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz-1)]=ASCEND_ROAD;om[xi1][xj1][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz)]=ASCEND_ROAD;om[xi1][xj1p][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+1)]=ASCEND_ROAD;om[xi1][xj12][x_to_x_in_chunk(fx+1)][x_to_x_in_chunk(fz+2)]=ASCEND_ROAD;xi1=x_to_chunk_no(fx+2);om[xi1][xj1m][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz-1)]=ASCEND_ROAD;om[xi1][xj1][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz)]=ASCEND_ROAD;om[xi1][xj1p][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+1)]=ASCEND_ROAD;om[xi1][xj12][x_to_x_in_chunk(fx+2)][x_to_x_in_chunk(fz+2)]=ASCEND_ROAD;}
function race_create(x_array,z_array,number)
{mesh_checkpoint_x[number]=new Array();mesh_checkpoint_z[number]=new Array();checkstep_x[number]=new Array();checkstep_z[number]=new Array();let check_x;let check_z;let array_pos=0;let k=0;while(array_pos<x_array.length-1)
{mesh_checkpoint_x[number][k]=x_array[array_pos];mesh_checkpoint_z[number][k]=z_array[array_pos];k++;let step=0;let startpos_x=check_x;let startpos_z=check_z;check_x=x_array[array_pos];check_z=z_array[array_pos];while(distance_get_xz(check_x,check_z,startpos_x,startpos_z)>1)
{let delta_x=check_x-startpos_x;let delta_z=check_z-startpos_z;delta_x+=delta_x;delta_z+=delta_z;let delta_x_u;let delta_z_u;let delta_x_low;let delta_z_low;if(delta_x<0)delta_x_u=delta_x*-1;else delta_x_u=delta_x;if(delta_z<0)delta_z_u=delta_z*-1;else delta_z_u=delta_z;if(delta_x_u>delta_z_u)
{if(delta_z_u>1)
{delta_x_low=Math.round(delta_x/delta_z_u);if(delta_z>0)delta_z_low=1;else delta_z_low=-1;}
else
{if(delta_x>0)delta_x_low=2;else delta_x_low=-2;delta_z_low=0;}}
else
{if(delta_x_u>1)
{delta_z_low=Math.round(delta_z/delta_x_u);if(delta_x>0)delta_x_low=1;else delta_x_low=-1;}
else
{if(delta_z>0)delta_z_low=2;else delta_z_low=-2;delta_x_low=0;}}
if(delta_x_low>6)delta_x_low=6;else if(delta_x_low<-6)delta_x_low=-6;if(delta_z_low>6)delta_z_low=6;else if(delta_z_low<-6)delta_z_low=-6;if(delta_x_low>=0)roadblock_x=startpos_x+delta_x_low;else roadblock_x=startpos_x+delta_x_low;if(delta_z_low>=0)roadblock_z=startpos_z+delta_z_low;else roadblock_z=startpos_z+delta_z_low;checkstep_x[number][step]=roadblock_x;checkstep_z[number][step]=roadblock_z;step++;let xxx;let zzz;if(delta_x_low>=0)xxx=1;else xxx=-1;if(delta_z_low>=0)zzz=1;else zzz=-1;if(delta_x_low>=0)
{while(xxx<delta_x_low)
{add_road_block(startpos_x+xxx,startpos_z+zzz);mesh_checkpoint_x[number][k]=x_array[array_pos];mesh_checkpoint_z[number][k]=z_array[array_pos];k++;xxx+=2;}
xxx-=2;}
else
{while(xxx>delta_x_low)
{add_road_block(startpos_x+xxx,startpos_z+zzz);mesh_checkpoint_x[number][k]=x_array[array_pos];mesh_checkpoint_z[number][k]=z_array[array_pos];k++;xxx-=2;}
xxx+=2;}
if(delta_z_low>=0)
{while(zzz<delta_z_low)
{add_road_block(startpos_x+xxx,startpos_z+zzz);mesh_checkpoint_x[number][k]=x_array[array_pos];mesh_checkpoint_z[number][k]=z_array[array_pos];k++;zzz+=2;}
zzz-=2;}
else
{while(zzz>delta_z_low)
{add_road_block(startpos_x+xxx,startpos_z+zzz);mesh_checkpoint_x[number][k]=x_array[array_pos];mesh_checkpoint_z[number][k]=z_array[array_pos];k++;zzz-=2;}
zzz+=2;}
add_road_block(roadblock_x,roadblock_z);mesh_checkpoint_x[number][k]=x_array[array_pos];mesh_checkpoint_z[number][k]=z_array[array_pos];k++;startpos_x=roadblock_x;startpos_z=roadblock_z;}
array_pos++;}}
function terrain_amplify(fi1,fj1,fi,fj,depth)
{let power_x,power_z;if(fi<24.5)power_x=fi;else power_x=49-fi;if(fj<24.5)power_z=fj;else power_z=49-fj;hm[fi1][fj1][fi][fj]+=0.0005*power_x*power_z*(depth*100-hm[fi1][fj1][fi][fj]);}
function terrain_amplify_4chunks(fi1_start,fj1_start,fi1,fj1,fi,fj,depth,fpower)
{depth*=-1;let origo_x=(fi1_start+1)*49;let origo_z=(fj1_start+1)*49;let power_x,power_z;if(x_in_chunk_to_x(fi1,fi)<origo_x)power_x=49-(origo_x-x_in_chunk_to_x(fi1,fi));else power_x=49-(x_in_chunk_to_x(fi1,fi)-origo_x);if(x_in_chunk_to_x(fj1,fj)<origo_z)power_z=49-(origo_z-x_in_chunk_to_x(fj1,fj));else power_z=49-(x_in_chunk_to_x(fj1,fj)-origo_z);hm[fi1][fj1][fi][fj]-=fpower*0.0000005*power_x*power_x*power_z*power_z*(depth*100-hm[fi1][fj1][fi][fj]);}
function terrain_make_plains(fi1,fj1,fi,fj,base)
{if(hm[fi1][fj1][fi][fj]<base)
{hm[fi1][fj1][fi][fj]=base+hm[fi1][fj1][fi][fj]*0.5;if(hm[fi1][fj1][fi][fj]-base>0.5)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.05;else if(hm[fi1][fj1][fi][fj]-base>1)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.1;else if(hm[fi1][fj1][fi][fj]-base>1.5)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.15;else if(hm[fi1][fj1][fi][fj]-base>2)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.2;else if(hm[fi1][fj1][fi][fj]-base>2.5)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.25;else if(hm[fi1][fj1][fi][fj]-base>3)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.3;else if(hm[fi1][fj1][fi][fj]-base>3.5)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.35;else if(hm[fi1][fj1][fi][fj]-base>4)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.4;else if(hm[fi1][fj1][fi][fj]-base>4.5)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.45;else if(hm[fi1][fj1][fi][fj]-base>5)hm[fi1][fj1][fi][fj]=base+(hm[fi1][fj1][fi][fj]-base)*0.5;}}
function calculate_height(fi1,fj1,fi,fj)
{if(wideness===0&&highness===0)
{let fx=fi1*50+fi;let fz=fj1*50+fj;if(fi===49)fx++;if(fj===49)fz++;let fxXwideness=fx*6;let _12XfxXwideness=12*6;let fzXwideness=fz*6;let master2XfzXwideness=5.448728*fzXwideness;a=((3&2)*_12XfxXwideness+(3&6)*4.2*master2XfzXwideness)*0.01;b=((3&7)*12.6*fxXwideness+(3&4)*master2XfzXwideness*0.6)*0.01;c=((3&4)*_12XfxXwideness+(3&9)*12*0.67316*master2XfzXwideness)*0.01;d=((3&8)*12.6*fxXwideness+(3&1)*12*0.06875*master2XfzXwideness)*0.01;e=((3&3)*_12XfxXwideness+(3)*6.6*master2XfzXwideness)*0.01;let grelftemp=profile[a&0xFF]+profile[b&0xFF]-profile[c&0xFF]+3*profile[d&0xFF]+profile[e&0xFF];hm[fi1][fj1][fi][fj]=sealevel-6+0.5-0.004*grelftemp;}
else
{let vgrelf=grelf();let vgrelf3=grelf3();hm[fi1][fj1][fi][fj]=vgrelf3*highness*0.005;let vgrelf_detail2=grelf_detail2();let vgrelf_detail=grelf_detail();if(master2>5){hm[fi1][fj1][fi][fj]+=vgrelf_detail*highness*0.004;}
else{hm[fi1][fj1][fi][fj]+=vgrelf_detail2*highness*0.001;}
let factor_chunkmap;if(fi===49&&fj===49)factor_chunkmap=calculate_chunklevel(fi1+1,fj1+1,0,0);else if(fi===49)factor_chunkmap=calculate_chunklevel(fi1+1,fj1,0,fj);else if(fj===49)factor_chunkmap=calculate_chunklevel(fi1,fj1+1,fi,0);else factor_chunkmap=calculate_chunklevel(fi1,fj1,fi,fj);if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35))
{hm[fi1][fj1][fi][fj]-=100;terrain_make_plains(fi1,fj1,fi,fj,80);terrain_amplify(fi1,fj1,fi,fj,1+(3*(pseudorandom(fi1+fj1)-0.5)));if(fi1===37&&fj1===34)terrain_amplify(fi1,fj1,fi,fj,30);if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35))hm[fi1][fj1][fi][fj]*=(0.17*factor_chunkmap);if(fi1===38&&fj1===34)
{if(distance_get_xz(fi,fj,18,33)<10)hm[fi1][fj1][fi][fj]=1;}
if((fi1===36&&fj1===34)&&(fj>22&&fj<28))hm[fi1][fj1][fi][fj]-=2;if((fi1===37&&fj1===34)&&(fj>22&&fj<28))hm[fi1][fj1][fi][fj]-=2;if((fi1===38&&fj1===34)&&(fj>22&&fj<28&&fi<5))hm[fi1][fj1][fi][fj]-=2;if(fi1===38&&fj1===33)
{if(distance_get_xz(fi,fj,21,38)<9)hm[fi1][fj1][fi][fj]*=2;}
if(fi1===38&&fj1===33)
{if(fi>18&&fi<22&&fj>40&&fj<48)hm[fi1][fj1][fi][fj]-=0.4*distance_get_xz(fi,fj,20,40);}
if((fi1===37&&fj1===34)&&(fi>=2&&fi<=11&&fj>=23&&fj<=26))hm[fi1][fj1][fi][fj]+=10-fi;if((fi1===39&&fj1===35)&&(fi>=5&&fi<=12&&fj>=5&&fj<=20))hm[fi1][fj1][fi][fj]+=(fj-5)*0.6;if((fi1===37&&fj1===35)&&fj>=27&&(fi%3===1&&fj%4===1))hm[fi1][fj1][fi][fj]+=10;if(fi1===36)hm[fi1][fj1][fi][fj]-=0.005*(chunkwidth-fi)*(chunkwidth-fi);if(fi1===39)hm[fi1][fj1][fi][fj]-=0.005*fi*fi;if(fj1===33)hm[fi1][fj1][fi][fj]-=0.007*(chunkwidth-fj)*(chunkwidth-fj);if(fj1===35)hm[fi1][fj1][fi][fj]-=0.007*fj*fj;if((fi1===37&&fj1===35)&&(fj>20&&fj<=35&&fi>27&&fi<32))hm[fi1][fj1][fi][fj]=sealevel+0.5;if((fi1===37&&fj1===35)&&(fj>35&&fj<49&&fi>20&&fi<40))hm[fi1][fj1][fi][fj]=sealevel+1;if(hm[fi1][fj1][fi][fj]<sealevel-0.5&&fi%5*pseudorandom(fi1+fi+fj)>1&&fj%3*pseudorandom(fi1+fj*fj)&&vgrelf_detail>350&&fi>1&&fi<48&&fj>1&&fj<48)
{hm[fi1][fj1][fi][fj]=sealevel+0.2;}
if(fi1===36&&fi<2)hm[fi1][fj1][fi][fj]-=20;}
else if((fi1>=33&&fi1<=35)&&(fj1>=33&&fj1<=35))
{hm[fi1][fj1][fi][fj]-=110;hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);if(fj1===34)
{if(hm[fi1][fj1][fi][fj]>sealevel+30||hm[fi1][fj1][fi][fj]<sealevel-16)hm[fi1][fj1][fi][fj]=sealevel+0.25;else hm[fi1][fj1][fi][fj]=sealevel-1.5;if(fi1===33)
{if(fi%8>=4&&fj%18>=18-18*pseudorandom(fj-fi))hm[fi1][fj1][fi][fj]=sealevel+0.25;if(fi%3===0+Math.floor(3*pseudorandom(fj))&&fj%3===0+Math.floor(3*pseudorandom(fi)))hm[fi1][fj1][fi][fj]=sealevel+1.25;}
else if(fi1===34)
{if(fi%6>=4-(fj%3)&&fj%8>=5-(fi%4))hm[fi1][fj1][fi][fj]=sealevel+0.25;}
if(fi1===34||fi1===35)
{if(fj>35)hm[fi1][fj1][fi][fj]+=0.2*(fj-35)+0.001*vgrelf;else if(fj<15)hm[fi1][fj1][fi][fj]+=0.2*(15-fj)+0.001*vgrelf3;}}
else
{hm[fi1][fj1][fi][fj]-=60;hm[fi1][fj1][fi][fj]*=0.1;}
if(fj1===34)
{if(fj<7)hm[fi1][fj1][fi][fj]-=0.05*(12-fj)*(12-fj);if(fj>42)hm[fi1][fj1][fi][fj]-=0.05*(fj-37)*(fj-37);}
else
{if(fj1===33)
{if(fj>47)hm[fi1][fj1][fi][fj]-=0.05*(fj-40)*(fj-40)*(fj-40);}
if(fj1===35)
{if(fj<3)hm[fi1][fj1][fi][fj]-=0.05*(10-fj)*(10-fj)*(10-fj);}}
if(fi1===33&&fi<9)hm[fi1][fj1][fi][fj]-=0.05*(9-fi)*(9-fi)*(9-fi);if(fi1===35&&fi>chunkwidth-9)hm[fi1][fj1][fi][fj]-=0.05*(fi-41)*(fi-41)*(fi-41);if(fj1===33&&fj<9)hm[fi1][fj1][fi][fj]-=0.05*(9-fj)*(9-fj)*(9-fj);if(fj1===35&&fj>chunkwidth-9)hm[fi1][fj1][fi][fj]-=0.05*(fj-41)*(fj-41)*(fj-41);if(fj1===35&&fj>chunkwidth-4)hm[fi1][fj1][fi][fj]=vgrelf3*0.01-8;}
else if((fi1>=36&&fi1<=41)&&(fj1>=27&&fj1<=32))
{hm[fi1][fj1][fi][fj]-=340;hm[fi1][fj1][fi][fj]*=-1.5;hm[fi1][fj1][fi][fj]-=200;if(fj1<=30||(fj1===31&&fj<8))hm[fi1][fj1][fi][fj]+=30;terrain_make_plains(fi1,fj1,fi,fj,25);if(fi1===36)hm[fi1][fj1][fi][fj]-=1.5*(49-fi);if(fi1===39)hm[fi1][fj1][fi][fj]-=1.5*fi;if(fj1===28)hm[fi1][fj1][fi][fj]-=1.5*(49-fj);if(fj1===32)hm[fi1][fj1][fi][fj]-=1.5*fj;hm[fi1][fj1][fi][fj]=2*Math.floor(0.5*hm[fi1][fj1][fi][fj]);if(fj1===31&&fj>=2&&fj<=21)hm[fi1][fj1][fi][fj]=sealevel-2;if(((fi1===37&&fj1===29&&fj<45)&&hm[fi1][fj1][fi][fj]<=3)||((fi1===37&&fj1===28&&fj>46)&&hm[fi1][fj1][fi][fj]<=3))
{if(fi%13===2||fi%13===3||fi%13===4||fi%13===5)hm[fi1][fj1][fi][fj]=3;}
if((fi1===37&&fj1===28)&&fj<43&&fj>3&&fi>3&&fi<46)hm[fi1][fj1][fi][fj]=sealevel+1;if((fi1===37&&fj1===27))
{terrain_make_plains(fi1,fj1,fi,fj,5);hm[fi1][fj1][fi][fj]+=7;if(fj>=47)hm[fi1][fj1][fi][fj]-=0.5*(fj-40)*(fj-40);if(fi>=47)hm[fi1][fj1][fi][fj]-=20;}
if((fi1===38&&fj1===27)||(fi1===39&&fj1===27))
{terrain_make_plains(fi1,fj1,fi,fj,5);hm[fi1][fj1][fi][fj]+=2;}
if(fi1===39&&fj1===27)
{hm[fi1][fj1][fi][fj]+=(0.8*fi);}
if(fi1===38&&fj1===28)
{let mdist=distance_get_xz(fi,fj,24,22);if(mdist<17)hm[fi1][fj1][fi][fj]=vgrelf-0.5*mdist-467;if(fi>=42&&fi<=47&&fj<25)hm[fi1][fj1][fi][fj]=-0.7;}
if(fi1>=39&&fi1<=41&&fj1>=28&&fj1<=30)
{if(fi1===40&&fj1===29)
{let planety=Math.sqrt(23*23-(fi-25)*(fi-25)-(fj-25)*(fj-25))-5;if(planety>sealevel-1)hm[fi1][fj1][fi][fj]=planety;else hm[fi1][fj1][fi][fj]=sealevel-12;}
hm[fi1][fj1][fi][fj]=sealevel-12;}
if(fi1===38&&fj1>=29&&fj1<=31)
{if(fi>=43)hm[fi1][fj1][fi][fj]-=0.1*(fi-43)*(fi-43)*(fi-43);}
if(fi1===39&&fj1===31)hm[fi1][fj1][fi][fj]=-5;}
else if((fi1>=33&&fi1<=35)&&(fj1>=28&&fj1<=32))
{hm[fi1][fj1][fi][fj]-=45;hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);hm[fi1][fj1][fi][fj]+=1.4;if((fi1===35&&fj1===30)&&fj>4&&fj<18)hm[fi1][fj1][fi][fj]=sealevel-1;if((fi1===35&&fj1===30)&&fj>=9&&fj<=12)hm[fi1][fj1][fi][fj]=sealevel+((49-fi)*0.05)+(35-fi1)*2.45+0.5;if((fi1===34&&fj1===30)&&fj>4&&fj<18)hm[fi1][fj1][fi][fj]=sealevel-1;if((fi1===34&&fj1===30)&&fj>=9&&fj<=12)hm[fi1][fj1][fi][fj]=sealevel+((49-fi)*0.05)+(35-fi1)*2.45+0.5;if((fi1===33&&fj1===30)&&fj>4&&fj<18)hm[fi1][fj1][fi][fj]=sealevel-1;if((fi1===33&&fj1===30)&&fj>=9&&fj<=12)hm[fi1][fj1][fi][fj]=sealevel+((49-fi)*0.05)+(35-fi1)*2.45+0.5;if(fi1===33&&fi<20)hm[fi1][fj1][fi][fj]-=0.05*(20-fi)*(20-fi);if(fi1===35&&fi>20)hm[fi1][fj1][fi][fj]-=0.05*(fi-20)*(fi-20);if(fj1===28&&fj<20)hm[fi1][fj1][fi][fj]-=0.05*(20-fj)*(20-fj);if(fj1===32&&fj>20)hm[fi1][fj1][fi][fj]-=0.05*(fj-20)*(fj-20);hm[fi1][fj1][fi][fj]-=3;if(hm[fi1][fj1][fi][fj]<sealevel-0.5)hm[fi1][fj1][fi][fj]*=1.8;hm[fi1][fj1][fi][fj]+=1;}
else if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))
{if(fi1===33&&fj1===38)terrain_amplify(fi1,fj1,fi,fj,2.3);else if(fi1===33&&fj1===36)terrain_amplify(fi1,fj1,fi,fj,1.7);else if(fi1===32&&fj1===37)terrain_amplify(fi1,fj1,fi,fj,1.3);if((fi1===34||fi1===35)&&(fj1===36||fj1===37))
{terrain_amplify_4chunks(34,36,fi1,fj1,fi,fj,0.7,0.7);}
if(fi1%2===0&&fj1%2===0)
{let dist=distance_get_xz(fi,fj,12,24);let dist2=distance_get_xz(fi,fj,2,24);if(dist<10)hm[fi1][fj1][fi][fj]+=(10-dist2)+10*(pseudorandom(fi*fj)-0.4);}
if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))hm[fi1][fj1][fi][fj]*=0.12;if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))hm[fi1][fj1][fi][fj]+=10-9.248347-1;hm[fi1][fj1][fi][fj]-=4;if((fi1===34&&fj1===37)&&(fi>15&&fi<35&&fj>10&&fj<30))hm[fi1][fj1][fi][fj]=sealevel+0.3;if((fi1===32&&fj1===38)&&distance_get_xz(fi,fj,42,31)<7)hm[fi1][fj1][fi][fj]=sealevel+0.3;if((fi1===32&&fj1===38)&&distance_get_xz(fi,fj,42,32)<2)hm[fi1][fj1][fi][fj]=sealevel-0.5;if(hm[fi1][fj1][fi][fj]<sealevel-0.75)hm[fi1][fj1][fi][fj]=sealevel-0.75;if((fi1===32&&fj1===37)&&distance_get_xz(fi,fj,19,9)<5)hm[fi1][fj1][fi][fj]=0;if(fi1===32&&fi<9)hm[fi1][fj1][fi][fj]-=0.05*(9-fi)*(9-fi)*(9-fi);if(fi1===35&&fi>chunkwidth-9)hm[fi1][fj1][fi][fj]-=0.05*(fi-41)*(fi-41)*(fi-41);if(fj1===36&&fj<9)hm[fi1][fj1][fi][fj]-=0.05*(9-fj)*(9-fj)*(9-fj);if(fj1===38&&fj>chunkwidth-9)hm[fi1][fj1][fi][fj]-=0.05*(fj-41)*(fj-41)*(fj-41);if(fi1===32&&fi<4)hm[fi1][fj1][fi][fj]=vgrelf3*0.01-8;if(fi1===35&&fi>chunkwidth-4)hm[fi1][fj1][fi][fj]=vgrelf3*0.01-8;if(fj1===36&&fj<4)hm[fi1][fj1][fi][fj]=vgrelf3*0.01-8;if(fj1===38&&fj>chunkwidth-4)hm[fi1][fj1][fi][fj]=vgrelf3*0.01-8;if(grelf_weird()>18)
{if(pseudorandom(20*Math.floor((fi+fj)*0.05))>0.5)hm[fi1][fj1][fi][fj]-=2;else hm[fi1][fj1][fi][fj]+=2;}
if(fi1===33&&fj1===36&&fi>=30&&fj>=20&&fj<=43)hm[fi1][fj1][fi][fj]=0;else if(fi1===34&&fj1===36&&fi<=14&&fj>=20&&fj<=43)hm[fi1][fj1][fi][fj]=0;}
else if((fi1>=29&&fi1<=30)&&(fj1>=35&&fj1<=40))
{terrain_amplify(fi1,fj1,fi,fj,1+pseudorandom(fi1+fj1));if((fi1>=29&&fi1<=30)&&(fj1>=35&&fj1<=40))hm[fi1][fj1][fi][fj]*=0.2;hm[fi1][fj1][fi][fj]*=0.003*((fj1*49+fj)-35*49)*1.3*(1+Math.sin(3*Math.PI*(((fi1*49+fi)-(29*49))/100)));hm[fi1][fj1][fi][fj]+=0.004*vgrelf_detail;hm[fi1][fj1][fi][fj]-=2.5;if(fj1===40)terrain_amplify(fi1,fj1,fi,fj,-0.5);if(fi1===29)hm[fi1][fj1][fi][fj]-=0.004*(chunkwidth-fi)*(chunkwidth-fi);if(fi1===30)hm[fi1][fj1][fi][fj]-=0.006*fi*fi;if(fj1===35)hm[fi1][fj1][fi][fj]-=0.001*(chunkwidth-fj)*(chunkwidth-fj);if(fj1===40)hm[fi1][fj1][fi][fj]-=0.008*fj*fj;hm[fi1][fj1][fi][fj]-=2;}
else if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41))
{if((fi1>=33&&fi1<=34)&&(fj1>=39&&fj1<=40))
{if((fi+fj)%4===0)hm[fi1][fj1][fi][fj]-=vgrelf_detail*0.001;terrain_amplify_4chunks(33,39,fi1,fj1,fi,fj,-0.7,1.3);}
terrain_amplify(fi1,fj1,fi,fj,(pseudorandom(fi1*fj1)*2)-1);if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41))hm[fi1][fj1][fi][fj]*=(0.5*factor_chunkmap);if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41))hm[fi1][fj1][fi][fj]+=10-9.248347;hm[fi1][fj1][fi][fj]*=0.01*((fi1*49+fi)-31*49);hm[fi1][fj1][fi][fj]-=2;let tmp=hm[fi1][fj1][fi][fj]-sealevel;tmp*=0.03;hm[fi1][fj1][fi][fj]=sealevel+tmp;if(fi1>=34)
{hm[fi1][fj1][fi][fj]+=0.02*((fi1*49+fi)-34*49);hm[fi1][fj1][fi][fj]+=5;hm[fi1][fj1][fi][fj]*=20;hm[fi1][fj1][fi][fj]-=85;hm[fi1][fj1][fi][fj]=Math.floor(hm[fi1][fj1][fi][fj]);if(vgrelf<200)
{hm[fi1][fj1][fi][fj]+=0.5;hm[fi1][fj1][fi][fj]*=4;}}
if(fi1===34&&fj1===40)
{if(distance_get_xz(fi,fj,42,9)<6)hm[fi1][fj1][fi][fj]-=6-0.1*distance_get_xz(fi,fj,42,9);if(fj>30&&fj<40&&fi>5&&fi<45)hm[fi1][fj1][fi][fj]*=Math.sin(fi);if(distance_get_xz(fi,fj,22,9)<6&&fi<22)hm[fi1][fj1][fi][fj]+=0.2*(6-distance_get_xz(fi,fj,22,9));if(distance_get_xz(fi,fj,22,41)<6&&fi<22)hm[fi1][fj1][fi][fj]+=0.2*(6-distance_get_xz(fi,fj,22,41));if(distance_get_xz(fi,fj,41,36)<6&&fi<41)hm[fi1][fj1][fi][fj]+=0.2*(6-distance_get_xz(fi,fj,41,36));if(distance_get_xz(fi,fj,15,25)<6&&fi<15)hm[fi1][fj1][fi][fj]+=0.2*(6-distance_get_xz(fi,fj,15,25));}
hm[fi1][fj1][fi][fj]-=10;if(fi1<=33)hm[fi1][fj1][fi][fj]+=0.02*vgrelf+4;if(fi1===31&&fi<10)hm[fi1][fj1][fi][fj]-=0.182*(10-fi);if(fi1===33&&fi>=40)hm[fi1][fj1][fi][fj]-=0.1*(fi-40)*(fi-40);if(fi1===35)hm[fi1][fj1][fi][fj]-=0.015*fi*fi;if(fj1===39)hm[fi1][fj1][fi][fj]-=0.007*(chunkwidth-fj)*(chunkwidth-fj);if(fj1===41)hm[fi1][fj1][fi][fj]-=0.005*fj*fj;}
else if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))
{terrain_make_plains(fi1,fj1,fi,fj,40);if(fi1===37&&fj1===37)terrain_amplify(fi1,fj1,fi,fj,-4);if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))hm[fi1][fj1][fi][fj]+=5-9.248347;if((fi1===39&&fj1===38)&&(fi>1&&fi<16&&fj>20&&fj<36)&&(hm[fi1][fj1][fi][fj]>10&&hm[fi1][fj1][fi][fj]<20))hm[fi1][fj1][fi][fj]=14;if((fi1===37&&fj1===37)&&distance_get_xz(fi,fj,25,30)<8)hm[fi1][fj1][fi][fj]=sealevel-10+0.03*vgrelf_detail;if(fi1===37&&fj1===41)terrain_amplify(fi1,fj1,fi,fj,-1);if(fi1===36)hm[fi1][fj1][fi][fj]-=0.0003*(chunkwidth-fi)*(chunkwidth-fi)*(chunkwidth-fi);if(fi1===39)hm[fi1][fj1][fi][fj]-=0.0008*fi*fi*fi;if(fj1===36)hm[fi1][fj1][fi][fj]-=0.0003*(chunkwidth-fj)*(chunkwidth-fj)*(chunkwidth-fj);if(fj1===41)hm[fi1][fj1][fi][fj]-=0.0003*fj*fj*fj;if(fi1===39&&fj1===39)
{let hotspring_dist=distance_get_xz(fi,fj,21,8);if(hotspring_dist<2)hm[fi1][fj1][fi][fj]=sealevel-1;if(hotspring_dist>=2&&hotspring_dist<=3)hm[fi1][fj1][fi][fj]=sealevel+0.5;hotspring_dist=distance_get_xz(fi,fj,26,18);if(hotspring_dist<2)hm[fi1][fj1][fi][fj]=sealevel-1;if(hotspring_dist>=2&&hotspring_dist<=3)hm[fi1][fj1][fi][fj]=sealevel+0.5;}}
else if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34))
{if(fi1===30&&fj1===33&&fi>6&&fj>6&&fi<43&&fj<43&&hm[fi1][fj1][fi][fj]<30)hm[fi1][fj1][fi][fj]-=4*(30-hm[fi1][fj1][fi][fj]);hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);if((fi1>=30&&fi1<=31)&&(fj1>=33&&fj1<=34))
{let dist=distance_get_xz(x_in_chunk_to_x(fi1,fi),x_in_chunk_to_x(fj1,fj),x_in_chunk_to_x(31,0),x_in_chunk_to_x(34,0));if(dist<chunkwidth-2&&dist>3)hm[fi1][fj1][fi][fj]=sealevel+3+hm[fi1][fj1][fi][fj]*(7/dist);if(fi1===31&&fj1===33)terrain_amplify(fi1,fj1,fi,fj,-0.3);if(fi1===31&&fj1===33&&distance_get_xz(fi,fj,25,25)<4){hm[fi1][fj1][fi][fj]*=-0.2;hm[fi1][fj1][fi][fj]-=1.5;}}
else if(fi1===30&&fj1===32)
{let val=vgrelf;if(fi>5&&fj>5&&fi<40&&fj<40&&(!(fi>=35&&fj>=35))&&val>250&&val<400)
{terrain_make_plains(fi1,fj1,fi,fj,9);terrain_amplify(fi1,fj1,fi,fj,-0.3);}}
if((fi1===30&&fj1===29)&&distance_get_xz(fi,fj,18,13)<9)hm[fi1][fj1][fi][fj]=9.3;if(fi1===29)hm[fi1][fj1][fi][fj]-=0.011*(chunkwidth-fi)*(chunkwidth-fi);if(fi1===32)hm[fi1][fj1][fi][fj]-=0.009*fi*fi;if(fj1===28)hm[fi1][fj1][fi][fj]-=0.012*(chunkwidth-fj)*(chunkwidth-fj);if(fj1===34)hm[fi1][fj1][fi][fj]-=0.007*fj*fj;if(fj1===34)terrain_amplify(fi1,fj1,fi,fj,-0.4*pseudorandom(fi1));if((fi1===32||fi1===31)&&(fj1===32||fj1===31))
{if((fj1===31&&fj>4)||(fj1===32&&fj<45))
{if(fi1===31&&fi>0.1*vgrelf)terrain_make_plains(fi1,fj1,fi,fj,8);else if(fi1===32&&fi<0.1*vgrelf)terrain_make_plains(fi1,fj1,fi,fj,8);}}
hm[fi1][fj1][fi][fj]*=2;terrain_make_plains(fi1,fj1,fi,fj,5);hm[fi1][fj1][fi][fj]-=5;if(fi1===30&&fj1===30&&fi>3&&fi<46&&fj>3&&fj<46)
{let g3=vgrelf3;if(g3>100)terrain_amplify(fi1,fj1,fi,fj,-0.2);else if(g3<50)terrain_amplify(fi1,fj1,fi,fj,-0.2);else if(g3>60&&g3<90)terrain_amplify(fi1,fj1,fi,fj,0.3);}}
else if(fi1===32&&fj1===35)
{hm[fi1][fj1][fi][fj]+=0.04*vgrelf3-0.5*Math.abs(fi-40)+2;let tmp=0.1*(hm[fi1][fj1][fi][fj]-sealevel);hm[fi1][fj1][fi][fj]=sealevel+tmp;if(distance_get_xz(fi,fj,24,33)<6)hm[fi1][fj1][fi][fj]+=0.8;if(fi>=27&&fi<=28&&fj>=34&&fj<=36)hm[fi1][fj1][fi][fj]=sealevel-0.1;if(fi>=20&&fi<=22&&fj>=31&&fj<=33)hm[fi1][fj1][fi][fj]+=1;if(fi<13)hm[fi1][fj1][fi][fj]-=0.01*(13-fi)*(13-fi)*(13-fi);if(fi>chunkwidth-13)hm[fi1][fj1][fi][fj]-=0.01*(fi-37)*(fi-37)*(fi-37);if(fj<13)hm[fi1][fj1][fi][fj]-=0.01*(13-fj)*(13-fj)*(13-fj);if(fj>chunkwidth-13)hm[fi1][fj1][fi][fj]-=0.01*(fj-37)*(fj-37)*(fj-37);hm[fi1][fj1][fi][fj]-=0.6;}
else if(fi1===31&&fj1===35)
{hm[fi1][fj1][fi][fj]-=7;hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);hm[fi1][fj1][fi][fj]-=15;hm[fi1][fj1][fi][fj]+=18-0.5*distance_get_xz(fi,fj,25,25);if(fj>45)hm[fi1][fj1][fi][fj]-=0.1*(fj-45)*(fj-45)*(fj-45);if(fi>45)hm[fi1][fj1][fi][fj]-=0.1*(fi-45)*(fi-45)*(fi-45);}
else if(fi1===31&&fj1===38)
{hm[fi1][fj1][fi][fj]-=7;hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);hm[fi1][fj1][fi][fj]-=15;hm[fi1][fj1][fi][fj]*=0.2;if(fi<5)hm[fi1][fj1][fi][fj]-=0.05*(5-fi)*(5-fi)*(5-fi);if(fi>chunkwidth-5)hm[fi1][fj1][fi][fj]-=0.05*(fi-45)*(fi-45)*(fi-45);if(fj<15)hm[fi1][fj1][fi][fj]-=0.05*(15-fj)*(15-fj)*(15-fj);if(fj>chunkwidth-5)hm[fi1][fj1][fi][fj]-=0.05*(fj-45)*(fj-45)*(fj-45);}
else if(fi1===28&&fj1===33)
{hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);hm[fi1][fj1][fi][fj]-=5;if(fi>chunkwidth-19)hm[fi1][fj1][fi][fj]-=0.02*(fi-30)*(fi-30);if(fi>45)hm[fi1][fj1][fi][fj]-=0.04*(fi-45)*(fi-45)*(fi-45);if(fi<19)hm[fi1][fj1][fi][fj]-=0.01*(19-fi)*(19-fi);if(fj>chunkwidth-19)hm[fi1][fj1][fi][fj]-=0.007*(fj-30)*(fj-30);if(fj<19)hm[fi1][fj1][fi][fj]-=0.007*(19-fj)*(19-fj);if(fj<5)hm[fi1][fj1][fi][fj]-=0.04*(5-fj)*(5-fj)*(5-fj);}
else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41))
{hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);if(fi1===27&&fj1===35)terrain_amplify(fi1,fj1,fi,fj,-0.2);if(fi1===26&&fj1===36)terrain_amplify(fi1,fj1,fi,fj,-0.2);if(fi1===27&&fj1===39)terrain_amplify(fi1,fj1,fi,fj,-0.35);hm[fi1][fj1][fi][fj]-=5;terrain_make_plains(fi1,fj1,fi,fj,1.1);if((fi1===27&&fj1===34)&&(fi>=1&&fi<=19&&fj>=2))hm[fi1][fj1][fi][fj]=0.6;if((fi1===27&&fj1===35)&&(fi>=1&&fi<=19&&fj<=36))hm[fi1][fj1][fi][fj]=0.6;if(fi1===26&&fi<23)hm[fi1][fj1][fi][fj]-=0.015*(23-fi)*(23-fi);if(fi1===26&&fi<5)hm[fi1][fj1][fi][fj]-=0.13*(5-fi)*(5-fi);if(fi1===27&&fi>chunkwidth-19)hm[fi1][fj1][fi][fj]-=0.02*(fi-30)*(fi-30);if(fi1===27&&fi>chunkwidth-5)hm[fi1][fj1][fi][fj]-=0.13*(fi-44)*(fi-44);if(fj1===33&&fj<23)hm[fi1][fj1][fi][fj]-=0.015*(23-fj)*(23-fj);if(fj1===41&&fj>chunkwidth-19)hm[fi1][fj1][fi][fj]-=0.02*(fj-30)*(fj-30);if(fi1===26&&fj1===38&&distance_get_xz(fi,fj,25,23)<15)hm[fi1][fj1][fi][fj]=1.3;}
else if((fi1>=28&&fi1<=30)&&fj1===41)
{hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);if(fi1===28&&fj1===41)terrain_amplify(fi1,fj1,fi,fj,0.35);if(fi1===28&&fj1===41&&distance_get_xz(fi,fj,25,25)<3.7)hm[fi1][fj1][fi][fj]=sealevel-3;hm[fi1][fj1][fi][fj]-=5;terrain_make_plains(fi1,fj1,fi,fj,1.1);if(fi1===28&&fi<23)hm[fi1][fj1][fi][fj]-=0.02*(23-fi)*(23-fi);if(fi1===28&&fi<5)hm[fi1][fj1][fi][fj]-=0.14*(5-fi)*(5-fi);if(fi1===30&&fi>chunkwidth-19)hm[fi1][fj1][fi][fj]-=0.02*(fi-30)*(fi-30);if(fi1===30&&fi>chunkwidth-5)hm[fi1][fj1][fi][fj]-=0.13*(fi-44)*(fi-44);if(fj<23)hm[fi1][fj1][fi][fj]-=0.015*(23-fj)*(23-fj);if(fj<5)hm[fi1][fj1][fi][fj]-=0.3*(5-fj)*(5-fj);if(fj>chunkwidth-19)hm[fi1][fj1][fi][fj]-=0.02*(fj-30)*(fj-30);}
else if((fi1>=26&&fi1<=27)&&(fj1>=26&&fj1<=31))
{hm[fi1][fj1][fi][fj]-=45;hm[fi1][fj1][fi][fj]*=1;if(fi1===26&&fi<20)hm[fi1][fj1][fi][fj]-=0.03*(20-fi)*(20-fi);else if(fi1===27&&fi>25)hm[fi1][fj1][fi][fj]-=0.02*(fi-25)*(fi-25);else if(fj1===26&&fi<10)hm[fi1][fj1][fi][fj]-=0.02*(10-fj)*(10-fj);else if(fj1===31&&fi>25)hm[fi1][fj1][fi][fj]-=0.02*(fj-25)*(fj-25);if(fi1===27&&fj1===28)
{if(fi>45)hm[fi1][fj1][fi][fj]-=0.02*(fi-45)*(fi-45)*(fi-45);}}
else
{hm[fi1][fj1][fi][fj]*=(1.24*factor_chunkmap);}
if(hm[fi1][fj1][fi][fj]<sealevel-3)
{let fx=fi1*50+fi;let fz=fj1*50+fj;if(fi===49)fx++;if(fj===49)fz++;let fxXwideness=fx*6;let _12XfxXwideness=12*6;let fzXwideness=fz*6;let master2XfzXwideness=5.448728*fzXwideness;a=((3&2)*_12XfxXwideness+(3&6)*4.2*master2XfzXwideness)*0.01;b=((3&7)*12.6*fxXwideness+(3&4)*master2XfzXwideness*0.6)*0.01;c=((3&4)*_12XfxXwideness+(3&9)*12*0.67316*master2XfzXwideness)*0.01;d=((3&8)*12.6*fxXwideness+(3&1)*12*0.06875*master2XfzXwideness)*0.01;e=((3&3)*_12XfxXwideness+(3)*6.6*master2XfzXwideness)*0.01;let grelftemp=profile[a&0xFF]+profile[b&0xFF]-profile[c&0xFF]+3*profile[d&0xFF]+profile[e&0xFF];hm[fi1][fj1][fi][fj]=sealevel-6+0.5-0.004*grelftemp;}}}
function calculate_height_after(fi1,fj1)
{if(fi1===30&&fj1===35)
{hm[30][35][20][42]=0.2;hm[30][35][21][42]=0.2;hm[30][35][21][43]=0.2;hm[30][35][20][43]=0.2;hm[30][35][20][44]=0.2;hm[30][35][20][45]=0.2;hm[30][35][19][45]=0.2;hm[30][35][19][46]=0.2;hm[30][35][21][46]=0.2;hm[30][35][21][45]=0.2;hm[30][35][22][45]=0.2;hm[30][35][23][45]=0.2;hm[30][35][23][46]=0.2;hm[30][35][24][46]=0.2;hm[30][35][24][47]=0.2;hm[30][35][23][47]=0.2;hm[30][35][22][48]=0.2;hm[30][35][22][48]=0.2;hm[30][35][21][48]=0.2;hm[30][35][21][47]=0.2;hm[30][35][20][47]=0.2;hm[30][35][20][46]=0.2;hm[30][35][3][22]=-0.4;hm[30][35][4][22]=-0.4;hm[30][35][5][22]=-0.4;hm[30][35][5][21]=-0.4;hm[30][35][6][21]=-0.4;hm[30][35][7][21]=-0.4;hm[30][35][8][21]=-0.4;hm[30][35][7][20]=-1.1;hm[30][35][6][20]=-1.1;hm[30][35][5][20]=-1.1;hm[30][35][4][20]=-1.1;hm[30][35][4][21]=-1.1;hm[30][35][3][21]=-1.1;hm[30][35][3][20]=-1.1;hm[30][35][2][20]=-1.1;hm[30][35][2][21]=-1.1;hm[30][35][1][21]=-1.1;hm[30][35][1][20]=-1.1;hm[30][35][1][19]=-1.1;hm[30][35][0][20]=-1.1;hm[30][35][0][19]=-1.1;}
if(fi1===35&&fj1===40)
{hm[35][40][10][27]=8.9;hm[35][40][10][26]=8.9;hm[35][40][9][26]=8.9;hm[35][40][9][25]=8.9;hm[35][40][8][25]=8.9;hm[35][40][8][26]=8.9;hm[35][40][8][28]=8.9;hm[35][40][8][29]=8.9;hm[35][40][8][30]=8.9;hm[35][40][9][30]=8.9;hm[35][40][9][29]=8.9;hm[35][40][9][28]=8.9;hm[35][40][10][28]=8.9;hm[35][40][10][29]=8.9;hm[35][40][11][29]=8.9;hm[35][40][11][28]=8.9;hm[35][40][12][27]=8.9;hm[35][40][12][26]=8.9;hm[35][40][11][26]=8.9;hm[35][40][11][27]=8.9;hm[35][40][11][28]=8.5;hm[35][40][11][29]=8.5;hm[35][40][12][29]=8.5;hm[35][40][12][28]=8.5;hm[35][40][13][28]=8.5;hm[35][40][13][29]=8.5;hm[35][40][14][29]=8.5;hm[35][40][14][28]=8.5;hm[35][40][14][27]=8.5;hm[35][40][13][27]=8.5;hm[35][40][12][27]=8.5;hm[35][40][11][27]=8.5;hm[35][40][11][26]=8.5;hm[35][40][12][26]=8.5;hm[35][40][13][26]=8.5;hm[35][40][14][26]=8.5;hm[35][40][14][25]=8.5;hm[35][40][13][25]=8.5;hm[35][40][12][25]=8.5;hm[35][40][11][25]=8.5;for(let fi=4;fi<=6;fi++){for(let fj=28;fj<=30;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=4;fi<=6;fi++){for(let fj=25;fj<=27;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=4;fi<=6;fi++){for(let fj=22;fj<=24;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=4;fi<=6;fi++){for(let fj=19;fj<=21;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=7;fi<=9;fi++){for(let fj=19;fj<=21;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=7;fi<=9;fi++){for(let fj=23;fj<=25;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=7;fi<=9;fi++){for(let fj=27;fj<=29;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=7;fi<=9;fi++){for(let fj=30;fj<=32;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=10;fi<=12;fi++){for(let fj=30;fj<=32;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=10;fi<=12;fi++){for(let fj=27;fj<=29;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=10;fi<=12;fi++){for(let fj=24;fj<=26;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=10;fi<=12;fi++){for(let fj=21;fj<=23;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=13;fi<=15;fi++){for(let fj=21;fj<=23;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=13;fi<=15;fi++){for(let fj=24;fj<=26;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=13;fi<=15;fi++){for(let fj=27;fj<=29;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=13;fi<=15;fi++){for(let fj=30;fj<=32;fj++){hm[35][40][fi][fj]=7.7;}}
for(let fi=6;fi<=8;fi++){for(let fj=33;fj<=35;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=9;fi<=11;fi++){for(let fj=33;fj<=35;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=12;fi<=14;fi++){for(let fj=33;fj<=35;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=15;fi<=17;fi++){for(let fj=33;fj<=35;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=18;fi<=20;fi++){for(let fj=33;fj<=35;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=18;fi<=20;fi++){for(let fj=30;fj<=32;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=18;fi<=20;fi++){for(let fj=27;fj<=29;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=18;fi<=20;fi++){for(let fj=24;fj<=26;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=18;fi<=20;fi++){for(let fj=21;fj<=23;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=15;fi<=17;fi++){for(let fj=21;fj<=23;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=15;fi<=17;fi++){for(let fj=25;fj<=27;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=15;fi<=17;fi++){for(let fj=29;fj<=31;fj++){hm[35][40][fi][fj]=8.0;}}
for(let fi=15;fi<=17;fi++){for(let fj=32;fj<=34;fj++){hm[35][40][fi][fj]=8.0;}}}
if(fi1===29&&fj1===41)hm[29][41][39][27]=2.0;if(fi1===29&&fj1===41)hm[29][41][39][27]=2.0;if(fi1===29&&fj1===41)hm[29][41][38][29]=6.4;if(fi1===29&&fj1===41)hm[29][41][37][29]=6.4;if(fi1===29&&fj1===41)hm[29][41][37][28]=6.4;if(fi1===29&&fj1===41)hm[29][41][38][28]=6.4;if(fi1===29&&fj1===41)hm[29][41][38][27]=6.4;if(fi1===29&&fj1===41)hm[29][41][39][27]=6.4;if(fi1===29&&fj1===41)hm[29][41][39][28]=6.4;if(fi1===29&&fj1===41)hm[29][41][40][28]=6.4;if(fi1===29&&fj1===41)hm[29][41][39][29]=6.4;if(fi1===29&&fj1===41)hm[29][41][39][30]=6.4;if(fi1===29&&fj1===41)hm[29][41][40][30]=6.4;if(fi1===29&&fj1===41)hm[29][41][40][29]=6.4;if(fi1===29&&fj1===41)hm[29][41][41][29]=6.4;if(fi1===29&&fj1===41)hm[29][41][41][28]=6.4;if(fi1===26&&fj1===41)hm[26][41][1][6]=0.3;if(fi1===26&&fj1===41)hm[26][41][0][6]=0.3;if(fi1===26&&fj1===41)hm[26][41][0][5]=0.3;if(fi1===26&&fj1===41)hm[26][41][1][5]=0.3;if(fi1===26&&fj1===41)hm[26][41][2][6]=0.3;if(fi1===26&&fj1===41)hm[26][41][1][7]=0.3;if(fi1===26&&fj1===41)hm[26][41][0][7]=0.3;if(fi1===26&&fj1===41)hm[26][41][0][8]=0.3;if(fi1===26&&fj1===41)hm[26][41][1][8]=0.3;if(fi1===26&&fj1===41)hm[26][41][2][7]=0.3;if(fi1===26&&fj1===41)hm[26][41][3][6]=0.3;if(fi1===26&&fj1===41)hm[26][41][4][6]=0.3;if(fi1===26&&fj1===41)hm[26][41][5][6]=0.3;if(fi1===26&&fj1===41)hm[26][41][5][5]=0.3;if(fi1===26&&fj1===41)hm[26][41][4][5]=0.3;if(fi1===26&&fj1===41)hm[26][41][3][5]=0.3;if(fi1===26&&fj1===41)hm[26][41][2][5]=0.3;if(fi1===26&&fj1===41)hm[26][41][2][4]=0.3;if(fi1===26&&fj1===41)hm[26][41][3][4]=0.3;if(fi1===26&&fj1===41)hm[26][41][4][4]=0.3;if(fi1===26&&fj1===41)hm[26][41][0][4]=0.3;if(fi1===26&&fj1===41)hm[26][41][0][4]=0.3;if(fi1===26&&fj1===26)hm[26][26][21][14]=-2.4;if(fi1===26&&fj1===26)hm[26][26][21][15]=-2.4;if(fi1===26&&fj1===26)hm[26][26][20][15]=-2.4;if(fi1===26&&fj1===26)hm[26][26][20][14]=-2.4;if(fi1===26&&fj1===26)hm[26][26][20][13]=-2.4;if(fi1===26&&fj1===26)hm[26][26][21][13]=-2.4;if(fi1===26&&fj1===26)hm[26][26][21][12]=-2.4;if(fi1===26&&fj1===26)hm[26][26][21][11]=-2.4;if(fi1===26&&fj1===26)hm[26][26][20][12]=-2.4;if(fi1===26&&fj1===26)hm[26][26][19][12]=-2.4;if(fi1===26&&fj1===26)hm[26][26][18][12]=-2.4;if(fi1===26&&fj1===26)hm[26][26][17][12]=-2.4;if(fi1===26&&fj1===26)hm[26][26][16][12]=-2.4;if(fi1===26&&fj1===26)hm[26][26][16][11]=-2.4;if(fi1===26&&fj1===26)hm[26][26][17][11]=-2.4;if(fi1===26&&fj1===26)hm[26][26][18][11]=-2.4;if(fi1===26&&fj1===26)hm[26][26][19][11]=-2.4;if(fi1===26&&fj1===26)hm[26][26][20][11]=-2.4;if(fi1===26&&fj1===26)hm[26][26][22][15]=-2.075;if(fi1===26&&fj1===26)hm[26][26][21][15]=-2.075;if(fi1===26&&fj1===26)hm[26][26][20][16]=-2.075;if(fi1===26&&fj1===26)hm[26][26][20][15]=-2.075;if(fi1===26&&fj1===26)hm[26][26][21][16]=-2.075;if(fi1===29&&fj1===29)
{hm[29][29][21][7]=-0.9;hm[29][29][20][7]=-0.9;hm[29][29][19][7]=-0.9;hm[29][29][18][7]=-0.9;hm[29][29][17][7]=-0.9;hm[29][29][16][7]=-0.9;hm[29][29][15][7]=-0.9;hm[29][29][14][7]=-0.9;hm[29][29][13][7]=-0.9;hm[29][29][12][7]=-0.9;hm[29][29][11][7]=-0.9;hm[29][29][10][7]=-0.9;hm[29][29][9][7]=-0.9;hm[29][29][9][6]=-0.9;hm[29][29][10][6]=-0.9;hm[29][29][11][6]=-0.9;hm[29][29][12][6]=-0.9;hm[29][29][13][6]=-0.9;hm[29][29][14][6]=-0.9;hm[29][29][15][6]=-0.9;hm[29][29][16][6]=-0.9;hm[29][29][17][6]=-0.9;hm[29][29][18][6]=-0.9;hm[29][29][19][6]=-0.9;hm[29][29][20][6]=-0.9;hm[29][29][21][6]=-0.9;hm[29][29][21][5]=-0.9;hm[29][29][20][5]=-0.9;hm[29][29][19][5]=-0.9;hm[29][29][18][5]=-0.9;hm[29][29][17][5]=-0.9;hm[29][29][16][5]=-0.9;hm[29][29][15][5]=-0.9;hm[29][29][14][5]=-0.9;hm[29][29][13][5]=-0.9;hm[29][29][12][5]=-0.9;hm[29][29][11][5]=-0.9;hm[29][29][9][3]=-0.9;hm[29][29][8][3]=-0.9;hm[29][29][8][2]=-0.9;hm[29][29][7][2]=-0.9;hm[29][29][6][2]=-0.9;hm[29][29][5][2]=-0.9;hm[29][29][5][3]=-0.9;hm[29][29][4][3]=-0.9;hm[29][29][6][3]=-0.9;hm[29][29][7][3]=-0.9;hm[29][29][7][4]=-0.9;hm[29][29][6][4]=-0.9;hm[29][29][5][4]=-0.9;hm[29][29][4][4]=-0.9;hm[29][29][4][5]=-0.9;hm[29][29][5][5]=-0.9;hm[29][29][6][5]=-0.9;hm[29][29][7][5]=-0.9;hm[29][29][8][4]=-0.9;hm[29][29][7][6]=-0.9;hm[29][29][6][6]=-0.9;hm[29][29][5][6]=-0.9;hm[29][29][4][6]=-0.9;hm[29][29][5][7]=-0.9;hm[29][29][6][7]=-0.9;hm[29][29][7][7]=-0.9;hm[29][29][8][5]=-0.9;hm[29][29][9][5]=-0.9;hm[29][29][9][4]=-0.9;hm[29][29][10][5]=-0.9;hm[29][29][8][6]=-0.9;}
if(fi1===33&&fj1===34)
{hm[33][34][6][7]=-7.0;hm[33][34][6][6]=-7.0;hm[33][34][7][6]=-7.0;hm[33][34][7][7]=-7.0;}
if(fi1===34&&fj1===34)
{hm[34][34][9][22]=-7.0;hm[34][34][10][22]=-7.0;hm[34][34][33][11]=-7.0;hm[34][34][34][11]=-7.0;hm[34][34][34][10]=-7.0;hm[34][34][33][10]=-7.0;hm[34][34][33][13]=-7.0;hm[34][34][34][13]=-7.0;}
if(fi1===28&&fj1===41)
{hm[28][41][44][8]=6.5;hm[28][41][43][8]=6.5;hm[28][41][42][8]=6.5;hm[28][41][41][8]=6.5;hm[28][41][40][8]=6.5;hm[28][41][40][7]=6.5;hm[28][41][41][7]=6.5;hm[28][41][42][7]=6.5;hm[28][41][43][7]=6.5;hm[28][41][44][7]=6.5;hm[28][41][45][7]=6.5;hm[28][41][45][6]=6.5;hm[28][41][44][6]=6.5;hm[28][41][43][6]=6.5;hm[28][41][42][6]=6.5;hm[28][41][41][6]=6.5;hm[28][41][40][6]=6.5;hm[28][41][40][5]=6.5;hm[28][41][41][5]=6.5;hm[28][41][42][5]=6.5;hm[28][41][43][5]=6.5;hm[28][41][44][5]=6.5;hm[28][41][45][5]=6.5;hm[28][41][45][4]=6.5;hm[28][41][44][4]=6.5;hm[28][41][43][4]=6.5;hm[28][41][42][4]=6.5;hm[28][41][41][4]=6.5;hm[28][41][40][4]=6.5;hm[28][41][40][3]=6.5;hm[28][41][41][3]=6.5;hm[28][41][42][3]=6.5;hm[28][41][43][3]=6.5;hm[28][41][44][3]=6.5;hm[28][41][45][3]=6.5;hm[28][41][45][2]=6.5;hm[28][41][44][2]=6.5;hm[28][41][43][2]=6.5;hm[28][41][42][2]=6.5;hm[28][41][41][2]=6.5;hm[28][41][40][2]=6.5;}
if(fi1===29&&fj1===29)
{hm[29][29][20][18]=-0.6;hm[29][29][21][18]=-0.6;hm[29][29][22][18]=-0.6;hm[29][29][23][18]=-0.6;hm[29][29][24][18]=-0.6;hm[29][29][25][18]=-0.6;hm[29][29][26][18]=-0.6;hm[29][29][27][18]=-0.6;hm[29][29][28][18]=-0.6;hm[29][29][29][18]=-0.6;hm[29][29][30][18]=-0.6;hm[29][29][31][18]=-0.6;hm[29][29][32][18]=-0.6;hm[29][29][32][19]=-0.6;hm[29][29][31][19]=-0.6;hm[29][29][30][19]=-0.6;hm[29][29][29][19]=-0.6;hm[29][29][28][19]=-0.6;hm[29][29][27][19]=-0.6;hm[29][29][26][19]=-0.6;hm[29][29][25][19]=-0.6;hm[29][29][24][19]=-0.6;hm[29][29][23][19]=-0.6;hm[29][29][22][19]=-0.6;hm[29][29][21][19]=-0.6;hm[29][29][20][19]=-0.6;hm[29][29][19][19]=-0.6;hm[29][29][19][20]=-0.6;hm[29][29][20][20]=-0.6;hm[29][29][21][20]=-0.6;hm[29][29][22][20]=-0.6;hm[29][29][23][20]=-0.6;hm[29][29][24][20]=-0.6;hm[29][29][25][20]=-0.6;hm[29][29][26][20]=-0.6;hm[29][29][27][20]=-0.6;hm[29][29][28][20]=-0.6;hm[29][29][29][20]=-0.6;hm[29][29][30][20]=-0.6;hm[29][29][31][20]=-0.6;hm[29][29][32][20]=-0.6;hm[29][29][31][18]=-1.3;hm[29][29][31][19]=-1.3;hm[29][29][31][21]=-1.3;hm[29][29][31][22]=-1.3;hm[29][29][31][24]=-1.3;hm[29][29][31][25]=-1.3;hm[29][29][33][25]=-1.3;hm[29][29][33][26]=-1.3;hm[29][29][33][27]=-1.3;hm[29][29][33][28]=-1.3;hm[29][29][32][28]=-1.3;hm[29][29][32][27]=-1.3;hm[29][29][32][26]=-1.3;hm[29][29][32][25]=-1.3;hm[29][29][31][26]=-1.3;hm[29][29][31][27]=-1.3;hm[29][29][31][28]=-1.3;hm[29][29][30][28]=-1.3;hm[29][29][30][27]=-1.3;hm[29][29][30][26]=-1.3;hm[29][29][30][25]=-1.3;hm[29][29][29][25]=-1.3;hm[29][29][29][26]=-1.3;hm[29][29][29][27]=-1.3;hm[29][29][29][28]=-1.3;hm[29][29][28][28]=-1.3;hm[29][29][28][27]=-1.3;hm[29][29][28][26]=-1.3;hm[29][29][28][25]=-1.3;hm[29][29][31][23]=-1.3;hm[29][29][31][20]=-1.3;hm[29][29][30][19]=-1.3;hm[29][29][30][20]=-1.3;hm[29][29][30][21]=-1.3;hm[29][29][30][22]=-1.3;hm[29][29][30][23]=-1.3;hm[29][29][30][24]=-1.3;hm[29][29][29][23]=-1.3;hm[29][29][29][22]=-1.3;hm[29][29][29][21]=-1.3;hm[29][29][29][20]=-1.3;hm[29][29][29][19]=-1.3;}
if(fi1===35&&fj1===34)
{hm[35][34][24][41]=5.5;hm[35][34][24][40]=5.5;hm[35][34][24][39]=5.5;hm[35][34][24][38]=5.5;hm[35][34][23][38]=5.5;hm[35][34][23][39]=5.5;hm[35][34][23][40]=5.5;hm[35][34][23][41]=5.5;hm[35][34][23][42]=5.5;hm[35][34][22][42]=5.5;hm[35][34][21][42]=5.5;hm[35][34][20][43]=5.5;hm[35][34][21][43]=5.5;hm[35][34][22][43]=5.5;hm[35][34][23][43]=5.5;hm[35][34][24][43]=5.5;hm[35][34][19][43]=5.5;hm[35][34][19][42]=5.5;hm[35][34][19][41]=5.5;hm[35][34][19][40]=5.5;hm[35][34][19][39]=5.5;hm[35][34][19][38]=5.5;hm[35][34][20][38]=5.5;hm[35][34][20][39]=5.5;hm[35][34][20][40]=5.5;hm[35][34][20][41]=5.5;hm[35][34][20][42]=5.5;}
if(fi1===34&&fj1===37)
{hm[34][37][28][20]=0.6;hm[34][37][27][11]=0.6;hm[34][37][27][10]=0.6;hm[34][37][27][9]=0.6;hm[34][37][27][8]=0.6;hm[34][37][27][7]=0.6;hm[34][37][27][6]=0.6;hm[34][37][27][5]=0.6;hm[34][37][27][4]=0.6;hm[34][37][27][3]=0.6;hm[34][37][27][2]=0.6;hm[34][37][27][1]=0.6;hm[34][37][27][0]=0.6;}
if(fi1===34&&fj1===36)
{hm[34][36][27][47]=0.6;hm[34][36][27][46]=0.6;hm[34][36][27][45]=0.6;hm[34][36][27][44]=0.6;hm[34][36][27][43]=0.6;hm[34][36][27][42]=0.6;hm[34][36][27][41]=0.6;hm[34][36][26][41]=0.6;hm[34][36][26][43]=0.6;hm[34][36][26][44]=0.6;hm[34][36][26][45]=0.6;hm[34][36][26][46]=0.6;hm[34][36][26][47]=0.6;hm[34][36][26][48]=0.6;hm[34][36][26][49]=0.6;}
if(fi1===34&&fj1===37)
{hm[34][37][26][0]=0.6;hm[34][37][26][1]=0.6;hm[34][37][26][2]=0.6;hm[34][37][26][3]=0.6;hm[34][37][26][4]=0.6;hm[34][37][26][5]=0.6;hm[34][37][26][6]=0.6;hm[34][37][26][7]=0.6;hm[34][37][26][8]=0.6;hm[34][37][26][9]=0.6;hm[34][37][26][10]=0.6;hm[34][37][26][11]=0.6;}
if(fi1===34&&fj1===36)
{hm[34][36][28][41]=0.6;hm[34][36][29][41]=0.6;hm[34][36][30][42]=0.6;hm[34][36][29][42]=0.6;hm[34][36][28][42]=0.6;hm[34][36][26][42]=0.6;hm[34][36][31][44]=0.6;hm[34][36][32][44]=0.6;hm[34][36][33][44]=0.6;hm[34][36][34][44]=0.6;hm[34][36][35][44]=0.6;hm[34][36][35][43]=0.6;hm[34][36][35][42]=0.6;hm[34][36][35][39]=0.6;hm[34][36][35][38]=0.6;hm[34][36][34][38]=0.6;hm[34][36][33][38]=0.6;hm[34][36][32][38]=0.6;hm[34][36][31][38]=0.6;hm[34][36][30][38]=0.6;hm[34][36][30][40]=0.6;hm[34][36][30][41]=0.6;hm[34][36][31][40]=0.6;hm[34][36][32][39]=0.6;hm[34][36][34][39]=0.6;hm[34][36][35][40]=0.6;hm[34][36][35][40]=0.6;hm[34][36][35][41]=0.6;hm[34][36][30][39]=0.6;hm[34][36][31][39]=0.6;hm[34][36][33][39]=0.6;hm[34][36][33][40]=0.6;hm[34][36][33][42]=0.6;hm[34][36][33][43]=0.6;hm[34][36][32][43]=0.6;hm[34][36][31][43]=0.6;hm[34][36][31][42]=0.6;hm[34][36][31][41]=0.6;hm[34][36][32][41]=0.6;hm[34][36][33][41]=0.6;hm[34][36][32][42]=0.6;}
if(fi1===30&&fj1===40)
{hm[30][40][14][3]=0.1;hm[30][40][13][3]=0.1;hm[30][40][12][3]=0.1;hm[30][40][12][2]=0.1;hm[30][40][11][2]=0.1;hm[30][40][11][1]=0.1;hm[30][40][10][1]=0.1;hm[30][40][10][0]=0.1;hm[30][40][9][0]=0.1;hm[30][40][9][1]=0.1;hm[30][40][9][2]=0.1;hm[30][40][9][3]=0.1;hm[30][40][9][4]=0.1;hm[30][40][9][5]=0.1;hm[30][40][9][6]=0.1;hm[30][40][9][7]=0.1;hm[30][40][9][8]=0.1;hm[30][40][9][9]=0.1;hm[30][40][10][9]=0.1;hm[30][40][10][10]=0.1;hm[30][40][11][10]=0.1;hm[30][40][11][11]=0.1;hm[30][40][12][11]=0.1;hm[30][40][12][12]=0.1;hm[30][40][12][13]=0.1;hm[30][40][13][13]=0.1;hm[30][40][13][14]=0.1;hm[30][40][14][14]=0.1;hm[30][40][15][14]=0.1;hm[30][40][16][14]=0.1;hm[30][40][17][14]=0.1;hm[30][40][17][13]=0.1;hm[30][40][18][13]=0.1;hm[30][40][19][13]=0.1;hm[30][40][19][14]=0.1;hm[30][40][20][14]=0.1;hm[30][40][20][15]=0.1;hm[30][40][20][16]=0.1;hm[30][40][21][16]=0.1;hm[30][40][22][16]=0.1;hm[30][40][23][16]=0.1;hm[30][40][24][16]=0.1;hm[30][40][24][15]=0.1;hm[30][40][25][15]=0.1;hm[30][40][10][2]=0.1;hm[30][40][10][3]=0.1;hm[30][40][10][4]=0.1;hm[30][40][10][5]=0.1;hm[30][40][10][6]=0.1;hm[30][40][10][7]=0.1;hm[30][40][10][8]=0.1;hm[30][40][11][8]=0.1;hm[30][40][11][9]=0.1;hm[30][40][12][9]=0.1;hm[30][40][12][10]=0.1;hm[30][40][13][10]=0.1;hm[30][40][13][11]=0.1;hm[30][40][13][12]=0.1;hm[30][40][14][12]=0.1;hm[30][40][14][13]=0.1;hm[30][40][15][13]=0.1;hm[30][40][16][12]=0.1;hm[30][40][17][12]=0.1;hm[30][40][18][12]=0.1;hm[30][40][19][12]=0.1;hm[30][40][20][12]=0.1;hm[30][40][20][13]=0.1;hm[30][40][21][13]=0.1;hm[30][40][21][14]=0.1;hm[30][40][21][15]=0.1;hm[30][40][22][15]=0.1;}
if(fi1===36&&fj1===36)
{hm[36][36][45][40]=2.5;hm[36][36][46][40]=2.5;hm[36][36][47][40]=2.5;hm[36][36][48][40]=2.5;hm[36][36][49][40]=2.5;}
if(fi1===37&&fj1===36)
{hm[37][36][1][40]=2.5;hm[37][36][2][40]=2.5;hm[37][36][3][40]=2.5;hm[37][36][3][41]=2.5;hm[37][36][2][41]=2.5;hm[37][36][1][41]=2.5;hm[37][36][0][41]=2.5;}
if(fi1===36&&fj1===36)
{hm[36][36][48][41]=2.5;hm[36][36][47][41]=2.5;hm[36][36][46][41]=2.5;hm[36][36][45][41]=2.5;hm[36][36][44][41]=2.5;hm[36][36][44][42]=2.5;hm[36][36][45][42]=2.5;hm[36][36][46][42]=2.5;hm[36][36][47][42]=2.5;hm[36][36][48][42]=2.5;hm[36][36][49][42]=2.5;}
if(fi1===37&&fj1===36)
{hm[37][36][1][42]=2.5;hm[37][36][2][42]=2.5;hm[37][36][3][42]=2.5;hm[37][36][3][43]=2.5;hm[37][36][2][43]=2.5;hm[37][36][1][43]=2.5;hm[37][36][0][43]=2.5;}
if(fi1===36&&fj1===36)
{hm[36][36][48][43]=2.5;hm[36][36][47][43]=2.5;hm[36][36][46][43]=2.5;hm[36][36][45][43]=2.5;hm[36][36][44][43]=2.5;hm[36][36][44][44]=2.5;hm[36][36][45][44]=2.5;hm[36][36][46][44]=2.5;hm[36][36][47][44]=2.5;hm[36][36][48][44]=2.5;hm[36][36][49][44]=2.5;}
if(fi1===37&&fj1===36)
{hm[37][36][1][44]=2.5;hm[37][36][2][44]=2.5;hm[37][36][3][44]=2.5;hm[37][36][3][45]=2.5;hm[37][36][2][45]=2.5;hm[37][36][1][45]=2.5;hm[37][36][0][45]=2.5;}
if(fi1===36&&fj1===36)
{hm[36][36][48][45]=2.5;hm[36][36][47][45]=2.5;hm[36][36][46][45]=2.5;hm[36][36][45][45]=2.5;hm[36][36][44][45]=2.5;}
if(fi1===37&&fj1===37)
{for(let fi=46;fi<=48;fi++){for(let fj=32;fj<=34;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=43;fi<=45;fi++){for(let fj=32;fj<=34;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=40;fi<=42;fi++){for(let fj=32;fj<=34;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=37;fi<=39;fi++){for(let fj=31;fj<=33;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=34;fi<=36;fi++){for(let fj=31;fj<=33;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=31;fi<=33;fi++){for(let fj=31;fj<=33;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=28;fi<=30;fi++){for(let fj=31;fj<=33;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=25;fi<=27;fi++){for(let fj=32;fj<=34;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=22;fi<=24;fi++){for(let fj=33;fj<=35;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=19;fi<=21;fi++){for(let fj=34;fj<=36;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=16;fi<=18;fi++){for(let fj=34;fj<=36;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=13;fi<=15;fi++){for(let fj=34;fj<=36;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=10;fi<=12;fi++){for(let fj=34;fj<=36;fj++){hm[37][37][fi][fj]=8.2;}}
for(let fi=7;fi<=9;fi++){for(let fj=35;fj<=37;fj++){hm[37][37][fi][fj]=8.2;}}}
if(fi1===26&&fj1===41)
{for(let fi=26;fi<=28;fi++){for(let fj=17;fj<=19;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=26;fi<=28;fi++){for(let fj=20;fj<=22;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=26;fi<=28;fi++){for(let fj=23;fj<=25;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=29;fi<=31;fi++){for(let fj=23;fj<=25;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=29;fi<=31;fi++){for(let fj=20;fj<=22;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=29;fi<=31;fi++){for(let fj=17;fj<=19;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=32;fi<=34;fi++){for(let fj=17;fj<=19;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=32;fi<=34;fi++){for(let fj=20;fj<=22;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=32;fi<=34;fi++){for(let fj=23;fj<=25;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=23;fj<=25;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=20;fj<=22;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=17;fj<=19;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=14;fj<=16;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=32;fi<=34;fi++){for(let fj=14;fj<=16;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=29;fi<=31;fi++){for(let fj=14;fj<=16;fj++){hm[26][41][fi][fj]=-0.3;}}
for(let fi=26;fi<=28;fi++){for(let fj=13;fj<=15;fj++){hm[26][41][fi][fj]=-0.3;}}}
if(fi1===26&&fj1===40)
{for(let fi=38;fi<=40;fi++){for(let fj=24;fj<=26;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=38;fi<=40;fi++){for(let fj=27;fj<=29;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=38;fi<=40;fi++){for(let fj=30;fj<=32;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=38;fi<=40;fi++){for(let fj=33;fj<=35;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=41;fi<=43;fi++){for(let fj=33;fj<=35;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=41;fi<=43;fi++){for(let fj=30;fj<=32;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=41;fi<=43;fi++){for(let fj=29;fj<=31;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=41;fi<=43;fi++){for(let fj=26;fj<=28;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=41;fi<=43;fi++){for(let fj=23;fj<=25;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=44;fi<=46;fi++){for(let fj=23;fj<=25;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=44;fi<=46;fi++){for(let fj=26;fj<=28;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=44;fi<=46;fi++){for(let fj=29;fj<=31;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=44;fi<=46;fi++){for(let fj=32;fj<=34;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=47;fi<=48;fi++){for(let fj=32;fj<=34;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=47;fi<=48;fi++){for(let fj=29;fj<=31;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=47;fi<=48;fi++){for(let fj=26;fj<=28;fj++){hm[26][40][fi][fj]=4.0;}}
for(let fi=47;fi<=48;fi++){for(let fj=23;fj<=25;fj++){hm[26][40][fi][fj]=4.0;}}}
if(fi1===27&&fj1===37)
{for(let fi=37;fi<=39;fi++){for(let fj=32;fj<=34;fj++){hm[27][37][fi][fj]=0.5;}}
for(let fi=40;fi<=42;fi++){for(let fj=32;fj<=34;fj++){hm[27][37][fi][fj]=0.5;}}
for(let fi=43;fi<=45;fi++){for(let fj=32;fj<=34;fj++){hm[27][37][fi][fj]=0.5;}}
for(let fi=46;fi<=48;fi++){for(let fj=31;fj<=33;fj++){hm[27][37][fi][fj]=0.5;}}}
if(fi1===28&&fj1===37)
{for(let fi=3;fi<=5;fi++){for(let fj=29;fj<=31;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=6;fi<=8;fi++){for(let fj=28;fj<=30;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=9;fi<=11;fi++){for(let fj=27;fj<=29;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=12;fi<=14;fi++){for(let fj=26;fj<=28;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=15;fi<=17;fi++){for(let fj=25;fj<=27;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=18;fi<=20;fi++){for(let fj=25;fj<=27;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=21;fi<=23;fi++){for(let fj=25;fj<=27;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=24;fi<=26;fi++){for(let fj=25;fj<=27;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=24;fi<=26;fi++){for(let fj=22;fj<=24;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=24;fi<=26;fi++){for(let fj=19;fj<=21;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=25;fi<=27;fi++){for(let fj=15;fj<=17;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=27;fi<=29;fi++){for(let fj=12;fj<=14;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=30;fi<=32;fi++){for(let fj=12;fj<=14;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=33;fi<=35;fi++){for(let fj=11;fj<=13;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=36;fi<=38;fi++){for(let fj=10;fj<=12;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=10;fj<=12;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=9;fj<=11;fj++){hm[28][37][fi][fj]=0.5;}}
for(let fi=45;fi<=47;fi++){for(let fj=9;fj<=11;fj++){hm[28][37][fi][fj]=0.5;}}}
if(fi1===29&&fj1===37)
{for(let fi=2;fi<=4;fi++){for(let fj=8;fj<=10;fj++){hm[29][37][fi][fj]=0.5;}}
for(let fi=5;fi<=7;fi++){for(let fj=8;fj<=10;fj++){hm[29][37][fi][fj]=0.5;}}
for(let fi=7;fi<=9;fi++){for(let fj=7;fj<=9;fj++){hm[29][37][fi][fj]=0.5;}}
for(let fi=10;fi<=12;fi++){for(let fj=7;fj<=9;fj++){hm[29][37][fi][fj]=0.5;}}
for(let fi=13;fi<=15;fi++){for(let fj=7;fj<=9;fj++){hm[29][37][fi][fj]=0.5;}}
for(let fi=16;fi<=18;fi++){for(let fj=7;fj<=9;fj++){hm[29][37][fi][fj]=0.5;}}}
if(fi1===29&&fj1===39)
{for(let fi=36;fi<=38;fi++){for(let fj=22;fj<=24;fj++){hm[29][39][fi][fj]=4.1;}}
for(let fi=39;fi<=41;fi++){for(let fj=22;fj<=24;fj++){hm[29][39][fi][fj]=4.1;}}
for(let fi=42;fi<=44;fi++){for(let fj=22;fj<=24;fj++){hm[29][39][fi][fj]=4.1;}}
for(let fi=45;fi<=49;fi++){for(let fj=22;fj<=24;fj++){hm[29][39][fi][fj]=4.1;}}}
if(fi1===30&&fj1===39)
{for(let fi=0;fi<=4;fi++){for(let fj=22;fj<=24;fj++){hm[30][39][fi][fj]=4.1;}}
for(let fi=5;fi<=7;fi++){for(let fj=22;fj<=24;fj++){hm[30][39][fi][fj]=4.1;}}
for(let fi=8;fi<=10;fi++){for(let fj=22;fj<=24;fj++){hm[30][39][fi][fj]=4.1;}}
for(let fi=11;fi<=13;fi++){for(let fj=22;fj<=24;fj++){hm[30][39][fi][fj]=4.1;}}}
if(fi1===33&&fj1===38)
{for(let fi=2;fi<=4;fi++){for(let fj=26;fj<=28;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=5;fi<=7;fi++){for(let fj=26;fj<=28;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=5;fi<=7;fi++){for(let fj=29;fj<=31;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=5;fi<=7;fi++){for(let fj=32;fj<=34;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=5;fi<=7;fi++){for(let fj=35;fj<=37;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=2;fi<=4;fi++){for(let fj=35;fj<=37;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=2;fi<=4;fi++){for(let fj=32;fj<=34;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=2;fi<=4;fi++){for(let fj=29;fj<=31;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=8;fi<=10;fi++){for(let fj=26;fj<=28;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=8;fi<=10;fi++){for(let fj=29;fj<=31;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=8;fi<=10;fi++){for(let fj=32;fj<=34;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=8;fi<=10;fi++){for(let fj=35;fj<=37;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=11;fi<=13;fi++){for(let fj=35;fj<=37;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=11;fi<=13;fi++){for(let fj=32;fj<=34;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=11;fi<=13;fi++){for(let fj=29;fj<=31;fj++){hm[33][38][fi][fj]=0.4;}}
for(let fi=11;fi<=13;fi++){for(let fj=26;fj<=28;fj++){hm[33][38][fi][fj]=0.4;}}}
if(fi1===33&&fj1===38)
{for(let fi=20;fi<=22;fi++){for(let fj=25;fj<=27;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=28;fj<=30;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=28;fj<=30;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=25;fj<=27;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=22;fj<=24;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=22;fj<=24;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=25;fi<=27;fi++){for(let fj=22;fj<=24;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=25;fi<=27;fi++){for(let fj=25;fj<=27;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=25;fi<=27;fi++){for(let fj=28;fj<=30;fj++){hm[33][38][fi][fj]=5.0;}}
for(let fi=25;fi<=27;fi++){for(let fj=23;fj<=25;fj++){hm[33][38][fi][fj]=5.0;}}}
if(fi1===30&&fj1===29)
{for(let fi=23;fi<=25;fi++){for(let fj=5;fj<=7;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=26;fi<=28;fi++){for(let fj=5;fj<=7;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=29;fi<=31;fi++){for(let fj=5;fj<=7;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=29;fi<=31;fi++){for(let fj=2;fj<=4;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=32;fi<=34;fi++){for(let fj=2;fj<=4;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=34;fi<=36;fi++){for(let fj=2;fj<=4;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=34;fi<=36;fi++){for(let fj=4;fj<=6;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=31;fi<=33;fi++){for(let fj=5;fj<=7;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=28;fi<=30;fi++){for(let fj=8;fj<=10;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=31;fi<=33;fi++){for(let fj=8;fj<=10;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=34;fi<=36;fi++){for(let fj=8;fj<=10;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=32;fi<=34;fi++){for(let fj=10;fj<=12;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=32;fi<=34;fi++){for(let fj=13;fj<=15;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=32;fi<=34;fi++){for(let fj=16;fj<=18;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=29;fi<=31;fi++){for(let fj=16;fj<=18;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=28;fi<=30;fi++){for(let fj=19;fj<=21;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=28;fi<=30;fi++){for(let fj=22;fj<=24;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=31;fi<=33;fi++){for(let fj=23;fj<=25;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=31;fi<=33;fi++){for(let fj=20;fj<=22;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=31;fi<=33;fi++){for(let fj=17;fj<=19;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=34;fi<=36;fi++){for(let fj=17;fj<=19;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=34;fi<=36;fi++){for(let fj=20;fj<=22;fj++){hm[30][29][fi][fj]=13.9;}}}
if(fi1===30&&fj1===29)
{for(let fi=39;fi<=41;fi++){for(let fj=24;fj<=26;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=39;fi<=41;fi++){for(let fj=21;fj<=23;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=41;fi<=43;fi++){for(let fj=18;fj<=20;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=41;fi<=43;fi++){for(let fj=21;fj<=23;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=41;fi<=43;fi++){for(let fj=24;fj<=26;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=43;fi<=45;fi++){for(let fj=24;fj<=26;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=43;fi<=45;fi++){for(let fj=21;fj<=23;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=40;fi<=42;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=43;fi<=45;fi++){for(let fj=25;fj<=27;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=45;fi<=47;fi++){for(let fj=23;fj<=25;fj++){hm[30][29][fi][fj]=16.6;}}
for(let fi=44;fi<=46;fi++){for(let fj=19;fj<=21;fj++){hm[30][29][fi][fj]=16.6;}}}
if(fi1===30&&fj1===29)
{for(let fi=19;fi<=21;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=20;fi<=22;fi++){for(let fj=24;fj<=26;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=23;fi<=25;fi++){for(let fj=24;fj<=26;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=23;fi<=25;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=25;fi<=27;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=23;fi<=25;fi++){for(let fj=30;fj<=32;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=20;fi<=22;fi++){for(let fj=30;fj<=32;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=17;fi<=19;fi++){for(let fj=30;fj<=32;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=17;fi<=19;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=15;fi<=17;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=15;fi<=17;fi++){for(let fj=29;fj<=31;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=13;fi<=15;fi++){for(let fj=27;fj<=29;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=17;fi<=19;fi++){for(let fj=25;fj<=27;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=17;fi<=19;fi++){for(let fj=22;fj<=24;fj++){hm[30][29][fi][fj]=13.7;}}
for(let fi=18;fi<=20;fi++){for(let fj=24;fj<=26;fj++){hm[30][29][fi][fj]=13.7;}}}
if(fi1===30&&fj1===29)
{for(let fi=13;fi<=15;fi++){for(let fj=6;fj<=8;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=13;fi<=15;fi++){for(let fj=3;fj<=5;fj++){hm[30][29][fi][fj]=13.9;}}
for(let fi=13;fi<=15;fi++){for(let fj=1;fj<=2;fj++){hm[30][29][fi][fj]=13.9;}}}
if(fi1===30&&fj1===28)
{for(let fi=13;fi<=15;fi++){for(let fj=43;fj<=45;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=10;fi<=12;fi++){for(let fj=43;fj<=45;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=16;fi<=18;fi++){for(let fj=43;fj<=45;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=19;fi<=21;fi++){for(let fj=43;fj<=45;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=19;fi<=21;fi++){for(let fj=40;fj<=42;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=16;fi<=18;fi++){for(let fj=40;fj<=42;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=13;fi<=15;fi++){for(let fj=40;fj<=42;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=10;fi<=12;fi++){for(let fj=40;fj<=42;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=12;fi<=14;fi++){for(let fj=37;fj<=39;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=15;fi<=17;fi++){for(let fj=37;fj<=39;fj++){hm[30][28][fi][fj]=13.9;}}
for(let fi=18;fi<=20;fi++){for(let fj=37;fj<=39;fj++){hm[30][28][fi][fj]=13.9;}}}
if(fi1===29&&fj1===29)
{for(let fi=44;fi<=46;fi++){for(let fj=14;fj<=16;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=44;fi<=46;fi++){for(let fj=11;fj<=13;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=41;fi<=43;fi++){for(let fj=11;fj<=13;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=41;fi<=43;fi++){for(let fj=14;fj<=16;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=38;fi<=40;fi++){for(let fj=14;fj<=16;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=38;fi<=40;fi++){for(let fj=11;fj<=13;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=11;fj<=13;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=14;fj<=16;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=17;fj<=19;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=20;fj<=22;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=38;fi<=40;fi++){for(let fj=20;fj<=22;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=38;fi<=40;fi++){for(let fj=17;fj<=19;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=41;fi<=43;fi++){for(let fj=17;fj<=19;fj++){hm[29][29][fi][fj]=17.5;}}
for(let fi=41;fi<=43;fi++){for(let fj=20;fj<=22;fj++){hm[29][29][fi][fj]=17.5;}}}
if(fi1===28&&fj1===41)
{for(let fi=36;fi<=38;fi++){for(let fj=0;fj<=2;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=36;fi<=38;fi++){for(let fj=3;fj<=5;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=36;fi<=38;fi++){for(let fj=6;fj<=8;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=36;fi<=38;fi++){for(let fj=9;fj<=11;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=33;fi<=35;fi++){for(let fj=9;fj<=11;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=33;fi<=35;fi++){for(let fj=6;fj<=8;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=33;fi<=35;fi++){for(let fj=3;fj<=5;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=33;fi<=35;fi++){for(let fj=0;fj<=2;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=30;fi<=32;fi++){for(let fj=0;fj<=2;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=30;fi<=32;fi++){for(let fj=3;fj<=5;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=30;fi<=32;fi++){for(let fj=6;fj<=8;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=27;fi<=29;fi++){for(let fj=6;fj<=8;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=27;fi<=29;fi++){for(let fj=3;fj<=5;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=27;fi<=29;fi++){for(let fj=1;fj<=3;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=27;fi<=29;fi++){for(let fj=8;fj<=10;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=30;fi<=32;fi++){for(let fj=8;fj<=10;fj++){hm[28][41][fi][fj]=-1.2;}}
for(let fi=30;fi<=32;fi++){for(let fj=9;fj<=11;fj++){hm[28][41][fi][fj]=-1.2;}}}
if(fi1===31&&fj1===40)
{hm[31][40][35][19]=-1.6;hm[31][40][34][19]=-1.6;hm[31][40][33][19]=-1.6;hm[31][40][32][19]=-1.6;hm[31][40][32][20]=-1.6;hm[31][40][31][20]=-1.6;hm[31][40][30][20]=-1.6;hm[31][40][29][20]=-1.6;hm[31][40][29][21]=-1.6;hm[31][40][29][22]=-1.6;hm[31][40][28][22]=-1.6;hm[31][40][28][23]=-1.6;hm[31][40][27][23]=-1.6;hm[31][40][27][24]=-1.6;hm[31][40][26][24]=-1.6;hm[31][40][25][24]=-1.6;hm[31][40][24][24]=-1.6;hm[31][40][23][24]=-1.6;hm[31][40][23][23]=-1.6;hm[31][40][22][23]=-1.6;hm[31][40][21][23]=-1.6;hm[31][40][20][23]=-1.6;hm[31][40][20][24]=-1.6;hm[31][40][19][24]=-1.6;hm[31][40][19][23]=-1.6;hm[31][40][18][23]=-1.6;hm[31][40][17][23]=-1.6;hm[31][40][16][23]=-1.6;hm[31][40][15][23]=-1.6;hm[31][40][15][22]=-1.6;hm[31][40][15][21]=-1.6;hm[31][40][15][20]=-1.6;hm[31][40][14][20]=-1.6;hm[31][40][14][19]=-1.6;hm[31][40][13][19]=-1.6;hm[31][40][12][19]=-1.6;hm[31][40][12][18]=-1.6;hm[31][40][12][17]=-1.6;hm[31][40][11][17]=-1.6;hm[31][40][10][17]=-1.6;hm[31][40][9][17]=-1.6;hm[31][40][9][18]=-1.6;hm[31][40][8][18]=-1.6;hm[31][40][7][18]=-1.6;hm[31][40][6][18]=-1.6;hm[31][40][5][18]=-1.6;hm[31][40][4][18]=-1.6;hm[31][40][4][19]=-1.6;hm[31][40][3][19]=-1.6;hm[31][40][2][19]=-1.6;hm[31][40][1][19]=-1.6;hm[31][40][1][20]=-1.6;hm[31][40][0][20]=-1.6;}
if(fi1===30&&fj1===40)
{hm[30][40][48][20]=-1.6;}
if(fi1===31&&fj1===40)hm[31][40][42][43]=-1.4;if(fi1===31&&fj1===40)hm[31][40][42][42]=-1.4;if(fi1===31&&fj1===40)hm[31][40][42][41]=-1.4;if(fi1===31&&fj1===40)hm[31][40][41][41]=-1.4;if(fi1===31&&fj1===40)hm[31][40][40][41]=-1.4;if(fi1===31&&fj1===40){for(let fi=37;fi<=39;fi++){for(let fj=40;fj<=42;fj++){hm[31][40][fi][fj]=-1.4;}}}
if(fi1===31&&fj1===40){for(let fi=33;fi<=35;fi++){for(let fj=40;fj<=42;fj++){hm[31][40][fi][fj]=-1.1;}}}
if(fi1===31&&fj1===40){for(let fi=33;fi<=35;fi++){for(let fj=37;fj<=39;fj++){hm[31][40][fi][fj]=-1.1;}}}
if(fi1===31&&fj1===40){for(let fi=35;fi<=37;fi++){for(let fj=36;fj<=38;fj++){hm[31][40][fi][fj]=-1.1;}}}
if(fi1===31&&fj1===40){for(let fi=34;fi<=36;fi++){for(let fj=38;fj<=40;fj++){hm[31][40][fi][fj]=-1.5;}}}
if(fi1===36&&fj1===40)
{for(let fi=28;fi<=30;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}
for(let fi=31;fi<=33;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}
for(let fi=34;fi<=36;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}
for(let fi=37;fi<=39;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}
for(let fi=40;fi<=42;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}
for(let fi=43;fi<=45;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}
for(let fi=46;fi<=48;fi++){for(let fj=22;fj<=26;fj++){hm[36][40][fi][fj]=-2.0;}}}
if(fi1===37&&fj1===40)
{for(let fi=3;fi<=5;fi++){for(let fj=22;fj<=26;fj++){hm[37][40][fi][fj]=-2.0;}}}
if(fi1===38&&fj1===39)
{for(let fi=28;fi<=30;fi++){for(let fj=46;fj<=48;fj++){hm[38][39][fi][fj]=-0.4;}}}
if(fi1===38&&fj1===39)
{for(let fi=42;fi<=44;fi++){for(let fj=42;fj<=44;fj++){hm[38][39][fi][fj]=-0.4;}}}
if(fi1===39&&fj1===39)
{for(let fi=2;fi<=4;fi++){for(let fj=21;fj<=23;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=2;fi<=4;fi++){for(let fj=24;fj<=26;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=3;fi<=5;fi++){for(let fj=26;fj<=28;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=4;fi<=6;fi++){for(let fj=29;fj<=31;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=5;fi<=7;fi++){for(let fj=32;fj<=34;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=6;fi<=8;fi++){for(let fj=35;fj<=37;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=7;fi<=9;fi++){for(let fj=38;fj<=40;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=8;fi<=10;fi++){for(let fj=41;fj<=43;fj++){hm[39][39][fi][fj]=3.1;}}
for(let fi=9;fi<=11;fi++){for(let fj=44;fj<=48;fj++){hm[39][39][fi][fj]=3.1;}}}
if(fi1===38&&fj1===39)
{for(let fi=46;fi<=48;fi++){for(let fj=25;fj<=27;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=45;fi<=47;fi++){for(let fj=27;fj<=29;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=42;fi<=44;fi++){for(let fj=28;fj<=30;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=39;fi<=41;fi++){for(let fj=29;fj<=31;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=36;fi<=38;fi++){for(let fj=29;fj<=31;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=33;fi<=35;fi++){for(let fj=29;fj<=31;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=30;fi<=32;fi++){for(let fj=30;fj<=32;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=27;fi<=29;fi++){for(let fj=31;fj<=33;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=24;fi<=26;fi++){for(let fj=31;fj<=33;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=21;fi<=23;fi++){for(let fj=31;fj<=33;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=18;fi<=20;fi++){for(let fj=31;fj<=33;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=18;fi<=20;fi++){for(let fj=34;fj<=36;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=18;fi<=20;fi++){for(let fj=38;fj<=40;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=15;fi<=17;fi++){for(let fj=38;fj<=40;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=15;fi<=17;fi++){for(let fj=41;fj<=43;fj++){hm[38][39][fi][fj]=3.4;}}
for(let fi=11;fi<=13;fi++){for(let fj=41;fj<=43;fj++){hm[38][39][fi][fj]=3.4;}}}
if(fi1===38&&fj1===40)
{for(let fi=11;fi<=13;fi++){for(let fj=5;fj<=7;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=14;fi<=16;fi++){for(let fj=5;fj<=7;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=17;fi<=19;fi++){for(let fj=6;fj<=8;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=20;fi<=22;fi++){for(let fj=8;fj<=10;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=17;fi<=19;fi++){for(let fj=7;fj<=9;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=23;fi<=25;fi++){for(let fj=9;fj<=11;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=25;fi<=27;fi++){for(let fj=11;fj<=13;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=28;fi<=30;fi++){for(let fj=11;fj<=13;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=35;fi<=37;fi++){for(let fj=12;fj<=14;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=38;fi<=40;fi++){for(let fj=12;fj<=14;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=40;fi<=42;fi++){for(let fj=10;fj<=12;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=43;fi<=45;fi++){for(let fj=9;fj<=11;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=46;fi<=48;fi++){for(let fj=8;fj<=10;fj++){hm[38][40][fi][fj]=3.4;}}
for(let fi=46;fi<=48;fi++){for(let fj=5;fj<=7;fj++){hm[38][40][fi][fj]=3.4;}}}
if(fi1===39&&fj1===40)
{for(let fi=1;fi<=2;fi++){for(let fj=2;fj<=4;fj++){hm[39][40][fi][fj]=3.4;}}
for(let fi=3;fi<=5;fi++){for(let fj=2;fj<=4;fj++){hm[39][40][fi][fj]=3.4;}}
for(let fi=3;fi<=5;fi++){for(let fj=1;fj<=1;fj++){hm[39][40][fi][fj]=3.4;}}
for(let fi=6;fi<=8;fi++){for(let fj=1;fj<=1;fj++){hm[39][40][fi][fj]=3.4;}}}
if(fi1===38&&fj1===33)
{for(let fi=8;fi<=10;fi++){for(let fj=38;fj<=40;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=8;fi<=10;fi++){for(let fj=41;fj<=43;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=8;fi<=10;fi++){for(let fj=44;fj<=46;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=8;fi<=10;fi++){for(let fj=47;fj<=48;fj++){hm[38][33][fi][fj]=1.6;}}}
if(fi1===38&&fj1===34)
{for(let fi=8;fi<=10;fi++){for(let fj=4;fj<=6;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=8;fi<=10;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=11;fi<=13;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=11;fi<=13;fi++){for(let fj=4;fj<=6;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=11;fi<=13;fi++){for(let fj=1;fj<=3;fj++){hm[38][34][fi][fj]=1.6;}}}
if(fi1===38&&fj1===33)
{for(let fi=11;fi<=13;fi++){for(let fj=44;fj<=46;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=14;fi<=16;fi++){for(let fj=44;fj<=46;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=14;fi<=16;fi++){for(let fj=47;fj<=48;fj++){hm[38][33][fi][fj]=1.6;}}}
if(fi1===38&&fj1===34)
{for(let fi=14;fi<=16;fi++){for(let fj=4;fj<=6;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=14;fi<=16;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=17;fi<=19;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=20;fi<=22;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=23;fi<=25;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=25;fi<=27;fi++){for(let fj=7;fj<=9;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=25;fi<=27;fi++){for(let fj=5;fj<=7;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=22;fi<=24;fi++){for(let fj=5;fj<=7;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=19;fi<=21;fi++){for(let fj=5;fj<=7;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=16;fi<=18;fi++){for(let fj=5;fj<=7;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=13;fi<=15;fi++){for(let fj=5;fj<=7;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=17;fi<=19;fi++){for(let fj=3;fj<=5;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=17;fi<=19;fi++){for(let fj=3;fj<=5;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=17;fi<=19;fi++){for(let fj=1;fj<=2;fj++){hm[38][34][fi][fj]=1.6;}}}
if(fi1===38&&fj1===33)
{for(let fi=17;fi<=19;fi++){for(let fj=43;fj<=45;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=17;fi<=19;fi++){for(let fj=40;fj<=42;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=17;fi<=19;fi++){for(let fj=38;fj<=40;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=20;fi<=22;fi++){for(let fj=38;fj<=40;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=20;fi<=22;fi++){for(let fj=40;fj<=42;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=20;fi<=22;fi++){for(let fj=43;fj<=45;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=20;fi<=22;fi++){for(let fj=46;fj<=48;fj++){hm[38][33][fi][fj]=1.6;}}}
if(fi1===38&&fj1===34)
{for(let fi=20;fi<=22;fi++){for(let fj=3;fj<=5;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=23;fi<=25;fi++){for(let fj=3;fj<=5;fj++){hm[38][34][fi][fj]=1.6;}}
for(let fi=23;fi<=25;fi++){for(let fj=1;fj<=2;fj++){hm[38][34][fi][fj]=1.6;}}}
if(fi1===38&&fj1===33)
{for(let fi=23;fi<=25;fi++){for(let fj=43;fj<=45;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=23;fi<=25;fi++){for(let fj=41;fj<=43;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=25;fi<=27;fi++){for(let fj=41;fj<=43;fj++){hm[38][33][fi][fj]=1.6;}}
for(let fi=25;fi<=27;fi++){for(let fj=44;fj<=46;fj++){hm[38][33][fi][fj]=1.6;}}}
if(fi1===33&&fj1===34)
{hm[33][34][0][12]=0.0;hm[33][34][6][6]=0.0;hm[33][34][17][3]=0.0;hm[33][34][27][2]=0.0;hm[33][34][29][5]=0.0;}
if(fi1===33&&fj1===34)
{hm[33][34][36][0]=0.0;hm[33][34][36][0]=0.0;hm[33][34][36][2]=0.0;hm[33][34][38][2]=0.0;hm[33][34][38][4]=0.0;hm[33][34][33][3]=0.0;hm[33][34][29][47]=0.0;hm[33][34][27][47]=0.0;hm[33][34][30][45]=0.0;hm[33][34][28][44]=0.0;hm[33][34][16][48]=0.0;hm[33][34][13][47]=0.0;}
if(fi1===33&&fj1===34)
{hm[33][34][2][45]=0.0;hm[33][34][5][45]=0.0;hm[33][34][5][43]=0.0;hm[33][34][4][43]=0.0;hm[33][34][4][44]=0.0;hm[33][34][3][44]=0.0;hm[33][34][3][43]=0.0;hm[33][34][3][31]=0.0;hm[33][34][2][31]=0.0;hm[33][34][0][24]=0.0;hm[33][34][2][22]=0.0;hm[33][34][2][21]=0.0;hm[33][34][0][20]=0.0;hm[33][34][1][19]=0.0;hm[33][34][1][18]=0.0;}
if(fi1===32&&fj1===29)hm[32][29][2][1]=2.6;if(fi1===32&&fj1===29)hm[32][29][2][2]=2.6;if(fi1===32&&fj1===29)hm[32][29][2][3]=2.6;if(fi1===32&&fj1===29)hm[32][29][2][4]=2.6;if(fi1===32&&fj1===29)hm[32][29][2][5]=2.6;if(fi1===32&&fj1===29)hm[32][29][3][5]=2.6;if(fi1===32&&fj1===29)hm[32][29][3][6]=2.6;if(fi1===32&&fj1===29)hm[32][29][3][7]=2.6;if(fi1===32&&fj1===29)hm[32][29][3][8]=2.6;if(fi1===32&&fj1===29)hm[32][29][4][8]=2.6;if(fi1===32&&fj1===29)hm[32][29][4][9]=2.6;if(fi1===32&&fj1===29)hm[32][29][4][10]=2.6;if(fi1===32&&fj1===29)hm[32][29][4][11]=2.6;if(fi1===32&&fj1===29)hm[32][29][4][12]=2.6;if(fi1===32&&fj1===29)hm[32][29][5][12]=2.6;if(fi1===32&&fj1===29)hm[32][29][6][12]=2.6;if(fi1===32&&fj1===29)hm[32][29][7][12]=2.6;if(fi1===32&&fj1===29){for(let fi=7;fi<=9;fi++){for(let fj=11;fj<=13;fj++){hm[32][29][fi][fj]=2.6;}}}
if(fi1===32&&fj1===29){for(let fi=9;fi<=11;fi++){for(let fj=11;fj<=13;fj++){hm[32][29][fi][fj]=2.9;}}}
if(fi1===32&&fj1===29){for(let fi=9;fi<=11;fi++){for(let fj=8;fj<=10;fj++){hm[32][29][fi][fj]=2.9;}}}
if(fi1===32&&fj1===29){for(let fi=8;fi<=10;fi++){for(let fj=9;fj<=11;fj++){hm[32][29][fi][fj]=2.9;}}}
if(fi1===32&&fj1===29){for(let fi=9;fi<=11;fi++){for(let fj=13;fj<=15;fj++){hm[32][29][fi][fj]=2.9;}}}
if(fi1===38&&fj1===39)
{for(let fi=37;fi<=39;fi++){for(let fj=14;fj<=16;fj++){hm[38][39][fi][fj]=3.7;}}
for(let fi=37;fi<=39;fi++){for(let fj=17;fj<=19;fj++){hm[38][39][fi][fj]=3.7;}}
for(let fi=40;fi<=42;fi++){for(let fj=17;fj<=19;fj++){hm[38][39][fi][fj]=3.7;}}
for(let fi=40;fi<=42;fi++){for(let fj=14;fj<=16;fj++){hm[38][39][fi][fj]=3.7;}}
for(let fi=34;fi<=36;fi++){for(let fj=14;fj<=16;fj++){hm[38][39][fi][fj]=1.7;}}
for(let fi=34;fi<=36;fi++){for(let fj=17;fj<=19;fj++){hm[38][39][fi][fj]=1.7;}}
for(let fi=31;fi<=33;fi++){for(let fj=17;fj<=19;fj++){hm[38][39][fi][fj]=1.7;}}
for(let fi=31;fi<=33;fi++){for(let fj=14;fj<=16;fj++){hm[38][39][fi][fj]=1.7;}}
for(let fi=30;fi<=32;fi++){for(let fj=10;fj<=12;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=33;fi<=35;fi++){for(let fj=10;fj<=12;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=36;fi<=38;fi++){for(let fj=10;fj<=12;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=39;fi<=41;fi++){for(let fj=10;fj<=12;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=39;fi<=41;fi++){for(let fj=20;fj<=22;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=36;fi<=38;fi++){for(let fj=20;fj<=22;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=33;fi<=35;fi++){for(let fj=20;fj<=22;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=30;fi<=32;fi++){for(let fj=20;fj<=22;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=30;fi<=32;fi++){for(let fj=12;fj<=14;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=33;fi<=35;fi++){for(let fj=12;fj<=14;fj++){hm[38][39][fi][fj]=2.0;}}
for(let fi=36;fi<=38;fi++){for(let fj=12;fj<=14;fj++){hm[38][39][fi][fj]=2.0;}}}
if(fi1===37&&fj1===40)
{for(let fi=7;fi<=9;fi++){for(let fj=25;fj<=27;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=7;fi<=9;fi++){for(let fj=22;fj<=24;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=7;fi<=9;fi++){for(let fj=19;fj<=21;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=10;fi<=12;fi++){for(let fj=19;fj<=21;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=10;fi<=12;fi++){for(let fj=22;fj<=24;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=10;fi<=12;fi++){for(let fj=25;fj<=27;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=13;fi<=15;fi++){for(let fj=25;fj<=27;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=13;fi<=15;fi++){for(let fj=22;fj<=24;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=13;fi<=15;fi++){for(let fj=19;fj<=21;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=16;fi<=18;fi++){for(let fj=19;fj<=21;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=16;fi<=18;fi++){for(let fj=23;fj<=25;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=16;fi<=18;fi++){for(let fj=27;fj<=29;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=16;fi<=18;fi++){for(let fj=26;fj<=28;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=16;fi<=18;fi++){for(let fj=22;fj<=24;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=11;fi<=13;fi++){for(let fj=18;fj<=20;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=13;fi<=15;fi++){for(let fj=27;fj<=29;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=8;fi<=10;fi++){for(let fj=28;fj<=30;fj++){hm[37][40][fi][fj]=2.4;}}
for(let fi=6;fi<=8;fi++){for(let fj=27;fj<=29;fj++){hm[37][40][fi][fj]=2.4;}}}
if(fi1===38&&fj1===36)
{for(let fi=31;fi<=33;fi++){for(let fj=40;fj<=42;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=31;fi<=33;fi++){for(let fj=37;fj<=39;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=31;fi<=33;fi++){for(let fj=34;fj<=36;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=34;fi<=36;fi++){for(let fj=34;fj<=36;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=34;fi<=36;fi++){for(let fj=37;fj<=39;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=34;fi<=36;fi++){for(let fj=40;fj<=42;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=37;fi<=39;fi++){for(let fj=40;fj<=42;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=37;fi<=39;fi++){for(let fj=37;fj<=39;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=37;fi<=39;fi++){for(let fj=34;fj<=36;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=37;fi<=39;fi++){for(let fj=31;fj<=33;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=34;fi<=36;fi++){for(let fj=31;fj<=33;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=31;fi<=33;fi++){for(let fj=31;fj<=33;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=30;fi<=32;fi++){for(let fj=36;fj<=38;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=36;fi<=38;fi++){for(let fj=33;fj<=35;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=38;fi<=40;fi++){for(let fj=33;fj<=35;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=40;fi<=42;fi++){for(let fj=33;fj<=35;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=36;fj<=38;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=39;fj<=41;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=42;fj<=44;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=36;fi<=38;fi++){for(let fj=42;fj<=44;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=33;fi<=35;fi++){for(let fj=42;fj<=44;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=42;fj<=44;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=42;fj<=44;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=39;fj<=41;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=36;fj<=38;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=45;fi<=47;fi++){for(let fj=38;fj<=40;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=44;fi<=46;fi++){for(let fj=41;fj<=43;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=27;fi<=29;fi++){for(let fj=32;fj<=34;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=27;fi<=29;fi++){for(let fj=35;fj<=37;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=28;fi<=30;fi++){for(let fj=32;fj<=34;fj++){hm[38][36][fi][fj]=12.5;}}
for(let fi=28;fi<=30;fi++){for(let fj=34;fj<=36;fj++){hm[38][36][fi][fj]=12.5;}}}
if(fi1===29&&fj1===30)
{for(let fi=36;fi<=38;fi++){for(let fj=5;fj<=7;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=36;fi<=38;fi++){for(let fj=8;fj<=10;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=36;fi<=38;fi++){for(let fj=11;fj<=13;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=14;fj<=16;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=17;fj<=19;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=36;fi<=38;fi++){for(let fj=20;fj<=22;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=21;fj<=23;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=18;fj<=20;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=15;fj<=17;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=12;fj<=14;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=39;fi<=41;fi++){for(let fj=9;fj<=11;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=14;fj<=16;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=42;fi<=44;fi++){for(let fj=18;fj<=20;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=37;fi<=39;fi++){for(let fj=13;fj<=15;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=37;fi<=39;fi++){for(let fj=16;fj<=18;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=40;fi<=42;fi++){for(let fj=16;fj<=18;fj++){hm[29][30][fi][fj]=-1.5;}}
for(let fi=35;fi<=37;fi++){for(let fj=4;fj<=6;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=38;fi<=40;fi++){for(let fj=9;fj<=11;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=41;fi<=43;fi++){for(let fj=14;fj<=16;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=41;fi<=43;fi++){for(let fj=18;fj<=20;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=37;fi<=39;fi++){for(let fj=20;fj<=22;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=35;fi<=37;fi++){for(let fj=19;fj<=21;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=34;fi<=36;fi++){for(let fj=16;fj<=18;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=34;fi<=36;fi++){for(let fj=13;fj<=15;fj++){hm[29][30][fi][fj]=-1.1;}}
for(let fi=35;fi<=37;fi++){for(let fj=11;fj<=13;fj++){hm[29][30][fi][fj]=-1.1;}}}
if(fi1===30&&fj1===34)
{for(let fi=31;fi<=33;fi++){for(let fj=11;fj<=13;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=34;fi<=36;fi++){for(let fj=11;fj<=13;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=37;fi<=39;fi++){for(let fj=11;fj<=13;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=40;fi<=42;fi++){for(let fj=11;fj<=13;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=43;fi<=45;fi++){for(let fj=11;fj<=13;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=43;fi<=45;fi++){for(let fj=8;fj<=10;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=40;fi<=42;fi++){for(let fj=8;fj<=10;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=37;fi<=39;fi++){for(let fj=8;fj<=10;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=34;fi<=36;fi++){for(let fj=8;fj<=10;fj++){hm[30][34][fi][fj]=2.0;}}
for(let fi=31;fi<=33;fi++){for(let fj=8;fj<=10;fj++){hm[30][34][fi][fj]=2.0;}}}
if(fi1===29&&fj1===36)
{for(let fi=11;fi<=13;fi++){for(let fj=23;fj<=25;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=8;fi<=10;fi++){for(let fj=23;fj<=25;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=5;fi<=7;fi++){for(let fj=23;fj<=25;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=11;fi<=13;fi++){for(let fj=27;fj<=29;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=8;fi<=10;fi++){for(let fj=27;fj<=29;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=5;fi<=7;fi++){for(let fj=27;fj<=29;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=9;fi<=11;fi++){for(let fj=35;fj<=37;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=6;fi<=8;fi++){for(let fj=35;fj<=37;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=4;fi<=6;fi++){for(let fj=35;fj<=37;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=23;fi<=25;fi++){for(let fj=12;fj<=14;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=23;fi<=25;fi++){for(let fj=9;fj<=11;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=23;fi<=25;fi++){for(let fj=6;fj<=8;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=23;fi<=25;fi++){for(let fj=3;fj<=5;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=27;fi<=29;fi++){for(let fj=3;fj<=5;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=27;fi<=29;fi++){for(let fj=6;fj<=8;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=27;fi<=29;fi++){for(let fj=9;fj<=11;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=27;fi<=29;fi++){for(let fj=12;fj<=14;fj++){hm[29][36][fi][fj]=-0.9;}}
for(let fi=13;fi<=15;fi++){for(let fj=18;fj<=20;fj++){hm[29][36][fi][fj]=-0.7;}}
for(let fi=12;fi<=14;fi++){for(let fj=17;fj<=19;fj++){hm[29][36][fi][fj]=-0.7;}}
for(let fi=11;fi<=13;fi++){for(let fj=16;fj<=18;fj++){hm[29][36][fi][fj]=-0.7;}}
for(let fi=10;fi<=12;fi++){for(let fj=15;fj<=17;fj++){hm[29][36][fi][fj]=-0.7;}}
for(let fi=9;fi<=11;fi++){for(let fj=14;fj<=16;fj++){hm[29][36][fi][fj]=-0.7;}}}
if(fi1===29&&fj1===37)
{for(let fi=9;fi<=11;fi++){for(let fj=20;fj<=22;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=6;fi<=8;fi++){for(let fj=20;fj<=22;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=11;fi<=13;fi++){for(let fj=26;fj<=28;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=8;fi<=10;fi++){for(let fj=26;fj<=28;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=5;fi<=7;fi++){for(let fj=26;fj<=28;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=2;fi<=4;fi++){for(let fj=26;fj<=28;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=2;fi<=4;fi++){for(let fj=29;fj<=31;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=2;fi<=4;fi++){for(let fj=32;fj<=34;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=2;fi<=4;fi++){for(let fj=35;fj<=37;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=2;fi<=4;fi++){for(let fj=38;fj<=40;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=5;fi<=7;fi++){for(let fj=38;fj<=40;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=8;fi<=10;fi++){for(let fj=38;fj<=40;fj++){hm[29][37][fi][fj]=-0.7;}}
for(let fi=9;fi<=11;fi++){for(let fj=38;fj<=40;fj++){hm[29][37][fi][fj]=-0.7;}}}
if(fi1===29&&fj1===38)
{for(let fi=0;fi<=2;fi++){for(let fj=8;fj<=10;fj++){hm[29][38][fi][fj]=-0.7;}}}
if(fi1===29&&fj1===39)
{for(let fi=3;fi<=5;fi++){for(let fj=11;fj<=13;fj++){hm[29][39][fi][fj]=-0.7;}}
for(let fi=1;fi<=2;fi++){for(let fj=11;fj<=13;fj++){hm[29][39][fi][fj]=-0.7;}}
for(let fi=4;fi<=6;fi++){for(let fj=8;fj<=10;fj++){hm[29][39][fi][fj]=-0.7;}}
for(let fi=1;fi<=3;fi++){for(let fj=8;fj<=10;fj++){hm[29][39][fi][fj]=-0.7;}}
for(let fi=1;fi<=3;fi++){for(let fj=5;fj<=7;fj++){hm[29][39][fi][fj]=-0.7;}}}
if(fi1===29&&fj1===40)
{for(let fi=4;fi<=6;fi++){for(let fj=5;fj<=7;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=1;fi<=3;fi++){for(let fj=5;fj<=7;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=1;fi<=3;fi++){for(let fj=8;fj<=10;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=1;fi<=3;fi++){for(let fj=11;fj<=13;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=1;fi<=3;fi++){for(let fj=14;fj<=16;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=4;fi<=6;fi++){for(let fj=14;fj<=16;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=7;fi<=9;fi++){for(let fj=14;fj<=16;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=10;fi<=12;fi++){for(let fj=14;fj<=16;fj++){hm[29][40][fi][fj]=-0.7;}}
for(let fi=13;fi<=15;fi++){for(let fj=14;fj<=16;fj++){hm[29][40][fi][fj]=-0.7;}}}
if(fi1===29&&fj1===37)
{for(let fi=1;fi<=3;fi++){for(let fj=30;fj<=32;fj++){hm[29][37][fi][fj]=-8.9;}}
for(let fi=1;fi<=3;fi++){for(let fj=33;fj<=35;fj++){hm[29][37][fi][fj]=-8.9;}}
for(let fi=1;fi<=3;fi++){for(let fj=36;fj<=38;fj++){hm[29][37][fi][fj]=-8.9;}}
for(let fi=2;fi<=4;fi++){for(let fj=36;fj<=38;fj++){hm[29][37][fi][fj]=-8.9;}}
for(let fi=2;fi<=4;fi++){for(let fj=33;fj<=35;fj++){hm[29][37][fi][fj]=-8.9;}}
for(let fi=2;fi<=4;fi++){for(let fj=30;fj<=32;fj++){hm[29][37][fi][fj]=-8.9;}}
for(let fi=2;fi<=4;fi++){for(let fj=27;fj<=29;fj++){hm[29][37][fi][fj]=-8.9;}}}
if(fi1===30&&fj1===38)
{for(let fi=13;fi<=15;fi++){for(let fj=35;fj<=37;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=13;fi<=15;fi++){for(let fj=32;fj<=34;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=16;fi<=18;fi++){for(let fj=32;fj<=34;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=16;fi<=18;fi++){for(let fj=35;fj<=37;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=16;fi<=18;fi++){for(let fj=38;fj<=40;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=13;fi<=15;fi++){for(let fj=38;fj<=40;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=13;fi<=15;fi++){for(let fj=41;fj<=43;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=16;fi<=18;fi++){for(let fj=41;fj<=43;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=19;fi<=21;fi++){for(let fj=41;fj<=43;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=19;fi<=21;fi++){for(let fj=38;fj<=40;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=19;fi<=21;fi++){for(let fj=35;fj<=37;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=19;fi<=21;fi++){for(let fj=32;fj<=34;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=20;fi<=22;fi++){for(let fj=35;fj<=37;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=21;fi<=23;fi++){for(let fj=38;fj<=40;fj++){hm[30][38][fi][fj]=-0.2;}}
for(let fi=20;fi<=22;fi++){for(let fj=39;fj<=41;fj++){hm[30][38][fi][fj]=-0.2;}}}
if(fi1===30&&fj1===39)
{for(let fi=27;fi<=29;fi++){for(let fj=36;fj<=38;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=27;fi<=29;fi++){for(let fj=33;fj<=35;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=24;fi<=26;fi++){for(let fj=33;fj<=35;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=24;fi<=26;fi++){for(let fj=36;fj<=38;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=30;fi<=32;fi++){for(let fj=36;fj<=38;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=30;fi<=32;fi++){for(let fj=33;fj<=35;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=30;fi<=32;fi++){for(let fj=30;fj<=32;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=27;fi<=29;fi++){for(let fj=30;fj<=32;fj++){hm[30][39][fi][fj]=10.0;}}
for(let fi=24;fi<=26;fi++){for(let fj=30;fj<=32;fj++){hm[30][39][fi][fj]=10.0;}}}
if(fi1===30&&fj1===38)
{hm[30][38][12][36]=-2.0;hm[30][38][13][36]=-2.0;hm[30][38][14][36]=-2.0;hm[30][38][15][36]=-2.0;hm[30][38][16][36]=-2.0;hm[30][38][17][36]=-2.0;hm[30][38][18][36]=-2.0;hm[30][38][18][35]=-2.0;hm[30][38][17][35]=-2.0;hm[30][38][16][35]=-2.0;hm[30][38][16][38]=-2.0;hm[30][38][16][37]=-2.0;hm[30][38][17][37]=-2.0;hm[30][38][18][37]=-2.0;hm[30][38][19][36]=-2.0;}
if(fi1===30&&fj1===37)
{for(let fi=21;fi<=23;fi++){for(let fj=1;fj<=2;fj++){hm[30][37][fi][fj]=-0.8;}}}
if(fi1===30&&fj1===36)
{for(let fi=21;fi<=23;fi++){for(let fj=43;fj<=45;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=22;fi<=24;fi++){for(let fj=40;fj<=42;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=25;fi<=27;fi++){for(let fj=40;fj<=42;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=28;fi<=30;fi++){for(let fj=40;fj<=42;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=28;fi<=30;fi++){for(let fj=37;fj<=39;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=28;fi<=30;fi++){for(let fj=34;fj<=36;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=31;fi<=33;fi++){for(let fj=34;fj<=36;fj++){hm[30][36][fi][fj]=-0.8;}}
for(let fi=34;fi<=36;fi++){for(let fj=34;fj<=36;fj++){hm[30][36][fi][fj]=-0.8;}}}
if(fi1===30&&fj1===37)
{hm[30][37][16][5]=-1.2;hm[30][37][17][5]=-1.2;hm[30][37][18][5]=-1.2;hm[30][37][19][5]=-1.2;hm[30][37][20][5]=-1.2;hm[30][37][20][4]=-1.2;hm[30][37][21][4]=-1.2;hm[30][37][22][4]=-1.2;hm[30][37][23][4]=-1.2;hm[30][37][23][3]=-1.2;hm[30][37][24][3]=-1.2;hm[30][37][25][3]=-1.2;hm[30][37][26][3]=-1.2;hm[30][37][26][4]=-1.2;hm[30][37][27][4]=-1.2;hm[30][37][28][4]=-1.2;hm[30][37][29][4]=-1.2;}
if(fi1===31&&fj1===38)
{for(let fi=3;fi<=5;fi++){for(let fj=42;fj<=44;fj++){hm[31][38][fi][fj]=0.8;}}
for(let fi=3;fi<=5;fi++){for(let fj=40;fj<=42;fj++){hm[31][38][fi][fj]=0.8;}}
for(let fi=6;fi<=8;fi++){for(let fj=40;fj<=42;fj++){hm[31][38][fi][fj]=0.8;}}
for(let fi=6;fi<=8;fi++){for(let fj=43;fj<=45;fj++){hm[31][38][fi][fj]=0.8;}}
for(let fi=9;fi<=11;fi++){for(let fj=43;fj<=45;fj++){hm[31][38][fi][fj]=0.8;}}
for(let fi=9;fi<=11;fi++){for(let fj=40;fj<=42;fj++){hm[31][38][fi][fj]=0.8;}}}
if(fi1===31&&fj1===35)
{for(let fi=12;fi<=14;fi++){for(let fj=32;fj<=34;fj++){hm[31][35][fi][fj]=-0.4;}}
for(let fi=12;fi<=14;fi++){for(let fj=29;fj<=31;fj++){hm[31][35][fi][fj]=-0.4;}}
for(let fi=15;fi<=17;fi++){for(let fj=29;fj<=31;fj++){hm[31][35][fi][fj]=-0.4;}}
for(let fi=15;fi<=17;fi++){for(let fj=32;fj<=34;fj++){hm[31][35][fi][fj]=-0.4;}}
for(let fi=13;fi<=15;fi++){for(let fj=34;fj<=36;fj++){hm[31][35][fi][fj]=-0.4;}}
for(let fi=10;fi<=12;fi++){for(let fj=30;fj<=32;fj++){hm[31][35][fi][fj]=-0.4;}}}
if(fi1===37&&fj1===35)
{for(let fi=24;fi<=26;fi++){for(let fj=45;fj<=47;fj++){hm[37][35][fi][fj]=2.3;}}
for(let fi=27;fi<=29;fi++){for(let fj=45;fj<=47;fj++){hm[37][35][fi][fj]=2.3;}}
for(let fi=30;fi<=32;fi++){for(let fj=45;fj<=47;fj++){hm[37][35][fi][fj]=2.3;}}
for(let fi=30;fi<=32;fi++){for(let fj=42;fj<=44;fj++){hm[37][35][fi][fj]=2.3;}}
for(let fi=27;fi<=29;fi++){for(let fj=42;fj<=44;fj++){hm[37][35][fi][fj]=2.3;}}
for(let fi=24;fi<=26;fi++){for(let fj=42;fj<=44;fj++){hm[37][35][fi][fj]=2.3;}}
for(let fi=22;fi<=24;fi++){for(let fj=45;fj<=47;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=22;fi<=24;fi++){for(let fj=42;fj<=44;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=22;fi<=24;fi++){for(let fj=39;fj<=41;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=22;fi<=24;fi++){for(let fj=36;fj<=38;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=25;fi<=27;fi++){for(let fj=36;fj<=38;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=28;fi<=30;fi++){for(let fj=36;fj<=38;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=31;fi<=33;fi++){for(let fj=36;fj<=38;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=34;fi<=36;fi++){for(let fj=36;fj<=38;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=34;fi<=36;fi++){for(let fj=39;fj<=41;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=34;fi<=36;fi++){for(let fj=42;fj<=44;fj++){hm[37][35][fi][fj]=0.1;}}
for(let fi=34;fi<=36;fi++){for(let fj=45;fj<=47;fj++){hm[37][35][fi][fj]=0.1;}}}
if(fi1===36&&fj1===41)
{for(let fi=46;fi<=48;fi++){for(let fj=3;fj<=5;fj++){hm[36][41][fi][fj]=5.2;}}
for(let fi=46;fi<=48;fi++){for(let fj=1;fj<=2;fj++){hm[36][41][fi][fj]=5.2;}}}
if(fi1===36&&fj1===40)
{for(let fi=45;fi<=47;fi++){for(let fj=46;fj<=48;fj++){hm[36][40][fi][fj]=5.2;}}}
if(fi1===36&&fj1===41)
{for(let fi=45;fi<=47;fi++){for(let fj=3;fj<=5;fj++){hm[36][41][fi][fj]=5.2;}}
for(let fi=45;fi<=47;fi++){for(let fj=4;fj<=6;fj++){hm[36][41][fi][fj]=5.2;}}}
if(fi1===33&&fj1===37)
{for(let fi=43;fi<=45;fi++){for(let fj=25;fj<=27;fj++){hm[33][37][fi][fj]=-0.3;}}
for(let fi=46;fi<=48;fi++){for(let fj=25;fj<=27;fj++){hm[33][37][fi][fj]=-0.3;}}}
if(fi1===34&&fj1===37)
{for(let fi=3;fi<=5;fi++){for(let fj=25;fj<=27;fj++){hm[34][37][fi][fj]=-0.3;}}
for(let fi=6;fi<=8;fi++){for(let fj=25;fj<=27;fj++){hm[34][37][fi][fj]=-0.3;}}
for(let fi=9;fi<=11;fi++){for(let fj=25;fj<=27;fj++){hm[34][37][fi][fj]=-0.3;}}
for(let fi=12;fi<=14;fi++){for(let fj=25;fj<=27;fj++){hm[34][37][fi][fj]=-0.3;}}
for(let fi=15;fi<=17;fi++){for(let fj=25;fj<=27;fj++){hm[34][37][fi][fj]=-0.3;}}
for(let fi=18;fi<=20;fi++){for(let fj=25;fj<=27;fj++){hm[34][37][fi][fj]=-0.3;}}}
if(fi1===31&&fj1===35)
{for(let fi=15;fi<=17;fi++){for(let fj=19;fj<=21;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=18;fi<=20;fi++){for(let fj=19;fj<=21;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=21;fi<=23;fi++){for(let fj=19;fj<=21;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=24;fi<=26;fi++){for(let fj=19;fj<=21;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=24;fi<=26;fi++){for(let fj=22;fj<=24;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=24;fi<=26;fi++){for(let fj=25;fj<=27;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=24;fi<=26;fi++){for(let fj=28;fj<=30;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=27;fi<=29;fi++){for(let fj=28;fj<=30;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=21;fi<=23;fi++){for(let fj=28;fj<=30;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=21;fi<=23;fi++){for(let fj=25;fj<=27;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=21;fi<=23;fi++){for(let fj=22;fj<=24;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=18;fi<=20;fi++){for(let fj=22;fj<=24;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=15;fi<=17;fi++){for(let fj=22;fj<=24;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=12;fi<=14;fi++){for(let fj=20;fj<=22;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=13;fi<=15;fi++){for(let fj=17;fj<=19;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=24;fi<=26;fi++){for(let fj=30;fj<=32;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=27;fi<=29;fi++){for(let fj=30;fj<=32;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=29;fi<=31;fi++){for(let fj=28;fj<=30;fj++){hm[31][35][fi][fj]=1.8;}}
for(let fi=32;fi<=34;fi++){for(let fj=28;fj<=30;fj++){hm[31][35][fi][fj]=1.8;}}}
if(fi1===31&&fj1===33)hm[31][33][32][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][33][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][34][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][35][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][36][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][37][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][38][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][39][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][40][16]=-0.8;if(fi1===31&&fj1===33)hm[31][33][40][15]=-0.8;if(fi1===31&&fj1===33)hm[31][33][40][14]=-0.8;if(fi1===31&&fj1===33)hm[31][33][41][14]=-0.8;if(fi1===31&&fj1===33)hm[31][33][42][14]=-0.8;if(fi1===31&&fj1===33)hm[31][33][43][14]=-0.8;if(fi1===31&&fj1===33)hm[31][33][43][13]=-0.8;if(fi1===31&&fj1===33)hm[31][33][44][13]=-0.8;if(fi1===31&&fj1===33)hm[31][33][44][12]=-0.8;if(fi1===31&&fj1===33)hm[31][33][45][12]=-0.8;if(fi1===31&&fj1===33)hm[31][33][45][11]=-0.8;if(fi1===31&&fj1===33)hm[31][33][45][10]=-0.8;if(fi1===31&&fj1===33)hm[31][33][45][9]=-0.8;if(fi1===31&&fj1===33)hm[31][33][45][8]=-0.8;if(fi1===31&&fj1===33){for(let fi=44;fi<=46;fi++){for(let fj=9;fj<=11;fj++){hm[31][33][fi][fj]=-0.8;}}}
if(fi1===31&&fj1===33){for(let fi=42;fi<=44;fi++){for(let fj=9;fj<=11;fj++){hm[31][33][fi][fj]=-0.8;}}}
if(fi1===31&&fj1===33){for(let fi=46;fi<=48;fi++){for(let fj=9;fj<=11;fj++){hm[31][33][fi][fj]=-0.8;}}}
if(fi1===31&&fj1===33)hm[31][33][34][15]=-0.6;if(fi1===31&&fj1===33)hm[31][33][35][15]=-0.6;if(fi1===31&&fj1===33)hm[31][33][36][15]=-0.6;if(fi1===31&&fj1===33)hm[31][33][37][15]=-0.6;if(fi1===31&&fj1===33)hm[31][33][38][15]=-0.6;if(fi1===31&&fj1===33)hm[31][33][38][14]=-0.7;if(fi1===31&&fj1===33)hm[31][33][39][14]=-0.7;if(fi1===31&&fj1===33)hm[31][33][39][14]=-0.7;if(fi1===31&&fj1===33)hm[31][33][39][13]=-0.7;if(fi1===31&&fj1===33)hm[31][33][40][12]=-0.7;if(fi1===31&&fj1===33)hm[31][33][41][12]=-0.7;if(fi1===31&&fj1===33)hm[31][33][42][12]=-0.7;if(fi1===31&&fj1===33)hm[31][33][40][11]=-0.7;if(fi1===31&&fj1===33){for(let fi=37;fi<=39;fi++){for(let fj=14;fj<=16;fj++){hm[31][33][fi][fj]=-0.5;}}}
if(fi1===31&&fj1===33){for(let fi=39;fi<=41;fi++){for(let fj=14;fj<=16;fj++){hm[31][33][fi][fj]=-0.5;}}}
if(fi1===31&&fj1===33){for(let fi=41;fi<=43;fi++){for(let fj=13;fj<=15;fj++){hm[31][33][fi][fj]=-0.5;}}}
if(fi1===31&&fj1===33){for(let fi=40;fi<=42;fi++){for(let fj=11;fj<=13;fj++){hm[31][33][fi][fj]=-0.5;}}}
if(fi1===31&&fj1===33){for(let fi=44;fi<=46;fi++){for(let fj=6;fj<=8;fj++){hm[31][33][fi][fj]=-0.8;}}}
if(fi1===31&&fj1===33){for(let fi=46;fi<=48;fi++){for(let fj=11;fj<=13;fj++){hm[31][33][fi][fj]=-0.8;}}}
if(fi1===36&&fj1===30)
{for(let fi=14;fi<=16;fi++){for(let fj=15;fj<=17;fj++){hm[36][30][fi][fj]=0;}}
for(let fi=14;fi<=16;fi++){for(let fj=16;fj<=18;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=14;fi<=16;fi++){for(let fj=13;fj<=15;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=14;fi<=16;fi++){for(let fj=10;fj<=12;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=14;fi<=16;fi++){for(let fj=7;fj<=9;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=17;fi<=19;fi++){for(let fj=7;fj<=9;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=17;fi<=19;fi++){for(let fj=10;fj<=12;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=17;fi<=19;fi++){for(let fj=13;fj<=15;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=17;fi<=19;fi++){for(let fj=16;fj<=18;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=16;fj<=18;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=13;fj<=15;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=10;fj<=12;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=7;fj<=9;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=11;fj<=13;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=14;fi<=16;fi++){for(let fj=4;fj<=6;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=17;fi<=19;fi++){for(let fj=4;fj<=6;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=4;fj<=6;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=4;fj<=6;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=7;fj<=9;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=26;fi<=28;fi++){for(let fj=7;fj<=9;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=26;fi<=28;fi++){for(let fj=10;fj<=12;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=26;fi<=28;fi++){for(let fj=13;fj<=15;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=13;fj<=15;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=16;fj<=18;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=23;fi<=25;fi++){for(let fj=19;fj<=21;fj++){hm[36][30][fi][fj]=-1.0;}}
for(let fi=20;fi<=22;fi++){for(let fj=19;fj<=21;fj++){hm[36][30][fi][fj]=-1.0;}}}
if(fi1===38&&fj1===28)
{for(let fi=32;fi<=34;fi++){for(let fj=25;fj<=27;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=31;fi<=33;fi++){for(let fj=28;fj<=30;fj++){hm[38][28][fi][fj]=2.0;}}
for(let fi=30;fi<=32;fi++){for(let fj=14;fj<=16;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=31;fi<=33;fi++){for(let fj=13;fj<=15;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=28;fi<=30;fi++){for(let fj=12;fj<=14;fj++){hm[38][28][fi][fj]=2.0;}}
for(let fi=25;fi<=27;fi++){for(let fj=11;fj<=13;fj++){hm[38][28][fi][fj]=7.2;}}
for(let fi=25;fi<=27;fi++){for(let fj=10;fj<=12;fj++){hm[38][28][fi][fj]=7.2;}}
for(let fi=24;fi<=26;fi++){for(let fj=10;fj<=12;fj++){hm[38][28][fi][fj]=7.2;}}
for(let fi=22;fi<=24;fi++){for(let fj=10;fj<=12;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=21;fi<=23;fi++){for(let fj=29;fj<=31;fj++){hm[38][28][fi][fj]=7.4;}}
for(let fi=26;fi<=28;fi++){for(let fj=30;fj<=32;fj++){hm[38][28][fi][fj]=2.0;}}
for(let fi=16;fi<=18;fi++){for(let fj=28;fj<=30;fj++){hm[38][28][fi][fj]=7.1;}}
for(let fi=32;fi<=34;fi++){for(let fj=19;fj<=21;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=32;fi<=34;fi++){for(let fj=21;fj<=23;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=32;fi<=34;fi++){for(let fj=17;fj<=19;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=17;fj<=19;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=19;fj<=21;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=35;fi<=37;fi++){for(let fj=21;fj<=23;fj++){hm[38][28][fi][fj]=7.3;}}
for(let fi=38;fi<=40;fi++){for(let fj=20;fj<=22;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=38;fi<=40;fi++){for(let fj=19;fj<=21;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=38;fi<=40;fi++){for(let fj=17;fj<=19;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=41;fi<=43;fi++){for(let fj=17;fj<=19;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=41;fi<=43;fi++){for(let fj=19;fj<=21;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=41;fi<=43;fi++){for(let fj=21;fj<=23;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=43;fi<=45;fi++){for(let fj=19;fj<=21;fj++){hm[38][28][fi][fj]=0.8;}}
for(let fi=38;fi<=40;fi++){for(let fj=20;fj<=22;fj++){hm[38][28][fi][fj]=4.1;}}
for(let fi=38;fi<=40;fi++){for(let fj=18;fj<=20;fj++){hm[38][28][fi][fj]=4.1;}}
for(let fi=38;fi<=40;fi++){for(let fj=17;fj<=19;fj++){hm[38][28][fi][fj]=4.1;}}
for(let fi=31;fi<=33;fi++){for(let fj=19;fj<=21;fj++){hm[38][28][fi][fj]=10.4;}}
for(let fi=31;fi<=33;fi++){for(let fj=21;fj<=23;fj++){hm[38][28][fi][fj]=10.4;}}
for(let fi=31;fi<=33;fi++){for(let fj=17;fj<=19;fj++){hm[38][28][fi][fj]=10.4;}}}
if(fi1===31&&fj1===33)
{hm[31][33][13][24]=-2.0;hm[31][33][12][24]=-2.0;hm[31][33][11][24]=-2.0;hm[31][33][11][23]=-2.0;hm[31][33][10][23]=-2.0;hm[31][33][10][22]=-2.0;hm[31][33][9][22]=-2.0;hm[31][33][9][21]=-2.0;hm[31][33][9][20]=-2.0;hm[31][33][9][19]=-2.0;hm[31][33][8][19]=-2.0;hm[31][33][7][19]=-2.0;hm[31][33][6][19]=-2.0;hm[31][33][6][20]=-2.0;hm[31][33][5][20]=-2.0;hm[31][33][5][21]=-2.0;hm[31][33][4][21]=-2.0;hm[31][33][4][23]=-2.0;hm[31][33][4][22]=-2.0;hm[31][33][4][24]=-2.0;hm[31][33][3][24]=-2.0;hm[31][33][2][24]=-2.0;hm[31][33][2][25]=-2.0;hm[31][33][1][25]=-2.0;hm[31][33][1][26]=-2.0;hm[31][33][0][26]=-2.0;}
if(fi1===30&&fj1===33)
{hm[30][33][48][27]=-2.0;hm[30][33][48][28]=-2.0;hm[30][33][48][29]=-2.0;hm[30][33][48][30]=-2.0;hm[30][33][48][31]=-2.0;}
if(fi1===31&&fj1===33)
{hm[31][33][0][32]=-2.0;}
if(fi1===30&&fj1===33)
{hm[30][33][47][32]=-2.0;hm[30][33][47][33]=-2.0;hm[30][33][46][33]=-2.0;hm[30][33][46][34]=-2.0;}
if(fi1===32&&fj1===34)
{hm[32][34][7][32]=-4.2;hm[32][34][7][31]=-4.2;hm[32][34][6][31]=-4.2;hm[32][34][6][32]=-4.2;hm[32][34][5][32]=-4.2;hm[32][34][5][31]=-4.2;hm[32][34][4][31]=-4.2;hm[32][34][4][32]=-4.2;hm[32][34][4][32]=-4.2;hm[32][34][3][32]=-4.2;hm[32][34][3][31]=-4.2;hm[32][34][2][31]=-4.2;hm[32][34][2][32]=-4.2;hm[32][34][1][32]=-4.2;hm[32][34][1][31]=-4.2;hm[32][34][0][31]=-4.2;hm[32][34][0][32]=-4.2;}
if(fi1===31&&fj1===34)
{hm[31][34][48][31]=-4.2;hm[31][34][47][31]=-4.2;hm[31][34][47][32]=-4.2;hm[31][34][46][32]=-4.2;hm[31][34][46][31]=-4.2;hm[31][34][45][31]=-4.2;hm[31][34][45][32]=-4.2;hm[31][34][44][32]=-4.2;hm[31][34][44][31]=-4.2;hm[31][34][43][31]=-4.2;hm[31][34][43][32]=-4.2;hm[31][34][42][32]=-4.2;hm[31][34][42][31]=-4.2;hm[31][34][41][31]=-4.2;hm[31][34][41][32]=-4.2;hm[31][34][40][32]=-4.2;hm[31][34][40][31]=-4.2;hm[31][34][39][31]=-4.2;hm[31][34][39][32]=-4.2;hm[31][34][38][32]=-4.2;hm[31][34][38][31]=-4.2;hm[31][34][37][31]=-4.2;hm[31][34][37][32]=-4.2;hm[31][34][36][32]=-4.2;hm[31][34][36][31]=-4.2;hm[31][34][35][31]=-4.2;hm[31][34][35][32]=-4.2;hm[31][34][34][32]=-4.2;hm[31][34][34][31]=-4.2;hm[31][34][33][31]=-4.2;hm[31][34][33][32]=-4.2;hm[31][34][32][32]=-4.2;hm[31][34][32][31]=-4.2;hm[31][34][31][32]=-4.2;hm[31][34][31][33]=-4.2;hm[31][34][30][33]=-4.2;hm[31][34][30][32]=-4.2;hm[31][34][29][32]=-4.2;hm[31][34][29][33]=-4.2;hm[31][34][28][33]=-4.2;}
if(fi1===32&&fj1===29)
{hm[32][29][25][28]=0.4;hm[32][29][25][29]=0.4;hm[32][29][25][30]=0.4;hm[32][29][25][31]=0.4;hm[32][29][25][32]=0.4;hm[32][29][25][33]=0.4;hm[32][29][25][34]=0.4;hm[32][29][25][35]=0.4;hm[32][29][25][36]=0.4;hm[32][29][25][37]=0.4;hm[32][29][25][38]=0.4;hm[32][29][25][39]=0.4;hm[32][29][25][40]=0.4;hm[32][29][25][41]=0.4;hm[32][29][25][42]=0.4;hm[32][29][25][43]=0.4;hm[32][29][25][44]=0.4;hm[32][29][25][45]=0.4;hm[32][29][25][46]=0.4;hm[32][29][25][47]=0.4;}
if(fi1===30&&fj1===31)
{for(let fi=32;fi<=34;fi++){for(let fj=6;fj<=8;fj++){hm[30][31][fi][fj]=2.1;}}
for(let fi=30;fi<=32;fi++){for(let fj=6;fj<=8;fj++){hm[30][31][fi][fj]=2.1;}}
for(let fi=30;fi<=32;fi++){for(let fj=4;fj<=6;fj++){hm[30][31][fi][fj]=2.1;}}
for(let fi=32;fi<=34;fi++){for(let fj=5;fj<=7;fj++){hm[30][31][fi][fj]=2.1;}}}
if(fi1===39&&fj1===37)
{for(let fi=16;fi<=18;fi++){for(let fj=45;fj<=47;fj++){hm[39][37][fi][fj]=0;}}}
if(fi1===38&&fj1===37)
{for(let fi=8;fi<=10;fi++){for(let fj=4;fj<=6;fj++){hm[38][37][fi][fj]=34.2;}}
for(let fi=5;fi<=7;fi++){for(let fj=4;fj<=6;fj++){hm[38][37][fi][fj]=34.2;}}
for(let fi=5;fi<=7;fi++){for(let fj=1;fj<=3;fj++){hm[38][37][fi][fj]=34.2;}}}
if(fi1===38&&fj1===36)
{for(let fi=2;fi<=4;fi++){for(let fj=47;fj<=49;fj++){hm[38][36][fi][fj]=34.2;}}}
if(fi1===38&&fj1===37)
{for(let fi=2;fi<=4;fi++){for(let fj=4;fj<=6;fj++){hm[38][37][fi][fj]=34.2;}}}
if(1===0)
{if(fi1===37&&fj1===39){for(let fi=24;fi<=30;fi++){for(let fj=27;fj<=33;fj++){hm[37][39][fi][fj]=2.2;}}}
if(fi1===37&&fj1===39){for(let fi=27;fi<=33;fi++){for(let fj=24;fj<=30;fj++){hm[37][39][fi][fj]=2.2;}}}
if(fi1===37&&fj1===39){for(let fi=30;fi<=36;fi++){for(let fj=22;fj<=28;fj++){hm[37][39][fi][fj]=2.2;}}}
if(fi1===37&&fj1===39){for(let fi=33;fi<=39;fi++){for(let fj=21;fj<=27;fj++){hm[37][39][fi][fj]=2.8;}}}
if(fi1===37&&fj1===39){for(let fi=36;fi<=42;fi++){for(let fj=21;fj<=27;fj++){hm[37][39][fi][fj]=2.8;}}}
if(fi1===37&&fj1===39){for(let fi=42;fi<=49;fi++){for(let fj=19;fj<=25;fj++){hm[37][39][fi][fj]=3.0;}}}
if(fi1===37&&fj1===39){for(let fi=42;fi<=49;fi++){for(let fj=18;fj<=24;fj++){hm[37][39][fi][fj]=3.0;}}}
if(fi1===37&&fj1===39){for(let fi=42;fi<=49;fi++){for(let fj=18;fj<=24;fj++){hm[37][39][fi][fj]=3.0;}}}
if(fi1===38&&fj1===39){for(let fi=0;fi<=6;fi++){for(let fj=18;fj<=24;fj++){hm[38][39][fi][fj]=3.0;}}}
if(fi1===38&&fj1===39){for(let fi=3;fi<=9;fi++){for(let fj=17;fj<=23;fj++){hm[38][39][fi][fj]=3.0;}}}
if(fi1===38&&fj1===39){for(let fi=22;fi<=28;fi++){for(let fj=7;fj<=13;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=26;fi<=32;fi++){for(let fj=5;fj<=11;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=27;fi<=33;fi++){for(let fj=5;fj<=11;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=32;fi<=38;fi++){for(let fj=3;fj<=9;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=37;fi<=43;fi++){for(let fj=0;fj<=6;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=40;fi<=46;fi++){for(let fj=0;fj<=6;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===38){for(let fi=43;fi<=49;fi++){for(let fj=43;fj<=49;fj++){hm[38][38][fi][fj]=2.3;}}}
if(fi1===39&&fj1===38){for(let fi=2;fi<=8;fi++){for(let fj=13;fj<=19;fj++){hm[39][38][fi][fj]=3.6;}}}
if(fi1===39&&fj1===38){for(let fi=3;fi<=9;fi++){for(let fj=9;fj<=15;fj++){hm[39][38][fi][fj]=3.7;}}}
if(fi1===39&&fj1===38){for(let fi=4;fi<=10;fi++){for(let fj=4;fj<=10;fj++){hm[39][38][fi][fj]=3.8;}}}
if(fi1===39&&fj1===38){for(let fi=4;fi<=10;fi++){for(let fj=0;fj<=6;fj++){hm[39][38][fi][fj]=4.0;}}}
if(fi1===39&&fj1===37){for(let fi=5;fi<=11;fi++){for(let fj=43;fj<=49;fj++){hm[39][37][fi][fj]=4.0;}}}
if(fi1===39&&fj1===37){for(let fi=5;fi<=11;fi++){for(let fj=41;fj<=47;fj++){hm[39][37][fi][fj]=4.2;}}}
if(fi1===39&&fj1===37){for(let fi=5;fi<=11;fi++){for(let fj=38;fj<=44;fj++){hm[39][37][fi][fj]=4.3;}}}
if(fi1===39&&fj1===37){for(let fi=5;fi<=11;fi++){for(let fj=34;fj<=40;fj++){hm[39][37][fi][fj]=4.4;}}}
if(fi1===39&&fj1===37){for(let fi=4;fi<=10;fi++){for(let fj=31;fj<=37;fj++){hm[39][37][fi][fj]=4.5;}}}
if(fi1===39&&fj1===37){for(let fi=4;fi<=10;fi++){for(let fj=29;fj<=35;fj++){hm[39][37][fi][fj]=4.6;}}}
if(fi1===39&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=23;fj<=29;fj++){hm[39][37][fi][fj]=5.7;}}}
if(fi1===39&&fj1===37){for(let fi=1;fi<=7;fi++){for(let fj=26;fj<=32;fj++){hm[39][37][fi][fj]=5.2;}}}
if(fi1===39&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=21;fj<=27;fj++){hm[39][37][fi][fj]=5.7;}}}
if(fi1===38&&fj1===37){for(let fi=43;fi<=49;fi++){for(let fj=19;fj<=25;fj++){hm[38][37][fi][fj]=5.7;}}}
if(fi1===38&&fj1===37){for(let fi=42;fi<=48;fi++){for(let fj=16;fj<=22;fj++){hm[38][37][fi][fj]=6.4;}}}
if(fi1===38&&fj1===37){for(let fi=37;fi<=43;fi++){for(let fj=13;fj<=19;fj++){hm[38][37][fi][fj]=7.0;}}}
if(fi1===38&&fj1===37){for(let fi=32;fi<=38;fi++){for(let fj=11;fj<=17;fj++){hm[38][37][fi][fj]=7.8;}}}
if(fi1===37&&fj1===37){for(let fi=43;fi<=49;fi++){for(let fj=29;fj<=35;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=27;fj<=33;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=1;fi<=7;fi++){for(let fj=25;fj<=31;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=7;fi<=13;fi++){for(let fj=20;fj<=26;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=11;fi<=17;fi++){for(let fj=17;fj<=23;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=19;fi<=25;fi++){for(let fj=14;fj<=20;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=14;fi<=20;fi++){for(let fj=15;fj<=21;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=27;fj<=33;fj++){hm[38][37][fi][fj]=8.5;}}}
if(fi1===38&&fj1===37){for(let fi=2;fi<=8;fi++){for(let fj=26;fj<=32;fj++){hm[38][37][fi][fj]=8.4;}}}
if(fi1===38&&fj1===37){for(let fi=4;fi<=10;fi++){for(let fj=25;fj<=31;fj++){hm[38][37][fi][fj]=8.4;}}}
if(fi1===38&&fj1===37){for(let fi=6;fi<=12;fi++){for(let fj=24;fj<=30;fj++){hm[38][37][fi][fj]=8.3;}}}
if(fi1===38&&fj1===37){for(let fi=8;fi<=14;fi++){for(let fj=24;fj<=30;fj++){hm[38][37][fi][fj]=8.2;}}}
if(fi1===38&&fj1===37){for(let fi=9;fi<=15;fi++){for(let fj=23;fj<=29;fj++){hm[38][37][fi][fj]=8.1;}}}
if(fi1===38&&fj1===37){for(let fi=12;fi<=18;fi++){for(let fj=22;fj<=28;fj++){hm[38][37][fi][fj]=8.0;}}}
if(fi1===38&&fj1===37){for(let fi=16;fi<=22;fi++){for(let fj=20;fj<=26;fj++){hm[38][37][fi][fj]=7.8;}}}
if(fi1===38&&fj1===37){for(let fi=21;fi<=27;fi++){for(let fj=17;fj<=23;fj++){hm[38][37][fi][fj]=7.6;}}}
if(fi1===38&&fj1===37){for(let fi=25;fi<=31;fi++){for(let fj=15;fj<=21;fj++){hm[38][37][fi][fj]=7.4;}}}
if(fi1===38&&fj1===37){for(let fi=29;fi<=35;fi++){for(let fj=13;fj<=19;fj++){hm[38][37][fi][fj]=7.2;}}}
if(fi1===38&&fj1===37){for(let fi=35;fi<=41;fi++){for(let fj=13;fj<=19;fj++){hm[38][37][fi][fj]=7.0;}}}}
if(fi1===37&&fj1===37){for(let fi=39;fi<=45;fi++){for(let fj=29;fj<=35;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=35;fi<=41;fi++){for(let fj=29;fj<=35;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=27;fi<=33;fi++){for(let fj=28;fj<=34;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=31;fi<=37;fi++){for(let fj=28;fj<=34;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=24;fi<=30;fi++){for(let fj=29;fj<=35;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=20;fi<=26;fi++){for(let fj=30;fj<=36;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=16;fi<=22;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=13;fi<=19;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=8;fi<=14;fi++){for(let fj=32;fj<=38;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=2;fi<=8;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=1;fi<=7;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=3;fi<=9;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=1;fi<=7;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===37&&fj1===37){for(let fi=0;fi<=6;fi++){for(let fj=31;fj<=37;fj++){hm[37][37][fi][fj]=8.5;}}}
if(fi1===36&&fj1===37){for(let fi=43;fi<=49;fi++){for(let fj=31;fj<=37;fj++){hm[36][37][fi][fj]=8.5;}}}
if(fi1===36&&fj1===37){for(let fi=41;fi<=47;fi++){for(let fj=31;fj<=37;fj++){hm[36][37][fi][fj]=8.5;}}}
if(fi1===36&&fj1===37){for(let fi=36;fi<=42;fi++){for(let fj=32;fj<=38;fj++){hm[36][37][fi][fj]=8.5;}}}
if(1===0){if(fi1===38&&fj1===39){for(let fi=12;fi<=18;fi++){for(let fj=11;fj<=17;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=14;fi<=20;fi++){for(let fj=10;fj<=16;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=18;fi<=24;fi++){for(let fj=11;fj<=17;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===38&&fj1===39){for(let fi=11;fi<=17;fi++){for(let fj=15;fj<=21;fj++){hm[38][39][fi][fj]=2.3;}}}
if(fi1===35&&fj1===37){for(let fi=22;fi<=28;fi++){for(let fj=0;fj<=6;fj++){hm[35][37][fi][fj]=2.2;}}}
if(fi1===35&&fj1===36){for(let fi=22;fi<=28;fi++){for(let fj=43;fj<=49;fj++){hm[35][36][fi][fj]=2.2;}}}
if(fi1===35&&fj1===36){for(let fi=22;fi<=28;fi++){for(let fj=41;fj<=47;fj++){hm[35][36][fi][fj]=2.2;}}}
if(fi1===35&&fj1===36){for(let fi=21;fi<=27;fi++){for(let fj=37;fj<=43;fj++){hm[35][36][fi][fj]=2.0;}}}
if(fi1===35&&fj1===36){for(let fi=20;fi<=26;fi++){for(let fj=34;fj<=40;fj++){hm[35][36][fi][fj]=1.5;}}}
if(fi1===35&&fj1===36){for(let fi=19;fi<=25;fi++){for(let fj=30;fj<=36;fj++){hm[35][36][fi][fj]=1.0;}}}
if(fi1===35&&fj1===36){for(let fi=18;fi<=24;fi++){for(let fj=26;fj<=32;fj++){hm[35][36][fi][fj]=0.7;}}}
if(fi1===35&&fj1===36){for(let fi=16;fi<=22;fi++){for(let fj=23;fj<=29;fj++){hm[35][36][fi][fj]=0.4;}}}
if(fi1===35&&fj1===36){for(let fi=14;fi<=20;fi++){for(let fj=20;fj<=26;fj++){hm[35][36][fi][fj]=0.4;}}}
if(fi1===35&&fj1===36){for(let fi=12;fi<=18;fi++){for(let fj=19;fj<=25;fj++){hm[35][36][fi][fj]=0.2;}}}
if(fi1===35&&fj1===36){for(let fi=7;fi<=13;fi++){for(let fj=14;fj<=20;fj++){hm[35][36][fi][fj]=-0.1;}}}
if(fi1===35&&fj1===36){for(let fi=4;fi<=10;fi++){for(let fj=11;fj<=17;fj++){hm[35][36][fi][fj]=-0.2;}}}
if(fi1===35&&fj1===36){for(let fi=0;fi<=6;fi++){for(let fj=9;fj<=15;fj++){hm[35][36][fi][fj]=-0.5;}}}
if(fi1===34&&fj1===36){for(let fi=42;fi<=48;fi++){for(let fj=8;fj<=14;fj++){hm[34][36][fi][fj]=-0.5;}}}
if(fi1===34&&fj1===36){for(let fi=43;fi<=49;fi++){for(let fj=9;fj<=15;fj++){hm[34][36][fi][fj]=-0.5;}}}
if(fi1===34&&fj1===36){for(let fi=31;fi<=37;fi++){for(let fj=8;fj<=14;fj++){hm[34][36][fi][fj]=-0.6;}}}
if(fi1===34&&fj1===36){for(let fi=28;fi<=34;fi++){for(let fj=9;fj<=15;fj++){hm[34][36][fi][fj]=-0.6;}}}
if(fi1===34&&fj1===36){for(let fi=25;fi<=31;fi++){for(let fj=10;fj<=16;fj++){hm[34][36][fi][fj]=-0.6;}}}
if(fi1===34&&fj1===36){for(let fi=21;fi<=27;fi++){for(let fj=11;fj<=17;fj++){hm[34][36][fi][fj]=-0.6;}}}
if(fi1===34&&fj1===36){for(let fi=17;fi<=23;fi++){for(let fj=12;fj<=18;fj++){hm[34][36][fi][fj]=-0.6;}}}
if(fi1===34&&fj1===36){for(let fi=14;fi<=20;fi++){for(let fj=14;fj<=20;fj++){hm[34][36][fi][fj]=-0.4;}}}
if(fi1===34&&fj1===36){for(let fi=10;fi<=16;fi++){for(let fj=17;fj<=23;fj++){hm[34][36][fi][fj]=-0.2;}}}
if(fi1===34&&fj1===36){for(let fi=7;fi<=13;fi++){for(let fj=19;fj<=25;fj++){hm[34][36][fi][fj]=0.0;}}}}
if(fi1===29&&fj1===31){for(let fi=28;fi<=34;fi++){for(let fj=34;fj<=40;fj++){hm[29][31][fi][fj]=0.3;}}}
if(fi1===29&&fj1===31){for(let fi=28;fi<=34;fi++){for(let fj=35;fj<=41;fj++){hm[29][31][fi][fj]=0.4;}}}
if(fi1===29&&fj1===31){for(let fi=27;fi<=33;fi++){for(let fj=37;fj<=43;fj++){hm[29][31][fi][fj]=0.5;}}}
if(fi1===29&&fj1===31){for(let fi=27;fi<=33;fi++){for(let fj=38;fj<=44;fj++){hm[29][31][fi][fj]=0.6;}}}
if(fi1===29&&fj1===31){for(let fi=26;fi<=32;fi++){for(let fj=40;fj<=46;fj++){hm[29][31][fi][fj]=0.7;}}}
if(fi1===29&&fj1===31){for(let fi=26;fi<=32;fi++){for(let fj=42;fj<=48;fj++){hm[29][31][fi][fj]=0.8;}}}
if(fi1===29&&fj1===31){for(let fi=25;fi<=31;fi++){for(let fj=43;fj<=49;fj++){hm[29][31][fi][fj]=1.0;}}}
if(fi1===29&&fj1===32){for(let fi=24;fi<=30;fi++){for(let fj=0;fj<=6;fj++){hm[29][32][fi][fj]=1.0;}}}
if(fi1===29&&fj1===32){for(let fi=24;fi<=30;fi++){for(let fj=0;fj<=6;fj++){hm[29][32][fi][fj]=1.0;}}}
if(fi1===29&&fj1===32){for(let fi=23;fi<=29;fi++){for(let fj=1;fj<=7;fj++){hm[29][32][fi][fj]=1.2;}}}
if(fi1===29&&fj1===32){for(let fi=22;fi<=28;fi++){for(let fj=3;fj<=9;fj++){hm[29][32][fi][fj]=1.3;}}}
if(fi1===29&&fj1===32){for(let fi=22;fi<=28;fi++){for(let fj=5;fj<=11;fj++){hm[29][32][fi][fj]=1.4;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=8;fj<=14;fj++){hm[29][32][fi][fj]=1.5;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=11;fj<=17;fj++){hm[29][32][fi][fj]=1.6;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=14;fj<=20;fj++){hm[29][32][fi][fj]=1.7;}}}
if(fi1===29&&fj1===32){for(let fi=20;fi<=26;fi++){for(let fj=17;fj<=23;fj++){hm[29][32][fi][fj]=1.8;}}}
if(fi1===29&&fj1===32){for(let fi=20;fi<=26;fi++){for(let fj=22;fj<=28;fj++){hm[29][32][fi][fj]=1.9;}}}
if(fi1===29&&fj1===32){for(let fi=20;fi<=26;fi++){for(let fj=24;fj<=30;fj++){hm[29][32][fi][fj]=2.0;}}}
if(fi1===29&&fj1===32){for(let fi=20;fi<=26;fi++){for(let fj=27;fj<=33;fj++){hm[29][32][fi][fj]=2.1;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=29;fj<=35;fj++){hm[29][32][fi][fj]=2.2;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=32;fj<=38;fj++){hm[29][32][fi][fj]=2.3;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=35;fj<=41;fj++){hm[29][32][fi][fj]=2.4;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=37;fj<=43;fj++){hm[29][32][fi][fj]=2.5;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=40;fj<=46;fj++){hm[29][32][fi][fj]=2.6;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=41;fj<=47;fj++){hm[29][32][fi][fj]=2.7;}}}
if(fi1===29&&fj1===32){for(let fi=21;fi<=27;fi++){for(let fj=43;fj<=49;fj++){hm[29][32][fi][fj]=2.8;}}}
if(fi1===29&&fj1===33){for(let fi=22;fi<=28;fi++){for(let fj=0;fj<=6;fj++){hm[29][33][fi][fj]=2.8;}}}
if(fi1===29&&fj1===33){for(let fi=21;fi<=27;fi++){for(let fj=2;fj<=8;fj++){hm[29][33][fi][fj]=3.0;}}}
if(fi1===29&&fj1===33){for(let fi=21;fi<=27;fi++){for(let fj=6;fj<=12;fj++){hm[29][33][fi][fj]=3.1;}}}
if(fi1===29&&fj1===33){for(let fi=20;fi<=26;fi++){for(let fj=9;fj<=15;fj++){hm[29][33][fi][fj]=3.2;}}}
if(fi1===29&&fj1===33){for(let fi=19;fi<=25;fi++){for(let fj=12;fj<=18;fj++){hm[29][33][fi][fj]=3.3;}}}
if(fi1===29&&fj1===33){for(let fi=17;fi<=23;fi++){for(let fj=14;fj<=20;fj++){hm[29][33][fi][fj]=3.4;}}}
if(fi1===29&&fj1===33){for(let fi=14;fi<=20;fi++){for(let fj=17;fj<=23;fj++){hm[29][33][fi][fj]=3.5;}}}
if(fi1===29&&fj1===33){for(let fi=12;fi<=18;fi++){for(let fj=18;fj<=24;fj++){hm[29][33][fi][fj]=3.6;}}}
if(fi1===28&&fj1===41){for(let fi=1;fi<=7;fi++){for(let fj=36;fj<=42;fj++){hm[28][41][fi][fj]=-0.7;}}}
if(fi1===28&&fj1===41){for(let fi=2;fi<=8;fi++){for(let fj=36;fj<=42;fj++){hm[28][41][fi][fj]=-0.6;}}}
if(fi1===28&&fj1===41){for(let fi=4;fi<=10;fi++){for(let fj=36;fj<=42;fj++){hm[28][41][fi][fj]=-0.5;}}}
if(fi1===28&&fj1===41){for(let fi=9;fi<=15;fi++){for(let fj=36;fj<=42;fj++){hm[28][41][fi][fj]=-0.4;}}}
if(fi1===28&&fj1===41){for(let fi=12;fi<=18;fi++){for(let fj=36;fj<=42;fj++){hm[28][41][fi][fj]=-0.3;}}}
if(fi1===28&&fj1===41){for(let fi=16;fi<=22;fi++){for(let fj=35;fj<=41;fj++){hm[28][41][fi][fj]=-0.2;}}}
if(fi1===28&&fj1===41){for(let fi=19;fi<=25;fi++){for(let fj=34;fj<=40;fj++){hm[28][41][fi][fj]=-0.1;}}}
if(fi1===28&&fj1===41){for(let fi=21;fi<=27;fi++){for(let fj=34;fj<=40;fj++){hm[28][41][fi][fj]=0.0;}}}
if(fi1===28&&fj1===41){for(let fi=25;fi<=31;fi++){for(let fj=34;fj<=40;fj++){hm[28][41][fi][fj]=0.1;}}}
if(fi1===28&&fj1===41){for(let fi=29;fi<=35;fi++){for(let fj=34;fj<=40;fj++){hm[28][41][fi][fj]=0.2;}}}
if(fi1===28&&fj1===41){for(let fi=33;fi<=39;fi++){for(let fj=33;fj<=39;fj++){hm[28][41][fi][fj]=0.3;}}}
if(fi1===28&&fj1===41){for(let fi=35;fi<=41;fi++){for(let fj=33;fj<=39;fj++){hm[28][41][fi][fj]=0.4;}}}
if(fi1===28&&fj1===41){for(let fi=37;fi<=43;fi++){for(let fj=33;fj<=39;fj++){hm[28][41][fi][fj]=0.5;}}}
if(fi1===28&&fj1===41){for(let fi=40;fi<=46;fi++){for(let fj=33;fj<=39;fj++){hm[28][41][fi][fj]=0.6;}}}
if(fi1===28&&fj1===41){for(let fi=43;fi<=49;fi++){for(let fj=32;fj<=38;fj++){hm[28][41][fi][fj]=0.8;}}}
if(fi1===29&&fj1===41){for(let fi=0;fi<=6;fi++){for(let fj=32;fj<=38;fj++){hm[29][41][fi][fj]=0.8;}}}
if(fi1===29&&fj1===41){for(let fi=0;fi<=6;fi++){for(let fj=32;fj<=38;fj++){hm[29][41][fi][fj]=0.8;}}}
if(fi1===29&&fj1===41){for(let fi=3;fi<=9;fi++){for(let fj=31;fj<=37;fj++){hm[29][41][fi][fj]=1.0;}}}
if(fi1===29&&fj1===41){for(let fi=6;fi<=12;fi++){for(let fj=30;fj<=36;fj++){hm[29][41][fi][fj]=1.1;}}}
if(fi1===29&&fj1===41){for(let fi=9;fi<=15;fi++){for(let fj=29;fj<=35;fj++){hm[29][41][fi][fj]=1.2;}}}
if(fi1===37&&fj1===35){for(let fi=19;fi<=21;fi++){for(let fj=1;fj<=3;fj++){hm[37][35][fi][fj]=3;}}}
if(fi1===37&&fj1===35){for(let fi=16;fi<=22;fi++){for(let fj=0;fj<=6;fj++){hm[37][35][fi][fj]=3;}}}
if(fi1===37&&fj1===35){for(let fi=12;fi<=18;fi++){for(let fj=0;fj<=6;fj++){hm[37][35][fi][fj]=3;}}}
if(fi1===37&&fj1===35){for(let fi=8;fi<=14;fi++){for(let fj=0;fj<=6;fj++){hm[37][35][fi][fj]=3;}}}
if(fi1===37&&fj1===35){for(let fi=7;fi<=13;fi++){for(let fj=0;fj<=6;fj++){hm[37][35][fi][fj]=3;}}}
if(fi1===37&&fj1===34){for(let fi=7;fi<=22;fi++){for(let fj=48;fj<=49;fj++){hm[37][34][fi][fj]=3;}}}
if(fi1===38&&fj1===31){for(let fi=39;fi<=41;fi++){for(let fj=5;fj<=7;fj++){hm[38][31][fi][fj]=-0.4;}}}
if(fi1===38&&fj1===27){for(let fi=26;fi<=28;fi++){for(let fj=25;fj<=27;fj++){hm[38][27][fi][fj]=4.8;}}}
if(fi1===38&&fj1===27){for(let fi=24;fi<=30;fi++){for(let fj=23;fj<=29;fj++){hm[38][27][fi][fj]=4.8;}}}}
function generate_objects_array(fi1,fj1,fi,fj)
{if(hm[fi1][fj1][fi][fj]>sealevel+0.5)
{let curve_trees=grelf3()+grelf_detail2();if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35))curve_trees-=150;else if((fi1>=33&&fi1<=35)&&(fj1>=33&&fj1<=35))curve_trees+=250;else if((fi1>=36&&fi1<=41)&&(fj1>=27&&fj1<=32))curve_trees+=1000;else if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))curve_trees-=133;else if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41))
{if(fi1===31)curve_trees+=62;}
else if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))curve_trees+=50;else if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34))
{if((fi1===32||fi1===31)&&(fj1===32||fj1===31))curve_trees+=50;else if(fi1===31&&fj1===29)curve_trees+=200;else if(fi1===30&&fj1===29)curve_trees-=200;else if((fi1>=30&&fi1<=31)&&(fj1>=33&&fj1<=34))curve_trees+=1000;else if((fi1>=29&&fi1<=30)&&(fj1>=28&&fj1<=29))curve_trees+=43;else if(fi1===29&&(fj1>=32&&fj1<=34))curve_trees+=50;else if((fi1>=30&&fi1<=31)&&(fj1>=32&&fj1<=34))curve_trees+=50;else curve_trees+=100;}
else if(fi1===28&&fj1===33)curve_trees+=1000;else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41))
{if(fi1===27&&(fj1===34||fj1===35))curve_trees+=1000;}
if(curve_trees<616&&curve_trees>524)
{if(om[fi1][fj1][fi][fj]!==ASCEND_ROAD)om[fi1][fj1][fi][fj]=ASCEND_TREE;if(!(fi1===38&&fj1===39)&&Math.floor(curve_trees)%5===0)
{let seed_length=Math.floor(pseudorandom(fi*fj)*10);if(seed_length>5)seed_length=10;else seed_length=1;if(fi-seed_length>0&&fj-seed_length>0&&om[fi1][fj1][fi-seed_length][fj-seed_length]!==ASCEND_ROAD)
{if(Math.floor(curve_trees)%10===0)
{if(hm[fi1][fj1][fi-seed_length][fj-seed_length]>sealevel+0.5&&om[fi1][fj1][fi-seed_length][fj-seed_length]!==ASCEND_ROAD)om[fi1][fj1][fi-seed_length][fj-seed_length]=ASCEND_BUSH;}
else
{if(hm[fi1][fj1][fi-seed_length][fj]>sealevel+0.5&&om[fi1][fj1][fi-seed_length][fj]!==ASCEND_ROAD)om[fi1][fj1][fi-seed_length][fj]=ASCEND_GRASS;}}}}}
if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))
{if(grelf()>270&&fi%4>2&&fj%4>1&&om[fi1][fj1][fi][fj]!==ASCEND_ROAD)om[fi1][fj1][fi][fj]=ASCEND_GRASS;if(fi1===34&&fj1===37)
{if(fi>=22&&distance_get_xz(fi,fj,27,24)<=25&&hm[fi1][fj1][fi][fj]>sealevel+0.1&&pseudorandom(fi*fj)>=0.7&&distance_get_xz(fi,fj,31,23)>5)om[fi1][fj1][fi][fj]=ASCEND_TREE;}}
else if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))
{if(fi1===39&&fj1===39)
{let hotspring_dist=distance_get_xz(fi,fj,21,8);if(hotspring_dist>=2&&hotspring_dist<=3)om[fi1][fj1][fi][fj]=ASCEND_BUSH;}
else if(fi1===38&&fj1===39)
{if(fi>=30&&fj>12)om[fi1][fj1][fi][fj]=ASCEND_TREE;if(fi>25&&fi<=40&&fj>=12&&fj<=23)
{om[fi1][fj1][fi][fj]=0;if(fi>30&&fi<=40&&((fj<=15&&fj>=12)||(fj>=20&&fj<=23)))om[fi1][fj1][fi][fj]=ASCEND_TREE;else if(fi>25&&fi<=28&&((fj<=14&&fj>=12)||(fj>=21&&fj<=23)))om[fi1][fj1][fi][fj]=ASCEND_TREE;else if(fi>30&&fi<=37&&fi%2===0&&(fj===16||fj===19))om[fi1][fj1][fi][fj]=ASCEND_BUSH;else if(fi>25&&fi<=29&&fi%2===1&&(fj===15||fj===20))om[fi1][fj1][fi][fj]=ASCEND_BUSH;}}}
else if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34))
{if(fi1===31&&fj1===33&&fi%2===0&&fj%2===0&&distance_get_xz(fi,fj,25,25)<4)om[fi1][fj1][fi][fj]=ASCEND_TREE;else if(fi1===30&&fj1===29)
{let fdist=distance_get_xz(fi,fj,18,13);if(fdist<9)om[fi1][fj1][fi][fj]=0;else if(fdist>=9&&fdist<=11)om[fi1][fj1][fi][fj]=ASCEND_TREE;}
else if((fi1===32&&fj1===32)&&distance_get_xz(fi,fj,29,11)<5)om[fi1][fj1][fi][fj]=0;if(fi1===29&&fj1===29&&distance_get_xz(fi,fj,43,36)<5)om[fi1][fj1][fi][fj]=0;}
else if(fi1===32&&fj1===35)
{if(distance_get_xz(fi,fj,24,33)>=4.5&&distance_get_xz(fi,fj,24,33)<=5.5&&(fj<=33||fj>=36))om[fi1][fj1][fi][fj]=ASCEND_TREE;if(distance_get_xz(fi,fj,24,33)===3)om[fi1][fj1][fi][fj]=ASCEND_BUSH;}
else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41))
{if((fi1===27&&fj1===34)&&(fi>=1&&fi<=19&&fj>=2))om[fi1][fj1][fi][fj]=0;if((fi1===27&&fj1===35)&&(fi>=1&&fi<=19&&fj<=36))om[fi1][fj1][fi][fj]=0;}
let curve_objects=grelf_objects()*highness*0.0001-grelf_objects_detail()*highness*0.0002;if(curve_objects>-0.2){curve_objects=-100;}
if(curve_objects<(-0.1/master2)+2&&hm[fi1][fj1][fi][fj]>sealevel+1&&(((fi1*3/fj1/fi*2/fj)*100)-(Math.floor((fi1*3/fj1/fi*2/fj)*100))<=0.6)&&om[fi1][fj1][fi][fj]!==ASCEND_ROAD&&(fi>0&&fi<49&&fj>0&&fj<50)&&(fi%3===0&&fj%3===0))
{let curve_houses=grelf_houses()*highness*0.0005;if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35))curve_houses+=1000;else if((fi1>=33&&fi1<=35)&&(fj1>=33&&fj1<=35))curve_houses+=11;else if((fi1>=36&&fi1<=41)&&(fj1>=27&&fj1<=32))curve_houses+=1000;else if((fi1>=33&&fi1<=35)&&(fj1>=28&&fj1<=32))curve_houses+=1000;else if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))curve_houses+=2.65;else if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))
{if(fi1===38&&fj1===38)curve_houses+=1000;else curve_houses+=8.5;}
else if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34))
{if(fi1===30&&fj1===31)curve_houses-=1000;else curve_houses+=3;}
else if(fi1===31&&fj1===35)curve_houses+=1000;else if(fi1===31&&fj1===38)curve_houses+=1000;else if(fi1===28&&fj1===33)curve_houses+=0.5;else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41))curve_houses-=0.5;else if((fi1>=28&&fi1<=30)&&fj1===41)curve_houses-=1.5;else if((fi1>=26&&fi1<=27)&&(fj1>=26&&fj1<=31))curve_houses+=1000;if(curve_houses<=0.5)
{let c=0,l=0,r=0,m=0;if(fi+1<chunkwidth-1)c=Math.abs(hm[fi1][fj1][fi+1][fj]-hm[fi1][fj1][fi][fj]);if(fj+1<chunkwidth-1)l=Math.abs(hm[fi1][fj1][fi][fj+1]-hm[fi1][fj1][fi][fj]);if(fi-1>0)r=Math.abs(hm[fi1][fj1][fi-1][fj]-hm[fi1][fj1][fi][fj]);if(fj-1>0)m=Math.abs(hm[fi1][fj1][fi][fj-1]-hm[fi1][fj1][fi][fj]);if(c+l+r+m<=5)
{let housetype=((curve_objects*-0.1)/(curve_objects*-0.1+1))*9*9;if(((fi1*7/fj1/fi*11/fj)*100)-(Math.floor((fi1*7/fj1/fi*11/fj)*100))>0.6)
{housetype+=profile_star[(fi1*50+fi)*31+(fj1*50+fj)*11&0xF]*0.01;}
housetype=Math.floor(housetype);if(housetype<7)
{om[fi1][fj1][fi][fj]=ASCEND_HOUSE;}
else if(housetype>=7&&housetype<8.5)
{if((fi>=4&&fi<=45)&&(fj>=4&&fj<=45))
{if(fi1%9<3&&fj1%3===0){}
else if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41)){}
else om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}}
else
{if((fi>=4&&fi<=45)&&(fj>=4&&fj<=45))
{om[fi1][fj1][fi][fj]=ASCEND_BARN;}}}}}
if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35))
{if(fi1===38&&fj1===34)
{if(fi===15&&fj===40)om[fi1][fj1][fi][fj]=ASCEND_HOUSE;if(fi>=18&&fi<=20&&fj===40)om[fi1][fj1][fi][fj]=ASCEND_BARN;if(fi===22&&fj===25)om[fi1][fj1][fi][fj]=ASCEND_BARN;if(fi===18&&fj===25)om[fi1][fj1][fi][fj]=ASCEND_BARN;if(fi===13&&fj===25)om[fi1][fj1][fi][fj]=ASCEND_BARN;}}
if((fi1>=36&&fi1<=41)&&(fj1>=27&&fj1<=32))
{if(fj1===29&&fj===36)
{if(fi1===37&&(fi%13===3||fi%13===3||fi%13===4)){}
else om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}
if((fi1===37&&fj1===28)&&fj<43&&fj>3&&fi>3&&fi<46)
{if(fj===4&&fi===24)om[fi1][fj1][fi][fj]=0;else if(fi===45||fi===4||fj===4)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi%5===0&fj%5===0)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi===7&&fj<28)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fj===28&&fi>12)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fj===33&&fi>8&&fi<15)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi===17&&fj>12&&fj<19)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi===22&&fj>29&&fj<38)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi===38&&fj===37)om[fi1][fj1][fi][fj]=ASCEND_BARN;else if(fi>30&&fj>30&&fi%2===0&&fj%2===0)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi>25&&fi<40&&fj===15)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi===25&&fj>5&&fj<15)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi>17&&fi<25&&fj===14)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}
else if((fi1===37&&fj1===27)&&fj<46&&fj>3&&fi>3&&fi<46)
{om[fi1][fj1][fi][fj]=0;if(fi===45||fi===4||fj===45||fj===4||fi===22||fj===22)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;if(fj===45&&fi===3)om[fi1][fj1][fi][fj]=0;}
else if((fi1===38&&fj1===27))
{if(om[fi1][fj1][fi][fj]!==ASCEND_ROAD&&om[fi1][fj1][fi][fj]!==ASCEND_ROADLIGHT)om[fi1][fj1][fi][fj]=0;if(fi===4||fj===45||fj===4)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}
else if((fi1===39&&fj1===27))
{if(fj===45||fj===4)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}
else if((fi1>=39&&fi1<=41)&&(fi1>=28&&fj1<=30))
{let xx=x_in_chunk_to_x(fi1,fi);let zz=x_in_chunk_to_x(fj1,fj);let centerx=40*(chunkwidth-1)+25;let centerz=29*(chunkwidth-1)+25;let rdist=distance_get_oval_xz(xx,zz,centerx,centerz,0.5,2);if(om[fi1][fj1][fi][fj]!==ASCEND_ROAD&&om[fi1][fj1][fi][fj]!==ASCEND_ROADLIGHT)om[fi1][fj1][fi][fj]=0;}
else if(fi1===38&&fj1===28)
{let mdist=distance_get_xz(fi,fj,24,22);if(Math.floor(mdist)===14)
{if(fi%5===0||fj%5===0)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else om[fi1][fj1][fi][fj]=ASCEND_HOUSE;}
if(fi===39&&fj<23)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if(fi===46&&fj<23)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}
if((fi1===38&&fj1===30)||(fi1===38&&fj1===29))
{if(fi===43)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}}
else if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))
{if((fi1===34&&fj1===37)&&(fi===31&&fj===23))
{om[fi1][fj1][fi][fj]=ASCEND_HOUSE;}
else if(fi1===32&&fj1===38)
{if(fi>=37&&fj===37&&fi%3===0)om[fi1][fj1][fi][fj]=ASCEND_HOUSE;if(fi===36&&fj>=27&&fj<=37&&fj%3===0)om[fi1][fj1][fi][fj]=ASCEND_BARN;if(fi>=37&&fj===27&&fi%4===0)om[fi1][fj1][fi][fj]=ASCEND_HOUSE;}
else if(fi1===33&&fj1===38)
{if(fi===4&&fj>=33&&fj<=35)om[fi1][fj1][fi][fj]=ASCEND_HOUSE;if(fi===4&&fj>=27&&fj<=29)om[fi1][fj1][fi][fj]=ASCEND_HOUSE;if(fi===8&&(fj===30||fj===31))om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;}}
else if((fi1===38&&fj1===39)&&(fi===39&&fj===17))om[fi1][fj1][fi][fj]=ASCEND_BARN;else if((fi1===38&&fj1===39)&&(fi===39&&fj===16))om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;else if((fi1===38&&fj1===39)&&(fi===39&&fj===18))om[fi1][fj1][fi][fj]=ASCEND_BARN;else if((fi1===38&&fj1===36)&&(fi===36&&fj===38))om[fi1][fj1][fi][fj]=ASCEND_HOUSE;else if((fi1===32&&fj1===32)&&(fi===26&&fj===10))om[fi1][fj1][fi][fj]=ASCEND_HOUSE;else if((fi1===32&&fj1===35)&&(fi===24&&fj===33))om[fi1][fj1][fi][fj]=ASCEND_HOUSE;else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41))
{if((fi1===27&&fj1===34)&&(fi>=1&&fi<=19&&fj>=2))om[fi1][fj1][fi][fj]=ASCEND_ROAD;if((fi1===27&&fj1===35)&&(fi>=1&&fi<=19&&fj<=36))om[fi1][fj1][fi][fj]=ASCEND_ROAD;if(fi1===26&&fj1===34&&fi===48&&fj>=4&&fj<14)om[fi1][fj1][fi][fj]=ASCEND_BARN;if(fi1===26&&fj1===34&&fi===46&&fj===4)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;if(fi1===26&&fj1===34&&fi===46&&fj===7)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;if(fi1===26&&fj1===34&&fi===46&&fj===11)om[fi1][fj1][fi][fj]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===36&&distance_get_xz(fi,fj,22,27)<15)om[fi1][fj1][fi][fj]=0;if(fi1===26&&fj1===38&&distance_get_xz(fi,fj,25,23)<15&&om[fi1][fj1][fi][fj]!==ASCEND_ROAD&&om[fi1][fj1][fi][fj]!==ASCEND_ROADLIGHT)om[fi1][fj1][fi][fj]=0;}}
function generate_objects_array_after(fi1,fj1)
{if(1===0&&fi1===34&&fj1===37)
{om[34][37][2][24]=0;om[34][37][2][25]=0;om[34][37][3][24]=0;om[34][37][3][25]=0;om[34][37][4][25]=0;om[34][37][4][24]=0;om[34][37][5][24]=0;om[34][37][6][24]=0;om[34][37][7][24]=0;om[34][37][8][24]=0;om[34][37][8][25]=0;om[34][37][7][25]=0;om[34][37][6][25]=0;om[34][37][5][25]=0;om[34][37][9][25]=0;om[34][37][9][24]=0;om[34][37][10][24]=0;om[34][37][11][24]=0;om[34][37][10][25]=0;om[34][37][11][25]=0;om[34][37][12][23]=0;om[34][37][11][22]=0;om[34][37][12][22]=0;om[34][37][12][21]=0;om[34][37][11][21]=0;om[34][37][11][20]=0;om[34][37][12][20]=0;om[34][37][13][20]=0;om[34][37][14][21]=0;om[34][37][14][20]=0;om[34][37][15][20]=0;om[34][37][16][21]=0;om[34][37][15][21]=0;om[34][37][18][21]=0;om[34][37][18][20]=0;om[34][37][19][20]=0;om[34][37][19][21]=0;om[34][37][20][21]=0;om[34][37][20][20]=0;om[34][37][21][20]=0;om[34][37][21][21]=0;om[34][37][22][21]=0;om[34][37][22][20]=0;om[34][37][23][20]=0;om[34][37][23][21]=0;om[34][37][24][21]=0;om[34][37][24][20]=0;om[34][37][25][20]=0;om[34][37][26][21]=0;om[34][37][27][20]=0;om[34][37][26][20]=0;om[34][37][25][21]=0;om[34][37][13][21]=0;om[34][37][9][23]=0;om[34][37][13][22]=0;om[34][37][11][23]=0;}
if(fi1===34&&fj1===37)
{om[34][37][29][33]=0;om[34][37][29][32]=0;om[34][37][29][31]=0;om[34][37][29][30]=0;om[34][37][29][29]=0;om[34][37][29][28]=0;om[34][37][29][27]=0;om[34][37][30][27]=0;om[34][37][30][28]=0;om[34][37][30][29]=0;om[34][37][30][30]=0;om[34][37][30][31]=0;om[34][37][30][32]=0;om[34][37][30][33]=0;om[34][37][27][33]=0;om[34][37][27][31]=0;om[34][37][27][32]=0;om[34][37][27][30]=0;om[34][37][27][30]=0;}
if(fi1===30&&fj1===30)
{om[30][30][43][3]=40;om[30][30][43][3]=40;om[30][30][44][3]=40;om[30][30][45][3]=40;om[30][30][46][4]=40;om[30][30][45][4]=40;om[30][30][44][4]=40;om[30][30][44][5]=40;om[30][30][45][5]=40;om[30][30][45][2]=40;om[30][30][44][2]=40;om[30][30][45][5]=50;}
if(fi1===30&&fj1===33)
{om[30][33][8][32]=50;om[30][33][9][32]=50;om[30][33][10][32]=50;om[30][33][10][31]=50;om[30][33][11][31]=50;om[30][33][12][31]=50;om[30][33][12][30]=50;om[30][33][13][30]=50;om[30][33][14][30]=50;om[30][33][15][30]=50;om[30][33][16][30]=50;om[30][33][16][29]=50;om[30][33][17][29]=50;om[30][33][18][29]=50;om[30][33][19][29]=50;om[30][33][20][29]=50;om[30][33][21][29]=50;om[30][33][22][29]=50;om[30][33][22][35]=50;om[30][33][22][36]=50;om[30][33][21][36]=50;om[30][33][20][36]=50;om[30][33][19][37]=50;om[30][33][18][37]=50;om[30][33][17][37]=50;om[30][33][16][37]=50;om[30][33][15][37]=50;om[30][33][15][38]=50;om[30][33][14][38]=50;om[30][33][13][38]=50;om[30][33][13][39]=50;om[30][33][12][39]=50;om[30][33][11][39]=50;om[30][33][10][39]=50;om[30][33][9][39]=50;om[30][33][9][40]=50;om[30][33][8][40]=50;om[30][33][23][27]=50;om[30][33][24][27]=50;om[30][33][25][27]=50;om[30][33][25][26]=50;om[30][33][25][25]=50;om[30][33][25][24]=50;om[30][33][26][24]=50;om[30][33][27][24]=50;om[30][33][28][24]=50;om[30][33][29][24]=50;om[30][33][30][24]=50;om[30][33][31][24]=50;om[30][33][31][23]=50;om[30][33][32][23]=50;om[30][33][32][22]=50;om[30][33][33][22]=50;om[30][33][33][21]=50;om[30][33][34][21]=50;om[30][33][34][20]=50;om[30][33][34][19]=50;om[30][33][35][19]=50;om[30][33][35][18]=50;om[30][33][36][18]=50;om[30][33][36][17]=50;om[30][33][37][17]=50;om[30][33][37][16]=50;om[30][33][37][15]=50;om[30][33][37][14]=50;om[30][33][37][13]=50;om[30][33][37][12]=50;om[30][33][37][11]=50;om[30][33][37][10]=50;om[30][33][37][9]=50;om[30][33][37][8]=50;om[30][33][37][7]=50;om[30][33][38][7]=50;om[30][33][38][6]=50;om[30][33][38][5]=50;om[30][33][38][4]=50;om[30][33][38][3]=50;om[30][33][38][2]=50;om[30][33][38][1]=50;om[30][33][39][1]=50;om[30][33][39][0]=50;}
if(fi1===30&&fj1===33)
{om[30][33][9][41]=50;om[30][33][10][41]=50;om[30][33][10][40]=50;om[30][33][11][40]=50;om[30][33][12][40]=50;om[30][33][13][40]=50;om[30][33][14][40]=50;om[30][33][14][39]=50;om[30][33][15][39]=50;om[30][33][16][39]=50;om[30][33][16][38]=50;om[30][33][17][38]=50;om[30][33][18][38]=50;om[30][33][19][38]=50;om[30][33][20][38]=50;om[30][33][20][37]=50;om[30][33][21][37]=50;om[30][33][22][37]=50;om[30][33][23][37]=50;om[30][33][23][36]=50;}
if(fi1===30&&fj1===32)
{om[30][32][48][48]=50;}
if(fi1===30&&fj1===33)
{om[30][33][48][1]=50;om[30][33][48][2]=50;om[30][33][48][3]=50;om[30][33][47][3]=50;om[30][33][47][4]=50;om[30][33][47][5]=50;om[30][33][47][6]=50;om[30][33][47][7]=50;om[30][33][47][8]=50;om[30][33][46][8]=50;om[30][33][46][9]=50;om[30][33][46][10]=50;om[30][33][46][11]=50;om[30][33][46][12]=50;om[30][33][46][13]=50;om[30][33][46][14]=50;om[30][33][45][14]=50;om[30][33][45][15]=50;om[30][33][45][16]=50;om[30][33][45][17]=50;om[30][33][45][18]=50;om[30][33][45][19]=50;om[30][33][45][20]=50;om[30][33][45][21]=50;om[30][33][45][22]=50;om[30][33][45][23]=50;om[30][33][44][23]=50;om[30][33][44][24]=50;om[30][33][44][25]=50;om[30][33][43][25]=50;om[30][33][43][26]=50;om[30][33][42][26]=50;om[30][33][42][27]=50;om[30][33][42][28]=50;om[30][33][41][28]=50;om[30][33][41][29]=50;om[30][33][40][29]=50;om[30][33][40][30]=50;om[30][33][39][30]=50;om[30][33][39][31]=50;om[30][33][38][31]=50;om[30][33][38][32]=50;om[30][33][37][32]=50;om[30][33][36][32]=50;om[30][33][36][33]=50;om[30][33][35][33]=50;om[30][33][35][34]=50;om[30][33][35][35]=50;om[30][33][34][35]=50;om[30][33][33][35]=50;om[30][33][32][35]=50;om[30][33][31][35]=50;om[30][33][30][35]=50;om[30][33][29][35]=50;om[30][33][29][36]=50;om[30][33][28][36]=50;om[30][33][27][36]=50;om[30][33][26][36]=50;om[30][33][25][36]=50;om[30][33][24][36]=50;}
if(fi1===30&&fj1===33)
{om[30][33][36][15]=70;om[30][33][35][15]=70;om[30][33][34][15]=70;om[30][33][33][15]=70;om[30][33][32][15]=70;om[30][33][31][15]=70;om[30][33][30][15]=70;om[30][33][29][15]=70;om[30][33][28][15]=70;om[30][33][25][18]=70;om[30][33][25][19]=70;om[30][33][25][20]=70;om[30][33][25][21]=70;om[30][33][25][22]=70;om[30][33][25][23]=70;om[30][33][16][28]=70;om[30][33][16][27]=70;om[30][33][16][26]=70;om[30][33][16][25]=70;om[30][33][16][22]=70;om[30][33][16][21]=70;om[30][33][16][20]=70;om[30][33][16][19]=70;om[30][33][18][29]=60;om[30][33][13][30]=60;om[30][33][9][32]=60;om[30][33][9][41]=60;om[30][33][15][39]=60;om[30][33][27][36]=60;om[30][33][35][33]=60;om[30][33][25][24]=60;om[30][33][29][24]=60;om[30][33][33][21]=60;om[30][33][38][15]=60;}
if(fi1===37&&fj1===37)
{om[37][37][40][35]=50;om[37][37][26][44]=50;om[37][37][23][46]=50;om[37][37][21][45]=50;om[37][37][0][37]=5;om[37][37][13][11]=50;om[37][37][38][11]=70;om[37][37][38][13]=70;om[37][37][41][13]=70;om[37][37][40][15]=70;om[37][37][35][10]=70;om[37][37][39][9]=70;om[37][37][42][18]=70;om[37][37][45][19]=70;om[37][37][40][36]=30;om[37][37][39][35]=30;om[37][37][40][34]=30;om[37][37][39][34]=30;om[37][37][0][32]=30;om[37][37][1][32]=30;om[37][37][1][33]=30;om[37][37][1][35]=40;om[37][37][1][35]=30;om[37][37][0][35]=30;om[37][37][0][30]=30;om[37][37][1][30]=30;om[37][37][28][4]=50;om[37][37][29][3]=50;om[37][37][33][2]=50;om[37][37][35][2]=50;om[37][37][42][8]=50;om[37][37][42][8]=50;om[37][37][44][7]=50;om[37][37][44][2]=50;om[37][37][42][1]=50;}
if(fi1===37&&fj1===37)
{om[37][37][41][2]=70;om[37][37][39][2]=70;om[37][37][38][2]=70;om[37][37][32][0]=70;om[37][37][33][3]=70;om[37][37][32][3]=70;om[37][37][28][6]=70;}
if(fi1===35&&fj1===40)
{om[35][40][7][32]=50;om[35][40][9][32]=50;om[35][40][12][31]=50;om[35][40][15][31]=50;om[35][40][15][23]=50;om[35][40][13][23]=50;om[35][40][13][21]=50;om[35][40][9][21]=50;om[35][40][6][24]=50;om[35][40][9][28]=20;om[35][40][10][28]=20;om[35][40][10][29]=20;om[35][40][9][30]=20;om[35][40][10][30]=20;om[35][40][8][30]=20;om[35][40][8][28]=20;om[35][40][5][21]=70;om[35][40][17][27]=70;om[35][40][17][26]=70;om[35][40][13][33]=70;om[35][40][10][34]=60;om[35][40][10][26]=60;om[35][40][11][23]=30;om[35][40][10][23]=30;om[35][40][9][23]=30;om[35][40][11][31]=30;om[35][40][8][29]=20;om[35][40][9][25]=20;om[35][40][10][25]=20;om[35][40][11][25]=20;om[35][40][11][26]=20;om[35][40][10][26]=20;om[35][40][10][27]=20;om[35][40][11][27]=20;om[35][40][12][27]=20;om[35][40][12][26]=20;om[35][40][6][31]=5;om[35][40][9][31]=5;om[35][40][15][29]=5;om[35][40][14][25]=5;om[35][40][11][23]=5;}
if(fi1===34&&fj1===36)
{om[34][36][48][48]=60;}
if(fi1===33&&fj1===38)
{om[33][38][24][26]=60;}
if(fi1===31&&fj1===39)
{om[31][39][11][45]=50;om[31][39][9][45]=50;om[31][39][9][45]=50;om[31][39][12][46]=50;om[31][39][15][45]=70;om[31][39][16][43]=70;}
if(fi1===29&&fj1===41)
{om[29][41][39][27]=0;om[29][41][39][30]=0;om[29][41][42][30]=0;om[29][41][42][27]=0;om[29][41][39][29]=30;om[29][41][38][28]=40;om[29][41][37][29]=40;om[29][41][38][29]=40;om[29][41][39][30]=30;om[29][41][40][30]=20;om[29][41][41][31]=20;om[29][41][41][30]=20;om[29][41][40][29]=30;}
if(fi1===26&&fj1===41)
{om[26][41][2][7]=60;}
if(fi1===28&&fj1===33)
{om[28][33][39][18]=60;om[28][33][39][17]=60;om[28][33][39][16]=60;om[28][33][39][15]=60;om[28][33][40][15]=60;om[28][33][40][14]=60;om[28][33][40][13]=60;om[28][33][40][12]=60;om[28][33][40][11]=60;om[28][33][39][11]=60;om[28][33][39][10]=60;om[28][33][39][9]=60;om[28][33][38][9]=60;om[28][33][37][9]=60;om[28][33][36][9]=60;om[28][33][35][9]=60;om[28][33][34][9]=60;om[28][33][33][9]=60;om[28][33][32][9]=60;om[28][33][31][9]=60;om[28][33][30][9]=60;om[28][33][29][9]=60;om[28][33][28][9]=60;om[28][33][27][9]=60;om[28][33][26][9]=60;om[28][33][25][9]=60;om[28][33][24][9]=60;om[28][33][23][9]=60;om[28][33][22][9]=60;om[28][33][21][9]=60;om[28][33][20][9]=60;om[28][33][19][9]=60;om[28][33][18][9]=60;om[28][33][17][9]=60;om[28][33][16][9]=60;om[28][33][15][9]=60;om[28][33][14][9]=60;om[28][33][13][9]=60;om[28][33][13][10]=60;om[28][33][13][11]=60;om[28][33][13][12]=60;om[28][33][12][12]=60;om[28][33][12][13]=60;om[28][33][12][14]=60;om[28][33][12][15]=60;om[28][33][12][16]=60;om[28][33][12][17]=60;om[28][33][12][18]=60;om[28][33][12][19]=60;om[28][33][13][19]=60;om[28][33][13][20]=60;}
if(fi1===28&&fj1===33)
{om[28][33][40][27]=60;om[28][33][40][28]=60;om[28][33][39][28]=60;om[28][33][39][29]=60;om[28][33][39][30]=60;om[28][33][39][31]=60;om[28][33][39][32]=60;om[28][33][39][33]=60;om[28][33][39][34]=60;om[28][33][39][35]=60;om[28][33][38][35]=60;om[28][33][37][35]=60;om[28][33][36][35]=60;om[28][33][35][35]=60;om[28][33][34][35]=60;om[28][33][33][35]=60;om[28][33][32][35]=60;om[28][33][31][35]=60;om[28][33][30][35]=60;om[28][33][29][35]=60;om[28][33][28][35]=60;om[28][33][27][35]=60;om[28][33][26][35]=60;om[28][33][25][35]=60;om[28][33][24][35]=60;om[28][33][23][35]=60;om[28][33][22][35]=60;om[28][33][21][35]=60;om[28][33][20][35]=60;om[28][33][19][35]=60;om[28][33][18][35]=60;om[28][33][17][35]=60;om[28][33][16][35]=60;om[28][33][15][35]=60;om[28][33][15][34]=60;om[28][33][15][33]=60;om[28][33][15][32]=60;om[28][33][14][32]=60;om[28][33][13][32]=60;om[28][33][12][32]=60;om[28][33][12][31]=60;om[28][33][12][30]=60;om[28][33][12][29]=60;om[28][33][27][27]=60;om[28][33][27][28]=60;om[28][33][27][29]=60;om[28][33][27][30]=60;om[28][33][27][31]=60;om[28][33][27][32]=60;om[28][33][27][33]=60;om[28][33][27][34]=60;}
if(fi1===28&&fj1===33)
{om[28][33][39][27]=60;om[28][33][38][27]=60;om[28][33][37][27]=60;om[28][33][36][27]=60;om[28][33][35][27]=60;om[28][33][34][27]=60;om[28][33][33][27]=60;om[28][33][32][27]=60;om[28][33][31][27]=60;om[28][33][30][27]=60;om[28][33][26][27]=60;om[28][33][25][27]=60;om[28][33][24][27]=60;om[28][33][23][27]=60;om[28][33][22][27]=60;om[28][33][22][28]=60;om[28][33][22][29]=60;om[28][33][22][30]=60;om[28][33][22][31]=60;om[28][33][22][32]=60;om[28][33][21][32]=60;om[28][33][20][32]=60;om[28][33][19][32]=60;om[28][33][18][32]=60;om[28][33][17][32]=60;om[28][33][17][31]=60;om[28][33][17][30]=60;om[28][33][17][29]=60;om[28][33][17][28]=60;om[28][33][15][28]=60;om[28][33][14][28]=60;om[28][33][14][29]=60;om[28][33][13][29]=60;}
if(fi1===28&&fj1===33)
{om[28][33][14][19]=70;om[28][33][15][19]=70;om[28][33][16][19]=70;om[28][33][18][19]=70;om[28][33][19][19]=70;om[28][33][20][19]=70;om[28][33][22][18]=70;om[28][33][23][18]=70;om[28][33][24][18]=70;om[28][33][26][18]=70;om[28][33][27][18]=70;om[28][33][28][18]=70;om[28][33][29][18]=70;om[28][33][30][18]=70;om[28][33][31][18]=70;om[28][33][32][18]=70;om[28][33][33][18]=70;om[28][33][34][18]=70;om[28][33][35][18]=70;om[28][33][36][18]=70;}
if(fi1===28&&fj1===33)
{om[28][33][11][16]=60;om[28][33][10][16]=60;om[28][33][9][16]=60;om[28][33][41][14]=60;om[28][33][42][14]=60;om[28][33][43][14]=60;om[28][33][32][9]=0;}
if(fi1===26&&fj1===26)
{om[26][26][8][17]=50;om[26][26][10][17]=50;om[26][26][10][15]=50;om[26][26][9][15]=50;om[26][26][11][13]=50;om[26][26][11][11]=50;om[26][26][13][11]=50;om[26][26][13][13]=50;om[26][26][13][17]=50;om[26][26][11][17]=50;om[26][26][12][19]=50;om[26][26][14][19]=50;om[26][26][16][17]=50;om[26][26][15][15]=50;om[26][26][15][13]=60;om[26][26][17][13]=60;om[26][26][22][10]=60;}
if(fi1===29&&fj1===29)
{om[29][29][6][3]=70;}
if(fi1===37&&fj1===31)
{om[37][31][1][37]=5;om[37][31][1][46]=5;om[37][31][32][46]=5;om[37][31][40][38]=5;om[37][31][35][36]=5;om[37][31][35][5]=5;om[37][31][41][5]=5;om[37][31][47][5]=5;}
if(fi1===38&&fj1===31)
{om[38][31][9][5]=5;om[38][31][14][5]=5;om[38][31][20][5]=5;om[38][31][26][5]=5;om[38][31][32][5]=5;om[38][31][38][5]=5;om[38][31][43][5]=5;om[38][31][47][5]=5;}
if(fi1===37&&fj1===31)
{om[37][31][34][5]=5;om[37][31][28][5]=5;om[37][31][21][5]=5;om[37][31][16][5]=5;om[37][31][10][5]=5;om[37][31][4][5]=5;}
if(fi1===36&&fj1===31)
{om[36][31][42][5]=5;}
if(fi1===37&&fj1===30)
{om[37][30][0][48]=5;om[37][30][0][37]=5;om[37][30][0][29]=5;om[37][30][0][21]=5;om[37][30][0][14]=5;om[37][30][0][2]=5;}
if(fi1===38&&fj1===30)
{om[38][30][47][15]=5;om[38][30][47][21]=5;om[38][30][47][31]=5;om[38][30][47][43]=5;om[38][30][47][47]=5;}
if(fi1===38&&fj1===34&&1===0)
{om[38][34][27][1]=70;om[38][34][27][1]=70;om[38][34][27][2]=70;om[38][34][27][3]=70;om[38][34][27][4]=70;om[38][34][27][5]=70;om[38][34][27][6]=70;om[38][34][27][7]=70;om[38][34][27][8]=70;om[38][34][27][9]=70;om[38][34][47][9]=70;om[38][34][47][10]=70;om[38][34][47][11]=70;om[38][34][47][12]=70;om[38][34][47][13]=70;om[38][34][47][14]=70;om[38][34][47][15]=70;om[38][34][47][16]=70;om[38][34][47][18]=70;om[38][34][47][19]=70;om[38][34][47][20]=70;om[38][34][29][28]=70;om[38][34][30][28]=70;om[38][34][31][28]=70;om[38][34][32][28]=70;om[38][34][33][28]=70;om[38][34][35][26]=70;om[38][34][34][26]=70;om[38][34][33][26]=70;om[38][34][32][26]=70;om[38][34][38][26]=70;om[38][34][38][27]=70;om[38][34][38][28]=70;om[38][34][36][29]=70;om[38][34][36][30]=70;om[38][34][36][31]=70;om[38][34][36][32]=70;om[38][34][36][33]=70;om[38][34][31][15]=60;om[38][34][37][12]=60;om[38][34][37][17]=60;om[38][34][32][17]=60;om[38][34][35][20]=60;om[38][34][41][23]=70;om[38][34][42][23]=70;om[38][34][43][23]=70;om[38][34][30][4]=70;om[38][34][31][4]=70;om[38][34][32][4]=70;om[38][34][32][9]=70;om[38][34][33][9]=70;om[38][34][34][9]=70;om[38][34][35][9]=70;om[38][34][37][7]=70;om[38][34][37][6]=70;om[38][34][37][5]=70;om[38][34][37][4]=70;om[38][34][37][3]=70;}
if(fi1===38&&fj1===34)
{om[38][34][26][13]=20;om[38][34][26][14]=20;om[38][34][26][15]=20;om[38][34][26][16]=20;om[38][34][26][17]=20;om[38][34][27][16]=20;om[38][34][27][16]=20;om[38][34][27][15]=30;om[38][34][27][14]=30;om[38][34][28][13]=40;om[38][34][23][15]=50;om[38][34][24][15]=50;om[38][34][25][15]=50;om[38][34][26][15]=50;om[38][34][26][16]=50;om[38][34][26][18]=50;om[38][34][26][19]=50;om[38][34][26][20]=50;om[38][34][25][20]=50;om[38][34][24][20]=50;om[38][34][23][20]=50;om[38][34][23][19]=50;om[38][34][23][18]=50;om[38][34][23][17]=50;om[38][34][23][16]=50;}
if(fi1===31&&fj1===39)
{om[31][39][12][43]=20;om[31][39][12][42]=20;om[31][39][13][42]=20;om[31][39][10][43]=20;om[31][39][9][43]=20;om[31][39][7][44]=20;om[31][39][7][45]=20;om[31][39][1][37]=20;om[31][39][3][36]=20;om[31][39][4][35]=20;om[31][39][6][34]=20;om[31][39][8][33]=20;om[31][39][10][33]=20;om[31][39][12][32]=20;om[31][39][14][32]=20;om[31][39][16][31]=20;om[31][39][18][31]=20;om[31][39][20][31]=20;om[31][39][22][31]=20;om[31][39][24][31]=20;om[31][39][26][31]=20;om[31][39][28][31]=20;om[31][39][30][31]=20;om[31][39][32][32]=20;om[31][39][34][32]=20;om[31][39][36][33]=20;om[31][39][48][36]=30;om[31][39][47][36]=30;om[31][39][48][37]=30;om[31][39][47][37]=30;om[31][39][47][38]=30;om[31][39][46][37]=40;om[31][39][45][37]=40;om[31][39][45][36]=40;om[31][39][46][36]=40;}
if(fi1===26&&fj1===40)
{om[26][40][48][29]=60;om[26][40][48][31]=60;om[26][40][46][33]=60;om[26][40][44][33]=60;om[26][40][42][33]=60;om[26][40][41][31]=60;om[26][40][41][29]=60;om[26][40][41][27]=60;om[26][40][43][27]=60;om[26][40][45][26]=60;}
if(fi1===26&&fj1===37)
{om[26][37][8][16]=70;om[26][37][9][16]=70;om[26][37][10][16]=70;om[26][37][11][16]=70;om[26][37][13][16]=70;om[26][37][14][16]=70;om[26][37][15][16]=70;om[26][37][16][16]=70;om[26][37][16][12]=70;om[26][37][15][12]=70;om[26][37][14][12]=70;om[26][37][13][12]=70;om[26][37][11][12]=70;om[26][37][10][12]=70;om[26][37][9][12]=70;om[26][37][8][12]=70;om[26][37][8][8]=70;om[26][37][9][8]=70;om[26][37][10][8]=70;om[26][37][11][8]=70;om[26][37][13][8]=70;om[26][37][14][8]=70;om[26][37][15][8]=70;om[26][37][16][8]=70;om[26][37][16][3]=70;om[26][37][16][2]=70;om[26][37][16][1]=70;om[26][37][16][0]=70;}
if(fi1===26&&fj1===36)
{om[26][36][12][48]=70;}
if(fi1===26&&fj1===37)
{om[26][37][12][1]=70;om[26][37][12][2]=70;om[26][37][12][3]=70;om[26][37][8][3]=70;om[26][37][8][2]=70;om[26][37][8][1]=70;om[26][37][8][0]=70;}
if(fi1===26&&fj1===36)
{om[26][36][11][42]=60;om[26][36][11][38]=60;om[26][36][15][38]=60;om[26][36][13][41]=60;}
if(fi1===38&&fj1===29)
{om[38][29][33][37]=70;om[38][29][33][38]=70;om[38][29][33][39]=70;om[38][29][33][40]=70;om[38][29][33][41]=70;om[38][29][34][41]=70;om[38][29][35][41]=70;om[38][29][36][41]=70;om[38][29][37][41]=70;om[38][29][38][41]=70;om[38][29][40][41]=70;om[38][29][41][41]=70;om[38][29][42][41]=70;om[38][29][42][40]=70;om[38][29][42][39]=70;om[38][29][42][38]=70;om[38][29][42][37]=70;}
if(fi1===36&&fj1===36)
{om[36][36][47][43]=60;}
if(fi1===36&&fj1===36)
{om[36][36][44][44]=50;}
if(fi1===27&&fj1===28)
{om[27][28][16][35]=70;}
if(fi1===38&&fj1===39)
{om[38][39][28][46]=60;}
if(fi1===38&&fj1===39)
{om[38][39][42][42]=60;}
if(fi1===38&&fj1===39)
{om[38][39][11][44]=70;}
if(fi1===38&&fj1===40)
{om[38][40][12][0]=60;}
if(fi1===38&&fj1===34)
{om[38][34][26][5]=50;om[38][34][25][5]=50;om[38][34][24][5]=50;om[38][34][23][5]=50;om[38][34][22][5]=50;om[38][34][21][5]=50;om[38][34][20][5]=50;om[38][34][19][5]=50;om[38][34][18][5]=50;om[38][34][17][5]=50;om[38][34][17][4]=50;om[38][34][17][3]=50;om[38][34][17][2]=50;om[38][34][17][1]=50;om[38][34][17][0]=50;}
if(fi1===38&&fj1===33)
{om[38][33][17][47]=50;om[38][33][17][46]=50;om[38][33][17][45]=50;om[38][33][17][44]=50;om[38][33][17][43]=50;om[38][33][16][43]=50;om[38][33][15][43]=50;om[38][33][14][43]=50;om[38][33][13][43]=50;om[38][33][12][43]=50;om[38][33][11][43]=50;om[38][33][10][43]=50;om[38][33][10][42]=50;om[38][33][10][41]=50;om[38][33][10][40]=50;om[38][33][10][39]=50;om[38][33][10][38]=50;om[38][33][8][38]=50;om[38][33][8][39]=50;om[38][33][8][40]=50;om[38][33][8][41]=50;om[38][33][8][42]=50;om[38][33][8][43]=50;om[38][33][8][44]=50;om[38][33][8][45]=50;om[38][33][8][46]=50;om[38][33][8][47]=50;}
if(fi1===38&&fj1===33)
{om[38][33][8][48]=50;}
if(fi1===38&&fj1===34)
{om[38][34][8][1]=50;om[38][34][8][2]=50;om[38][34][8][3]=50;om[38][34][8][4]=50;om[38][34][8][5]=50;om[38][34][8][6]=50;om[38][34][8][7]=50;om[38][34][8][8]=50;om[38][34][8][9]=50;om[38][34][9][9]=50;om[38][34][10][9]=50;om[38][34][11][9]=50;om[38][34][12][9]=50;om[38][34][13][9]=50;om[38][34][14][9]=50;om[38][34][15][9]=50;om[38][34][16][9]=50;om[38][34][17][9]=50;om[38][34][18][9]=50;om[38][34][19][9]=50;om[38][34][20][9]=50;om[38][34][21][9]=50;om[38][34][22][9]=50;om[38][34][23][9]=50;om[38][34][24][9]=50;om[38][34][25][9]=50;}
if(fi1===38&&fj1===33)
{om[38][33][12][38]=50;om[38][33][13][38]=50;om[38][33][14][38]=50;om[38][33][15][38]=50;om[38][33][16][38]=50;om[38][33][17][38]=50;om[38][33][17][39]=50;om[38][33][17][40]=50;om[38][33][18][38]=50;om[38][33][19][38]=50;om[38][33][20][38]=50;om[38][33][21][38]=50;om[38][33][22][38]=50;om[38][33][23][38]=50;om[38][33][24][39]=50;om[38][33][24][40]=50;om[38][33][24][41]=50;om[38][33][25][41]=50;om[38][33][26][41]=50;om[38][33][27][41]=50;om[38][33][28][41]=50;om[38][33][28][40]=50;om[38][33][28][39]=50;om[38][33][28][38]=50;om[38][33][28][37]=50;om[38][33][28][36]=50;om[38][33][27][36]=50;om[38][33][26][36]=50;om[38][33][25][36]=50;om[38][33][24][36]=50;om[38][33][24][32]=50;om[38][33][25][32]=50;om[38][33][26][32]=50;om[38][33][27][32]=50;om[38][33][28][32]=50;om[38][33][29][32]=50;om[38][33][30][32]=50;om[38][33][31][32]=50;om[38][33][32][32]=50;om[38][33][32][33]=50;om[38][33][32][34]=50;om[38][33][32][35]=50;om[38][33][32][36]=50;om[38][33][32][37]=50;om[38][33][33][37]=50;om[38][33][34][37]=50;om[38][33][35][37]=50;om[38][33][36][37]=50;om[38][33][36][38]=50;om[38][33][36][39]=50;om[38][33][36][40]=50;om[38][33][35][40]=50;om[38][33][34][40]=50;om[38][33][33][40]=50;om[38][33][33][41]=50;om[38][33][33][42]=50;om[38][33][33][43]=50;om[38][33][33][44]=50;om[38][33][33][45]=50;om[38][33][33][46]=50;om[38][33][32][46]=50;om[38][33][31][46]=50;om[38][33][30][46]=50;om[38][33][29][46]=50;om[38][33][28][46]=50;om[38][33][27][46]=50;om[38][33][26][46]=50;om[38][33][25][46]=50;}
if(fi1===32&&fj1===29)
{om[32][29][34][0]=50;om[32][29][31][0]=50;}
if(fi1===30&&fj1===30)
{om[30][30][0][21]=70;om[30][30][0][19]=70;}
if(fi1===38&&fj1===38)
{om[38][38][22][36]=50;om[38][38][21][33]=50;om[38][38][22][30]=50;om[38][38][22][29]=50;om[38][38][22][28]=50;om[38][38][25][26]=50;om[38][38][28][24]=50;om[38][38][30][26]=50;om[38][38][33][25]=50;om[38][38][40][34]=50;om[38][38][40][36]=50;om[38][38][39][38]=50;om[38][38][38][40]=50;om[38][38][38][42]=50;om[38][38][38][44]=50;}
if(fi1===38&&fj1===38)
{om[38][38][44][23]=60;}
if(fi1===38&&fj1===38)
{om[38][38][47][25]=60;}
if(fi1===38&&fj1===39)
{om[38][39][23][3]=50;om[38][39][18][3]=50;om[38][39][14][1]=50;om[38][39][12][3]=50;om[38][39][12][1]=60;om[38][39][22][3]=60;om[38][39][14][4]=60;}
if(fi1===38&&fj1===38){for(let fi=25;fi<=28;fi++){om[38][38][fi][32]=20;}}
if(fi1===38&&fj1===38){for(let fj=32;fj<=27;fj++){om[38][38][28][fj]=20;}}
if(fi1===38&&fj1===38){for(let fj=27;fj<=39;fj++){om[38][38][32][fj]=20;}}
if(fi1===38&&fj1===38){for(let fi=32;fi<=36;fi++){om[38][38][fi][39]=20;}}
if(fi1===38&&fj1===38){for(let fi=36;fi<=32;fi++){om[38][38][fi][42]=20;}}
if(fi1===38&&fj1===38){for(let fj=42;fj<=48;fj++){om[38][38][32][fj]=20;}}
if(fi1===38&&fj1===38){for(let fj=48;fj<=41;fj++){om[38][38][29][fj]=20;}}
if(fi1===38&&fj1===38){for(let fj=27;fj<=38;fj++){om[38][38][28][fj]=20;}}
if(fi1===38&&fj1===38){for(let fj=41;fj<=47;fj++){om[38][38][28][fj]=20;}}
if(fi1===38&&fj1===38){for(let fi=32;fi<=36;fi++){om[38][38][fi][42]=20;}}
if(fi1===38&&fj1===38){for(let fi=21;fi<=27;fi++){om[38][38][fi][41]=20;}}
if(fi1===38&&fj1===38){for(let fi=20;fi<=27;fi++){om[38][38][fi][38]=20;}}
if(fi1===31&&fj1===30){for(let fi=11;fi<=13;fi++){for(let fj=25;fj<=27;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=14;fi<=16;fi++){for(let fj=25;fj<=27;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=14;fi<=16;fi++){for(let fj=22;fj<=24;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=11;fi<=13;fi++){for(let fj=22;fj<=24;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=11;fi<=13;fi++){for(let fj=19;fj<=21;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=14;fi<=16;fi++){for(let fj=19;fj<=21;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=8;fi<=10;fi++){for(let fj=19;fj<=21;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=8;fi<=10;fi++){for(let fj=22;fj<=24;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=8;fi<=10;fi++){for(let fj=25;fj<=27;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=7;fi<=9;fi++){for(let fj=22;fj<=24;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=4;fi<=6;fi++){for(let fj=22;fj<=24;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=1;fi<=3;fi++){for(let fj=22;fj<=24;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=0;fi<=2;fi++){for(let fj=21;fj<=23;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===30&&fj1===30){for(let fi=46;fi<=48;fi++){for(let fj=20;fj<=22;fj++){om[30][30][fi][fj]=0;}}}
if(fi1===30&&fj1===30){for(let fi=46;fi<=48;fi++){for(let fj=17;fj<=19;fj++){om[30][30][fi][fj]=0;}}}
if(fi1===30&&fj1===30){for(let fi=43;fi<=45;fi++){for(let fj=17;fj<=19;fj++){om[30][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=1;fi<=3;fi++){for(let fj=17;fj<=19;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=1;fi<=3;fi++){for(let fj=19;fj<=21;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fi=4;fi<=6;fi++){for(let fj=17;fj<=19;fj++){om[31][30][fi][fj]=0;}}}
if(fi1===31&&fj1===30){for(let fj=8;fj<=19;fj++){om[31][30][1][fj]=ASCEND_TREE;}}
if(fi1===31&&fj1===30){for(let fi=1;fi<=7;fi++){om[31][30][fi][19]=ASCEND_TREE;}}
if(fi1===30&&fj1===30){for(let fi=47;fi<=7;fi++){om[30][30][fi][23]=ASCEND_TREE;}}
if(fi1===30&&fj1===30){for(let fj=11;fj<=23;fj++){om[30][30][47][fj]=ASCEND_TREE;}}
if(fi1===31&&fj1===30){for(let fj=10;fj<=18;fj++){om[31][30][1][fj]=ASCEND_TREE;}}
if(fi1===29&&fj1===30)
{for(let fi=42;fi<=44;fi++){for(let fj=7;fj<=9;fj++){om[29][30][fi][fj]=0;}}
for(let fi=42;fi<=44;fi++){for(let fj=10;fj<=12;fj++){om[29][30][fi][fj]=0;}}
for(let fi=42;fi<=44;fi++){for(let fj=13;fj<=15;fj++){om[29][30][fi][fj]=0;}}
for(let fi=42;fi<=44;fi++){for(let fj=16;fj<=18;fj++){om[29][30][fi][fj]=0;}}
for(let fi=42;fi<=44;fi++){for(let fj=19;fj<=21;fj++){om[29][30][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=19;fj<=21;fj++){om[29][30][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=16;fj<=18;fj++){om[29][30][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=13;fj<=15;fj++){om[29][30][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=10;fj<=12;fj++){om[29][30][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=7;fj<=9;fj++){om[29][30][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=7;fj<=9;fj++){om[29][30][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=10;fj<=12;fj++){om[29][30][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=13;fj<=15;fj++){om[29][30][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=16;fj<=18;fj++){om[29][30][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=19;fj<=21;fj++){om[29][30][fi][fj]=0;}}}
if(fi1===30&&fj1===33){for(let fi=28;fi<=36;fi++){om[30][33][fi][14]=20;}}
if(fi1===30&&fj1===33){for(let fj=18;fj<=26;fj++){om[30][33][24][fj]=20;}}
if(fi1===30&&fj1===33){for(let fj=25;fj<=28;fj++){om[30][33][17][fj]=20;}}
if(fi1===30&&fj1===33){for(let fj=19;fj<=22;fj++){om[30][33][17][fj]=20;}}
if(fi1===30&&fj1===33)
{om[30][33][33][8]=20;om[30][33][33][9]=20;om[30][33][33][10]=20;om[30][33][32][11]=20;om[30][33][31][11]=20;om[30][33][30][11]=20;om[30][33][29][10]=20;om[30][33][29][9]=20;om[30][33][29][8]=20;om[30][33][30][7]=20;om[30][33][31][7]=20;om[30][33][32][7]=20;om[30][33][28][17]=20;om[30][33][30][17]=20;om[30][33][32][17]=20;om[30][33][27][19]=20;om[30][33][27][21]=20;om[30][33][27][23]=20;om[30][33][31][20]=20;om[30][33][30][21]=20;om[30][33][29][22]=20;om[30][33][15][22]=20;om[30][33][14][22]=20;om[30][33][13][22]=20;om[30][33][15][25]=20;om[30][33][14][25]=20;om[30][33][13][28]=20;om[30][33][12][28]=20;om[30][33][11][28]=20;om[30][33][11][29]=20;om[30][33][10][29]=20;om[30][33][9][29]=20;om[30][33][9][30]=20;om[30][33][8][30]=20;om[30][33][7][30]=20;om[30][33][7][27]=20;om[30][33][8][27]=20;om[30][33][9][27]=20;om[30][33][9][26]=20;om[30][33][10][26]=20;om[30][33][11][26]=20;om[30][33][11][25]=20;om[30][33][12][25]=20;om[30][33][13][25]=20;om[30][33][13][24]=20;om[30][33][13][23]=20;om[30][33][14][23]=20;om[30][33][31][19]=20;}
if(fi1===31&&fj1===33)
{for(let fi=30;fi<=32;fi++){for(let fj=38;fj<=40;fj++){om[31][33][fi][fj]=0;}}
for(let fi=27;fi<=29;fi++){for(let fj=38;fj<=40;fj++){om[31][33][fi][fj]=0;}}
for(let fi=27;fi<=29;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=33;fi<=35;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=42;fi<=44;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=26;fi<=28;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}
for(let fi=26;fi<=28;fi++){for(let fj=41;fj<=43;fj++){om[31][33][fi][fj]=0;}}}
if(fi1===30&&fj1===37)
{om[30][37][17][4]=20;om[30][37][23][2]=20;om[30][37][24][2]=20;om[30][37][25][2]=20;om[30][37][26][2]=20;om[30][37][26][3]=20;om[30][37][27][3]=20;om[30][37][28][3]=20;om[30][37][28][4]=20;om[30][37][27][4]=20;om[30][37][26][4]=20;om[30][37][25][4]=20;om[30][37][24][4]=20;om[30][37][23][4]=20;om[30][37][23][5]=20;om[30][37][22][5]=20;om[30][37][21][5]=20;om[30][37][20][5]=20;om[30][37][20][6]=20;om[30][37][19][6]=20;om[30][37][18][6]=20;om[30][37][16][6]=20;}
if(fi1===31&&fj1===38)
{om[31][38][14][37]=70;om[31][38][11][38]=70;om[31][38][13][35]=70;om[31][38][11][36]=20;om[31][38][15][37]=20;om[31][38][14][40]=20;om[31][38][11][41]=20;om[31][38][9][37]=20;om[31][38][12][33]=20;om[31][38][14][34]=20;om[31][38][15][36]=20;om[31][38][5][39]=5;om[31][38][7][40]=5;om[31][38][10][39]=5;om[31][38][8][36]=5;}
if(fi1===31&&fj1===38)
{om[31][38][5][36]=20;}
if(fi1===31&&fj1===35)
{om[31][35][12][31]=70;}
if(fi1===33&&fj1===34)
{om[33][34][13][15]=70;}
if(fi1===34&&fj1===34)
{om[34][34][34][38]=70;}
if(fi1===37&&fj1===35)
{for(let fi=22;fi<=24;fi++){for(let fj=43;fj<=45;fj++){om[37][35][fi][fj]=0;}}
for(let fi=25;fi<=27;fi++){for(let fj=43;fj<=45;fj++){om[37][35][fi][fj]=0;}}
for(let fi=28;fi<=30;fi++){for(let fj=43;fj<=45;fj++){om[37][35][fi][fj]=0;}}
for(let fi=31;fi<=33;fi++){for(let fj=43;fj<=45;fj++){om[37][35][fi][fj]=0;}}
for(let fi=34;fi<=36;fi++){for(let fj=43;fj<=45;fj++){om[37][35][fi][fj]=0;}}
for(let fi=34;fi<=36;fi++){for(let fj=40;fj<=42;fj++){om[37][35][fi][fj]=0;}}
for(let fi=31;fi<=33;fi++){for(let fj=40;fj<=42;fj++){om[37][35][fi][fj]=0;}}
for(let fi=28;fi<=30;fi++){for(let fj=40;fj<=42;fj++){om[37][35][fi][fj]=0;}}
for(let fi=25;fi<=27;fi++){for(let fj=40;fj<=42;fj++){om[37][35][fi][fj]=0;}}
for(let fi=23;fi<=25;fi++){for(let fj=40;fj<=42;fj++){om[37][35][fi][fj]=0;}}
for(let fi=23;fi<=25;fi++){for(let fj=40;fj<=42;fj++){om[37][35][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=37;fj<=39;fj++){om[37][35][fi][fj]=0;}}
for(let fi=33;fi<=35;fi++){for(let fj=37;fj<=39;fj++){om[37][35][fi][fj]=0;}}}
if(fi1===36&&fj1===41)om[36][41][32][17]=ASCEND_BARN;if(fi1===36&&fj1===41)om[36][41][34][17]=ASCEND_HOUSE;if(fi1===36&&fj1===41)om[36][41][34][17]=ASCEND_ROADLIGHT;if(fi1===36&&fj1===41)om[36][41][34][17]=ASCEND_ROADLIGHT;if(fi1===36&&fj1===41){for(let fi=35;fi<=44;fi++){om[36][41][fi][14]=ASCEND_HOUSE;}}
if(fi1===36&&fj1===41){for(let fj=5;fj<=14;fj++){om[36][41][44][fj]=ASCEND_HOUSE;}}
if(fi1===36&&fj1===41){for(let fj=5;fj<=18;fj++){om[36][41][48][fj]=ASCEND_HOUSE;}}
if(fi1===36&&fj1===41){for(let fi=36;fi<=48;fi++){om[36][41][fi][18]=ASCEND_HOUSE;}}
if(fi1===36&&fj1===40){for(let fj=38;fj<=44;fj++){om[36][40][48][fj]=ASCEND_HOUSE;}}
if(fi1===37&&fj1===40){for(let fj=30;fj<=38;fj++){om[37][40][3][fj]=ASCEND_HOUSE;}}
if(fi1===36&&fj1===40){for(let fj=30;fj<=43;fj++){om[36][40][48][fj]=ASCEND_HOUSE;}}
if(fi1===36&&fj1===40)om[36][40][45][45]=ASCEND_HOUSE;if(fi1===36&&fj1===40)om[36][40][45][47]=ASCEND_HOUSE;if(fi1===36&&fj1===41)om[36][41][44][1]=ASCEND_HOUSE;if(fi1===36&&fj1===41)om[36][41][43][4]=ASCEND_HOUSE;if(fi1===36&&fj1===41)om[36][41][48][3]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][1][48]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][5][44]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][3][42]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][2][39]=ASCEND_HOUSE;if(fi1===34&&fj1===37)
{for(let fi=22;fi<=24;fi++){for(let fj=25;fj<=27;fj++){om[34][37][fi][fj]=0;}}
for(let fi=22;fi<=24;fi++){for(let fj=22;fj<=24;fj++){om[34][37][fi][fj]=0;}}
for(let fi=25;fi<=27;fi++){for(let fj=22;fj<=24;fj++){om[34][37][fi][fj]=0;}}
for(let fi=25;fi<=27;fi++){for(let fj=22;fj<=24;fj++){om[34][37][fi][fj]=0;}}
for(let fi=25;fi<=27;fi++){for(let fj=25;fj<=27;fj++){om[34][37][fi][fj]=0;}}}
if(fi1===30&&fj1===30)
{om[30][30][24][21]=70;}
if(fi1===29&&fj1===29)
{om[29][29][36][12]=60;om[29][29][36][20]=60;}
if(fi1===31&&fj1===33)
{om[31][33][46][10]=50;}
if(fi1===31&&fj1===29){for(let fj=26;fj<=37;fj++){om[31][29][39][fj]=ASCEND_HOUSE;}}
if(fi1===31&&fj1===29){for(let fi=35;fi<=41;fi++){om[31][29][fi][39]=ASCEND_HOUSE;}}
if(fi1===31&&fj1===29){for(let fi=27;fi<=33;fi++){om[31][29][fi][39]=ASCEND_HOUSE;}}
if(fi1===31&&fj1===29)om[fi1][fj1][32][34]=ASCEND_HOUSE;if(fi1===31&&fj1===29)om[fi1][fj1][32][30]=ASCEND_HOUSE;if(fi1===31&&fj1===29)om[fi1][fj1][28][32]=ASCEND_HOUSE;if(fi1===31&&fj1===29)om[fi1][fj1][31][26]=ASCEND_HOUSE;if(fi1===31&&fj1===29)om[fi1][fj1][37][29]=ASCEND_HOUSE;if(fi1===31&&fj1===29)om[fi1][fj1][36][33]=ASCEND_HOUSE;if(fi1===31&&fj1===31)
{om[31][31][44][15]=50;}
if(fi1===37&&fj1===35)
{om[37][35][22][46]=50;}
if(fi1===32&&fj1===32)
{om[32][32][17][5]=50;}
if(fi1===31&&fj1===32)
{om[31][32][12][38]=50;}
if(fi1===32&&fj1===31)
{om[32][31][3][41]=50;}
if(fi1===37&&fj1===29)
{om[37][29][5][36]=60;om[37][29][2][36]=60;om[37][29][15][36]=60;om[37][29][18][36]=60;om[37][29][28][36]=60;om[37][29][31][36]=60;om[37][29][41][36]=60;om[37][29][44][36]=60;om[37][29][48][36]=60;}
if(fi1===40&&fj1===29&&1===0)
{om[40][29][47][25]=60;om[40][29][43][36]=60;om[40][29][18][33]=60;om[40][29][16][23]=50;om[40][29][13][22]=50;om[40][29][15][20]=50;om[40][29][29][23]=70;om[40][29][31][23]=70;om[40][29][32][26]=70;om[40][29][30][28]=70;om[40][29][29][26]=70;om[40][29][27][27]=70;om[40][29][43][32]=60;om[40][29][46][32]=60;om[40][29][46][30]=60;om[40][29][44][30]=60;om[40][29][43][29]=60;om[40][29][46][27]=60;om[40][29][46][27]=60;om[40][29][42][34]=60;om[40][29][41][35]=60;om[40][29][42][37]=60;om[40][29][40][39]=60;om[40][29][38][38]=60;om[40][29][36][38]=60;om[40][29][35][39]=60;om[40][29][34][39]=60;om[40][29][36][37]=60;om[40][29][39][35]=60;om[40][29][38][34]=60;om[40][29][34][11]=20;om[40][29][33][10]=20;om[40][29][32][9]=20;om[40][29][30][9]=20;om[40][29][29][10]=20;om[40][29][28][12]=20;om[40][29][29][11]=20;om[40][29][32][7]=20;om[40][29][35][9]=20;om[40][29][34][10]=20;om[40][29][34][11]=30;om[40][29][32][11]=30;om[40][29][31][12]=30;om[40][29][28][9]=30;om[40][29][30][8]=40;om[40][29][30][9]=40;om[40][29][29][10]=30;om[40][29][28][10]=40;om[40][29][28][10]=30;om[40][29][30][11]=40;om[40][29][34][8]=30;om[40][29][35][7]=40;om[40][29][36][6]=30;om[40][29][36][6]=40;om[40][29][31][5]=40;om[40][29][31][5]=30;om[40][29][30][4]=40;om[40][29][21][45]=70;om[40][29][18][41]=70;om[40][29][21][41]=70;om[40][29][25][39]=70;om[40][29][25][41]=30;om[40][29][22][44]=30;om[40][29][18][43]=30;om[40][29][20][43]=20;om[40][29][23][44]=20;om[40][29][25][45]=20;om[40][29][27][43]=20;}
if(fi1===40&&fj1===28)
{om[40][28][1][47]=70;}
if(fi1===39&&fj1===28)
{om[39][28][44][48]=70;}
if(fi1===38&&fj1===28)
{om[38][28][30][16]=60;om[38][28][19][16]=60;om[38][28][19][27]=60;om[38][28][30][27]=60;om[38][28][30][23]=60;om[38][28][30][19]=60;om[38][28][30][18]=70;om[38][28][30][17]=70;om[38][28][29][16]=70;om[38][28][28][16]=70;om[38][28][27][16]=70;om[38][28][26][16]=70;om[38][28][25][16]=70;om[38][28][24][16]=70;om[38][28][23][16]=70;om[38][28][22][16]=70;om[38][28][21][16]=70;om[38][28][20][16]=70;om[38][28][19][17]=70;om[38][28][19][18]=70;om[38][28][19][19]=70;om[38][28][19][20]=70;om[38][28][19][21]=70;om[38][28][19][22]=70;om[38][28][19][23]=70;om[38][28][19][24]=70;om[38][28][19][25]=70;om[38][28][19][26]=70;om[38][28][20][27]=70;om[38][28][21][27]=70;om[38][28][22][27]=70;om[38][28][23][27]=70;om[38][28][24][27]=70;om[38][28][25][27]=70;om[38][28][26][27]=70;om[38][28][27][27]=70;om[38][28][28][27]=70;om[38][28][29][27]=70;om[38][28][30][26]=70;om[38][28][30][25]=70;om[38][28][30][24]=70;}
if(fi1===38&&fj1===28)
{om[38][28][24][23]=70;om[38][28][24][19]=70;om[38][28][26][20]=70;om[38][28][26][22]=70;om[38][28][25][21]=60;om[38][28][25][22]=60;om[38][28][24][21]=60;om[38][28][24][22]=60;}
if(fi1===33&&fj1===36)
{om[33][36][46][44]=50;om[33][36][47][44]=50;om[33][36][48][44]=50;}
if(fi1===33&&fj1===36)
{om[33][36][46][19]=50;om[33][36][45][19]=50;om[33][36][44][19]=50;om[33][36][28][22]=50;om[33][36][28][24]=50;}
if(fi1===34&&fj1===36)
{om[34][36][1][44]=60;}
if(fi1===34&&fj1===36)
{om[34][36][6][19]=50;om[34][36][5][19]=50;om[34][36][0][19]=50;}
if(fi1===33&&fj1===36)
{om[33][36][47][19]=50;om[33][36][28][23]=50;om[33][36][28][27]=50;om[33][36][28][29]=50;om[33][36][28][31]=50;}
if(fi1===32&&fj1===29)
{om[32][29][25][47]=50;om[32][29][25][46]=50;om[32][29][25][45]=50;om[32][29][25][44]=50;om[32][29][25][43]=50;om[32][29][25][42]=50;om[32][29][25][41]=50;om[32][29][25][40]=50;om[32][29][25][39]=50;om[32][29][25][38]=50;om[32][29][25][37]=50;om[32][29][25][36]=50;om[32][29][25][35]=50;om[32][29][25][34]=50;om[32][29][25][33]=50;om[32][29][25][32]=50;om[32][29][25][31]=50;om[32][29][25][30]=50;om[32][29][25][29]=50;om[32][29][25][28]=50;}
if(fi1===27&&fj1===36)
{om[27][36][12][29]=70;om[27][36][14][24]=70;om[27][36][31][19]=70;om[27][36][25][36]=70;om[27][36][23][36]=70;om[27][36][22][36]=70;}
if(fi1===37&&fj1===35)
{om[37][35][31][45]=60;om[37][35][25][45]=60;om[37][35][26][46]=70;om[37][35][27][46]=70;om[37][35][28][46]=70;om[37][35][29][46]=70;om[37][35][30][45]=50;om[37][35][30][46]=70;om[37][35][30][42]=70;om[37][35][27][42]=70;}
if(fi1===38&&fj1===37)
{om[38][37][9][3]=20;om[38][37][9][3]=20;om[38][37][6][5]=60;om[38][37][6][1]=60;om[38][37][5][4]=60;om[38][37][5][2]=60;om[38][37][7][4]=60;om[38][37][7][2]=60;om[38][37][7][3]=70;om[38][37][5][3]=70;om[38][37][9][5]=70;om[38][37][9][1]=70;om[38][37][2][1]=70;om[38][37][2][5]=70;}
if(fi1===38&&fj1===37)
{}
if(fi1===27&&fj1===38)
{for(let fi=24;fi<=30;fi++){for(let fj=25;fj<=31;fj++){om[27][38][fi][fj]=0;}}
for(let fi=22;fi<=28;fi++){for(let fj=30;fj<=36;fj++){om[27][38][fi][fj]=0;}}
for(let fi=22;fi<=28;fi++){for(let fj=34;fj<=40;fj++){om[27][38][fi][fj]=0;}}
for(let fi=22;fi<=28;fi++){for(let fj=37;fj<=43;fj++){om[27][38][fi][fj]=0;}}
for(let fi=21;fi<=27;fi++){for(let fj=42;fj<=48;fj++){om[27][38][fi][fj]=0;}}}
if(fi1===27&&fj1===36)
{for(let fi=0;fi<=4;fi++){for(let fj=34;fj<=40;fj++){om[27][36][fi][fj]=0;}}
for(let fi=0;fi<=6;fi++){for(let fj=41;fj<=47;fj++){om[27][36][fi][fj]=0;}}}
if(fi1===26&&fj1===36)
{for(let fi=46;fi<=48;fi++){for(let fj=40;fj<=42;fj++){om[26][36][fi][fj]=0;}}
for(let fi=41;fi<=43;fi++){for(let fj=34;fj<=36;fj++){om[26][36][fi][fj]=0;}}
for(let fi=38;fi<=40;fi++){for(let fj=25;fj<=27;fj++){om[26][36][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=23;fj<=25;fj++){om[26][36][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=21;fj<=23;fj++){om[26][36][fi][fj]=0;}}
for(let fi=37;fi<=43;fi++){for(let fj=17;fj<=23;fj++){om[26][36][fi][fj]=0;}}}
if(fi1===27&&fj1===36)
{for(let fi=7;fi<=9;fi++){for(let fj=14;fj<=16;fj++){om[27][36][fi][fj]=0;}}
for(let fi=6;fi<=8;fi++){for(let fj=8;fj<=10;fj++){om[27][36][fi][fj]=0;}}
for(let fi=6;fi<=8;fi++){for(let fj=6;fj<=8;fj++){om[27][36][fi][fj]=0;}}
for(let fi=9;fi<=11;fi++){for(let fj=6;fj<=8;fj++){om[27][36][fi][fj]=0;}}
for(let fi=10;fi<=12;fi++){for(let fj=6;fj<=8;fj++){om[27][36][fi][fj]=0;}}
for(let fi=12;fi<=14;fi++){for(let fj=6;fj<=8;fj++){om[27][36][fi][fj]=0;}}
for(let fi=13;fi<=15;fi++){for(let fj=5;fj<=7;fj++){om[27][36][fi][fj]=0;}}
for(let fi=21;fi<=23;fi++){for(let fj=-1;fj<=1;fj++){om[27][36][fi][fj]=0;}}}
if(fi1===26&&fj1===35)
{for(let fi=34;fi<=36;fi++){for(let fj=42;fj<=44;fj++){om[26][35][fi][fj]=0;}}
for(let fi=35;fi<=37;fi++){for(let fj=39;fj<=41;fj++){om[26][35][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=38;fj<=40;fj++){om[26][35][fi][fj]=0;}}
for(let fi=38;fi<=40;fi++){for(let fj=36;fj<=38;fj++){om[26][35][fi][fj]=0;}}
for(let fi=37;fi<=39;fi++){for(let fj=35;fj<=37;fj++){om[26][35][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=32;fj<=34;fj++){om[26][35][fi][fj]=0;}}
for(let fi=34;fi<=36;fi++){for(let fj=33;fj<=35;fj++){om[26][35][fi][fj]=0;}}
for(let fi=33;fi<=35;fi++){for(let fj=35;fj<=37;fj++){om[26][35][fi][fj]=0;}}
for(let fi=33;fi<=35;fi++){for(let fj=32;fj<=34;fj++){om[26][35][fi][fj]=0;}}
for(let fi=37;fi<=39;fi++){for(let fj=24;fj<=26;fj++){om[26][35][fi][fj]=0;}}
for(let fi=38;fi<=40;fi++){for(let fj=21;fj<=23;fj++){om[26][35][fi][fj]=0;}}
for(let fi=38;fi<=40;fi++){for(let fj=21;fj<=23;fj++){om[26][35][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=18;fj<=20;fj++){om[26][35][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=16;fj<=18;fj++){om[26][35][fi][fj]=0;}}
for(let fi=38;fi<=40;fi++){for(let fj=15;fj<=17;fj++){om[26][35][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=17;fj<=19;fj++){om[26][35][fi][fj]=0;}}
for(let fi=45;fi<=48;fi++){for(let fj=16;fj<=22;fj++){om[26][35][fi][fj]=0;}}
for(let fi=36;fi<=38;fi++){for(let fj=6;fj<=8;fj++){om[26][35][fi][fj]=0;}}
for(let fi=37;fi<=39;fi++){for(let fj=4;fj<=6;fj++){om[26][35][fi][fj]=0;}}
for(let fi=37;fi<=39;fi++){for(let fj=47;fj<=48;fj++){om[26][35][fi][fj]=0;}}}
if(fi1===26&&fj1===34)
{for(let fi=40;fi<=42;fi++){for(let fj=39;fj<=41;fj++){om[26][34][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=35;fj<=37;fj++){om[26][34][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=31;fj<=33;fj++){om[26][34][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=27;fj<=29;fj++){om[26][34][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=18;fj<=20;fj++){om[26][34][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=15;fj<=17;fj++){om[26][34][fi][fj]=0;}}}
if(fi1===26&&fj1===33)
{for(let fi=30;fi<=36;fi++){for(let fj=41;fj<=47;fj++){om[26][33][fi][fj]=0;}}
for(let fi=25;fi<=31;fi++){for(let fj=42;fj<=48;fj++){om[26][33][fi][fj]=0;}}
for(let fi=18;fi<=24;fi++){for(let fj=41;fj<=47;fj++){om[26][33][fi][fj]=0;}}
for(let fi=25;fi<=31;fi++){for(let fj=33;fj<=39;fj++){om[26][33][fi][fj]=0;}}
for(let fi=34;fi<=40;fi++){for(let fj=29;fj<=35;fj++){om[26][33][fi][fj]=0;}}
for(let fi=35;fi<=41;fi++){for(let fj=28;fj<=34;fj++){om[26][33][fi][fj]=0;}}}
if(fi1===26&&fj1===33)
{for(let fi=10;fi<=12;fi++){for(let fj=21;fj<=23;fj++){om[26][33][fi][fj]=0;}}
for(let fi=11;fi<=13;fi++){for(let fj=22;fj<=24;fj++){om[26][33][fi][fj]=0;}}
for(let fi=18;fi<=24;fi++){for(let fj=21;fj<=27;fj++){om[26][33][fi][fj]=0;}}
for(let fi=24;fi<=26;fi++){for(let fj=16;fj<=18;fj++){om[26][33][fi][fj]=0;}}
for(let fi=26;fi<=28;fi++){for(let fj=13;fj<=15;fj++){om[26][33][fi][fj]=0;}}
for(let fi=28;fi<=30;fi++){for(let fj=11;fj<=13;fj++){om[26][33][fi][fj]=0;}}
for(let fi=26;fi<=32;fi++){for(let fj=8;fj<=14;fj++){om[26][33][fi][fj]=0;}}
for(let fi=21;fi<=27;fi++){for(let fj=7;fj<=13;fj++){om[26][33][fi][fj]=0;}}
for(let fi=15;fi<=21;fi++){for(let fj=7;fj<=13;fj++){om[26][33][fi][fj]=0;}}
for(let fi=13;fi<=19;fi++){for(let fj=8;fj<=14;fj++){om[26][33][fi][fj]=0;}}
for(let fi=10;fi<=16;fi++){for(let fj=6;fj<=12;fj++){om[26][33][fi][fj]=0;}}
for(let fi=15;fi<=21;fi++){for(let fj=4;fj<=10;fj++){om[26][33][fi][fj]=0;}}
for(let fi=19;fi<=25;fi++){for(let fj=3;fj<=9;fj++){om[26][33][fi][fj]=0;}}
for(let fi=24;fi<=30;fi++){for(let fj=2;fj<=8;fj++){om[26][33][fi][fj]=0;}}
for(let fi=28;fi<=34;fi++){for(let fj=2;fj<=8;fj++){om[26][33][fi][fj]=0;}}
for(let fi=30;fi<=36;fi++){for(let fj=1;fj<=7;fj++){om[26][33][fi][fj]=0;}}
for(let fi=35;fi<=37;fi++){for(let fj=3;fj<=5;fj++){om[26][33][fi][fj]=0;}}
for(let fi=39;fi<=41;fi++){for(let fj=5;fj<=7;fj++){om[26][33][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=6;fj<=8;fj++){om[26][33][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=8;fj<=10;fj++){om[26][33][fi][fj]=0;}}
for(let fi=40;fi<=42;fi++){for(let fj=11;fj<=13;fj++){om[26][33][fi][fj]=0;}}
for(let fi=42;fi<=44;fi++){for(let fj=11;fj<=13;fj++){om[26][33][fi][fj]=0;}}
for(let fi=43;fi<=45;fi++){for(let fj=10;fj<=12;fj++){om[26][33][fi][fj]=0;}}
for(let fi=44;fi<=46;fi++){for(let fj=9;fj<=11;fj++){om[26][33][fi][fj]=0;}}}
if(fi1===27&&fj1===33)
{for(let fi=2;fi<=8;fi++){for(let fj=14;fj<=20;fj++){om[27][33][fi][fj]=0;}}
for(let fi=13;fi<=19;fi++){for(let fj=19;fj<=25;fj++){om[27][33][fi][fj]=0;}}
for(let fi=18;fi<=24;fi++){for(let fj=20;fj<=26;fj++){om[27][33][fi][fj]=0;}}
for(let fi=23;fi<=29;fi++){for(let fj=18;fj<=24;fj++){om[27][33][fi][fj]=0;}}
for(let fi=24;fi<=30;fi++){for(let fj=16;fj<=22;fj++){om[27][33][fi][fj]=0;}}
for(let fi=27;fi<=29;fi++){for(let fj=18;fj<=20;fj++){om[27][33][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=19;fj<=21;fj++){om[27][33][fi][fj]=0;}}
for(let fi=31;fi<=33;fi++){for(let fj=20;fj<=22;fj++){om[27][33][fi][fj]=0;}}
for(let fi=32;fi<=34;fi++){for(let fj=22;fj<=24;fj++){om[27][33][fi][fj]=0;}}}
if(fi1===26&&fj1===39)
{for(let fi=19;fi<=25;fi++){for(let fj=36;fj<=42;fj++){om[26][39][fi][fj]=0;}}
for(let fi=31;fi<=37;fi++){for(let fj=37;fj<=43;fj++){om[26][39][fi][fj]=0;}}
for(let fi=32;fi<=38;fi++){for(let fj=37;fj<=43;fj++){om[26][39][fi][fj]=0;}}
for(let fi=41;fi<=43;fi++){for(let fj=45;fj<=47;fj++){om[26][39][fi][fj]=0;}}
for(let fi=38;fi<=40;fi++){for(let fj=45;fj<=47;fj++){om[26][39][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=45;fj<=47;fj++){om[26][39][fi][fj]=0;}}
for(let fi=29;fi<=31;fi++){for(let fj=45;fj<=47;fj++){om[26][39][fi][fj]=0;}}
for(let fi=26;fi<=28;fi++){for(let fj=43;fj<=45;fj++){om[26][39][fi][fj]=0;}}
for(let fi=23;fi<=29;fi++){for(let fj=40;fj<=46;fj++){om[26][39][fi][fj]=0;}}}
if(fi1===26&&fj1===41)
{for(let fi=38;fi<=44;fi++){for(let fj=30;fj<=36;fj++){om[26][41][fi][fj]=0;}}
for(let fi=46;fi<=48;fi++){for(let fj=29;fj<=31;fj++){om[26][41][fi][fj]=0;}}}
if(fi1===27&&fj1===41)
{for(let fi=16;fi<=18;fi++){for(let fj=30;fj<=32;fj++){om[27][41][fi][fj]=0;}}
for(let fi=20;fi<=22;fi++){for(let fj=37;fj<=39;fj++){om[27][41][fi][fj]=0;}}
for(let fi=22;fi<=24;fi++){for(let fj=33;fj<=35;fj++){om[27][41][fi][fj]=0;}}
for(let fi=24;fi<=26;fi++){for(let fj=32;fj<=34;fj++){om[27][41][fi][fj]=0;}}
for(let fi=26;fi<=28;fi++){for(let fj=32;fj<=34;fj++){om[27][41][fi][fj]=0;}}
for(let fi=28;fi<=30;fi++){for(let fj=31;fj<=33;fj++){om[27][41][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=30;fj<=32;fj++){om[27][41][fi][fj]=0;}}
for(let fi=29;fi<=35;fi++){for(let fj=29;fj<=35;fj++){om[27][41][fi][fj]=0;}}}
if(fi1===29&&fj1===41)
{for(let fi=17;fi<=23;fi++){for(let fj=10;fj<=16;fj++){om[29][41][fi][fj]=0;}}
for(let fi=13;fi<=19;fi++){for(let fj=10;fj<=16;fj++){om[29][41][fi][fj]=0;}}
for(let fi=10;fi<=16;fi++){for(let fj=12;fj<=18;fj++){om[29][41][fi][fj]=0;}}
for(let fi=16;fi<=18;fi++){for(let fj=20;fj<=22;fj++){om[29][41][fi][fj]=0;}}
for(let fi=19;fi<=21;fi++){for(let fj=18;fj<=20;fj++){om[29][41][fi][fj]=0;}}
for(let fi=37;fi<=43;fi++){for(let fj=20;fj<=26;fj++){om[29][41][fi][fj]=0;}}
for(let fi=42;fi<=48;fi++){for(let fj=26;fj<=32;fj++){om[29][41][fi][fj]=0;}}}
if(fi1===30&&fj1===41)
{for(let fi=19;fi<=25;fi++){for(let fj=19;fj<=25;fj++){om[30][41][fi][fj]=0;}}
for(let fi=25;fi<=27;fi++){for(let fj=22;fj<=24;fj++){om[30][41][fi][fj]=0;}}
for(let fi=26;fi<=28;fi++){for(let fj=24;fj<=26;fj++){om[30][41][fi][fj]=0;}}
for(let fi=27;fi<=29;fi++){for(let fj=27;fj<=29;fj++){om[30][41][fi][fj]=0;}}}
if(fi1===29&&fj1===41)
{for(let fi=30;fi<=32;fi++){for(let fj=33;fj<=35;fj++){om[29][41][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=32;fj<=34;fj++){om[29][41][fi][fj]=0;}}
for(let fi=30;fi<=32;fi++){for(let fj=31;fj<=33;fj++){om[29][41][fi][fj]=0;}}
for(let fi=31;fi<=33;fi++){for(let fj=30;fj<=32;fj++){om[29][41][fi][fj]=0;}}
for(let fi=32;fi<=34;fi++){for(let fj=28;fj<=30;fj++){om[29][41][fi][fj]=0;}}
for(let fi=32;fi<=34;fi++){for(let fj=27;fj<=29;fj++){om[29][41][fi][fj]=0;}}}
if(fi1===37&&fj1===34)
{om[37][34][4][0]=50;om[37][34][4][1]=50;om[37][34][4][2]=50;om[37][34][4][3]=50;om[37][34][4][4]=50;om[37][34][3][4]=50;om[37][34][3][5]=50;om[37][34][2][5]=50;om[37][34][2][6]=50;om[37][34][1][6]=50;om[37][34][1][7]=50;om[37][34][0][7]=50;om[37][34][0][8]=50;}
if(fi1===36&&fj1===34)
{om[36][34][48][9]=50;om[36][34][47][9]=50;om[36][34][47][10]=50;om[36][34][46][10]=50;om[36][34][46][11]=50;om[36][34][46][12]=50;}
if(fi1===37&&fj1===35)
{om[37][35][39][16]=50;om[37][35][38][15]=50;om[37][35][37][15]=50;om[37][35][34][13]=50;om[37][35][33][12]=50;om[37][35][30][11]=50;om[37][35][35][15]=50;om[37][35][32][12]=50;om[37][35][35][14]=50;}
if(fi1===37&&fj1===34)
{om[37][34][13][46]=50;om[37][34][11][46]=50;om[37][34][8][47]=50;om[37][34][7][48]=50;om[37][34][6][48]=50;}
if(fi1===37&&fj1===34)
{om[37][34][10][47]=50;om[37][34][7][47]=50;om[37][34][14][45]=50;om[37][34][16][45]=50;om[37][34][12][45]=50;om[37][34][10][46]=50;}
if(fi1===36&&fj1===35)
{om[36][35][48][17]=50;om[36][35][47][17]=50;om[36][35][46][17]=50;om[36][35][44][17]=50;om[36][35][43][17]=50;om[36][35][41][17]=50;om[36][35][39][17]=50;}
if(fi1===37&&fj1===35)
{om[37][35][4][12]=50;om[37][35][4][13]=50;om[37][35][3][14]=50;om[37][35][2][15]=50;om[37][35][1][16]=50;}
if(fi1===36&&fj1===35)
{om[36][35][42][17]=50;om[36][35][40][18]=50;}
if(fi1===37&&fj1===35)
{om[37][35][1][15]=50;om[37][35][0][17]=50;}
if(fi1===36&&fj1===35)
{om[36][35][42][18]=50;om[36][35][43][18]=50;om[36][35][44][18]=50;}
if(fi1===36&&fj1===33)
{om[36][33][45][43]=50;om[36][33][45][42]=50;om[36][33][45][40]=50;om[36][33][46][37]=50;om[36][33][46][35]=50;}
if(fi1===37&&fj1===33)
{om[37][33][5][36]=50;om[37][33][5][38]=50;om[37][33][5][40]=50;om[37][33][5][42]=50;om[37][33][5][41]=50;om[37][33][6][39]=50;om[37][33][6][37]=50;}
if(fi1===37&&fj1===34)
{om[37][34][46][29]=50;om[37][34][45][29]=50;om[37][34][44][29]=50;om[37][34][44][29]=50;om[37][34][43][29]=50;om[37][34][42][29]=50;om[37][34][41][29]=50;om[37][34][41][29]=50;om[37][34][40][29]=50;}
if(fi1===36&&fj1===34)
{om[36][34][29][26]=60;om[36][34][28][27]=60;om[36][34][27][30]=60;om[36][34][26][32]=60;om[36][34][25][34]=60;om[36][34][24][37]=60;om[36][34][23][41]=60;om[36][34][22][47]=60;}
if(fi1===36&&fj1===35)
{om[36][35][27][16]=60;om[36][35][22][8]=60;om[36][35][21][4]=60;om[36][35][37][19]=50;om[36][35][34][18]=50;om[36][35][30][17]=50;}
if(fi1===38&&fj1===35)
{om[38][35][37][11]=60;om[38][35][39][10]=60;om[38][35][41][7]=60;om[38][35][44][5]=60;om[38][35][45][8]=60;om[38][35][43][13]=60;om[38][35][41][15]=50;om[38][35][38][15]=50;om[38][35][36][15]=50;om[38][35][34][15]=60;}
if(fi1===39&&fj1===33)
{om[39][33][2][39]=60;}
if(fi1===38&&fj1===33)
{om[38][33][45][35]=50;om[38][33][43][34]=50;om[38][33][45][37]=50;om[38][33][48][39]=50;}
if(fi1===39&&fj1===33)
{om[39][33][6][43]=60;}
if(fi1===33&&fj1===37)
{om[33][37][2][41]=50;om[33][37][2][42]=50;om[33][37][2][44]=50;om[33][37][2][47]=50;}
if(fi1===33&&fj1===38)
{om[33][38][2][3]=50;}
if(1===0&&fi1===32&&fj1===38)
{om[32][38][38][4]=60;om[32][38][41][11]=60;om[32][38][41][11]=60;om[32][38][42][13]=60;om[32][38][44][15]=60;om[32][38][45][16]=60;}
if(fi1===33&&fj1===38)
{om[33][38][39][25]=60;om[33][38][40][23]=60;om[33][38][35][26]=60;}
if(fi1===33&&fj1===37)
{om[33][37][14][0]=50;om[33][37][13][0]=50;}
if(fi1===33&&fj1===36)
{om[33][36][11][47]=50;om[33][36][10][46]=50;om[33][36][8][45]=50;om[33][36][7][44]=50;}
if(fi1===32&&fj1===35)
{om[32][35][37][15]=60;}
if(fi1===31&&fj1===35)
{om[31][35][25][35]=50;om[31][35][25][35]=50;om[31][35][24][34]=50;om[31][35][23][33]=50;om[31][35][21][31]=50;om[31][35][19][29]=50;om[31][35][19][29]=50;om[31][35][19][15]=60;}
if(fi1===29&&fj1===36)
{om[29][36][16][32]=60;om[29][36][16][33]=60;om[29][36][15][37]=60;om[29][36][16][40]=60;om[29][36][16][42]=60;om[29][36][16][44]=60;}
if(fi1===29&&fj1===37)
{om[29][37][21][32]=60;om[29][37][20][30]=60;om[29][37][17][27]=50;om[29][37][17][24]=50;om[29][37][17][22]=50;}
if(fi1===29&&fj1===37)
{om[29][37][27][45]=50;om[29][37][28][46]=50;om[29][37][29][47]=50;om[29][37][31][48]=50;}
if(fi1===30&&fj1===38)
{om[30][38][11][4]=60;om[30][38][12][8]=60;om[30][38][7][31]=60;om[30][38][12][34]=50;om[30][38][12][33]=50;om[30][38][13][33]=50;om[30][38][14][33]=50;om[30][38][16][32]=50;om[30][38][18][31]=50;}
if(fi1===31&&fj1===38)
{om[31][38][5][28]=50;om[31][38][6][27]=50;om[31][38][7][26]=50;om[31][38][8][26]=50;om[31][38][10][25]=50;}
if(1===0&&fi1===32&&fj1===38)
{om[32][38][16][27]=50;om[32][38][18][27]=50;om[32][38][20][27]=50;om[32][38][22][27]=50;om[32][38][24][26]=50;om[32][38][26][24]=50;om[32][38][27][23]=50;om[32][38][27][21]=50;om[32][38][27][19]=50;om[32][38][17][27]=50;om[32][38][19][27]=50;om[32][38][21][27]=50;om[32][38][23][27]=50;om[32][38][25][26]=50;om[32][38][26][25]=50;om[32][38][27][24]=50;om[32][38][27][22]=50;om[32][38][27][20]=50;}
if(fi1===26&&fj1===33)
{om[26][33][48][41]=60;om[26][33][48][41]=60;om[26][33][45][43]=60;om[26][33][39][48]=60;}
if(fi1===26&&fj1===34)
{om[26][34][35][4]=60;}
if(fi1===26&&fj1===36)
{om[26][36][16][3]=60;om[26][36][16][2]=60;om[26][36][16][0]=60;}
if(fi1===26&&fj1===35)
{om[26][35][15][43]=60;}
if(fi1===26&&fj1===37)
{om[26][37][41][36]=50;om[26][37][42][36]=50;om[26][37][43][36]=50;om[26][37][44][36]=50;om[26][37][46][36]=50;om[26][37][48][36]=50;om[26][37][48][36]=50;}
if(fi1===27&&fj1===37)
{om[27][37][2][36]=50;om[27][37][3][35]=50;om[27][37][4][35]=50;om[27][37][5][35]=50;om[27][37][6][35]=50;}
if(fi1===27&&fj1===37)
{om[27][37][23][31]=60;om[27][37][24][32]=60;om[27][37][25][32]=60;om[27][37][27][33]=60;om[27][37][29][34]=60;om[27][37][31][36]=60;om[27][37][33][37]=60;}
if(fi1===27&&fj1===39)
{om[27][39][33][5]=60;om[27][39][33][5]=60;om[27][39][35][3]=60;om[27][39][36][1]=60;om[27][39][34][3]=50;}
if(fi1===29&&fj1===41)
{om[29][41][23][33]=60;om[29][41][24][32]=60;om[29][41][28][28]=60;om[29][41][32][25]=60;}
if(fi1===38&&fj1===39)
{om[38][39][18][19]=60;om[38][39][17][20]=60;om[38][39][15][22]=60;om[38][39][13][23]=60;om[38][39][11][24]=60;}
if(fi1===38&&fj1===39)
{om[38][39][2][27]=50;om[38][39][0][27]=50;}
if(fi1===36&&fj1===39)
{om[36][39][42][33]=60;om[36][39][40][35]=60;om[36][39][38][36]=60;om[36][39][36][39]=60;om[36][39][34][42]=60;}
if(fi1===31&&fj1===32)
{om[31][32][38][12]=50;om[31][32][39][11]=50;om[31][32][39][21]=50;om[31][32][40][21]=50;}
if(fi1===30&&fj1===32)
{om[30][32][4][27]=50;om[30][32][4][27]=50;om[30][32][2][27]=50;om[30][32][1][27]=50;}
if(fi1===29&&fj1===32)
{om[29][32][47][29]=50;om[29][32][44][31]=50;}
if(fi1===30&&fj1===34)
{om[30][34][5][5]=60;om[30][34][5][8]=60;om[30][34][6][10]=60;om[30][34][7][12]=60;om[30][34][8][14]=60;}
if(fi1===37&&fj1===40)om[37][40][8][3]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][11][3]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][13][2]=ASCEND_HOUSE;if(fi1===37&&fj1===40)om[37][40][15][0]=ASCEND_HOUSE;if(fi1===37&&fj1===39)om[37][39][17][48]=ASCEND_HOUSE;if(fi1===37&&fj1===39)om[37][39][19][47]=ASCEND_HOUSE;if(fi1===37&&fj1===39)om[37][39][21][45]=ASCEND_HOUSE;if(fi1===37&&fj1===39)om[37][39][21][44]=ASCEND_HOUSE;if(fi1===37&&fj1===39)om[37][39][25][26]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][33][20]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][32][19]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][30][19]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][27][21]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][35][18]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][38][17]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][41][16]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][45][15]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===39)om[37][39][48][15]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===39)om[38][39][3][14]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===39)om[38][39][39][10]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===39)om[38][39][44][5]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===39)om[38][39][46][3]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===39)om[38][39][47][2]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===39)om[38][39][47][1]=ASCEND_SKYSCRAPER;if(fi1===38&&fj1===38)om[38][38][48][48]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===38)om[39][38][1][46]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===38)om[39][38][2][42]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===38)om[39][38][3][40]=ASCEND_HOUSE;if(fi1===39&&fj1===38)om[39][38][5][37]=ASCEND_HOUSE;if(fi1===39&&fj1===38)om[39][38][7][31]=ASCEND_HOUSE;if(fi1===39&&fj1===38)om[39][38][8][26]=ASCEND_HOUSE;if(fi1===39&&fj1===38)om[39][38][9][22]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][40][12]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][39][12]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][38][12]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][30][12]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][28][13]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][23][14]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][19][15]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][17][16]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][14][17]=ASCEND_HOUSE;if(fi1===38&&fj1===37)om[38][37][11][19]=ASCEND_HOUSE;if(fi1===34&&fj1===37)om[34][37][0][24]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][48][22]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][48][20]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][48][18]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][48][16]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][48][13]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][48][10]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][47][8]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][47][5]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][47][3]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][47][2]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===37)om[33][37][47][0]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===36)om[33][36][47][48]=ASCEND_SKYSCRAPER;if(fi1===34&&fj1===36)om[34][36][0][25]=ASCEND_SKYSCRAPER;if(fi1===34&&fj1===36)om[34][36][0][25]=ASCEND_HOUSE;if(fi1===34&&fj1===36)om[34][36][0][26]=ASCEND_HOUSE;if(fi1===33&&fj1===36)om[33][36][48][29]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===36)om[33][36][47][31]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===36)om[33][36][47][33]=ASCEND_HOUSE;if(fi1===33&&fj1===36)om[33][36][47][35]=ASCEND_HOUSE;if(fi1===33&&fj1===36)om[33][36][48][37]=ASCEND_HOUSE;if(fi1===34&&fj1===36)om[34][36][0][40]=ASCEND_SKYSCRAPER;if(fi1===33&&fj1===36)om[33][36][48][39]=ASCEND_SKYSCRAPER;if(fi1===34&&fj1===36)om[34][36][0][43]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][15][0]=ASCEND_HOUSE;if(fi1===27&&fj1===39)om[27][39][15][46]=ASCEND_HOUSE;if(fi1===27&&fj1===39)om[27][39][15][46]=ASCEND_HOUSE;if(fi1===27&&fj1===39)om[27][39][17][48]=ASCEND_HOUSE;if(fi1===27&&fj1===40)om[27][40][18][1]=ASCEND_HOUSE;if(fi1===27&&fj1===40)om[27][40][21][5]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][21][6]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][22][8]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][22][10]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][23][14]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][24][17]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][24][20]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][24][23]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][25][26]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][25][29]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][25][31]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][25][34]=ASCEND_HOUSE;if(fi1===27&&fj1===40)om[27][40][25][36]=ASCEND_HOUSE;if(fi1===27&&fj1===40)om[27][40][25][38]=ASCEND_HOUSE;if(fi1===27&&fj1===40)om[27][40][25][40]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][25][43]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][25][45]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][24][47]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][24][15]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][24][15]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][23][13]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][23][11]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][22][9]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===39)om[27][39][13][42]=ASCEND_HOUSE;if(fi1===27&&fj1===39)om[27][39][12][43]=ASCEND_HOUSE;if(fi1===27&&fj1===39)om[27][39][12][46]=ASCEND_HOUSE;if(fi1===27&&fj1===39)om[27][39][14][48]=ASCEND_HOUSE;if(fi1===27&&fj1===40)om[27][40][15][1]=ASCEND_HOUSE;if(fi1===29&&fj1===33)om[29][33][23][25]=ASCEND_SKYSCRAPER;if(fi1===29&&fj1===33)om[29][33][24][25]=ASCEND_SKYSCRAPER;if(fi1===29&&fj1===33)om[29][33][26][24]=ASCEND_SKYSCRAPER;if(fi1===29&&fj1===33)om[29][33][27][24]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][26][27]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][28][27]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][29][28]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][31][30]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][33][31]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][34][34]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][32][31]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][31][32]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][29][32]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===41)om[27][41][28][32]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][17][32]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][15][33]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][14][34]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][12][35]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][9][37]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][8][38]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][6][39]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][4][41]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===34)om[37][34][5][48]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===34)om[37][34][4][0]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===35)om[37][35][2][2]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===35)om[37][35][0][4]=ASCEND_SKYSCRAPER;if(fi1===36&&fj1===35)om[36][35][48][5]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===35)om[37][35][4][1]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===35)om[37][35][4][0]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][15][0]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][16][1]=ASCEND_SKYSCRAPER;if(fi1===39&&fj1===34)om[39][34][16][2]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===40)om[37][40][23][26]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===39)om[27][39][10][48]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===39)om[27][39][10][48]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===39)om[27][39][9][47]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===39)om[27][39][8][47]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===39)om[27][39][6][47]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][12][0]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][13][1]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][16][2]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][17][3]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][19][4]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][14][2]=ASCEND_SKYSCRAPER;if(fi1===27&&fj1===40)om[27][40][13][1]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][26]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][25]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][24]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][23]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][22]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][21]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][20]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][40][19]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][28]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][28]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][27]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][26]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][25]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][24]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][23]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][22]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][21]=ASCEND_SKYSCRAPER;if(fi1===28&&fj1===33)om[28][33][12][20]=ASCEND_SKYSCRAPER;if(fi1===37&&fj1===27)om[37][27][13][22]=0;if(fi1===37&&fj1===27)om[37][27][22][14]=0;if(fi1===37&&fj1===27)om[37][27][28][22]=0;if(fi1===37&&fj1===27)om[37][27][45][24]=0;if(fi1===38&&fj1===27)om[38][27][4][25]=0;if(fi1===38&&fj1===27)om[38][27][41][45]=0;if(fi1===37&&fj1===27)om[37][27][11][45]=0;if(fi1===37&&fj1===27)om[37][27][12][45]=0;if(fi1===37&&fj1===27)om[37][27][13][45]=0;if(fi1===37&&fj1===27)om[37][27][14][45]=0;if(fi1===37&&fj1===27)om[37][27][15][45]=0;if(fi1===38&&fj1===28)om[38][28][39][21]=0
if(fi1===38&&fj1===28)om[38][28][39][20]=0
if(fi1===38&&fj1===28)om[38][28][39][19]=0
if(fi1===38&&fj1===28)om[38][28][39][18]=0
if(fi1===38&&fj1===28)om[38][28][39][17]=0
if(fi1===38&&fj1===28)om[38][28][38][20]=0}
function create_terrain_3d_vertices(fi1,fj1,fi,fj)
{ver_terrain.push(49*fi1+fi,hm[fi1][fj1][fi][fj+1],49*fj1+(fj+1));ver_terrain.push(49*fi1+(fi+1),hm[fi1][fj1][fi+1][fj],49*fj1+fj);ver_terrain.push(49*fi1+fi,hm[fi1][fj1][fi][fj],49*fj1+fj);ver_terrain.push(49*fi1+fi,hm[fi1][fj1][fi][fj+1],49*fj1+(fj+1));ver_terrain.push(49*fi1+(fi+1),hm[fi1][fj1][fi+1][fj+1],49*fj1+(fj+1));ver_terrain.push(49*fi1+(fi+1),hm[fi1][fj1][fi+1][fj],49*fj1+fj);}
function create_objects_3d_ver_houses(fi1,fj1,fi,fj,ver_array,hght,roofheight)
{let h=hm[fi1][fj1][fi][fj];let cx=x_in_chunk_to_x(fi1,fi);let cz=x_in_chunk_to_x(fj1,fj);let und=20-hght;ver_array.push(cx,h-und,cz);ver_array.push(cx,h-und,cz+1);ver_array.push(cx,h+hght,cz+1);ver_array.push(cx,h+hght,cz+1);ver_array.push(cx,h+hght,cz);ver_array.push(cx,h-und,cz);ver_array.push(cx+1,h-und,cz);ver_array.push(cx,h-und,cz);ver_array.push(cx,h+hght,cz);ver_array.push(cx,h+hght,cz);ver_array.push(cx+1,h+hght,cz);ver_array.push(cx+1,h-und,cz);ver_array.push(cx+1,h-und,cz+1);ver_array.push(cx+1,h-und,cz);ver_array.push(cx+1,h+hght,cz);ver_array.push(cx+1,h+hght,cz);ver_array.push(cx+1,h+hght,cz+1);ver_array.push(cx+1,h-und,cz+1);ver_array.push(cx,h-und,cz+1);ver_array.push(cx+1,h-und,cz+1);ver_array.push(cx+1,h+hght,cz+1);ver_array.push(cx+1,h+hght,cz+1);ver_array.push(cx,h+hght,cz+1);ver_array.push(cx,h-und,cz+1);let lngns=1;let widns=1;ver_array.push(cx,h+hght,cz);ver_array.push(cx,h+hght,cz+widns);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz+widns);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz+widns);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz);ver_array.push(cx,h+hght,cz);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz+widns);ver_array.push(cx+lngns,h+hght,cz+widns);ver_array.push(cx+lngns,h+hght,cz+widns);ver_array.push(cx+lngns,h+hght,cz);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz);ver_array.push(cx,h+hght,cz);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz);ver_array.push(cx+lngns,h+hght,cz);ver_array.push(cx+lngns,h+hght,cz+widns);ver_array.push(cx+lngns*0.5,h+hght+roofheight,cz+widns);ver_array.push(cx,h+hght,cz+widns);}
function create_objects_3d_vertices(fi1,fj1,fi,fj,number)
{if(om[fi1][fj1][fi][fj]===ASCEND_ROAD)
{if((fi1>=26&&fi1<=27)&&(fj1>=26&&fj1<=31)){}
else
{if(hm[fi1][fj1][fi][fj+1]<sealevel)hm[fi1][fj1][fi][fj+1]=sealevel+0.3;if(hm[fi1][fj1][fi+1][fj]<sealevel)hm[fi1][fj1][fi+1][fj]=sealevel+0.3;if(hm[fi1][fj1][fi][fj]<sealevel)hm[fi1][fj1][fi][fj]=sealevel+0.3;if(hm[fi1][fj1][fi+1][fj+1]<sealevel)hm[fi1][fj1][fi+1][fj+1]=sealevel+0.3;}
ver_roads.push(49*fi1+fi,hm[fi1][fj1][fi][fj+1],49*fj1+(fj+1));ver_roads.push(49*fi1+(fi+1),hm[fi1][fj1][fi+1][fj],49*fj1+fj);ver_roads.push(49*fi1+fi,hm[fi1][fj1][fi][fj],49*fj1+fj);ver_roads.push(49*fi1+fi,hm[fi1][fj1][fi][fj+1],49*fj1+(fj+1));ver_roads.push(49*fi1+(fi+1),hm[fi1][fj1][fi+1][fj+1],49*fj1+(fj+1));ver_roads.push(49*fi1+(fi+1),hm[fi1][fj1][fi+1][fj],49*fj1+fj);}
else if(om[fi1][fj1][fi][fj]===ASCEND_ROADLIGHT)
{let h=hm[fi1][fj1][fi][fj];if((fi1>=26&&fi1<=27)&&(fj1>=26&&fj1<=31)){}
else{if(h<sealevel+0.5)h=sealevel-0.18;}
ver_roadlights.push(fi1*49+fi,h,fj1*49+fj);}
else if(om[fi1][fj1][fi][fj]===ASCEND_TREE)
{if(fi-1>0&&fj-1>0)
{ver_trees.push(fi1*49+fi,hm[fi1][fj1][fi][fj],fj1*49+fj);}}
else if(om[fi1][fj1][fi][fj]===ASCEND_BUSH)
{if(fi-1>0&&fj-1>0)
{ver_bushes.push(fi1*49+fi,hm[fi1][fj1][fi][fj],fj1*49+fj);if(!(fi1===38&&fj1===39)&&Math.floor(fi+fj)%3===0)
{let seed_length=Math.floor(pseudorandom(fi)*10);if(seed_length>5)seed_length=10;else seed_length=1;if(fi+seed_length<chunkwidth-1&&fj+seed_length<chunkwidth-1)
{if(Math.floor(fi+fj)%6===0)
{if(om[fi1][fj1][fi+seed_length][fj+seed_length]!==ASCEND_ROAD&&hm[fi1][fj1][fi+seed_length][fj+seed_length]>sealevel+0.5)
{om[fi1][fj1][fi+seed_length][fj+seed_length]=ASCEND_GRASS;}}
else
{if(om[fi1][fj1][fi][fj+seed_length]!==ASCEND_ROAD&&hm[fi1][fj1][fi][fj+seed_length]>sealevel+0.5)
{om[fi1][fj1][fi+seed_length][fj]=ASCEND_GRASS;}}}}}}
else if(om[fi1][fj1][fi][fj]===ASCEND_GRASS)
{if(fi-1>0&&fj-1>0)
{ver_grass.push(fi1*49+fi,hm[fi1][fj1][fi][fj],fj1*49+fj);}}
else if(om[fi1][fj1][fi][fj]===ASCEND_HOUSE)
{if(fi1%5>5*pseudorandom(fi1))create_objects_3d_ver_houses(fi1,fj1,fi,fj,ver_houses,1.5,0.25);else create_objects_3d_ver_houses(fi1,fj1,fi,fj,ver_houses,1.5,0.95);}
else if(om[fi1][fj1][fi][fj]===ASCEND_SKYSCRAPER)
{if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34))create_objects_3d_ver_houses(fi1,fj1,fi,fj,ver_skyscrapers,5,0.3);else create_objects_3d_ver_houses(fi1,fj1,fi,fj,ver_skyscrapers,5,0);}
else if(om[fi1][fj1][fi][fj]===ASCEND_BARN)
{create_objects_3d_ver_houses(fi1,fj1,fi,fj,ver_barns,1,0.5);}}
function create_3d_meshes(fi1,fj1)
{let geometry_terrain=new THREE.BufferGeometry();geometry_terrain.setAttribute('position',new THREE.Float32BufferAttribute(ver_terrain,3));ver_terrain.length=0;geometry_terrain.setAttribute('normal',normals_attribute);geometry_terrain.setAttribute('uv',uv_attribute_terrain);mat_terrain=tex("phaser_volcano.jpg");mat_terrain.color=new THREE.Color(0x888888);let geometry_houses=new THREE.BufferGeometry();geometry_houses.setAttribute('position',new THREE.Float32BufferAttribute(ver_houses,3));ver_houses.length=0;geometry_houses.setAttribute('normal',normals_attribute);geometry_houses.setAttribute('uv',uv_attribute_houses);mat_houses=tex("");mat_houses.color=new THREE.Color(0xFFFFFF);let geometry_skyscrapers=new THREE.BufferGeometry();geometry_skyscrapers.setAttribute('position',new THREE.Float32BufferAttribute(ver_skyscrapers,3));ver_skyscrapers.length=0;geometry_skyscrapers.setAttribute('normal',normals_attribute);geometry_skyscrapers.setAttribute('uv',uv_attribute_houses);mat_skyscrapers=tex("");mat_skyscrapers.color=new THREE.Color(0xFFFFFF);let geometry_barns=new THREE.BufferGeometry();geometry_barns.setAttribute('position',new THREE.Float32BufferAttribute(ver_barns,3));ver_barns.length=0;geometry_barns.setAttribute('normal',normals_attribute);geometry_barns.setAttribute('uv',uv_attribute_houses);mat_barns=tex("");mat_barns.color=new THREE.Color(0xFFFFFF);let geometry_roads=new THREE.BufferGeometry();geometry_roads=new THREE.BufferGeometry();geometry_roads.setAttribute('position',new THREE.Float32BufferAttribute(ver_roads,3));ver_roads.length=0;geometry_roads.setAttribute('normal',normals_attribute);geometry_roads.setAttribute('uv',uv_attribute_roads);let geometry_roadlights=new THREE.BufferGeometry();geometry_roadlights.setAttribute('position',new THREE.Float32BufferAttribute(ver_roadlights,3));ver_roadlights.length=0;mat_roadlights=psp("lampposty(1).png",5,2);let geometry_trees=new THREE.BufferGeometry();geometry_trees.setAttribute('position',new THREE.Float32BufferAttribute(ver_trees,3));ver_trees.length=0;mat_trees=psp("");mat_trees.color=new THREE.Color(0xFFFFFF);let geometry_bushes=new THREE.BufferGeometry();geometry_bushes.setAttribute('position',new THREE.Float32BufferAttribute(ver_bushes,3));ver_bushes.length=0;mat_bushes=psp("");let geometry_grass=new THREE.BufferGeometry();geometry_grass.setAttribute('position',new THREE.Float32BufferAttribute(ver_grass,3));ver_grass.length=0;mat_grass=psp("");if((fi1>=36&&fi1<=39)&&(fj1>=33&&fj1<=35))
{mat_houses=tex("greenhouseda3.jpg");mat_skyscrapers=tex("house_glass.jpg");mat_barns=tex("greenhouseda3.jpg");mat_trees=psp("tree_sea.png");mat_bushes=psp("bluepine.png");mat_grass=psp("bluetree.png");mat_terrain=tex("phaser_volcano.jpg");if((fi1>=38&&fi1<=39)&&fj1===33)
{}
else if((fi1>=38&&fi1<=39)&&fj1===34)
{}
else if((fi1>=38&&fi1<=39)&&fj1===35)
{}
else if((fi1>=36&&fi1<=37)&&fj1===33)
{}
else if((fi1>=36&&fi1<=37)&&fj1===34)
{}
else if((fi1>=36&&fi1<=37)&&fj1===35)
{}
if(fi1===37&&fj1===33)mat_terrain=tex("phaser_epper2.jpg");else if(fi1===38&&fj1===34)mat_terrain=tex("phaser_sea_carpet.jpg");else if(fi1===37&&fj1===34)mat_terrain=tex("phaser_epper4.jpg");else if(fi1===37&&fj1===35)mat_terrain=tex("phaser_epper5.jpg");else if(fi1===39&&fj1===35)mat_terrain=tex("phaser_sea_snow.jpg");else mat_terrain=tex("phaser_sea2.jpg");}
else if((fi1>=33&&fi1<=35)&&(fj1>=33&&fj1<=35))
{mat_houses=tex("20230627_134332.jpg");mat_skyscrapers=tex("20230627_134332.jpg");mat_barns=tex("20230627_134332.jpg");mat_trees=psp("tree_ice.png");mat_bushes=psp("bush_ice.png");mat_grass=psp("grass_ice.png");mat_terrain=tex("phaser_volcano.jpg");if((fi1>=33&&fi1<=35)&&fj1===33)
{mat_houses=tex("20230627_134332.jpg");mat_barns=tex("20230627_134332.jpg");}
else if(fi1===33&&fj1===34)
{mat_houses=tex("20230627_134332.jpg");mat_barns=tex("20230627_134332.jpg");}
else if(fi1===34&&fj1===34)
{mat_houses=tex("20230627_134332.jpg");mat_barns=tex("20230627_134332.jpg");}
else if(fi1===35&&fj1===34)
{mat_houses=tex("house_ice.jpg");mat_barns=tex("house_ice.jpg");}
else if((fi1>=33&&fi1<=35)&&fj1===35)
{mat_houses=tex("20230627_134332.jpg");mat_barns=tex("20230627_134332.jpg");}
if(fj1===34)mat_terrain=tex("phaser_ice.jpg");else mat_terrain=tex("phaser_ice2.jpg");}
else if((fi1>=36&&fi1<=41)&&(fj1>=27&&fj1<=32))
{mat_houses=tex("roomwall d.jpg");mat_skyscrapers=tex("lagos_house234.jpg");mat_barns=tex("prisonwall.jpg");mat_trees=psp("krets_tree.png");mat_bushes=psp("tree_desert.png");mat_grass=psp("bush_magnet.png");mat_terrain=tex("phaser_volcano.jpg");if(fi1===38&&fj1===28)
{mat_skyscrapers=tex("roomwall.png");mat_skyscrapers.color=new THREE.Color(0x6600FF);mat_barns=tex("roomwall.png");mat_barns.color=new THREE.Color(0x00FF99);mat_houses=tex("roomwall.png");mat_houses.color=new THREE.Color(0xFF0000);}
else if(fi1>=39&&fi1<=41&&fj1>=28&&fj1<=30)
{mat_skyscrapers=tex("");mat_barns=tex("");mat_houses=tex("");mat_trees=psp("");mat_bushes=psp("");mat_grass=psp("");}
if((fi1>=36&&fi1<=41)&&(fj1>=31&&fj1<=32))
{}
else if((fi1>=36&&fi1<=41)&&(fj1>=29&&fj1<=30))
{}
else if((fi1>=36&&fi1<=39)&&(fj1>=26&&fj1<=28))
{}
else if((fi1>=40&&fi1<=41)&&(fj1>=26&&fj1<=28))
{}
if(fi1===37&&fj1===27)mat_skyscrapers=tex("lagos_house234_cat.jpg");else if(fi1===38&&fj1===27)mat_skyscrapers=tex("lagos_house234_daddy2.jpg");else if(fi1===39&&fj1===27)mat_skyscrapers=tex("roomwall.png");if((fi1>=39&&fi1<=41)&&(fj1>=28&&fj1<=30))mat_terrain=tex("");else if(fi1===38&&fj1===28){mat_trees=tex("mrsbussign.png",5);mat_terrain=tex("phaser_bluegreen.jpg");mat_terrain.color=new THREE.Color(0xFF2263);}
else if(fi1===39&&fj1===27)mat_terrain=tex("phaser_magnet_krets.jpg");else mat_terrain=tex("phaser_magnet_krets.jpg");}
else if((fi1>=33&&fi1<=35)&&(fj1>=28&&fj1<=32))
{mat_houses=tex("trainwall.jpg");mat_skyscrapers=tex("trainwall.jpg");mat_barns=tex("trainwall.jpg");mat_trees=psp("newtree_red.png");mat_bushes=psp("greentree.png");mat_grass=psp("handtree9.png");mat_terrain=tex("phaser_ice2.jpg");mat_terrain.color=new THREE.Color(0xFF0000);}
else if((fi1>=32&&fi1<=35)&&(fj1>=36&&fj1<=38))
{mat_houses=tex("swedishwall.png");mat_skyscrapers=tex("skyscraper1.jpg");mat_barns=tex("swedishwall.png");mat_trees=psp("tree_tjorn.png",4.2);mat_bushes=psp("bush_tjorn.png",2.2);mat_grass=psp("grass_desert.png",1.3);mat_terrain=tex("phaser_volcano.jpg");if((fi1>=34&&fi1<=35)&&(fj1>=36&&fj1<=37))
{}
else if((fi1>=34&&fi1<=35)&&fj1===38)
{}
else if((fi1>=32&&fi1<=33)&&(fj1>=36&&fj1<=37))
{}
else if((fi1>=32&&fi1<=33)&&fj1===38)
{}
if(fi1===34&&fj1===37)mat_terrain=tex("phaser_tjorn_park.jpg");else if(fi1===32&&fj1===38)mat_terrain=tex("phaser_tjorn_adele.jpg");else if(fi1%3===0||fj1%4===0)mat_terrain=tex("phaser_tjorn_green.jpg");else if(fi1%2===0||fj1%2===0)mat_terrain=tex("phaser_tjorn_red.jpg");else mat_terrain=tex("phaser_tjorn.jpg");if(fi1===34&&fj1===37)mat_houses=tex("clubhousez.jpg");else if(fi1%2===0||fj1%3>1)mat_houses=tex("swedishwall.png");else mat_houses=tex("house_municipality.png");if(fi1===34&&fj1===37)mat_skyscrapers=tex("house_club.jpg");if(fi1===34&&fj1===37)mat_barns=tex("house_club.jpg");else mat_barns=tex("house_municipality.png");}
else if((fi1>=29&&fi1<=30)&&(fj1>=35&&fj1<=40))
{mat_houses=tex("hong4.png");mat_skyscrapers=tex("skyscraper1.jpg");mat_barns=tex("hong4.png");mat_trees=psp("greenpine.png",3.3);mat_bushes=psp("handtree9.png",2.5);mat_grass=psp("grass_iceland.png");mat_terrain=tex("phaser_volcano.jpg");if((fi1>=29&&fi1<=30)&&fj1===35)
{}
else if(fi1===30&&(fj1>=36&&fj1<=37))
{}
else if(fi1===29&&(fj1>=36&&fj1<=37))
{}
else if(fi1===30&&(fj1>=38&&fj1<=39))
{}
else if(fi1===29&&(fj1>=38&&fj1<=39))
{}
else if((fi1>=29&&fi1<=30)&&fj1===40)
{}
if(fi1===30&&fj1===39)mat_terrain=tex("phaser_norway3.jpg",2,2,true);else if(fi1===29&&fj1===39)mat_terrain=tex("phaser_norway4.jpg",2,2,true);else mat_terrain=tex("phaser_norway2.jpg",2,2,true);}
else if((fi1>=31&&fi1<=35)&&(fj1>=39&&fj1<=41))
{mat_houses=tex("ind1.png");mat_skyscrapers=tex("house_mur(1).jpg");mat_barns=tex("20230627_115817.png");mat_trees=psp("hongtree.png");mat_bushes=psp("tree_desert.png");mat_grass=psp("grass_xp.png");mat_terrain=tex("phaser_volcano.jpg");if((fi1>=34&&fi1<=35)&&(fj1>=39&&fj1<=41))
{}
else if((fi1>=31&&fi1<=33)&&(fj1>=39&&fj1<=41))
{}
if(fi1===31)
{mat_trees=psp("greentree.png");mat_bushes=psp("grass_xp.png");mat_grass=psp("grass_xp.png");}
if(fi1===31){mat_terrain=tex("phaser_ice2.jpg");mat_terrain.color=new THREE.Color(0x33FF33);}
else if(fi1===33&&fj1===40){mat_terrain=tex("phaser_ice2.jpg");mat_terrain.color=new THREE.Color(0xFF9933);}
else if(fi1===34&&fj1===40){mat_terrain=tex("phaser_ice2.jpg");mat_terrain.color=new THREE.Color(0xFF9933);}
else{mat_terrain=tex("phaser_ice.jpg");mat_terrain.color=new THREE.Color(0xFF9933);}}
else if((fi1>=36&&fi1<=39)&&(fj1>=36&&fj1<=41))
{mat_houses=tex("skyscraper1.jpg");mat_skyscrapers=tex("skyscraper1.jpg");mat_skyscrapers.color=new THREE.Color(0xD98484);mat_barns=tex("skyscraper1.jpg");mat_trees=psp("purppine.png");mat_bushes=psp("darkpine2.png");mat_grass=psp("glove_stick.png");mat_terrain=tex("phaser_volcano.jpg");if((fi1>=38&&fi1<=39)&&(fj1>=37&&fj1<=38))
{}
else if((fi1>=38&&fi1<=39)&&(fj1>=38&&fj1<=39))
{}
else if((fi1>=38&&fi1<=39)&&(fj1>=40&&fj1<=41))
{}
else if((fi1>=36&&fi1<=37)&&(fj1>=37&&fj1<=38))
{}
else if((fi1>=36&&fi1<=37)&&(fj1>=38&&fj1<=39))
{}
else if((fi1>=36&&fi1<=37)&&(fj1>=40&&fj1<=41))
{}
if(fi1===38&&fj1===40)mat_terrain=tex("phaser_blackhole.jpg",1,-1);else if(fi1===39&&fj1===40)mat_terrain=tex("phaser_blackhole.jpg",1,1);else if(fi1===39&&fj1===41)mat_terrain=tex("phaser_blackhole.jpg",-1,1);else if(fi1===38&&fj1===41)mat_terrain=tex("phaser_blackhole.jpg",-1,-1);else if(fi1===37&&fj1===37)mat_terrain=tex("phaser_plake.jpg");else if(fi1===39&&fj1===37)mat_terrain=tex("phaser_pmoss.jpg");else if(fi1===37&&fj1===38)mat_terrain=tex("phaser_pred.jpg",1,-1);else if(fi1===38&&fj1===38)mat_terrain=tex("phaser_pred.jpg",1,1);else if(fi1===38&&fj1===39)mat_terrain=tex("phaser_pred.jpg",-1,1);else if(fi1===37&&fj1===39)mat_terrain=tex("phaser_pred.jpg",-1,-1);else if(fi1===38&&fj1===36)mat_terrain=tex("phaser_tjorn6.jpg");else{mat_terrain=tex("phaser_tjorn.jpg");mat_terrain.color=new THREE.Color(0x333333);}
if(fi1===38&&fj1===36)mat_houses=tex("house_gasstation_1(2).png");else mat_houses=tex("lagos_house4.jpg");if(fi1===37&&fj1===37)mat_trees=psp("purppine.png");else if(fi1===39&&fj1===37)mat_trees=psp("darkpine2.png");else if((fi1>=37&&fi1<=38)&&(fj1>=38||fj1<=39))mat_trees=psp("purppine2.png");else mat_trees=psp("darkpine2.png");if(fi1===37&&fj1===37)mat_bushes=psp("purphand.png");else if(fi1===39&&fj1===39)mat_bushes=psp("glove_stick.png",2);else if(fi1===39&&fj1===37)mat_bushes=psp("handtree5.png");else if((fi1>=37||fi1<=38)&&(fj1>=38||fj1<=39))mat_bushes=psp("grassfire.png");else mat_bushes=psp("handtree5.png");if(fi1===37&&fj1===37)mat_grass=psp("grass_purp.png");else if(fi1===39&&fj1===37)mat_grass=psp("dgbush(1).png");else if((fi1>=37&&fi1<=38)&&(fj1>=38&&fj1<=39))mat_grass=psp("grass_red.png");else mat_grass=psp("dgbush(1).png");}
else if((fi1>=29&&fi1<=32)&&(fj1>=28&&fj1<=34))
{mat_houses=tex("lyxs.jpg");if(fi1%2===0||fj1%2===0)mat_skyscrapers=tex("norwayshouse(1).jpg");else mat_skyscrapers=tex("ny_6.jpg");mat_barns=tex("cd2.jpg");mat_trees=psp("bluepine.png");mat_bushes=psp("pine_magnet.png");mat_grass=psp("grass_desert.png");mat_terrain=tex("phaser_volcano.jpg");if((fi1===32||fi1===31)&&(fj1===32||fj1===31))mat_trees=psp("bluepine.png");else if(fi1===30&&fj1===29)mat_trees=psp("pine_magnet.png",3);else if((fi1>=30&&fi1<=31)&&(fj1>=29&&fj1<=31))mat_trees=psp("bluepine.png");else if(fi1===31&&fj1===31)mat_trees=psp("newtree_snow.png");else if(fi1===30&&fj1===32)mat_trees=psp("tree_norway_alive.png");else mat_trees=psp("newtree.png");if((fi1===32||fi1===31)&&(fj1===32||fj1===31))mat_trees=psp("bluepine.png");else if(fi1===30&&(fj1>=29&&fj1<=31))mat_bushes=psp("windturbine.png",6);else if(fi1===30&&fj1===32)mat_bushes=psp("tree.png");else mat_bushes=psp("tree.png");if((fi1===32||fi1===31)&&(fj1===32||fj1===31))mat_grass=psp("bush_tjorn.png");else if(fi1===30&&fj1===32)mat_grass=psp("grass_desert.png");if((fi1===31||fi1===32)&&(fj1===31||fj1===32))mat_terrain=tex("phaser_dogert.jpg");else if(fi1===31&&fj1===29)mat_terrain=tex("phaser11_busparking(2).jpg");else if(fi1===29&&fj1===28)mat_terrain=tex("phaser10.jpg");else if(fi1===31&&fj1===28)mat_terrain=tex("phaser10.jpg");else if(fi1===32&&fj1===34)mat_terrain=tex("phaser9.jpg");else if(fi1===30&&fj1===31)mat_terrain=tex("phaser11.jpg");else if((fi1>=30&&fi1<=31)&&(fj1>=33&&fj1<=34))mat_terrain=tex("phaser_golf.jpg");else if(fi1%2===0||fj1%2===0)mat_terrain=tex("phaser7.jpg");else mat_terrain=tex("phaser11.jpg");if(fi1===30&fj1===33)mat_houses=tex("house_mur(1).jpg");if((fi1===31||fi1===32)&&(fj1===31||fj1===32))
{if(fi1%2!==0&&fj1%2===0)mat_terrain=tex("phaser_dogert.jpg",-1,-1);else if(fi1%2!==0&&fj1%2!==0)mat_terrain=tex("phaser_dogert.jpg",1,-1);else if(fi1%2===0&&fj1%2===0)mat_terrain=tex("phaser_dogert.jpg",-1,1);else mat_terrain=tex("phaser_dogert.jpg",1,1);}
else if((fi1>=31&&fi1<=32)&&(fj1>=28&&fj1<=29))
{}
else if((fi1>=29&&fi1<=30)&&(fj1>=28&&fj1<=29))
{mat_terrain=tex("phaser6_delta.jpg");if(fi1===30&&fj1===29)mat_terrain=tex("phaser7_magnet2(1).jpg");}
else if(fi1===32&&(fj1>=30&&fj1<=31))
{}
else if((fi1>=29&&fi1<=32)&&(fj1>=30&&fj1<=31))
{mat_trees=psp("yellowpine.png",3);mat_bushes=psp("bush_desert.png");mat_grass=psp("grass_desert.png");if(fi1%2===0&&fj1%2===0)mat_terrain=tex("phaser6_barren_road n.jpg",1,-1);else if(fi1%2===0&&fj1%2!==0)mat_terrain=tex("phaser6_barren_road n.jpg",-1,-1);else if(fi1%2!==0&&fj1%2===0)mat_terrain=tex("phaser6_barren_road n.jpg",1,1);else mat_terrain=tex("phaser6_barren_road n.jpg",-1,1);if(fi1===30&&fj1===31)mat_terrain=tex("phaser6_barren_road n.jpg",-1,1);}
else if(fi1===29&&(fj1>=30&&fj1<=31))
{}
else if(fi1===32&&(fj1>=32&&fj1<=34))
{}
else if((fi1>=30&&fi1<=31)&&(fj1>=33&&fj1<=34))
{mat_bushes=psp("grass_xp.png");mat_grass=psp("newtree_blue.png");}
else if(fi1===30&&fj1===32)mat_terrain=tex("phaser_grustag.jpg");else if(fi1===29&&(fj1>=32&&fj1<=34))
{mat_trees=psp("newtree_blue.png");mat_bushes=tex("");mat_grass=psp("grass_xp.png");mat_terrain=tex("phaser6_xp(4)(1).jpg");}}
else if(fi1===32&&fj1===35)
{mat_houses=tex("polish_house_2.jpg");mat_skyscrapers=tex("polish_house_2.jpg");mat_barns=tex("polish_house_2.jpg");mat_trees=psp("yellowpine.png");mat_bushes=psp("newtree_blue.png");mat_grass=psp("grass_xp.png");mat_terrain=tex("phaser_ice.jpg");mat_terrain.color=new THREE.Color(0x66AA00);}
else if(fi1===31&&fj1===35)
{mat_houses=tex("phaser_leaves.jpg");mat_skyscrapers=tex("skyscraper1.jpg");mat_barns=tex("phaser_leaves.jpg");mat_trees=psp("leavepile.png",0.8);mat_bushes=psp("autumntree.png",2.5);mat_grass=psp("tree.png",3.5);mat_terrain=tex("phaser_leaves.jpg");}
else if(fi1===31&&fj1===38)
{mat_houses=tex("polish_house_2.jpg");mat_skyscrapers=tex("skyscraper1.jpg");mat_barns=tex("polish_house_2.jpg");mat_trees=psp("leavepile.png",2);mat_bushes=psp("autumntree.png",2.5);mat_grass=psp("tree.png",3.5);mat_terrain=tex("phaser_scarymoss.jpg");}
else if(fi1===28&&fj1===33)
{mat_houses=tex("castle_house.jpg");mat_houses.color=new THREE.Color(0xA3A3C0);mat_skyscrapers=tex("castle_house2.jpg");mat_skyscrapers.color=new THREE.Color(0xA3A3C0);mat_barns=tex("castle_house.jpg");mat_barns.color=new THREE.Color(0xA3A3C0);mat_trees=psp("handtree9.png");mat_bushes=psp("tree_lava.png");mat_grass=psp("grass_xp.png");mat_terrain=tex("phaser_moss_red.jpg",1,1);}
else if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=41))
{mat_houses=tex("greenhouse.jpg");mat_skyscrapers=tex("skyscraper1.jpg");mat_skyscrapers.color=new THREE.Color(0x828879);mat_barns=tex("greenhouse99.jpg");mat_trees=psp("handtree9.png");mat_bushes=psp("tree_lava.png");mat_grass=psp("grass_xp.png");mat_terrain=tex("phaser_volcano.jpg");if(fi1%2===0&&fj1%2===0)mat_terrain=tex("phaser_moss_test.jpg",1,1);else if(fi1%2===0&&fj1%2!==0)mat_terrain=tex("phaser_moss_red.jpg",-1,1);else if(fi1%2!==0&&fj1%2===0)mat_terrain=tex("phaser_moss_test.jpg",1,-1);else mat_terrain=tex("phaser_moss_test.jpg",-1,-1);if((fi1>=26&&fi1<=27)&&(fj1>=33&&fj1<=34))
{if((fi1===27&&fj1===34))mat_terrain=tex("phaser_moss_landingstrip.jpg",1,-1);}
else if((fi1>=26&&fi1<=27)&&(fj1>=35&&fj1<=36))
{if((fi1===27&&fj1===35))mat_terrain=tex("phaser_moss_landingstrip.jpg",-1,-1);}
else if((fi1>=26&&fi1<=27)&&(fj1>=37&&fj1<=38))
{}
else if((fi1>=26&&fi1<=27)&&(fj1>=39&&fj1<=40))
{mat_houses=tex("churchs.jpg");mat_skyscrapers=tex("skyscraper_blue.jpg");mat_barns=tex("churchs.jpg");mat_trees=psp("tree_norway.png");mat_bushes=psp("handtree9.png");mat_grass=psp("grass_magnet.png");if(fi1%2===0&&fj1%2!==0)mat_terrain=tex("phaser_moss_blue.jpg",-1,1);}}
else if((fi1>=28&&fi1<=30)&&fj1===41)
{mat_houses=tex("greenhouse.jpg");mat_skyscrapers=tex("skyscraper1.jpg");mat_skyscrapers.color=new THREE.Color(0x23B179);mat_barns=tex("greenhouse99.jpg");mat_trees=psp("tree_norway.png");mat_bushes=psp("tree_lava.png");mat_grass=psp("grass_xp.png");mat_terrain=tex("phaser_volcano.jpg");if(fi1%2===0&&fj1%2===0)mat_terrain=tex("phaser_moss_iceland(1).jpg",1,1);else if(fi1%2===0&&fj1%2!==0)mat_terrain=tex("phaser_moss_iceland(1).jpg",-1,1);else if(fi1%2!==0&&fj1%2===0)mat_terrain=tex("phaser_moss_iceland(1).jpg",1,-1);else mat_terrain=tex("phaser_moss_iceland(1).jpg",-1,-1);}
else if((fi1>=26&&fi1<=27)&&(fj1>=26&&fj1<=31))
{mat_houses=tex("polish_house_2.jpg");mat_skyscrapers=tex("skyscraper_blue.jpg");mat_barns=tex("polish_house_2.jpg");mat_trees=psp("tree_norway.png");mat_bushes=psp("bush_sea.png");mat_grass=psp("grass_magnet.png");mat_terrain=tex("phaser_volcano.jpg",2,-2,true);}
mesh_terrain[fi1][fj1]=new THREE.Mesh(geometry_terrain,mat_terrain);scene.add(mesh_terrain[fi1][fj1]);mesh_terrain[fi1][fj1].visible=false;mesh_houses[fi1][fj1]=new THREE.Mesh(geometry_houses,mat_houses);scene.add(mesh_houses[fi1][fj1]);mesh_houses[fi1][fj1].visible=false;mesh_skyscrapers[fi1][fj1]=new THREE.Mesh(geometry_skyscrapers,mat_skyscrapers);scene.add(mesh_skyscrapers[fi1][fj1]);mesh_skyscrapers[fi1][fj1].visible=false;mesh_barns[fi1][fj1]=new THREE.Mesh(geometry_barns,mat_barns);scene.add(mesh_barns[fi1][fj1]);mesh_barns[fi1][fj1].visible=false;mesh_roads[fi1][fj1]=new THREE.Mesh(geometry_roads,mat_asphalt);mesh_roads[fi1][fj1].position.y=0.11;scene.add(mesh_roads[fi1][fj1]);mesh_roads[fi1][fj1].visible=false;pointsprites_roadlights[fi1][fj1]=new THREE.Points(geometry_roadlights,mat_roadlights);pointsprites_roadlights[fi1][fj1].position.y=mat_roadlights.size*0.25;scene.add(pointsprites_roadlights[fi1][fj1]);pointsprites_roadlights[fi1][fj1].visible=false;pointsprites_trees[fi1][fj1]=new THREE.Points(geometry_trees,mat_trees);pointsprites_trees[fi1][fj1].position.y=mat_trees.size*0.25;scene.add(pointsprites_trees[fi1][fj1]);pointsprites_trees[fi1][fj1].visible=false;pointsprites_bushes[fi1][fj1]=new THREE.Points(geometry_bushes,mat_bushes);pointsprites_bushes[fi1][fj1].position.y=mat_bushes.size*0.25;scene.add(pointsprites_bushes[fi1][fj1]);pointsprites_bushes[fi1][fj1].visible=false;pointsprites_grass[fi1][fj1]=new THREE.Points(geometry_grass,mat_grass);pointsprites_grass[fi1][fj1].position.y=mat_grass.size*0.25;scene.add(pointsprites_grass[fi1][fj1]);pointsprites_grass[fi1][fj1].visible=false;}
function show_and_hide_terrain_chunks()
{if(chunk_process_z>=44){chunk_process_x++;chunk_process_z=0;}
if(chunk_process_x>=44){chunk_process_x=0;chunk_process_z=0;}
if(chunk_process[chunk_process_x][chunk_process_z]===CHUNK_SHOW)
{if(!(mesh_terrain[chunk_process_x][chunk_process_z]===undefined))mesh_terrain[chunk_process_x][chunk_process_z].visible=true;if(!(mesh_houses[chunk_process_x][chunk_process_z]===undefined))mesh_houses[chunk_process_x][chunk_process_z].visible=true;if(!(mesh_skyscrapers[chunk_process_x][chunk_process_z]===undefined))mesh_skyscrapers[chunk_process_x][chunk_process_z].visible=true;if(!(mesh_barns[chunk_process_x][chunk_process_z]===undefined))mesh_barns[chunk_process_x][chunk_process_z].visible=true;if(!(mesh_roads[chunk_process_x][chunk_process_z]===undefined))mesh_roads[chunk_process_x][chunk_process_z].visible=true;if(!(pointsprites_roadlights[chunk_process_x][chunk_process_z]===undefined))pointsprites_roadlights[chunk_process_x][chunk_process_z].visible=true;if(!(pointsprites_trees[chunk_process_x][chunk_process_z]===undefined))pointsprites_trees[chunk_process_x][chunk_process_z].visible=true;if(!(pointsprites_bushes[chunk_process_x][chunk_process_z]===undefined))pointsprites_bushes[chunk_process_x][chunk_process_z].visible=true;if(!(pointsprites_grass[chunk_process_x][chunk_process_z]===undefined))pointsprites_grass[chunk_process_x][chunk_process_z].visible=true;chunk_process[chunk_process_x][chunk_process_z]=CHUNK_DONOTHING;chunk_process_z++;}
else if(chunk_process[chunk_process_x][chunk_process_z]===CHUNK_HIDE)
{if(!(mesh_terrain[chunk_process_x][chunk_process_z]===undefined))mesh_terrain[chunk_process_x][chunk_process_z].visible=false;if(!(mesh_houses[chunk_process_x][chunk_process_z]===undefined))mesh_houses[chunk_process_x][chunk_process_z].visible=false;if(!(mesh_skyscrapers[chunk_process_x][chunk_process_z]===undefined))mesh_skyscrapers[chunk_process_x][chunk_process_z].visible=false;if(!(mesh_barns[chunk_process_x][chunk_process_z]===undefined))mesh_barns[chunk_process_x][chunk_process_z].visible=false;if(!(mesh_roads[chunk_process_x][chunk_process_z]===undefined))mesh_roads[chunk_process_x][chunk_process_z].visible=false;if(!(pointsprites_roadlights[chunk_process_x][chunk_process_z]===undefined))pointsprites_roadlights[chunk_process_x][chunk_process_z].visible=false;if(!(pointsprites_trees[chunk_process_x][chunk_process_z]===undefined))pointsprites_trees[chunk_process_x][chunk_process_z].visible=false;if(!(pointsprites_bushes[chunk_process_x][chunk_process_z]===undefined))pointsprites_bushes[chunk_process_x][chunk_process_z].visible=false;if(!(pointsprites_grass[chunk_process_x][chunk_process_z]===undefined))pointsprites_grass[chunk_process_x][chunk_process_z].visible=false;chunk_process[chunk_process_x][chunk_process_z]=CHUNK_DONOTHING;chunk_process_z++;}
else chunk_process_z++;}
function hide_bushes_grass_etc_outside_current_chunk()
{for(let t=ci1-2;t<=ci1+2;t++)
{for(let u=cj1-2;u<=cj1+2;u++)
{if(!(mesh_houses[t][u]===undefined))mesh_houses[t][u].visible=false;if(!(mesh_skyscrapers[t][u]===undefined))mesh_skyscrapers[t][u].visible=false;if(!(mesh_barns[t][u]===undefined))mesh_barns[t][u].visible=false;if(!(mesh_roads[t][u]===undefined))mesh_roads[t][u].visible=false;if(!(pointsprites_roadlights[t][u]===undefined))pointsprites_roadlights[t][u].visible=false;if(!(pointsprites_trees[t][u]===undefined))pointsprites_trees[t][u].visible=false;if(!(pointsprites_bushes[t][u]===undefined))pointsprites_bushes[t][u].visible=false;if(!(pointsprites_grass[t][u]===undefined))pointsprites_grass[t][u].visible=false;}}
for(let t=ci1-1;t<=ci1+1;t++)
{for(let u=cj1-1;u<=cj1+1;u++)
{if(!(mesh_skyscrapers[t][u]===undefined))mesh_skyscrapers[t][u].visible=true;if(!(mesh_roads[t][u]===undefined))mesh_roads[t][u].visible=true;if(!(pointsprites_roadlights[t][u]===undefined))pointsprites_roadlights[t][u].visible=true;if(!(pointsprites_trees[t][u]===undefined))pointsprites_trees[t][u].visible=true;if(lowres<1)
{if(!(mesh_roads[t][u]===undefined))mesh_roads[t][u].visible=true;if(!(pointsprites_roadlights[t][u]===undefined))pointsprites_roadlights[t][u].visible=true;}}}
if(!(mesh_houses[ci1][cj1]===undefined))mesh_houses[ci1][cj1].visible=true;if(!(mesh_skyscrapers[ci1][cj1]===undefined))mesh_skyscrapers[ci1][cj1].visible=true;if(!(mesh_barns[ci1][cj1]===undefined))mesh_barns[ci1][cj1].visible=true;if(!(pointsprites_trees[ci1][cj1]===undefined))pointsprites_trees[ci1][cj1].visible=true;if(!(pointsprites_bushes[ci1][cj1]===undefined))pointsprites_bushes[ci1][cj1].visible=true;if(!(pointsprites_grass[ci1][cj1]===undefined))pointsprites_grass[ci1][cj1].visible=true;if(x_to_x_in_chunk(player.position.x)>=40)
{if(!(mesh_houses[ci1+1][cj1]===undefined))mesh_houses[ci1+1][cj1].visible=true;if(!(mesh_barns[ci1+1][cj1]===undefined))mesh_barns[ci1+1][cj1].visible=true;if(!(pointsprites_roadlights[ci1+1][cj1]===undefined))pointsprites_roadlights[ci1+1][cj1].visible=true;}
if(x_to_x_in_chunk(player.position.z)>=40)
{if(!(mesh_houses[ci1][cj1+1]===undefined))mesh_houses[ci1][cj1+1].visible=true;if(!(mesh_barns[ci1][cj1+1]===undefined))mesh_barns[ci1][cj1+1].visible=true;if(!(pointsprites_roadlights[ci1][cj1+1]===undefined))pointsprites_roadlights[ci1][cj1+1].visible=true;}
if(x_to_x_in_chunk(player.position.x)<=10)
{if(!(mesh_houses[ci1-1][cj1]===undefined))mesh_houses[ci1-1][cj1].visible=true;if(!(mesh_barns[ci1-1][cj1]===undefined))mesh_barns[ci1-1][cj1].visible=true;if(!(pointsprites_roadlights[ci1-1][cj1]===undefined))pointsprites_roadlights[ci1-1][cj1].visible=true;}
if(x_to_x_in_chunk(player.position.z)<=10)
{if(!(mesh_houses[ci1][cj1-1]===undefined))mesh_houses[ci1][cj1-1].visible=true;if(!(mesh_barns[ci1][cj1-1]===undefined))mesh_barns[ci1][cj1-1].visible=true;if(!(pointsprites_roadlights[ci1][cj1-1]===undefined))pointsprites_roadlights[ci1][cj1-1].visible=true;}}
function ascend_intro(master_seed)
{let geometry_water=new THREE.BoxGeometry(2*49*16,0.01,2*49*16);area_water=new THREE.Mesh(geometry_water,mat_water);scene.add(area_water);water_animate=0;cloudbox_animate=0;for(let t=-50;t<50;t+=2)
{for(let u=-20;u<20;u+=2)
{for(let v=-50;v<50;v+=2)
{let randt,randu,randv;if(u<0)
{let u2=u+20;randt=4*(pseudorandom(t+u2+v)-0.5);randu=4*(pseudorandom(t-u2+v)-0.5);randv=4*(pseudorandom(t+u2-v)-0.5);}
else
{randt=4*(pseudorandom(t+u+v)-0.5);randu=4*(pseudorandom(t-u+v)-0.5);randv=4*(pseudorandom(t+u-v)-0.5);}
ver_rain.push(t+randt,u+randu,v+randv);if(t>=-2&&t<4&&u>=-18&&u<48&&v>=-3&&v<3)
{let randt,randu,randv;if(u<0)
{let u2=u+20;randt=4*(pseudorandom(t+u2+v)-0.5);randu=4*(pseudorandom(t-u2+v)-0.5);randv=4*(pseudorandom(t+u2-v)-0.5);}
else
{randt=4*(pseudorandom(t+u+v)-0.5);randu=4*(pseudorandom(t-u+v)-0.5);randv=4*(pseudorandom(t+u-v)-0.5);}
ver_fume.push(t+randt,u+randu,v+randv);}}}}
geometry_rain=new THREE.BufferGeometry();geometry_rain.setAttribute('position',new THREE.Float32BufferAttribute(ver_rain,3));mat_rain=psp("rain.png",0.2);pointsprites_rain=new THREE.Points(geometry_rain,mat_rain);scene.add(pointsprites_rain);geometry_rain=new THREE.BufferGeometry();geometry_rain.setAttribute('position',new THREE.Float32BufferAttribute(ver_fume,3));mat_fume=psp("fume_magnets.png",4.5);pointsprites_fume=new THREE.Points(geometry_rain,mat_fume);scene.add(pointsprites_fume);ver_fume.length=0;geometry_rain=new THREE.BufferGeometry();geometry_rain.setAttribute('position',new THREE.Float32BufferAttribute(ver_rain,3));mat_snow=psp("snow.png",0.2);pointsprites_snow=new THREE.Points(geometry_rain,mat_snow);scene.add(pointsprites_snow);ver_rain.length=0;geometry_skybox=new THREE.CylinderGeometry(120,120,50*8,32);geometry_cloudbox=new THREE.CylinderGeometry(120,119.8,1,32);mesh_skybox=new THREE.Mesh(geometry_skybox,mat_skybox);mesh_cloudbox=new THREE.Mesh(geometry_cloudbox,mat_cloudbox);scene.add(mesh_skybox);scene.add(mesh_cloudbox);seed=master_seed;master=(((seed*10-Math.floor(seed*10))*30)/9+1)/2;master2=(seed*111-Math.floor(seed*111))*20;change4=seed*21-Math.floor(seed*21);change5=seed*17-Math.floor(seed*17);for(let i1=21;i1<46;i1++)
{large_arrays_is_created[i1]=new Array();hm[i1]=new Array();chunkmap[i1]=new Array();om[i1]=new Array();hm_is_loaded[i1]=new Array();objects_is_loaded[i1]=new Array();mesh_terrain[i1]=new Array();mesh_houses[i1]=new Array();mesh_skyscrapers[i1]=new Array();mesh_barns[i1]=new Array();mesh_roads[i1]=new Array();pointsprites_roadlights[i1]=new Array();pointsprites_trees[i1]=new Array();pointsprites_bushes[i1]=new Array();pointsprites_grass[i1]=new Array();start_x[i1]=new Array();start_z[i1]=new Array();for(let j1=21;j1<46;j1++)
{large_arrays_is_created[i1][j1]=0;hm_is_loaded[i1][j1]=0;objects_is_loaded[i1][j1]=0;if(i1>=23&&i1<=44&&j1>=23&&j1<=44)
{if(pseudorandom(i1+j1)<0.7)chunkmap[i1][j1]=pseudorandom(i1*j1)*0.3;else chunkmap[i1][j1]=pseudorandom(i1*j1)*0.7;create_too_large_arrays(i1,j1);}}}
chunkmap[30][30]=pseudorandom(30*0)*0.2;chunkmap[30][31]=pseudorandom(30*0)*0.2;chunkmap[31][30]=pseudorandom(30*0)*0.2;chunkmap[31][31]=pseudorandom(30*0)*0.2;start_x[26][33]=1286;start_z[26][33]=1635;start_x[26][34]=1291;start_z[26][34]=1686;start_x[26][35]=1295;start_z[26][35]=1754;start_x[26][36]=1302;start_z[26][36]=1802;start_x[26][37]=1300;start_z[26][37]=1838;start_x[26][38]=1299;start_z[26][38]=1885;start_x[26][39]=1300;start_z[26][39]=1938;start_x[26][40]=1299;start_z[26][40]=1981;start_x[26][41]=1302;start_z[26][41]=2014;start_x[27][41]=1347;start_z[27][41]=2024;start_x[27][40]=1347;start_z[27][40]=1968;start_x[27][39]=1342;start_z[27][39]=1916;start_x[27][38]=1341;start_z[27][38]=1871;start_x[27][37]=1344;start_z[27][37]=1833;start_x[27][36]=1345;start_z[27][36]=1791;start_x[27][35]=1338;start_z[27][35]=1749;start_x[27][34]=1348;start_z[27][34]=1699;start_x[27][33]=1343;start_z[27][33]=1647;start_x[28][33]=1393;start_z[28][33]=1640;start_x[28][41]=1386;start_z[28][41]=2035;start_x[29][41]=1432;start_z[29][41]=2027;start_x[29][40]=1432;start_z[29][40]=1974;start_x[29][39]=1435;start_z[29][39]=1940;start_x[29][38]=1442;start_z[29][38]=1905;start_x[29][37]=1446;start_z[29][37]=1843;start_x[29][36]=1442;start_z[29][36]=1806;start_x[29][34]=1454;start_z[29][34]=1708;start_x[29][33]=1449;start_z[29][33]=1653;start_x[29][32]=1454;start_z[29][32]=1592;start_x[29][31]=1455;start_z[29][31]=1550;start_x[29][30]=1454;start_z[29][30]=1502;start_x[29][29]=1458;start_z[29][29]=1458;start_x[29][28]=1454;start_z[29][28]=1406;start_x[30][28]=1478;start_z[30][28]=1396;start_x[30][29]=1486;start_z[30][29]=1434;start_x[30][30]=1481;start_z[30][30]=1499;start_x[30][31]=1481;start_z[30][31]=1529;start_x[30][32]=1485;start_z[30][32]=1588;start_x[30][33]=1490;start_z[30][33]=1634;start_x[30][34]=1498;start_z[30][34]=1676;start_x[30][35]=1484;start_z[30][35]=1745;start_x[30][36]=1490;start_z[30][36]=1790;start_x[30][37]=1492;start_z[30][37]=1832;start_x[30][38]=1492;start_z[30][38]=1876;start_x[30][39]=1492;start_z[30][39]=1922;start_x[30][39]=1492;start_z[30][39]=1957;start_x[30][40]=1494;start_z[30][40]=1972;start_x[30][41]=1494;start_z[30][41]=2025;start_x[31][41]=1528;start_z[31][41]=2016;start_x[31][40]=1528;start_z[31][40]=1982;start_x[31][39]=1528;start_z[31][39]=1947;start_x[31][38]=1527;start_z[31][38]=1894;start_x[31][35]=1538;start_z[31][35]=1742;start_x[31][34]=1537;start_z[31][34]=1687;start_x[31][33]=1531;start_z[31][33]=1647;start_x[31][32]=1536;start_z[31][32]=1595;start_x[31][31]=1536;start_z[31][31]=1549;start_x[31][30]=1534;start_z[31][30]=1495;start_x[31][29]=1535;start_z[31][29]=1460;start_x[31][28]=1533;start_z[31][28]=1405;start_x[32][28]=1583;start_z[32][28]=1395;start_x[32][29]=1580;start_z[32][29]=1442;start_x[32][30]=1588;start_z[32][30]=1493;start_x[32][31]=1574;start_z[32][31]=1542;start_x[32][32]=1574;start_z[32][32]=1581;start_x[32][33]=1568;start_z[32][33]=1648;start_x[32][34]=1578;start_z[32][34]=1689;start_x[32][35]=1598;start_z[32][35]=1736;start_x[32][36]=1597;start_z[32][36]=1794;start_x[32][37]=1596;start_z[32][37]=1848;start_x[32][38]=1604;start_z[32][38]=1886;start_x[32][39]=1570;start_z[32][39]=1948;start_x[32][40]=1572;start_z[32][40]=1990;start_x[33][41]=1642;start_z[33][41]=2012;start_x[33][40]=1634;start_z[33][40]=1972;start_x[33][39]=1642;start_z[33][39]=1948;start_x[33][38]=1637;start_z[33][38]=1888;start_x[33][37]=1640;start_z[33][37]=1844;start_x[33][36]=1637;start_z[33][36]=1788;start_x[33][34]=1650;start_z[33][34]=1707;start_x[34][34]=1687;start_z[34][34]=1706;start_x[34][36]=1689;start_z[34][36]=1801;start_x[34][37]=1689;start_z[34][37]=1836;start_x[34][38]=1689;start_z[34][38]=1889;start_x[34][39]=1702;start_z[34][39]=1944;start_x[34][40]=1698;start_z[34][40]=1988;start_x[34][41]=1706;start_z[34][41]=2029;start_x[35][41]=1732;start_z[35][41]=2029;start_x[35][40]=1727;start_z[35][40]=1986;start_x[35][39]=1727;start_z[35][39]=1951;start_x[35][38]=1726;start_z[35][38]=1887;start_x[35][37]=1723;start_z[35][37]=1847;start_x[35][36]=1722;start_z[35][36]=1801;start_x[35][34]=1727;start_z[35][34]=1703;start_x[36][30]=1781;start_z[36][30]=1483;start_x[36][31]=1810;start_z[36][31]=1540;start_x[36][32]=1807;start_z[36][32]=1570;start_x[36][33]=1796;start_z[36][33]=1659;start_x[36][34]=1796;start_z[36][34]=1695;start_x[36][35]=1795;start_z[36][35]=1731;start_x[36][36]=1795;start_z[36][36]=1810;start_x[36][37]=1795;start_z[36][37]=1848;start_x[36][38]=1796;start_z[36][38]=1876;start_x[36][39]=1796;start_z[36][39]=1923;start_x[36][40]=1799;start_z[36][40]=1973;start_x[36][41]=1797;start_z[36][41]=2023;start_x[37][41]=1836;start_z[37][41]=2014;start_x[37][40]=1835;start_z[37][40]=1983;start_x[37][39]=1836;start_z[37][39]=1944;start_x[37][38]=1838;start_z[37][38]=1884;start_x[37][37]=1855;start_z[37][37]=1839;start_x[37][36]=1836;start_z[37][36]=1795;start_x[37][35]=1836;start_z[37][35]=1752;start_x[37][34]=1836;start_z[37][34]=1696;start_x[37][33]=1836;start_z[37][33]=1650;start_x[37][32]=1836;start_z[37][32]=1576;start_x[37][31]=1841;start_z[37][31]=1550;start_x[37][30]=1836;start_z[37][30]=1502;start_x[38][28]=1898;start_z[38][28]=1393;start_x[38][30]=1882;start_z[38][30]=1508;start_x[38][31]=1886;start_z[38][31]=1542;start_x[38][32]=1882;start_z[38][32]=1573;start_x[38][33]=1883;start_z[38][33]=1653;start_x[38][34]=1880;start_z[38][34]=1682;start_x[38][35]=1880;start_z[38][35]=1724;start_x[38][36]=1880;start_z[38][36]=1786;start_x[38][36]=1895;start_z[38][36]=1800;start_x[38][37]=1893;start_z[38][37]=1825;start_x[38][38]=1893;start_z[38][38]=1884;start_x[38][39]=1887;start_z[38][39]=1928;start_x[38][40]=1887;start_z[38][40]=1972;start_x[38][41]=1887;start_z[38][41]=2026;start_x[39][41]=1924;start_z[39][41]=2031;start_x[39][40]=1924;start_z[39][40]=1983;start_x[39][39]=1913;start_z[39][39]=1933;start_x[39][38]=1912;start_z[39][38]=1889;start_x[39][37]=1912;start_z[39][37]=1840;start_x[39][36]=1921;start_z[39][36]=1790;start_x[39][35]=1921;start_z[39][35]=1739;start_x[39][34]=1921;start_z[39][34]=1701;start_x[39][33]=1919;start_z[39][33]=1646;start_x[39][32]=1941;start_z[39][32]=1593;start_x[39][31]=1929;start_z[39][31]=1545;start_x[39][30]=1941;start_z[39][30]=1470;start_x[39][29]=1940;start_z[39][29]=1424;start_x[39][28]=1949;start_z[39][28]=1420;start_x[39][27]=1937;start_z[39][27]=1346;start_x[40][28]=1975;start_z[40][28]=1417;start_x[40][30]=2006;start_z[40][30]=1476;start_x[41][30]=2027;start_z[41][30]=1470;start_x[41][29]=2035;start_z[41][29]=1465;let x_array=new Array(),z_array=new Array();x_array=[1590,1590,1612,1620,1636,1653,1657,1658,1656,1651,1641,1641,1642,1631,1621,1603,1595,1598,1606,1607,1594,1582,1545,1534,1521,1510,1498,1480,1471,1460,1459,1450,1440,1442,1441,1441,1445,1450,1459,1478,1475,1481,1491,1501,1506,1515,1524,1535,1546,1555,1565,1586,1590];z_array=[1885,1885,1870,1878,1880,1882,1873,1842,1825,1816,1812,1812,1810,1809,1797,1783,1777,1764,1749,1733,1736,1737,1746,1733,1727,1729,1730,1747,1755,1768,1781,1787,1795,1810,1827,1837,1842,1855,1860,1867,1884,1892,1889,1888,1894,1892,1885,1880,1880,1881,1881,1886,1885];race_create(x_array.reverse(),z_array.reverse(),0);for(let i1=start_chunk_x-3;i1<=start_chunk_x+3;i1++)
{for(let j1=start_chunk_z-3;j1<=start_chunk_z+3;j1++)
{set_wideness_highness(i1,j1);for(let i=0;i<50;i+=2)
{for(let j=0;j<50;j+=2)
{set_weights(i1,j1,i,j);calculate_height(i1,j1,i,j);generate_objects_array(i1,j1,i,j);if(i>=2&&j>=2)
{hm[i1][j1][i-1][j-1]=0.5*(hm[i1][j1][i-2][j-2]+hm[i1][j1][i][j]);hm[i1][j1][i-1][j]=0.5*(hm[i1][j1][i-2][j]+hm[i1][j1][i][j]);hm[i1][j1][i][j-1]=0.5*(hm[i1][j1][i][j-2]+hm[i1][j1][i][j]);hm[i1][j1][i-2][j-1]=0.5*(hm[i1][j1][i-2][j-2]+hm[i1][j1][i-2][j]);hm[i1][j1][i-1][j-2]=0.5*(hm[i1][j1][i-2][j-2]+hm[i1][j1][i][j-2]);generate_objects_array(i1,j1,i-1,j-1);generate_objects_array(i1,j1,i-1,j);generate_objects_array(i1,j1,i,j-1);generate_objects_array(i1,j1,i-2,j-1);generate_objects_array(i1,j1,i-1,j-2);}}}
for(let j=0;j<50;j++)
{set_weights(i1,j1,0,j);calculate_height(i1,j1,0,j);set_weights(i1+1,j1,0,j);calculate_height(i1,j1,49,j);}
for(let i=0;i<50;i++)
{set_weights(i1,j1,i,0);calculate_height(i1,j1,i,0);set_weights(i1,j1+1,i,0);calculate_height(i1,j1,i,49);}
calculate_height_after(i1,j1);generate_objects_array_after(i1,j1);hm_is_loaded[i1][j1]=1;}}
race_create(x_array,z_array,28);x_array=[1641,1636,1648,1652,1660];z_array=[1777,1747,1735,1706,1660];race_create(x_array,z_array,1);x_array=[1754,1775,1775];z_array=[1675,1683,1683];race_create(x_array,z_array,2);x_array=[1786,1786,1784,1781,1779,1785,1798,1810,1817,1826,1837,1842,1849,1856,1865,1873,1879,1885,1894,1901,1908,1913,1918,1920,1924,1924,1922,1921,1916,1908,1902,1892,1882,1872,1864,1856,1841,1832,1825,1821,1816,1813,1807,1799,1792,1789,1789,1791,1792,1794,1786,1786];z_array=[1681,1673,1669,1663,1653,1642,1632,1626,1626,1625,1618,1614,1611,1611,1615,1623,1628,1630,1631,1633,1637,1646,1657,1665,1674,1681,1690,1695,1698,1704,1714,1722,1726,1728,1729,1727,1721,1717,1715,1716,1721,1726,1729,1727,1724,1720,1715,1707,1700,1688,1681,1681];race_create(x_array.reverse(),z_array.reverse(),3);x_array=[1815,1801,1795,1788,1783,1783,1780,1779,1781,1786,1786];z_array=[1623,1627,1634,1640,1643,1643,1647,1656,1666,1681,1681];race_create(x_array,z_array,29);x_array=[1919,1919,1919,1919,1933,1935,1932,1924,1920,1920];z_array=[1710,1719,1733,1738,1738,1725,1716,1710,1708,1708];race_create(x_array,z_array,4);x_array=[1919,1926,1951,1966,1963,1962,1961,1940,1931,1929,1923,1883,1830,1799,1788,1772,1768,1732,1696,1659,1629,1601,1601];z_array=[1749,1753,1752,1729,1703,1669,1633,1598,1555,1545,1535,1531,1531,1531,1521,1480,1480,1480,1480,1480,1480,1480,1480];race_create(x_array,z_array,5);x_array=[1522,1524,1524,1524];z_array=[1682,1698,1708,1708];race_create(x_array,z_array,6);x_array=[1464,1468,1468,1468,1471,1471,1466,1459,1453,1450,1448,1446,1444,1444,1444,1443,1444,1444,1444,1444,1444,1444,1444,1444,1442,1436,1436,1420,1417,1413,1406,1395,1383,1360,1357,1326,1320,1316,1313,1311,1311,1310,1304,1297,1294,1294,1296,1298,1301,1305,1305,1305,1304,1303,1301,1301,1300,1299,1304,1313,1321,1327,1333,1339,1340,1341,1347,1352,1355,1355,1355,1354,1353,1354,1357,1362,1368,1376,1382,1388,1395,1402,1412,1424,1439,1444,1451,1468,1475,1506,1527,1546,1563,1582,1621,1654,1684,1687,1692,1695,1697,1700,1704,1711,1722,1728,1734,1741];z_array=[1460,1475,1490,1506,1517,1524,1535,1547,1555,1560,1568,1573,1578,1585,1588,1593,1599,1602,1606,1609,1614,1620,1626,1628,1632,1637,1638,1648,1650,1656,1659,1660,1658,1654,1653,1661,1664,1668,1673,1680,1692,1710,1728,1749,1759,1769,1777,1787,1796,1805,1806,1815,1830,1841,1853,1862,1870,1887,1899,1908,1913,1917,1923,1930,1934,1941,1960,1975,1987,1997,2013,2022,2029,2034,2038,2042,2045,2048,2048,2048,2046,2045,2044,2043,2040,2037,2031,2021,2019,2018,2017,2016,2014,2013,2011,2010,1999,1996,1990,1978,1970,1962,1955,1948,1940,1936,1934,1932];race_create(x_array.reverse(),z_array.reverse(),7);x_array=[1921,1926,1926];z_array=[1916,1918,1918];race_create(x_array,z_array,13);x_array=[1822,1822,1826,1828,1834,1834];z_array=[1363,1365,1369,1370,1372,1372];race_create(x_array,z_array,10);x_array=[1894,1904,1904];z_array=[1391,1391,1391];race_create(x_array,z_array,11);x_array=[1758,1795,1815,1824,1830,1840,1843,1846,1859,1867,1874,1883,1896,1902,1907,1912,1914,1916,1919,1919,1918,1917,1909,1905,1900,1896,1889,1882,1873,1864,1861,1856,1849,1845,1840,1834,1827,1821,1811,1803,1782,1782,1775,1764,1756,1749,1742,1739,1739,1740,1738,1737,1734,1730,1726,1721,1716,1710,1704,1699,1692,1680,1676,1671,1670,1670,1671,1671,1672,1675,1681,1683,1687,1691,1697,1705,1713,1722,1737,1745,1751,1755,1757,1759,1759,1759,1760,1758,1758];z_array=[1970,1968,1961,1957,1953,1942,1938,1936,1932,1929,1928,1924,1918,1913,1906,1896,1890,1882,1868,1856,1848,1844,1835,1830,1828,1828,1830,1833,1837,1842,1843,1844,1843,1843,1844,1845,1846,1846,1846,1846,1848,1850,1849,1847,1845,1841,1834,1826,1820,1812,1803,1796,1791,1785,1781,1778,1775,1774,1774,1774,1776,1781,1784,1789,1791,1797,1803,1812,1820,1828,1840,1846,1854,1862,1871,1879,1886,1892,1902,1909,1916,1924,1931,1938,1944,1960,1969,1970,1970];race_create(x_array,z_array,12);x_array=[1577,1576,1574,1570,1565,1564,1565,1571,1577,1577];z_array=[1558,1563,1565,1566,1564,1561,1556,1553,1558,1558];race_create(x_array,z_array,16);x_array=[1558,1548,1537,1530,1525,1529,1538,1547,1552,1560,1567,1576,1580,1577,1563,1558,1553,1551,1551];z_array=[1552,1554,1554,1554,1551,1539,1537,1536,1538,1539,1538,1539,1533,1528,1529,1529,1530,1534,1534];race_create(x_array,z_array,17);x_array=[1509,1510,1500,1494,1488,1479,1479];z_array=[1526,1528,1529,1529,1529,1529,1529];race_create(x_array,z_array,21);x_array=[1303,1283,1280,1284,1294,1303,1309,1312,1303,1302,1304,1310,1314,1321,1337,1347,1355,1358,1357,1352,1345,1345,1346,1350,1349,1349,1347,1346,1343,1334,1325,1308,1305,1305];z_array=[1357,1371,1386,1393,1399,1402,1406,1416,1436,1443,1449,1457,1462,1470,1478,1476,1468,1458,1449,1442,1425,1414,1407,1392,1392,1379,1366,1355,1349,1344,1345,1355,1357,1357];race_create(x_array,z_array,14);x_array=[1570,1568,1564,1564];z_array=[1568,1575,1583,1583];race_create(x_array,z_array,31);x_array=[1301,1301,1294,1293,1296,1296,1299,1303,1310,1321,1334,1339,1342,1342,1342,1342,1341,1338,1333,1326,1324,1319,1313,1306,1301,1301];z_array=[1974,1974,1985,1991,1999,2001,2009,2013,2015,2013,2010,2008,2003,1998,1987,1979,1972,1967,1964,1963,1960,1959,1959,1961,1962,1962];race_create(x_array.reverse(),z_array.reverse(),26);x_array=[1301,1301,1301];z_array=[1962,1974,1974];race_create(x_array,z_array,32);x_array=[1965,1982,1995,2012,2022,2029,2035,2040,2043,2045,2046,2046,2044,2040,2034,2022,2007,1993,1975,1957,1946,1937,1931,1925,1921,1919,1918,1918,1919,1921,1924,1929,1938,1945,1952,1958,1966,1966];z_array=[1480,1479,1478,1474,1471,1468,1464,1460,1456,1451,1445,1440,1434,1429,1425,1420,1417,1415,1416,1418,1421,1425,1430,1434,1439,1442,1446,1450,1454,1457,1461,1464,1469,1472,1474,1476,1477,1477];race_create(x_array,z_array,27);x_array=[1553,1553,1553,1554,1554,1545,1541,1539,1529,1523,1523];z_array=[1653,1658,1666,1672,1676,1677,1680,1682,1682,1683,1683];race_create(x_array,z_array,33);x_array=[1481,1477,1474,1477,1482,1500,1508,1511,1516,1523,1529,1529];z_array=[1678,1667,1658,1654,1652,1647,1639,1626,1613,1609,1604,1604];race_create(x_array,z_array,34);x_array=[1483,1488,1500,1522,1540,1543,1542,1542];z_array=[1678,1690,1703,1706,1714,1723,1726,1726];race_create(x_array,z_array,35);x_array=[1914,1914,1915,1919,1919];z_array=[1788,1776,1766,1740,1740];race_create(x_array,z_array,36);x_array=[1876,1882,1893,1906,1915,1921,1928,1933,1938,1945,1948,1949,1949,1947,1942,1938,1929,1924,1920,1915,1906,1897,1890,1884,1878,1875,1876,1876];z_array=[1360,1362,1363,1362,1361,1359,1356,1355,1355,1355,1350,1345,1340,1335,1333,1333,1336,1339,1342,1343,1340,1336,1335,1337,1341,1345,1360,1360];race_create(x_array,z_array,37);x_array=[1904,1904,1904,1904];z_array=[1390,1383,1371,1371];race_create(x_array,z_array,38);x_array=[1860,1863,1863];z_array=[1347,1347,1347];race_create(x_array,z_array,39);for(let i1=start_chunk_x-2;i1<=start_chunk_x+2;i1++)
{for(let j1=start_chunk_z-2;j1<=start_chunk_z+2;j1++)
{for(let i=0;i<49;i++)
{for(let j=0;j<49;j++)
{if((i<=1||i>=48||j<=1||j>=48)&&om[i1][j1][i][j]===ASCEND_ROADLIGHT)om[i1][j1][i][j]=0;if(i>=2&&i<=47&&j>=2&&j<=47&&om[i1][j1][i][j]===ASCEND_ROADLIGHT)
{if(om[i1][j1][i-2][j-2]===ASCEND_ROADLIGHT)om[i1][j1][i-2][j-2]=0;if(om[i1][j1][i-2][j-1]===ASCEND_ROADLIGHT)om[i1][j1][i-2][j-1]=0;if(om[i1][j1][i-2][j]===ASCEND_ROADLIGHT)om[i1][j1][i-2][j]=0;if(om[i1][j1][i-2][j+1]===ASCEND_ROADLIGHT)om[i1][j1][i-2][j+1]=0;if(om[i1][j1][i-2][j+2]===ASCEND_ROADLIGHT)om[i1][j1][i-2][j+2]=0;if(om[i1][j1][i-1][j-2]===ASCEND_ROADLIGHT)om[i1][j1][i-1][j-2]=0;if(om[i1][j1][i-1][j-1]===ASCEND_ROADLIGHT)om[i1][j1][i-1][j-1]=0;if(om[i1][j1][i-1][j]===ASCEND_ROADLIGHT)om[i1][j1][i-1][j]=0;if(om[i1][j1][i-1][j+1]===ASCEND_ROADLIGHT)om[i1][j1][i-1][j+1]=0;if(om[i1][j1][i-1][j+2]===ASCEND_ROADLIGHT)om[i1][j1][i-1][j+2]=0;if(om[i1][j1][i][j-2]===ASCEND_ROADLIGHT)om[i1][j1][i][j-2]=0;if(om[i1][j1][i][j-1]===ASCEND_ROADLIGHT)om[i1][j1][i][j-1]=0;if(om[i1][j1][i][j+1]===ASCEND_ROADLIGHT)om[i1][j1][i][j+1]=0;if(om[i1][j1][i][j+2]===ASCEND_ROADLIGHT)om[i1][j1][i][j+2]=0;if(om[i1][j1][i+1][j-2]===ASCEND_ROADLIGHT)om[i1][j1][i+1][j-2]=0;if(om[i1][j1][i+1][j-1]===ASCEND_ROADLIGHT)om[i1][j1][i+1][j-1]=0;if(om[i1][j1][i+1][j]===ASCEND_ROADLIGHT)om[i1][j1][i+1][j]=0;if(om[i1][j1][i+1][j+1]===ASCEND_ROADLIGHT)om[i1][j1][i+1][j+1]=0;if(om[i1][j1][i+1][j+2]===ASCEND_ROADLIGHT)om[i1][j1][i+1][j+2]=0;if(om[i1][j1][i+2][j-2]===ASCEND_ROADLIGHT)om[i1][j1][i+2][j-2]=0;if(om[i1][j1][i+2][j-1]===ASCEND_ROADLIGHT)om[i1][j1][i+2][j-1]=0;if(om[i1][j1][i+2][j]===ASCEND_ROADLIGHT)om[i1][j1][i+2][j]=0;if(om[i1][j1][i+2][j+1]===ASCEND_ROADLIGHT)om[i1][j1][i+2][j+1]=0;if(om[i1][j1][i+2][j+2]===ASCEND_ROADLIGHT)om[i1][j1][i+2][j+2]=0;}
create_objects_3d_vertices(i1,j1,i,j);create_terrain_3d_vertices(i1,j1,i,j);}}
create_3d_meshes(i1,j1);objects_is_loaded[i1][j1]=1;if(i1===38&&j1===34)
{for(let t=0;t<45;t++)
{for(let u=0;u<45;u++)
{if(t>0&&t<30&&u>20&&u<48&&(2*profile[t&0xFF]-profile[u&0xFF]-3*profile[t*u&0xFF])>65)ver_aker.push(38*49+t+3+0.4,height_get_xz_exact(38*49+t+3+0.4,34*49+u+3+0.4)+0.2,34*49+u+3+0.4);else ver_aker.push(38*49+t+3+0.4,-100,34*49+u+3+0.4);}}
geometry_aker=new THREE.BufferGeometry();geometry_aker.setAttribute('position',new THREE.Float32BufferAttribute(ver_aker,3));geometry_aker.setAttribute('uv',new THREE.Float32BufferAttribute(ver_aker,3));mat_aker=psp("antique1_new2.png",2);pointsprites_aker=new THREE.Points(geometry_aker,mat_aker);scene.add(pointsprites_aker);ver_aker.length=0;}}}
ci1=start_chunk_x;cj1=start_chunk_z;renderer=new THREE.WebGLRenderer({antialias:true});document.body.appendChild(renderer.domElement);}
function ascend_main()
{if(cut%MODULUS_FREEROAM_OR_RACE===0)
{if(cut>=CUT_FREEROAM_5){mesh_skybox.material=mat_skybox;mesh_skybox.material.needsUpdate=true;mesh_skybox.color=new THREE.Color(0xFFFFFF);}
else{mesh_skybox.material=mat_skybox;mesh_skybox.material.needsUpdate=true;mesh_skybox.color=new THREE.Color(0xEDE7C9);}}
main_loop_counter=0;while(main_loop_counter<3000)
{if(main_loop_counter<40)show_and_hide_terrain_chunks();dynload_hm();dynload_objects();main_loop_counter++;}
if(cut%MODULUS_FREEROAM_OR_RACE===0)
{if(cut>=CUT_FREEROAM_MAGNETFACTORY_4)mesh_sun.position.set(player.position.x+79,55*(Math.sin(Math.PI*10000/FRAMES_PER_DAY))-12,player.position.z+79);else mesh_sun.position.set(player.position.x+79,55*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY))-12,player.position.z+79);}
mesh_sun.rotation.y=lookat_datass(mesh_sun,player);area_water.position.set(ci1*49+24.5-0.5,sealevel-0.4*0.5*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)),cj1*49+24.5-0.5);mesh_skybox.position.set(camera.position.x,area_water.position.y,camera.position.z);mesh_cloudbox.position.set(camera.position.x,area_water.position.y+20,camera.position.z);if(cut%MODULUS_FREEROAM_OR_RACE===0)
{if(cut>=CUT_FREEROAM_MAGNETFACTORY_4)mat_water.transparent=false;else mat_water.transparent=true;}
if(water_animate<1)water_animate+=0.0008;else water_animate=0;mat_water.map.offset.set(water_animate,water_animate);if(cloudbox_animate<1)cloudbox_animate+=0.0001;else cloudbox_animate=0;mat_cloudbox.map.offset.set(cloudbox_animate,cloudbox_animate);create_terrain_chunks_before_showing_them();hide_bushes_grass_etc_outside_current_chunk();}
function create_too_large_arrays(fi1,fj1)
{if(large_arrays_is_created[fi1][fj1]===0)
{hm[fi1][fj1]=new Array();om[fi1][fj1]=new Array();for(let fi=0;fi<50;fi++)
{hm[fi1][fj1][fi]=new Float32Array(50);om[fi1][fj1][fi]=new Float32Array(50);}
large_arrays_is_created[fi1][fj1]=1;}}
function dynload_hm()
{if(main_loop_counter<200&&nextpart_start===0)
{if(j_continue>=chunkwidth)
{continue_create3=0;i_continue+=2;j_continue=0;}
if(i_continue>=chunkwidth)
{continue_create2=0;if(dynload_height_skipping===0)
{for(let j=0;j<50;j++)
{set_weights(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],0,j);calculate_height(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],0,j);set_weights(to_load_chunk_x[dynload_hm_to_load_i]+1,to_load_chunk_z[dynload_hm_to_load_i],0,j);calculate_height(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],49,j);}
for(let i=0;i<50;i++)
{set_weights(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i,0);calculate_height(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i,0);set_weights(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i]+1,i,0);calculate_height(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i,49);}
calculate_height_after(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i]);generate_objects_array_after(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i]);hm_is_loaded[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]]=1;}
nextpart_start=1;dynload_hm_to_load_i++;i_continue=0;}
if(dynload_hm_to_load_i>=25)
{continue_create=0;dynload_hm_to_load_i=0;}
if(dynload_hm_to_load_i<25)
{if(hm_is_loaded[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]]===1)dynload_height_skipping=1;else dynload_height_skipping=0;if(dynload_height_skipping===1){i_continue=chunkwidth;}
else
{if(continue_create2===0)
{create_too_large_arrays(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i]);i_continue=0;set_wideness_highness(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue,j_continue);continue_create2=1;}
if(i_continue<chunkwidth)
{if(continue_create3===0)
{j_continue=0;continue_create3=1;}
if(j_continue<chunkwidth&&large_arrays_is_created[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]]===1)
{set_weights(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue,j_continue);calculate_height(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue,j_continue);generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue,j_continue);if(i_continue>=2&&j_continue>=2)
{hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-1][j_continue-1]=0.5*(hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-2]+hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue]);hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-1][j_continue]=0.5*(hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue]+hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue]);hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue-1]=0.5*(hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue-2]+hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue]);hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-1]=0.5*(hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-2]+hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue]);hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-1][j_continue-2]=0.5*(hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue-2][j_continue-2]+hm[to_load_chunk_x[dynload_hm_to_load_i]][to_load_chunk_z[dynload_hm_to_load_i]][i_continue][j_continue-2]);generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue-1,j_continue-1);generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue-1,j_continue);generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue,j_continue-1);generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue-2,j_continue-1);generate_objects_array(to_load_chunk_x[dynload_hm_to_load_i],to_load_chunk_z[dynload_hm_to_load_i],i_continue-1,j_continue-2);}
j_continue+=2;}}}}}}
function dynload_objects()
{if(main_loop_counter<200&&nextpart_start===1)
{if(j_continueb>=chunkwidth-1)
{continue_create3b=0;i_continueb++;j_continueb=0;}
if(i_continueb>=chunkwidth-1)
{continue_create2b=0;nextpart_start=0;if(dynload_objects_skipping===0)
{if(to_load_chunk_x[dynload_objects_to_load_i]>=39&&to_load_chunk_x[dynload_objects_to_load_i]<=41&&to_load_chunk_z[dynload_objects_to_load_i]>=28&&to_load_chunk_z[dynload_objects_to_load_i]<=30)
{let x_array=[1965,1982,1995,2012,2022,2029,2035,2040,2043,2045,2046,2046,2044,2040,2034,2022,2007,1993,1975,1957,1946,1937,1931,1925,1921,1919,1918,1918,1919,1921,1924,1929,1938,1945,1952,1958,1966,1966];let z_array=[1480,1479,1478,1474,1471,1468,1464,1460,1456,1451,1445,1440,1434,1429,1425,1420,1417,1415,1416,1418,1421,1425,1430,1434,1439,1442,1446,1450,1454,1457,1461,1464,1469,1472,1474,1476,1477,1477];race_create(x_array,z_array,27);}
create_3d_meshes(to_load_chunk_x[dynload_objects_to_load_i],to_load_chunk_z[dynload_objects_to_load_i]);objects_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]]=1;if(to_load_chunk_x[dynload_objects_to_load_i]===38&&to_load_chunk_z[dynload_objects_to_load_i]===34)
{for(let t=0;t<45;t++)
{for(let u=0;u<45;u++)
{if(t>0&&t<30&&u>20&&u<48&&(2*profile[t&0xFF]-profile[u&0xFF]-3*profile[t*u&0xFF])>65)ver_aker.push(38*49+t+3+0.4,height_get_xz_exact(38*49+t+3+0.4,34*49+u+3+0.4)+0.2,34*49+u+3+0.4);else ver_aker.push(38*49+t+3+0.4,-100,34*49+u+3+0.4);}}
geometry_aker=new THREE.BufferGeometry();geometry_aker.setAttribute('position',new THREE.Float32BufferAttribute(ver_aker,3));mat_aker=psp("antique1_new2.png",2);pointsprites_aker=new THREE.Points(geometry_aker,mat_aker);scene.add(pointsprites_aker);ver_aker.length=0;}}
dynload_objects_to_load_i++;i_continueb=0;}
if(dynload_objects_to_load_i>=25)
{continue_createb=0;dynload_objects_to_load_i=0;}
if(dynload_objects_to_load_i<25)
{if(objects_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]]===1)dynload_objects_skipping=1;else if(hm_is_loaded[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]]===0)dynload_objects_skipping=1;else dynload_objects_skipping=0;if(dynload_objects_skipping===1)i_continueb=chunkwidth;else
{if(continue_create2b===0)
{i_continueb=0;continue_create2b=1;}
if(i_continueb<chunkwidth-1)
{if(continue_create3b===0)
{j_continueb=0;continue_create3b=1;}
if(j_continueb<chunkwidth-1&&large_arrays_is_created[to_load_chunk_x[dynload_objects_to_load_i]][to_load_chunk_z[dynload_objects_to_load_i]])
{let ii1=to_load_chunk_x[dynload_objects_to_load_i];let jj1=to_load_chunk_z[dynload_objects_to_load_i];if((i_continueb<=1||i_continueb>=48||j_continueb<=1||j_continueb>=48)&&om[ii1][jj1][i_continueb][j_continueb]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb][j_continueb]=0;if(i_continueb>=2&&i_continueb<=47&&j_continueb>=2&&j_continueb<=47&&om[ii1][jj1][i_continueb][j_continueb]===ASCEND_ROADLIGHT)
{if(om[ii1][jj1][i_continueb-2][j_continueb-2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-2][j_continueb-2]=0;if(om[ii1][jj1][i_continueb-2][j_continueb-1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-2][j_continueb-1]=0;if(om[ii1][jj1][i_continueb-2][j_continueb]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-2][j_continueb]=0;if(om[ii1][jj1][i_continueb-2][j_continueb+1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-2][j_continueb+1]=0;if(om[ii1][jj1][i_continueb-2][j_continueb+2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-2][j_continueb+2]=0;if(om[ii1][jj1][i_continueb-1][j_continueb-2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-1][j_continueb-2]=0;if(om[ii1][jj1][i_continueb-1][j_continueb-1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-1][j_continueb-1]=0;if(om[ii1][jj1][i_continueb-1][j_continueb]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-1][j_continueb]=0;if(om[ii1][jj1][i_continueb-1][j_continueb+1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-1][j_continueb+1]=0;if(om[ii1][jj1][i_continueb-1][j_continueb+2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb-1][j_continueb+2]=0;if(om[ii1][jj1][i_continueb][j_continueb-2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb][j_continueb-2]=0;if(om[ii1][jj1][i_continueb][j_continueb-1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb][j_continueb-1]=0;if(om[ii1][jj1][i_continueb][j_continueb+1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb][j_continueb+1]=0;if(om[ii1][jj1][i_continueb][j_continueb+2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb][j_continueb+2]=0;if(om[ii1][jj1][i_continueb+1][j_continueb-2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+1][j_continueb-2]=0;if(om[ii1][jj1][i_continueb+1][j_continueb-1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+1][j_continueb-1]=0;if(om[ii1][jj1][i_continueb+1][j_continueb]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+1][j_continueb]=0;if(om[ii1][jj1][i_continueb+1][j_continueb+1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+1][j_continueb+1]=0;if(om[ii1][jj1][i_continueb+1][j_continueb+2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+1][j_continueb+2]=0;if(om[ii1][jj1][i_continueb+2][j_continueb-2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+2][j_continueb-2]=0;if(om[ii1][jj1][i_continueb+2][j_continueb-1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+2][j_continueb-1]=0;if(om[ii1][jj1][i_continueb+2][j_continueb]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+2][j_continueb]=0;if(om[ii1][jj1][i_continueb+2][j_continueb+1]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+2][j_continueb+1]=0;if(om[ii1][jj1][i_continueb+2][j_continueb+2]===ASCEND_ROADLIGHT)om[ii1][jj1][i_continueb+2][j_continueb+2]=0;}
create_objects_3d_vertices(to_load_chunk_x[dynload_objects_to_load_i],to_load_chunk_z[dynload_objects_to_load_i],i_continueb,j_continueb);create_terrain_3d_vertices(to_load_chunk_x[dynload_objects_to_load_i],to_load_chunk_z[dynload_objects_to_load_i],i_continueb,j_continueb);j_continueb++;}}}}}}
function create_terrain_chunks_before_showing_them()
{if(ci1!==last_chunk_x||cj1!==last_chunk_z)
{for(let t=ci1-3;t<=ci1+3;t++)
{for(let u=cj1-3;u<=cj1+3;u++)
{chunk_process[t][u]=CHUNK_HIDE;}}}
for(let t=ci1-2;t<=ci1+2;t++)
{for(let u=cj1-2;u<=cj1+2;u++)
{chunk_process[t][u]=CHUNK_SHOW;}}
if(ci1!==last_chunk_x||cj1!==last_chunk_z)
{to_load_chunk_x[0]=ci1;to_load_chunk_z[0]=cj1;let n=1;for(let t=ci1-2;t<=ci1+2;t++)
{for(let u=cj1-2;u<=cj1+2;u++)
{if(!(t===ci1&&u===cj1))
{to_load_chunk_x[n]=t;to_load_chunk_z[n]=u;}
n++;}}}
last_chunk_x=ci1;last_chunk_z=cj1;}