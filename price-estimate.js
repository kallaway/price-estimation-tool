var rates = require('./markup-rates.js').rates;
// var rates = import rates from "markup-rates";


function estimatePrice(base, people, productType) {
	// 1. Extract info
	var baseNum = convertBaseIntoNumber(base);
	var peopleNum = convertPeopleInfoIntoNumber(people);
	var productRate = findProductTypeRate(productType);

	// 2. Calculate the price estimate
	var runningPrice = 0;
	// add base price
	runningPrice += baseNum;
	// add flat markup
	var flatMarkup = getFlatMarkup(baseNum, rates.flatMarkup);
	var priceWithFlat = baseNum + flatMarkup;

	// add flat markup
	runningPrice += flatMarkup;

	runningPrice += getLabourCost(priceWithFlat);

	runningPrice += getProductTypeMarkup(priceWithFlat, productRate);

	// 3. Format the result and return it

	// before returning there should be a function to make it back into a string
	return runningPrice;
}

function convertBaseIntoNumber(base) {
	var numString = base[0] === "$" ? base.substring(1) : base;
	var num = parseFloat(numString);

	return num;
}

function convertPeopleInfoIntoNumber(numPeople) {
	var attemptNumber = parseInt(numPeople);
	if (isNaN(attemptNumber)) {
		return 0;
	}
	return attemptNumber;
}

function findProductTypeRate(categories, productType) {
	if (categories[productType] === undefined) {
		return categories.other;
	}
	return categories[productType];
}

function getFlatMarkup(price, rate) {
	return roundToTwoDecimalPlaces(price * rate);
}

function roundToTwoDecimalPlaces(num) {
	return Math.round(num * 100) / 100;
}

function formatPriceResult() {

}

function getLabourCost(price, rate, people) {  // rename to something like getStaffMarkup
	return 1000;
}
// this is done to account for losing cents when rounding off
// the cost for multiple people
function getSinglePersonLabourCost(price, rate) {

}

function getProductTypeMarkup(price, productRate) {

}

module.exports.estimatePrice = estimatePrice;
module.exports.getFlatMarkup = getFlatMarkup;
module.exports.getLabourCost = getLabourCost;
module.exports.getProductTypeMarkup = getProductTypeMarkup;
module.exports.getSinglePersonLabourCost = getSinglePersonLabourCost;
module.exports.convertBaseIntoNumber = convertBaseIntoNumber;
module.exports.convertPeopleInfoIntoNumber = convertPeopleInfoIntoNumber;
module.exports.findProductTypeRate = findProductTypeRate;
module.exports.formatPriceResult = formatPriceResult;
module.exports.roundToTwoDecimalPlaces = roundToTwoDecimalPlaces;
