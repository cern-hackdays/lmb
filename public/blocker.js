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
  var x = position % 80,
      y = position / 80 | 0;

  return {
    x: x,
    y: y
  };
}

function draw() {
  if (run) requestAnimationFrame(draw);

  var coords = getCords(position);

  console.log(coords);

  ctx.clearRect(coords.x * 8, coords.y * 24, 8, 24);
  // ctx.clearRect(coords.x * 80, coords.y * 24, 80, 24);

  position++;

  if (position >= length) exit();
}

function moveto() {

}

init();
draw();