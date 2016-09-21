var expect = require('chai').expect;
var rates = require('../markup-rates.js').rates;
var priceEstimation = require('../price-estimate.js');

describe('sanity check - test mocha', function() {
	it('should run tests with npm', function() {
		expect(true).to.be.ok;
	});
});


// function to calculate price with base markup
describe('getLabourCost', function() {
	var getLabourCost = priceEstimation.getLabourCost;
	// args: price, rate, people

	// give base with flat markup applied as an example
	var exampleLabourRate = 0.02;
	var examplePrice = 10000;
	var examplePeopleNum = 5;

	it('should be a number', function() {
		expect(getLabourCost(examplePrice, exampleLabourRate, 9)).to.be.a('number');
	});

	it('should calculate the value correctly', function() {
		expect(getLabourCost(examplePrice, exampleLabourRate, examplePeopleNums)).to.equal(1000);
	});

	it('should round to two decimal numbers to represent cents', function() {
		// the off cent is accounted for by getSinglePersonLabourCost function
		expect(getLabourCost(8132, 0.019, 4)).to.equal(618.04);
		var resultHundred = getLabourCost(8132, 0.019, 4) * 100;
		var difference = resultHundred - Math.round(resultHundred);
		expect(difference).to.equal(0);
	});

});

describe('getSinglePersonLabourCost', function() {
	var getSinglePersonLabourCost = priceEstimation.getSinglePersonLabourCost;
	var priceExample = 10000;
	var rateExample = 0.02;

	it('should return a number', function() {
		expect(getSinglePersonLabourCost(priceExample, rateExample)).to.be.a('number');
	});

	it('should perform a correct calculation', function() {
		expect(getSinglePersonLabourCost(priceExample, rateExample)).to.equal(200);
	});

	it('should round the answer off to 2 decimal numbers', function() {
		expect(getSinglePersonLabourCost(3456, 0.015)).to.equal(549.62);
		var resultHundred = getSinglePersonLabourCost(34567, 0.0159) * 100;
		var difference = resultHundred - Math.round(resultHundred);
		expect(difference).to.equal(0);
	})
});

// OK
describe('getFlatMarkup', function() {
	var getFlarMarkup = priceEstimation.getFlatMarkup;
	// args: price, rate
	var exampleFlatMarkup = 0.085;

	it('should be a number', function() {
		expect(getFlatMarkup(5000, exampleFlatMarkup)).to.be.a('number');
	});

	it('should round to two decimal points to represent cents', function() { // ?
		expect(getFlatMarkup(21451.30, exampleFlatMarkup)).to.equal(1823.36);
		var resultHundred = getFlatMarkup(21451.30, exampleFlatMarkup) * 100;
		var difference = resultHundred - Math.round(resultHundred);
		expect(difference).to.equal(0);
	});

	it('should calculate the result correctly based on a given markup rate', function() {
		expect(getFlatMarkup(33321.99, exampleFlatMarkup)).to.equal(2832.37);
	});
});

// OK
describe('getProductTypeMarkup', function() {
	var getProductTypeMarkup = priceEstimation.getProductTypeMarkup;
	// args: price, productRate
	var examplePrice = 1000;
	var exampleProductRate = 0.03;

	it('should be a number', function() {
		expect(getProductTypeMarkup(examplePrice, exampleProductRate)).to.be.a('number');
	});

	it('should calculate the value correctly', function() {
		expect(getProductTypeMarkup(1000, 0.01)).to.equal(10);
	});

	it('should round the answer to 2 decimal points to represent cents', function() {
		expect(getProductTypeMarkup(999, 0.0132)).to.equal(13.19);
		var resultHundred = getProductTypeMarkup(999, 0.0132) * 100;
		var difference = resultHundred - Math.round(resultHundred);
		expect(difference).to.equal(0);
	});

});

// OK
describe('convertBaseIntoNumber', function() {
	var convertBaseIntoNumber = priceEstimation.convertBaseIntoNumber;
	it('should return a number', function() {
		expect(convertBaseIntoNumber('$1000.00')).to.be.a('number');
		expect(convertBaseIntoNumber(2500)).to.be.a('number');
	});

	it('should infer the corect base price from given info', function() {
		expect(convertPeopleInfoIntoNumber('$3500.50')).to.equal(3500.50);
		expect(convertPeopleInfoIntoNumber('$5000')).to.equal(5000);
		expect(convertPeopleInfoIntoNumber(2500)).to.equal(2500);
		expect(convertPeopleInfoIntoNumber(700.95)).to.equal(700.95);
	});
});

// OK
describe('convertPeopleInfoIntoNumber', function() {
	var convertPeopleInfoIntoNumber = priceEstimation.convertPeopleInfoIntoNumber;
	it('should return a number', function() {
		expect(convertPeopleInfoIntoNumber('3 people')).to.be.a('number');
		expect(convertPeopleInfoIntoNumber(10)).to.be.a('number');
	});

	it('should infer the right number of people from given info', function() {
		expect(convertPeopleInfoIntoNumber('4 people')).to.equal(4);
		expect(convertPeopleInfoIntoNumber('1 person')).to.equal(1);
		expect(convertPeopleInfoIntoNumber('7')).to.equal(7);
		expect(convertPeopleInfoIntoNumber(3)).to.equal(3);
	});

	it('should return zero if it the number of people cannot be inferred', function() {
		expect(convertPeopleInfoIntoNumber('none')).to.equal(0);
		expect(convertPeopleInfoIntoNumber('abcd')).to.equal(0);
	});
});

// OK
describe('findProductTypeRate', function() {
	var findProductTypeRate = priceEstimation.findProductTypeRate;
	var exampleCategories = {
		'food': 0.07,
		'electronics': 0.05,
		'drugs': 0.03,
		'other': 0.02
	};

	it('should return a number', function() {
		expect(findProductTypeRate(exampleCategories, 'food')).to.be.a('number')
	});

	it('should return the right rate from the info object', function() {
		expect(findProductTypeRate(exampleCategories, 'electronics').to.equal(0.05));
	});

	it('should return "other" rate for anything other than the specified rules', function() {
		expect(findProductTypeRate(exampleCategories, 'vehicle').to.equal(0.02));
		expect(findProductTypeRate(exampleCategories, 'sand').to.equal(0.02));
	});

});

// OK
describe('formatPriceResult', function() {
	var formatPriceResult = priceEstimation.formatPriceResult;

	it('should return a string', function() {
		expect(formatPriceResult(3500.50)).to.be.a('string');
	})

	it('should be formatted as a currency', function() {
		expect(formatPriceResult(2500.75)[0]).to.equal('$');
	});

	it('should have cents as 2 decimal points for the cases when there are 0 cents', function() {
		expect(formatPriceResult(3000)).to.equal('$3000.00');
	});
});

describe('estimatePrice', function() {
	// args: base, people, productType
	var baseExample = '$5000.00';
	var peopleExample = '4 people';
	var productType = 'food';

	// extra checks
	it('should format the result as currency', function() {
		expect(estimatePrice('3000', '3 people', 'food')[0]).to.equal('$');
	});

	it('should be rounded to 2 decimal points', function() {
		var decimalPart = estimatePrice(baseExample, peopleExample, productType);
		decimalPart = decimalPart.substring(decimalPart.indexOf('.'));
		expect(decimalPart.length).to.equal(2);
	});

	it('should return a string', function() {
		expect(estimatePrice()).to.be.a('string');
	});

	// Test cases given:

	it('should return the right price for examples given in the problem description', function() {
		expect(estimatePrice('$1,299.99', '3 people', 'food')).to.equal('$1,591.58');
		expect(estimatePrice('$5,432.00', '1 person', 'drugs')).to.equal('$6,199.81');
		expect(estimatePrice('$12,456.95', '4 people', 'books')).to.equal('$13,707.63');
	});


});
