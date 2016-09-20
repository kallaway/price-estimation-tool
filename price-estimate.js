

function estimatePrice(base, people, productType) {
	// take base price

	var runningPrice = 0;
	var price = base;
	// add

	var priceAfterFlat = base + getFlatMarkup();



	return
}

function getFlatMarkup(price, rate) {

}

function getLabourCost(price, rate, people) {  // rename to something like getStaffMarkup

}

function getProductTypeMarkup(price, rate, productType) {

}

module.exports.estimatePrice = estimatePrice;
module.exports.getFlatMarkup = getFlatMarkup;
module.exports.getLabourCost = getLabourCost;
module.exports.getProductTypeMarkup = getProductTypeMarkup;
