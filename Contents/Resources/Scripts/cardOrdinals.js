/*global bf */

/*properties
    floor, locale, substring, toString
*/

function cardinalOf(num) {
	/*jslint white: true */
	
	var tens = Math.floor(num / 10), units = num % 10;

	switch (num) {	// num 0..59
	case 0: return bf("zero");
	case 1: return bf("one");
	case 2: return bf("two");
	case 3: return bf("three");
	case 4: return bf("four");
	case 5: return bf("five");
	case 6: return bf("six");
	case 7: return bf("seven");
	case 8: return bf("eight");
	case 9: return bf("nine");
	case 10: return bf("ten");
	case 11: return bf("eleven");
	case 12: return bf("twelve");
	case 13: return bf("thirteen");
	case 14: return bf("fourteen");
	case 15: return bf("fifteen");
	case 16: return bf("sixteen");
	case 17: return bf("seventeen");
	case 18: return bf("eighteen");
	case 19: return bf("nineteen");
	case 20: return bf("twenty");
	case 30: return bf("thirty");
	case 40: return bf("forty");
	case 50: return bf("fifty");
	case 60: return bf("sixty");
	case 70: return bf("seventy");
	case 80: return bf("eighty");
	case 90: return bf("ninety");
	
	default:
		if (num > 20) {
			if (widget.locale.substring(0, 2) === "nl") {
				return cardinalOf(units) + " en " + cardinalOf(10 * tens);	// seven en twintig
			}
			return cardinalOf(10 * tens) + "-" + cardinalOf(units);		// twenty-seven
		}
	}
}

function englishCardinalOf(num) {
	/*jslint white: true */

	var tens = Math.floor(num / 10), units = num % 10;

	switch (num) {	// num 0..99
	case 0: return "zero";
	case 1: return "one";
	case 2: return "two";
	case 3: return "three";
	case 4: return "four";
	case 5: return "five";
	case 6: return "six";
	case 7: return "seven";
	case 8: return "eight";
	case 9: return "nine";
	case 10: return "ten";
	case 11: return "eleven";
	case 12: return "twelve";
	case 13: return "thirteen";
	case 14: return "fourteen";
	case 15: return "fifteen";
	case 16: return "sixteen";
	case 17: return "seventeen";
	case 18: return "eighteen";
	case 19: return "nineteen";
	case 20: return "twenty";
	case 30: return "thirty";
	case 40: return "forty";
	case 50: return "fifty";
	case 60: return "sixty";
	case 70: return "seventy";
	case 80: return "eighty";
	case 90: return "ninety";
	
	default:
		if (num > 20) {
			return englishCardinalOf(10 * tens) + "-" + englishCardinalOf(units);		// twenty-seven
		}
	}
}

function ordinalOf(num) {
	/*jslint white: true */

	var tens = Math.floor(num / 10),
		units = num % 10;

	switch (num) {	// num 0..59
	case 0: return bf("zeroth");
	case 1: return bf("first");
	case 2: return bf("second");
	case 3: return bf("third");
	case 4: return bf("fourth");
	case 5: return bf("fifth");
	case 6: return bf("sixth");
	case 7: return bf("seventh");
	case 8: return bf("eighth");
	case 9: return bf("ninth");
	case 10: return bf("tenth");
	case 11: return bf("eleventh");
	case 12: return bf("twelfth");
	case 13: return bf("thirteenth");
	case 14: return bf("fourteenth");
	case 15: return bf("fifteenth");
	case 16: return bf("sixteenth");
	case 17: return bf("seventeenth");
	case 18: return bf("eighteenth");
	case 19: return bf("nineteenth");
	case 20: return bf("twentieth");
	case 30: return bf("thirtieth");
	case 40: return bf("fortieth");
	case 50: return bf("fiftieth");
	case 60: return bf("sixtieth");
	case 70: return bf("seventieth");
	case 80: return bf("eightieth");
	case 90: return bf("ninetieth");
		
	default:
		if (num > 20) {
			if (widget.locale.substring(0, 2) === "nl") {
				return cardinalOf(units) + " en " + ordinalOf(10 * tens);	// seven en twintigste
			}
			return cardinalOf(10 * tens) + "-" + ordinalOf(units);	// twenty-seventh
		}
	}
}

function englishOrdinalOf(num) {
	/*jslint white: true */

	var tens = Math.floor(num / 10),
		units = num % 10;

	switch (num) {	// num 0..99
	case 0: return "zeroth";
	case 1: return "first";
	case 2: return "second";
	case 3: return "third";
	case 4: return "fourth";
	case 5: return "fifth";
	case 6: return "sixth";
	case 7: return "seventh";
	case 8: return "eighth";
	case 9: return "ninth";
	case 10: return "tenth";
	case 11: return "eleventh";
	case 12: return "twelfth";
	case 13: return "thirteenth";
	case 14: return "fourteenth";
	case 15: return "fifteenth";
	case 16: return "sixteenth";
	case 17: return "seventeenth";
	case 18: return "eighteenth";
	case 19: return "nineteenth";
	case 20: return "twentieth";
	case 30: return "thirtieth";
	case 40: return "fortieth";
	case 50: return "fiftieth";
	case 60: return "sixtieth";
	case 70: return "seventieth";
	case 80: return "eightieth";
	case 90: return "ninetieth";
		
	default:
		if (num > 20) {
			return englishCardinalOf(10 * tens) + "-" + englishOrdinalOf(units);	// twenty-seventh
		}
	}
}

function yearOf(num) {
	var sYear = num.toString(),	// THtu
		T = Number(sYear[0]),
		H = Number(sYear[1]),
//		t = Number(sYear[2]),
		u = Number(sYear[3]),
		C = 10 * T + H;

	if ((num % 1000) === 0) {
		return cardinalOf(T) + bf('minThousand');
	}
	if ((num % 1000)  < 10) {
		return cardinalOf(T) + bf('minThousandAnd') + cardinalOf(u);
	}
	if ((num %  100) === 0) {
		return cardinalOf(C) + bf('minHundred');
	}
	if ((num %  100)  < 10) {
		return cardinalOf(C) + bf('minOhMin') + cardinalOf(u);
	}
	return cardinalOf(C) + '-' + cardinalOf(num % 100);
}

function englishYearOf(num) {
	var sYear = num.toString(),	// THtu
		T = Number(sYear[0]),
		H = Number(sYear[1]),
//		t = Number(sYear[2]),
		u = Number(sYear[3]),
		C = 10 * T + H;

	if ((num % 1000) === 0) {
		return englishCardinalOf(T) + "-thousand";
	}
	if ((num % 1000) < 10) {
		return englishCardinalOf(T) + "-thousand and " + englishCardinalOf(u);
	}
	if ((num % 100) === 0) {
		return englishCardinalOf(C) + "-hundred";
	}
	if ((num % 100) < 10) {
		return englishCardinalOf(C) + "-oh-" + englishCardinalOf(u);
	}
	return englishCardinalOf(C) + '-' + englishCardinalOf(num % 100);
}
