var audioContext;
window.addEventListener('load', init, false);
function init() {
  try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    audioContext = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function loadSound(url, onLoad) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	// Decode asynchronously
	request.onload = function() {
	 audioContext.decodeAudioData(request.response, onLoad, onError);
	}
	request.send();
}


function playSound(sound) {
  var source = audioContext.createBufferSource(); // creates a sound source
  source.buffer = sound;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
}

function Sound() {
	this.ready = false;
	this.buffer = null;
	this.load = function (url) {
		loadSound(url, function (buffer) {
			this.ready = true;
			this.buffer = buffer;
		});
	}
	this.play = playSound;
}
