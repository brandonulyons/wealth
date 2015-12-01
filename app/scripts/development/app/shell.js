var app = window.app || {};

app.shell = (function(window) {
  var configMap = {

  };

  var init = function() {
    //Screen #2
    var aboutContainer = document.getElementsByClassName('about-wrapper')[0];
    app.views.about.init(aboutContainer);

    //Screen #3
    var youContainer = document.getElementsByClassName('you-wrapper')[0];
    app.views.you.init(youContainer);

    //Screen #5
    var pyramidContainer = document.getElementsByClassName('pyramid-wrapper')[0];
    app.views.pyramid.init(pyramidContainer);

    //Screen #6
    var scenariosContainer = document.getElementsByClassName('scenarios-wrapper')[0];
    app.views.scenarios.init(scenariosContainer);
  };

  return {
    init: init
  };

})(window);
