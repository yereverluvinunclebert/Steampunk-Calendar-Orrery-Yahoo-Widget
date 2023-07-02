/*
	Month Calendar - A Monthly Calendar with Week Numbers
	Copyright  2005-2012 Harry Whitfield

	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License as
	published by the Free Software Foundation; either version 2 of
	the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public
	License along with this program; if not, write to the Free
	Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston,
	MA  02110-1301  USA

	Month Calendar - version 4.0 for timekeeper
	7 March, 2012
	Copyright  2005-2012 Harry Whitfield
	mailto:g6auc@arrl.net
*/

/*global systemPlatform, eprint, memo_window, colorSelect, alarmSelect,
		 dragDropped, memo, gSoundFlag, memoTitle: true, speakDate, sunRiseSet, stringWidth,
		 halfWidth, status, statusShadow, updateCalendar,
		 main_window, memoFolderPath, updateMemos, bf, SPEAK, selectedMemo: true
*/

/*properties
    altKey, changeMode, data, event, focus, itemExists, join, keyString,
    length, match, readFile, rejectKeyPress, remove, replace, select, shiftKey,
    speakDatesPref, split, substring, toDateString, tooltip, value, visible,
    writeFile, lastIndexOf
*/

var gISOdate = "";
var accessMode;

var maxTooltipMemoLines = 30;

function escapePath(s) {
	return s.replace(/([\W])/g, "\\$1");
}

filesystem.changeMode = function (path, mode) {
	if (systemPlatform === "macintosh") {
		return runCommand("chmod " + mode + " " + escapePath(path)) === "";
	}
	return undefined;
};

function getMemo(isoDate) {
	//eprint('getMemo:isoDate=' + isoDate);

	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";

	//eprint('getMemo:path=' + path);

	if (filesystem.itemExists(path)) {
		//eprint('getMemo: Memo for ' + isoDate + ' exists.');
		return filesystem.readFile(path).replace(/\r\n?/g, "\n");
	}
	//eprint('getMemo: No memo for ' + isoDate + '.');
	//return "Type your memo here ...";
	return "";
}

function openMemoWindow(isoDate, appendData, regExp, theString) {
	var len, year, month, day, d, sWidth, bWidth, data, UTCdate,
		start = -1, finish = -1, t, textToSelect = null;

	eprint('openMemoWindow:isoDate=' + isoDate);

	if (selectedMemo !== isoDate) { selectedMemo = ""; }

	gISOdate = isoDate;

	if (isoDate === "19700101") {
		memoTitle = bf("memeToDoTitle");
		memo.tooltip = "";
		if (preferences.speakDatesPref.value === "1") {
			SPEAK(bf("SPopenTodoSpeak"));
		}
	} else {
		len   = isoDate.length;
		year  = parseInt(isoDate.substring(0, len - 4), 10);
		month = parseInt(isoDate.substring(len - 4, len - 2), 10);
		day   = parseInt(isoDate.substring(len - 2), 10);

		if (preferences.speakDatesPref.value === "1") {
			speakDate(year, month, day);
		}

		d = new Date(year, month - 1, day);
		memoTitle = d.toDateString();
		d = new Date(year, month - 1, day+1);
		memoTitle2.data = d.toUTCString();

		//memo.tooltip = sunRiseSet(isoDate);
	}

	sWidth = stringWidth(memoTitle, "Times", "", 9);
//	bWidth = 2 * halfWidth - 142;
	bWidth = 90;
    if (sWidth <= bWidth) {
		status.data = statusShadow.data = memoTitle;
	} else {
		status.data = statusShadow.data = "";
	}

	data = getMemo(isoDate) + appendData;
	if (regExp || theString) {
		if (regExp) {
			t = data.match(regExp);
			if (t) {
				textToSelect = t[0];
			}
		} else {
			textToSelect = theString;
		}
		if (textToSelect) {
			start = data.lastIndexOf(textToSelect);
			if (start >= 0) {
				finish = start + textToSelect.length;
			}
		}
	}
	memo.data = data;	
        memo_window.visible = true;
	memo_window.focus();
//	memo_window.level="top";
//	memo_window.zOrder=35;
	memo.focus();
	memo.select(start, finish);
}

function onClicked(isoDate) {
	eprint('onClicked:isoDate=' + isoDate);
	openMemoWindow(isoDate, "");
}

                                         
function onDragDropped(isoDate) {
	var data = dragDropped();
	if (data !== "") {
		openMemoWindow(isoDate, "");
		memo.data += data;
	}

	if (gSoundFlag && (!memo_window.visible)) {
		alarmSelect(isoDate);
		focusWidget();
	}
}

function saveMemo(isoDate, data) {
	eprint('saveMemo:isoDate=' + isoDate);

	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";

	eprint('saveMemo:path=' + path);

	if (data !== "") {	// && (data !== "Type your memo here ..."))
		eprint('saveMemo: Writing memo for ' + isoDate + '.');
		filesystem.writeFile(path, data.replace(/\r\n?|\n/g, "\r\n"));
	} else if (filesystem.itemExists(path)) {
		eprint('saveMemo: Deleting memo for ' + isoDate + '.');
		filesystem.remove(path);
	}
}

function saveMemoWindow() {
	saveMemo(gISOdate, memo.data);
	//memo_window.visible = false;
//	updateCalendar();			// was updateDate(false);
	updateMemos();
	main_window.focus();
	focusWidget();
}

function closeMemoWindow() {
	memo_window.visible = false;
	main_window.focus();
	focusWidget();
}

function makeISODate3(year, month, day) {
	var sYear  = String(year),
		sMonth = String(month),
		sDay   = String(day);

	while (sYear.length < 4) {
		sYear  = "0" + sYear;
	}
	if (sMonth.length  === 1) {
		sMonth = "0" + sMonth;
	}
	if (sDay.length === 1) {
		sDay   = "0" + sDay;
	}
	return sYear + sMonth + sDay;
}

function hasMemo(isoDate) {
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	return filesystem.itemExists(path);
}

function getMemoLines(isoDate, count, maxLines) {	// return count non-blank lines from first maxLines excluding commands
	var data, lines, n, theLines, i,
		path = memoFolderPath + "/Memo-" + isoDate + ".txt";

	if (count === 0) {
		return "";
	}

	if (filesystem.itemExists(path)) {
		data = filesystem.readFile(path).replace(/\r\n?/g, "\n");
		lines = data.split('\n', maxLines).join('\n').replace(/<<\w*\=[^\;\n<\>]*?(\;\w*\=[^\;\n<\>]*?)*\>\>\n?/g, "").split('\n');
		n = 0;
		theLines = [];
		for (i = 0; i < lines.length; i += 1) {
			if (lines[i] !== "") {
				theLines[n] = lines[i];
				n += 1;
			}
			if (n === count) {
				return theLines.join('\n');
			}
		}
		if (theLines.length > 0) {
			return theLines.join('\n');
		}
	}
	return "";
}

function memoKeyPress() {
	//print("memoKeyPress");
	
  	var keyString = system.event.keyString;
   	if ((keyString === "Return") || (keyString === "Enter")) {	// Enter occurs only on Macintosh
                if (preferences.typewriterSoundPref.value == "enable") { play(creturn,false)};
                if (system.event.altKey || system.event.shiftKey || (keyString === "Enter")) {
			memo.rejectKeyPress();
			if (system.event.shiftKey) {
				closeMemoWindow();
			} else {
				saveMemoWindow();
			}
		}
	} else {
                if (preferences.typewriterSoundPref.value == "enable") { play(keypress,false)};
        }

}
