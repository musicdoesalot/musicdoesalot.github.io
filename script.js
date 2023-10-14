const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onPlayerReady(event) {
    player = event.target;
    player.setVolume(100);
    shufflePlaylist(player);
}

function shufflePlaylist(player) {
    player.setShuffle(true);
    player.playVideoAt(0);
    player.stopVideo();
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '361',
        host: 'https://www.youtube-nocookie.com',
        width: '642',
        playerVars: {
            autoplay: 0,
            cc_load_policy: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            listType: 'playlist',
            list: 'PLlotB_y9MoPlvAJM52qOYh9FA8VonzVki'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}
