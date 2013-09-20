var sounds = {
	
	init: function(){
		document.addEventListener("keydown", sounds.playKeyboardSound, false);
		sounds.injectAudioElements();
	},
	
	soundFiles: ["/sounds/key1.wav", "/sounds/key2.wav", "/sounds/key3.wav", "/sounds/key4.wav", "http://line-mode.cern.ch/sounds/key5.wav"], //urls of the sounds we're playing
	
	playKeyboardSound: function() {
		//play a random sound from the recorded sounds from the keyboard
		var max = sounds.soundFiles.length; //number of soundFiles
		var min = 1;

		var whichSound = "sound" + Math.floor(Math.random() * (max - min + 1) + min);
		document.querySelector("#" + whichSound).play();
	},
	
	injectAudioElements: function(){
		//inject audio elements to play

		var audioElement;
		var sourceElement;
		var body = document.querySelector("body");
		var childElement;

		for (var i=0; i < sounds.soundFiles.length; i++) {
			audioElement = document.createElement('audio');
			audioElement.id = "sound" + (i + 1);

			sourceElement = document.createElement('source');
			sourceElement.src = sounds.soundFiles[i]

			childElement = body.appendChild(audioElement);
			childElement = audioElement.appendChild(sourceElement);

			audioElement.load();

		};
	}
}

window.addEventListener('load', sounds.init, false)
