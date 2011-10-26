soundManager.url = '/bakery-lite/js/';
soundManager.altUrl = '/bakery-lite/js/';
soundManager.flashVersion = 9;
soundManager.useFlashBlock = false;
soundManager.useHighPerformance = true;
soundManager.wmode = 'transparent';
soundManager.useFastPolling = true;

function initSound(consumer_key, url) {

	$.getJSON('http://api.soundcloud.com/resolve?url=' + url
			+ '&format=json&consumer_key=' + consumer_key + '&callback=?', function(
			playlist) {
		$('.title').text(playlist.tracks[0].title);
		$.each(playlist.tracks, function(index, track) {
			$('<li>' + track.title + '</li>').data('track', track)
					.appendTo('.tracks');
			url = track.stream_url;
			(url.indexOf("secret_token") == -1) ? url = url + '?' : url = url + '&';
			url = url + 'consumer_key=' + consumer_key;
			soundManager.useWaveformData = true;
			soundManager.createSound({
				id : 'track_' + track.id,
				url : url,
				onplay : function() {
					$('.player').addClass('playing');
					$('.title').text(track.title);
				},
				onresume : function() {
					$('.player').addClass('playing');
				},
				onpause : function() {
					$('.player').removeClass('playing');
				},
				onfinish : function() {
					nextTrack();
				},
				flashVersion : 9,
				usePeakData : true,
				useWaveformData : true,
				whileplaying : function() {
					updateWave(this);
				}
			});
		});
	});
}
$('.tracks li').live(
		'click',
		function() {
			var $track = $(this), data = $track.data('track'), playing = $track
					.is('.active');
			if (playing) {
				soundManager.pause('track_' + data.id);
			} else {
				if ($track.siblings('li').hasClass('active')) {
					soundManager.stopAll();
				}
				soundManager.play('track_' + data.id);
			}
			$track.toggleClass('active').siblings('li').removeClass('active');
		});
$('.play, .pause').live('click', function() {
	if ($('li').hasClass('active') == true) {
		soundManager.togglePause('track_' + $('li.active').data('track').id);
	} else {
		$('li:first').click();
	}
});
$('.next').live('click', function() {
	nextTrack();
});
$('.prev').live('click', function() {
	prevTrack();
});
var nextTrack = function() {
	soundManager.stopAll();
	if ($('li.active').next().click().length == 0) {
		$('.tracks li:first').click();
	}
};
var prevTrack = function() {
	soundManager.stopAll();
	if ($('li.active').prev().click().length == 0) {
		$('.tracks li:last').click();
	}
};