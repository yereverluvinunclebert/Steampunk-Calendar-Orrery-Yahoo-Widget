/*
	parseLatOrLong - Parse Latitude and Longitude Data
	Copyright © 2009-2012 Harry Whitfield

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
	
	parseLatOrLong - version 1.0.1 with eprints
	14 March 2012
	Copyright © 2009-2012 Harry Whitfield
	mailto:g6auc@arrl.net
*/

/*global eprint */

/*properties
    charCodeAt, indexOf, length, match, replace
*/

function parseLatOrLong(data, doLatitude, strict, separators) {
	// data:		string to  be parsed
	// doLatitude:  true for latitude, false for longitude
	// strict:		true for stricter parsing; can be omitted, if separators omitted
	// separators:	string of characters to be used as separators, can be omitted
	// returns a Number or NaN.
	
	//	If strict is true, degrees longitude must have exactly three digits
	//	and all other quantities must have exactly two digits.
	
	//	The rightmost quantity may have a decimal point and fractional part.
	
	//	By default, separators are space, tab and colon.
	//	If there is a second separator, it must match the first separator.
	
	//	Optionally, there may be a space or tab before the hemisphere character.
	
	//	Examples of valid forms:
	//	latitude: 	89.1234N   23 47.12N    23:47:55 S   23 47 55.12S
	//	longitude:	179.999E   23:47.12 E   23 47 55W    23:47:55.12 W

	var maxDegrees, hemispheres, negative, pattern, lookFor, found, 
		degrees, minutes, seconds, fraction, hemisphere, res, valid, i;

	function get(quantity) {
		return fraction ? Number(quantity + fraction) : Number(quantity);
	}

	eprint("\n----- parseLatOrLong called -----");
	eprint("parseLatOrLong(" + "'" + data + "', " + String(doLatitude) + ", " + String(strict) + ", '" + separators + "')");

	data = data.replace(/\u00A0/g, " ");	// map non-breaking space to space

	separators = separators || " \t:";		// space, tab or colon if not specified
	
	valid = separators + "0123456789.NSEW";
	eprint("parseLatOrLong: valid chars are: '" + valid.replace(/\t/g, "\\t") + "'");
	
	for (i = 0; i < data.length; i += 1) {
		if (valid.indexOf(data[i]) < 0) {
			eprint("parseLatOrLong: invalid char '" + data[i].replace(/\t/g, "\\t") + "' in data");
			eprint("parseLatOrLong: invalid char has code " + data.charCodeAt(i));
		}
	}
	
	if (doLatitude) {
		pattern = strict ? "^(\\d{2})" : "^(\\d{1,2})";
		maxDegrees = 90;
		hemispheres = "N|S";
		negative = "S";
	} else {
		pattern = strict ? "^(\\d{3})" : "^(\\d{1,3})";
		maxDegrees = 180;
		hemispheres = "E|W";
		negative = "W";
	}
	
	if (strict) {
		pattern += "(([" + separators + "])(\\d{2})((\\3)(\\d{2}))?)?(\\.\\d+)?[ \t]?(" + hemispheres + ")$";
	} else {
		pattern += "(([" + separators + "])(\\d{1,2})((\\3)(\\d{1,2}))?)?(\\.\\d+)?[ \t]?(" + hemispheres + ")$";
	}
	
	lookFor = new RegExp(pattern);

	found = data.match(lookFor);
	if (found === null) {
		eprint("parseLatOrLong: found === null");
		eprint("----- parseLatOrLong returns NaN -----\n");
		return NaN;
	}

	degrees    = found[1];		// first  separator = found[3]
	minutes    = found[4];		// second separator = found[6]
	seconds    = found[7];
	fraction   = found[8];	
	hemisphere = found[9];
	
	if (minutes === undefined) {			// degrees only
		eprint("parseLatOrLong: minutes === undefined");
		res = get(degrees);
	} else if (seconds === undefined) {		// degrees and minutes only
		eprint("parseLatOrLong: seconds === undefined");
		res = get(minutes);
		if (res > 60) {						// invalid minutes
			eprint("parseLatOrLong: minutes > 60");
			eprint("----- parseLatOrLong returns NaN -----\n");
			return NaN;
		}
		res = Number(degrees) + res / 60;
	} else {								// degrees, minutes and seconds
		res = get(seconds);
		if (res > 60) {						// invalid seconds
			eprint("parseLatOrLong: seconds > 60");
			eprint("----- parseLatOrLong returns NaN -----\n");
			return NaN;
		}
		res = Number(minutes) + res / 60;
		if (res > 60) {						// invalid minutes
			eprint("parseLatOrLong: minutes > 60");
			eprint("----- parseLatOrLong returns NaN -----\n");
			return NaN;
		}
		res = Number(degrees) + res / 60;
	}
	if (res > maxDegrees) {					// invalid degrees
		eprint("parseLatOrLong: invalid degrees: " + res + " >  " + maxDegrees);
		eprint("----- parseLatOrLong returns NaN -----\n");
		return NaN;
	}
	
	if (hemisphere === negative) {
		res = -res;
	}
	
	eprint("parseLatOrLong: returns: " + String(res));
	eprint("----- parseLatOrLong returns valid result -----\n");
	return res;
}
