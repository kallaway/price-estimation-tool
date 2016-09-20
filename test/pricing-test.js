var expect = require('chai').expect;

// import price-estimate file
var priceEstimation = require('../price-estimate.js');

// import the rates

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

	it('should round to two decimal numbers to represent cents', function() {
		expect(getLabourCost())
	});

	it('should be able to find the cost if given a number for number of people', function() {
		expect(getLabourCost(examplePrice, exampleLabourRate, 5)).to.equal(1000);
	});

	it('should be able to find the cost if given a string for number of people', function() {
		expect(getLabourCost(examplePrice, exampleLabourRate, '4 people')).to.equal(800);
		expect(getLabourCost(examplePrice, exampleLabourRate, '7')).to.equal(1400);
	});

});

describe('getFlatMarkup', function() {
	var getFlarMarkup = priceEstimation.getFlatMarkup;
	// args: price, rate
	var exampleFlatMarkup = 0.085;
	it('should round to two decimal numbers to represent cents', function() { // ?
		expect(getFlatMarkup(21451.30, exampleFlatMarkup)).to.equal(1823.36);
	});

	it('should calculate the result correctly based on a given markup rate', function() {
		expect(getFlatMarkup(33321.99, exampleFlatMarkup)).to.equal(2832.37);
	});
});

describe('getProductTypeMarkup', function() {

});


describe('estimatePrice', function() {
	// args: base, people, productType


	it('should format the result as currency', function() {

	});

	it('should return a string', function() {
		expect(estimatePrice());
	});


});
