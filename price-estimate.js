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
	console.log("*** RUNNING PRICE 1 IS " + runningPrice);

	runningPrice += getLabourCost(priceWithFlat);
	console.log("*** RUNNING PRICE 2 IS " + runningPrice);

	runningPrice += getProductTypeMarkup(priceWithFlat, productRate);
	console.log("*** RUNNING PRICE 3 IS " + runningPrice);

	// 3. Format the result and return it
	var finalPrice = formatPriceResult(runningPrice);
	console.log("*** FINAL PRICE IS " + finalPrice);

	// before returning there should be a function to make it back into a string
	return finalPrice;
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
	var flatMarkup = price * rate;
	return roundToTwoDecimalPlaces(flatMarkup);
}

function roundToTwoDecimalPlaces(num) {
	return Math.round(num * 100) / 100;
}

function formatPriceResult(num) {
	var numDecimalPart = num - Math.round(num);
	var formatDecimalsForWhole = numDecimalPart === 0 ? ".00" : "";
	return '$' + roundToTwoDecimalPlaces(num) + formatDecimalsForWhole;
}

function getLabourCost(priceWithBase, rate, numPeople) {  // rename to something like getStaffMarkup
	var singlePerson = getSinglePersonLabourCost(priceWithBase, rate);
	return singlePerson * numPeople;
}
// this is done to account for losing cents when rounding off
// the cost for multiple people
function getSinglePersonLabourCost(price, rate) {
	var singlePersonMarkup = price * rate;
	return roundToTwoDecimalPlaces(singlePersonMarkup);
}

function getProductTypeMarkup(priceWithBase, productRate) {
	var productMarkup = priceWithBase * productRate;
	return roundToTwoDecimalPlaces(productMarkup);
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
