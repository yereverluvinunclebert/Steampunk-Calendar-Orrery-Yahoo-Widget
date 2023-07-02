/*
	Log To File - A Log To File Module for Yahoo!Widgets
	Copyright © 2005-2012 Harry Whitfield

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
	
	Log To File - version 5.0
	13 March, 2012
	Copyright © 2005-2012 Harry Whitfield
	mailto:g6auc@arrl.net
*/

/*
	<preferenceGroup>
		<name>errors</name>
		<title>Errors</title>
		<icon>Resources/Images/errors.png</icon>
		<order>15</order>
    </preferenceGroup>

	<preference name = "logFlagPref">
		<title>Log Error Messages to File</title>
		<group>errors</group>
		<type>checkbox</type>
		<defaultValue>0</defaultValue>
		<hidden>false</hidden>
		<description>Check this box if you wish errors messages to be written to file.</description>
	</preference>

	<preference name = "lFlagPref">
		<title>lFlag</title>
		<type>checkbox</type>
		<defaultValue>1</defaultValue>
		<description>Log important progress and error messages.</description>
		<group>errors</group>
	</preference>

	<preference name = "eFlagPref">
		<title>eFlag</title>
		<type>checkbox</type>
		<defaultValue>1</defaultValue>
		<description>Log other progress and error messages.</description>
		<group>errors</group>
	</preference>

	<preference name = "sFlagPref">
		<title>sFlag</title>
		<type>checkbox</type>
		<defaultValue>1</defaultValue>
		<description>Log scripts.</description>
		<group>errors</group>
	</preference>

	<preference name = "logFilePref">
		<title>Log File</title>
		<group>errors</group>
		<type>selector</type>
		<style>save</style>
		<defaultValue></defaultValue>
		<hidden>false</hidden>
		<description>Choose the location and name of the log file.</description>
	</preference>
*/

/*properties
    eFlagPref, getDate, getFullYear, getMilliseconds, getMonth, lFlagPref,
    length, logFilePref, logFlagPref, remove, sFlagPref, toLocaleTimeString,
    toString, userDocumentsFolder, value, writeFile
*/

// The following flags control printing in the debug console window

//var lFlag = true;   // log important progress and error messages
//var eFlag = true;   // log other progress and error messages
//var sFlag = true;   // log scripts

var lFlag = (preferences.lFlagPref.value === "1");
var eFlag = (preferences.eFlagPref.value === "1");
var sFlag = (preferences.sFlagPref.value === "1");

var logFilePref = preferences.logFilePref.value;	// path to log file
var logFlagPref = preferences.logFlagPref.value;	// flag to control printing to file

function myPrint(theStr) {
	print(theStr);
	if ((logFlagPref !== "0") && (logFilePref !== "")) { 
		filesystem.writeFile(logFilePref, theStr + '\n', true); 
	}
}

function myLog(theStr) {
	// 2004-09-20 17:36:28.004: theStr
	var d = new Date(), date, ms,
		year  = d.getFullYear().toString(),
		month = (d.getMonth() + 1).toString();
		
	if (month.length === 1) { 
		month = '0' + month; 
	}
	
	date  = d.getDate().toString();			
	if (date.length  === 1) { 
		date  = '0' + date; 
	}
	
	ms    = d.getMilliseconds().toString();	
	if (ms.length  === 2) { 
		ms  = '0' + ms; 
	} else if (ms.length  === 1) { 
		ms  = '00' + ms; 
	}
	
	myPrint(year + '-' + month + '-' + date + ' ' + d.toLocaleTimeString() + '.' + ms + ': ' + theStr);
}

function eprint(theString) { 
	if (eFlag) { 
		myPrint(theString); 
	} 
}
function sprint(theString) { 
	if (sFlag) { 
		myPrint(theString); 
	} 
}
function lprint(theString) { 
	if (lFlag) { 
		myLog(theString);   
	} 
}

if (logFilePref === "") { 
	preferences.logFilePref.value = system.userDocumentsFolder + "/timekeeper.log"; 
}

logFilePref = preferences.logFilePref.value;

if (logFlagPref !== "0") { 
	filesystem.remove(logFilePref); 
}	// remove old log file
