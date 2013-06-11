ansi-canvas
===========
### Render a &lt;canvas&gt; node to your terminal

![](http://i.cloudup.com/HAFymb_oa1.png)

This module provides a `<canvas>` object backed by node-canvas, with its `width`
and `height` properties automatically set to the proper size of the terminal
window.

The result is that you can use the [HTML Canvas API][canvas api] to render
directly to your terminal.

Installation
------------

Install with `npm`:

``` bash
$ npm install ansi-canvas
```


Example
-------

``` js
```


License
-------

(The MIT License)

Copyright (c) 2013 Nathan Rajlich &lt;nathan@tootallnate.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[canvas api]: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
