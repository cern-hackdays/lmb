var position = 0,
    char = [0,0];

function init() {
  var ctx = document.createElement('canvas').getContext('2d'),
      canvas = ctx.canvas;

  canvas.id = 'blocker';
  document.body.appendChild(canvas);
}

function exit() {

}

function draw() {
  requestAnimationFrame(draw);
}

function moveto() {

}

// draw();