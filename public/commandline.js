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

function getValue() {
  if (cmd.nodeName === 'INPUT') {
    return cmd.value;
  } else {
    return cmd.innerHTML;
  }
}

function setValue(v) {
  if (cmd.nodeName === 'INPUT') {
    cmd.value = v;
  } else {
    cmd.innerHTML = v;
  }
}


var cmd = document.querySelector('#cmd-input'),
    cursor = document.querySelector('#cmd-cursor'),
    cursors = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    },
    typingTimer = null;

function typing() {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function () {
    cursor.className = 'wait';
  }, 200);
  cursor.className = '';
}

cmd.onkeydown = function (e) {
  typing();
  var val = getValue();

  if (e.keyCode === 13 && val) {
    e.preventDefault();
    e.stopPropagation();
    run(val, e);
    setValue(val);
  } else if (cursors[e.keyCode]) {
    // junk it and don't allow
    e.preventDefault();
    e.stopPropagation();
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
cmd.focus(); // force focus to the contenteditable

window.onload = function () {

  setTimeout(function () {
    window.scrollTo(0,0);
  }, 0);

  //test
  var lineHeight = parseFloat(getComputedStyle(document.body).lineHeight);

  document.body.lastElementChild.style.paddingBottom = innerHeight - 24 * lineHeight;
};
