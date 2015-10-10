'use strict';
// var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

//Global variable with user data
//Defaul values
var gModel = {
  aboutAge: 20,
  aboutSituation: 'married',
  aboutLiving: 'rent',
  aboutIncome: 60000,
  aboutBasicRate: 45,
  aboutDiscretionaryRate: 25,
  aboutSavingsRate: 30,
  aboutStage: 'home',
  basicNeeds: 27000,
  discretionaryExpenses: 15000,
  savings: 18000,
  pickedGoals: [],
  savedActions: []
};

var TEMPLATE_CONTAINER = document.getElementsByClassName('main')[0];

for(var i=2; i<=9; i++) {
  runStepFunctions(i);
}

//Event delegation for changing template
var nav = document.querySelector('.nav ul');
nav.addEventListener('click', function(e) {
  var nodeName = e.target.nodeName,
      nextStep, nextStepElement;
  if (nodeName === 'SPAN') {
    nextStep = e.target.dataset.template;
    setActive(e.target.parentNode, 'active');
  } else if (nodeName === 'LI') {
    nextStep = e.target.firstElementChild.dataset.template;
    setActive(e.target, 'active');
  }
  nextStepElement = document.getElementsByClassName(nextStep + '-wrapper')[0];
  setActive(nextStepElement, 'show');
});

// Continue buttons to change to next step
var continueButtons = document.getElementsByClassName('continue');
for(var i = 0; i < continueButtons.length; i++) {
  continueButtons[i].addEventListener('click', function() {
    var nextStep = this.dataset.template,
      nextStepElement = document.getElementsByClassName(nextStep + '-wrapper')[0];

    setActive(nextStepElement, 'show');
    var newActiveNavLink = document.getElementsByClassName('active')[0].nextElementSibling;
    if(newActiveNavLink) {
      setActive(newActiveNavLink, 'active');
    }
  });
}

function runStepFunctions(stepNumber) {
  var script = document.createElement('script');
  if(stepNumber === 2) {
    script.src='scripts/templates/2-about.js';
  } else if(stepNumber === 3) {
    script.src='scripts/templates/3-you.js';
  } else if(stepNumber === 4) {
    script.src='scripts/templates/4-people.js';
  } else if(stepNumber === 5) {
    script.src='scripts/templates/5-pyramid.js';
  } else if(stepNumber === 6) {
    script.src='scripts/templates/6-scenarios.js';
  } else if(stepNumber === 7) {
    script.src='scripts/templates/7-goal.js';
  } else if(stepNumber === 8) {
    script.src='scripts/templates/8-retirement.js';
  } else if(stepNumber === 9) {
    script.src='scripts/templates/9-plan.js';
  }
  TEMPLATE_CONTAINER.appendChild(script);
}

// Set the active link on the navigation
function setActive(newActive, className) {
  var oldActive = document.getElementsByClassName(className)[0];
  oldActive.classList.remove(className);
  newActive.classList.add(className);
}

function createSlider(element, options) { //jshint ignore:line
  noUiSlider.create(element, options);
  element.handle = element.getElementsByClassName('noUi-handle')[0];
  element.tooltip = document.createElement('div');
  element.handle.appendChild(element.tooltip);

  element.tooltip.classList.add('slider-tooltip');
  element.tooltip.innerHTML = '<span></span>';
  element.tooltip = element.tooltip.firstElementChild;
}
