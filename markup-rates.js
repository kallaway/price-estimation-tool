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

var rates = {};

function convertMarkupRulesToDecimals() {

}

function convertPercentToDecimal(percent) { // change to percentToDecimal?

}

function getMarkupRates() {

}

module.exports.convertPercentToDecimal = convertPercentToDecimal;
module.exports.getMarkupRates = getMarkupRates;
module.exports.convertMarkupRulesToDecimals = convertMarkupRulesToDecimals;
