// functions.js
// game functions
// kbrecordzz 2023
"use strict";
// LOCKED 231007
const NUMBER_OF_CARS			= 10;
const CAR_ADELE				= 0;
const CAR_DARK_GANDALF			= 1;
const CAR_DADDY				= 2;
const CAR_DOGERT			= 3;
const CAR_OMALLEY			= 4;
const CAR_HARASS			= 5;
const CAR_DISONESTY			= 6;
const CAR_MRS_SUPERCONDUCTOR		= 7;
const CAR_POLISH_COW			= 8;
const CAR_EPPER				= 9;
const MODULUS_FREEROAM_OR_RACE		= 50;
const MODULUS_FREEROAM_ONLY		= 100;
const RACE_BEFORE			= 0;
const RACE_COUNTDOWN			= 1;
const RACE_DURING			= 2;
const RACE_AFTER			= 3;
const SOMEONE_HAS_WON			= 666;
const PLAYER				= 99;
const FRAMES_PER_HOUR			= 834;
const FRAMES_PER_DAY			= 20000;
//
const MAX_SPEED_ROAD			= 0.20;
const MAX_SPEED_REVERSE_ROAD		= -0.11;
const MAX_SPEED_OFFROAD			= 0.14;
const MAX_SPEED_REVERSE_OFFROAD		= -0.08;
const ACCELERATION_ROAD			= 0.010;
const ACCELERATION_OFFROAD		= 0.006;
const TURN_SPEED			= 0.024;
const CHARACTERS_SLOWER			= 0.95;
const TURBO_TIMER			= 80;
const WASHINGMACHINE_TIMER		= 3600;		// one minute
const JUMP_TIMER			= 20;
const FRICTION_FORWARD_ROAD		= 0.00085;
const FRICTION_BACKWARD_ROAD		= 0.0015;
const FRICTION_FORWARD_OFFROAD		= 0.00111;
const FRICTION_BACKWARD_OFFROAD		= 0.0011;
const carclub_position_x		= x_in_chunk_to_x(34, 31);
const carclub_position_z		= x_in_chunk_to_x(37, 23);
const dghouse_position_x		= x_in_chunk_to_x(38, 39);
const dghouse_position_z		= x_in_chunk_to_x(39, 17);
const harasshouse_position_x		= x_in_chunk_to_x(37, 40);
const harasshouse_position_z		= x_in_chunk_to_x(40, 8);
const auction_position_x		= 1903;
const auction_position_z		= 1891;
// LOCKED, inga cut-varden far tas bort eller andras. bara laggas till
const CUT_SPLASHSCREEN			= -2;
var splashscreen_started		= false;
const CUT_SPLASHSCREEN_WAIT		= -1;
const CUT_PAUSEMENU			= -3;
const CUT_CUTSCENE_BLACKINTRO		= 10;
var cutscene_blackintro_started		= false;
const CUT_FREEROAM_INTRO		= 999000;
var freeroam_intro_started		= false;
const freeroam_intro_name		= "The old intro";
const freeroam_intro_position_x		= 1471;
const freeroam_intro_position_z		= 1882;
const CUT_CUTSCENE_WAKEUP		= 999001;
var cutscene_wakeup_started		= false;
const CUT_RACE_1			= 999050;
var race_1_started			= false;
var race_1_started_during		= false;
const CUT_CUTSCENE_RACE_1_AFTER		= 999101;
var cutscene_race_1_after_started	= false;
const CUT_FREEROAM_M1			= 999200;
var freeroam_m1_started			= false;
const freeroam_m1_name			= "Terrible news about the car club!";
const CUT_CUTSCENE_DOGERT_SPRAY		= 999201;
var cutscene_dogert_spray_started	= false;
const CUT_CUTSCENE_MEETING_1		= 1000001;
var cutscene_meeting_1_started		= false;
const CUT_FREEROAM_0			= 1000100;
var freeroam_0_started			= false;
const freeroam_0_name			= "Sad Biceps Curls with Adele";
const CUT_FREEROAM_GYM			= 1002000;
var freeroam_gym_started		= false;
const freeroam_gym_name			= "Sad Biceps Curls with Adele";
const freeroam_gym_position_x		= 1607;
const freeroam_gym_position_z		= 1893;
const CUT_CUTSCENE_GYM			= 1002001;
var cutscene_gym_started		= false;
const CUT_FREEROAM_1			= 1002500;
var freeroam_1_started			= false;
const freeroam_1_name			= "Daddy is craving muffins";
const CUT_FREEROAM_1B			= 1002600;
var freeroam_1b_started			= false;
const freeroam_1b_name			= "Daddy is craving muffins";
const CUT_FREEROAM_1C			= 1002700;
var freeroam_1c_started			= false;
const freeroam_1c_name			= "Daddy is craving muffins";
const CUT_FREEROAM_1D			= 1002800;
var freeroam_1d_started			= false;
const freeroam_1d_name			= "Daddy is craving muffins";
 
const CUT_FREEROAM_1E			= 1002900;
var freeroam_1e_started			= false;
const freeroam_1e_name			= "Daddy is craving muffins";
const CUT_FREEROAM_1F			= 1003000;
var freeroam_1f_started			= false;
const freeroam_1f_name			= "Daddy is craving muffins";
const CUT_FREEROAM_EPPER		= 1005000;
var freeroam_epper_started		= false;
const freeroam_epper_name		= "waddup waddup im 'epper";
const CUT_CUTSCENE_EPPER		= 1007401;
var cutscene_epper_started		= false;
const CUT_FREEROAM_OMALLEY		= 1008000;
var freeroam_omalley_started		= false;
const freeroam_omalley_name		= "O'Malley is insecure";
const CUT_CUTSCENE_OMALLEY		= 1008001;
var cutscene_omalley_started		= false;
const CUT_FREEROAM_OMALLEY_2		= 1008100;
var freeroam_omalley_2_started		= false;
const freeroam_omalley_2_name		= "O'Malley is insecure";
const CUT_CUTSCENE_RACE_EPPER_BEFORE	= 1008101;
var cutscene_race_epper_before_started	= false;
const CUT_RACE_EPPER			= 1008150;
var race_epper_started			= false;
var race_epper_started_during		= false;
const CUT_CUTSCENE_RACE_EPPER_AFTER1	= 1008201;
var cutscene_race_epper_after1_started	= false;
const CUT_CUTSCENE_RACE_EPPER_AFTER2	= 1008225;
var cutscene_race_epper_after2_started	= false;
const CUT_FREEROAM_CARCHASE		= 1008300;
var freeroam_carchase_started		= false;
const freeroam_carchase_name		= "'Epper teaches you how to be a man";
const CUT_FREEROAM_CARCHASE2		= 1008400;
var freeroam_carchase2_started		= false;
const freeroam_carchase2_name		= "'Epper teaches you how to be a man";
const CUT_FREEROAM_CARCHASE3		= 1008500;
var freeroam_carchase3_started		= false;
const freeroam_carchase3_name		= "'Epper teaches you how to be a man";
const CUT_FREEROAM_CARCHASE4		= 1008600;
var freeroam_carchase4_started		= false;
const freeroam_carchase4_name		= "'Epper teaches you how to be a man";
const CUT_FREEROAM_MAGNETDAY		= 1009000;
var freeroam_magnetday_started		= false;
const freeroam_magnetday_name		= "The science festival that has no theme";
const freeroam_magnetday_position_x	= 1488;
const freeroam_magnetday_position_z	= 1432;
var freeroam_magnetday_hasseen_mrs	= false;
const CUT_CUTSCENE_MAGNETDAY_1		= 1009001;
var cutscene_magnetday_1_started	= false;
const CUT_CUTSCENE_MAGNETDAY_2		= 1009051;
var cutscene_magnetday_2_started	= false;
const CUT_CUTSCENE_MAGNETDAY_3		= 1009101;
var cutscene_magnetday_3_started	= false;
const CUT_CUTSCENE_MAGNETDAY_4		= 1009151;
var cutscene_magnetday_4_started	= false;
const CUT_CUTSCENE_MAGNETDAY_5		= 1009201;
var cutscene_magnetday_5_started	= false;
const CUT_CUTSCENE_MAGNETDAY_6		= 1009251;
var cutscene_magnetday_6_started	= false;
const CUT_CUTSCENE_MAGNETDAY_MRS	= 1009501;
var cutscene_magnetday_mrs_started	= false;
const CUT_CUTSCENE_MEETING_2		= 1009601;
var cutscene_meeting_2_started		= false;
const CUT_RACE_DGTRAVEL			= 1011050;
var race_dgtravel_started_during	= false;
const CUT_FREEROAM_DGCHILL		= 1011400;
var freeroam_dgchill_started		= false;
const freeroam_dgchill_name		= "Where is Dark Gandalf hiding? Maybe in his own house?";
const CUT_CUTSCENE_DGCHILL_BEFORE	= 1011401;
var cutscene_dgchill_before_started	= false;
const CUT_FREEROAM_DGCHILL_BGLIDE	= 1011200;
var freeroam_dgchill_bglide_started	= false;
const freeroam_dgchill_bglide_name	= "Knock Knock, you darn communist";
const CUT_FREEROAM_DGCHILL_GLIDE	= 1011300;
var freeroam_dgchill_glide_started	= false;
const freeroam_dgchill_glide_name	= "Polish Cow glides out";
const CUT_CUTSCENE_DGCHILL_OPEN		= 1011501;
var cutscene_dgchill_open_started	= false;
const CUT_FREEROAM_DGHOTSPRING		= 1011600;
var freeroam_dghotspring_started	= false;
const freeroam_dghotspring_name		= "Chillin' at Dark Gandalf's";
const freeroam_dghotspring_position_x	= x_in_chunk_to_x(39, 21);
const freeroam_dghotspring_position_z	= x_in_chunk_to_x(39, 8);
const CUT_CUTSCENE_DGHOTSPRING		= 1011601;
var cutscene_dghotspring_started	= false;
const CUT_FREEROAM_DGHOTSPRING_2	= 1011800;
var freeroam_dghotspring_2_started	= false;
const freeroam_dghotspring_2_name	= "Chillin' at Dark Gandalf's";
const CUT_CUTSCENE_DGSLEEP		= 1011801;
var cutscene_dgsleep_started		= false;
const CUT_RACE_HAFTLAN			= 1011950;
var race_haftlan_started_during		= false;
const CUT_FREEROAM_RACE_HAFTLAN_AFTER	= 1012000;
var freeroam_race_haftlan_after_started	= false;
const freeroam_race_haftlan_after_name	= "Lightening up after the Haftlan-Drakh race";
const CUT_CUTSCENE_WORKERSBUILDING	= 1011951;
var cutscene_workersbuilding_started	= false;
const CUT_FREEROAM_EPISODE1END		= 9999999900;
var freeroam_episode1end_started	= false;
const freeroam_episode1end_name		= "END OF EPISODE 1. Who knows what happens next?";
const CUT_CUTSCENE_DOGERTDREAM		= 1012001;
var cutscene_dogertdream_started	= false;
const CUT_FREEROAM_3_5			= 1012100;
var freeroam_3_5_started		= false;
const freeroam_3_5_name			= "Do something";
const CUT_FREEROAM_WASHING		= 1001200;
var freeroam_washing_started		= false;
const freeroam_washing_name		= "END OF EPISODE 1";
const CUT_CUTSCENE_WASHING		= 1001201;
var cutscene_washing_started		= false;
const CUT_FREEROAM_WASHING_2		= 1012300;
var freeroam_washing_2_started		= false;
const freeroam_washing_2_name		= "Hårass teaches you how to be a man";
const CUT_CUTSCENE_MEETING_3		= 1012401;
var cutscene_meeting_3_started		= false;
const CUT_FREEROAM_4			= 1012500;
var freeroam_4_started			= false;
const freeroam_4_name			= "Do something";
const CUT_CUTSCENE_LICENSE		= 1012501;
var cutscene_license_started		= false;
const CUT_FREEROAM_LICENSE		= 1012600;
var freeroam_license_started		= false;
const freeroam_license_name		= "It's illegal to drive without a driver's license";
const CUT_CUTSCENE_LICENSE_2		= 1012601;
var cutscene_license_2_started		= false;
const CUT_FREEROAM_LICENSE_2		= 1012700;
var freeroam_license_2_started		= false;
const freeroam_license_2_name		= "It's illegal to drive without a driver's license";
const freeroam_license_2_position_x	= 1471;
const freeroam_license_2_position_z	= 1815;
const CUT_CUTSCENE_LICENSE_3		= 1012701;
var cutscene_license_3_started		= false;
const CUT_FREEROAM_LICENSE_3		= 1012800;
var freeroam_license_3_started		= false;
const freeroam_license_3_name		= "It's illegal to drive without a driver's license";
const CUT_CUTSCENE_LICENSE_4		= 1012801;
var cutscene_license_4_started		= false;
const CUT_FREEROAM_LICENSE_4		= 1012900;
var freeroam_license_4_started		= false;
const freeroam_license_3_position_x	= 1454;
const freeroam_license_3_position_z	= 1883;
const freeroam_license_4_name		= "It's illegal to drive without a driver's license";
const CUT_CUTSCENE_LICENSE_5		= 1012901;
var cutscene_license_5_started		= false;
const CUT_FREEROAM_LICENSE_5		= 1013000;
var freeroam_license_5_started		= false;
var freeroam_license_5_mottimer		= 500;
const freeroam_license_5_name		= "It's illegal to drive without a driver's license";
const CUT_CUTSCENE_LICENSE_END		= 1013001;
var cutscene_license_end_started	= false;
const CUT_RACE_DOGERTWATER		= 1013050;
var race_dogertwater_started_during	= false;
const CUT_RACE_DOGERTWATER_AFTER	= 1013051;
var race_dogertwater_after_started	= false;
const CUT_FREEROAM_FLOATIES		= 1013500;
var freeroam_floaties_started		= false;
const freeroam_floaties_name		= "Conquer the sea!";
const CUT_FREEROAM_MAGNETDROWN		= 1014000;
var freeroam_magnetdrown_started	= false;
const freeroam_magnetdrown_name		= "Something feels wrong...";
const freeroam_magnetdrown_magnet_x	= [ 1427, 1420, 1378, 1375, 1337, 1317 ];
const freeroam_magnetdrown_magnet_z	= [ 1626, 1593, 1563, 1521, 1452, 1454 ];
var magnets_process			= 0;
const freeroam_magnetdrown_train_x	= 1317;
const freeroam_magnetdrown_train_z	= 1455;
const CUT_CUTSCENE_MAGNETDROWN_SEAL	= 1014051;
var cutscene_magnetdrown_seal_started	= false;
const CUT_CUTSCENE_MAGNETDROWN		= 1014101;
var cutscene_magnetdrown_started	= false;
const CUT_FREEROAM_GOINGHOME		= 1014500;
var freeroam_goinghome_started		= false;
const freeroam_goinghome_name		= "Something still feels wrong...";
const CUT_CUTSCENE_GOINGHOME_DOGERT	= 1014501;
var cutscene_goinghome_dogert_started	= false;
const CUT_FREEROAM_CARCLUBFIRE		= 1014600;
var freeroam_carclubfire_started	= false;
const freeroam_carclubfire_name		= "Oh darn!! Something's on fire!!";
const CUT_CUTSCENE_CARCLUBFIRE		= 1014601;
var cutscene_carclubfire_started	= false;
const CUT_CUTSCENE_MEETING_4		= 1014701;
var cutscene_meeting_4_started		= false;
const CUT_FREEROAM_KILLEPPER		= 1016000;
var freeroam_killepper_started		= false;
const freeroam_killepper_name		= "Drop a bomb at 'Epper!";
var freeroam_killepper_bomb_timer	= 0;
var freeroam_killepper_bomb_dropped	= false;
var freeroam_killepper_dropped_timer	= 0;
const CUT_FREEROAM_5			= 1019200;
var freeroam_5_started			= false;
const freeroam_5_name			= "Do something";
const CUT_FREEROAM_SVINERI_1		= 1019300;
var freeroam_svineri_1_started		= false;
const freeroam_svineri_1_name		= "Abusing the power of 'Epper";
const CUT_CUTSCENE_SVINERI_1		= 1019301;
var cutscene_svineri_1_started		= false;
const CUT_FREEROAM_AUCTION		= 1019500;
var freeroam_auction_started		= false;
const freeroam_auction_name		= "Abusing the power of 'Epper";
const CUT_FREEROAM_SVINERI_2		= 1019700;
var freeroam_svineri_2_started		= false;
const freeroam_svineri_2_name		= "Abusing the power of 'Epper";
const CUT_FREEROAM_SVINERI_3		= 1019800;
var freeroam_svineri_3_started		= false;
const freeroam_svineri_3_name		= "Abusing the power of 'Epper";
const CUT_CUTSCENE_HARASSFAN		= 1019801;
var cutscene_harassfan_started		= false;
const CUT_FREEROAM_HARASSFAN		= 1019900;
var freeroam_harassfan_started		= false;
const freeroam_harassfan_name		= "Troubeling news about Hårass' past";
const freeroam_harassfan_position_x	= 1766;
const freeroam_harassfan_position_z	= 1889;
const CUT_CUTSCENE_GASSTATION		= 1019901;
var cutscene_gasstation_started		= false;
const CUT_FREEROAM_GASSTATION		= 1020000;
var freeroam_gasstation_started		= false;
const freeroam_gasstation_name		= "Did someone say Hårass The Gasstation Clerk?";
const CUT_CUTSCENE_MEETING_6		= 1029201;
var cutscene_meeting_6_started		= false;
const CUT_RACE_SPEED			= 1029250;
var race_speed_started_during		= false;
const CUT_FREEROAM_RACE_SPEED_AFTER	= 1029300;
var freeroam_race_speed_after_started	= false;
const freeroam_race_speed_after_name	= "Do something";
const CUT_CUTSCENE_MAGNETFACTORY	= 1029501;
var cutscene_magnetfactory_started	= false;
const CUT_FREEROAM_MAGNETFACTORY	= 1029900;
var freeroam_magnetfactory_started	= false;
const freeroam_magnetfactory_name	= "The Magnet Factory";
const CUT_CUTSCENE_MAGNETFACTORY_2	= 1030201;
var cutscene_magnetfactory_2_started	= false;
const CUT_FREEROAM_MAGNETFACTORY_2	= 1030500;
var freeroam_magnetfactory_2_started	= false;
const freeroam_magnetfactory_2_name	= "The Magnet Factory";
const CUT_CUTSCENE_MAGNETFACTORY_3	= 1030501;
var cutscene_magnetfactory_3_started	= false;
const CUT_FREEROAM_MAGNETFACTORY_3	= 1030600;
var freeroam_magnetfactory_3_started	= false;
const freeroam_magnetfactory_3_name	= "The Magnet Factory";
const CUT_CUTSCENE_MAGNETFACTORY_4	= 1030601;
var cutscene_magnetfactory_4_started	= false;
const CUT_FREEROAM_MAGNETFACTORY_4	= 1030700;
var freeroam_magnetfactory_4_started	= false;
const freeroam_magnetfactory_4_name	= "The Magnet Factory";
const CUT_CUTSCENE_SPACEBAR		= 1031001;
var cutscene_spacebar_started		= false;
const CUT_FREEROAM_SPACEBAR		= 1031100;
var freeroam_spacebar_started		= false;
const freeroam_spacebar_name		= "Do something";
const CUT_FREEROAM_QUIZ			= 1051100;
var freeroam_quiz_started		= false;
const freeroam_quiz_name		= "Do something";
const CUT_CUTSCENE_QUIZ1		= 1051101;
var cutscene_quiz1_started		= false;
const CUT_CUTSCENE_QUIZ2		= 1051201;
var cutscene_quiz2_started		= false;
const CUT_CUTSCENE_QUIZ3		= 1051301;
var cutscene_quiz3_started		= false;
const CUT_CUTSCENE_QUIZ4		= 1051401;
var cutscene_quiz4_started		= false;
const CUT_CUTSCENE_QUIZ5		= 1051501;
var cutscene_quiz5_started		= false;
const CUT_CUTSCENE_QUIZ6		= 1051601;
var cutscene_quiz6_started		= false;
const CUT_CUTSCENE_QUIZ7		= 1051701;
var cutscene_quiz7_started		= false;
const CUT_CUTSCENE_QUIZ8		= 1051801;
var cutscene_quiz8_started		= false;
const CUT_CUTSCENE_QUIZ9		= 1051901;
var cutscene_quiz9_started		= false;
const CUT_CUTSCENE_QUIZ10		= 1052001;
var cutscene_quiz10_started		= false;
const CUT_CUTSCENE_DORIME		= 1053001;
var cutscene_dorime_started		= false;
const CUT_CUTSCENE_DORIME_ADELE		= 1053101;
var cutscene_dorime_adele_started	= false;
const CUT_CUTSCENE_DORIME_DADDY		= 1053201;
var cutscene_dorime_daddy_started	= false;
const CUT_CUTSCENE_DORIME_DG		= 1053301;
var cutscene_dorime_dg_started		= false;
const CUT_CUTSCENE_DORIME_HARASS	= 1053401;
var cutscene_dorime_harass_started	= false;
const CUT_RACE_RINGS			= 1031350;
var race_rings_started_during		= false;
const CUT_CUTSCENE_MRSSUPERCONDUCTOR	= 1031101;
var cutscene_mrssuperconductor_started	= false;
const CUT_CUTSCENE_RACE_ENDING		= 1031201;
var cutscene_race_ending_started	= false;
const CUT_CUTSCENE_ENDING_MRS		= 2000001;
var cutscene_ending_mrs_started		= false;
const CUT_CUTSCENE_EPILOGUE_MRS		= 2000101;
var cutscene_epilogue_mrs_started	= false;
const CUT_CUTSCENE_ENDING_YOU		= 2000501;
var cutscene_ending_you_started		= false;
const CUT_CUTSCENE_EPILOGUE_YOU		= 2000601;
var cutscene_epilogue_you_started	= false;
const CUT_CUTSCENE_BLOOPERS		= 3000001;
var cutscene_bloopers_started		= false;
const CUT_CUTSCENE_PISSANDSHIT		= 9000001;
var cutscene_pissandshit_started	= false;
const CUT_CUTSCENE_MEETING_DISCUSSION	= 9000101;
var cutscene_meeting_discussion_started	= false;
const CUT_CUTSCENE_MEETING_DISCUSSION2	= 9000201;
var cutscene_meeting_discussion2_started= false;
const CUT_CUTSCENE_MEETING_DISCUSSION3	= 9000301;
var cutscene_meeting_discussion3_started= false;
const CUT_CUTSCENE_MEETING_DISCUSSION4	= 9000401;
var cutscene_meeting_discussion4_started= false;
var cutscene_talk_27_seen = false;
const CUT_CUTSCENE_TALK_137 = 5015901;
var cutscene_talk_137_started = false;
const CUT_CUTSCENE_TALK_140 = 5016201;
var cutscene_talk_140_started = false;
const CUT_CUTSCENE_TALK_142 = 5016401;
var cutscene_talk_142_started = false;
const CUT_CUTSCENE_TALK_150 = 5017201;
var cutscene_talk_150_started = false;
const CUT_CUTSCENE_TALK_155 = 5017701;
var cutscene_talk_155_started = false;
const CUT_CUTSCENE_TALK_175 = 5019701;
var cutscene_talk_175_started = false;
const CUT_CUTSCENE_DGFUCKYOU		= 5030001;
// LOCKED 231007 - get current in-game time. you set minutes_resolution to 15 you get the current quarter, 60 you get the current hour, and so on. the game's time comes from frame_counter which increases with 1 every frame, so it's good to be able to get less exact time
function get_time_by_minutes_resolution(minutes_resolution) { return Math.floor(frame_counter/(FRAMES_PER_HOUR*(minutes_resolution/60))) * (minutes_resolution/60); }
// LOCKED 231007 - my own version of lookAt() that only works in x and z dimensions (=you can't look upwards). for characters/objects. because rotations and quaternions suck
function lookat_datass(fobject1, fobject2) { return Math.atan2((fobject2.position.z-fobject1.position.z), -(fobject2.position.x-fobject1.position.x)) - 0.5*Math.PI; }
// LOCKED 231007 - my own version of lookAt() that only works in x and z dimensions (=you can't look upwards). for xz positions. because rotations and quaternions suck
function lookat_datass_xz(fx1, fz1, fx2, fz2) { return Math.atan2((fz2-fz1), -(fx2-fx1)) - 0.5*Math.PI; }
// LOCKED 231007 - get the actual rotation in radians. my own function because the standard functions don't work (because rotations and quaternions suck).
function rotation_real_get(angle)
{
	while (angle < 0) angle += 2*Math.PI;
	while (angle >= 2*Math.PI) angle -= 2*Math.PI;
	return angle;
}
//! controls both the player's and AI characters' car movement
function cars_control()
{
	// player (is controlled by keyboard input)
	if (Math.floor(object_get(player)) === ASCEND_ROAD)
	{
		if (key_w) if (speed < MAX_SPEED_ROAD) speed += game_speed * ACCELERATION_ROAD;
		if (key_s && speed > MAX_SPEED_REVERSE_ROAD && cut !== CUT_FREEROAM_KILLEPPER && cut !== CUT_FREEROAM_5)
		{
			if (speed >= 0) speed -= 0.5*ACCELERATION_ROAD;
			else speed -= ACCELERATION_ROAD;
		}
	}
	else
	{
		if (key_w) if (speed < MAX_SPEED_OFFROAD) speed += game_speed * ACCELERATION_OFFROAD;
		if (key_s && speed > MAX_SPEED_REVERSE_OFFROAD && cut !== CUT_FREEROAM_KILLEPPER && cut !== CUT_FREEROAM_5)
		{
			if (speed >= 0) speed -= 0.5*ACCELERATION_OFFROAD;
			else speed -= ACCELERATION_OFFROAD;
		}
	}
	if (key_a) player.rotation.y += TURN_SPEED;
	if (key_d) player.rotation.y -= TURN_SPEED;
	if ((speed > 0 && speed < 0.005 && !key_w && !key_s) || (speed < 0 && speed > -0.003 && !key_w && !key_s)) speed = 0;	// make the car stand fully still
	if (race_state === RACE_COUNTDOWN || race_state === RACE_AFTER) speed = 0;
	if (cut % MODULUS_FREEROAM_OR_RACE !== 0) speed = 0;
	if (speed > MAX_SPEED_ROAD) speed = MAX_SPEED_ROAD;
	if (speed < MAX_SPEED_REVERSE_ROAD) speed = MAX_SPEED_REVERSE_ROAD;
	if (turbo_timer <= 0) player.translateZ(game_speed * speed);
	else player.translateZ(game_speed * speed * ((turbo_timer/TURBO_TIMER)*1.65+1));
	if (jump_timer > 0) player.position.y += 0.05*jump_timer;
	// other characters (are controlled by AI code)
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (cz_turned_on[t] === 1)
		{
			let accchange = 1;
			if (t === 0) accchange = 1.2;
			else if (t === 1) accchange = 0.9;
			else if (t === 2) accchange = 1.1;
			else if (t === 5) accchange = 1.2;
			else if (t === 6) accchange = 1.1;
			else if (t === 7) accchange = 1.2;
			else if (t === 9) accchange = 1.1;
			if (player_checkpoint-cz_checkpoint[t] > 100) accchange *= 2;		// character drives slower when far away from player, so the races get "harder".
			else if (player_checkpoint-cz_checkpoint[t] < -100) accchange *= 0.75;
			// normal code - only runs when character is in the 3x3 closest chunks
			// (everything with hm[][][][] and om[][][][] etc must be here
			if ((ci1-x_to_chunk_no(cz[t].position.x)) <= 1 && (cj1-x_to_chunk_no(cz[t].position.z)) <= 1)
			{
				if (object_get(cz[t]) === ASCEND_ROAD)
				{
					if (cz_speed[t] < MAX_SPEED_ROAD*CHARACTERS_SLOWER*speedchange) cz_speed[t] += ACCELERATION_ROAD*CHARACTERS_SLOWER * accchange;
				}
				else
				{
					if (cz_speed[t] < MAX_SPEED_OFFROAD*CHARACTERS_SLOWER*speedchange) cz_speed[t] += ACCELERATION_OFFROAD*CHARACTERS_SLOWER * accchange;
				}
			}
			// if outside 3x3 closest chunks
			else
			{
				if (cz_speed[t] < MAX_SPEED_ROAD*CHARACTERS_SLOWER*speedchange) cz_speed[t] += ACCELERATION_ROAD*CHARACTERS_SLOWER * accchange;
			}
			// follow goal
			cz_goal_temporaryfollow_distx[t] = Math.abs(cz_goal_x[t]-cz_goal_temporaryfollow_x[t]);
			cz_goal_temporaryfollow_distz[t] = Math.abs(cz_goal_z[t]-cz_goal_temporaryfollow_z[t]);
			cz_goal_distx[t] = Math.abs(cz[t].position.x-cz_goal_x[t]);
			cz_goal_distz[t] = Math.abs(cz[t].position.z-cz_goal_z[t]);
			// steer back towards goal if the randomization has gotten to big (so the car don't go to another city). or if car is close to goal
			// steer back if pretty close to water. character gets on their toes near water so they don't fall down into it
			if (cz_goal_distx[t]+cz_goal_distz[t] < 10 || cz_goal_temporaryfollow_distx[t]+cz_goal_temporaryfollow_distz[t] > cz_goal_distx[t]+cz_goal_distz[t] || cz[t].position.y < sealevel-1)
			{
				cz_goal_temporaryfollow_x[t] = cz_goal_x[t];
				cz_goal_temporaryfollow_z[t] = cz_goal_z[t];
			}
			// otherwise, randomize
			else
			{
				let randomizechange = 1;
				if (t === 1) randomizechange = 0.8;
				else if (t === 4) randomizechange = 0.9;
				else if (t === 5) randomizechange = 2;
				else if (t === 7) randomizechange = 0.7;
				else if (t === 8) randomizechange = 0.85;
				cz_goal_temporaryfollow_x[t] += 0.5*(Math.random()-0.5)*(cz_goal_distx[t]+cz_goal_distz[t])*0.1 * randomizechange;
				cz_goal_temporaryfollow_z[t] += 0.5*(Math.random()-0.5)*(cz_goal_distx[t]+cz_goal_distz[t])*0.1 * randomizechange;
			}
			if (cz_race_state[t] == RACE_COUNTDOWN || cz_race_state[t] == RACE_AFTER) cz_speed[t] = 0;
			else if (cut % MODULUS_FREEROAM_OR_RACE !== 0) cz_speed[t] = 0;
			else if (cz_goal_distx[t] < 1 && cz_goal_distz[t] < 1)
			{
				cz[t].rotation.y = lookat_datass(cz[t], shelf);
				cz_speed[t] = 0;
			}
			else
			{
				cz[t].rotation.y = lookat_datass_xz(cz[t].position.x,cz[t].position.z, cz_goal_temporaryfollow_x[t],cz_goal_temporaryfollow_z[t]);
				if (cz_goal_x[t] !== -1)
				{
					if (cz_turbo_timer[t] <= 0) cz[t].translateZ(game_speed * cz_speed[t]);
					else cz[t].translateZ(game_speed * cz_speed[t] * ((cz_turbo_timer[t]/TURBO_TIMER)*2+1));
				}
			}
			if (cz_jump_timer[t] > 0) cz[t].position.y += 0.05*cz_jump_timer[t];
		}
	}
}
//! handles both the player's and AI characters' physics, for example friction, collision, gravity, etc
function cars_physics()
{
	// player
	// friction
	if (player.position.y < area_water.position.y+0.3 && (cut === CUT_FREEROAM_MAGNETDROWN || cut === CUT_FREEROAM_FLOATIES || cut === CUT_FREEROAM_GOINGHOME || cut === CUT_FREEROAM_KILLEPPER || cut === CUT_FREEROAM_5))
	{
		if (Math.floor(object_get(player)) == ASCEND_ROAD)
		{
			if (speed > 0) speed -= game_speed * FRICTION_FORWARD_ROAD*0.3;
			else if (speed < 0) speed += game_speed * FRICTION_BACKWARD_ROAD*0.01;
		}
		else
		{
			if (speed > 0) speed -= game_speed * FRICTION_FORWARD_ROAD*0.3;
			else if (speed < 0) speed += game_speed * FRICTION_BACKWARD_ROAD*0.01;
		}
	}
	else
	{
		if (Math.floor(object_get(player)) == ASCEND_ROAD)
		{
			if (speed > 0) speed -= game_speed * FRICTION_FORWARD_ROAD;
			else if (speed < 0) speed += game_speed * FRICTION_BACKWARD_ROAD;
		}
		else
		{
			if (speed > 0) speed -= game_speed * FRICTION_FORWARD_OFFROAD; 
			else if (speed < 0) speed += game_speed * FRICTION_BACKWARD_OFFROAD;
		}
	}
	// collision
	let ob = Math.floor(object_get(player));
	if (ob === ASCEND_HOUSE || ob === ASCEND_SKYSCRAPER || ob === ASCEND_BARN)
	{
		if (ob === ASCEND_HOUSE && player.position.y >= height_get(player)+1.5 - 0.5) { }
		else if (ob === ASCEND_SKYSCRAPER && player.position.y >= height_get(player)+5 - 0.5) { }
		else if (ob === ASCEND_BARN && player.position.y >= height_get(player)+1 - 0.5) { }
		else
		{
			let sfac = speed;
			if (speed < 0) sfac = -speed;
			if (sfac < 0.3) sound_crash.volume = sfac*2;
			else sound_crash.volume = 0.6;
			sound_crash.play();
			let dl = distance_get_xz(player.position.x,player.position.z, Math.floor(player.position.x)+0.5,Math.floor(player.position.z));
			let dr = distance_get_xz(player.position.x,player.position.z, Math.floor(player.position.x)+0.5,Math.floor(player.position.z)+1);
			let dd = distance_get_xz(player.position.x,player.position.z, Math.floor(player.position.x),Math.floor(player.position.z)+0.5);
			let du = distance_get_xz(player.position.x,player.position.z, Math.floor(player.position.x)+1,Math.floor(player.position.z)+0.5);
			let wdir;
			if (dl < dr && dl < dd && dl < du) wdir = "left";
			else if (dr < dl && dr < dd && dr < du) wdir = "right";
			else if (dd < dr && dd < dl && dd < du) wdir = "down";
			else if (du < dr && du < dd && du < dl) wdir = "up";
			if (key_w === false) speed *= -0.1;
			player.position.x = lastpos_x;
			player.position.z = lastpos_z;
			if (key_w === true)
			{
				let rr = rotation_real_get(player.rotation.y);
				if (wdir === "left") { if (rr >= 0 && rr < 0.5*Math.PI) player.position.x += 0.02; else player.position.x -= 0.02; }
				else if (wdir === "right") { if (rr >= Math.PI && rr < 1.5*Math.PI) player.position.x -= 0.02; else player.position.x += 0.02; }
				else if (wdir === "down") { if (rr >= 0.5*Math.PI && rr < Math.PI) player.position.z -= 0.02; else player.position.z += 0.02; }
				else if (wdir === "up") { if (rr >= 1.5*Math.PI && rr < 2*Math.PI) player.position.z += 0.02; else player.position.z -= 0.02; }
			}
		}
	}
	if (distance_get(player, sprite_energydrink) < 1) { turbo_timer = TURBO_TIMER; if (sound_laser.paused === true) { sound_laser.play(); } }
	else if (distance_get(player, sprite_energydrink2) < 1) { turbo_timer = TURBO_TIMER; if (sound_laser.paused === true) { sound_laser.play(); } }
	else if (distance_get(player, sprite_energydrink3) < 1) { turbo_timer = TURBO_TIMER; if (sound_laser.paused === true) { sound_laser.play(); } }
	else if (distance_get(player, sprite_energydrink4) < 1) { turbo_timer = TURBO_TIMER; if (sound_laser.paused === true) { sound_laser.play(); } }
	else if (distance_get(player, sprite_energydrink5) < 1) { turbo_timer = TURBO_TIMER; if (sound_laser.paused === true) { sound_laser.play(); } }
	else if (distance_get(player, sprite_washingmachine2) < 1) { sound_play(sound_washclick); washingmachine_timer = WASHINGMACHINE_TIMER; if (sound_washingmachine.paused === true) { sound_play(sound_washingmachine); } }
	else if (distance_get(player, sprite_washingmachine3) < 1) { sound_play(sound_washclick); washingmachine_timer = WASHINGMACHINE_TIMER; if (sound_washingmachine.paused === true) { sound_play(sound_washingmachine); } }
	else if (distance_get(player, sprite_washingmachine4) < 1) { sound_play(sound_washclick); washingmachine_timer = WASHINGMACHINE_TIMER; if (sound_washingmachine.paused === true) { sound_play(sound_washingmachine); } }
	else if (distance_get(player, sprite_trampoline) < 1 && player.position.y-sprite_trampoline.position.y < 1) { jump_timer = JUMP_TIMER; if (sound_boing.paused === true) { sound_boing.play(); } }
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (cz_turned_on[t] === 1)
		{
			if (distance_get(cz[t], sprite_energydrink) < 1) { cz_turbo_timer[t] = TURBO_TIMER; }
			else if (distance_get(cz[t], sprite_energydrink2) < 1) { cz_turbo_timer[t] = TURBO_TIMER; }
			else if (distance_get(cz[t], sprite_energydrink3) < 1) { cz_turbo_timer[t] = TURBO_TIMER; }
			else if (distance_get(cz[t], sprite_energydrink4) < 1) { cz_turbo_timer[t] = TURBO_TIMER; }
			else if (distance_get(cz[t], sprite_energydrink5) < 1) { cz_turbo_timer[t] = TURBO_TIMER; }
			else if (distance_get(cz[t], sprite_trampoline) < 1 && cz[t].position.y-sprite_trampoline.position.y < 1) { cz_jump_timer[t] = JUMP_TIMER; }
		}
	}
	// gravity
	let obb = Math.floor(object_get(player));
	if (obb === ASCEND_HOUSE || obb === ASCEND_SKYSCRAPER || obb === ASCEND_BARN)
	{
		if (obb === ASCEND_HOUSE) height = height_get_xz(Math.floor(player.position.x),Math.floor(player.position.z))+1.5 + 0.35;		// 0.35 är för syns skull i spelet tror j
		else if (obb === ASCEND_SKYSCRAPER) height = height_get_xz(Math.floor(player.position.x),Math.floor(player.position.z))+5 + 0.35;
		else if (obb === ASCEND_BARN) height = height_get_xz(Math.floor(player.position.x),Math.floor(player.position.z))+1 + 0.35;
	}
	else height = height_get(player);
	// helicopter
	if (cut === CUT_FREEROAM_KILLEPPER || cut === CUT_FREEROAM_5)
	{
		if (player.position.y <= height) player.position.y = height;
		player.position.y -= 0.01;
	}
	// car
	else
	{
		if ((player.position.y-height) < (3-speed)*0.005)
		{
			gravityinc = 0;
			player.position.y = height;
		}
		else if (player.position.y > height)
		{
			if (washingmachine_timer > 0) gravityinc += 2*0.004; else gravityinc += 0.004;
			player.position.y -= gravityinc;
		}
	}
	// go slower uphill
	if (turbo_timer <= 0 && ((lastheight > height && player.position.y === height) || (lastheight < height && player.position.y === height)))
	{
		if (speed > 0)
		{
			speed += (lastheight-height)*0.1;		// when driving forward
			if (speed < 0) speed = 0;
		}
		else if (speed < 0)
		{
			speed -= (lastheight-height)*0.1;		// when driving backward
			if (speed > 0) speed = 0;
		}
	}
	// don't drown in water
	if (lastlandpos_x !== -1 && lastlandpos_z !== -1 && washingmachine_timer <= 0)
	{
		// floating												   // and flying
		if (cut !== CUT_FREEROAM_MAGNETDROWN && cut !== CUT_FREEROAM_FLOATIES && cut !== CUT_FREEROAM_GOINGHOME && cut !== CUT_FREEROAM_KILLEPPER && cut !== CUT_FREEROAM_5)
		{
			// area_water ist�llet f�r sealevel pga tidvatten!
			if (player.position.y < area_water.position.y-1)
			{
				sound_splash.play();
				speed = 0;
				player.position.x = lastlandpos_x;
				player.position.y = area_water.position.y+2;
				player.position.z = lastlandpos_z;
				// automatic rescue UI. rest is in main.js
				drown_count++;
			}
		}
	}
	sprite_washingmachine.position.set(player.position.x, player.position.y+0.35, player.position.z);
	if (washingmachine_timer > 0) sprite_washingmachine.visible = true;
	else sprite_washingmachine.visible = false;
	sprite_washingmachine.material.transparent = true;
	sprite_washingmachine.material.opacity = 0.5 + 0.5*(washingmachine_timer/3600);
	lastheight = height;
	// collision with other characters etc
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (cz_turned_on[t] === 1)
			{
				if (distance_get(player, cz[t]) < 1 && collision_timer <= 0)
				{
					sound_punch.play();
					if (speed > 0.01 && speed >= cz_speed[t])
					{
						cz[t].position.y += 0.5;
						cz_speed[t] = 0;
					}
					else
					{
						player.position.y += 0.5;
						speed = 0;
					}
					collision_timer = 60;
				}
			}
		}
	}
	// other characters
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (cz_turned_on[t] === 1)
		{
			// friction
			let frictionchange = 1;
			if (t === 2) frictionchange = 1.3;
			else if (t === 3) frictionchange = 1.3;
			else if (t === 7) frictionchange = 0.8;
			else if (t === 8) frictionchange = 1.3;
			else if (t === 9) frictionchange = 1.3;
			// normal code - only runs when character is in the 3x3 closest chunks
			// (everything with hm[][][][] and om[][][][] etc must be here
			if ((ci1-x_to_chunk_no(cz[t].position.x)) <= 1 && (cj1-x_to_chunk_no(cz[t].position.z)) <= 1)
			{
				if (Math.floor(object_get(cz[t])) == ASCEND_ROAD)
				{
					if (cz_speed[t] > 0) cz_speed[t] -= FRICTION_FORWARD_ROAD * frictionchange;
					else if (cz_speed[t] < 0) cz_speed[t] += FRICTION_BACKWARD_ROAD * frictionchange;
				}
				else
				{
					if (cz_speed[t] > 0) cz_speed[t] -= FRICTION_FORWARD_OFFROAD * frictionchange;
					else if (cz_speed[t] < 0) cz_speed[t] += FRICTION_BACKWARD_OFFROAD * frictionchange;
				}
				// gravity
				let gravitychange = 1;
				if (t === 3) gravitychange = 1.3;
				else if (t === 5) gravitychange = 0.6;
				else if (t === 7) gravitychange = 0.8;
				else if (t === 8) gravitychange = 1.2;
				cz_height[t] = height_get(cz[t]);
				if (cz[t].position.y > cz_height[t]+0.1)
				{
					cz_gravityinc[t] += 0.004 * gravitychange;
					cz[t].position.y -= cz_gravityinc[t];
				}
				else
				{
					cz_gravityinc[t] = 0;
					cz[t].position.y = cz_height[t]+0.1;
				}
				cz_lastheight[t] = cz_height[t];
				// go slower uphill
				if (cz_lastheight[t] > cz_height[t] && cz[t].position.y == cz_height[t]+0.3 || cz_lastheight[t] < cz_height[t] && cz[t].position.y == cz_height[t]+0.3)
				{
					if (cz_speed[t] > 0) cz_speed[t] += (cz_lastheight[t]-cz_height[t])*0.05;		// when driving forward
					else if (cz_speed[t] < 0) cz_speed[t] -= (cz_lastheight[t]-cz_height[t])*0.05;		// when driving backward
				}
				// don't drown - not used...
				// collision - not used...
				if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0)
				{
					for (let tt = 0; tt < NUMBER_OF_CARS; tt++)
					{
						if (cz_turned_on[tt] === 1)
						{
							if (t !== tt && distance_get(cz[t], cz[tt]) < 1 && cz_collision_timer <= 0)
							{
								if (cz_speed[t] > 0.01 && cz_speed[t] >= cz_speed[tt])
								{
									cz[tt].position.y += 0.5;
									cz_speed[tt] = 0;
								}
								else
								{
									cz[t].position.y += 0.5;
									cz_speed[t] = 0;
								}
								cz_collision_timer = 60;
							}
						}
					}
				}
			}
			// if outside 3x3 closest chunks
			else
			{
				if (cz_speed[t] > 0) cz_speed[t] -= FRICTION_FORWARD_ROAD * frictionchange;
				else if (cz_speed[t] < 0) cz_speed[t] += FRICTION_BACKWARD_ROAD * frictionchange;
			}
		}
	}
}
//! plays sounds depending on what you or AI characters do with the cars
function cars_sound()
{
	// player
	let volume = 7*speed;
	if (volume >= 0.99) volume = 0.99;
	volume *= 0.6;
	if (volume <= 0.2) volume = 0.2;
	sound_car.volume = volume;
	let volume_grass = 7*speed;
	if (volume_grass >= 0.7) volume_grass = 0.7;
	if (volume_grass <= 0.2) volume_grass = 0;
	if (player.position.y !== height) volume_grass = 0;
	if (height_get(player) <= sealevel+0.2)
	{
		sound_water.volume = volume_grass;
		sound_grass.volume = 0;
	}
	else
	{
		sound_grass.volume = volume_grass;
		sound_water.volume = 0;
	}
	// start car sound in freeroam and race
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && sound_car_is_playing === false)
	{
		sound_car.play();
		sound_grass.play();
		sound_water.play();
		sound_car_is_playing = true;
	}
	// car landing sound
	if (player.position.y === height && inair)
	{
		let temp = (frame_counter-air_start)*0.008;
		if (temp > 0.4) temp = 0.4;
		if (temp < 0) temp = 0;
		sound_crash.volume = temp;
	//	sound_crash.play();
		inair = false;
	}
	if (player.position.y !== height && !inair)	// when in the air
	{
		air_start = frame_counter;
		inair = true;
	}
	// other characters
	if (!(lowres < 1))
	{
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (cz_turned_on[t] === 1)
		{
			let cvolume = 7*cz_speed[t];
			cvolume *= 2;
			if (cvolume >= 0.99) cvolume = 0.99;
			cvolume *= 0.6;
			if (cvolume <= 0.2) cvolume = 0.2;
			cvolume -= 0.018*distance_get(camera, cz[t]);
			if (cvolume <= 0) cvolume = 0;
			sound_cz_car[t].volume = cvolume;
			// start car sound in freeroam and race
			if (cut % MODULUS_FREEROAM_OR_RACE === 0 && sound_cz_car_is_playing[t] === false)
			{
				sound_cz_car[t].play();
				sound_cz_car_is_playing[t] = true;
			}
			// stop car sound in cutscenes
			if (cut % MODULUS_FREEROAM_OR_RACE !== 0)
			{
				sound_cz_car[t].pause();
				sound_cz_car_is_playing[t] = false;
			}
		}
		else
		{
			sound_cz_car[t].pause();
		}
		// car landing sound
		if ((cz[t].position.y >= cz_height[t]+1-0.3 || cz[t].position.y <= cz_height[t]+1+0.3) && cz_inair[t])
		{
			let ctemp = (frame_counter-cz_air_start[t])*0.008;
			if (ctemp > 0.4) ctemp = 0.4;
		//	ctemp -= 0.01*distance_get(camera, cz[t]);
			if (ctemp < 0) ctemp = 0;
			sound_crash.volume = ctemp;
		//	sound_crash.play();
			cz_inair[t] = false;
		}
		if (cz[t].position.y !== cz_height[t] && !cz_inair[t])	// when in the air
		{
			cz_air_start[t] = frame_counter;
			cz_inair[t] = true;
		}
	}
	}
}
//* Makes sure characters and/or objects get the correct height (just above ground)
function place_sprite(fobject, fx, fz)
{
	fobject.position.x = fx;
	fobject.position.z = fz;
	// idle
	if (pseudorandom(fx*fz*Math.floor(0.05*frame_counter)) > 0.9) fobject.position.y = height_get(fobject)+(fobject.scale.x*0.25) + 0.2 * Math.sin(24 * 0.01 * (frame_counter - (100*Math.floor(0.01*frame_counter))));
	else fobject.position.y = height_get(fobject)+(fobject.scale.x*0.25);
	if (fobject.position.y < height_get(fobject)+(fobject.scale.x*0.25)) fobject.position.y = height_get(fobject)+(fobject.scale.x*0.25);
}
//* LOCKED 231012 - same as place_sprite() but with no idle stuff
function place_sprite_noidle(fobject, fx, fz)
{
	fobject.position.x = fx;
	fobject.position.z = fz;
	fobject.position.y = height_get(fobject)+(fobject.scale.x*0.25);
}
//_ sets character name & image and plays character sound at dialogue
function dialog_set_metadata(at_object)
{
	pause_all_cz_sounds();
	if (at_object === shelf)				{ 									head = "C_shelf_head.png";		name = "Shelf"; }
	else if (at_object === sprite[0])		{ if (sound_adele.paused === true)	{ sound_adele.play(); }		head = "C_adele_head.png";		name = "Adele"; }
	else if (at_object === sprite[1])	{ if (sound_dark_gandalf.paused === true){ sound_dark_gandalf.play(); }	head = "C_dg_head.png";			name = "Dark Gandalf"; }
	else if (at_object === sprite[2])		{ if (sound_daddy.paused === true)	{ sound_daddy.play(); }		head = "C_daddy_head.png";		name = "Daddy"; }
	else if (at_object === sprite[3])		{ if (sound_dogert.paused === true)	{ sound_dogert.play(); }	head = "C_dogert_head.png";		name = "Dogert"; }
	else if (at_object === sprite[4])		{ if (sound_omalley.paused === true)	{ sound_omalley.play(); }	head = "C_omalley_head.png";		name = "O'Malley"; }
	else if (at_object === sprite[5])		{ if (sound_harass.paused === true)	{ sound_harass.play(); }	head = "C_harass_head.png";		name = "Hårass"; }
	else if (at_object === sprite[6])		{ 									head = "C_disonesty_head.png";		name = "Disonesty"; }
	else if (at_object === sprite[7])	{ if (sound_mrs_superconductor.paused === true) { sound_mrs_superconductor.play(); } head = "C_mrs_superconductor_head.png"; name = "Mrs Superconductor"; }
	else if (at_object === sprite[8])		{ if (sound_polish_cow.paused === true)	{ sound_polish_cow.play(); }	head = "C_polish_cow_head.png";		name = "Polish Cow"; }
	else if (at_object === sprite[9])		{ if (sound_epper.paused === true)	{ sound_epper.play(); }		head = "C_epper_head.png";		name = "'Epper"; }
	else							{ if (sound_cz.paused === true)	{ sound_cz.play(); }	head = at_object.material.map.image.src; name = at_object.oname; }
}
//_ shows dialogue in cutscene
function cc(at_object, fdialog, from_x, from_z)
{
dialog2 = "";
dialog3 = "";
	if (at_object !== shelf) looking_at_object = at_object;
	// only do this once at the start of the dialog
	if (last_dialog !== fdialog && cut >= 0)
	{
		dialog_set_metadata(at_object);								// play sound, set head image variable and name variable
		if (head.includes("files/") === true) document.getElementById("dialog_head").src = head;
		else document.getElementById("dialog_head").src = "files/" + head;			// set head image in HTML document
		document.getElementById("dialog_name").innerHTML = name;				// set name in HTML document
		dialog = fdialog;									// set dialog text variable
	}
	rolling_dialog();										// set dialog text in HTML document
}
//_ copy of cc() with different dialog depending on player's last answer
function cc2(at_object, fdialog, fdialog2, from_x, from_z)
{
dialog2 = "";
dialog3 = "";
	let rdialog;
	if (shelfanswer === 0) rdialog = fdialog;
	else if (shelfanswer === 1) rdialog = fdialog2;
	else throw new Error();
	if (at_object !== shelf) looking_at_object = at_object;
	// only do this once at the start of the dialog
	if (last_dialog !== rdialog && cut >= 0)
	{
		dialog_set_metadata(at_object);								// play sound, set head image variable and name variable
		if (head.includes("files/") === true) document.getElementById("dialog_head").src = head;
		else document.getElementById("dialog_head").src = "files/" + head;			// set head image in HTML document
		document.getElementById("dialog_name").innerHTML = name;				// set name in HTML document
		dialog = rdialog;									// set dialog text variable
	}
	rolling_dialog();										// set dialog text in HTML document
}
//_ copy of cc() for player's answer
function ccS(fdialog, fdialog2)
{
dialog3 = "";
	// only do this once at the start of the dialog
	if (last_dialog !== fdialog && cut >= 0)
	{
		document.getElementById("dialog_head").src = "files/C_shelf_head.png";
		document.getElementById("dialog_name").innerHTML = "Shelf's left brain";		// set name in HTML document
		dialog = fdialog;									// set dialog text variable
	}
	rolling_dialog();										// set dialog text in HTML document
	// only do this once at the start of the dialog
	if (last_dialog2 !== fdialog2 && cut >= 0)
	{
		document.getElementById("dialog_head2").src = "files/C_shelf_head_.png";
		document.getElementById("dialog_name2").innerHTML = "Shelf's right brain";		// set name in HTML document
		dialog2 = fdialog2;									// set dialog text variable
	}
	rolling_dialog2();										// set dialog text in HTML document
}
//_ copy of cc() for player's answer (3 answers!)
function ccS3(fdialog, fdialog2, fdialog3)
{
	// only do this once at the start of the dialog
	if (last_dialog !== fdialog && cut >= 0)
	{
		document.getElementById("dialog_head").src = "files/C_shelf_head.png";
		document.getElementById("dialog_name").innerHTML = "1";					// set name in HTML document
		dialog = fdialog;									// set dialog text variable
	}
	rolling_dialog();										// set dialog text in HTML document
	// only do this once at the start of the dialog
	if (last_dialog2 !== fdialog2 && cut >= 0)
	{
		document.getElementById("dialog_head2").src = "files/C_shelf_head_.png";
		document.getElementById("dialog_name2").innerHTML = "X";				// set name in HTML document
		dialog2 = fdialog2;									// set dialog text variable
	}
	rolling_dialog2();										// set dialog text in HTML document
	// only do this once at the start of the dialog
	if (last_dialog3 !== fdialog3 && cut >= 0)
	{
		document.getElementById("dialog_head3").src = "files/C_shelf_head__.png";
		document.getElementById("dialog_name3").innerHTML = "2";				// set name in HTML document
		dialog3 = fdialog3;									// set dialog text variable
	}
	rolling_dialog3();										// set dialog text in HTML document
}
//_ LOCKED 231102 - shows dialogue BETween cutscenes. dialogue changes by timer
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
//_ LOCKED 231007 - rolling text in dialog
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
//_ copy of rolling_dialog() for player's answer
function rolling_dialog2()
{
	if (dialog2 !== last_dialog2) now_char2 = 0;
	if (now_char2 < dialog2.length)
	{
		now_char2 += 2;
		document.getElementById("dialog_text2").innerHTML = dialog2.substring(0, now_char2);
	}
	last_dialog2 = dialog2;
}
//_ copy of rolling_dialog() for player's answer (3d answer!)
function rolling_dialog3()
{
	if (dialog3 !== last_dialog3) now_char3 = 0;
	if (now_char3 < dialog3.length)
	{
		now_char3 += 2;
		document.getElementById("dialog_text3").innerHTML = dialog3.substring(0, now_char3);
	}
	last_dialog3 = dialog3;
}
// LOCKED 231102 - timescene abstraction
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
	for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;		// testar!
	dialog = "";
	dialog2 = "";
	dialog3 = "";
	bet_started = false;
	iwillbeback = false;
	cut = fcut;
}
// timescene abstraction
function ts_end_from_talk(fcut)
{
	dialog = "";
	dialog2 = "";
	dialog3 = "";
	bet_started = true;
	iwillbeback = false;
	cut = fcut;
}
// LOCKED 231012 - timescene abstraction
function ts_during()
{
	q = (get_time_by_minutes_resolution(15)-start_hour);
	if (q < 0) q += 24;
}
//_ LOCKED 231007 - creates a room with a specific wall and floor texture, for dialogue "cutscenes"
function room_set(wall_texture, floor_texture)
{
	mesh_room_wall.material.map = loader.load("files/" + wall_texture);
	mesh_room_wall.material.map.minFilter = THREE.NearestFilter;
	mesh_room_wall.material.map.magFilter = THREE.NearestFilter;
	mesh_room_wall.material.needsUpdate = true;
	mesh_room_floor.material.map = loader.load("files/" + floor_texture);
	mesh_room_floor.material.needsUpdate = true;
}
//_ LOCKED 231007 - places characters/objects close to the player, in a specific direction (n,s,e,w,ne,nw,se,sw). good for quickly making a dialogue scene that looks OK
function place_cz_in_room(fobject, direction, height, distance)
{
	// standard values (for IE)
	if (direction !== "n" && direction !== "ne" && direction !== "e" && direction !== "se" && direction !== "s" && direction !== "sw" && direction !== "w" && direction !== "nw") direction = "n";
	if (!(height >= -999999)) height = 0;
	if (!(distance >= -999999)) distance = 1.2;
	if (direction === "n")          fobject.position.set(player.position.x + 0.2*distance, player.position.y+height+0.25, player.position.z + distance);
        else if (direction === "ne")    fobject.position.set(player.position.x + 0.9*distance, player.position.y+height+0.25, player.position.z + 0.6*distance);
        else if (direction === "e")     fobject.position.set(player.position.x + distance, player.position.y+height+0.25, player.position.z + 0.1*distance);
        else if (direction === "se")    fobject.position.set(player.position.x + 0.9*distance, player.position.y+height+0.25, player.position.z - 0.5*distance);
        else if (direction === "s")     fobject.position.set(player.position.x + 0.2*distance, player.position.y+height+0.25, player.position.z - distance);
        else if (direction === "sw")    fobject.position.set(player.position.x - 0.9*distance, player.position.y+height+0.25, player.position.z - 0.7*distance);
        else if (direction === "w")     fobject.position.set(player.position.x - distance, player.position.y+height+0.25, player.position.z - 0.3*distance);
        else if (direction === "nw")    fobject.position.set(player.position.x - 0.9*distance, player.position.y+height+0.25, player.position.z + 0.6*distance);
}
//_ place_cz_in_room() but characters/objects get placed right above ground automatically
function place_cz_in_room_ground(fobject, direction, height, distance)
{
	// standard values (for IE)
	if (direction !== "n" && direction !== "ne" && direction !== "e" && direction !== "se" && direction !== "s" && direction !== "sw" && direction !== "w" && direction !== "nw") direction = "n";
	if (!(height >= -999999)) height = 0;
	if (!(distance >= -999999)) distance = 1.2;
        if (direction === "n")          place_sprite_noidle(fobject, player.position.x + 0.2*distance, player.position.z + distance);
        else if (direction === "ne")    place_sprite_noidle(fobject, player.position.x + 0.9*distance, player.position.z + 0.6*distance);
        else if (direction === "e")     place_sprite_noidle(fobject, player.position.x + distance, player.position.z + 0.1*distance);
        else if (direction === "se")    place_sprite_noidle(fobject, player.position.x + 0.9*distance, player.position.z - 0.5*distance);
        else if (direction === "s")     place_sprite_noidle(fobject, player.position.x + 0.2*distance, player.position.z - distance);
        else if (direction === "sw")    place_sprite_noidle(fobject, player.position.x - 0.9*distance, player.position.z - 0.7*distance);
        else if (direction === "w")     place_sprite_noidle(fobject, player.position.x - distance, player.position.z - 0.3*distance);
        else if (direction === "nw")    place_sprite_noidle(fobject, player.position.x - 0.9*distance, player.position.z + 0.6*distance);
}
//! updates all layout
function layout_set()
{
	if (cut < 0 || cut % MODULUS_FREEROAM_OR_RACE !== 0 || frame_counter % 10 === 0)		// for optimizing
	{
		// portrait
		if (window.innerHeight > window.innerWidth)
		{
			document.getElementById("dialog_head2").style.visibility = "hidden";
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
			document.getElementById("leader").style = 
				"position: fixed; left: 30vw; width: 40vw;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word;";
			document.getElementById("dialog_background").style = 
				"position: fixed; top: 54%; left: 50%; transform: translateX(-50%); width: 50vh; max-width: 98vw; height: 17.5vh;\
				display: block;\
				border: 1px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
			document.getElementById("dialog_head").style = 
				"position: fixed; top: -11.2vh; left: 50%; transform: translateX(-48vw); height: 11vh;\
				image-rendering: pixelated;";
			document.getElementById("dialog_name").style = 
				"position: relative; top: 0.5vh; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 2.5vh; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dialog_background2").style = 
				"position: fixed; top: 38%; left: 50%; transform: translateX(-50%); width: 50vh; max-width: 98vw; height: 17.5vh;\
				display: block;\
				border: 1px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
		//	document.getElementById("dialog_head2").style = 
		//		"position: fixed; top: -13.2vh; left: 50%; transform: translateX(-21vh); height: 13vh;\
		//		image-rendering: pixelated;";
			document.getElementById("dialog_name2").style = 
				"position: relative; top: 0.5vh; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 2.5vh; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text2").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dialog_background3").style = 
				"position: fixed; top: 16%; left: 50%; transform: translateX(-50%); width: 50vh; max-width: 98vw; height: 17.5vh;\
				display: block;\
				border: 1px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
		//	document.getElementById("dialog_head3").style = 
		//		"position: fixed; top: -13.2vh; left: 50%; transform: translateX(-21vh); height: 13vh;\
		//		image-rendering: pixelated;";
			document.getElementById("dialog_name3").style = 
				"position: relative; top: 0.5vh; left: 3%; width: 94%; line-height: 25%;\
				display: block;\
				font-size: 2.5vh; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text3").style = 
				"position: relative; left: 3%; width: 94%;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dvdmenu").style =
				"position: fixed; top: 10vh; left: 50%; transform: translateX(-50%); height: 40vh; width: 50vh; max-width: 95vw;\
				display: block;\
				padding: 1vh;\
				border: 1px solid; border-color: #6DFA0F;\
				background-image: url(\"files/sachiko6.png\"); background-attachment: fixed; background-size: cover;\
				font-size: 2.4vh; color: white; font-family: 'kbfont'; text-align: left; word-break; break-word;";
			document.getElementById("dvdmenu_image").style = 
				"position: relative; top: 0vw; left: 50% transform: translate(-50%, 0%); width: 60%;\
				display: block;";
			document.getElementById("save_text").style = 
				"position: relative; top: 0; left: 50%; transform: translate(-50%, 0%); width: 90%;\
				display: block;\
				font-size: 2.6vh; color: #6DFA0F; font-family: 'kbfont'; text-align: center;";
			document.getElementById("save_image").style = 
				"width: 8%;";
			document.getElementById("credits_background").style = 
				"position: fixed; top: 70vh; left: 50%; transform: translateX(-50%); width: 35vh; height: 20vh;\
				display: block;";
			document.getElementById("credits_text").style = 
				"position: relative; top: 1vw; left: 50%; transform: translate(-50%, 0%); width: 68vh; max-width: 95vw;\
				display: block;\
				font-size: 1.9vh; color: lightgray; font-family: 'kbfont'; text-align: center;";
			document.getElementById("dvdmenu_1").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_1").style.cursor = "pointer";
			document.getElementById("dvdmenu_2").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_2").style.cursor = "pointer";
			document.getElementById("dvdmenu_3").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_3").style.cursor = "pointer";
			document.getElementById("dvdmenu_4").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_4").style.cursor = "pointer";
			document.getElementById("dvdmenu_5").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_5").style.cursor = "pointer";
			document.getElementById("dvdmenu_6").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_6").style.cursor = "pointer";
			document.getElementById("dvdmenu_7").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_7").style.cursor = "pointer";
			document.getElementById("dvdmenu_8").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_8").style.cursor = "pointer";
			document.getElementById("dvdmenu_9").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_9").style.cursor = "pointer";
			document.getElementById("dialog_background").style.cursor = "pointer";
			document.getElementById("dialog_background2").style.cursor = "pointer";
			document.getElementById("dialog_background3").style.cursor = "pointer";
			document.getElementById("button_pause").style =
				"position: fixed; top: 1vh; left: 1vh; height: 5.7vh; width: 5.7vh;\
				display: flex; cursor: pointer;\
				border: 0.5vh solid; border-color: #2d41ff;\
				background: none; box-sizing: border-box;\
				font-size: 6.3vh; color: #2d41ff; font-family: 'kbfont'; justify-content: center; align-items: center; line-height: 0;";
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
			document.getElementById("button_continue").style = 
				"position: fixed; top: 55%; left: 50%; transform: translateX(-50%); width: 45vh; max-width: 95vw;\
				display: block; cursor: pointer;";
			document.getElementById("button_play").style = 
				"position: fixed; top: 55%; left: 50%; transform: translateX(-50%); width: 45vh; max-width: 95vw;\
				display: block; cursor: pointer;";
			document.getElementById("area").style = 
				"position: fixed; top: 26%; left: 50%; transform: translate(-50%, -50%);\
				font-family: 'BlackChancery'; color: white; font-size: 3.4vh;";
			document.getElementById("scene").style = 
				"position: fixed; top: 20vh; left: 50%; transform: translateX(-50%);\
				font-size: 3.5vh; color: #caa201; font-family: 'kbfont'; text-align: left; word-break: break-word;\
				background-color: #867319;";
		}
		// landscape
		else
		{
		document.getElementById("dialog_head2").style.visibility = "visible";
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
			document.getElementById("leader").style = 
				"position: fixed; top: 25vh; left: 75vw; width: 25vw;\
				display: block;\
				font-size: 2.2vw; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word;";
			document.getElementById("dialog_background").style = 
				"position: fixed; top: 0.5vh; left: 14vw; width: 72vw; height: 10vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
			document.getElementById("dialog_head").style = 
				"position: fixed; top: 1.5vw; left: 14.4vw; height: 10.3vw;\
				image-rendering: pixelated;";
			document.getElementById("dialog_name").style = 
				"position: relative; left: 15%; width: 82%; line-height: 25%;\
				display: block;\
				font-size: 1.8vw; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text").style = 
				"position: relative; left: 15%; width: 82%;\
				display: block;\
				font-size: 1.8vw; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dialog_background2").style = 
				"position: fixed; top: 30vh; left: 14vw; width: 72vw; height: 10vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
			document.getElementById("dialog_head2").style = 
				"position: fixed; top: 1.5vw; left: 14.4vw; height: 10.3vw;\
				image-rendering: pixelated;";
			document.getElementById("dialog_name2").style = 
				"position: relative; left: 15%; width: 82%; line-height: 25%;\
				display: block;\
				font-size: 1.8vw; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text2").style = 
				"position: relative; left: 15%; width: 82%;\
				display: block;\
				font-size: 1.8vw; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dialog_background3").style = 
				"position: fixed; top: 60vh; left: 14vw; width: 72vw; height: 10vw;\
				display: block;\
				border: 0.5vw solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
			document.getElementById("dialog_head3").style = 
				"position: fixed; top: 1.5vw; left: 14.4vw; height: 10.3vw;\
				image-rendering: pixelated;";
			document.getElementById("dialog_name3").style = 
				"position: relative; left: 15%; width: 82%; line-height: 25%;\
				display: block;\
				font-size: 1.8vw; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text3").style = 
				"position: relative; left: 15%; width: 82%;\
				display: block;\
				font-size: 1.8vw; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dvdmenu").style =
				"position: fixed; left: 8vw; top: 1vw; width: 60vw;\
				display: block;\
				padding: 1vw;\
				border: 1px solid; border-color: #6DFA0F;\
				background-image: url(\"files/sachiko6.png\"); background-attachment: fixed; background-size: cover;\
				font-size: 2vw; color: white; font-family: 'kbfont'; text-align: left; word-break; break-word;";
			document.getElementById("dvdmenu_image").style = 
				"position: relative; top: 0vw; left: 50% transform: translate(-50%, 0%); width: 40%;\
				display: block;";
			document.getElementById("save_text").style = 
				"position: relative; top: 0; left: 50%; transform: translate(-50%, 0%); width: 60vw;\
				display: block;\
				font-size: 2vw; color: #6DFA0F; font-family: 'kbfont'; text-align: center;";
			document.getElementById("save_image").style = 
				"width: 4%;";
			document.getElementById("credits_background").style = 
				"position: fixed; bottom: 2vh; right: 11vw; width: 11vw;\
				display: block;";
			document.getElementById("credits_text").style = 
				"position: relative; top: 1vw; left: 50%; transform: translate(-50%, 0%); width: 30vw;\
				display: block;\
				font-size: 1.6vw; color: lightgray; font-family: 'kbfont'; text-align: center;";
			document.getElementById("dvdmenu_1").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_1").style.cursor = "pointer";
			document.getElementById("dvdmenu_2").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_2").style.cursor = "pointer";
			document.getElementById("dvdmenu_3").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_3").style.cursor = "pointer";
			document.getElementById("dvdmenu_4").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_4").style.cursor = "pointer";
			document.getElementById("dvdmenu_5").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_5").style.cursor = "pointer";
			document.getElementById("dvdmenu_6").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_6").style.cursor = "pointer";
			document.getElementById("dvdmenu_7").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_7").style.cursor = "pointer";
			document.getElementById("dvdmenu_8").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_8").style.cursor = "pointer";
			document.getElementById("dvdmenu_9").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_9").style.cursor = "pointer";
			document.getElementById("dialog_background").style.cursor = "pointer";
			document.getElementById("dialog_background2").style.cursor = "pointer";
			document.getElementById("dialog_background3").style.cursor = "pointer";
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
			document.getElementById("button_continue").style = 
				"position: fixed; bottom: 0vh; left: 31vw; width: 38vw;\
				display: block; cursor: pointer;";
			document.getElementById("button_play").style = 
				"position: fixed; bottom: 0vh; left: 31vw; width: 38vw;\
				display: block; cursor: pointer;";
			document.getElementById("area").style = 
				"position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);\
				font-family: 'BlackChancery'; color: white; font-size: 7.4vh;";
			document.getElementById("scene").style = 
				"position: fixed; top: 20vh; left: 50%; transform: translateX(-50%);\
				font-size: 6vh; color: #caa201; font-family: 'kbfont'; text-align: left; word-break: break-word;\
				background-color: #867319;";
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
			document.getElementById("leader").style = 
				"position: fixed; top: 25vh; left: 75vw; width: 25vw;\
				display: block;\
				font-size: 2.7vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word;";
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
			document.getElementById("dialog_background2").style = 
				"position: fixed; top: 19vh; left: 50%; transform: translateX(-50%); width: 90vh; height: 15vh;\
				display: block;\
				border: 1px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
			document.getElementById("dialog_head2").style = 
				"position: fixed; top: 1.8vh; left: 50%; transform: translateX(-44vh); height: 13vh;\
				image-rendering: pixelated;";
			document.getElementById("dialog_name2").style = 
				"position: relative; top: 0.5vh; left: 17%; width: 82%; line-height: 25%;\
				display: block;\
				font-size: 2.6vh; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text2").style = 
				"position: relative; left: 17%; width: 82%;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dialog_background3").style = 
				"position: fixed; top: 36.2vh; left: 50%; transform: translateX(-50%); width: 90vh; height: 15vh;\
				display: block;\
				border: 1px solid; border-color: #6DFA0F;\
				background: rgb(115, 32, 93, 0.75);";
			document.getElementById("dialog_head3").style = 
				"position: fixed; top: 1.8vh; left: 50%; transform: translateX(-44vh); height: 13vh;\
				image-rendering: pixelated;";
			document.getElementById("dialog_name3").style = 
				"position: relative; top: 0.5vh; left: 17%; width: 82%; line-height: 25%;\
				display: block;\
				font-size: 2.6vh; color: white; font-family: 'kbfont'; text-align: left;";
			document.getElementById("dialog_text3").style = 
				"position: relative; left: 17%; width: 82%;\
				display: block;\
				font-size: 2.4vh; color: #6DFA0F; font-family: 'kbfont'; text-align: left; word-break: break-word; line-height: 120%;";
			document.getElementById("dvdmenu").style =
				"position: fixed; top: 14vh; left: 50%; transform: translateX(-50%); height: 50vh; width: 50vh;\
				display: block;\
				padding: 1.6vh;\
				border: 1px solid; border-color: #6DFA0F;\
				background-image: url(\"files/sachiko6.png\"); background-attachment: fixed; background-size: cover;\
				font-size: 2.5vh; color: white; font-family: 'kbfont'; text-align: left; line-height: 3.5vh; word-break; break-word; letter-spacing: 0.2vh;";
			document.getElementById("dvdmenu_image").style = 
				"position: relative; top: 0vw; left: 50% transform: translate(-50%, 0%); width: 100%;\
				display: block;";
			document.getElementById("save_text").style = 
				"position: relative; top: 0; left: 50%; transform: translate(-50%, 0%); width: 80%;\
				display: block;\
				font-size: 2.5vh; color: #6DFA0F; font-family: 'kbfont'; text-align: center; letter-spacing: 0.2vh;";
			document.getElementById("save_image").style = 
				"width: 10%;";
			document.getElementById("credits_background").style = 
				"position: fixed; bottom: 7vh; right: 1vh; width: 28vh; height: 25vh;\
				display: block;";
			document.getElementById("credits_text").style = 
				"position: relative; top: 0vw; left: 50%; transform: translate(-50%, 0%); width: 100%;\
				display: block;\
				font-size: 1.9vh; color: lightgray; font-family: 'kbfont'; text-align: center;";
			document.getElementById("dvdmenu_1").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_1").style.cursor = "pointer";
			document.getElementById("dvdmenu_2").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_2").style.cursor = "pointer";
			document.getElementById("dvdmenu_3").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_3").style.cursor = "pointer";
			document.getElementById("dvdmenu_4").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_4").style.cursor = "pointer";
			document.getElementById("dvdmenu_5").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_5").style.cursor = "pointer";
			document.getElementById("dvdmenu_6").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_6").style.cursor = "pointer";
			document.getElementById("dvdmenu_7").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_7").style.cursor = "pointer";
			document.getElementById("dvdmenu_8").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_8").style.cursor = "pointer";
			document.getElementById("dvdmenu_9").style.color = "#6DFA0F";
			document.getElementById("dvdmenu_9").style.cursor = "pointer";
			document.getElementById("dialog_background").style.cursor = "pointer";
			document.getElementById("dialog_background2").style.cursor = "pointer";
			document.getElementById("dialog_background3").style.cursor = "pointer";
 
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
			document.getElementById("button_continue").style = 
				"position: fixed; bottom: 4vh; left: 50%; transform: translateX(-50%); width: 50vh;\
				display: block; cursor: pointer;";
			document.getElementById("button_play").style = 
				"position: fixed; bottom: 4vh; left: 50%; transform: translateX(-50%); width: 60vh;\
				display: block; cursor: pointer;";
			document.getElementById("area").style = 
				"position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);\
				font-family: 'BlackChancery'; color: white; font-size: 4.7vh;";
			document.getElementById("scene").style = 
				"position: fixed; top: 20vh; left: 50%; transform: translateX(-50%);\
				font-size: 3.5vh; color: #caa201; font-family: 'kbfont'; text-align: left; word-break: break-word;\
				background-color: #867319;";
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
		document.getElementById("button_continue").style.visibility = "hidden";
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
		document.getElementById("button_continue").style.visibility = "hidden";
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
			// if cookies (progress saved) exist
			// get cut from URL
			let cookie_cut = parseInt(params.cut);
			if (cookie_cut >= 0)
			{
				document.getElementById("button_continue").style.visibility = "visible";
				document.getElementById("button_play").style.visibility = "hidden";
			}
			// get cut from cookies
			else if (document.cookie.search("cookie_cut=") !== -1)
			{
				document.getElementById("button_continue").style.visibility = "visible";
				document.getElementById("button_play").style.visibility = "hidden";
			}
			// if not
			else
			{
				document.getElementById("button_continue").style.visibility = "hidden";
				document.getElementById("button_play").style.visibility = "visible";
			}
		}
		else
		{
			document.getElementById("dvdmenu").style.visibility = "visible";
			document.getElementById("button_pause").style.visibility = "visible";
			document.getElementById("credits_background").style.visibility = "visible";
			document.getElementById("button_continue").style.visibility = "visible";
			document.getElementById("button_play").style.visibility = "hidden";
		}
	}
	else if (cut === CUT_SPLASHSCREEN_WAIT)
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "hidden";
		document.getElementById("credits_background").style.visibility = "hidden";
		document.getElementById("button_continue").style.visibility = "hidden";
		document.getElementById("button_play").style.visibility = "hidden";
	}
	else
	{
		document.getElementById("dvdmenu").style.visibility = "hidden";
		document.getElementById("button_pause").style.visibility = "visible";
		document.getElementById("credits_background").style.visibility = "hidden";
		// if cookies (progress saved) exist
		// get cut from URL
		let cookie_cut = parseInt(params.cut);
		if (cookie_cut >= 0)
		{
			document.getElementById("button_continue").style.visibility = "visible";
			document.getElementById("button_play").style.visibility = "hidden";
		}
		else if (document.cookie.search("cookie_cut=") !== -1)
		{
			document.getElementById("button_continue").style.visibility = "visible";
			document.getElementById("button_play").style.visibility = "hidden";
		}
		// if not
		else
		{
			document.getElementById("button_continue").style.visibility = "hidden";
			document.getElementById("button_play").style.visibility = "visible";
		}
	}
	// hide things if lowres
	if (lowres < 1) document.getElementById("vhs-filter").style.visibility = "hidden";
	else document.getElementById("vhs-filter").style.visibility = "visible";
	// hide things because of dialogue (and pause menu...))
	if (dialog === "" || cut < 0) { document.getElementById("dialog_background").style.visibility = "hidden"; }
	else { document.getElementById("dialog_background").style.visibility = "visible"; }
	if (dialog2 === "" || cut < 0) { document.getElementById("dialog_background2").style.visibility = "hidden"; }
	else { document.getElementById("dialog_background2").style.visibility = "visible"; }
	if (dialog3 === "" || cut < 0) { document.getElementById("dialog_background3").style.visibility = "hidden"; }
	else { document.getElementById("dialog_background3").style.visibility = "visible"; }
	// hide things because of cut type (%50)
	// hide things because of freeroam timescene "q" variable
	if (cut % MODULUS_FREEROAM_OR_RACE !== 0)
	{
		document.getElementById("scene").style.visibility = "hidden";
	}
	else
	{
		if (q > 0) document.getElementById("scene").style.visibility = "hidden";
		else document.getElementById("scene").style.visibility = "visible";
	}
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0 && (race_state === RACE_DURING || race_state === RACE_AFTER)) document.getElementById("leader").style.visibility = "visible";
	else document.getElementById("leader").style.visibility = "hidden";
	// WASD
	if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE === 0)
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
//! updates the camera
function camera_set()
{
	if (cut < 0 || cut % MODULUS_FREEROAM_OR_RACE !== 0 || frame_counter % 10 === 0)		// for optimization
	{
	if (mobile === true) renderer.setPixelRatio(lowres*window.devicePixelRatio*0.3);
	else renderer.setPixelRatio(lowres*window.devicePixelRatio*0.4);
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
			camera.rotation.y = Math.PI*0.75;//0.7;
			splashscreen_started = true;
		}
		if (cut === CUT_SPLASHSCREEN_WAIT)
		{
			camera.translateZ(-0.2);
			camera.rotation.x -= 0.005;
			camera.rotation.y -= 0.01;
			camera.rotation.z += 0.01;
		}
		else
		{
			camera.position.x = player.position.x;
			camera.position.z = player.position.z;
			if (height_get(camera)+5 >= sealevel+1) camera.position.y = height_get(camera)+5;
			else camera.position.y = sealevel+1+5;
			camera.rotation.set(0, camera.rotation.y, 0);
		}
		if (cut < CUT_SPLASHSCREEN_WAIT)
		{
			camera.rotation.y += 0.001;
			if (key_a) camera.rotation.y += 0.015;
			if (key_d) camera.rotation.y -= 0.015;
			if (key_w) camera.fov -= 1;
			if (key_s) camera.fov += 1;
		}
	}
	// FREEROAM OR RACE
	else if (cut >= 0 && cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		camera = camera_main;
		let camera_distance_from_player;
		if (mobile === true) camera_distance_from_player = 3;
		else camera_distance_from_player = 3.5;
		if (minecraft !== true)
		{
			camera.rotation.x = 0;
			camera.rotation.z = 0;
			camera.rotation.y = player.rotation.y + Math.PI;
		}
		let realrot = player.rotation.y - (2*Math.PI)*Math.floor(player.rotation.y/(2*Math.PI));
		camera_strive_x = player.position.x - camera_distance_from_player*(Math.cos(Math.PI*0.5-realrot));
		camera_strive_z = player.position.z - camera_distance_from_player*(Math.sin(Math.PI*0.5-realrot));
		let strive_dist_x = camera.position.x-camera_strive_x;
		let strive_dist_z = camera.position.z-camera_strive_z;
		if (camera.position.x-camera_strive_x < -0.01) camera.position.x -= 0.3*strive_dist_x;		// det �r 0.3*strive_dist_x som g�r wobblingen i kameran n�r man �ker f�r snabbt!
		else if (camera.position.x-camera_strive_x > 0.01) camera.position.x -= 0.3*strive_dist_x;
		if (camera.position.z-camera_strive_z < -0.01) camera.position.z -= 0.3*strive_dist_z;
		else if (camera.position.z-camera_strive_z > 0.01) camera.position.z -= 0.3*strive_dist_z;
		camera_strive_y = player.position.y+1.6;
		let strive_dist_y = camera.position.y-camera_strive_y;
		if (minecraft !== true)
		{
			if (camera.position.y-camera_strive_y < -0.01) camera.position.y -= 0.34*strive_dist_y;	
			else if (camera.position.y-camera_strive_y > 0.01) camera.position.y -= 0.34*strive_dist_y;
		}
		if (distance_get(camera, player) > 5) camera.position.set(camera_strive_x, camera_strive_y, camera_strive_z);
	}
	// CUTSCENES
	else
	{
		camera = camera_cutscene;
		if (move_player === true && looking_at_object !== shelf)
		{
			while (distance_get(player, looking_at_object) < (2.5*Math.sqrt(looking_at_object.scale.x))-1)
			{
				player.position.x += (player.position.x-looking_at_object.position.x);
				player.position.z += (player.position.z-looking_at_object.position.z);
			}
		}
		if (from_x === 0) camera.position.set(player.position.x, player.position.y+0.5, player.position.z);
		else camera.position.set(from_x, height_get_xz(from_x,from_z), from_z);
		camera.lookAt(looking_at_object.position.x, looking_at_object.position.y + lookheight, looking_at_object.position.z);	// look at character	position.y-0.15
	}
}
//! updates daylight and all other lights (mostly daylight)
function light_set()
{
	if (cut === CUT_FREEROAM_INTRO)
	{
		light.intensity = Math.sin(24*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33;
		let light_red = 10*Math.sin(24*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33;
		let light_green = 10*Math.sin(17*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33;
		let light_blue = 10*Math.sin(31*Math.PI*frame_counter/FRAMES_PER_DAY)+0.33;
		let light_color = new THREE.Color(light_red, light_green, light_blue);
		light.color.set(light_color);
	}
	// all other cuts
	else
	{
		// dark second part
		if (cut >= CUT_FREEROAM_5)
		{
			// day/night
			light.intensity = 0.65*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)) + 0.5;
			// sunset
			let light_red = 0xFF;
			let light_green = 0x7F + 0xFF * 0.5 * Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY+0.2);
			let light_blue = 0x7F + 0xFF * 0.5 * Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY+0.2);
			let light_color = new THREE.Color(light_red/255, light_green/255, light_blue/255);
			light.color.set(light_color);
		}
		else
		{
			// day/night
			light.intensity = 0.87*(Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)) + 0.6;
			// sunset
			let light_red = 0xEF;
			let light_green = 0x5F + 0xFF * 0.5 * Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY+0.2);
			let light_blue = 0x5F + 0xFF * 0.5 * Math.sin(Math.PI*frame_counter/FRAMES_PER_DAY)+0.2;
			let light_color = new THREE.Color(light_red/255, light_green/255, light_blue/255);
			light.color.set(light_color);
			for (let u = -1; u <= 1; u++)
			{
				for (let v = -1; v <= 1; v++)
				{
					if (!(pointsprites_trees[ci1+u][cj1+v] === undefined)) pointsprites_trees[ci1+u][cj1+v].material.color = new THREE.Color((light_red*light.intensity)/255, (light_green*light.intensity)/255, (light_blue*light.intensity)/255);
					if (!(pointsprites_bushes[ci1+u][cj1+v] === undefined)) pointsprites_bushes[ci1+u][cj1+v].material.color = new THREE.Color((light_red*light.intensity)/255, (light_green*light.intensity)/255, (light_blue*light.intensity)/255);
					if (!(pointsprites_grass[ci1+u][cj1+v] === undefined)) pointsprites_grass[ci1+u][cj1+v].material.color = new THREE.Color((light_red*light.intensity)/255, (light_green*light.intensity)/255, (light_blue*light.intensity)/255);
				}
			}
		}
	}
}
// abstraction for fog_set()
function fog_area(fred,fgreen,fblue, from_i1, to_i1, from_j1, to_j1)
{
	// 49 is chunkwidth-1. fade in fog
	if (ci1 === from_i1 || ci1 === to_i1 || cj1 === from_j1 || cj1 === to_j1)
	{
		// intensity
		scene.fog.far = 65;
		if (ci1 === from_i1) scene.fog.far += (9*(49-x_to_x_in_chunk(player.position.x)));
		else if (ci1 === to_i1) scene.fog.far += (9*x_to_x_in_chunk(player.position.x));
		if (cj1 === from_j1) scene.fog.far += (9*(49-x_to_x_in_chunk(player.position.z)));
		else if (cj1 === to_j1) scene.fog.far += (9*x_to_x_in_chunk(player.position.z));
		// color
		let sred = fred;
		let sgreen = fgreen;
		let sblue = fblue;
		let dred = fred-0xBB;		// difference
		let dgreen = fgreen-0xBB;
		let dblue = fblue-0xFF;
		if (ci1 === from_i1)
		{
			sred += -(dred/255)*14*(49-x_to_x_in_chunk(player.position.x));
			sgreen += -(dgreen/255)*14*(49-x_to_x_in_chunk(player.position.x));
			sblue += -(dblue/255)*14*(49-x_to_x_in_chunk(player.position.x));
		}
		else if (ci1 === to_i1)
		{
			sred += -(dred/255)*14*(x_to_x_in_chunk(player.position.x));
			sgreen += -(dgreen/255)*14*(x_to_x_in_chunk(player.position.x));
			sblue += -(dblue/255)*14*(x_to_x_in_chunk(player.position.x));
		}
		if (cj1 === from_j1)
		{
			sred += -(dred/255)*14*(49-x_to_x_in_chunk(player.position.z));
			sgreen += -(dgreen/255)*14*(49-x_to_x_in_chunk(player.position.z));
			sblue += -(dblue/255)*14*(49-x_to_x_in_chunk(player.position.z));
		}
		else if (cj1 === to_j1)
		{
			sred += -(dred/255)*14*(x_to_x_in_chunk(player.position.z));
			sgreen += -(dgreen/255)*14*(x_to_x_in_chunk(player.position.z));
			sblue += -(dblue/255)*14*(x_to_x_in_chunk(player.position.z));
		}
		scene.fog.color.r = sred/255;
		scene.fog.color.g = sgreen/255;
		scene.fog.color.b = sblue/255;
	}
	else
	{
		scene.fog.far = 65;
		scene.fog.color.r = fred/255;
		scene.fog.color.g = fgreen/255;
		scene.fog.color.b = fblue/255;
	}
}
//! updates fog
function fog_set()
{
	// rings
	if ((ci1 >= 39 && ci1 <= 41 && cj1 >= 28 && cj1 <= 30))
	{
		scene.fog.far = 100000;
	}
	else if (cut === CUT_FREEROAM_KILLEPPER && freeroam_killepper_bomb_dropped === true)
	{
		hexcol(scene.fog.color, 0xFFFFFF);
		scene.fog.far = (8 + pseudorandom(frame_counter) + freeroam_killepper_dropped_timer*freeroam_killepper_dropped_timer*0.003) * 0.3*(distance_get(player, sprite_killepper_bomb));
	}
	else if (player.position.y < area_water.position.y-1.6)
	{
		hexcol(scene.fog.color, 0x222244);
		scene.fog.far = 30;
	}
	else if (cut === CUT_FREEROAM_INTRO)
	{
		scene.fog.color = new THREE.Color(0xFF0000);
		scene.fog.far = 50;
	}
	// all other cut's
	else
	{
		// daytime fog
		scene.fog.far = 180;
		scene.fog.color.r = 0xBB/255;
		scene.fog.color.g = 0xBB/255;
		scene.fog.color.b = 0xFF/255;
		// area based fog - areas are now LOCKED 231007
		if ((ci1 >= 32 && ci1 <= 40) && (cj1 >= 32 && cj1 <= 36))	fog_area(0x11,0x07,0xFF, 32,40, 32,36);		// epper bridge and epper land
		else if ((ci1 >= 28 && ci1 <= 31) && (cj1 >= 36 && cj1 <= 40))	fog_area(0xBB,0xBB,0xFF, 28,31, 36,40);		// norway
		else if ((ci1 >= 35 && ci1 <= 40) && (cj1 >= 37 && cj1 <= 42))	fog_area(0x23,0x18,0x20, 35,40, 37,42);		// haftlan-drakh
		else if ((ci1 >= 25 && ci1 <= 27) && (cj1 >= 38 && cj1 <= 41))	fog_area(0x00,0x00,0x65, 25,27, 38,41);		// passage 2 (blue)
		else if ((ci1 >= 25 && ci1 <= 28) && (cj1 >= 26 && cj1 <= 31))	fog_area(0x42,0x40,0x57, 25,28, 26,31);		// dark waters
	}
	// "max"-varden
	if (scene.fog.far > 180) scene.fog.far = 180;
	if (scene.fog.color.r > 0xBB/255) scene.fog.color.r = 0xBB/255;
	if (scene.fog.color.g > 0xBB/255) scene.fog.color.g = 0xBB/255;
	if (scene.fog.color.b > 0xFF/255) scene.fog.color.b = 0xFF/255;
	// calculate fog with current time of day
	scene.fog.color.r *= 0.85*(Math.sin(Math.PI*((frame_counter/FRAMES_PER_DAY)+0.15)));
	scene.fog.color.g *= 0.85*(Math.sin(Math.PI*((frame_counter/FRAMES_PER_DAY)+0.15)));
	scene.fog.color.b *= 0.85*(Math.sin(Math.PI*((frame_counter/FRAMES_PER_DAY)+0.15)));
}
// hides all characters that then can be shown in cut_set()
function hide_cut_sprites()
{
	// sort them!
	sprite_magnet1.visible = false;
	sprite_magnet2.visible = false;
	sprite_magnet3.visible = false;
	sprite_magnet4.visible = false;
	sprite_magnet5.visible = false;
	sprite_magnet6.visible = false;
	for (let t = 0; t < 6; t++) sprite_table[t].visible = false;
	sprite_festivalsign.visible = false;
	sprite_festival.visible = false;
	sprite_magnetdrown_seal.visible = false;
	sprite_cdplayer.visible = false;
	sprite_cappy.visible = false;
	for (let t = 0; t < 5; t++) sprite_license_kocar[t].visible = false;
	sprite_license_5_motcar.visible = false;
	sprite_license_3_car1.visible = false;
	sprite_license_3_car2.visible = false;
	for (let t = 0; t < 9; t++) sprite_fire[t][0].visible = false;
	for (let t = 0; t < 9; t++) sprite_fire[t][1].visible = false;
	for (let t = 0; t < 9; t++) sprite_fire[t][2].visible = false;
	for (let t = 0; t < 9; t++) sprite_fire[t][3].visible = false;
	sprite_spacebar_tiger.visible = false;
}
//+ pauses all character sounds (obvious from name)
function pause_all_cz_sounds()
{
	sound_adele.pause();
	sound_dark_gandalf.pause();
	sound_daddy.pause();
	sound_dogert.pause();
	sound_omalley.pause();
	sound_harass.pause();
	//sound_disonesty.pause();
	sound_mrs_superconductor.pause();
	sound_polish_cow.pause();
	sound_epper.pause();
	sound_cz.pause();
}
//+ LOCKED 231012 - play a sound from the START!
function sound_play(fsound)
{
	fsound.currentTime = 0;
	fsound.play();
}
//+ plays music based on samples and pre-created note sequences (like MIDI, but my own simpler and better format - just write the notes as a string ("A A C C F F C G ")
function sequencer_play()
{
	let speed;
	// tone frequencies: https://pages.mtu.edu/~suits/notefreqs.html
	if (bass[i] === "C") speed = 0.125*1;
	else if (bass[i] === "c") speed = 0.25*1;
	else if (bass[i] === "Z") speed = 0.125*1.06;
	else if (bass[i] === "z") speed = 0.25*1.06;
	else if (bass[i] === "D") speed = 0.125*1.122;
	else if (bass[i] === "d") speed = 0.25*1.122;
	else if (bass[i] === "T") speed = 0.125*1.19;
	else if (bass[i] === "t") speed = 0.25*1.19;
	else if (bass[i] === "E") speed = 0.125*1.26;
	else if (bass[i] === "e") speed = 0.25*1.26;
	else if (bass[i] === "F") speed = 0.125*1.333;
	else if (bass[i] === "f") speed = 0.25*1.333;
	else if (bass[i] === "P") speed = 0.125*1.41;
	else if (bass[i] === "p") speed = 0.25*1.41;
	else if (bass[i] === "G") speed = 0.125*1.5;
	else if (bass[i] === "g") speed = 0.25*1.5;
	else if (bass[i] === "H") speed = 0.125*1.588;
	else if (bass[i] === "h") speed = 0.25*1.588;
	else if (bass[i] === "A") speed = 0.125*1.667;
	else if (bass[i] === "a") speed = 0.25*1.667;
	else if (bass[i] === "V") speed = 0.125*1.78;
	else if (bass[i] === "v") speed = 0.25*1.78;
	else if (bass[i] === "B") speed = 0.125*1.888;
	else if (bass[i] === "b") speed = 0.25*1.888;
	else speed = 0;
	if (speed !== 0)
	{
		let newSource = audiocontext_bass.createBufferSource();
		newSource.buffer = source_bass.buffer;
		newSource.loop = false;
		newSource.playbackRate.value = speed*8;
		newSource.connect(gainnode_bass);
		gainnode_bass.connect(audiocontext_bass.destination);
		gainnode_bass.gain.value = 0.75;
		newSource.start();
	}
	// lead
	if (cb % 2 === 0) b = 0;
	else b = 1;
	if (lead[b][i] === "C") speed = 0.125*1;
	else if (lead[b][i] === "c") speed = 0.25*1;
	else if (lead[b][i] === "Z") speed = 0.125*1.06;
	else if (lead[b][i] === "z") speed = 0.25*1.06;
	else if (lead[b][i] === "D") speed = 0.125*1.122;
	else if (lead[b][i] === "d") speed = 0.25*1.122;
	else if (lead[b][i] === "T") speed = 0.125*1.19;
	else if (lead[b][i] === "t") speed = 0.25*1.19;
	else if (lead[b][i] === "E") speed = 0.125*1.26;
	else if (lead[b][i] === "e") speed = 0.25*1.26;
	else if (lead[b][i] === "F") speed = 0.125*1.333;
	else if (lead[b][i] === "f") speed = 0.25*1.333;
	else if (lead[b][i] === "P") speed = 0.125*1.41;
	else if (lead[b][i] === "p") speed = 0.25*1.41;
	else if (lead[b][i] === "G") speed = 0.125*1.5;
	else if (lead[b][i] === "g") speed = 0.25*1.5;
	else if (lead[b][i] === "H") speed = 0.125*1.588;
	else if (lead[b][i] === "h") speed = 0.25*1.588;
	else if (lead[b][i] === "A") speed = 0.125*1.667;
	else if (lead[b][i] === "a") speed = 0.25*1.667;
	else if (lead[b][i] === "V") speed = 0.125*1.78;
	else if (lead[b][i] === "v") speed = 0.25*1.78;
	else if (lead[b][i] === "B") speed = 0.125*1.888;
	else if (lead[b][i] === "b") speed = 0.25*1.888;
	else speed = 0;
	if (speed !== 0)
	{
		let newSource = audiocontext_lead.createBufferSource();
		newSource.buffer = source_lead.buffer;
		newSource.loop = false;
		newSource.playbackRate.value = speed*4;
		newSource.connect(gainnode_lead);
		gainnode_lead.connect(audiocontext_lead.destination);
		gainnode_lead.gain.value = 0.75;
		newSource.start();
	}
	if (padd[i] === "C") speed = 0.125*1;
	else if (padd[i] === "c") speed = 0.25*1;
	else if (padd[i] === "Z") speed = 0.125*1.06;
	else if (padd[i] === "z") speed = 0.25*1.06;
	else if (padd[i] === "D") speed = 0.125*1.122;
	else if (padd[i] === "d") speed = 0.25*1.122;
	else if (padd[i] === "T") speed = 0.125*1.19;
	else if (padd[i] === "t") speed = 0.25*1.19;
	else if (padd[i] === "E") speed = 0.125*1.26;
	else if (padd[i] === "e") speed = 0.25*1.26;
	else if (padd[i] === "F") speed = 0.125*1.333;
	else if (padd[i] === "f") speed = 0.25*1.333;
	else if (padd[i] === "P") speed = 0.125*1.41;
	else if (padd[i] === "p") speed = 0.25*1.41;
	else if (padd[i] === "G") speed = 0.125*1.5;
	else if (padd[i] === "g") speed = 0.25*1.5;
	else if (padd[i] === "H") speed = 0.125*1.588;
	else if (padd[i] === "h") speed = 0.25*1.588;
	else if (padd[i] === "A") speed = 0.125*1.667;
	else if (padd[i] === "a") speed = 0.25*1.667;
	else if (padd[i] === "V") speed = 0.125*1.78;
	else if (padd[i] === "v") speed = 0.25*1.78;
	else if (padd[i] === "B") speed = 0.125*1.888;
	else if (padd[i] === "b") speed = 0.25*1.888;
	else speed = 0;
	if (speed !== 0)
	{
		let newSource = audiocontext_padd.createBufferSource();
		newSource.buffer = source_padd.buffer;
		newSource.loop = false;
		newSource.playbackRate.value = speed*2;
		newSource.connect(gainnode_padd);
		gainnode_padd.connect(audiocontext_padd.destination);
		gainnode_padd.gain.value = 1;
		newSource.start();
	}
	if (kick[i] === "K" || kick[i] === "k")
	{
		let newSource = audiocontext_kick.createBufferSource();
		newSource.buffer = source_kick.buffer;
		newSource.loop = false;
		newSource.playbackRate.value = 1;
		newSource.connect(gainnode_kick);
		gainnode_kick.connect(audiocontext_kick.destination);
		if (kick[i] === "K") gainnode_kick.gain.value = 1;
		else if (kick[i] === "k") gainnode_kick.gain.value = 0.35;
		gainnode_kick.gain.value = 0.3;
		newSource.start();
	}
	if (snar[i] === "S")
	{
		let newSource = audiocontext_snar.createBufferSource();
		newSource.buffer = source_snar.buffer;
		newSource.loop = false;
		newSource.playbackRate.value = 1;
		newSource.connect(gainnode_snar);
		gainnode_snar.connect(audiocontext_snar.destination);
		gainnode_snar.gain.value = 0.6;
		newSource.start();
	}
	if (hiha[i] === "H" || hiha[i] === "h")
	{
		let newSource = audiocontext_hiha.createBufferSource();
		newSource.buffer = source_hiha.buffer;
		newSource.loop = false;
		newSource.playbackRate.value = 1;
		newSource.connect(gainnode_hiha);
		gainnode_hiha.connect(audiocontext_hiha.destination);
		if (hiha[i] === "H") gainnode_hiha.gain.value = 0.6;
		else if (hiha[i] === "h") gainnode_hiha.gain.value = 0.15;
		newSource.start();
	}
	i++;
	if (i >= bass.length) { cb++; i = 0; }
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
//* abstraction for talk characters in chunk_set()
function talk_char(fsprite, fpos_x, fpos_z, fcut, fdistance, fradius)
{
	// IE
	if (!(fdistance >= 0)) fdistance = 1.3;
	if (!(fradius >= 0)) fradius = 12;
	if (fsprite.visible === false) place_sprite(fsprite, fpos_x, fpos_z);
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		// mouseclick
		if (distance_get(player, fsprite) < fdistance)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick === true) ts_end(fcut);
		}
		// k�r eller st� still
		if (distance_get(player, fsprite) < 50)
		{
			let ch = 68;
			if (fsprite.oname !== undefined) ch = fsprite.oname[0].charCodeAt(0);
			if (Math.floor(frame_counter*0.01*(ch-64)) % 10 > 2 && distance_get(fsprite, player) > 2) fsprite.translateZ(-0.005*(ch-64)*game_speed);
			fsprite.position.y = height_get(fsprite);
			if (Math.random() > 0.95) fsprite.rotation.y += 0.2;
			if (Math.random() > 0.95) fsprite.rotation.y -= 0.2;
			if (Math.random() > 0.9995) fsprite.rotation.y += 1.5;
			if (Math.random() > 0.9995) fsprite.rotation.y -= 1.5;
			if (height_get(fsprite) < area_water.position.y+0.4) fsprite.rotation.y += 3.14;
			if (distance_get_xz(fsprite.position.x,fsprite.position.z, fpos_x,fpos_z) >= fradius) fsprite.rotation.y += 3.14;
		}
	}
}
//* talk_char() but for characters that stand still
function talk_char_still(fsprite, fpos_x, fpos_z, fcut, fdistance)
{
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;
	place_sprite(fsprite, fpos_x, fpos_z);		// this has idle
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && distance_get(player, fsprite) < 1.3)
	{
		sprite_ui_mouseclick.visible = true;
		if (mouseclick === true) ts_end(fcut);
	}
}
//* talk_char() but for characters that stand still, with longer click distance. and flag functionality (race).
function talk_char_flag(fsprite, fpos_x, fpos_z, fcut, fdistance)
{
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;
	place_sprite(fsprite, fpos_x, fpos_z);		// this has idle
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && distance_get(player, fsprite) < 4.5)
	{
		sprite_ui_mouseclick.visible = true;
		if (mouseclick === true) { iwillbeback = true; ts_end(fcut); }
	}
}
//* variant of talk_char() for going to different cuts depending on where certain characters are
function talk_char_where(fsprite, fpos_x, fpos_z, fcut, fcz1, fcz2, fcz3, fcut2)
{
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;
	place_sprite(fsprite, fpos_x, fpos_z);		// this has idle
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && distance_get(player, fsprite) < 1.3)
	{
		sprite_ui_mouseclick.visible = true;
		if (mouseclick === true)
		{
			if (distance_get(cz[fcz1], player) < 15 && distance_get(cz[fcz2], player) < 15 && distance_get(cz[fcz3], player) < 15) ts_end(fcut);
			else ts_end(fcut2);
		}
	}
}
function talk_char_when(fsprite, fpos_x, fpos_z, fcut, fcut_after, fcut_last, fdistance, fradius)
{
	// IE
	if (!(fdistance >= 0)) fdistance = 1.3;
	if (!(fradius >= 0)) fradius = 12;
	if (fsprite.visible === false) place_sprite(fsprite, fpos_x, fpos_z);
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		// mouseclick
		if (distance_get(player, fsprite) < fdistance)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick === true)
			{
				if (cut >= CUT_FREEROAM_MAGNETFACTORY_4) ts_end(fcut_last);
				else if (cut >= CUT_FREEROAM_5) ts_end(fcut_after);
				else ts_end(fcut);
			}
		}
		// k�r eller st� still
		if (distance_get(player, fsprite) < 50)
		{
			let ch = 68;
			if (fsprite.oname !== undefined) ch = fsprite.oname[0].charCodeAt(0);
			if (Math.floor(frame_counter*0.01*(ch-64)) % 10 > 2 && distance_get(fsprite, player) > 2) fsprite.translateZ(-0.005*(ch-64)*game_speed);
			fsprite.position.y = height_get(fsprite);
			if (Math.random() > 0.95) fsprite.rotation.y += 0.2;
			if (Math.random() > 0.95) fsprite.rotation.y -= 0.2;
			if (Math.random() > 0.9995) fsprite.rotation.y += 1.5;
			if (Math.random() > 0.9995) fsprite.rotation.y -= 1.5;
			if (height_get(fsprite) < area_water.position.y+0.4) fsprite.rotation.y += 3.14;
			if (distance_get_xz(fsprite.position.x,fsprite.position.z, fpos_x,fpos_z) >= fradius) fsprite.rotation.y += 3.14;
		}
	}
}
//* variant of talk_char() for going to different cuts depending on which cut you are at (=where in the game's story)
function talk_char_when_still(fsprite, fpos_x, fpos_z, fcut, fcut_after, fcut_last)
{
	// for fewer draw calls
	if (lowres < 1 && distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 15) fsprite.visible = false;
	else if (distance_get_xz(player.position.x,player.position.z, fpos_x,fpos_z) > 35) fsprite.visible = false;
	else fsprite.visible = true;
	place_sprite(fsprite, fpos_x, fpos_z);		// this has idle
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && distance_get(player, fsprite) < 1.3)
	{
		sprite_ui_mouseclick.visible = true;
		if (mouseclick === true)
		{
			if (cut >= CUT_FREEROAM_MAGNETFACTORY_4) ts_end(fcut_last);
			else if (cut >= CUT_FREEROAM_5) ts_end(fcut_after);
			else ts_end(fcut);
		}
	}
}
//! everything related to the current chunk
function chunk_set()
{
	// GENERAL - WEATHER
	pointsprites_rain.position.y -= 0.1;
	if (pointsprites_rain.position.y < player.position.y) pointsprites_rain.position.y = player.position.y+20;
	else if (pointsprites_rain.position.y > player.position.y+40) pointsprites_rain.position.y = player.position.y+20;
	pointsprites_snow.position.y -= 0.1;
	if (pointsprites_snow.position.y < player.position.y) pointsprites_snow.position.y = player.position.y+20;
	else if (pointsprites_snow.position.y > player.position.y+40) pointsprites_snow.position.y = player.position.y+20;
	pointsprites_fume.position.y += 0.1;
	if (pointsprites_fume.position.y < player.position.y-20) pointsprites_fume.position.y = player.position.y;
	else if (pointsprites_fume.position.y > player.position.y+20) pointsprites_fume.position.y = player.position.y;
	// GENERAL - OBJECTS
	place_sprite_noidle(sprite_energydrink2, x_in_chunk_to_x(ci1,pseudorandom(ci1)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1)*49));
	place_sprite_noidle(sprite_energydrink3, x_in_chunk_to_x(ci1,pseudorandom(ci1-10)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1+8)*49));
	place_sprite_noidle(sprite_energydrink4, x_in_chunk_to_x(ci1,pseudorandom(ci1+cj1)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1*ci1)*49));
	place_sprite_noidle(sprite_energydrink5, x_in_chunk_to_x(ci1,pseudorandom(ci1*3)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1*2)*49));
	place_sprite_noidle(sprite_trampoline, x_in_chunk_to_x(ci1,pseudorandom(cj1*5)*49), x_in_chunk_to_x(cj1,pseudorandom(ci1-7)*49));
	if (ci1 === 32 && cj1 === 38) place_sprite_noidle(sprite_trampoline, 1608, 1898);
	if (cut >= CUT_CUTSCENE_DGSLEEP && cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		place_sprite_noidle(sprite_washingmachine2, x_in_chunk_to_x(ci1,pseudorandom(ci1*2)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1*9*ci1)*49)); sprite_washingmachine2.visible = true;
		place_sprite_noidle(sprite_washingmachine3, x_in_chunk_to_x(ci1,pseudorandom(ci1*7*ci1)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1*3+cj1*ci1)*49)); sprite_washingmachine3.visible = true;
		place_sprite_noidle(sprite_washingmachine4, x_in_chunk_to_x(ci1,pseudorandom(ci1*9*cj1)*49), x_in_chunk_to_x(cj1,pseudorandom(cj1*3*cj1+cj1)*49)); sprite_washingmachine4.visible = true;
	}
	else
	{
		sprite_washingmachine2.position.x = 0; sprite_washingmachine2.position.z = 0; sprite_washingmachine2.visible = false;
		sprite_washingmachine3.position.x = 0; sprite_washingmachine3.position.z = 0; sprite_washingmachine3.visible = false;
		sprite_washingmachine4.position.x = 0; sprite_washingmachine4.position.z = 0; sprite_washingmachine4.visible = false;
	}
	if (distance_get(player,sprite_energydrink) < 30) sprite_energydrink.visible = true;
	if (distance_get(player,sprite_energydrink2) < 30) sprite_energydrink2.visible = true;
	if (distance_get(player,sprite_energydrink3) < 30) sprite_energydrink3.visible = true;
	if (distance_get(player,sprite_energydrink4) < 30) sprite_energydrink4.visible = true;
	if (distance_get(player,sprite_trampoline) < 30) sprite_trampoline.visible = true;
	// CHUNK SPECIFIC - MUSIC
	if ((ci1 !== last_chunk_x || cj1 !== last_chunk_z) && music_what_is_playing !== 2)
	{
		if ((ci1 >= 36 && ci1 <= 39) && (cj1 >= 33 && cj1 <= 35)) {		music_play("music_epperland.mp3", 0.1); music_what_is_playing = 0; }		// epper land
		else if ((ci1 >= 33 && ci1 <= 35) && (cj1 >= 33 && cj1 <= 35)) {	music_play("music_epperbridge.mp3", 0.11); music_what_is_playing = 0; }		// epper bridge
		else if ((ci1 >= 36 && ci1 <= 41) && (cj1 >= 27 && cj1 <= 32)) {	music_play("atmosphere_magnet.mp3", 0.08, true, 0.7); music_what_is_playing = 0; } // magnet island
		else if ((ci1 >= 33 && ci1 <= 35) && (cj1 >= 28 && cj1 <= 32)) {	music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// magnet archipelago
		else if ((ci1 >= 32 && ci1 <= 35) && (cj1 >= 36 && cj1 <= 38)) {	music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// tj�rn
		else if ((ci1 >= 29 && ci1 <= 30) && (cj1 >= 35 && cj1 <= 40)) {	music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// norway
		else if ((ci1 >= 31 && ci1 <= 35) && (cj1 >= 39 && cj1 <= 41)) {	music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// hårass land
		else if ((ci1 >= 36 && ci1 <= 39) && (cj1 >= 36 && cj1 <= 41)) {	music_play("haftlansong.mp3", 0.2); music_what_is_playing = 0; }		// haftlan-drakh
		else if ((ci1 >= 29 && ci1 <= 32) && (cj1 >= 28 && cj1 <= 34)) {	music_play("hongkong_music.mp3", 0.1); music_what_is_playing = 0; }		// hongkong/japan
		else if (ci1 === 32 && cj1 === 35) {					music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// pir
		else if (ci1 === 31 && cj1 === 35) {					music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// fire
		else if (ci1 === 31 && cj1 === 38) {					music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// leaves
		else if (ci1 === 28 && cj1 === 33) {					music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// passage 1
		else if ((ci1 >= 26 && ci1 <= 27) && (cj1 >= 33 && cj1 <= 41)) {	music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// passage 2
		else if ((ci1 >= 26 && ci1 <= 30) && cj1 === 41) { 			music_play("morning_birds.mp3", 0.13); music_what_is_playing = 0; }		// passage 3
		else if ((ci1 >= 26 && ci1 <= 27) && (cj1 >= 26 && cj1 <= 31)) {	music_play("haftlansong.mp3", 0.2); music_what_is_playing = 0; }		// dark waters
		else {									music_play("atmosphere_water.mp3", 0.4); music_what_is_playing = 0; }		// (others) water
	}
	// CHUNK SPECIFIC - AREA TEXT
	if (ci1 !== last_chunk_x ||cj1 !== last_chunk_z)
	{
		let last_areatext = document.getElementById("area").innerHTML;
		if ((ci1 >= 36 && ci1 <= 39) && (cj1 >= 33 && cj1 <= 35)) {		document.getElementById("area").innerHTML = "'Epper Land"; }
		else if ((ci1 >= 33 && ci1 <= 35) && (cj1 >= 33 && cj1 <= 35)) {	document.getElementById("area").innerHTML = "'Epper Land"; }
		else if ((ci1 >= 39 && ci1 <= 41) && (cj1 >= 28 && cj1 <= 30)) {	document.getElementById("area").innerHTML = "Rings (not Saturn's)"; }
		else if (ci1 === 38 && cj1 === 28) {					document.getElementById("area").innerHTML = "The Magnet Factory"; }
		else if ((ci1 >= 36 && ci1 <= 41) && (cj1 >= 27 && cj1 <= 32)) {	document.getElementById("area").innerHTML = "GPX 9090-X85"; }
		else if ((ci1 >= 33 && ci1 <= 35) && (cj1 >= 28 && cj1 <= 32)) {	document.getElementById("area").innerHTML = "Bridge of Eternal Doom"; }
		else if ((ci1 >= 32 && ci1 <= 35) && (cj1 >= 36 && cj1 <= 38)) {	document.getElementById("area").innerHTML = "Tjornafjordur"; }
		else if ((ci1 >= 29 && ci1 <= 30) && (cj1 >= 35 && cj1 <= 40)) {	document.getElementById("area").innerHTML = "Bromsefjell"; }
		else if ((ci1 === 31) && (cj1 >= 39 && cj1 <= 41)) {			document.getElementById("area").innerHTML = "Bromsefjell"; }
		else if ((ci1 >= 31 && ci1 <= 35) && (cj1 >= 39 && cj1 <= 41)) {	document.getElementById("area").innerHTML = "Korvh"; }
		else if ((ci1 >= 36 && ci1 <= 39) && (cj1 >= 36 && cj1 <= 41)) {	document.getElementById("area").innerHTML = "Haftlan-Drakh"; }
		else if ((ci1 >= 29 && ci1 <= 32) && (cj1 >= 28 && cj1 <= 34)) {	document.getElementById("area").innerHTML = "HongKong/Japan"; }
		else if (ci1 === 32 && cj1 === 35) {					document.getElementById("area").innerHTML = "Skull Archipelago"; }
		else if (ci1 === 31 && cj1 === 35) {					document.getElementById("area").innerHTML = "Skull Archipelago"; }
		else if (ci1 === 31 && cj1 === 38) {					document.getElementById("area").innerHTML = "Bromsefjell"; }
		else if (ci1 === 28 && cj1 === 33) {					document.getElementById("area").innerHTML = "Aenedor af Tinglyn"; }
		else if ((ci1 >= 26 && ci1 <= 27) && (cj1 >= 33 && cj1 <= 41)) {	document.getElementById("area").innerHTML = "???"; }
		else if ((ci1 >= 26 && ci1 <= 30) && cj1 === 41) { 			document.getElementById("area").innerHTML = "???"; }
		else if ((ci1 >= 26 && ci1 <= 27) && (cj1 >= 26 && cj1 <= 31)) {	document.getElementById("area").innerHTML = "???"; }
		else {									document.getElementById("area").innerHTML = "???"; }
		if (document.getElementById("area").innerHTML !== last_areatext) areatext_timer = 300;
	}
	// CHUNK SPECIFIC - WEATHER
	// rain, fume
	if ((ci1 >= 29-2 && ci1 <= 29+2) && (cj1 >= 41-2 && cj1 <= 41+2))
	{
		pointsprites_rain.position.x = 29*(chunkwidth-1)+25;
		pointsprites_rain.position.z = 41*(chunkwidth-1)+25;
		pointsprites_rain.visible = true;
		pointsprites_fume.position.x = 28*(chunkwidth-1)+25;
		pointsprites_fume.position.z = 41*(chunkwidth-1)+25;
		pointsprites_fume.visible = true;
	}
	else
	{
		pointsprites_rain.visible = false;
	}
	// snow
	if ((ci1 >= 29-1 && ci1 <= 30+1) && (cj1 >= 35-1 && cj1 <= 40+1))
	{
		if (cj1 === 35-1)
		{
			pointsprites_snow.position.x = 29*(chunkwidth-1)+48;
			pointsprites_snow.position.z = 35*(chunkwidth-1)+48;
		}
		else if (cj1 === 40+1)
		{
			pointsprites_snow.position.x = 29*(chunkwidth-1)+48;
			pointsprites_snow.position.z = 40*(chunkwidth-1)+48;
		}
		else
		{
			pointsprites_snow.position.x = 29*(chunkwidth-1)+48;
			pointsprites_snow.position.z = cj1*(chunkwidth-1)+48;
		}
		pointsprites_snow.visible = true;
	}
	else
	{
		pointsprites_snow.visible = false;
	}
// CHUNK SPECIFIC - TALK CHARACTERS (NPCs)
if ((ci1 >= 37-1 && ci1 <= 38+1) && (cj1 >= 29-1 && cj1 <= 29+1)) talk_char_still(sprite_talk_magnetguard, 37*49+4, 29*49+36, 5022201); else sprite_talk_magnetguard.visible = false;
if ((ci1 >= 37-1 && ci1 <= 38+1) && (cj1 >= 29-1 && cj1 <= 29+1)) talk_char_still(sprite_talk_magnetguard2, 37*49+17, 29*49+36, 5022301); else sprite_talk_magnetguard2.visible = false;
if ((ci1 >= 37-1 && ci1 <= 38+1) && (cj1 >= 29-1 && cj1 <= 29+1)) talk_char_still(sprite_talk_magnetguard3, 37*49+30, 29*49+36, 5022401); else sprite_talk_magnetguard3.visible = false;
if ((ci1 >= 37-1 && ci1 <= 38+1) && (cj1 >= 29-1 && cj1 <= 29+1)) talk_char_still(sprite_talk_magnetguard4, 37*49+43, 29*49+36, 5022501); else sprite_talk_magnetguard4.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_still(sprite_talk_moose, 33*49+25, 38*49+25,  5001801); else sprite_talk_moose.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char(sprite_talk_stork, 30*49+25, 33*49+25,  5000101); else sprite_talk_stork.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char(sprite_talk_suit, 30*49+32, 33*49+32,  5001101); else sprite_talk_suit.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_capy, 31*49+26, 30*49+26,  5000201); else sprite_talk_capy.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_sheep, 31*49+31, 30*49+30,  5000601); else sprite_talk_sheep.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_otter, 30*49+24, 31*49+17,  5000501); else sprite_talk_otter.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_zanzibae, 30*49+23, 31*49+11,  5001301); else sprite_talk_zanzibae.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_snake, 30*49+7, 31*49+14,  5001401); else sprite_talk_snake.visible = false;
//bhagz
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 28-1 && cj1 <= 28+1) talk_char_still(sprite_talk_bhagz, 29*49+40, 28*49+40,  5000801);
else if (ci1 >= 39-1 && ci1 <= 39+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char_still(sprite_talk_bhagz, 39*49+15, 36*49+25,  5000901);
else if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char_still(sprite_talk_bhagz, 26*49+25, 41*49+25,  5001001);
else sprite_talk_bhagz.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_tiger, 27*49+25, 40*49+25,  5001201); else sprite_talk_tiger.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_turf, 38*49+25, 39*49+20,  5000301); else sprite_talk_turf.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_nubbs, 38*49+27, 39*49+20,  5000401); else sprite_talk_nubbs.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_seal, 35*49+25, 39*49+20,  5001601); else sprite_talk_seal.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_weesel, 35*49+27, 39*49+20,  5001701); else sprite_talk_weesel.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_baltabird, 35*49+22, 39*49+27,  5002101); else sprite_talk_baltabird.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_aff, 35*49+41, 39*49+24,  5002201); else sprite_talk_aff.visible = false;
if (ci1 >= 34-1 && ci1 <= 34+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_harassdad, 34*49+32, 40*49+22,  5002001); else sprite_talk_harassdad.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_bear, 30*49+9, 38*49+35,  5000701); else sprite_talk_bear.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_disonesty, 29*49+29, 38*49+37,  5001501); else sprite_talk_disonesty.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 41+1) talk_char_still(sprite_harassplane1, 1830, 1985, 5000051); else sprite_harassplane1.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 41+1) talk_char_still(sprite_harassplane2, 1828, 1984, 5000051); else sprite_harassplane2.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 41+1) talk_char_still(sprite_harassplane3, 1829, 1987, 5000051); else sprite_harassplane3.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 41+1) talk_char_still(sprite_harassplane4, 1827, 1986, 5000051); else sprite_harassplane4.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_dogertbush, 1873, 1924,  5001901); else sprite_dogertbush.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_1, 1657, 1961,  5002301); else sprite_talk_1.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char_when_still(sprite_talk_2, 1533.9, 1981.9,  5002401,  5002451); else sprite_talk_2.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_3, 1822.8, 1474.5,  5002501); else sprite_talk_3.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_4, 1833.4, 1468.3,  5002601); else sprite_talk_4.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_5, 1842.4, 1473.2,  5002701); else sprite_talk_5.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_6, 1830.6, 1492.4,  5002801); else sprite_talk_6.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_7, 1826, 1516,  5002901); else sprite_talk_7.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_8, 1625.4, 1898.2,  5003001,  5003051); else sprite_talk_8.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_9, 1639.4, 1890.6,  5003101,  5003151); else sprite_talk_9.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_10, 1498, 1942,  5003201); else sprite_talk_10.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_11, 1495, 1948,  5003301); else sprite_talk_11.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char_when_still(sprite_talk_12, 1492, 1945,  5003401,  5003451); else sprite_talk_12.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_13, 1779.5, 1475.5,  5003501); else sprite_talk_13.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_14, 1779.5, 1478.5,  5003601); else sprite_talk_14.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_15, 1780.5, 1481.5,  5003701); else sprite_talk_15.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_16, 1779.5, 1485.5,  5003801); else sprite_talk_16.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_17, 1783.5, 1486.5,  5003901); else sprite_talk_17.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_18, 1787.5, 1489.5,  5004001); else sprite_talk_18.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_19, 1784.5, 1482.5,  5004101); else sprite_talk_19.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_20, 1783.5, 1478.5,  5004201); else sprite_talk_20.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_21, 1787.5, 1474.5,  5004301); else sprite_talk_21.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_22, 1791.5, 1477.5,  5004401); else sprite_talk_22.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_23, 1790.5, 1482.5,  5004501); else sprite_talk_23.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_when_still(sprite_talk_24, 1549.5, 1450.5,  5004601,  5004651); else sprite_talk_24.visible = false;
//if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_25, 1610.5, 1897.5,  5004701); else sprite_talk_25.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_26, 1908.9, 1889.1,  5004801); else sprite_talk_26.visible = false;
// council of beavers
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_27, 1410.5, 1635.5,  5004901); else sprite_talk_27.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_28, 1410.5, 1633.5,  5004901); else sprite_talk_28.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_29, 1410.5, 1631.5,  5004901); else sprite_talk_29.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_30, 1410.5, 1629.5,  5004901); else sprite_talk_30.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_31, 1410.5, 1627.5,  5004901); else sprite_talk_31.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_32, 1408.5, 1627.5,  5004901); else sprite_talk_32.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_33, 1406.5, 1627.5,  5004901); else sprite_talk_33.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_34, 1404.5, 1627.5,  5004901); else sprite_talk_34.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_35, 1402.5, 1627.5,  5004901); else sprite_talk_35.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_36, 1400.5, 1627.5,  5004901); else sprite_talk_36.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_37, 1398.5, 1627.5,  5004901); else sprite_talk_37.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_38, 1396.5, 1627.5,  5004901); else sprite_talk_38.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_39, 1394.5, 1627.5,  5004901); else sprite_talk_39.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_40, 1392.5, 1627.5,  5004901); else sprite_talk_40.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_41, 1390.5, 1627.5,  5004901); else sprite_talk_41.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_42, 1388.5, 1627.5,  5004901); else sprite_talk_42.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_43, 1386.5, 1627.5,  5004901); else sprite_talk_43.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_44, 1386.5, 1629.5,  5004901); else sprite_talk_44.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_45, 1385.5, 1630.5,  5004901); else sprite_talk_45.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_46, 1385.5, 1632.5,  5004901); else sprite_talk_46.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_47, 1385.5, 1634.5,  5004901); else sprite_talk_47.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_48, 1386.5, 1635.5,  5004901); else sprite_talk_48.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_49, 1387.5, 1635.5,  5004901); else sprite_talk_49.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_50, 1389.5, 1635.5,  5004901); else sprite_talk_50.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_51, 1391.5, 1635.5,  5004901); else sprite_talk_51.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_52, 1393.5, 1634.5,  5004901); else sprite_talk_52.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_53, 1395.5, 1634.5,  5004901); else sprite_talk_53.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_54, 1399.5, 1634.5,  5004901); else sprite_talk_54.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_55, 1401.5, 1634.5,  5004901); else sprite_talk_55.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_56, 1403.5, 1634.5,  5004901); else sprite_talk_56.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_57, 1405.5, 1634.5,  5004901); else sprite_talk_57.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_58, 1407.5, 1634.5,  5004901); else sprite_talk_58.visible = false;
//
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_59, 1628.4, 1890.4,  5008101,  5008151); else sprite_talk_59.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_60, 1736.5, 1706.5,  5008201,  5008251); else sprite_talk_60.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_61, 1523.5, 1896.5,  5008301); else sprite_talk_61.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_62, 1622.5, 1890.5,  5008401); else sprite_talk_62.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_63, 1464.5, 1541.5,  5008501); else sprite_talk_63.visible = false;
//if (distance_get(player, sprite_talk_63) < 50) talk_char(sprite_talk_63, 1464.5, 1541.5,  5008501); else sprite_talk_63.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_64, 1462.5, 1526.5,  5008601); else sprite_talk_64.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char(sprite_talk_65, 1433.5, 1781.5,  5008701); else sprite_talk_65.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_66, 1342.5, 1704.5,  5008801,  5008851); else sprite_talk_66.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char(sprite_talk_67, 1539.5, 1685.5,  5008901); else sprite_talk_67.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_68, 1905.5, 1885.5,  5009001); else sprite_talk_68.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char_when_still(sprite_talk_69, 1516.5, 1474.5,  5009101,  5009151); else sprite_talk_69.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char_when_still(sprite_talk_70, 1562.5, 1534.5,  5009201,  5009251); else sprite_talk_70.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 28-1 && cj1 <= 28+1) talk_char_when_still(sprite_talk_71, 1465.5, 1398.5,  5009301,  5009351); else sprite_talk_71.visible = false;
if (cut >= CUT_FREEROAM_5 && ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char(sprite_talk_72, 1432.5, 1800.5,  5009401); else sprite_talk_72.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_73, 1515.5, 1686.5,  5009501,  5009551); else sprite_talk_73.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_74, 1540.5, 1679.5,  5009601,  5009651); else sprite_talk_74.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_75, 1507.5, 1677.5,  5009701,  5009751); else sprite_talk_75.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_76, 1508.5, 1674.5,  5009801,  5009851); else sprite_talk_76.visible = false;
if (ci1 >= 34-1 && ci1 <= 34+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_when_still(sprite_talk_77, 1688.5, 1676.5,  5009901,  5009951); else sprite_talk_77.visible = false;
if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_78, 1605.5, 1891.5,  5010001,  5010051); else sprite_talk_78.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_79, 1423.5, 1921.5,  5010101); else sprite_talk_79.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char(sprite_talk_80, 1427.5, 1425.5,  5010201); else sprite_talk_80.visible = false;
if (ci1 >= 34-1 && ci1 <= 34+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char(sprite_talk_81, 1676.5, 1686.5,  5010301); else sprite_talk_81.visible = false;
if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_82, 1607.5, 1896.5,  5010401,  5010451); else sprite_talk_82.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_83, 1618.5, 1827.5,  5010501); else sprite_talk_83.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_84, 1485.6, 1965.1,  5010601); else sprite_talk_84.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_85, 1488.5, 1967.5,  5010701); else sprite_talk_85.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char(sprite_talk_86, 1450.0, 2023.2,  5010801); else sprite_talk_86.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char(sprite_talk_87, 1437.0, 2034.6,  5010901); else sprite_talk_87.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char(sprite_talk_88, 1432.1, 2036.9,  5011001); else sprite_talk_88.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_89, 1287.7, 1828.5,  5011101); else sprite_talk_89.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_when_still(sprite_talk_90, 1283.9, 1826.6,  5011201,  5011251); else sprite_talk_90.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_92, 1726.7, 1990.9,  5011401); else sprite_talk_92.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_93, 1313.5, 1988.5,  5011501); else sprite_talk_93.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 35-1 && cj1 <= 35+1) talk_char(sprite_talk_94, 1835.6, 1759.0,  5011601); else sprite_talk_94.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char(sprite_talk_95, 1499.5, 1636.5,  5011701); else sprite_talk_95.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char(sprite_talk_96, 1459.4, 1439.6,  5011801); else sprite_talk_96.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_when_still(sprite_talk_97, 1500.3, 1429.0,  5011901,  5011951); else sprite_talk_97.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_still(sprite_talk_98, 1513.5, 1441.5,  5012001); else sprite_talk_98.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_still(sprite_talk_99, 1511.5, 1440.5,  5012101); else sprite_talk_99.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_still(sprite_talk_100, 1510.5, 1442.5,  5012201); else sprite_talk_100.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_101, 1496.5, 1971.5,  5012301); else sprite_talk_101.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_102, 1495.5, 1968.5,  5012401); else sprite_talk_102.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char_when_still(sprite_talk_103, 1498.5, 1969.5,  5012501,  5012551); else sprite_talk_103.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char_when_still(sprite_talk_104, 1500.1, 1968.2,  5012601,  5012651); else sprite_talk_104.visible = false;
// harassar
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_105, 1721.5, 1983.5,  5012701); else sprite_talk_105.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_106, 1727.5, 1983.5,  5012801); else sprite_talk_106.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_107, 1731.5, 1986.5,  5012901); else sprite_talk_107.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_108, 1733.5, 1994.5,  5013001); else sprite_talk_108.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_109, 1722.5, 1991.5,  5013101); else sprite_talk_109.visible = false;
//
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_110, 1857.5, 1477.5,  5013201); else sprite_talk_110.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_111, 1815.5, 1491.5,  5013301); else sprite_talk_111.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char(sprite_talk_112, 1324.5, 1677.5,  5013401); else sprite_talk_112.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 35-1 && cj1 <= 35+1) talk_char(sprite_talk_113, 1343.5, 1723.5,  5013501); else sprite_talk_113.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_114, 1870.5, 1505.5,  5013601); else sprite_talk_114.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 35-1 && cj1 <= 35+1) talk_char(sprite_talk_115, 1834.2, 1762.9,  5013701); else sprite_talk_115.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_when_still(sprite_talk_116, 1353.5, 1831.5,  5013801,  5013851); else sprite_talk_116.visible = false;
// baba
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char_when_still(sprite_talk_117, 1311.5, 1918.5,  5013901,  5013951); else sprite_talk_117.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_118, 1313.5, 1918.5,  5013901); else sprite_talk_118.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_119, 1315.5, 1918.5,  5013901); else sprite_talk_119.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_120, 1317.5, 1918.5,  5013901); else sprite_talk_120.visible = false;
//
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_121, 1337.5, 1879.5,  5014301,  5014351); else sprite_talk_121.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_122, 1307.9, 1869.6,  5014401,  5014451); else sprite_talk_122.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_123, 1444.5, 1936.5,  5014501); else sprite_talk_123.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_124, 1353.5, 1924.5,  5014601); else sprite_talk_124.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_125, 1356.5, 1928.5,  5014701); else sprite_talk_125.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_126, 1901.9, 1895.1,  5014801); else sprite_talk_126.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_127, 1897.5, 1885.5,  5014901); else sprite_talk_127.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_128, 1899.5, 1906.5,  5015001); else sprite_talk_128.visible = false;
if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_129, 1613.5, 1890.5,  5015101,  5015151); else sprite_talk_129.visible = false;
if (cut < CUT_FREEROAM_5 && ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char(sprite_talk_130, 1434.5, 1800.5,  5015201); else sprite_talk_130.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char_when_still(sprite_talk_131, 1316.5, 1801.5,  5015301,  5015351); else sprite_talk_131.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_where(sprite_talk_132, 1495.5, 1427.5,  5015401, 1, 1, 1,  5015451); else sprite_talk_132.visible = false;
//if (ci1 >= 34-1 && ci1 <= 34+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_where(sprite_talk_133, 1686.7, 1834.1,  5015501, 1, 1, 1,  5015551); else sprite_talk_133.visible = false;
//if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 32-1 && cj1 <= 32+1) talk_char(sprite_talk_134, 1579.5, 1569.5,  5015601); else sprite_talk_134.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_135, 1539.9, 1903.4,  5015701); else sprite_talk_135.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 32-1 && cj1 <= 32+1) talk_char(sprite_talk_136, 1532.5, 1605.5,  5015801); else sprite_talk_136.visible = false;
// sido-stories - ska vara osynliga objekt!
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char_still(sprite_talk_137, 1537.5, 1494.5,  5015901); else sprite_talk_137.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_138, 1491.5, 1540.5,  5016001); else sprite_talk_138.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_139, 1476.5, 1525.5,  5016101); else sprite_talk_139.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_still(sprite_talk_140, 1445.5, 1822.5,  5016201); else sprite_talk_140.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_141, 1282.5, 1821.5,  5016301); else sprite_talk_141.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_still(sprite_talk_142, 1884.5, 1898.5,  5016401); else sprite_talk_142.visible = false;
if (ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char(sprite_talk_144, 1461.5, 1433.5,  5016601); else sprite_talk_144.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char(sprite_talk_145, 1821.5, 1809.5,  5016701); else sprite_talk_145.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_146, 1822.5, 1980.5,  5016801); else sprite_talk_146.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_147, 1493.5, 1543.5,  5016901); else sprite_talk_147.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_148, 1818.2, 1978.7,  5017001); else sprite_talk_148.visible = false;
if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_149, 1571.5, 1560.5,  5017101); else sprite_talk_149.visible = false;
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char_still(sprite_talk_150, 1901.5, 1929.5,  5017201); else sprite_talk_150.visible = false;
if (ci1 >= 39-1 && ci1 <= 39+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_151, 1912.5, 1948.5,  5017301); else sprite_talk_151.visible = false;
//
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_when_still(sprite_talk_152, 1406.5, 1648.5,  5017401,  5017451); else sprite_talk_152.visible = false;
if (ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_still(sprite_talk_153, 1387.5, 1648.5,  5017501); else sprite_talk_153.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char(sprite_talk_154, 1475.5, 1537.5,  5017601); else sprite_talk_154.visible = false;
// sido-stories
if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char_still(sprite_talk_155, 1890.5, 1957.5,  5017701); else sprite_talk_155.visible = false;
// harass dagbok
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_156, 1833.5, 1991.5,  5017801); else sprite_talk_156.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_157, 1842.5, 1992.5,  5017901); else sprite_talk_157.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_158, 1845.5, 2001.5,  5018001); else sprite_talk_158.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_159, 1826.5, 2001.5,  5018101); else sprite_talk_159.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_160, 1834.5, 2005.5,  5018201); else sprite_talk_160.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char(sprite_talk_161, 1840.5, 2004.5,  5018301); else sprite_talk_161.visible = false;
if (ci1 >= 37-1 && ci1 <= 37+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char(sprite_talk_162, 1845.5, 2009.5,  5018401); else sprite_talk_162.visible = false;
//
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_164, 1637.7, 1839.2,  5018601); else sprite_talk_164.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_165, 1634.5, 1854.6,  5018701); else sprite_talk_165.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_166, 1620.2, 1848.9,  5018801); else sprite_talk_166.visible = false;
if (ci1 >= 34-1 && ci1 <= 34+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char(sprite_talk_167, 1713.5, 1812.3,  5018901); else sprite_talk_167.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char(sprite_talk_168, 1720.9, 1812.2,  5019001); else sprite_talk_168.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_when_still(sprite_talk_169, 1717.1, 1813.8,  5019101,  5019151); else sprite_talk_169.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_170, 1738.4, 1833.4,  5019201); else sprite_talk_170.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_171, 1735.5, 1835.8,  5019301); else sprite_talk_171.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char(sprite_talk_172, 1729.1, 1833.0,  5019401); else sprite_talk_172.visible = false;
if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char(sprite_talk_173, 1725.7, 1884.3,  5019501); else sprite_talk_173.visible = false;
if (ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 39-1 && cj1 <= 39+1) talk_char(sprite_talk_174, 1789.2, 1922.1,  5019601); else sprite_talk_174.visible = false;
// telefon
if (ci1 >= 34-1 && ci1 <= 34+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_still(sprite_talk_175, 1694.0, 1830.1, 5019701); else sprite_talk_175.visible = false;
if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char_still(sprite_talk_177, 1578.1, 1801.6,  5019901); else sprite_talk_177.visible = false;
if (ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char_still(sprite_talk_178, 1576.8, 1810.0,  5020001); else sprite_talk_178.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_when_still(sprite_talk_180, 1358.7, 1815.4,  5020201,  5020251); else sprite_talk_180.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_when_still(sprite_talk_182, 1349.2, 1850.8,  5020401,  5020451); else sprite_talk_182.visible = false;
if (ci1 >= 27-1 && ci1 <= 27+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_183, 1348.9, 1886.1,  5020501,  5020551); else sprite_talk_183.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char_when_still(sprite_talk_184, 1479.9, 2036.4,  5020601,  5020651); else sprite_talk_184.visible = false;
if (ci1 >= 33-1 && ci1 <= 33+1 && cj1 >= 38-1 && cj1 <= 38+1) talk_char_when_still(sprite_talk_185, 1621.1, 1886.5,  5020701,  5020751); else sprite_talk_185.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_188, 1505.6, 1507.8,  5021001); else sprite_talk_188.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_189, 1507.0, 1506.3,  5021001); else sprite_talk_189.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char(sprite_talk_190, 1505.8, 1506.0,  5021001); else sprite_talk_190.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_when_still(sprite_talk_191, 1524.1, 1463.7,  5021301,  5021351); else sprite_talk_191.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 31-1 && cj1 <= 31+1) talk_char_when_still(sprite_talk_192, 1494.2, 1520.1,  5021401,  5021451); else sprite_talk_192.visible = false;
if (ci1 >= 30-1 && ci1 <= 30+1 && cj1 >= 30-1 && cj1 <= 30+1) talk_char_when_still(sprite_talk_193, 1518.0, 1514.6,  5021501,  5021551); else sprite_talk_193.visible = false;
if (ci1 >= 31-1 && ci1 <= 31+1 && cj1 >= 33-1 && cj1 <= 33+1) talk_char_when_still(sprite_talk_194, 1546.3, 1660.6,  5021601,  5021651); else sprite_talk_194.visible = false;
// telefon
//if (ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char_still(sprite_talk_195, 1868.4, 1966.9, CUT_CUTSCENE_PISSANDSHIT); else sprite_talk_195.visible = false;
if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 35-1 && cj1 <= 35+1) talk_char_still(sprite_talk_196, 1288.7, 1745.6, CUT_CUTSCENE_SPACEBAR); else sprite_talk_196.visible = false;
// race - man m�ste g� tillbaka till cut:en innan och inte forts�tta p� efter-racet:s standard-story!!
if (!(cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0))	// not during race
{
//	if (cut >= CUT_RACE_1 && ci1 >= 32-1 && ci1 <= 32+1 && cj1 >= 37-1 && cj1 <= 37+1) talk_char_flag(sprite_talk_163, 1586.0, 1820.8, CUT_RACE_1, 5); else sprite_talk_163.visible = false;
//	if (cut >= CUT_RACE_EPPER && ci1 >= 36-1 && ci1 <= 36+1 && cj1 >= 34-1 && cj1 <= 34+1) talk_char_flag(sprite_talk_200, 1786.0, 1681.8, CUT_RACE_EPPER, 5); else sprite_talk_200.visible = false;
//	if (cut >= CUT_RACE_DGTRAVEL && ci1 >= 29-1 && ci1 <= 29+1 && cj1 >= 29-1 && cj1 <= 29+1) talk_char_flag(sprite_talk_201, 1465.0, 1459.8, CUT_RACE_DGTRAVEL, 5); else sprite_talk_201.visible = false;
// ...	if (ci1 >= 35-1 && ci1 <= 35+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char_flag(sprite_talk_202, 1758.0, 1970.8, CUT_RACE_HAFTLAN, 5); else sprite_talk_202.visible = false;
// ...	if (ci1 >= 26-1 && ci1 <= 26+1 && cj1 >= 40-1 && cj1 <= 40+1) talk_char_flag(sprite_talk_203, 1301.0, 1974.8, CUT_RACE_SPEED, 5); else sprite_talk_203.visible = false;
}
else
{
	sprite_talk_163.visible = false;
	sprite_talk_200.visible = false;
//	sprite_talk_201.visible = false;
//	sprite_talk_202.visible = false;
//	sprite_talk_203.visible = false;
}
if (bhagz_bitchslap === 1 && ci1 >= 28-1 && ci1 <= 28+1 && cj1 >= 41-1 && cj1 <= 41+1) talk_char_still(sprite_talk_204, 1390.2, 2032.4,  5022601); else sprite_talk_204.visible = false;
if (bhagz_scartcable === 1 && ci1 >= 38-1 && ci1 <= 38+1 && cj1 >= 36-1 && cj1 <= 36+1) talk_char_still(sprite_talk_205, 1903.6, 1805.6,  5022701); else sprite_talk_205.visible = false;
// ej talk-karakt�rer...
if (bhagz_fuckyou === 1 && cz_turned_on[1] === 1)
{
	if (cut % MODULUS_FREEROAM_OR_RACE === 0 && distance_get(player, cz[1]) < 3)
	{
		sprite_ui_mouseclick.visible = true;
		if (mouseclick === true) ts_end(CUT_CUTSCENE_DGFUCKYOU);
	}
}
// CHUNK SPECIFIC - RACE FARAWAY
let logdist = 0.175*Math.log(distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][0],mesh_checkpoint_z[race_number][0])-20);
if (logdist <= 0) logdist = 0;
if (logdist >= 0.95) logdist = 0.95;
// .. add this in EPISODE 2?
// .. l�gg till flera?
//if (!(cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0))	// not during race
//{
//	race_faraway_1.visible = true;
//	race_faraway_1.position.x = mesh_checkpoint_x[race_number][0] - logdist*(mesh_checkpoint_x[race_number][0]-player.position.x);
//	race_faraway_1.position.z = mesh_checkpoint_z[race_number][0] - logdist*(mesh_checkpoint_z[race_number][0]-player.position.z);
//	if (!(logdist >= 0))
//	{
//		race_faraway_1.position.x = mesh_checkpoint_x[race_number][0];
//		race_faraway_1.position.z = mesh_checkpoint_z[race_number][0];
//	}
//	race_faraway_1.position.y = 51;
//}
//else
//{
//	race_faraway_1.visible = false;
//}
	// CHUNK SPECIFIC - SPECIAL CASES
	// rings
	if (ci1 >= 39 && ci1 <= 41 && cj1 >= 28 && cj1 <= 30)
	{
		mesh_globe.visible = true;
		mesh_globe.position.x = 40*(chunkwidth-1)+25;
		mesh_globe.position.z = 29*(chunkwidth-1)+25;
		mesh_globe.position.y = sealevel-5;
		mesh_globe.rotation.y += 0.002;
		mesh_space.visible = true;
		mesh_space.position.x = 40*(chunkwidth-1)+25;
		mesh_space.position.z = 29*(chunkwidth-1)+25;
		mesh_space.position.y = 98;
		mesh_space.rotation.y -= 0.0003;
		area_water.visible = false;
		mesh_cloudbox.visible = false;
	}
	else
	{
		mesh_globe.visible = false;
		mesh_space.visible = false;
		area_water.visible = true;
		mesh_cloudbox.visible = true;
	}
	// gym
	if (ci1 === 32 && cj1 === 38)
	{
		for (let t = 0; t < 6; t++) { sprite_gym_thing[t].visible = true; sprite_gym_thing_trash[t].visible = true; }
		if (distance_get(player, sprite_gym_thing[3]) < 0.5 && Math.abs(player.position.y-sprite_gym_thing[3].position.y) < 2) { sound_play(sound_punch); speed -= 0.03; }	// punching bag
		if (cut === CUT_FREEROAM_GYM)	// adele's dumbbell
		{
			sprite_gym_thing[2].position.x = freeroam_gym_position_x;
			sprite_gym_thing[2].position.z = freeroam_gym_position_z;
			if (dumbbell_up === 1)
			{
				sprite_gym_thing[2].position.y += 0.02;
				if (sprite_gym_thing[2].position.y > height_get(sprite_gym_thing[2])+1.1) dumbbell_up = 0;
			}
			if (dumbbell_up === 0)
			{
				sprite_gym_thing[2].position.y -= 0.02;
				if (sprite_gym_thing[2].position.y < height_get(sprite_gym_thing[2])+0.4) dumbbell_up = 1;
			}
		}
		else { place_sprite_noidle(sprite_gym_thing[2], 1607, 1892); }
		if (distance_get(player, sprite_gym_thing[5]) < 0.67 && Math.abs(player.position.y-sprite_gym_thing[5].position.y) < 2)	// dumbbell
		{
			if (sound_manlygrunt.paused === true) sound_manlygrunt.play();
			if (dumbbell_up === 1)
			{
				sprite_gym_thing[5].position.y += 0.02;
				if (sprite_gym_thing[5].position.y > height_get(sprite_gym_thing[5])+1.1) dumbbell_up = 0;
			}
			if (dumbbell_up === 0)
			{
				sprite_gym_thing[5].position.y -= 0.02;
				if (sprite_gym_thing[5].position.y < height_get(sprite_gym_thing[5])+0.4) dumbbell_up = 1;
			}
		}
		else { sound_manlygrunt.pause(); place_sprite_noidle(sprite_gym_thing[5], freeroam_gym_position_x, freeroam_gym_position_z-3); }
		if (distance_get(player, sprite_gym_thing[4]) < 1.5)	// l�pband
		{
			if (distance_get(player, sprite_gym_thing[4]) < 0.3) speed *= -0.1;
			if (sound_treadmill.paused === true) sound_treadmill.play();
			sprite_ui_mouseclick.visible = true;
			if (mouseclick === true)
			{
				player.translateZ(0.36);
				lopband += 0.001;
			}
			else
			{
				player.translateZ(-lopband);
			}
		}
		else { sound_treadmill.pause(); lopband = 0.02; }
		sprite_gym_thing[4].material.color.r = 0x8*(lopband-0.02)*14;
		place_sprite_noidle(sprite_gym_thing[0], freeroam_gym_position_x, freeroam_gym_position_z+1);
		place_sprite_noidle(sprite_gym_thing[1], freeroam_gym_position_x, freeroam_gym_position_z+1.8);
		//
		place_sprite_noidle(sprite_gym_thing[3], freeroam_gym_position_x+3, freeroam_gym_position_z-1);
		place_sprite_noidle(sprite_gym_thing[4], 1612, 1897);
		//
		place_sprite_noidle(sprite_gym_thing[6], freeroam_gym_position_x+6, freeroam_gym_position_z-1);
		place_sprite_noidle(sprite_gym_thing[7], freeroam_gym_position_x+6, freeroam_gym_position_z+1);
	}
	else
	{
		for (let t = 0; t < 8; t++) { sprite_gym_thing[t].visible = false; sprite_gym_thing_trash[t].visible = false; }
	}
	if (ci1 === 38 && cj1 === 38)
	{
		for (let t = 0; t < 50; t++)
		{
			place_sprite_noidle(sprite_antique[t], auction_position_x-14*pseudorandom(t), auction_position_z-14*pseudorandom(2*t));
		}
	}
	// train
	if (ci1 >= 25 && ci1 <= 27 && cj1 >= 28 && cj1 <= 30)
	{
		mesh_train.visible = true;
		mesh_train.position.x = freeroam_magnetdrown_train_x;
		mesh_train.position.z = freeroam_magnetdrown_train_z;
		mesh_train.position.y = sealevel+1;
		mesh_train.rotation.y = 0.5*Math.PI;
		mesh_train.rotation.z = 0.3*Math.PI;
	}
	else
	{
		mesh_train.visible = false;
	}
	gamehasstarted = true;
}
//! first person shooter gameplay code
function gameplay_fps()
{
	// inget far ga utanfor chunks har!!
	sprite_fff1.visible = false;
	sprite_fff2.visible = false;
	sprite_fff3.visible = false;
	sprite_fff4.visible = false;
	if (eshot_timer > 0)
	{
		sprite_fff1.position.set(cz[6].position.x, cz[6].position.y, cz[6].position.z);
		sprite_fff2.position.set(cz[6].position.x, cz[6].position.y, cz[6].position.z);
		sprite_fff3.position.set(cz[6].position.x, cz[6].position.y, cz[6].position.z);
		sprite_fff4.position.set(cz[6].position.x, cz[6].position.y, cz[6].position.z);
		if (frame_counter % 20 > 15) sprite_fff1.visible = true;
		else if (frame_counter % 20 > 10) sprite_fff2.visible = true;
		else if (frame_counter % 20 > 5) sprite_fff3.visible = true;
		else sprite_fff4.visible = true;
	}
	else if (shot_timer > 0)
	{
		sprite_fff1.position.set(player.position.x, player.position.y, player.position.z);
		sprite_fff2.position.set(player.position.x, player.position.y, player.position.z);
		sprite_fff3.position.set(player.position.x, player.position.y, player.position.z);
		sprite_fff4.position.set(player.position.x, player.position.y, player.position.z);
		if (frame_counter % 20 > 15) sprite_fff1.visible = true;
		else if (frame_counter % 20 > 10) sprite_fff2.visible = true;
		else if (frame_counter % 20 > 5) sprite_fff3.visible = true;
		else sprite_fff4.visible = true;
	}
	// player
	if (shot_timer > 0) { shot_timer--; }
	for (let t = 0; t < 3; t++)
	{
		if (fayah_timer[t] > 0)
		{
			fayah_timer[t]--;
			sprite_fayah[t].visible = true;
			sprite_fayah[t].translateZ(0.25);
			sprite_fayah[t].position.y -= 0.03;
			if (sprite_fayah[t].position.y <= height_get(sprite_fayah[t])-0.4)
			{
				if (sprite_fayah[t].position.y <= height_get(sprite_fayah[t])-0.7)
				{
					fayah_timer[t] = 0;
					sound_play(sound_poof);
				}
				else
				{
					sprite_fayah[t].position.y += 0.1;
				}
			}
			let obf = object_get(sprite_fayah[t]);
			if (obf === ASCEND_HOUSE || obf === ASCEND_SKYSCRAPER || obf === ASCEND_BARN)
			{
				fayah_timer[t] = 0;
				sound_play(sound_poof);
			}
			if (eshot_timer <= 0 && distance_get(cz[6], sprite_fayah[t]) < 0.5 && cz[6].position.y-sprite_fayah[t].position.y < 2)
			{
				fayah_timer[t] = 0;
				sound_play(sound_gunshot);
				eshot_timer = 120;
				cz[6].material.color.g -= 0.05;
				cz[6].material.color.b -= 0.05;
			}
		}
		else
		{
			sprite_fayah[t].visible = false;
		}
		// bullet against bullet
		if (efayah_timer > 0 && distance_get(sprite_fayah[t], sprite_efayah) < 1) { fayah_timer[t] = 0; efayah_timer = 0; }
	}
	// enemy
	if (eshot_timer > 0) { cz_speed[6] = 0.02; eshot_timer--; }
 	if (q >= 0.25 && eshot_timer <= 80 && Math.random() > 0.975)
	{
		efayah_timer = 60;
		sound_play(sound_gun);
	}
	if (efayah_timer > 0)
	{
		efayah_timer--;
		sprite_efayah.rotation.y = lookat_datass(cz[6], player);
		sprite_efayah.translateZ(0.15);
	}
	else
	{
		sprite_efayah.position.set(cz[6].position.x, cz[6].position.y+1.2, cz[6].position.z);
	}
//	if (sprite_efayah.position.y <= height_get(sprite_efayah)-0.4) { sprite_efayah.position.set(cz[6].position.x, cz[6].position.y+0.5, cz[6].position.z); erand += 3*Math.random(); }
	let obe = object_get(sprite_efayah);
	if (obe === ASCEND_HOUSE || obe === ASCEND_SKYSCRAPER || obe === ASCEND_BARN)
	{
		sprite_efayah.position.set(cz[6].position.x, cz[6].position.y+0.5, cz[6].position.z);
		sound_play(sound_poof);
		erand += 3*Math.random();
	}
	if (shot_timer <= 0 && distance_get(player, sprite_efayah) < 0.5 && player.position.y-sprite_efayah.position.y < 2)
	{
		sprite_efayah.position.set(cz[6].position.x, cz[6].position.y+0.5, cz[6].position.z);
		sound_play(sound_gunshot);
		shot_timer = 120;
		speed = 0;
		erand += 3*Math.random();
		bak_shelf.material.color.g -= 0.05;
		bak_shelf.material.color.b -= 0.05;
		shelf.material.color.g -= 0.05;
		shelf.material.color.b -= 0.05;
		sprite_shelf_epper.material.color.g -= 0.05;
		sprite_shelf_epper.material.color.b -= 0.05;
	}
}
//! everything related to cut value. one big part of it is a list of where all characters should be placed and move towards at certain events, and one big part is the full list of story dialogue. there's also a bit other stuff.
function cut_set()
{
	// move player
	if (cut % 50 !== 0 && ((cut >= 5000000 && cut <= 5999999) || (cut >= 50000000 && cut <= 50999999)))
	{
		move_player = true;	// f�r alla TALK. l�gg till f�r fler!
	}
	if (cut < 0)
	{
		if (cut === CUT_SPLASHSCREEN)
		{
			if (sprite_intro_a.material.opacity < 1) sprite_intro_a.material.opacity += 0.02;		// g�r plopp-ljud!
			if (sprite_intro_b.material.opacity < 1) sprite_intro_b.material.opacity += 0.01;
			if (sprite_intro_c.material.opacity < 1) sprite_intro_c.material.opacity += 0.007;
			sprite_intro_a.visible = true;
			sprite_intro_b.visible = true;
			sprite_intro_c.visible = true;
			mesh_logo.visible = true;
			mesh_logo_text.visible = true;
			mesh_logo_text2.visible = true;
			mesh_logo_string.visible = true;
			mesh_logo_ep.visible = true;
			sprite_intro_a.position.set(camera.position.x-3, camera.position.y+0.5, camera.position.z+3);
			sprite_intro_b.position.set(camera.position.x-3, camera.position.y+0.5, camera.position.z+3);
			sprite_intro_c.position.set(camera.position.x-3, camera.position.y+0.5, camera.position.z+3);
			sprite_intro_a.rotation.x += 0.01;
			sprite_intro_a.rotation.y += 0.01;
			sprite_intro_a.rotation.z += 0.01;
			sprite_intro_a.translateX(1);
			sprite_intro_a.translateY(1);
			sprite_intro_a.translateZ(1);
			sprite_intro_b.rotation.x += 0.01;
			sprite_intro_b.rotation.y -= 0.01;
			sprite_intro_b.rotation.z += 0.01;
			sprite_intro_b.translateX(0.8);
			sprite_intro_b.translateY(0.8);
			sprite_intro_b.translateZ(0.8);
			sprite_intro_c.rotation.x += 0.01;
			sprite_intro_c.rotation.y -= 0.01;
			sprite_intro_c.rotation.z -= 0.01;
			sprite_intro_c.translateX(1.2);
			sprite_intro_c.translateY(1.2);
			sprite_intro_c.translateZ(1.2);
			mesh_logo.position.set(camera.position.x-3, camera.position.y+0.5, camera.position.z+3);
			mesh_logo.rotation.y += 0.003;
			mesh_logo_string.position.set(camera.position.x-3, camera.position.y+3, camera.position.z+3);
			mesh_logo_ep.position.set(camera.position.x+0.9, camera.position.y+0.5, camera.position.z+3);
		}
		else
		{
			sprite_intro_a.visible = false;
			sprite_intro_b.visible = false;
			sprite_intro_c.visible = false;
			mesh_logo.visible = false;
			mesh_logo_text.visible = false;
			mesh_logo_text2.visible = false;
			mesh_logo_string.visible = false;
			mesh_logo_ep.visible = false;
		}
		if (cut === CUT_SPLASHSCREEN_WAIT)
		{
			if (performance.now()-splashscreen_click_starttime > 1700)
			{
				next_cut_after_blackintro = startcut;		// s�tts i b�rjan av main.js
				ts_end(CUT_CUTSCENE_BLACKINTRO);
			}
			else
			{
				sound_carstart.play();
			}
		}
	}
	// RACE ONLY
	else if (cut % MODULUS_FREEROAM_OR_RACE === 0 && cut % MODULUS_FREEROAM_ONLY !== 0)
	{
		// h�r var cut-lista f�rut!
		mesh_checkpoint_finish.visible = true;
		if (race_state === RACE_DURING || race_state === RACE_BEFORE) mesh_checkpoint_current.visible = true; else mesh_checkpoint_current.visible = false;
		if (race_state === RACE_DURING) mesh_checkpoint_finish.visible = true; else mesh_checkpoint_finish.visible = false;
		// show current checkpoint from far away
		if (distance_get(player, mesh_checkpoint_current) >= 30)
		{
			mesh_checkpoint_current_faraway.visible = true;
			let logdist = 0.275*Math.log(distance_get(player, mesh_checkpoint_current)-30);
			if (logdist <= 0) logdist = 0;
			if (logdist >= 0.95) logdist = 0.95;
			mesh_checkpoint_current_faraway.scale.set(2*(1.5-1.2*logdist), 2*(1.5-1.2*logdist), 2*(1.5-1.2*logdist));
			mesh_checkpoint_current_faraway.position.x = mesh_checkpoint_current.position.x - logdist*(mesh_checkpoint_current.position.x-player.position.x);
			mesh_checkpoint_current_faraway.position.z = mesh_checkpoint_current.position.z - logdist*(mesh_checkpoint_current.position.z-player.position.z);
			mesh_checkpoint_current_faraway.position.y = mesh_checkpoint_current.position.y + player.position.y - 1*logdist;
		}
		else
		{
			mesh_checkpoint_current_faraway.visible = false;
		}
		mesh_checkpoint_finish.position.x = mesh_checkpoint_x[race_number][mesh_checkpoint_x[race_number].length-1];
		mesh_checkpoint_finish.position.z = mesh_checkpoint_z[race_number][mesh_checkpoint_x[race_number].length-1];
		mesh_checkpoint_finish.position.y = height_get(mesh_checkpoint_finish)+3;
		if (race_state === RACE_BEFORE || race_state === RACE_AFTER)
		{
			mesh_checkpoint_current.position.x = mesh_checkpoint_x[race_number][0];
			mesh_checkpoint_current.position.z = mesh_checkpoint_z[race_number][0];
	 		mesh_checkpoint_current.position.y = height_get(mesh_checkpoint_current)+3;
		}
		if (race_state === RACE_BEFORE)
		{
			// cut list
			if (cut === CUT_RACE_1)
			{
				race_number = 0;
				player_lap = 1;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 1;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz_turned_on[0] = 1;
				cz_turned_on[1] = 1;
				cz_turned_on[3] = 1;
			}
			else if (cut === CUT_RACE_EPPER)
			{
				race_number = 3;
				player_lap = 2;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 2;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz_turned_on[2] = 1;
				cz_turned_on[9] = 1;
				cz_turned_on[4] = 1;
			}
			else if (cut === CUT_RACE_DGTRAVEL)
			{
				race_number = 7;
				player_lap = 1;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 1;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz_turned_on[2] = 1;
				cz_turned_on[0] = 1;
				cz_turned_on[4] = 1;
			}
			else if (cut === CUT_RACE_HAFTLAN)
			{
				race_number = 12;
				player_lap = 2;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 2;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
			//	if (race_state === RACE_BEFORE) cz_turned_on[8] = 1; else cz_turned_on[8] = 0;		// polish cow disappears from shame
				cz_turned_on[8] = 1;
				cz_turned_on[2] = 1;
				cz_turned_on[0] = 1;
				cz_turned_on[4] = 1;
				cz_turned_on[5] = 1;
			}
			else if (cut === CUT_RACE_DOGERTWATER)
			{
				race_number = 14;
				player_lap = 2;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 2;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz_turned_on[3] = 1;
			}
			else if (cut === CUT_RACE_SPEED)
			{
				race_number = 26;
				player_lap = 4;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 4;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz_turned_on[5] = 1;
				cz_turned_on[1] = 1;
				cz_turned_on[0] = 1;
				cz_turned_on[8] = 1;
			}
			else if (cut === CUT_RACE_RINGS)
			{
				race_number = 27;
				player_lap = 3;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_lap[t] = 3;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz_turned_on[7] = 1;
			}
 			else
			{
				//ts_end(cut+50);
				throw new Error();
			}
			// characters look at "first" checkpoint
			let carnum = 1;
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (cz_turned_on[t] === 1)
				{
					cz_race_state[t] = RACE_COUNTDOWN;
					cz[t].position.x = mesh_checkpoint_x[race_number][0];	// st�ll alla p� checkpoint 0.
					cz[t].position.z = mesh_checkpoint_z[race_number][0];	// rotera alla mot checkpoint (NEXT):
					cz[t].rotation.y = lookat_datass_xz(cz[t].position.x,cz[t].position.z, mesh_checkpoint_x[race_number][32],mesh_checkpoint_z[race_number][32]);
					cz[t].rotation.y += 0.5*Math.PI;			// rotera alla 90 grader �t h�ger.
					if (carnum % 2 === 1) cz[t].translateZ(2*carnum);	// flytta fram och bak dem till r�tt positioner. rotera dem mot checkpoint (NEXT) igen:
					else cz[t].translateZ(-carnum);
					cz[t].rotation.y = lookat_datass_xz(cz[t].position.x,cz[t].position.z, mesh_checkpoint_x[race_number][32],mesh_checkpoint_z[race_number][32]);
					cz_goal_x[t] = cz[t].position.x;
					cz_goal_z[t] = cz[t].position.z;
					carnum++;
				}
			}
			if (distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][0],mesh_checkpoint_z[race_number][0]) < 4.5)
			{
				race_state = RACE_COUNTDOWN;
				race_countdown_started = false;		// do next thing only once
			}
			music_play("");
			music_what_is_playing = 1;
		}
		else if (race_state === RACE_COUNTDOWN)
		{
			if (race_countdown_started === false)
			{
				music_play("");
				music_what_is_playing = 1;
				player.rotation.y = lookat_datass_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][32],mesh_checkpoint_z[race_number][32]);
				sound_checkpoint.play();
				countdown_start = frame_counter;
				race_countdown_started = true;
			}
			player.position.x = mesh_checkpoint_x[race_number][0];
			player.position.z = mesh_checkpoint_z[race_number][0];
			if (frame_counter-countdown_start >= 60 && frame_counter-countdown_start < 120)
			{
				document.getElementById("count_3").style.visibility = "visible";
				if (frame_counter-countdown_start === 60) sound_countdown.play();
			}
			else if (frame_counter-countdown_start >= 120 && frame_counter-countdown_start < 180)
			{
				document.getElementById("count_2").style.visibility = "visible";
			}
			else if (frame_counter-countdown_start >= 180 && frame_counter-countdown_start < 240)
			{
				document.getElementById("count_1").style.visibility = "visible";
			}
			else if (frame_counter-countdown_start >= 240)
			{
				bet_started = false;		// this is ts_end
				race_state = RACE_DURING;
				race_startedtimer = 0;
				race_wrongwaytimer = 0;
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_race_state[t] = RACE_DURING;
			}
		}
		else if (race_state === RACE_DURING)
		{
			// cut list
			if (cut === CUT_RACE_1)
			{
				if (race_1_started_during === false)
				{
					sound_explosion2.play();
					music_play("theme_race.mp3", 0.6);
					music_what_is_playing = 2;
					race_1_started_during = true;
				}
				if (ci1 === 33 && cj1 === 37) place_sprite_noidle(sprite_energydrink, 1658, 1839);
				else if (ci1 === 33 && cj1 === 38) place_sprite_noidle(sprite_energydrink, 1657, 1863);
				else if (ci1 === 32 && cj1 === 35) place_sprite_noidle(sprite_energydrink, 1587, 1738);
			}
			else if (cut === CUT_RACE_EPPER)
			{
				if (race_epper_started_during === false)
				{
					sound_play(sound_explosion2);
					music_play("theme_race2.mp3", 0.67);
					music_what_is_playing = 2;
					race_epper_started_during = true;
				}
			}
			else if (cut === CUT_RACE_DGTRAVEL)
			{
				if (race_dgtravel_started_during === false)
				{
					sound_play(sound_explosion2);
					music_play("theme_race_x.mp3", 0.7);
					music_what_is_playing = 2;
					race_dgtravel_started_during = true;
				}
				if (distance_get_xz(player.position.x,player.position.z, 1348,1997) < 30) bet_pers(sprite[0], "You see all the dead trees here? They died when Hårass peed here one time.");
			}
			else if (cut === CUT_RACE_HAFTLAN)
			{
				if (race_haftlan_started_during === false)
				{
					sound_play(sound_explosion2);
					music_play("theme_haftlan.mp3", 0.47);
					music_what_is_playing = 2;
					race_haftlan_started_during = true;
				}
			}
			else if (cut === CUT_RACE_DOGERTWATER)
			{
				if (race_dogertwater_started_during === false)
				{
					sound_play(sound_explosion2);
					music_play("theme_race2.mp3", 0.47);
					music_what_is_playing = 2;
					race_dogertwater_started_during = true;
				}
			}
			else if (cut === CUT_RACE_SPEED)
			{
				if (race_speed_started_during === false)
				{
					sound_play(sound_explosion2);
					music_play("theme_race1.mp3", 0.47);
					music_what_is_playing = 2;
					race_speed_started_during = true;
				}
			}
			else if (cut === CUT_RACE_RINGS)
			{
				if (race_rings_started_during === false)
				{
					sound_play(sound_explosion2);
					music_play("theme_race_sfabian.mp3", 0.47);
					music_what_is_playing = 2;
					race_rings_started_during = true;
				}
				place_sprite_noidle(sprite_energydrink, 1975, 1478);
				place_sprite_noidle(sprite_energydrink2, 2005, 1478);
				place_sprite_noidle(sprite_energydrink3, 2027, 1467);
				place_sprite_noidle(sprite_energydrink4, 2051, 1447);
				place_sprite_noidle(sprite_energydrink5, 2035, 1429);
			}
			else
			{
				//ts_end(cut+50);
				throw new Error();
			}
			// check if player has won
			if (player_checkpoint >= mesh_checkpoint_x[race_number].length-1)
			{
			//	if (player_lap > 0)
			//	{
			//		player_lap--;
			//		player_checkpoint = 0;
			//	}
			//	else
			//	{
			//		winner = SOMEONE_HAS_WON;
			//		race_state = RACE_AFTER;
			//	}
			}
			else
			{
			// for exact checkpoint. it's used for race placement etc and is not equal to the green flags.
			// .. implementera detta f�r alla? s� att det blir samma j�mf�relse mellan spelare och karakt�rer f�r leader och winner?
			if (distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][player_exactcheckpoint],mesh_checkpoint_z[race_number][player_exactcheckpoint]) < 8)
			{
				player_exactcheckpoint++;
				if (player_exactcheckpoint >= mesh_checkpoint_x[race_number].length-1)
				{
					if (player_lap > 1) { player_exactcheckpoint = 0; player_lap--; sound_play(sound_lapfanfare); }
					else { winner = SOMEONE_HAS_WON; race_state = RACE_AFTER; sound_play(sound_lapfanfare); }
				}
			}
			// if close to checkpoint, go to next checkpoint
			if (distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][player_checkpoint],mesh_checkpoint_z[race_number][player_checkpoint]) < 8)
			{
				// if near 1/32 checkpoint, move green flag forward
				if (player_checkpoint < mesh_checkpoint_x[race_number].length-32 && player_checkpoint % 32 === 0)
				{
					player_exactcheckpoint = player_checkpoint;
					player_checkpoint += 32;
					mesh_checkpoint_current.position.x = mesh_checkpoint_x[race_number][player_checkpoint];
					mesh_checkpoint_current.position.z = mesh_checkpoint_z[race_number][player_checkpoint];
	 				mesh_checkpoint_current.position.y = height_get(mesh_checkpoint_current)+3;
					sound_checkpoint.play();
				}
				// if "last" checkpoint?
				else if (player_checkpoint >= mesh_checkpoint_x[race_number].length-32)
				{
					// check if lap or if player has won
					if (player_lap > 1)
					{
						player_lap--;
						player_checkpoint = 0;
						mesh_checkpoint_current.position.x = mesh_checkpoint_x[race_number][player_checkpoint];
						mesh_checkpoint_current.position.z = mesh_checkpoint_z[race_number][player_checkpoint];
		 				mesh_checkpoint_current.position.y = height_get(mesh_checkpoint_current)+3;
						sound_checkpoint.play();
					}
					else
					{
					//	winner = SOMEONE_HAS_WON;
					//	race_state = RACE_AFTER;
					}
				}
			}
			}
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (cz_turned_on[t] === 1)
				{
					if (cz_checkpoint[t] <= mesh_checkpoint_x[race_number].length-1)
					{
						if (distance_get_xz(cz[t].position.x,cz[t].position.z, mesh_checkpoint_x[race_number][cz_checkpoint[t]],mesh_checkpoint_z[race_number][cz_checkpoint[t]]) < 8)
						{
							cz_checkpoint[t]++;
						}
						if (cz_checkpoint[t] >= mesh_checkpoint_x[race_number].length-1)
						{
							if (cz_lap[t] > 1)
							{
								cz_lap[t]--;
								cz_checkpoint[t] = 0;
							}
							else
							{
								winner = SOMEONE_HAS_WON;
							}
						}
						else if (cz_checkpoint[t] < mesh_checkpoint_x[race_number].length)
						{
							cz_goal_x[t] = mesh_checkpoint_x[race_number][cz_checkpoint[t]];
							cz_goal_z[t] = mesh_checkpoint_z[race_number][cz_checkpoint[t]];
						}
					}
				}
			}
			// if far away from checkpoint, shout out that something's wrong
			if (player_checkpoint < mesh_checkpoint_x[race_number].length-32)
			{
				// if you're closer to the next checkpoint than the current (this doesn't work for the last checkpoint of each varv!)
				if (distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][player_checkpoint+32],mesh_checkpoint_z[race_number][player_checkpoint+32]) < distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][player_checkpoint],mesh_checkpoint_z[race_number][player_checkpoint]))
				{
					if (frame_counter % 120 === 0) sound_error.play();
					if (frame_counter % 40 > 20) document.getElementById("wrongway").style.visibility = "visible";
					race_wrongwaytimer++;
					if (race_wrongwaytimer > 60*20)
					{
						sprite_ui_mouseclick.visible = true;
						if (mouseclick === true)
						{
							race_state = RACE_AFTER;	// 1 minutes max with WRONGWAY, then mouseclick!
						}
					}
				}
				// if too far away from current checkpoint in general
				else
				{
					if (object_get(player) === ASCEND_ROAD)
					{
						if (distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][player_checkpoint],mesh_checkpoint_z[race_number][player_checkpoint]) > 100)	// godtyckligt avst�nd
						{
							if (frame_counter % 120 === 0) sound_error.play();
							if (frame_counter % 40 > 20) document.getElementById("wrongway").style.visibility = "visible";
							race_wrongwaytimer++;
							if (race_wrongwaytimer > 60*20)
							{
								sprite_ui_mouseclick.visible = true;
								if (mouseclick === true)
								{
									race_state = RACE_AFTER;	// 1 minutes max with WRONGWAY, then mouseclick!
								}
							}
						}
						else race_wrongwaytimer = 0;
					}
					else
					{
						if (distance_get_xz(player.position.x,player.position.z, mesh_checkpoint_x[race_number][player_checkpoint],mesh_checkpoint_z[race_number][player_checkpoint]) > 40)	// godtyckligt avst�nd
						{
							if (frame_counter % 120 === 0) sound_error.play();
							if (frame_counter % 40 > 20) document.getElementById("wrongway").style.visibility = "visible";
							race_wrongwaytimer++;
							if (race_wrongwaytimer > 60*20)
							{
								sprite_ui_mouseclick.visible = true;
								if (mouseclick === true)
								{
									race_state = RACE_AFTER;	// 1 minutes max with WRONGWAY, then mouseclick!
								}
							}
						}
						else race_wrongwaytimer = 0;
					}
				}
			}
			else race_wrongwaytimer = 0;
			// check current leader
			if (winner !== SOMEONE_HAS_WON)
			{
				let highest_progress = -1;
				for (let t = 0; t < NUMBER_OF_CARS; t++)
				{
					if (cz_turned_on[t] === 1)
					{
						if ((20-cz_lap[t])*99999+cz_checkpoint[t] > highest_progress)
						{
							cz_leader = t;
							highest_progress = (20-cz_lap[t])*99999+cz_checkpoint[t];
						}
					}
				}
				if ((20-player_lap)*99999+player_exactcheckpoint >= highest_progress)
				{
					cz_leader = 99;
					highest_progress = (20-player_lap)*99999+player_exactcheckpoint;
				}
			}
			if (cz_leader == 99) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_shelf_head.png\"></img>Shelf";
			else if (cz_leader == 0) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_adele_head.png\"></img>Adele";
			else if (cz_leader == 1) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_dg_head.png\"></img>Dark Gandalf";
			else if (cz_leader == 2) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_daddy_head.png\"></img>Daddy";
			else if (cz_leader == 3) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_dogert_head.png\"></img>Dogert";
			else if (cz_leader == 4) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_omalley_head.png\"></img>O'Malley";
			else if (cz_leader == 5) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_harass_head.png\"></img>Hårass";
			else if (cz_leader == 6) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_disonesty_head.png\"></img>Disonesty";
			else if (cz_leader == 7) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_mrs_superconductor_head.png\"></img>Mrs Superconductor";
			else if (cz_leader == 8) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img uwidth=30% src=\"files/C_polish_cow_head.png\"></img>Polish Cow";
			else if (cz_leader == 9) document.getElementById("leader").innerHTML = "(" + (player_lap-1) + " laps left)<br>#1. <img width=30% src=\"files/C_epper_head.png\"></img>'Epper";
			if (winner === SOMEONE_HAS_WON && cz_leader === PLAYER) { race_state = RACE_AFTER; }
			// so the race ends if you don't reach goal in a long time
			race_startedtimer++;
			if (race_startedtimer > 60*60*10) race_state = RACE_AFTER;	// 10 minutes absolute max, add more in cut list for each race?
		}
		// after race (winning ceremonery)
		else if (race_state === RACE_AFTER)
		{
			if (race_after_started === false)
			{
				music_play("music_cute.mp3", 0.25);
				music_what_is_playing = 2;
				race_after_started = true;
			}
			race_state = RACE_BEFORE;
			for (let t = 0; t < NUMBER_OF_CARS; t++) cz_race_state[t] = RACE_BEFORE;
			winner = -1;
			player_checkpoint = 0;
			for (let t = 0; t < NUMBER_OF_CARS; t++) cz_checkpoint[t] = 0;
			player.position.x = mesh_checkpoint_x[race_number][mesh_checkpoint_x[race_number].length-1]+1;
			player.position.z = mesh_checkpoint_z[race_number][mesh_checkpoint_x[race_number].length-1]+1;
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (cz_turned_on[t] === 1)
				{
					cz[t].position.x = mesh_checkpoint_x[race_number][mesh_checkpoint_x[race_number].length-1] - (t+1)*2;
					cz[t].position.z = mesh_checkpoint_z[race_number][mesh_checkpoint_x[race_number].length-1] - (t+1)*2;
					cz_goal_x[t] = mesh_checkpoint_x[race_number][mesh_checkpoint_x[race_number].length-1] - (t+1)*2;
					cz_goal_z[t] = mesh_checkpoint_z[race_number][mesh_checkpoint_x[race_number].length-1] - (t+1)*2;
				}
			}
			// cut list
			if (cut === CUT_RACE_1)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);	// detta kommer inte funka om man �r innan ett annat race och klickar sig in p� detta race (men b�r vara lugnt f�r man kan �nd� inte trycka p� dem)
				else
				{
					if (cz_leader === PLAYER) ts_end(CUT_CUTSCENE_RACE_1_AFTER+30);
					else if (cz_leader === 1) ts_end(CUT_CUTSCENE_RACE_1_AFTER+20);
					else ts_end(CUT_CUTSCENE_RACE_1_AFTER+10);
				}
			}
			else if (cut === CUT_RACE_EPPER)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);
				else
				{
					if (cz_leader === PLAYER || cz_leader === 2) ts_end(CUT_CUTSCENE_RACE_EPPER_AFTER1);
					else ts_end(CUT_CUTSCENE_RACE_EPPER_AFTER2);
				}
			}
			else if (cut === CUT_RACE_DGTRAVEL)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);
 				else ts_end(CUT_FREEROAM_DGCHILL);
			}
			else if (cut === CUT_RACE_HAFTLAN)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);
 				else ts_end(CUT_FREEROAM_RACE_HAFTLAN_AFTER);
			}
			else if (cut === CUT_RACE_DOGERTWATER)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);
 				else ts_end(CUT_RACE_DOGERTWATER_AFTER);
			}
			else if (cut === CUT_RACE_SPEED)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);
				else ts_end(CUT_FREEROAM_RACE_SPEED_AFTER);
			}
			else if (cut === CUT_RACE_RINGS)
			{
				if (iwillbeback === true) ts_end_from_talk(last_cut_before_race);
				else {
				if (cz_leader === PLAYER) ts_end(CUT_CUTSCENE_ENDING_YOU);
				else ts_end(CUT_CUTSCENE_ENDING_MRS);
				}
			}
			else
			{
				//ts_end(cut+50);
				throw new Error();
			}
		}
	}
	// everything except RACE
	else
	{
		mesh_checkpoint_finish.visible = false;
		mesh_checkpoint_current.visible = false;
	}
	// CUTS
	if (cut === CUT_CUTSCENE_BLACKINTRO)
	{
		// at the start of the cut
		if (cutscene_blackintro_started === false)
		{
			blackintro_frame_counter = 0;
			music_play("");
			music_what_is_playing = 1;
			sound_car.pause();
			sound_car_is_playing = false;
		//	sound_play(sound_click);
			if (next_cut_after_blackintro !== CUT_CUTSCENE_WAKEUP)
			{
			//	sound_play(sound_dreamintro);
			}
			room_set("black.png", "black.png");
			for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
			cutscene_blackintro_started = true;
		}
		// during the whole cut
		blackintro_frame_counter++;
		player.position.y = room.position.y-0.5;
		room.visible = true;
		if (blackintro_frame_counter >= 100)
		{
			player.position.y = height_get(player);
			cutscene_blackintro_started = false;
			ts_end(next_cut_after_blackintro);
		}
	}
else if (cut === CUT_FREEROAM_INTRO)
{
// at the start of the cut
if (freeroam_intro_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("dream.mp3", 0.12);
music_what_is_playing = 2;
cz[2].position.x = freeroam_intro_position_x;
cz[2].position.z = freeroam_intro_position_z+1;
cz[3].position.x = freeroam_intro_position_x+2;
cz[3].position.z = freeroam_intro_position_z+2;
cz_goal_array_x = [ 1470,1470,1469,1459,1457,1448,1441,1440,1474,1471,1470,1478,1472,1478,1496,1528 ];
cz_goal_array_z = [ 1877,1812,1792,1773,1750,1747,1761,1768,1781,1794,1812,1846,1874,1890,1889,1887 ];
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_goal_lap[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_intro_name + "\"";
freeroam_intro_started = true;
}
// during the whole cut
			// start positions
		// how fast the characters should go
		speedchange = 0.3;
		// goal positions
cz_turned_on[2] = 1;
cz_turned_on[3] = 1;
for (let t = 0; t < NUMBER_OF_CARS; t++)
{
if (cz_turned_on[t] === 1)
{
cz_goal_x[t] = cz_goal_array_x[cz_goal_lap[t]];
cz_goal_z[t] = cz_goal_array_z[cz_goal_lap[t]];
if (cz_goal_lap[t] >= cz_goal_array_x.length)
{
cz_goal_x[t] = cz[t].position.x;
cz_goal_z[t] = cz[t].position.z;
}
else if (distance_get_xz(cz[t].position.x,cz[t].position.z, cz_goal_array_x[cz_goal_lap[t]],cz_goal_array_z[cz_goal_lap[t]]) < 3)
{
cz_goal_lap[t]++;
}
}
}
}
else if (cut >= CUT_CUTSCENE_WAKEUP && cut <= CUT_CUTSCENE_WAKEUP+48)
{
// at the start of the cut
if (cutscene_wakeup_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
room_set("black.png", "black.png");
cutscene_wakeup_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[3] = 1;
cz[3].position.x = player.position.x;
cz[3].position.z = player.position.z;
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
}
else if (cut >= CUT_CUTSCENE_RACE_1_AFTER && cut <= CUT_CUTSCENE_RACE_1_AFTER+48)
{
// at the start of the cut
if (cutscene_race_1_after_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_cute.mp3", 0.3);
music_what_is_playing = 2;
cutscene_race_1_after_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
cz[0].position.x = 1590;
cz[0].position.z = 1885+1;
cz_turned_on[1] = 1;
cz[1].position.x = 1590;
cz[1].position.z = 1885;
cz_turned_on[3] = 1;
cz[3].position.x = 1590;
cz[3].position.z = 1885+2;
}

else if (cut === CUT_FREEROAM_M1)
{
// at the start of the cut
if (freeroam_m1_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz_goal_x[3] = 1590+60*(Math.random()-0.5);
cz_goal_z[3] = 1885+60*(Math.random()-0.5);
cz[0].position.x = 1590;
cz[0].position.z = 1885+1;
cz[1].position.x = 1590;
cz[1].position.z = 1885;
cz[3].position.x = 1590;
cz[3].position.z = 1885+2;
document.getElementById("scene").innerHTML = "\"" + freeroam_m1_name + "\"";
freeroam_m1_started = true;
}
// during the whole cut
		speedchange = 0.6;
		if (distance_get_xz(cz[3].position.x,cz[3].position.z, cz_goal_x[3],cz_goal_z[3]) < 2)
		{
			cz_goal_x[3] = 1590+60*(Math.random()-0.5);
			cz_goal_z[3] = 1885+60*(Math.random()-0.5);
		}
		// collisions
if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 5)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_MEETING_1);
}
if (distance_get(player, cz[3]) < 5)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_DOGERT_SPRAY);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = carclub_position_x-1;
cz_goal_z[0] = carclub_position_z+1;
cz_turned_on[1] = 1;
cz_goal_x[1] = carclub_position_x-1;
cz_goal_z[1] = carclub_position_z-1;
cz_turned_on[3] = 1;
}
else if (cut >= CUT_CUTSCENE_MEETING_1 && cut <= CUT_CUTSCENE_MEETING_1+48)
{
// at the start of the cut
if (cutscene_meeting_1_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("wall.jpg", "woodenfloor.jpg");
cutscene_meeting_1_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
		// place characters in room
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "s");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "e");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
}
else if (cut === CUT_FREEROAM_0)
{
// at the start of the cut
if (freeroam_0_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_sadgym.mp3", 0.6);
music_what_is_playing = 2;
cz[0].position.x = carclub_position_x-1;
cz[0].position.z = carclub_position_z+1;
document.getElementById("scene").innerHTML = "\"" + freeroam_0_name + "\"";
freeroam_0_started = true;
}
// during the whole cut
	speedchange = 0.5;
		if (distance_get_xz(player.position.x,player.position.z, freeroam_gym_position_x,freeroam_gym_position_z) < 1*4) ts_end(CUT_FREEROAM_GYM);
cz_turned_on[0] = 1;
cz_goal_x[0] = freeroam_gym_position_x-1;
cz_goal_z[0] = freeroam_gym_position_z+1;
}
else if (cut === CUT_FREEROAM_GYM)
{
// at the start of the cut
if (freeroam_gym_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_sadgym.mp3", 0.6);
music_what_is_playing = 2;
cz[0].position.x = freeroam_gym_position_x;
cz[0].position.z = freeroam_gym_position_z-1;
cz[2].position.x = 1581;
cz[2].position.z = 1884;
document.getElementById("scene").innerHTML = "\"" + freeroam_gym_name + "\"";
freeroam_gym_started = true;
}
// during the whole cut
		if (q > 2 && distance_get(player, cz[2]) < 5)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_GYM);
		}
cz_turned_on[0] = 1;
cz_goal_x[0] = freeroam_gym_position_x-0.5;
cz_goal_z[0] = freeroam_gym_position_z+1;
cz_turned_on[2] = 1;
cz_goal_x[2] = freeroam_gym_position_x-0.5;
cz_goal_z[2] = freeroam_gym_position_z+2;
}
else if (cut >= CUT_CUTSCENE_GYM && cut <= CUT_CUTSCENE_GYM+48)
{
// at the start of the cut
if (cutscene_gym_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_sadgym.mp3", 0.3);
music_what_is_playing = 2;
cutscene_gym_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
cz[0].position.x = freeroam_gym_position_x-0.5;
cz[0].position.z = freeroam_gym_position_z+1;
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[2] = 1;
cz[2].position.x = freeroam_gym_position_x-0.5;
cz[2].position.z = freeroam_gym_position_z+2;
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
}
	// muffins
else if (cut === CUT_FREEROAM_1)
{
// at the start of the cut
if (freeroam_1_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("morning_birds.mp3", 0.1);
music_what_is_playing = 2;
cz[2].position.x = 1605;
cz[2].position.z = 1894;
document.getElementById("scene").innerHTML = "\"" + freeroam_1_name + "\"";
freeroam_1_started = true;
}
// during the whole cut
		if (q < 1.25) { cz_goal_x[2] = cz[2].position.x; cz_goal_z[2] = cz[2].position.z; }
		else { cz_goal_x[2] = 1621; cz_goal_z[2] = 1819; }
		sprite_freeroam_1_muffins.visible = true;
		place_sprite_noidle(sprite_freeroam_1_muffins, 1621, 1819);
		if (distance_get(player, sprite_freeroam_1_muffins) < 1.7*1 && distance_get(player, cz[2]) < 4) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1B); }
cz_turned_on[2] = 1;
music_what_is_playing = 2;
}
else if (cut === CUT_FREEROAM_1B)
{
// at the start of the cut
if (freeroam_1b_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
document.getElementById("scene").innerHTML = "\"" + freeroam_1b_name + "\"";
freeroam_1b_started = true;
}
// during the whole cut
		if (q < 0.75) { cz_goal_x[2] = cz[2].position.x; cz_goal_z[2] = cz[2].position.z; }
		else { cz_goal_x[2] = 1642; cz_goal_z[2] = 1779; }
		sprite_freeroam_1_muffins.visible = true;
		place_sprite_noidle(sprite_freeroam_1_muffins, 1641, 1779);
		if (distance_get(player, sprite_freeroam_1_muffins) < 1*2) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1C); }
cz_turned_on[2] = 1;
}
else if (cut === CUT_FREEROAM_1C)
{
// at the start of the cut
if (freeroam_1c_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("morning_birds.mp3", 0.1);
music_what_is_playing = 2;
document.getElementById("scene").innerHTML = "\"" + freeroam_1c_name + "\"";
freeroam_1c_started = true;
}
// during the whole cut
		if (q < 0.75) { cz_goal_x[2] = cz[2].position.x; cz_goal_z[2] = cz[2].position.z; }
		else { cz_goal_x[2] = 1650; cz_goal_z[2] = 1727; }
		sprite_freeroam_1_muffins.visible = true;
		place_sprite_noidle(sprite_freeroam_1_muffins, 1649, 1727);
		if (distance_get(player, sprite_freeroam_1_muffins) < 1*2) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1D); }
cz_turned_on[2] = 1;
}
else if (cut === CUT_FREEROAM_1D)
{
// at the start of the cut
if (freeroam_1d_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
document.getElementById("scene").innerHTML = "\"" + freeroam_1d_name + "\"";
freeroam_1d_started = true;
}
// during the whole cut
		if (q < 0.75) { cz_goal_x[2] = cz[2].position.x; cz_goal_z[2] = cz[2].position.z; }
		else { cz_goal_x[2] = 1697; cz_goal_z[2] = 1706; }
		sprite_freeroam_1_muffins.visible = true;
		place_sprite_noidle(sprite_freeroam_1_muffins, 1697, 1706);
		if (distance_get(player, sprite_freeroam_1_muffins) < 1*2) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1E); }
cz_turned_on[2] = 1;
}
else if (cut === CUT_FREEROAM_1E)
{
// at the start of the cut
if (freeroam_1e_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_1e_name + "\"";
freeroam_1e_started = true;
}
// during the whole cut
		if (q < 0.75) { cz_goal_x[2] = cz[2].position.x; cz_goal_z[2] = cz[2].position.z; }
		else { cz_goal_x[2] = 1752; cz_goal_z[2] = 1675; }
		sprite_freeroam_1_muffins.visible = true;
		place_sprite_noidle(sprite_freeroam_1_muffins, 1752, 1675);
		if (distance_get(player, sprite_freeroam_1_muffins) < 1*2) { sound_cartoon.play(); ts_end(CUT_FREEROAM_1F); }
cz_turned_on[2] = 1;
}
else if (cut === CUT_FREEROAM_1F)
{
// at the start of the cut
if (freeroam_1f_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_1f_name + "\"";
freeroam_1f_started = true;
}
// during the whole cut
		if (q < 0.75) { cz_goal_x[2] = cz[2].position.x; cz_goal_z[2] = cz[2].position.z; }
		else { cz_goal_x[2] = 1802; cz_goal_z[2] = 1690; }
		sprite_freeroam_1_muffins.visible = true;
		place_sprite_noidle(sprite_freeroam_1_muffins, 1802, 1690);
		if (distance_get(player, sprite_freeroam_1_muffins) < 1*2) { sound_cartoon.play(); ts_end(CUT_FREEROAM_EPPER); }
cz_turned_on[2] = 1;
}
else if (cut === CUT_FREEROAM_EPPER)
{
// at the start of the cut
if (freeroam_epper_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cz[2].position.x = 1802;
cz[2].position.z = 1690;
cz[4].position.x = 1880+1;
cz[4].position.z = 1698;
cz[9].position.x = 1880;
cz[9].position.z = 1698;
document.getElementById("scene").innerHTML = "\"" + freeroam_epper_name + "\"";
freeroam_epper_started = true;
}
// during the whole cut
		speedchange = 0.4;
if (distance_get(player, cz[9]) < 3)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_EPPER);
}
cz_turned_on[2] = 1;
cz_goal_x[2] = player.position.x-2;
cz_goal_z[2] = player.position.z-2;
cz_turned_on[4] = 1;
cz_goal_x[4] = 1880+1;
cz_goal_z[4] = 1698;
cz_turned_on[9] = 1;
cz_goal_x[9] = 1880;
cz_goal_z[9] = 1698;
}
else if (cut >= CUT_CUTSCENE_EPPER && cut <= CUT_CUTSCENE_EPPER+48)
{
// at the start of the cut
if (cutscene_epper_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_epper.mp3", 0.1);
music_what_is_playing = 2;
cutscene_epper_started = true;
}
// during the whole cut
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "s");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "n");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[9] = 1;
place_cz_in_room(cz[9], "e");
cz_goal_x[9] = cz[9].position.x;
cz_goal_z[9] = cz[9].position.z;
}



else if (cut === CUT_FREEROAM_OMALLEY)
{
// at the start of the cut
if (freeroam_omalley_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[2].position.x = 1880-1;
cz[2].position.z = 1698;
cz[4].position.x = 1880+1;
cz[4].position.z = 1698;
document.getElementById("scene").innerHTML = "\"" + freeroam_omalley_name + "\"";
freeroam_omalley_started = true;
}
// during the whole cut
		speedchange = 0.4;
		if (q < 2.75)
		{
			cz_goal_x[2] = 1917;
			cz_goal_z[2] = 1648;
		}
		else //if (q < 8.75)
		{
			cz_goal_x[2] = 1935;
			cz_goal_z[2] = 1717;
		}
	//	else if (q < 12)
	//	{
	//		cz_goal_x[2] = 1799;
	//		cz_goal_z[2] = 1730;
	//	}
	//	else if (q < 16)
	//	{
	//		cz_goal_x[2] = 1837;
	//		cz_goal_z[2] = 1695;
	//	}
	//	else
	//	{
	//		cz_goal_x[2] = 1797;
	//		cz_goal_z[2] = 1643;
	//	}
		if (q >= 1)
		{
			cz_goal_x[4] = cz[2].position.x+3;
			cz_goal_z[4] = cz[2].position.z+3;
		}
		else
		{
			cz_goal_x[4] = cz[4].position.x;
			cz_goal_z[4] = cz[4].position.z;
		}
		if (q > 3.75 && distance_get(player, cz[4]) < 3)
		{
			sprite_ui_mouseclick.visible = true;
			if (mouseclick) ts_end(CUT_CUTSCENE_OMALLEY);
		}
cz_turned_on[2] = 1;
cz_turned_on[4] = 1;
}
else if (cut >= CUT_CUTSCENE_OMALLEY && cut <= CUT_CUTSCENE_OMALLEY+48)
{
// at the start of the cut
if (cutscene_omalley_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_omalley_started = true;
}
// during the whole cut
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "n");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "s");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}

else if (cut === CUT_FREEROAM_OMALLEY_2)
{
// at the start of the cut
if (freeroam_omalley_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cz[2].position.x = 1935;
cz[2].position.z = 1717;
cz[4].position.x = 1935;
cz[4].position.z = 1718;
cz[9].position.x = 1787;
cz[9].position.z = 1677;
document.getElementById("scene").innerHTML = "\"" + freeroam_omalley_2_name + "\"";
freeroam_omalley_2_started = true;
}
// during the whole cut
	speedchange = 0.4;
		if (q < 5)
		{
			cz_goal_x[2] = 1799;
			cz_goal_z[2] = 1730;
		}
		else if (q < 9)
		{
			cz_goal_x[2] = 1837;
			cz_goal_z[2] = 1695;
		}
		else
		{
			cz_goal_x[2] = 1789;
			cz_goal_z[2] = 1681;
		}
		cz_goal_x[4] = cz[2].position.x+3;
		cz_goal_z[4] = cz[2].position.z+3;
if (distance_get(player, cz[9]) < 3)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_RACE_EPPER_BEFORE);
}
cz_turned_on[2] = 1;
cz_turned_on[4] = 1;
cz_turned_on[9] = 1;
cz_goal_x[9] = 1787;
cz_goal_z[9] = 1677;
}
else if (cut >= CUT_CUTSCENE_RACE_EPPER_BEFORE && cut <= CUT_CUTSCENE_RACE_EPPER_BEFORE+48)
{
// at the start of the cut
if (cutscene_race_epper_before_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_epper.mp3", 0.1);
music_what_is_playing = 2;
cutscene_race_epper_before_started = true;
}
// during the whole cut
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "n");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "e");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[9] = 1;
place_cz_in_room(cz[9], "s");
cz_goal_x[9] = cz[9].position.x;
cz_goal_z[9] = cz[9].position.z;
}
else if (cut >= CUT_CUTSCENE_RACE_EPPER_AFTER1 && cut <= CUT_CUTSCENE_RACE_EPPER_AFTER1+48)
{
// at the start of the cut
if (cutscene_race_epper_after1_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_cute.mp3", 0.5);
music_what_is_playing = 2;
cutscene_race_epper_after1_started = true;
}
// during the whole cut
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "s");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "e");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[9] = 1;
place_cz_in_room(cz[9], "n");
cz_goal_x[9] = cz[9].position.x;
cz_goal_z[9] = cz[9].position.z;
}
else if (cut >= CUT_CUTSCENE_RACE_EPPER_AFTER2 && cut <= CUT_CUTSCENE_RACE_EPPER_AFTER2+48)
{
// at the start of the cut
if (cutscene_race_epper_after2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_cute.mp3", 0.5);
music_what_is_playing = 2;
cutscene_race_epper_after2_started = true;
}
// during the whole cut
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "s");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "e");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[9] = 1;
place_cz_in_room(cz[9], "n");
cz_goal_x[9] = cz[9].position.x;
cz_goal_z[9] = cz[9].position.z;
}
else if (cut === CUT_FREEROAM_CARCHASE)
{
// at the start of the cut
if (freeroam_carchase_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("leejung_chase.mp3", 0.4);
music_what_is_playing = 2;
cz[6] = spr("turf2.png");
cz[6].position.x = 1874;
cz[6].position.z = 1696;
cz_goal_x[6] = 1874;
cz_goal_z[6] = 1696;
document.getElementById("scene").innerHTML = "\"" + freeroam_carchase_name + "\"";
freeroam_carchase_started = true;
}
// during the whole cut
speedchange = 0.4;
cz_turned_on[6] = 1;
if (distance_get_xz(cz[6].position.x,cz[6].position.z, cz_goal_x[6],cz_goal_z[6]) < 2)
{
if (Math.random() > 0.9)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
}
else if (object_get(cz[6]) === ASCEND_HOUSE)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
cz_speed[6] *= -1;
}
else
{
cz_goal_x[6] = 1874+40*(Math.random()-0.5);
cz_goal_z[6] = 1696+40*(Math.random()-0.5);
}
}
	if (q >= 2) ts_end(CUT_FREEROAM_CARCHASE2);
}
else if (cut === CUT_FREEROAM_CARCHASE2)
{
// at the start of the cut
if (freeroam_carchase2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("leejung_chase.mp3", 0.4);
music_what_is_playing = 2;
cz_goal_x[6] = 1847;
cz_goal_z[6] = 1754;
document.getElementById("scene").innerHTML = "\"" + freeroam_carchase2_name + "\"";
freeroam_carchase2_started = true;
}
// during the whole cut
speedchange = 0.2;
cz_turned_on[6] = 1;
if (distance_get_xz(cz[6].position.x,cz[6].position.z, cz_goal_x[6],cz_goal_z[6]) < 2)
{
if (Math.random() > 0.8)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
}
else
{
cz_goal_x[6] = 1847+5*(Math.random()-0.5);
cz_goal_z[6] = 1754+5*(Math.random()-0.5);
}
}
	if (q >= 3) ts_end(CUT_FREEROAM_CARCHASE2);
}
else if (cut === CUT_FREEROAM_CARCHASE3)
{
// at the start of the cut
if (freeroam_carchase3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("leejung_chase.mp3", 0.4);
music_what_is_playing = 2;
cz_goal_x[6] = 1910;
cz_goal_z[6] = 1709;
document.getElementById("scene").innerHTML = "\"" + freeroam_carchase3_name + "\"";
freeroam_carchase3_started = true;
}
// during the whole cut
speedchange = 0.4;
cz_turned_on[6] = 1;
if (distance_get_xz(cz[6].position.x,cz[6].position.z, cz_goal_x[6],cz_goal_z[6]) < 2)
{
if (Math.random() > 0.8)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
}
else
{
cz_goal_x[6] = 1910+20*(Math.random()-0.5);
cz_goal_z[6] = 1709+20*(Math.random()-0.5);
}
}
	if (q >= 1) ts_end(CUT_FREEROAM_CARCHASE2);
}
else if (cut === CUT_FREEROAM_CARCHASE4)
{
// at the start of the cut
if (freeroam_carchase4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("leejung_chase.mp3", 0.4);
music_what_is_playing = 2;
cz_goal_x[6] = 1903;
cz_goal_z[6] = 1685;
document.getElementById("scene").innerHTML = "\"" + freeroam_carchase4_name + "\"";
freeroam_carchase4_started = true;
}
// during the whole cut
speedchange = 0.3;
cz_turned_on[6] = 1;
if (distance_get_xz(cz[6].position.x,cz[6].position.z, cz_goal_x[6],cz_goal_z[6]) < 2)
{
if (Math.random() > 0.9)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
}
else
{
cz_goal_x[6] = 1903+9*(Math.random()-0.5);
cz_goal_z[6] = 1685+9*(Math.random()-0.5);
}
}
}
else if (cut >= CUT_FREEROAM_MAGNETDAY && cut <= 1009501+48)	// involverar m�nga cuts i en!
{
		// block the south way out of 'epper land - se till att man fattar att man inte ska �ka tillbaka, och att man inte ens kan!!
		if (ci1 === 36 && (cj1 >= 33 && cj1 <= 35))
		{
			if (x_to_x_in_chunk(player.position.x) < 10)
			{
				player.position.x += 2;
				cc(sprite[9], "ha ha. i put up invisible walls so you can't go home. you get to live but you're stuck!! ha ha. wait i already said ha ha");
			}
		}
		// man ska inte kunna hoppa �ver till magnet island fr�n epper-hongkong-v�gen!!
		// man ska inte heller kunna spara s� att man hamnar p� magnet island!!
		move_player = true;
		sprite_magnet1.visible = true;
		sprite_magnet2.visible = true;
		sprite_magnet3.visible = true;
		sprite_magnet4.visible = true;
		sprite_magnet5.visible = true;
		sprite_magnet6.visible = true;
		for (let t = 0; t < 6; t++) sprite_table[t].visible = true;
		if (frame_counter % 30 >= 15) { sprite_festivalsign.visible = true; sprite_festival.visible = false; }
		else { sprite_festival.visible = true; sprite_festivalsign.visible = false; }
		place_sprite_noidle(sprite_magnet1, freeroam_magnetday_position_x-2, freeroam_magnetday_position_z-4);
		place_sprite_noidle(sprite_magnet2, freeroam_magnetday_position_x+2, freeroam_magnetday_position_z-4);
		place_sprite_noidle(sprite_magnet3, freeroam_magnetday_position_x-6, freeroam_magnetday_position_z+5);	sprite_magnet3.position.y += 0.3;
		place_sprite_noidle(sprite_magnet4, freeroam_magnetday_position_x+6, freeroam_magnetday_position_z+5);	sprite_magnet4.position.y += 0.25;
		place_sprite_noidle(sprite_magnet5, freeroam_magnetday_position_x-7, freeroam_magnetday_position_z-2);
		place_sprite_noidle(sprite_magnet6, freeroam_magnetday_position_x+6, freeroam_magnetday_position_z-2);
		place_sprite_noidle(sprite_table[0], freeroam_magnetday_position_x-2, freeroam_magnetday_position_z-3.8);
		place_sprite_noidle(sprite_table[1], freeroam_magnetday_position_x+1.8, freeroam_magnetday_position_z-3.8);
		place_sprite_noidle(sprite_table[2], freeroam_magnetday_position_x-5.8, freeroam_magnetday_position_z+4.8);
		place_sprite_noidle(sprite_table[3], freeroam_magnetday_position_x+5.8, freeroam_magnetday_position_z+4.8);
		place_sprite_noidle(sprite_table[4], freeroam_magnetday_position_x-6.8, freeroam_magnetday_position_z-1.8);
		place_sprite_noidle(sprite_table[5], freeroam_magnetday_position_x+6, freeroam_magnetday_position_z-2);
		place_sprite_noidle(sprite_festivalsign, freeroam_magnetday_position_x+6, freeroam_magnetday_position_z+3);
		place_sprite_noidle(sprite_festival, freeroam_magnetday_position_x+6, freeroam_magnetday_position_z+3);
		cz_turned_on[7] = 1;
		if (cut === CUT_FREEROAM_MAGNETDAY)
		{
			if (freeroam_magnetday_started === false)
			{
				music_play("");
				music_what_is_playing = 1;
				document.getElementById("scene").innerHTML = "\"" + freeroam_magnetday_name + "\"";
				for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
				cz[7].position.x = freeroam_magnetday_position_x;
				cz[7].position.z = freeroam_magnetday_position_z;
				cz[2].position.x = 1441;
				cz[2].position.z = 1447;
				cz[0].position.x = 1441;
				cz[0].position.z = 1447;
				cz[4].position.x = 1441;
				cz[4].position.z = 1447;
				cz_goal_x[7] = 1486+18*(Math.random()-0.5);
				cz_goal_z[7] = 1434+18*(Math.random()-0.5);
				freeroam_magnetday_started = true;
			}
			cz_turned_on[7] = 1;
			if (freeroam_magnetday_hasseen_mrs === true)
			{
				cz_turned_on[2] = 1;
				cz_turned_on[0] = 1;
				cz_turned_on[4] = 1;
				cz_goal_x[2] = 1462;
				cz_goal_z[2] = 1451;
				cz_goal_x[0] = 1462-1;
				cz_goal_z[0] = 1451;
				cz_goal_x[4] = 1462+1;
				cz_goal_z[4] = 1451;
			}
			if (distance_get_xz(cz[7].position.x,cz[7].position.z, cz_goal_x[7],cz_goal_z[7]) < 2)
			{
				cz_goal_x[7] = 1486+18*(Math.random()-0.5);
				cz_goal_z[7] = 1434+18*(Math.random()-0.5);
			}
			if (distance_get(player, sprite_magnet1) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_1);
			}
			else if (distance_get(player, sprite_magnet2) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_2);
			}
			else if (distance_get(player, sprite_magnet3) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_3);
			}
			else if (distance_get(player, sprite_magnet4) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_4);
			}
			else if (distance_get(player, sprite_magnet5) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_5);
			}
			else if (distance_get(player, sprite_magnet6) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_6);
			}
			else if (distance_get(player, sprite[7]) < 2)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MAGNETDAY_MRS);
			}
			else if (distance_get(player, cz[2]) < 3)
			{
				sprite_ui_mouseclick.visible = true;
				if (mouseclick) ts_end(CUT_CUTSCENE_MEETING_2);
			}
		}
}
else if (cut >= CUT_CUTSCENE_MEETING_2 && cut <= CUT_CUTSCENE_MEETING_2+48)
{
// at the start of the cut
if (cutscene_meeting_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
cutscene_meeting_2_started = true;
}
// during the whole cut
		sprite_cappy.visible = true;
		place_cz_in_room_ground(sprite_cappy, "e");
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "s");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "n");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "w");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
else if (cut === CUT_FREEROAM_DGCHILL)
{
// at the start of the cut
if (freeroam_dgchill_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1745;
cz[0].position.z = 1935+1;
cz[2].position.x = 1745;
cz[2].position.z = 1935;
cz[4].position.x = 1745;
cz[4].position.z = 1935+1;
cz_goal_array_x = [ 1757,1760,1806,1840,1864,dghouse_position_x+2 ];
cz_goal_array_z = [ 1941,1969,1964,1943,1930,dghouse_position_z+3 ];
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_goal_lap[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_dgchill_name + "\"";
freeroam_dgchill_started = true;
}
// during the whole cut
		speedchange = 0.4;
if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_DGCHILL_BEFORE);
}
cz_turned_on[0] = 1;
cz_turned_on[2] = 1;
cz_turned_on[4] = 1;
for (let t = 0; t < NUMBER_OF_CARS; t++)
{
if (cz_turned_on[t] === 1)
{
cz_goal_x[t] = cz_goal_array_x[cz_goal_lap[t]];
cz_goal_z[t] = cz_goal_array_z[cz_goal_lap[t]];
if (cz_goal_lap[t] >= cz_goal_array_x.length)
{
cz_goal_x[t] = cz[t].position.x;
cz_goal_z[t] = cz[t].position.z;
}
else if (distance_get_xz(cz[t].position.x,cz[t].position.z, cz_goal_array_x[cz_goal_lap[t]],cz_goal_array_z[cz_goal_lap[t]]) < 3)
{
cz_goal_lap[t]++;
}
}
}
}
else if (cut >= CUT_CUTSCENE_DGCHILL_BEFORE && cut <= CUT_CUTSCENE_DGCHILL_BEFORE+48)
{
// at the start of the cut
if (cutscene_dgchill_before_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("haftlansong.mp3", 0.2);
music_what_is_playing = 2;
cutscene_dgchill_before_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "s");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "sw");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "se");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
else if (cut === CUT_FREEROAM_DGCHILL_BGLIDE)
{
// at the start of the cut
if (freeroam_dgchill_bglide_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cz[0].position.x = dghouse_position_x+2;
cz[0].position.z = dghouse_position_z+2;
cz[2].position.x = dghouse_position_x+3;
cz[2].position.z = dghouse_position_z+3;
cz[4].position.x = dghouse_position_x+2;
cz[4].position.z = dghouse_position_z-2;
document.getElementById("scene").innerHTML = "\"" + freeroam_dgchill_bglide_name + "\"";
freeroam_dgchill_bglide_started = true;
}
// during the whole cut
if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_FREEROAM_DGCHILL_GLIDE);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[2] = 1;
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
else if (cut === CUT_FREEROAM_DGCHILL_GLIDE)
{
// at the start of the cut
if (freeroam_dgchill_glide_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cz[8].position.x = dghouse_position_x;
cz[8].position.z = dghouse_position_z;
cz[0].position.x = dghouse_position_x+2;
cz[0].position.z = dghouse_position_z+2;
cz[2].position.x = dghouse_position_x+3;
cz[2].position.z = dghouse_position_z+3;
cz[4].position.x = dghouse_position_x+2;
cz[4].position.z = dghouse_position_z-2;
document.getElementById("scene").innerHTML = "\"" + freeroam_dgchill_glide_name + "\"";
freeroam_dgchill_glide_started = true;
}
// during the whole cut
if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_DGCHILL_OPEN);
}
cz_turned_on[8] = 1;
cz_goal_x[8] = dghouse_position_x-2;
cz_goal_z[8] = dghouse_position_z-2;
cz_turned_on[0] = 1;
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[2] = 1;
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
else if (cut >= CUT_CUTSCENE_DGCHILL_OPEN && cut <= CUT_CUTSCENE_DGCHILL_OPEN+48)
{
// at the start of the cut
if (cutscene_dgchill_open_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_polish.mp3", 0.05);
music_what_is_playing = 2;
cutscene_dgchill_open_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "s");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "sw");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "se");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "ne");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}
else if (cut === CUT_FREEROAM_DGHOTSPRING)
{
// at the start of the cut
if (freeroam_dghotspring_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = dghouse_position_x+1;
cz[0].position.z = dghouse_position_z;
cz[1].position.x = dghouse_position_x+1;
cz[1].position.z = dghouse_position_z-2;
cz[2].position.x = dghouse_position_x+1;
cz[2].position.z = dghouse_position_z+1;
cz[4].position.x = dghouse_position_x+1;
cz[4].position.z = dghouse_position_z-1;
cz[8].position.x = dghouse_position_x+1;
cz[8].position.z = dghouse_position_z+2;
document.getElementById("scene").innerHTML = "\"" + freeroam_dghotspring_name + "\"";
freeroam_dghotspring_started = true;
}
// during the whole cut
		speedchange = 0.7;
if (distance_get_xz(player.position.x,player.position.z, freeroam_dghotspring_position_x,freeroam_dghotspring_position_z) < 4)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_DGHOTSPRING);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = 1933.47;
cz_goal_z[0] = 1918.23;
cz_turned_on[1] = 1;
cz_goal_x[1] = 1931.91;
cz_goal_z[1] = 1920.42;
cz_turned_on[2] = 1;
cz_goal_x[2] = 1933.46;
cz_goal_z[2] = 1919.55;
cz_turned_on[4] = 1;
cz_goal_x[4] = 1930.52;
cz_goal_z[4] = 1918.72;
cz_turned_on[8] = 1;
cz_goal_x[8] = 1930.90;
cz_goal_z[8] = 1920.45;
}

else if (cut >= CUT_CUTSCENE_DGHOTSPRING && cut <= CUT_CUTSCENE_DGHOTSPRING+48)
{
// at the start of the cut
if (cutscene_dghotspring_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_hotspring.mp3", 1);
music_what_is_playing = 2;
cutscene_dghotspring_started = true;
}
// during the whole cut
		player.position.x = 1931.14;
		player.position.z = 1917.52;
		player.position.y = height_get(player);
		place_sprite_noidle(cz[1], 1931.91, 1920.42);
		place_sprite_noidle(cz[8], 1930.90, 1920.45);
		place_sprite_noidle(cz[0], 1933.47, 1918.23);
		place_sprite_noidle(cz[2], 1933.46, 1919.55);
		if (cut < 1011614) place_sprite_noidle(cz[4], 1930.52, 1918.72);
		else place_sprite_noidle(cz[4], 1937.73, 1930.46);
		sprite_cdplayer.visible = true;
		place_sprite_noidle(sprite_cdplayer, 1933.7743833215784, 1917.8928433155568);
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[2] = 1;
cz_turned_on[4] = 1;
}


else if (cut === CUT_FREEROAM_DGHOTSPRING_2)
{
// at the start of the cut
if (freeroam_dghotspring_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[1].position.x = freeroam_dghotspring_position_x;
cz[1].position.z = freeroam_dghotspring_position_z;
cz[0].position.x = cz[1].position.x;
cz[0].position.z = cz[1].position.z+2;
cz[2].position.x = cz[1].position.x;
cz[2].position.z = cz[1].position.z+3;
cz[4].position.x = cz[1].position.x;
cz[4].position.z = cz[1].position.z+4;
cz[8].position.x = cz[1].position.x;
cz[8].position.z = cz[1].position.z+1;
document.getElementById("scene").innerHTML = "\"" + freeroam_dghotspring_2_name + "\"";
freeroam_dghotspring_2_started = true;
}
// during the whole cut
		speedchange = 0.3;
		if (q < 1.25)
		{
			cz_goal_x[1] = freeroam_dghotspring_position_x;
			cz_goal_z[1] = freeroam_dghotspring_position_z;
			cz_goal_x[8] = cz[1].position.x;
			cz_goal_z[8] = cz[1].position.z+1;
			cz_goal_x[0] = cz[1].position.x;
			cz_goal_z[0] = cz[1].position.z+2;
			cz_goal_x[2] = cz[1].position.x;
			cz_goal_z[2] = cz[1].position.z+3;
			cz_goal_x[4] = cz[1].position.x;
			cz_goal_z[4] = cz[1].position.z+4;
		}
		else
		{
			cz_goal_x[1] = dghouse_position_x;
			cz_goal_z[1] = dghouse_position_z;
			cz_goal_x[8] = cz[1].position.x;
			cz_goal_z[8] = cz[1].position.z+1;
			cz_goal_x[0] = cz[1].position.x;
			cz_goal_z[0] = cz[1].position.z+2;
			cz_goal_x[2] = cz[1].position.x;
			cz_goal_z[2] = cz[1].position.z+3;
			cz_goal_x[4] = cz[1].position.x;
			cz_goal_z[4] = cz[1].position.z+4;
		}
if (distance_get_xz(player.position.x,player.position.z, dghouse_position_x,dghouse_position_z) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_DGSLEEP);
}
cz_turned_on[1] = 1;
cz_turned_on[0] = 1;
cz_turned_on[2] = 1;
cz_turned_on[4] = 1;
cz_turned_on[8] = 1;
}

else if (cut >= CUT_CUTSCENE_DGSLEEP && cut <= CUT_CUTSCENE_DGSLEEP+48)
{
// at the start of the cut
if (cutscene_dgsleep_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
room_set("black.png", "black.png");
cutscene_dgsleep_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
		if (cut < 1011820)
		{
			camera_cutscene.fov = 20;
			lookheight = 0.33;
		}
		else
		{
			cz_turned_on[5] = 1;
			place_cz_in_room(cz[5], "w");
		}
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "se");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "e");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "s");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "n");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}
//speedchange = 0.4;
//#cz[6] = spr("C_harass.png");
//disonesty,1304,1890,rnd,20,0.8
else if (cut === CUT_FREEROAM_WASHING)
{
// at the start of the cut
if (freeroam_washing_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("hongkong_music.mp3", 0.1);
music_what_is_playing = 2;
document.getElementById("scene").innerHTML = "\"" + freeroam_washing_name + "\"";
freeroam_washing_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_WASHING && cut <= CUT_CUTSCENE_WASHING+48)
{
// at the start of the cut
if (cutscene_washing_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_harass.mp3", 0.17);
music_what_is_playing = 2;
room_set("fuckyouwall.jpg", "fuckyouwall.jpg");
cutscene_washing_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "n");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut === CUT_FREEROAM_WASHING_2)
{
// at the start of the cut
if (freeroam_washing_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[1].position.x = harasshouse_position_x;
cz[1].position.z = harasshouse_position_z;
cz[5].position.x = harasshouse_position_x;
cz[5].position.z = harasshouse_position_z;
document.getElementById("scene").innerHTML = "\"" + freeroam_washing_2_name + "\"";
freeroam_washing_2_started = true;
}
// during the whole cut
		// temp
	//	ts_end(CUT_RACE_HAFTLAN);
cz_turned_on[1] = 1;
cz_goal_x[1] = harasshouse_position_x+2;
cz_goal_z[1] = harasshouse_position_z+2;
cz_turned_on[5] = 1;
cz_goal_x[5] = harasshouse_position_x+2;
cz_goal_z[5] = harasshouse_position_z+2;
}
//!!
// efter freeroam_washing_2 (g�ra en massa saker med hårass),
// s� ropar dark gandalf att ni ska race:a. alla �ker till startpunkten
// men d�r st�r en worker, som man d� ska klicka p� f�r att prata med.
// efter det �r EPISODE 1 slut
//
else if (cut === CUT_FREEROAM_RACE_HAFTLAN_AFTER)
{
// at the start of the cut
if (freeroam_race_haftlan_after_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = carclub_position_x+2;
cz[0].position.z = carclub_position_z+2;
cz[2].position.x = carclub_position_x+2;
cz[2].position.z = carclub_position_z+3;
cz[3].position.x = carclub_position_x+2;
cz[3].position.z = carclub_position_z+4;
document.getElementById("scene").innerHTML = "\"" + freeroam_race_haftlan_after_name + "\"";
freeroam_race_haftlan_after_started = true;
}
// during the whole cut
		sprite_worker.visible = true;
		place_sprite(sprite_worker, 1786, 1887);	// the race must end in haftlan for this!!
if (distance_get(player, sprite_worker) < 4)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_WORKERSBUILDING);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = carclub_position_x+2;
cz_goal_z[0] = carclub_position_z+2;
cz_turned_on[2] = 1;
cz_goal_x[2] = carclub_position_x+2;
cz_goal_z[2] = carclub_position_z+3;
cz_turned_on[3] = 1;
cz_goal_x[3] = player.position.x+3;
cz_goal_z[3] = player.position.z+3;
}
else if (cut >= CUT_CUTSCENE_WORKERSBUILDING && cut <= CUT_CUTSCENE_WORKERSBUILDING+48)
{
// at the start of the cut
if (cutscene_workersbuilding_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_workersbuilding_started = true;
}
// during the whole cut
		sprite_worker.visible = true;
		place_sprite_noidle(sprite_worker, 1786, 1887);
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "se");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "s");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "sw");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
else if (cut === CUT_FREEROAM_EPISODE1END)
{
// at the start of the cut
if (freeroam_episode1end_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_episode1end_name + "\"";
freeroam_episode1end_started = true;
}
// during the whole cut
}
else if (cut === CUT_FREEROAM_3_5)
{
// at the start of the cut
if (freeroam_3_5_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
document.getElementById("scene").innerHTML = "\"" + freeroam_3_5_name + "\"";
freeroam_3_5_started = true;
}
// during the whole cut
if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_MEETING_3);
}
}
else if (cut >= CUT_CUTSCENE_MEETING_3 && cut <= CUT_CUTSCENE_MEETING_3+48)
{
// at the start of the cut
if (cutscene_meeting_3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall carclub.jpg", "woodenfloor.jpg");
cutscene_meeting_3_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "e");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "ne");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "sw");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "n");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "w");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut === CUT_FREEROAM_4)
{
// at the start of the cut
if (freeroam_4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = carclub_position_x+3;
cz[0].position.z = carclub_position_z+2;
cz[1].position.x = carclub_position_x+7;
cz[1].position.z = carclub_position_z+2;
cz[2].position.x = carclub_position_x+6;
cz[2].position.z = carclub_position_z+2;
cz[3].position.x = carclub_position_x+2;
cz[3].position.z = carclub_position_z+2;
cz[4].position.x = carclub_position_x+4;
cz[4].position.z = carclub_position_z+2;
cz[5].position.x = carclub_position_x+5;
cz[5].position.z = carclub_position_z+2;
cz_goal_array_x = [ 1621,1603,1595,1598,1606,1607,1594,1582,1545,1534,1521,1510,1498,1480,1471,1460,1459,1450,1440,1442,1472 ];
cz_goal_array_z = [ 1797,1783,1777,1764,1749,1733,1736,1737,1746,1733,1727,1729,1730,1747,1755,1768,1781,1787,1795,1810,1807 ];
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_goal_lap[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_4_name + "\"";
freeroam_4_started = true;
}
// during the whole cut
		speedchange = 0.8;
if (distance_get_xz(player.position.x,player.position.z, 1472,1807) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_LICENSE);
}
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[2] = 1;
cz_turned_on[3] = 1;
cz_turned_on[4] = 1;
cz_turned_on[5] = 1;
for (let t = 0; t < NUMBER_OF_CARS; t++)
{
if (cz_turned_on[t] === 1)
{
cz_goal_x[t] = cz_goal_array_x[cz_goal_lap[t]];
cz_goal_z[t] = cz_goal_array_z[cz_goal_lap[t]];
if (cz_goal_lap[t] >= cz_goal_array_x.length)
{
cz_goal_x[t] = cz[t].position.x;
cz_goal_z[t] = cz[t].position.z;
}
else if (distance_get_xz(cz[t].position.x,cz[t].position.z, cz_goal_array_x[cz_goal_lap[t]],cz_goal_array_z[cz_goal_lap[t]]) < 3)
{
cz_goal_lap[t]++;
}
}
}
}
else if (cut >= CUT_CUTSCENE_LICENSE && cut <= CUT_CUTSCENE_LICENSE+48)
{
// at the start of the cut
if (cutscene_license_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("dogertsong.mp3", 0.25);
music_what_is_playing = 2;
cutscene_license_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "e");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "ne");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "sw");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "n");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "w");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut === CUT_FREEROAM_LICENSE)
{
// at the start of the cut
if (freeroam_license_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[3].position.x = 1472;
cz[3].position.z = 1807;
document.getElementById("scene").innerHTML = "\"" + freeroam_license_name + "\"";
freeroam_license_started = true;
}
// during the whole cut
		if ((key_a === true || key_d === true) && frame_counter % 40 === 0) ts_end(CUT_CUTSCENE_LICENSE_2);
cz_turned_on[3] = 1;
cz_goal_x[3] = 1472;
cz_goal_z[3] = 1807;
}
else if (cut >= CUT_CUTSCENE_LICENSE_2 && cut <= CUT_CUTSCENE_LICENSE_2+48)
{
// at the start of the cut
if (cutscene_license_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("dogertsong.mp3", 0.25);
music_what_is_playing = 2;
cutscene_license_2_started = true;
}
// during the whole cut
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "n");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
}



else if (cut === CUT_FREEROAM_LICENSE_2)
{
// at the start of the cut
if (freeroam_license_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
for (let t = 0; t < 5; t++)
{
	sprite_license_kocar[t].position.x = freeroam_license_2_position_x;
	sprite_license_kocar[t].position.z = freeroam_license_2_position_z + 1.5*t;
}
document.getElementById("scene").innerHTML = "\"" + freeroam_license_2_name + "\"";
freeroam_license_2_started = true;
}
// during the whole cut
		cz[3].position.x = sprite_license_kocar[4].position.x;
		cz[3].position.z = sprite_license_kocar[4].position.z + 3;
		for (let t = 0; t < 5; t++)
		{
			sprite_license_kocar[t].visible = true;
			sprite_license_kocar[t].position.y = height_get(sprite_license_kocar[t]);
			if (sprite_license_kocar[t].position.y <= sealevel) sprite_license_kocar[t].position.y = sealevel;
			sprite_license_kocar[t].position.z += 0.01;
		}
		freeroam_license_5_mottimer--;
		if (freeroam_license_5_mottimer <= 150 && freeroam_license_5_mottimer > 0)
		{
			sprite_license_5_motcar.visible = true;
			sprite_license_5_motcar.position.z -= 0.25;
			sprite_license_5_motcar.position.y = height_get(sprite_license_5_motcar);
		}
		else
		{
			sprite_license_5_motcar.visible = false;
			place_sprite_noidle(sprite_license_5_motcar, sprite_license_kocar[4].position.x+1.5, sprite_license_kocar[4].position.z+10);
			if (freeroam_license_5_mottimer <= 0) freeroam_license_5_mottimer = 180;
		}
		if (distance_get(player, sprite_license_5_motcar) < 1)
		{
			player.position.x = sprite_license_kocar[0].position.x;
			player.position.z = sprite_license_kocar[0].position.z - 4;
		}
		if (player.position.x < sprite_license_kocar[2].position.x-0.7)
		{
			player.position.x = sprite_license_kocar[0].position.x;
			player.position.z = sprite_license_kocar[0].position.z - 4;
		}
		for (let t = 0; t < 5; t++)
		{
			if (distance_get(player, sprite_license_kocar[t]) < 0.7) speed = 0;
		}
		if (distance_get(player, sprite_license_kocar[2]) < 7 && player.position.x > sprite_license_kocar[2].position.x && player.position.z > sprite_license_kocar[4].position.z+1 && distance_get(player, sprite_license_kocar[4]) < 4)
		{
			for (let t = 0; t < 5; t++) sprite_license_kocar[t].visible = false;
			sprite_license_5_motcar.visible = false;
			ts_end(CUT_CUTSCENE_LICENSE_3);
		}
		if (q > 6) ts_end(CUT_CUTSCENE_LICENSE_3);
}
else if (cut >= CUT_CUTSCENE_LICENSE_3 && cut <= CUT_CUTSCENE_LICENSE_3+48)
{
// at the start of the cut
if (cutscene_license_3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_license_3_started = true;
}
// during the whole cut
		sprite_cappy.visible = true;
		place_cz_in_room_ground(sprite_cappy, "e");
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "n");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
}
else if (cut === CUT_FREEROAM_LICENSE_3)
{
// at the start of the cut
if (freeroam_license_3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_license_3_name + "\"";
freeroam_license_3_started = true;
}
// during the whole cut
		if (key_s === true && frame_counter % 40 === 0) ts_end(CUT_CUTSCENE_LICENSE_4);
}
else if (cut >= CUT_CUTSCENE_LICENSE_4 && cut <= CUT_CUTSCENE_LICENSE_4+48)
{
// at the start of the cut
if (cutscene_license_4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_license_4_started = true;
}
// during the whole cut
		sprite_cappy.visible = true;
		place_cz_in_room_ground(sprite_cappy, "e");
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "n");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
}
// dogert ska vara dar han ska vara?!

else if (cut === CUT_FREEROAM_LICENSE_4)
{
// at the start of the cut
if (freeroam_license_4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_license_4_name + "\"";
freeroam_license_4_started = true;
}
// during the whole cut
		sprite_license_3_car1.visible = true;
		sprite_license_3_car2.visible = true;
		place_sprite_noidle(sprite_license_3_car1, freeroam_license_3_position_x, freeroam_license_3_position_z-0.7);
		place_sprite_noidle(sprite_license_3_car2, freeroam_license_3_position_x, freeroam_license_3_position_z+0.7);
		if (!(distance_get(player, sprite_license_3_car1) < 0.7 || distance_get(player, sprite_license_3_car2) < 0.7))
		{
			lastpos_x_before_collision = player.position.x;
			lastpos_z_before_collision = player.position.z;
		}
		else
		{
			speed *= -0.25;
			player.position.x = lastpos_x_before_collision;
			player.position.z = lastpos_z_before_collision;
		}
		if (q >= 4)
		{
			sprite_license_3_car1.visible = false;
			sprite_license_3_car2.visible = false;
			ts_end(CUT_CUTSCENE_LICENSE_5);	// diskvalificerad!
		}
		else if ((speed < 0 || speed > 0) && distance_get(player, sprite_license_3_car1) < 0.9 && distance_get(player, sprite_license_3_car2) < 0.9 && ((rotation_real_get(player.rotation.y) < 0.25*Math || rotation_real_get(player.rotation.y) >= 1.75*Math.PI) || (rotation_real_get(player.rotation.y) >= 0.75*Math.PI && rotation_real_get(player.rotation.y) < 1.25*Math.PI)))
		{
			sprite_license_3_car1.visible = false;
			sprite_license_3_car2.visible = false;
			ts_end(CUT_CUTSCENE_LICENSE_5+1); // vinst!
		}
}
else if (cut >= CUT_CUTSCENE_LICENSE_5 && cut <= CUT_CUTSCENE_LICENSE_5+48)
{
// at the start of the cut
if (cutscene_license_5_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_license_5_started = true;
}
// during the whole cut
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "n");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
}

else if (cut === CUT_FREEROAM_LICENSE_5)
{
// at the start of the cut
if (freeroam_license_5_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("dogertsong.mp3", 0.25);
music_what_is_playing = 2;
cz[0].position.x = 1439;
cz[0].position.z = 1835;
cz[1].position.x = 1439+4;
cz[1].position.z = 1835;
cz[2].position.x = 1439+3;
cz[2].position.z = 1835;
cz[3].position.x = cz[3].position.x;
cz[3].position.z = cz[3].position.z;
cz[4].position.x = 1439+1;
cz[4].position.z = 1835;
cz[5].position.x = 1439+2;
cz[5].position.z = 1835;
document.getElementById("scene").innerHTML = "\"" + freeroam_license_5_name + "\"";
freeroam_license_5_started = true;
}
// during the whole cut
		sprite_cappy.visible = true;
		if (q >= 0.5)
		{
			sprite_ui_mouseclick.visible = true;
			sprite_iloveyou.visible = true;
			if (mouseclick === true) ts_end(CUT_CUTSCENE_LICENSE_END);
		}
		place_sprite_noidle(sprite_cappy, player.position.x+3, player.position.z+3);
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[2] = 1;
cz_turned_on[3] = 1;
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
cz_turned_on[4] = 1;
cz_turned_on[5] = 1;
}
else if (cut >= CUT_CUTSCENE_LICENSE_END && cut <= CUT_CUTSCENE_LICENSE_END+48)
{
// at the start of the cut
if (cutscene_license_end_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_license_end_started = true;
}
// during the whole cut
}
else if (cut === CUT_FREEROAM_FLOATIES)
{
// at the start of the cut
if (freeroam_floaties_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1467;
cz[0].position.z = 1816;
cz[1].position.x = 1467+4;
cz[1].position.z = 1816;
cz[2].position.x = 1467+3;
cz[2].position.z = 1816;
cz[4].position.x = 1467+1;
cz[4].position.z = 1816;
cz[5].position.x = 1467+2;
cz[5].position.z = 1816;
document.getElementById("scene").innerHTML = "\"" + freeroam_floaties_name + "\"";
freeroam_floaties_started = true;
}
// during the whole cut
		if (player.position.y < sealevel+0.1) ts_end(CUT_FREEROAM_MAGNETDROWN);
cz_turned_on[0] = 1;
cz_goal_x[0] = 1438;
cz_goal_z[0] = 1847;
cz_turned_on[1] = 1;
cz_goal_x[1] = 1438+4;
cz_goal_z[1] = 1847;
cz_turned_on[2] = 1;
cz_goal_x[2] = 1438+3;
cz_goal_z[2] = 1847;
cz_turned_on[4] = 1;
cz_goal_x[4] = 1438+1;
cz_goal_z[4] = 1847;
cz_turned_on[5] = 1;
cz_goal_x[5] = 1438+2;
cz_goal_z[5] = 1847;
}




else if (cut === CUT_FREEROAM_MAGNETDROWN)
{
// at the start of the cut
if (freeroam_magnetdrown_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1437;
cz[0].position.z = 1847;
cz[1].position.x = 1438+4;
cz[1].position.z = 1847;
cz[2].position.x = 1438+3;
cz[2].position.z = 1847;
cz[4].position.x = 1438+1;
cz[4].position.z = 1847;
cz[5].position.x = 1438+2;
cz[5].position.z = 1847;
document.getElementById("scene").innerHTML = "\"" + freeroam_magnetdrown_name + "\"";
freeroam_magnetdrown_started = true;
}
// during the whole cut
		if (q <= 3)
		{
			speedchange = 0.5;
			cz_goal_x[4] = 1428;
			cz_goal_z[4] = 1649;
			cz_goal_x[5] = 1428;
			cz_goal_z[5] = 1649+1;
			cz_goal_x[2] = 1428;
			cz_goal_z[2] = 1649+1;
			cz_goal_x[0] = 1428;
			cz_goal_z[0] = 1649+1;
			cz_goal_x[1] = 1428;
			cz_goal_z[1] = 1649+1;
		}
		else
		{
			speedchange = 0.8;
			cz_goal_x[4] = player.position.x+2;
			cz_goal_z[4] = player.position.z+2;
			cz_goal_x[5] = player.position.x+2;
			cz_goal_z[5] = player.position.z+3;
			cz_goal_x[2] = player.position.x+2;
			cz_goal_z[2] = player.position.z+4;
			cz_goal_x[0] = player.position.x+2;
			cz_goal_z[0] = player.position.z+5;
			cz_goal_x[1] = player.position.x+2;
			cz_goal_z[1] = player.position.z+6;
		}
		for (let t = 0; t < 6; t++)
		{
			if (t >= magnets_process) sprite_magnetdrown_magnet[t].visible = true;
			else sprite_magnetdrown_magnet[t].visible = false;
			sprite_magnetdrown_magnet[t].position.set(freeroam_magnetdrown_magnet_x[t], sealevel+0.35, freeroam_magnetdrown_magnet_z[t]);
		}
		sprite_magnetdrown_seal.visible = true;
		sprite_magnetdrown_seal.position.set(1418, area_water.position.y+0.75, 1646);
if (distance_get(player, sprite_magnetdrown_seal) < 8)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_MAGNETDROWN_SEAL);
}
		// attracted by small magnets along the way
		for (let t = magnets_process; t < 6; t++)
		{
			let distance = distance_get_xz(player.position.x,player.position.z, freeroam_magnetdrown_magnet_x[t],freeroam_magnetdrown_magnet_z[t]);
			if (distance < 75 && distance >= 0.5 && t === magnets_process)
			{
				player.position.x += 0.02 * (freeroam_magnetdrown_magnet_x[t]-player.position.x) / distance;
				player.position.z += 0.02 * (freeroam_magnetdrown_magnet_z[t]-player.position.z) / distance;
			}
			if (distance < 2) magnets_process++;
		}
		if (washingmachine_timer <= 0 && player.position.y < sealevel) player.position.y = sealevel;	// physics
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (cz_turned_on[t] === 1)
			{
				if (cz[t].position.y < sealevel) cz[t].position.y = sealevel;
			}
		}
if (distance_get(player, mesh_train) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_MAGNETDROWN);
}
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[2] = 1;
cz_turned_on[4] = 1;
cz_turned_on[5] = 1;
}
else if (cut >= CUT_CUTSCENE_MAGNETDROWN_SEAL && cut <= CUT_CUTSCENE_MAGNETDROWN_SEAL+48)
{
// at the start of the cut
if (cutscene_magnetdrown_seal_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_magnetdrown_seal_started = true;
}
// during the whole cut
		sprite_magnetdrown_seal.visible = true;
		sprite_magnetdrown_seal.position.set(1409, area_water.position.y+0.35, 1646);
		place_cz_in_room(sprite_magnetdrown_seal, "nw");
}

else if (cut >= CUT_CUTSCENE_MAGNETDROWN && cut <= CUT_CUTSCENE_MAGNETDROWN+48)
{
// at the start of the cut
if (cutscene_magnetdrown_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_magnetdrown_started = true;
}
// during the whole cut
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (cz_turned_on[t] === 1)
			{
				if (cz[t].position.y < sealevel) cz[t].position.y = sealevel;
			}
		}
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "w");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "nw");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "e");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "ne");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
cz_turned_on[7] = 1;
place_cz_in_room(cz[7], "s");
cz_goal_x[7] = cz[7].position.x;
cz_goal_z[7] = cz[7].position.z;
}


// om dogert l�ggs efter goals, s� borde dogerts enskilda goal s�ttas efter alla goal arrays s�tts, s� det b�r bli r�tt...?
else if (cut === CUT_FREEROAM_GOINGHOME)
{
// at the start of the cut
if (freeroam_goinghome_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1429;
cz[0].position.z = 1961+4;
cz[1].position.x = 1429;
cz[1].position.z = 1961+5;
cz[5].position.x = 1429;
cz[5].position.z = 1961+2;
cz_goal_array_x = [ 1426,1429,1438,1451,1461,1480,1507,1508,1508,1511,1521,1529,1540,1567,1580,1598,1642,1686 ];
cz_goal_array_z = [ 1964,1961,1981,1975,1965,1957,1949,1932,1908,1893,1889,1883,1882,1883,1884,1877,1853,1840 ];
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_goal_lap[t] = 0;
cz[3].position.x = 1690;
cz[3].position.z = 1828;
document.getElementById("scene").innerHTML = "\"" + freeroam_goinghome_name + "\"";
freeroam_goinghome_started = true;
}
// during the whole cut
		// fire
		for (let t = 0; t < 9; t++)
		{
			for (let u = 0; u < 4; u++)
			{
				if (t < 8) place_sprite_noidle(sprite_fire[t][u], carclub_position_x + 4*(pseudorandom(t*7)-0.5), carclub_position_z + 4*(pseudorandom(t*4)-0.5));
				else sprite_fire[t][u].position.set(carclub_position_x+0.5, 2.7, carclub_position_z+0.5);
			}
			// animation
			sprite_fire[t][0].visible = false;
			sprite_fire[t][1].visible = false;
			sprite_fire[t][2].visible = false;
			sprite_fire[t][3].visible = false;
			if (frame_counter % 20 > 15) sprite_fire[t][0].visible = true;
			else if (frame_counter % 20 > 10) sprite_fire[t][1].visible = true;
			else if (frame_counter % 20 > 5) sprite_fire[t][2].visible = true;
			else sprite_fire[t][3].visible = true;
		}
		if (player.position.y < sealevel) player.position.y = sealevel;
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (cz_turned_on[t] === 1)
			{
				if (cz[t].position.y < sealevel) cz[t].position.y = sealevel;
			}
		}
if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 10)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_FREEROAM_CARCLUBFIRE);
}
if (distance_get(player, cz[3]) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_GOINGHOME_DOGERT);
}
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[5] = 1;
for (let t = 0; t < NUMBER_OF_CARS; t++)
{
if (cz_turned_on[t] === 1)
{
cz_goal_x[t] = cz_goal_array_x[cz_goal_lap[t]];
cz_goal_z[t] = cz_goal_array_z[cz_goal_lap[t]];
if (cz_goal_lap[t] >= cz_goal_array_x.length)
{
cz_goal_x[t] = cz[t].position.x;
cz_goal_z[t] = cz[t].position.z;
}
else if (distance_get_xz(cz[t].position.x,cz[t].position.z, cz_goal_array_x[cz_goal_lap[t]],cz_goal_array_z[cz_goal_lap[t]]) < 3)
{
cz_goal_lap[t]++;
}
}
}
cz_turned_on[3] = 1;
cz_goal_x[3] = player.position.x;
cz_goal_z[3] = player.position.z;
}

else if (cut >= CUT_CUTSCENE_GOINGHOME_DOGERT && cut <= CUT_CUTSCENE_GOINGHOME_DOGERT+48)
{
// at the start of the cut
if (cutscene_goinghome_dogert_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_goinghome_dogert_started = true;
}
// during the whole cut
		// fire
		for (let t = 0; t < 9; t++)
		{
			for (let u = 0; u < 4; u++)
			{
				if (t < 8) place_sprite_noidle(sprite_fire[t][u], carclub_position_x + 4*(pseudorandom(t*7)-0.5), carclub_position_z + 4*(pseudorandom(t*4)-0.5));
				else sprite_fire[t][u].position.set(carclub_position_x+0.5, 2.7, carclub_position_z+0.5);
			}
			// animation
			sprite_fire[t][0].visible = false;
			sprite_fire[t][1].visible = false;
			sprite_fire[t][2].visible = false;
			sprite_fire[t][3].visible = false;
			if (frame_counter % 20 > 15) sprite_fire[t][0].visible = true;
			else if (frame_counter % 20 > 10) sprite_fire[t][1].visible = true;
			else if (frame_counter % 20 > 5) sprite_fire[t][2].visible = true;
			else sprite_fire[t][3].visible = true;
		}
}


else if (cut === CUT_FREEROAM_CARCLUBFIRE)
{
// at the start of the cut
if (freeroam_carclubfire_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = carclub_position_x+1;
cz[0].position.z = carclub_position_z+3;
cz[1].position.x = carclub_position_x+4;
cz[1].position.z = carclub_position_z+3;
cz[4].position.x = carclub_position_x+5;
cz[4].position.z = carclub_position_z+3;
cz[5].position.x = carclub_position_x+2;
cz[5].position.z = carclub_position_z+3;
document.getElementById("scene").innerHTML = "\"" + freeroam_carclubfire_name + "\"";
freeroam_carclubfire_started = true;
}
// during the whole cut
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			cz_goal_x[t] = cz[t].position.x;
			cz_goal_z[t] = cz[t].position.z;
		}
		// fire
		for (let t = 0; t < 9; t++)
		{
			for (let u = 0; u < 4; u++)
			{
				if (t < 8) place_sprite_noidle(sprite_fire[t][u], carclub_position_x + 4*(pseudorandom(t*7)-0.5), carclub_position_z + 4*(pseudorandom(t*4)-0.5));
				else sprite_fire[t][u].position.set(carclub_position_x+0.5, 2.7, carclub_position_z+0.5);
			}
			// animation
			sprite_fire[t][0].visible = false;
			sprite_fire[t][1].visible = false;
			sprite_fire[t][2].visible = false;
			sprite_fire[t][3].visible = false;
			if (frame_counter % 20 > 15) sprite_fire[t][0].visible = true;
			else if (frame_counter % 20 > 10) sprite_fire[t][1].visible = true;
			else if (frame_counter % 20 > 5) sprite_fire[t][2].visible = true;
			else sprite_fire[t][3].visible = true;
		}
if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_MEETING_4);
}
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[4] = 1;
cz_turned_on[5] = 1;
}
else if (cut >= CUT_CUTSCENE_CARCLUBFIRE && cut <= CUT_CUTSCENE_CARCLUBFIRE+48)
{
// at the start of the cut
if (cutscene_carclubfire_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_carclubfire_started = true;
}
// during the whole cut
}

else if (cut >= CUT_CUTSCENE_MEETING_4 && cut <= CUT_CUTSCENE_MEETING_4+48)
{
// at the start of the cut
if (cutscene_meeting_4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall t.jpg", "woodenfloor.jpg");
cutscene_meeting_4_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
		// fire
		for (let t = 0; t < 9; t++)
		{
			for (let u = 0; u < 4; u++)
			{
				if (t < 8) sprite_fire[t][u].position.set(player.position.x + 2*(pseudorandom(t*7)-0.5), player.position.y+0.3, player.position.z + 2*(pseudorandom(t*4)-0.5));
			}
			// animation
			sprite_fire[t][0].visible = false;
			sprite_fire[t][1].visible = false;
			sprite_fire[t][2].visible = false;
			sprite_fire[t][3].visible = false;
			if (frame_counter % 20 > 15) sprite_fire[t][0].visible = true;
			else if (frame_counter % 20 > 10) sprite_fire[t][1].visible = true;
			else if (frame_counter % 20 > 5) sprite_fire[t][2].visible = true;
			else sprite_fire[t][3].visible = true;
		}
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "e");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "w");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}



else if (cut === CUT_FREEROAM_KILLEPPER)
{
// at the start of the cut
if (freeroam_killepper_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = carclub_position_x+1;
cz[0].position.z = carclub_position_z+3;
cz[5].position.x = carclub_position_x+10;
cz[5].position.z = carclub_position_z+30;
cz[9].position.x = 1844;
cz[9].position.z = 1756;
document.getElementById("scene").innerHTML = "\"" + freeroam_killepper_name + "\"";
freeroam_killepper_started = true;
}
// during the whole cut
		if (q >= 2.5 && q < 4)
		{
			cz_goal_x[5] = player.position.x+10;
			cz_goal_z[5] = player.position.z+10;
		}
		// flying controls
		if (key_w)
		{
			player.position.y += 0.08 - 0.008*(player.position.y-height_get(player));
		}
		if (key_s)
		{
			speed -= 0.001;
			if (speed > 0) speed = 0;
			player.position.y -= 0.04;
		}
		if (mouseclick === true && freeroam_killepper_bomb_timer <= 0 && player.position.y >= height_get(player)+5)
		{
			sprite_killepper_bomb.position.set(player.position.x, player.position.y, player.position.z);
			freeroam_killepper_bomb_timer = 200;
			sound_play(sound_bombdrop);
		}
		if (freeroam_killepper_bomb_timer > 0)
		{
			if (sprite_killepper_bomb.position.y > height_get(sprite_killepper_bomb))
			{
				sprite_killepper_bomb.position.y -= 0.1;
			}
			else
			{
				sound_bombdrop.pause();
				sound_play(sound_bomb);
				freeroam_killepper_bomb_dropped = true;
				freeroam_killepper_bomb_timer = 0;
			}
			freeroam_killepper_bomb_timer--;
		}
		if (freeroam_killepper_bomb_dropped === true)
		{
			freeroam_killepper_dropped_timer++;
			if (freeroam_killepper_dropped_timer > 180)
			{
				freeroam_killepper_dropped_timer = 0;
				freeroam_killepper_bomb_dropped = false;
			}
		}
		if (distance_get(sprite_killepper_bomb, cz[9]) < 5 && freeroam_killepper_bomb_dropped === true && freeroam_killepper_dropped_timer > 179) ts_end(CUT_FREEROAM_5);
cz_turned_on[0] = 1;
cz_goal_x[0] = 1844;
cz_goal_z[0] = 1756;
cz_turned_on[5] = 1;
cz_turned_on[9] = 1;
cz_goal_x[9] = 1844;
cz_goal_z[9] = 1756;
}

else if (cut === CUT_FREEROAM_5)
{
// at the start of the cut
if (freeroam_5_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1844;
cz[0].position.z = 1756;
document.getElementById("scene").innerHTML = "\"" + freeroam_5_name + "\"";
freeroam_5_started = true;
}
// during the whole cut
		// flying controls
		if (key_w)
		{
			player.position.y += 0.08 - 0.008*(player.position.y-height_get(player));
		}
		if (key_s)
		{
			speed -= 0.001;
			if (speed > 0) speed = 0;
			player.position.y -= 0.04;
		}
		if (distance_get_xz(player.position.x,player.position.z, 1899, 1922) < 8) ts_end(CUT_CUTSCENE_SVINERI_1);
cz_turned_on[0] = 1;
cz_goal_x[0] = 1899;
cz_goal_z[0] = 1922;
}
else if (cut >= CUT_CUTSCENE_SVINERI_1 && cut <= CUT_CUTSCENE_SVINERI_1+48)
{
// at the start of the cut
if (cutscene_svineri_1_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_svineri_1_started = true;
}
// during the whole cut
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "ne");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "se");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
}
// spela laten senare i cut

else if (cut === CUT_FREEROAM_SVINERI_1)
{
// at the start of the cut
if (freeroam_svineri_1_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_svineri.mp3", 0.2);
music_what_is_playing = 2;
cz[0].position.x = 1899;
cz[0].position.z = 1922;
cz[1].position.x = 1899-2;
cz[1].position.z = 1922;
cz[5].position.x = 1899+1;
cz[5].position.z = 1922;
cz[8].position.x = 1899-1;
cz[8].position.z = 1922;
document.getElementById("scene").innerHTML = "\"" + freeroam_svineri_1_name + "\"";
freeroam_svineri_1_started = true;
}
// during the whole cut
		if (q < 1.5)
		{
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (cz_turned_on[t] === 1)
				{
					cz_goal_x[t] = cz[t].position.x;
					cz_goal_z[t] = cz[t].position.z;
				}
			}
		}
		else
		{
			cz_goal_x[1] = auction_position_x;
			cz_goal_z[1] = auction_position_z;
			cz_goal_x[8] = auction_position_x+1;
			cz_goal_z[8] = auction_position_z;
			cz_goal_x[0] = auction_position_x+2;
			cz_goal_z[0] = auction_position_z;
			cz_goal_x[5] = auction_position_x+3;
			cz_goal_z[5] = auction_position_z;
		}
		if (distance_get_xz(player.position.x,player.position.z, auction_position_x,auction_position_z) < 10) ts_end(CUT_FREEROAM_AUCTION);
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[5] = 1;
cz_turned_on[8] = 1;
}



else if (cut === CUT_FREEROAM_AUCTION)
{
// at the start of the cut
if (freeroam_auction_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz_turned_on[1] = 1;
cz_turned_on[8] = 1;
cz_turned_on[0] = 1;
cz_turned_on[5] = 1;
for (let t = 0; t < NUMBER_OF_CARS; t++)
{
	if (cz_turned_on[t] === 1)
	{
		cz_goal_x[t] = auction_position_x+20*(Math.random()-0.5);
		cz_goal_z[t] = auction_position_z+20*(Math.random()-0.5);
	}
}
cz[0].position.x = auction_position_x+2;
cz[0].position.z = auction_position_z;
cz[1].position.x = auction_position_x;
cz[1].position.z = auction_position_z;
cz[5].position.x = auction_position_x+3;
cz[5].position.z = auction_position_z;
cz[8].position.x = auction_position_x+1;
cz[8].position.z = auction_position_z;
document.getElementById("scene").innerHTML = "\"" + freeroam_auction_name + "\"";
freeroam_auction_started = true;
}
// during the whole cut
	// dublett - dålig design
		for (let t = 0; t < NUMBER_OF_CARS; t++)
		{
			if (cz_turned_on[t] === 1)
			{
				if (distance_get_xz(cz[t].position.x,cz[t].position.z, cz_goal_x[t],cz_goal_z[t]) < 2)
				{
					cz_goal_x[t] = auction_position_x+20*(Math.random()-0.5);
					cz_goal_z[t] = auction_position_z+20*(Math.random()-0.5);
				}
			}
		}
		let tempspeed = speed;
		for (let t = 0; t < 50; t++)
		{
			if (distance_get(player, sprite_antique[t]) < 0.64 && sprite_antique[t].parent === scene)
			{
				// volume
				let temp = speed*8;
				if (temp < 0) temp *= -1;
				if (temp > 0.7) temp = 0.7;
				if (tempspeed >= 0.08)
				{
					scene.remove(sprite_antique[t]);
					sound_glasshatter.volume = temp;
					sound_play(sound_glasshatter);
				}
				else
				{
					speed *= -1;
					sound_collision.volume = temp;
					sound_play(sound_collision);
				}
			}
		}
		if (ci1 === 38 && cj1 === 38) place_sprite_noidle(sprite_energydrink, 1906, 1880);
		if (q > 4) ts_end(CUT_FREEROAM_SVINERI_2);
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[5] = 1;
cz_turned_on[8] = 1;
}
else if (cut === CUT_FREEROAM_SVINERI_2)
{
// at the start of the cut
if (freeroam_svineri_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = auction_position_x+2;
cz[0].position.z = auction_position_z;
cz[1].position.x = auction_position_x;
cz[1].position.z = auction_position_z;
cz[5].position.x = auction_position_x+3;
cz[5].position.z = auction_position_z;
cz[8].position.x = auction_position_x+1;
cz[8].position.z = auction_position_z;
document.getElementById("scene").innerHTML = "\"" + freeroam_svineri_2_name + "\"";
freeroam_svineri_2_started = true;
}
// during the whole cut
if (distance_get_xz(player.position.x,player.position.z, 1894,1803) < 6)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_GASSTATION);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = 1894+2;
cz_goal_z[0] = 1803;
cz_turned_on[1] = 1;
cz_goal_x[1] = 1894;
cz_goal_z[1] = 1803;
cz_turned_on[5] = 1;
cz_goal_x[5] = 1894+3;
cz_goal_z[5] = 1803;
cz_turned_on[8] = 1;
cz_goal_x[8] = 1894+1;
cz_goal_z[8] = 1803;
}
else if (cut >= CUT_CUTSCENE_GASSTATION && cut <= CUT_CUTSCENE_GASSTATION+48)
{
// at the start of the cut
if (cutscene_gasstation_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("hongkong_music.mp3", 0.1);
music_what_is_playing = 2;
room_set("roomwall gasstation.jpg", "roomfloor gasstation.jpg");
cutscene_gasstation_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
		place_cz_in_room(sprite_magnet1, "n");
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "sw");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "s");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "w");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "se");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}
else if (cut === CUT_FREEROAM_SVINERI_3)
{
// at the start of the cut
if (freeroam_svineri_3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1894+2;
cz[0].position.z = 1803;
cz[1].position.x = 1894;
cz[1].position.z = 1803;
cz[5].position.x = 1894+3;
cz[5].position.z = 1803;
cz[8].position.x = 1894+1;
cz[8].position.z = 1803;
document.getElementById("scene").innerHTML = "\"" + freeroam_svineri_3_name + "\"";
freeroam_svineri_3_started = true;
}
// during the whole cut
speedchange = 0.3;
		sprite_harassfan_seal.visible = true;
		place_sprite_noidle(sprite_harassfan_seal, freeroam_harassfan_position_x, freeroam_harassfan_position_z); 
if (distance_get(player, sprite_harassfan_seal) < 8)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_HARASSFAN);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = freeroam_harassfan_position_x+2;
cz_goal_z[0] = freeroam_harassfan_position_z+3;
cz_turned_on[1] = 1;
cz_goal_x[1] = freeroam_harassfan_position_x+2;
cz_goal_z[1] = freeroam_harassfan_position_z+1;
cz_turned_on[5] = 1;
cz_goal_x[5] = freeroam_harassfan_position_x+2;
cz_goal_z[5] = freeroam_harassfan_position_z+4;
cz_turned_on[8] = 1;
cz_goal_x[8] = freeroam_harassfan_position_x+2;
cz_goal_z[8] = freeroam_harassfan_position_z+2;
}
else if (cut >= CUT_CUTSCENE_HARASSFAN && cut <= CUT_CUTSCENE_HARASSFAN+48)
{
// at the start of the cut
if (cutscene_harassfan_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
cutscene_harassfan_started = true;
}
// during the whole cut
		sprite_harassfan_seal.visible = true;
		place_sprite_noidle(sprite_harassfan_seal, freeroam_harassfan_position_x, freeroam_harassfan_position_z); 
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "n");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut === CUT_FREEROAM_HARASSFAN)
{
// at the start of the cut
if (freeroam_harassfan_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("leejung_chase.mp3", 0.4);
music_what_is_playing = 2;
cz[6] = spr("sealy.png");
cz[6].position.x = 1642;
cz[6].position.z = 1992;
cz_goal_x[6] = 1642;
cz_goal_z[6] = 1992;
document.getElementById("scene").innerHTML = "\"" + freeroam_harassfan_name + "\"";
freeroam_harassfan_started = true;
}
// during the whole cut
	speedchange = 0.2;
cz_turned_on[6] = 1;
if (distance_get_xz(cz[6].position.x,cz[6].position.z, cz_goal_x[6],cz_goal_z[6]) < 2)
{
if (Math.random() > 0.7)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
}
else if (object_get(cz[6]) === ASCEND_HOUSE)
{
cz_goal_x[6] = player.position.x+3*(Math.random()-0.5);
cz_goal_z[6] = player.position.z+3*(Math.random()-0.5);
cz_speed[6] *= -1;
}
else
{
cz_goal_x[6] = 1642+15*(Math.random()-0.5);
cz_goal_z[6] = 1992+15*(Math.random()-0.5);
}
}
}
else if (cut === CUT_FREEROAM_GASSTATION)
{
// at the start of the cut
if (freeroam_gasstation_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = freeroam_harassfan_position_x+3;
cz[0].position.z = freeroam_harassfan_position_z;
cz[1].position.x = freeroam_harassfan_position_x+3;
cz[1].position.z = freeroam_harassfan_position_z;
cz[8].position.x = freeroam_harassfan_position_x+3;
cz[8].position.z = freeroam_harassfan_position_z;
document.getElementById("scene").innerHTML = "\"" + freeroam_gasstation_name + "\"";
freeroam_gasstation_started = true;
}
// during the whole cut
if (distance_get_xz(player.position.x,player.position.z, carclub_position_x,carclub_position_z) < 5)
{
sprite_ui_mouseclick.visible = true;
if (mouseclick === true) ts_end(CUT_CUTSCENE_MEETING_6);
}
cz_turned_on[0] = 1;
cz_goal_x[0] = carclub_position_x;
cz_goal_z[0] = carclub_position_z;
cz_turned_on[1] = 1;
cz_goal_x[1] = carclub_position_x;
cz_goal_z[1] = carclub_position_z;
cz_turned_on[8] = 1;
cz_goal_x[8] = carclub_position_x;
cz_goal_z[8] = carclub_position_z;
}
// FIRE WALLS
else if (cut >= CUT_CUTSCENE_MEETING_6 && cut <= CUT_CUTSCENE_MEETING_6+48)
{
// at the start of the cut
if (cutscene_meeting_6_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall t.jpg", "woodenfloor.jpg");
cutscene_meeting_6_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "n");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "e");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "w");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
}
else if (cut === CUT_FREEROAM_RACE_SPEED_AFTER)
{
// at the start of the cut
if (freeroam_race_speed_after_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cz[0].position.x = freeroam_harassfan_position_x+3;
cz[0].position.z = freeroam_harassfan_position_z;
cz[1].position.x = freeroam_harassfan_position_x+3;
cz[1].position.z = freeroam_harassfan_position_z;
cz[8].position.x = freeroam_harassfan_position_x+3;
cz[8].position.z = freeroam_harassfan_position_z;
document.getElementById("scene").innerHTML = "\"" + freeroam_race_speed_after_name + "\"";
freeroam_race_speed_after_started = true;
}
// during the whole cut
		if (distance_get_xz(player.position.x,player.position.z, 1843,1402) <= 20) ts_end(CUT_CUTSCENE_MAGNETFACTORY);
cz_turned_on[0] = 1;
cz_goal_x[0] = 1843+2;
cz_goal_z[0] = 1402;
cz_turned_on[1] = 1;
cz_goal_x[1] = 1843;
cz_goal_z[1] = 1402;
cz_turned_on[8] = 1;
cz_goal_x[8] = 1843+1;
cz_goal_z[8] = 1402;
}
else if (cut >= CUT_CUTSCENE_MAGNETFACTORY && cut <= CUT_CUTSCENE_MAGNETFACTORY+48)
{
// at the start of the cut
if (cutscene_magnetfactory_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_magnetfactory_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "e");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "w");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "s");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}
else if (cut === CUT_FREEROAM_MAGNETFACTORY)
{
// at the start of the cut
if (freeroam_magnetfactory_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1843+2;
cz[0].position.z = 1402;
cz[1].position.x = 1843;
cz[1].position.z = 1402;
cz[8].position.x = 1843+1;
cz[8].position.z = 1402;
document.getElementById("scene").innerHTML = "\"" + freeroam_magnetfactory_name + "\"";
freeroam_magnetfactory_started = true;
}
// during the whole cut
		sprite_magnetfactory_lift.visible = true;
		sprite_magnetfactory_lift.position.x = 1889;
		sprite_magnetfactory_lift.position.z = 1372;
		if (distance_get(player, sprite_magnetfactory_lift) < 6) ts_end(CUT_CUTSCENE_MAGNETFACTORY_2);
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[8] = 1;
}
else if (cut >= CUT_CUTSCENE_MAGNETFACTORY_2 && cut <= CUT_CUTSCENE_MAGNETFACTORY_2+48)
{
// at the start of the cut
if (cutscene_magnetfactory_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_magnetfactory_2_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "e");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "w");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "s");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}

else if (cut === CUT_FREEROAM_MAGNETFACTORY_2)
{
// at the start of the cut
if (freeroam_magnetfactory_2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cz[0].position.x = 1889-3;
cz[0].position.z = 1372;
cz[1].position.x = 1889-1;
cz[1].position.z = 1372;
cz[8].position.x = 1889-2;
cz[8].position.z = 1372;
document.getElementById("scene").innerHTML = "\"" + freeroam_magnetfactory_2_name + "\"";
freeroam_magnetfactory_2_started = true;
}
// during the whole cut
		sprite_magnetfactory_lift.visible = true;
		sprite_magnetfactory_lift.position.x = 1889;
		sprite_magnetfactory_lift.position.z = 1372;
		if (distance_get(player, sprite_magnetfactory_lift) < 1)
		{
			if (sprite_magnetfactory_lift.position.y < 20)
			{
				sprite_magnetfactory_lift.position.y += 0.03;
				if (sprite_magnetfactory_lift.position.y < 1)
				{
					speed = 0;
					player.position.x = sprite_magnetfactory_lift.position.x;
					player.position.z = sprite_magnetfactory_lift.position.z;
				}
			}
			player.position.y = sprite_magnetfactory_lift.position.y;
		}
		else if (sprite_magnetfactory_lift.position.y > height_get(sprite_magnetfactory_lift)) sprite_magnetfactory_lift.position.y -= 0.03;
		else if (sprite_magnetfactory_lift.position.y <= height_get(sprite_magnetfactory_lift)) sprite_magnetfactory_lift.position.y = height_get(sprite_magnetfactory_lift);
cz_turned_on[0] = 1;
cz_turned_on[1] = 1;
cz_turned_on[8] = 1;
}
else if (cut === CUT_FREEROAM_MAGNETFACTORY_3)
{
// at the start of the cut
if (freeroam_magnetfactory_3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
document.getElementById("scene").innerHTML = "\"" + freeroam_magnetfactory_3_name + "\"";
freeroam_magnetfactory_3_started = true;
}
// during the whole cut
}
else if (cut === CUT_FREEROAM_MAGNETFACTORY_4)
{
// at the start of the cut
if (freeroam_magnetfactory_4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
document.getElementById("scene").innerHTML = "\"" + freeroam_magnetfactory_4_name + "\"";
freeroam_magnetfactory_4_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_SPACEBAR && cut <= CUT_CUTSCENE_SPACEBAR+48)
{
// at the start of the cut
if (cutscene_spacebar_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
room_set("roomwall_spacebar.jpg", "roomwall carclub.jpg");
cutscene_spacebar_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
		sprite_spacebar_tiger.visible = true;
		place_cz_in_room(sprite_spacebar_tiger, "s");
cz_turned_on[7] = 1;
place_cz_in_room(cz[7], "n");
cz_goal_x[7] = cz[7].position.x;
cz_goal_z[7] = cz[7].position.z;
}
else if (cut === CUT_FREEROAM_SPACEBAR)
{
// at the start of the cut
if (freeroam_spacebar_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
document.getElementById("scene").innerHTML = "\"" + freeroam_spacebar_name + "\"";
freeroam_spacebar_started = true;
}
// during the whole cut
}
else if (cut === CUT_FREEROAM_QUIZ)
{
// at the start of the cut
if (freeroam_quiz_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
document.getElementById("scene").innerHTML = "\"" + freeroam_quiz_name + "\"";
freeroam_quiz_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_DORIME && cut <= CUT_CUTSCENE_DORIME+48)
{
// at the start of the cut
if (cutscene_dorime_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("bubbles.mp3", 0.17);
music_what_is_playing = 2;
cutscene_dorime_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_DORIME_ADELE && cut <= CUT_CUTSCENE_DORIME_ADELE+48)
{
// at the start of the cut
if (cutscene_dorime_adele_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_harass.mp3", 0.17);
music_what_is_playing = 2;
cutscene_dorime_adele_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_DORIME_DADDY && cut <= CUT_CUTSCENE_DORIME_DADDY+48)
{
// at the start of the cut
if (cutscene_dorime_daddy_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
cutscene_dorime_daddy_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_DORIME_DG && cut <= CUT_CUTSCENE_DORIME_DG+48)
{
// at the start of the cut
if (cutscene_dorime_dg_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_dg.mp3", 0.17);
music_what_is_playing = 2;
cutscene_dorime_dg_started = true;
}
// during the whole cut
}
else if (cut >= CUT_CUTSCENE_MRSSUPERCONDUCTOR && cut <= CUT_CUTSCENE_MRSSUPERCONDUCTOR+48)
{
// at the start of the cut
if (cutscene_mrssuperconductor_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_mrssuperconductor_started = true;
}
// during the whole cut
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "n");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
cz_turned_on[7] = 1;
place_cz_in_room(cz[7], "s");
cz_goal_x[7] = cz[7].position.x;
cz_goal_z[7] = cz[7].position.z;
}
else if (cut >= CUT_CUTSCENE_RACE_ENDING && cut <= CUT_CUTSCENE_RACE_ENDING+48)
{
// at the start of the cut
if (cutscene_race_ending_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_race_ending_started = true;
}
// during the whole cut
cz_turned_on[7] = 1;
place_cz_in_room(cz[7], "n");
cz_goal_x[7] = cz[7].position.x;
cz_goal_z[7] = cz[7].position.z;
}
else if (cut >= CUT_CUTSCENE_ENDING_MRS && cut <= CUT_CUTSCENE_ENDING_MRS+48)
{
// at the start of the cut
if (cutscene_ending_mrs_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_ending_mrs_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "sw");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "s");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "se");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "e");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "w");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
cz_turned_on[7] = 1;
place_cz_in_room(cz[7], "n");
cz_goal_x[7] = cz[7].position.x;
cz_goal_z[7] = cz[7].position.z;
}
else if (cut >= CUT_CUTSCENE_ENDING_YOU && cut <= CUT_CUTSCENE_ENDING_YOU+48)
{
// at the start of the cut
if (cutscene_ending_you_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("");
music_what_is_playing = 1;
cutscene_ending_you_started = true;
}
// during the whole cut
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "sw");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "s");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "se");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "e");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "w");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
cz_turned_on[7] = 1;
place_cz_in_room(cz[7], "n");
cz_goal_x[7] = cz[7].position.x;
cz_goal_z[7] = cz[7].position.z;
}
else if (cut >= CUT_CUTSCENE_PISSANDSHIT && cut <= CUT_CUTSCENE_PISSANDSHIT+48)
{
// at the start of the cut
if (cutscene_pissandshit_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
room_set("roomwall ba.jpg", "roomfloor ba.jpg");
cutscene_pissandshit_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "s");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "n");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut >= CUT_CUTSCENE_MEETING_DISCUSSION && cut <= CUT_CUTSCENE_MEETING_DISCUSSION+48)
{
// at the start of the cut
if (cutscene_meeting_discussion_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall t.jpg", "woodenfloor.jpg");
cutscene_meeting_discussion_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "e");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut >= CUT_CUTSCENE_MEETING_DISCUSSION2 && cut <= CUT_CUTSCENE_MEETING_DISCUSSION2+48)
{
// at the start of the cut
if (cutscene_meeting_discussion2_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall t.jpg", "woodenfloor.jpg");
cutscene_meeting_discussion2_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "se");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "e");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut >= CUT_CUTSCENE_MEETING_DISCUSSION3 && cut <= CUT_CUTSCENE_MEETING_DISCUSSION3+48)
{
// at the start of the cut
if (cutscene_meeting_discussion3_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall t.jpg", "woodenfloor.jpg");
cutscene_meeting_discussion3_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "se");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "e");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
else if (cut >= CUT_CUTSCENE_MEETING_DISCUSSION4 && cut <= CUT_CUTSCENE_MEETING_DISCUSSION4+48)
{
// at the start of the cut
if (cutscene_meeting_discussion4_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("music_carclub.mp3", 0.3);
music_what_is_playing = 2;
room_set("roomwall t.jpg", "woodenfloor.jpg");
cutscene_meeting_discussion4_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[0] = 1;
place_cz_in_room(cz[0], "se");
cz_goal_x[0] = cz[0].position.x;
cz_goal_z[0] = cz[0].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "e");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
}
// whosthatdogert
//dogertsong.mp3,0.4
else if (cut >= CUT_CUTSCENE_TALK_137 && cut <= CUT_CUTSCENE_TALK_137+48)
{
// at the start of the cut
if (cutscene_talk_137_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
room_set("roomwall d.jpg", "roomwall.jpg");
b = 0;
i = 0;
cb = 0;
music_last = performance.now();
cutscene_talk_137_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[3] = 1;
place_cz_in_room(cz[3], "e");
cz_goal_x[3] = cz[3].position.x;
cz_goal_z[3] = cz[3].position.z;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "s");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
cz_turned_on[2] = 1;
place_cz_in_room(cz[2], "w");
cz_goal_x[2] = cz[2].position.x;
cz_goal_z[2] = cz[2].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "sw");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
}
// omalley bradgard
else if (cut >= CUT_CUTSCENE_TALK_140 && cut <= CUT_CUTSCENE_TALK_140+48)
{
// at the start of the cut
if (cutscene_talk_140_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("theme_race_sfabian.mp3", 0.4);
music_what_is_playing = 2;
room_set("roomwall carclub(1).png", "roomwall carclub.jpg");
cutscene_talk_140_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "n");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
// dg polish cow bar
else if (cut >= CUT_CUTSCENE_TALK_142 && cut <= CUT_CUTSCENE_TALK_142+48)
{
// at the start of the cut
if (cutscene_talk_142_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("THEME RACE - D.mp3", 0.17);
music_what_is_playing = 2;
room_set("roomwall da.jpg", "roomwall carclub.jpg");
cutscene_talk_142_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "s");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}
// dg polish cow bar
else if (cut >= CUT_CUTSCENE_TALK_150 && cut <= CUT_CUTSCENE_TALK_150+48)
{
// at the start of the cut
if (cutscene_talk_150_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("THEME RACE - D.mp3", 0.17);
music_what_is_playing = 2;
room_set("roomwall da.jpg", "roomwall carclub.jpg");
cutscene_talk_150_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
cz_turned_on[8] = 1;
place_cz_in_room(cz[8], "s");
cz_goal_x[8] = cz[8].position.x;
cz_goal_z[8] = cz[8].position.z;
}
// harass pitchar id�er
else if (cut >= CUT_CUTSCENE_TALK_155 && cut <= CUT_CUTSCENE_TALK_155+48)
{
// at the start of the cut
if (cutscene_talk_155_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
room_set("roomwall da.jpg", "roomwall carclub.jpg");
music_play("music_harass.mp3", 0.17);
music_what_is_playing = 2;
cutscene_talk_155_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[5] = 1;
place_cz_in_room(cz[5], "s");
cz_goal_x[5] = cz[5].position.x;
cz_goal_z[5] = cz[5].position.z;
cz_turned_on[1] = 1;
place_cz_in_room(cz[1], "n");
cz_goal_x[1] = cz[1].position.x;
cz_goal_z[1] = cz[1].position.z;
}
// omalley fries
else if (cut >= CUT_CUTSCENE_TALK_175 && cut <= CUT_CUTSCENE_TALK_175+48)
{
// at the start of the cut
if (cutscene_talk_175_started === false)
{
for (let t = 0; t < NUMBER_OF_CARS; t++) cz_turned_on[t] = 0;
music_play("theme_race_sfabian.mp3", 0.4);
music_what_is_playing = 2;
room_set("prisonwall.jpg", "roomwall carclub.jpg");
cutscene_talk_175_started = true;
}
// during the whole cut
room.visible = true;
player.position.y = room.position.y-0.5;
cz_turned_on[4] = 1;
place_cz_in_room(cz[4], "n");
cz_goal_x[4] = cz[4].position.x;
cz_goal_z[4] = cz[4].position.z;
}
 	// attach sprites to cars
	if (cut % MODULUS_FREEROAM_OR_RACE === 0)
	{
		if (cut >= CUT_FREEROAM_MAGNETFACTORY_4)
		{
			shelf.visible = true;
			bak_shelf.visible = true;
			sprite_shelf_epper.visible = false;
		}
		else if (cut >= CUT_FREEROAM_5)
		{
			shelf.visible = true;
			bak_shelf.visible = false;
			sprite_shelf_epper.visible = true;
		}
		else
		{
			shelf.visible = true;
			bak_shelf.visible = true;
			sprite_shelf_epper.visible = false;
		}
		// idle
		if (frame_counter % 60 == 0)
		{
			for (let t = 0; t < NUMBER_OF_CARS; t++)
			{
				if (Math.random() > 0.8) cz[t].position.y += 0.1;
			}
		}
	}
	else
	{
		shelf.visible = false;
		bak_shelf.visible = false;
		sprite_shelf_epper.visible = false;
	}
	shelf.position.set(				player.position.x, 			player.position.y, 				player.position.z);
	shelf_flames.position.set(                             player.position.x,                      player.position.y,                              player.position.z);
	shelf_epa.position.set(                             player.position.x,                      player.position.y,                              player.position.z);
	shelf_racing.position.set(                             player.position.x,                      player.position.y,                              player.position.z);
	shelf_pipe.position.set(                             player.position.x,                      player.position.y,                              player.position.z);
	shelf_beard.position.set(                             player.position.x,                      player.position.y,                              player.position.z);
	bak_shelf.position.set(				player.position.x, 			player.position.y+0.3, 				player.position.z);
	sprite_shelf_epper.position.set(		player.position.x, 			player.position.y+0.3, 				player.position.z);
	sprite[0].position.set(			cz[0].position.x, 	cz[0].position.y+0.5, 		cz[0].position.z);
	sprite_bak[0].position.set(		cz[0].position.x, 	cz[0].position.y+0.5, 		cz[0].position.z);
	sprite_pil[0].position.set(		cz[0].position.x, 	cz[0].position.y+0.5+1.275,	cz[0].position.z);
	sprite[1].position.set(		cz[1].position.x, cz[1].position.y+0.35, 	cz[1].position.z);
	sprite_bak[1].position.set(	cz[1].position.x, cz[1].position.y+0.35, 	cz[1].position.z);
	sprite_pil[1].position.set(	cz[1].position.x, cz[1].position.y+0.35+1.7, cz[1].position.z);
	sprite[2].position.set(			cz[2].position.x, 	cz[2].position.y+0.3, 		cz[2].position.z);
	sprite_bak[2].position.set(		cz[2].position.x, 	cz[2].position.y+0.3, 		cz[2].position.z);
	sprite_pil[2].position.set(		cz[2].position.x,       cz[2].position.y+0.3+1.7,       cz[2].position.z);
	sprite[3].position.set(		cz[3].position.x, 	cz[3].position.y+0.3, 		cz[3].position.z);
	sprite_bak[3].position.set(		cz[3].position.x, 	cz[3].position.y+0.3, 		cz[3].position.z);
	sprite_pil[3].position.set(		cz[3].position.x, 	cz[3].position.y+0.3+1.7,	cz[3].position.z);
	sprite[4].position.set(		cz[4].position.x, 	cz[4].position.y+0.25, 	cz[4].position.z);
	sprite_bak[4].position.set(		cz[4].position.x, 	cz[4].position.y+0.25, 	cz[4].position.z);
	sprite_pil[4].position.set(		cz[4].position.x, 	cz[4].position.y+0.25+1.19, 	cz[4].position.z);
	sprite[5].position.set(		cz[5].position.x, 	cz[5].position.y+0.5, 		cz[5].position.z);
	sprite_bak[5].position.set(		cz[5].position.x, 	cz[5].position.y+0.5, 		cz[5].position.z);
	sprite_pil[5].position.set(		cz[5].position.x, 	cz[5].position.y+0.5+0.85,	cz[5].position.z);
//	sprite[6].position.set(		cz[6].position.x, 	cz[6].position.y+0.5,	cz[6].position.z);
//	sprite_bak[6].position.set(		cz[6].position.x, 	cz[6].position.y+0.5,	cz[6].position.z);
//	sprite[4].position.set(		cz[4].position.x, 	cz[4].position.y+0.25, 	cz[4].position.z);
//	sprite_bak[4].position.set(		cz[4].position.x, 	cz[4].position.y+0.25, 	cz[4].position.z);
//	sprite_pil[4].position.set(		cz[4].position.x, 	cz[4].position.y+0.25+1.7, 	cz[4].position.z);
	sprite[7].position.set(	cz[7].position.x, cz[7].position.y+0.5, cz[7].position.z);
	sprite_bak[7].position.set(cz[7].position.x, cz[7].position.y+0.5, cz[7].position.z);
	sprite_pil[7].position.set(cz[7].position.x, cz[7].position.y+0.5+1.53, cz[7].position.z);
	sprite[8].position.set(		cz[8].position.x, 	cz[8].position.y+0.3, 	cz[8].position.z);
	sprite_bak[8].position.set(	cz[8].position.x, 	cz[8].position.y+0.3, 	cz[8].position.z);
	sprite_pil[8].position.set(	cz[8].position.x, 	cz[8].position.y+0.3+1.7, 	cz[8].position.z);
	sprite[9].position.set(			cz[9].position.x, 	cz[9].position.y+0.65, 		cz[9].position.z);
	sprite_bak[9].position.set(		cz[9].position.x, 	cz[9].position.y+0.65, 		cz[9].position.z);
	sprite_pil[9].position.set(		cz[9].position.x, 	cz[9].position.y+0.65+1.7,	cz[9].position.z);
	// sprite direction
	let diffr;
	for (let t = 0; t < NUMBER_OF_CARS; t++)
	{
		if (cz_turned_on[t] === 1)
		{
			// move sprites behind cars so they don't get drawn in front of them
			sprite[t].position.x -= (camera.position.x-cz[t].position.x) * 0.1;
			sprite[t].position.z -= (camera.position.z-cz[t].position.z) * 0.1;
			// show colored faraway_cylinders for characters that are far away
			let cdist = distance_get(player, cz[t]);
			// when faraway cylinder is visible, turn off its cz. and vice versa
			if (cdist >= 30)
			{
				faraway_cylinder[t].visible = true;
				cz[t].visible = false;
				sprite[t].visible = false;
				sprite_bak[t].visible = false;
				sprite_pil[t].visible = false;
				let logdist = 0.175*Math.log(distance_get(cz[t], player)-20);
				if (logdist <= 0) logdist = 0;
				if (logdist >= 0.95) logdist = 0.95;
				faraway_cylinder[t].position.x = cz[t].position.x - logdist*(cz[t].position.x-player.position.x);
				faraway_cylinder[t].position.z = cz[t].position.z - logdist*(cz[t].position.z-player.position.z);
				faraway_cylinder[t].position.y = cz[t].position.y + 51;
			}
			else
			{
				faraway_cylinder[t].visible = false;
				cz[t].visible = true;
				// sprite direction
				diffr = rotation_real_get(rotation_real_get(player.rotation.y) - rotation_real_get(cz[t].rotation.y));
				// CUTSCENE
				if (cut % MODULUS_FREEROAM_OR_RACE !== 0)
				{
					sprite[t].visible = true;
					sprite_bak[t].visible = false;
					sprite_pil[t].visible = false;
				}
				// not CUTSCENE
				else
				{
					if (cdist >= 10)
					{
						sprite[t].visible = false;
						sprite_bak[t].visible = false;
						sprite_pil[t].visible = true;
					}
					else
					{
						if (diffr > 0.5*Math.PI && diffr < 1.5*Math.PI)
						{
							sprite[t].visible = true;
							sprite_bak[t].visible = false;
							sprite_pil[t].visible = false;
						}
						else
						{
							sprite[t].visible = false;
							sprite_bak[t].visible = true;
							sprite_pil[t].visible = false;
						}
					}
				}
			}
		}
		else
		{
			sprite[t].visible = false;
			sprite_bak[t].visible = false;
			sprite_pil[t].visible = false;
			cz[t].visible = false;
		}
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
// CUT_FREEROAM_INTRO
break; case 999000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Hello, I have one question. What's about all the gas coming out of the car's ass?");
r_click_on = 1; r_click_obj = cz[3]; r_click_dist = 4; r_click_cut = CUT_SPLASHSCREEN;
break; case 0.75:bet_pers(sprite[3],"... THATS.THE.ASS.GAS.");
r_click_on = 0;
break; case 1.00:bet_pers(sprite[2],"Yes I understand but how does it work? Can you explain it in your intellectual car mechanic language?");
break; case 1.50:bet_pers(sprite[3],"WHEN.CAR.EATS.FOOD.ITS.ASS.GO.FARTY.FARTY.");
break; case 2.00:bet_pers(sprite[2],"Okay, but why can't the gas just stay inside the car?");
break; case 2.50:bet_pers(sprite[2],"Wouldn't it have more fuel if it didn’t fart it out all the time?");
break; case 3.00:bet_pers(sprite[3],"ACTUALLY.THATS.A.PRETTY.GOOD.IDEA.EXCEPT.WE.WOULD.DIE.");
break; case 3.50:bet_pers(sprite[2],"Yes, it's just that one complication.");
break; case 3.75:bet_pers(sprite[3],"THE.ASS.GAS.IS.ALSO.IMPORTANT.FOR.THE.NATURE. IT.IS.WARMER.WHEN.MUCH.CAR.GAS.IN.THE.AIR.");
break; case 4.25:bet_pers(sprite[3],"SINCE.CARS.WERE.INVENTED.WE.HAVE.MORE.SUMMER.LIKE.ON.PLANET.VENUS. HOT.HOT!");
break; case 4.75:bet_pers(sprite[3],"SOON.WE.WON’T.NEED.JACKETS.ANYMORE. PROBLEM.SOLVED.");
break; case 5.25:bet_pers(sprite[2],"That's the last problem we needed to solve. After that everything is perfect.");
break; case 5.75:    		ts_end(CUT_CUTSCENE_WAKEUP);
break; case 6:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_WAKEUP
break; case 999001:cc(sprite[3],"HEY. WAKE.UP.SLEEPY.HEAD. TIME.TO.RACE.");
			document.getElementById("ui_mouse_click").style.visibility = "visible";
break; case 999002: 
			player.position.x = 1583;
			player.position.z = 1798;
			player.rotation.y = 0.37;
			document.getElementById("ui_mouse_click").style.visibility = "hidden";
			room.visible = false;
			for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
			player.position.y = height_get(player);
			ts_end(CUT_RACE_1);
// CUT_RACE_1
break; case 999050:
ts_start();
ts_during();
if (race_state === RACE_BEFORE) {
switch (q) {
       case 0.25:bet_pers(sprite[0],"Shelf!! You finally woke up after 6000 years! Welcome back from the coma!");
break; case 0.75:bet_pers(sprite[1],"I just said we're not going to do the coma joke.");
break; case 1.25:bet_pers(sprite[1],"I see you're not that happy about racing today, Shelf. Falling asleep right at the starting line... You must be really tired?");
break; case 1.75:bet_pers(sprite[0],"I wanna race though!! Can we go vroom with our cars now, Dogert?");
break; case 2.25:bet_pers(sprite[3],"YES.WE.CAN. I.LOVE.CARS.");
break; case 2.50:bet_pers(sprite[3],"SHELF, COME.TO.THE.GREEN.FLAG. I.DONT.HAVE.ALL.DAY. FOR.EXAMPLE.IM.GONNA.PLAY.FOOTBALL.MANAGER.LATER.");
}
}
else if (race_state === RACE_DURING) {
switch (q) {
       case 0.25:bet_pers(sprite[3],"HEY.GUYS.YOU.DRIVE.REALLY.WEIRD. YOU.MUST.PRACTICE.ALL.THE.TIME.NOW.");
//TIME: 0.5
break; case 1.00:bet_pers(sprite[3],"I.WILL.TEACH.YOU.EVERYTHING.I.KNOW. LETS.START.WITH.SOME.BASIC.FACTS.ABOUT.THE.WORLD.");
//TIME: 0.5
break; case 1.75:bet_pers(sprite[3],"ITS.SLOWER.TO.DRIVE.IN.GRASS.ITS.BECAUSE.IVE.PUT.SANDPAPER.IN.THE.GRASS");
//TIME: 0.5
break; case 2.50:bet_pers(sprite[3],"DRIVING.UPWARDS.IS.SLOW.AND.DOWNWARDS.IS.FAST.ITS.BECAUSE.OF.THE.HILL.FORMULA. NO.I.WONT.SAY.WHAT.THE.FORMULA.IS");
//TIME: 0.5
break; case 3.25:bet_pers(sprite[3],"IF.YOUR.CAR.SUCKS.MAYBE.ITS.NOT.THE.CAR.MAYBE.ITS.YOU.WHO.SUCKS.");
//TIME: 0.5
break; case 4.00:bet_pers(sprite[3],"COME.TO.ME.AFTER.THE.RACE.AND.REPAIR.THE.CAR. EVEN.IF.ITS.NOT.BROKEN.");
//TIME: 0.5
break; case 4.75:bet_pers(sprite[3],"IF.IM.NOT.IN.MY.WORKSHOP.IM.PROBABLY.OUT.GETTING.WOMEN.");
//TIME: 0.5
break; case 5.50:bet_pers(sprite[3],"IF.YOU.REMOVE.THE.ENGINE.WHILE.DRIVING.THE.CAR.WILL.STOP. IM.VERY.SORRY.BUT.THATS.HOW.IT.IS.");
//TIME: 0.5
break; case 6.25:bet_pers(sprite[3],"DONT.REMOVE.THE.WHEELS.BECAUSE.THEY.ARE.VERY.IMPORTANT.FOR.THE.CARS.SPEED");
//TIME: 0.5
break; case 7.00:bet_pers(sprite[3],"CARS.HAVE.EXISTED.FOR.OVER.100000.YEARS. I.INVENTED.THEM.");
//TIME: 0.5
break; case 7.75:bet_pers(sprite[3],"THE.GAS.PEDAL.IS.IMPORTANT.FOR.THE.CAR.AND.YOU.CANT.REMOVE.IT.");
//TIME: 0.5
break; case 8.50:bet_pers(sprite[3],"IF.THE.CAR.SUDDENLY.SLOWS.DOWN.IT.MIGHT.BE.BECAUSE.YOU.SUCK.AT.DRIVING.");
//TIME: 0.5
break; case 9.25:bet_pers(sprite[3],"WHEN.YOURE.CLOSE.TO.FINISH.SLOW.DOWN. HAHA.JUST.KIDDING.THATS.WHEN.YOU.GO.VROOOM.VROOOM.");
//TIME: 0.5
break; case 10.00:bet_pers(sprite[3],"REMEMBER.TO.ALWAYS.DRIVE.THE.CAR.WHILE.RACING.");
//TIME: 0.5
break; case 10.75:bet_pers(sprite[3],"IM.GETTING.MARRIED.LATER.TODAY. WANNA.COME?");
//TIME: 0.5
break; case 11.50:bet_pers(sprite[3],"FUEL.IS.THE.CAR'S.MEAL. FILL.THE.CAR.WITH.IT.EVERY.4TH.HOUR.PLEASE.");
//TIME: 0.5
break; case 12.25:bet_pers(sprite[3],"BE.SURE.TO.CHECK.THE.OIL.EVERY.3.MINUTES.");
//TIME: 0.5
break; case 13.00:bet_pers(sprite[3],"BEWARE.OF.CAR.THIEVES. THEY.ARE.EVERYWHERE.AND.THEY.STEAL.CARS.");
//TIME: 0.5
break; case 13.75:bet_pers(sprite[3],"HERES.A.TIP. DONT.OVERTHINK.STUFF.TOO.MUCH.");
//TIME: 0.5
break; case 14.50:bet_pers(sprite[3],"BE.SURE.TO.NOT.REMOVE.THE.STEERING.WHEEL.WHILE.DRIVING.");
//TIME: 0.5
break; case 15.25:bet_pers(sprite[3],"MY.MOTHER.DIED.FROM.HORRIFIC.DISEASES.A.LONG.TIME.AGO. IM.SO.GLAD.SHE.SURVIVED.");
//TIME: 0.5
break; case 16.00:bet_pers(sprite[3],"THE.WHEELS.MUST.BE.UNDER.THE.CAR.IN.ORDER.FOR.THEM.TO.ROLL. ITS.CALLED.THE.GROUND.ROLL.EFFECT.");
//TIME: 0.5
break; case 16.75:bet_pers(sprite[3],"PLEASE.WEAR.HELMET.2.TO.3.DAYS.AFTER.IVE.REPAIRED.YOUR.CAR.");
//TIME: 0.5
break; case 17.50:bet_pers(sprite[3],"STATISTIC.SAYS.THAT.YOU.SUCK.AT.DRIVING.");
//TIME: 0.5
break; case 18.00:bet_pers(sprite[3],"IM.THE.ONLY.CAR.MECHANIC.IN.THIS.TOWN.BECAUSE.I.KILLED.ALL.THE.OTHERS");
}
}
// CUT_CUTSCENE_RACE_1_AFTER
break; case 999101:cc(sprite[0],"What are you doing Shelf?? Cheating?");
break; case 999102:cc(sprite[1],"You broke the one and only rule: Don't cheat unless you're Dark Gandalf.");
break; case 999103:cc(sprite[1],"Wait, I got a message on my dark phone.");
break; case 999104:cc(sprite[1],"Guys. Emergency meeting. Club house.");
music_play("");
break; case 999105:cc(sprite[0],"I think it's best we do what the gray dude said because his voice sounded scary.");
break; case 999106:  ts_end(CUT_FREEROAM_M1);
break; case 999111:cc(sprite[0],"Wow! How did you make your car go so fast, Shelf?");
break; case 999112:cc(sprite[1],"Bah. The gold medal is a symbol of capitalism and I'm glad I didn't get it.");
break; case 999113:cc(sprite[1],"Wait, I got a message on my dark phone.");
break; case 999114:cc(sprite[1],"... ...");
break; case 999115:cc(sprite[1],"Guys. Emergency meeting. Club house.");
music_play("");
break; case 999116:cc(sprite[0],"I think it's best we do what the gray dude said because his voice sounded scary.");
break; case 999117:  ts_end(CUT_FREEROAM_M1);
break; case 999121:cc(sprite[0],"Wow! How did you make your car go so slow, Shelf?");
break; case 999122:cc(sprite[1],"The gold medal is the true symbol of what you can achieve through the collective! Congrats to me!");
break; case 999123:cc(sprite[1],"Wait, I got a message on my dark phone.");
break; case 999124:cc(sprite[1],"... ...");
break; case 999125:cc(sprite[1],"Guys. Emergency meeting. Club house.");
music_play("");
break; case 999126:cc(sprite[0],"I think it's best we do what the gray dude said because his voice sounded scary.");
break; case 999127:  ts_end(CUT_FREEROAM_M1);
break; case 999131:cc(sprite[0],"Wow! How did you make your car go so slow, Shelf?");
break; case 999132:cc(sprite[1],"Congrats to whoever won. I strongly dislike this game.");
break; case 999133:cc(sprite[1],"Wait, I got a message on my dark phone.");
break; case 999134:cc(sprite[1],"... ...");
break; case 999135:cc(sprite[1],"Guys. Emergency meeting. Club house.");
music_play("");
break; case 999136:cc(sprite[0],"I think it's best we do what the gray dude said because his voice sounded scary.");
break; case 999137:  ts_end(CUT_FREEROAM_M1);
// CUT_FREEROAM_M1
break; case 999200:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Why did you become so serious all of a sudden, Dark Gandalf??");
//TIME: 1
break; case 1.50:bet_pers(sprite[3],"SPRAY.SPRAY.SPRAY.");
//TIME: 2
break; case 3.50:bet_pers(sprite[3],"SPRAY.SPRAY.SPRAY.");
//TIME: 2
break; case 5.50:bet_pers(sprite[3],"SPRAY.SPRAY.SPRAY.");
break; case 5.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_DOGERT_SPRAY
break; case 999201:cc(sprite[3],"SPRAY.SPRAY.SPRAY.");
break; case 999202:cc(shelf,"?");
break; case 999203:cc(sprite[3],"I.SPRAY.CARBON.DIOXIDE.SO.THE.TREES.GROW. IT.MAKES.THE.THREES.BREATHE.");
break; case 999204:cc(shelf,"okay");
break; case 999205:cc(sprite[3],"ITS.A.SHAME.PEOPLE.DRIVE.CAR.SO.LITTLE.AT.NIGHT. BECAUSE.THEN.I.HAVE.TO.DO.THE.JOB.MYSELF. *drowns a tree in pure carbon dioxide*");
break; case 999206:cc(sprite[3],"ITS.A.DIRTY.JOB.BUT.SOMEONE.HAS.TO.DO.IT.");
break; case 999207:cc(shelf,"are you sure?");
break; case 999208:cc(sprite[3],"YES. DONT.EVER.DOUBT.ME.AGAIN. EAT.SLEEP.PROPAGANDA.REPEAT.");
break; case 999209: 	ts_end(CUT_FREEROAM_M1);
//*åker hem men "glömmer" kvar en motor igång på full kraft inne bland några 
// CUT_CUTSCENE_MEETING_1
break; case 1000001:cc(sprite[0],"Why the emergency meeting? Are we gonna die?");
break; case 1000002:cc(sprite[1],"Almost. Look at this email.");
break; case 1000003:cc(sprite[1],"\"Dear car club. Fossil fuels will be banned in 2 years.\"");
break; case 1000004:cc(sprite[1],"\"Gasoline, diesel, petrol, yes, all kinds of fossil fuel will be 100% banned from the streets.\"");
break; case 1000005:cc(sprite[1],"\"Please re-think your fuel strategy. Or else!!!\"");
break; case 1000006:cc(sprite[1],"\"Or else, your club will become history, is what I meant to say.\"");
break; case 1000007:cc(sprite[1],"\"Signed, The Government.\"");
break; case 1000008:cc(sprite[0],"What?!");
music_play("music_horror.mp3", 0.1);
break; case 1000009:cc(sprite[1],"Exactly.");
break; case 1000010:cc(sprite[3],"THAT.SUCKS. PEOPLE.ARE.OUT.OF.THEIR.MINDS.THESE.DAYS.");
break; case 1000011:cc(sprite[0],"How do they even know about us? We're a secret underground club!");
break; case 1000012:cc(sprite[1],"Maybe because we have illegal street races out in public almost every day?");
break; case 1000013:cc(sprite[3],"FOSSIL.FUEL.HELPS.INCREASING.THE.NICE.WARMTH.ON.EARTH. SO.WHY.ARE.THEY.EVEN.MAD.");
break; case 1000014:cc(sprite[1],"That's a good question. People seem to have a problem with our lifestyle.");
break; case 1000015:cc(sprite[0],"Does this mean we have to shut the club down?");
break; case 1000016:cc(sprite[1],"Or, we can switch to electrical cars.");
break; case 1000017:cc(sprite[0],"...");
music_play("");
break; case 1000018:cc(sprite[0],"Hahahaha");
music_play("music_bongos.mp3", 0.3);
break; case 1000019:cc(sprite[1],"Hahahahaha");
break; case 1000020:cc(sprite[0],"This sucks... Can't we restart the club at your place?");
music_play("");
break; case 1000021:cc(sprite[1],"You mean over at the LAND OF DARKNESS?");
break; case 1000022:cc(sprite[0],"Yes, or Haftlan-Drakh, which is what it's actually called.");
break; case 1000023:cc(sprite[1],"Let me tell you a bit about the communistic utopia that is the LAND OF DARKNESS!");
music_play("music_dg.mp3", 0.15);
break; case 1000024:cc(sprite[0],"No");
break; case 1000025:cc(sprite[1],"...");
music_play("");
break; case 1000026:cc(sprite[0],"I don't want the club to end!! Then our friendships will end too!");
break; case 1000027:cc(sprite[1],"That's true. Well, there's nothing we can do.");
break; case 1000028:cc(sprite[0],"...");
break; case 1000029:cc(sprite[1],"This sucks.");
break; case 1000030:cc(sprite[0],"Yeah, pretty much.");
break; case 1000031:cc(sprite[3],"WHEN.CAN.I.LEAVE.");
break; case 1000032:    	room.visible = false;
			for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
			player.position.y = height_get(player);
			ts_end(CUT_FREEROAM_0);
// CUT_FREEROAM_0
break; case 1000100:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Shelf, time for sad biceps curls... I'll be over at the gym being sad, join if you want...");
break; case 0.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_GYM
break; case 1002000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Okay, let's gym... I guess...");
break; case 0.50:bet_pers(sprite[2],"Excuse me, do you know how to use this machine? Or wait, maybe like this.");
break; case 1.00:bet_pers(sprite[2],"Let's see, gym gym gym, I'm gonna gym now, are there any interesting machines...");
break; case 1.50:bet_pers(sprite[0],"Take it easy with that machine. It's very expensive...");
break; case 2.00:bet_pers(sprite[2],"I broke it.");
			if (sound_punch.paused === true) sound_punch.play();
			scene.remove(sprite_gym_thing[1]);
			sprite_gym_thing_trash[1].position.set(sprite_gym_thing[1].position.x, sprite_gym_thing[1].position.y, sprite_gym_thing[1].position.z);
			scene.add(sprite_gym_thing_trash[0]);
break; case 2.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_GYM
break; case 1002001:cc(sprite[0],"498... 499... 500 sad lifts!!");
break; case 1002002:cc(sprite[2],"I did 2 of those at one time.");
break; case 1002003:cc(shelf,"who are you? and why are you destroying everything?");
break; case 1002004:cc(sprite[2],"Oh, I'm glad you asked! Hello, I'm Daddy! I am a film maker, writer and photographer.");
			sound_punch.pause();
break; case 1002005:cc(sprite[2],"Oops, I broke this one too.");
			if (sound_punch.paused === true) sound_punch.play();
			scene.remove(sprite_gym_thing[0]);
			sprite_gym_thing_trash[0].position.set(sprite_gym_thing[0].position.x, sprite_gym_thing[0].position.y, sprite_gym_thing[0].position.z);
			scene.add(sprite_gym_thing_trash[0]);
break; case 1002006:cc(sprite[0],"Daddy?");
			sound_punch.pause();
break; case 1002007:cc(sprite[2],"Exactly. What I do in life is that I look for stories. What is your story?");
break; case 1002008:cc(sprite[0],"What?");
break; case 1002009:cc(sprite[2],"I'm always looking for characters. For my books, for my movies, I just love characters in general.");
break; case 1002010:cc(sprite[0],"Sounds really boring!");
break; case 1002011:cc(sprite[2],"So. I'm a storyteller, an-");
break; case 1002012:cc(sprite[2],"Do you even listen?");
break; case 1002013:cc(sprite[0],"Sure, I'll listen, \"Daddy\"");
break; case 1002014:cc(sprite[2],"I'm a storyteller and a good way to get close to someone's story is through pain. What is your darkest secret?");
break; case 1002015:cc(sprite[0],"Um, maybe all the crimes?");
break; case 1002016:cc(sprite[2],"Crimes... Any specific crime you want to tell me about?");
break; case 1002017:cc(sprite[0],"Uh. Hard to choose a favorite... Maybe the illegal underground car club... but... I don't know");
break; case 1002018:cc(sprite[2],"Wow, an actual criminal bad guy... It feels like I'm in a movie right now!");
break; case 1002019:cc(sprite[2],"The car club sounds really interesting! Can I interview you and the rest of the club tomorrow?");
break; case 1002020:cc(sprite[0],"Uh...");
break; case 1002021:ccS("Yes it's okay!! ", " Yeah do it!! I allow you to do it!");
break; case 1002022:cc(sprite[2],"Splendid! Well, see you tomorrow then, new friends!");
music_play("music_bongos.mp3", 0.3);
break; case 1002023:cc(sprite[0],"I didn't answer? What's happening?");
break; case 1002024: 	ts_end(CUT_FREEROAM_1);
// CUT_FREEROAM_1
break; case 1002500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"I really want some biscuits and sweets right now. Like, right right now. Can we munchie munchie?");
break; case 0.75:bet_pers(sprite[2],"I can answer that question for you: Yes.");
break; case 1.00:bet_pers(sprite[2],"Wait, I smell something. It smells goodie goodie. Mmmm nice. Let's drive towards the scent of yummy yummy yum instead. Hurry up!!");
music_what_is_playing = 2;
music_play("music_monks.mp3", 0.1);
break; case 1.50:bet_pers(sprite[2],"Oh oh oh it's a muffin wowowow muffi muffi muffin I want to eat you little cute muffin!!");
break; case 2.00:bet_pers(sprite[2],"This seems to be a plate with only two muffins on it, so unfortunately I will need to eat both.");
break; case 2.50:bet_pers(sprite[2],"...");
break; case 2.75:bet_pers(sprite[2],"I have made a decision. I changed my mind. I will share one of the muffins with you, friend.");
break; case 3.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_1B
break; case 1002600:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Whaaaaat? It disappeared?!");
break; case 0.50:bet_pers(sprite[2],"We must find it. I think I know where it went. Or not. But let's go this way.");
music_what_is_playing = 2;
music_play("music_monks.mp3", 0.1);
break; case 1.00:bet_pers(sprite[2],"I can feel the amazing smell. We are close.");
break; case 1.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_1C
break; case 1002700:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Freaking god!! I thought I was supposed to get the muffins this time? And it tricked me again!");
break; case 0.75:bet_pers(sprite[2],"But we can not give up. We have to continue searching. Now I actually saw where it went!");
music_what_is_playing = 2;
music_play("music_monks.mp3", 0.1);
break; case 1.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_1D
break; case 1002800:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"I can't believe it. One. More. Time.");
break; case 0.50:bet_pers(sprite[2],"But I still think we should try again. The muffin should be tired by now after all the teleporting.");
break; case 1.00:bet_pers(sprite[2],"Maybe this way?");
break; case 1.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_1E
break; case 1002900:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Freakin!! I sincerely disdain this muffin. I want to commit homicide against it.");
break; case 0.75:bet_pers(sprite[2],"Sigh... I can't believe who I've become. I'm usually so sensitive and artistic, and now I'm angry and mad!");
break; case 1.25:bet_pers(sprite[2],"Sniff sniff, let's follow the smell. I love love love love muffins so much.");
break; case 1.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_1F
break; case 1003000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"... Bah.");
break; case 0.50:bet_pers(sprite[2],"Are you starting to see a pattern too? All these dark patterns preying on the individual's want for yummy muffins... Sigh...");
break; case 1.00:bet_pers(sprite[2],"But maybe the muffin is trying to tell us something? Is it leading us somewhere?");
break; case 1.50:bet_pers(sprite[2],"I think it's leading us somewhere.");
break; case 1.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_EPPER
break; case 1005000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Uh... Where are we?");
break; case 0.50:bet_pers(sprite[2],"One second ago I was reaching for a muffin, and now we're in a blue hell.");
break; case 1.00:bet_pers(sprite[2],"I don't like blue hells. They limit me. I don't feel free when I'm inside blue fog.");
break; case 1.50:bet_pers(sprite[2],"My creativity has completely plummeted since I've been inside this blue wonderland. Do you feel the same?");
//TIME: 0.5
break; case 2.25:bet_pers(sprite[9],"clean up the island, badger thing");
break; case 2.50:bet_pers(sprite[2],"W-what is that sound? I-I'm scared!");
break; case 2.75:bet_pers(sprite[2],"I'll stay behind you...");
//TIME: 0.25
break; case 3.00:bet_pers(sprite[4],"o-okay, or, what? t-the whole island?");
break; case 3.25:bet_pers(sprite[9],"do it do it. clean 'epper land now badger");
break; case 3.75:bet_pers(sprite[4],"o-okay... it's not called 'epper land... but okay");
break; case 4.25:bet_pers(sprite[9],"it's called that because i changed it in the map app. stop lying");
break; case 4.75:bet_pers(sprite[9],"dont lie to the president please");
break; case 5.00:bet_pers(sprite[9],"severe punishment if you continue, don't do it don't do it");
break; case 5.50:bet_pers(sprite[4],"uh okay, sounds harsh but if you say so");
break; case 5.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_EPPER
break; case 1007401:cc(sprite[9],"who's there, who's there? you two look like morons");
break; case 1007402:cc(sprite[4],"You can't start a conversation like that, 'Epper.");
break; case 1007403:cc(sprite[9],"yes i can of course i can");
break; case 1007404:cc(sprite[4],"Okay you get as you want, I guess... I'll just give up... As always...");
break; case 1007405:cc(sprite[2],"Hello. We're two humble gentlemen from a far away island. Can you tell us how to get out of this place?");
break; case 1007406:cc(sprite[4],"\"This place\"? You mean life?");
break; case 1007407:cc(sprite[2],"No, I meant this land of extremely blue color shade.");
break; case 1007408:cc(sprite[4],"Okay... So you've never felt like you just wanna... disappear?");
break; case 1007409:cc(sprite[2],"I felt it a bit yesterday but then I saw a funny dog");
break; case 1007410:cc(sprite[9],"sigh... sorry 'bout the irish badger. he is a bit of a \"thinker\".");
break; case 1007411:cc(sprite[2],"Yes, I noticed that. Actually, I'm a thinker too!");
break; case 1007412:cc(sprite[9],"irish badger, it's time for you to leave. i need a minute with these guys.");
break; case 1007413:cc(sprite[9],"did you guys like the muffins? ha ha ha");
break; case 1007414:cc(sprite[9],"so... do you have any cash");
break; case 1007415:cc(sprite[2],"Uhm, no. Why are you asking us that?");
break; case 1007416:cc(sprite[9],"you know, to get out of this blue island... you might need to pull out a small stack of greens, if you know what i MEAN");
break; case 1007417:cc(sprite[9],"such is the deal, bro");
break; case 1007418:cc(sprite[2],"I don't like that deal at all.");
break; case 1007419:cc(sprite[9],"now i’m closing my eyes. when i open them i want to see cash in my hand.");
break; case 1007420:cc(sprite[2],"Now you're using a rethorical technique to take control over us. It's called \"blackmailing\" and is both unjuste and illegal.");
break; case 1007421:cc(sprite[9],"no im not");
break; case 1007422:cc(sprite[9],"give me money or you will experience death");
			music_play("music_horror.mp3", 0.25);
break; case 1007423:cc(sprite[2],"...");
break; case 1007424:cc(sprite[2],"Ehm. My wallet is at another place. Can I go and look for it?");
break; case 1007425:cc(sprite[9],"ok. please come back with money and give it to me");
music_play("");
break; case 1007426:cc(sprite[2],"Sure.");
break; case 1007427:cc(sprite[9],"or else youll die");
music_play("music_horror.mp3", 0.25);
break; case 1007428:cc(shelf,"What's with all these threats? It's kind of evil!");
break; case 1007429:cc(sprite[9],"im the president of 'epper land i can do anything");
break; case 1007430:cc(sprite[9],"im 'epper");
music_play("");
break; case 1007431:cc(sprite[2],"Yes, we know.");
break; case 1007432:    	ts_end(CUT_FREEROAM_OMALLEY);
// CUT_FREEROAM_OMALLEY
break; case 1008000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Let's find a way out of here, and leave this place behind before the shark notices us!");
//TIME: 1
break; case 1.50:bet_pers(sprite[4],"Can I come with you guys? Where are you going?");
break; case 2.00:bet_pers(sprite[2],"In whatever direction takes us away from this blue place!");
break; case 2.50:bet_pers(sprite[4],"Perfect, I'll follow you!");
break; case 2.75:bet_pers(sprite[2],"We're leaving for good, you know. And I'm not sure if I like you, so... We'll see about that.");
break; case 3.25:bet_pers(sprite[4],"But I hate it down here! 'Epper is a creepy shark and everything is blue. Please just take me somewhere!");
break; case 3.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_OMALLEY
break; case 1008001:cc(sprite[4],"Please guys, can I join you instead?");
break; case 1008002:cc(sprite[2],"Hmm... Let me think. Shelf, should we ask Adele and... whoever the other members are first??");
break; case 1008003:cc(sprite[4],"Adele? The other members?");
break; case 1008004:cc(sprite[2],"It's our club. But it's secret so we can't tell you about it.");
break; case 1008005:ccS("Quick side note: The government is shutting our club down. And Daddy kind of isn't in the club. ", " Quick side note: The government is trying to shut our club down. But they won't ever succeed...!");
break; case 1008006:cc(sprite[4],"Wow, a club on the brink of extinction! So cool! I'm sooo longing for a community!");
break; case 1008007:cc(sprite[4],"Down here, I'm nobody. It's like I'm in a vacuum. I just want to be someone in relation to someone else.");
break; case 1008008:cc(sprite[4],"So a club sounds amazing. Let's fucking go!");
break; case 1008009:cc(sprite[2],"Hmm... I'm still thinking here... I haven't said anything about you joining yet.");
break; case 1008010:ccS("Yes of course you can join us, O'Malley!! Also, Daddy, you aren't really in the club. ", " Welcome to the club, small badger! We desperately need more characters.");
break; case 1008011:cc(sprite[2],"Okay, you can join us! I feel like being nice today!");
break; case 1008012:ccS("I already let him in to the club, Daddy. ", " I changed my mind, you can't join.");
break; case 1008013:cc2(sprite[4],"Wow, so fun!! Thanks guys! ", " Hmmm, I think I'll go with the panda's answer. Oh yeah, I'm in the club!!");
break; case 1008014:cc(sprite[2],"Don't get too excited now.");
break; case 1008015:cc(sprite[4],"I'm sorry...");
break; case 1008016: 	ts_end(CUT_FREEROAM_OMALLEY_2);
// CUT_FREEROAM_OMALLEY_2
break; case 1008100:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"Okay, now we really have to find a way out of here.");
//TIME: 2
break; case 2.50:bet_pers(sprite[4],"So... You guys like architecture?");
break; case 2.75:bet_pers(sprite[2],"Hmm, yes, it can be interesting at times! Sometimes architecture says something ab-");
break; case 3.25:bet_pers(sprite[4],"Then listen to this. What if you built a house made of gingerbread. In SPACE.");
break; case 3.75:bet_pers(sprite[2],"It sounds impossible, so I don't think you should do it.");
break; case 4.25:bet_pers(sprite[4],"Okay, what about a house with walls made of grass where all people in it are really small and dance until sweet morning light comes?");
break; case 4.75:bet_pers(sprite[4],"Also there's no floor.");
break; case 5.00:bet_pers(sprite[2],"The only thing I can think about is... Why? Why would you do it?");
break; case 5.50:bet_pers(sprite[4],"A school with soft walls you can bounce into and the roof is made of steel and gold.");
break; case 6.00:bet_pers(sprite[4],"And the teachers are constantly angry at you and the pupils are Joe Biden's 500 forgotten sons that you for some reason can't mention in media?");
break; case 6.50:bet_pers(sprite[2],"It feels illegal, so I would rather live in a world where that doesn't exist than in a world where it does.");
break; case 7.00:bet_pers(sprite[4],"I'm just full of funny ideas, I guess...");
break; case 7.25:bet_pers(sprite[4],"So what are your interests? You like doing fun things?");
break; case 7.75:bet_pers(sprite[2],"...");
break; case 8.00:bet_pers(sprite[4],"Okay I get it, I talk too much. I guess I'll just disappear.");
//TIME: 1
break; case 9.25:bet_pers(sprite[9],"what up what up wheres the money");
break; case 9.50:bet_pers(sprite[9],"give me the money or you will die deaths");
break; case 9.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_RACE_EPPER_BEFORE
break; case 1008101:cc(sprite[9],"your car is stupid your car is stupid what car is it");
break; case 1008102:cc(sprite[2],"It's actually the car used in the intro of the movie Gone With The Wind from 1939!");
break; case 1008103:cc(sprite[9],"movie. what is that");
break; case 1008104:cc(sprite[9],"anyways, i've forgotten about the money");
break; case 1008105:cc(sprite[9],"new deal. if you win you get to live");
break; case 1008106:cc(sprite[9],"if i win you get to die. fair?");
break; case 1008107:cc(sprite[9],"no matter what, o'malley continues to live in plagues.");
break; case 1008108:cc(sprite[2],"Deal!");
break; case 1008109: 	ts_end(CUT_RACE_EPPER);
// CUT_RACE_EPPER
break; case 1008150:
ts_start();
ts_during();
if (race_state === RACE_DURING) {
switch (q) {
}
}
// CUT_CUTSCENE_RACE_EPPER_AFTER1
break; case 1008201:cc(sprite[9],"gosh darn it, you won");
break; case 1008202:cc(sprite[9],"well then you get to live. but...");
break; case 1008203:cc(sprite[9],"... you'll have to take care of o'malley");
break; case 1008204:cc(sprite[9],"ha ha ha you won the race of cars but lost in the lottery of life");
break; case 1008205:cc(sprite[9],"so... i will not do anything evil to you... he he he he...");
break; case 1008206:cc(sprite[4],"I get to leave?! YES!! Finally!!");
break; case 1008207:cc(sprite[4],"But first, I wanna show you something, Daddy! Come with me to my house!");
break; case 1008208:cc(sprite[2],"Wait, your house? Aren't you like, in 'Epper's prison or something?");
break; case 1008209:cc(sprite[4],"Yeah, sort of, but I also have a house. Come on now, you HAVE to see this!");
break; case 1008210:cc(sprite[2],"Ooh, I can't wait to see what you want to show me!");
break; case 1008211:cc(sprite[4],"It's my Playstation 3.");
break; case 1008212:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_RACE_EPPER_AFTER2
break; case 1008225:cc(sprite[9],"you know what, i changed my mind. i'm a changed human now. i mean, shark.");
break; case 1008226:cc(sprite[9],"i will let you live. no joke fully serious!");
break; case 1008227:cc(sprite[9],"i promise i won't do anything evil to you... he he he he...");
break; case 1008228:cc(sprite[9],"...");
break; case 1008229:cc(sprite[9],"so you doing anything later tonight?");
break; case 1008230:cc(sprite[4],"Come follow me, Daddy, I want to show you a thing at my house!");
break; case 1008231:cc(sprite[2],"Ooh, I wonder what it could be?");
break; case 1008232:cc(sprite[4],"It's my Playstation 2.");
break; case 1008233:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_FREEROAM_CARCHASE
break; case 1008300:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_CARCHASE2
break; case 1008400:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_CARCHASE3
break; case 1008500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_CARCHASE4
break; case 1008600:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_MAGNETDAY
break; case 1009000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MAGNETDAY_1
break; case 1009001:cc(sprite_magnet1,"  Why do people keep taking my candy?");
break; case 1009002:cc(sprite_magnet1,"  Anyways, I'm a magnet kind of guy. 's just who I am.");
break; case 1009003:cc(sprite_magnet1,"  Haters hate but I prevail.");
break; case 1009004:cc(sprite_magnet1,"  So. My invention is somewhat polarizing among netizens.");
break; case 1009005:cc(sprite_magnet1,"  You just take a magnet, smack it in your head like this *smacks magnet into head*");
			sound_punch.play();
break; case 1009006:cc(sprite_magnet1,"  And you get a fucking headache for three weeks! Haha, am I not great??");
break; case 1009007:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MAGNETDAY_2
break; case 1009051:cc(sprite_magnet2,"  Young man over there, would you mind to happen to like magnets very much?");
break; case 1009052:cc(shelf,"are magnets the theme of the year or what? only thing you talk about.");
break; case 1009053:cc(sprite_magnet2,"  No! Magnets are just what everybody naturally likes. It's what's cool.");
break; case 1009054:cc(sprite_magnet2,"  When you let conversations flow freely at parties, they gravitate toward magnet-related subjects.");
break; case 1009055:cc(shelf,"no they don't");
break; case 1009056:cc(sprite_magnet2,"  Shut up and look at this now, this is revolutionary, so so revolutionary.");
break; case 1009057:cc(sprite_magnet2,"  Look, I have a revolutionary idea that could revolutionize entire revolutions if you so wanted.");
break; case 1009058:cc(shelf,"what is it");
break; case 1009059:cc(sprite_magnet2,"  Why not make food out of magnets? They look so delicious. Yummy!");
break; case 1009060:cc(sprite_magnet2,"  I think it's the next thing. Magnets are the new black.");
break; case 1009061:cc(shelf,"i'm sceptical");
break; case 1009062:cc(sprite_magnet2,"  Fancy a magnet? *holds a magnet in front of your face*");
break; case 1009063:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MAGNETDAY_3
break; case 1009101:cc(sprite_magnet3,"  Hey.");
break; case 1009102:cc(shelf,"what's your thing? i have candy to steal from other exhibitors so give me a quick summary");
break; case 1009103:cc(sprite_magnet3,"  Magnets.");
break; case 1009104:cc(sprite_magnet3,"  I have studied the correlation between the amount of magnetic materials in the ground and depression.");
break; case 1009105:cc(sprite_magnet3,"  And there seems to be an inverted correlation. Magnets make us happy, no matter how silly it sounds!");
break; case 1009106:cc(sprite_magnet3,"  Trusted studies made by me in my basement show that magnets attract our negative emotions.");
break; case 1009107:cc(sprite_magnet3,"  They drag them out of our bodies with an incredible force that we call \"magnetism\".");
break; case 1009108:cc(sprite_magnet3,"  And from this, we can conclude that human emotions are magnets. With fields and two poles and crap.");
break; case 1009109:cc(shelf,"but wouldn't the opposite end of the magnet attract the positive feelings then?");
break; case 1009110:cc(sprite_magnet3,"  ...");
break; case 1009111:cc(sprite_magnet3,"  Back to the drawing board, I guess.");
break; case 1009112:cc(shelf,"hah, gotcha! and gotcha candy");
break; case 1009113:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MAGNETDAY_4
break; case 1009151:cc(sprite_magnet4,"  Hey, I guess");
break; case 1009152:cc(shelf,"What kind of thing are you doing little guy");
break; case 1009153:cc(sprite_magnet4,"  Uh, you can look yourself I guess");
break; case 1009154:cc(sprite_magnet4,"  Here's my brochure");
break; case 1009155:cc(shelf,"It's a bloody napkin");
break; case 1009156:cc(sprite_magnet4,"  No, it's not");
break; case 1009157:cc(shelf,"Yes it is, I see it");
break; case 1009158:cc(sprite_magnet4,"  ...");
break; case 1009159:cc(shelf,"Are you supposed to be here?");
break; case 1009160:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MAGNETDAY_5
break; case 1009201:cc(sprite_magnet5,"  Imagine this. Seat belts. Not much, right? Thats. About. To. Change.");
break; case 1009202:cc(sprite_magnet5,"  The car is a magnet. You're made of steel. Bam! Stuck to the seat! Seat belts are now HISTORY.");
break; case 1009203:cc(sprite_magnet5,"  So, what about the children? We. Thought. Of that. Too.");
break; case 1009204:cc(sprite_magnet5,"  They're driving the car! With revolutionary magnet brains they now think as fast, no, faster, than adults.");
break; case 1009205:cc(sprite_magnet5,"  They can become illegal street racers in a matter of MINUTES!");
break; case 1009206:cc(sprite_magnet5,"  Now, here's the best part");
break; case 1009207:cc(shelf,"is it legal though");
break; case 1009208:cc(sprite_magnet5,"  You know what? We thought about that too. And we realized it kind of isn't.");
break; case 1009209:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MAGNETDAY_6
break; case 1009251:cc(sprite_magnet6,"  Well, if thou look into theses microscope, you're ought to see something reeaaally peculiar.");
break; case 1009252:cc(shelf,"talking to me?");
break; case 1009253:cc(sprite_magnet6,"  Well, thou wantst to see something reeeaaally peculiar, don't cha?");
break; case 1009254:cc(shelf,"i'm afraid the answer has to be yes");
break; case 1009255:cc(sprite_magnet6,"  See tha thing down 'there?");
break; case 1009256:cc(sprite_magnet6,"  That's a thousand years old microbe from the dinosaur age. We have preserved it to gain power from it and exploit its life.");
break; case 1009257:cc(sprite_magnet6,"  Science says it contains \"magnesium\", the most magnetic element in the world.");
break; case 1009258:cc(shelf,"what's that fish thing?");
break; case 1009259:cc(sprite_magnet6,"  That's a fish thing we also found but there isn't really anything interesting about it.");
break; case 1009260:cc(shelf,"cool");
break; case 1009261:cc(sprite_magnet6,"  So, magnesium. It happens to be, thath if thou mix magnesium with the filthiest of magnets, you get-");
break; case 1009262:cc(shelf,"you can't do that");
break; case 1009263:cc(sprite_magnet6,"  Oh yes, we can and we haveth done it multiple ov times! When you mix thems, you getst-");
break; case 1009264:cc(shelf,"can i take two candies? a friend wanted a candy too");
break; case 1009265:cc(sprite_magnet6,"  You get super magnets. An' the 'thing with 'those, is that thee are neither magnetic, neither not magnetic. They seem to be-");
break; case 1009266:cc(shelf,"i took 40 candies");
break; case 1009267:    	ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MAGNETDAY_MRS
break; case 1009501:cc(sprite[7],"Yes, you bumped into me? ^^");
break; case 1009502:ccS("yes i did, who are you and why are you like this ", " no, you bumped into me, mrs cat");
break; case 1009503:cc(sprite[7],"I'm just making sure everyone has a good time! Are you having fun? ^^");
break; case 1009504:ccS("i guess. pretty small festival ", " i'm having SO fun! can't you see on my smile? *doesn't smile*");
break; case 1009505:cc(sprite[7],"Don't magnets just AMAZE you? Have you ever been on a maglev train? Sorry, I can't stop mentioning them!");
break; case 1009506:ccS("no i haven't. should i? ", " i have been on many maglev trains. silly of you to even ask!");
break; case 1009507:cc2(sprite[7],"What? You're really asking me that? Omg omg omg IF you should try it, just DO it and stop asking me things, you moron! ^^  ", " You have?! Wow wow wow I can't believe I finally get to talk to another maglev train enthusiast!!");
break; case 1009508:cc(sprite[7],"Maglev is the future, I promise you! I'm drooling on my shirt now because I can't control my excitement about maglev trains!");
break; case 1009509:ccS("will there be any interesting talks about magnet trains at the festival later? ", " Me too!! Omg I love maglev trains SO much.");
break; case 1009510:cc2(sprite[7],"Oh yes, I will hold one later! Omg you should come! ^^ ", " Actually, I will do a talk about maglev trains later at this festival! You MUST come!!");
break; case 1009511:ccS("where is it? ", " oh i would love too, but i have things to do.");
break; case 1009512:cc2(sprite[7],"Oh you will notice it, I will raise the microphone volume so much it literally drenches everything else happening on the festival. ", " That's not really a option. You MUST come, as I said.");
break; case 1009513:ccS("i won't ever go there ", " Okay, I'll be there.");
break; case 1009514:cc2(sprite[7],"I didn't hear that last part! ;D Well, see you there then! ^^ ", " Amazing! :D Well, see you there then! ^^");
break; case 1009515:    	freeroam_magnetday_hasseen_mrs	= true;
			ts_end(CUT_FREEROAM_MAGNETDAY);
// CUT_CUTSCENE_MEETING_2
break; case 1009601:cc(sprite[0],"Hey Shelf, funny that we are at the same place haha");
break; case 1009602:ccS("Very funny. You seem to get along with the new members? ", " Get to the point.");
break; case 1009603:cc2(sprite[0],"Yeah! We were just at the science festival! Seems like they had no theme this year but it was fun anyway! ", " I was just at the science festival with our new friends! Seems like they had no theme this year but it was fun anyway!");
break; case 1009604:ccS("Everything was about magnets. ", " Isn't \"science\" a theme?");
break; case 1009605:cc2(sprite[0],"Yes a lot was magnets. But they use to have a theme, like gravity or friction or atoms, but this year it was no theme. ", " Hahaha no. Science is a physical law.");
break; case 1009606:ccS("The festival was very magnet themed. They just didn't state it officially. ", " What was the deal with the weird cat?");
break; case 1009607:cc2(sprite[4],"Magnets are just interesting! There use to be something magnet related there even if they have a theme too. So it's not weird there was much about magnet there today. ", " I wonder that too. She was red.");
break; case 1009608:cc(sprite[0],"Yeah");
break; case 1009609:cc(sprite[0],"Anyways, new friends, a fun festival... it kinda made me forget about... you know, the government killing our club stuff!");
break; case 1009610:cc(shelf,"Nice! So, what now?");
break; case 1009611:cc(sprite[2],"We thought we could have the meeting here. Does that sound good?");
break; case 1009612:ccS("Wow, that's an amazing idea!! ", " that's a pretty bad idea but we don't really have a choice");
break; case 1009613:cc2(sprite[2],"Right??! I'm ready to start the meeting. Adele, you here? ", " Well, everything can't be perfect. So, should we start the meeting? Adele, you here?");
break; case 1009614:cc(sprite[0],"Hell yeah");
break; case 1009615:cc(sprite[2],"O'Malley?");
break; case 1009616:cc(sprite[4],"I guess so...");
break; case 1009617:cc(sprite[2],"Dark Gandalf?");
break; case 1009618:cc(sprite_cappy," Yeah.");
break; case 1009619:cc(sprite[2],"Shel-WAIT A MINUTE");
break; case 1009620:cc(sprite[0],"That's not Dark Gandalf.");
break; case 1009621:cc(sprite[2],"You're right. So where is Dark Gandalf?");
break; case 1009622:cc(sprite[0],"Oh no... This isn't good at all! Something has happened! He's never late!");
break; case 1009623:ccS("except today ", " What if he's here but he's just darker than usual so we can't see him?");
break; case 1009624:cc2(sprite[0],"No he's never ever late! Listen to me! ", " He's not really that dark when you think about it, he's more light-gray.");
break; case 1009625:cc(sprite[4],"Who is Dark Gandalf?");
break; case 1009626:cc(sprite[0],"I have to check... No he hasn't uploaded anything to the dark web for the last six hours.");
break; case 1009627:cc(sprite[0],"And... He doesn't answer my calls.");
break; case 1009628:cc(sprite[0],"... And no, he hasn't seen my 50 thumbs ups in the chat either.");
break; case 1009629:cc(sprite[2],"Maybe he'll join us in a few minutes.");
break; case 1009630:cc(shelf,"maybe he's just taking a break after the tough news");
break; case 1009631:cc(sprite[0],"No, he's 100% dead! We have to go and check him out before he dies though! TO DARK GANDALF'S HOUSE!");
break; case 1009632:cc(sprite[4],"I hope he's dead! No, I mean I hope he's NOT dead. Oh I screwed up the words again didn't I...");
break; case 1009633:cc(sprite[0],"I really hope nothing dark has happened to him. But, he's probably dead.");
break; case 1009634:cc(sprite[4],"...");
break; case 1009635:cc(sprite[0],"....");
break; case 1009636:cc(sprite[2],"While you were talking right now, I created the game \"Roblox\".");
break; case 1009637:cc(sprite[4],"ROADTRIP TIME!");
break; case 1009638: 	ts_end(CUT_RACE_DGTRAVEL);
// CUT_RACE_DGTRAVEL
break; case 1011050:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Hurry up, we have to find Darkie!");
//TIME: 1
break; case 1.25:bet_pers(sprite[4],"Do any of you actually know where he lives?");
break; case 1.75:bet_pers(sprite[0],"In Haftlan-Drakh!");
break; case 2.00:bet_pers(shelf,"Where's that?");
break; case 2.25:bet_pers(sprite[0],"He says it's too dark to see! So he doesn't really know where it is.");
break; case 2.75:bet_pers(sprite[2],"Actually, I saw a dark world on my nightly walk yesterday, but I used a flashlight and then it became pretty bright.");
break; case 3.25:bet_pers(sprite[2],"The darkness is certainly a bit of a marketing trick.");
break; case 3.75:bet_pers(sprite[0],"Whatever nerd, it's dark because Dark Gandalf lives there!");
break; case 4.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_DGCHILL
break; case 1011400:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Haftlan-Drakh. We're here.");
break; case 0.50:bet_pers(sprite[4],"It looks really dark.");
break; case 0.75:bet_pers(sprite[0],"It is really dark! That's why it's called Haftlan!");
break; case 1.25:bet_pers(sprite[2],"So, Dark Gandalf lives here? Sweet!");
//TIME: 2.5
break; case 3.75:bet_pers(sprite[0],"Ok here it is. Darkie's house.");
break; case 4.00:bet_pers(sprite[2],"It's so... dark.");
break; case 4.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_DGCHILL_BEFORE
break; case 1011401:cc(sprite[0],"This is Darkie's house!");
break; case 1011402:ccS("i can hear his voice! ", " wow. what a house");
break; case 1011403:cc2(sprite[2],"That means his voice must be inside the house. ", " Yeah, the architecture of this house is really something.");
break; case 1011404:cc2(sprite[0],"I hear two voices... So two persons should be in there. Maybe Dark Gandalf and Dark Gandalf again? ", " So... Why are we just standing here");
break; case 1011405:cc2(sprite[2],"What the FUCK, does he have other friends than us? ", " Wait! I'm hearing something from inside the house.");
break; case 1011406:cc(sprite[1],"What happened to solidarity in our society? Lost! Gone! Where did it go?");
break; case 1011407:cc(sprite[8],"Solidarity? What are you gabbering about now?");
break; case 1011408:cc(sprite[1],"You know there's no winner in capitalism, right? You do know that, right??");
break; case 1011409:cc(sprite[8],"That isn't true, I'm a winner because I'm rich.");
break; case 1011410:cc(sprite[1],"... But now you are thinking on a surface level. You must also recognize the underlying factors!");
break; case 1011411:cc(sprite[8],"Darchadais.");
break; case 1011412:cc(sprite[1],"Yes?");
break; case 1011413:cc(sprite[8],"When was the last time you got some pussy?");
break; case 1011414:cc(sprite[4],"I've heard enough! Kick the door open by force!!");
break; case 1011415: 	ts_end(CUT_FREEROAM_DGCHILL_BGLIDE);
// CUT_FREEROAM_DGCHILL_BGLIDE
break; case 1011200:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_DGCHILL_GLIDE
break; case 1011300:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
sound_play(sound_gunshot);
break; case 0.25:bet_pers(sprite[8],"Alright, what's the dealio?");
break; case 0.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_DGCHILL_OPEN
break; case 1011501:cc(sprite[8],"Alright, get to the point. What's the dealio?");
break; case 1011502:cc(sprite[0],"Polish Cow? My old biology teacher?");
break; case 1011503:cc(sprite[4],"Polish Cow, my old career adviser at the business accelerator in Testotown?");
break; case 1011504:cc(sprite[2],"Polish Cow, my wife's new boyfriend?!");
break; case 1011505:ccS("Polish Cow, a cow? ", " Polish Cow, the pollination expert whom I met at the garden fair in Geneve 1987?");
break; case 1011506:cc(sprite[8],"Yes it's me, Polish Cow. And I am, indeed, a cow from Poland. cześć wam idioci!");
break; case 1011507:cc(sprite[1],"Don't embarrass me, Polish, we speak English on this island. So, what brings you guys to my gayberhood? Eh, neighborhood?");
			music_play("music_dg.mp3", 0.05);
			music_what_is_playing = 2;
break; case 1011508:cc(sprite[4],"We missed you at the meeting! So we decided to just show up at your house like total freaks!");
break; case 1011509:cc(sprite[4],"So... How's it hanging?");
break; case 1011510:cc(sprite[1],"Hands up and feet down, haha! Or, head up and feet down or something.");
break; case 1011511:cc(sprite[1],"You know, I got another message from the government. About another subject. I can tell you more about it later.");
break; case 1011512:cc(sprite[1],"So, it's all been pretty much for me... That's why I've been staying at home.");
break; case 1011513:cc(sprite[8],"With Polish Cow.");
break; case 1011514:cc(sprite[1],"That's correct.");
break; case 1011515:cc(sprite[8],"Stress hits hard, bruh.");
break; case 1011516:cc(sprite[2],"So, what are your plans for the day?");
break; case 1011517:cc(sprite[8],"We're on the way to the hotspring for some epic Polish-themed guys-only talk. Got your swimsuits with ya?");
break; case 1011518:cc(sprite[1],"In the hotspring we're nude, or not at all.");
break; case 1011519:cc(sprite[8],"We bathed there in clothes yesterday, why the change?");
break; case 1011520:cc(sprite[1],"...");
break; case 1011521:cc(sprite[8],"....");
break; case 1011522:cc(sprite[8],"So follow me, guys! And remember, the hotspring is a girl and parent free zone.");
break; case 1011523:cc(sprite[0],"Haha of course!!");
break; case 1011524:cc(sprite[2],"Wow, Polish Cow is a really chill dude.");
break; case 1011525:    	ts_end(CUT_FREEROAM_DGHOTSPRING);
// CUT_FREEROAM_DGHOTSPRING
break; case 1011600:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_DGHOTSPRING
break; case 1011601:cc(sprite[1],"Okay, so you all know the hotspring rules, correct?");
break; case 1011602:cc(sprite[0],"Yes! In the hot tub no girls are allowed, only guys are, and also girls are forbidden");
break; case 1011603:cc(sprite[8],"And you can only talk about crypto, girls and football.");
break; case 1011604:cc(sprite[1],"Exactly. So let's start talking about the latest football game.");
break; case 1011605:cc(sprite[2],"It was so sad when the two teams lost against each other.");
break; case 1011606:cc(sprite[1],"Absolutely devastating. Both teams sucked donkey dick.");
break; case 1011607:cc(sprite[8],"The ladies' teams though. Just sayin' ;).");
break; case 1011608:cc(sprite[0],"Boobs");
break; case 1011609:cc(sprite[4],"Can we stop talking about football? I got bullied by a football team in elementary school.");
break; case 1011610:cc(sprite[1],"We had such a good time here, weird animal, why did you ruin it?");
break; case 1011611:cc(sprite[4],"I always ruin everything...");
break; case 1011612:cc(sprite[1],"You just got transferred to the other hotspring, badger.");
break; case 1011613:cc(sprite[4],"Okay, I'll leave...");
break; case 1011614:cc(sprite[0],"So. Chicks, right?");
break; case 1011615:cc(sprite[2],"Yes, chicks. I like intellectual girls the most, what do you all prefer?");
break; case 1011616:cc(sprite[1],"I follow some interesting and sympathetic women on the internet. I want them to share my life view and political stance.");
break; case 1011617:cc(sprite[8],"I have a certain \"type\", if you know what I mean.");
break; case 1011618:cc(sprite[8],"When I see my \"type\" I feel a physical attraction, like a physiological force.");
break; case 1011619:cc(sprite[8],"But they repell me at the same speed.");
break; case 1011620:cc(sprite[1],"Is your type \"female cows\"?");
break; case 1011621:cc(sprite[2],"It sounds like you are attracted to physical equations, like Alfred Einerstein's well-known formula \"E=mc3\".");
break; case 1011622:cc(sprite[8],"Both wrong.");
break; case 1011623:cc(sprite[0],"I think his type is girls.");
break; case 1011624:cc(sprite[8],"You'll know what it is if you catch me out mooing a late friday night");
break; case 1011625:cc(sprite[4],"Are you all having fun over there?");
break; case 1011626:cc(sprite[1],"Just pretend like you didn't hear him.");
break; case 1011627:cc(sprite[1],"By the way, did you hear about the new trainstation in Haftlan?");
break; case 1011628:cc(sprite[8],"I heard they're making a new high-speed motorway too?");
break; case 1011629:cc(sprite[1],"No, they're not, it got voted down! They're only building the trainstation. Actually, that's what my government letter was about.");
break; case 1011630:cc(sprite[1],"And you know where they will build it? Right beside my house.");
break; case 1011631:cc(sprite[1],"Better get used to the noise and pollution, I guess.");
break; case 1011632:ccS("we're all literally sitting in our cars in a hotspring ", " You can buy earplugs");
break; case 1011633:cc2(sprite[1],"Yeah, but still! ", " No!! They're too expensive!!");
break; case 1011634:    	ts_end(CUT_FREEROAM_DGHOTSPRING_2);
// CUT_FREEROAM_DGHOTSPRING_2
break; case 1011800:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[8],"What do y'all say, sleepover with the guys?");
break; case 0.75:bet_pers(sprite[2],"Oh I hope he says yes come on come on say yes Dark Gandalf!!");
break; case 1.25:bet_pers(sprite[1],"Okay, sure.");
break; case 1.50:bet_pers(sprite[1],"You guys sleep upstairs, and I'll be downstairs listening to your loud footsteps!");
break; case 2.00:bet_pers(sprite[4],"I will walk 500 steps before I go to sleep, even though the room is only three meters wide.");
break; case 2.50:bet_pers(sprite[0],"I will walk a lot too, and also drop stuff on the floor now and then.");
break; case 3.00:bet_pers(sprite[2],"I'll walk, and I'll walk fast, like I'm stressed about something, even if time's around 11 PM.");
break; case 3.50:bet_pers(sprite[8],"I will sing Polish folk songs until 3 AM using my portable microphone and speaker.");
break; case 4.00:bet_pers(sprite[8],"And of course I will walk back and forth like I had something important to do, even though I don't. Dobranoc przyjaciele!");
break; case 4.50:bet_pers(sprite[1],"Sounds about alright. Good night, comrades!");
break; case 5.00:    	ts_end(CUT_CUTSCENE_DGSLEEP);
break; case 5.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_DGSLEEP
break; case 1011801:cc(sprite[2],"... Z   Z   Z ...");
			sprite[2].visible = false;
break; case 1011802:cc(sprite[8],"Hey elk, I'm trying to sleep, can you stop working out?");
break; case 1011803:cc(shelf,"i've been texting him that all night but he hasn't seen my messages. probably because he's been doing burpees");
break; case 1011804:cc(sprite[2],"ADELE! Why doesn't he listen?");
break; case 1011805:cc(shelf,"AADEEELEEEE!!");
break; case 1011806:cc(sprite[8],"MOOOOOOOOOOOOOOOOOOO!");
break; case 1011807:cc(sprite[0],"What the actual fuck is there a cow in here what the fuck?");
break; case 1011808:cc(sprite[0],"Right, Polish Cow.");
break; case 1011809:cc(sprite[2],"I was just thinking about the fact that you're doing burpees when we're trying to sleep.");
break; case 1011810:cc(sprite[2],"What's the possibility for you to stop executing that action in an immediate time?");
break; case 1011811:cc(sprite[0],"Did you say something?");
break; case 1011812:cc(sprite[2],"Now he does push-ups with claps in between them.");
break; case 1011813:cc(sprite[2],"Can you moo again, Polish Cow? He doesn't liste-");
break; case 1011814:cc(sprite[8],"Yeah I work-out with Adele now so I don't listen. If you can't beat them, join them!");
break; case 1011815:cc(shelf,"maybe we can just sleep with earplugs?");
			sound_washingmachine2.play();
break; case 1011816:cc(shelf,"what's that sound? is it a washing machine? because it sounds like one.");
break; case 1011817:cc(sprite[2],"Seriously... Dark Gandalf is laundrying NOW?");
break; case 1011818:cc(sprite[4],"He has a very loud washing machine.");
break; case 1011819:cc(sprite[8],"HEY!! What the freaking moo is that??");
break; case 1011820:cc(sprite[5],"Can you all stop making so much noise??");
room_set("roomwall da.jpg", "roomfloor da.jpg"); room.visible = true; player.position.y = room.position.y-0.5;
break; case 1011821:cc(sprite[4],"Seriously, who are you?! And who are you to judge, you literally just turned on a washing machine in here?");
break; case 1011822:cc(sprite[5],"Yes but your movements annoy me because they interfere with my washing machine's soothing shaking sound. It's VERY ANNOYING!");
break; case 1011823:cc(sprite[0],"WHO ARE YOU YOU ARE WEIRD WHY ARE YOU HERE HOW DID YOU GET IN WHAT THE FUCK?");
	sound_play(sound_splash);
break; case 1011824:cc(sprite[5],"Hi, I'm the one and only Hårass! Nice to meet you. also fuck you!!");
break; case 1011825:cc(sprite[4],"(is stressed) When you opened the washing machine, all its water got spilled out on the floor.");
break; case 1011826:cc(sprite[5],"I'm Dark Gandalf's best friend. This is like my second home. I don't even have to tell Dark Gandalf before I come here. I think!");
break; case 1011827:cc(shelf,"if i wasn't deadly scared of you i would never tolerate you coming here uninvited and sleeping in a turned-on washing machine.");
break; case 1011828:cc(sprite[5],"Shut up your mama's a pussy");
break; case 1011829:cc(sprite[1],"Hey guys, can you tell Hårass to stop it?");
break; case 1011830:cc(sprite[5],"Stop what?");
break; case 1011831:cc(sprite[1],"Any of the weird things you do. I have to remind you sometimes because otherwise things will go downhill for you, remember?");
break; case 1011832:cc(sprite[5],"Ok, I'll stop with the weird nose noises");
break; case 1011833:cc(sprite[2],"Oh shoot, I didn't think of his nose noises before but now I do...");
break; case 1011834:cc(shelf,"didn't he say he stopped with them?");
break; case 1011835:cc(sprite[5],"I said that but I didn't stop with them, I actually started doing them more.");
break; case 1011836:cc(sprite[8],"I'm actually considering sleeping outside in a dirty water puddle or something instead of in here.");
break; case 1011837:cc(sprite[4],"Okay, so welcome to the car club I guess, Hårass! I also recently joined!");
break; case 1011838:cc(sprite[0],"...");
break; case 1011839:cc(sprite[2],"....");
break; case 1011840:cc(sprite[4],"Why are you all looking at me??");
break; case 1011841:    	sound_washingmachine2.pause();
			room.visible = false;
			for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
			player.position.y = height_get(player);
			ts_end(CUT_FREEROAM_WASHING);
// CUT_FREEROAM_WASHING - �r FPS! hårass �r p� fel plats! best�m vad som ska ske h�r!! kanske f�rst inne hos hårass, sen ska han pl�tsligt l�ra dig att bli en man
break; case 1001200:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[5],"EPISODE 1 ends here! Thanks for playing, and stay tuned for EPISODE 2. /kbrecordzz");
//TIME: 1
//h: HELP! I need someone to invest in me!
//h: Can someone come quick and help me reach my full potential?! Help!!!
//h: The upwards trajectory of me is looking really promising! Help!
//TIME: 3
//h: Hmm, clearly this doesn't work. Let's try something else.
//h: Hamster whore! Come to my apartment and help me wash my washing machines!
break; case 4.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_WASHING
break; case 1001201:cc(sprite[5],"Hey. U wanna buy some products?");
break; case 1001202:ccS("what ", " why? no");
break; case 1001203:cc(sprite[5],"U wanna buy? I sell! How about a brand new vacuum cleaner from Dustin Home? Only 20$ if you buy it today!");
break; case 1001204:ccS("Why are you selling me stuff? ", " stop it");
break; case 1001205:cc(sprite[5],"I also have brand new earphones directly from the headquarters in Hongkong");
break; case 1001206:ccS("What headquarter? ", " what does \"brand new\" mean");
break; case 1001207:cc2(sprite[5],"If you buy both products now you also get a brand new CABLE TV! ", " Don't ask, just BUY! For example, this brand new CABLE TV!");
break; case 1001208:cc(shelf,"I don't want a TV but thank you very much.");
break; case 1001209:cc(sprite[5],"U wanna buy Voddler? I bought it yesterday for 900 dollars.");
break; case 1001210:cc(shelf,"... Didn't Voddler stop existing ten years ago?");
break; case 1001211:cc(sprite[5],"Uh, if it did, why does this site say “VODDLER” in all caps at the top?");
break; case 1001212:cc(shelf,"let me see your computer...");
break; case 1001213:cc(shelf,"yes, as I thought, you haven’t deleted your cache the last ten years. Of course you will see old stuff then!");
break; case 1001214:cc(sprite[5],"Whatever. Watch this meme i found on Gopher. Have you seen this?");
break; case 1001215:cc(shelf,"When you see it, you'll... yeah, i've seen it. it's 15 years old, and not funny.");
break; case 1001216:cc(sprite[5],"If it isn't funny, how come i laughed for 30 minutes yesterday when i saw it?");
break; case 1001217:ccS("I just saw it! I just saw the thing you were supposed to find but was hidden! It was such a twist when I found it! ", " because... you're a crazy white bat with the humour taste of a mom?");
break; case 1001218:cc2(sprite[5],"RIGHT? Hahahaha! You get it! ", " A lot of name-calling right now. And very little buying of my products.");
break; case 1001219:cc(sprite[5],"Anyways, I need help washing my washing machines.");
break; case 1001220:cc(shelf,"Why do you have so many washing machines running? You're using up the energy reserves with all this electricity");
break; case 1001221:cc(sprite[5],"No no no, first of all that's not true, washing machines are very environment-friendly.");
break; case 1001222:cc(sprite[5],"Second, they get energy from each other by placing small water mills in each washing machine.");
break; case 1001223:cc(sprite[5],"I've created the eternal energy source. Don't tell anyone!!!");
break; case 1001224:cc(sprite[5],"Wash my washing machines now. I'll go take a coupl' laps in one of the free machines while you're on it.");
break; case 1001225:    	room.visible = false;
			for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
			player.position.y = height_get(player);
			ts_end(CUT_FREEROAM_WASHING_2);
// CUT_FREEROAM_WASHING_2
break; case 1012300:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// g�r om detta till cutscene n�r man st�ller sig p� startlinjen!!
// CUT_RACE_HAFTLAN
break; case 1011950:
ts_start();
ts_during();
if (race_state === RACE_BEFORE) {
switch (q) {
       case 0.25:bet_pers(sprite[1],"Are you ready for a dark race?");
break; case 0.50:bet_pers(sprite[1],"Better enjoy the Haftlan roads until train traffic takes over! Haha just kidding but it's also true.");
break; case 1.00:bet_pers(sprite[1],"They'll build a station here and one at my place.");
break; case 1.50:bet_pers(sprite[0],"Who takes the train to you? Only you live there!");
break; case 2.00:bet_pers(sprite[1],"That's what I've been saying! I'm all for collective traffic, but you've gotta draw the line somewhere.");
break; case 2.50:bet_pers(sprite[1],"Anyways, Haftlan-Drakh is known for its heavy terrain, so expect a bumpy ride!");
break; case 3.00:bet_pers(sprite[0],"Yes Haftlan is very bumpy haha");
break; case 3.25:bet_pers(sprite[8],"The winner of the race will get a freshly cooked piece of  golonka (polish swine steak) from me.");
break; case 3.75:bet_pers(sprite[0],"Better lose then I guess");
break; case 4.00:bet_pers(sprite[1],"Seriously, Polish? A bicycle?");
break; case 4.25:bet_pers(sprite[0],"HAHAHAHA I didn't see that until now. HAHAHA so lame.");
break; case 4.75:bet_pers(sprite[8],"What? What's so weird with my bicycle?");
break; case 5.00:bet_pers(sprite[2],"Wait, let me just inspect the motor on Polish Cow's vehicle. Wait, it doesn't have any!");
break; case 5.50:bet_pers(sprite[0],"Hahahaha nailed it!");
break; case 5.75:bet_pers(sprite[8],"I'll just say this: Wait until the race starts, and then we'll see who's laughing.");
break; case 6.25:bet_pers(sprite[1],"Okay, let's start. Hårass gets some handicap, because he's the only senior of us.");
break; case 6.75:bet_pers(sprite[5],"What?? No I'm not??!");
break; case 7.00:bet_pers(sprite[1],"You're not 65?");
}
}
else if (race_state === RACE_DURING) {
switch (q) {
       case 0.25:bet_pers(sprite[8],"I just realized my bicycle is really slow. This was embarrassing. I'll just leave. See you never again, guys!");
//TIME: 2
break; case 2.50:bet_pers(sprite[0],"It's sooo bumpy here");
//TIME: 3
break; case 5.50:bet_pers(sprite[2],"Did you know I was the first baby to climb Mount Everest without parents?");
break; case 6.00:bet_pers(sprite[1],"Didn't know, didn't care.");
break; case 6.25:bet_pers(sprite[2],"meh. I think it's cool!");
//TIME: 2
break; case 8.25:bet_pers(sprite[4],"Do you feel sometimes that you're collapsing... on the inside... from your own weight?");
break; case 8.75:bet_pers(sprite[1],"Just ignore him.");
}
}
// CUT_FREEROAM_RACE_HAFTLAN_AFTER - har ska dogert komma fran ingenstans och snacka med daddy. detta ska ske EFTER workers building trainstation scenen!!
break; case 1012000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[3],"CAN.SOMEONE.TELL.EVERYONE.IM.HERE.");
r_click_on = 1; r_click_obj = cz[3]; r_click_dist = 5; r_click_cut = CUT_CUTSCENE_DOGERTDREAM;
break; case 0.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_WORKERSBUILDING
// denna ska spelas upp innan man k�r racet!!
// SLUT P� EPISODE 1
break; case 1011951:cc(sprite_worker," hey, you!");
break; case 1011952:cc(sprite[1],"these are some REAL WORKERS! Greetings, comrades! How is it going slaving for the big guy?");
break; case 1011953:cc(sprite_worker," yeah, so you will have to move out of the way, as you see.");
break; case 1011954:cc(sprite[1],"what, why?");
break; case 1011955:cc(sprite_worker," can you move? We're coming through here.");
break; case 1011956:cc(sprite[1],"what in hell's name is that?");
break; case 1011957:cc(sprite[0],"guys, why are you so stressed?");
break; case 1011958:cc(sprite_worker," wouldn't you also be stressed if people blocked your way when you're at your job?");
break; case 1011959:cc(sprite[0],"i don't have a job");
break; case 1011960:cc(sprite[1],"no, neither of us have jobs. We just race and talk.");
break; case 1011961:cc(sprite_worker," these guys don't listen, we'll have to wait.");
break; case 1011962:cc(sprite[1],"oh right, is this the trainstation? Okay that's cool");
break; case 1011963:cc(sprite[0],"they are building it ON the road too, that's so wacky and cool!!");
break; case 1011964:cc(sprite[4],"on the road?");
break; case 1011965:cc(sprite[1],"that's weird. Hey, working class heroes! Why are you building the train rail above the road?");
break; case 1011966:cc(sprite[0],"Yeah, won't it be hard to drive cars on the road then?");
break; case 1011967:cc(sprite_worker," sigh...");
//ts_end(CUT_FREEROAM_RACE_HAFTLAN_AFTER);
ts_end(CUT_FREEROAM_EPISODE1END);
// CUT_FREEROAM_EPISODE1END
break; case 9999999900:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_DOGERTDREAM
break; case 1012001:cc(sprite[3],"I.JUST.DREAMT.A.DREAM.FOR.THE.FIRST.TIME.EVER.");
break; case 1012002:cc(sprite[2],"Ooh, tell me everything!");
break; case 1012003:cc(sprite[3],"I.WAS.A.RAILROAD.BUILDER.IN.AMERICAT.");
break; case 1012004:cc(sprite[3],"BUT.I.ALWAYS.BUILT.THE.RAILROAD.RIGHT.INTO.MY.YARD.INSTEAD.OF.WHERE.IT.WAS.SUPPOSED.TO.GO.");
break; case 1012005:cc(sprite[3],"SO.MY.HOUSE.BECAME.A.BIG.TRAIN.EXCHANGE.TOWN.");
break; case 1012006:cc(sprite[3],"THEN.I.ATE.SAUSAGE. THEN.I.WOKE.UP.");
break; case 1012007:cc(sprite[2],"Hmmm. Sounds interesting.");
break; case 1012008:cc(sprite[3],"YOURE.A.DIRECTOR.RIGHT.");
break; case 1012009:cc(sprite[2],"Yes. And a writer and occasional photogr-");
break; case 1012010:cc(sprite[3],"YOU.MUST.DO.MOVIE.WITH.THE.ENDING.\"BUT.IT.WAS.ALL.JUST.A.DREAM.\"");
break; case 1012011:cc(sprite[2],"I know! I have sent that idea to different production companies, but nobody likes that idea.");
break; case 1012012:cc(sprite[3],"AM.I.NOBODY.");
break; case 1012013:cc(sprite[2],"No... But you have to appeal to the larger crowd too.");
break; case 1012014:cc(sprite[3],"OKAY.THEN.MAYBE.DONT.DO.IT.");
break; case 1012015:cc(sprite[0],"So Dogert, why did you come here? A new race?");
break; case 1012016:cc(sprite[3],"NO.I.JUST.WANTED.TO.SAY.THAT.TO.DADDY.");
break; case 1012017: 	ts_end(CUT_FREEROAM_3_5);
// CUT_FREEROAM_3_5
break; case 1012100:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MEETING_3
break; case 1012401:cc(sprite[1],"So, let's start the meeting. I have an important point about the trainstation tha-");
break; case 1012402:cc(sprite[3],"TIME.FOR.DRIVERS.LICENSE.COURSE.");
break; case 1012403:cc(sprite[0],"Fuck!");
break; case 1012404:cc(sprite[4],"Fuck!!");
break; case 1012405:cc(sprite[5],"Fuck!!!");
break; case 1012406:cc(sprite[2],"Fuck!!!!");
break; case 1012407:cc(sprite[1],"Yay!");
break; case 1012408:    	room.visible = false;
		for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
		player.position.y = height_get(player);
		ts_end(CUT_FREEROAM_4);
// CUT_FREEROAM_4
// g�r s� att man faktiskt kan l�sa dessa n�gon g�ng! g�r en on�digt l�ng omv�g med Dogert. ni kanske hittar tyngder att h�nga p� er s� ni kan �ka under vattnet. k�nns typiskt dogert att ta vattenv�gen!
break; case 1012500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[4],"Hey you, washing machine guy?");
break; case 0.50:bet_pers(sprite[5],"The guy. I'm the guy. Not the \"washing machine guy\".");
break; case 0.75:bet_pers(sprite[4],"Okay, the guy, can you do me a f-");
break; case 1.00:bet_pers(sprite[5],"I don't like being labeled. I just happen to like washing machines.");
break; case 1.50:bet_pers(sprite[4],"Oh okay, I understand");
break; case 1.75:bet_pers(sprite[5],"Do you like to be labeled? Or do you have a hobby or anything?");
break; case 2.25:bet_pers(sprite[4],"I'm actually into architecture a lot! So I would love to be labeled a master architect haha!");
break; case 2.75:bet_pers(sprite[5],"Okay that's so cool, but it sounds like something that... That.. I don't know, I don't really have anything to say");
break; case 3.25:bet_pers(sprite[4],"It's fine.");
break; case 3.50:bet_pers(sprite[5],"We're in the same gang, but i think we don't need to be friends.");
break; case 4.00:bet_pers(sprite[4],"We seem to have nothing in common, so totally fine with me.");
break; case 4.50:bet_pers(sprite[5],"Deal");
//TIME: 1
break; case 5.50:bet_pers(sprite[2],"You know Adele's steroid use? I'm not really cool with it.");
break; case 6.00:bet_pers(sprite[0],"But it's cool?");
break; case 6.25:bet_pers(sprite[2],"But I don't think it is, that's what i'm trying to communicate here!");
break; case 6.75:bet_pers(sprite[0],"Well just don't watch my EXPLOSIVE ARMS then, ignore them if you can!");
break; case 7.25:bet_pers(sprite[2],"I just think we as a club shouldn't do illegal activities.");
break; case 7.75:bet_pers(sprite[1],"Excuse me, but if you haven't noticed, our club is solely based on illegalities.");
break; case 8.25:bet_pers(sprite[2],"I try my best to be on the correct side of the law! Why can't we all try that?");
break; case 8.75:bet_pers(sprite[0],"I want explosive guns as arms so i don't know how i would do it");
break; case 9.25:bet_pers(sprite[0],"And I do so much bad that I really can't stop");
break; case 9.75:bet_pers(sprite[0],"If i'm a criminal in one way i can be it in more ways while I'm still at it");
break; case 10.25:bet_pers(sprite[0],"Because I really can't stop");
break; case 10.50:bet_pers(sprite[4],"That sounds like a dangerous negative spiral.");
break; case 11.00:bet_pers(sprite[0],"Negative?");
//TIME: 3
break; case 14.00:bet_pers(sprite[4],"Why is Dogert's driver's license course sooo far away??");
break; case 14.50:bet_pers(sprite[0],"Driver's license courses use to be far away. If you don't live close to it I guess.");
break; case 15.00:bet_pers(sprite[2],"Yes in that ");
break; case 15.25:bet_pers(sprite[0],"If you live close, it can be like 2-3 minutes to go there!");
break; case 15.75:bet_pers(sprite[2],"That's the big advantage of living close to driver's license courses.");
break; case 16.25:bet_pers(shelf,"shut up");
break; case 16.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_LICENSE
break; case 1012501:cc(sprite[3],"HELLO.EVERYBODY.AND.WELCOME.TO.THE.COURSE. FIRST.I.WILL.TEACH.YOU.THE.BASICS.");
break; case 1012502:cc(sprite[4],"Oooh I love basics!");
			sprite_omalley_italy.visible = true;
break; case 1012503:cc(sprite[3],"DARK.GANDALF.YOU.DONT.NEED.TO.DO.THE.COURSE.BECAUSE.I.LOVE.YOU");
break; case 1012504:cc(sprite[1],"Sweet.");
break; case 1012505:cc(sprite[3],"THE.SAME.GOES.FOR.ADELE.DADDY.HÅRASS.AND.O'MALLEY.I.LOVE.YALL.SO.YOU.ARE.FREE.TO.DO.WHATEVER.YOU.WANT.");
break; case 1012506:cc(sprite[4],"Oh, thank you Dogert! Sure, we'll go do something else instead.");
break; case 1012507:cc(sprite[3],"LISTEN.CAREFULLY.SHELF. YOURE.IN.THE.SPOTLIGHT.NOW.");
break; case 1012508:cc(sprite[3],"RIGHT.PEDAL.GO.VROOM. AND.LEFT.PEDAL.IS.NOT.INTERESTING.TO.LEARN. BECAUSE.IT.MAKES.THE.CAR.GO.SLOWER.");
break; case 1012509:cc(sprite[3],"USE.THE.STEERING.WHEEL.TO.MOVE.THE.CAR.SIDEWAYS. THIS.IS.CALLED.PARALLELL.DRIVING.");
break; case 1012510:cc(sprite[3],"DRIVE.AROUND.AND.SEE.HOW.IT.FEELS. I.WILL.WATCH.YOU.FROM.THE.SIDE.IN.A.NON.CREEPY.WAY.");
break; case 1012511:    	ts_end(CUT_FREEROAM_LICENSE);
// CUT_FREEROAM_LICENSE
break; case 1012600:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[3],"SHOW.ME.WHAT.YOU.GO.FOR. TURN.LEFT.OR.RIGHT. THIS.IS.THE.HARDEST.CHALLENGE.");
break; case 0.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_LICENSE_2
break; case 1012601:cc(sprite[3],"YOU.ARE.VERY.GOOD.AT.TURNING.LEFT.OR.RIGHT.");
break; case 1012602:cc(sprite[3],"NOW.ITS.TIME.FOR.THE.NEXT.CHALLENGE.");
break; case 1012603:cc(sprite[3],"BUT.FIRST.LET.ME.TELL.YOU.ABOUT.MY.EX.");
break; case 1012604:cc(sprite[3],"THAT.OLD.SKANK.WAS.SO.BEAUTIFUL.");
break; case 1012605:cc(sprite[3],"SHE.WAS.ALSO.REALLY.GOOD.AT.DRIVING.CAR.");
break; case 1012606:cc(sprite[3],"HAHAHAHA.I.HAVE.BEEN.WITH.MANY.BITCHES.");
break; case 1012607:cc(sprite[3],"HERES.THE.CHALLENGE.");
break; case 1012608:cc(sprite[3],"PASS.A.LONG.LINE.OF.CARS.IN.FRONT.OF.YOU.IN.HEAVY.TRAFFIC.");
break; case 1012609:    	ts_end(CUT_FREEROAM_LICENSE_2);
// CUT_FREEROAM_LICENSE_2
break; case 1012700:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[3],"PASS.THE.TRAFFIC.NOW.PLEASE.");
break; case 0.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_LICENSE_3
break; case 1012701:cc(sprite[3],"WELL.DONE. BUT.ALSO.VERY.BAD.");
break; case 1012702:cc(sprite[3],"CHALLENGE.3.");
break; case 1012703:cc(sprite[3],"WOULD.YOU.TRUST.THIS.CAPYBARA.TO.BORROW.YOUR.CAR.");
break; case 1012704:cc(sprite_cappy,"  Hi.");
break; case 1012705:ccS("For how long ", " Um, no? I don't know him.");
break; case 1012706:cc2(sprite[3],"OKAY.NEVER.MIND. THIS.CHALLENGE.IS.KIND.OF.BAD. ", " ITS.MY.BEST.FRIEND. HOW.CAN.YOU.SAY.THAT.TO.MY.BEST.FRIEND.");
break; case 1012707:cc2(sprite[3],"LETS.GO.TO.THE.NEXT.STATION. ", " ANYWAYS.LETS.GO.TO.THE.NEXT.STATION.");
break; case 1012708:cc(sprite[3],"EVERY.TIME.I.DO.THIS.CHALLENGE. SOMEONE.ALWAYS.COMPLAINS.THAT.IT.SUCKS.");
break; case 1012709:cc(sprite[3],"SO.DONT.DO.THAT.THIS.TIME.PLEASE.");
break; case 1012710:ccS("I promise, Dogert. ", " I can't promise that, Dogert.");
break; case 1012711:cc2(sprite[3],"I.WANT.A.LEGAL.PROMISE.ON.PAPER. ", " I.NEED.A.LEGAL.PROMISE.ON.PAPER.THAT.YOU.WONT.SAY.THAT.");
break; case 1012712:cc(sprite[3],"JUST.KIDDING. IM.NOT.THAT.KIND.OF.GUY.");
break; case 1012713:ccS("Of course not, you're Dogert! ", " You sure?");
break; case 1012714:cc2(sprite[3],"SHUT.UP. ", " YES.IM.SURE. DONT.EVEN.DOUBT.IT.FOR.ONE.SECOND.");
break; case 1012715:cc(sprite[3],"THE.CHALLENGE.IS.THE.FOLLOWING. USE.THE.BRAKE.TO.SLOW.DOWN.THE.CAR.");
break; case 1012716:cc(sprite[3],"ITS.AN.ILLEGAL.MANEUVER.BECAUSE.ITS.LAME.TO.DRIVE.SLOW. BUT.ITS.IMPORTANT.TO.BE.A.REBEL.SO.YOU.NEED.TO.TRY.IT.ANYWAYS.");
break; case 1012717:    	ts_end(CUT_FREEROAM_LICENSE_3);
// CUT_FREEROAM_LICENSE_3
break; case 1012800:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[3],"BRAKE!");
break; case 0.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_LICENSE_4
break; case 1012801:cc(sprite[3],"WOW.YOU.DID.IT. OK.PARTY.TIME.IS.OVER. TIME.FOR.MORE.CRAZY.CHALLENGES.");
break; case 1012802:ccS("Hey Dogert, why do you sound like that?", "");
break; case 1012803:cc2(sprite[3],"...", "");
break; case 1012804:cc2(sprite[3],"What do you mean? Just got self-concious over here by you saying that", "");
break; case 1012805:ccS("Hey! Now you spoke like a normal guy! Is your loud voice just an act?", "");
break; case 1012806:cc2(sprite[3],"No but I mean, you don't have to be the same kind of guy all the time. I am a spectrum, not a singular point.", "");
break; case 1012807:ccS("Beautifully said. I think we are all on a spectrum.", "");
break; case 1012808:cc2(sprite_cappy,"  Especially Dogert.", "");
break; case 1012809:cc(sprite[3],"NOW.FOR.SOMETHING.REALLY.EASY. POCKET.PARK.BETWEEN.THESE.TWO.BUSES.IN.STEEP.HILL.");
break; case 1012810:    	ts_end(CUT_FREEROAM_LICENSE_4);
// CUT_FREEROAM_LICENSE_4
break; case 1012900:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[3],"THIS.ONE.IS.MY.FAVORITE.");
break; case 0.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_LICENSE_5
break; case 1012901:cc(sprite[3],"SORRY.BUT.YOU.DROVE.FORWARDS.AND.THATS.ILLEGAL.IN.THIS.CHALLENGE.");
break; case 1012902:cc(sprite[3],"OKAY.LETS.DO.THE.NEXT.THING.");
break; case 1012903:    	ts_end(CUT_FREEROAM_LICENSE_5);
// CUT_FREEROAM_LICENSE_5
break; case 1013000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[3],"LAST.CHALLENGE. SAY.I.LOVE.YOU.TO.DOGERT.");
break; case 0.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_LICENSE_END
break; case 1013001:cc(sprite[3],"IM.SO.SORRY.BUT.THE.LOVE.IS.NOT.MUTUAL.");
break; case 1013002:cc(sprite[3],"CONGRATULATIONS. YOU.NOW.HAVE.DOGERTS.DRIVERS.LICENSE. YOURE.WELCOME. DONT.SEND.THANK.YOU.LETTERS.PLEASE.");
break; case 1013003:ccS("Are you really authorized to give out drivers licenses? ", " I won't send you any thank you letters, don't worry Dogert.");
break; case 1013004:cc2(sprite_cappy,"  I don't think he's authorized. ", " He'll be really mad if you don't send him a thank you letter. Trust me.");
break; case 1013005:cc(sprite[3],"ONE.TIME.I.ACCIDENTALLY.LOCKED.MYSELF.IN.MY.SHOWER.FOR.3.MONTHS.");
break; case 1013006:cc(sprite[0],"Are you guys done yet?");
break; case 1013007:cc(sprite[4],"We ate ice cream and visited a strip club.");
break; case 1013008:cc(sprite[1],"It was EPIC!");
break; case 1013009:cc(sprite[5],"Why were there so many naked people at that restaurant?");
break; case 1013010:cc(sprite[3],"NOW.FOR.A.LAST.CHALLENGE. YOU.HAVE.TO.RACE.AGAINST.ME.");
break; case 1013011:cc(shelf,"weren't we done? | Dogert's word is my law.");
break; case 1013012: 		ts_end(CUT_RACE_DOGERTWATER);
// CUT_RACE_DOGERTWATER
break; case 1013050:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_RACE_DOGERTWATER_AFTER
break; case 1013051:cc(sprite[3],"THAT.WAS.FUN.RIGHT.?");
break; case 1013052:cc(sprite[3],"IM.SO.GREAT.AT.THIS.");
break; case 1013053:    	ts_end(CUT_FREEROAM_FLOATIES);
// CUT_FREEROAM_FLOATIES
break; case 1013500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[5],"By the way, I found black-and-red floaties right by the water. Now we can conquer the ocean. Shall we?");
break; case 0.75:bet_pers(sprite[2],"Uuuuh YASSS");
break; case 1.00:bet_pers(sprite[5],"Shelf, you go first!");
break; case 1.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_MAGNETDROWN
break; case 1014000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[5],"I've never been on the ocean before! It's so wavy!");
break; case 0.75:bet_pers(sprite[1],"How far will these floaties have air in them?");
break; case 1.25:bet_pers(sprite[5],"FAR ENOUGH!! Stop worrying!");
break; case 1.50:bet_pers(sprite[1],"I was just asking.");
break; case 1.75:bet_pers(sprite[0],"We are ocean kings!! Hahaha!");
break; case 2.00:bet_pers(sprite[1],"Let's show the fish who are actually in charge here.");
//TIME: 1
break; case 3.25:bet_pers(sprite[4],"Uhhh. Where are we?");
break; case 3.50:bet_pers(sprite[0],"I don't know. We better stay behind Shelf, he knows the seas like his own back pocket.");
break; case 4.00:bet_pers(sprite[1],"No freakin clue. The sea, I suppose?");
break; case 4.25:bet_pers(sprite[0],"I think we're... gone!!");
break; case 4.50:bet_pers(sprite[1],"For ever!!!");
break; case 4.75:bet_pers(sprite[4],"I thought we were gonna conquer the ocean! But the ocean conquered us!");
break; case 5.25:bet_pers(sprite[4],"Please chill out! Let's just go in all directions and then stick with the one that works.");
break; case 5.75:bet_pers(sprite[1],"Moronic idea.");
break; case 6.00:bet_pers(sprite[2],"Do you guys think I should start doing standup? I think I should.");
//TIME: 2
break; case 8.25:bet_pers(sprite[4],"Do you see that sharp blue thing over there?");
break; case 8.75:bet_pers(sprite[1],"You mean the see?");
break; case 9.00:bet_pers(sprite[4],"No the other thing!");
break; case 9.25:bet_pers(sprite[1],"It looks like a train.");
break; case 9.50:bet_pers(sprite[0],"What. Weird.");
break; case 9.75:bet_pers(sprite[4],"Uh, guys...");
break; case 10.00:bet_pers(sprite[4],"That is a train, but do you see what's around the train?");
break; case 10.50:bet_pers(sprite[1],"That's the sea.");
break; case 10.75:bet_pers(sprite[4],"I still don't mean the sea.");
break; case 11.00:bet_pers(sprite[0],"I don't like where this is going");
break; case 11.25:bet_pers(sprite[1],"I hope it isn't what I think it is.");
break; case 11.50:bet_pers(sprite[4],"If you think it's millions of thousands of frogs it is what you think!! Everybody, panic!!!");
break; case 12:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_MAGNETDROWN_SEAL
break; case 1014051:cc(sprite_magnetdrown_seal," Hey panda! I've read your book and it sucks!");
break; case 1014052:cc(sprite[2],"Hey! Why do you say that?");
break; case 1014053:cc(sprite_magnetdrown_seal," Transparent and one-dimensional characters. After one page I could predict the coming 10 pages.");
break; case 1014054:cc(sprite_magnetdrown_seal," Your sexism shines through in all dialogues, and your attempts at seeming like a person with modern opinions on gender are pathetic.");
break; case 1014055:cc(sprite_magnetdrown_seal," Chapter 3 was especially bad. I didn't feel a single feeling reading it. Not one!");
break; case 1014056:cc(sprite[2],"Wait... How could you read my book when I haven't published it anywhere yet?");
break; case 1014057:cc(sprite_magnetdrown_seal," Sat next to you in the cafe and quickly plugged your harddrive into my computer and moved all the files to me");
break; case 1014058:cc(sprite[2],"Oh that explains everything. Because, I can't remember I pubbed it!");
break; case 1014059:cc(sprite_magnetdrown_seal," ?");
break; case 1014060:cc(sprite[2],"Published.");
break; case 1014061:cc(sprite_magnetdrown_seal," God, you're annoying.");
break; case 1014062:cc(sprite[5],"Hey! Your standup \"jokes\" aren't that good either, Seal!!");
break; case 1014063:cc(sprite_magnetdrown_seal," What, how... How do you know I do standup?");
break; case 1014064:cc(sprite[5],"Sat behind you and Daddy at the cafe and mailed all your files to my computer when you peed");
break; case 1014065:cc(sprite_magnetdrown_seal," Well, that explains everything...");
break; case 1014066:cc(sprite[5],"Also, why don't you lock your computer when you go to the toilet?? Are you insane??");
break; case 1014067:cc(sprite_magnetdrown_seal," I trust people!!");
break; case 1014068:cc(sprite[5],"How can you do that?! Don't you know I exist?");
break; case 1014069:cc(sprite[1],"This is a really mean-spirited conversation. Let's leave.");
break; case 1014070: 	ts_end_from_talk(last_cut_before_talk);
// CUT_CUTSCENE_MAGNETDROWN
break; case 1014101:cc(sprite[1],"A train... in a lake far away from any train tracks? How... the fuck?");
break; case 1014102:cc(sprite[7],"I have no idea! Right now I'm more interested in how to get it UP from here than how it got DOWN here!");
break; case 1014103:cc(sprite[7],"Oh god I'm so stressed. Does anyone have a Nintendo DS with NINTENDOGS on so I can calm myself down?");
break; case 1014104:cc(sprite[5],"Stop being silly! Fucking cat!!");
break; case 1014105:cc(sprite[7],"No but I'm seriously so stressed! You know how I'm always so enthusiastic about everything? Right now I'm not, because my train drowned!");
break; case 1014106:cc(sprite[2],"Some people actually claim that enthusiasm and nervousness are the same things but on different ends of the spectrum.");
break; case 1014107:cc(sprite[0],"Then it's still two different things, idiot?");
break; case 1014108:cc(sprite[7],"I have no idea what you're talking about. Can someone just help me drag my train up from the water? I'm so evil! No I mean stressed!");
break; case 1014109:cc(sprite[2],"I think I speak for everyone here when I ask: Why is there a train in the water?");
break; case 1014110:cc(sprite[7],"Trains are more environmental-friendly than cars. That's why.");
break; case 1014111:cc(sprite[0],"... Boats? Heard about 'em?");
break; case 1014112:cc(sprite[2],"Dogert says car pollution is good for nature and that the heat removes the need for jackets!");
break; case 1014113:cc(sprite[2],"Wait, that was in a dream. But still!");
break; case 1014114:cc(sprite[7],"Enough with the bullshit! Will you help a friend or not??");
break; case 1014115:cc(sprite[2],"...Okay... I'll lend you a hand. ");
break; case 1014116:cc(sprite[4],"I'm always up for helping a fellow friend. Here, grab my hand!");
break; case 1014117:cc(sprite[5],"i hate my grandpa so fucking much");
break; case 1014118:cc(sprite[7],"I hope your hands can drag up a whole train, because otherwise you'll need tools.");
break; case 1014119:cc(sprite[2],"TOOLS OF STEEL! Haha.");
break; case 1014120:cc(sprite[4],"Me and Daddy will help you, be so sure about that!");
break; case 1014121:    	ts_end(CUT_FREEROAM_GOINGHOME);
// CUT_FREEROAM_GOINGHOME
break; case 1014500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[2],"This doesn't look good, where the hell is the door?? And the wheels are completely gone! How did you think you were gonna solve this??");
break; case 0.75:bet_pers(sprite[2],"Like, how do you THINK? Think about the CHILDREN? This is RIDICULOUS! You're a grown-up! How are you gonna explain this?");
break; case 1.25:bet_pers(sprite[7],"It has no wheels because it's a maglev train.");
break; case 1.75:bet_pers(sprite[4],"Excuse me but what do you mean? How can it drive if it has no wheels? Wheels = drive.");
break; case 2.25:bet_pers(sprite[7],"It's just another kind of technology for driving. It levitates through magnetism.");
break; case 2.75:bet_pers(sprite[2],"Like, excuse be but I understand nothing. I agree with the badger, wheels = drive!");
break; case 3.25:bet_pers(sprite[2],"So, no wheels, HOW WERE YOU THINKING? Didn't you THINK ABOUT THE CHILDREN? How do you think they feel about this?");
break; case 3.75:bet_pers(sprite[7],"?");
break; case 4.00:bet_pers(sprite[2],"Okay let's look at the inside of this piece of trash.");
break; case 4.50:bet_pers(sprite[7],"Psst... I don't need help with that.");
break; case 4.75:bet_pers(sprite[2],"Uh. Okay I'll look at the lamps instead. Maybe those are the core of the problem.");
break; case 5.25:bet_pers(sprite[7],"Psst... I mean... I need help... with something completely different...");
break; case 5.75:bet_pers(sprite[2],"...");
break; case 6.00:bet_pers(sprite[2],"I'm all ears.");
break; case 6.25:bet_pers(sprite[4],"I'm all Irish badger ears.");
break; case 6.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_GOINGHOME_DOGERT
break; case 1014501:cc(sprite[3],"HEY.GUYS. I.DREAMT.A.DREAM.AGAIN.AND.IT.WAS.AWFUL.");
break; case 1014502:cc(sprite[3],"A.DARK.MAN.STOOD.BY.MY.BED.AND.LOOKED.DARK.AND.MYSTERIOUS.");
break; case 1014503:cc(sprite[3],"I.GOT.A.REALLY.BAD.FEELING.FROM.IT.");
break; case 1014504:cc(sprite[3],"WHAT.DOES.THE.DREAM.MEAN. PLEASE.TELL.ME.BECAUSE.IM.SCARED.");
break; case 1014505:cc(shelf,"Are you sure it was a dream?");
break; case 1014506:cc(sprite[3],"NO.BECAUSE.I.WAS.WIDE.AWAKE.");
break; case 1014507:cc(shelf,"And how did the dark man look?");
break; case 1014508:cc(sprite[3],"IT.WAS.A.WOMAN. IT.WAS.RED.");
break; case 1014509:cc(shelf,"... Not dark?");
break; case 1014510:cc(sprite[3],"NO.JUST.THE.USUAL.RED.COLOR.");
break; case 1014511:cc(sprite[3],"IT.SAID.I.WONT.BE.ABLE.TO.FIX.CARS.ANYMORE.");
break; case 1014512:cc(shelf,"We all have nightmares sometimes. Just relax and try to get some good sleep tonight.");
break; case 1014513:cc(sprite[3],"I.THINK.IT.WAS.A.SIGN.OF.SOMETHING.");
break; case 1014514: 	ts_end(CUT_FREEROAM_CARCLUBFIRE);
// CUT_FREEROAM_CARCLUBFIRE
break; case 1014600:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[5],"Can we go to that red thing?");
break; case 0.50:bet_pers(sprite[0],"Okay why not. Do you like red things?");
break; case 0.75:bet_pers(sprite[5],"I don't know. Can I just want to go to that red thing without having to answer a thousand follow-up questions?");
break; case 1.25:bet_pers(sprite[0],"Looks like fire");
break; case 1.50:bet_pers(sprite[5],"Hmm, the red fire thing is very close to our area.");
break; case 2.00:bet_pers(sprite[1],"It's very close to the car club! I hope no one of our neighbors have been hurt.");
break; case 2.50:bet_pers(sprite[1],"Hmmm. It's maybe _too_ close to the car club...");
break; case 3.00:bet_pers(sprite[0],"The area around our car club is an important area for local businesses so I hope no neighbouring houses to us have been burned down.");
break; case 3.50:bet_pers(sprite[5],"I love fire!");
break; case 3.75:bet_pers(sprite[1],"Guys... I think they've targeted a very specific house... A VERY specific house.");
break; case 4.25:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_CARCLUBFIRE
break; case 1014601:cc(sprite[0],"Daddy?? What are you doing??!");
break; case 1014602:cc(sprite[1],"Stop this immediately Daddy. You're burning down our house.");
break; case 1014603:cc(sprite[2],"I'M DOING MY DUTY.");
break; case 1014604:cc(sprite[0],"Why is this your duty?");
break; case 1014605:cc(sprite[2],"I'M DOING MY DUTY.");
break; case 1014606:cc(sprite[1],"Well, anyway... Now it's time for club meeting, so...");
break; case 1014607:cc(sprite[0],"A bit awkward, but... still.");
// CUT_CUTSCENE_MEETING_4
break; case 1014701:cc(sprite[1],"This will be a special meeting. Clearly the capitalists have found our communistic car club and want to destr-");
break; case 1014702:cc(sprite[0],"I get it now");
break; case 1014703:cc(sprite[3],"JUST.SO.YOU.KNOW.IM.ALLERGIC.TO.FIRE. BUT.I.THINK.I.MAY.SURVIVE.THE.MEETING.");
break; case 1014704:cc(sprite[0],"You see the magnets?");
break; case 1014705:cc(sprite[0],"The cease and desist letter threatening to shut our club down. Car lanes slowly disappearing. The constant push for maglev trains?");
break; case 1014706:cc(sprite[1],"Yeah, magnet trains will certainly take over. It's only a matter of time.");
break; case 1014707:cc(sprite[0],"Sigh... She tricked you too...");
break; case 1014708:cc(sprite[1],"Who?");
break; case 1014709:cc(sprite[0],"The cat! She wants our club to die because we're the kings of cars and that's a threat to her train plans!");
break; case 1014710:cc(sprite[1],"Hmm, that sounds reasonable, yes..");
break; case 1014711:cc(sprite[5],"So what do we do??");
break; case 1014712:cc(sprite[0],"I have a plan.");
break; case 1014713:cc(sprite[0],"Let's prank call the magnet cat bitch.");
break; case 1014714:cc(sprite[0],"Calling her now");
			sound_ring.play();
break; case 1014715:cc(sprite[0],"Hey, is this the magnet bitch?");
break; case 1014716:cc(sprite[7],"Uh, this is Mrs Superconductor. I don't know who the person you talk about is.");
break; case 1014717:cc(sprite[0],"Guys!! It's her!!");
break; case 1014718:cc(sprite[0],"Um, ignore what I just said, I was just thinking, do you like magnets?");
break; case 1014719:cc(sprite[7],"Yes yes yes I do do you wanna talk about it? Let's talk about it!");
break; case 1014720:cc(sprite[0],"I have one hundred thousand million magnets to sell. Wanna buy?");
break; case 1014721:cc(sprite[7],"Oh yes!! I want!! But it depends on the price.");
break; case 1014722:cc(sprite[7],"Actually, I'll buy it no matter the price because I love magnets. SOLD! To the beautiful cat lady in the back! Haha, just kidding.");
break; case 1014723:cc(sprite[0],"So what address should i deliver the magnets to?");
break; case 1014724:cc(sprite[7],"Hmmm... I'm not sure if I should leave my address to strangers. I'm a nuclear threat target.");
break; case 1014725:cc(sprite[0],"But I am... Pepper? Epper?");
break; case 1014726:cc(sprite[7],"Hi 'Epper. Why didn't you say that at the start? You can send it to Magnetfactory 15!! Just deliver it to the factory gate!");
break; case 1014727:cc(sprite[7],"I can't believe that I will get more magnets soon!! Yes yes yes yes!! ^^");
break; case 1014728:cc(sprite[7],"Wait, why would 'Epper sell something to me? We're friends?");
break; case 1014729:cc(sprite[0],"Bye bitch!");
break; case 1014730:cc(sprite[0],"So, what about destroying her factory?");
break; case 1014731:cc(sprite[1],"That is a given.");
break; case 1014732:cc(sprite[5],"Let's go!!! Let's kill people!");
break; case 1014733:cc(sprite[3],"IM.AGAINST.MURDER.JUST.SO.YOU.KNOW.");
break; case 1014734:cc(sprite[0],"Yeah I didn't mean we should kill anyone");
break; case 1014735:    		room.visible = false;
			for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
			player.position.y = height_get(player);
			for (let t = 0; t < 9; t++) { for (let u = 0; u < 4; u++) { sprite_fire[t][u].visible = false; } }
			ts_end(CUT_FREEROAM_KILLEPPER);
// CUT_FREEROAM_KILLEPPER
break; case 1016000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"First we're gonna drop a bomb on 'Epper.");
break; case 0.50:bet_pers(shelf,"What??");
break; case 0.75:bet_pers(sprite[0],"We're not gonna kill him. Just steal his clothes.");
break; case 1.25:bet_pers(sprite[0],"aaaaand... off we go!");
//TIME: 2
break; case 3.25:bet_pers(shelf,"Is that Hårass over there?");
break; case 3.50:bet_pers(sprite[0],"Oh perfect, then we can test the atomic bomb here!");
break; case 4.00:bet_pers(shelf,"Atomic bomb??");
break; case 4.25:bet_pers(sprite[0],"Yes I make my own atomic bombs out of steroids. Questions?");
break; case 4.75:bet_pers(shelf,"No.");
break; case 5.00:bet_pers(sprite[0],"I'm all out of bombs AND steroids AND also forgot the recipe for steroids though. You remember it?");
break; case 5.50:bet_pers(shelf,"Hmm, no?");
break; case 5.75:bet_pers(sprite[0],"Kin---da need it now. Like now now now now now");
break; case 6.25:bet_pers(shelf,"...");
break; case 6.50:bet_pers(shelf,"Sand and raisins");
break; case 6.75:bet_pers(sprite[0],"It's that simple? My recipe was way more complicated.");
break; case 7.25:bet_pers(shelf,"Well, there you go.");
break; case 7.50:bet_pers(sprite[0],"I think I use to sprinkle some apple wedges on the top too.");
break; case 8.00:bet_pers(shelf,"Do as you please, I'm no cop.");
//TIME: 1
break; case 9.00:bet_pers(sprite[0],"Bombs are done. Let's create mayhem!");
break; case 9.25:bet_pers(sprite[0],"quick, get down into his house we'll go in and steal his clothes!");
break; case 9.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_5
break; case 1019200:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Let's call Dark Gandalf!!");
break; case 0.50:bet_pers(sprite[0],"RING RING (ljudeffekt!!)");
break; case 0.75:bet_pers(sprite[1],"Viva la revoluzione, it's Dark Gandalf?");
break; case 1.00:bet_pers(shelf,"We bombed 'Epper with a steroid bomb");
break; case 1.25:bet_pers(sprite[1],"Steroid?! Bomb?!");
break; case 1.50:bet_pers(shelf,"Yeah or it was a nuclear bomb made of steroids");
break; case 2.00:bet_pers(sprite[1],"Nuclear bomb?! What the fuck?!");
break; case 2.25:bet_pers(sprite[1],"Hello Adele, by the way.");
break; case 2.50:bet_pers(sprite[0],"Hey Darkie!");
break; case 2.75:bet_pers(sprite[1],"I have one question about your... steroids. Do they... They only work on arms, right?");
break; case 3.25:bet_pers(sprite[0],"No they work on all bodyparts! Just inject it and they'll get bigger!");
break; case 3.75:bet_pers(sprite[1],"Hmm, okay. Yeah, I was just wondering.");
break; case 4.00:bet_pers(sprite[1],"I can't really talk more, I get sore from holding my phone for too long.");
break; case 4.50:bet_pers(sprite[0],"Uh ok... Bye!");
break; case 4.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_SVINERI_1
break; case 1019301:ccS("Hey guys, I'm 'Epper now. ", " whaddup whaddup i'm 'epper the shark");
break; case 1019302:cc(sprite[1],"Let's go! The perfect disguise!");
break; case 1019303:cc(sprite[8],"So, now we break into the cute magnet cat's factory and destroy it?");
break; case 1019304:cc(sprite[0],"Remove \"cute\" and you're totally right!! What, do you like her?");
break; case 1019305:cc(sprite[8],"No more time for talking! Let's drive towards the factory!");
break; case 1019306:ccS("When I'm 'Epper, I feel free ", " The 'Epper suit is pretty uncomfortable. So tight!");
break; case 1019307:cc2(sprite[8],"I wish I could be 'Epper too! ", " Damn, 'Epper is ripped!");
break; case 1019308:cc2(sprite[0],"Aren't we all 'Epper, in a way? ", " I saw 'Epper at the gym one time. What a beast!");
break; case 1019309:cc2(sprite[1],"Yes, deep inside. ", " Or... It's Shelf who is fat?");
break; case 1019310:cc2(sprite[8],"We are 'Epper. 'Epper is us. ", " Why do you always have to turn to body shaming, Darkie?");
break; case 1019311: 	ts_end(CUT_FREEROAM_SVINERI_1);
// CUT_FREEROAM_SVINERI_1
break; case 1019300:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_AUCTION
break; case 1019500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[5],"WHAT IS THIS? THIS LOOKS AWESOME.");
break; case 0.50:bet_pers(sprite[5],"Hey store owner whore, I'm 'Epper's friend and I can do what I want!");
break; case 1.00:bet_pers(sprite[8],"A bit extreme, huh?");
break; case 1.25:bet_pers(sprite[0],"No");
break; case 1.50:bet_pers(sprite[8],"Damn haha what a crash!! Okay I give up, that looks really fun.");
break; case 2.00:bet_pers(shelf,"Here's a quarter of a penny to ease things for you.");
break; case 2.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_SVINERI_2
break; case 1019700:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[0],"Hey, there's a gas station over there!");
break; case 0.50:bet_pers(sprite[8],"Perfect, I need to buy some golonka!");
break; case 0.75:bet_pers(sprite[5],"And I want weird car stuff");
break; case 1.00:bet_pers(sprite[0],"I want energy drink");
break; case 1.25:bet_pers(sprite[4],"I want the latest CD by the new swingjazz group, The Swine Pigs.");
break; case 1.75:bet_pers(sprite[1],"And I, Darchadaid Marbdah, want this goddamn country to start making sense!");
break; case 2.25:bet_pers(shelf,"I want a monthly subscription on cat sand | i agree with the Dark Gandalf");
break; case 2.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_GASSTATION
break; case 1019901:cc(sprite_magnet1," Hello and welcome to my lovely gas station!");
break; case 1019902:cc(sprite_magnet1," Isn't the weather just AMAZING today? Man, it just makes me want to SMILE!");
break; case 1019903:cc(sprite[1],"Six porno magazines, please! For the price of five!");
break; case 1019904:cc(sprite_magnet1,"  Uhm... We don't have any special offer for porno magazines today, sir.");
break; case 1019905:cc(sprite[1],"Uh... But, I have?! Don't you see I'm friends with 'Epper??");
break; case 1019906:cc(sprite[5],"Give me a blank sheet of paper, bitch!! For free!");
break; case 1019907:cc(sprite[8],"Calm down guys, we can't just demand things for free. We have to keep a good connection to the car gas dealers!");
break; case 1019908:cc(sprite[0],"Boring! So we can't steal?");
break; case 1019909:ccS("Yeah so boring... Stealing has always been my passion! Do you deny me my passion? ", " Gas dealers suck, and I wanna steal some toilet paper");
break; case 1019910:cc(sprite[0],"Can I at least punch the store owner?");
break; case 1019911:cc(sprite[8],"No. Let's be a bit mature now.");
break; case 1019912:cc(sprite[1],"Let's just ask the store owner nicely if we can tank our cars, buy some christmas tree shaped air fresheners and buy the latest CD by Blake Shelton.");
break; case 1019913:cc(sprite_magnet1," You want the Gas, Tree and Blake combo? That will be 70 dollars just for today!");
break; case 1019914:cc(sprite[1],"2-digit money? Are you joking with me?");
break; case 1019915:cc(sprite[5],"Hey, cashier!! Give me your best bottle of warm water. NOW!!");
break; case 1019916:ccS("I have an idea. Let's steal it and run away. ", " i also want water, give me now");
break; case 1019917:cc(sprite[5],"Give me everything you've got, bitch! And don't question me, because I'm friends with 'Epper!");
break; case 1019918:ccS("Yeah and I _am_ 'Epper. ", " im 'epper im 'epper");
break; case 1019919:cc(sprite_magnet1," Hey white thing, you know seniors get discount, right? I mean, if the price is a problem for you.");
break; case 1019920:cc(sprite[5],"What do you mean?");
break; case 1019921:cc(sprite[0],"I got the Blake Shelton CD while you all were talking! Now, RUN!");
break; case 1019922:    		room.visible = false;
			for (let t = 0; t < NUMBER_OF_CARS; t++) { if (cz_turned_on[t] === 1) { cz[t].position.y = height_get(cz[t]); } }
			player.position.y = height_get(player);
			ts_end(CUT_FREEROAM_SVINERI_3);
// CUT_FREEROAM_SVINERI_3
break; case 1019800:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_HARASSFAN
break; case 1019801:cc(sprite_harassfan_seal," hey!! Big Castle!");
break; case 1019802:cc(sprite[5],"oh shit...");
break; case 1019803:cc(sprite[1],"big castle?");
break; case 1019804:cc(sprite_harassfan_seal," hey you fucker!");
break; case 1019805:cc(sprite[0],"yes? I'm a fucker. I fuck tons.");
break; case 1019806:cc(sprite_harassfan_seal," not you! Big Castle!");
break; case 1019807:cc(sprite[5],"hey, what do you want, bitch?");
break; case 1019808:cc(sprite_harassfan_seal," you ruined HARPA!");
break; case 1019809:cc(sprite[2],"big castle? HARPA?");
break; case 1019810:cc(sprite[5],"okay, i can explain everything.");
break; case 1019811:cc(sprite_harassfan_seal," do it quick because I'm right in the middle of an insult here!");
break; case 1019812:cc(sprite[5],"You know HARPA? Hyper Attrictive Raving Pop Artists? Yeah, I was a part of that!!");
break; case 1019813:cc(sprite[0],"the pop group?!");
break; case 1019814:cc(sprite[5],"yes!! they thought i fit into the \"bad boy\" role, like, they wanted an ACTUAL lawbreaker who was bad at singing.");
break; case 1019815:cc(sprite[5],"I got the artist name \"Big Castle\", to fit into the group's tagline: HARPA - the new boy band empire.");
break; case 1019816:cc(sprite[5],"and, now i'm not in the group anymore, so i guess you can figure out what happened!!");
break; case 1019817:cc(sprite[0],"you shook hands with the staff and left the group, and then there were no more problems! :D");
break; case 1019818:cc(sprite[5],"Exactly. A problemless breakup!!");
break; case 1019819:cc(sprite[0],"that's awesome!");
break; case 1019820:cc(sprite[1],"i'm sensing irony.");
break; case 1019821:    	ts_end(CUT_FREEROAM_HARASSFAN);
// CUT_FREEROAM_HARASSFAN
break; case 1019900:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite_harassfan_seal," hey, Big Castle!! Learned to dance yet?");
//TIME: 0.25
break; case 0.50:bet_pers(sprite[5],"maybe i have!! But i won't show you!!");
//TIME: 0.25
break; case 0.75:bet_pers(sprite_harassfan_seal," just like when i saw you perform live!");
//TIME: 0.25
break; case 1.00:bet_pers(sprite[5],"shut up!!");
//TIME: 0.25
break; case 1.25:bet_pers(sprite_harassfan_seal," you ruined HARPA!");
//TIME: 0.25
break; case 1.50:bet_pers(sprite[5],"yes, by leaving!!");
//TIME: 0.25
break; case 1.75:bet_pers(sprite_harassfan_seal," everyone in HARPA can dance. And sing. And perform. And they all look hot. Except one! I wonder who that is?!");
//TIME: 0.25
break; case 2.25:bet_pers(sprite[5],"i guess you mean me, but that's not true!! Most of the other ones practiced for years and has great teachers, I was just scouted for my bad manner and had to debut two weeks after my scouting!");
//TIME: 0.25
break; case 2.75:bet_pers(sprite_harassfan_seal," Mark was in the same situation, but he still nailed it!");
//TIME: 0.25
break; case 3.25:bet_pers(sprite[5],"Mark has a golden throat and the moves of a hyperactive snake! Of course he's amazing!");
//TIME: 0.25
break; case 3.75:bet_pers(sprite_harassfan_seal," i always turn off your songs when you start singing! You can't even hit a note with autotune!");
//TIME: 0.25
break; case 4.25:bet_pers(sprite[5],"i can but they edited my voice to fit my bad boy image: bad boy, bad dancing, bad singing!");
//TIME: 0.25
break; case 4.75:bet_pers(sprite_harassfan_seal," that's so stupid! Sounds like a decision you would make!");
//TIME: 0.25
break; case 5.25:bet_pers(sprite[5],"no!!");
//TIME: 0.25
break; case 5.50:bet_pers(sprite_harassfan_seal," and also, how come you've never had an AMA on reddit yet? Both Mark and Sonic, and your manager and your CEO have! And your dance choreographer too, and she's not even interesting!!");
//TIME: 0.25
break; case 6.00:bet_pers(sprite[5],"fuck you!! Just go away if you hate me so much!");
//TIME: 0.25
break; case 6.50:bet_pers(sprite_harassfan_seal," Only if you learn to dance like Mark!");
//TIME: 0.25
break; case 6.75:bet_pers(sprite[5],"NEVER! or maybe");
break; case 7.00:bet_pers(sprite[0],"Time for meeting!");
break; case 7.25: 	ts_end(CUT_FREEROAM_GASSTATION);
break; case 7.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_GASSTATION
break; case 1020000:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MEETING_6
break; case 1029201:cc(sprite[4],"If we're serious for a moment. Don't we have a masterplan to follow through?");
break; case 1029202:ccS("Yeah, what's our next plan? ", " No?");
break; case 1029203:cc2(sprite[5],"Streak in front of the town hall, right? ", " I remember now. We were supposed to do something courageous, we were gonna... Darn, I forgot it again.");
break; case 1029204:cc2(sprite[4],"I mean the REAL plan. The one we were going to do before we started to just be a pain in the ass for society! ", " Come on, guys! The plan!");
break; case 1029205:cc2(sprite[0],"Throw eggs at Hårass' moms house?", " I have a plan! Let's throw eggs at Hårass' moms house!");
break; case 1029206:cc(sprite[4],"We were supposed to break into the magnet cat's factory! And destroy it! Don't you remember?");
break; case 1029207:cc(sprite[1],"Oh I had completely forgot that. The evil cat, that's right.");
break; case 1029208:cc(sprite[1],"You easily forget problems when life is this joyful. Being an asshole is pure happiness for me.");
break; case 1029209: 		ts_end(CUT_RACE_SPEED);
// CUT_RACE_SPEED
break; case 1029250:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[5],"i found a racing track in a blue valley. i'm the king");
break; case 0.75:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_FREEROAM_RACE_SPEED_AFTER
break; case 1029300:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MAGNETFACTORY
break; case 1029501:cc(sprite[8],"This is a maze.");
break; case 1029502:cc(sprite[4],"A maze. Ing.");
break; case 1029503:cc(sprite[1],"For this challenge, I need someone who has good sight, and who is sharp when it comes to puzzles.");
break; case 1029504:cc(sprite[0],"Are you a TV show leader now?");
break; case 1029505:cc(sprite[1],"Skynda skynda!");
break; case 1029506:ccS("I can do it! Haha, you sound like the Swedish TV host Gunde Svan, what a weird uncanny thing that was. ", " Skynda skynda!");
break; case 1029507:    	ts_end(CUT_FREEROAM_MAGNETFACTORY);
// CUT_FREEROAM_MAGNETFACTORY
break; case 1029900:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MAGNETFACTORY_2
break; case 1030201:cc(sprite[0],"Now we need someone who isn't afraid of heights...");
break; case 1030202:cc(shelf,"That would be me again!");
break; case 1030203:cc(sprite[4],"Meh, I also wanna");
break; case 1030204:ccS("I'm gonna do it because I have main character vibes. ", " Shut up, badger from Ireland.");
break; case 1030205:    	ts_end(CUT_FREEROAM_MAGNETFACTORY_2);
// CUT_FREEROAM_MAGNETFACTORY_2
break; case 1030500:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
break; case 0.25:bet_pers(sprite[1],"Dogert?!");
break; case 0.50:bet_pers(sprite[3],"YES.ITS.ME. TASTE.MY.BULLETS.");
break; case 0.75:bet_pers(sprite[1],"What are you doing, Dogert?!");
break; case 1.00:bet_pers(sprite[0],"what are YOU doing standing still, Darkie? He's going to kill us!");
break; case 1.50:bet_pers(sprite[3],"YOURE.NOT.ALLOWED.HERE. TRESPASSING.IS.FORBIDDEN.");
break; case 2.00:bet_pers(sprite[1],"I really thought I could trust Dogert");
break; case 2.25:bet_pers(sprite[0],"You serious?");
break; case 2.50:bet_pers(shelf,"stop talking and start killing");
break; case 2.75:bet_pers(sprite[0],"We can't kill Dogert?!");
break; case 3.00:bet_pers(shelf,"but then we'll get killed instead!!");
break; case 3.25:bet_pers(sprite[1],"What should we do?");
break; case 3.5:dialog = ""; dialog2 = ""; dialog3 = "";
}
// CUT_CUTSCENE_MAGNETFACTORY_3
break; case 1030501:cc(sprite[7],"Hey! What's the password?");
break; case 1030502:ccS("hey, i'm 'epper, let me in! ", " 1234. im 'epper im 'epper");
break; case 1030503:cc2(sprite[7],"'epper, you're not supposed to come now! ", " Wrong. That's the password to your phone, 'Epper.");
break; case 1030504:ccS("okay... anyways im here now ", " 'epper 'epper");
break; case 1030505:cc(sprite[7],"you know you're only allowed here on mondays and wednesdays, right?");
break; case 1030506:ccS("yes, of course. because of the scheduling! ", " of that i know. that is knowledge that i have.");
break; case 1030507:cc2(sprite[7],"because of what you do. all the weird things ", " good. so come back on monday.");
break; case 1030508:ccS("oh of course. ", " just let me in, cat. let me in let me in");
break; case 1030509:cc2(sprite[5],"HåRASS!!! ", " LET US IN FOR CRAP'S SAKE!!!");
break; case 1030510:cc(sprite[7],"that's not the password, sorry.");
break; case 1030511:ccS("guess we'll have to figure it out ourselves. ", " Hårass, have some elegance.");
break; case 1030512: 	ts_end(CUT_FREEROAM_MAGNETFACTORY_3);
// CUT_FREEROAM_MAGNETFACTORY_3
break; case 1030600:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MAGNETFACTORY_4
break; case 1030601:cc(sprite[7],"how did you get through? you're not supposed to get past that door without the password!");
break; case 1030602:cc(sprite[5],"WE WON'T TELL YOU BITCH!!");
break; case 1030603:ccS("take it easy ", " EXACTLY!! LISTEN TO HARASS!!");
break; case 1030604:cc(sprite[7],"wait... why do you sound so weird today, 'Epper?");
break; case 1030605:ccS("im epper im epper ", " eh eh eh come up with something quick!!");
break; case 1030606:cc2(sprite[5],"HE REALLY IS 'EPPER! WEIRD, RIGHT?! ", " SHUT UP YOU FUCKING CAT!!!");
break; case 1030607:ccS("very believable ", " no not like that");
break; case 1030608:cc(sprite[7],"you shout so loud, very unlike 'Epper...");
break; case 1030609:cc(sprite[7],"if you really are 'Epper... you should be able to solve this puzzle. i know you like puzzles, you little shark!");
break; case 1030610:cc(sprite[2],"While you guys were talking now, I created the social media site \"Tiktok\".");
break; case 1030611: 	ts_end(CUT_FREEROAM_MAGNETFACTORY_4);
// CUT_FREEROAM_MAGNETFACTORY_4
break; case 1030700:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_SPACEBAR
break; case 1031001:cc(sprite_spacebar_tiger," Welcome to the Space Bar, right inbetween that one place you sometimes go to and that place you never go to and don't really know what it is. What would you like to order, friendth?");
break; case 1031002:cc(sprite[7],"Some Space Juice, please! And hurry up, I'm pretty busy and cool.");
break; case 1031003:cc(sprite_spacebar_tiger," It's the cat with the hat! Purr purr, got any CLAWS for us?");
break; case 1031004:cc(sprite[7],"yeah it's me, cut the nonsense");
break; case 1031005:cc(sprite_spacebar_tiger," Been tough with the wife lately, huh?");
break; case 1031006:cc(sprite[7],"she literally NEVER shuts up!");
break; case 1031007:cc(sprite_spacebar_tiger," But you have the bar!");
break; case 1031008:cc(sprite[7],"i have the space bar.");
break; case 1031009:cc(sprite[7],"So, this is how it is. *drops her glass on the floor*");
break; case 1031010:cc(sprite_spacebar_tiger," Yes? Everything for you, Mrs Superconductor.");
	sound_glasshatter.play();
break; case 1031011:cc(sprite[7],"*whispers* I need a new particle element. A magnetic one. That I can replicate in eternity.");
break; case 1031012:cc(sprite_spacebar_tiger," *whispers* Hmm, I might have something for you. Follow me into this elevator.");
break; case 1031013:cc(sprite[7],"Sweet, I love elevators! ^^");
break; case 1031014:cc(sprite_spacebar_tiger," Elevators are not made of magnets.");
break; case 1031015:cc(sprite[7],"I hate them.");
break; case 1031016: 			ts_end(CUT_FREEROAM_SPACEBAR);
// CUT_FREEROAM_SPACEBAR
break; case 1031100:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_FREEROAM_QUIZ
break; case 1051100:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_QUIZ1
break; case 1051101:cc(sprite[7],"Meow. I have once been in a TV quiz show. What's it called?");
break; case 1051102: 	ccS3("WHOS.THAT.DOGERT.", "Attract That Magnet!", "What's With All That Meow Over There In The Kitchen?");
break; case 1051103: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ2
break; case 1051201:cc(sprite[7],"Purr purr. I have parents, but the situation is pretty weird. Just HOW weird is it?");
break; case 1051202: 	ccS3("Father refuses to talk to me, mom takes his party. Father is also a world champion bowling player.", "Mom lives with me, dad lives with her, but dad doesn�t live with me.", "Mom likes magnets, dad doesn�t dislike them but aren�t that interested either. Both own their own separate magnet train manufacturing company.");
break; case 1051203: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ3
break; case 1051301:cc(sprite[7],"*distant cat scream* Hey guys. Who is my biggest hero?");
break; case 1051302: 	ccS3("Adolf J. Hitleman", "Eric Laithwaite", "Donald J. Truman");
break; case 1051303: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ4
break; case 1051401:cc(sprite[7],"*sleeping* What�s my biggest fear?");
break; case 1051402: 	ccS3("Loneliness.", "Magnetlessness.", "That independent countries lost their independence.");
break; case 1051403: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ5
break; case 1051501:cc(sprite[7],"*eating a steak while sitting on a chair at a table like a human* What is my birthyear?");
break; case 1051502: 	ccS3("1986 - Year of the shoulder pads and high haircuts!", "1969 - Freedom, love and understanding!", "2003 - A year in the 2000");
break; case 1051503: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ6
break; case 1051601:cc(sprite[7],"mjiiieieeAOW!! I�m the inventor of not one, but a couple of (two), useful tools. Which ones?");
break; case 1051602: 	ccS3("The screwdriver and the hammer.", "The door and the vacuum cleaner.", "The russian winter hat and the juice package.");
break; case 1051603: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ7
break; case 1051701:cc(sprite[7],"I�m not always true with my intentions. What am I hiding?");
break; case 1051702: 	ccS3("I�m not THAT enthusiastic.", "I�m not THAT into magnets. But I still love them so so so so much.", "I�m a bonobo monkey in a cat suit.");
break; case 1051703: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ8
break; case 1051801:cc(sprite[7],"What will I do to you when you arrive at the fort?");
break; case 1051802: 	ccS3("Welcome you with a warm paw and give you some rest after the long journey.", "Just sit at my computer and unenthusiastically say \"hi\" in a low tone, to indicate that I don�t want to be bothered while I game.", "Challenge you to a fight to death about who gets to decide the world�s faith.");
break; case 1051803: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ9
break; case 1051901:cc(sprite[7],"I�m actually not totally new to your friend group. Who of you have I spent countless hours with before?");
break; case 1051902: 	ccS3("Adele", "Dark Gandalf", "Polish Cow");
break; case 1051903: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_QUIZ10
break; case 1052001:cc(sprite[7],"Miow miow! I�ve had a hard time finding friends throughout life, because of my�");
break; case 1052002:cc(sprite[7],"Well, I don�t know why, because I�m pretty cool! But anyways.");
break; case 1052003:cc(sprite[7],"Who played Ross in the TV show Friends?");
break; case 1052004: 	ccS3("David Schwimmer", "Olof Palmberg", "Ross Geller");
break; case 1052005: 	ts_end(CUT_FREEROAM_QUIZ);
// CUT_CUTSCENE_DORIME
break; case 1053001:cc(sprite_talk_27," Hello, animals in cars. We are the saviors of everything.");
break; case 1053002:cc(sprite_talk_27," We have sensed energy from another dimension.");
break; case 1053003:cc(sprite_talk_28," Yeah, they�re partying like crazy donkeys over there.");
break; case 1053004:cc(sprite_talk_27," I'm not talking about the Pitbull dimension. I�m talking about� The Beginning And End Of All� Dimension.");
break; case 1053005:cc(sprite[2],"That sound spooky!");
break; case 1053006:cc(sprite_talk_28," ");
//dorime dorime, b�vern stiger upp lite mot himlen igen.
break; case 1053007:cc(sprite_talk_27," The Beginning And End Of All Dimension is the origin of our universe. Of you, and me, and of all that have existed.");
break; case 1053008:cc(sprite_talk_28," Beavers were invented there, for example.");
break; case 1053009:cc(sprite_talk_27," Let me tell you about how all of this started. I mean, how this world started. How we all got here.");
break; case 1053010:cc(sprite[0],"Yes, story time!!");
break; case 1053011:cc(sprite_talk_27,"  I�ll take you back to a time before time, in a space before space.");
break; case 1053012:cc(sprite[0],"HOW is that possible?");
break; case 1053013:cc(sprite[2],"Ssh! Maybe he�ll explain if you�re quiet!");
break; case 1053014:cc(sprite_talk_27,"  Nah, I don�t really know how it�s possible. It sounds pretty impossible. But that�s how my script starts, so�");
break; case 1053015:cc(sprite_talk_27,"  At first, everything was black. And empty. Then came something, even if things didn�t exist yet. It was� the Universe constant.");
break; case 1053016:cc(sprite[1],"*GASP*");
break; case 1053017:cc(sprite_talk_27," Ljudet d�nade. F�rger som aldrig funnits f�rut uppenbarade sig.");
break; case 1053018:cc(sprite_tak_27," Men det totala kaoset sk�nkte en onekbar k�nsla av lugn och tillfredsst�llelse, och till slut lade sig ocks� allt skakande, d�nande och flimrande.");
break; case 1053019:cc(sprite_talk_27," Enter The Universe constant. It's just a number, but it�s also so much more than a number.");
break; case 1053020:cc(sprite_talk_27," It's the number that all terrain shapes, all personalities and all societal systems originate from.");
break; case 1053021:cc(sprite_talk_27," Some people claim that some kind of \"grelf curve\" has affected the world in a similar way as well.");
break; case 1053022:cc(sprite[1],"Life isn't a number's game, you capitalist.");
break; case 1053023:cc(sprite_talk_27," From the Universe constant, a bunch of other numbers were calculated.");
break; case 1053024:cc(sprite_talk_27," All the numbers got intertwined with each other to make a good mix for the world, and here�s where the good part starts -");
break; case 1053025:cc(sprite_talk_27," A council of 36 specimen decided how to twist the numbers further, to create a more interesting and curated shape of the world.");
break; case 1053026:cc(sprite_talk_27," Yes, I�m talking about The Council of Beavers.");
break; case 1053027:cc(sprite[2],"*spills his popcorn* Wait, that�s you! Wow! I didn�t see that coming!");
break; case 1053028:cc(sprite_talk_27,"  You�re not that much of a story guy, right? This is like formula 1A when it comes to story twists. The big reveal, you know?");
break; case 1053029:cc(sprite[2],"Not a story guy? Do you know who you�re talking to?");
break; case 1053030:cc(sprite_talk_27,"  Honestly, no. I don�t know who you are.");
break; case 1053031:cc(sprite[2],"*large gasp* What�s even the point of me hiding under this large fedora?!");
break; case 1053032:cc(sprite[0],"Hey, beavers, it's cool that you're here, and I think beavers are cool.");
break; case 1053033:cc(sprite[0],"But I don�t understand anything of your babbling. THIS is how the world was created.");
break; case 1053034: 	ts_end(CUT_CUTSCENE_DORIME_ADELE);
// CUT_CUTSCENE_DORIME_ADELE
break; case 1053101:cc(sprite[0],"So, I was at the gym as usual.");
break; case 1053102:cc(sprite[0],"Then I thought, hey, wouldn't it be cool to create a Universe? Then I could... workout in it and stuff!");
break; case 1053103:cc(sprite[1],"Wait. How could you be in the gym if there was no universe yet?");
break; case 1053104:cc(sprite[0],"How could the Big Bang happen if there was no universe yet?");
break; case 1053105:cc(sprite[1],"Hmm, you got me there. That's a good point.");
break; case 1053106:cc(sprite[0],"So, while I was doing 3x70 death-push ups with triple-combined bended knee-lifts to impress a lady elk,");
break; case 1053107:cc(sprite[0],"I created the universe with my brain power. And with my leg power of course. And, with my arm power!");
break; case 1053108:cc(sprite[0],"And my hand power, and my back power, and... my hair power and my...");
break; case 1053109:cc(sprite[0],"... leg power... and...");
break; case 1053110:cc(sprite[1],"Can someone stop him before he gets to that body part?");
break; case 1053111:cc(sprite[0],"And so on. And then I created the universe. BAM!!! The universe was SO cool!");
break; case 1053112:cc(sprite[0],"At first, there were only gyms. But then I created some other houses too because of the homelessness problem.");
break; case 1053113: 	ts_end(CUT_CUTSCENE_DORIME_DADDY);
// CUT_CUTSCENE_DORIME_DADDY
break; case 1053201:cc(sprite[2],"Interesting, Adele. But your story is not quite true. THIS is how the world was REALLY created!");
break; case 1053202:cc(sprite[2],"It was a rough and cold October evening. Leaves were falling, and they were red.");
break; case 1053203:cc(sprite[2],"As red as the love I felt at the time. As red as the pain I felt, since the love was unrequited.");
break; case 1053204:cc(sprite[2],"Yes, that's right. I'm telling the story of the Big Bang in the shape of a 1800s baroque love story.");
break; case 1053205:cc(sprite[0],"Dark Gandalf, can you take over?");
break; case 1053206: 	ts_end(CUT_CUTSCENE_DORIME_DG);
// CUT_CUTSCENE_DORIME_DG
break; case 1053301:cc(sprite[1],"This is all pretty silly, guys. It's the Council of Beavers we're talking about here. They know their stuff.");
break; case 1053302:cc(sprite[1],"And the Big Bang, isn't that from that comedy story about a made-up world, where the characters have jobs and relationships and wars and stuff?");
break; case 1053303:cc(sprite[1],"Regardless, the world was obviously created imperfect. And science doesn't have all the answers.");
break; case 1053304:cc(sprite[1],"Of course, we need to find the truth of what has been. But we also have to look into the future!");
break; case 1053305:cc(sprite[1],"What ideas should influence our world? How should we shape the world to fit us the best?");
break; case 1053306:cc(sprite[1],"When will the utopia that Marx described come to reality?");
break; case 1053307:cc(sprite[1],"Next year? In a thousand years? In a hundred years?");
break; case 1053308:cc(sprite[1],"That's the question we need to ask. How will we get there the quickest and best way possible?");
break; case 1053309: 	ts_end(CUT_CUTSCENE_DORIME_HARASS);
// CUT_CUTSCENE_DORIME_HARASS
break; case 1053401:cc(sprite_talk_27," Just so you know, animals in cars, we're here to support you.");
break; case 1053402:cc(sprite_talk_27," We know about your upcoming battle against evil. Just hang in there and give it your all!");
break; case 1053403:cc(sprite_talk_27," She's not that powerful as she looks. I've met her at parties. She often cries and storms into bathrooms.");
break; case 1053404:cc(sprite_talk_28," Yeah, while screaming \"Leave me alone!\" in the most attention-seaking way possible.");
break; case 1053405:cc(sprite[5],"SO THIS IS HOW I THINK THE WORLD WAS CREATED!!");
break; case 1053406:cc(sprite[5],"THIS IS JUST A THEORY SO GO TO HELL IF YOU EVER TAKE THIS AS A TRUTH YOU BITCH!");
break; case 1053407:cc(sprite[5],"*tar fram griffeltavla och skallar den*");
break; case 1053408:cc(sprite[5],"*ritar en massa illegala formler och ekvationer, och en bild p� adele n�r han �ter potatis*");
break; case 1053409:cc(sprite[5],"*sprutar eld p� tavlan*");
break; case 1053410:cc(sprite[5],"*skallar tavlan igen s� den v�nder sig till andra sidan*");
break; case 1053411:cc(sprite[5],"*ritar en fotorealistisk karta �ver Houston's skyline*");
break; case 1053412:cc(sprite[5],"*tar fram en fiskm�s ur sin bakficka f�r att illustrera saker*");
break; case 1053413:cc(sprite[5],"*spelar banjo*");
break; case 1053414:cc(sprite[5],"AND THEN A FUCKING GUY CAME OUT OF NOWHERE AND JUST... I DON'T KNOW!!");
break; case 1053415:cc(sprite[5],"*spelar munspel och sm�ller en b�ver i ansiktet med en stock*");
break; case 1053416:cc(sprite[5],"FUCK YOU!!!");
break; case 1053417:cc(sprite_talk_27," Is this... art?");
break; case 1053418:cc(sprite[7],"Time to race");
break; case 1053419: 	ts_end(CUT_CUTSCENE_MRSSUPERCONDUCTOR);
// CUT_RACE_RINGS
break; case 1031350:
if (r_click_on === 1) { if (distance_get(player, r_click_obj) < r_click_dist) { sprite_ui_mouseclick.visible = true; if (mouseclick === true) { ts_end(r_click_cut); } } }
ts_start();
ts_during();
switch (q) {
       case 0:r_click_on = 0;// override this if you want
}
// CUT_CUTSCENE_MRSSUPERCONDUCTOR
break; case 1031101:cc(sprite[7],"*ser Polish cow*");
break; case 1031102:cc(sprite[7],"P-Polish Cow? It's you!");
break; case 1031103:cc(sprite[8],"M-M-Mrs Superconductor!");
break; case 1031104:cc(sprite[7],"*montage �ver deras gamla romans*");
break; case 1031105:cc(sprite[7],"De m�ttes i kriget (fioler i bakgrunden), sitter bredvid varandra i en skyttegrav");
break; case 1031106:cc(sprite[7],"flyger ett stridsplan och sl�pper en bomb ihop och kysser varandra medan den demolerar en stad");
break; case 1031107:cc(sprite[7],"Klipp till att de langar varandra olika brickor inne i skolmatsalen");
break; case 1031108:cc(sprite[7],"Klipp till n�r de �r forskningskollegor och fifflar med provr�r, de s�tter p� varandra safety-glas�gon");
break; case 1031109:cc(sprite[7],"mrs superconductor o polish cow hike:ar");
break; case 1031110:cc(sprite[7],"bygger big ben och hela manhattans skyline ihop");
break; case 1031111:cc(sprite[7],"stoppar upp djur tillsammans p� naturhistoriska museet");
break; case 1031112:cc(sprite[7],"uppt�cker magnetismen ihop");
break; case 1031113:cc(sprite[7],"�r p� 16-�rsfest, mrs s f�r h�lla upp p cows h�r n�r han spyr");
break; case 1031114:cc(sprite[7],"flyttar landmassor fr�n marianergraven (som d� var marianer-normal botten) och skapar �n JAPAN");
break; case 1031115:cc(sprite[7],"Klipp att de ligger bredvid varandra i s�ngen, godnatt");
break; case 1031116:cc(sprite[7],"This is not the way I wanted to see you after all these years, Polish Cow.");
break; case 1031117:cc(sprite[8],"I would say exactly the same. God, you look as pretty as always.");
break; case 1031118:cc(sprite[7],"Polish Cow... We've been through much. Many careers in vastly different fields.");
break; case 1031119:cc(sprite[7],"But... This is the field I care about. This is my true love.");
break; case 1031120:cc(sprite[8],"Destroying worlds?");
break; case 1031121:cc(sprite[7],"No, magnets and maglev trains. But sometimes, you have to destroy something to save what you love.");
break; case 1031122:cc(sprite[8],"That's what you said when we dropped that bomb on that village!");
break; case 1031123:cc(sprite[8],"But that was different! We did that for our love!");
break; case 1031124:cc(sprite[7],"Yes. But now I have to destroy you, and your friends, for my REAL love.");
break; case 1031125:cc(sprite[2],"This is exciting, but I don't feel like eating popcorn watching it.");
break; case 1031126:cc(sprite[1],"That's because it isn't a movie, Daddy. This is real.");
break; case 1031127:cc(sprite[8],"What about this. One last race.");
break; case 1031128:cc(sprite[8],"If we win, the car club continues. And, NO MORE maglev trains.");
break; case 1031129:cc(sprite[8],"If you win, you get to do whatever the hell you want.");
break; case 1031130:cc(sprite[7],"Nah, I was more thinking that I take over the world without any negotiation.");
break; case 1031131:cc(sprite[8],"Okay, sure. Then I'll just tell the rest of the world about how many REAL magnets there actually are in your trains.");
break; case 1031132:cc(sprite[7],"Uhhh, uh, so what did you say? One last race?");
break; case 1031133:cc(shelf,"Let's do this.");
break; case 1031134: 	ts_end(CUT_CUTSCENE_RACE_ENDING);
// CUT_CUTSCENE_RACE_ENDING
break; case 1031201:ccS("Where are we?? ", " hmm... this reminds me of a specific planet");
break; case 1031202:cc(sprite[7],"We are at the final sh-");
break; case 1031203:ccS("It really looks like the planet Saturn! ", " isn't this the rings of the planet Saturn?");
break; case 1031204:cc(sprite[7],"No it's not Saturn, it's m-");
break; case 1031205:cc(shelf,"These must be the rings of Saturn. Looks just like them!");
break; case 1031206:cc(sprite[7],"No... ");
break; case 1031207:cc(sprite[7],"Sooooo anyways, we're going to race now. Cat against hamster.");
break; case 1031208:ccS("the final showdown. ", " The final showdown. Pathetic mini lion against super mouse.");
break; case 1031209:cc2(sprite[7],"The ultimate test. ", " Lion against mouse.");
break; case 1031210:ccS("vroom vroom, motherfucker. ", " shut up and start the race");
break; case 1031211: 	ts_end(CUT_RACE_RINGS);
// CUT_CUTSCENE_ENDING_MRS
break; case 2000001:cc(sprite[7],"Hah! I knew you weren't gonna take it! Mrs Superconductor WINS AGAIN!");
break; case 2000002:cc(sprite[7],"Well, I'm the magnet train emperor after all... No big shocker that I would bring home the victory.");
break; case 2000003:cc(sprite[7],"And from now on, cars will be banned, FOREVER! AND ONLY MAGLEV TRAINS WILL EXIST! MY WET DREAM WILL FINALLY BE FULFILLED!!");
break; case 2000004:cc(sprite[1],"You really screwed up here, Shelf.");
break; case 2000005:cc(shelf,"I guess I did...");
break; case 2000006:cc(sprite[2],"Yeah.");
break; case 2000007:cc(shelf,"... But we still got each other! Right?");
break; case 2000008:cc(sprite[0],"...");
break; case 2000009:cc(sprite[5],"Do you really wanna hang out with these 6 morons on public transport? On TRAINS?!!");
break; case 2000010:cc(sprite[4],"On a convenient, safe and reliable vehicle running on a pre-determined rail? That is also really fast?");
break; case 2000011:cc(sprite[1],"That goes \"   \" instead of \"vroooOOOMM!\"? Does that sound fun?");
break; case 2000012:cc(sprite[2],"This is the end of an era. But what an era it was.");
break; case 2000013:cc(sprite[1],"Indeed. I'll miss you guys.");
break; case 2000014:cc(sprite[4],"Me too.");
break; case 2000015:cc(sprite[1],"Wait, is Adele crying?");
break; case 2000016:cc(sprite[5],"Sounds like he's laughing. Or crying. Which of it is it, tell me so I know if I should laugh with him or at him!!");
break; case 2000017:cc(sprite[0],"I'm not crying!! I'm not crying, I just got something in my eye!!");
break; case 2000018:cc(sprite[4],"Well, this kinda went to shit, like everything else in my life...");
break; case 2000019: 			ts_end(CUT_CUTSCENE_EPILOGUE_MRS);
// CUT_CUTSCENE_EPILOGUE_MRS
break; case 2000101:cc(sprite_talk_zanzibae," Enough of the chitchat. Let's fast-forward five years into the future.");
break; case 2000102:cc(sprite_talk_zanzibae," Yes, that's right. I, DJ Zanzibae, am the real ruler of the world.");
break; case 2000103:cc(sprite_talk_zanzibae," That's why I get to talk in this epilogue. The beavers ain't shit to me!");
break; case 2000104:cc(sprite_talk_zanzibae," So, what happened to our friends when the adventures ceased?");
break; case 2000105:cc(sprite[2],"Daddy got stuck in a anxiety loop of complicated thoughts, which stopped him from getting a job or even maintaining his hobbies.");
break; case 2000106:cc(sprite[2],"He never spoke to anyone in the car club again, despite riding the same maglev train as them every day.");
break; case 2000107:cc(sprite[1],"Dark Gandalf did a philosophy course at the university and started to see communism's flaws.");
break; case 2000108:cc(sprite[1],"Unfortunately, his cognitive dissonance made him unable to admit it to himself, so he continued beying a cynical opinion warrior on the internet and never became truly happy.");
break; case 2000109:cc(sprite[0],"Adele continued to constantly work out, but he finally got caught red-handed by the police after years of using, producing, selling and spreading propaganda about steroids.");
break; case 2000110:cc(sprite[0],"In prison he made a name for himself by becoming a personal trainer for the inmates, and by using, producing, selling and propagating about steroids.");
break; case 2000111:cc(sprite[4],"O'Malley got a bipolar disorder and stress-induced cancer in four different bodyparts at four different moments.");
break; case 2000112:cc(sprite[4],"All of this made him incredibly stressed, which turned into a dark pattern of stress leading to cancer leading to stress, and so on. He also got a hot girlfriend.");
break; case 2000113:cc(sprite[5],"Hårass found a new gang to harass and continued to completely and unapologetically be himself in all situations.");
break; case 2000114:cc(sprite_talk_zanzibae," And what about Shelf? Well, that is you. How do YOU feel about having destroyed all these lives?");
break; case 2000115: 			ts_end(CUT_CUTSCENE_BLOOPERS);
// CUT_CUTSCENE_ENDING_YOU
break; case 2000501:cc(sprite[4],"SHELF!! YOU WON!! YAY!!");
break; case 2000502:cc(sprite[0],"Shelf! Shelf! Shelf! Shelf!");
break; case 2000503:ccS("Thank you, thank you. No big deal. This is simply who I am. ", " Shelf! Shelf! Shelf! Shelf!");
// mrs superconductor kommer ink�randes efter dig
break; case 2000504:cc(sprite[7],"ARGH!! You bastard!! Win?? Over me?? Nah, now you've crossed the line, mister...");
break; case 2000505:cc(sprite[1],"Yes, the finish line.");
break; case 2000506:cc(sprite[0],"haha NAILED IT, darkie!");
break; case 2000507:cc(sprite[7],"stupid jokes...");
break; case 2000508:cc(sprite[4],"Mrs Superconductor... More like Mrs Semiconductor!");
break; case 2000509:cc(sprite[7],"STOP IT!!");
break; case 2000510:cc(sprite[7],"You may have won this time, Shelf... But you will pay... YOU WILL PAY!");
break; case 2000511:cc(sprite[7],"I know some things about you... I know what you and your \"car club\" buddies have done. And I'm not talking about nice things...");
break; case 2000512:cc(sprite[7],"... I know about everything! EVERYTHING!!");
break; case 2000513:cc(sprite[7],"YOU WILL SEE MY TRUE POWERS!! JUST TRUST ME!!");
break; case 2000514:cc(sprite[1],"I think she is lying. She is trying to scare us with empty threats.");
break; case 2000515:cc(shelf,"she's just mad because he lost against me. because i'm the undisputable king.");
break; case 2000516:cc(sprite[2],"High five, Shelf!");
break; case 2000517:cc(sprite[1],"CARS RULE!");
break; case 2000518: 			ts_end(CUT_CUTSCENE_EPILOGUE_YOU);
// CUT_CUTSCENE_EPILOGUE_YOU
break; case 2000601:cc(sprite_talk_zanzibae," Enough of the chitchat. Let's fast-forward five years into the future.");
break; case 2000602:cc(sprite_talk_zanzibae," Yes, that's right. I, DJ Zanzibae, am the real ruler of the world.");
break; case 2000603:cc(sprite_talk_zanzibae," That's why I get to talk in this epilogue. The beavers ain't shit to me!");
break; case 2000604:cc(sprite_talk_zanzibae," So, what happened to our friends when the adventures ceased?");
break; case 2000605:cc(sprite_talk_zanzibae," First of all, they all went to prison for theft, illegal street racing, harassment and, in Daddy's case, weird search history.");
break; case 2000606:cc(sprite_talk_zanzibae," I guess Mrs Superconductor wasn't joking with all those legal threats?");
break; case 2000607:cc(sprite[2],"Daddy became a \"bitch\" to a tiny but aggressive inmate, which meant he had to read bedtime stories for him and wash him long and carefully.");
break; case 2000608:cc(sprite[2],"The bedtime stories became his creative outlet, and he soon released his first book from inside prison: \"Life according to a fucking MANIAC\", after being positively encouraged by O'Malley.");
break; case 2000609:cc(sprite[1],"Dark Gandalf started The Leninistic And Stalinistic Society inside prison and also got Adele to understand his ideas.");
break; case 2000610:cc(sprite[1],"He also started eating copious amounts of schnitzel.");
break; case 2000611:cc(sprite[0],"Adele realized how important long-term health was, and started developing a new healthy version of steroids made out of prison floor, prison wall and prison guard hat.");
break; case 2000612:cc(sprite[0],"He became very popular among the inmates, probably because they were scared of him.");
break; case 2000613:cc(sprite[4],"O'Malley grew a beard and got a rumour of being \"tiny but aggressive\" after punching Daddy in the balls during their first day.");
break; case 2000614:cc(sprite[4],"Yes, O'Malley was the inmate having Daddy as his \"bitch\". O'Malley really let his evil sides flourish. Sad, because didn't we all root for him earlier?");
break; case 2000615:cc(sprite[5],"Hårass continued to completely and unapologetically be himself in all situations.");
break; case 2000616:cc(sprite_talk_zanzibae," And most importantly");
break; case 2000617:cc(sprite_talk_zanzibae," Sure, they couldn't drive cars anymore, but maybe the cars were never the important part anyway...");
break; case 2000618: 			ts_end(CUT_CUTSCENE_BLOOPERS);
// CUT_CUTSCENE_BLOOPERS
break; case 3000001:cc(sprite[1],"I will add bloopers here. Or deleted scenes or something.");
break; case 3000002:cc(sprite[1],"But for now, the game stops working here. THANKS FOR PLAYING");
break; case 3000003: 	ts_end(CUT_CUTSCENE_MEETING_DISCUSSION);
// CUT_CUTSCENE_PISSANDSHIT
//sprite_talk_195: Ring... Ring...
break; case 9000001:cc(sprite[1],"just gonna piss and shit etc");
break; case 9000002:cc(sprite[5],"me too but i’m gonna do the other order like shit then piss etc");
break; case 9000003:cc(sprite[1],"*washes hands*");
break; case 9000004:cc(sprite[5],"I saw your hands.");
break; case 9000005:cc(sprite[1],"...");
break; case 9000006:cc(sprite[5],"I saw your small, small hands.");
break; case 9000007:cc(sprite[1],"don’t say anything!!");
break; case 9000008:cc(sprite[5],"i’m not sure if i can promise to not say anything. They are so small. In a so so funny way. Everybody must know.");
break; case 9000009:cc(sprite[1],"okay, then… then I’ll tell them about Adeles mom.");
break; case 9000010:cc(sprite[5],"NO you can’t tell them about how I just BAM BAM BAM made sweet love to Mama Adele, that would be the worst. I would have to start doing the same to everybody’s moms if they found out about what a wonderful and tender night I gave her.");
break; case 9000011:cc(sprite[1],"So, you shut up, I shut up?");
break; case 9000012:cc(sprite[5],"hmmm... arrrgh... i really wanna tell them about your tiny comedy hands.");
break; case 9000013:cc(sprite[5],"...");
break; case 9000014:cc(sprite[5],"But okay");
break; case 9000015:cc(sprite[1],"Dark deal.");
break; case 9000016:cc(sprite[5],"i’ll give you 100 bucks too if you keep quiet about my bedroom magic.");
break; case 9000017:cc(sprite[1],"then you get 100 bucks from me too.");
break; case 9000018:cc(sprite[5],"Great, then we’re double safe.");
break; case 9000019:    		ts_end(CUT_FREEROAM_WASHING_2);
// CUT_CUTSCENE_MEETING_DISCUSSION (alternative cutscene)
break; case 9000101:cc(sprite[2],"Welcome to the Discussion Club.");
//*alla tar på sig varsin fedora, daddy tar på sig en extra fedora ovanpå sin*
break; case 9000102:cc(sprite[5],"I have a question: What's the meaning of life?");
break; case 9000103:cc(sprite[2],"The meaning of life... Good question... Well, first of all, what's the purpose of the meaning?");
break; case 9000104:cc(sprite[1],"Could it be to live freely and also still have your material posessions controlled by the state?");
break; case 9000105:cc(sprite[5],"No, i think the meaning of life is to be a hard worker and pursue happiness.");
break; case 9000106:cc(sprite[2],"None of you are correct! The meaning of life is to create art.");
break; case 9000107:cc(sprite[5],"No, you're wrong.");
break; case 9000108:cc(sprite[1],"No, YOU'RE wrong.");
break; case 9000109:cc(sprite[5],"I think the meaning of life is nothing. We just ARE.");
break; case 9000110:cc(sprite[2],"Now we have talked about nothing for five minutes, have we gotten any interesting results from it?");
break; case 9000111:cc(sprite[5],"No!!!");
break; case 9000112:cc(sprite[2],"Then I conclude this a successful session of the Discussion Club.");
break; case 9000113:   		ts_end(CUT_CUTSCENE_MEETING_DISCUSSION2);
// CUT_CUTSCENE_MEETING_DISCUSSION2 (alternative cutscene)
break; case 9000201:cc(sprite[2],"Welcome to the Discussion Club!");
//*alla tar på sig varsin fedora, daddy tar på sig en extra fedora ovanp�in
break; case 9000202:cc(sprite[1],"Guys, listen. Shouldn't we just restart it all?");
break; case 9000203:cc(sprite[0],"Restart the club?");
break; case 9000204:cc(sprite[1],"No, restart civilization!");
break; case 9000205:cc(sprite[0],"What");
break; case 9000206:cc(sprite[5],"You know what, I think civilization kind of works. Like, it rolls on.");
break; case 9000207:cc(sprite[2],"Yes, I also conclude that society works! Nothing to fix here.");
break; case 9000208:cc(sprite[1],"No no no, you don't get it. We have to start again from scratch! With everything!");
break; case 9000209:cc(shelf,"I also think society works");
break; case 9000210:cc(sprite[1],"*sigh* What has happened to the youth? Where's the REBELLION? The FIGHTING SPIRIT?");
break; case 9000211:cc(sprite[0],"I just want cars and soda");
break; case 9000212:cc(sprite[5],"Dark Gandalf, sometimes you have to relax and choose happiness. Everything doesn't have to be a problem.");
break; case 9000213:cc(shelf,"Word.");
break; case 9000214:cc(sprite[2],"... And that's it! Thanks for randomly rambling about nothing! This was a very seccussful Discussion Club!");
break; case 9000215:cc(sprite[2],"Next week: Why does my movie script still only have 12 views on ScriptIt?");
break; case 9000216:cc(sprite[0],"Why am I in this club");
break; case 9000217:   		ts_end(CUT_CUTSCENE_MEETING_DISCUSSION3);
// CUT_CUTSCENE_MEETING_DISCUSSION3 (alternative cutscene)
break; case 9000301:cc(sprite[1],"jag byggde en ny civilisation lite snabbt. Kolla nu, s� h�r kan man k�ra runt i den! *k�r runt i sin nya civilisation*");
break; case 9000302:cc(sprite[0],"okej coolt men var �r brudarna?");
break; case 9000303:cc(sprite[1],"adele vill du skriva lagboken? Jag t�nker vi ska ha typ sju lagar");
break; case 9000304:cc(sprite[1],"och hårass du kan va polis och shelf du kan vara inv�nare och sen...");
break; case 9000305:cc(sprite[1],"det h�r k�ndes bra i mitt huvud ig�r kv�ll men nu b�rjar jag tveka lite p� id�n");
break; case 9000306:cc(sprite[2],"vad g�r det till en civilisation? R�cker det med att det �r n�got som... finns?");
break; case 9000307:cc(sprite[1],"levande m�nniskor, hus, kommunism.");
break; case 9000308:cc(sprite[0],"finns v�l civissatiiner utan kommunimism? Vi har inte det i v�r v�rld");
break; case 9000309:cc(sprite[2],"det dark gandalf sa fast minus kommunism");
break; case 9000310:cc(sprite[1],"nej o vad �r det f�r civilisation att snacka om?!");
break; case 9000311:cc(sprite[0],"vad �r en civisation?");
break; case 9000312:cc(sprite[5],"stad typ!");
break; case 9000313:cc(sprite[0],"s�g det d�");
break; case 9000314:cc(sprite[1],"stad med kommunism");
break; case 9000315:cc(sprite[2],"fortfarande nej...");
break; case 9000316:cc(sprite[0],"kommunimism... varf�r �r ord s� l�nga, jag gl�mmer alltid b�rjan n�r jag kommer till slutet");
break; case 9000317:cc(sprite[5],"exakt. ord �r alldeles f�r l�nga: Kommunism, civilisation, socialism, solidaritet,");
break; case 9000318:cc(sprite[1],"mhm!! s� ska det l�ta!! *njuter*");
break; case 9000319:cc(sprite[5],", kapitalism, entrepren�r,");
break; case 9000320:cc(sprite[1],"nej men vad s�ger du, sluta s�ga s�na fula ord!");
break; case 9000321:cc(sprite[5],"jag menar att l�nga ord �r sv�ra att f�rst�, och att det �r mycket b�ttre med korta ord, exempelvis: pee, poo, shit, cunt, ass,");
break; case 9000322:cc(sprite[1],"nu b�rjar det likna n�t igen");
break; case 9000323:cc(sprite[2],"Tack f�r dagens m�te. Vi kom �terigen inte fram till n�got.");
break; case 9000324:cc(sprite[1],"Superlyckat!");
break; case 9000325: 		ts_end(CUT_CUTSCENE_MEETING_DISCUSSION4);
// CUT_CUTSCENE_MEETING_DISCUSSION4 (alternative cutscene)
break; case 9000401:cc(sprite[2],"Welcome to the Discussion Club. This week, I would like to discuss movies.");
break; case 9000402:cc(sprite[2],"Everyone working with movies are a bunch of bastards, they don't even read my scripts and I despise them.");
break; case 9000403:cc(sprite[1],"You seem bitter today, Daddy. Did something happen?");
break; case 9000404:cc(sprite[2],"*sigh* I should just give up... I could as well start directing pornography or something.");
break; case 9000405:cc(sprite[0],"Pornography? What's that?");
break; case 9000406:cc(sprite[1],"Oh, come on Adele. I watch porn on the dark web all the time! You mean you don't do that as well?");
break; case 9000407:cc(sprite[2],"You really don't know what pornography is?");
break; case 9000408:cc(sprite[0],"Ah, you mean gym porn, the hashtag!");
break; case 9000409:cc(sprite[2],"No... It's like, persons doing things in rooms. It's like a video picture of naked men.");
break; case 9000410:cc(sprite[1],"Naked women?");
break; case 9000411:cc(sprite[2],"Yeah, what did I say?");
break; case 9000412:cc(sprite[0],"I'll google it.");
break; case 9000413:cc(sprite[0],"*googles it*");
break; case 9000414:cc(sprite[0],"Gasp!");
break; case 9000415:cc(sprite[0],"Ok guys why did no one tell me about this earlier??");
break; case 9000416:cc(sprite[1],"Adele, you're still on the browser tab with gym equipment on sale.");
break; case 9000417:cc(sprite[0],"Oh you're right. I'll search for it for real now.");
break; case 9000418:cc(sprite[0],"UEEEEH GROSS!!!");
break; case 9000419:cc(sprite[1],"Next topic: Did you know the average person is more stupid than the average?");
break; case 9000420:cc(sprite[2],"Oh is that true? So cool, but I kind of have to go now.");
break; case 9000421:cc(sprite[2],"I conclude this a very successful Discussion Club meeting!");
break; case 9000422:cc(sprite[5],"Next time I want to talk too!!!");
break; case 9000423: 		ts_end(CUT_SPLASHSCREEN);
//  5000001
break; case 5000001:
g = pseudorandom(player.position.x+player.position.z);
if (g>=0&&g<0.1)	cc(sprite[5],		"I evolved directly from bacteria. I'm also a little bit related to fungi!!");
else if (g>=0.1&&g<0.2)	cc(sprite[5],		"I am what women want. I am their only hope.");
else if (g>=0.2&&g<0.3)	cc(sprite[5],		"I'm expecting kids in about 2 to 45 years.");
else if (g>=0.3&&g<0.4)	cc(sprite[5],		"I'm the lawyer of the meme economy. Silence in the court! xD");
else if (g>=0.4&&g<0.5)	cc(sprite[5],		"I'm the governor of Fun Land.");
else if (g>=0.5&&g<0.6)	cc(sprite[5],		"I laugh every time I see the number 3, because it reminds me of the 3 times I've died.");
else if (g>=0.6&&g<0.7)	cc(sprite[5],		"I LOVE WASHING MACHINES!!");
else if (g>=0.7&&g<0.8)	cc(sprite[5],		"Effectiveness is key.");
else if (g>=0.8&&g<0.9)	cc(sprite[5],		"I wanna grow a beard. But I’m not a loser, sooo maybe that will stop my plans");
else if (g>=0.9&&g<1)	cc(sprite[5],		"Fuck you!!");
break; case 5000002:    	ts_end_from_talk(last_cut_before_talk);
//  5000051
break; case 5000051:cc(sprite_harassplane1," Yes, Hårass got a bunch of airplanes in his backyard.");
break; case 5000052:cc(sprite_harassplane1," It's a legal loophole. With the airplanes his backyard technically becomes an airplane museum, a work area, and an airport.");
break; case 5000053:cc(sprite_harassplane1," This gives him financial aids from three different institutions, enough for him to never work for the rest of his life.");
break; case 5000054:cc(sprite_harassplane1," That's Hårass, I guess!");
break; case 5000055: 	ts_end_from_talk(last_cut_before_talk);
//  5000101
break; case 5000101:
g = pseudorandom(player.position.x+player.position.z);
if (g>=0&&g<0.1)	cc(sprite_talk_stork,		"Jag ska bara \"pegga upp\" och öva i några timmar!");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_stork,		"Kan du akta dig? Jag ska prova en ny sorts sving från kina.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_stork,		"Ooh! Nära green! Riktigt jävla golf va.");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_stork,		"Är jag i vägen? Ja men du får väl planera din golfrunda lite bättre! Jag stannar ALLTID här och blockerar.");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_stork,		"Ska du golfa i de kläderna?");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_stork,		"Här är det järnsjua som gäller! Eller... kanske järnnia. Eller åtta. Hmm, får tänka lite till innan jag slår...");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_stork,		"Vill du också spela? Ska bara slå mitt slag först. *stretchar i 10 min först)");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_stork,		"Det handlar inte mest om vilka klubbor du har, eller om hur du slår, utan om vilket energidrycksföretag som sponsrar dig.");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_stork,		"Jag har lagt små markeringar där jag har landat med bollen förut. Det är därför banan är full med små plastmatlådelock som gör det svårt att spela.");
else if (g>=0.9&&g<1)	cc(sprite_talk_stork,		"Kan du hålla min mobil som har en webbläsarflik med sökresultat på en massa konstig furry-fanfiction uppe, medan jag svingar ett tag?");
break; case 5000102:    	ts_end_from_talk(last_cut_before_talk);
//  5000201
break; case 5000201:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_capy,		"Mindset is everything.");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_capy,		"Business is all about building communities and selling stocks to homeless guys.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_capy,		"Why I don't have a partner? Because I’m married to the grind!");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_capy,		"If money can’t buy happiness, how come I just bought happiness in the form of a brand new electric car?");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_capy,		"I saw a homeless guy today, so pathetic.");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_capy,		"A good body is a good mind, and a good mind trades one million cash stocks per day on the black market. Did I say black? I meant market.");
else if (g>=0.6&&g<0.65) cc(sprite_talk_capy,		"I'm so tired of gang violence.");
else if (g>=0.65&&g<0.7) cc(sprite_talk_capy,		"I may look like a capybara, but I'm actually a guinea pig mixed with a hippo.");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_capy,		"Sometimes when I'm alone, when no one sees or hears me, I take a break from trading crypto.");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_capy,		"Wheelchair? When I grew up, we just had normal chairs.");
else if (g>=0.9&&g<1)	cc(sprite_talk_capy,		"Chairs are chairs, vehicles are vehicles. End of discussion! So, tell me again why wheelchairs exist?");
break; case 5000202:    	ts_end_from_talk(last_cut_before_talk);
//  5000301
break; case 5000301:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_turf,		"You know why he's called Darchadais? It's because he must have an 'S' in his name, otherwise he won't hear people calling on him.");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_turf,		"When Dark Gandalf quit his job, he got a badge of horror from his boss.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_turf,		"Last time Dark Gandalf got pussy? 800 years ago.");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_turf,		"I've heard Dark Gandalf dreams really cool nightmares.");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_turf,		"Did you know Dark Gandalf is afraid of turning on the lights in the morning?");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_turf,		"Dark Gandalf wasn't always a raging communist. It all started the first time he got a car repairment bill from Dogert.");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_turf,		"Dark Gandalf breathes gray dust.");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_turf,		"Did you know Dark Gandalf starts every day by smoking a whole pack of soap bubbles?");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_turf,		"I love Dark Gandalf. Have you met him?");
else if (g>=0.9&&g<1)	cc(sprite_talk_turf,		"One time a newspaper reviewed Dark Gandalf. \"Not as dark as expected\". Dark Gandalf got so mad he turned on the lights in pure rebellion.");
break; case 5000302:    	ts_end_from_talk(last_cut_before_talk);
//  5000401
break; case 5000401:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_nubbs,		"Did you know all of Dark Gandalf's outer joints are numb?");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_nubbs,		"When Dark Gandalf picks something up from the floor, he has to bow down reeaally low.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_nubbs,		"Don't ask Dark Gandalf about his gloves.");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_nubbs,		"When Dark Gandalf is alone, he continously and consistently squeezes a rubber ball to train his muscles.");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_nubbs,		"Dark Gandalf's favorite music is black reggaeton.");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_nubbs,		"I just joined the meme \"Show your buttcrack for Dark Gandalf\". Why buttcrack? Because it's the darkest part of the body!");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_nubbs,		"Dark Gandalf plans on being the exact same person until 90, then he will make a big change: Die.");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_nubbs,		"Every year, Dark Gandalf grows one centimeter. His size is 100% proportional to his age.");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_nubbs,		"");
else if (g>=0.9&&g<1)	cc(sprite_talk_nubbs,		"");
break; case 5000402:    	ts_end_from_talk(last_cut_before_talk);
//  5000501
break; case 5000501:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_otter,		"Ja ja ja men det är Jybbe ju");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_otter,		"Ja jag är ju jybbe är det så konstigt med det ju eller vad då va?");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_otter,		"Bilarna går fort du oj oj oj");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_otter,		"Jybbigt att åka bil?? Jybb jybb jybb");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_otter,		"Så är det ja, så är det ja, ja-ah!");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_otter,		"Oj oj oj ett sånt väder, det var något speciellt det, ja oj oj oj...");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_otter,		"Jaså du undrar vem jag är? Ja du jag är Jybbe ja, inte värre än så...");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_otter,		"*Stares into emptiness*");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_otter,		"Har du sett min segway? Den är blommig och oj så fin...");
else if (g>=0.9&&g<1)	cc(sprite_talk_otter,		"Jag har aldrig sett en levande kvinna");
break; case 5000502:    	ts_end_from_talk(last_cut_before_talk);
//  5000601
break; case 5000601:cc(sprite_talk_sheep," I'm a sheep and I'm well-versed in biology and physics. And my private spontaneous research tells me that you're a new undiscovered spieces of animal!");
break; case 5000602:cc(sprite_talk_sheep," Really nice DNA, man! I'm gonna trap you in a cage and exhibit you at a zoo! Immediately!");
break; case 5000603:cc(shelf,"i don't wanna. gonna drive car later");
break; case 5000604:cc(sprite_talk_sheep," Wait, your upper body very much looks like a hamster's.");
break; case 5000605:cc(sprite_talk_sheep," I don't understand the lower body though. Evolution can't create wheels, I've read that in Illustrated and Unnecessarily Vaguely Described Science.");
break; case 5000606:cc(sprite_talk_sheep," Are you attached to the car? Or, are you just driving a car? If the latter, you're probably just a hamster.");
break; case 5000607:cc(shelf,"Yes, I'm just a hamster.");
break; case 5000608:cc(sprite_talk_sheep," .... So you're not attached to the car?");
break; case 5000609:cc(shelf,"Man, it was nice talking to you, but I gotta bounce, so so sorry! See you later!");
break; case 5000610:    	ts_end_from_talk(last_cut_before_talk);
//  5000701
break; case 5000701:cc(sprite_talk_bear," I'm flaming hot. Scalding hot. That's why I'm orange.");
break; case 5000702:cc(sprite_talk_bear," If you touch me, you will burn to death.");
break; case 5000703:cc(shelf,"Why??");
break; case 5000704:cc(sprite_talk_bear," Slept in the frying pan");
break; case 5000705:cc(shelf,"WHY??!!");
break; case 5000706:cc(sprite_talk_bear," Wanna become french fries");
break; case 5000707:cc(shelf,"What?");
break; case 5000708:cc(sprite_talk_bear," Wanna live in the restaurant");
break; case 5000709:cc(shelf,"I think you might be mentally deranged.");
break; case 5000710:cc(sprite_talk_bear," Wanna become friends with hamburgah");
break; case 5000711:    	ts_end_from_talk(last_cut_before_talk);
//  5000801
break; case 5000801:
if (bhagz_fuckyou >= 2) cut = 5000821;
else cc(sprite_talk_bhagz, "I have a mission for you. This is a carlessly folded paper with a handdrawn fuck you sign on it.");
break; case 5000802: cc(sprite_talk_bhagz, "Put it in your leather bag and transport it through the oceans and wastelands to Dark Gandalf.");
bhagz_fuckyou = 1;
break; case 5000803: ts_end_from_talk(last_cut_before_talk);
break; case 5000821: cc(sprite_talk_bhagz, "Hey, traveller. Did you deliver the goods to Dark Gandalf?");
break; case 5000822: cc(sprite_talk_bhagz, "Oh, do you... Do you have a present for me?");
break; case 5000823: cc(sprite_talk_bhagz, "Let me see! Give me that paper!");
break; case 5000824: cc(sprite_talk_bhagz, "*reads paper carefully*");
break; case 5000825: cc(sprite_talk_bhagz, "Traveller, after carefully reading this paper, I have a new mission for you. Can you murder Dark Gandalf?");
break; case 5000826: ts_end_from_talk(last_cut_before_talk);
//  5000901
break; case 5000901:
if (bhagz_scartcable >= 2) cut = 5000921;
else cc(sprite_talk_bhagz,"I have a mission for you. Start a company and take it to the top by state-imposed monopoly and illegal cartels.");
break; case 5000902:cc(sprite_talk_bhagz," Too difficult? Okay, then buy a SCART cable for my TV.");
bhagz_scartcable = 1;
break; case 5000903:    	ts_end_from_talk(last_cut_before_talk);
break; case 5000921:cc(sprite_talk_bhagz, "Thanks");
bhagz_scartcable = 2;
break; case 5000922:    	ts_end_from_talk(last_cut_before_talk);
//  5001001
break; case 5001001:cc(sprite_talk_bhagz," I have a mission for you. Go to the Mountains of Shame, and wait until night falls.");
break; case 5001002:cc(sprite_talk_bhagz," There you will meet an unknown person who looks very much like me but, and this is important, isn't me, and he will give you a present.");
break; case 5001003:cc(sprite_talk_bhagz," The present may or may not be bitchslap related.");
bhagz_bitchslap = 1;
break; case 5001004:    	ts_end_from_talk(last_cut_before_talk);
//  5001101
break; case 5001101:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_suit,		"Sorry but I'm bussy. I'm at work.");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_suit,		"Excuse me, but I just got a mail from my boss.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_suit,		"Can we talk later? Throwing a couple ideas back and forth to my colleagues right now.");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_suit,		"I'm just about to transfer a sum of money from one bank account to another.");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_suit,		"I have five web browser tabs open and am doing great work in all of them.");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_suit,		"Excuse me, did you say something? I'm on the phone with a client.");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_suit,		"Wait a minute, I'm just about to steal some apples from the lunchroom. Yes, you CAN have fun at the job!");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_suit,		"My favorite book? Productivity And Ownership Over Your Workday by Stephen McBarrington. It's a really good hentai book.");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_suit,		"I'm at a meeting right now.");
else if (g>=0.9&&g<1)	cc(sprite_talk_suit,		"Commuting? Yeah, I know about it.");
break; case 5001102:    	ts_end_from_talk(last_cut_before_talk);
//  5001201
break; case 5001201:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.2)	cc(sprite_talk_tiger,		"I'm pretty nice, but I also have a God complex.");
else if (g>=0.1&&g<0.4)	cc(sprite_talk_tiger,		"I dinga-danga-dong the church bell every minute. Every hour? Hah! What kind of horseshit is that?");
else if (g>=0.4&&g<0.6)	cc(sprite_talk_tiger,		"My breakfast consists of 12 eggs and a whole package of butter. I love life.");
else if (g>=0.6&&g<0.8)	cc(sprite_talk_tiger,		"No, I'm not related to Tony the Tiger. Why?");
else if (g>=0.8&&g<1)	cc(sprite_talk_tiger,		"I'm balls deep into the book \"How To Ding-Dong A Church Bell\". It helps me optimize my ding-donging.");
break; case 5001202:    	ts_end_from_talk(last_cut_before_talk);
//  5001301
break; case 5001301:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_zanzibae,		"Do you like smooth jazz");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_zanzibae,		"Do you like my haircut");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_zanzibae,		"Do you like hardcore techno trance from the 90s. Or are you an idiot");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_zanzibae,		"You wanna hear some smooth tunes? I bet ya wanna");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_zanzibae,		"The DJ table is my canvas and I am a pencil. Simple as that");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_zanzibae,		"You know any celebrities that are throwing a party nearby? I wanna join");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_zanzibae,		"Have you been to Ibiza? I've been to the horse version of Ibiza: being outside of the paddock for a while");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_zanzibae,		"Do you happen to like RNB that's soft as butter and at the same time deep and honest");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_zanzibae,		"Are you a music freak        I can see it on ya that ya are");
else if (g>=0.9&&g<1)	cc(sprite_talk_zanzibae,		"Music is a drug and I'm an addict");
break; case 5001302:    	ts_end_from_talk(last_cut_before_talk);
//  5001401
break; case 5001401:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_snake,		"Defund the Central Bank and pee on their reception floor!");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_snake,		"The labor minister is a cuck!");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_snake,		"No I'm not allergic to electricty... but I'm not the biggest fan either!");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_snake,		"Africa only exists in documentaries! Unveil the scam!");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_snake,		"The moon landing was fake! They were actually on one of Saturns rings!");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_snake,		"Fuck grocery stores!");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_snake,		"Meat is government control!");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_snake,		"Politicians are too busy sleeping with Big Oil to care about their citizens!");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_snake,		"Stop plastics NOW!");
else if (g>=0.9&&g<1)	cc(sprite_talk_snake,		"Your local bakery is a brothel in disguise!");
break; case 5001402:    	ts_end_from_talk(last_cut_before_talk);
//  5001501
break; case 5001501:	cc(sprite_talk_disonesty,		"Sorry, but I don't have time to talk. It's been pretty much lately...");
break; case 5001502:	cc(shelf,				"that's life");
break; case 5001503:	cc(sprite_talk_disonesty,		"Yeah... I guess so :) Thanks. You're a really good listener! Okay I guess I can talk a bit then.");
break; case 5001504:	cc(sprite_talk_disonesty,		"So, I have two bands");
break; case 5001505:	cc(sprite_talk_disonesty,		"The jazz rap band is kind of a mess... They want to sample Beatles and I thought that sounded kinda gay, so...");
break; case 5001506:	cc(sprite_talk_disonesty,		"... We fought a bit. Like, I threw my ball at them");
break; case 5001507:	cc(sprite_talk_disonesty,		"It's been so weird since my mom joined the band");
break; case 5001508:	cc(sprite_talk_disonesty,		"Like, that's not how bands are supposed to be. You're not supposed to expect people's moms to join. But that's where we're at...");
break; case 5001509:	cc(sprite_talk_disonesty,		"She passed our audition and all pigs look kinda the same, so... I didn't recognize her");
break; case 5001510:	cc(sprite_talk_disonesty,		"So now my mom's in my band. Life sucks");
break; case 5001511:	cc(sprite_talk_disonesty,		"The indie funk band is great though! We release our first album tomorrow!");
break; case 5001512:	cc(sprite_talk_disonesty,		"There will be texts about life, and like... thoughts and stuff.");
break; case 5001513:	cc(sprite_talk_disonesty,		"We're kinda looking for our own sound, like we don't wanna sound like everyone else, that's how we stick out, that's what kinda makes us special");
break; case 5001514:	cc(sprite_talk_disonesty,		"You know, it's been pretty much lately, so I don't know if I can talk any longer...");
break; case 5001515:    	ts_end_from_talk(last_cut_before_talk);
//  5001601
break; case 5001601:	cc(sprite_talk_seal,		"I can't stop it. You know, running non-profits where most profit goes to my own pocket.");
break; case 5001602:	cc(sprite_talk_seal,		"Turns out, the \"non\" in non-profit is a pretty loose term.");
break; case 5001603:	cc(sprite_talk_seal,		"It's not like I don't help them also! It's just not ALL money that goes to the refugees.");
break; case 5001604:	cc(sprite_talk_seal,		"Have you ever been on a broken raft?");
break; case 5001605:	cc(sprite_talk_seal,		"I have, and after that one time it's all speedboats for me.");
break; case 5001606:	cc(sprite_talk_seal,		"It gives me a good \"bird's eye view\" over all the refugee-filled rafts, so I see when they drown, so I can save them.");
break; case 5001607:	cc(sprite_talk_seal,		"Why I don't bring them on my speedboat?");
break; case 5001608:	cc(sprite_talk_seal,		"I always hear that argument! \"You can always do more!\" You would have said the same thing if I had them on my boat!");
break; case 5001609:	cc(sprite_talk_seal,		"Like, \"Why don't you let them live in your house, why don't you give them all your money, why don't you marry them?\" and so on.");
break; case 5001610:	cc(sprite_talk_seal,		"How would it look if I married the refugees?");
break; case 5001611:	cc(sprite_talk_seal,		"That's right. You just got check-mate:d by a seal.");
break; case 5001612: 		ts_end_from_talk(last_cut_before_talk);
//  5001701
break; case 5001701:	cc(sprite_talk_weesel,		"Sunshine? Rain? They're both the same: Perfect weather for sunbathing in my garden.");
break; case 5001702:	cc(sprite_talk_weesel,		"Or for just standing by the window and stare out with dead eyes.");
break; case 5001703:	cc(sprite_talk_weesel,		"You wanna know which animals I hate the most?");
break; case 5001704:	cc(sprite_talk_weesel,		"Elks, hamsters, pandas, badgers, and... dark lords.");
break; case 5001705:	cc(sprite_talk_weesel,		"They're the worst. Isn't that right, wife?");
break; case 5001706:	cc(sprite_talk_weesel,		"*sigh* Who am I kidding, she isn't there. Left me eight years ago.");
break; case 5001707:	cc(sprite_talk_weesel,		"Well, back to bed, I guess.");
break; case 5001708: 		ts_end_from_talk(last_cut_before_talk);
//  5001801
break; case 5001801:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_moose,		"Note to self: Open door wider in order to get more customers flowing in.");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_moose,		"Note to self: Remember to buy things to the store so I can sell them to customers.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_moose,		"Note to self: Drink energy drink to have enough energy to sell energy drinks.");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_moose,		"Note to self: Need to fire more staff. Maybe myself?");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_moose,		"Note to self: Is there protein powder for cars? Like a fluid you pour into it to give it energy. If not, invent.");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_moose,		"Note to self: Put more heavy metal in store playlist.");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_moose,		"Note to self: Give back the pen Adele lent me. It has too many colors. Why all of them at the same time?");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_moose,		"Note to self: Make money until month's end in order to have money for food and shelter.");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_moose,		"Note to self: Read at least one page of the Old Testoment before bedtime.");
else if (g>=0.9&&g<1)	cc(sprite_talk_moose,		"Note to self: I'm a moose and not an elk!! ABSOLUTELY not a reindeer, don't let anyone else decide who you are!");
break; case 5001802:    	ts_end_from_talk(last_cut_before_talk);
//  5001901
break; case 5001901:cc(sprite_dogertbush," I.AM.A.BUSH.BUT.I.CAN.ALSO.FIX.CARS.HAHA.");
break; case 5001902:cc(shelf,"was that Dogert as a bush?");
break; case 5001903:cc(sprite_dogertbush," WHO.IS.DOGERT. NEVER.HEARD.THAT.NAME.BEFORE.");
break; case 5001904:cc(sprite_dogertbush," BUT.HE.SOUNDS.LIKE.A.PERSON.WHO.IS.VERY.GOOD.AT.BEING.A.CAR.MECHANIC.");
break; case 5001905:cc(shelf,"*looks at empty glass bottle, then looks back at the weird bush, then shakes head slowly*");
break; case 5001906: 	ts_end_from_talk(last_cut_before_talk);
//  5002001
break; case 5002001:cc(sprite_talk_harassdad," Hey, I'm Hårass dad, Hårass! Nice to meet ya!");
break; case 5002002:cc(sprite_talk_harassdad," Hårass can be a pain in the ass sometimes... But that comes from his environment only and NOT from his genes!");
break; case 5002003:cc(sprite_talk_harassdad," I heard he's having a good time in your car club, though. Big thanks for taking care of my little boy!");
break; case 5002004:cc(shelf,"you're much nicer than your son");
break; case 5002005:cc(sprite_talk_harassdad," Yes, that's because I'm just manipulating you to earn your trust so I can be EVEN MORE EVIL TOWARDS YOU");
break; case 5002006:cc(sprite_talk_harassdad," HIS IS A CHAINSAW. NOW YOU BETTER RUN BECAUSE OTHERWISE I'M GOING TO KILL YOU");
sound_chainsaw.play();
break; case 5002007: 	ts_end_from_talk(last_cut_before_talk);
//  5002101
break; case 5002101:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_baltabird,		"I've heard that Hårass has had intimate relations to Dark Gandalf's mom... PSST! Don't tell anyone!");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_baltabird,		"Dogert is going in and out of the psyche ward and refuses to take his medicine. Bet you didn't know about that one...");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_baltabird,		"This town was originally gonna be called Hongkong/Japan, and feature rivaling gangs where Polish Cow was the leader of one. That's a secret from my friend kbrecordzz, don't spread it out...");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_baltabird,		"I've heard Hårass' Dad has killed 7 people... all of them other Hårasses...");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_baltabird,		"Dogs are boys, cats are girls and otters are non-binary. But this one stays between me and you only...");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_baltabird,		"I've heard rumors about Adele being in love with Dogert... PSST! It's actually true!!");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_baltabird,		"Hårass hasn't killed anyone... YET. But when he does, I'll be the first to tell you...");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_baltabird,		"Here's one for you... Daddy aims to be a big movie director one day... Because he really love stories... This one is new, I promise you...");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_baltabird,		"Hey, I've seen some wicked things around town... Wanna know anything spicy, just ask me...");
else if (g>=0.9&&g<1)	cc(sprite_talk_baltabird,		"Hey, I've seen some wicked things around town... Wanna know anything spicy, just ask me...");
break; case 5002102:    	ts_end_from_talk(last_cut_before_talk);
//  5002201
break; case 5002201:cc(sprite_talk_aff," Hello, I'm making sure everyone are doing okay. No one should be sad in this place! You need a pillow to make your life more fluffy?");
break; case 5002202:cc(shelf,"you look like the red cat");
break; case 5002203:cc(sprite_talk_aff," Mrs Superconductor? Yes... it's my cat. I'm its owner. We go very well along. She's so spiritual and joyful about everything!");
break; case 5002204:cc(sprite_talk_aff," She really likes train. She actually builds trains too! Did you know there are only 6 maglev trains in the world? Yeah I know, way too few, that's what I say all the time as well.");
break; case 5002205:cc(shelf,"are you an ambassador for that nonsense too");
break; case 5002206:cc(sprite_talk_aff," No no, I don't have personal interest in the trains, I just love my cat!");
break; case 5002207:cc(sprite_talk_aff," So, do you want coffee? No one should be tired around here! You should all be happy! Isn't technological advancement great?");
break; case 5002208:cc(sprite_talk_aff," Fossil fuels make the sky so gray and the planet so warm. We have to look for other, more HAPPY solutions! Great, right?");
break; case 5002209:cc(shelf,"Nah cars are the shit");
break; case 5002210:cc(sprite_talk_aff," Okay you love cars... I see... but you will love love LOVE trains! They're so good to commute in! We have a car shop over there where you can sell your car for a free all-year train ticket! You can only sell and not buy cars there. It's for a greater cause!");
break; case 5002211:cc(shelf,"sure you're not an ambassador for that nonsense?");
break; case 5002212:    	ts_end_from_talk(last_cut_before_talk);
break; case 5002301:cc(sprite_talk_1," A bitch sent me away, a bitch will drag me in.");
break; case 5002302:  ts_end_from_talk(last_cut_before_talk);
break; case 5002351:cc(sprite_talk_1," ");
break; case 5002352:  ts_end_from_talk(last_cut_before_talk);
break; case 5002401:cc(sprite_talk_2," they say i should cut my hair. that i should get a job. that i should leave my comfortable chair and get a proper education.");
break; case 5002402:cc(sprite_talk_2," but then i remind them, that i'm just a beaver. we don't have jobs.");
break; case 5002403:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5002451:cc(sprite_talk_2," just got home from work! my boss is SO... well, don't even get me started about it.");
break; case 5002452:cc(sprite_talk_2," that's right. a beaver with a job! bet you haven't heard that one before?");
break; case 5002453:  ts_end_from_talk(last_cut_before_talk);
break; case 5002501:cc(sprite_talk_3," Oh my god, you're going to Mrs Superconductor, the best best best cat in the world?? Say hi from me!!");
break; case 5002502:  ts_end_from_talk(last_cut_before_talk);
break; case 5002601:cc(sprite_talk_4," Mrs Superconductor? Yeah I've heard of her. She's cool. She got confidence AND looks. The whole package! Do you know if she's single?");
break; case 5002602:  ts_end_from_talk(last_cut_before_talk);
break; case 5002701:cc(sprite_talk_5," You're on a journey? To Mrs Superconductor? Oh, I envy your courage.. I would just freak out of star-struckedness... She's too hot to handle!!");
break; case 5002702:  ts_end_from_talk(last_cut_before_talk);
break; case 5002801:cc(sprite_talk_6," On your way to the magnet factory? Well.. Then all i can say is, good luck...");
break; case 5002802:  ts_end_from_talk(last_cut_before_talk);
break; case 5002901:cc(sprite_talk_7," don't trust everything they say about that cat. she got her flaws, even if I, a HUGE fan, hate to admit it.");
break; case 5002902:  ts_end_from_talk(last_cut_before_talk);
break; case 5003001:cc(sprite_talk_8," you think Adele is cool? think again!");
break; case 5003002:cc(sprite_talk_8," 1. he shits in his bed");
break; case 5003003:cc(sprite_talk_8," 2. he pisses his pants several times every day");
break; case 5003004:cc(sprite_talk_8," 3. he doesn't believe in the sun");
break; case 5003005:cc(sprite_talk_8," 4. he has no perception whatsoever of the third dimension");
break; case 5003006:cc(sprite_talk_8," 5. the list goes on and on and on! i hate him!");
break; case 5003007:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5003051:cc(sprite_talk_8," every time i go to the gym toilet, Adele is already there.");
break; case 5003052:cc(sprite_talk_8," how do i know it's him? he does pushups inside the bathroom, VERY loudly!");
break; case 5003053:cc(sprite_talk_8," and we're not talking minutes here. we're talking TWO minutes.");
break; case 5003054:cc(sprite_talk_8," you're supposed to just go in there, do your thing, and leave. how doesn't he know that?");
break; case 5003055:cc(sprite_talk_8," oh i could go on and on about the evolutionary mistake that is Adele... but i'll stop here.");
break; case 5003056:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5003101:cc(sprite_talk_9," I don't have any use of my muscle memory anymore... it's just crammed with pictures of Adele's biceps!");
break; case 5003102:  ts_end_from_talk(last_cut_before_talk);
break; case 5003151:cc(sprite_talk_9," I'm about to read books and lift kettlebells. And I'm all out of books!");
break; case 5003152:  ts_end_from_talk(last_cut_before_talk);
break; case 5003201:cc(sprite_talk_10," I'm having a beef with my newborn baby.");
break; case 5003202:  ts_end_from_talk(last_cut_before_talk);
break; case 5003301:cc(sprite_talk_11," Why do wives hate spontaneous unplanned roadtrips to the mountains on an indefinitive timespan with the boys? Because I love them!");
break; case 5003302:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5003401:cc(sprite_talk_12," Have you seen my Nintendo 64? I lost it September 11th, 2001.");
break; case 5003402:  ts_end_from_talk(last_cut_before_talk);
break; case 5003451:cc(sprite_talk_12," I wonder where my old GameBoy Advance is. Last place I saw it was at the border between Israel and Palestine.");
break; case 5003452:  ts_end_from_talk(last_cut_before_talk);
break; case 5003501:cc(sprite_talk_13," Such a strong bridge! I can't believe how it can carry so many cars that it does?!");
break; case 5003502:  ts_end_from_talk(last_cut_before_talk);
break; case 5003601:cc(sprite_talk_14," I like this place.");
break; case 5003602:  ts_end_from_talk(last_cut_before_talk);
break; case 5003701:cc(sprite_talk_15," Of this, I have only one thing to say. Bridge.");
break; case 5003702:  ts_end_from_talk(last_cut_before_talk);
break; case 5003801:cc(sprite_talk_16," I really like how high the bridge is.");
break; case 5003802:  ts_end_from_talk(last_cut_before_talk);
break; case 5003901:cc(sprite_talk_17," I don't know what this situation is, so I'm just saying something to test how it feels to say something. Sausage");
break; case 5003902:  ts_end_from_talk(last_cut_before_talk);
break; case 5004001:cc(sprite_talk_18," It's just a bridge and nothing else! Move on, everbody, nothing to see here!");
break; case 5004002:  ts_end_from_talk(last_cut_before_talk);
break; case 5004101:cc(sprite_talk_19," The new bridge is much prettier than the old one, which I also drove over a couple of time, before it unfortunately got torned down by a ship.");
break; case 5004102:  ts_end_from_talk(last_cut_before_talk);
break; case 5004201:cc(sprite_talk_20," Did you know 30 people have died travelling across this bridge?");
break; case 5004202:  ts_end_from_talk(last_cut_before_talk);
break; case 5004301:cc(sprite_talk_21," Very nice, very nice bridge.");
break; case 5004302:  ts_end_from_talk(last_cut_before_talk);
break; case 5004401:cc(sprite_talk_22," Truly a beautiful bridge that has a safe place in my heart.");
break; case 5004402:  ts_end_from_talk(last_cut_before_talk);
break; case 5004501:cc(sprite_talk_23," Fuck this bridge!!");
break; case 5004502:  ts_end_from_talk(last_cut_before_talk);
break; case 5004601:cc(sprite_talk_24," Wanna sztay ze night? Fifti dalar pliesze. *throws cigarette into grass so it starts burning*");
break; case 5004602:cc(sprite_talk_24," Sze place may be filld with ghost. Just zo you know");
break; case 5004603:cc(sprite_talk_24," But also, you can pay fifti dalar to kill ghost *throws cigarette into the fridge*");
break; case 5004604:cc(sprite_talk_24," In zse room there is computer but no clean platezs.");
break; case 5004605:cc(sprite_talk_24," I don't have place for milk in fridge because I put my cigarettes and golonka thiere. thats why there isz so many milk package in hallway.");
break; case 5004606:cc(sprite_talk_24," No problem for me, but other complain. Many zwedish tourists here who doesnt undersztand Polish culture.");
break; case 5004607:cc(sprite_talk_24," Zo, you wanna sztay ze night?");
break; case 5004608:cc(sprite_talk_24," We have big problem with drunk norwegian athletes here. Ozherwise, no problemz.");
break; case 5004609:cc(sprite_talk_24," We also have crazy guys riding on BMX outszide at naight, but i promise you they are veri nize.");
break; case 5004610:cc(sprite_talk_24," You can chieck out sze skatepark late at night if you like skating and BMX. Creepy 80 year old polish guy will show you.");
break; case 5004611:cc(sprite_talk_24," Also iz et okay if I smoke outzide your room all night? Ok thank you veri much.");
break; case 5004612:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5004651:cc(sprite_talk_24," We had to cloez ze hotel.");
break; case 5004652:  ts_end_from_talk(last_cut_before_talk);
// lagg han i the richest?
//cut__5004701
//g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
//if (g>=0&&g<0.15)	cc(sprite_talk_25, "bump it bump it! hey, why'd you let my fist hang in the air like that? bump it!");
//else if (g>=0.15&&g<0.3)cc(sprite_talk_25, "want a redbull vodka shot? here, take it!");
//else if (g>=0.3&&g<0.45)cc(sprite_talk_25, "drink! drink! drink! hahaa just kidding, you're allowed to do it in your own pace.");
//else if (g>=0.45&&g<0.6)cc(sprite_talk_25, "bring in more shots! hahaha you're wild, man! never stop being you! you're crazy with the drinks man, take it easy haha!");
//else if (g>=0.6&&g<0.75)cc(sprite_talk_25, "you wanna see a magic trick? haha just kidding, i don't know any.");
//else if (g>=0.75&&g<0.9)cc(sprite_talk_25, "hey, it's always drink o'clock somewhere! that's what we say back in miami, haha!");
//else if (g>=0.9&&g<1)	cc(sprite_talk_25, "bump it, bump it, bump it! *moves his fist towards you*");
//CODE: ts_end_from_talk(last_cut_before_talk);
break; case 5004801:cc(sprite_talk_26," It's actually not called Haftlan. It's called _Haftlan-Drakh_. Not as small of a difference as you could think!");
break; case 5004802:cc(sprite_talk_26," \"Haftlan\" is just the tourist name. The name Haftlan-Drakh goes back centuries, before the place was actually dark.");
break; case 5004803:cc(sprite_talk_26," Even the old Norwegians used to do pilgrimages to Haftlan-Drakh in order to get valuable spices and fabrics.");
break; case 5004804:cc(sprite_talk_26," But that's not the most interesting part of it all, bec-");
break; case 5004805:  ts_end_from_talk(last_cut_before_talk);
break; case 5004901: if (cutscene_talk_27_seen === true) cut = 5004941;
else cc(sprite_talk_27, "Greetings, peasant. We are the Council of Beavers.");
break; case 5004902:cc(sprite_talk_28," The Council of Beavers consists of 31 beavers, who all vote on who should die this week, and then we collectively execute the chosen one.");
break; case 5004903:cc(sprite_talk_29," Each one of the beavers has a group of 8 mentors assigned to it.");
break; case 5004904:cc(sprite_talk_30," And every mentor has 8 advisors assigned to it.");
break; case 5004905:cc(sprite_talk_31," And every advisor has 10 cookie houses assigned to it.");
break; case 5004906:cc(sprite_talk_32," A cookie house is just what it sounds like; A house with nothing but a single cookie in it.");
break; case 5004907:cc(sprite_talk_33," Our weekly execution is broadcasted on Japanese TV every thursday 9 o'clock.");
break; case 5004908:cc(sprite_talk_34," But because we're so many beavers, it's hard to capture us all in the same shot. That's why you need an extra wide TV to watch the show.");
break; case 5004909:cc(sprite_talk_35," Whenever the final decision is made, we all suck the juice out of a lemon each, and wash our teeth with a candy string.");
break; case 5004910:cc(sprite_talk_36," Then we all smash the table in affect at the exact same time, and THAT'S when the gilloutin drops.");
break; case 5004911:cc(sprite_talk_37," Don't we get wet from the blood spill? Glad you asked. No, we don't, because we all stand behind a big wall of hardened glass.");
break; case 5004912:cc(sprite_talk_38," Every week, there's a new beaver pushing the button. It gets the honor to put on the sexy black lace glove, to symbolize the important assignment, and then do the job.");
break; case 5004913:cc(sprite_talk_39," Shit, I forgot what I'm supposed to say.");
break; case 5004914:cc(sprite_talk_40," And because of that, that's not needed anymore. I promise this would make sense if the beaver before me said his line.");
cutscene_talk_27_seen = true;
break; case 5004915:  ts_end_from_talk(last_cut_before_talk);
break; case 5004941: cc(sprite_talk_27, "I can't wait to perform the next decapitation!!");
break; case 5004942:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5008101:cc(sprite_talk_59," I'm thinking of starting a men's club with only me and a bunch of girls.");
break; case 5008102:  ts_end_from_talk(last_cut_before_talk);
break; case 5008151:cc(sprite_talk_59," I'm really in the mood for some pandcakes now.");
break; case 5008152:cc(sprite[2],"Pandcakes? What's that?");
break; case 5008153:cc(sprite_talk_59," Should me and you tell him?");
break; case 5008154:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5008201:cc(sprite_talk_60," not a chance 'Epper has had sex with his wife. they've AT MOST emailed.");
break; case 5008202:  ts_end_from_talk(last_cut_before_talk);
break; case 5008251:cc(sprite_talk_60," who are you, and what have you done to 'Epper?");
break; case 5008252:  ts_end_from_talk(last_cut_before_talk);
break; case 5008301:cc(sprite_talk_61," wanna come in for some long rice? i've dragged them out");
break; case 5008302:cc(sprite_talk_61," or some sliced soup?");
break; case 5008303:ccS("... ", " can someone take me out of this conversation");
break; case 5008304:cc(sprite_talk_61," frozen of course");
break; case 5008305:cc(sprite_talk_61," don't worry, they won't melt. my house is always below the freezing point");
break; case 5008306:  ts_end_from_talk(last_cut_before_talk);
break; case 5008401:cc(sprite_talk_62," How do you send money from Nigeria to Mexico? Just asking.");
break; case 5008402:  ts_end_from_talk(last_cut_before_talk);
break; case 5008501:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_63, "DJ Zanzibae? Never heard of him.");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_63, "Lion? Yeah, that's a dog-like animal.");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_63, "Wanna buy my latest vinyl? *hands over a cassette tape*");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_63, "I live and breathe music.");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_63, "Music? Yeah, I occasionally listen to it.");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_63, "There's only one DJ in this town, and that's ME.");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_63, "Songs? Yeah, I've played them.");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_63, "The Beatles? My favorite solo act ever.");
else if (g>=0.8&&g<0.9)	cc(sprite_talk_63, "My house? Yeah, I live outside of it.");
else if (g>=0.9&&g<1)	cc(sprite_talk_63, "Wife? Yeah, she's my husband.");
break; case 5008502:  ts_end_from_talk(last_cut_before_talk);
break; case 5008601:
g = pseudorandom(player.position.x+player.position.z+player.rotation.y+player.position.y+Math.floor(frame_counter*0.003));
if (g>=0&&g<0.1)	cc(sprite_talk_64, "I'm allergic to bullshit.");
else if (g>=0.1&&g<0.2)	cc(sprite_talk_64, "I like a good conversation. But I only talk with my fists!!");
else if (g>=0.2&&g<0.3)	cc(sprite_talk_64, "I fucken' hate bears. What do they want??");
else if (g>=0.3&&g<0.4)	cc(sprite_talk_64, "I never say more than 8 words in a phone call.");
else if (g>=0.4&&g<0.5)	cc(sprite_talk_64, "I always bet on black in roulette.");
else if (g>=0.5&&g<0.6)	cc(sprite_talk_64, "I love my country. But I don't make a big thing of it!");
else if (g>=0.6&&g<0.7)	cc(sprite_talk_64, "If you leave a concert without an headache, it wasn't a concert.");
else if (g>=0.7&&g<0.8)	cc(sprite_talk_64, "In the 80s there was REAL music. Unlike what's on the radio now...");
else if (g>=0.8&&g<1)	cc(sprite_talk_64, "If your pickup truck isn't bigger than your house, then why do you even have a pickup truck?");
break; case 5008602:  ts_end_from_talk(last_cut_before_talk);
break; case 5008701:cc(sprite_talk_65," I chop wood. I mow lawns. I drive cars. Yes, I'm a DAD.");
break; case 5008702:cc(sprite_talk_65," We still exist. Yet we still are ignored.");
break; case 5008703:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5008801:cc(sprite_talk_66," I'm bus terminally ill!");
break; case 5008802:cc(sprite_talk_66," I'm hella bussin' though!");
break; case 5008803:cc(sprite_talk_66," I'm involved in (human) bus traffic(king).");
break; case 5008804:  ts_end_from_talk(last_cut_before_talk);
break; case 5008851:cc(sprite_talk_66," Did you know the song \"Bus Shaped Man\" by ZZ Top is about me?");
break; case 5008852:cc(sprite_talk_66," I didn't, until I said it right now.");
break; case 5008853:  ts_end_from_talk(last_cut_before_talk);
// maste ha troja pa sig!
break; case 5008901:cc(sprite_talk_67," What do you think of my shirt?");
break; case 5008902:ccS("it looks good ", " it's a shirt");
break; case 5008903:cc(sprite_talk_67," You think? Here, take it! ");
break; case 5008904:ccS("oh, i'm fine ", " no thanks");
break; case 5008905:cc(sprite_talk_67," You don't want it?");
break; case 5008906:ccS("nah i'm fine ", " not really");
break; case 5008907:cc(sprite_talk_67," Okay, be that kind of guy then. I thought you liked my shirt.");
break; case 5008908:  ts_end_from_talk(last_cut_before_talk);
break; case 5009001:cc(sprite_talk_68," Look at my beautiful sculpture! I've made it myself!");
break; case 5009002:ccS("it looks nice ", " ok");
break; case 5009003:cc(sprite_talk_68," Take it! It's all yours!");
break; case 5009004:ccS("nah i'm good actually ", " nah i'm fine");
break; case 5009005:cc(sprite_talk_68," Don't you want it? Do you think my sculpture is ugly?");
break; case 5009006:ccS("no i said it looked nice. i just don't want it ", " no i don't think it's ugly");
break; case 5009007:cc(sprite_talk_68," So you hate me?");
break; case 5009008:ccS("what? don't you understand anything of what i just said? ", " ...");
break; case 5009009:cc2(sprite_talk_68," What I don't understand, is ungratefulness. ", " You are really ungrateful.");
break; case 5009010:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5009101:cc(sprite_talk_69," Tonight! Drive-in cinema! On a full-size GameBoy screen!");
break; case 5009102:  ts_end_from_talk(last_cut_before_talk);
break; case 5009151:cc(sprite_talk_69," Wanna scroll some social media on my brand new ultra-wide and mega-big cinema screen? 3D, of course.");
break; case 5009152:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5009201:cc(sprite_talk_70," Welcome to DOGERTS.CAR.WASH! Our deal, pay 10 dollars, wash as much as you want!");
break; case 5009202:cc(sprite_talk_70," Except if your name is Hårass. Then there is a fixed limit.");
break; case 5009203:  ts_end_from_talk(last_cut_before_talk);
break; case 5009251:cc(sprite_talk_70," Welcome to DOGERTS.CAR.WASH! Pay 10 dollars, wash for 10 minutes!");
break; case 5009252:cc(sprite_talk_70," We used to do \"pay 10 dollars, wash as much as you want!\", but we had to stop because of the water shortage.");
break; case 5009253:cc(sprite_talk_70," To answer your question. Yes, the water shortage is caused by Hårass' washing machines.");
break; case 5009254:  ts_end_from_talk(last_cut_before_talk);
break; case 5009301:cc(sprite_talk_71," madhjfjdvbnjhfbhwefwhfhbdjhkfvnbdfhbjhrgytsguifhdvbdhfvbgdyrgry");
break; case 5009302:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5009351:cc(sprite_talk_71," KAFKAFKAFKAFKJDSJSDKJDJNF");
break; case 5009352:  ts_end_from_talk(last_cut_before_talk);
break; case 5009401:cc(sprite_talk_72," Here once lived the programmer and entrepreneur John Lowe.");
break; case 5009402:cc(sprite_talk_72," At the height of his career, he invented the popular file converter tool \"OnlineConverter\".");
break; case 5009403:cc(sprite_talk_72," Sadly, he soon started to spiral away to become a raging racist and conspiracy blogger.");
break; case 5009404:cc(sprite_talk_72," At 42, he unfortunately died during one of his online surfing sessions.");
break; case 5009405:cc(sprite_talk_72," He may be dead, but his online converter will live forever.");
break; case 5009406:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5009501:cc(sprite_talk_73," The beauty of a woman's curves can't even be explained by a graph calculator...");
break; case 5009502:  ts_end_from_talk(last_cut_before_talk);
break; case 5009551:cc(sprite_talk_73," Ah, the lovely past! When cars looked like a mix of trains and tractors and only Nazis drove them.");
break; case 5009552:  ts_end_from_talk(last_cut_before_talk);
break; case 5009601:cc(sprite_talk_74," My conversation tangents are so big that I have a butler welcoming people out of the parenthesis.");
break; case 5009602:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5009651:cc(sprite_talk_74," You wanted something?");
break; case 5009652:ccS("Yes ", " No");
break; case 5009653:cc2(sprite_talk_74," ... Talk to the hand, cause the face won't listen. *puts up hand towards you* ", " Well, then have a WONDERFUL day! Cool car, by the way!");
break; case 5009701:cc(sprite_talk_75," what up capy");
break; case 5009702:cc(sprite_talk_76," hella drip");
break; case 5009703:cc(sprite_talk_75," driiip");
break; case 5009704:cc(sprite_talk_76," and what about the chicks");
break; case 5009705:cc(sprite_talk_75," nah. been a dryspell last century");
break; case 5009706:cc(sprite_talk_76," we need to re-moisturize");
break; case 5009707:cc(sprite_talk_75," ye. drip.");
break; case 5009708:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5009751:cc(sprite_talk_75," maaaan i'm starving for pussy");
break; case 5009752:cc(sprite_talk_76," same");
break; case 5009753:cc(sprite_talk_75," ye");
break; case 5009754:cc(sprite_talk_76," drip");
break; case 5009755:cc(sprite_talk_75," fucking DRIP");
break; case 5009756:cc(sprite_talk_76," HELL yeah!");
break; case 5009757:cc(sprite_talk_75," swag");
break; case 5009758:cc(sprite_talk_76," swag");
break; case 5009759:cc(sprite_talk_75," that's it");
break; case 5009760:cc(sprite_talk_76," absolutely");
break; case 5009761:cc(sprite_talk_75," driiiiiip");
break; case 5009762:  ts_end_from_talk(last_cut_before_talk);
break; case 5009801:cc(sprite_talk_76," what up bara");
break; case 5009802:cc(sprite_talk_75," what up capy");
break; case 5009803:cc(sprite_talk_76," drip");
break; case 5009804:cc(sprite_talk_75," driiiip");
break; case 5009805:cc(sprite_talk_76," lookin drippy today man");
break; case 5009806:cc(sprite_talk_75," drip as fuck");
break; case 5009807:cc(sprite_talk_76," drip");
break; case 5009808:cc(sprite_talk_75," hey i think someone is listening to us talking. maybe we should go and talk somewhere else");
break; case 5009809:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5009851:cc(sprite_talk_76," wanna go lie in tall grass?");
break; case 5009852:cc(sprite_talk_75," yep");
break; case 5009853:cc(sprite_talk_76," that's drip man");
break; case 5009854:cc(sprite_talk_75," drip");
break; case 5009855:cc(sprite_talk_76," driiiiip");
break; case 5009856:cc(sprite_talk_75," you look drip today");
break; case 5009857:cc(sprite_talk_76," true words coming from the drippiest dude of them all");
break; case 5009858:cc(sprite_talk_75," who");
break; case 5009859:cc(sprite_talk_76," you");
break; case 5009860:cc(sprite_talk_75," driiip");
break; case 5009861:cc(sprite_talk_76," drip");
break; case 5009862:  ts_end_from_talk(last_cut_before_talk);
break; case 5009901:cc(sprite_talk_77," hi");
break; case 5009902:cc(shelf,"wow so cute!");
break; case 5009903:cc(sprite_talk_77," what about now");
break; case 5009904:cc(shelf,"ew. now you're just a normal bunny");
break; case 5009905:cc(sprite_talk_77," so you like me when i'm like that but not like this? fuck you!");
break; case 5009906:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5009951:cc(sprite_talk_77," ^^");
break; case 5009952:cc(shelf,"hey");
break; case 5009953:cc(sprite_talk_77," oh. it's you.");
break; case 5009954:cc(shelf,"???");
break; case 5009955:cc(sprite_talk_77," you don't remember? you harassed my pride!");
break; case 5009956:cc(shelf,"No, I don't remember.");
break; case 5009957:  ts_end_from_talk(last_cut_before_talk);
break; case 5010001:cc(sprite_talk_78," Yeah, I'm a short king. What you have in your legs, I have up here. *points at head*");
break; case 5010002:cc(sprite_talk_78," But I also need a surgery for my legs because they're so freakin' short.");
break; case 5010003:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5010051:cc(sprite_talk_78," Magnetic leg-lengtheners really do the trick.");
break; case 5010052:cc(shelf,"for what?");
break; case 5010053:cc(sprite_talk_78," *does a push-up* They lengthen the legs.");
break; case 5010101:cc(sprite_talk_79," Just standing here, watching the fire.");
break; case 5010102:cc(sprite_talk_79," That's one hell of a flame, brother.");
break; case 5010103:  ts_end_from_talk(last_cut_before_talk);
break; case 5010201:cc(sprite_talk_80," Life is precious. ... Don't waste it.");
break; case 5010202:cc(sprite_talk_80," When it comes to driving, I like to be slow. That way I appreciate the beauty while I pass it by.");
break; case 5010203:cc(sprite_talk_80," It's not about the speed, it's about the control you have over the car. And how you enjoy the ride.");
break; case 5010204:  ts_end_from_talk(last_cut_before_talk);
// den maste forsvinna efter repliken
break; case 5010301:cc(sprite_talk_81," Hey!! Marry me!! I need a green card!!");
break; case 5010302:ccS("uh... okay ", " uh... no");
break; case 5010303:cc2(sprite_talk_81," Wow you really want to?? Luckily, I'm a preast!! And we are now man!! Andi!! Wife!! MARRIED! ", " Be a bummer then.");
break; case 5010304:cc2(sprite_talk_81," See ya!! I'm off to New York to become an actress!! ", " Guess I'll never be able to go to America to fulfill my actress dreams then.");
break; case 5010305:  ts_end_from_talk(last_cut_before_talk);
break; case 5010401:cc(sprite_talk_82," Do you know what time it is?");
break; case 5010402:cc(sprite_talk_82," It's burpees o'clock!");
break; case 5010403:  ts_end_from_talk(last_cut_before_talk);
// when
break; case 5010451:cc(sprite_talk_82," Wait a minute, I'm almost done!");
break; case 5010452:cc(sprite_talk_82," 497...");
break; case 5010453:cc(sprite_talk_82," 498...");
break; case 5010454:cc(sprite_talk_82," 499...");
break; case 5010455:ccS("Wow, almost there! ", " 499 is enough.");
break; case 5010456:cc2(sprite_talk_82," 500! ", " *stops* I'm satisfied with 499. Good job, me.");
break; case 5010457:cc(sprite_talk_82," You can use the machine now. I'm done with it.");
break; case 5010458:  ts_end_from_talk(last_cut_before_talk);
break; case 5010501:cc(sprite_talk_83," I was in Denmark once. We mountain-climbed on a slightly tilting rice field and ate disgusting sausages.");
break; case 5010502:  ts_end_from_talk(last_cut_before_talk);
break; case 5010601:cc(sprite_talk_84," I'm an attorney, you know. High class attorney for the biggest clients.");
break; case 5010602:cc(sprite_talk_84," But I'm stuck in this pool right now so I don't get very much done.");
break; case 5010603:  ts_end_from_talk(last_cut_before_talk);
break; case 5010701:cc(sprite_talk_85," Did you know that geese actually CAN drive cars?");
break; case 5010702:cc(sprite_talk_85," But they're just too afraid to do it.");
break; case 5010703:  ts_end_from_talk(last_cut_before_talk);
break; case 5010801:cc(sprite_talk_86," I'm thinking of joining a content house.");
break; case 5010802:  ts_end_from_talk(last_cut_before_talk);
break; case 5010901:cc(sprite_talk_87," Tonight, the house is aaaall mine!! No parents complaining that the music is too high! No teachers, no principles, NO RULES!");
break; case 5010902:cc(sprite_talk_87," but... PSST! There may be some girls... So... get ready for that.");
break; case 5010903:cc(shelf,"you live by yourself, right?");
break; case 5010904:cc(sprite_talk_87," Yes, I live by myself. This is my apartment for the last 10 years.");
break; case 5010905:  ts_end_from_talk(last_cut_before_talk);
// maste se ut som en 40-aring
break; case 5011001:cc(sprite_talk_88," School sucks!! God, my friends are sooo annoying! And don't even get me started on the teachers...");
break; case 5011002:cc(sprite_talk_88," Can't they just all leave me alone?");
break; case 5011003:  ts_end_from_talk(last_cut_before_talk);
break; case 5011101:cc(sprite_talk_89," What if they stop selling Orangia?");
break; case 5011102:ccS("orangia? ", " Orangia? My favorite juice? Well I hope they don't!");
break; case 5011103:cc2(sprite_talk_89," It's my favorite juice! But what if they just stop selling it out of nowhere?! ", " It's your favorite juice too?! God I hope they don't stop selling it.");
break; case 5011104:ccS("yeah... why would they do that? ", " ");
break; case 5011105:cc(sprite_talk_89," I don't know!!");
break; case 5011106:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5011201:cc(sprite_talk_90," I'm just one year old, but I already have severe depression from being a functional opioid addict for seven years.");
break; case 5011202:  ts_end_from_talk(last_cut_before_talk);
break; case 5011251:cc(sprite_talk_90," Life is rough, man.");
break; case 5011252:cc(sprite_talk_90," But I got you, at least. I got you, brother.");
break; case 5011253:cc(sprite_talk_90," Hey, why are you slowly walking backwards? Trying to moonwalk? Get back here!");
break; case 5011254:ccS("of course. ", " no. i'm gonna continue moonwalking my way out of this baby capybara responsibility");
break; case 5011255:cc2(sprite_talk_90," Thanks for the support, man. Life is a struggle. But it's worth every damn fight. ", " I thought you had my back. I thought you had my back, man.");
break; case 5011256:  ts_end_from_talk(last_cut_before_talk);
// han maste se acklig ut! det �r hårass, mission completed.
break; case 5011401:cc(sprite_talk_92," Wanna get vaccinated?!");
break; case 5011402:cc(sprite_talk_92," I can fix it for you!");
break; case 5011403:cc(sprite_talk_92," Why are you so shy?? Gimme your arm so I can vaccinate you!!");
break; case 5011404:  ts_end_from_talk(last_cut_before_talk);
// lagg till en massa bebisar
break; case 5011501:cc(sprite_talk_93," We're partying!!");
break; case 5011502:  ts_end_from_talk(last_cut_before_talk);
break; case 5011601:cc(sprite_talk_94," At L'Amour De Pommes Frites, we serve the finest fries and nuggs, all made on the same oven plate!");
break; case 5011602:cc(sprite_talk_94," We specialize on food that can be made on oven plates, and then just poured over to the customer's plate, without all the hassle.");
break; case 5011603:cc(sprite_talk_94," For dessert, there is cereal without milk. Or nuggets again!");
break; case 5011604:cc(sprite_talk_94," We obviously serve no sauce to the food, so don't worry about that one. That problem is all taken care of for you!");
break; case 5011605:cc(sprite_talk_94," Oh, and I almost forgot to mention that we are fully sponsored by 'Epper, and that we support him in everything he does! Go 'Epper! 'Epper for prez! Go go go!");
break; case 5011606:  ts_end_from_talk(last_cut_before_talk);
break; case 5011701:cc(sprite_talk_95," Where's your 'pard, sir?");
break; case 5011702:ccS("what? ", " It's right here behind me, fine mister. Didn't thou see my pard?");
break; case 5011703:cc2(sprite_talk_95," I assume you want to park your 'pard before you enter the club? ", " Splendid, sir. Remember that you must park your 'pard before you enter the club.");
break; case 5011704:ccS("what club? ", " Of course. Of that I am well aware.");
break; case 5011705:cc2(sprite_talk_95," This is The Richest, a very exclusive club. If you haven't heard about it, it's not a club for you. ", " Perfect. Then, welcome to The Richest!");
break; case 5011706:ccS("trick question. when was the richest founded? ", " The Richest, I see. What kind of club is it?");
break; case 5011707:cc2(sprite_talk_95," 1812. ", " My young hamster, I think you have come to the wrong neighborhood if you're asking me that question.");
break; case 5011708:ccS("damn! ", " you're wrong. fuck you");
break; case 5011709:  ts_end_from_talk(last_cut_before_talk);
break; case 5011801:cc(sprite_talk_96," Become fit an mindful with magnets! And you thought it wasn't possible? Think again!");
break; case 5011802:cc(sprite_talk_96," You see this magnetic solarium-like booth I'm lying in? It's not corroding my skin at all!");
break; case 5011803:cc(sprite_talk_96," By just doing this 22 hours per day, you'll become healthy in both mind AND body!");
break; case 5011804:cc(sprite_talk_96," There's only one small catch. You kind of have to be made of iron for the magnetism to work on you.");
break; case 5011805:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5011901:cc(sprite_talk_97," Magnets have existed for 8 million years. Why all the fuzz about it NOW?");
break; case 5011902:  ts_end_from_talk(last_cut_before_talk);
break; case 5011951:cc(sprite_talk_97," I don't have many years left. Just gonna stand here until it's all over.");
break; case 5011952:  ts_end_from_talk(last_cut_before_talk);
break; case 5012001:cc(sprite_talk_98," This is our new song, \"Cars are cringe\".");
break; case 5012002:  ts_end_from_talk(last_cut_before_talk);
break; case 5012101:cc(sprite_talk_99," Do you like our jazz/fusion/bossanova/horrorcore/magnettrainsareawesome/mathcore sound?");
break; case 5012102:  ts_end_from_talk(last_cut_before_talk);
break; case 5012201:cc(sprite_talk_100," I've dabbled in guitars, drums, you name it. But right now I play the rusty iron pipe.");
break; case 5012202:  ts_end_from_talk(last_cut_before_talk);
break; case 5012301:cc(sprite_talk_101," I'm married to Santa Claus!");
break; case 5012302:cc(sprite_talk_102," But we're thinking of divorce.");
break; case 5012303:cc(sprite_talk_101," Yeah, that's true... But Nissen, what will happen to our children then?");
break; case 5012304:cc(sprite_talk_103," We're 40. We'll be fine.");
break; case 5012305:cc(sprite_talk_102," *wide santa smile*");
break; case 5012306:  ts_end_from_talk(last_cut_before_talk);
break; case 5012401:cc(sprite_talk_102," Welcome to Nissen & Rudolph's soda brewery, The first successful collaboration between a santa and a reindeer!");
break; case 5012402:cc(sprite_talk_101," We're very successful.");
break; case 5012403:cc(sprite_talk_102," Yeah. So successful. Don't even doubt it for one second. Want a soda?");
break; case 5012404:cc(sprite_talk_101," Nissen, I can't believe we're finally having a customer!!");
break; case 5012405:cc(sprite_talk_102," Rudolph, you ruined it again.");
break; case 5012406:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5012501:cc(sprite_talk_103," We're 40.");
break; case 5012502:  ts_end_from_talk(last_cut_before_talk);
break; case 5012551:cc(sprite_talk_103," We're 41.");
break; case 5012552:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5012601:cc(sprite_talk_104," I'm actually only 39 and a half, but it doesn't really matter in the bigger picture.");
break; case 5012602:  ts_end_from_talk(last_cut_before_talk);
break; case 5012651:cc(sprite_talk_104," I'm 42.");
break; case 5012652:  ts_end_from_talk(last_cut_before_talk);
break; case 5012701:cc(sprite_talk_105," Gah, you're all so two-dimensional!");
break; case 5012702:cc(shelf,"Being two-dimensional is refined and simplified. You get closer to the essense of it all.");
break; case 5012703:cc(sprite_talk_105," But you miss the depth that I have.");
break; case 5012704:  ts_end_from_talk(last_cut_before_talk);
// horace engdahl
break; case 5012801:cc(sprite_talk_106," Did you know, that I'm pretty well known in Sweden? *clears throat loudly*");
break; case 5012802:  ts_end_from_talk(last_cut_before_talk);
break; case 5012901:cc(sprite_talk_107," Hey, shelf! I'm you! From another timeline!");
break; case 5012902:cc(shelf,"*gasp*!");
break; case 5012903:cc(sprite_talk_107," I'm just kidding. I'm you from the _same_ timeline.");
break; case 5012904:cc(shelf,"B-but... how?");
break; case 5012905:cc(sprite_talk_107," You know... I'm you, before you became you!");
break; case 5012906:cc(shelf,"M-me?");
break; case 5012907:cc(sprite_talk_107," Yes, that's true. I am you. Nice to meet you, me.");
break; case 5012908:cc(shelf,"P-pleasant to meet you too, me. (this is so weird, OMG!!)");
break; case 5012909:  ts_end_from_talk(last_cut_before_talk);
break; case 5013001:cc(sprite_talk_108," I'm Hårass!!");
break; case 5013002:cc(sprite_talk_108," I was born for this conversation!! Let's fucking go!!!");
break; case 5013003:cc(sprite_talk_108," *prepares for the conversation by taking a deep breath*");
break; case 5013004:cc(sprite_talk_108," *faints from exhaustion*");
break; case 5013005:  ts_end_from_talk(last_cut_before_talk);
break; case 5013101:cc(sprite_talk_109," Hårass!!");
break; case 5013102:cc(sprite_talk_109," HåRASS HåRASS HåRASS HåRASS!!");
break; case 5013103:cc(sprite_talk_109," I'M HIS BROTHER!!");
break; case 5013104:cc(sprite_talk_109," HAHAHAHHAHAHAH WE'RE ALL SO ANNOYING, THAT'S KIND OF OOUURR TTHHIINNGGGGG!!!!!!! WHAAAAAAA!!");
break; case 5013105:  ts_end_from_talk(last_cut_before_talk);
break; case 5013201:cc(sprite_talk_110," Have you seen Mrs Superconductor? She's such a catanova...");
break; case 5013202:cc(sprite_talk_110," I've heard she owns as many as 5 of the 6 only magnet trains in the world... I want to ride one so bad!!");
break; case 5013203:cc(sprite_talk_110," Oh my god, I'm just like her, I can't stop talking about magnet trains...");
break; case 5013204:  ts_end_from_talk(last_cut_before_talk);
break; case 5013301:cc(sprite_talk_111," Meow meow");
break; case 5013302:cc(sprite_talk_111," *purr*");
break; case 5013303:cc(sprite_talk_111," *tries to scratch you but barely reaches you and looks very cute doing iy*");
break; case 5013304:cc(sprite_talk_111," Meeeooow");
break; case 5013305:cc(sprite_talk_111," *washes her fur*");
break; case 5013306:cc(sprite_talk_111," Meow meow meow meow!");
break; case 5013307:cc(sprite_talk_111," I LOVE MRS SUPERCONDUCTOR SO MUCH!!");
break; case 5013308:  ts_end_from_talk(last_cut_before_talk);
// (harass snodde dem)
break; case 5013401:cc(sprite_talk_112," There used to be lots of planes here. Because, you know, it's an airport!");
break; case 5013402:cc(sprite_talk_112," But some white guy just came here and took them!");
break; case 5013403:cc(sprite_talk_112," It's always the white ones!");
break; case 5013404:  ts_end_from_talk(last_cut_before_talk);
break; case 5013501:cc(sprite_talk_113," Whenever there's just one other person on the bus, I make it clear that I'm not going to be that annoying person that randomly sits down right beside them.");
break; case 5013502:cc(sprite_talk_113," By sitting in their lap, I make that very clear.");
break; case 5013503:  ts_end_from_talk(last_cut_before_talk);
break; case 5013601:cc(sprite_talk_114," i hate that cat. she's always so nice and welcoming and enthusiastic and curious.");
break; case 5013602:  ts_end_from_talk(last_cut_before_talk);
break; case 5013701:cc(sprite_talk_115," So, you're interested in the finest beverages of them all? i got all sorts of sewage water for the gentleman!");
break; case 5013702:cc(sprite_talk_115," this one is especially good. it's sewage water from the beautiful district of Île Saint-Louis in Paris! 5 stars!");
break; case 5013703:cc(sprite_talk_115," Or you could try this peculiar high-class sewage water from the hip, up and coming areas of Brooklyn, New York! Edgy, thrilling, refreshing!");
break; case 5013704:cc(sprite_talk_115," Maybe you're more of a simple type of person, then I would recommend this locally produced ecological sewage water made in my own toilet at my home! You don't get more local than this!");
break; case 5013705:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5013801:cc(sprite_talk_116," In this world, a year is one day long.");
break; case 5013802:  ts_end_from_talk(last_cut_before_talk);
break; case 5013851:cc(sprite_talk_116," Here's a little positional update. You're at story moment #" + (last_cut_before_talk) + ".");
break; case 5013852:cc(sprite_talk_116," Which means that you're " + (CUT_CUTSCENE_ENDING_YOU-last_cut_before_talk) + " story moments away from beating the game.");
break; case 5013853:cc(sprite_talk_116," That doesn't really mean anything, but I said it anyway.");
break; case 5013854:  ts_end_from_talk(last_cut_before_talk);
// gor dem i olika farger
// lat spelaren valja baba
// de ska ha en egen baba song!
break; case 5013901:cc(sprite_talk_117," I'm Baba Blue.");
break; case 5013902:cc(sprite_talk_118," I'm Baba Yellow.");
break; case 5013903:cc(sprite_talk_119," I'm Baba Brown.");
break; case 5013904:cc(sprite_talk_120," I'm Baba Purple.");
break; case 5013905:cc(sprite_talk_117," We Babas come in all shapes and forms. Blue, yellow, brown and purple. Bear shape.");
break; case 5013906:cc(sprite_talk_118," You can choose any one of us as your \"representative Baba\".");
break; case 5013907:cc(sprite_talk_119," Your representative Baba will watch over you and your spirit, and make sure your life journey goes well.");
break; case 5013908:cc(sprite_talk_120," It will also take care of you when you're sick, and watch over your children when you don't get the life puzzle together.");
break; case 5013909:ccS("I think I'll choose Baba Blue. ", " Next one, please");
break; case 5013910:cc2(sprite_talk_117," YES! ", " Meh... ");
break; case 5013911:ccS("Baba Yellow seems nice... I'll go with the yellow one! ", " Next one, please");
break; case 5013912:cc2(sprite_talk_118," YES! ", " Meh... ");
break; case 5013913:ccS("My choice is Baba Brown! ", " Next one, please");
break; case 5013914:cc2(sprite_talk_119," YES! ", " Meh... ");
break; case 5013915:ccS("Baba Purple, I choose you! ", " I want none of them.");
break; case 5013916:cc2(sprite_talk_120," YES! ", " Meh... ");
break; case 5013917:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5013951:cc(sprite_talk_117," Baba bobo. Baba baba baba baba. Baba baba bobo baba.");
break; case 5013952:cc(sprite_talk_118," He got AIDS.");
break; case 5013953:  ts_end_from_talk(last_cut_before_talk);
break; case 5014301:cc(sprite_talk_121," You smell like Hårass. Can you move 15 meters that way, please?");
break; case 5014302:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5014351:cc(sprite_talk_121," Hårass is really EXACTLY the same in person as his public image.");
break; case 5014352:cc(sprite_talk_121," No false facades there.");
break; case 5014353:  ts_end_from_talk(last_cut_before_talk);
 
//when
break; case 5014401:  cc(sprite_talk_122, "Geese, is it already " + Math.floor(frame_counter/FRAMES_PER_HOUR) + " o'clock...? ");
break; case 5014402:  cc(sprite_talk_122, Math.floor(frame_counter/FRAMES_PER_HOUR) + "... Surely one of the big 24!");
break; case 5014403:  ts_end_from_talk(last_cut_before_talk);
break; case 5014451:cc(sprite_talk_122," You're at \"second\" " + (frame_counter) + " right now.");
break; case 5014452:cc(sprite_talk_122," Isn't it weird that the sun goes down into the ocean at sunset?");
break; case 5014453:  ts_end_from_talk(last_cut_before_talk);
break; case 5014501:cc(sprite_talk_123," Shit! It's so windy up here!!");
break; case 5014502:ccS("ok. do you like it? ", " then why did you go up here?");
break; case 5014503:cc2(sprite_talk_123," OF COURSE i do?! ", " Because it's so windy!");
break; case 5014504:  ts_end_from_talk(last_cut_before_talk);
break; case 5014601:cc(sprite_talk_124," Where did you put the child?");
break; case 5014602:cc(sprite_talk_125," Not a clue.");
break; case 5014603:  ts_end_from_talk(last_cut_before_talk);
break; case 5014701:cc(sprite_talk_125," Hmmm... I think I should start a podcast.");
break; case 5014702:cc(sprite_talk_124," Have you seen the child?");
break; case 5014703:  ts_end_from_talk(last_cut_before_talk);
// ska man kunna kopa?
break; case 5014801:cc(sprite_talk_126," Welcome to Haftlan's Souvenir Shop! Here's what we're selling today!");
break; case 5014802:cc(sprite_talk_126," 1. 1 kg dark matter (10 dark dollars)");
break; case 5014803:cc(sprite_talk_126," 2. 1 m3 normal darkness (20 dark dollars)");
break; case 5014804:cc(sprite_talk_126," 3. Gloves with extra padding (100 dark dollars)");
break; case 5014805:cc(sprite_talk_126," 4. Random fruits from my backyard (3 dark dollars)");
break; case 5014806:cc(sprite_talk_126," 5. Perfectly preserved cruising ship from the 1970s (17 000 dark dollars)");
break; case 5014807:cc(sprite_talk_126," Have a dark day!");
break; case 5014808:  ts_end_from_talk(last_cut_before_talk);
break; case 5014901:cc(sprite_talk_127," Since the dark web came, I've had to make my dark auctions smaller and smaller.");
break; case 5014902:cc(sprite_talk_127," They're just playing dark games all day so they have no time for auctions anymore... I mean the kids.");
break; case 5014903:cc(sprite_talk_127," It doesn't matter that I've handcrafted all these dark ornaments with my bare dark hands.");
break; case 5014904:cc(sprite_talk_127," No one wants to financially support an old retired dark sculptor these days...");
break; case 5014905:  ts_end_from_talk(last_cut_before_talk);
break; case 5015001:cc(sprite_talk_128," \"Dark matter\" is short for \"Dark Gandalf doesn't matter\".");
break; case 5015002:  ts_end_from_talk(last_cut_before_talk);
break; case 5015101:cc(sprite_talk_129," If you work against your own body weight instead of against these machines, you both minimize the injury risk and maximize the chick possibility.");
break; case 5015102:cc(sprite_talk_129," Excuse me, but I have to do 20x300 one-handed push ups now.");
break; case 5015103:cc(sprite_talk_129," *does a push up*");
break; case 5015104:cc(sprite_talk_129," *does a second push up*");
break; case 5015105:cc(sprite_talk_129," *does a third push up*");
break; case 5015106:cc(sprite_talk_129," *does a fourth push up*");
break; case 5015107:cc(sprite_talk_129," *does a fifth push up*");
break; case 5015108:cc(sprite_talk_129," *does a sixth push up*");
break; case 5015109:cc(sprite_talk_129," *does a seventh push up*");
break; case 5015110:cc(sprite_talk_129," *does an eighth push up*");
break; case 5015111:cc(sprite_talk_129," *does a ninth push up*");
break; case 5015112:cc(sprite_talk_129," I did 9.");
break; case 5015113:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5015151:cc(sprite_talk_129," Have you tried the position \"The Crow\"?");
break; case 5015152:cc(shelf,"I have, but not in relation to workout.");
break; case 5015153:cc(sprite_talk_129," It's a good start for when you're learning to stand on your hands.");
break; case 5015154:cc(sprite_talk_129," If you're not careful with the handstanding, you can swim!");
break; case 5015155:cc(sprite_talk_129," But I mean, that's a story too.");
break; case 5015156:  ts_end_from_talk(last_cut_before_talk);
break; case 5015201:cc(sprite_talk_130," Your files are pretty big, right? Like 3 megs? 5 gigs? Shit like that, bitch?");
break; case 5015202:cc(sprite_talk_130," Well then I have the webpage for you. OnlineConverter. It converts your files to all possible formats imaginable and also compresses them to small and tidy sizes!");
break; case 5015203:cc(sprite_talk_130," How about THAT?");
break; case 5015204:cc(sprite_talk_130," You're also having problems with your WAV's right? Wann'em as MP3's? I know the issue waaay to well.");
break; case 5015205:cc(sprite_talk_130," Luckily, I've got the website just for you. OnlineConverter, again!");
break; case 5015206:cc(sprite_talk_130," It's not very convenient, and it doesn't have any specific features that other pages just have.");
break; case 5015207:cc(sprite_talk_130," It's kind of like all the other sites but a little little bit worse! How about THAT?");
break; case 5015208:  ts_end_from_talk(last_cut_before_talk);
break; case 5015301:cc(sprite_talk_131," Oh my god, I'm so glad you came! I've got some sausage water left from last night's sausage dinner and I just couldn't throw it away...");
break; case 5015302:cc(sprite_talk_131," You'll take it, right?");
break; case 5015303:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5015351:cc(sprite_talk_131," Oh man, I'm so glad you're here! So, I met this girl, and it kinda worked, and so on, and now I kind of have a baby and I can't just throw it away...");
break; case 5015352:cc(sprite_talk_131," You'll take it, right?");
break; case 5015353:  ts_end_from_talk(last_cut_before_talk);
// hur kommer dg hit
break; case 5015401:cc(sprite_talk_132," I've heard that Dark Gandalf is gay! Can you confirm the rumors?");
break; case 5015402:cc(sprite[1],"No comments.");
break; case 5015403:cc(sprite_talk_132," I've heard that there were gay moans all over Haftlan-Drakh last night. Is it true?!");
break; case 5015404:cc(sprite[1],"No comments.");
break; case 5015405:cc(sprite_talk_132," I'm starting to see a pattern... When you say \"no comments\" you really mean \"I confirm\"... So, Dark Gandalf confirmed homo sapiens?");
break; case 5015406:  ts_end_from_talk(last_cut_before_talk);
break; case 5015451:cc(sprite_talk_132," I think I know your great great grandmother! Was her name \"Anki\"?");
break; case 5015452:ccS("yes! ", " no.");
break; case 5015453:cc2(sprite_talk_132," So it actually ARE you! Next time you meet her, tell her I said \"HI!!!\" ", " Oh, then I'm confusing you with another ugly guinea pig.");
break; case 5015454:  ts_end_from_talk(last_cut_before_talk);
//cut__5015501
//sprite_talk_133: I've heard your carclub is going down in FLAMES! Any comments?
//_shelf: no comments | it's true!
//dg: No comments.
//_sprite_talk_133: No comments? Sad. | I knew it.
//sprite_talk_133: I've heard it's because of the new HORRIBLE gas tax regulations! Is it true?!!
//dg: No comments.
//sprite_talk_133: Hey, man, I can't just write \"no comments\". You have to give me something! I'm the news guy!
//dg: No comments.
//a: Me and dark gandalf are going to the stripclub later, you can write that!
//CODE: ts_end_from_talk(last_cut_before_talk);
break; case 5015551:cc(sprite_talk_133," I've heard your carclub is going down in FLAMES! Any comments?");
break; case 5015552:ccS("no comments ", " You'll have to talk to Dark Gandalf, the official dark lord of the club, for comments.");
break; case 5015553:cc2(sprite_talk_133," I think I've seen you somewhere. Can't remember where. Or why. ", " But he always says \"no comments\"!");
break; case 5015554:  ts_end_from_talk(last_cut_before_talk);
// han ska bara dyka upp efter att dogert har dott!
break; case 5015601:cc(sprite_talk_134," I've heard that Dogert died! You have any juicy facts about it??");
break; case 5015602:cc(sprite[1],"In times like this, we as friends and family need some time to think.");
break; case 5015603:cc(sprite_talk_134," I've heard that it was you who drove him to death. With your cars.");
break; case 5015604:cc(sprite[1],"We will have a look at that internally, and if needed restructure our routines.");
break; case 5015605:cc(sprite_talk_134," I've heard that you drive very slow with your cars and that that was the thing that drove him dead.");
break; case 5015606:cc(sprite[1],"We strongly deny that statement. Also, just a quick thing, can you take the picture of me from the elbows and above?");
break; case 5015607:cc(sprite_talk_134," There won't be any picture for this article. just a quick notice at the side.");
break; case 5015608:cc(sprite[1],"Oh, okay.");
break; case 5015609:  ts_end_from_talk(last_cut_before_talk);
break; case 5015701:cc(sprite_talk_135," Don't tell the owner of the house that i live in this leaf pile.");
break; case 5015702:cc(sprite_talk_135," And also don't tell her about the intricate and vibrating society I've built in the ground below his yard.");
break; case 5015703:cc(shelf,"society?");
break; case 5015704:cc(sprite_talk_135," We're inventing the cure of cancer down there. Not to cure cancer, but because we think it will taste really good.");
break; case 5015705:cc(shelf,"that's evil, and cool");
break; case 5015706:cc(sprite_talk_135," Evil, cool. What's the difference?");
break; case 5015707:cc(sprite_talk_135," I also drive a website where I upload daily satirical comic strips.");
break; case 5015708:cc(shelf,"i will never visit it");
break; case 5015709:cc(sprite_talk_135," One time, they had to install 5 new servers the same day because my website's popularity made the web hall crash.");
break; case 5015710:cc(sprite_talk_135," I guess my satirical comic strips are just that \"on point\".");
break; case 5015711:  ts_end_from_talk(last_cut_before_talk);
break; case 5015801:cc(sprite_talk_136," Tired of your cars? LEMME CRUSH EM");
break; case 5015802:cc(sprite[2],"No, I don't want you to! Stop intimidating me!");
break; case 5015803:cc(sprite_talk_136," I WANNA CRUSH THEM");
break; case 5015804:cc(sprite[0],"Guys, wait... How do we do when our cars break, and... we have to trash them?");
break; case 5015805:cc(sprite[0],"Like, what happens to us...?");
break; case 5015806:cc(sprite[1],"We... uhm...");
break; case 5015807:cc(sprite[0],"Since we... and, you know... the cars...");
break; case 5015808:cc(sprite[2],"Daddy: We don't talk about that.");
break; case 5015809:cc(sprite_talk_136," LEMME CRUSH YOUR CARS");
break; case 5015810:cc(sprite[2],"We're not in the mood for being crushed right now, you peculiar little monster.");
break; case 5015811:cc(sprite[1],"Mr crusher, are you by any means related to Dogert?");
break; case 5015812:cc(sprite_talk_136," What? Does it look like I have DOTS BETWEEN MY WORDS? DIDN'T THINK SO!");
break; case 5015813:cc(sprite[1],"Okay, sorry, I just ask-");
break; case 5015814:cc(sprite_talk_136," Yeahi, I'm his brother.");
break; case 5015815:cc(sprite[1],"I thought so.");
break; case 5015816:cc(sprite_talk_136," LEMME CRUSH YOUR CARS");
break; case 5015817:  ts_end_from_talk(last_cut_before_talk);
// ar ett hus, leder till en side story, ska vara osynlig
// daddy ska do genom att aka ner i ett hal
break; case 5015901:cc(sprite[3],"WELCOME.AND.PISS.OFF.TO.THE.GOVERNMENT. THIS.IS.WHOS.THAT.DOGERT.");
break; case 5015902:cc(sprite[4],"Who's! That! Dogert!");
break; case 5015903:cc(sprite[2],"Who's!! That!! Dogert!!");
break; case 5015904:cc(sprite[1],"Who's!!! That!!! Dogert!!!");
break; case 5015905:cc(sprite[3],"YOU.WILL.ANSWER.THE.QUESTIONS.I.ASK. THEY.ARE.ABOUT.FUNNY.THINGS.LIKE.CARS.AND.MURDER.");
break; case 5015906:cc(sprite[3],"IF.YOU.KNOW.THE.ANSWER.SAY.YOUR.NAME. AND.DONT.BE.SILLY.ABOUT.IT");
break; case 5015907:cc(sprite[1],"Hell yeah, bring it on, Dogert!");
break; case 5015908:cc(sprite[3],"WHO.ARE.THE.BEST.CARS.MECHANIC.IN.WORLDS?");
break; case 5015909:cc(sprite[2],"Daddy! It's Do-");
break; case 5015910:cc(sprite[3],"NO.IT.IS.NOT.YOU.DADDY. YOU.ARE.DISQUALIFIED.FOR.EVER.");
break; case 5015911:cc(sprite[2],"No, your misunderstanding. I just said my name to indicate that I wanted to answer. My real answer was Doger-");
break; case 5015912:cc(sprite[3],"YOUR.PENALTY.IS.TO.BE.KILLED.FOREVER. AS.A.JOKE.OBVIOUSLY.");
break; case 5015913:cc(sprite[3],"OKAY.NOW.YOU.OTHER.MORONS.WILL.ANSWER.");
break; case 5015914:cc(sprite[4],"Who's! That! Dogert!");
break; case 5015915:cc(sprite[1],"Who's!!! That!!! Dogert!!!");
break; case 5015916:cc(sprite[3],"WHAT.IS.THE.MOST.IMPORTANT.PART.OF.THE.CAR. ANSWER.QUICKLY.OR.ELSE.");
break; case 5015917:cc(sprite[1],"Dark gandalf! The wheels, maybe?");
break; case 5015918:cc(sprite[3],"NO.ITS.NOT.THE.WHEELS. PLEASE.DONT.SAY.ANYTHING.AGAIN.FOR.THE.REST.OF.THE.TWO.COMING.WEEKS.");
break; case 5015919:cc(sprite[4],"O'Malley! Is it the car?");
break; case 5015920:cc(sprite[3],"YES.ITS.THE.CAR. NOW.ITS.TIME.FOR.THE.NEXT.VERY.FUNNY.ROUND.");
break; case 5015921:cc(sprite[4],"Who's! That! Dogert!");
break; case 5015922:cc(sprite[1],"Who's!!! That!!! Dogert!!!");
break; case 5015923:cc(sprite[3],"WHY.IS.I.THE.BEAUTIFUL.CAR.MECHANIC.");
break; case 5015924:cc(sprite[1],"Dark Gandalf! It's because you're Dogert! Simply amazing, simply beautiful, beautifully simple - The amazing Dogert!");
break; case 5015925:cc(sprite[3],"YES.ITS.CORRECT. NOW.ITS.TIME.FOR.ME.TO.FIX.FIVE.CARS.AT.THE.SAME.TIME. ITS.IMPORTANT.TO.HAVE.CARS.BECAUSE.THE.ROADS.DONT.LIKE.BEING.ALONE.");
break; case 5015926:cc(sprite[4],"Who's! That! Dogert!");
break; case 5015927:cc(sprite[1],"Who's!!! That!!! Dogert!!!");
break; case 5015928:  ts_end_from_talk(last_cut_before_talk);
// hur kom dark gandalf dit, varfor ar han dar
// han gar och gommer sig bakom en soptunna?
break; case 5016001:cc(sprite[1],"Oh! Hi!");
break; case 5016002:ccS("hi darkie. you seem nervous ", " what are you doing here");
break; case 5016003:cc2(sprite[1],"Nervous? What? No, that sounds... not right. What are you talking about? ", " Ehm... I'm just checking out the town!");
break; case 5016004:ccS("why are you just standing there? ", " you're really checking out this beauty salon a lot");
break; case 5016005:cc2(sprite[1],"Isn't it a beautiful day to just stand still, at the middle of a town... or something? ", " Uhhh... What? Beauty salon? Oh, you mean the beauty salon I'm standing next to!");
break; case 5016006:cc2(sprite[1],"But now I kind of have to... go... ", " It's cool, I guess! I don't have much to say about it!");
break; case 5016007:cc2(sprite[1],"I was on my way to something else, but got distracted by this... town. ", " I was on my way to somewhere else and happened to stop here!");
break; case 5016008:cc(shelf,"on your way to what? | so where were you going?");
break; case 5016009:cc(sprite[1],"I kind of have to go now, so... See ya.");
break; case 5016010:  ts_end_from_talk(last_cut_before_talk);
break; case 5016101:cc(sprite[5],"Hey, look at this ad! \"Looking for love\"! Haha!");
break; case 5016102:cc(sprite[5],"\"You are a creature that loves skeletons, washing machines and not being gay\". Wait, is this like the perfect person?");
break; case 5016103:cc(sprite[5],"\"You like to wake up every morning screaming of anger and of love at the same time?\" Uhm, it's LITERALLY me they're searching for!");
break; case 5016104:cc(sprite[5],"\"You are a person who causes everyone immense pain, just out of your own sheer joy.\" Du-uh?! Of course!");
break; case 5016105:cc(sprite[1],"What's the name of the advertiser?");
break; case 5016106:cc(sprite[5],"Name... it says: Hå- Never mind. What were you saying, O'Malley?");
break; case 5016107:  ts_end_from_talk(last_cut_before_talk);
// gor bradgard
break; case 5016201:cc(sprite_talk_140," Ring... Ring...");
break; case 5016202:cc(sprite[4],"ooh so many pretty planks. i want a really long one!");
break; case 5016203:cc(sprite[4],"because then i can cut it into shorter pieces. i'm not really sure what to build right now, but it's good to be prepared for anything!");
break; case 5016204:cc(sprite[4],"right now building things is my main project. there are other important things to prepare for, like spinal disc herniation and such, but that's for later.");
break; case 5016205:cc(sprite[4],"the problem is, that the long plank won't fit in my car. or, maybe it will, but it will look really silly when it sticks out of the back of the car.");
break; case 5016206:cc(sprite[4],"i'm also afraid that it will hit the cars behind me. maybe they don't know how close the plank is to their car?");
break; case 5016207:cc(sprite[4],"maybe i could put yellow tape around it, so they see it better?");
break; case 5016208:cc(sprite[4],"i'm overthink this, right? god, i can't even buy wood without getting an existential crisis...");
break; case 5016209:cc(sprite[4],"enough thinking! now i'm going to BUY THE PLANK. no more hassle.");
break; case 5016210:cc(sprite[4],"...");
break; case 5016211:cc(sprite[4],"i'm right now realizing that i don't know how i came in to this place. so i don't know how to go out of it.");
break; case 5016212:cc(sprite[4],"there seems to be three exists out of this timber yard. what if one of them leads to an office or something? how embarassing...");
break; case 5016213:cc(sprite[4],"seems like i will be sleeping on a timber yard tonight!");
break; case 5016214:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_141: 
break; case 5016301:cc(sprite[4],"nothing");
break; case 5016302:  ts_end_from_talk(last_cut_before_talk);
// pa en bar
break; case 5016401:cc(sprite_talk_142," Ring... Ring...");
break; case 5016402:cc(sprite[1],"Cheers, comrade!");
// l�gg till glass sound!
break; case 5016403:cc(sprite[1],"Do you remember when we used to do this after every philosophy lesson?");
break; case 5016404:cc(sprite[8],"Haha, IF i remember? Of course I do!");
break; case 5016405:cc(sprite[8],"Times were different back then...");
break; case 5016406:cc(sprite[1],"The chicks were different back then.");
break; case 5016407:cc(sprite[8],"Yeah, weren't they much younger?");
break; case 5016408:cc(sprite[1],"Maybe... I still think they're pretty young. But perhaps that has more to do with which girls I'm hanging around?");
break; case 5016409:cc(sprite[8],"Yeah, Darkie, it does. You have to let the chicks' age follow your own age, if you know what i mean.");
break; case 5016410:cc(sprite[1],"But... Shouldn't you just look for girls in the same MENTAL age as yourself?");
break; case 5016411:cc(sprite[8],"Too bad for me... I feel like 45!");
break; case 5016412:cc(sprite[1],"You ARE 45, Polish.");
break; case 5016413:cc(sprite[8],"Yeah i know. I feel it mentally, and physically.");
break; case 5016414:cc(sprite_talk_142," Aaaand here's the two orange sodas for the gentlemen!");
break; case 5016415:cc(sprite[8],"Dzi�ki!");
break; case 5016416:cc(sprite[1],"Cheers for another year of friendship!");
break; case 5016417:  ts_end_from_talk(last_cut_before_talk);
// daddy ar i ett bas. hur kom han dit
//sprite_talk_144:
break; case 5016601:cc(sprite[2],"Daddy: Hey Shelf! Look at my interesting magnet idea!");
break; case 5016602:cc(shelf,"what? Are you one of these?");
break; case 5016603:cc(sprite[2],"no, i actually just snuck into this booth.");
break; case 5016604:cc(shelf,"how?");
break; case 5016605:cc(shelf,"like, when the person who has here went to the toilet, or what?");
break; case 5016606:cc(sprite[2],"kicked him in the forehead and smacked a magnet into his skull");
break; case 5016607:cc(shelf,"oh. The good old combo-trombo");
break; case 5016608:cc(shelf,"you may go to jail");
break; case 5016609:cc(sprite[2],"well, who may NOT?");
break; case 5016610:cc(shelf,"that's true");
break; case 5016611:cc(sprite[2],"by the way, my magnet idea is that we continue to use them pretty much as we already do.");
break; case 5016612:cc(shelf,"most refreshing proposal of today.");
break; case 5016613:cc(sprite[2],"cheers for that, partner.");
break; case 5016614:cc(shelf,"uh. Cheers. *shelf lämnar*");
break; case 5016615:  ts_end_from_talk(last_cut_before_talk);
// nar sker denna. efter killepper? den kanske inte behover en position
//sprite_talk_145:
break; case 5016701:cc(sprite[0],"Hey Shelf, I don't... like, I don't do steroids.");
break; case 5016702:cc(shelf,"okay?");
break; case 5016703:cc(sprite[0],"I just make bombs out of them. And drop them on sharks.");
break; case 5016704:cc(shelf,"... yes?");
break; case 5016705:cc(sprite[0],"I just wanted to tell you that! That i don't have steroid problems!");
break; case 5016706:cc(shelf,"great. most people don't");
break; case 5016707:cc(sprite[0],"But, you wanna know a secret?");
break; case 5016708:cc(shelf,"sure");
break; case 5016709:cc(sprite[0],"I actually HAVE problems. With steroids. Big problems!");
break; case 5016710:cc(shelf,"it felt like you were implying that");
break; case 5016711:cc(sprite[0],"Very big problems. VERY VERY VERY VERY big. *points towards his arms*");
break; case 5016712:cc(sprite[0],"See how big my problems are? *laughs*");
break; case 5016713:cc(shelf,"yeah they're AMAZING! (ironic)");
break; case 5016714:cc(sprite[0],"No, but seriously I have problems. Don't tell anyone!");
break; case 5016715:cc(sprite[0],"But PLEASE tell EVERYONE about my big guns! *laughs like a dad*");
break; case 5016716:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_146:
break; case 5016801:cc(sprite[5],"Hårass... Hårass... Hårass... Hårass *throws out different hårasses from his closet*");
break; case 5016802:cc(sprite[5],"which Hårass should i be today?");
break; case 5016803:  ts_end_from_talk(last_cut_before_talk);
// var har daddy sin intervju?
//sprite_talk_147:
break; case 5016901:cc(sprite[2],"shelf, do you have some time?");
break; case 5016902:cc(shelf,"yes?");
break; case 5016903:cc(sprite[2],"i want to interview you, if that's okay?");
break; case 5016904:cc(shelf,"why?");
break; case 5016905:cc(sprite[2],"writing material. research. you know, i'm always building characters and stories");
break; case 5016906:cc(shelf,"yes. i know that.");
break; case 5016907:cc(shelf,"are you releasing stories though?");
break; case 5016908:cc(sprite[2],"i would say it like this: there are a lot of work behind the craft of writing. you can't just release anything. it has to mean something for people before you call something a book.");
break; case 5016909:cc(shelf,"other writers release stuff all the time.");
break; case 5016910:cc(sprite[2],"yes, but they are \"other writers\". i'm Daddy. i'm not like the other ones.");
break; case 5016911:cc(sprite[2],"but this isn't important. what's important here is YOU. what's your story?");
break; case 5016912:cc(shelf,"i don't really have one. i'm just a hamster in a car");
break; case 5016913:cc(sprite[2],"Stop it! EVERYONE has a story! Somewhere deep inside!");
break; case 5016914:cc(sprite[2],"Let me phrase it like this: What did your parents do for a living?");
break; case 5016915:cc(shelf,"my mom was a hamster in a wheelchair");
break; case 5016916:cc(sprite[2],"Interesting! Was that her job?");
break; case 5016917:cc(shelf,"yes, hamster. not wheelchair.");
break; case 5016918:cc(sprite[2],"Was... was she attached to her wheelchair? Like... you know, like how we are attached to our-");
break; case 5016919:cc(shelf,"you know we don't talk about this.");
break; case 5016920:cc(sprite[2],"R-right. Yes, of course.");
break; case 5016921:cc(sprite[2],"so, who was your dad?");
break; case 5016922:cc(shelf,"that's for the next interview, i think.");
break; case 5016923:cc(sprite[2],"next?");
break; case 5016924:cc(shelf,"you were going to do an interview series with me?");
break; case 5016925:cc(sprite[2],"no. no, just one");
break; case 5016926:cc(shelf,"oh, okay.");
break; case 5016927:cc(sprite[2],"do you think your mom's occupation as a hamster has affected you in any way?");
break; case 5016928:cc(shelf,"well, yes... i'm a hamster too. i'm affected in that way.");
break; case 5016929:cc(sprite[2],"interesting...");
break; case 5016930:cc(shelf,"and, she taught me to get over my attachment problems... you know, the thing we otherwise don't talk about...");
break; case 5016931:cc(sprite[2],"... yes, of course. so... so, you weren't always... uh, attached to your car?");
break; case 5016932:cc(shelf,".");
break; case 5016933:cc(sprite[2],"thanks for sharing, shelf. I told you everyone has a story! ) Please, keep on telling it and don't be shy about your story!");
break; case 5016934:  ts_end_from_talk(last_cut_before_talk);
// ocksa i harass hus, men vid en annan tidpunkt? kanske
//sprite_talk_148:
break; case 5017001:cc(sprite[5],"Hahaha, \"cringe compilation\"! I love these kind of videos!");
break; case 5017002:cc(sprite[5],"Ahahaha god he's so cringe!!");
break; case 5017003:cc(sprite[5],"wait, what's that white weird animal?");
break; case 5017004:cc(sprite[5],"uh... let's fast-forward to another clip, I didn't like that one");
break; case 5017005:cc(sprite[5],"don't like this either");
break; case 5017006:cc(sprite[5],"this cringe compilation has unusually many clips of me in it.");
break; case 5017007:cc(sprite[5],"Weird.");
break; case 5017008:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_149: 
break; case 5017101:cc(sprite[4],"guys! do you wanna play \"would you rather\"?");
break; case 5017102:cc(sprite[3],"I.WOULD.RATHER.DO.IT.YES.");
break; case 5017103:cc(sprite[8],"Sure, let's go!");
break; case 5017104:cc(sprite[3],"WOULD.YOU.RATHER.HAVE.PAIN.INSIDE.OF.YOU.");
break; case 5017105:cc(sprite[8],"*coughs in Polish*");
break; case 5017106:cc(sprite[4],"... or ...?");
break; case 5017107:cc(sprite[3],"OR.DIE.");
break; case 5017108:cc(sprite[8],"Hmm, I choose pain inside of me");
break; case 5017109:cc(sprite[4],"I'll go with die");
break; case 5017110:cc(sprite[3],"IM.DOGERT. THE.CAR.MECHANIC.");
break; case 5017111:cc(sprite[8],"yes");
break; case 5017112:cc(sprite[4],"so, would you rather eat shrimps every day of the rest of your life, or get punched in the balls once a month?");
break; case 5017113:cc(sprite[8],"Haha! I think i'll choose shrimps.");
break; case 5017114:cc(sprite[4],"yeah me too. shrimps");
break; case 5017115:cc(sprite[3],"SHRIMPS.OF.COURSE.");
break; case 5017116:cc(sprite[8],"My turn! Would you rather lose your Polish citizenship, or... stay a week in prison?");
break; case 5017117:cc(sprite[3],"YOU.WANNA.PLAY.MONOPOLY.?");
break; case 5017118:cc(sprite[4],"lose my polish citizenship of course, because i don't have one so i really don't care. and prison is bruuutal...");
break; case 5017119:cc(sprite[8],"You've been to prison, O'Malley?");
break; case 5017120:cc(sprite[3],"I.FEEL.PAIN.INSIDE.ME.RIGHT.NOW. I.THINK.ITS.THE.SODA.I.DRANK. IT.HAD.THE.FLAVOR.OF.POISON.");
break; case 5017121:cc(sprite[8],"Dogert. You say so many weird things. I don't even have time to react to them properly.");
break; case 5017122:cc(sprite[4],"I kinda feel the same about Dogert actually");
break; case 5017123:cc(sprite[3],"YOU.WANNA.PLAY.SEX.GAMES.?");
break; case 5017124:cc(sprite[8],"No, Dogert.");
break; case 5017125:  ts_end_from_talk(last_cut_before_talk);
break; case 5017201:cc(sprite_talk_150," Ring... Ring...");
break; case 5017202:cc(sprite[8],"*deep inhale on soap bubble pipe*");
break; case 5017203:cc(sprite[8],"My ideology is: Don't hurt others, be kind and brave.");
break; case 5017204:cc(sprite[1],"Mine is: Do it for the group. If you have an idea, share it. If you have food, share it. If you have food that is pancakes, eat it.");
break; case 5017205:cc(sprite[8],"Mmmm, pancakes! Now you got me thinking of delicious food...");
break; case 5017206:cc(sprite[1],"I love food. It tastes like candy.");
break; case 5017207:cc(sprite[8],"So, what's for dinner tomorrow?");
break; case 5017208:cc(sprite[1],"You're here tomorrow too?");
break; case 5017209:cc(sprite[8],"... Yeah?... Something weird with that?");
break; case 5017210:cc(sprite[1],"Oh no, not at all. Great that you'll be here tomorrow too. Very fun that you'll be staying for two days.");
break; case 5017211:cc(sprite[8],"I love that you think that! It's so fun here!");
break; case 5017212:cc(sprite[1],"So, dinner tomorrow... I think I'll make some kind of beef. And serve it with a glass of fresh milk. And some butter-drenched pasta.");
break; case 5017213:cc(sprite[8],"Yeah, I'm not sure if I'll like that.");
break; case 5017214:cc(sprite[1],"What, you don't like my food?");
break; case 5017215:cc(sprite[8],"It's not that.");
break; case 5017216:cc(sprite[1],"I thought you liked my food.");
break; case 5017217:cc(sprite[8],"... Everything you said comes from the cow!!");
break; case 5017218:cc(sprite[8],"Except for pasta that comes from reindeers, but the rest! Don't you know that i'm a cow?!");
break; case 5017219:cc(sprite[1],"Oh my god, sorry... I didn't think about that, Polish!");
break; case 5017220:cc(sprite[1],"Is there any way I can make it up for you? 200 dollars?");
break; case 5017221:cc(sprite[8],"Our friendship is really weird.");
break; case 5017222:cc(sprite[1],"Weird is good! Here's 200 dollars.");
break; case 5017223:cc(sprite[8],"... Thanks...");
break; case 5017224:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_151: 
break; case 5017301:cc(sprite[4],"oh no no no what if all animals went extinct?!!");
break; case 5017302:cc(sprite[1],"Say again?");
break; case 5017303:cc(sprite[4],"what would we do? can we prepare in some way??");
break; case 5017304:cc(sprite[8],"You're stressing over bullshit, O'Malley.");
break; case 5017305:cc(sprite[4],"yeah but what IF, it feels like i would get a lot of responsibility over the situation if that happened and i'm not ready for that");
break; case 5017306:cc(sprite[4],"like, what if the government were forced to recreate all the animals and they needed help and they asked me for some reason");
break; case 5017307:cc(sprite[4],"and that's only best case scenario. what if it's MUCH WORSE than that?");
break; case 5017308:cc(sprite[8],"Have you considered therapy, badger?");
break; case 5017309:cc(sprite[4],"yeah... that could be a good idea");
break; case 5017310:cc(sprite[1],"Or just get some pussy!");
break; case 5017311:cc(sprite[8],"Hahaha, high five!");
break; case 5017312:cc(sprite[1],"*high five*");
break; case 5017313:  ts_end_from_talk(last_cut_before_talk);
break; case 5017401:cc(sprite_talk_152," yeah, i don't know...");
break; case 5017402:cc(sprite_talk_152," it feels unoptimized");
break; case 5017403:cc(sprite_talk_152," oh hey, i didn't see you there. ya like my slave fort? ");
break; case 5017404:cc(sprite_talk_153," Can you let me out of this slave prison? I don't like being a slave! It's detrimental to my mental health!");
break; case 5017405:cc(sprite_talk_152," talk to the hand! *puts hand in front of her face*");
break; case 5017406:cc(sprite_talk_152," yeah... they are like that");
break; case 5017407:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5017451:cc(sprite_talk_152," I was supposed to be in the car club, you know...");
break; case 5017452:cc(sprite_talk_152," But Adele went with that gray dusty dude in the last minute.");
break; case 5017453:cc(sprite_talk_152," Haven't talked with him since.");
break; case 5017454:  ts_end_from_talk(last_cut_before_talk);
break; case 5017501:cc(sprite_talk_153," Ding Dong Ding Dong I'm the police car");
break; case 5017502:  ts_end_from_talk(last_cut_before_talk);
break; case 5017601:cc(sprite_talk_154," Innovation.");
break; case 5017602:cc(sprite_talk_154," Mindset.");
break; case 5017603:cc(sprite_talk_154," Communities.");
break; case 5017604:cc(sprite_talk_154," Sharing.");
break; case 5017605:cc(sprite_talk_154," Selling Stocks To Homeless Guys.");
break; case 5017606:cc(sprite_talk_154," Teamwork.");
break; case 5017607:cc(sprite_talk_154," Family.");
break; case 5017608:cc(sprite_talk_154," Goeff Pesos.");
break; case 5017609:cc(sprite_talk_154," Products.");
break; case 5017610:cc(sprite_talk_154," Blockchains.");
break; case 5017611:cc(sprite_talk_154," My Mom.");
break; case 5017612:cc(sprite_talk_154," Bus Stops.");
break; case 5017613:cc(sprite_talk_154," Ideas.");
break; case 5017614:  ts_end_from_talk(last_cut_before_talk);
break; case 5017701:cc(sprite_talk_155," Ring... Ring...");
break; case 5017702:cc(sprite[5],"are you ready for some ground-breaking ideas?");
break; case 5017703:cc(sprite[1],"What?");
break; case 5017704:cc(sprite[5],"a mixture of an iphone and an ipad. not small, not big, not medium, but somewhere in between small and a little less smaller than small.");
break; case 5017705:cc(sprite[1],"I hate it.");
break; case 5017706:cc(sprite[5],"a bed, but for the awake-times?");
break; case 5017707:cc(sprite[1],"No.");
break; case 5017708:cc(sprite[5],"pants but for gays?");
break; case 5017709:cc(sprite[1],"It already exists and it's called underpants.");
break; case 5017710:cc(sprite[5],"a keyboard, but it's a mouse?");
break; case 5017711:cc(sprite[1],"That's a mouse. ");
break; case 5017712:cc(sprite[5],"arrgh!!! back to the drawing board!!");
break; case 5017713:cc(sprite[1],"Can you stay there forever?");
break; case 5017714:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_156: 
break; case 5017801:cc(sprite[5],"Hårass' diary #8273");
break; case 5017802:cc(sprite[5],"just came back from the psych ward entrance exam. I got high score!!");
break; case 5017803:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_157: 
break; case 5017901:cc(sprite[5],"Hårass' diary #1362");
break; case 5017902:cc(sprite[5],"Daddy seems alright. Ugly as fouuuhck though. #hashtag");
break; case 5017903:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_158: 
break; case 5018001:cc(sprite[5],"Hårass' diary #912");
break; case 5018002:cc(sprite[5],"they say good things come to those who wait, but they never say anything about what comes to those who sleep in washing machines.");
break; case 5018003:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_159: 
break; case 5018101:cc(sprite[5],"Hårass' diary #913");
break; case 5018102:cc(sprite[5],"Dark Gandalf... sigh... Or, sorry, I mean \"Darchadais Marbdah\"!! Dark lord? Hah! Dark whore!!");
break; case 5018103:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_160:
break; case 5018201:cc(sprite[5],"Hårass' diary #1182");
break; case 5018202:cc(sprite[5],"just bought all washing machines in the world and stole all of Dark Gandalf's dark spoons.");
break; case 5018203:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_161: 
break; case 5018301:cc(sprite[5],"Hårass' diary #3");
break; case 5018302:cc(sprite[5],"i'm three days old now. what the FDHSSHDJ is this place?");
break; case 5018303:  ts_end_from_talk(last_cut_before_talk);
//sprite_talk_162: 
break; case 5018401:cc(sprite[5],"Hårass' diary #2418");
break; case 5018402:cc(sprite[5],"yesterday i posted a picture of my forehead on Facebook. today, they're inventing the dislike button, apparently.");
break; case 5018403:  ts_end_from_talk(last_cut_before_talk);
break; case 5018501:cc(sprite_talk_163," ");
break; case 5018502:  ts_end_from_talk(last_cut_before_talk);
break; case 5018601:cc(sprite_talk_164," I breath pure crypto.");
break; case 5018602:cc(sprite_talk_164," From morning to night, January to September, every year, it's just crypto all the way.");
break; case 5018603:ccS("What happens between September and December? ", " What's crypto?");
break; case 5018604:cc2(sprite_talk_164," Christmas vacation. ", " I honestly don't know.");
break; case 5018605:  ts_end_from_talk(last_cut_before_talk);
break; case 5018701:cc(sprite_talk_165," Hey, what's up");
break; case 5018702:ccS("not much ", " just strolling around, talking to people");
break; case 5018703:cc(sprite_talk_165," cool. What's your biggest weakness?");
break; case 5018704:ccS("It's that I rarely take other people's wishes and desires into considerations. ", " It's that I'm fat.");
break; case 5018705:cc(sprite_talk_165," Cool. My weakness is that my strengths are too strong.");
break; case 5018706:  ts_end_from_talk(last_cut_before_talk);
break; case 5018801:cc(sprite_talk_166," *takes off headphones* Yeah, you wanted something?");
break; case 5018802:ccS("No, it was YOU who started talking to ME! ", " Yeah, I just wonder, how do you get out of this world?");
break; case 5018803:cc2(sprite_talk_166," No need to get cocky around me, sir. ", " You can't. That's how worlds work.");
break; case 5018804:cc(sprite_talk_166," Okay, since you're just standing there looking weirdly at me, let me tell you my two cents about haircuts.");
break; case 5018805:cc(sprite_talk_166," You have two choices. BALD. Or early 2000s nu metal \"spikes\".");
break; case 5018806:cc(sprite_talk_166," Or, there's a third option too, it's to be a simple loser with no style.");
break; case 5018807:cc(sprite_talk_166," I'm done talking now.");
break; case 5018808:  ts_end_from_talk(last_cut_before_talk);
break; case 5018901:cc(sprite_talk_167," Nature has a certain order.");
break; case 5018902:cc(sprite_talk_167," Furthest down are the plants.");
break; case 5018903:cc(sprite_talk_167," Then come the animalae.");
break; case 5018904:cc(sprite_talk_167," Second to highest is the Man.");
break; case 5018905:cc(sprite_talk_167," Highest of all is me, Thy Great Philosopher.");
break; case 5018906:cc(sprite_talk_167," Slightly beneath that, is the seat of the sports car that I drive.");
break; case 5018907:cc(sprite_talk_167," I bought it myself! With my own money!");
break; case 5018908:  ts_end_from_talk(last_cut_before_talk);
break; case 5019001:cc(sprite_talk_168," nothing");
break; case 5019002:  ts_end_from_talk(last_cut_before_talk);
break; case 5019101:cc(sprite_talk_169," I am Math Master. I know everything.");
break; case 5019102:cc(sprite_talk_169," My analytical brain has analyzed you and concludes that you are a hamster.");
break; case 5019103:cc(sprite_talk_169," Average life length of hamsters is 29 years.");
break; case 5019104:ccS("But... I'm 28! ", " Luckily, I'm only 2 years old.");
break; case 5019105:cc2(sprite_talk_169," Math = death ", " Only 27 left.");
break; case 5019106:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5019151:cc(sprite_talk_169," *math sounds*");
break; case 5019152:cc(shelf,"give me some juicy math facts, math master!");
break; case 5019153:cc(sprite_talk_169," 1+1 = 2");
break; case 5019154:cc(shelf,"wow, such math");
break; case 5019155:cc(sprite_talk_169," I've been at a low point during the last month. Don't judge me.");
break; case 5019156:  ts_end_from_talk(last_cut_before_talk);
break; case 5019201:cc(sprite_talk_170," Calmness stresses me out.");
break; case 5019202:cc(sprite_talk_170," Every time I'm the slightest calm I freak out!");
break; case 5019203:  ts_end_from_talk(last_cut_before_talk);
break; case 5019301:cc(sprite_talk_171," My vision; A world full of toilets.");
break; case 5019302:cc(sprite_talk_171," Never more than 8 meters to the closest toilet.");
break; case 5019303:cc(sprite_talk_171," It's like a cellular phone net, but for toilets.");
break; case 5019304:  ts_end_from_talk(last_cut_before_talk);
break; case 5019401:cc(sprite_talk_172," Drain the ocean! Flatten all mountains! Empty the sky of air!");
break; case 5019402:cc(sprite_talk_172," And do it now!");
break; case 5019403:  ts_end_from_talk(last_cut_before_talk);
break; case 5019501:cc(sprite_talk_173," If you've tried to grab a milk package after eating potato chips, you know what true fear feels like.");
break; case 5019502:  ts_end_from_talk(last_cut_before_talk);
break; case 5019601:cc(sprite_talk_174," Bringing viking culture to the 21st century is hard. Especially the robbing and raping part.");
break; case 5019602:cc(sprite_talk_174," I'm not... really sure what the other parts are... But I'm sure there are some other parts.");
break; case 5019603:  ts_end_from_talk(last_cut_before_talk);
break; case 5019701:cc(sprite_talk_175," Ring... Ring...");
break; case 5019702:cc(sprite[4],"let's spread them out over the whole oven plate...");
break; case 5019703:cc(sprite[4],"they should be close to each other but not so close that they isolate away the heat...");
break; case 5019704:cc(sprite[4],"aaaaand... there they go into the oven! we'll put salt on them later.");
break; case 5019705:cc(sprite[4],"oh. maybe starting the oven is a good idea too.");
break; case 5019706:cc(sprite[4],"now they're going to get less crunchy surface, because they're under low heat for such a long time... darn it, why couldn't i remember starting it in time?");
break; case 5019707:cc(sprite[4],"or maybe they will get BOTH a well-cooked inside and outside by the long cooking time! not too bad, huh?");
break; case 5019708:cc(sprite[4],"but, too bad you can't see the degrees on this oven... i guess i'll have to put in my hand and feel how warm it is that way.");
break; case 5019709:cc(sprite[4],"so... what now? god, i hate the minutes between putting the fries into the oven and taking them out...");
break; case 5019710:cc(sprite[4],"it just feels so... empty. it's so depressing to wait for things...");
break; case 5019711:cc(sprite[4],"and you kind of can't start thinking of anything else, because your mind is way too stuck on fries.");
break; case 5019712:cc(sprite[4],"i guess i could call someone... but i would probably only be talking about fries, and people have told me they're tired of that.");
break; case 5019713:cc(sprite[4],"they say it's the only thing they even slightly dislike about me, but it's still annoying enough to almost break up with me.");
break; case 5019714:cc(sprite[4],"oh god, now they're getting burnt! time flies when i'm philosophizing by myself!!");
break; case 5019715:cc(sprite[4],"gladly, the dull 20 minutes went by quickly this time.");
break; case 5019716:cc(sprite[4],"but now i have a new problem: are the fries too burnt?");
break; case 5019717:cc(sprite[4],"maybe. maybe not. it's kind of hard to decide.");
break; case 5019718:cc(sprite[4],"i guess i'll have to eat them to see.");
break; case 5019719:cc(sprite[4],"*eats one fries*");
break; case 5019720:cc(sprite[4],"*smiles widely*");
break; case 5019721:cc(sprite[4],"they're perfect.");
break; case 5019722:cc(sprite[4],"oh, someone called? did i accidentally answer the phone while putting the fries into the oven?");
break; case 5019723:cc(sprite[4],"yeah it seems like that. *hangs up*");
break; case 5019724:  ts_end_from_talk(last_cut_before_talk);
break; case 5019801:cc(sprite_talk_176," Chicks rotate around me like an atmosphere.");
break; case 5019802:cc(sprite_talk_176," It's like a planetary system around me, dude! And I'm the SUN!");
break; case 5019803:cc(sprite_talk_176," Ha-HA! Give me some SPACE at the club, dude!");
break; case 5019804:  ts_end_from_talk(last_cut_before_talk);
break; case 5019901:cc(sprite_talk_177," Oh, hey.");
break; case 5019902:cc(sprite_talk_177," Just... Standing here.");
break; case 5019903:cc(sprite_talk_177," In the middle of... whatever this place is. Yep.");
break; case 5019904:cc(sprite_talk_177," Write about that one in the newspaper, bro.");
break; case 5019905:  ts_end_from_talk(last_cut_before_talk);
break; case 5020001:cc(sprite_talk_178," Yeah.");
break; case 5020002:cc(sprite_talk_177," He just stands there all day. Peeing.");
break; case 5020003:  ts_end_from_talk(last_cut_before_talk);
break; case 5020101:cc(sprite_talk_179," I'm Saville.");
break; case 5020102:  ts_end_from_talk(last_cut_before_talk);
break; case 5020201:cc(sprite_talk_180," Naked on Christmas? Of course.");
break; case 5020202:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5020251:cc(sprite_talk_180," Cows from Poland? Yeah, I'm in love with them.");
break; case 5020252:  ts_end_from_talk(last_cut_before_talk);
 
break; case 5020301:cc(sprite_talk_181," I have no sense of humour. You can do anything and I WON'T laugh.");
break; case 5020302:ccS("*fart* ", " tell a joke");
break; case 5020303:cc(sprite_talk_181," Haha! Okay that was pretty funny.");
break; case 5020304:  ts_end_from_talk(last_cut_before_talk);
break; case 5020401:cc(sprite_talk_182," It's official! I'm not nice anymore.");
break; case 5020402:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5020451:cc(sprite_talk_182," I have a hard time remembering what's left and right.");
break; case 5020452:cc(sprite_talk_182," And don't even get me started on up and down...");
break; case 5020453:  ts_end_from_talk(last_cut_before_talk);
break; case 5020501:cc(sprite_talk_183," What? This log?");
break; case 5020502:cc(sprite_talk_183," It's just a real-life size replica of my... you know.");
break; case 5020503:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5020551:cc(sprite_talk_183," Can you move a bit to the left? Me and my enormous log are trying to get through!");
break; case 5020552:  ts_end_from_talk(last_cut_before_talk);
break; case 5020601:cc(sprite_talk_184," The biggest tourist attraction in the area?");
break; case 5020602:cc(sprite_talk_184," Adele's biceps.");
break; case 5020603:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5020651:cc(sprite_talk_184," Are you gonna watch Just Beaver Things on TV tonight?");
break; case 5020652:cc(sprite_talk_184," They're going to decapitate my nephew, I'm sooo stoked!");
break; case 5020653:  ts_end_from_talk(last_cut_before_talk);
break; case 5020701:cc(sprite_talk_185," Did you see the leaked photos?");
break; case 5020702:cc(shelf,"of what?");
break; case 5020703:cc(sprite_talk_185," Of Adele not doing burpees! Such a scandal!");
break; case 5020704:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5020751:cc(sprite_talk_185," Stuff has really changed here at the gym since last time!");
break; case 5020752:cc(shelf,"no they haven't");
break; case 5020753:cc(sprite_talk_185," Haven't been here for a while. I'm not a gym guy anymore.");
break; case 5020754:cc(sprite_talk_185," I'm a bubble bath guy now.");
break; case 5020755:cc(sprite_talk_185," 5 hours a day, thanks for asking.");
break; case 5020756:cc(shelf,"don't you get all sweaty and red and mushy from bathing for so long?");
break; case 5020757:cc(sprite_talk_185," Yes.");
break; case 5020758:cc(sprite_talk_185," Yes, I get really sweaty and red and mushy.");
break; case 5020759:  ts_end_from_talk(last_cut_before_talk);
break; case 5020801:cc(sprite_talk_186," I have only 4 wishes in life.");
break; case 5020802:cc(sprite_talk_186," 1. A stable income.");
break; case 5020803:cc(sprite_talk_186," 2. A beautiful wife.");
break; case 5020804:cc(sprite_talk_186," 3. A monster truck.");
break; case 5020805:cc(sprite_talk_186," 4. That you should shut up.");
break; case 5020806:ccS("I didn't even say anything? ", " I'll give you all of them.");
break; case 5020807:  ts_end_from_talk(last_cut_before_talk);
break; case 5020901:cc(sprite_talk_187," So, what brings you here?");
break; case 5020902:ccS("what ", " what");
break; case 5020903:cc(sprite_talk_187," I mean, there's nothing to do! It's just a big red blocky... thing!");
break; case 5020904:cc(sprite_talk_187," I have no idea why I wanted to go here for vacation.");
break; case 5020905:  ts_end_from_talk(last_cut_before_talk);
// Jesus
break; case 5021001:cc(sprite_talk_188," is it easter yet??!");
break; case 5021002:cc(sprite_talk_189," please say it's easter soon!!");
break; case 5021003:cc(sprite_talk_190," we want it so bad!!");
break; case 5021004:  ts_end_from_talk(last_cut_before_talk);
break; case 5021301:cc(sprite_talk_191," You're going to Yuri's?");
break; case 5021302:cc(sprite_talk_191," Oh, I wish you the best of luck...");
break; case 5021303:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5021351:cc(sprite_talk_191," Yuri's had to close.");
break; case 5021352:cc(shelf,"Why?");
break; case 5021353:cc(sprite_talk_191," Mostly because of the occult stuff.");
break; case 5021354:cc(sprite_talk_191," ... and a bunch of non-occult stuff that were really disturbing too.");
break; case 5021355:  ts_end_from_talk(last_cut_before_talk);
break; case 5021401:cc(sprite_talk_192," I've heard the sun is gay with the moon.");
break; case 5021402:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5021451:cc(sprite_talk_192," What if someone kills TV\nWhat are we then gonna watch?");
break; case 5021452:  ts_end_from_talk(last_cut_before_talk);
break; case 5021501:cc(sprite_talk_193," Wanna party? I know the place. I know the people. I know it all.");
break; case 5021502:cc(sprite_talk_193," I have the best leverage of beverage in the whole weverage.");
break; case 5021503:cc(sprite_talk_193," Weverage is short for \"world\".");
break; case 5021504:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5021551:cc(sprite_talk_193," Wanna party? ");
break; case 5021552:ccS("Yes! ", " No!");
break; case 5021553:cc2(sprite_talk_193," I don't. ", " What are you? A monster?");
break; case 5021554:  ts_end_from_talk(last_cut_before_talk);
break; case 5021601:cc(sprite_talk_194," Nice weather, huh?");
break; case 5021602:cc(sprite_talk_194," Oh, you know Daddy, right? I see you drive around attached to your cars all day!");
break; case 5021603:cc(shelf,"We're not-");
break; case 5021604:cc(sprite_talk_194," I'm gonna star in his next movie!");
break; case 5021605:cc(shelf,"When is that movie coming out?");
break; case 5021606:cc(sprite_talk_194," From what I've heard, \"when the world is ready for it\".");
break; case 5021607:cc(shelf,"Ah. So never.");
break; case 5021608:cc(sprite_talk_194," I didn't say that!");
break; case 5021609:  ts_end_from_talk(last_cut_before_talk);
//when
break; case 5021651:cc(sprite_talk_194," Isn't the weather a bit darker nowadays?");
break; case 5021652:cc(sprite_talk_194," Wait, you're Daddy's friend, right?");
break; case 5021653:ccS("Yes! ", " Never heard the name.");
break; case 5021654:cc2(sprite_talk_194," Cool! I'm starring in his new movie! ", " Stop fooling around. You're Daddy's friend.");
break; case 5021655:cc2(sprite_talk_194," I play the troubled middle-aged man sitting in a dark coffe shop contemplating about life! ", " I'm starring in his new movie!");
break; case 5021656:cc(shelf,"Oh, so it's out already?");
break; case 5021657:cc(sprite_talk_194," No, it's not out yet. But soon!");
break; case 5021658:  ts_end_from_talk(last_cut_before_talk);
//cut__5021701
//sprite_talk_195: 
//CODE: ts_end_from_talk(last_cut_before_talk);
break; case 5021801:cc(sprite_talk_196," ");
break; case 5021802:  ts_end_from_talk(last_cut_before_talk);
break; case 5021901:cc(sprite_talk_197," ");
break; case 5021902:  ts_end_from_talk(last_cut_before_talk);
break; case 5022001:cc(sprite_talk_198," ");
break; case 5022002:  ts_end_from_talk(last_cut_before_talk);
break; case 5022101:cc(sprite_talk_199," ");
break; case 5022102:  ts_end_from_talk(last_cut_before_talk);
break; case 5022201:cc(sprite_talk_200,"");
break; case 5022202:  ts_end_from_talk(last_cut_before_talk);
break; case 5022301:cc(sprite_talk_201,"");
break; case 5022302:  ts_end_from_talk(last_cut_before_talk);
break; case 5022401:cc(sprite_talk_202,"");
break; case 5022402:  ts_end_from_talk(last_cut_before_talk);
break; case 5022501:cc(sprite_talk_203,"");
break; case 5022502:  ts_end_from_talk(last_cut_before_talk);
break; case 5022601:cc(sprite_talk_204," Come here! I'm gonna bitchslap you!");
break; case 5022602:cc(sprite_talk_204," *bitchslaps you*");
break; case 5022603:cc(sprite_talk_204," Hah! What a good bitchslap. There you go. If you find me again, I'll have a new mission for you.");
bhagz_bitchslap = 0;
break; case 5022604:  ts_end_from_talk(last_cut_before_talk);
break; case 5022701:cc(sprite_talk_205," Wanna buy SCART cable?");
break; case 5022702:cc(sprite_talk_205," I only sell SCART cables and dollar signs.");
break; case 5022703:cc(sprite_talk_205," And only one of each.");
break; case 5022704:cc(sprite_talk_205," The SCART cable is free, but the dollar sign costs $100.");
break; case 5022705:ccS("I want the SCART cable. ", " I want the dollar sign.");
break; case 5022706:cc2(sprite_talk_205," Here you go, sir! ", " It's not for sale.");
break; case 5022707:cc2(sprite_talk_205," Please come again. ", " But you can get a SCART cable for free! Here, take it! *gives it to you forcefully*");
bhagz_scartcable = 2;
break; case 5022708:  ts_end_from_talk(last_cut_before_talk);
break; case 5022801:cc(sprite_talk_206,"");
break; case 5022802:  ts_end_from_talk(last_cut_before_talk);
break; case 5022901:cc(sprite_talk_207,"");
break; case 5022902:  ts_end_from_talk(last_cut_before_talk);
break; case 5023001:cc(sprite_talk_208,"");
break; case 5023002:  ts_end_from_talk(last_cut_before_talk);
break; case 5023101:cc(sprite_talk_209,"");
break; case 5023102:  ts_end_from_talk(last_cut_before_talk);
break; case 5023201:cc(sprite_talk_210,"");
break; case 5023202:  ts_end_from_talk(last_cut_before_talk);
break; case 5023301:cc(sprite_talk_211,"");
break; case 5023302:  ts_end_from_talk(last_cut_before_talk);
break; case 5023401:cc(sprite_talk_212,"");
break; case 5023402:  ts_end_from_talk(last_cut_before_talk);
break; case 5023501:cc(sprite_talk_213,"");
break; case 5023502:  ts_end_from_talk(last_cut_before_talk);
break; case 5023601:cc(sprite_talk_214,"");
break; case 5023602:  ts_end_from_talk(last_cut_before_talk);
break; case 5023701:cc(sprite_talk_215,"");
break; case 5023702:  ts_end_from_talk(last_cut_before_talk);
break; case 5023801:cc(sprite_talk_216,"");
break; case 5023802:  ts_end_from_talk(last_cut_before_talk);
break; case 5023901:cc(sprite_talk_217,"");
break; case 5023902:  ts_end_from_talk(last_cut_before_talk);
break; case 5024001:cc(sprite_talk_218,"");
break; case 5024002:  ts_end_from_talk(last_cut_before_talk);
break; case 5024101:cc(sprite_talk_219,"");
break; case 5024102:  ts_end_from_talk(last_cut_before_talk);
break; case 5024201:cc(sprite_talk_220,"");
break; case 5024202:  ts_end_from_talk(last_cut_before_talk);
break; case 5024301:cc(sprite_talk_221,"");
break; case 5024302:  ts_end_from_talk(last_cut_before_talk);
break; case 5024401:cc(sprite_talk_222,"");
break; case 5024402:  ts_end_from_talk(last_cut_before_talk);
break; case 5024501:cc(sprite_talk_223,"");
break; case 5024502:  ts_end_from_talk(last_cut_before_talk);
break; case 5024601:cc(sprite_talk_224,"");
break; case 5024602:  ts_end_from_talk(last_cut_before_talk);
break; case 5024701:cc(sprite_talk_225,"");
//*n�gon med till synes j�ttebreda byxor*
//P & dg unisont: PANTS GUY!
//pants guy: yeah, what's going on guys?
//IT'S PANTS GUY! FROM OUR SCHOOL
//yeah, exactly, and once again, what do you want from me?
//Shelf: PANTS GUY!
break; case 5024702:  ts_end_from_talk(last_cut_before_talk);
break; case 5024801:cc(sprite_talk_226,"");
//Ren med �gonfransar
//Adeeele? *sjunger*
break; case 5024802:cc(sprite[0],"nothing to see here");
//Adeeele? It's mating seasons soon... *sjunger*
break; case 5024803:cc(sprite[0],"do i know you? *nerv�s*");
break; case 5024804:cc(sprite[1],"for gods sake, Adele, we said no interspecies breeding! Why do you have to mistreat the gene pool like that?");
break; case 5024805:cc(sprite[0],"what? Reindeers are girl elks.");
break; case 5024806:cc(sprite[5],"can we really choose any animal we want to be our girl version, so we can do \"the thing\" with it?! Why didn't you tell me earlier??!");
break; case 5024807:cc(sprite[5],"sorry guys, but i have a bonobo monkey to call");
break; case 5024808:cc(sprite[1],"that's not how it works, but... bears are kinda... you know... you get it...");
break; case 5024809:cc(sprite[4],"PIGEONS!");
break; case 5024810:cc(sprite[2],"god, stop it.");
break; case 5024811:cc(sprite[2],"You're all so silly...");
break; case 5024812:cc(sprite[2],"of course we'll all choose giraffes.");
break; case 5024813:cc(shelf,"*tv� vidriga alternativ*");
break; case 5024814:  ts_end_from_talk(last_cut_before_talk);
break; case 5024901:cc(sprite_talk_227,"");
break; case 5024902:  ts_end_from_talk(last_cut_before_talk);
break; case 5025001:cc(sprite_talk_228,"");
break; case 5025002:  ts_end_from_talk(last_cut_before_talk);
break; case 5025101:cc(sprite_talk_229,"");
break; case 5025102:  ts_end_from_talk(last_cut_before_talk);
break; case 5025201:cc(sprite_talk_230,"");
break; case 5025202:  ts_end_from_talk(last_cut_before_talk);
break; case 5025301:cc(sprite_talk_231,"");
break; case 5025302:  ts_end_from_talk(last_cut_before_talk);
break; case 5025401:cc(sprite_talk_232,"");
break; case 5025402:  ts_end_from_talk(last_cut_before_talk);
break; case 5025501:cc(sprite_talk_233,"");
break; case 5025502:  ts_end_from_talk(last_cut_before_talk);
break; case 5025601:cc(sprite_talk_234,"");
break; case 5025602:  ts_end_from_talk(last_cut_before_talk);
break; case 5025701:cc(sprite_talk_235,"");
break; case 5025702:  ts_end_from_talk(last_cut_before_talk);
break; case 5025801:cc(sprite_talk_236,"");
break; case 5025802:  ts_end_from_talk(last_cut_before_talk);
break; case 5025901:cc(sprite_talk_237,"");
break; case 5025902:  ts_end_from_talk(last_cut_before_talk);
break; case 5026001:cc(sprite_talk_238,"");
break; case 5026002:  ts_end_from_talk(last_cut_before_talk);
break; case 5026101:cc(sprite_talk_239,"");
break; case 5026102:  ts_end_from_talk(last_cut_before_talk);
break; case 5026201:cc(sprite_talk_240,"");
break; case 5026202:  ts_end_from_talk(last_cut_before_talk);
break; case 5026301:cc(sprite_talk_241,"");
break; case 5026302:  ts_end_from_talk(last_cut_before_talk);
break; case 5026401:cc(sprite_talk_242,"");
break; case 5026402:  ts_end_from_talk(last_cut_before_talk);
break; case 5026501:cc(sprite_talk_243,"");
break; case 5026502:  ts_end_from_talk(last_cut_before_talk);
break; case 5026601:cc(sprite_talk_244,"");
break; case 5026602:  ts_end_from_talk(last_cut_before_talk);
break; case 5026701:cc(sprite_talk_245,"");
break; case 5026702:  ts_end_from_talk(last_cut_before_talk);
break; case 5026801:cc(sprite_talk_246,"");
break; case 5026802:  ts_end_from_talk(last_cut_before_talk);
break; case 5026901:cc(sprite_talk_247,"");
break; case 5026902:  ts_end_from_talk(last_cut_before_talk);
break; case 5027001:cc(sprite_talk_248,"");
break; case 5027002:  ts_end_from_talk(last_cut_before_talk);
break; case 5027101:cc(sprite_talk_249,"");
break; case 5027102:  ts_end_from_talk(last_cut_before_talk);
//  5022201
break; case 5022201:cc(sprite_talk_magnetguard," No.");
break; case 5022202:  ts_end_from_talk(last_cut_before_talk);
//  50222012
break; case 5022301:cc(sprite_talk_magnetguard2," No.");
break; case 5022302:  ts_end_from_talk(last_cut_before_talk);
//  50222013
break; case 5022401:cc(sprite_talk_magnetguard3," No.");
break; case 5022402:  ts_end_from_talk(last_cut_before_talk);
//  50222014
break; case 5022501:cc(sprite_talk_magnetguard4," No.");
break; case 5022502:  ts_end_from_talk(last_cut_before_talk);
// CUT_CUTSCENE_DGFUCKYOU
break; case 5030001:cc(sprite[1],"Yes?");
break; case 5030002:ccS("I have a present for you. ", " I have a present for you, beard-man");
break; case 5030003:cc2(sprite[1],"Oh! How come? ", " Oh! How come? (stop calling me beard-man)");
break; case 5030004:ccS("Here! *give Dark Gandalf the paper* ", " Here! *throw letter in random direction and hope it lands in Dark Gandalf's hand*");
break; case 5030005:cc2(sprite[1],"Ooh, let me open and see what this is. ", " Ooh, let me bend down, pick the paper up, open it, and see what this is.");
break; case 5030006:cc(sprite[1],"It's a handwritten letter!");
break; case 5030007:cc(sprite[1],"Wait a minute.");
break; case 5030008:cc(sprite[1],"I see what this is. It's from Bhagz.");
break; case 5030009:cc(sprite[1],"Then I have a mission for you, shelf. Give this letter (it's the same letter) to Bhagz.");
bhagz_fuckyou = 2;
break; case 5030010:  ts_end_from_talk(last_cut_before_talk);
break; default: throw new Error();//ts_end(cut+100);
//	}	// putting it here for the t8 app v2 (varf�r beh�vs s� m�nga...)
	}	// putting it here for the t8 app
	}	// putting it here for the t8 app
