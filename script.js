document.querySelectorAll("button.cover").forEach(function (button) {
    button.addEventListener("click", function (event) {
        const container = event.currentTarget.dataset.container;
        const myVideo = document.querySelector("." + container + " .video");
        myVideo.dataset.id = event.currentTarget.dataset.id;
    });
});

(function randomBackground() {
    const classNames = [
        "bg2",
        "bg3"
    ];

    const random = Math.floor(Math.random() * classNames.length);
    document.querySelector("body").classList.add(classNames[random]);
}());

(function randomCurtain() {
    const classNames = [
        "cr1",
        "cr2",
        "cr3"
    ];

    const random = Math.floor(Math.random() * classNames.length);
    document.querySelector(".randomPanel").classList.add(classNames[random]);
}());

(function manageExitInitial() {

    function show(el) {
        el.classList.remove("hide");
    }

    function hide(el) {
        el.classList.add("hide");
    }

    function resetInitial(initialSelector) {
        const allInitials = document.querySelectorAll(initialSelector);

        function hideInitial(initial) {
            initial.classList.add("exitIsOpen");
        }
        allInitials.forEach(hideInitial);
    }


    function resetPage() {
        resetInitial(".containerInitial");
    }

    function coverClickHandler(evt) {
        resetPage();
        const cover = evt.currentTarget;
        const thewrap = document.querySelector(".playButtonContainer");
        hide(cover);
        show(thewrap);
    }

  const cover = document.querySelector(".exitInitial");
  cover.addEventListener("click", coverClickHandler);
}());

const manageCover = (function makeManageCover() {
    const config = {};
    const body = document.body;
    let currentPlayButton = {};

    function resetBackground(backgroundSelector) {
        const allBackgrounds = document.querySelectorAll(backgroundSelector);

        function hideBackground(background) {
            background.classList.add("bg1");
        }
        allBackgrounds.forEach(hideBackground);
    }

    function resetButtons(buttonSelector) {
        const allButtons = document.querySelectorAll(buttonSelector);

        function hideButton(button) {
            button.classList.add("isOpen");
        }
        allButtons.forEach(hideButton);
    }

    function resetPage() {
        resetBackground("body");
        resetButtons(".container");
    }

    function markAsPlayed(played) {
        played.classList.add("played");
    }

    function showCover(playButton) {
        function show(el) {
            el.classList.add("active");
            el.classList.remove("hide");
        }

        config.containers.forEach(function (el) {
            el.classList.add("hide");
        });

        resetPage();
        markAsPlayed(playButton);
        show(playButton.parentElement);
        show(document.getElementsByClassName(playButton.dataset.container)[0]);
    }

    function animationEndHandler(evt) {
        const animationName = evt.animationName;

        if (animationName === "initial-fade") {
            body.classList.remove("initial-fade");
            showCover(currentPlayButton);
        }
    }

    function coverClickHandler(evt) {
        currentPlayButton = evt.currentTarget;
        body.classList.add("initial-fade");
    }

    function addClickToButtons(playButtons) {
        playButtons.forEach(function playButtonHandler(playButton) {
            playButton.addEventListener("click", coverClickHandler);
        });
    }

    function addCoverHandler(coverSelector, handler) {
        const cover = document.querySelector(coverSelector);
        cover.addEventListener("click", handler);
    }

    function init(selectors) {
        config.containers = document.querySelectorAll(selectors.container);
        const playButtons = document.querySelectorAll(selectors.playButton);
        addClickToButtons(playButtons);
        body.addEventListener("animationend", animationEndHandler);
    }

    return {
        addCoverHandler,
        init
    };
}());

const manageUI = (function makeManageUI() {
    const body = document.body;

    const players = [];

    function findPlayers() {
        const allCovers = document.querySelectorAll(".cover");
        const allWrappers = document.querySelectorAll(".wrap");
        allCovers.forEach(function addToPlayers(cover, index) {
            const newPlayer = {
                cover
            };

            let wrapperIndex;
            if (index < allWrappers.length) {
                wrapperIndex = index;
            } else {
                wrapperIndex = allWrappers.length - 1;
            }
            newPlayer.wrapper = allWrappers[wrapperIndex];

            players.push(newPlayer);
        });
    }

    function getWrapper(cover) {
    const found = players.find(
    
      function isCover(player) {
        return player.cover === cover;
      }
    );
    
    const wrapper = found.wrapper;
    return wrapper;
  }

    function resetBackground(backgroundSelector) {
        const allBackgrounds = document.querySelectorAll(backgroundSelector);

        function showBackground(background) {
            background.classList.remove("bg1");
        }
        allBackgrounds.forEach(showBackground);
    }

    function resetCurtains(curtainSelector) {
        const allCurtains = document.querySelectorAll(curtainSelector);

        function showCurtain(curtain) {
            curtain.classList.remove("active");
        }
        allCurtains.forEach(showCurtain);
    }

    function showAllButtons(buttonSelector) {
        const allButtons = document.querySelectorAll(buttonSelector);

        function showButton(button) {
            button.classList.remove("hide");
        }
        allButtons.forEach(showButton);
    }

    function resetButtons(buttonSelector) {
        const allButtons = document.querySelectorAll(buttonSelector);

        function showButton(button) {
            button.classList.remove("isOpen");
        }
        allButtons.forEach(showButton);
    }

    function animationEndHandler(evt) {

        const animationName = evt.animationName;
        console.log(animationName);

        if (animationName === "fadingOut") {
            fadeReset();
        }
    }

    function fadeReset() {
        body.classList.remove("fadingOut");
        resetBackground("body");
        resetCurtains(".with-curtain");
        showAllButtons(".hide");
        resetButtons(".container");
    }

    function resetPage() {
        body.classList.add("fadingOut");
    }

    function exitClickHandler() {
        resetPage();
    }

    function addClickToExit(exitButtons) {
        exitButtons.forEach(function addExitButtonHandler(exitButtons) {
            exitButtons.addEventListener("click", exitClickHandler);
        });
    }

    function addExitHandlers(callback) {
        const resetVideo = document.querySelectorAll(".exit");
        resetVideo.forEach(function resetVideoHandler(video) {
            video.addEventListener("click", callback);
        });
    }

    function init() {
        findPlayers();
        const exitButtons = document.querySelectorAll(".exit");
        addClickToExit(exitButtons);
        body.addEventListener("animationend", animationEndHandler);
    }

    return {
        addExitHandlers,
        getWrapper,
        init
    };
}());

const videoPlayer = (function makeVideoPlayer() {

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onPlayerReady(event) {
        const player = event.target;
        player.setVolume(100);
    }

    function onPlayerStateChange(event) {
        const player = event.target;
        return player;
    }

    function addPlayer(video, playerOptions) {
        playerOptions.videoId = playerOptions.videoId || video.dataset.id;
        playerOptions.events = playerOptions.events || {};
        playerOptions.events.onReady = onPlayerReady;
        playerOptions.events.onStateChange = onPlayerStateChange;
        playerOptions.playerVars.loop = 1;
        const player = new YT.Player(video, playerOptions);
        return player;
    }

    return {
        addPlayer
    };
}());

const managePlayer = (function makeManagePlayer() {

    const playerVars = {
        autoplay: 1,
        controls: 1,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3
    };
    const defaults = {
        height: 360,
        host: "https://www.youtube-nocookie.com",
        playerVars,
        width: 640
    };

    function show(el) {
        el.classList.remove("hide");
    }

    function combinePlayerOptions(opts1 = {}, opts2 = {}) {
        const combined = Object.assign({}, opts1, opts2);
        Object.keys(opts1).forEach(function checkObjects(prop) {
            if (typeof opts1[prop] === "object") {
                combined[prop] = Object.assign({}, opts1[prop], opts2[prop]);
            }
        });
        return combined;
    }

    function createPlayer(videoWrapper, playerOptions = {}) {
        const video = videoWrapper.querySelector(".video");
        const options = combinePlayerOptions(defaults, playerOptions);
        return videoPlayer.addPlayer(video, options);
    }

    function playerAdder(wrapper, playerOptions) {
        return function addPlayerCallback() {
            initPlayer(wrapper, playerOptions);
        };
    }

    function removePlayer(wrapper) {
        wrapper.player.destroy();
        delete wrapper.player;
        console.log("removePlayer");
    }

    function removePlayerHandler(evt) {
        const el = evt.target;
        const container = el.closest(".container");
        const wrapper = container.querySelector(".wrap");
        if (wrapper.player) {
            return removePlayer(wrapper);
        }
    }

    function initPlayer(wrapper, playerOptions) {
        show(wrapper);
        const player = createPlayer(wrapper, playerOptions);
        wrapper.player = player;
    }

    return {
        adder: playerAdder,
        removePlayerHandler
    };
}());

const players = (function coverUIPlayerFacade() {

    function addPlayer(coverSelector, playerOptions) {
        const cover = document.querySelector(coverSelector);
        const wrapper = manageUI.getWrapper(cover);
        const callback = managePlayer.adder(wrapper, playerOptions);
        manageCover.addCoverHandler(coverSelector, callback);
    }

    function init() {
        manageCover.init({
            container: ".container",
            playButton: ".cover"
        });

        manageUI.init({});
        manageUI.addExitHandlers(managePlayer.removePlayerHandler);
    }

    return {
        add: addPlayer,
        init
    };
}());

players.init();

function onYouTubeIframeAPIReady() {
    let playerVarsList = {
        "0": {
            playerVars: {
                playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g"
            }
        },
        "3": {
            videoId: "0dgNc5S8cLI"
        },
        "5": {
            playerVars: {
                list: "PLYeOyMz9C9kYmnPHfw5-ItOxYBiMG4amq",
                listType: "playlist"
            }
        },
        "7": {
            playerVars: {
                end: 1800,
                playlist: "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g",
                start: 150
            }
        }
    };
    //to add the player to all the play buttons
    const totalP = document.querySelectorAll("[data-container=\"play1\"]");
    //looping over all the play buttons and adding player to that

  //jslint approved
    totalP.forEach(function (...args) {
        players.add(".playSingle" + args[1], (playerVarsList[args[1]] || {}));
    });
    
    players.add(".playInitial", {});
}
