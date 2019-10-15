'use strict';

(function () {

  var save = window.backend['save'];
  // var onError = window.backend['onError'];

  var isEscEvent = window.util['isEscEvent'];
  var isEnterEvent = window.util['isEnterEvent'];

  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupSubmit = userDialog.querySelector('.setup-submit');
  var form = userDialog.querySelector('form');

  var startDialogTop = window.getComputedStyle(userDialog).top;


  var popupOpen = function () {
    userDialog.classList.remove('hidden');
    userDialog.style.left = Math.round(window.innerWidth / 2) + 'px';
    userDialog.style.top = startDialogTop;

    document.addEventListener('keydown', popupEscHandler);

    setupClose.addEventListener('click', function () {
      popupClose();
    });

    setupClose.addEventListener('keydown', function (e) {
      isEnterEvent(e, popupClose);
    });

  };
  var popupClose = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscHandler);
  };

  var popupEscHandler = function (e) {

    isEscEvent(e, function () {
      if (document.activeElement !== document.querySelector('.setup-user-name')) {
        popupClose();
      }
    });
  };

  setupOpen.addEventListener('click', function () {
    popupOpen();
  });

  setupOpen.addEventListener('keydown', function (e) {

    isEnterEvent(e, popupOpen);
  });

  var onLoad = function () {
    popupClose();
  };


  setupSubmit.addEventListener('keydown', function (e) {
    isEnterEvent(e, function () {
      // form.submit();
      save(new FormData(form), onLoad);
    });
  });

  form.addEventListener('submit', function (e) {
    save(new FormData(form), onLoad);
    e.preventDefault();
  });


  var dialogHandle = document.querySelector('.upload');

  var dialogMousedownHandler = function (e) {
    e.preventDefault();

    var isDraggable = false;
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var dialogMousemoveHandler = function (eMove) {
      eMove.preventDefault();
      isDraggable = true;
      var shift = {
        x: startCoords.x - eMove.clientX,
        y: startCoords.y - eMove.clientY
      };
      // console.log(eMove.clientX + ' - ' + startCoords.x + ' = ' + shift.x);
      // console.log(eMove.clientY + ' - ' + startCoords.y + ' = ' + shift.y);
      startCoords = {
        x: eMove.clientX,
        y: eMove.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

    };
    var dialogClickHandler = function (eClick) {
      eClick.preventDefault();
      dialogHandle.removeEventListener('click', dialogClickHandler);
    };
    var dialogMouseupHandler = function (eMouseup) {
      eMouseup.preventDefault();

      if (isDraggable) {
        dialogHandle.addEventListener('click', dialogClickHandler);
      }
      document.removeEventListener('mousemove', dialogMousemoveHandler);
      document.removeEventListener('mouseup', dialogMouseupHandler);

    };

    document.addEventListener('mousemove', dialogMousemoveHandler);
    document.addEventListener('mouseup', dialogMouseupHandler);
  };

  dialogHandle.addEventListener('mousedown', dialogMousedownHandler);

})();
