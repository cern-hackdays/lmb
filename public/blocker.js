var position = 0,
    length = 80 * 24,
    char = [0,0],
    ctx,
    run = true;

function init() {
  var canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');

  canvas.id = 'blocker';
  document.body.appendChild(canvas);
  canvas.width = 80 * 8; // 8 is the character width
  canvas.height = 24 * 24; // 14px character height

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // TODO handle resizing
}

function exit() {
  ctx.canvas.parentNode.removeChild(ctx.canvas);
  run = false;
}

function getCords(position) {
  var x = position % (80 / 2),
      y = position / (80 / 2) | 0;

  return {
    x: x,
    y: y
  };
}

function draw() {
  if (run) setTimeout(draw, 0);

  var coords = getCords(position);
  ctx.clearRect(coords.x * 8 * 2, coords.y * 24, 8 * 2, 24);

  position++;

  if (position >= length) exit();
}

function moveto() {

}

init();
draw();