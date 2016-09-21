// If markup rates change, modify the settings object below to set new rules.
// Settings should be written in percentages. // ?

var markupPercentages = { // rename this
	flatMarkup: 5,
	perPersonMarkup: 1.2,
	byCategory: {
		'food': 13,
		'electronics': 2,
		'drugs': 7.5, // or pharmaceuticals?
		'other': 0
	}
}

var rates = convertMarkupRulesToDecimals(markupPercentages);

function inferNumber(potentialNum) {
	var numAttempt = parseFloat(potentialNum);
	if (typeof potentialNum === 'number') {
		return potentialNum;
	} else if (isNaN(numAttempt)) {
		console.log("Please check the rates given in the markupPercentages - can't read one of the rates as a number. For now, it is assumed to be 0");
		return 0
	} else {
		return numAttempt;
	}
}

function convertMarkupRulesToDecimals(originalRates) {
	var decimalRates = {};

	decimalRates.flatMarkup = convertPercentToDecimal(originalRates.flatMarkup);
	decimalRates.perPersonMarkup = convertPercentToDecimal(originalRates.perPersonMarkup);
	decimalRates.byCategory = {};

	var categories = originalRates.byCategory;

	for (var category in categories) {
    if (categories.hasOwnProperty(category)) {
		decimalRates.byCategory[category] = convertPercentToDecimal(categories[category]);
    }
}
	// console.log(markupPercentages);
	// console.log(decimalRates);
	return decimalRates;
}

function convertPercentToDecimal(percent) { // check this
	return percent * 0.01;
}

function getMarkupRates() {
	return rates;
}

module.exports.convertPercentToDecimal = convertPercentToDecimal;
module.exports.getMarkupRates = getMarkupRates;
module.exports.convertMarkupRulesToDecimals = convertMarkupRulesToDecimals;
module.exports.rates = rates;
module.exports.inferNumber = inferNumber;
