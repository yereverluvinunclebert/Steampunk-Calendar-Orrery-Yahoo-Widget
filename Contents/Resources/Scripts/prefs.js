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

	Month Calendar - version 4.0 for TimeKeeper 1.1.4
	11 March, 2012
	Copyright  2005-2012 Harry Whitfield
	mailto:g6auc@arrl.net
*/

/*global back, bf, close, displayBg, next, open, prev, spawn, systemPlatform, wrench,
		 forward, maglens
*/

/*properties
    accessModePref, advancePref, allowAutoOpenPref, anchorPref, anchorXPref,
    anchorYPref, aspectRatioPref, autoModePref, autoOpenPref, calendar, colors,
    dayPref, description, dockDate, fonts, frameColor, framePref, geometry1,
    geometry2, heightPref, maxHeightPref, maxSpeechTime, maxWidthPref,
    memoFolderPref, memoFontPref, memoFontSizePref, memoScalePref,
    memoTextBgColor, memoTextColor, memos, monthPref, network, option,
    oversizePref, rotationPref, scalePref, searchHotKeyPref, selectHotKeyPref,
    sharedDirectoryPref, sharedMemoFolderPref, sharedModePref,
    sharedUpdateTimerPref, speakDatesPref, speakEnglishDatesPref, speech,
    speechHotKeyPref, title, tooltip, widthPref, yearPref
*/

var gBfMonths = null;

function setPrefs() {
	gBfMonths     = [ bf("January"), bf("February"), bf("March"), bf("April"), bf("May"), bf("June"),
					   	  bf("July"), bf("August"), bf("September"), bf("October"), bf("November"), bf("December") ];

	//prev.tooltip      = bf("previousMonth");
	//next.tooltip      = bf("nextMonth");
	maglens.tooltip      = bf("enlargeRestore");
	close.tooltip     = bf("closeMemo");
	spawn.tooltip     = bf("spawn");
	wrench.tooltip    = bf("wrench");
	back.tooltip      = bf("back");
	forward.tooltip   = bf("forward");
//	displayBg.tooltip = bf("displayBg");
	close.tooltip    += bf("useShiftEnterKeys");

	if (systemPlatform === 'macintosh') {
		spawn.tooltip += bf("useEnterKey");
	}

//	preferenceGroups.backgrounds.title 		= bf("pGbackgroundsTitle");
//	preferenceGroups.markers1.title 		= bf("pGmarkers1Title");
//	preferenceGroups.markers2.title 		= bf("pGmarkers2Title");
//	preferenceGroups.colors1.title 			= bf("pGcolors1Title");
//	preferenceGroups.colors2.title 			= bf("pGcolors2Title");

	preferenceGroups.calendar.title 		= bf("pGcalendarTitle");			// new
	preferenceGroups.colors.title 			= bf("pGcolorsTitle");				// new

//	preferenceGroups.errors.title 			= bf("pGerrorsTitle");

	preferenceGroups.fonts.title 			= bf("pGfontsTitle");
	preferenceGroups.geometry1.title 		= bf("pGgeometry1Title");
	preferenceGroups.geometry2.title 		= bf("pGgeometry2Title");
	preferenceGroups.memos.title 			= bf("pGmemosTitle");
	preferenceGroups.network.title 			= bf("pGnetworkTitle");
	preferenceGroups.speech.title 			= bf("pGspeechTitle");

//	preferenceGroups.sunrise.title 			= bf("pGsunriseTitle");
//	preferenceGroups.weeks.title 			= bf("pGweeksTitle");

	preferences.scalePref.title				= bf("PRscaleTitle");				// new
	preferences.scalePref.description		= bf("PRscaleDesc");				// new

	preferences.advancePref.title			= bf("PRadvanceTitle");				// new
	preferences.advancePref.description		= bf("PRadvanceDesc");				// new

//	preferences.startWeekOnSunday.title 	= bf("PRstartWeekOnSundayTitle");
//	preferences.startWeekOnSunday.description = bf("PRstartWeekOnSundayDesc");

	preferences.autoModePref.title 			= bf("PRautoModePrefTitle");
	preferences.autoModePref.description 	= bf("PRautoModePrefDesc");

	preferences.autoOpenPref.title 			= bf("PRautoOpenPrefTitle");
	preferences.autoOpenPref.description 	= bf("PRautoOpenPrefDesc");

	preferences.yearPref.title 				= bf("PRyearPrefTitle");
	preferences.yearPref.description 		= bf("PRyearPrefDesc");

	preferences.monthPref.title 			= bf("PRmonthPrefTitle");
	preferences.monthPref.option 			= gBfMonths;
	preferences.monthPref.description 		= bf("PRmonthPrefDesc");

	preferences.dayPref.title 				= bf("PRdayPrefTitle");				// new
	preferences.dayPref.description 		= bf("PRdayPrefDesc");				// new

	preferences.dockDate.title 				= bf("PRdockDatePrefTitle");		// new
	preferences.dockDate.option 			= [bf("TodaysDate"), bf("CalendarDate")];	// new
	preferences.dockDate.description 		= bf("PRdockDatePrefDesc");			// new

	preferences.selectHotKeyPref.title 		= bf("PRselectHotkeyPrefTitle");
	preferences.selectHotKeyPref.description = bf("PRselectHotkeyPrefDesc");

	preferences.searchHotKeyPref.title 		= bf("PRsearchHotkeyPrefTitle");
	preferences.searchHotKeyPref.description = bf("PRsearchHotkeyPrefDesc");

//	preferences.backgroundPref.title 		= bf("PRbackgroundPrefTitle");
//	preferences.backgroundPref.option 		= [ bf("Colorized"), bf("White"), bf("darkGlass"), bf("colorizedChart"), "-", bf("None") ];
//	preferences.backgroundPref.defaultValue = bf("PRbackgroundPrefDval");
//	preferences.backgroundPref.description	= bf("PRbackgroundPrefDesc");

//	preferences.bgColorization.title 		= bf("PRbgColorizationTitle");
//	preferences.bgColorization.description 	= bf("PRbgColorizationDesc");

//	preferences.todayMarkerPref.title 		= bf("PRtodayMarkerPrefTitle");

//	preferences.todayMarkerPref.option 		= [ bf("Always"), bf("whenFocussed"), bf("Never") ];

//	preferences.todayMarkerPref.defaultValue = bf("PRtodayMarkerPrefDval");
//	preferences.todayMarkerPref.description  = bf("PRtodayMarkerPrefDesc");

//	preferences.todayMarkerColor.title 		 = bf("PRtodayMarkerColorTitle");
//	preferences.todayMarkerColor.description = bf("PRtodayMarkerColorDesc");

//	preferences.memoMarkersPref.option		= [ bf("Always"), bf("whenFocussed"), bf("Never") ];

//	preferences.memoMarkersPref.defaultValue = bf("PRmemoMarkersPrefDval");

//	preferences.memoMarkersPref.description = bf("PRmemoMarkersPrefDesc");

//	preferences.memoBgColor.title 			= bf("PRmemoBgColorTitle");
//	preferences.memoBgColor.description 	= bf("PRmemoBgColorDesc");

//	preferences.iCalPref.title 				= bf("PRiCalPrefTitle");

//	preferences.iCalPref.option 			= [ bf("areDisabled"), bf("appearInTooltips"), bf("areHighlighted") ];

//	preferences.iCalPref.description 		= bf("PRiCalPrefDesc");

	preferences.memoTextBgColor.title 		= bf("PRmemoTextBgColorTitle");
	preferences.memoTextBgColor.description = bf("PRmemoTextBgColorDesc");

//	preferences.displayBgColor.title 		= bf("PRdisplayBgColorTitle");
//	preferences.displayBgColor.description 	= bf("PRdisplayBgColorDesc");

//	preferences.logFlagPref.title 			= bf("PRlogFlagPrefTitle");
//	preferences.logFlagPref.description 	= bf("PRlogFlagPrefDesc");

//	preferences.lFlagPref.title 			= bf("PRlFlagPrefTitle");
//	preferences.lFlagPref.description 		= bf("PRlFlagPrefDesc");

//	preferences.eFlagPref.title 			= bf("PReFlagPrefTitle");
//	preferences.eFlagPref.description 		= bf("PReFlagPrefDesc");

//	preferences.sFlagPref.title 			= bf("PRsFlagPrefTitle");
//	preferences.sFlagPref.description 		= bf("PRsFlagPrefDesc");

//	preferences.logFilePref.title 			= bf("PRlogFilePrefTitle");
//	preferences.logFilePref.description 	= bf("PRlogFilePrefDesc");

//	preferences.generalFontPref.title 		= bf("PRgeneralFontPrefTitle");
//	preferences.generalFontPref.description = bf("PRgeneralFontPrefDesc");

//	preferences.fontSizePref.title 			= bf("PRfontSizePrefTitle");
//	preferences.fontSizePref.description 	= bf("PRfontSizePrefDesc");

//	preferences.fontDeltaPref.title 		= bf("PRfontDeltaPrefTitle");
//	preferences.fontDeltaPref.option 		= [ bf("None"), bf("oneSizeLarger"), bf("twoSizesLarger") ];

	preferences.memoFontPref.title 			= bf("PRmemoFontPrefTitle");
	preferences.memoFontPref.description 	= bf("PRmemoFontPrefDesc");

	preferences.memoFontSizePref.title 		= bf("PRmemoFontSizePrefTitle");
	preferences.memoFontSizePref.description = bf("PRmemoFontSizePrefDesc");

//	preferences.displayFontPref.title 		= bf("PRdisplayFontPrefTitle");
//	preferences.displayFontPref.description = bf("PRdisplayFontPrefDesc");

//	preferences.displayFontSizePref.title 	= bf("PRdisplayFontSizePrefTitle");
//	preferences.displayFontSizePref.description = bf("PRdisplayFontSizePrefDesc");

//	preferences.monthTextColor.title 		= bf("PRmonthTextColorTitle");
//	preferences.monthTextColor.description 	= bf("PRmonthTextColorDesc");

//	preferences.textColor.title 			=  bf("PRtextColorTitle");
//	preferences.textColor.description 		= bf("PRtextColorDesc");

//	preferences.satTextColor.title 			= bf("PRsatTextColorTitle");
//	preferences.satTextColor.description 	= bf("PRsatTextColorDesc");

//	preferences.sunTextColor.title 			= bf("PRsunTextColorTitle");
//	preferences.sunTextColor.description 	= bf("PRsunTextColorDesc");

//	preferences.weekColor.title 			= bf("PRweekColorTitle");
//	preferences.weekColor.description 		= bf("PRweekColorDesc");

//	preferences.todayColor.title 			= bf("PRtodayColorTitle");
//	preferences.todayColor.description 		= bf("PRtodayColorDesc");

//	preferences.memoColor.title 			= bf("PRmemoColorTitle");
//	preferences.memoColor.description 		= bf("PRmemoColorDesc");

	preferences.memoTextColor.title 		= bf("PRmemoTextColorTitle");
	preferences.memoTextColor.description 	= bf("PRmemoTextColorDesc");

	preferences.frameColor.title 			= bf("PRframeColorTitle");
	preferences.frameColor.description		= bf("PRframeColorDesc");

//	preferences.displayTextColor.title 		= bf("PRdisplayTextColorTitle");
//	preferences.displayTextColor.description = bf("PRdisplayTextColorDesc");

	//preferences.oversizePref.title 			= bf("PRoversizePrefTitle");
	//preferences.oversizePref.description 	= bf("PRoversizePrefDesc");

	//preferences.widthPref.title 			= bf("PRwidthPrefTitle");
	//preferences.widthPref.description 		= bf("PRwidthPrefDesc");

	//preferences.heightPref.title 			= bf("PRheightPrefTitle");
	//preferences.heightPref.description 		= bf("PRheightPrefDesc");

	//preferences.maxWidthPref.title 			= bf("PRmaxWidthPrefTitle");
	//preferences.maxWidthPref.description 	= bf("PRmaxWidthPrefDesc");

	//preferences.maxHeightPref.title 		= bf("PRmaxHeightPrefTitle");
	//preferences.maxHeightPref.description 	= bf("PRmaxHeightPrefDesc");

	preferences.rotationPref.title 			= bf("PRrotationPrefTitle");
	preferences.rotationPref.description 	= bf("PRrotationPrefDesc");

	preferences.framePref.title 			= bf("PRframePrefTitle");
	preferences.framePref.description 		= bf("PRframePrefDesc");

	preferences.aspectRatioPref.title 		= bf("PRaspectRatioPrefTitle");
	preferences.aspectRatioPref.description = bf("PRaspectRatioPrefDesc");

	preferences.memoScalePref.title 		= bf("PRmemoScalePrefTitle");
	preferences.memoScalePref.description 	= bf("PRmemoScalePrefDesc");

	preferences.anchorPref.title 			= bf("PRanchorPrefTitle");

	preferences.anchorPref.option			= [ bf("None"), bf("topLeft"), bf("topRight"),
											    bf("bottomLeft"), bf("bottomRight"), bf("center"),
	 											bf("topLeftMemoWindow"), bf("topRightMemoWindow"), bf("bottomLeftMemoWindow"),
	 											bf("bottomRightMemoWindow"), bf("centerMemoWindow") ];

//	preferences.anchorPref.defaultValue 	= bf("PRanchorPrefDval");
	preferences.anchorPref.description 		= bf("PRanchorPrefDesc");

	preferences.anchorXPref.title 			= bf("PRanchorXPrefTitle");
	preferences.anchorYPref.title 			= bf("PRanchorYPrefTitle");

//	preferences.networkCalFile.title 		= bf("PRnetworkCalFileTitle");
//	preferences.networkCalFile.description 	= bf("PRnetworkCalFileDesc");

	preferences.speechHotKeyPref.title 		= bf("PRspeechHotkeyPrefTitle");
	preferences.speechHotKeyPref.description = bf("PRspeechHotkeyPrefDesc");

	preferences.maxSpeechTime.title 		= bf("PRmaxSpeechTimeTitle");
	preferences.maxSpeechTime.description 	= bf("PRmaxSpeechTimeDesc");

	preferences.speakDatesPref.title 		= bf("PRspeakDatesPrefTitle");
	preferences.speakDatesPref.description 	= bf("PRspeakDatesPrefDesc");

//	preferences.zenithPref.title 			= bf("PRzenithPrefTitle");

//	preferences.zenithPref.option 			= [ bf("Official"), "-", bf("Civil"), bf("Nautical"), bf("Astronomical") ];

//	preferences.zenithPref.description 		= bf("PRzenithPrefDesc");

//	preferences.latitudePref.title 			= bf("PRlatitudePrefTitle");
//	preferences.latitudePref.description 	= bf("PRlatitudePrefDesc");

//	preferences.longitudePref.title 		= bf("PRlongitudePrefTitle");
//	preferences.longitudePref.description 	= bf("PRlongitudePrefDesc");

//	preferences.altitudePref.title 			= bf("PRaltitudePrefTitle");
//	preferences.altitudePref.description 	= bf("PRaltitudePrefDesc");

//	preferences.altitudeUnitsPref.title 	= bf("PRaltitudeUnitsPrefTitle");

//	preferences.altitudeUnitsPref.option 	= ["feet", "metres"];

//	preferences.altitudeUnitsPref.defaultValue = bf("PRaltitudeUnitsPrefDval");
//	preferences.altitudeUnitsPref.description = bf("PRaltitudeUnitsPrefDesc");

//	preferences.timeZonePref.title 			= bf("PRtimeZonePrefTitle");

//	preferences.timeZonePref.option 		= [ bf("localTime"), bf("universalTime"), "-", bf("asIndicated") ];

//	preferences.timeZonePref.defaultValue 	= bf("PRtimeZonePrefDval");
//	preferences.timeZonePref.description 	= bf("PRtimeZonePrefDesc");

//	preferences.timeZoneOffset.title 		= bf("PRtimeZoneOffsetTitle");
//	preferences.timeZoneOffset.description 	= bf("PRtimeZoneOffsetDesc");

//	preferences.hour12Pref.title 			= bf("PRhour12PrefTitle");
//	preferences.hour12Pref.description 		= bf("PRhour12PrefDesc");

//	preferences.weekNumberPref.title 		= bf("PRweekNumberPrefTitle");

//	preferences.weekNumberPref.option 		= [ bf("ISO8601"), bf("Custom"), "-", bf("Dots"), bf("Hidden") ];

//	preferences.weekNumberPref.defaultValue = bf("PRweekNumberPrefDval");
//	preferences.weekNumberPref.description 	= bf("PRweekNumberPrefDesc");

//	preferences.weekDayPref.title 			= "";
/*
	preferences.weekDayPref.option = [
		bf("On"),
		bf("firdtSunOnAfter"), bf("firstMonOnAfter"), bf("firstTueOnAfter"),
		bf("firstWedOnAfter"), bf("firstThuOnAfter"), bf("firstFriOnAfter"),
		bf("firstSatOnAfter"),
		bf("lastSun"), bf("lastMon"), bf("lastTue"),
		bf("lastWed"), bf("lastThu"), bf("lastFri"),
		bf("lastSat")
	];
*/
//	preferences.weekDayPref.defaultValue 	= bf("PRweekDayPrefDval");

//	preferences.startMonthPref.title 		= "";

//	preferences.startMonthPref.option 		= gBfMonths;

//	preferences.startMonthPref.defaultValue	= bf("PRstartMonthPrefDval");

//	preferences.calFileList.title 			= bf("PRcalFileListTitle");
//	preferences.calFileList.description 	= bf("PRcalFileListDesc");

	preferences.licenceHide.title 			= bf("PRlicenseHideTitle");
	preferences.licenceHide.description 	= bf("PRlicenseHideDesc");

	// New items

	preferences.accessModePref.title 		= bf("PRaccessModePrefTitle");
	preferences.accessModePref.description 	= bf("PRaccessModePrefDesc");

//	preferences.alarmMarkerPref.title 		= bf("PRalarmMarkerPrefTitle");
//	preferences.alarmMarkerPref.description = bf("PRalarmMarkerPrefDesc");

	preferences.allowAutoOpenPref.title 	= bf("PRallowAutoOpenPrefTitle");
	preferences.allowAutoOpenPref.description = bf("PRallowAutoOpenPrefDesc");
//	preferences.allowAutoOpenPref.defaultValue = bf("PRallowAutoOpenPrefDval");

	preferences.autoOpenPref.option 		= [bf("Always"), bf("whenContent"), bf("Never")];

//	preferences.displayMemoCountPref.title 	= bf("PRdisplayMemoCountPrefTitle");
//	preferences.displayMemoCountPref.description = bf("PRdisplayMemoCountPrefDesc");

//	preferences.dockColorization.title 		= bf("PRdockColorizationTitle");
//	preferences.dockColorization.description = bf("PRdockColorizationDesc");

//	preferences.dockTextColor.title 		= bf("PRdockTextColorTitle");
//	preferences.dockTextColor.description 	= bf("PRdockTextColorDesc");

//	preferences.eFlagPref.title 			= bf("PReFlagPrefTitle");
//	preferences.eFlagPref.description 		= bf("PReFlagPrefDesc");

//	preferences.firstDowColor.title 		= bf("PRfirstDowColorTitle");
//	preferences.firstDowColor.description 	= bf("PRfirstDowColorDesc");

//	preferences.firstSpecialPref.title 		= bf("PRfirstSpecialPrefTitle");
//	preferences.secondSpecialPref.title 	= bf("PRsecondSpecialPrefTitle");
//	preferences.thirdSpecialPref.title 		= bf("PRthirdSpecialPrefTitle");
//	preferences.fourthSpecialPref.title 	= bf("PRfourthSpecialPrefTitle");
//	preferences.fifthSpecialPref.title 		= bf("PRfifthSpecialPrefTitle");
//	preferences.fifthSpecialPref.description = bf("PRfifthSpecialPrefDesc");

//	preferences.iCalDatePref.title 			= bf("PRiCalDatePrefTitle");
//	preferences.iCalDatePref.description 	= bf("PRiCalDatePrefDesc");
//	preferences.iCalDatePref.defaultValue 	= bf("PRiCalDatePrefDval");

//	preferences.iCalDatePref.option			= ["hh:mm:ss[ GMT]", "hh:mm[ GMT]", "-", bf("none")];

//	preferences.imageFolderPref.title 		= bf("PRimageFolderPrefTitle");
//	preferences.imageFolderPref.description = bf("PRimageFolderPrefDesc");

//	preferences.mainAnchorXPref.title 		= bf("PRmainAnchorXPrefTitle");
//	preferences.mainAnchorYPref.title 		= bf("PRmainAnchorYPrefTitle");

//	preferences.mainTooltipPref.title 		= bf("PRmainTooltipPrefTitle");
//	preferences.mainTooltipPref.description = bf("PRmainTooltipPrefDesc");

//	preferences.memoBgOpacity.title = bf("PRmemoBgOpacityTitle");

//	preferences.memoBgOpacity.tickLabel = [bf("low"), bf("medium"), bf("high")];

	preferences.memoFolderPref.title 		= bf("PRmemoFolderPrefTitle");
	preferences.memoFolderPref.description 	= bf("PRmemoFolderPrefDesc");

//	preferences.monthArrowsPref.title 		= bf("PRmonthArrowsPrefTitle");
//	preferences.monthArrowsPref.description = bf("PRmonthArrowsPrefDesc");
//	preferences.monthArrowsPref.defaultValue = bf("PRmonthArrowsPrefDval");

//	preferences.monthArrowsPref.option = [bf("Always"), bf("whenFocussed")];

//	preferences.nextAlarmPref.title 		= bf("PRnextAlarmPrefTitle");
//	preferences.nextAlarmPref.description 	= bf("PRnextAlarmPrefDesc");

//	preferences.realFontSizePref.title 		= bf("PRrealFontSizePrefTitle");
//	preferences.realFontSizePref.description = bf("PRrealFontSizePrefDesc");

//	preferences.secTooltipPref.title 		= bf("PRsecTooltipPrefTitle");
//	preferences.secTooltipPref.description = bf("PRsecTooltipPrefDesc");

	preferences.sharedDirectoryPref.title 	= bf("PRsharedDirectoryPrefTitle");
	preferences.sharedDirectoryPref.description = bf("PRsharedDirectoryPrefDesc");

	preferences.sharedMemoFolderPref.title 	= bf("PRsharedMemoFolderPrefTitle");
	preferences.sharedMemoFolderPref.description = bf("PRsharedMemoFolderPrefDesc");

	preferences.sharedModePref.title 		= bf("PRsharedModePrefTitle");
	preferences.sharedModePref.description 	= bf("PRsharedModePrefDesc");

	preferences.sharedUpdateTimerPref.title = bf("PRsharedUpdateTimerPrefTitel");
	preferences.sharedUpdateTimerPref.description = bf("PRsharedUpdateTimerPrefDesc");

//	preferences.specialBgColor.title 		= bf("PRspecialBgColorTitle");
//	preferences.specialBgColor.description 	= bf("PRspecialBgColorDesc");

//	preferences.specialDayPref.title 		= bf("PRspecialDayPrefTitle");
//	preferences.specialDayPref.description 	= bf("PRspecialDayPrefDesc");


//	preferences.specialDayPref.option = [bf("Monday"), bf("Tuesday"), bf("Wednesday"), bf("Thursday"), bf("Friday"), bf("Saturday"), bf("Sunday")];

//	preferences.todayMarkerHeight.title 	= bf("PRtodayMarkerHeightTitle");
//	preferences.todayMarkerWidth.title 		= bf("PRtodayMarkerWidthTitle");
//	preferences.todayMarkerHOffset.title 	= bf("PRtodayMarkerHOffsetTitle");
//	preferences.todayMarkerVOffset.title 	= bf("PRtodayMarkerVOffsetTitle");
//	preferences.todayMarkerOpacity.title 	= bf("PRtodayMarkerOpacityTitle");

//	preferences.windowLock.title 			= bf("PRwindowLockTitle");
//	preferences.windowLock.description 		= bf("PRwindowLockDesc");

//	preferences.windowTimer.title 			= bf("PRwindowTimerTitle");
//	preferences.windowTimer.description 	= bf("PRwindowTimerDesc");

//	preferences.upperCasePref.title 		= bf("PRupperCaseTitle");
//	preferences.upperCasePref.description 	= bf("PRupperCaseDesc");

	preferences.speakEnglishDatesPref.title = bf("PRspeakEnglishDatesTitle");
	preferences.speakEnglishDatesPref.description = bf("PRspeakEnglishDatesDesc");
}
