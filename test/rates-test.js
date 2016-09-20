var expect = require('chai').expect;

describe('convertPercentToDecimal', function() {
	// is this needed?
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
