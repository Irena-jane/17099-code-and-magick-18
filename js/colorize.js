'use strict';

(function () {

  var getRandomNum = window.util['getRandomNum'];

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
    'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardColors = {
      'coat': coatColors,
      'eyes': eyesColors,
      'fireball': fireballColors
    };
    var colorize = function (e) {
      var target = e.target;
      var targetName = target.getAttribute('class').match(/coat|eyes|fireball/);
      var input = target.closest('form').querySelector('input[name="' + targetName[0] + '-color"]');
      var colors = wizardColors[targetName];
      var color = colors[getRandomNum(colors.length)];
      if (target.tagName === 'DIV') {
        target.style.backgroundColor = color;
      } else {
        target.style.fill = color;
      }

      input.value = color;
    };
  window.colorize = {
    wizardColors: wizardColors,
    colorize: colorize
  };

})();
