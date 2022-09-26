const manageCover = (function makeManageCover() {
    
    function show(el) {
        el.classList.remove("hide");
    }

    function hide(el) {
        el.classList.add("hide");
    }

    function openCurtain(cover) {
        hide(cover);
        const curtain = document.querySelector(".curtain");
        curtain.classList.add("slide");
        return curtain;
    }

    function showVideo(curtain) {
        const thewrap = curtain.parentElement.querySelector(".wrap");
        show(thewrap);
    }

    function coverClickHandler(evt) {
        const cover = evt.currentTarget;
        const curtain = openCurtain(cover);
        showVideo(curtain);
        cover.dispatchEvent(new Event("afterClick"));
    }

    function init(callback) {
        const cover = document.querySelector(".play");
        cover.addEventListener("click", coverClickHandler);
        cover.addEventListener("afterClick", callback);
    }

    return {
        init
    };
}());

const videoPlayer = (function makeVideoPlayer() {
    let player;

    function loadIframeScript() {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function onYouTubeIframeAPIReady() {
        const cover = document.querySelector(".play");
        const wrapper = cover.parentElement;
        const frameContainer = wrapper.querySelector(".video");
        addPlayer(frameContainer);
    }

    function onPlayerReady() {
        player.setVolume(100);
    }

    function addPlayer(video) {
        const options = {
            height: 360,
            host: "https://www.youtube-nocookie.com",
            videoId: video.dataset.id,
            width: 640
        };
        options.playerVars = {
            autoplay: 0,
            cc_load_policy: 0,
            controls: 1,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            rel: 0
        };
        options.events = {
            "onReady": onPlayerReady
        };

        options.playerVars.loop = 1;
        options.playerVars.playlist = video.dataset.id;
        player = new YT.Player(video, options);
    }

    function play() {
        if (player && player.playVideo) {
            player.playVideo();
        }
    }

    function init() {
        player = null;
        loadIframeScript();
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        return play;
    }

    return {
        init,
        play
    };
}());
manageCover.init(videoPlayer.init());
