(function() {
  var wrapper = document.getElementsByClassName('goal-wrapper')[0];

  $('.goal__details > span').tooltip();

  var addButtons = wrapper.getElementsByClassName('add-goal');
  var displayPickedGoal = function() {
    var picked = this.dataset.picked;
    wrapper.getElementsByClassName('picked--' + picked)[0].classList.add('picked--show');
    wrapper.getElementsByClassName('goal--' + picked)[0].classList.add('goal--hide');
  };

  for(var i=0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', displayPickedGoal);
  }

  var deleteButtons = wrapper.getElementsByClassName('delete-goal');
  var hidePickedGoal = function() {
    var goal = this.dataset.goal;
    wrapper.getElementsByClassName('picked--' + goal)[0].classList.remove('picked--show');
    wrapper.getElementsByClassName('goal--' + goal)[0].classList.remove('goal--hide');
  };

  for(var i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', hidePickedGoal);
  }

  var pickedContainer = wrapper.getElementsByClassName('picked-goals')[0];
  dragula([pickedContainer]);

  $('.goal__date__picker').datepicker({
    autoclose: true,
    format: 'M d yyyy'
  });

  var continueButton = wrapper.getElementsByClassName('continue')[0],
    pickedGoals;
  continueButton.addEventListener('click', function() {
    gModel.pickedGoals = [];
    pickedGoals = wrapper.getElementsByClassName('picked--show');
    for(var i=0; i < pickedGoals.length; i++) {
      gModel.pickedGoals.push({
        name: pickedGoals[i].lastElementChild.dataset.goal,
        date: pickedGoals[i].getElementsByClassName('goal__date__picker')[0].value
      });
    }
    console.log(gModel.pickedGoals);
  });
})();
