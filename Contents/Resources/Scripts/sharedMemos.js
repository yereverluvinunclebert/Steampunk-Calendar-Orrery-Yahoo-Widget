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

/*global systemPlatform, memoFolderPath, eprint, memo, memo_info,
		 updateCalendar, updateMemos, main_window, memoTitle: true, speakDate,
		 sunRiseSet, stringWidth, halfWidth, status, statusShadow,
		 colorSelect, alarmSelect, dragDropped, gSoundFlag, bf, SPEAK, selectedMemo: true
*/

/*properties
    altKey, changeMode, data, event, focus, itemExists, join, keyString,
    length, lockFile, match, readFile, rejectKeyPress, remove, replace, select,
    shiftKey, speakDatesPref, split, substring, toDateString, tooltip,
    unlockFile, value, visible, writeFile, lastIndexOf
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

filesystem.lockFile	  = function (path) {
	return filesystem.remove(path + '.fre');
};
filesystem.unlockFile = function (path) {
	filesystem.writeFile(path + '.fre', 'unlocked');
	filesystem.changeMode(path + '.fre', accessMode);
};

function makeMemoLock(accessMode) {
	if (!filesystem.itemExists(memoFolderPath + '/Memo-Lock')) {
		eprint('makeMemoLock:writeFile1=' + filesystem.writeFile(memoFolderPath + '/Memo-Lock', 'Memo-Lock File - do not delete'));
		eprint('makeMemoLock:chmod1='	  + filesystem.changeMode(memoFolderPath + '/Memo-Lock', "0644"));
		eprint('makeMemoLock:writeFile2=' + filesystem.writeFile(memoFolderPath + '/Memo-Lock.fre', 'unlocked'));
		eprint('makeMemoLock:chmod2='	  + filesystem.changeMode(memoFolderPath + '/Memo-Lock.fre', accessMode));
	}
}

function createMemo(isoDate) {
	var path,
		memoLockPath = memoFolderPath + "/Memo-Lock";	// Global lock file Memo-Lock.fre

	if (filesystem.lockFile(memoLockPath)) {
		path = memoFolderPath + "/Memo-" + isoDate + ".txt";
		if (filesystem.lockFile(path)) {
			filesystem.unlockFile(memoLockPath);
			return true;
		}
		if (filesystem.itemExists(path)) {
			filesystem.unlockFile(memoLockPath);
			return false;
		}
		filesystem.writeFile(path, "");
		filesystem.changeMode(path, accessMode);
		filesystem.unlockFile(memoLockPath);
		return true;
	}
	return false;
}

function lockMemo(isoDate) {	// try to acquire lock
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	if (filesystem.lockFile(path)) {
		return true;
	}
	if (filesystem.itemExists(path)) {
		return false;
	}
	return createMemo(isoDate);
}

function deleteMemo(isoDate) {	// must already have the lock
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	filesystem.remove(path);
}

function releaseMemo(isoDate) {	// must already have the lock
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	filesystem.unlockFile(path);
}

function getMemo(isoDate) {
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	if (filesystem.itemExists(path)) {
		return filesystem.readFile(path).replace(/\r\n?/g, "\n");
	}
	return "";
}

function saveMemo(isoDate, data) {
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	if (data !== "") {
		eprint('saveMemo: Writing memo for ' + isoDate + '.');
		filesystem.writeFile(path, data.replace(/\r\n?|\n/g, "\r\n"));
		filesystem.changeMode(path, accessMode);
		releaseMemo(isoDate);
	} else if (filesystem.itemExists(path)) {
		eprint('saveMemo: Deleting empty memo for ' + isoDate + '.');
		deleteMemo(isoDate);
	}
}

function closeMemo(isoDate) {
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt",
		data = filesystem.readFile(path);

	if (data !== "") {
		eprint('closeMemo: Releasing memo for ' + isoDate + '.');
		releaseMemo(isoDate);
	} else {
		eprint('closeMemo: Deleting empty memo for ' + isoDate + '.');
		deleteMemo(isoDate);
	}
}

function saveMemoWindow() {
	saveMemo(gISOdate, memo.data);
	gISOdate = "";
	memo_info.visible = false;
	updateCalendar();
	updateMemos();
	main_window.focus();
	focusWidget();
}

function closeMemoWindow() {
	closeMemo(gISOdate);
	gISOdate = "";
	memo_info.visible = false;
	main_window.focus();
	focusWidget();
}

function openMemoWindow(isoDate, appendData, regExp, theString) {
	var len, year, month, day, d, sWidth, bWidth, data,
		start = -1, finish = -1, t, textToSelect = null;

	eprint('openMemoWindow:isoDate=' + isoDate);
	if (gISOdate !== "") {
		closeMemoWindow();
	}
	if (!lockMemo(isoDate)) {
		beep();
		alert(bf("cannotOpenMemo") + isoDate + bf("pleaseTryAgain"));
		return;
	}

	if (selectedMemo !== isoDate) { selectedMemo = ""; }

	gISOdate = isoDate;

	if (isoDate === "19700101") {
		memoTitle = bf("memeToDoTitle");
		memo.tooltip = "";
		if (preferences.speakDatesPref.value === "1") {
			SPEAK(bf("SPopenTodoSpeak"));
		}
	} else {
		len	  = isoDate.length;
		year  = parseInt(isoDate.substring(0, len - 4), 10);
		month = parseInt(isoDate.substring(len - 4, len - 2), 10);
		day	  = parseInt(isoDate.substring(len - 2), 10);

		if (preferences.speakDatesPref.value === "1") {
			speakDate(year, month, day);
		}

		d = new Date(year, month - 1, day);
		memoTitle = bf("memo") + d.toDateString();
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
	memo.data = "test " + data;
	memo_info.visible = true;
	memo_info.focus();
	memo.focus();
	memo.select(start, finish);
}

function onMultiClicked(isoDate) {
	eprint('onMultiClicked:isoDate=' + isoDate);
	if ((system.event.altKey) || (system.event.shiftKey)) {
		if (memo_info.visible) {
			beep();
			alert(bf("pleaseCloseMemo"));
			return;
		}
		if (!lockMemo(isoDate)) {
			beep();
			alert(bf("cannotAccessMemo") + isoDate + bf("pleaseTryAgain"));
			return;
		}
		if (system.event.altKey) {
			colorSelect(isoDate);
		} else {
			alarmSelect(isoDate);
		}
		releaseMemo(isoDate);
		return;
	}
	openMemoWindow(isoDate, "");
}

function onDragDropped(isoDate) {
	var data = dragDropped();
	if (data !== "") {
		openMemoWindow(isoDate, data);
	}

	if (gSoundFlag && (!memo_info.visible)) {
		if (!lockMemo(isoDate)) {
			beep();
			alert(bf("cannotAccessMemo") + isoDate + bf("pleaseTryAgain"));
			return;
		}
		alarmSelect(isoDate);
		releaseMemo(isoDate);
		focusWidget();
	}
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
	if (sDay.length	   === 1) {
		sDay	  = "0" + sDay;
	}
	return sYear + sMonth + sDay;
}

function hasMemo(isoDate) {
	var path = memoFolderPath + "/Memo-" + isoDate + ".txt";
	return filesystem.itemExists(path);
}

function getMemoLines(isoDate, count) {	// return count non-blank lines from first maxTooltipMemoLines (30) excluding commands
	var data, lines, n, theLines, i,
		path = memoFolderPath + "/Memo-" + isoDate + ".txt";

	if (count === 0) {
		return "";
	}

	if (filesystem.itemExists(path)) {
		data = filesystem.readFile(path).replace(/\r\n?/g, "\n");
		lines = data.split('\n', maxTooltipMemoLines).join('\n').replace(/<<\w*\=[^\;\n<\>]*?(\;\w*\=[^\;\n<\>]*?)*\>\>\n?/g, "").split('\n');
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
		return "";
	}
	return "";
}

function memoKeyPress() {
	var keyString = system.event.keyString;
	if ((keyString === "Return") || (keyString === "Enter")) { // Enter occurs only on Macintosh
		if (system.event.altKey || system.event.shiftKey || (keyString === "Enter")) {
			memo.rejectKeyPress();
			if (system.event.shiftKey) {
				closeMemoWindow();
			} else {
				saveMemoWindow();
			}
		}
	}
}
