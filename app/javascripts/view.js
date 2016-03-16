'use strict';

var viewsNames = [
  'about',
  'expenses',
  'comparison',
  'scenarios',
  'goal',
  'plan',
  'reminders'
];
var views = [
  require('./views/about'),
  require('./views/expenses'),
  require('./views/comparison'),
  require('./views/scenarios'),
  require('./views/goal'),
  require('./views/plan'),
  require('./views/reminders'),
  require('./views/nav'),
  require('./views/continue')
];

var getViews = function() {
  return views;
};

var init = function() {
  views.forEach(function(view, index) {
    var container = index < 7? document.get('step--' + viewsNames[index]) : null;
    view.setStateMap(container);
  });
};

module.exports = {
  init: init,
  getViews: getViews
};