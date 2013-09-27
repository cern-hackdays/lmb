var cmd = document.querySelector('#cmd-input'),
    cursor = document.querySelector('#cmd-cursor'),
    promptElement = document.querySelector('.cmd-prompt'),
    cursors = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    },
    typingTimer = null;

function setPrompt ($) {
	var prompt = "";

	if (document.querySelectorAll('isindex').length){
		prompt = prompt + 'K &lt;keywords&gt;, ';
	}
	if (document.querySelectorAll('a').length){
		prompt = prompt + '&lt;ref.number&gt;, ';
	}
	if (history.length > 1){
		prompt = prompt + 'Back, ';
	}
	prompt = prompt + '&lt;RETURN&gt; for more, ';
	if (prompt.length <= 47){
		prompt = prompt + 'Quit, ';
	}

	prompt = prompt + 'or Help: ';

	promptElement.innerHTML = prompt;

	// Adjust style
	// cursor.style.left = ((promptElement.textContent.length + 1) * .55) + 'em';
 cursor.style.left = (((promptElement.textContent.length + 1) * .5) | 0) + 'em';
}

function run(command, e) {
  if (commands[command]) {
    commands[command]()
  }

  if ((/^\d+$/).test(command)) {
    // TODO open the nth link
    window.location = document.querySelectorAll('a')[+command - 1].href;
  }

  // else don't prevent default
}

function typing() {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(function () {
    cursor.className = 'wait';
  }, 200);
  cursor.className = '';
}

function updateCursor() {
	// cursor.style.marginLeft = (cmd.value.length * .55) + 'em';
   cursor.style.marginLeft = (cmd.value.length * .5) + 'em';
}

cmd.oninput = updateCursor;

cmd.onkeydown = function (e) {
  typing();

  var val = cmd.value;

  if (e.keyCode === 13 && val) {
    e.preventDefault();
    e.stopPropagation();
    run(val, e);
    cmd.value = '';
    updateCursor();
  }
  else if (cursors[e.keyCode]) {
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

document.documentElement.onclick =
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
	// show 2 blank lines then
	//       HYPERTEXT REFERENCES :=
	// then 1 blank line, then list of links in this format:
	//      [n]       [href value (relative or absolute)]
	// if no links, show 2 blank lines then
	//      NO HYPERTEXT REFERENCES HAVE APPEARED IN THE DOCUMENT YET
	// then 3 blank links
  },
  help: function () {
	// LMB had help in the compiled code, contained logic
	// Using static file for now
	window.location = '/www/help.html';
  },
  home: function () {
	// Should use history, once that's implemented
	// Brute force for now, 1st web page is HOME!
	window.location = '/www/index.html';
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
	// output with 2 blank lines then
	//             HISTORY OF PREVIOUS NODES :-
	// then 3 blank lines then
	//      %2d)       %s
	// where %2d is a number and %s is the title,
	// if no title then href
	// then insert 3 blank lines
  },
  quit: function () {
    alert("I'm not a quitter.");
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
commands.Back = commands.back;
commands.B = commands.back;
commands.b = commands.back;

// restore the super old html tags
'plaintext listing h0 hp1 hp2'.replace(/\w+/g, function (a) {
  document.createElement(a);
});

var e = 'img,video,audio,svg,canvas,iframe'.split(',');
for(var i=0; i<e.length; i++){
  var elements = document.getElementsByTagName(e[i]);
  for (var j=0; j < elements.length; j++){
    while(elements[j].lastChild) {
      elements[j].parentNode.insertBefore(elements[j].lastChild, elements[j]);
    }
  }
}


cmd.focus(); // force focus to the contenteditable

window.onload = function () {

  setPrompt();

  setTimeout(function () {
    window.scrollTo(0,0);
  }, 0);

  //test
  var lineHeight = parseFloat(getComputedStyle(document.body).lineHeight);

  document.getElementById('lmb-footer').style.paddingBottom = innerHeight - 24 * lineHeight;

  // Make sure 24 lines fit on the viewport and make the font-size as large as possible for that
  (window.adjustFontSize = function (){
    var maxLineHeight = innerHeight / 25,
        size = Math.floor(maxLineHeight / 1.5);

    if (size % 2 !== 0) {
      size--;
    }

    document.documentElement.style.fontSize = size  + 'px';

    blocker.size(size * 1.5);
    blocker(); // do the character by character "rendering"
  })();

  addEventListener('resize', adjustFontSize);
};
