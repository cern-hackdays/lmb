var cmd = document.querySelector('#command input');

cmd.onkeydown = function (e) {
  e.preventDefault();
  console.log(e);
  if (e.keyCode === 13) {
    run(this.value);
    this.value = '';
  }
};

function run(command) {
  console.log(command);
}