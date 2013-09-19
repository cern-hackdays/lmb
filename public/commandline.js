function run(command, e) {
  if (commands[command]) {
    commands[command]()
  }

  if ((/^[0-9]+$/).test(command)) {
    // TODO open the nth link
    window.location = document.querySelectorAll('a')[(command * 1) - 1].href;
  }

  // else don't prevent default
}

function pagedown() {
  var lineHeight = parseFloat(getComputedStyle(document.body).lineHeight);
  console.log('I AM GO DOWN FOR JOHN');
  var current = document.body.scrollTop;
  scrollTo(0, current + lineHeight * 23);
}

var cmd = document.querySelector('#command input');

cmd.onkeydown = function (e) {
  if (e.keyCode === 13 && this.value) {
    e.preventDefault();
    e.stopPropagation();
    run(this.value, e);
    this.value = '';
  }
};

document.documentElement.onkeydown = function (e) {
  if (e.keyCode === 13) {
  	pagedown();
  	e.preventDefault();
  }
};

document.documentElement.onclick = function () {
  cmd.focus();
};

document.documentElement.onfocus = function () {
  cmd.focus();
}

var commands = {
  top: function () {
    blocker();
    window.scrollTo(0, 0);
  },
  list: function () {
    // list all available links
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
    // TODO list history of visited urls
    // localStorage
  },
  quit: function () {
    alert("I'm not a quiter.");
    return false;
  }
}

function pagedown() {
  blocker();
	var lineHeight = parseFloat(getComputedStyle(document.body).lineHeight);

	var current = document.body.scrollTop;
	scrollTo(0, current + lineHeight * 23);
}

// alias
commands.t = commands.top;
commands.T = commands.top;
commands.q = commands.quit;
commands.Quit = commands.quit;

// restore the super old html tags
'plaintext listing h0 hp1 hp2'.replace(/\w+/g, function (a) {
  document.createElement(a);
});

blocker(); // do the character by character "rendering"

window.onload = function () {

  setTimeout(function () {
    window.scrollTo(0,0);
  }, 0);

  //test
  var lineHeight = parseFloat(getComputedStyle(document.body).lineHeight);

  document.body.lastElementChild.style.paddingBottom = innerHeight - 24 * lineHeight;
};
