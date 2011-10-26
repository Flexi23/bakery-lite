var bakery = (function() {

	var req = new XMLHttpRequest();
	req.open("GET", "js/jquery-1.6.4.min.js", false);
	req.send();
	eval(req.responseText);
	req.open("GET", "js/soundmanager2.js", false);
	req.send();
	eval(req.responseText);
	req.open("GET", "js/soundcloudplayer.js", false);
	req.send();
	eval(req.responseText);
	req.open("GET", "js/raf.js", false);
	req.send();
	eval(req.responseText);

	// soundcloud player setup

	soundManager.usePolicyFile = true;
	soundManager.url = '/bakery-lite/js/';
	soundManager.flashVersion = 9;
	soundManager.useFlashBlock = false;
	soundManager.debugFlash = false;
	soundManager.debugMode = false;
	soundManager.useHighPerformance = true;
	soundManager.wmode = 'transparent';
	soundManager.useFastPolling = true;
	soundManager.usePeakData = true;
	soundManager.useWaveformData = true;
	soundManager.useEqData = true;

	var clientID = "bd2f8eea8d0a47b35c779cb9fa43b681";
	var playlistUrl = "http://soundcloud.com/foofighters/sets/wasting-light";

	var waveLeft = [];
	var waveRight = [];

	// canvas animation setup
	var canvas;
	var context;

	function init(c) {
		canvas = document.getElementById(c);
		context = canvas.getContext("2d");
		soundManager.onready(function() {
			initSound(clientID, playlistUrl);
		});
		aniloop();
	}

	function aniloop() {
		requestAnimFrame(aniloop);
		drawWave();
	}

	function drawWave() {
		// clear
		context.fillStyle = "white";
		context.fillRect(0, 0, 512, 512);

		// left wave
		context.beginPath();
		context.moveTo(0, 256);
		for ( var i = 0; i < 256; i++) {
			context.lineTo(2 * i, 256 + waveLeft[i] * 128.);
		}
		context.lineWidth = 2;
		context.strokeStyle = "#FF0000";
		context.stroke();

		// right wave
		context.beginPath();
		context.moveTo(0, 256);
		for ( var i = 0; i < 256; i++) {
			context.lineTo(2 * i, 255 + waveRight[i] * 128.);
		}
		context.lineWidth = 2;
		context.strokeStyle = "#0000FF";
		context.stroke();
	}

	function updateWave(sound) {
		waveLeft = sound.waveformData.left;
		waveRight = sound.waveformData.right;
	}

	return {
		init : init
	};
})();
