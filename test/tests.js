var index = require('../index');
var should = require('chai').should();
var expect = require('chai').expect;

describe("index", function(){
    describe("builder", function(){
        it("should not accept null arguments", function(){
            var fn = function () {index.builder()
                .capital()
                .tolerableRiskInPercentOfCapitalPerTrade()
                .direction()
                .pricePerUnit()
                .stopLossPricePerUnit()};
            expect(fn).to.throw(TypeError);
        });
        it("should not accept zero arguments", function(){
            var fn = function () {index.builder()
                .capital(0)
                .tolerableRiskInPercentOfCapitalPerTrade(0)
                .direction('long')
                .pricePerUnit(0)
                .stopLossPricePerUnit(0)};
            expect(fn).to.throw(TypeError);
        });
        it("should not accept negative arguments", function(){
            var fn = function () {index.builder()
                .capital(-1)
                .tolerableRiskInPercentOfCapitalPerTrade(-1)
                .direction('long')
                .pricePerUnit(-1)
                .stopLossPricePerUnit(-1)};
            expect(fn).to.throw(TypeError);
        });
        it("should require tolerable risk in percent of capital to be less than 100", function(){
            var fn = function () {index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(100)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24)};
            expect(fn).to.throw(TypeError);
        });
        it("should require direction to be long or short 1", function(){
            var fn = function () {index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction(0)
                .pricePerUnit(25)
                .stopLossPricePerUnit(24)};
            expect(fn).to.throw(TypeError);
        });
        it("should require direction to be long or short 2", function(){
            var fn = function () {index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('blah')
                .pricePerUnit(25)
                .stopLossPricePerUnit(24)};
            expect(fn).to.throw(TypeError);
        });
        it("should require stop loss price to be lower than price when long", function(){
            var fn = function () {index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('long')
                .pricePerUnit(25)
                .stopLossPricePerUnit(26)};
            expect(fn).to.throw(TypeError);
        });
        it("should require stop loss price to be higher than price when short", function(){
            var fn = function () {index.builder()
                .capital(10000)
                .tolerableRiskInPercentOfCapitalPerTrade(2)
                .direction('short')
                .pricePerUnit(26)
                .stopLossPricePerUnit(25)};
            expect(fn).to.throw(TypeError);
        });
        it("should reflect arguments long", function(){
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
        it("should reflect arguments short", function(){
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