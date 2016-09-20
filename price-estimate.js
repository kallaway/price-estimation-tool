var rates = require('markup-rates.js').rates;

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

function convertBaseIntoNumber() {

}

function convertPeopleInfoIntoNumber() {

}

function findProductTypeRate(categories, productType) {

}

function getFlatMarkup(price, rate) {

}

function formatPriceResult() {

}

function getLabourCost(price, rate, people) {  // rename to something like getStaffMarkup

}

function getProductTypeMarkup(price, productRate) {

}

module.exports.estimatePrice = estimatePrice;
module.exports.getFlatMarkup = getFlatMarkup;
module.exports.getLabourCost = getLabourCost;
module.exports.getProductTypeMarkup = getProductTypeMarkup;
