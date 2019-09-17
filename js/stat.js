
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 20;
var barWidth = CLOUD_WIDTH - TEXT_WIDTH - GAP*2;


var getRandomInt = function(max){
  return Math.floor(Math.random() * Math.floor(max));
}

var renderCloud = function(ctx, x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

//17 demonstration
window.renderStatistics = function(ctx, names, times){

    var maxTime = getMaxElement(times);

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');


  ctx.fillStyle = 'hsl(240, 100%, 50%)';

  for(var i = 0; i < names.length; i++){

    var customBar = barWidth * times[i] / maxTime;
    var customSaturation = getRandomInt(100);

    //console.log(names[i] + " : " + customSaturation);
    //   MAX_BAR      BAR[I]
    // ----------- = --------
    //  BAR_WIDTH       X
     //  X = (BAR_WIDTH * BAR[I]) / MAX_BAR

    ctx.fillStyle = names[i] === "Вы"? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + customSaturation + '%, 50%)';

    ctx.fillText(names[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT)*i);
    ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT)*i, customBar, BAR_HEIGHT);


  }





    ctx.font = '16px PT Mono';
    ctx.fillText("Ура вы победили!", CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP );
    ctx.fillText("Список результатов:", CLOUD_X + GAP, CLOUD_Y + (GAP + FONT_GAP)*2 );
};
