app.views.pyramid = (function() {
  var configMap = {
    savingsId: '#pyramid-savings',
    basicId: '#pyramid-basic',
    discretiotionaryId: '#pyramid-discretionary',
    incomeId: '#pyramid-income',
    basicNeeds: 0,
    savings: 0,
    discretionaryExpenses: 0,
    aboutIncome: 0
  };

  var savingsText, basicText, discretionaryText, incomeText;

  /**
   * DOM FUNCTIONS
   */

  var updateLabels = function() {
    var moneyFormat = wNumb({
      thousand: ',',
      prefix: '$ '
    });

    savingsText.textContent = ' ' + moneyFormat.to(configMap.savings) + '/yr';
    basicText.textContent = moneyFormat.to(configMap.basicNeeds) + '/yr';
    discretionaryText.textContent = moneyFormat.to(configMap.discretionaryExpenses) + '/yr';
    incomeText.textContent = moneyFormat.to(configMap.aboutIncome) + '/yr';
  };

  /**
   * PUBLIC FUNCTIONS
   */

  var configModule = function(inputMap) {
    window.setConfigMap(inputMap, configMap);
  };

  var init = function(container) {
    savingsText = container.querySelector(configMap.savingsId);
    basicText = container.querySelector(configMap.basicId);
    discretionaryText = container.querySelector(configMap.discretiotionaryId);
    incomeText = container.querySelector(configMap.incomeId);

    updateLabels();
  };

  return {
    configModule: configModule,
    init: init,
    updateLabels: updateLabels
  };

})();
