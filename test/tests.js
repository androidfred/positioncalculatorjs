var calculator = require('../index');
var should = require('chai').should();
var expect = require('chai').expect;

describe("calculator", function () {
    it("should not accept null arguments", function () {
        var fn = function () {
            calculator().calculate(null, null, null, null, null)
        };
        expect(fn).to.throw(TypeError, /direction must not be falsey/);
    });
    it("should not accept zero arguments", function () {
        var fn = function () {
            calculator().calculate(0, 0, 'long', 0, 0)
        };
        expect(fn).to.throw(TypeError, /All numbers must have positive signum/);
    });
    it("should not accept negative arguments", function () {
        var fn = function () {
            calculator().calculate(-1, -1, 'long', -1, -1)
        };
        expect(fn).to.throw(TypeError);
    });
    it("should require tolerable risk in percent of capital to be less than 100", function () {
        var fn = function () {
            calculator().calculate(1000, 100, 'long', 25, 24)
        };
        expect(fn).to.throw(TypeError);
    });
    it("should require direction to be a string", function () {
        var fn = function () {
            calculator().calculate(1000, 2, 0, 25, 24)
        };
        expect(fn).to.throw(TypeError, /direction must not be falsey/);
    });
    it("should not accept direction to be another string than either long or short", function () {
        var fn = function () {
            calculator().calculate(1000, 2, 'blah', 25, 24)
        };
        expect(fn).to.throw(TypeError, /direction must be either long or short/);
    });
    it("should require stop loss price to be lower than price when long", function () {
        var fn = function () {
            calculator().calculate(1000, 2, 'long', 25, 25)
        };
        expect(fn).to.throw(TypeError);
    });
    it("should require stop loss price to be higher than price when short", function () {
        var fn = function () {
            calculator().calculate(1000, 2, 'short', 25, 25)
        };
        expect(fn).to.throw(TypeError);
    });
    it("should calculate long position with integers", function () {
        var position = calculator().calculate(10000, 2, 'long', 25, 24);
        position.getUnitsToBuy().should.equal(200);
    });
    it("should calculate long position with decimals", function () {
        var position = calculator().calculate(9999, 2, 'long', 19.5, 17.3);
        position.getUnitsToBuy().should.equal(90);
    });
    it("should calculate short position with integers", function () {
        var position = calculator().calculate(10000, 2, 'short', 24, 25);
        position.getUnitsToBuy().should.equal(200);
    });
    it("should calculate short position with decimals", function () {
        var position = calculator().calculate(9999, 2, 'short', 17.3, 19.5);
        position.getUnitsToBuy().should.equal(90);
    });
    it("should require capital to be higher than total", function () {
        var position = calculator().calculate(10000, 2, 'long', 1000000, 999999);
        position.getUnitsToBuy().should.equal(0);
    });
    it("should return total tolerable risk per trade", function () {
        var position = calculator().calculate(10000, 2, 'long', 25, 24);
        position.getTotalTolerableRiskPerTrade().should.equal('200.00');
    });
    it("should return stop loss per unit loss", function () {
        var position = calculator().calculate(10000, 2, 'long', 25, 24);
        position.getStopLossPerUnitLoss().should.equal('1.00');
    });
    it("should return stop loss total loss", function () {
        var position = calculator().calculate(10000, 2, 'long', 25, 24);
        position.getStopLossTotalLoss().should.equal('200.00');
    });
    it("should return total", function () {
        var position = calculator().calculate(10000, 2, 'long', 25, 24);
        position.getTotal().should.equal('5000.00');
    });
});