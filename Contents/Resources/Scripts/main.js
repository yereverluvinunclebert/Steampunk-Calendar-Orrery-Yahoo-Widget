/*global memo_window, updateMemoPrefs, close, image, memo, upperLeft,
	top, upperRight, leftSide, rightSide, lowerLeft, bottom, lowerRight, lowerLeftSmall,
	bottomSmall, lowerRightSmall, open, wrench, back, forward, spawn, statusShadow, status,
	timer1, theTimer, speakMemo, maglens
*/

/*properties
    PI, abs, altKey, anchorPref, anchorXPref, anchorYPref, aspectRatioPref,
    availHeight, availLeft, availTop, availWidth, bgColor, color, colorize, cos,
    data, event, font, frameColor, framePref, fromCharCode, hOffset,
    hRegistrationPoint, height, heightPref, indexOf, length, maxHeightPref,
    maxWidthPref, memoFontPref, memoFontSizePref, memoScalePref, memoTextBgColor,
    memoTextColor, opacity, oversizePref, platform, rotation, rotationPref,
    round, shiftKey, showTitlePref, sin, size, toDateString, vOffset,
    vRegistrationPoint, value, visible, width, widthPref
*/

var systemPlatform = system.platform;
//var systemPlatform = "windows";	// for testing windows code on the macintosh

var halfWidth, halfWinWidth, halfHeight, halfWinHeight, frameOpacity;

var enlargedFlag = false;
var mouseWithin	 = false;

var left  = true;
var right = false;
var upper = true;
var lower = false;

var magnification = Number(preferences.memoScalePref.value) / 100;
var border		  = 10;		// border size
var wDelta		  = 30;
var hDelta		  = 40;

//var oversizeMag	  = Number(preferences.oversizePref.value) + 1;

var newRotation	  =	 0;

var anchorX = 0;
var anchorY = 0;

var gMainWindowWidth  = memo_window.width;
var gMainWindowHeight = memo_window.height;

var memoTitle = new Date().toDateString();

function max(a, b) {
	if (a > b) { return a; }
	return b;
}

function min(a, b) {
	if (a < b) { return a; }
	return b;
}

function stringWidth(string, fontname, fontsize) {
	var tmpText = new Text(), width;

	tmpText.opacity = 0;
	tmpText.font = fontname;
	tmpText.size = fontsize;
	tmpText.data = string;
	width = tmpText.width;
	return width;
}

function saveAnchorPoint() {
	var anchorPref = preferences.anchorPref.value;

	memo_window.width  = gMainWindowWidth;
	memo_window.height = gMainWindowHeight;

	switch (anchorPref) {
	case "None":
		anchorX = memo_window.hOffset;
		anchorY = memo_window.vOffset;
		break;

	case "Top Left of Screen":
		anchorX = memo_window.hOffset;
		anchorY = memo_window.vOffset;
		break;

	case "Top Right of Screen":
		anchorX = memo_window.hOffset + memo_window.width;
		anchorY = memo_window.vOffset;
		break;

	case "Bottom Left of Screen":
		anchorX = memo_window.hOffset;
		anchorY = memo_window.vOffset + memo_window.height;
		break;

	case "Bottom Right of Screen":
		anchorX = memo_window.hOffset + memo_window.width;
		anchorY = memo_window.vOffset + memo_window.height;
		break;

	case "Center of Screen":
		anchorX = memo_window.hOffset + (memo_window.width	>> 1);
		anchorY = memo_window.vOffset + (memo_window.height >> 1);
		break;

	case "Top Left of Memo Window":
		anchorX = memo_window.hOffset;
		anchorY = memo_window.vOffset;
		break;

	case "Top Right of Memo Window":
		anchorX = memo_window.hOffset + memo_window.width;
		anchorY = memo_window.vOffset;
		break;

	case "Bottom Left of Memo Window":
		anchorX = memo_window.hOffset;
		anchorY = memo_window.vOffset + memo_window.height;
		break;

	case "Bottom Right of Memo Window":
		anchorX = memo_window.hOffset + memo_window.width;
		anchorY = memo_window.vOffset + memo_window.height;
		break;

	case "Center of Memo Window":
		anchorX = memo_window.hOffset + (memo_window.width	>> 1);
		anchorY = memo_window.vOffset + (memo_window.height >> 1);
		break;
	}
	preferences.anchorXPref.value = String(anchorX);
	preferences.anchorYPref.value = String(anchorY);
}

function anchorWindow(winWidth, winHeight) {
	var anchorPref = preferences.anchorPref.value;

	if (anchorPref !== "None") {
		switch (anchorPref) {
		case "Top Left of Screen":
			memo_window.hOffset = screen.availLeft;
			memo_window.vOffset = screen.availTop;
			break;

		case "Top Right of Screen":
			memo_window.hOffset = screen.availLeft + screen.availWidth  - winWidth;
			memo_window.vOffset = screen.availTop;
			break;

		case "Bottom Left of Screen":
			memo_window.hOffset = screen.availLeft;
			memo_window.vOffset = screen.availTop	 + screen.availHeight - winHeight;
			break;

		case "Bottom Right of Screen":
			memo_window.hOffset = screen.availLeft + screen.availWidth  - winWidth;
			memo_window.vOffset = screen.availTop	 + screen.availHeight - winHeight;
			break;

		case "Center of Screen":
			memo_window.hOffset = screen.availLeft + ((screen.availWidth	- winWidth) >> 1);
			memo_window.vOffset = screen.availTop	 + ((screen.availHeight - winHeight) >> 1);
			break;

		case "Top Left of Memo Window":
			memo_window.hOffset = anchorX;
			memo_window.vOffset = anchorY;
			break;

		case "Top Right of Memo Window":
			memo_window.hOffset = anchorX - winWidth;
			memo_window.vOffset = anchorY;
			break;

		case "Bottom Left of Memo Window":
			memo_window.hOffset = anchorX;
			memo_window.vOffset = anchorY - winHeight;
			break;

		case "Bottom Right of Memo Window":
			memo_window.hOffset = anchorX - winWidth;
			memo_window.vOffset = anchorY - winHeight;
			break;

		case "Center of Memo Window":
			memo_window.hOffset = anchorX - (winWidth	 >> 1);
			memo_window.vOffset = anchorY - (winHeight >> 1);
			break;
		}
	}
}

function set(object, left, x, upper, y, w, h) {
	if (systemPlatform !== "macintosh") {	// until windows version of K is fixed
		object.hOffset = halfWinWidth  + (left	? -halfWidth  + x : -0 + halfWidth  + x);
		object.vOffset = halfWinHeight + (upper ? -halfHeight + y : -0 + halfHeight + y);
	} else {
		object.hOffset = halfWinWidth;
		object.vOffset = halfWinHeight;
		object.hRegistrationPoint = (left  ? -x + halfWidth  : -halfWidth - x);
		object.vRegistrationPoint = (upper ? -y + halfHeight : -halfHeight - y);
		object.rotation = newRotation;
	}

	if (w !== 0) {
		object.width = w;
	}
	if (h !== 0) {
		object.height = h;
	}
	object.opacity = frameOpacity;
}


function toggleSize() {
	saveAnchorPoint();
	enlargedFlag = !enlargedFlag;
	//reSize(enlargedFlag);
}

function enlarge() {
	saveAnchorPoint();
	enlargedFlag = true;
	//reSize(enlargedFlag);
}

function reduce() {
	saveAnchorPoint();
	enlargedFlag = false;
	//reSize(enlargedFlag);
}

function maglensMouseUp() {
	if (system.event.altKey) {
		speakMemo();
		return;
	}
	//toggleSize();
}

function onWrench() {
	var answer = alert("Delete this memo - are you sure?", "Delete it", "No Thanks");
	if (answer === 1) {
	    memo.data = "";
	}
}

function statusMouseup() {
	if (system.event.altKey) {
		preferences.showTitlePref.value = 1 - preferences.showTitlePref.value;
	} else if (system.event.shiftKey) {
		preferences.aspectRatioPref.value = 1 - preferences.aspectRatioPref.value;
		updateMemoPrefs();
	}
}

function takeAction() {
	memo_window.visible = true;
	return "";
}

function deleteDownloads() { }

function isStream() { return false; }

function updateImage() { }

function onMouseOver() {
}

function setFrameColor(color) {
/*	upperLeft.colorize = color;
	top.colorize = color;
	upperRight.colorize = color;
	rightSide.colorize = color;
	leftSide.colorize = color;
	lowerRight.colorize = color;
	bottom.colorize = color;
	lowerLeft.colorize = color;
	lowerRightSmall.colorize = color;
	bottomSmall.colorize = color;
	lowerLeftSmall.colorize = color;
*/
}

function updateMemoPrefs() {
	var rotation = parseInt(preferences.rotationPref.value, 10);

	if (isNaN(rotation)) {
		rotation = 0;
	}
/*
	if (rotation === 360) {
		preferences.framePref.value = "0";
	}
	if (rotation === -360) {
		preferences.framePref.value = "1";
	}
*/
	if (rotation > 359)	{
		rotation = 0;
	}
	if (rotation < -359) {
		rotation = 0;
	}
	preferences.rotationPref.value = String(rotation);

	savePreferences();

	setFrameColor(preferences.frameColor.value);

	magnification = Number(preferences.memoScalePref.value) / 100;

	anchorX = Number(preferences.anchorXPref.value);
	anchorY = Number(preferences.anchorYPref.value);

	memo.bgColor = preferences.memoTextBgColor.value;
	memo.color   = preferences.memoTextColor.value;
	memo.font	 = preferences.memoFontPref.value;
        memo.size	 = preferences.memoFontSizePref.value;


	memoTitle2.bgColor = preferences.memoTextBgColor.value;
	memoTitle2.color   = preferences.memoTextColor.value;
	memoTitle2.font	 = preferences.memoFontPref.value;
        memoTitle2.size	 = preferences.memoFontSizePref.value;

	suppressUpdates();
	//reSize(enlargedFlag);
	resumeUpdates();
}

function showMemoButtons() {
	var i, showFrame, showName;

	showFrame =	 ((systemPlatform === "macintosh") && ((newRotation % 90) === 0)) ||
		((systemPlatform !== "macintosh") && (newRotation === 0));

	if (preferences.framePref.value !== "0") {
		showFrame = false;
	}

	showName  =	 (Number(preferences.rotationPref.value) === 0);

	play(creturn,false);
	maglens.src = "Resources/Pictures/MagLens.png";
	close.src = "Resources/Pictures/Close.png";
	forward.src = "Resources/Pictures/Forward.png";
	back.src = "Resources/Pictures/Back.png";
	spawn.src = "Resources/Pictures/NewSpawn.png";
        wrench.src = "Resources/Pictures/wrench.png";


}

function hideMemoButtons() {
	var i, showFrame, showName;

	showFrame =	 ((systemPlatform === "macintosh") && ((newRotation % 90) === 0)) ||
		((systemPlatform !== "macintosh") && (newRotation === 0));

	if (preferences.framePref.value !== "0") {
		showFrame = false;
	}

	showName  =	 (Number(preferences.rotationPref.value) === 0);

	play(creturn,false);
        maglens.src = "Resources/Pictures/flatbutton.png";
	sleep(200);
        close.src = "Resources/Pictures/flatbutton.png";
        forward.src = "Resources/Pictures/flatbutton.png";
	sleep(200);
        back.src = "Resources/Pictures/flatbutton.png";
        spawn.src = "Resources/Pictures/flatbutton.png";
	sleep(200);
        wrench.src = "Resources/Pictures/flatbutton.png";

}

function isWritable() {
	return true;
}

function escapeQuotes(theStr) {
	var temp, count;

	if ((theStr.indexOf("'") >= 0) || (theStr.indexOf('"') >= 0)) {
		temp = "";
		for (count = 0; count < theStr.length; count += 1) {
			if (theStr[count] === "'") {
				temp += "\\'";
			} else if (theStr[count] === '"') {
				temp += '\\"';
			} else {
				temp += theStr[count];
			}
		}
		return temp;
	}
	return theStr;
}

function writePlist() {
}

function getImageName() {
	return "";
}

// used by original ancestor widget to list spawned widgets whose kon files exist

function listSpawnedWidgets() {
	return "";
}

function esc(s) {
	var alfa = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", t = "", i;
	for (i = 0; i < s.length; i += 1) {
		if (alfa.indexOf(s[i]) >= 0) {
			t += s[i];
		} else if ((" " <= s[i]) && (s[i] < String.fromCharCode(127))) {
			t += "\\" + s[i];
		} else {
			t += s[i];
		}
	}
	return t;
}

function listActiveWidgets() {
	return "";
}

function getPID() {
	return -1;
}

function closeSpawns() {
}

function makeImageList() {
	return "";
}

function inOldRestartList() {
	return 'Is Left Alone';
}

function restartListForm() {
	return "";
}

function restartList() {
}

function escapeSingleQuotes(theStr) {
	var quote = "'", escapedQuote = "'\\''", temp, count;

	if (theStr.indexOf(quote) >= 0) {
		temp = "";
		for (count = 0; count < theStr.length; count += 1) {
			if (theStr[count] !== quote) {
				temp += theStr[count];
			} else {
				temp += escapedQuote;
			}
		}
		return temp;
	}
	return theStr;
}

function escapeSpaces(theStr) {
	var space = " ", escapedSpace = "\\ ", temp, count;

	if (theStr.indexOf(space) >= 0) {
		temp = "";
		for (count = 0; count < theStr.length; count += 1) {
			if (theStr[count] !== space) {
				temp += theStr[count];
			} else {
				temp += escapedSpace;
			}
		}
		return temp;
	}
	return theStr;
}

memo.bgColor = preferences.memoTextBgColor.value;
memo.color   = preferences.memoTextColor.value;
memo.font	 = preferences.memoFontPref.value;
memo.size	 = preferences.memoFontSizePref.value;

memoTitle2.bgColor = preferences.memoTextBgColor.value;
memoTitle2.color   = preferences.memoTextColor.value;
memoTitle2.font	 = preferences.memoFontPref.value;
memoTitle2.size	 = preferences.memoFontSizePref.value;

anchorX = Number(preferences.anchorXPref.value);
anchorY = Number(preferences.anchorYPref.value);

//anchorWindow(memo.width, memo.height);

setFrameColor(preferences.frameColor.value);
updateNow();

//memo_window.visible = true;
focusWidget();
