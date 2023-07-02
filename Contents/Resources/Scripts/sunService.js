/*global parseLatOrLong, bf, eprint, calculate, moonRiseSet */

/*properties
    altitudePref, altitudeUnitsPref, getTimezoneOffset, hour12Pref, indexOf, 
    latitudePref, length, longitudePref, replace, round, split, sqrt, substring, 
    timeZoneOffset, timeZonePref, toString, value, zenithPref
*/

include("Resources/Scripts/parseLatLong.js");
include("Resources/Scripts/Sunrise.js");
include("Resources/Scripts/Moonrise.js");

var zenithPref;
var timeZonePref;
var timeZoneOffset;
		
var altitudePref;
var altitudeUnitsPref;
var altitudeMetresMax = 15240;	// 15240 metres
var altitudeFeetMax   = 50000;	// 50000 feet

// parseLatOrLong(data, doLatitude, strict, separators)

function get_ang(data, dmax) {
	switch (dmax) {
	case 90:
		return parseLatOrLong(data, true, false, " ");
	case 180:
		return parseLatOrLong(data, false, false, " ");
	default:
		return NaN;
	}
}

function zenithTypeOf(zenith) {		
	if (zenith <  91) { 
		return bf("Official"); 
	}
	if (zenith <  97) { 
		return bf("Civil"); 
	}
	if (zenith < 103) { 
		return bf("Nautical"); 
	}
	if (zenith < 109) { 
		return bf("Astronomical"); 
	}
	return "";
}

function sunRiseSet(isoDate) {
	var tzOffset, K = preferences.latitudePref.value, L = preferences.longitudePref.value,
		latitude, longitude, len, year, month, day, theDate, localOffset, theta, zenith,
		zenithType, h12, rises, sets, moonResult, moonData, result;
		
	eprint("sunRiseSet:K:  " + K);
	eprint("sunRiseSet:L:  " + L);
	
	if ((K === "") || (L === "")) { 
		return ""; 
	}

	latitude  = get_ang(K,  90);	
	eprint("sunRiseSet:latitude:  " + latitude);
	longitude = get_ang(L, 180);	
	eprint("sunRiseSet:longitude: " + longitude);
	
	if (isNaN(latitude) || isNaN(longitude)) {
		eprint("sunRiseSet:invalidLocation");
		return bf("invalidLocation");
	}

	len   = isoDate.length;
	year  = parseInt(isoDate.substring(0, len - 4), 10);
	month = parseInt(isoDate.substring(len - 4, len - 2), 10);
	day   = parseInt(isoDate.substring(len - 2), 10);

	theDate = new Date(year, month - 1, day, 12, 0, 0);	// offset at 12:00:00

	localOffset = timeZoneOffset;	// in hours
		
	if (timeZoneOffset === 24) {			// use local time
		tzOffset = theDate.getTimezoneOffset();	// in minutes
		localOffset = -(tzOffset / 60);
	}
			
	theta = 0.0321 * Math.sqrt(altitudePref);	// converts altitude in metres to zenith delta
	
	zenith  = zenithPref;	// type of sunrise/sunset
	
	zenithType = zenithTypeOf(zenith);
	
	zenith += theta;			// add altitude adjustment

	h12 = (preferences.hour12Pref.value === "1");
	
	rises = calculate(true,  year, month, day, latitude, longitude, zenith, localOffset, h12);
	if (rises.indexOf('No') < 0) { 
		rises = zenithType + bf("sunriseAt") + rises; 
	}
	
	sets  = calculate(false, year, month, day, latitude, longitude, zenith, localOffset, h12);
	if (sets.indexOf('No') < 0) { 
		sets =  zenithType + bf("sunsetAt") + sets; 
	}
	
	moonResult = '';
	moonData = moonRiseSet(latitude, longitude, theDate, -localOffset, h12).split('/');
	if (moonData.length < 2) {
		if (moonData[0] === 'Down all day') { 
			moonResult = bf("moonDown");
		} else { 
			moonResult = bf("moonUp");
		}
	} else {
		moonData[0] = moonData[0].replace(/\{R\}/, bf("moonRisesAt")).replace(/\{S\}/, bf("moonSetsAt")).replace(/None/, '** ** **');
		moonData[1] = moonData[1].replace(/\{R\}/, bf("moonRisesAt")).replace(/\{S\}/, bf("moonSetsAt")).replace(/None/, '** ** **');
		
		moonResult = moonData[0] + '\n' + moonData[1];
	}
	
	result =  rises + '\n' + sets + '\n\n' + moonResult;
	eprint('sunRiseSet(' + isoDate + '):\n' + result);
	return result;
}

function updateSunPrefs() {
	var latitude, longitude, K, L;
	timeZonePref  = preferences.timeZonePref.value;
	zenithPref    = Number(preferences.zenithPref.value);

	if (timeZonePref === "Universal Time") {
		timeZoneOffset = 0;
	} else if (timeZonePref === 'My Local Time') {
		timeZoneOffset = 24;	// marker for local time
	} else {
		timeZoneOffset = parseFloat(preferences.timeZoneOffset.value);
		
		if (isNaN(timeZoneOffset)) { 
			timeZoneOffset = 48; 
		} else {
			timeZoneOffset = Math.round(4 * timeZoneOffset) / 4;
			
			if ((timeZoneOffset > 14) || (timeZoneOffset < -12)) {
				timeZoneOffset = 48;
			}
		}
		if (timeZoneOffset === 48) {
			beep(); 
			alert(bf('invalidZone')); 
			timeZoneOffset = 0; 
		} else {
			preferences.timeZoneOffset.value = timeZoneOffset.toString(); 
		}
	}

	K = preferences.latitudePref.value;		
	eprint("updateSunPrefs:K:  " + K);
	L = preferences.longitudePref.value;	
	eprint("updateSunPrefs:L:  " + L);

	if ((K !== "") && (L !== "")) {
		latitude  = get_ang(K,  90);	
		eprint("updateSunPrefs:latitude:  " + latitude);
		longitude = get_ang(L, 180);	
		eprint("updateSunPrefs:longitude: " + longitude);

		if (isNaN(latitude) || isNaN(longitude)) {
			eprint("updateSunPrefs:invalidLocation");
			//return bf("invalidLocation");
		}
	}

 	altitudePref = parseFloat(preferences.altitudePref.value);
 	altitudeUnitsPref = preferences.altitudeUnitsPref.value;
 			
 	if (isNaN(altitudePref)) { 
 		altitudePref = 0; 
 	}
 	if (altitudePref < 0) { 
 		altitudePref = 0; 
 	}
 			
 	if ((altitudeUnitsPref === "metres") && (altitudePref > altitudeMetresMax)) {
 		altitudePref = altitudeMetresMax;
 	} else if ((altitudeUnitsPref === "feet") && (altitudePref > altitudeFeetMax)) {
 		altitudePref = altitudeFeetMax;
 	}
 			
 	preferences.altitudePref.value = String(altitudePref);			// rewrite modified value
 			
 	if (altitudeUnitsPref === "feet") { 
 		altitudePref *= 0.3048; 
 	}	// convert feet to metres
}
