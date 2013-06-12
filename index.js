
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
  var small = null == opts.small ? true : !!opts.small;
  var pixelHeight = small ? 0.5 : 1;
  var pixelWidth = small ? 1 : 2;

  // create <canvas> instance
  var canvas = new Canvas(stream.columns / pixelWidth, stream.rows / pixelHeight);
  canvas.render = render;
  canvas.stream = stream;
  canvas.small = small;

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

  // retain calls in memory until `flush()` call
  cursor.buffer();

  // erase everything on the screen
  cursor.eraseData(2);

  // go to the top left origin (1-indexed, not 0...)
  cursor.goto(1, 1);

  // render the current <canvas> contents to the TTY
  var ctx = this.renderCtx;
  var small = this.small;
  var w = this.width;
  var h = this.height;
  var alphaThreshold = 0;

  var data = ctx.getImageData(0, 0, w, h).data;
  var r, g, b, alpha;
  var topBlank, bottomBlank;
  var i = 0;

  for (var y = 0; y < h; y++) {

    // beginning of the row
    cursor.bg.reset();
    cursor.write('\n');

    for (var x = 0; x < w; x++) {

      // in `small` mode, we have to render 2 rows at a time, where the top row
      // is the background color, and the bottom row is the foreground color
      i = ((y * w) + x) * 4;

      // top row
      r = data[i];
      g = data[i+1];
      b = data[i+2];
      alpha = data[i+3];

      if (alpha > alphaThreshold) {
        cursor.bg.rgb(r, g, b);
        topBlank = false;
      } else {
        cursor.bg.reset();
        topBlank = true;
      }

      if (small) {
        // bottom row

        // go to the next row
        i = (((y + 1) * w) + x) * 4;

        r = data[i];
        g = data[i+1];
        b = data[i+2];
        alpha = data[i+3];

        if (alpha > alphaThreshold) {
          cursor.fg.rgb(r, g, b);
          bottomBlank = false;
        } else {
          cursor.fg.reset();
          bottomBlank = true;
        }
      }

      if (small && bottomBlank && !topBlank) {
        // swapping fg and bg for this pixel since we're gonna use a "top
        // half" instead of the usual "bottom half"
        i = ((y * w) + x) * 4;

        // top row
        r = data[i];
        g = data[i+1];
        b = data[i+2];

        cursor.bg.reset();
        cursor.fg.rgb(r, g, b);
      }

      // write the pixel
      if (!small) {
        cursor.write('  ');
      } else if (topBlank && bottomBlank) {
        cursor.write(' ');
      } else if (bottomBlank) {
        cursor.write('▀');
      } else {
        cursor.write('▄');
      }
    }

    if (small) y++;
  }

  cursor.flush();
}
