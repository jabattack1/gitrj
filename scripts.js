// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform );

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !! document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false;
        mediaPath = './songs/',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "1. I DON'T WANT TO GO AND SEE THE SUN",
            "length": "03:10",
            "file": "Sun"
        },  {
            "track": 2,
            "name": "2. STARLIGHTS",
            "length": "02:16",
            "file": "Starlights"
        },   {
            "track": 3,
            "name": "3. PROGRAM (FEAT. MATTHEW CLANTON)",
            "length": "02:26",
            "file": "Program"
        },   {
            "track": 4,
            "name": "4. JUICE",
            "length": "02:07",
            "file": "Juice"
        },  {
            "track": 5,
            "name": "5. BIKER (FEAT. OLLIE)",
            "length": "02:15",
            "file": "Biker"
        },   {
            "track": 6,
            "name": "6. WACKO",
            "length": "01:48",
            "file": "Wacko"
        },  {
            "track": 7,
            "name": "7. DAYLIGHT ROBBERY",
            "length": "02:18",
            "file": "Daylight"
        },  {
            "track": 8,
            "name": "8. NBDY",
            "length": "02:00",
            "file": "Nobody"
        }],
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function () {
            npAction.text('Paused...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});