var cmd = document.querySelector('#command input');

cmd.onkeydown = function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    run(this.value);
    this.value = '';
  }
};

function run(command) {
  if (commands[command]) return commands[command]()

  if (command.test(/^[0-9]+$/)) {
    // TODO open the nth link
    console.log('GOTO ' + document.querySelector('a')[command].href);
  }
}

var commands = {
  top: function () {
    window.scrollTo(0, 0);
  },
  list: function () {
    // TODO list history of visited urls
    // localStorage
  },
  help: function () {

  },
  alias: function () {
    // TODO
    // localStorage for url shortcuts
  },
  back: function () {
    // FIXME does back take you "back" to the history/help/etc?
    window.back();
  },
  recall: function () {
    // jump to history
  },
  quit: function () {
    alert("I'm not a quiter.");
  }
}

// alias
commands.t = commands.top;
commands.T = commands.top;