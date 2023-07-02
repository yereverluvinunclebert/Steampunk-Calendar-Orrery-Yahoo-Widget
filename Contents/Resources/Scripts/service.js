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

/*global eprint, systemPlatform, speechHotKey: true, getFileInfo,
		 gSoundFlag: true, memoFolderPath, gSoundFile:true, myPrint, accessMode,
		 parseLatOrLong, calculate, moonRiseSet, showButtons, main_frame, makeISODate3, 
		 makeISODate1, updateDate, updateCalendar, lprint, multiUser, main_window,
		 getMemo, openMemoWindow, selectHotKey: true, searchHotKey: true,
		 year: true, month: true, day:true, cal, hOffset, font, fontSize, fontStyle, adjustHeight,
		 status
*/

/*properties
    changeMode, checked, copy, data, dayPref, defaultValue, description, event, 
    files, getDate, getDirectoryContents, getFullYear, getLocalizedString, 
    getMonth, hOffset, index, indexOf, isDirectory, itemExists, key, lastIndexOf, 
    lastSearchString, length, match, memoFolderPref, modifier, monthPref, name, 
    onKeyDown, onKeyUp, onSelect, option, push, readFile, regExp, 
    removeDirectoryContents, replace, sort, split, substr, substring, theString, 
    title, toLowerCase, toUpperCase, type, userDocumentsFolder, vOffset, value, 
    widgetDataFolder, writeFile, yearPref
*/

var uc = false;

var selectHotKey = null;
var speechHotKey = null;
var searchHotKey = null;

var oldSelectHotKeyPref;
var oldSpeechHotKeyPref;
var oldSearchHotKeyPref;

function bf(s) {	// for localization of strings
	s = widget.getLocalizedString(s);
	return uc ? s.toUpperCase() : s;
}

function deleteSelectHotKey() {
	selectHotKey = null;
}

function makeSelectHotKey(keyDef, action) {		// for example: Shift+Control+F8
	var idx = keyDef.lastIndexOf("+"),
		modifier = keyDef.substring(0, idx),
		key = keyDef.substring(idx + 1);
		
	if (key === 'Tab') { 
		key = 'Space'; 
	}
	
	if (selectHotKey !== null) { 
		deleteSelectHotKey(); 
	}

	selectHotKey = new HotKey();
	selectHotKey.modifier = modifier;
//	eprint('makeSelectHotKey:modifier=' + selectHotKey.modifier);
	selectHotKey.key = key;
//	eprint('makeSelectHotKey:key=' + selectHotKey.key);
	//eprint('makeSelectHotKey:action=' + action);

	if (systemPlatform === "macintosh") {
		selectHotKey.onKeyUp = action;
		//eprint('makeSelectHotKey:onKeyUp=' + selectHotKey.onKeyUp);
	} else {
		selectHotKey.onKeyDown = action;
		//eprint('makeSelectHotKey:onKeyDown=' + selectHotKey.onKeyDown);
	}
	
	//eprint('*end* makeSelectHotKey *end*');
}

function deleteSpeechHotKey() {
	//delete speechHotKey;
	speechHotKey = null;
}

function makeSpeechHotKey(keyDef, action) {		// for example: Shift+Control+F8
	//eprint('***** makeSpeechHotKey *****');
	var idx = keyDef.lastIndexOf("+"),
		modifier = keyDef.substring(0, idx),
		key = keyDef.substring(idx + 1);
	
	if (key === 'Tab') { 
		key = 'Space'; 
	}

	if (speechHotKey !== null) { 
		deleteSpeechHotKey(); 
	}

	speechHotKey = new HotKey();
	speechHotKey.modifier = modifier;
//	eprint('makeSpeechHotKey:modifier=' + speechHotKey.modifier);
	speechHotKey.key = key;
//	eprint('makeSpeechHotKey:key=' + speechHotKey.key);
	//eprint('makeSpeechHotKey:action=' + action);

	if (systemPlatform === "macintosh") {
		speechHotKey.onKeyUp = action;
		//eprint('makeSpeechHotKey:onKeyUp=' + speechHotKey.onKeyUp);
	} else {
		speechHotKey.onKeyDown = action;
		//eprint('makeSpeechHotKey:onKeyDown=' + speechHotKey.onKeyDown);
	}
	//eprint('*end* makeSpeechHotKey *end*');
}

function deleteSearchHotKey() {
	//delete searchHotKey;
	searchHotKey = null;
}

function makeSearchHotKey(keyDef, action) {		// for example: Shift+Control+F8
	//eprint('***** makeSearchHotKey *****');
	var idx = keyDef.lastIndexOf("+"),
		modifier = keyDef.substring(0, idx),
		key = keyDef.substring(idx + 1);
		
	if (key === 'Tab') { 
		key = 'Space'; 
	}
	
	if (searchHotKey !== null) { 
		deleteSearchHotKey(); 
	}

	searchHotKey = new HotKey();
	searchHotKey.modifier = modifier;
//	eprint('makeSearchHotKey:modifier=' + searchHotKey.modifier);
	searchHotKey.key = key;
//	eprint('makeSearchHotKey:key=' + searchHotKey.key);
	//eprint('makeSearchHotKey:action=' + action);

	if (systemPlatform === "macintosh") {
		searchHotKey.onKeyUp = action;
		//eprint('makeSearchHotKey:onKeyUp=' + searchHotKey.onKeyUp);
	} else {
		searchHotKey.onKeyDown = action;
		//eprint('makeSearchHotKey:onKeyDown=' + searchHotKey.onKeyDown);
	}
	
	//eprint('*end* makeSearchHotKey *end*');
}

function simpleForm(formTitle, button1, name, title, type, option, defaultValue, description) {
	var result = "", formfields = [], formResults;

	formfields[0] = new FormField();
	formfields[0].name = name;
	formfields[0].title = title;
	formfields[0].type = type;
	formfields[0].option = option;
	formfields[0].defaultValue = defaultValue;
	formfields[0].description = description;

	formResults = form(formfields, formTitle, button1);

	if ((formResults !== null) && (formResults !== undefined)) {
		result = formResults[0]; 
	}
	
	delete formfields[0];
	formfields[0] = null;
	formfields = null;
	return result;
}

function xtn(s) {
	var ext, idx = s.lastIndexOf(".");
	
	if (idx >= 0) {
		ext = s.substring(idx);
		if (ext.length > 7) { 
			return ""; 
		}
		if (ext.length > 1) { 
			return ext; 
		}
	}
	return "";
}

function isItemIn(item, vector) {
	var i;
	
	for (i = 0; i < vector.length; i += 1) {
		if (vector[i] === item) { 
			return true; 
		}
	}
	return false;
}

function isText(path) {
	var result, fileData, item, stype, xtype,
		textExtns = [".txt", ".js", ".kon", ".c", ".bat", ".css", ".csv", ".dtd", ".faq",
					 ".jav", ".js", ".log", ".pl", ".sig", ".xml", ".htm", "html"];

	if (systemPlatform === "macintosh") {
		result = getFileInfo(path);
		fileData = result.substr(path.length + 2);
//		eprint('isText:Mac fileType=' + fileData);
		item = fileData.split(" ");
		stype = item[0];
		if ((stype === "ASCII") || (stype === "ISO-8859") || (stype === "UTF-8") || (stype === "C++")) { 
			return true; 
		}
	}
	xtype = xtn(path).toLowerCase();
//	eprint('isText:Win fileType=' + xtype);
	return isItemIn(xtype, textExtns);
}

function dragDropped() {
	var path, n = system.event.data.length, dropData = [], i, dropType, text;
	
	for (i = 0; i < n; i += 1) { 
		dropData[i] = system.event.data[i]; 
	}
	dropType = dropData[0];
//	eprint('.... dragDropped ...');
	text = "";
	if (dropType === "filenames") {				
		gSoundFlag = false;
		
		for (i = 1; i < n; i += 1) {
			path = dropData[i];
			path = resolvePath(path);	// in case it is an alias
			if (isText(path)) {
//				eprint("dragDropped:Text file: " + path);
				text += filesystem.readFile(path);
			} else {
				beep();
//				eprint('dragDropped: ' + path + ' is not a text file');
				alert(path + bf('notTextOrSound'));
			}
		}
	} else if (dropType === "string") {
//		eprint("dragDropped: String accepted.");
		text = dropData[1];
	} else if (dropType === "url") {
//		eprint("dragDropped: URL accepted.");
		text = dropData[1];
	} else {
		beep();
//		eprint("dragDropped: Invalid dropType: " + dropType);
	}
//	dropData = null;
	return text;
}

function logMemoFolder() {
	var theString 	 = '\n**************************************************';
	theString 	+= '\nYour memos, copies of iCal(.ics) files, and';
	theString	+= '\ncopies of custom alarm sounds are stored in folder';
	theString	+= '\n' + memoFolderPath;
	theString 	+= '\n**************************************************\n';
	myPrint(theString);
		
	filesystem.writeFile(memoFolderPath + '/ReadMe.txt', theString);
	filesystem.changeMode(memoFolderPath + '/ReadMe.txt', accessMode);
}

function backupMemos() {
	var path = chooseFolder();
	eprint('backupMemos:path=' + path);
	if (path) {
		eprint('backupMemos:copy:' + filesystem.copy(memoFolderPath, path));
	}
}

function theISOYear(isoDate) { 
	return isoDate.substring(0, isoDate.length - 4); 
}	// YYYY

function theISOMonth(isoDate) { 
	return isoDate.substring(0, isoDate.length - 2); 
}	// YYYYMM

function theISOMonthDay(isoDate) { 
	return isoDate.substring(isoDate.length - 4); 
}	// MMDD

function theISODate(d) {
	var year  = String(d.getFullYear()),	// 20yy
		month = String(d.getMonth() + 1),	// 1..12
		day   = String(d.getDate());		// 1..31

	if (month.length === 1) { month = "0" + month; }
	if (day.length === 1) { day = "0" + day; }
	
	return year + month + day;
}

function dateOf(isoDate) {
	var len   = isoDate.length,
		year  = parseInt(isoDate.substring(0, len - 4), 10),
		month = parseInt(isoDate.substring(len - 4, len - 2), 10),
		day   = parseInt(isoDate.substring(len - 2), 10);

	return new Date(year, month - 1, day);
}

function openHelp() {
	//filesystem.open('Resources/Help.pdf');
	openURL("http://g7awz.users.btopenworld.com/Beta/TKHelp.pdf");
}

function openSharedMemosHelp() {
	//filesystem.open('Resources/SharedMemos.pdf');
	openURL("http://g7awz.users.btopenworld.com/Beta/TKSharedMemos.pdf");
}

function updateMemoFolder() {
	var res, result,
		oldPath = system.widgetDataFolder,
		newPath = system.userDocumentsFolder + '/Month Calendar';
/*
	if (multiUser) { 
		return preferences.sharedDirectoryPref.value; 
	}
*/
	if (preferences.memoFolderPref.value === "1") { 
		return system.widgetDataFolder; 
	}

	if (filesystem.itemExists(newPath) && filesystem.isDirectory(newPath)) {	// The newPath directory already exists, so use it as the memo folder.
		return newPath;
	} 
	if (filesystem.itemExists(newPath)) {	// The newPath is already in use for a file.
		beep();
		alert(bf('cannotUpdateMemoFolder') + newPath + bf('alreadyExists'));
		eprint('updateMemoFolder:Cannnot update Memo Folder because ' + newPath + ' already exists.\nPlease read the manual for further instructions.');
		return oldPath;
	}
	// Copy files from the old folder to the new folder.
	beep();
	res = alert(bf('relocating'), bf('Allow'), bf('Deny'));
	if (res === 2) { return oldPath; }
		
	eprint('updateMemoFolder:oldPath=' + oldPath);
	eprint('updateMemoFolder:newPath=' + newPath);

	result = filesystem.copy(oldPath, newPath);
	eprint('updateMemoFolder:copy=' + result);
		
	if (result) {
		eprint('updateMemoFolder:remove=' + filesystem.removeDirectoryContents(oldPath));
		return newPath;
	}
	beep();
	alert(bf('uodatingFailed'));
	eprint('updateMemoFolder:Updating of Memo Folder failed.\nPlease read the manual for further instructions.');
	//closeWidget();
	return oldPath;
}

////////////////////////////////// memo search functions /////////////////////////////////

function findMemoFiles(path) {
	var files = filesystem.getDirectoryContents(path, true),  memos = [], i;

	for (i = 0; i < files.length; i += 1) {
		if (files[i].indexOf("Memo-") === 0) {
			memos.push(files[i].substring(5, 13));
		}
	}
	return memos.sort();
}

function matchString(str) {
	var f, hex = "0123456789abcdefABCDEF", i, k, n, q, s;

	f = str.match(/^\s*(".*"|'.*')\s*$/);
	if (f === null) { return null; }
	s = f[1];

	n = s.length;
	if (n < 2) { return null; }
	q = s[0];
	if ((q !== "'") && (q !== '"')) { return null; }

	for (i = 1; i < n; i += 1) {
		if (s[i] === q) {
			if (i !== n - 1) { return null; }
			return [str, s];
		}
		if (s[i] === "\\") {
			i += 1;
			if (s[i] === "x") {	// look for two hex digits
				for (k = 0; k < 2; k += 1) {
					i += 1;
					if (hex.indexOf(s[i]) < 0) { return null; }
				}
			} else if (s[i] === "u") { // look for 4 hex digits
				for (k = 0; k < 4; k += 1) {
					i += 1;
					if (hex.indexOf(s[i]) < 0) { return null; }
				}
			}
		}
	}
	return null;
}

function findMatchingMemoFiles(memos, lookFor) {
	var i, data, files = [], regExp = null, t, theString = "", result = {};
	
	t = lookFor.match(/^\s*\/(.+)\/((gim|gmi|gi|gm|g|img|igm|im|ig|i|mig|mgi|mi|mg|m)?)\s*$/);
	if (t) {	// regExp found
		try {
			regExp = new RegExp(t[1], t[2]);
			eprint('RegExp: /' + t[1] + '/' + t[2]);
		} catch (e) {
			beep();
			alert(e + ".");
		}
	} else {	// string parameter
		t = matchString(lookFor);
		if (t) {
			theString = eval(t[1]);
			eprint('String: ' + theString);
		} else {
			beep();
			alert("SyntaxError: " + lookFor + " is not a valid regular expression or string.");
		}
	}

	for (i = 0; i < memos.length; i += 1) {
		data = getMemo(memos[i]).replace(/<<\w*\=[^\;\n<\>]*?(\;\w*\=[^\;\n<\>]*?)*\>\>\n?/g, "");	// get memo and remove embeded commands
		
		if (regExp !== null) {
			t = data.match(regExp);
			if (t) {
				files.push(memos[i]);
			}
		} else if (theString !== "") {
			if (data.indexOf(theString) >= 0) {
				files.push(memos[i]);
			}
		}
	}
	
	result.files = files;
	result.regExp = regExp;
	result.theString = theString;
	return result;
}

function gotoMonth(isodate) {
	var sYear  = Number(isodate.substring(0, 4)),
		sMonth = Number(isodate.substring(4, 6)),
		sDay   = Number(isodate.substring(6, 8));

	if ((year !== sYear) || (month !== sMonth) || (day !== sDay)) {
		year  = sYear;
		month = sMonth;
		day   = sDay;
		
		if (sDay === 0) { sDay = 1; }

		preferences.yearPref.value  = String(year);
		preferences.monthPref.value = String(month);
		preferences.dayPref.value = String(day);
		
		cal(year, month, day);
//		adjustHeight();
//		showButtons(255);
	}
}

var matching = null;
var selectedMemo = "";
var selectedMemoIndex = -1;

function findItemInArray(item, array) {
	var i;
	
	for (i = 0; i < array.length; i += 1) {
		if (item === array[i]) { return i; }
	}
	return -1;
}

function selectMemoForm(memos, regExp, theString) {
	var result = "";

	result = simpleForm("Memo Selection", "Select", 'memoSelect', "Date:", 'popup', memos, '', "Select the memo to be opened");
	if (result !== "") {
		selectedMemo = result;
		selectedMemoIndex = findItemInArray(result, memos);
		openMemoWindow(result, "", regExp, theString);
		gotoMonth(result);
	}
}

function findMemo() {
	var	memos = findMemoFiles(memoFolderPath), lookFor;
	
	if (memos.length === 0) {
		beep();
		alert("There are no memos.");
		return;
	}
	
	lookFor = simpleForm("Memo Search", "Search", 'memoSearch', "Look For:", 'text', [''], preferences.lastSearchString.value, "Enter a quoted string or a JavaScript regular expression in the form /pattern/attributes .\n\nNormal escaping rules apply.");
	if (lookFor === "") {
		return;
	}
	preferences.lastSearchString.value = lookFor;

	matching = findMatchingMemoFiles(memos, lookFor);	// {files, regExp, theString};

	selectedMemo = "";
	selectedMemoIndex = -1;
	
	if (matching.files.length === 0) {
		beep();
		alert("There are no matching memos.");
	} else if (matching.files.length === 1) {
		selectedMemo = matching.files[0];
		selectedMemoIndex = 0;
		openMemoWindow(matching.files[0], "", matching.regExp, matching.theString);
		gotoMonth(matching.files[0]);
	} else {
		selectMemoForm(matching.files, matching.regExp, matching.theString);
	}
}

function memoMenuAction() {
	selectedMemo = this.title;
	selectedMemoIndex = this.index;
	openMemoWindow(this.title, "", this.regExp, this.theString);
	gotoMonth(this.title);
}

var selectedMemo = "";

function makeMemoMenu(memos, regExp, theString) {
	var menuItems = [], i;
	
	for (i = 0; i < memos.length; i += 1) {
		menuItems[i] = new MenuItem();
		menuItems[i].title = memos[i];
		menuItems[i].checked = (memos[i] === selectedMemo);
		menuItems[i].index = i;
		menuItems[i].regExp = regExp;
		menuItems[i].theString = theString;
		menuItems[i].onSelect = memoMenuAction;
	}
	return menuItems;
}

function selectMemo() {
	var memoMenu = [];
	
	if (matching === null) { return; }
	
	if (matching.files.length !== 0) {
		memoMenu = makeMemoMenu(matching.files, matching.regExp, matching.theString);
	}
    popupMenu(memoMenu, system.event.hOffset - 10, system.event.vOffset - 10);
}

function nextMemo() {
	if (selectedMemo !== "") {
		if (selectedMemoIndex < matching.files.length - 1) {
			selectedMemoIndex += 1;
			selectedMemo = matching.files[selectedMemoIndex];
			openMemoWindow(selectedMemo, "", matching.regExp, matching.theString);
			gotoMonth(selectedMemo);
		} else {
			beep();
		}
	}
}

function prevMemo() {
	if (selectedMemo !== "") {
		if (selectedMemoIndex > 0) {
			selectedMemoIndex -= 1;
			selectedMemo = matching.files[selectedMemoIndex];
			openMemoWindow(selectedMemo, "", matching.regExp, matching.theString);
			gotoMonth(selectedMemo);
		} else {
			beep();
		}
	}
}
