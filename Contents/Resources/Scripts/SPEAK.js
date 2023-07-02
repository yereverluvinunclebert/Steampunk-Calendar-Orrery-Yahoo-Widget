/*global speechTimer, memo, eprint, cardinalOf, englishCardinalOf, bf */


/*properties
    Speak, createObject, data, floor, indexOf, interval, length, maxSpeechTime, 
    platform, replace, reset, setVoices, split, ticking, value, speakEnglishDatesPref
*/

var SPEAK = (function () {
	var itself, voices = [], synth = null;

	function check(item, vector) {
		var i;
		
		for (i = 0; i < vector.length; i += 1) { if (vector[i] === item) { return true; } }
		return false;
	}

	if (system.platform === "macintosh") {
		itself = function (text, voice, stopping, waiting) {
			var result;
			
			if (voice && check(voice, voices)) {
				if (stopping === undefined) { stopping = "true";  } else { stopping = stopping ? "true" : "false"; }
				if (waiting  === undefined) { waiting  = "false"; } else { waiting  = waiting ?  "true" : "false"; }
				result = appleScript('say "' + text + '" using "' + voice + '" stopping current speech ' + stopping + ' waiting until completion ' + waiting);
				if (result.indexOf("AppleScript Error") >= 0) { print(result); }
			} else {
				speak(text);
			}
		};
	} else {
		itself = function (text, voice, stopping, waiting) {
			var svsfDefault = 0, svsfAsync = 1, svsfPurge = 2;	// SpeechVoiceSpeakFlags

			if (synth === null) { synth = COM.createObject("SAPI.SpVoice"); }
/*
			var Voices, i, description, index = [];
			
			Voices = synth.GetVoices();
			for (i = 0; i < Voices.Count; i += 1) {				// list available Voices
				description = Voices.Item(i).GetDescription();
				print("Voice[" + i + "]: " + description);
				index[description] = i;							// make reverse index
			}
			print("Current Voice:  " + synth.Voice.GetDescription());
			if (voice) {
				i = index[voice];								// look up voice in index
				if (i !== undefined) { synth.Voice = Voices.Item(i); }	// **** does not work
			}
*/
			if (stopping === undefined) { stopping = svsfPurge; } else { stopping = stopping ? svsfPurge : svsfDefault; }
			if (waiting  === undefined) { waiting  = svsfAsync; } else { waiting  = waiting  ? svsfDefault : svsfAsync; }

			if (text !== "") { synth.Speak(text, stopping + waiting); } else { speak(""); }
		};
	}

	itself.reset = function () { synth = null; };
	
	itself.setVoices = function (voiceList) { voices = voiceList.split(","); };
		
	return itself;
}());

/*
In  /System/Library/Speech/Voices/Alex.SpeechVoice/Contents/Info.plist

<key>CFBundleName</key>
<string>Alex</string>

In /Library/Speech/Voices/iVox-Rachel22k.SpeechVoice/Contents/Info.plist

<key>VoiceName</key>
<string>Femke Infovox iVox HQ</string>
*/

/*
var mVoices = ["Alex", "Bruce", "Fred", "Junior", "Ralph",
	"Graham Infovox iVox HQ", "Max Infovox iVox HQ", "Peter Infovox iVox HQ"];
var fVoices = ["Agnes", "Kathy", "Princess", "Vicki", "Victoria",
	"Femke Infovox iVox HQ", "Heather Infovox iVox HQ", "Lucy Infovox iVox HQ", "Rachel Infovox iVox HQ"];

SPEAK.setVoices(mVoices.join(',') + "," + fVoices.join(','));

log("start1");
SPEAK("Goede avond, Harry", "Max Infovox iVox HQ");
log("done1");
sleep(2000);
log("start2");
SPEAK("Good evening, Harry", "Victoria");
log("done2");
sleep(2000);
log("start3");
SPEAK("Goede morgan, Harry", "Femke Infovox iVox HQ");
log("done3");
sleep(1500);
log("start4");
SPEAK("Good morning, Tom. Good morning, Dick.");
log("done4");
//SPEAK("");

SPEAK.reset();
*/


var speakMemoToggle = false;

function speakMemo() {
	var cps, maxTime, data, n, secs,
		speakEnglish = (preferences.speakEnglishDatesPref.value === "1");
	
	if (speakMemoToggle) { 
		speakMemoToggle = false; 
		speechTimer.ticking = false; 
		SPEAK(""); 
		return; 
	}
	
	cps = 12;	// characters per second
	maxTime = Number(preferences.maxSpeechTime.value);
	data = memo.data.replace(/<<\w*\=[^\;\n<\>]*?(\;\w*\=[^\;\n<\>]*?)*\>\>\n?/g, "");	// remove embeded commands
	
//	eprint("speakMemo: " + data);

	n = data.length;
	secs = Math.floor(n / cps);
	
	if (n > 0) {
		if (n < 10 * cps) {
			speakMemoToggle = true;
			speechTimer.interval = secs; 
			speechTimer.ticking = true;
			SPEAK(data);
		} else if ((maxTime <= 100) && (n < maxTime * cps)) {
			speakMemoToggle = true;
			speechTimer.interval = secs; 
			speechTimer.ticking = true;
			if (speakEnglish) {
				SPEAK(englishCardinalOf(secs) + "seconds" + "\n\n" + data);
			} else {
				SPEAK(cardinalOf(secs) + bf("seconds") + "\n\n" + data);
			}
		} else if (maxTime <= 100) {
			if (speakEnglish) {
				SPEAK("The text is too long.");
			} else {
				SPEAK(bf("textTooLong"));
			}
		} else {
			speakMemoToggle = true;
			SPEAK(data);
		}
	} else { 
		if (speakEnglish) {
			SPEAK(bf("noText"));
		} else {
			SPEAK("There is no text.");
		}
	}
}

