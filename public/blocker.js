var blocker = (function () {

  var position = 0,
      length = 80 * 24,
      speed = 4,
      ctx;

  function init() {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.id = 'blocker';
    document.body.appendChild(canvas);
    // fair warning: this 80 x 8 and 24 x 24 is pretty britle. I'd like this
    // to be hardened to be based on computed styles from a single character...
    // TODO work out font size based on single display inline-block element.
    canvas.width = 80 * 8; // 8 is the character width
    canvas.height = 24 * 24; // 14px character height

    // TODO handle resizing
  }

  function exit() {
    ctx.canvas.display = 'none';
  }

  function getCords(position) {
    var x = position % (80 / speed),
        y = position / (80 / speed) | 0;

    return {
      x: x,
      y: y
    };
  }

  function draw() {
    if (position < length) {
      // important: this is early to increase the amount of drawing done
      // setTimeout(0) might typically look filthy, but this is actually
      // speeding up a dumbing down of the terminal to simulate the slow
      // effect of the IBM 6000 line mode browser, and if it's too slow
      // it just gets in the way. KEEP THIS SETTIMEOUT ABOVE DRAWING! - RS
      setTimeout(draw, 0);
      var coords = getCords(position);
      ctx.clearRect(coords.x * 8 * speed, coords.y * 24, 8 * speed, 24);

      position++;
    } else {
      exit();
    }
  }

  init();

  return function () {
    ctx.canvas.display = 'block';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    position = 0;
    draw();
  };
})();