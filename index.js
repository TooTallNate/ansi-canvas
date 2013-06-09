
/**
 * Module dependencies.
 */

var ansi = require('ansi');
var Canvas = require('canvas');

/**
 * Module exports.
 */

module.exports = term;

/**
 * Terminal <canvas>.
 * The `width` and `height` properties are automated based off of the TTY's
 * current window size.
 *
 * @api public
 */

function term (opts) {
  if (!opts) opts = {};
  var stream = opts.stream || process.stdout;
  var pixel = opts.pixel || '  ';
  var pixelHeight = 1;
  var pixelWidth = pixel.length;

  // create <canvas> instance
  var canvas = new Canvas(stream.columns / pixelWidth, stream.rows / pixelHeight);
  canvas.render = render;
  canvas.stream = stream;
  canvas.pixel = pixel;

  // cached "context"
  canvas.renderCtx = canvas.getContext('2d');

  // handle the "resize" event
  stream.on('resize', function () {
    canvas.width = stream.columns / pixelWidth;
    canvas.height = stream.rows / pixelHeight;
  });

  return canvas;
}

/**
 * Renders the <canvas> current context to the TTY.
 *
 * @api public
 */

function render () {
  var cursor = ansi(this.stream);

  // erase everything on the screen
  cursor.eraseData(2);

  // go to the top left origin (1-indexed, not 0...)
  cursor.goto(1, 1);

  // render the current <canvas> contents to the TTY
  var ctx = this.renderCtx;
  var w = this.width;
  var h = this.height;
  var alphaThreshold = 0;
  var pixel = this.pixel;

  var data = ctx.getImageData(0, 0, w, h).data;

  for (var i = 0, l = data.length; i < l; i += 4) {

    if ((i/4|0) % w === 0) {
      // beginning of the row
      cursor.bg.reset();
      cursor.write('\n');
    }

    var r = data[i];
    var g = data[i+1];
    var b = data[i+2];
    var alpha = data[i+3];

    if (alpha > alphaThreshold) {
      cursor.bg.rgb(r, g, b);
    } else {
      cursor.bg.reset();
    }

    cursor.write(pixel);
  }
}
