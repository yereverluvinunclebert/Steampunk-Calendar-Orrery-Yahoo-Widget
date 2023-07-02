/*
	Save and Restore Preferences
	11 March, 2012
	Copyright 2005-2012 Harry Whitfield
	mailto:g6auc@arrl.net
*/

/*global eprint */

/*properties
    hasOwnProperty, itemExists, length, match, push, readFile, replace, 
    toLowerCase, value, writeFile
*/

var prefDef = [];

function getPropertyNames(object) {
    var names = [], elementType, element;
    
    for (element in object) {
    	if (object.hasOwnProperty(element)) {
 			elementType = String(typeof object[element]).toLowerCase();
        	if (elementType !== "function") {
        		names.push(element);
        	}
        }
    }
    return names;
}

function savePlist(folderPath, widgetName) {
	var path, data, i;

	if (!filesystem.itemExists(folderPath)) {
		return false;
	}
	path = folderPath + '/' + widgetName + '.plist';
	eprint('Saving preferences to: ' + path);
	
	data = "";
	data += '<?xml version="1.0" encoding="UTF-8"?>\n';
	data += '<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n';
	data += '<plist version="1.0">\n';
	data += '<dict>\n';
		
	for (i = 0; i < prefDef.length; i += 1) {
		data += '\t<key>Pref-' + prefDef[i] + '</key>\n';
		data += '\t<string>' + preferences[prefDef[i]].value + '</string>\n';
	}
		
	data += '</dict>\n';
	data += '</plist>\n';

	filesystem.writeFile(path, data);
	return true;
}

function restorePlist(folderPath, widgetName) {
	function escapeString(Str) {
		return Str.replace(/([\W])/g, '\\$1');
	}

	var start, finish, lookFor, pattern, result, data, i,
		path = folderPath + '/' + widgetName + '.plist';
		
	if (!filesystem.itemExists(path)) {
		return false;
	}
	eprint('Restoring preferences from: ' + path);
	data = filesystem.readFile(path);

	//	<key>Pref-cityName</key>
	//	<string>Rishworth, England</string>
	
	for (i = 0; i < prefDef.length; i += 1) {
		start  = escapeString('<key>Pref-' + prefDef[i] + '</key>') + '\\s*?' + escapeString('<string>');
		finish = escapeString('</string>');
		lookFor = start + '([.\\s\\S]*?)' + finish;
		pattern = new RegExp(lookFor);
		result = data.match(pattern);
		if (result !== null) {
			preferences[prefDef[i]].value = result[1];
		} else {
			eprint(prefDef[i] + ': Nothing found');
		}
	}
	return true;
}

prefDef = getPropertyNames(preferences);

