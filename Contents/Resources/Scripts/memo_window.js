/*global memo_window, openMouseUp, onWrench, prevDay, nextDay, statusMouseup,
	dragDropped, eprint, onMouseOver, closeMemoWindow, saveMemoWindow, bf,
	memoKeyPress, maglensMouseUp
*/

/*properties
    alignment, appendChild, bgColor, bgOpacity, checked, color, colorize,
    contextMenuItems, data, editable, enabled, font, hAlign, hOffset, height,
    indexOf, level, memoBgColorPref, name, onDragDrop, onDragEnter, onDragExit,
    onKeyPress, onMouseDown, onMouseEnter, onMouseExit, onMouseUp, onSelect,
    opacity, open, orientation, platform, push, scrollbar, shadow, size, src,
    style, thumbColor, title, toLowerCase, tooltip, vOffset, value, visible,
    width
*/

var rbase = "Resources/Pictures/";

var the_parent  = null;
var main_frame  = null;
var bkgd  		= null;
var frame       = null;
var image 		= null;
var main_image	= null;
var hsb         = null;
var vsb         = null;
var memo		= null;
var rimg        = null;
var mimg        = null;
var buttonKey	= "";

var add			= null;
var maglens		= null;
var wrench		= null;
var back		= null;
var pause		= null;
var sPause		= null;
var forward		= null;
var close		= null;
var spawn		= null;
var statusShadow = null;
var status		= null;

//var newClunk = "Resources/sounds/newclunk.mp3";

/*function newWindow(title, hOffset, vOffset, width, height, alignment, level, shadow, visible) {
	var o = new Window();
	o.title     = title;
	o.width     = width;
	o.height    = height;
	o.alignment = alignment;
	o.hOffset   = hOffset;
	o.vOffset   = vOffset;
	o.level     = level;
	o.shadow    = shadow;
	o.visible   = visible;
	return o;
}
*/
/*function newFrame(parent, hOffset, vOffset, width, height, hAlign) {
	var o = new Frame();
	o.hOffset = hOffset;
	o.vOffset = vOffset;
	o.width   = width;
	o.height  = height;
	o.hAlign  = hAlign;
	parent.appendChild(o);
	return o;
}
*/
/*function newScrollBar(parent, orientation, hOffset, vOffset, width, height, hAlign, opacity, thumbColor) {
	var o = new ScrollBar();
	o.orientation = orientation;
	o.hOffset     = hOffset;
	o.vOffset     = vOffset;
	o.width       = width;
	o.height      = height;
	o.hAlign      = hAlign;
	o.opacity     = opacity;
	o.thumbColor = thumbColor;
	parent.appendChild(o);
	return o;
}
*/
function newImage(parent, src, hOffset, vOffset, width, height, hAlign, opacity, colorize) {
	var o = new Image();
	o.src      = src;
	o.hOffset  = hOffset;
	o.vOffset  = vOffset;
	o.width    = width;
	o.height   = height;
	o.hAlign   = hAlign;
	o.opacity  = opacity;
	o.colorize = colorize;
	parent.appendChild(o);
	return o;
}

function newText(parent, hOffset, vOffset, width, height, hAlign, font, style, size, color, opacity, bgColor, bgOpacity) {
	var o = new Text();
	o.hOffset   = hOffset;
	o.vOffset   = vOffset;
	o.width     = width;
	o.height    = height;
	o.hAlign    = hAlign;
	o.font      = font;
	o.style     = style;
	o.size      = size;
	o.color     = color;
	o.opacity   = opacity;
	o.bgColor   = bgColor;
	o.bgOpacity = bgOpacity;
	parent.appendChild(o);
	return o;
}

function newTextArea(parent, hOffset, vOffset, width, height, hAlign, font, style, size, color, opacity, bgColor, bgOpacity, scrollbar, editable) {
	var o = new TextArea();
	o.hOffset   = hOffset;
	o.vOffset   = vOffset;
	o.width     = width;
	o.height    = height;
	o.hAlign    = hAlign;
	o.font      = font;
	o.style     = style;
	o.size      = size;
	o.color     = color;
	o.opacity   = opacity;
	o.bgColor   = bgColor;
	o.bgOpacity = bgOpacity;
	o.scrollbar = scrollbar;
	o.editable  = editable;
	parent.appendChild(o);
	return o;
}

function newContextMenuItem(title, onSelect, enabled, checked) {
	var o = new MenuItem();
	o.title    = title;
	o.onSelect = onSelect;
	o.enabled  = enabled;
	o.checked  = checked;
	return o;
}

function addDragHandlers(o, onDragEnter, onDragDrop, onDragExit) {
	o.onDragEnter = onDragEnter;
	o.onDragDrop  = onDragDrop;
	o.onDragExit  = onDragExit;
}

function addMouseWithinHandlers(o, onMouseEnter, onMouseExit) {
	o.onMouseEnter = onMouseEnter;
	o.onMouseExit  = onMouseExit;
}

function addMouseHandlers(o, onMouseDown, onMouseUp) {
	o.onMouseDown = onMouseDown;
	o.onMouseUp  = onMouseUp;
}

//////////////////////////////////////////////////////////////////////////////////////////

function myAddMouseUp() {
//	add.opacity = 255;
//	addMouseUp();
}

function mymaglensMouseUp() {
	print("mymaglensMouseUp");
	maglens.opacity    = 255;
	
        if (system.event.altKey) {
        	maglensMouseUp();
	} else {
        	play(newClunk, false);
                if (preferences.typewriterSoundPref.value == "enable") {
                  preferences.typewriterSoundPref.value = "disable";
                } else {
                  preferences.typewriterSoundPref.value = "enable";
                }
        }
}

function myOnWrench() {
	wrench.opacity  = 255;
	play(newClunk, false);
	onWrench();
}

function myOnPause() {
//	pause.opacity = 255;
//	onPause();
}

function myPauseDayShow() {
//	sPause.opacity = 255;
//	pauseDayShow();
}

function myPrevDay() {
	back.opacity    = 255;
        if (preferences.typewriterSoundPref.value == "enable") { play(rollerBlind,false)};
        stitching.opacity = 255;
	for (i = 1; i < 210; i += 4) {

                    stitching.voffset = 230 - i;
                    sleep (1);
        }
        stitching.opacity = 0;
	prevDay();
}

function myNextDay() {
	forward.opacity = 255;
        if (preferences.typewriterSoundPref.value == "enable") { play(rollerBlind,false)};
        stitching.opacity = 255;
	for (i = 1; i < 220; i += 4) {

                    stitching.voffset = 18 + i;
                    sleep (1);
        }
        stitching.opacity = 0;
	nextDay();

}

function onClose() {
	close.opacity = 255;
	play(shutdown, false);
	closeMemoWindow();
}

function onSpawn() {
	spawn.opacity = 255;
	play(till, false);
	saveMemoWindow();
}

function myStatusMouseup() {
	status.opacity  = 255;
	statusMouseup();
}

function myDisplayHelp() {
	filesystem.open('Resources/Help.pdf');
}

function onMouseOverTrue() {
    onMouseOver(true);
}

function onMouseOverFalse() {
    onMouseOver(false);
}

function buttonOpacity127()	{
	this.opacity = 127;
	//play(keypress,false);
}

function memoDragEnter() {
	status.color = "#00FF00";
}

function memoDragDropped() {
	memo.data += dragDropped();
	status.color = "#FFFFFF";
}

function memoDragExit() {
	status.color = "#FFFFFF";
}

//////////////////////////////////////////////////////////////////////////////////////////

var theWidgetName = widget.name;

if (theWidgetName.toLowerCase().indexOf("timekeeper") === 0) {
	theWidgetName = "timekeeper";
} else {
	beep();
	alert('Invalid Widget Name: ' + theWidgetName);
	closeWidget();
}

main_frame      = null;
bkgd			= null;
frame 			= null;
//image 			= newImage(memo_window, rbase + "Loading.png", 14, 10, 320, 240, "left", 255, null);
hsb				= null;
vsb				= null;

//addDragHandlers(image, opacity128, dragDroppedImage, opacity255);
//addMouseWithinHandlers(image, onMouseOverTrue, onMouseOverFalse);

//memo 			= newTextArea(memo_window, 14, 10, 320, 240, "left", "Courier New", "font-weight: bold;", 12, "#000000", 255, "#93B9B0", 255, true, true);
memo 			= newTextArea(memo_window, 36, 45, 290, 190, "left", "Courier New", "font-weight: bold;", 12, "#000000", 255, "#93B9B0", 0, true, true);
memo.zOrder = 10;


addDragHandlers(memo, memoDragEnter, memoDragDropped, memoDragExit);
//addMouseWithinHandlers(memo, onMouseOverTrue, onMouseOverFalse);
memo.onKeyPress = function () { memoKeyPress(); };

buttonKey = "owbfcs";
the_parent      = memo_window;

/*var upperLeft 		= newImage(the_parent, rbase + "ULeft.png",    0,    0,  21,  22, "left",  255, "#000000");
var top 			= newImage(the_parent, rbase + "Top.png",      21,   0, 307,  22, "left",  255, "#000000");
var upperRight 		= newImage(the_parent, rbase + "URight.png",  328,   0,  21,  22, "left",  255, "#000000");
var rightSide 		= newImage(the_parent, rbase + "RSide.png",   328,  22,  21, 222, "left",  255, "#000000");
var lowerRight 		= newImage(the_parent, rbase + "LRight.png",  328, 244,  21,  35, "left",  255, "#000000");
var lowerLeft 		= newImage(the_parent, rbase + "LLeft.png",     0, 244,  21,  35, "left",  255, "#000000");
var leftSide 		= newImage(the_parent, rbase + "LSide.png",     0, 22,   21, 222, "left",  255, "#000000");
var lowerRightSmall = newImage(the_parent, rbase + "LRSmall.png", 328, 244,  21,  22, "left",    0, "#000000");
var bottomSmall 	= newImage(the_parent, rbase + "BSmall.png",   21, 244, 305,  22, "left",    0, "#000000");
var lowerLeftSmall	= newImage(the_parent, rbase + "LLSmall.png",   0, 244,  21,  22, "left",    0, "#000000");
*/
var box 			= newImage(the_parent, rbase + "Box.png",   1, 1, 360,  315, "left",  255);
var bottom 			= newImage(the_parent, rbase + "Bottom.png",  140, 250, 66,  14, "left",  255);
var stitching 			= newImage(the_parent, rbase + "stitching.png",  34, 22, 291, 7, "left",  255);
	//                    parent, hOffset, vOffset, width, height, src, zOrder, opacity, hRegP, vRegP

var buttonHoffset = 35;	// left hand side
var buttonVoffset = 245;	// left hand side

if (buttonKey.indexOf("a") >= 0) {
	add				= newImage(the_parent, rbase + "Add.png", 		buttonHoffset, buttonVoffset,  20,  17, "left",  255, null);
	add.tooltip		= "Add a new location to the directory of locations.";
	addMouseHandlers(add, buttonOpacity127, myAddMouseUp);
	buttonHoffset += 20;
}

if (buttonKey.indexOf("o") >= 0) {
	maglens			= newImage(the_parent, rbase + "MagLens.png", 	buttonHoffset, buttonVoffset,  25,  27, "left",  255, null);
	maglens.tooltip	= "Mute the typewriter sound effects";
	addMouseHandlers(maglens, buttonOpacity127, mymaglensMouseUp);
	buttonHoffset += 20;
}

if (buttonKey.indexOf("w") >= 0) {
	wrench			= newImage(the_parent, rbase + "Wrench.png", 	buttonHoffset, buttonVoffset,  24, 23, "left",  255, null);
	wrench.tooltip	= "Open the displayed image. Shift-click to find the displayed image.";
	addMouseHandlers(wrench, buttonOpacity127, myOnWrench);
	buttonHoffset += 20;
}

if (buttonKey.indexOf("b") >= 0) {
	back			= newImage(the_parent, rbase + "Back.png", 	buttonHoffset, buttonVoffset,  24, 23, "left",  255, null);
	back.tooltip	= "Go to the previous day.";
	addMouseHandlers(back, buttonOpacity127, myPrevDay);
	buttonHoffset += 20;
}

if (buttonKey.indexOf("p") >= 0) {
	pause			= newImage(the_parent, rbase + "Pause.png", 	buttonHoffset, buttonVoffset,  24, 23, "left",  255, null);
	pause.tooltip	= "Pause (or continue) the slide show.";
	addMouseHandlers(pause, buttonOpacity127, myOnPause);
	buttonHoffset += 20;
}

buttonHoffset = 247;	// right hand side

if (buttonKey.indexOf("q") >= 0) {
	sPause			= newImage(the_parent, rbase + "Pause.png", 	buttonHoffset, buttonVoffset,  24, 23, "left",  255, null);
	sPause.tooltip	= "Pause (or continue) the slide show.";
	addMouseHandlers(sPause, buttonOpacity127, myPauseDayShow);
}
buttonHoffset = 260;

if (buttonKey.indexOf("f") >= 0) {
	forward			= newImage(the_parent, rbase + "Forward.png", 	buttonHoffset, buttonVoffset,  24,  23, "left",  255, null);
	forward.tooltip	= "Go to the next day.";
	addMouseHandlers(forward, buttonOpacity127, myNextDay);
	buttonHoffset += 20;
}

if (buttonKey.indexOf("c") >= 0) {
	close			= newImage(the_parent, rbase + "Close.png", 	buttonHoffset, buttonVoffset,  24,  23, "left",  255, null);
	close.tooltip	= "Close this instance of " + theWidgetName + ".";
	addMouseHandlers(close, buttonOpacity127, onClose);
	buttonHoffset += 20;
}

if (buttonKey.indexOf("s") >= 0) {
	spawn			= newImage(the_parent, rbase + "NewSpawn.png", buttonHoffset, buttonVoffset,  24, 23, "left",  255, null);
	spawn.tooltip	= "Spawn a new instance of " + theWidgetName + ".";
	addMouseHandlers(spawn, buttonOpacity127, onSpawn);
	buttonHoffset += 20;
}

statusShadow = newText(the_parent, 174, 260, null, null, "center", "Times", "font-weight: normal;", 9, "#000000", 40, "#000000", 0);
statusShadow.data = "";

memoTitle2 = newText(the_parent, 130, 43, null, null, "center", "Times", "font-weight: normal;", 9, "#000000", 255, "#000000", 0);

status = newText(the_parent, 174, 262, null, null, "center", "Times", "font-weight: normal;", 9, "#000000", 255, "#000000", 0);
status.data = "";
addMouseHandlers(status, buttonOpacity127, myStatusMouseup);
/*
var m;
var contextMenuItems = [];
m = newContextMenuItem(bf("CMopenHelp"), myDisplayHelp, true, false);
contextMenuItems.push(m);
memo_window.contextMenuItems = contextMenuItems;
*/
