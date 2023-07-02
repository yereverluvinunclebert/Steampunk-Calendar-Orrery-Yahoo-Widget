/*
	Calculate Sunrise and Sunset
	Copyright © 2006-2011 Harry Whitfield

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
	51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
	
	Calculate Sunrise and Sunset - version 2.0
	21 February, 2011
	Copyright © 2006-2011 Harry Whitfield
	mailto:g6auc@arrl.net
*/

/*
See: http://williams.best.vwh.net/sunrise_sunset_algorithm.htm

This program is a translation into javascript of an algorithm
published by the US Nautical Almanac Office.

Source:
	Almanac for Computers, 1990
	published by Nautical Almanac Office
	United States Naval Observatory
	Washington, DC 20392

Inputs:
	rising:				   true for sunrise, false for sunset
	year, month, day:      date of sunrise/sunset
	latitude, longitude:   location for sunrise/sunset
	zenith:                Sun's zenith for sunrise/sunset
	  offical      = 90 degrees 50'
	  			   = 90.8333 degrees
	  civil        = 96 degrees
	  nautical     = 102 degrees
	  astronomical = 108 degrees
	
	NOTE: longitude (degrees) is positive for East and negative for West
		  localOffset (hours) is positive for East and negative for West
	
	calculate(rising, year, month, day, latitude, longitude, zenith, localOffset)
*/

/*members PI, acos, asin, atan, cos, floor, length, sin, tan
*/

function hoursToString(time, h12) {	// convert time (in hours) to HH:MM:SS format
	var hours = Math.floor(time),
		temp  = 60 * (time - hours),
		mins  = Math.floor(temp),
		secs  = Math.floor(60 * (temp - mins)),
		ampm = '';
	
	if (h12) {	// convert to 12 hour clock
		ampm = 'AM';
		if (hours >  11) { hours -= 12; ampm = 'PM'; }
		if (hours === 0) { hours = 12; }
	}
	
	hours = String(hours);
	if (hours.length === 1) { hours = "0" + hours; }
	mins  = String(mins);
	if (mins.length  === 1) { mins  = "0" + mins; }
	secs  = String(secs);
	if (secs.length  === 1) { secs  = "0" + secs; }
	return hours + ':' + mins + ':' + secs + ampm;
}

function dayOfYear(year, month, day) { // month 1..12 - alternative function
    var startDayOfMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    	leap = 0;

	function isLeapYear(year) {
		if ((year %   4) !== 0) { return false; }
		if ((year % 400) === 0) { return true; }
		if ((year % 100) === 0) { return false; }
		return true;
	}

    if (month > 2) { leap = Number(isLeapYear(year)); }
    return startDayOfMonth[month - 1] + day + leap;
}
/*
function XdayOfYear(year, month, day) { // month 1..12 - original (obscure) function
	var N1 = Math.floor(275 * month / 9),
		N2 = Math.floor((month + 9) / 12),
		N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
	return N1 - (N2 * N3) + day - 30;
}
*/
function calculate(rising, year, month, day, latitude, longitude, zenith, localOffset, h12) {
	var n, lngHour, t, m, l, ra, lQuadrant, raQuadrant, sinDec, cosDec, cosH, h, ut, lt;
	
	function rad(deg) { return deg * Math.PI / 180; }
	function deg(rad) { return rad * 180 / Math.PI; }

	n = dayOfYear(year, month, day);		// first calculate the day of the year

	lngHour = longitude / 15;				// convert the longitude to hour value

	if (rising) { t = n + ((6 - lngHour) / 24); } else { t = n + ((18 - lngHour) / 24); }	// calculate an approximate time

	m = (0.9856 * t) - 3.289;				// calculate the Sun's mean anomaly

	l = m + (1.916 * Math.sin(rad(m))) + (0.020 * Math.sin(2 * rad(m))) + 282.634;		// calculate the Sun's true longitude
											//	NOTE: l potentially needs to be adjusted into the range [0,360) by adding/subtracting 360
	if (l < 0) { l += 360; }
	if (l >= 360) { l -= 360; }

	ra = deg(Math.atan(0.91764 * Math.tan(rad(l))));	// calculate the Sun's right ascension
											//	NOTE: ra potentially needs to be adjusted into the range [0,360) by adding/subtracting 360
	if (ra <    0) { ra += 360; }
	if (ra >= 360) { ra -= 360; }

	lQuadrant  = (Math.floor(l / 90)) * 90;	// right ascension value needs to be in the same quadrant as l
	raQuadrant = (Math.floor(ra / 90)) * 90;
	ra = ra + lQuadrant - raQuadrant;

	ra = ra / 15;							// right ascension value needs to be converted into hours

	sinDec = 0.39782 * Math.sin(rad(l));	// calculate the Sun's declination
	cosDec = Math.cos(Math.asin(sinDec));

	cosH = (Math.cos(rad(zenith)) - (sinDec * Math.sin(rad(latitude)))) / (cosDec * Math.cos(rad(latitude)));	// calculate the Sun's local hour angle
	
	if (cosH >  1) { return "No sunrise"; }
	if (cosH < -1) { return "No sunset "; }
											// finish calculating h and convert into hours
	if (rising) { h = 360 - deg(Math.acos(cosH)); } else { h = deg(Math.acos(cosH)); }
	h = h / 15;

	t = h + ra - (0.06571 * t) - 6.622;		// calculate local mean time of rising/setting

	ut = t - lngHour;						// adjust back to UTC
											//	NOTE: ut potentially needs to be adjusted into the range [0,24) by adding/subtracting 24
	if (ut <   0) { ut += 24; }
	if (ut >= 24) { ut -= 24; }

	//var tzOffset = new Date().getTimezoneOffset();
	//print('tzOffset=' + tzOffset);
	//var localOffset = 0 - (tzOffset / 60);
	//print('localOffset=' + localOffset);
	
	lt = ut + localOffset;					// convert ut value to local time zone of latitude/longitude
	if (lt <   0) { lt += 24; }
	if (lt >= 24) { lt -= 24; }

	return hoursToString(lt, h12);
}

//var ex1 = calculate(false, 2006, 2, 7, 22.53,   88.37, 90.83, 5.5);	//	["Calcutta, West Bengal", "330", "22.53", "N", "88.37", "E", ""];

//var ex2 = calculate(true,  2006, 2, 7, 39.74, -104.98, 90.83,  -7);	//	["Denver, Colorado", "-420", "39.74", "N", "104.98", "W", "US"];
