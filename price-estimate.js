var rates = require('./markup-rates.js').rates;
// var rates = import rates from "markup-rates";

function estimatePrice(base, people, productType) {
	// 1. Extract info
	var baseNum = convertBaseIntoNumber(base);
	var peopleNum = convertPeopleInfoIntoNumber(people);
	var productRate = findProductTypeRate(rates.byCategory, productType);

	// 2. Calculate the price estimate
	var runningPrice = 0;
	// add base price
	runningPrice += baseNum;

	// add flat markup
	var flatMarkup = getFlatMarkup(baseNum, rates.flatMarkup);
	var priceWithFlat = baseNum + flatMarkup;

	runningPrice += flatMarkup;

	// add labour cost
	runningPrice += getLabourCost(priceWithFlat, rates.perPersonMarkup, peopleNum);

	runningPrice += getProductTypeMarkup(priceWithFlat, productRate);

	// 3. Format the result and return it
	var finalPrice = formatPriceResult(runningPrice);

	// before returning there should be a function to make it back into a string
	return finalPrice;
}

function getRidOfCommasInString(str) {
	return str.split("").filter(function(char) {
		return char !== ',';
	}).join("");
}

function convertBaseIntoNumber(base) {
	if (typeof base === 'number') {
		return base;
	}

	var numString;
	if (typeof base === 'string') {
		numString = base.substr(1, base.length-1);
	}
	// before parsing, make sure there are no floats.
	numString = getRidOfCommasInString(numString);

	var numAttempt = parseFloat(numString);

	if (isNaN(numAttempt)) {
		console.log("Please check the base price you're entering. Couldn't infer the right number, and assumed it to be 0 until fixed.");
		return 0;
	}

	return numAttempt;
}

function convertPeopleInfoIntoNumber(numPeople) {
	var attemptNumber = parseInt(numPeople);
	if (isNaN(attemptNumber)) {
		return 0;
	}
	return attemptNumber;
}

function findProductTypeRate(categories, productType) {
	if (typeof categories[productType] === "undefined" || productType === 'other') {
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
	var numTwoDecimals = roundToTwoDecimalPlaces(num);
	// var numberWithCommas =
	return '$' + formatNumberStringWithCommas("" + numTwoDecimals) + formatDecimalsForWhole;
}

function getLabourCost(priceWithBase, rate, numPeople) {
	// a bit more elaborate version to deal with extra cents when rounding:
	// var singlePerson = getSinglePersonLabourCost(priceWithBase, rate);
	//return singlePerson * numPeople;

	return roundToTwoDecimalPlaces(priceWithBase * rate * numPeople);
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

function formatNumberStringWithCommas(numStr) {
	var decimalPart = "";
	var base;
	if (numStr.indexOf('.') !== -1) {
		decimalPart = numStr.substr(numStr.indexOf('.'));
		base = numStr.substr(0, numStr.indexOf('.'));
	}
	else {
		//decimalPart = ".00";
		base = numStr;
	}

	var newBaseArr = [];

	var baseArr = base.split("");
	baseArr.reverse();

	for (var i = 0; i < baseArr.length; i++) {
		newBaseArr.push(baseArr[i]);
		var itemNumber = i+1;
		if ((i+1) % 3 === 0) {
			if (i !== baseArr.length-1) {
				newBaseArr.push(',');
			}
		}
	}

	var newBase = newBaseArr.reverse().join("");
	var numWithCommas = newBase + decimalPart;
	return numWithCommas;
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
module.exports.getRidOfCommasInString = getRidOfCommasInString;
module.exports.formatNumberStringWithCommas = formatNumberStringWithCommas;
