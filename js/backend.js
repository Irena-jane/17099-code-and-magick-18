'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var URL_POST = 'https://js.dump.academy/code-and-magick';

  var onError = function (error) {
    var errBox = document.createElement('div');
    errBox.style = 'z-index:1000;background-color:red;color:#fff;font-size:30px;text-align:center;position:absolute;bottom:0;left:0;right:0';
    errBox.textContent = error;
    document.body.querySelector('.setup').append(errBox);
  };

  var getError = function (xhr) {
    if (xhr.status === 200) {
      return false;
    }
    var error;
    switch (xhr.status) {
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Волшебники не найдены';
        break;
      default:
        error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        break;
    }
    return error;
  };

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // console.log(data);
        onLoad(xhr.response);
        return;
      }
      var error = getError(xhr);

      if (error) {
        onError(error);
      }

    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + ' сек.');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.response) {
        onLoad(xhr.response);
        return;
      }
      var error = getError(xhr);

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
    onError: onError
  };

})();
