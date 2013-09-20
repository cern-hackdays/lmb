var blocker = (function () {

  var position = 0,
      speed = 8,
      length = 80 * 24 / speed,
      characterWidth = 8,
      ch = 0,
      stspeed = 0, // ALWAYS KEEP AT ZERO!
      ctx,
      commandForm = document.getElementById('command');

  function size(px) {
    ch = px | 0;
    ctx.canvas.width = document.documentElement.offsetWidth; // 8 is the character width
    characterWidth = ctx.canvas.width / 80;
    ctx.canvas.height = 24 * ch; // 14px character height

    ctx.fillStyle = 'hsl(150, 100%, 50%)';

    if (position < length) {
      ctx.save();
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    }
  }

  function init() {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.id = 'blocker';
    document.body.appendChild(canvas);
    // fair warning: this 80 x 8 and 24 x 24 is pretty britle. I'd like this
    // to be hardened to be based on computed styles from a single character...
    // TODO work out font size based on single display inline-block element.
    // canvas.width = 80 * 8; // 8 is the character width
    // canvas.height = 24 * 24; // 14px character height

    // size()

    // TODO handle resizing
  }

  function exit() {
    commandForm.className = '';
    ctx.canvas.style.display = 'none';
  }

  function getCords(position) {
    var x = position % (80 / speed | 0),
        y = position / (80 / speed | 0) | 0;

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
      setTimeout(draw, stspeed);
      var coords = getCords(position);

      ctx.clearRect(coords.x * characterWidth * speed, coords.y * ch, characterWidth * speed, ch);

      coords = getCords(position + 1);
      ctx.fillRect(coords.x * characterWidth * speed, coords.y * ch, characterWidth, ch);

      position++;
    } else {
      exit();
    }
  }

  init();

  var blocker = function () {
    commandForm.className = 'hide';
    ctx.canvas.style.display = 'block';
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
    position = 0;
    draw();
  };

  blocker.size = size;

  return blocker;
})();