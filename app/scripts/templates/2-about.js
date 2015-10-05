(function() {
  var wrapper = document.getElementsByClassName('about-wrapper')[0],
    ageSlider = wrapper.getElementsByClassName('about__age__slider')[0],
    incomeSlider = wrapper.getElementsByClassName('about__income__slider')[0];

  var ageOptions = {
    start: 35,
    step: 1,
    range: {
      'min': 18,
      'max': 70
    },
    pips: {
      mode: 'values',
      values: [20, 30, 40, 50, 60, 70],
      density: 5
    },
    format: wNumb({
      decimals: 1,
      thousand: '.'
    })
  },
  incomeOptions = {
    start: 60000,
    step: 1000,
    range: {
      'min': 18000,
      'max': 100000
    },
    format: wNumb({
      decimals: 1,
      thousand: '.'
    })
  };

  createSlider(ageSlider, ageOptions);
  ageSlider.noUiSlider.on('update', function( values ){
    var tooltip = ageSlider.getElementsByTagName('span')[0];
    tooltip.innerHTML = values[0];
    gModel.aboutAge = parseInt(values[0]);
  });

  createSlider(incomeSlider, incomeOptions);
  incomeSlider.noUiSlider.on('update', function( values ){
    var tooltip = incomeSlider.getElementsByTagName('span')[0];
    tooltip.innerHTML = values[0];
    gModel.aboutIncome = parseInt(values[0].replace('.', ''));
  });

  var continueButton = wrapper.getElementsByClassName('continue')[0];
  continueButton.addEventListener('click', function() {
    gModel.aboutSituation = wrapper.getElementsByClassName('about__select')[0].value;
    gModel.aboutLiving = wrapper.getElementsByClassName('about__select')[1].value;
    console.log(gModel);
  });
})();
