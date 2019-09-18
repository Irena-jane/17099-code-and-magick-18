
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;

var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = 150;

var contentX = CLOUD_X + GAP * 2;
var gistoX = contentX + BAR_GAP;
var textY = CLOUD_Y + CLOUD_HEIGHT - GAP;

var COLOR_TEXT = 'rgba(0, 0, 0, 0.7)';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var COLOR_WINNER = 'rgba(255, 0, 0, 1)';
var COLOR_ALL = 'hsl(240, 100%, 50%)';

var getRandomInt = function(max){
  return Math.floor(Math.random() * Math.floor(max));
}

var renderCloud = function(ctx, x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCloud = function(ctx, x, y, color){
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(x + 50, y + 60, 70, 0, Math.PI*2, true);

  ctx.moveTo(x , y );
  ctx.arc(x + 140, y + 140, 140, 240, Math.PI*1.3, true);

  ctx.moveTo(x , y );
  ctx.arc(x + 250, y + 100, 100, 330, Math.PI*1.3, true);
  ctx.moveTo(x , y );
  ctx.arc(x + 415, y + 115, 80, 330, Math.PI*1.3, true);
  ctx.moveTo(x , y );

  ctx.arc(x + 340, y + 50, 50, 330, Math.PI*1.3, true);
  ctx.moveTo(x , y );
  ctx.arc(x + 240, y + 230, 80, 330, Math.PI*1.3, true);
  ctx.moveTo(x , y );
  ctx.arc(x + 360, y + 200, 90, 330, Math.PI*1.3, true);
  ctx.moveTo(x , y );
  ctx.arc(x + 50, y + 190, 90, 0, Math.PI*2, true);

  ctx.fill();
  ctx.closePath();

};

var getMaxElement = function(arr){

  var length = arr.length;
  if(length === 0) {
    return 1;
  }

  var maxElem = arr[0];

  for(var i = 0; i < length; i++){
    if(maxElem < arr[i]){
      maxElem = arr[i];
    }
  }

  return maxElem;
};

window.renderStatistics = function(ctx, names, times){

  var _names = names;
  var _times = times;

  if(_names.length !== _times.length) {
    var arrMin = Math.min(_names.length, _times.length);
    var _names = names.splice(0, arrMin);
    var _times = times.splice(0, arrMin);
  }

  var maxTime = getMaxElement(_times);
  var regEx = /,\s(\d{1,3})%,/;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLOR_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  for(var i = 0; i < _names.length; i++){
    var customBarHeight = BAR_MAX_HEIGHT * _times[i] / maxTime;
    var customSaturation = getRandomInt(100);

    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(_names[i], gistoX + (BAR_GAP + BAR_WIDTH) * i, textY);

    ctx.fillStyle = _names[i] === "Вы"? COLOR_WINNER : COLOR_ALL.replace(regEx,', ' + customSaturation + '%,');

    ctx.fillRect(gistoX + (BAR_GAP + BAR_WIDTH) * i, textY - FONT_GAP - customBarHeight, BAR_WIDTH, customBarHeight);

    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(Math.floor(_times[i]), gistoX + (BAR_GAP + BAR_WIDTH) * i, textY - customBarHeight - FONT_GAP - GAP );
  }

  ctx.font = '16px PT Mono';
  ctx.fillText("Ура вы победили!", contentX, CLOUD_Y + GAP + FONT_GAP );
  ctx.fillText("Список результатов:", contentX, CLOUD_Y + (GAP + FONT_GAP) * 2 );
};
