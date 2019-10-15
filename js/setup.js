'use strict';


(function () {

  var load = window.backend['load'];
  //var onError = window.backend['onError'];

  var colorize = window.colorize['colorize'];

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  wizardCoat.addEventListener('click', colorize);
  wizardEyes.addEventListener('click', colorize);
  wizardFireball.addEventListener('click', colorize);

  var createWizardElem = function (wizard) {

    var template = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

    var elem = template.cloneNode(true);

    var nameElem = elem.querySelector('.setup-similar-label');
    nameElem.textContent = wizard.name;

    var coatElem = elem.querySelector('.wizard-coat');
    coatElem.style.fill = wizard.colorCoat;

    var eyesElem = elem.querySelector('.wizard-eyes');
    eyesElem.style.fill = wizard.colorEyes;

    return elem;
  };

  var onLoad = function (data) {
    var wizards = data;
    var list = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      var elem = createWizardElem(wizards[i]);
      fragment.appendChild(elem);
    }

    list.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  load(onLoad);

})();
