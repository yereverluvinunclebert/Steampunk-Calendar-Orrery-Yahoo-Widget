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

/*properties
    createDirectory, getDirectoryContents, isDirectory, length, makeDirectory, 
    remove, removeDirectoryContents, replace, split, unixRM
*/

/*
function doCommand(command) {
	lprint('command: ' + command);
	var result = runCommand(command);
	lprint('result:  ' + result);
	return result;
}
*/
function addModes(mode1, mode2) {	// modes are 4 digit octal
	var result = "", i;

	mode1 = mode1.split("");
	mode2 = mode2.split("");
	for (i = 0; i < 4; i += 1) {
		result += String(Number(mode1[i]) | Number(mode2[i]));
	}
	return result;
}

function escapePath(path) { 
	return path.replace(/([\W])/g, '\\$1');
}

// calls used only on the Macintosh - never have been in Unix Utils
function getFileInfo(path) {
	return runCommand('file ' + escapePath(path)); 
}

filesystem.makeDirectory = function (path) { 
	return filesystem.createDirectory(path); 
};

filesystem.unixRM = function (path) { 
	return filesystem.remove(path);
};

// calls to compensate for loss of Unix Utils on Windows

filesystem.removeDirectoryContents = function (path) { // Widget Tester and Month Calendar only
	var result = true, files, i;

	if (!filesystem.isDirectory(path)) { 
		return false;
	}
	files  =  filesystem.getDirectoryContents(path, false);
	for (i = 0; i < files.length; i += 1) { 
		result = result && filesystem.remove(path + '/' + files[i]); 
	}
	return result;
};

/*
filesystem.openFileInApplication = function (application, file, params) {
	var command, result;

	function quotePath(path) {
		return "\"" + convertPathToPlatform(path).replace(/\"/g, "\\\"") + "\"";
	}

	function escapePath(path) {
		return path.replace(/([\W])/g, '\\$1');
	}

	eprint('application: ' + application);
	if (file) {
		eprint('file:        ' + file);
	}
	if (params) {
		eprint('params:      ' + params);
	}

	if (systemPlatform === "macintosh") {
		command = 'open -a ' + escapePath(application) + ' ' + escapePath(file);
		eprint('openFileInApplication:command: ' + command);
		result  = runCommand(command);
		eprint('openFileInApplication:result:  ' + result);
	} else {
		if (params) {
			params = ' ' + params;
		} else {
			params = "";
		}
		if (file) {
			file   = ' ' + quotePath(file);
		} else {
			file   = "";
		}
		command = quotePath(application) + params + file;
		eprint('openFileInApplication:bgCommand: ' + command);
		runCommandInBg(command, "bgResult");
	}
};

function theURL(url, outputFile, referer) {
	var myUrl = new URL(), result, resp, OK;
	
	if (outputFile !== "") { 
		myUrl.outputFile = outputFile;
	}
	if (referer    !== "") { 
		myUrl.setRequestHeader("Referer", referer); 
	}
	result = myUrl.fetch(url);
	resp = myUrl.response;
	lprint('theURL:resp=' + resp);
	if (outputFile !== "") { 
		lprint('theURL:result=' + result); 
	}
	OK = ((resp === 200) || (resp === 0));	// resp === 0 for local files
	if (outputFile !== "") {
		if (OK) { 
			return ""; 
		}
		return 'Cannot fetch "' + url + '". HTTP Error code ' + resp + '.'; 
	}
	if (OK) { return result; }
	return "";
}

function makeTooltip(obj) {
	var txt       = new Text();
	
	txt.wrap      = true;
	txt.hOffset   = obj.hOffset;
	txt.vOffset   = obj.vOffset + (obj.height >> 2) + 4;
	txt.color     = "#000000";
	txt.bgColor   = "#F6F7C1";
	txt.opacity   = 255;
	txt.bgOpacity = 255;
	txt.data      = obj.myTooltip;
	txt.font      = "Lucida Grande";
	txt.size      = 11;
	txt.zOrder    = 100;
	return txt;
}

var tooltip = null;

function removeTooltip() {
	tooltipTimer.ticking = false;
	if (tooltip !== null) {
		main_frame.removeChild(tooltip);
		tooltip = null;
		main_window.width  = main_frame.width  = mainFrameWidth;
		main_window.height  = main_frame.height  = mainFrameHeight;
	}
}

function displayTooltip(i, j) {
	removeTooltip();
	var obj;
	if (i < 0) { 
		obj = Head;
	} else { 
		obj = T[i][j]; 
	}
	if (obj.myTooltip !== "") {
		tooltip = makeTooltip(obj);
		main_window.width  = main_frame.width = mainFrameWidth  + tooltip.width;
		main_window.height  = main_frame.height = mainFrameHeight  + tooltip.height;
		main_frame.appendChild(tooltip);
		tooltipTimer.ticking = true;
	}
}
*/
