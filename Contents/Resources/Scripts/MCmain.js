/*global theTimer, updateCalendar, selectedMemo, prevMemo,
	gISOdate, theISOMonth, openMemoWindow, prevMonth, nextMemo, nextMonth, month: true, year: true,
	simpleForm, bf, cal, hOffset, font, fontStyle, fontSize, adjustHeight, showButtons,
	makeISODate3, SPEAK, englishOrdinalOf, englishYearOf, ordinalOf, yearOf, savePlist, widgetName,
	restorePlist, memo_window, main_window, memo, gotoMonth, widgethelp, donate, amazon, rocketdock,
	nullfunction, backupMemos, memoFolderPath, update,contact, otherwidgets, displayLicense
 */

var TRUE = true;

var year;
var lastYear = 9999;				// code is safe until 10000 AD.
var month;
var day;

function updateMemos() {
	if (memo_window !== null) {
		memo.font = preferences.memoFontPref.value;
		memo.size = preferences.memoFontSizePref.value;
	}
}

function updateDate(forced) {
	var theDate, theYear, theMonth, theDay, timerInterval;

	theTimer.ticking = false;

	theDate  = new Date();
	theYear  = theDate.getFullYear();
	theMonth = theDate.getMonth() + 1;
	theDay   = theDate.getDate();

	timerInterval = 86400 - 3600 * theDate.getHours() - 60 * theDate.getMinutes() - theDate.getSeconds(); // is always >= 1
	if (timerInterval > 60) {
		timerInterval -= 30;
	}

	theTimer.interval = timerInterval;
	theTimer.ticking = true;

	if ((preferences.autoModePref.value === "1") || forced) {
		cal(theYear, theMonth, theDay);
	}
}

function fullDateOf(isoDate) {
	var len   = isoDate.length,
		year  = parseInt(isoDate.substring(0, len - 4), 10),
		month = parseInt(isoDate.substring(len - 4, len - 2), 10),
		day   = parseInt(isoDate.substring(len - 2), 10),
		d = new Date(year, month - 1, day);

	return d.toDateString();
}

function isLeapYear(year) {
    if ((year %   4) !== 0) {
    	return false;
    }
    if ((year % 400) === 0) {
    	return true;
    }
    if ((year % 100) === 0) {
    	return false;
    }
    return true;
}

function daysInMonth(year, month) {	// month 1..12
    var daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month !== 2) {
    	return daysInMonthArr[month - 1];
    }
    if (isLeapYear(year)) {
    	return 29;
    }
    return 28;
}

function nextISODate(isoDate) {
	var n     = isoDate.length,
		year  = Number(isoDate.substring(0, n - 4)),
		month = Number(isoDate.substring(n - 4, n - 2)),
		day   = Number(isoDate.substring(n - 2)),
		last;

	day += 1;
	last = daysInMonth(year, month);
	if (day > last) {
		day -= last;
		month += 1;
		if (month > 12) {
			month = 1;
			year += 1;
		}
	}

	day   = String(day);
	if (day.length   === 1) {
		day   = "0" + day;
	}
	month = String(month);
	if (month.length === 1) {
		month = "0" + month;
	}
	year  = String(year);

	return year + month + day;
}

function prevISODate(isoDate) {
	var n     = isoDate.length,
		year  = Number(isoDate.substring(0, n - 4)),
		month = Number(isoDate.substring(n - 4, n - 2)),
		day   = Number(isoDate.substring(n - 2));

	day -= 1;
	if (day   <  1) {
		month -= 1;
		if (month < 1) {
			month = 12;
			year -= 1;
		}
		day = daysInMonth(year, month);
	}

	day   = String(day);
	if (day.length   === 1) {
		day   = "0" + day;
	}
	month = String(month);
	if (month.length === 1) {
		month = "0" + month;
	}
	year  = String(year);

	return year + month + day;
}

function prevDay() {
	// gISOdate is set to current day
	var oldMonth, newDate, newMonth;

	print("prevDay:selectedMemo: " + selectedMemo);
	if (selectedMemo !== "") {
		prevMemo();
		return;
	}

	if (gISOdate === "19700101") {
		beep();
		return;
	}

	oldMonth = theISOMonth(gISOdate);
	newDate  = prevISODate(gISOdate);
	newMonth = theISOMonth(newDate);
	openMemoWindow(newDate, "");
	gotoMonth(newDate);
}

function nextDay() {
	// gISOdate is set to current day
	var oldMonth, newDate, newMonth;

	print("nextDay;selectedMemo: " + selectedMemo);
	if (selectedMemo !== "") {
		nextMemo();
		return;
	}

	if (gISOdate === "19700101") {
		beep();
		return;
	}

	oldMonth = theISOMonth(gISOdate);
	newDate  = nextISODate(gISOdate);
	newMonth = theISOMonth(newDate);
	openMemoWindow(newDate, "");
	gotoMonth(newDate);
}

function selectMonth() {
	var sDay, sMonth, sYear, sDate, i, done = false;

	focusWidget();

	sDay = 0;
	sMonth = month;
	sYear = year;

	while (!done) {
		sDate = simpleForm(bf('dateSelection'), bf('Select'), 'date', bf('dateColon'), 'text', [''], '', bf('enterDate'));
//		eprint('selected date: ' + sDate);
		if (sDate === "") {
			return;
		}	// user cancelled or typed nothing

		for (i = 0; i < sDate.length; i += 1) {
			if ('0123456789'.indexOf(sDate[i]) < 0) {
				beep();
				continue;
			}
		}

		if (sDate.length === 2) {	// DD
			sDay = parseInt(sDate, 10);
		} else if (sDate.length === 4) { // MMDD
			sMonth = parseInt(sDate.substring(0, 2), 10);
			sDay   = parseInt(sDate.substring(2, 4), 10);
		} else if (sDate.length === 6) { // YYYYMM
			sYear  = parseInt(sDate.substring(0, 4), 10);
			sMonth = parseInt(sDate.substring(4, 6), 10);
		} else if (sDate.length === 8) { // YYYYMMDD
			sYear  = parseInt(sDate.substring(0, 4), 10);
			sMonth = parseInt(sDate.substring(4, 6), 10);
			sDay   = parseInt(sDate.substring(6, 8), 10);
		} else {
			beep();
			continue;
		}

		if ((sYear  < 1900) || (sYear  > lastYear)) {
			beep();
			continue;
		}
		if ((sMonth < 1) || (sMonth > 12)) {
			beep();
			continue;
		}
		if ((sDay   < 0) || (sDay > daysInMonth(sYear, sMonth))) {
			beep();
			continue;
		}

		if (sDay === 0) { sDay = 1; }

		if ((year !== sYear) || (month !== sMonth) || (day !== sDay)) {
			year  = sYear;
			month = sMonth;
			day   = sDay;

			preferences.yearPref.value  = String(year);
			preferences.monthPref.value = String(month);
			preferences.dayPref.value   = String(day);

			cal(year, month, day);
//			adjustHeight();
//			showButtons(255);
		}
		if (sDay !== 0) {
			openMemoWindow(makeISODate3(year, month, sDay), "");
		} else {
			focusWidget();
		}
		done = true;
	}	// while (TRUE);
}

function speakDate(year, month, day) {
	var theDays   = [bf("Sunday"), bf("Monday"), bf("Tuesday"), bf("Wednesday"), bf("Thursday"), bf("Friday"), bf("Saturday")],

		theMonths  = [bf("January"), bf("February"), bf("March"), bf("April"), bf("May"), bf("June"),
			bf("July"), bf("August"), bf("September"), bf("October"), bf("November"), bf("December")],

		dow = new Date(year, month - 1, day).getDay(),

		theEngishDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

		theEnglishMonths = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];

	if (preferences.speakEnglishDatesPref.value === "1") {
		SPEAK(theEngishDays[dow] + ' ' + theEnglishMonths[month - 1] + ' ' + englishOrdinalOf(day) + '\n\n' + englishYearOf(year), "Victoria");
	} else {
		if (widget.locale.substring(0, 2) === "nl") {
			SPEAK(theDays[dow] + ' ' + theMonths[month - 1] + ' de ' + ordinalOf(day) + '\n\n' + yearOf(year));
		} else {
			SPEAK(theDays[dow] + ' ' + theMonths[month - 1] + ' ' + ordinalOf(day) + '\n\n' + yearOf(year));
		}
	}
}

function saveMyPrefs() {
	var filePath = saveAs(".plist");
	if (filePath === null) {
		return;
	}

	if (savePlist(filePath, widgetName)) {
		alert(bf("savedPrefFile") + widgetName + bf("asColon") + filePath);
	} else {
		beep();
		alert(bf("couldNotSavePrefFile") + widgetName + bf("asColon") + filePath);
	}
}

function loadMyPrefs() {
	var filePath = chooseFile(".plist"), res;

	if (filePath === null) {
		return;
	}

	beep();
	res = alert(bf("overwriteCaution"), bf("Proceed"), bf("Cancel"));
	if (res === 2) {
		return;
	}

	if (restorePlist(filePath, widgetName)) {
//		eprint('restoreMyPrefs:reloadWidget');
		reloadWidget();
	} else {
		beep();
		alert(bf("couldNotLoadPrefFile") + filePath + bf("for") + widgetName);
	}
}

function setContextMenu() {
    //var menu = main_window.contextMenuItems;
	var items = [], item;

        item = new MenuItem();
        item.title = bf("CMopenHelp");
        item.onSelect = function () {
            widgetHelpURL();
        };
	items.push(item);

        item = new MenuItem();
        item.title = "Donate a Coffee with Ko-Fi";
        item.onSelect = function () {
            donate();
        };
	items.push(item);


        item = new MenuItem();
        item.title = "";
        item.onSelect = function () {
            nullfunction();
        };
	items.push(item);

        item = new MenuItem();
        item.title = bf("CMbackup");
        item.onSelect = function () {
            backupMemos();
        };
	items.push(item);

        item = new MenuItem();
        item.title = bf("CMopenMemos");
        item.onSelect = function () {
            filesystem.open(memoFolderPath);
        };
	items.push(item);

        item = new MenuItem();
        item.title = bf("CMloadPrefs");
        item.onSelect = function () {
            loadMyPrefs();
        };
	items.push(item);

        item = new MenuItem();
        item.title = bf("CMsavePrefs");
        item.onSelect = function () {
            saveMyPrefs();
        };
	items.push(item);
        
        item = new MenuItem();
        item.title = "";
        item.onSelect = function () {
            nullfunction();
        };
	items.push(item);

        item = new MenuItem();
        item.title = "See More Steampunk Widgets";
        item.onSelect = function () {
            otherwidgets();
        };
	items.push(item);
        
        item = new MenuItem();
        item.title = "Contact Support";
        item.onSelect = function () {
            contact();
        };
	items.push(item);

        item = new MenuItem();
        item.title = "Display Licence Agreement";
        item.onSelect = function () {
            displayLicence();
        };
	items.push(item);

    	item = new MenuItem();
	item.title = "Download Latest Version";
	item.onSelect = function () {
		update();
	};
	items.push(item);

        item = new MenuItem();
        item.title = "";
        item.onSelect = function () {
            nullfunction();
        };
	items.push(item);

        if (underWidgetFound === false ) {
            item = new MenuItem();
            item.title = "Get the optional Under Widget";
            item.onSelect = function () {
                underWidget();
            };
    	items.push(item);
        }

        if (moonWidgetFound === false ) {
            item = new MenuItem();
            item.title = "Get the essential Moon Widget";
            item.onSelect = function () {
                moonWidget();
            };
    	items.push(item);
        }

        item = new MenuItem();
        item.title = "Get the optional leather background";
        item.onSelect = function () {
            steampunkBackground();
        };
	items.push(item);

        item = new MenuItem();
        item.title = "";
        item.onSelect = function () {
            nullfunction();
        };
	items.push(item);

	item = new MenuItem();
	item.title = "Reveal Widget in Windows Explorer";
	item.onSelect = function () {
		findWidget();
	};
	items.push(item);

        item = new MenuItem();
        item.title = "";
        item.onSelect = function () {
            nullfunction();
        };
	items.push(item);

    item = new MenuItem();
    item.title = "Reload Widget (F5)";
    item.onSelect = function () {
        reloadWidget();
    };
    items.push(item);
    
    if (preferences.imageEditPref.value != "" && debugFlg == 1) {
            mItem = new MenuItem();
            mItem.title = "Edit Widget using " + preferences.imageEditPref.value ;
            mItem.onSelect = function () {
                editWidget();
            };
            items.push(mItem);
    }
    
	main_window.contextMenuItems = items;
}







