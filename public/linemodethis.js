// called by the bookmarklet to convert the current page into a linemode browser style version

var linemoder = {
	
	init: function() {
		//called on load to remove all style, add the linemode specific style sheet, and who knows what else!
		
		linemoder.removeStyle();
		linemoder.addLinemodeStyle();
		linemoder.allowAncientHTML();
		linemoder.recognizeAnchors();
		linemoder.addCommandLine();
		
	},
	
	removeStyle: function() {
		//remove the current style from the document	
		
		var styleSheets = document.querySelectorAll("link[rel=stylesheet]");
		
		for (var i=0; i < styleSheets.length; i++) {
			if (styleSheets[i].href.indexOf("linemode.css") == -1)
			{ 
				styleSheets[i].parentNode.removeChild(styleSheets[i])
			}
		};
		
		styleSheets = document.querySelectorAll("style");
		
		for (var i=0; i < styleSheets.length; i++) {
			styleSheets[i].parentNode.removeChild(styleSheets[i])
		};
		
		//now remove inline style
		
	},

	removeJS: function() {
		//remove the current JS from the document
		
		var scripts = document.querySelectorAll("script");
		
		for (var i=0; i < scripts.length; i++) {
			if (scripts[i].src.indexOf("linemodethis.js") == -1) {
				//don't remove this script
				scripts[i].parentNode.removeChild(scripts[i])
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

	recognizeAnchors: function() {
		var links = document.getElementsByTagName("a");
		for (var i=1; i <= links.length; i++){
			links[i-1].text = links[i-1].text + " [" + i + "]";
		}
	}
}

linemoder.init();