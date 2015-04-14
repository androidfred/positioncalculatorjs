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
                !(newDirection.toLowerCase() === 'long' || newDirection.toLowerCase() === 'short')){
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
            if (position.getDirection().toLowerCase() === 'long' && position.getPricePerUnit() <= newStopLossPricePerUnit){
                throw new TypeError('stop loss price per unit must be lower than price per unit when long');
            }
            if (position.getDirection().toLowerCase() === 'short' && position.getPricePerUnit() >= newStopLossPricePerUnit){
                throw new TypeError('stop loss price per unit must be higher than price per unit when short');
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