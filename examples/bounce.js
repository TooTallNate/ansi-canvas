var tc = require('../');

var canvas;
var ctx;
var x = 10;
var y = 10;
var dx = 2;
var dy = 4;

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

 
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
  canvas = tc({ small: true });
  //canvas = tc();
  ctx = canvas.getContext("2d");
  return setInterval(draw, 1000 / 60);
}


function draw() {
  clear();

  ctx.fillStyle = "#FAF7F8";
  rect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#444444";
  circle(x, y, 10);

  if (x + dx > canvas.width || x + dx < 0)
    dx = -dx;
  if (y + dy > canvas.height || y + dy < 0)
    dy = -dy;

  x += dx;
  y += dy;

  canvas.render();
}

init();
