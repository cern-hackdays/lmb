// called by the bookmarklet to convert the current page into a linemode browser style version

var linemoder = {

	init: function() {
		//called on load to remove all style, add the linemode specific style sheet, and who knows what else!

		linemoder.removeStyle();
		linemoder.addLinemodeStyle();
		linemoder.allowAncientHTML();
		linemoder.recognizeAnchors();
		linemoder.removeReplacedElements();
		linemoder.insertEOF();
		linemoder.addCommandLine();

	},

	removeStyle: function() {
		//remove the current style from the document

		var styleSheets = document.querySelectorAll("link[rel=stylesheet]");

		for (var i=0; i < styleSheets.length; i++) {
			if ((' ' + styleSheets[i].className + ' ').indexOf(' ignore ') === -1) {
				styleSheets[i].parentNode.removeChild(styleSheets[i])
			}
		};

		styleSheets = document.querySelectorAll("style");

		for (var i=0; i < styleSheets.length; i++) {
			if ((' ' + styleSheets[i].className + ' ').indexOf(' ignore ') === -1) {
				var styleSheet = styleSheets[i];
				var span = document.createElement('span');
				span.innerHTML = styleSheet.innerHTML;
				styleSheet.parentNode.replaceChild(span, styleSheet);
			}
		};

		//now remove inline style

		var inlineStyled = document.querySelectorAll("[style]")

		for (var i=0; i < inlineStyled.length; i++) {
			inlineStyled[i].removeAttribute("style")
		};

	},

	removeJS: function() {
		//remove the current JS from the document

		var scripts = document.querySelectorAll("script");

		for (var i=0; i < scripts.length; i++) {
			if ((' ' + scripts[i].className + ' ').indexOf(' ignore ') === -1) {
				//don't remove this script
				var script = scripts[i];
				var span = document.createElement('span');
				span.innerHTML = script.innerHTML;
				script.parentNode.replaceChild(span, script);
			}
		};

	},


	addLinemodeStyle: function() {
		//add style for our linemode browser

		// var ss = document.createElement("link");
		// ss.type = "text/css";
		// ss.rel = "stylesheet";
		// ss.href = "https://raw.github.com/JohnAllsopp/linemoder/master/linemode.css";
		// document.getElementsByTagName("head")[0].appendChild(ss);

		var ss = document.createElement("style");
		ss.type = "text/css";
		ss.rel = "stylesheet";
		ss.href = "https://raw.github.com/JohnAllsopp/linemoder/master/linemode.css";
		ss.title = "linemodestyle"
		document.getElementsByTagName("head")[0].appendChild(ss);

	},

	addCommandLine: function(){
		//add the elements for the command line
	},

	allowAncientHTML: function(){
		var e = "plaintext,listing,h0,hp1,hp2".split(',');
		for(var i=0;i<e.length;i++){document.createElement(e[i])}
	},

	// recognizeAnchors: function() {
	// 	var links = document.getElementsByTagName("a");
	// 	for (var i=0; i < links.length; i++){
	// 		var j = i+1;
	// 		links[i].innerHTML = links[i].innerHTML + "[" + j + "]";
	// 		links[i].name = j;
	// 	}
	// },

	// insertEOF: function() {
	// 	var eof = document.createElement("footer");
	// 	eof.innerHTML ="[END]";
	// 	document.getElementsByTagName("body")[0].appendChild(eof);
	// },


	removeReplacedElements: function() {
		var e = "img,video,audio,svg,canvas,iframe".split(',');
		for(var i=0; i<e.length; i++){
			var elements = document.getElementsByTagName(e[i]);
			for (var j=0; j < elements.length; j++){
				while(elements[j].lastChild) {
					elements[j].parentNode.insertBefore(elements[j].lastChild, elements[j]);
				}
			}
		}
	}

}

linemoder.init();
