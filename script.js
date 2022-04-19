const videoPlayer = (function makeVideoPlayer() {
    let player = null;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady() {
        const frameContainer = document.querySelector(".video");
        videoPlayer.addPlayer(frameContainer);
    }

    function onPlayerReady(event) {
        player = event.target;
        player.setVolume(100); // percent

    }

    function addPlayer(video) {
        const config = {
            height: 360,
            host: "https://www.youtube-nocookie.com",
            width: 640,
            videoId: video.dataset.id,
        };
        config.playerVars = {
            autoplay: 0,
            cc_load_policy: 0,
            controls: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            rel: 0
        };
        config.events = {
            "onReady": onPlayerReady
        };
        player = new YT.Player(video, config);
    }

    function init() {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return {
        addPlayer,
        init
    };
}());
videoPlayer.init();
