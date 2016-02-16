/**
 * Screen #3 - You module
 * @module 3-you
 */

'use strict';

var helpers = require('../helpers');
var wNumb = require('wNumb');
var $ = require('jQuery');
var Chartist = require('chartist');

var configMap = {
  aboutIncome: 60000,
  basicSlider: 'about__savings__slider--needs',
  expensesSlider: 'about__savings__slider--expenses',
  savingsSlider: 'current-savings__slider',
  //Slider options
  needsOptions: {
    start: 45,
    step: 1,
    range: {
      'min': 1,
      'max': 70
    },
    format: wNumb({
      decimals: 0
    })
  },
  expensesOptions: {
    start: 25,
    step: 1,
    range: {
      'min': 1,
      'max': 70
    },
    format: wNumb({
      decimals: 0
    })
  },
  savingsOptions: {
    start: 10000,
    step: 1000,
    range: {
      'min': 1000,
      'max': 500000
    },
    format: wNumb({
      decimals: 1,
      thousand: '.'
    })
  },
  //Doughnut options
  doughnutClass: 'about__savings__circle',
  doughnutData: {
    series: [
      {
        value: 45,
        name: 'Basic Needs'
      },
      {
        value: 25,
        name: 'Discretionary'
      },
      {
        value: 30,
        name: 'Savings'
      }
    ]
  },
  doughnutOptions: {
    donut: true,
    donutWidth: 20,
    chartPadding: 10,
    labelOffset: 50,
    width: '220px',
    height: '220px'
  },
  doughnutResponsiveOptions: [
    ['screen and (max-width: 480px)', {
      width: '170px',
      height: '170px'
    }]
  ]
};

var stateMap = {
  $pieChart: null,
  basicSlider: null,
  expensesSlider: null,
  savingsSlider: null
};

// Variables by reference
var basicRate = configMap.doughnutData.series[0];
var discRate = configMap.doughnutData.series[1];
var savingsRate = configMap.doughnutData.series[2];


////////////////////
// PURE FUNCTIONS //
////////////////////

/**
 * Returns if the rate value is valid, that is not superior to 100 if summed with
 * the other rate
 * @param  {[type]} type [description]
 * @param  {[type]} value [description]
 * @return {[type]}
 */
var isRateValid = function(type, value) {
  if(typeof value !== 'number') {
    throw new Error('isRateValid(): wrong param: ' + JSON.stringify(value));
  }

  if( (type === 'basic') && (value + discRate.value > 100) ) {
    return false;
  }
  if( (type === 'discretionary') && (value + basicRate.value > 100) ) {
    return false;
  }

  return true;
};

////////////////////
// DOM FUNCTIONS ///
////////////////////


var onChartDraw = function(data) {
  if (data.type === 'slice') {
    var pathLength = data.element._node.getTotalLength();
    data.element.attr({
      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
    });
    var animationDefinition = {
      'stroke-dashoffset': {
        id: 'anim' + data.index,
        dur: 1000,
        from: -pathLength + 'px',
        to: '0px',
        easing: Chartist.Svg.Easing.easeOutQuint,
        fill: 'freeze'
      }
    };

    if (data.index !== 0) {
      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
    }

    data.element.attr({
      'stroke-dashoffset': -pathLength + 'px'
    });
    data.element.animate(animationDefinition, false);
  }
};

var createDoughnutTooltip = function() {
  var $chart = $('.' + configMap.doughnutClass), //@FIXME isn't it stateMap.$pieChart?
    $toolTip = $chart
    .append('<div class="pie-tooltip"></div>')
    .find('.pie-tooltip')
    .hide();
  var moneyFormat = wNumb({
    thousand: '.',
    prefix: '$ '
  });

  var isTooltipShown = false;

  $chart.on('mouseenter', '.ct-slice-donut', function() {
    var $slice = $(this),
      value = $slice.attr('ct:value'),
      seriesName = $slice.parent().attr('ct:series-name');
    $toolTip.html('<strong>' + seriesName + '</strong>: ' + value + '%/ ' +
      moneyFormat.to(Number(value) / 100 * configMap.aboutIncome)).show();
  });

  //For mobiles
  $chart.on('click', '.ct-slice-donut', function() {
    if (!isTooltipShown) {
      var $slice = $(this),
        value = $slice.attr('ct:value'),
        seriesName = $slice.parent().attr('ct:series-name');
      $toolTip.html('<strong>' + seriesName + '</strong>: ' + value + '%/ ' +
        moneyFormat.to(Number(value) / 100 * configMap.aboutIncome)).show();
      isTooltipShown = true;
    } else {
      $toolTip.hide();
      isTooltipShown = false;
    }
  });

  $chart.on('mouseleave', '.ct-slice-donut', function() {
    $toolTip.hide();
  });

  $chart.on('mousemove', function(event) {
    $toolTip.css({
      left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
      top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 30
    });
  });
};

var createChart = function(htmlNode) {
  stateMap.$pieChart = new Chartist.Pie(
    htmlNode,
    configMap.doughnutData,
    configMap.doughnutOptions,
    configMap.doughnutResponsiveOptions);

  stateMap.$pieChart.on('draw', onChartDraw);
  createDoughnutTooltip();
};


/**
 * Update the view of the Doughnut when sliders value change
 * @param {string} slider The name of the slider which changed
 */
var updateDOMDoughnut = function(slider, value) {
  if (slider === 'basicSlider') {
    basicRate.value = value;
  } else {
    discRate.value = value;
  }
  savingsRate.value = 100 - basicRate.value - discRate.value;
  stateMap.$pieChart.update();
};


//////////////////////
// PUBLIC FUNCTIONS //
//////////////////////


/**
 * Used by shell to bind event handlers to this module DOM events. It usually
 * means that we want the shell to update model when user interacts with this
 * screen.
 */
var bind = function(event, handler) {
  if (event === 'basicNeedsChanged') {
    stateMap.basicSlider.noUiSlider.on('set', function(values) {
      var value = Number(values[0]);
      if(isRateValid('basic', value)) {
        updateDOMDoughnut('basicSlider', value);
        handler(basicRate.value, savingsRate.value);
      } else {
        helpers.makeError('Error: the sum of basic & discretionary rates are superior than 100');
        this.set(basicRate.value);
      }
    });
  } else if (event === 'expensesChanged') {
    stateMap.expensesSlider.noUiSlider.on('set', function(values) {
      var value = Number(values[0]);
      if(isRateValid('discretionary', value)) {
        updateDOMDoughnut('expensesSlider', value);
        handler(discRate.value, savingsRate.value);
      } else {
        helpers.makeError('Error: the sum of basic & discretionary rates are superior than 100');
        this.set(discRate.value);
      }
    });
  } else if (event === 'savingsChanged') {
    stateMap.savingsSlider.noUiSlider.on('set', function(values) {
      handler(Number(values[0].replace('.', '')));
    });
  }
};

var configModule = function(inputMap) {
  helpers.setConfigMap(inputMap, configMap);
};

/**
 * Used by shell to set the sliders values when data is changed on some other
 * screens, for example the income.
 * @param  {string} slider Slider name
 * @param  {string} value Value
 */
var setSlider = function(slider, value) {
  if (slider === 'basic') {
    stateMap.basicSlider.noUiSlider.set(value);
  } else if (slider === 'discretionary') {
    stateMap.expensesSlider.noUiSlider.set(value);
  }
};

var init = function(container) {
  stateMap.basicSlider = container.getElementsByClassName(configMap.basicSlider)[0];
  stateMap.expensesSlider = container.getElementsByClassName(configMap.expensesSlider)[0];
  stateMap.savingsSlider = container.getElementsByClassName(configMap.savingsSlider)[0];
  var doughnutHtml = container.getElementsByClassName(configMap.doughnutClass)[0];

  //Create sliders
  helpers.createSlider(stateMap.basicSlider, configMap.needsOptions);
  stateMap.basicSlider.noUiSlider.on('update', function(values) {
    var tooltip = stateMap.basicSlider.getElementsByTagName('span')[0];
    tooltip.innerHTML = helpers.format(values[0], '%');
  });

  helpers.createSlider(stateMap.expensesSlider, configMap.expensesOptions);
  stateMap.expensesSlider.noUiSlider.on('update', function(values) {
    var tooltip = stateMap.expensesSlider.getElementsByTagName('span')[0];
    tooltip.innerHTML = helpers.format(values[0], '%');
  });

  helpers.createSlider(stateMap.savingsSlider, configMap.savingsOptions);
  stateMap.savingsSlider.noUiSlider.on('update', function(values) {
    var tooltip = stateMap.savingsSlider.getElementsByTagName('span')[0];
    tooltip.innerHTML = helpers.format(values[0], '$');
  });

  //Init Doughnut Chart
  createChart(doughnutHtml);

  window.basicSlider = stateMap.basicSlider.noUiSlider;
  window.expensesSlider = stateMap.expensesSlider.noUiSlider;
};

module.exports = {
  bind: bind,
  configModule: configModule,
  init: init,
  setSlider: setSlider
};
