'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  var getRandomNum = function (max) {
    return Math.floor(Math.random() * max);
  };


  window.util = {
    isEscEvent: function (e, action) {
      if (e.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (e, action) {
      if (e.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNum: getRandomNum
  };

})();
