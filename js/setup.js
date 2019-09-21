'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор',
  'Юлия', 'Люпита', 'Вашингтон'];
var names = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
  'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
  'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];


var randomSort = function () {
  return Math.random() - 0.5;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};
var getWizard = function () {
  var wizard = {};
  var _names = [firstNames[getRandomInt(firstNames.length)], names[getRandomInt(names.length)]];
  _names.sort(randomSort);
  wizard.name = _names.join(' ');

  wizard.coatColor = coatColors[getRandomInt(coatColors.length)];
  wizard.eyesColor = eyesColors[getRandomInt(eyesColors.length)];

  return wizard;
};

var getWizards = function () {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    var wizard = getWizard();
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

var getWizardElems = function () {
  var wizards = getWizards();
  var list = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    var elem = createWizardElem(wizards[i]);
    fragment.appendChild(elem);
  }

  list.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};

getWizardElems();
