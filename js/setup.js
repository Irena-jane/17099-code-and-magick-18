'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupSubmit = userDialog.querySelector('.setup-submit');
var form = userDialog.querySelector('form');


var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор',
  'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
  'Топольницкая', 'Нионго', 'Ирвинг'];
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

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');


var changeColor = function (e) {
  var target = e.target;
  var targetName = target.getAttribute('class').match(/coat|eyes|fireball/);
  var input = form.querySelector('input[name="' + targetName[0] + '-color"]');
  var colors = wizardColors[targetName];
  var color = colors[getRandomNum(colors.length)];
  if (target.tagName === 'DIV') {
    target.style.backgroundColor = color;
  } else {
    target.style.fill = color;
  }

  input.value = color;
};

wizardCoat.addEventListener('click', changeColor);
wizardEyes.addEventListener('click', changeColor);
wizardFireball.addEventListener('click', changeColor);

var popupOpen = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscHandler);

  setupClose.addEventListener('click', function () {
    popupClose();
  });

  setupClose.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      popupClose();
    }
  });

};
var popupClose = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscHandler);
};

var popupEscHandler = function (e) {
  if (e.keyCode === ESC_KEYCODE
    && document.activeElement !== document.querySelector('.setup-user-name')) {
    popupClose();
  }
};

setupOpen.addEventListener('click', function () {
  popupOpen();
});

setupOpen.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    popupOpen();
  }
});
setupSubmit.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    form.submit();
  }
});


var randomSort = function () {
  return Math.random() - 0.5;
};

var getRandomNum = function (max) {
  return Math.floor(Math.random() * max);
};

var createWizard = function () {
  var wizard = {};
  var _surnames = [firstNames[getRandomNum(firstNames.length)], surnames[getRandomNum(surnames.length)]];
  _surnames.sort(randomSort);
  wizard.name = _surnames.join(' ');

  wizard.coatColor = coatColors[getRandomNum(coatColors.length)];
  wizard.eyesColor = eyesColors[getRandomNum(eyesColors.length)];

  return wizard;
};

var createWizards = function () {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    var wizard = createWizard();
    wizards.push(wizard);
  }

  return wizards;
};

var createWizardElem = function (wizard) {

  var template = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var elem = template.cloneNode(true);

  var nameElem = elem.querySelector('.setup-similar-label');
  nameElem.textContent = wizard.name;

  var coatElem = elem.querySelector('.wizard-coat');
  coatElem.style.fill = wizard.coatColor;

  var eyesElem = elem.querySelector('.wizard-eyes');
  eyesElem.style.fill = wizard.eyesColor;

  return elem;
};

var createWizardElems = function () {
  var wizards = createWizards();
  var list = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    var elem = createWizardElem(wizards[i]);
    fragment.appendChild(elem);
  }

  list.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};

createWizardElems();

