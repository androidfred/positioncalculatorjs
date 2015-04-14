positioncalculatorjs
=========

Trading calculator for fixed percent risk position sizing (ported from Java code found at https://github.com/androidfred/positioncalculator)

## Installation

  npm install positioncalculatorjs --save

## Usage

  var positioncalculatorjs = require('positioncalculatorjs')
  
  var position = positioncalculatorjs.builder()
    .capital(10000)
    .tolerableRiskInPercentOfCapitalPerTrade(2)
    .direction('long')
    .pricePerUnit(25)
    .stopLossPricePerUnit(24);
  
  position.getUnitsToBuy();
  position.getTotal();
  position.getTotalTolerableRiskPerTrade();
  position.getStopLossPerUnitLoss();
  position.getStopLossTotalLoss();

## Tests

  gulp test