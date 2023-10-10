function randomBackground() {
    const classNames = [
        "bg1",
        "bg2",
        "bg3",
        "bg4",
        "bg5",
        "bg6",
        "bg7",
        "bg8",
        "bg9"
    ];

    const randomIndex = Math.floor(Math.random() * classNames.length);
    document.querySelector("body").classList.add(classNames[randomIndex]);
}

randomBackground();

const videoPlayer = (function makeVideoPlayer() {
    let player;

    function loadIframeScript() {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function onYouTubeIframeAPIReady() {
        const frameContainer = document.querySelector(".video");
        addPlayer(frameContainer);
    }

    function shufflePlaylist(player) {
        player.setShuffle(true);
        player.playVideoAt(0);
        player.stopVideo();
    }

    function onPlayerReady(event) {
        player = event.target;
        player.setVolume(100);
        shufflePlaylist(player);
    }

    function addPlayer(video) {
        const options = {
            height: 360,
            host: "https://www.youtube-nocookie.com",
            width: 642
        };
        options.playerVars = {
            autoplay: 0,
            cc_load_policy: 0,
            controls: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            //loop:1,
            listType: 'playlist',
            list: 'PLlotB_y9MoPkF5OKfN4W2r_Ey0-HHBgmN'
        };
        options.events = {
            "onReady": onPlayerReady
        };

        player = new YT.Player(video, options);
    }

    function init() {
        player = null;
        loadIframeScript();
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return {
        init
    };
}());
videoPlayer.init();
