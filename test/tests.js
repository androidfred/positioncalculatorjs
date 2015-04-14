var index = require('../index');
var should = require('chai').should();
var expect = require('chai').expect;

describe("index", function () {
    describe("builder", function () {
        it("should not accept undefined arguments", function () {
            var fn = function () {
                index.builder()
                    .capital()
                    .tolerableRiskInPercentOfCapitalPerTrade()
                    .direction()
                    .pricePerUnit()
                    .stopLossPricePerUnit()
            };
            expect(fn).to.throw(TypeError, /argument must be a number with positive signum/);
        });
        it("should not accept null arguments", function () {
            var fn = function () {
                index.builder(null)
                    .capital(null)
                    .tolerableRiskInPercentOfCapitalPerTrade(null)
                    .direction(null)
                    .pricePerUnit(null)
                    .stopLossPricePerUnit(null)
            };
            expect(fn).to.throw(TypeError, /argument must be a number with positive signum/);
        });
        it("should not accept zero arguments", function () {
            var fn = function () {
                index.builder()
                    .capital(0)
                    .tolerableRiskInPercentOfCapitalPerTrade(0)
                    .direction('long')
                    .pricePerUnit(0)
                    .stopLossPricePerUnit(0)
            };
            expect(fn).to.throw(TypeError, /argument must be a number with positive signum/);
        });
        it("should not accept negative arguments", function () {
            var fn = function () {
                index.builder()
                    .capital(-1)
                    .tolerableRiskInPercentOfCapitalPerTrade(-1)
                    .direction('long')
                    .pricePerUnit(-1)
                    .stopLossPricePerUnit(-1)
            };
            expect(fn).to.throw(TypeError);
        });
        it("should require tolerable risk in percent of capital to be less than 100", function () {
            var fn = function () {
                index.builder()
                    .capital(10000)
                    .tolerableRiskInPercentOfCapitalPerTrade(100)
                    .direction('long')
                    .pricePerUnit(25)
                    .stopLossPricePerUnit(24)
            };
            expect(fn).to.throw(TypeError);
        });
        it("should not accept direction to be a number", function () {
            var fn = function () {
                index.builder()
                    .capital(10000)
                    .tolerableRiskInPercentOfCapitalPerTrade(2)
                    .direction(0)
                    .pricePerUnit(25)
                    .stopLossPricePerUnit(24)
            };
            expect(fn).to.throw(TypeError, /direction must not be falsey/);
        });
        it("should not accept direction to be null", function () {
            var fn = function () {
                index.builder()
                    .capital(10000)
                    .tolerableRiskInPercentOfCapitalPerTrade(2)
                    .direction()
                    .pricePerUnit(25)
                    .stopLossPricePerUnit(24)
            };
            expect(fn).to.throw(TypeError, /direction must not be falsey/);
        });
        it("should not accept direction to be another string than either long or short", function () {
            var fn = function () {
                index.builder()
                    .capital(10000)
                    .tolerableRiskInPercentOfCapitalPerTrade(2)
                    .direction('blah')
                    .pricePerUnit(25)
                    .stopLossPricePerUnit(24)
            };
            expect(fn).to.throw(TypeError, /direction must be either long or short/);
        });
        it("should require stop loss price to be lower than price when long", function () {
            var fn = function () {
                index.builder()
                    .capital(10000)
                    .tolerableRiskInPercentOfCapitalPerTrade(2)
                    .direction('long')
                    .pricePerUnit(25)
                    .stopLossPricePerUnit(25)
            };
            expect(fn).to.throw(TypeError);
        });
        it("should require stop loss price to be higher than price when short", function () {
            var fn = function () {
                index.builder()
                    .capital(10000)
                    .tolerableRiskInPercentOfCapitalPerTrade(2)
                    .direction('short')
                    .pricePerUnit(25)
                    .stopLossPricePerUnit(25)
            };
            expect(fn).to.throw(TypeError);
        });
        it("should calculate long position with integers", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24);
            position.getUnitsToBuy().should.equal(200);
        });
        it("should calculate long position with decimals", function () {
            var position = index.builder()
                .capital(9999)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(19.5)
                .stopLossPricePerUnit(17.3);
            position.getUnitsToBuy().should.equal(90);
        });
        it("should calculate short position with integers", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('short')
                .pricePerUnit(24)
                .stopLossPricePerUnit(25);
            position.getUnitsToBuy().should.equal(200);
        });
        it("should calculate short position with decimals", function () {
            var position = index.builder()
                .capital(9999)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('short')
                .pricePerUnit(17.3)
                .stopLossPricePerUnit(19.5);
            position.getUnitsToBuy().should.equal(90);
        });
        it("should require capital to be higher than total", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(1000000)
                .stopLossPricePerUnit(999999);
            position.getUnitsToBuy().should.equal(0);
        });
        it("should return total tolerable risk per trade", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24);
            position.getTotalTolerableRiskPerTrade().should.equal(200);
        });
        it("should return stop loss per unit loss", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24);
            position.getStopLossPerUnitLoss().should.equal(1);
        });
        it("should return stop loss total loss", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24);
            position.getStopLossTotalLoss().should.equal(200);
        });
        it("should return total", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24);
            position.getTotal().should.equal(5000);
        });
        it("should reflect arguments long", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24);
            position.getCapital().should.equal(10000);
            position.getTolerableRiskInPercentOfCapitalPerTrade().should.equal(2);
            position.getDirection().should.equal('long');
            position.getPricePerUnit().should.equal(25);
            position.getStopLossPricePerUnit().should.equal(24);
        });
        it("should reflect arguments short", function () {
            var position = index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('short')
                .pricePerUnit(24)
                .stopLossPricePerUnit(25);
            position.getCapital().should.equal(10000);
            position.getTolerableRiskInPercentOfCapitalPerTrade().should.equal(2);
            position.getDirection().should.equal('short');
            position.getPricePerUnit().should.equal(24);
            position.getStopLossPricePerUnit().should.equal(25);
        })
    })
});