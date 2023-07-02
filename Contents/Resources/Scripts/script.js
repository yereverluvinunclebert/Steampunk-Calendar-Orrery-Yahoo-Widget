var debug = 1;
var debugFlg = 1;
// debug = 0; standard version
// debug = 1; development version
/*

BEFORE going live

1. Cet the debug state to 0
2. Change the name of the widgetised timekeeper from timekeeper 5.2.6.widget to timekeeper.widget
3. Test with widgetised version of the moon phase III widget

	TimeKeeper - A Steampunk Calendar
	Copyright © 2012 Dean Beedell and Harry Whitfield

	This program is free software; you can redistribute it and/or modify it
	under the terms of the GNU General Public License as published by the
	Free Software Foundation; either version 2 of the License, or (at your
	option) any later version.

	This program is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with this program; if not, write to the Free Software Foundation, Inc.,
	51 Franklin St, Fifth Floor, Boston, MA	 02110-1301	 USA

	TimeKeeper - version 5.2.6
	14 June, 2014

	Concept and graphics by Dean Beedell
	dean.beedell@lightquick.co.uk

	Code by Harry Whitfield
	g6auc@arrl.net

	Animation and Sound Code by Dean Beedell
	dean.beedell@lightquick.co.uk

*/

/*global main_window, year: true, month: true, day: true, gISOdate: true, theISODate,
	sharedUpdateTimerFired, speakMemoToggle: true, updateMemoFolder, accessMode: true,
	addModes, logMemoFolder, makeMemoLock, updateMemoPrefs, systemPlatform, makeSelectHotKey,
	selectMonth, makeSpeechHotKey, speakMemo, makeSearchHotKey, findMemo, setContextMenu,
	SPEAK, saveAnchorPoint, deleteSelectHotKey, deleteSpeechHotKey, deleteSearchHotKey,
	deleteSearchHotKey, oldSelectHotKeyPref: true, oldSpeechHotKeyPref: true,
	oldSearchHotKeyPref: true, oldMemoScalePref: true, memo_window, showMemoButtons,
	hideMemoButtons, lastYear, daysInMonth, setPrefs, updateDate,
	anchorX: true, anchorY: true, anchorWindow, onClicked, openMemoWindow, getMemoLines,
	buildCalendarVitality, bf, lFlag: true, eFlag: true, sFlag: true, lprint, eprint, sprint,
	myPrint, logFilePref: true, logFlagPref: true, createLicense, updateSunPrefs,
	earthTimer, entry_window, popUpPlaque, plaqueButton,
	earthRotateStyle:true, missingMoonPlaque
 */

/*properties
    PI, Voffset, accessModePref, allowAutoOpenPref, alphaLockKey, altKey,
    anchorXPref, anchorYPref, animatePref, appendChild, atan2, autoModePref,
    autoOpenPref, availHeight, availLeft, availTop, availWidth, bgColor,
    bgOpacity, changeMode, checkMoonWidgetPref, cogAnimatePref, color, cos,
    dayPref, dockDate, eFlagPref, earthSizePref, earthTurnPref, event, floor,
    font, getDate, getDay, getFullYear, getHours, getMinutes, getMonth,
    getSeconds, getTime, getYear, glassOpacityPref, hAlign, hOffset,
    hRegistrationPoint, height, hidden, hoffset, hoverPointPref, interval,
    itemExists, kEaseIn, kEaseInOut, kEaseOut, lFlagPref, latitudePref, locked,
    logFilePref, logFlagPref, longitudePref, memoScalePref, monthPref, onClick,
    onDockOpened, onGainFocus, onLoseFocus, onMouseDown, onMouseDrag,
    onMouseEnter, onMouseExit, onMouseUp, onMouseWheel, onPreferencesChanged,
    onTimerFired, onUnload, onWakeFromSleep, onWillChangePreferences, onclick,
    onload, opacity, pinHoffsetPref, pinVoffsetPref, reset, rotation, round,
    sFlagPref, scalePref, scrollDelta, searchHotKeyPref, selectHotKeyPref,
    setDate, setMonth, setYear, sharedDirectoryPref, sharedMemoFolderPref,
    sharedModePref, sharedUpdateTimerPref, sin, size, sizebar, soundPref,
    speechHotKeyPref, src, srcHeight, srcWidth, start, style, text, tickPref,
    ticking, toLowerCase, tooltip, tooltipPref, underWidgetPref,
    underwidgetLocationPref, userWidgetsFolder, vOffset, vRegistrationPoint,
    value, visible, voffset, widgetLocationPref, widgetLockPref, width, yearPref,
    zOrder, zorder
*/



//==============================
// general vars
//==============================

var AutomateTimerCnt = 1;
var base = "Resources/Orrery/";
var underwidgetBase = "Resources/underwidget/";

var numberOfDaysToAdd = 0;
var numberOfMonthsToAdd = 0;
var numberOfYearsToAdd = 0;

var downAngle,
	downDate;
var currDat = null;

//==============================
// vars for the various animations
//==============================
var shrunkFlg = 0;
var animationSpeed = 1700;
var cogrotation = 0;
var monthCogRotation = 0;
var modulo_cnt = 0;
var driveBandClicks = 0;
var moonRotationValue = 0;
var earthRotationValue = 0;
var accelVal = 0;
var moonAngle = 0;
var earthAngle = 0;
var useMouseWheel = 0;
var globeStartHoffset = 0;
var globeEndHoffset = 0;
//var cowangle = 9;
var theOpacityTimerCounter = 0;

//==============================
// vars for the rotating earth
//==============================
var earthFrame = 1;
var earthBaseName;

//==============================
// vars to save earth and moon positions
//==============================
var earthHoffset = 0;
var earthVoffset = 0;
var earthzorder = 0;
var moonHoffset = 0;
var moonVoffset = 0;
var moonzorder = 34;
var savEarthHoffset;
var savEarthVoffset;
var savMoonHoffset;
var savMoonVoffset;

//==============================
// declare the sounds
//==============================
var buzzer = "Resources/sounds/buzzer.mp3";
var zzzz = "Resources/sounds/zzzz.mp3";
var zzzzQuiet = "Resources/sounds/zzzz-quiet.mp3";
var crank = "Resources/sounds/crank.mp3";
var tingingSound = "Resources/sounds/ting.mp3";
var steam = "Resources/sounds/steamsound.mp3";
var suck = "Resources/sounds/suck.mp3";
var newClunk = "Resources/sounds/newclunk.mp3";
var electricDrone = "Resources/sounds/electricDrone.mp3";
var winding = "Resources/sounds/winding.mp3";
var mechanism = "Resources/sounds/mechanism.mp3";
var ticktock = "Resources/sounds/ticktock-quiet.mp3";
var tick = "Resources/sounds/tick.mp3";
var till = "Resources/sounds/till.mp3";
var tock = "Resources/sounds/tock.mp3";
var lock = "Resources/sounds/lock.mp3";
var nothing = "Resources/sounds/nothing.mp3";
var keypress = "Resources/sounds/keypress.mp3";
var creturn = "Resources/sounds/creturn.mp3";
var ping = "Resources/sounds/ping.mp3";
var rollerBlind = "Resources/sounds/rollerBlind.mp3";
var shutdown = "Resources/sounds/shutdown.mp3";

 var widgetName = "timekeeper.widget";    //to be changed as required
//==============================
// resizing variables
//==============================

//log("preferences.scalePref.value	" + preferences.scalePref.value);

    log("Resizing: preferences.scalePref.value: " + preferences.scalePref.value);
    scale = parseInt(preferences.scalePref.value); 	// sets global scale because it is used elsewhere
    //check the number is valid and not just junk
    valueIsNaN = (scale !== scale);
    log("valueIsNaN "+valueIsNaN);

    if (valueIsNaN === true) {
        scale = 100;
        log("defaulting to 100 ");
    } else {
        if (scale < 20) scale = 20;
        if (scale > 150) scale = 150;
        log("limiting range 20-150 ");
    }
    scale = scale / 100;
    log("scale: " + scale);
       oldScale = scale;

var sizeLevel = null;
var origGlobeWidth = 330;
var origGlobeHeight = 330;
var origGlobeHoffset = 125;
var origGlobeVoffset = 130;

var origRingWidth = 330;
var origRingHeight = 330;
var origRingHoffset = 143;
var origRingVoffset = 145;

var origGlowWidth = 330;
var origGlowHeight = 330;
var origGlowHoffset = 125;
var origGlowVoffset = 130;

var origGlobeTopWidth = 21;
var origGlobeTopHeight = 28;
var origGlobeTopHoffset = 273;
var origGlobeTopVoffset = 128;

var origSupportingBarWidth = 164;
var origSupportingBarHeight = 312;
var origSupportingBarHoffset = 130;
var origSupportingBarVoffset = 132;

var origToggle1Width = 16;
var origToggle1Height = 16;
var origToggle1Hoffset = 249;
var origToggle1Voffset = 133;

var origToggle2Width = 16;
var origToggle2Height = 16;
var origToggle2Hoffset = 194;
var origToggle2Voffset = 154;

var origToggle3Width = 16;
var origToggle3Height = 16;
var origToggle3Hoffset = 149;
var origToggle3Voffset = 199;

var origToggle4Width = 16;
var origToggle4Height = 16;
var origToggle4Hoffset = 126;
var origToggle4Voffset = 271;

var origToggle5Width = 16;
var origToggle5Height = 16;
var origToggle5Hoffset = 130;
var origToggle5Voffset = 325;

var origToggle6Width = 16;
var origToggle6Height = 16;
var origToggle6Hoffset = 154;
var origToggle6Voffset = 374;

var origToggle7Width = 16;
var origToggle7Height = 16;
var origToggle7Hoffset = 186;
var origToggle7Voffset = 407;

var origToggleSWidth = 16;
var origToggleSHeight = 16;
var origToggleSHoffset = 266;
var origToggleSVoffset = 424;

var origToggleFWidth = 33;
var origToggleFHeight = 33;
var origToggleFHoffset = 314;
var origToggleFVoffset = 424;

var origCancelWidth = 33;
var origCancelHeight = 33;
var origCancelHoffset = 215;
var origCancelVoffset = 420;

/*var origFrameWidth =	100;
var origFrameHeight =  100;
var origFrameHoffset = 1;
var origFrameVoffset = 1;
*/

var GlobeHoffset = 125;
var GlobeVoffset = 130;

//==============================
// vars to determine the position of the components
//==============================
var cogsPos = 0;
var clockPos = 0;
var timekeeperPos = 0;

//==============================
// vars to determine the visibility of the expanded planets
//==============================
var largeEarthVisible = false;
var lunarWidgetVisible = false;
var allowRingClick = false;

//==============================
// vars for determining extra widgets presence
//==============================
var moonWidgetFound = false; // for the Moon Phase III widget
var underWidgetFound = false; // for the under widget
var preferred_form_location = null;
var under_preferred_form_location = null;


//////////////////////////////////////////////////////////////////////////////////////////

include("Resources/Scripts/logToFile.js");

/*
var lFlag = true;	// log important progress and error messages
var eFlag = true;	// log other progress and error messages
var sFlag = true;	// log scripts

function lprint(theString) { if (lFlag) { log(theString);	 } }
function eprint(theString) { if (eFlag) { print(theString); } }
function sprint(theString) { if (sFlag) { print(theString); } }

function myPrint(theStr) { print(theStr); }
*/

//=================================
// create the images to scale
//=================================
function newImage(parent, hOffset, vOffset,  width, height, src, zOrder, opacity, hRegP, vRegP) {
	var o = new Image();

	o.src = src;

	if (!width) {
		width = o.srcWidth;
	} // width is an optional parameter
	if (!height) {
		height = o.srcHeight;
	} // height is an optional parameter

	o.width	 = Math.round(scale * width);
	o.height = Math.round(scale * height);

	if (zOrder) {
		o.zOrder = zOrder;
	} // zOrder is an optional parameter
	o.opacity = opacity || 255; // opacity is an optional parameter, if zero defaults to 255...

	hRegP				 = hRegP || 0; // hRegP and vRegP are optional parameters, if not specified defaults to zero
	vRegP				 = vRegP || 0;

	hOffset				 += hRegP;
	vOffset				 += vRegP;

	o.hOffset			 = Math.round(scale * hOffset);
	o.vOffset			 = Math.round(scale * vOffset);

	o.hRegistrationPoint = Math.round(scale * hRegP);
	o.vRegistrationPoint = Math.round(scale * vRegP);

	parent.appendChild(o);
	return o;
}
//=================================
//
//=================================
function newText(parent, hOffset, vOffset, width, height, hAlign, font, style, size, color, opacity, bgColor, bgOpacity, zOrder) {
	var o = new Text();
	o.hOffset = Math.round(scale * hOffset);
	o.vOffset = Math.round(scale * vOffset);
	o.width = Math.round(scale * width);
	o.height = Math.round(scale * height);
	o.hAlign = hAlign;
	o.font = font;
	o.style = style;
	o.size = Math.round(scale * size);
	o.color = color;
	o.opacity = opacity;
	o.bgColor = bgColor;
	o.bgOpacity = bgOpacity;
	o.zOrder = zOrder;
	parent.appendChild(o);
	return o;
}




var innerFrames,
	underlyingGlass,
	underlay,
	pseudoRotatingRing,
	layer35,
	ringtext,
	woodSurround,
	counterWheel,
	cogShadow,
	cog,
	monthCogShadow,
	monthCog,
	wheelShadow,
	wheel,
	driveBand,
	dayOfWeek,
	clock,
	hourHand,
	minuteHand,
	secondHand,
	centreBoss,
	clockReflection,
	dayAndYearCounters,
	dayTensCounter,
	dayUnitsCounter,
	monthCounter,
	yearTensCounter,
	yearUnitsCounter,
	timekeeper,
	moonUnderShadow,
	moon,
	moonOverShadow,
	earthUnderShadow,
	earth,
	earthOverShadow,
	shrinker,
	innerFramesclickpointleft,
	innerFramesclickpointright,
	innerFramesclickpointtop,
	clockclickpointleft,
	clockclickpointcentre,
	clockclickpointright,
	timekeeperclickpointleft,
	timekeeperclickpointmiddle,
	timekeeperclickpointright,
	timekeeperclickpointbottom,
	timekeeperclickpointfarright,
	rotatingpointwidth,
	tickingSlider,
	opacitySlider,
	sizeSlider,
	driveBandclickpoint,
	dayCounter,
	yearCounter,
	soundtoggle,
	glass,
	about,
	widgetHelp,
	ring,
	globe,
	glow,
	globetop,
	supportingBar,
	toggle1,
	toggle2,
	toggle3,
	toggle4,
	toggle5,
	toggle6,
	toggle7,
	toggleS,
	toggleF,
	cancel,
	pin,
	sizeText;
	
	// underwidget variables

        var udarkness , 
        ubackgroundCog ,
        ubackgroundCog2 ,
        ubrassBackplate ,
        ubigCog ,
        uwheel ,
        usmallCog ,
        ubigCog2 ,
        umountingNutsPlate ,
        ufrontplate ,
        uhousing ,
        uhourHand ,
        urubberSurround ,
        uhandles ,
        uHourRing ,
        uwinderBelow ,
        uredTap ,
        uwinderTop ,
        urimRubyHole ,
        urimRubyHoleCopy ,
        umountingNutsPlateNo2 ,
        ushadow;



(function () {
	main_window.width			 = Math.round(scale * 658); //608
	main_window.height			 = Math.round(scale * 598);
	rotatingpointwidth			 = Math.round(scale * 578);

//	newImage(parent, hOffset, vOffset, width, height, src, zOrder, opacity, hRegP, vRegP)
	shrinker				= newImage(main_window, 51, 51, 475, 475, base + "shrinker.png", 0, 255, 230, 230);
	underlay				= newImage(main_window, 51, 51, 475, 475, base + "underlay.png", 0, 255);
	underlyingGlass				= newImage(main_window, 143, 143, 294, 294, base + "underlyingGlass.png", 1, 200);
	innerFrames				= newImage(main_window, 100, 100, 385, 385, base + "innerFrames.png", 2, 255);
	tickingSlider				= newImage(main_window, 100, 100, 385, 385, base + "tickingSlider.png", 2, 255, 192, 192);
	opacitySlider				= newImage(main_window, 100, 100, 385, 385, base + "opacitySlider.png", 2, 255, 192, 192);
	sizeSlider				= newImage(main_window, 100, 100, 385, 385, base + "sizeSlider.png", 2, 255, 192, 192);
	pseudoRotatingRing			= newImage(main_window, 50, 50, 478, 478, base + "rotatingring.png", 1, 255, 239, 239);
	ringtext				= newImage(main_window, 66, 67, 443, 441, base + "ringtext.png", 3, 255, 221.5, 220.5);
	//ringtext				= newImage(main_window, 66, 64, 448, 448, base + "ringtext.png", 3, 255, 224.5, 226);
	//ringtext				= newImage(main_window, 64, 62, 448, 448, base + "ringtext.png", 3, 255, 224, 226);

	woodSurround				 = newImage(main_window, 50, 50, 478, 498, base + "woodSurround.png", 4);
	counterWheel				 = newImage(main_window, 119, 121, 340, 340, base + "counterWheel.png", 5, 255, 170, 170);
	cogShadow				 = newImage(main_window, 103, 243, 103, 103, base + "cogShadow.png", 6, 255, 52, 52);
	cog					= newImage(main_window, 101, 219, 98, 99, base + "cog.png", 7, 255, 49, 50);
	monthCogShadow				 = newImage(main_window, 353, 249, 108, 108, base + "monthCogShadow.png", 8, 255, 54, 54);
	monthCog				= newImage(main_window, 355, 241, 98, 99, base + "monthCog.png", 9, 255, 49, 50);
	wheelShadow				= newImage(main_window, 57, 250, 95, 95, base + "wheelShadow.png", 10, 217, 47, 47);
	wheel					= newImage(main_window, 60, 248, 88, 88, base + "wheel.png", 10, 255, 44, 44);
	driveBand				= newImage(main_window, 82, 249, 73, 73, base + "driveBand.png", 11);
	driveBandclickpoint			 = newImage(main_window, 95, 281, 20, 20, base + "blank.png", 11);
	dayOfWeek				= newImage(main_window, 131, 209, 64, 37, base + "sunday.png", 12);
	clock					= newImage(main_window, 76, 114, 182, 182, base + "clock.png", 13);
	clockclickpointleft			 = newImage(main_window, 133, 195, 20, 20, base + "blank.png", 34);
	clockclickpointcentre				 = newImage(main_window, 153, 190, 20, 20, base + "blank.png", 34);
	clockclickpointright				 = newImage(main_window, 173, 195, 20, 20, base + "blank.png", 34);
	hourHand				= newImage(main_window, 152, 149, 27, 55, base + "hourHand.png", 14, 255, 13, 52);
	minuteHand				= newImage(main_window, 155, 133, 20, 71, base + "minuteHand.png", 15, 255, 10, 68);
	secondHand				= newImage(main_window, 162, 145, 4, 21, base + "secondHand.png", 16, 255, 2, 21);
	centreBoss				= newImage(main_window, 153, 188, 25, 26, base + "centreBoss.png", 17);
	clockReflection				 = newImage(main_window, 103, 135, 122, 74, base + "clockReflection.png", 18, 89);

	moonUnderShadow				 = newImage(main_window, 338, 325, 45, 46, base + "moonUnderShadow.png", 22, 179, 22, 22);
	moon					 = newImage(main_window, 339, 321, 33, 33, base + "moon.png", 23, 255, 16, 16);
	moonOverShadow				 = newImage(main_window, 329, 321, 52, 46, base + "moonOverShadow.png", 24, 255, 26, 18);
	earthUnderShadow			 = newImage(main_window, 276, 328, 82, 83, base + "earthUnderShadow.png", 25, 224, 41, 41);
	earth					 = newImage(main_window, 269, 321, 68, 69, base + "earth.png", 26, 255, 34, 34);
	earthOverShadow				 = newImage(main_window, 260, 342, 84, 68, base + "earthOverShadow.png", 27, 179, 42, 18);

	dayCounter					 = newImage(main_window, 427, 239, 43, 42, base + "dayCounter.png", 19, 255);
	yearCounter				= newImage(main_window, 427, 299, 43, 42, base + "yearCounter.png", 19, 255);
	dayTensCounter				= newImage(main_window, 432, 253, 15, 16, base + "0.png", 20, 214);
	dayUnitsCounter				= newImage(main_window, 447, 253, 15, 16, base + "4.png", 20, 214);
	monthCounter				= newImage(main_window, 359, 280, 89, 21, base + "march.png", 20);
	yearTensCounter				= newImage(main_window, 432, 315, 15, 16, base + "1.png", 20, 214);
	yearUnitsCounter			= newImage(main_window, 447, 315, 15, 16, base + "2.png", 20, 214);
	timekeeperclickpointbottom		= newImage(main_window, 465, 310, 53, 50, base + "blank.png", 21);
	soundtoggle				= newImage(main_window, 525, 284, 25, 16, base + "soundToggle.png", 21);
	timekeeper				= newImage(main_window, 335, 236, 216, 134, base + "timekeeper.png", 21);
	glass					= newImage(main_window, 471, 273, 43, 43, base + "glass.png", 21, 1);
	timekeeperclickpointleft			= newImage(main_window, 330, 283, 20, 20, base + "blank.png", 21);
	timekeeperclickpointmiddle			= newImage(main_window, 450, 290, 20, 20, base + "blank.png", 21);
	timekeeperclickpointright			= newImage(main_window, 510, 266, 20, 20, base + "blank.png", 21);
	timekeeperclickpointfarright			= newImage(main_window, 535, 281, 20, 20, base + "blank.png", 21);
	innerFramesclickpointleft			= newImage(main_window, 184, 432, 20, 20, base + "blank.png", 3);
	innerFramesclickpointright			= newImage(main_window, 378, 430, 20, 20, base + "blank.png", 3);
	innerFramesclickpointtop			= newImage(main_window, 378, 128, 20, 20, base + "blank.png", 3);
	about					 = newImage(main_window, 20, 50, 570, 499, base + "About.png", 50, 1);
	widgetHelp				 = newImage(main_window, 30, -8, 600, 600, base + "widgetHelp.png", 51, 1);
	pin					 = newImage(main_window, 1, 1, 37, 37, base + "pin.png", 101, 1);


//======================================
//newtext function used to create text objects
//======================================
	   //newText(parent, hOffset, vOffset, width, height, hAlign, font, style, size, color, opacity, bgColor, bgOpacity, zOrder) {
	sizeText					 = newText(main_window,	 350, 400, 50, 20, "left", "times new roman", "-kon-shadow:black 5px", 18, "#FFCC00", 0, "#000000", 0, 101);

//======================================
//newImage function will not create objects
//with zero opacity,so the extra unwanted items are made completely invisible here
//======================================
	pin.opacity				 = 0;
	about.opacity				 = 0;
	widgetHelp.opacity			 = 0;


//================================
//enlarged earth images & controls
//================================
	ring = newImage(main_window, 143, 145, 300, 300, base + "ring.png", 28, 1);
	globe						 = newImage(main_window, 125, 130, 330, 330, base + "globe/Earth-spinning_1.png", 28, 1);
	glow						 = newImage(main_window, 125, 130, 330, 330, base + "glow.png", 28, 1);
	globetop					 = newImage(main_window, 273, 128, 21, 28, base + "globetop.png", 28, 1);
	supportingBar						 = newImage(main_window, 130, 132, 164, 312, base + "supportingBar.png", 28, 1);
	toggle1						 = newImage(main_window, 249, 133, 16, 15, base + "toggle1.png", 28, 1);
	toggle2						 = newImage(main_window, 194, 154, 16, 16, base + "toggle2.png", 28, 1);
	toggle3						 = newImage(main_window, 149, 199, 16, 16, base + "toggle3.png", 28, 1);
	toggle4						 = newImage(main_window, 126, 271, 16, 16, base + "toggle4.png", 28, 1);
	toggle5						 = newImage(main_window, 130, 325, 16, 16, base + "toggle5.png", 28, 1);
	toggle6						 = newImage(main_window, 154, 374, 16, 16, base + "toggle6.png", 28, 1);
	toggle7						 = newImage(main_window, 186, 407, 16, 16, base + "toggle7.png", 28, 1);
	toggleS						 = newImage(main_window, 257, 430, 16, 16, base + "toggleS.png", 28, 1);
	toggleF						 = newImage(main_window, 314, 430, 16, 16, base + "toggleF.png", 28, 1);
	//cancel							 = newImage(main_window, 215, 420, 33, 33, base + "cancel.png", 28, 1);
	cancel							 = newImage(main_window, 354, 151, 33, 33, base + "cancel.png", 28, 1);

//======================================
//newImage function will not create objects
//with zero opacity,so the enlarged earth is made completely invisible here
//======================================
	globe.opacity                            = 0;
	ring.opacity				 = 0;
	globetop.opacity			 = 0;
	supportingBar.opacity		         = 0;
	toggle1.opacity				 = 0;
	toggle2.opacity				 = 0;
	toggle3.opacity				 = 0;
	toggle4.opacity				 = 0;
	toggle5.opacity				 = 0;
	toggle6.opacity				 = 0;
	toggle7.opacity				 = 0;
	toggleS.opacity				 = 0;
	toggleF.opacity				 = 0;
	cancel.opacity				 = 0;
	shrinker.opacity			 = 0;

//==============================
// resizing variables for the enlarged earth
// required as it must be dynamically resized
//==============================
//origWoodSurroundHoffset= woodSurround.hOffset;
//origWoodSurroundWidth= woodSurround.width;
	origGlobeWidth                           = globe.width;
	origGlobeHeight				 = globe.height;
	origGlobeHoffset			 = globe.hOffset;
	origGlobeVoffset			 = globe.vOffset;

	origRingWidth				 = ring.width;
	origRingHeight				 = ring.height;
	origRingHoffset				 = ring.hOffset;
	origRingVoffset				 = ring.vOffset;

	origGlowWidth				 = glow.width;
	origGlowHeight				 = glow.height;
	origGlowHoffset				 = glow.hOffset;
	origGlowVoffset				 = glow.vOffset;

	origGlobeTopWidth			 = globetop.width;
	origGlobeTopHeight			 = globetop.height;
	origGlobeTopHoffset			 = globetop.hOffset;
	origGlobeTopVoffset			 = globetop.vOffset;

	origSupportingBarWidth		 = supportingBar.width;
	origSupportingBarHeight		 = supportingBar.height;
	origSupportingBarHoffset	 = supportingBar.hOffset;
	origSupportingBarVoffset	 = supportingBar.vOffset;

	origToggle1Width			 = toggle1.width;
	origToggle1Height			 = toggle1.height;
	origToggle1Hoffset			 = toggle1.hOffset;
	origToggle1Voffset			 = toggle1.vOffset;

	origToggle2Width			 = toggle2.width;
	origToggle2Height			 = toggle2.height;
	origToggle2Hoffset			 = toggle2.hOffset;
	origToggle2Voffset			 = toggle2.vOffset;

	origToggle3Width			 = toggle3.width;
	origToggle3Height			 = toggle3.height;
	origToggle3Hoffset			 = toggle3.hOffset;
	origToggle3Voffset			 = toggle3.vOffset;

	origToggle4Width			 = toggle4.width;
	origToggle4Height			 = toggle4.height;
	origToggle4Hoffset			 = toggle4.hOffset;
	origToggle4Voffset			 = toggle4.vOffset;

	origToggle5Width			 = toggle5.width;
	origToggle5Height			 = toggle5.height;
	origToggle5Hoffset			 = toggle5.hOffset;
	origToggle5Voffset			 = toggle5.vOffset;

	origToggle6Width			 = toggle6.width;
	origToggle6Height			 = toggle6.height;
	origToggle6Hoffset			 = toggle6.hOffset;
	origToggle6Voffset			 = toggle6.vOffset;

	origToggle7Width			 = toggle7.width;
	origToggle7Height			 = toggle7.height;
	origToggle7Hoffset			 = toggle7.hOffset;
	origToggle7Hoffset			 = toggle7.vOffset;

	origToggleSWidth			 = toggleS.width;
	origToggleSHeight			 = toggleS.height;
	origToggleSHoffset			 = toggleS.hOffset;
	origToggleSVoffset			 = toggleS.vOffset;

	origToggleFWidth			 = toggleF.width;
	origToggleFHeight			 = toggleF.height;
	origToggleFHoffset			 = toggleF.hOffset;
	origToggleFVoffset			 = toggleF.vOffset;

	origCancelWidth				 = cancel.width;
	origCancelHeight			 = cancel.height;
	origCancelHoffset			 = cancel.hOffset;
	origCancelVoffset			 = cancel.vOffset;


//================================
//underwidget & controls
//================================   130    140
        zorderModifier = 00;   // for debugging purposes so that you can see the underwidget
//	newImage(parent, hOffset, vOffset, width, height, src, zOrder, opacity, hRegP, vRegP)
	udarkness = newImage(main_window, 146, 150, 296,296, underwidgetBase + "/darkness.png", zorderModifier, 255);
	ubackgroundCog = newImage(main_window, 216, 350, 102,105, underwidgetBase + "/backgroundCog.png", zorderModifier, 255,51,50);
	ubackgroundCog2 = newImage(main_window, 346, 230, 102,105, underwidgetBase + "/backgroundCog2.png", zorderModifier, 255,51,50);
	ubrassBackplate = newImage(main_window, 219, 228, 144,144, underwidgetBase + "/brassBackplate.png", zorderModifier, 255,51,50);
	ubigCog = newImage(main_window, 280, 315, 102,105, underwidgetBase + "/bigCog.png", zorderModifier, 255,51,50);
	uwheel = newImage(main_window, 171, 223,78, 80, underwidgetBase + "/wheel.png", zorderModifier, 255,39,38);
	ubigCog2 = newImage(main_window, 200, 213, 102,105, underwidgetBase + "/bigCog.png", zorderModifier, 255,51,50);
	usmallCog = newImage(main_window, 277, 240, 58, 59, underwidgetBase + "/smallCog.png", zorderModifier, 255,29,28);
	umountingNutsPlate = newImage(main_window, 300, 267, 51, 39, underwidgetBase + "/mountingNutsPlate.png", zorderModifier, 255);
	ufrontplate = newImage(main_window, 181, 196, 207, 208, underwidgetBase + "/frontplate.png", zorderModifier, 255);
	uhousing = newImage(main_window, 263, 278, 45, 45, underwidgetBase + "/housing.png", zorderModifier, 255);
	uhourHand = newImage(main_window, 265, 186, 40, 165, underwidgetBase + "/hourHand.png", zorderModifier, 255,166,146);
	urubberSurround = newImage(main_window, 133, 150, 304, 310, underwidgetBase + "/rubberSurround.png", zorderModifier, 255);
	uhandles = newImage(main_window, 172, 265, 233, 82, underwidgetBase + "/handles.png", zorderModifier, 255);
	uHourRing = newImage(main_window, 145, 150, 298, 298, underwidgetBase + "/24HourRing.png", zorderModifier, 255);
	uwinderBelow = newImage(main_window, 202, 331, 27, 23, underwidgetBase + "/winderBelow.png", zorderModifier, 255);
	uredTap = newImage(main_window, 197, 329, 29, 30, underwidgetBase + "/redTap.png", zorderModifier, 255);
	uwinderTop = newImage(main_window, 225, 211, 27, 29, underwidgetBase + "/winderTop.png", zorderModifier, 255);
	urimRubyHole = newImage(main_window, 322, 359, 18, 18, underwidgetBase + "/rimRubyHole.png", zorderModifier, 255);
	urimRubyHoleCopy = newImage(main_window, 199, 252, 18, 18, underwidgetBase + "/rimRubyHoleCopy.png", zorderModifier, 255);
	umountingNutsPlateNo2 = newImage(main_window, 220, 251, 42, 48, underwidgetBase + "/mountingNutsPlateNo2.png", zorderModifier, 255);
	ushadow = newImage(main_window, 143, 148, 292, 292, underwidgetBase + "/shadow.png", zorderModifier, 255);

}());

//var dayOfWeek = newText(main_window,	95, 182, 40, 14, "left", "ENGRAVERS", "normal", 12, "#000000", 255, "#FFFFFF", 0, 30);
//var theDay	= newText(main_window, 384, 213, 28, 22, "left", "ENGRAVERS", "normal", 22, "#000000", 255, "#FFFFFF", 0, 30);
//var theMonth	= newText(main_window, 326, 242, 60, 20, "left", "ENGRAVERS", "normal", 16, "#000000", 255, "#FFFFFF", 0, 30);
//var theYear	= newText(main_window, 384, 275, 28, 22, "left", "ENGRAVERS", "normal", 22, "#000000", 255, "#FFFFFF", 0, 30);

//////////////////////////////////////////////////////////////////////////////////////////




//=================================
//
//=================================
function dayAngle(currDat) {
	var year  = currDat.getFullYear(),	// 20yy
		month = currDat.getMonth(),		// 0..11
		day	  = currDat.getDate(),		// 1..31

		daysInMonth = function (month, year) { // month 0..11
			var monthDays = [
					31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
				];

			if (month !== 1) {
				return monthDays[month];
			}
			if ((year % 4) !== 0) {
				return 28;
			}
			if ((year % 400) === 0) {
				return 29;
			}
			if ((year % 100) === 0) {
				return 28;
			}
			return 29;
		};

	return 360 * (year - 2012) + 30 * month + Math.round(30 * day / daysInMonth(month, year));
}

//=================================
//
//=================================
function weekDayOf(currDat) {
	var dow = [
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		];

	return dow[currDat.getDay()];
}

//=================================
//
//=================================
function dayOf(currDat) {
	return currDat.getDate();
}

//=================================
//
//=================================
function monthOf(currDat) {
	var months = [
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		];

	return months[currDat.getMonth()];
}

//=================================
//
//=================================
function theYearOf(currDat) {
	return currDat.getFullYear() % 100;
}

//////////////////////////////////////////////////////////////////////////////////////////

var date,
	newDate,
	angle0;
var cos = [],
	sin = [];

//=================================
//
//=================================
(function makeTrigTables() {
	var i;

	for (i = 0; i < 360; i += 1) {
		cos[i] = Math.cos(Math.PI * i / 180);
		sin[i] = Math.sin(Math.PI * i / 180);
	}
}());

//=================================
//	update the dock and keep it updated
//=================================
function updateVitality(currDat) {
	var colorize  = "#307968",
		textColor = "#FFFFFF";

	if (preferences.dockDate.value === "0") {
		currDat = new Date();
	} else {
		colorize  = "#ff9008";
		textColor = "#000000";
		if (currDat === undefined) {
			currDat = new Date(year, month - 1, day);
		}
	}
	buildCalendarVitality(currDat, colorize, textColor);
}

//=================================
// function that moves the moon manually according to supplied angles
//=================================
function moveMoon(moonAngle) {
	var lunarMonth = 29.53058917, // days
		sunX	   = rotatingpointwidth / 2,
		sunY	   = main_window.height / 2 - 10 * scale, // sun is off-centre
		bearing,
		moonRadius	= 55 * scale,
		angle				= ((Math.round(moonAngle * 365.2425 / lunarMonth + moonAngle - 15) % 360) + 360) % 360;

	moon.hOffset			= Math.round(earth.hOffset + moonRadius * cos[angle]);
	moon.vOffset			= Math.round(earth.vOffset - moonRadius * sin[angle]);

	moonUnderShadow.hOffset = moon.hOffset;
	moonUnderShadow.vOffset = moon.vOffset;
	moonOverShadow.hOffset	= moon.hOffset;
	moonOverShadow.vOffset	= moon.vOffset;

	bearing					= 180 * Math.atan2(moon.vOffset - sunY, moon.hOffset - sunX) / Math.PI;
	moonOverShadow.rotation = (Math.round(bearing - 90) + 720) % 360;
}

//=================================
// function that moves the earth manually according to supplied angles
//=================================
function moveEarth(earthAngle) {
	var earthRadius,
		angle;
		// cow angle 9 - element repord
	angle		= (earthAngle + 220) % 360;
	earthRadius		= 55 * scale;
	//log("3. earthAngle "	  + earthAngle);

	if (earthRotateStyle === 0) {
		earth.hOffset = Math.round(rotatingpointwidth / 2 + earthRadius * cos[angle]);
		earth.vOffset = Math.round(main_window.height / 2 - earthRadius * sin[angle]);
		earthOverShadow.rotation = (720 - angle - 90) % 360;
	} else {
		earth.hOffset = Math.round(moon.hOffset + earthRadius * cos[angle]);
		earth.vOffset = Math.round(moon.vOffset - earthRadius * sin[angle]);
	}
	earthUnderShadow.hOffset = earth.hOffset;
	earthUnderShadow.vOffset = earth.vOffset;
	earthOverShadow.hOffset	 = earth.hOffset;
	earthOverShadow.vOffset	 = earth.vOffset;

}
//=================================
//
//=================================

//=================================
//	this is the main function that finally does the work when the ring is rotated
//	causing the date to change and planets to move accordingly
//=================================
function displayDate(currDat, angle0) {
	var angle = dayAngle(currDat),
		angleMod360 = (angle % 360 + 360) % 360,
//		earthAngle = (angleMod360 + 240) % 360,
//		angleMod30 = earthAngle % 30,
		dow = weekDayOf(currDat).toLowerCase(),
		year99,
		sMonth,
		autoOpenPref,
		head;
		
	moonAngle					= angle;	// was dayAngle(currDat);
	earthAngle					= (angleMod360 + 240) % 360;

	year = currDat.getFullYear();
	//log("year" + year);
	month						= currDat.getMonth() + 1;
	day							= currDat.getDate();

	preferences.yearPref.value	= String(year);
	preferences.monthPref.value = String(month);
	preferences.dayPref.value	= String(day);

	year99						= year % 100;
	sMonth						= monthOf(currDat).toLowerCase();

	ringtext.rotation		= -earthAngle;
	counterWheel.rotation		= earthAngle - 51;

	monthCogShadow.rotation		= monthCog.rotation = earthAngle;
	cogShadow.rotation		= cog.rotation = earthAngle;
	wheelShadow.rotation		= wheel.rotation = angle0 - earthAngle;

	dayOfWeek.src				= base + dow + ".png";
	dayTensCounter.src			= base + String(Math.floor(day / 10)) + ".png";
	dayUnitsCounter.src			= base + String(day % 10) + ".png";
	monthCounter.src			= base + sMonth + ".png";
	yearTensCounter.src			= base + String(Math.floor(year99 / 10)) + ".png";
	yearUnitsCounter.src		= base + String(year99 % 10) + ".png";

	updateVitality(currDat);

	gISOdate	 = theISODate(currDat);

	autoOpenPref = preferences.autoOpenPref.value;
	switch (autoOpenPref) {
	case "Always":
		if (!memo_window.visible) {
			openMemoWindow(gISOdate, "");
		}
		break;
	case "Only when it has content":
		head = getMemoLines(gISOdate, 1, 20);
		if ((head !== "") && (!memo_window.visible)) {
			openMemoWindow(gISOdate, "");
		}
		break;
	case "Never":
		break;
	}
	
	earthRotateStyle = 0;
	moveEarth(earthAngle);
	moveMoon(moonAngle);
}

//=================================
//
//=================================
function cal(year, month, day) {
	var currDat = new Date(year, month - 1, day);

	displayDate(currDat, angle0);
	date = currDat;
}

//=====================
//rotate the cog and shadow
//=====================
function counterWheelRotation() {
	var a;
	
	cogrotation = cogrotation + 32;
	a = new RotateAnimation(monthCog, cogrotation, 990, animator.kEaseOut);
	animator.start(a);

	a = new RotateAnimation(monthCogShadow, cogrotation, 990, animator.kEaseOut);
	animator.start(a);

	// the counterWheel rotates opposite to the date ring rotation
	if (currDat <= date) {
		a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
	} else {
		a = new RotateAnimation(counterWheel, cogrotation / 2, 990, animator.kEaseOut);
	}
	animator.start(a);
}
//=====================
//End function
//=====================

//=================================
// Make the large globe controls invisible
//=================================
function controlsInvisible() {
	glow.opacity			 = 0;
	glow.visible			 = false;
	globetop.opacity		 = 0;
	globetop.visible		 = false;
	supportingBar.opacity	 = 0;
	supportingBar.visible	 = false;
	toggle1.opacity			 = 0;
	toggle1.visible			 = false;
	toggle2.opacity			 = 0;
	toggle2.visible			 = false;
	toggle3.opacity			 = 0;
	toggle3.visible			 = false;
	toggle4.opacity			 = 0;
	toggle4.visible			 = false;
	toggle5.opacity			 = 0;
	toggle5.visible			 = false;
	toggle6.opacity			 = 0;
	toggle6.visible			 = false;
	toggle7.opacity			 = 0;
	toggle7.visible			 = false;
	toggleS.opacity			 = 0;
	toggleS.visible			 = false;
	toggleF.opacity			 = 0;
	toggleF.visible			 = false;
	cancel.opacity			 = 0;
	cancel.visible			 = false;

	//if (earth.opacity != 255) {
	earth.opacity = 255;
	earthOverShadow.opacity	 = 170;
	earthUnderShadow.opacity = 255;
	//log("%TIMEK-I-EARTO, earth.opacity " + earth.opacity);
	//}
}

//===========================
//when the expanded globe is double-clicked a click on the ring ought to restore the moon and shadows to normal positions.
//===========================
function largeEarthInvisible() {
	var a, b, c, d, f, g, h;

	largeEarthVisible = false;
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	controlsInvisible();
	//stops the earth spinning
	earthTimer.ticking = false;
	//make the earth visible prior to rotating it back into position
	a = new FadeAnimation(earth, 255, 100, animator.kEaseOut);
	b = new FadeAnimation(earthOverShadow, 179, 100, animator.kEaseOut);
	c = new FadeAnimation(earthUnderShadow, 224, 100, animator.kEaseOut, controlsInvisible);
	d = new RotateAnimation(earth, 180, 1350, animator.kEaseOut);
	f = new MoveAnimation(earth, savEarthHoffset, savEarthVoffset, 1350, animator.kEaseIn);
	g = new MoveAnimation(earthOverShadow, savEarthHoffset, savEarthVoffset, 1350, animator.kEaseIn);
	h = new MoveAnimation(earthUnderShadow, savEarthHoffset, savEarthVoffset, 1350, animator.kEaseIn, controlsInvisible);
	animator.start([
		a, b, c, d, f, g, h
	]);
	a = new FadeAnimation(globe, 0, 1350, animator.kEaseOut);
	b = new FadeAnimation(ring, 0, 1350, animator.kEaseOut);
	animator.start([
		a, b
	]);
}

//=====================
//put the moon shadow back
//=====================
function moonShadowVisible() {
	moonUnderShadow.visible = true;
	moonOverShadow.visible	= true;
	// make the earth visible again, sometimes the animation does not complete and the earth does not become visible
	if (moon.opacity !== 255) {
		moon.opacity = 255;
	}
}
//=====================
//End function
//=====================

//===========================
//Show the small moon after big moon is gone
//===========================
function showSmallMoon() {
	//when the expanded globe is double-clicked a click on the ring ought to restore the moon and shadows to normal positions.
	var a = new MoveAnimation(moon, savMoonHoffset, savMoonVoffset, 3500, animator.kEaseIn, moonShadowVisible),
		b = new MoveAnimation(moonUnderShadow, savMoonHoffset, savMoonVoffset, 3500, animator.kEaseIn),
		c = new MoveAnimation(moonOverShadow, savMoonHoffset, savMoonVoffset, 3500, animator.kEaseIn),
		d = new RotateAnimation(moon, 360, 3500, animator.kEaseIn);

	animator.start([
		a, b, c, d
	]);
}

//==============================
// hides the plaque by changing the opacity
//==============================
missingMoonPlaque.onClick = function () {
	missingMoonPlaque.opacity = 0;
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
};

//===========================
//when the moon widget isn't present, plaque appears
//===========================
function missingMoonPlaqueAppear() {
	var hMiddle = (woodSurround.width / 2) + woodSurround.hOffset - 90,
		vMiddle = (woodSurround.height / 2) + woodSurround.vOffset - 126;

	missingMoonPlaque.opacity = 255;
	missingMoonPlaque.hOffset = hMiddle;
	missingMoonPlaque.vOffset = vMiddle;

	if (preferences.soundPref.value === "enable") {
		play(winding, false);
	}
}

//===========================
//Show the big moon
//===========================
function showBigMoon() {
	var hmod, vmod, newhoffset, newvoffset;

	//var newhoffset = (main_window.hoffset + (42*scale));
	//var newvoffset = (main_window.voffset + (45*scale));

	//286 is the orrey mid-point	when 100%
	//57 is the moon hoffset from its own main_window when full sized
	hmod = 286 * scale;
	vmod = 286 * scale;
	//find the start of the orrery and add the orrery mid-point
	newhoffset = main_window.hoffset + hmod;
	newvoffset = main_window.voffset + vmod;

	/*
	log("scale " +scale);
	log("hmod " +hmod);
	log("vmod " +vmod);
	log("newhoffset " +newhoffset);
	log("newvoffset " +newvoffset);
	log("main_window " +main_window.hoffset);
	*/
	lunarWidgetVisible = true;
	if (preferences.soundPref.value === "enable") {
		play(electricDrone, false);
	}
	if (largeEarthVisible) {
		largeEarthInvisible();
	}
        //it seems that these tellwidgets do not work unless the widget is visible and with full opacity...!
	log("1	  %TIMEK-I-SETD, Moon Phase III", "setPref:hoffset=" + newhoffset);
	if (moonWidgetFound) {
		log("2	 %TIMEK-I-SETD, Moon Phase III", "setPref:hoffset=" + newhoffset);
		tellWidget(preferred_form_location, "setPref:visible=true");
		tellWidget(preferred_form_location, "setPref:hoffset=" + newhoffset);
		tellWidget(preferred_form_location, "setPref:voffset=" + newvoffset);
		tellWidget(preferred_form_location, "setPref:locked=true");
		log("2. Talking to the moon widget setPref:level=normal");
		tellWidget(preferred_form_location, "setPref:level=\"normal\"");

		//send the latitude/longitude to the moon widget.
		tellWidget(preferred_form_location, "setPref:longitude=" + preferences.longitudePref.value);
		tellWidget(preferred_form_location, "setPref:latitude=" + preferences.latitudePref.value);
		tellWidget(preferred_form_location, "setDate:date=" + downDate);


				//sendLatAndLong ();
	} else {
		missingMoonPlaqueAppear();				 // pop up if no widget
	}

	if (preferences.soundPref.value === "enable") {
		play(till, false);
	}

	//log("%TIMEK-I-SETD, Moon Phase III", "setDate:date="+downDate);
	// when the expanded globe is double-clicked a click on the ring ought to restore the moon and shadows to normal positions.
	// for the mo' it is done here in script.js but it should be done by the moon widget
	// telling the timekeeper it is done. Need to include tellwidget code here in order to be
	// able to receive commands.
	showSmallMoon();
}

//===========================
//when the small moon is clicked it will animate the globe growing and then trigger the globe rotating
//===========================
function animateMoonEnlarging() {
	var a, b, c, d;

	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	a = new RotateAnimation(moon, 720, 2350, animator.kEaseIn); //rotate the moon
	b = new MoveAnimation(moon, (288 * scale), (284 * scale), 2350, animator.kEaseIn, showBigMoon);
	c = new MoveAnimation(moonOverShadow, (288 * scale), (284 * scale), 2350, animator.kEaseIn);
	d = new MoveAnimation(moonUnderShadow, (288 * scale), (284 * scale), 2350, animator.kEaseIn);
	animator.start([
		a, b, c, d
	]);
}

//=================================
// automatic moon rotation timer setup
//=================================
var theRotateTimer = new Timer();
theRotateTimer.ticking = false;
theRotateTimer.interval = 0.04;


//=================================
// automatic opacity reset timer
//=================================
var theOpacityTimer = new Timer();
theOpacityTimer.ticking = false;
theOpacityTimer.interval = 15;

//===========================================
// this function rotates the moon  around the earth when the mini-moon is clicked upon
//===========================================
function rotateMoon(moonAngle) {
	// called by a timer, increments values and causes an animation effect of the moon moving
	moonRotationValue = moonRotationValue + 1;
	accelVal = accelVal	 + moonRotationValue;

	//cow angle 9 - tiddly bits ahoy!
	moonAngle = moonAngle + accelVal;	// % 360;
	moveMoon(moonAngle);
		
	// when enough moves have been performed the large earth is displayed and the timer stopped
	if (moonRotationValue >= 30) {
		theRotateTimer.ticking = false;
		moonRotationValue = 0;
		accelVal = 0;
		animateMoonEnlarging();
	}
}
//=====================
//End function
//=====================

//=================================
// Make the large globe controls visible
//=================================
function controlsVisible() {
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}

	globetop.opacity	  = 255;
	globetop.visible	  = true;
	supportingBar.opacity = 255;
	supportingBar.visible = true;
	toggle1.opacity		  = 255;
	toggle1.visible		  = true;
	toggle2.opacity		  = 255;
	toggle2.visible		  = true;
	toggle3.opacity		  = 255;
	toggle3.visible		  = true;
	toggle4.opacity		  = 255;
	toggle4.visible		  = true;
	toggle5.opacity		  = 255;
	toggle5.visible		  = true;
	toggle6.opacity		  = 255;
	toggle6.visible		  = true;
	toggle7.opacity		  = 255;
	toggle7.visible		  = true;
	toggleS.opacity		  = 255;
	toggleS.visible		  = true;
	toggleF.opacity		  = 255;
	toggleF.visible		  = true;
	cancel.opacity		  = 255;
	cancel.visible		  = true;

	allowRingClick		  = true;
}

//=====================
// when the large earth is loaded the small earth is faded and the globe timer activated
//=====================
function onLargeEarthLoad() {
	var a, b, c, d, e;

	allowRingClick = false;
	a = new FadeAnimation(earth, 0, 2350, animator.kEaseOut);
	b = new FadeAnimation(earthUnderShadow, 0, 2350, animator.kEaseOut);
	c = new FadeAnimation(earthOverShadow, 0, 2350, animator.kEaseOut);
	d = new FadeAnimation(globe, 255, 1350, animator.kEaseOut);
	e = new FadeAnimation(ring, 255, 1350, animator.kEaseOut, controlsVisible);
	largeEarthVisible = true;
	animator.start([
		a, b, c, d, e
	]);
	glow.opacity  = 255; // this is done because when the object is created it is set to minimum opacity
	glow.visible  = true;
	earthBaseName = base + "globe/Earth-spinning_";
	if (preferences.earthTurnPref.value === "Fast") {
		earthTimer.interval = 0.1;
	} else if (preferences.earthTurnPref.value === "Slow") {
		earthTimer.interval = 0.3;
	}
	globe.src = earthBaseName + earthFrame + ".png";
	if (preferences.soundPref.value === "enable") {
		play(till, false);
	}

	earthTimer.ticking = true;
}
//=====================
//End function
//=====================

//===========================
// tell the moon widget to close
//===========================
function closeLunarWidget() {
	log("closing the moon widget");
	if (lunarWidgetVisible) {
		log("moon widget is visible");
		if (moonWidgetFound) {
			log("1. Talking to the moon widget");
			tellWidget(preferred_form_location, "setPref:visible=false");
		}
	}
}

//===========================
//when the small earth is clicked it will animate the globe growing and then trigger the globe rotating
//===========================
function animateEarthEnlarging() {
	var a, c, d, e,
		glowHoffset,
		glowVoffset;

	allowRingClick	= false;

	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	a = new RotateAnimation(earth, 720, 2350, animator.kEaseIn);
	//230,250 is the location of the glow, the earth moves to the glow
	glowHoffset = 230;
	glowVoffset = 250;
	if (preferences.earthSizePref.value === "0.5") {
		glowHoffset = 255;
		glowVoffset = 275;
	}
	if (preferences.earthSizePref.value === "0.6") {
		glowHoffset = 250;
		glowVoffset = 270;
	}
	if (preferences.earthSizePref.value === "0.7") {
		glowHoffset = 245;
		glowVoffset = 265;
	}
	if (preferences.earthSizePref.value === "0.8") {
		glowHoffset = 240;
		glowVoffset = 260;
	}
	if (preferences.earthSizePref.value === "0.9") {
		glowHoffset = 235;
		glowVoffset = 255;
	}
	if (preferences.earthSizePref.value === "1.0") {
		glowHoffset = 230;
		glowVoffset = 250;
	}

	c = new MoveAnimation(earth, (glowHoffset * scale), (glowVoffset * scale), 2350, animator.kEaseIn, onLargeEarthLoad);
	d = new MoveAnimation(earthUnderShadow, (glowHoffset * scale), (glowVoffset * scale), 2350, animator.kEaseIn);
	// move the earth over-shadow, then tell the moon widget to close
	// it does this just in case the moon is open and running (you can click on both planets)
	e = new MoveAnimation(earthOverShadow, (glowHoffset * scale), (glowVoffset * scale), 2350, animator.kEaseIn, closeLunarWidget);
	animator.start([
		a, c, d, e
	]);
}

//=================================
// automatic earth rotation timer setup
//=================================
var theEarthRotateTimer = new Timer();
theEarthRotateTimer.ticking = false;
theEarthRotateTimer.interval = 0.04;

//===========================================
// this function rotates the earth around the moon when the mini-earth is clicked upon
//===========================================
function rotateEarth(earthAngle) {
	// called by a timer, increments values and causes an animation effect of the earth moving
	earthRotationValue = earthRotationValue + 1;
	accelVal = accelVal + 1 + earthRotationValue;

	earthAngle = moonAngle;
	earthAngle = earthAngle + accelVal;
	earthRotateStyle = 1;

	moveEarth(earthAngle);

	// when enough moves have been performed the large earth is displayed and the timer stopped
	if (earthRotationValue >= 40) {
		theEarthRotateTimer.ticking = false;
		earthRotationValue = 0;
		accelVal = 0;
		animateEarthEnlarging();
	}
}
//=====================
//End function
//=====================

//=================================
// display time, called by a timer
//=================================
function displayTime(currDat) {
	var hours = currDat.getHours() % 12,
		mins  = currDat.getMinutes(),
		secs  = currDat.getSeconds();

	hourHand.rotation	= Math.floor(30 * hours + mins / 2);
	minuteHand.rotation = Math.floor(6 * mins + secs / 10);
	secondHand.rotation = 6 * secs;
		
		// when the mouse wheel has been used ten times then perform a counterWheelRotation
	if (useMouseWheel > 10) {
		useMouseWheel = 0;
		counterWheelRotation();
	}
}

//=================================
// timers start here
//=================================

//=================================
// widget inline help timer setup
//=================================
var widgetHelpTimer = new Timer();
widgetHelpTimer.ticking = false;
widgetHelpTimer.interval = 0.1;
//=================================
// timer to fade the inline help
//=================================
widgetHelpTimer.onTimerFired = function () {
	widgetHelp.opacity = widgetHelp.opacity - 1;
	if (widgetHelp.opacity <= 0) { widgetHelpTimer.ticking = false; }
};
// timer ends

//=================================
// timer to perform moon animations when clicked
//=================================
theRotateTimer.onTimerFired = function () {
	rotateMoon(moonAngle);
	//log("2 moonAngle " + moonAngle);
};
// timer ends

//=================================
// timer to perform moon animations when clicked
//=================================
theOpacityTimer.onTimerFired = function () {
        log ("theOpacityTimer.onTimerFired ");
        theOpacityTimerCounter = theOpacityTimerCounter + 1;
        if (theOpacityTimerCounter >= 2) {
           resetUnderlyingGlass();
       	   theOpacityTimer.ticking = false;
        }
};
// timer ends

//=================================
// timer to perform earth animations when clicked
//=================================
theEarthRotateTimer.onTimerFired = function () {
	rotateEarth(earthAngle);
};
// timer ends

//=================================
// date timer setup
//=================================
var theTimer = new Timer();
theTimer.ticking = false;
theTimer.interval = 5;
//=================================
// timer to update the date
//=================================
theTimer.onTimerFired = function () {
	updateDate(false);
};
// timer ends

//=================================
// timer setup
//=================================
var timer = new Timer();
timer.ticking = false;
timer.interval = 1;
//=================================
// timer to display time
//=================================
timer.onTimerFired = function () {
	displayTime(new Date());
};
// timer ends

//=================================
// cog rotation timer setup
//=================================
var cogtimer = new Timer();
cogtimer.ticking = false;
cogtimer.interval = 1;
//=================================
// timer to determine cog rotation
//=================================
cogtimer.onTimerFired = function () {
	var a;
	// rotate the components using a simple modification of the rotate property
	if (preferences.cogAnimatePref.value === "disable") {
		cog.rotation = cog.rotation - 4;
		cogShadow.rotation = cogShadow.rotation - 4;
		wheel.rotation = wheel.rotation - 16;
		wheelShadow.rotation = wheelShadow.rotation - 16;
		counterWheel.rotation = counterWheel.rotation - 16;
	} else {
	// rotate the components using the rotation animation - more cpu
		cogrotation = cogrotation + 32;
		a			= new RotateAnimation(cog, cogrotation, 990, animator.kEaseOut);
		animator.start(a);

		a = new RotateAnimation(cogShadow, cogrotation, 990, animator.kEaseOut);
		animator.start(a);

		a = new RotateAnimation(wheel, -cogrotation, 990, animator.kEaseOut);
		animator.start(a);

		a = new RotateAnimation(wheelShadow, -cogrotation, 990, animator.kEaseOut);
		animator.start(a);

		a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
		animator.start(a);

		modulo_cnt = modulo_cnt + 1;
		if (modulo_cnt <= 10) {
			return;
		}
		modulo_cnt = 0;

		a		   = new RotateAnimation(monthCog, -cogrotation / 2, 990, animator.kEaseOut);
		animator.start(a);

		a = new RotateAnimation(monthCogShadow, -cogrotation / 2, 990, animator.kEaseOut);
		animator.start(a);
	}
};
// timer ends

//=================================
// timer to determine tic/tocking
//=================================
var tickTimer = new Timer();
tickTimer.ticking = false;
tickTimer.interval = 1;
//===========================================
// timer to play tick sound
//===========================================
tickTimer.onTimerFired = function () {
	if (preferences.tickPref.value === "enable") {
		tickTimer.interval = 30;
		log("%TIMEK-I-PLAT, playing ticktock");
		play(ticktock, false);
	}
};
// timer ends

//=================================
// automate cog movement timer
//=================================
var theAutomateTimer = new Timer();
theAutomateTimer.ticking = true;
theAutomateTimer.interval = 2;
//=================================
// timer to automate the movement of the cogs on startup - in & out
//=================================
theAutomateTimer.onTimerFired = function () {
	if (preferences.animatePref.value === "enable") {
		timekeeperclickpointleft.onClick();
	}
	if (AutomateTimerCnt === 2) {
		theAutomateTimer.ticking = false;
	} else {
		AutomateTimerCnt = AutomateTimerCnt + 1;
	}
};
// timer ends

//=================================
// timers END
//=================================

//==============================
//the default condition of the mask is a 1% opaque seemingly blank PNG
// reason for this is that a 1% opaque layer is still clickable/hoverable.
//==============================
function highlightRedGone() {
	innerFramesclickpointleft.src	 = "Resources/Orrery/blank.png";
	innerFramesclickpointright.src	 = "Resources/Orrery/blank.png";
	innerFramesclickpointtop.src	 = "Resources/Orrery/blank.png";
	clockclickpointleft.src			 = "Resources/Orrery/blank.png";
	clockclickpointcentre.src		 = "Resources/Orrery/blank.png";
	clockclickpointright.src		 = "Resources/Orrery/blank.png";
	timekeeperclickpointleft.src	 = "Resources/Orrery/blank.png";
	timekeeperclickpointmiddle.src	 = "Resources/Orrery/blank.png";
	timekeeperclickpointright.src	 = "Resources/Orrery/blank.png";
	timekeeperclickpointfarright.src = "Resources/Orrery/blank.png";
	timekeeperclickpointbottom.src	 = "Resources/Orrery/blank.png";
	driveBandclickpoint.src			 = "Resources/Orrery/blank.png";
}

//=================================
// timer to fade the highlighted click points in & out
//=================================
var theFadeTimer = new Timer();
theFadeTimer.ticking = false;
theFadeTimer.interval = 8;

theFadeTimer.onTimerFired = function () {
	highlightRedGone();
	theFadeTimer.ticking = false;
};

//=================================
//
//=================================
var sharedUpdateTimer = new Timer();
sharedUpdateTimer.ticking = false;
sharedUpdateTimer.interval = 900;

sharedUpdateTimer.onTimerFired = function () {
	sharedUpdateTimerFired();
};

//=================================
// speech timer
//=================================
var speechTimer = new Timer();
speechTimer.ticking = false;
speechTimer.interval = 5;

speechTimer.onTimerFired = function () {
	speechTimer.ticking = false;
	speakMemoToggle		= false;
};

var memoFolderPath = null;
var multiUser = false;
var disallowAutoOpenPref = true;
var specialMode = false;

//=================================================
// function to check whether the moon widget exists
//=================================================
function checkMoonWidget() {
	var expandedForm_location, widgetForm_location, answer;
	if (preferences.checkMoonWidgetPref.value === "enable") {
		log("%TIMEK-I-CHKM, 1 Checking the moon widget is installed.");
		log("%TIMEK-I-CHKM, 2 Checking system.userWidgetsFolder - " + system.userWidgetsFolder);
		
                if (debug == 0) {
                   expandedForm_location = preferences.widgetLocationPref.value;
                } else {
		   // temporary development version of the widget
		   log("%TIMEK-I-CHKM, D:/DEAN/steampunk theme/Moon_Phase_III/Contents/moon_phase_iii.kon ");
		   expandedForm_location = "D:/DEAN/steampunk theme/Moon_Phase_III/Contents/moon_phase_iii.kon";
                }

    		//widget form
    		widgetForm_location = system.userWidgetsFolder + "/Moon_Phase_III.widget";
    		//log("widgetForm_location ", widgetForm_location);

		// use the expanded form in preference to the .widget form
		if (expandedForm_location !== "") {
			log("Checking expanded form ", expandedForm_location);
			if (filesystem.itemExists(expandedForm_location)) {
				log("%TIMEK-I-CHKM, 3 Checking expanded form of the Moon widget - " + filesystem.itemExists(expandedForm_location));
				preferred_form_location = expandedForm_location;
			} else if (filesystem.itemExists(widgetForm_location)) {
				log("%TIMEK-I-CHKM, 4 Checking widget form of the Moon widget - " + filesystem.itemExists(widgetForm_location));
				preferred_form_location = widgetForm_location;
			}
		} else {
			preferred_form_location = widgetForm_location;
			log("preferred_form_location ", preferred_form_location);
		}

		log("Checking either form ");
		log("Checking expandedForm_location ", expandedForm_location);
		log("Checking widgetForm_location ", widgetForm_location);
		if (filesystem.itemExists(expandedForm_location) || filesystem.itemExists(widgetForm_location)) {
			log("%TIMEK-I-CHKM, 5 Moon widget III is installed." + preferred_form_location);
			moonWidgetFound = true;
			play(tingingSound, false);
		} else {
			moonWidgetFound = false;
			log("%TIMEK-I-CHKM, Moon widget III is NOT installed.");
			if (preferences.checkMoonWidgetPref.value === "enable") {
				answer = alert("The Moon Phase III widget was not found - it is part of the essential function of this widget, please download it and install it and run it, click on Open Browser Window to go to the download location for the moon phase widget.", "Open Browser Window", "No Thanks", "Don't ever ask me again");
				if (answer === 1) {
					openURL("http://lightquick.co.uk/steampunk-moon-phase-III-widget.html?Itemid=264");
					if (preferences.soundPref.value === "enable") {
						play(winding, false);
					}
				}
				if (answer === 3) {
					if (preferences.soundPref.value === "enable") {
						play(tingingSound, false);
					}
					preferences.checkMoonWidgetPref.value = "disable";
				}
			}
		}
	}
}
//=====================
//End function
//=====================

//=================================================
// function to check whether the moon widget exists
//=================================================
function checkUnderWidget() {
	var expandedForm_location, widgetForm_location, answer;

	if (preferences.underWidgetPref.value === "enable") {
		log("%TIMEK-I-CHKM, Checking the under widget is installed.");
		log("%TIMEK-I-CHKM, system.userWidgetsFolder - " + system.userWidgetsFolder);
		//expanded form
		expandedForm_location = preferences.underwidgetLocationPref.value;
		//expandedForm_location = system.userWidgetsFolder + "/underwidget/Contents/underwidget.kon";
		// temporary development version of the widget
		//expandedForm_location = "D:/DEAN/steampunk theme/underwidget/Contents/underwidget.kon";

		//widget form
		widgetForm_location = system.userWidgetsFolder + "/underwidget.widget";

		// use the expanded form in preference to the .widget form
		if (expandedForm_location !== "") {
			log("Checking expanded form ", expandedForm_location);
			if (filesystem.itemExists(expandedForm_location)) {
				log("%TIMEK-I-CHKM, Checking expanded form of the under widget - " + filesystem.itemExists(expandedForm_location));
				under_preferred_form_location = expandedForm_location;
			} else if (filesystem.itemExists(widgetForm_location)) {
				log("%TIMEK-I-CHKM, Checking widget form of the under widget - " + filesystem.itemExists(widgetForm_location));
				under_preferred_form_location = widgetForm_location;
			}
		} else {
			under_preferred_form_location = widgetForm_location;
			log("under_preferred_form_location ", under_preferred_form_location);
		}

		if (filesystem.itemExists(expandedForm_location) || filesystem.itemExists(widgetForm_location)) {
			log("%TIMEK-I-CHKM, under widget is installed." + under_preferred_form_location);
			underWidgetFound = true;
			play(tingingSound, false);
		} else {
			underWidgetFound = false;
			log("%TIMEK-I-CHKM, under widget is NOT installed.");

			if (preferences.underWidgetPref.value === "enable") {
				answer = alert("The under widget was not found - it is an optional part of this widget that provides the cogs and working gubbins, please download it, install it and run it. Click on Open Browser Window to open the download location for the under widget.", "Open Browser Window", "No Thanks", "Don't ever ask me again");
				if (answer === 1) {
					openURL("http://lightquick.co.uk/underwidget.html?Itemid=264");
					if (preferences.soundPref.value === "enable") {
						play(winding, false);
					}
				}
				if (answer === 3) {
					if (preferences.soundPref.value === "enable") {
						play(tingingSound, false);
					}
					preferences.underWidgetPref.value = "disable";
				}
			}
		}
	}
}
//=====================
//End function
//=====================

//=====================
// set the tooltips of the click points
//=====================
function setClickPointToolTips() {
	if (preferences.tooltipPref.value === "enable") {
		innerFramesclickpointleft.tooltip	 = bf("bringsUpTheAboutBox");
		innerFramesclickpointright.tooltip	 = bf("resizeThisWidget");
		innerFramesclickpointtop.tooltip	 = bf("openHelpPageForThisWidget");
		clockclickpointleft.tooltip			 = bf("MovesTheClockAndCogs");
		clockclickpointcentre.tooltip		 = bf("HideTheClockByClickingHere");
		clockclickpointright.tooltip		 = bf("HidesTheOrreryAndWheelCluster");
		timekeeperclickpointleft.tooltip	 = bf("MovesAllTheWindingGear");
		timekeeperclickpointmiddle.tooltip	 = "hides the tooltips and hover points";
		timekeeperclickpointright.tooltip	 = bf("ThisScrewCausesTheCalendarToReset");
		timekeeperclickpointfarright.tooltip = bf("ThisTogglesTheSound");
		timekeeperclickpointbottom.tooltip	 = bf("ThisShowsThePreferences");
		driveBand.tooltip					 = bf("ClickHereToCauseWheelsAndCogsToMove");
		driveBandclickpoint.tooltip			 = bf("ClickHereToCauseWheelsAndCogsToMove");
		cancel.tooltip						 = bf("ClickOnTheOuterRingToMoveOrDrag");	//Click on the cancel button
		globe.tooltip						 = bf("SingleClickToStopMeSpinning");		//Single click to stop me spinning.
		clockReflection.tooltip					= bf("ClickHereToShowHelp");		//Single click to stop me spinning.
		globetop.tooltip	  = bf("BringBackResizingBar");
		glass.tooltip		  = bf("ClickToOpenMemo"); //Single click to stop me spinning.
		toggle1.tooltip		  = bf("ClickButtonReduceGlobe");
		toggle2.tooltip		  = bf("ClickButtonReduceGlobe");
		toggle3.tooltip		  = bf("ClickButtonReduceGlobe");
		toggle4.tooltip		  = bf("ClickButtonReduceGlobe");
		toggle5.tooltip		  = bf("ClickButtonReduceGlobe");
		toggle6.tooltip		  = bf("ClickButtonReduceGlobe");
		toggle7.tooltip		  = bf("ClickButtonReduceGlobe");

		toggleF.tooltip		  = bf("ClickButtonSpeedRotation");
		toggleS.tooltip		  = bf("ClickButtonSlowRotation");

		opacitySlider.tooltip = bf("ThisSliderControlsTheOpacity");
		sizeSlider.tooltip	  = bf("ThisSliderControlsTheSize");
		tickingSlider.tooltip	  = bf("ThisSliderControlsTheTicking");
		pin.tooltip	   = bf("thisPinUnlocksTheWidget");
		popUpPlaque.tooltip		= bf("clickHereToMakeMeGoAway");
		plaqueButton.tooltip	= bf("clickHereToOpenHelp");
	} else {
		innerFramesclickpointleft.tooltip	 = "";
		innerFramesclickpointright.tooltip	 = "";
		innerFramesclickpointtop.tooltip	 = "";
		clockclickpointleft.tooltip			 = "";
		clockclickpointcentre.tooltip		 = "";
		clockclickpointright.tooltip		 = "";
		timekeeperclickpointleft.tooltip	 = "";
		timekeeperclickpointmiddle.tooltip	 = "";
		timekeeperclickpointright.tooltip	 = "";
		timekeeperclickpointfarright.tooltip = "";
		timekeeperclickpointbottom.tooltip	 = "";
		driveBand.tooltip					 = "";
		driveBandclickpoint.tooltip			 = "";
		ring.tooltip						 = "";
		globe.tooltip						 = "";
		clockReflection.tooltip					= "";
		globetop.tooltip	  = "";
		glass.tooltip		  = "";
		toggle1.tooltip		  = "";
		toggle2.tooltip		  = "";
		toggle3.tooltip		  = "";
		toggle4.tooltip		  = "";
		toggle5.tooltip		  = "";
		toggle6.tooltip		  = "";
		toggle7.tooltip		  = "";

		toggleF.tooltip		  = "";
		toggleS.tooltip		  = "";

		opacitySlider.tooltip = "";
		sizeSlider.tooltip	  = "";
		tickingSlider.tooltip	  = "";
		pin.tooltip	   = "";
		popUpPlaque.tooltip		= "";
		plaqueButton.tooltip	= "";
	}
}
//=====================
//End function
//=====================

//=====================
// Function to move the main_window onto the main screen in the viewable area
//=====================
function mainScreen() {

    // if the mainWindow is not visible all the v/hoffsets return a false (-1) value
    // if the widget is off screen then move into the viewable window

	if (main_window.hOffset < 0) {
		main_window.hOffset = 10;
	}
	if (main_window.vOffset < 32) {
		main_window.vOffset = 32; // avoid Mac toolbar
	}
	if (main_window.hOffset > screen.width - 50) {
		main_window.hOffset = screen.width - main_window.width;
	}
	if (main_window.vOffset > screen.height - 50) {
		main_window.vOffset = screen.height - main_window.height; // avoid Mac dock
	}
    /*
    // calculate the current hlocation in % of the screen
    //store the current hlocation in % of the screen
    if ( preferences.hLocationPercPref.value != 0) {
      preferences.hLocationPercPref.value = (mainWindow.hoffset / screen.width)* 100;
    }
    if ( preferences.vLocationPercPref.value != 0) {
      preferences.vLocationPercPref.value = (mainWindow.voffset / screen.height)* 100;
    }
    
    */
    
    // now move the widget to a preferred location if one has been set
    if (preferences.hoffsetpref.value > 0) {
        mainWindow.hOffset = parseInt(preferences.hoffsetpref.value, 10);
    }
    if (preferences.voffsetpref.value > 0) {
        mainWindow.vOffset = parseInt(preferences.voffsetpref.value, 10);
    }





}

//=====================
//function to set the initial state of the size slider
//=====================
function setSizeSlider() {
	sizeSlider.rotation = ((preferences.scalePref.value / 4.54) - 1) - 14;
	//log("preferences.scalePref.value " + preferences.scalePref.value);
	sizeText.text = preferences.scalePref.value + "%";
}
//=====================
//End function
//=====================

//=====================
//function to set the initial state of the ticking slider
//=====================
function setTickingSlider() {
	if (preferences.cogAnimatePref.value === "enable") {
		tickingSlider.rotation = 0;
	} else {
		tickingSlider.rotation = -20;
	}
}
//=====================
//End function
//=====================

//=====================
//function to set the initial state of the opacity slider
//=====================
function setOpacitySlider() {
	var opacityLevel = opacitySlider.rotation + 9; //normalise the opacity level
	
	underlyingGlass.opacity = opacityLevel * 12;
	opacitySlider.rotation = (preferences.glassOpacityPref.value / 12) - 9;
}
//=====================
//End function
//=====================

//===========================================
// set the tooltips for all hover points
//===========================================
function setTooltips() {
	if (preferences.tooltipPref.value === "enable") {
		pseudoRotatingRing.tooltip = bf("dragTheRing");
		monthCounter.tooltip = bf("monthScroll");
		moon.tooltip		 = bf("moonClick");
		earth.tooltip		 = bf("earthClick");
		yearCounter.tooltip	 = bf("yearScroll");
		dayCounter.tooltip	 = bf("dayScroll");
		if (!main_window.locked) {
			underlyingGlass.tooltip = bf("draggingTooltip");
		} else {
			underlyingGlass.tooltip = bf("deanAndHarryTooltip");
		}
	} else {
		pseudoRotatingRing.tooltip = "";
		monthCounter.tooltip = "";
		moon.tooltip		 = "";
		earth.tooltip		 = "";
		yearCounter.tooltip	 = "";
		dayCounter.tooltip	 = "";
		underlyingGlass.tooltip = "";
		sizeSlider.tooltip	 = "";
		innerFrames.tooltip	 = "";
	}
}
//=====================
//End function
//=====================


//==============================
// load the widget
//==============================
widget.onload = function () {


	var specialMode,
		currDat;
        
    debugFlg = preferences.debugflgPref.value;    
        
        print (" debugFlg " + debugFlg);
    
    if (debugFlg == 1) {
        preferences.imageEditPref.hidden=false;		
    } else {
        preferences.imageEditPref.hidden=true;		
    }

	// play sounds on startup
	if (preferences.soundPref.value === "enable") {
		play(electricDrone, false);
	}

	// check whether the under widget is installed
	checkUnderWidget();

	// check whether the moon widget is installed
	checkMoonWidget();


	//move the sound control toggle according to how prefs are set
	if (preferences.soundPref.value !== "enable") {
		soundtoggle.hoffset = soundtoggle.hoffset - (10 * scale);
		timekeeperclickpointfarright.hoffset = timekeeperclickpointfarright.hoffset - (10 * scale);
	}

	// set the widget lock status if pinned
	if (preferences.widgetLockPref.value === "enabled") {
		main_window.locked = true;
		if (moonWidgetFound) {
                  	log("99	  %TIMEK-I-SETD, Moon Phase III", "setPref:locked=true");
			//tellWidget(preferred_form_location, "setPref:locked=true");
			//beep();	// ******
		}
		pin.opacity = 255;
		pin.hoffset = preferences.pinHoffsetPref.value * scale;
		pin.Voffset = preferences.pinVoffsetPref.value * scale;
	}

	multiUser = (preferences.sharedMemoFolderPref.value === "1") && (preferences.sharedDirectoryPref.value !== "");

	// include the required scripts
	include("Resources/Scripts/SPEAK.js");
	include("Resources/Scripts/utils.js");
	include("Resources/Scripts/sunService.js");
	include("Resources/Scripts/service.js");
	include("Resources/Scripts/cardOrdinals.js");
	include("Resources/Scripts/memo_window.js");
	if (multiUser) {
		include("Resources/Scripts/sharedMemos.js");
	} else {
		include("Resources/Scripts/memos.js");
	}
	include("Resources/Scripts/preferences.js");
	include("Resources/Scripts/MCmain.js");
	include("Resources/Scripts/main.js");
	include("Resources/Scripts/prefs.js");
	include("Resources/Scripts/vitality.js");

	include("Resources/Licence/Licence.js");

	memoFolderPath		 = updateMemoFolder();
	accessMode		 = preferences.accessModePref.value;
	disallowAutoOpenPref = (preferences.allowAutoOpenPref.value === "0");

	if (multiUser) {
		if (disallowAutoOpenPref) {
			preferences.autoOpenPref.value = "Never";
		}
		sharedUpdateTimer.interval = 60 * Number(preferences.sharedUpdateTimerPref.value);
		sharedUpdateTimer.ticking  = true;
		accessMode				   = preferences.sharedModePref.value;
	} else {
		sharedUpdateTimer.ticking = false;
	}

	eprint('onLoad:changeMode:memoFolderPath: ' + filesystem.changeMode(memoFolderPath, addModes(accessMode, "0111")));

	logMemoFolder();

	if (multiUser) {
		makeMemoLock(accessMode);
	}

	updateMemoPrefs();
	updateSunPrefs();

	preferences.accessModePref.hidden = preferences.sharedModePref.hidden = (systemPlatform !== "macintosh");

	specialMode = filesystem.itemExists(memoFolderPath + "/noHotKeys.txt") || system.event.alphaLockKey;

	if (!specialMode) {
		makeSelectHotKey(preferences.selectHotKeyPref.value, selectMonth);
		makeSpeechHotKey(preferences.speechHotKeyPref.value, speakMemo);
		makeSearchHotKey(preferences.searchHotKeyPref.value, findMemo);
	}

	setPrefs();

	//add options to the widget's main right click menu
	setContextMenu();

	anchorX = Number(preferences.anchorXPref.value);
	anchorY = Number(preferences.anchorYPref.value);

	anchorWindow(memo_window.width, memo_window.height);

	currDat = new Date();
	angle0 = dayAngle(currDat) - 120;

	if (preferences.autoModePref.value === "1") {
		updateDate(false);
	} else {
		year  = parseInt(preferences.yearPref.value, 10);
		month = Number(preferences.monthPref.value);
		day	  = parseInt(preferences.dayPref.value, 10);
		if ((1900 <= year) && (year <= lastYear) && (0 < day) && (day <= daysInMonth(year, month))) {
			cal(year, month, day);
		} else {
			displayDate(currDat, angle0);
			date = currDat;
		}
	}

	//set the size slider
	setSizeSlider();
	//set the ticking slider   
	setTickingSlider();
	// set the opacity slider
	setOpacitySlider();
	underlyingGlass.opacity = preferences.glassOpacityPref.value;

	// if the moon widget is found set the widget to sit above the others
	if (moonWidgetFound) {
		//main_window.level = "below";
		log("2. Talking to the moon widget setPref:visible=false");
		tellWidget(preferred_form_location, "setPref:visible=false");
	}

	// if the under widget is found set the widget to sit below the others
	if (underWidgetFound === true) {
		//main_window.level = "below";
		//tellWidget(under_preferred_form_location, "setPref:visible=false");
		log("Talking to the under widget");
		tellWidget(under_preferred_form_location, "setPref:level=\"below\"");
	}

	displayTime(currDat);
	timer.ticking = true;

	// ensure the widget stays on screen
	mainScreen();

	// create the licence window
	createLicence(main_window);

	// set the tooltips for all hover points
	setTooltips();

	// set the tooltips for all click points on the rings and timekeeper itself
	setClickPointToolTips();
};

//==============================
// Widget unload function
//==============================
widget.onUnload = function () {
	SPEAK.reset();

	preferences.anchorXPref.value = String(memo_window.hOffset);
	preferences.anchorYPref.value = String(memo_window.vOffset);

	saveAnchorPoint(); // for memo window

	deleteSelectHotKey();
	deleteSpeechHotKey();
	deleteSearchHotKey();
};

//==============================
//
//==============================
widget.onWillChangePreferences = function () {
	oldSelectHotKeyPref = preferences.selectHotKeyPref.value;
	oldSpeechHotKeyPref = preferences.speechHotKeyPref.value;
	oldSearchHotKeyPref = preferences.searchHotKeyPref.value;
	oldMemoScalePref	= preferences.memoScalePref.value;
};

//==============================
//	Re-position the components that comprise the large earth globe
//==============================
function repositionEarthGlobe() {
	var hModifier = null,
		vModifier = null;

	// I could have done the resizng mathematically but all attempts failed
	// due to inconsistencies in the maths I was using, the components are
	// now placed manually using modifiers.

	//0.6
	if (preferences.earthSizePref.value === "0.5") {
		hModifier = 145 * scale; //87;
		vModifier = 143 * scale; // 86;
	}
	if (preferences.earthSizePref.value === "0.6") {
		hModifier = 115 * scale; //69;
		vModifier = 112 * scale; //67;
	}
	if (preferences.earthSizePref.value === "0.7") {
		hModifier = 85 * scale; //51;
		vModifier = 83 * scale; //50;
	}
	if (preferences.earthSizePref.value === "0.8") {
		hModifier = 58 * scale; //35;
		vModifier = 55 * scale; //33;
	}
	if (preferences.earthSizePref.value === "0.9") {
		hModifier = 28 * scale; //17;
		vModifier = 25 * scale; //15;
	}
	if (preferences.earthSizePref.value === "1.0") {
		hModifier = 0;
		vModifier = 0;
	}
	//log("hModifier "+hModifier);
	vModifier			  = 5 * scale + vModifier;

	globe.hoffset		  = origGlobeHoffset * preferences.earthSizePref.value + hModifier;
	globe.voffset		  = origGlobeVoffset * preferences.earthSizePref.value + vModifier;

	ring.hoffset		  = origRingHoffset * preferences.earthSizePref.value + hModifier;
	ring.voffset		  = origRingVoffset * preferences.earthSizePref.value + vModifier;

	glow.hoffset		  = origGlowHoffset * preferences.earthSizePref.value + hModifier;
	glow.voffset		  = origGlowVoffset * preferences.earthSizePref.value + vModifier;

	globetop.hoffset	  = origGlobeTopHoffset * preferences.earthSizePref.value + hModifier;
	globetop.voffset	  = origGlobeTopVoffset * preferences.earthSizePref.value + vModifier;

	supportingBar.hoffset = origSupportingBarHoffset * preferences.earthSizePref.value + hModifier;
	supportingBar.voffset = origSupportingBarVoffset * preferences.earthSizePref.value + vModifier;
	toggle1.hoffset		  = origToggle1Hoffset * preferences.earthSizePref.value + hModifier;
	toggle1.voffset		  = origToggle1Voffset * preferences.earthSizePref.value + vModifier;
	toggle2.hoffset		  = origToggle2Hoffset * preferences.earthSizePref.value + hModifier;
	toggle2.voffset		  = origToggle2Voffset * preferences.earthSizePref.value + vModifier;
	toggle3.hoffset		  = origToggle3Hoffset * preferences.earthSizePref.value + hModifier;
	toggle3.voffset		  = origToggle3Voffset * preferences.earthSizePref.value + vModifier;
	toggle4.hoffset		  = origToggle4Hoffset * preferences.earthSizePref.value + hModifier;
	toggle4.voffset		  = origToggle4Voffset * preferences.earthSizePref.value + vModifier;
	toggle5.hoffset		  = origToggle5Hoffset * preferences.earthSizePref.value + hModifier;
	toggle5.voffset		  = origToggle5Voffset * preferences.earthSizePref.value + vModifier;
	toggle6.hoffset		  = origToggle6Hoffset * preferences.earthSizePref.value + hModifier;
	toggle6.voffset		  = origToggle6Voffset * preferences.earthSizePref.value + vModifier;
	toggle7.hoffset		  = origToggle7Hoffset * preferences.earthSizePref.value + hModifier;
	toggle7.voffset		  = origToggle7Voffset * preferences.earthSizePref.value + vModifier;
	toggleS.hoffset		  = origToggleSHoffset * preferences.earthSizePref.value + hModifier;
	toggleS.voffset		  = origToggleSVoffset * preferences.earthSizePref.value + vModifier;
	toggleF.hoffset		  = origToggleFHoffset * preferences.earthSizePref.value + hModifier;
	toggleF.voffset		  = origToggleFVoffset * preferences.earthSizePref.value + vModifier;
	cancel.hoffset		  = origCancelHoffset * preferences.earthSizePref.value + hModifier;
	cancel.voffset		  = origCancelVoffset * preferences.earthSizePref.value + vModifier;
	//log("toggle4.hoffset "+toggle4.hoffset);
	//log("toggle2.hoffset "+toggle2.hoffset);
}

//==============================
//	Resize the components that comprise the large earth globe
//==============================
function resizeEarthGlobe() {

	globe.width			 = origGlobeWidth * preferences.earthSizePref.value;
	globe.height		 = origGlobeHeight * preferences.earthSizePref.value;

	ring.width			 = origRingWidth * preferences.earthSizePref.value;
	ring.height			 = origRingHeight * preferences.earthSizePref.value;

	glow.width			 = origGlowWidth * preferences.earthSizePref.value;
	glow.height			 = origGlowHeight * preferences.earthSizePref.value;

	globetop.width		 = origGlobeTopWidth * preferences.earthSizePref.value;
	globetop.height		 = origGlobeTopHeight * preferences.earthSizePref.value;

	supportingBar.width	 = origSupportingBarWidth * preferences.earthSizePref.value;
	supportingBar.height = origSupportingBarHeight * preferences.earthSizePref.value;

	toggle1.width		 = origToggle1Width * preferences.earthSizePref.value;
	toggle1.height		 = origToggle1Height * preferences.earthSizePref.value;

	toggle2.width		 = origToggle2Width * preferences.earthSizePref.value;
	toggle2.height		 = origToggle2Height * preferences.earthSizePref.value;

	toggle3.width		 = origToggle3Width * preferences.earthSizePref.value;
	toggle3.height		 = origToggle3Height * preferences.earthSizePref.value;

	toggle4.width		 = origToggle4Width * preferences.earthSizePref.value;
	toggle4.height		 = origToggle4Height * preferences.earthSizePref.value;

	toggle5.width		 = origToggle5Width * preferences.earthSizePref.value;
	toggle5.height		 = origToggle5Height * preferences.earthSizePref.value;

	toggle6.width		 = origToggle6Width * preferences.earthSizePref.value;
	toggle6.height		 = origToggle6Height * preferences.earthSizePref.value;

	toggle7.width		 = origToggle7Width * preferences.earthSizePref.value;
	toggle7.height		 = origToggle7Height * preferences.earthSizePref.value;

	toggleS.width		 = origToggleSWidth * preferences.earthSizePref.value;
	toggleS.height		 = origToggleSHeight * preferences.earthSizePref.value;

	toggleF.width		 = origToggleFWidth * preferences.earthSizePref.value;
	toggleF.height		 = origToggleFHeight * preferences.earthSizePref.value;

	cancel.width		 = origCancelWidth * preferences.earthSizePref.value;
	cancel.height		 = origCancelHeight * preferences.earthSizePref.value;
		
		//after resizing, place them in the correct position
	repositionEarthGlobe();
}

//==============================
// moved the stuff that is done when a preference is changed 
// to a function so that it can be called by other functions when necessary
//==============================
function doTheStuffAfterPrefsChanged() {
        //normalise the text field to a number
        var bb = preferences.scalePref.value;
        bb = bb.replace(/\D/g,''); // remove all alpha characters - leaving only numbers
        if (bb == "") {bb = 60}; // if no number found default to 60
        bb = parseFloat(bb);  // change the string to a number
        if (bb < 10 ) {bb = 10};    // minimum size value
        if (bb > 140) {bb = 140};   // maximum size value
        preferences.scalePref.value = bb; // set the normalised value back into the preferences

        var scale = Number(preferences.scalePref.value) / 100,
		year,
		month,
		day;

		// check whether the moon widget is installed
	log("Checking moon widget");
	checkMoonWidget();

	if (moonWidgetFound) {
		log("3. Talking to the moon widget setPref:visible=false");
		tellWidget(preferred_form_location, "setPref:visible=false");
	}

	if (oldScale !== scale) {
		reloadWidget();
	}


	//sendLatAndLong ();

	if (preferences.selectHotKeyPref.value !== oldSelectHotKeyPref) {
		makeSelectHotKey(preferences.selectHotKeyPref.value, selectMonth);
	}
	if (preferences.speechHotKeyPref.value !== oldSpeechHotKeyPref) {
		makeSpeechHotKey(preferences.speechHotKeyPref.value, speakMemo);
	}
	if (preferences.speechHotKeyPref.value !== oldSearchHotKeyPref) {
		makeSearchHotKey(preferences.searchHotKeyPref.value, findMemo);
	}

	eFlag		= (preferences.eFlagPref.value === "1");
	lFlag		= (preferences.lFlagPref.value === "1");
	sFlag		= (preferences.sFlagPref.value === "1");
	logFilePref = preferences.logFilePref.value; // path to log file
	logFlagPref = preferences.logFlagPref.value; // flag to control printing to file

	accessMode = preferences.accessModePref.value;

	if (multiUser) {
		if (disallowAutoOpenPref) {
			preferences.autoOpenPref.value = "Never";
		}
		sharedUpdateTimer.interval = 60 * Number(preferences.sharedUpdateTimerPref.value);
		sharedUpdateTimer.ticking  = true;
		accessMode				   = preferences.sharedModePref.value;
	} else {
		sharedUpdateTimer.ticking = false;
	}

	if (preferences.autoModePref.value === "1") {
		updateDate(false);
	} else {
		theTimer.ticking = false;
		year			 = parseInt(preferences.yearPref.value, 10);
		month			 = Number(preferences.monthPref.value);
		day				 = parseInt(preferences.dayPref.value, 10);
		if ((1900 <= year) && (year <= lastYear) && (0 < day) && (day <= daysInMonth(year, month))) {
			cal(year, month, day);
		} else {
			currDat = new Date();
			displayDate(currDat, angle0);
			date = currDat;
		}
	}
	if (preferences.earthTurnPref.value === "Fast") {
		earthTimer.interval = 0.1;
	} else if (preferences.earthTurnPref.value === "Slow") {
		earthTimer.interval = 0.3;
	}

// resize the controls
	resizeEarthGlobe();

	underlyingGlass.opacity = preferences.glassOpacityPref.value;

	saveAnchorPoint();
	updateMemoPrefs();
	updateSunPrefs();
	savePreferences();
	if (lunarWidgetVisible) {
		if (moonWidgetFound) {
		        log("4. Talking to the moon widget showBigMoon");
			showBigMoon();
		}
	}

	// set the tooltips for all hover points
	setTooltips();
	// set the tooltips for all click points on the rings and timekeeper itself
	setClickPointToolTips();
	
}

//==============================
//
//==============================
widget.onPreferencesChanged = function () {
	doTheStuffAfterPrefsChanged();
};

//==============================
// Update the Dock vitality
//==============================
widget.onDockOpened = function () {
	updateVitality();
};

//==============================
// reload after sleep
//==============================
widget.onWakeFromSleep = function () {
	lprint("onWakeFromSleep");
	reloadWidget();
};

//==============================
// show buttons
//==============================
memo_window.onGainFocus = function () {
 print( 'Focused' );
	memo_window.zorder = 10021;
	memo_window.level = "normal";

	showMemoButtons();
};

//==============================
// lose the memo buttons
//==============================
memo_window.onLoseFocus = function () {
	hideMemoButtons();
};

//==============================
// bringsUpTheAboutBox by changing the opacity in an animation
//==============================
innerFramesclickpointleft.onClick = function () {
	closeLunarWidget();
	var a = new FadeAnimation(about, 255, 1350, animator.kEaseOut);
	animator.start([
		a
	]);

	if (preferences.soundPref.value === "enable") {
		play(winding, false);
		play(electricDrone, false);
	}
};

//==============================
//
//==============================
tickingSlider.onClick = function () {
	var a, b, c, d;
	if (preferences.soundPref.value === "enable") {
		play(newClunk, false);
	}
	if (preferences.cogAnimatePref.value === "enable") {
		// do a quick rotation to signify the end of the rotation
		a = new RotateAnimation(cog, 20, 500, animator.kEaseOut);
		b = new RotateAnimation(cogShadow, 20, 500, animator.kEaseOut);
		c = new RotateAnimation(wheel, 20, 500, animator.kEaseOut);
		d = new RotateAnimation(wheelShadow, 20, 500, animator.kEaseOut);
		animator.start([
			a, b, c, d
		]);
		preferences.cogAnimatePref.value = "disable";
		tickingSlider.rotation = -20;
	} else {
		// do a quick rotation to signify the end of the rotation
		a = new RotateAnimation(cog, -20, 500, animator.kEaseOut);
		b = new RotateAnimation(cogShadow, -20, 500, animator.kEaseOut);
		c = new RotateAnimation(wheel, -20, 500, animator.kEaseOut);
		d = new RotateAnimation(wheelShadow, -20, 500, animator.kEaseOut);
		animator.start([
			a, b, c, d
		]);
		preferences.cogAnimatePref.value = "enable";
		tickingSlider.rotation = 0;
	}
};
//==============================
//
//==============================
monthCog.onClick = function () {
	var a, b;
	
	monthCogRotation = monthCogRotation + 24;
	a = new RotateAnimation(monthCog, -monthCogRotation / 2, 990, animator.kEaseOut);
	b = new RotateAnimation(monthCogShadow, -monthCogRotation / 2, 990, animator.kEaseOut);
	animator.start([
		a, b
	]);
};


//==============================
//
//==============================
cog.onClick = function () {
	var a, b;
	
	monthCogRotation = monthCogRotation + 24;
	a = new RotateAnimation(cog, -monthCogRotation / 2, 990, animator.kEaseOut);
	b = new RotateAnimation(cogShadow, -monthCogRotation / 2, 990, animator.kEaseOut);
	animator.start([
		a, b
	]);
};



//==============================
// hides the plaque by changing the opacity
//==============================
popUpPlaque.onClick = function () {
	popUpPlaque.opacity = 0;
	plaqueButton.opacity = 0;
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
};

//==============================
// opens the help URL in the browser
//==============================
plaqueButton.onClick = function () {
	popUpPlaque.opacity = 0;
	plaqueButton.opacity = 0;
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}	 
	openURL("http://lightquick.co.uk/instructions-for-the-steampunk-orrery-timekeeper-widget.html?Itemid=264");
};

//==============================
// pins the widget in place
//==============================
woodSurround.onMouseDown = function () {
        //print("here 1");
	if (!main_window.locked) {
                //print("here 2");
        	main_window.locked = true;
		if (moonWidgetFound) {
		        log("5. Talking to the moon widget - setPref:locked=true");
		        tellWidget(preferred_form_location, "setPref:locked=true");
			//beep();	// ******
		}
		preferences.widgetLockPref.value = "enabled";
		pin.hoffset = system.event.hOffset - 5;
		pin.Voffset = system.event.vOffset - 5;
		preferences.pinHoffsetPref.value = pin.hoffset / scale;
		preferences.pinVoffsetPref.value = pin.voffset / scale;
		pin.opacity = 255;
        	if (preferences.soundPref.value === "enable") {
        		play(lock, false);
        	}
	} else {
                pin.onMouseDown();
        }

};

//==============================
// pins the widget in place
//==============================
pin.onMouseDown = function () {
                //print ("here3  ");
        	if (main_window.locked) {
		main_window.locked = false;
		pin.opacity = 0;
		preferences.widgetLockPref.value = "disabled";
		// this does not work yet
		if (moonWidgetFound) {
		        log("6. Talking to the moon widget - setPref:locked=false");
                        //tellWidget(preferred_form_location, "setPref:locked=false");
			//beep();	// ******
		}
	}
	if (preferences.soundPref.value === "enable") {
		play(lock, false);
	}
};

//==============================
// bringsUpThe inline help
//==============================
clockReflection.onMouseDown = function () {
	if (timekeeperPos === 1) {
		timekeeperclickpointleft.onClick();
	} else {
		if (clockPos === 1) {
			clockclickpointright.onClick();
		}
	}
	// if the enlarged earth is present, minimise it
	if (globe.opacity !== 0) {
		cancel.onClick();
	}
		
	// if the enlarged moon is present, minimise it
	closeLunarWidget();
		
	widgetHelp.opacity = 255;
	if (preferences.soundPref.value === "enable") {
		play(electricDrone, false);
	}

	moonUnderShadow.opacity	 = 255;
	moon.opacity		 = 255;
	moonOverShadow.opacity	 = 255;
	earthUnderShadow.opacity = 255;
	earth.opacity		 = 255;
	earthOverShadow.opacity	 = 170;
};

//==============================
// removes the inline help
//==============================
clockReflection.onMouseUp = function () {
	widgetHelpTimer.ticking = true;
};

//==============================
// makes theAboutBox go away by changing the opacity
//==============================
about.onClick = function () {
	about.opacity = 0;
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
		play(newClunk, false);
	}
};

//==============================
// click on the timekeeper glass window
//==============================
glass.onClick = function () {
	var vOff = main_window.vOffset + main_window.height / 2 - memo_window.height / 2,
		hOff = main_window.hOffset + main_window.width / 2 - memo_window.width / 2;

	play(tingingSound, false);

	if (hOff + memo_window.width > screen.availWidth) {
		hOff = screen.availWidth - memo_window.width;
	}

	if (hOff < screen.availLeft) {
		hOff = screen.availLeft;
	}

	if (vOff + memo_window.height > screen.availHeight) {
		vOff = screen.availHeight - memo_window.height;
	}

	if (vOff < screen.availTop) {
		vOff = screen.availTop;
	}

	memo_window.vOffset = vOff;
	memo_window.hOffset = hOff;
	memo_window.level = "top";

    if (system.event.altKey) {
		openMemoWindow("19700101", "");
	} else {
		//onClicked(gISOdate);
		onClicked(theISODate(date));
	}
	if (preferences.soundPref.value === "enable") {
		play(creturn, false);
		play(rollerBlind, false);
		//play(tingingSound, false);
	}
};

//===========================================
// this function opens a plaque giving help information
//===========================================
function makeHelpPlaqueAppear() {
	var hMiddle = (woodSurround.width / 2) + woodSurround.hOffset - 90,
		vMiddle = (woodSurround.height / 2) + woodSurround.vOffset - 126;
		
	popUpPlaque.opacity = 255;
	plaqueButton.opacity = 255;
	popUpPlaque.hOffset = hMiddle;
	popUpPlaque.vOffset = vMiddle;
	plaqueButton.hOffset = hMiddle + 13;
	plaqueButton.vOffset = vMiddle + 93;

	if (preferences.soundPref.value === "enable") {
		play(winding, false);
	}
	
}

//===========================================
// this function opens a plaque giving help information
//===========================================
function widgetHelpURL() {
	var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://lightquick.co.uk/instructions-for-the-steampunk-orrery-timekeeper-widget.html?Itemid=264");
		if (preferences.soundPref.value === "enable") {
			play(steam, false);
		}
	}
}
//=====================
//End function
//=====================


//==============================
// show the pop up plaque giving help
//==============================
innerFramesclickpointtop.onClick = function () {
	makeHelpPlaqueAppear();
	closeLunarWidget(); 
};

//==============================
// called at the end of the above animations
//==============================
function startCogsMoving() {
	cogtimer.ticking = true;
	if (preferences.soundPref.value === "enable") {
		tickTimer.ticking  = true;
		tickTimer.interval = 1;
	}
}

//==============================
// starts the ticking animation timer preceded by some extra pretty animations
//==============================
function driveBandClick() {
	var a, b, c, d;
	
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
		play(newClunk, false);
	}
	/*if (driveBandClicks === 0) {
		preferences.cogAnimatePref.value = "enable";

	}
	if (driveBandClicks === 1) {
		preferences.cogAnimatePref.value = "disable";
	}
	*/
	if (driveBandClicks === 1) {
		//turn off the cogtimer and stop playing
		if (preferences.soundPref.value === "enable") {
			log("%TIMEK-I-PLYN, Playing nothing to empty the sound buffer.");
			play(nothing, true);
			play(newClunk, false);
		}
		cogtimer.ticking  = false;
		tickTimer.ticking = false;
		// do a quick rotation to signify the end of the rotation
		a = new RotateAnimation(cog, 100, animationSpeed, animator.kEaseOut);
		b = new RotateAnimation(cogShadow, 100, animationSpeed, animator.kEaseOut);
		c = new RotateAnimation(wheel, 100, animationSpeed, animator.kEaseOut);
		d = new RotateAnimation(wheelShadow, 100, animationSpeed, animator.kEaseOut);
		animator.start([
			a, b, c, d
		]);
	}

	if (driveBandClicks === 0) {
		if (!cogtimer.ticking) {
			//turn on the cogtimer and do some rotations prior to starting the cogs
			a = new RotateAnimation(cog, 0, 500, animator.kEaseOut);
			b = new RotateAnimation(cogShadow, 0, 500, animator.kEaseOut);
			c = new RotateAnimation(wheel, -100, 1000, animator.kEaseOut);
			d = new RotateAnimation(wheelShadow, -100, 1000, animator.kEaseOut, startCogsMoving);
			animator.start([
				a, b, c, d
			]);
		}
	}
	driveBandClicks = driveBandClicks + 1;
	if (driveBandClicks >= 2) { driveBandClicks = 0; }

}

//==============================
// clicking on the driveband centre causes the cogs to move with the ticking clock
//==============================
driveBandclickpoint.onClick = function () {
	driveBandClick();
};
//==============================
// clicking on the driveband centre causes the cogs to move with the ticking clock
//==============================
driveBand.onClick = function () {
	driveBandClick();
};
//==============================
// clicking on the driveband centre causes the cogs to move with the ticking clock
//==============================
wheel.onClick = function () {
	driveBandClick();
};

//==============================
// clock right hand click point
//==============================
clockclickpointright.onClick = function () {
	// clicking on the clock right click point causes the clock and cogs to move in combination upwards
	// and the clock to move to the left
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;

	if (preferences.soundPref.value === "enable") {
		play(mechanism, false);
	}

	if (clockPos === 0) {
		//move the clock and cogs to move in combination upwards and the clock to move to the left
		clockPos = 1;
		a = new MoveAnimation(driveBand, driveBand.hoffset, driveBand.voffset - (40 * scale), animationSpeed, animator.kEaseOut);
		b = new MoveAnimation(wheel, wheel.hoffset, wheel.voffset - (40 * scale), animationSpeed, animator.kEaseOut);
		c = new MoveAnimation(wheelShadow, wheelShadow.hoffset, wheelShadow.voffset - (40 * scale), animationSpeed, animator.kEaseOut);
		d = new MoveAnimation(cog, cog.hoffset - (6 * scale), cog.voffset - (40 * scale), animationSpeed, animator.kEaseOut);
		e = new MoveAnimation(cogShadow, cogShadow.hoffset - (6 * scale), cogShadow.voffset - (40 * scale), animationSpeed, animator.kEaseOut);
		f = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset, driveBandclickpoint.voffset - (40 * scale), animationSpeed, animator.kEaseOut);

		g = new MoveAnimation(dayOfWeek, dayOfWeek.hoffset - (30 * scale), dayOfWeek.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		h = new MoveAnimation(clock, clock.hoffset - (30 * scale), clock.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		i = new MoveAnimation(clockclickpointleft, clockclickpointleft.hoffset - (30 * scale), clockclickpointleft.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		j = new MoveAnimation(clockclickpointcentre, clockclickpointcentre.hoffset - (30 * scale), clockclickpointcentre.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		k = new MoveAnimation(clockclickpointright, clockclickpointright.hoffset - (30 * scale), clockclickpointright.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		l = new MoveAnimation(hourHand, hourHand.hoffset - (30 * scale), hourHand.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		m = new MoveAnimation(minuteHand, minuteHand.hoffset - (30 * scale), minuteHand.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		n = new MoveAnimation(secondHand, secondHand.hoffset - (30 * scale), secondHand.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		o = new MoveAnimation(centreBoss, centreBoss.hoffset - (30 * scale), centreBoss.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		p = new MoveAnimation(clockReflection, clockReflection.hoffset - (30 * scale), clockReflection.voffset - (20 * scale), animationSpeed, animator.kEaseOut);
		q = new RotateAnimation(cog, -180, animationSpeed, animator.kEaseOut);
		r = new RotateAnimation(cogShadow, -180, animationSpeed, animator.kEaseOut);
		s = new RotateAnimation(wheel, -180, animationSpeed, animator.kEaseOut);
		t = new RotateAnimation(wheelShadow, -180, animationSpeed, animator.kEaseOut);
	} else {
		//move the clock and cogs to move in combination back to the original position
		clockPos = 0;
		a = new MoveAnimation(driveBand, driveBand.hoffset, driveBand.voffset + (40 * scale), animationSpeed, animator.kEaseOut);
		b = new MoveAnimation(wheel, wheel.hoffset, wheel.voffset + (40 * scale), animationSpeed, animator.kEaseOut);
		c = new MoveAnimation(wheelShadow, wheelShadow.hoffset, wheelShadow.voffset + (40 * scale), animationSpeed, animator.kEaseOut);
		d = new MoveAnimation(cog, cog.hoffset + (6 * scale), cog.voffset + (40 * scale), animationSpeed, animator.kEaseOut);
		e = new MoveAnimation(cogShadow, cogShadow.hoffset + (6 * scale), cogShadow.voffset + (40 * scale), animationSpeed, animator.kEaseOut);
		f = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset, driveBandclickpoint.voffset + (40 * scale), animationSpeed, animator.kEaseOut);
		g = new MoveAnimation(dayOfWeek, dayOfWeek.hoffset + (30 * scale), dayOfWeek.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		h = new MoveAnimation(clock, clock.hoffset + (30 * scale), clock.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		i = new MoveAnimation(clockclickpointleft, clockclickpointleft.hoffset + (30 * scale), clockclickpointleft.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		j = new MoveAnimation(clockclickpointcentre, clockclickpointcentre.hoffset + (30 * scale), clockclickpointcentre.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		k = new MoveAnimation(clockclickpointright, clockclickpointright.hoffset + (30 * scale), clockclickpointright.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		l = new MoveAnimation(hourHand, hourHand.hoffset + (30 * scale), hourHand.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		m = new MoveAnimation(minuteHand, minuteHand.hoffset + (30 * scale), minuteHand.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		n = new MoveAnimation(secondHand, secondHand.hoffset + (30 * scale), secondHand.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		o = new MoveAnimation(centreBoss, centreBoss.hoffset + (30 * scale), centreBoss.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		p = new MoveAnimation(clockReflection, clockReflection.hoffset + (30 * scale), clockReflection.voffset + (20 * scale), animationSpeed, animator.kEaseOut);
		q = new RotateAnimation(cog, 180, animationSpeed, animator.kEaseOut);
		r = new RotateAnimation(cogShadow, 180, animationSpeed, animator.kEaseOut);
		s = new RotateAnimation(wheel, 180, animationSpeed, animator.kEaseOut);
		t = new RotateAnimation(wheelShadow, 180, animationSpeed, animator.kEaseOut);
	}

	animator.start([
		a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t
	]);

};


//==============================
//
//==============================
function slideInCogs() {
	var a, b, c, d, e, f;
		
	a = new MoveAnimation(driveBand, driveBand.hoffset + (10 * scale), driveBand.voffset, animationSpeed, animator.kEaseOut);
	b = new MoveAnimation(wheel, wheel.hoffset + (10 * scale), wheel.voffset, animationSpeed, animator.kEaseOut);
	c = new MoveAnimation(wheelShadow, wheelShadow.hoffset + (10 * scale), wheelShadow.voffset, animationSpeed, animator.kEaseOut);
	d = new MoveAnimation(cog, cog.hoffset + (10 * scale), cog.voffset, animationSpeed, animator.kEaseOut);
	e = new MoveAnimation(cogShadow, cogShadow.hoffset + (10 * scale), cogShadow.voffset, animationSpeed, animator.kEaseOut);
	f = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset + (10 * scale), driveBandclickpoint.voffset, animationSpeed, animator.kEaseOut);

	animator.start([
		a, b, c, d, e, f
	]);
}

//==============================
// all clickpoints hovered over (onMouseEnter) cause their mask to appear for a few seconds then fade away
//==============================
function highlightRed() {
	if (preferences.hoverPointPref.value === "enable") {

		innerFramesclickpointleft.src	 = "Resources/Orrery/hole.png";
		innerFramesclickpointright.src	 = "Resources/Orrery/hole.png";
		innerFramesclickpointtop.src	 = "Resources/Orrery/hole.png";
		clockclickpointleft.src			 = "Resources/Orrery/brass-knob-tiny.png";
		clockclickpointcentre.src		 = "Resources/Orrery/brass-knob.png";
		clockclickpointright.src		 = "Resources/Orrery/brass-knob-tiny.png";
		timekeeperclickpointleft.src	 = "Resources/Orrery/red.png";
		timekeeperclickpointmiddle.src	 = "Resources/Orrery/red.png";
		timekeeperclickpointright.src	 = "Resources/Orrery/red.png";
		timekeeperclickpointfarright.src = "Resources/Orrery/red.png";
		timekeeperclickpointbottom.src	 = "Resources/Orrery/winged-key.png";
		driveBandclickpoint.src			 = "Resources/Orrery/clockhole.png";
		theFadeTimer.ticking			 = true;	
	}
}

//==============================
//click point onMouseEnter events
//==============================
innerFramesclickpointleft.onMouseEnter = function () {
	highlightRed();
};
innerFramesclickpointright.onMouseEnter = function () {
	highlightRed();
};
innerFramesclickpointtop.onMouseEnter = function () {
	highlightRed();
};
clockclickpointleft.onMouseEnter = function () {
	highlightRed();
};
clockclickpointcentre.onMouseEnter = function () {
	highlightRed();
};
clockclickpointright.onMouseEnter = function () {
	highlightRed();
};
timekeeperclickpointleft.onMouseEnter = function () {
	highlightRed();
};
timekeeperclickpointmiddle.onMouseEnter = function () {
	highlightRed();
};
timekeeperclickpointright.onMouseEnter = function () {
	highlightRed();
};
timekeeperclickpointfarright.onMouseEnter = function () {
	highlightRed();
};
timekeeperclickpointbottom.onMouseEnter = function () {
	highlightRed();
};
driveBandclickpoint.onMouseEnter = function () {
	highlightRed();
};

//==============================
//click point onMouseLeave events
//==============================
innerFramesclickpointright.onMouseExit = function () {
	highlightRedGone();
};
innerFramesclickpointtop.onMouseExit = function () {
	highlightRedGone();
};
clockclickpointleft.onMouseExit = function () {
	highlightRedGone();
};
clockclickpointcentre.onMouseExit = function () {
	highlightRedGone();
};
clockclickpointright.onMouseExit = function () {
	highlightRedGone();
};
timekeeperclickpointleft.onMouseExit = function () {
	highlightRedGone();
};
timekeeperclickpointmiddle.onMouseExit = function () {
	highlightRedGone();
};
timekeeperclickpointright.onMouseExit = function () {
	highlightRedGone();
};
timekeeperclickpointfarright.onMouseExit = function () {
	highlightRedGone();
};
timekeeperclickpointbottom.onMouseExit = function () {
	highlightRedGone();
};
driveBandclickpoint.onMouseExit = function () {
	highlightRedGone();
};

//==============================
// click on shrinker image when visible does the same as clicking on the clock middle
//==============================
shrinker.onClick = function () {
	clockclickpointcentre.onClick();
};

//=================================
//the function called at the end of
//the MoveAnimation(moon) when the
//centre clock is clicked to shrinkthe orrery
//=================================
function stuffinvisible() {
	//var b = new MoveAnimation(shrinker, clock.hoffset + (91 *scale), clock.voffset  + (91 *scale), 350,
	//animator.kEaseIn);
	//animator.start(b	);

	underlyingGlass.visible		= false;
	sizeSlider.visible			= false;
	opacitySlider.visible		= false;
	tickingSlider.visible		= false;
	underlay.visible			= false;
	innerFrames.visible			= false;
	pseudoRotatingRing.visible	= false;
	ringtext.visible			= false;
	woodSurround.visible		= false;
	counterWheel.visible		= false;
	cogShadow.visible			= false;
	cog.visible					= false;
	monthCogShadow.visible		= false;
	monthCog.visible			= false;
	wheelShadow.visible			= false;
	wheel.visible				= false;
	driveBand.visible			= false;
	driveBandclickpoint.visible = false;
	dayCounter.visible			= false;
	yearCounter.visible			= false;
	dayTensCounter.visible		= false;
	dayUnitsCounter.visible		= false;
	monthCounter.visible		= false;
	yearTensCounter.visible		= false;
	yearUnitsCounter.visible	= false;
	timekeeper.visible			= false;
	soundtoggle.visible			= false;
	moonUnderShadow.visible		= false;
	moon.visible				= false;
	//moonOverShadow.visible	= false;
	earthUnderShadow.visible	= false;
	earth.visible				= false;
	earthOverShadow.visible		= false;
	pin.visible = false;
}

//=================================
// the function called at the end of the RotateAnimation(shrinker) when the centre
// clock is clicked to enlarge the orrery
//=================================
function allItemsReappear() {
	var a;
	moon.zorder			  = 22;
	moonOverShadow.zorder = 23;
	earth.zorder		  = 26;

	innerFramesclickpointleft.visible	 = true;
	innerFramesclickpointright.visible	 = true;
	innerFramesclickpointtop.visible	 = true;
	timekeeperclickpointleft.visible	 = true;
	timekeeperclickpointmiddle.visible	 = true;
	timekeeperclickpointright.visible	 = true;
	timekeeperclickpointfarright.visible = true;
	timekeeperclickpointbottom.visible	 = true;
	glass.visible 						 = true;
	//shrinker.visible					 = false;
	opacitySlider.visible				 = true;
	sizeSlider.visible					 = true;
	tickingSlider.visible				 = true;
	underlyingGlass.visible				 = true;
	underlay.visible					 = false;
	innerFrames.visible					 = true;
	pseudoRotatingRing.visible			 = true;
	ringtext.visible					 = true;
	woodSurround.visible				 = true;
	counterWheel.visible				 = true;
	cogShadow.visible					 = true;
	cog.visible							 = true;
	monthCogShadow.visible				 = true;
	monthCog.visible					 = true;
	wheelShadow.visible					 = true;
	wheel.visible						 = true;
	driveBand.visible					 = true;
	driveBandclickpoint.visible			 = true;
	dayCounter.visible					 = true;
	yearCounter.visible					 = true;
	dayTensCounter.visible				 = true;
	dayUnitsCounter.visible				 = true;
	monthCounter.visible				 = true;
	yearTensCounter.visible				 = true;
	yearUnitsCounter.visible			 = true;
	timekeeper.visible					 = true;
	soundtoggle.visible					 = true;
	moonUnderShadow.visible				 = true;
	moon.visible						 = true;
	moonOverShadow.visible				 = true;
	earthUnderShadow.visible			 = true;
	earth.visible						 = true;
	earthOverShadow.visible				 = true;
	pin.visible 						 = true;
	moon.zorder							 = 24;
	moonOverShadow.zorder				 = 25;	
	earth.zorder						 = 26;
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
	a = new FadeAnimation(shrinker, 0, 2000, animator.kEaseOut);
	animator.start(a);
}

//==============================
// clock centre click point
//==============================
clockclickpointcentre.onClick = function () {
	//clicking on the clock centre causes the cogs, band and wheel and all other components to made invisible
	//the flattened shrinker image appears and then various animations are called to make the moon, earth
	//and shrinker move upward and left behind the clock.
	var a, b, c, d, e, f, g, h;
	
	closeLunarWidget();
	shrinker.opacity = 255;
	if (shrunkFlg === 0) {
		// if the cogs are visible then move the whole lot behind the clock, shrink it
		if (cogsPos === 0) {
			clockclickpointleft.onClick(); // this causes the cogs and wheels to move up and in
		}
		shrunkFlg		 = 1;
		shrinker.visible = true;
		earthHoffset	 = earth.hoffset;
		earthVoffset	 = earth.Voffset;
		earthzorder		 = earth.zorder;
		earth.zorder	 = 10;
		moonHoffset		 = moon.hoffset;
		moonVoffset		 = moon.voffset;
		moonzorder		 = moon.zorder;
		moon.zorder		 = 10;
		a = new ResizeAnimation(shrinker, (478 / 4) * scale, (478 / 4) * scale, 2300, animator.kEaseOut);
		b = new MoveAnimation(shrinker, shrinker.hoffset + (70 * scale), shrinker.voffset + (90 * scale), 1350, animator.kEaseIn);
		f = new RotateAnimation(shrinker, 360, 1350, animator.kEaseOut);
		c = new RotateAnimation(earth, 360, 2350, animator.kEaseIn); //rotate the earth
		d = new ResizeAnimation(earth, (68) * scale, (69) * scale, 2300, animator.kEaseOut);
		e = new MoveAnimation(earth, (140 * scale), (150 * scale), 2350, animator.kEaseIn);
		g = new ResizeAnimation(moon, (33) * scale, (33) * scale, 2300, animator.kEaseOut);
		h = new MoveAnimation(moon, (140 * scale), (150 * scale), 2350, animator.kEaseIn, stuffinvisible);
		if (preferences.soundPref.value === "enable") {
			play(suck, false);
		}
		innerFramesclickpointleft.visible	 = false;
		innerFramesclickpointright.visible	 = false;
		innerFramesclickpointtop.visible	 = false;
		timekeeperclickpointleft.visible	 = false;
		timekeeperclickpointmiddle.visible	 = false;
		timekeeperclickpointright.visible	 = false;
		timekeeperclickpointfarright.visible = false;
		timekeeperclickpointbottom.visible	 = false;
 	   	glass.visible 						 = false;
		opacitySlider.visible			   	 = false;
		sizeSlider.visible					 = false;
		tickingSlider.visible				 = false;
		underlyingGlass.visible				 = false;
		underlay.visible					 = false;
		innerFrames.visible					 = false;
		pseudoRotatingRing.visible			 = false;
		ringtext.visible					 = false;
		woodSurround.visible				 = false;
		counterWheel.visible				 = false;
		monthCogShadow.visible 				 = false;
		monthCog.visible					 = false;
		dayCounter.visible 					 = false;
		yearCounter.visible					 = false;
		dayTensCounter.visible				 = false;
		dayUnitsCounter.visible				 = false;
		monthCounter.visible				 = false;
		yearTensCounter.visible				 = false;
		yearUnitsCounter.visible			 = false;
		timekeeper.visible					 = false;
		soundtoggle.visible					 = false;
		moonUnderShadow.visible				 = false;
		moonOverShadow.visible				 = false;
		earthUnderShadow.visible			 = false;
		earthOverShadow.visible				 = false;
		pin.visible = false;
		animator.start([
			a, b, c, e, f, g, h
		]);
	} else {
		// move the whole lot back into original position
		//log("%TIMEK-I-COGP2, Cog Position, " + cogsPos);
		if (cogsPos === 1) {
			clockclickpointleft.onClick(); // this causes the cogs and wheels to move
		}
		//log("%TIMEK-I-COGP3, Cog Position, " + cogsPos);
		shrunkFlg = 0;
		if (timekeeperPos === 1) {
			timekeeperclickpointleft.onClick();
		}
		earth.zorder  = 10;
		earth.visible = true;
		moon.zorder	  = 10;
		moon.visible  = true;
		if (preferences.soundPref.value === "enable") {
			play(steam, false);
		}

		a = new ResizeAnimation(shrinker, 478 * scale, 478 * scale, 1000, animator.kEaseInOut);
		b = new MoveAnimation(shrinker, shrinker.hoffset - (70 * scale), shrinker.voffset - (90 * scale), 1300, animator.kEaseOut);
		c = new RotateAnimation(shrinker, -360, 3000, animator.kEaseOut, allItemsReappear);
		d = new MoveAnimation(moon, moonHoffset, moonVoffset, 1350, animator.kEaseIn);
		e = new RotateAnimation(earth, -360, 1350, animator.kEaseOut);
		f = new MoveAnimation(earth, earthHoffset, earthVoffset, 1350, animator.kEaseIn);
		animator.start([
			a, b, c, d, e, f
		]);
	}
};

function moveTheCogsUpOrDown() {
	var a, b, c, d, e, f, g, h, i, j,
	// move the cogs up and behind the clock (extra absolute positioning check for the physical position as the
	// animations are asynchronous.
	// This stops the bug where the cogs would try to move up beyond the clock when in shrunk mode)
		clockvoffset = clock.voffset,
		cogvoffset = cog.voffset;

	if (cogsPos === 0) {
		if ((cogvoffset - clockvoffset) >= (97 * scale)) {
			cogsPos = 1;

			if (preferences.soundPref.value === "enable") {
				play(mechanism, false);
			}

			a = new MoveAnimation(driveBand, driveBand.hoffset + (40 * scale), driveBand.voffset - (80 * scale), animationSpeed, animator.kEaseOut);
			b = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset + (40 * scale), driveBandclickpoint.voffset - (80 * scale), animationSpeed, animator.kEaseOut);
			c = new MoveAnimation(wheel, wheel.hoffset + (40 * scale), wheel.voffset - (80 * scale), animationSpeed, animator.kEaseOut);
			d = new MoveAnimation(wheelShadow, wheelShadow.hoffset + (40 * scale), wheelShadow.voffset - (80 * scale), animationSpeed, animator.kEaseOut);
			e = new MoveAnimation(cog, cog.hoffset + (20 * scale), cog.voffset - (60 * scale), animationSpeed, animator.kEaseOut);
			f = new MoveAnimation(cogShadow, cogShadow.hoffset + (20 * scale), cogShadow.voffset - (60 * scale), animationSpeed, animator.kEaseOut);
			g = new RotateAnimation(cog, 0, animationSpeed, animator.kEaseOut);
			h = new RotateAnimation(cogShadow, 0, animationSpeed, animator.kEaseOut);
			i = new RotateAnimation(wheel, -180, animationSpeed, animator.kEaseOut);
			j = new RotateAnimation(wheelShadow, -180, animationSpeed, animator.kEaseOut);
			animator.start([
				a, b, c, d, e, f, g, h, i, j
			]);
		}
	} else {
		cogsPos = 0;
		if (clockPos === 0) {
			if (preferences.soundPref.value === "enable") {
				play(steam, false);
			}

			a = new MoveAnimation(driveBand, driveBand.hoffset - (10 * scale), driveBand.voffset, 600, animator.kEaseOut);
			b = new MoveAnimation(wheel, wheel.hoffset - (10 * scale), wheel.voffset, 600, animator.kEaseOut);
			c = new MoveAnimation(wheelShadow, wheelShadow.hoffset - (10 * scale), wheelShadow.voffset, 600, animator.kEaseOut);
			d = new MoveAnimation(cog, cog.hoffset - (10 * scale), cog.voffset, 600, animator.kEaseOut);
			e = new MoveAnimation(cogShadow, cogShadow.hoffset - (10 * scale), cogShadow.voffset, 600, animator.kEaseOut);
			f = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset - (10 * scale), driveBandclickpoint.voffset, 600, animator.kEaseOut);
			animator.start([
				a, b, c, d, e, f
			]);
		}
	}
}

//=================================
// clicking on the clock right clickpoint moves the cogs behind the clock
//=================================
clockclickpointleft.onClick = function () {
	var a, b, c, d, e, f, g, h, i, j;


	//log("%TIMEK-I-COGP, Cog Position, " + cogsPos);
	if (!cogShadow.visible) {
		cogShadow.visible			= true;
		cog.visible				= true;
		wheelShadow.visible			= true;
		wheel.visible				= true;
		driveBand.visible			= true;
		driveBandclickpoint.visible				= true;
	}
	if (cogsPos === 0) {
		if (clockPos === 0) {
			//
			if (preferences.soundPref.value === "enable") {
				play(steam, false);
			}
			// move the cogs inward a bit then call the function it move it up
			a = new MoveAnimation(driveBand, driveBand.hoffset + (10 * scale), driveBand.voffset, 600, animator.kEaseOut);
			b = new MoveAnimation(wheel, wheel.hoffset + (10 * scale), wheel.voffset, 600, animator.kEaseOut);
			c = new MoveAnimation(wheelShadow, wheelShadow.hoffset + (10 * scale), wheelShadow.voffset, 600, animator.kEaseOut);
			d = new MoveAnimation(cog, cog.hoffset + (10 * scale), cog.voffset, 600, animator.kEaseOut);
			e = new MoveAnimation(cogShadow, cogShadow.hoffset + (10 * scale), cogShadow.voffset, 600, animator.kEaseOut);
			//NOTE: animation f calls moveTheCogsUpOrDown
			f = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset + (10 * scale), driveBandclickpoint.voffset, 600, animator.kEaseOut, moveTheCogsUpOrDown);
			
			animator.start([
				a, b, c, d, e, f
			]);
		} else {
			moveTheCogsUpOrDown();
		}
	} else {
		if (preferences.soundPref.value === "enable") {
			play(mechanism, false);
		}
		// move the cogs down again then call the function to slide it back
		a = new MoveAnimation(driveBand, driveBand.hoffset - (40 * scale), driveBand.voffset + (80 * scale), animationSpeed, animator.kEaseOut);
		b = new MoveAnimation(driveBandclickpoint, driveBandclickpoint.hoffset - (40 * scale), driveBandclickpoint.voffset + (80 * scale), animationSpeed, animator.kEaseOut);
		c = new MoveAnimation(wheel, wheel.hoffset - (40 * scale), wheel.voffset + (80 * scale), animationSpeed, animator.kEaseOut);
		d = new MoveAnimation(wheelShadow, wheelShadow.hoffset - (40 * scale), wheelShadow.voffset + (80 * scale), animationSpeed, animator.kEaseOut);
		e = new MoveAnimation(cog, cog.hoffset - (20 * scale), cog.voffset + (60 * scale), animationSpeed, animator.kEaseOut);
		f = new MoveAnimation(cogShadow, cogShadow.hoffset - (20 * scale), cogShadow.voffset + (60 * scale), animationSpeed, animator.kEaseOut);
		g = new RotateAnimation(cog, 180, animationSpeed, animator.kEaseOut);
		h = new RotateAnimation(cogShadow, 180, animationSpeed, animator.kEaseOut);
		i = new RotateAnimation(wheel, 180, animationSpeed, animator.kEaseOut);
		//NOTE: animation j calls moveTheCogsUpOrDown
		j = new RotateAnimation(wheelShadow, 180, animationSpeed, animator.kEaseOut, moveTheCogsUpOrDown);
		animator.start([
			a, b, c, d, e, f, g, h, i, j
		]);
	}
};

//=================================
//the timekeeper left point click causes
//the timekeeper, the clock and the cogs
//to move outward unless the clock/cogs are already there.
//=================================
timekeeperclickpointmiddle.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}

	if (preferences.hoverPointPref.value === "enable") {
		preferences.hoverPointPref.value = "disable";
		highlightRedGone();
	} else {
		preferences.hoverPointPref.value = "enable";
		highlightRed();
	}

	if (preferences.tooltipPref.value === "enable") {
		preferences.tooltipPref.value = "disable";
	} else {
		preferences.tooltipPref.value = "enable";
	}
	// set the tooltips for all hover points
	setTooltips();

	// set the tooltips for all click points on the rings and timekeeper itself
	setClickPointToolTips();
};

//=================================
//the timekeeper left point click causes
//the timekeeper, the clock and the cogs
//to move outward unless the clock/cogs are already there.
//=================================
timekeeperclickpointleft.onClick = function () {
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
	if (preferences.soundPref.value === "enable") {
		play(crank, false);
	}
	if (timekeeperPos === 0) {
		timekeeperPos = 1;
		a = new MoveAnimation(timekeeper, timekeeper.hoffset + (50 * scale), timekeeper.voffset, animationSpeed, animator.kEaseOut);
		b = new MoveAnimation(soundtoggle, soundtoggle.hoffset + (50 * scale), soundtoggle.voffset, animationSpeed, animator.kEaseOut);
		c = new MoveAnimation(dayCounter, dayCounter.hoffset + (50 * scale), dayCounter.voffset, animationSpeed, animator.kEaseOut);
		d = new MoveAnimation(yearCounter, yearCounter.hoffset + (50 * scale), yearCounter.voffset, animationSpeed, animator.kEaseOut);
		e = new MoveAnimation(dayTensCounter, dayTensCounter.hoffset + (50 * scale), dayTensCounter.voffset, animationSpeed, animator.kEaseOut);
		f = new MoveAnimation(dayUnitsCounter, dayUnitsCounter.hoffset + (50 * scale), dayUnitsCounter.voffset, animationSpeed, animator.kEaseOut);
		g = new MoveAnimation(monthCounter, monthCounter.hoffset + (50 * scale), monthCounter.voffset, animationSpeed, animator.kEaseOut);
		h = new MoveAnimation(yearTensCounter, yearTensCounter.hoffset + (50 * scale), yearTensCounter.voffset, animationSpeed, animator.kEaseOut);
		i = new MoveAnimation(yearUnitsCounter, yearUnitsCounter.hoffset + (50 * scale), yearUnitsCounter.voffset, animationSpeed, animator.kEaseOut);
		j = new MoveAnimation(timekeeper, timekeeper.hoffset + (50 * scale), timekeeper.voffset, animationSpeed, animator.kEaseOut);
		k = new MoveAnimation(monthCog, monthCog.hoffset + (50 * scale), monthCog.voffset, animationSpeed, animator.kEaseOut);
		l = new MoveAnimation(monthCogShadow, monthCogShadow.hoffset + (50 * scale), monthCogShadow.voffset, animationSpeed, animator.kEaseOut);
		m = new MoveAnimation(timekeeperclickpointleft, timekeeperclickpointleft.hoffset + (50 * scale), timekeeperclickpointleft.voffset, animationSpeed, animator.kEaseOut);
		n = new MoveAnimation(timekeeperclickpointmiddle, timekeeperclickpointmiddle.hoffset + (50 * scale), timekeeperclickpointmiddle.voffset, animationSpeed, animator.kEaseOut);
		o = new MoveAnimation(timekeeperclickpointright, timekeeperclickpointright.hoffset + (50 * scale), timekeeperclickpointright.voffset, animationSpeed, animator.kEaseOut);
		p = new MoveAnimation(timekeeperclickpointfarright, timekeeperclickpointfarright.hoffset + (50 * scale), timekeeperclickpointfarright.voffset, animationSpeed, animator.kEaseOut);
		q = new MoveAnimation(timekeeperclickpointbottom, timekeeperclickpointbottom.hoffset + (50 * scale), timekeeperclickpointbottom.voffset, animationSpeed, animator.kEaseOut);
		r = new MoveAnimation(glass, glass.hoffset + (50 * scale), glass.voffset, animationSpeed, animator.kEaseOut);
		s = new RotateAnimation(monthCog, 0, animationSpeed, animator.kEaseOut);
		if (clockPos === 0) {
			clockclickpointright.onClick();
		}
	} else {
		timekeeperPos = 0;
		a = new MoveAnimation(timekeeper, timekeeper.hoffset - (50 * scale), timekeeper.voffset, animationSpeed, animator.kEaseOut);
		b = new MoveAnimation(soundtoggle, soundtoggle.hoffset - (50 * scale), soundtoggle.voffset, animationSpeed, animator.kEaseOut);
		c = new MoveAnimation(dayCounter, dayCounter.hoffset - (50 * scale), dayCounter.voffset, animationSpeed, animator.kEaseOut);
		d = new MoveAnimation(yearCounter, yearCounter.hoffset - (50 * scale), yearCounter.voffset, animationSpeed, animator.kEaseOut);
		e = new MoveAnimation(dayTensCounter, dayTensCounter.hoffset - (50 * scale), dayTensCounter.voffset, animationSpeed, animator.kEaseOut);
		f = new MoveAnimation(dayUnitsCounter, dayUnitsCounter.hoffset - (50 * scale), dayUnitsCounter.voffset, animationSpeed, animator.kEaseOut);
		g = new MoveAnimation(monthCounter, monthCounter.hoffset - (50 * scale), monthCounter.voffset, animationSpeed, animator.kEaseOut);
		h = new MoveAnimation(yearTensCounter, yearTensCounter.hoffset - (50 * scale), yearTensCounter.voffset, animationSpeed, animator.kEaseOut);
		i = new MoveAnimation(yearUnitsCounter, yearUnitsCounter.hoffset - (50 * scale), yearUnitsCounter.voffset, animationSpeed, animator.kEaseOut);
		j = new MoveAnimation(timekeeper, timekeeper.hoffset - (50 * scale), timekeeper.voffset, animationSpeed, animator.kEaseOut);
		k = new MoveAnimation(monthCog, monthCog.hoffset - (50 * scale), monthCog.voffset, animationSpeed, animator.kEaseOut);
		l = new MoveAnimation(monthCogShadow, monthCogShadow.hoffset - (50 * scale), monthCogShadow.voffset, animationSpeed, animator.kEaseOut);
		m = new MoveAnimation(timekeeperclickpointleft, timekeeperclickpointleft.hoffset - (50 * scale), timekeeperclickpointleft.voffset, animationSpeed, animator.kEaseOut);
		n = new MoveAnimation(timekeeperclickpointmiddle, timekeeperclickpointmiddle.hoffset - (50 * scale), timekeeperclickpointmiddle.voffset, animationSpeed, animator.kEaseOut);
		o = new MoveAnimation(timekeeperclickpointright, timekeeperclickpointright.hoffset - (50 * scale), timekeeperclickpointright.voffset, animationSpeed, animator.kEaseOut);
		p = new MoveAnimation(timekeeperclickpointfarright, timekeeperclickpointfarright.hoffset - (50 * scale), timekeeperclickpointfarright.voffset, animationSpeed, animator.kEaseOut);
		q = new MoveAnimation(timekeeperclickpointbottom, timekeeperclickpointbottom.hoffset - (50 * scale), timekeeperclickpointbottom.voffset, animationSpeed, animator.kEaseOut);
		r = new MoveAnimation(glass, glass.hoffset - (50 * scale), glass.voffset, animationSpeed, animator.kEaseOut);
		s = new RotateAnimation(monthCog, 180, animationSpeed, animator.kEaseOut);
		if (clockPos === 1) {
			clockclickpointright.onClick();
		}
	}
	animator.start([
		a, b, c, q, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s
	]);
};

//=================================
//on click here reset the date
//=================================
timekeeperclickpointright.onClick = function () {
	var currDat = new Date(),
		a;

	if (preferences.soundPref.value === "enable") {
		play(winding, false);
	}
	angle0 = dayAngle(currDat) - 120;
	displayDate(currDat, angle0);
	date = currDat;
	displayTime(currDat);
	if (lunarWidgetVisible) {
		if (moonWidgetFound) {
			log("7. Talking to the moon widget setDate:date=currDat.getTime");
			tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
		}
	}
	cogrotation = cogrotation + 32;
	a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
	animator.start(a);
};

//===========================
//turns off the sound
//===========================
function soundoff() {
	play(newClunk, false); // this one does not have a prefs check
	if (preferences.soundPref.value === "enable") {
		preferences.soundPref.value			 = "disable";
		soundtoggle.hoffset					 = soundtoggle.hoffset - (10 * scale);
		timekeeperclickpointfarright.hoffset = timekeeperclickpointfarright.hoffset - (10 * scale);
	} else {
		preferences.soundPref.value			 = "enable";
		soundtoggle.hoffset					 = soundtoggle.hoffset + (10 * scale);
		timekeeperclickpointfarright.hoffset = timekeeperclickpointfarright.hoffset + (10 * scale);
	}
}

//=================================
// clicking on the sound toggle turns of the sound
//=================================
soundtoggle.onClick = function () {
	soundoff();
};

//=================================
//on click here toggle sound off
//=================================
timekeeperclickpointfarright.onClick = function () {
	soundoff();
};

//===========================
//when the timekeeperclickpointbottom is clicked it will call this function
//===========================
function callShowWidgetPreferences() {
//it is done this way as the RotateAnimation won't call the default engine function showWidgetPreferences
	showWidgetPreferences();
}

//===========================
// on click here animate and show the widget preferences
//===========================
timekeeperclickpointbottom.onClick = function () {
	var a;

	cogrotation = cogrotation + 96;
	a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut, callShowWidgetPreferences);
	animator.start(a);
	if (preferences.soundPref.value === "enable") {
		play(winding, false);
	}
};

//===========================
//Show the big moon
//===========================
moon.onClick = function () {
//when the expanded globe is double-clicked a click on the ring ought to restore the moon and shadows to normal positions.
	var a;
	if (preferences.soundPref.value === "enable") {
		play(creturn, false);
	}

	cogrotation = cogrotation + 128;
	a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
	animator.start(a);
	if (preferences.soundPref.value === "enable") {
		play(mechanism, false);
	}

	savMoonHoffset = moon.hoffset;
	savMoonVoffset = moon.voffset;
	theRotateTimer.ticking = true;

        // this next function makes the underlyingGlass.opacity = 0;
	clearUnderlyingGlass();
        opacitySlider.rotation = (underlyingGlass.opacity / 12) - 9;
        log ("theOpacityTimer.ticking = true ");
        theOpacityTimer.ticking = true;
};

//===========================================
// function to make the underlyingGlass.opacity = 0;
//===========================================
function clearUnderlyingGlass()
{
      var startValue = preferences.glassOpacityPref.value;

      for (var a =startValue;a>=0;a--)
      {
              underlyingGlass.opacity = a;
              sleep (1);
              a=a-2;
      }
      underlyingGlass.opacity = 0;
}
//=====================
//End function
//=====================


//===========================================
// function to make the underlyingGlass.opacity = 0;
//===========================================
function resetUnderlyingGlass()
{
      var finishValue = preferences.glassOpacityPref.value;
      log ("preferences.glassOpacityPref.value "+ finishValue);
      log ("resetUnderlyingGlass ");
      for (var a =0;a<=finishValue;a++)
      {
              underlyingGlass.opacity = a;
              sleep (1);
              a=a+2;
      }
     underlyingGlass.opacity = finishValue;
     opacitySlider.rotation = (preferences.glassOpacityPref.value / 12) - 9;

     log ("underlyingGlass.opacity  "+ underlyingGlass.opacity );
}
//=====================
//End function
//=====================



//===========================
//Show the big moon
//===========================
moonOverShadow.onClick = function () {
	moon.onclick();
};


//===========================
//move the counter wheel
//===========================
counterWheel.onClick = function () {
	var a;

	cogrotation = cogrotation + 32;
	a = new RotateAnimation(counterWheel, cogrotation / 2, 990, animator.kEaseOut);
	animator.start(a);
};

//===========================
//start the earth timer to rotate the earth called in the earth animations above
//===========================
function startEarthTimer() {
	if (preferences.soundPref.value === "enable") {
		play(mechanism, false);
	}

	theEarthRotateTimer.ticking = true;
}

//===========================
//when the small earth is clicked it will animate the globe growing and then trigger the globe rotating
//===========================
earth.onClick = function () {
	var a, b, c, d,
		earthhOffset,
		earthvOffset,
		angle,
		earthRadius;

	cogrotation = cogrotation + 128;
	a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
	animator.start(a);

	savEarthHoffset = earth.hoffset;
	savEarthVoffset = earth.voffset;

	// I added this next bit as I could not get the earth to position correctly in moveMoon
	// instead I manually move the earth to its start position for automatic rotation by the timer.
	// it is a slight kludge but it looks OK and does the job

	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}

	angle		= (moonAngle + 220) % 360;
	earthRadius		= 55 * scale;
	earthhOffset = Math.round(moon.hOffset + earthRadius * cos[angle]);
	earthvOffset = Math.round(moon.vOffset - earthRadius * sin[angle]);

	a = new MoveAnimation(earth, earthhOffset, earthvOffset, 150, animator.kEaseIn);
	b = new MoveAnimation(earthOverShadow, earthhOffset, earthvOffset, 150, animator.kEaseIn);
	c = new MoveAnimation(earthUnderShadow, earthhOffset, earthvOffset, 150, animator.kEaseIn, startEarthTimer);
	d = new RotateAnimation(earth, 500, 1990, animator.kEaseOut);
	animator.start([
		a, b, c, d
	]);
};

//===========================
//same as an earth.onclick
//===========================
earthOverShadow.onClick = function () {
	earth.onClick();
};


//===========================
//click on the cancel tap restores the moon and shadows to normal positions.
//===========================
cancel.onClick = function () {
	log("%TIMEK-I-ALLR, allowRingClick" + allowRingClick);
	if (allowRingClick) {
		largeEarthInvisible();
	}
};

//=================================
//when the enlarged earth is clicked once it will stop the globe rotating
//=================================
globe.onMouseDown = function () {
	globeStartHoffset = system.event.hOffset;
	//log("globeStartHoffset " + globeStartHoffset);
	earthTimer.ticking = false;
};
//=================================
// function ENDS
//=================================


//==============================
// record the mouse	 position while you are dragging the globe
//==============================
globe.onMouseDrag = function () {
	globeEndHoffset = system.event.hOffset;
	//log("globeEndHoffset " + globeEndHoffset);
	earthTimer.ticking = true;
};
//=====================
//End function
//=====================

//==============================
// record the mouse end position after you have dragged the globe
//==============================
globe.onMouseUp = function () {
	globeEndHoffset = system.event.hOffset;
	//log("globeStartHoffset " + globeStartHoffset);
	//log("globeEndHoffset " + globeEndHoffset);
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
};
//=====================
//End function
//=====================

//=================================
//	When the mousewheel is over the counter will increment the date by a year
//=================================
yearCounter.onMouseWheel = function () {
	var delta = system.event.scrollDelta,
		yearInc = 0,
		someDate,
		a;

	//print("scroll wheel " + delta);
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
	if (delta !== 0) {
		yearInc = parseInt(delta / 10, 10);
		//build the date for today
		someDate = new Date();

		//log("someDate " + someDate);
		numberOfYearsToAdd = numberOfYearsToAdd + yearInc;
		someDate.setYear(someDate.getYear() + numberOfYearsToAdd);
		currDat = someDate;
		angle0	= dayAngle(currDat) - 120;
		displayDate(currDat, angle0);
		date = currDat;
		displayTime(currDat);
		if (lunarWidgetVisible) {
			if (moonWidgetFound) {
				log("8. Talking to the moon widget setDate:date= + currDat.getTime");
				tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
			}
		}
	}
	cogrotation = cogrotation + 12;
	a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
	animator.start(a);

};
//=================================
// function ENDS
//=================================

//=================================
//	When the mouse is clicked the counter will increment the date by a year
//=================================
yearCounter.onClick = function () {
	var yearInc = 0,
		someDate,
		a;

	//print("scroll wheel " + delta);
	if (preferences.soundPref.value === "enable") {
		play(newClunk, false);
	}
	yearInc = yearInc + 1;
	//build the date for today
	someDate = new Date();

	//log("someDate " + someDate);
	numberOfYearsToAdd = numberOfYearsToAdd + yearInc;
	someDate.setYear(someDate.getYear() + numberOfYearsToAdd);
	currDat = someDate;
	angle0	= dayAngle(currDat) - 120;
	displayDate(currDat, angle0);
	date = currDat;
	displayTime(currDat);
	if (lunarWidgetVisible) {
		if (moonWidgetFound) {
			log("9. Talking to the moon widget setDate:date= + currDat.getTime");
			tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
		}
	}
	cogrotation = cogrotation + 12;
	a = new RotateAnimation(counterWheel, -cogrotation / 2, 990, animator.kEaseOut);
	animator.start(a);
	
};
//=================================
// function ENDS
//=================================

//=================================
//	When the mousewheel is used over the counter will increment the date by a month
//=================================
monthCounter.onMouseWheel = function () {
	var delta = system.event.scrollDelta,
		monthInc = 0,
		someDate;

	if (delta < 0) {
		if (preferences.soundPref.value === "enable") {
			play(tick, false);
		}
	} else {
		if (preferences.soundPref.value === "enable") {
			play(tock, false);
		}
	}
	//print("scroll wheel " + delta);
	if (delta !== 0) {
		monthInc = parseInt(delta / 11, 10);
		//build the date for today
		someDate = new Date();
		numberOfMonthsToAdd = numberOfMonthsToAdd + monthInc;
		someDate.setMonth(someDate.getMonth() + numberOfMonthsToAdd);
		currDat = someDate;
		angle0	= dayAngle(currDat) - 120;
		displayDate(currDat, angle0);
		date = currDat;
		displayTime(currDat);
		if (lunarWidgetVisible) {
			if (moonWidgetFound) {
				log("10.Talking to the moon widget setDate:date= + currDat.getTime");
				tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
			}
		}
	}
};
//=================================
// function ENDS
//=================================

//=================================
//	When the mouse is clicked on the counter will increment the date by a month
//=================================
monthCounter.onClick = function () {
	var monthInc = 0,
		someDate;

	if (preferences.soundPref.value === "enable") {
		play(newClunk, false);
	}
	monthInc = monthInc + 1;
	//build the date for today
	someDate = new Date();
	numberOfMonthsToAdd = numberOfMonthsToAdd + monthInc;
	someDate.setMonth(someDate.getMonth() + numberOfMonthsToAdd);
	currDat = someDate;
	angle0	= dayAngle(currDat) - 120;
	displayDate(currDat, angle0);
	date = currDat;
	displayTime(currDat);
	if (lunarWidgetVisible) {
		if (moonWidgetFound) {
			log("11.Talking to the moon widget setDate:date= + currDat.getTime");
			tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
		}
	}
};
//=================================
// function ENDS
//=================================

//=================================
//	When the mousewheel is used and over the counter will increment the date by a day
//=================================
dayCounter.onMouseWheel = function () {
	var delta = system.event.scrollDelta,
		dayInc = 0,
		someDate;

	//print("scroll wheel " + delta);
	if (delta < 0) {
		if (preferences.soundPref.value === "enable") {
			play(tick, false);
		}
	} else {
		if (preferences.soundPref.value === "enable") {
			play(tock, false);
		}
	}
	if (delta !== 0) {
		dayInc = parseInt(delta / 10, 10);
		//build the date for today
		someDate = new Date();
		//log("currDat " + currDat);
		numberOfDaysToAdd = numberOfDaysToAdd + dayInc;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		currDat = someDate;
		angle0	= dayAngle(currDat) - 120;
		displayDate(currDat, angle0);
		date = currDat;
		displayTime(currDat);
		if (lunarWidgetVisible) {
			if (moonWidgetFound) {
				log("12.Talking to the moon widget setDate:date= + currDat.getTime");
				tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
			}
		}
	}
	//log("delta " + delta);
};
//=================================
// function ENDS
//=================================

//=================================
//	When the mouse is clciks the day counter, will increment the date by a day
//=================================
dayCounter.onClick = function () {
	var dayInc = 0,
		someDate;

	if (preferences.soundPref.value === "enable") {
		play(newClunk, false);
	}
	dayInc = dayInc + 1;
	//build the date for today
	someDate = new Date();
	numberOfDaysToAdd = numberOfDaysToAdd + dayInc;
	someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
	currDat = someDate;
	angle0	= dayAngle(currDat) - 120;
	displayDate(currDat, angle0);
	date = currDat;
	displayTime(currDat);
	if (lunarWidgetVisible) {
		if (moonWidgetFound) {
			log("13.Talking to the moon widget setDate:date= + currDat.getTime");
			tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
		}
	}
};
//=================================
// function ENDS
//=================================

//==============================
// click on the rotating ring
//==============================
pseudoRotatingRing.onMouseDown = function () {
	downAngle = (Math.atan2((main_window.height / 2) - system.event.vOffset, (main_window.width / 2) - system.event.hOffset) / Math.PI) * 180;
	downDate  = date.getTime();
	if (preferences.soundPref.value === "enable") {
		play(zzzz, false);
	}
};
//=================================
// function ENDS
//=================================

//==============================
// when the opacitySlider is clicked upon and dragged
//==============================
opacitySlider.onMouseDrag = function () {
	var angle,
		opacityLevel;
	if (preferences.soundPref.value === "enable") {
		play(zzzzQuiet, false);
	}
	angle = (Math.atan2((main_window.height / 2) - system.event.vOffset, (main_window.width / 2) - system.event.hOffset) / Math.PI) * 180;
	opacitySlider.rotation = angle - 63;
	//log("opacitySlider.rotation " + opacitySlider.rotation);
	if (opacitySlider.rotation >= 13) {
		opacitySlider.rotation = 13;
	}
	if (opacitySlider.rotation <= -9) {
		opacitySlider.rotation = -9;
	}
	opacityLevel					   = opacitySlider.rotation + 9; //normalise the opacity level
	underlyingGlass.opacity			   = opacityLevel * 12;
	if (underlyingGlass.opacity <= 0) {
		underlyingGlass.opacity = 0;
	}
	preferences.glassOpacityPref.value = underlyingGlass.opacity;

//log("underlyingGlass.opacity " + underlyingGlass.opacity);
};
//=====================
//End function
//=====================

//==============================
// when the opacitySlider is clicked upon, make a sound
//==============================
opacitySlider.onMouseDown = function () {
	if (preferences.soundPref.value === "enable") {
		play(zzzz, false);
	}
};
//=====================
//End function
//=====================

//==============================
// when the opacitySlider loses focus, make a sound
//==============================
opacitySlider.onMouseUp = function () {
	if (preferences.soundPref.value === "enable") {
		play(zzzz, false);
	}
};
//=====================
//End function
//=====================

//==============================
// when the sizeSlider is clicked upon and dragged
//==============================
sizeSlider.onMouseDrag = function () {
	var angle;
	if (preferences.soundPref.value === "enable") {
		play(zzzzQuiet, false);
	}
	angle = (Math.atan2((main_window.height / 2) - system.event.vOffset, (main_window.width / 2) - system.event.hOffset) / Math.PI) * 180;
	sizeSlider.rotation = angle + 133;
	//log("sizeSlider.rotation " + sizeSlider.rotation);
	if (sizeSlider.rotation >= 8) {
		sizeSlider.rotation = 8;
	}
	if (sizeSlider.rotation <= -14) {
		sizeSlider.rotation = -14;
	}
	sizeLevel			= sizeSlider.rotation + 14; //normalise the size level
	sizeLevel			= parseInt((sizeLevel * 4.54) + 1, 10);
	if (preferences.tooltipPref.value === "enable") {
		sizeSlider.tooltip	= "Size " + sizeLevel + "% - Double click the size slider to set";
		innerFrames.tooltip = "Size " + sizeLevel + "% - Double click the size slider to set";
	} else {
		sizeSlider.tooltip	= "";
		innerFrames.tooltip = "";
	}
	sizeText.opacity = 90;
	sizeText.text = sizeLevel + "%";

	//log("2 sizeLevel " + sizeLevel);
	//log("preferences.scalePref.value	" + preferences.scalePref.value);
};
//=====================
//End function
//=====================

//==============================
// make the text disappear with an animation
//==============================
sizeSlider.onMouseUp = function () {
	var a = new FadeAnimation(sizeText, 0, 1550, animator.kEaseOut);
	animator.start([
		a
	]);
	if (preferences.soundPref.value === "enable") {
		play(zzzz, false);
	}

};
//=====================
//End function
//=====================

//==============================
// get the current size and show it
//==============================
sizeSlider.onMouseEnter = function () {
	//log("1 sizeText.text " + sizeText.text);
	if (!sizeText.text) {
		sizeText.text = preferences.scalePref.value + "%";
	}
	sizeText.opacity = 90;
};
//=====================
//End function
//=====================

//==============================
// make the text disappear simply (no complications)
//==============================
sizeSlider.onMouseExit = function () {
	sizeText.opacity = 0;
};
//=====================
//End function
//=====================

//==============================
// make the text appear
//==============================
sizeSlider.onMouseDown = function () {
	sizeText.opacity = 90;
	if (preferences.soundPref.value === "enable") {
		play(zzzz, false);
	}
};
//=====================
//End function
//=====================

//==============================
// changes the widget size
//==============================
innerFramesclickpointright.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}

	if (!sizeLevel) {
		sizeLevel = preferences.scalePref.value;
	} else {
		preferences.scalePref.value = sizeLevel;
	}		
	//log("sizeLevel " + sizeLevel);
	//log("preferences.scalePref.value	" + preferences.scalePref.value);
	doTheStuffAfterPrefsChanged();
};
//=====================
//End function
//=====================

//==============================
// make it seem as if you are dragging the ring...
//==============================
pseudoRotatingRing.onMouseDrag = function () {
	var angle,
		delta;

	angle	= (Math.atan2((main_window.height / 2) - system.event.vOffset, (main_window.width / 2) - system.event.hOffset) / Math.PI) * 180;
	delta	= Math.round(downAngle - angle);
	currDat = new Date(downDate + delta * 86400000);
	//log(currDat + " " + angle + " " + delta);
	displayDate(currDat, angle0);
	newDate = currDat;
	
	//log("1 currDat " + currDat);
	//log("lunarWidgetVisible " + lunarWidgetVisible);

	if (lunarWidgetVisible) {
		if (moonWidgetFound) {
			//log("14.Talking to the moon widget setDate:date= + currDat.getTime");
			tellWidget(preferred_form_location, "setDate:date=" + newDate.getTime());
		}
	}
};
//=====================
//End function
//=====================

//==============================
// final date on mouse up
//==============================
pseudoRotatingRing.onMouseUp = function () {
	//date = newDate;
	//currDate =  newDate;
	//log("2 newDate " + newDate);
	//log("3 currDat " + currDat);
	savEarthHoffset = earth.hoffset;
	savEarthVoffset = earth.voffset;
	if (preferences.soundPref.value === "enable") {
		play(tingingSound, false);
	}
	counterWheelRotation();
};
//=====================
//End function
//=====================

//=====================
// When the mousewheel is used on the pseudo-rotating ring then advance time
//=====================
pseudoRotatingRing.onMouseWheel = function () {
	var delta = system.event.scrollDelta,
		dayInc = 0,
		someDate;

	//print("scroll wheel " + delta);
	if (delta !== 0) {
		dayInc = parseInt(delta / 5, 10);
		//build the date for today
		someDate = new Date();
		//log("currDat " + currDat);
		numberOfDaysToAdd = numberOfDaysToAdd + dayInc;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		currDat = someDate;
		angle0	= dayAngle(currDat) - 120;
		displayDate(currDat, angle0);
		date = currDat;
		displayTime(currDat);
		if (lunarWidgetVisible) {
			if (moonWidgetFound) {
				log("15.Talking to the moon widget setDate:date= + currDat.getTime");
				tellWidget(preferred_form_location, "setDate:date=" + currDat.getTime());
			}
		}
	}
	useMouseWheel = useMouseWheel + 1;
};
//=================================
// function ENDS
//=================================

//=================================
//Turn the earth, selecting the next animated image
//=================================
function earthTurn() {
	globe.src = earthBaseName + earthFrame + ".png";
	if (globeStartHoffset < globeEndHoffset) {
		if (earthFrame >= 35) {
			earthFrame = 1;
		} else {
			earthFrame = earthFrame + 1;
		}
	} else {
		if (earthFrame <= 1) {
			earthFrame = 35;
		} else {
			earthFrame = earthFrame - 1;
		}
	}
}
//=====================
//End function
//=====================

//=====================
//when the 1 toggle is clicked it show in full size
//=====================
toggle1.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "1.0";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the 2 toggle is clicked it decrease size by 10%
//=====================
toggle2.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "0.9";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the 3 toggle is clicked it decrease size by 20%
//=====================
toggle3.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "0.8";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the 4 toggle is clicked it decrease size by 30%
//=====================
toggle4.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "0.7";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the 5 toggle is clicked it decrease size by 40%
//=====================
toggle5.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "0.6";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the 6 toggle is clicked it decrease size by 50%
//=====================
toggle6.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "0.5";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the globe is double-clicked it
//=====================
toggle7.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(steam, false);
	}
	preferences.earthSizePref.value = "0.4";
	resizeEarthGlobe();
};
//=====================
//End function
//=====================

//=====================
//when the F toggle is clicked turn the globe quickly
//=====================
toggleF.onClick = function () {
	preferences.earthTurnPref.value = "Fast";
	earthTimer.interval				= 0.1;
	earthTimer.ticking				= true;
	if (preferences.soundPref.value === "enable") {
		play(electricDrone, false);
	}
};
//=====================
//End function
//=====================

//=====================
//when the S toggle is clicked turn the globe slowly
//=====================
toggleS.onClick = function () {
	preferences.earthTurnPref.value = "Slow";
	earthTimer.interval				= 0.3;
	earthTimer.ticking				= true;
	if (preferences.soundPref.value === "enable") {
		play(newClunk, false);
	}
};
//=====================
//End function
//=====================

//=====================
//when the supporting bar is clicked bar disappears
//=====================
supportingBar.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(suck, false);
	}
	preferences.sizebar.value = "disable";
	supportingBar.visible	  = false;
	toggle1.visible			  = false;
	toggle2.visible			  = false;
	toggle3.visible			  = false;
	toggle4.visible			  = false;
	toggle5.visible			  = false;
	toggle6.visible			  = false;
	toggle7.visible			  = false;
	cancel.visible				  = false;
};
//=====================
//End function
//=====================

//=====================
//when the supporting bar is clicked bar disappears with all the resizing controls
//=====================
globetop.onClick = function () {
	if (preferences.soundPref.value === "enable") {
		play(suck, false);
	}
	preferences.sizebar.value = "enable";
	supportingBar.visible	  = true;
	toggle1.visible			  = true;
	toggle2.visible			  = true;
	toggle3.visible			  = true;
	toggle4.visible			  = true;
	toggle5.visible			  = true;
	toggle6.visible			  = true;
	toggle7.visible			  = true;
	cancel.visible			  = true;
};
//=====================
//End function
//=====================

//===========================================
// this function opens other widgets URL
//===========================================
function otherwidgets() {
	var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://lightquick.co.uk/steampunk-widgets.html?Itemid=264");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the URL for paypal
//===========================================
function donate() {
    
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("https://www.ko-fi.com/yereverluvinunclebert");
        if (preferences.soundPref.value === "enable") {
            play(winding, false);
        }                
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens my Amazon URL wishlist
//===========================================
function amazon() {
	var answer = alert("Help support the creation of more widgets like this. Buy me a small item on my Amazon wishlist! This button opens a browser window and connects to my Amazon wish list page). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://www.amazon.co.uk/gp/registry/registry.html?ie=UTF8&id=A3OBFB6ZN4F7&type=wishlist");
	}
}	   
//=====================
//End function
//=====================

//===========================================
// this function opens the rocketdock URL
//===========================================
function rocketdock() {
	var answer = alert("Log in and vote for my widgets on Rocketdock. This button opens a browser window and connects to the Rocketdock page where you can give the widget a 5 star rating... Will you be kind and proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://rocketdock.com/addon/icons/46560");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the underWidget URL
//===========================================
function underWidget() {
	var answer = alert("This button opens a browser window and connects to the Under Widget download page where you can download and install the UnderWidget that provides the cogs and gubbins underneath this widget", "Open Browser Window", "No Thanks");
	
	if (answer === 1) {
		openURL("http://lightquick.co.uk/downloads/steampunk-underwidget.html?Itemid=264");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the Moon Widget URL
//===========================================
function moonWidget() {
	var answer = alert("This button opens a browser window and connects to the Moon Widget download page where you can download and install the moon widget that provides the moon phase functionality for this widget", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://lightquick.co.uk/downloads/steampunk-moon-phase-widget.html?Itemid=264");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the steampunk Background URL
//===========================================
function steampunkBackground() {
	var answer = alert("This button opens a browser window and connects to the leather wallpaper download page where you can download and install the background that provides static cogs and gubbins underneath this widget", "Open Browser Window", "No Thanks");
	
	if (answer === 1) {
		openURL("http://lightquick.co.uk/jdownloads/steampunk-clock-leather-desktop-wallpaper.html?Itemid=264");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the download URL
//===========================================
function update() {
	var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");
	if (answer === 1) {
		openURL("http://lightquick.co.uk/downloads/steampunk-orrery-calendar-clock-yahoo-widget-mkii.html?Itemid=264");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function contact() {
	var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://lightquick.co.uk/contact.html?Itemid=3");
		if (preferences.soundPref.value === "enable") {
			play(winding, false);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {
	print("dummy");
}
//=====================
//End function
//=====================

//=====================
// Position the data window near the widget but still on screen
//=====================
function posEntryWindow() {
	var vOff = main_window.vOffset + main_window.height / 2 - entry_window.height / 2,
		hOff = main_window.hOffset + main_window.width / 2 - entry_window.width / 2;

	if (hOff + entry_window.width > screen.availWidth) {
		hOff = screen.availWidth - entry_window.width;
	}

	if (hOff < screen.availLeft) {
		hOff = screen.availLeft;
	}

	if (vOff + entry_window.height > screen.availHeight) {
		vOff = screen.availHeight - entry_window.height;
	}

	if (vOff < screen.availTop) {
		vOff = screen.availTop;
	}

	entry_window.vOffset = vOff + (60 * scale);
	entry_window.hOffset = hOff - (30 * scale);
}
//=====================
//End function
//=====================

//=====================
//Send the latitude/longitude to the moon widget
//=====================
function sendLatAndLong() {
	// if the moon widget is found and if the latitude/longitude are set
	// then send the latitude/longitude to the moon widget.
	//if ( preferences.longitudePref.value != "" ) {
	tellWidget(preferred_form_location, "setPref:longitude" + preferences.longitudePref.value);
	//}
	//if ( preferences.latitudePref.value != "" ) {
	tellWidget(preferred_form_location, "setPref:latitude" + preferences.latitudePref.value);
	//}
}

//=====================
//End script.js
//=====================




//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================


//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
        //uses the contents of imageEditPref to initiate your default editor
        performCommand("menu");
    //}
}
//=====================
//End function
//=====================


//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;

    if (preferences.soundPref.value === "enabled") {
        play(tingingSound, false);
    }

//    if (system.event.altKey) { // filesystem.open() call
//        if (preferences.openFilePref.value === "") {
//            answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
//            if (answer === 1) {
//                showWidgetPreferences();
//            }
//            return;
//        }
//        filesystem.open(preferences.openFilePref.value);
//    } else { // runCommandInBg() call
//        if (preferences.imageCmdPref.value === "") {
//            answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
//            if (answer === 1) {
//                showWidgetPreferences();
//            }
//            return;
//        }
        print("method "+method);
        if (method === "menu") {
            runCommandInBg(preferences.imageEditPref.value, "runningTask");        		
        } else {
            runCommandInBg(preferences.imageCmdPref.value, "runningTask");        	
        }
//    }
}
//=====================
//End function
//=====================




//==============================
// pins the widget in place
//==============================
widgetHelp.onMouseDown = function () {
     widgetHelp.opacity = 0;
};
//==============================
//
//==============================


//===================================
// function to capture mousewheel
//===================================
underlyingGlass.onMouseWheel = function (event) {
    if (event.ctrlKey) {
       capMouseWheel(event);
    }
};
//==============================
//
//==============================


//===================================
// function to resize using mousewheel + CTRL key as per Firefox
//===================================
function capMouseWheel(event) {
	var size = Number(preferences.scalePref.value),
		maxLength = Number(preferences.scalePref.maxLength),
		minLength = Number(preferences.scalePref.minLength),
		ticks = Number(preferences.scalePref.ticks),
		step = Math.round((maxLength - minLength) / (ticks - 1));


		if (event.scrollDelta > 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			} else {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			}
		} else if (event.scrollDelta < 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			} else {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			}
		}
		preferences.scalePref.value = String(size);
                //screenwrite("using mousewheel");
                reSizeMe();

  }
//=====================
//End function
//=====================


        //======================================================================================
        // Function to scale the image
        //======================================================================================
        function scaleImage(scaleSize, o, hOffset, vOffset,width, height,  hRegP, vRegP ) {
            //scaleSize = 50 /100;
                if (debugFlg == 1) {print ("%scaleImage-I-INFO, scaling")};

                o.width  = Math.round(scaleSize * width);
            	o.height = Math.round(scaleSize * height);
        	print("**scaleSize**" + scaleSize);
            	hRegP = hRegP || 0;                     // hRegP and vRegP are optional parameters
            	vRegP = vRegP || 0;

            	hOffset += hRegP;
            	vOffset += vRegP;

            	o.hOffset = Math.round(scaleSize * hOffset);
            	o.vOffset = Math.round(scaleSize * vOffset);

            	o.hRegistrationPoint =  Math.round(scaleSize * hRegP);
            	o.vRegistrationPoint =  Math.round(scaleSize * vRegP);
        	};
        //=====================
        //End function
        //=====================

        //======================================================================================
        // Function to scale the text
        //======================================================================================
        function scaleText(o,  width, height, hOffset, vOffset, fontSize) {
                o.width  = Math.round(scale * width);
            	//o.height = Math.round(scale * height);

            	o.hOffset = Math.round(scale * hOffset);
            	o.vOffset = Math.round(scale * vOffset);

                o.style.fontsize = (fontSize * scale + "px");

        	};
        //=====================
        //End function
        //=====================

//=================================
//
//=================================
function reSizeMe() {
    //var scale = Number(preferences.clockSize.value) / 100;
    //scale = parseInt(preferences.scalePref.value); 	// sets global scale because it is used elsewhere
    var scaleSize = Number(preferences.scalePref.value) / 100;	// sets global scale because it is used elsewhere

    //if (debugFlg == 1) {print ("%reSizeMe-I-INFO, startup")};

	main_window.width			 = Math.round(scaleSize * 658); //608
	main_window.height			 = Math.round(scaleSize * 598);
	rotatingpointwidth			 = Math.round(scaleSize * 578);


//       scaleImage(scaleSize, o, hOffset, vOffset,width, height,  hRegP, vRegP) {

	 scaleImage(scaleSize, scaleSize, shrinker,51, 51, 475, 475, 230, 230);
	 scaleImage(scaleSize, scaleSize, underlay,51, 51, 475, 475);
	 scaleImage(scaleSize, scaleSize, underlyingGlass,143, 143, 294, 294);

	 scaleImage(scaleSize, scaleSize, innerFrames, 100, 100, 385, 385);
	 scaleImage(scaleSize, scaleSize, tickingSlider,100, 100, 385, 385, 192, 192);
	 scaleImage(scaleSize, scaleSize, opacitySlider,100, 100, 385, 385, 192, 192);
	 scaleImage(scaleSize, scaleSize, sizeSlider,100, 100, 385, 385, 192, 192);
	 scaleImage(scaleSize, scaleSize, pseudoRotatingRing,50, 50, 478, 478, 239, 239);
	 scaleImage(scaleSize, scaleSize, ringtext,66, 67, 443, 441, 221.5, 220.5);

	scaleImage(scaleSize, scaleSize, woodSurround,50, 50, 478, 498);

	scaleImage(scaleSize, scaleSize, counterWheel,119, 121, 340, 340, 170, 170);
	scaleImage(scaleSize, scaleSize, cogShadow,103, 243, 103, 103,  52, 52);
	scaleImage(scaleSize, scaleSize, cog	,101, 219, 98, 99, 49, 50);
	scaleImage(scaleSize, scaleSize, monthCogShadow,353, 249, 108, 108, 54, 54);
	scaleImage(scaleSize, scaleSize, monthCog,355, 241, 98, 99,  49, 50);
	scaleImage(scaleSize, scaleSize, wheelShadow,57, 250, 95, 95, 47, 47);
	scaleImage(scaleSize, scaleSize, wheel	,60, 248, 88, 88, 44, 44);
	scaleImage(scaleSize, scaleSize, driveBand,82, 249, 73, 73);
	scaleImage(scaleSize, scaleSize, driveBandclickpoint,95, 281, 20, 20);
	scaleImage(scaleSize, scaleSize, dayOfWeek,131, 209, 64, 37);
	scaleImage(scaleSize, clock	,76, 114, 182, 182);
	scaleImage(scaleSize, clockclickpointleft,133, 195, 20, 20);
	scaleImage(scaleSize, clockclickpointcentre,153, 190, 20, 20);
	scaleImage(scaleSize, clockclickpointright,173, 195, 20, 20);
	scaleImage(scaleSize, hourHand,152, 149, 27, 55);
	scaleImage(scaleSize, minuteHand,155, 133, 20, 71);
	scaleImage(scaleSize, secondHand,162, 145, 4, 21);
	scaleImage(scaleSize, centreBoss,153, 188, 25, 26);
	scaleImage(scaleSize, clockReflection,103, 135, 122, 74);

	scaleImage(scaleSize, moonUnderShadow,338, 325, 45, 46, 22, 22);
	scaleImage(scaleSize, moon	,339, 321, 33, 33,  16, 16);
	scaleImage(scaleSize, moonOverShadow,329, 321, 52, 46, 26, 18);
	scaleImage(scaleSize, earthUnderShadow,276, 328, 82, 83, 41, 41);
	scaleImage(scaleSize, earth	,269, 321, 68, 69, 34, 34);
	scaleImage(scaleSize, earthOverShadow,260, 342, 84, 68, 42, 18);

	scaleImage(scaleSize, dayCounter	,427, 239, 43, 425);
	scaleImage(scaleSize, yearCounter,427, 299, 43, 42);
	scaleImage(scaleSize, dayTensCounter,432, 253, 15, 16);
	scaleImage(scaleSize, dayUnitsCounter,447, 253, 15, 16);
	scaleImage(scaleSize, monthCounter,359, 280, 89, 21);
	scaleImage(scaleSize, yearTensCounter,432, 315, 15, 16);
	scaleImage(scaleSize, yearUnitsCounter,447, 315, 15, 16);
	scaleImage(scaleSize, timekeeperclickpointbottom,465, 310, 53, 501);
	scaleImage(scaleSize, soundtoggle,525, 284, 25, 16);
	scaleImage(scaleSize, timekeeper,335, 236, 216, 134);
	scaleImage(scaleSize, glass	,471, 273, 43, 43);
	scaleImage(scaleSize, timekeeperclickpointleft,330, 283, 20, 20);
	scaleImage(scaleSize, timekeeperclickpointmiddle,450, 290, 20, 20);
	scaleImage(scaleSize, timekeeperclickpointright,510, 266, 20, 20);
	scaleImage(scaleSize, timekeeperclickpointfarright,535, 281, 20, 20);
	scaleImage(scaleSize, innerFramesclickpointleft,184, 432, 20, 20);
	scaleImage(scaleSize, innerFramesclickpointright,378, 430, 20, 20);
	scaleImage(scaleSize, innerFramesclickpointtop,378, 128, 20, 20);
	scaleImage(scaleSize, about,20, 50, 570, 499);
	scaleImage(scaleSize, widgetHelp,30, -8, 600, 600);
	scaleImage(scaleSize, pin,1, 1, 37, 37);

//======================================
//newtext function used to create text objects
//======================================
	//sizeText					 = newText(main_window,	 350, 400, 50, 20, "left", "TIMES", "-kon-shadow:black 5px", 18, "#FFCC00", 0, "#000000", 0, 101);

//======================================
//newImage function will not create objects
//with zero opacity,so the extra unwanted items are made completely invisible here
//======================================
	pin.opacity				 = 0;
	about.opacity				 = 0;
	widgetHelp.opacity			 = 0;

//================================
//enlarged earth images & controls
//================================
	scaleImage(scaleSize, ring, 143, 145, 300, 300);
	scaleImage(scaleSize, globe		,125, 130, 330, 330);
	scaleImage(scaleSize, glow		,125, 130, 330, 330);
	scaleImage(scaleSize, globetop	,273, 128, 21, 28);
	scaleImage(scaleSize, supportingBar		,130, 132, 164, 312);
	scaleImage(scaleSize, toggle1		,249, 133, 16, 15);
	scaleImage(scaleSize, toggle2		,194, 154, 16, 16);
	scaleImage(scaleSize, toggle3		,149, 199, 16, 16);
	scaleImage(scaleSize, toggle4		,126, 271, 16, 16);
	scaleImage(scaleSize, toggle5		,130, 325, 16, 16);
	scaleImage(scaleSize, toggle6		,154, 374, 16, 16);
	scaleImage(scaleSize, toggle7		,186, 407, 16, 16);
	scaleImage(scaleSize, toggleS		,257, 430, 16, 16);
	scaleImage(scaleSize, toggleF		,314, 430, 33, 33);
	//cancel			,215, 420, 33, 33, "cancel);
        scaleImage(scaleSize, 	cancel			,354, 151, 33, 33);


}
//=================================
// END function
//=================================


