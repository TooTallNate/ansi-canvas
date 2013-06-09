
var tc = require('./');

// create terminal <canvas>
var canvas = tc();
var ctx = canvas.getContext('2d');

var x = 0;
var y = 0;
function render () {

  // black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // print height and width
  ctx.font = '12px Arial';
  ctx.textBaseline = "top";
  ctx.fillStyle = 'red';
  ctx.fillText('w: ' + canvas.width + ', h: ' + canvas.height, 0, 0);

  // render to TTY
  canvas.render();
}

process.stdout.on('resize', render);

setInterval(render, 1000 / 60); // 60hz
//render();
