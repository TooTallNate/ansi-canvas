
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

  // create `ansi()` cursor
  canvas.cursor = ansi(stream);

  return canvas;
}

/**
 * Renders the <canvas> current context to the TTY.
 *
 * @api public
 */

function render () {

  // erase everything on the screen
  this.cursor.eraseData(2);

  // go to the top left origin (1-indexed, not 0...)
  this.cursor.goto(1, 1);

  // render the current <canvas> contents to the TTY
  var ctx = this.renderCtx;
  var w = this.width;
  var h = this.height;
  var alphaThreshold = 0;
  var pixel = this.pixel;
  var cursor = this.cursor;

  var data = ctx.getImageData(0, 0, w, h).data;

  for (var i = 0, l = data.length; i < l; i += 4) {
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

    if ((i/4|0) % w === (w-1)) {
      // end of the row
      cursor.bg.reset();
      cursor.write('\n');
    }
  }
}
