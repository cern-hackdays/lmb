var cmd = document.querySelector('#command input');

cmd.onkeydown = function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
    run(this.value, e);
    this.value = '';
  }
};

function run(command, e) {
  if (commands[command]) {
    commands[command]()
  }

  if ((/^[0-9]+$/).test(command)) {
    // TODO open the nth link
    console.log('GOTO ' + document.querySelectorAll('a')[command * 1].href);
  }

  // else don't prevent default
}

document.body.onkeydown = function (e) {
  if (e.which === 13) {
    console.log('I AM GO DOWN FOR JOHN');
    var current = document.body.scrollTop;
    window.scrollTo(0, current + window.innerHeight);
    e.preventDefault();
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
    history.back();
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