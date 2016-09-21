var expect = require('chai').expect;

describe('convertPercentToDecimal', function() {
	// args: percent
	it('should return a number', function() { // check?
		expect(convertPercentToDecimal(10).to.be.a('number'));
	});

	it('should be able to work even if given the number in a string', function() {
		expect(convertPercentToDecimal('3').to.equal(0.03));
	});

	it('should calculate the value correctly', function() {
		expect(convertPercentToDecimal(5)).to.equal(0.05);
	});
});


describe('convertMarkupRulesToDecimals', function() {
	var exampleRates = {
		flatMarkup: 3,
		perPersonMarkup: 2.5,
		byCategory: {
			'food': 10,
			'electronics': 5,
			'drugs': 12,
			'other': 3
		}
	}

	it('should return an object', function() {
		expect(convertMarkupRulesToDecimals(exampleRates)).to.be.an('object');
	});

	it('the object should not be empty', function() {
		expect(convertMarkupRulesToDecimals(exampleRates)).to.not.be.empty;
	});

	it('should correctly calculate internal decimal representation of each rate', function() {
		expect(convertMarkupRulesToDecimals(exampleRates).flatMarkup).to.equal(0.03);
		expect(convertMarkupRulesToDecimals(exampleRates).perPersonMarkup).to.equal(0.025);
		expect(convertMarkupRulesToDecimals(exampleRates).byCategory.food).to.equal(0.1);
	});
});

describe('getMarkupRates', function() {
	it('should return an object', function() {
		expect(getMarkupRates()).to.be.an('object');
	});

	it('should return an object that is not empty', function() {
		expect(getMarkupRates()).to.not.be.empty;
	});
});
