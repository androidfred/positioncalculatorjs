//var Position = {
//    builder: function () {
//        var capital;
//
//        var position = {};
//
//        position.capital = function (newCapital) {
//            // validate
//            capital = newCapital;
//            return position;
//        }
//        position.getCapital = function () {
//            return capital;
//        }
//
//        return position;
//    }
//};
//
//var pos = Position.builder()
//    .capital(5);
//console.log(pos.getCapital());

//var Position = {
//    builder: function () {
//        var capital;
//        var tolerableRiskInPercentOfCapitalPerTrade;
//        var direction;
//        var pricePerUnit;
//        var stopLossPricePerUnit;
//
//        var position = {};
//
//        position.capital = function (newCapital) {
//            // validate
//            capital = newCapital;
//            return position;
//        }
//        position.getCapital = function () {
//            return capital;
//        }
//
//        position.tolerableRiskInPercentOfCapitalPerTrade = function (newTolerableRiskInPercentOfCapitalPerTrade){
//            //validate
//            tolerableRiskInPercentOfCapitalPerTrade = newTolerableRiskInPercentOfCapitalPerTrade;
//            return position;
//        }
//        position.getTolerableRiskInPercentOfCapitalPerTrade = function () {
//            return tolerableRiskInPercentOfCapitalPerTrade;
//        }
//
//        position.direction = function (newDirection) {
//            // validate
//            direction = newDirection;
//            return position;
//        }
//        position.getDirection = function () {
//            return direction;
//        }
//
//        position.pricePerUnit = function (pricePerUnit) {
//            // validate
//            pricePerUnit = newPricePerUnit;
//            return pricePerUnit;
//        }
//        position.getPricePerUnit = function () {
//            return pricePerUnit;
//        }
//
//        position.stopLossPricePerUnit = function (newStopLossPricePerUnit) {
//            // validate
//            stopLossPricePerUnit = newStopLossPricePerUnit;
//            return pricePerUnit;
//        }
//        position.getStopLossPricePerUnit = function () {
//            return stopLossPricePerUnit;
//        }
//
//        return position;
//    }
//};

//var pos = Position.builder()
//    .capital(5);
//console.log(pos.getCapital());


module.exports = {
    builder: function () {

        basicValidate = function (argument) {
            if (isNaN(argument) ||
                typeof argument !== 'number' ||
                argument < 0 ||
                argument == 0 ||
                !isFinite(argument)){
                    throw new TypeError('argument must be a number with positive signum');
            }
        };

        var capital;
        var tolerableRiskInPercentOfCapitalPerTrade;
        var direction;
        var pricePerUnit;
        var stopLossPricePerUnit;

        var position = {};

        position.capital = function (newCapital) {
            basicValidate(newCapital);
            capital = newCapital;
            return position;
        };
        position.getCapital = function () {
            return capital;
        };

        position.tolerableRiskInPercentOfCapitalPerTrade = function (newTolerableRiskInPercentOfCapitalPerTrade) {
            basicValidate(newTolerableRiskInPercentOfCapitalPerTrade);
            if (newTolerableRiskInPercentOfCapitalPerTrade >= 100){
                throw new TypeError('tolerable risk in percent of capital per trade must be less than 100');
            }
            tolerableRiskInPercentOfCapitalPerTrade = newTolerableRiskInPercentOfCapitalPerTrade;
            return position;
        };
        position.getTolerableRiskInPercentOfCapitalPerTrade = function () {
            return tolerableRiskInPercentOfCapitalPerTrade;
        };

        position.direction = function (newDirection) {
            if (!typeof newDirection == 'string' ||
                !newDirection instanceof String ||
                (!newDirection.toUpperCase() === 'long' || !newDirection.toUpperCase() === 'short')){
                    throw new TypeError('direction must be either long or short');
            }
            direction = newDirection;
            return position;
        };
        position.getDirection = function () {
            return direction;
        };

        position.pricePerUnit = function (newPricePerUnit) {
            basicValidate(newPricePerUnit);
            pricePerUnit = newPricePerUnit;
            return position;
        };
        position.getPricePerUnit = function () {
            return pricePerUnit;
        };

        position.stopLossPricePerUnit = function (newStopLossPricePerUnit) {
            basicValidate(newStopLossPricePerUnit);
            if (position.getDirection().toUpperCase() === 'long' && newStopLossPricePerUnit > position.getPricePerUnit){
                throw new TypeError('stop loss price per unit must be lower than price per unit when long');
            }
            if (position.getDirection().toUpperCase() === 'short' && newStopLossPricePerUnit < position.getPricePerUnit){
                throw new TypeError('stop loss price per unit must be higher than price per unit when long');
            }
            stopLossPricePerUnit = newStopLossPricePerUnit;
            return position;
        };
        position.getStopLossPricePerUnit = function () {
            return stopLossPricePerUnit;
        };

        return position;
    }


};


//module.exports = {
//    escape: function(html) {
//        return String(html)
//            .replace(/&/g, '&amp;')
//            .replace(/"/g, '&quot;')
//            .replace(/'/g, '&#39;')
//            .replace(/</g, '&lt;')
//            .replace(/>/g, '&gt;');
//    }
//};