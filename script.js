/*global YT */
/*jslint browser:true */
/*jslint devel: true */
window.onload = function () {
    const container = document.querySelector(".video-containerA");
    container.classList.add("slide");
    const wrapper = document.querySelector(".wrap");
    wrapper.classList.add("visible");
};

const videoPlayer = (function makeVideoPlayer() {
    const players = [];
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function shufflePlaylist(player, shuffle) {
        player.setShuffle(shuffle);
        player.playVideoAt(0);
        player.stopVideo();
    }

    function onPlayerReady(event) {
        const player = event.target;
        player.setVolume(100);
        const isShuffle = player.getIframe().dataset.shuffle === "true";
        shufflePlaylist(player, isShuffle);
    }

    function onPlayerStateChange(event) {
        const player = event.target;
    }

    function addPlayer(video, playerOptions) {
        let id = video.dataset.id;
        playerOptions.playerVars = playerOptions.playerVars || {};
        if (playerOptions.listType && playerOptions.list) {
            playerOptions.playerVars.listType = playerOptions.listType;
            playerOptions.playerVars.list = playerOptions.list;
        } else if (id && id.startsWith("PL")) {
            playerOptions.playerVars.listType = "playlist";
            playerOptions.playerVars.list = id;
        }
        if (Array.isArray(playerOptions.videoId)) {
            const randomNumber = Math.random() * playerOptions.videoId.length;
            const randomIndex = Math.floor(randomNumber);
            playerOptions.videoId = playerOptions.videoId[randomIndex];
        } else if (!playerOptions.videoId && id) {
            playerOptions.videoId = id;
        }
        video.dataset.shuffle = playerOptions.shuffle;
        playerOptions.events = playerOptions.events || {};
        playerOptions.events.onReady = onPlayerReady;
        playerOptions.events.onStateChange = onPlayerStateChange;
        players.push(new YT.Player(video, playerOptions));
    }

    function destroyPlayers() {
        players.forEach(function (player) { // Use player array here
            const playerElement = player.getIframe();
            if (playerElement) {
                const playerClass = playerElement.className;
                console.log("Destroying player with class: " + playerClass);
                player.destroy();
            }
        });
        console.log("playerRemoved");
    }

    return {
        addPlayer,
        destroyPlayers
    };
}());

const managePlayer = (function makeManagePlayer() {
    const playerVars = {
        autoplay: 0,
        controls: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3
        //playlist: 1
    };
    const defaults = {
        height: 360,
        host: "https://www.youtube-nocookie.com",
        playerVars,
        width: 640
    };

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

    function initPlayer(wrapper, playerOptions) {
        createPlayer(wrapper, playerOptions);
    }
    return {
        adder: playerAdder
    };
}());

const players = (function uiLoadPlayer() {
    function addPlayer(playerSelector, playerOptions) {
        const parent = document.querySelector(playerSelector).parentElement;
        const callback = managePlayer.adder(parent, playerOptions);
        callback();
    }

    return {
        add: addPlayer
    };
}());

function onYouTubeIframeAPIReady() {
    // Initialize the first player
    players.add(".playInitial", {
        videoId: ["0dgNc5S8cLI", "mnfmQe8Mv1g", "AxLxnN6z0Og"]
    });
}

(function manageInitial() {
    function hideContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.add("hide");
    }

    function showContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.remove("hide");
    }

    function removePlayer() {
        videoPlayer.destroyPlayers();
    }

    function resetPage() {
        hideContainer(".containerA");
        showContainer(".outer-container");
        removePlayer();
    }

    function exitClickHandler() {
        resetPage();
    }
    const closeModal = document.querySelector(".exitA");
    closeModal.addEventListener("click", exitClickHandler);
}());
(function manageOpenModel() {
    function openModal(target) {
        const modal = document.querySelector(target);
        modal.classList.add("active");
        modal.querySelector(".curtainB").classList.add("slide");
        modal.querySelector(".wrapB").classList.add("visible");
    }

    function addPlayerToButtons() {
        const modalButtons = document.querySelectorAll(".playButtonA");
        modalButtons.forEach(function (button, index) {
            button.addEventListener("click", function (event) {
                //const target = event.currentTarget.dataset.destination;
                //openModal(target);
                openModal(event.currentTarget.dataset.destination);
                if (index === 0) {
                    players.add(".buttonA", {
                        list: "PLYeOyMz9C9kYmnPHfw5-ItOxYBiMG4amq",
                        listType: "playlist",
                        shuffle: true
                    });
                } else if (index === 1) {
                    players.add(".buttonB", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 2) {
                    players.add(".buttonC", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 3) {
                    players.add(".buttonD", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 4) {
                    players.add(".buttonE", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 5) {
                    players.add(".buttonF", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 6) {
                    players.add(".buttonG", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 7) {
                    players.add(".buttonH", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 8) {
                    players.add(".buttonI", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 9) {
                    players.add(".buttonJ", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 10) {
                    players.add(".buttonK", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 11) {
                    players.add(".buttonL", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 12) {
                    players.add(".buttonM", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 13) {
                    players.add(".buttonN", {
                        videoId: "CHahce95B1g"
                    });
                } else if (index === 14) {
                    players.add(".buttonO", {
                        videoId: "CHahce95B1g"
                    });
                }
            });
        });
    }
    addPlayerToButtons();
}());
(function manageCloseModel() {
    function removePlayer() {
        videoPlayer.destroyPlayers();
    }

    function closeModal(modal) {
        modal.classList.remove("active");
        modal.querySelector(".curtainB").classList.add("hide");
        modal.querySelector(".wrapB").classList.remove("visible");
        removePlayer();
    }

    function addCloseEventToModals() {
        const closeModals = document.querySelectorAll(".close");
        closeModals.forEach(function (modal) {
            modal.addEventListener("click", function (event) {
                //const currentModal = event.target.closest(".modal");
                //closeModal(currentModal);
                closeModal(event.target.closest(".modal"));
            });
        });
    }
    addCloseEventToModals();
}());
(function managePageC() {

    function hideContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.add("hide");
    }

    function showContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.remove("hide");
    }

    function resetPage() {
        hideContainer(".containerB");
        showContainer(".containerC");
    }

    function exitClickHandler() {
        resetPage();

    }
    const closeModal = document.querySelector(".exitB");
    closeModal.addEventListener("click", exitClickHandler);
}());


(function manageRadios() {

    // Define your radio stations
    const radioStations = [{
        src: "https://solid67.streamupsolutions.com/proxy/" +
        "qrynsxmv?mp=/stream",
        title: "heat radio"
    }, {
        src: "https://solid1.streamupsolutions.com/proxy/" +
        "neukptkl?mp=/stream",
        title: "heat classic"
    }, {
        src: "https://getradio.me/svoefm",
        title: "CBOE FM"
    }, {
        src: "https://getradio.me/rcm",
        title: "Relax Club Music"
    }, {
        src: "https://getradio.me/spdeep",
        title: "Sound Park #Deep"
    }, {
        src: "https://getradio.me/spclassic",
        title: "Sound Park Classic"
    }, {
        src: "https://getradio.me/delishdeep",
        title: "Delish Deep"
    }, {
        src: "https://myradio24.org/5129",
        title: "BEST DEEP FM"
    }, {
        src: "https://i4.streams.ovh/sc/musicfactory/stream",
        title: "Music Factory"
    }, {
        src: "https://deephousex.ru/live",
        title: "M.Deep Radio"
    }, {
        src: "https://imagine2.radioca.st/;",
        title: "Fly 104"
    }, {
        src: "https://getradio.me/luxurious.music",
        title: "Luxury Music"
    }, {
        src: "https://radio.nueuphoria.com:8443/live",
        title: "Nu Euphoria"
    }, {
        src: "https://neos.win:48488/1",
        title: "Cavo Paradiso"
    }, {
        src: "https://strm112.1.fm/atr_mobile_mp3",
        title: "Amsterdam Trance"
    }, {
        src: "https://myradio24.org/5967",
        title: "90s Eurodance"
    }, {
        src: "https://best.live24.gr/best1222",
        title: "Best Radio 92.6"
    }, {
        src: "https://stream.radiojar.com/9ndpdg3c0s8uv",
        title: "Athens Up Radio"
    }, {
        src: "https://stream.nightride.fm/nightride.mp3",
        title: "Nightride FM"
    }, {
        src: "https://waveretro.ru:8443/stream",
        title: "RetroWave One"
    }, {
        src: "https://stream.synthwaveradio.eu/listen/" +
        "synthwaveradio.eu/radio.mp3",
        title: "Synthwave Radio"
    }, {
        src: "https://synthwave-rex.radioca.st/;",
        title: "Synthwave City FM"
    }, {
        src: "https://i4.streams.ovh:2200/ssl/rockmelo?mp=/stream",
        title: "Rock Melodic Radio"
    }, {
        href: "https://www.example.com",
        title: "Last Song Played"
    }
    // Add more stations here...
];
    // Get the container for the buttons
    const buttonContainer = document.querySelector(".buttonContainerB");
    // Create audio and button elements for each station
    radioStations.forEach(function (station) {
        if (station.src) {
            // Create audio element
            const audio = document.createElement("audio");
            audio.title = station.title;
            audio.preload = "none";

            const source = document.createElement("source");
            source.src = station.src;
            source.type = "audio/mpeg";

            audio.appendChild(source);

            // Add audio element to the body
            document.body.appendChild(audio);

            // Create button element
            const button = document.createElement("button");
            button.classList.add("playButtonB", "btn", "btn-primary");
            button.dataset.src = station.src;
            button.textContent = station.title;

            // Add button to the container
            buttonContainer.appendChild(button);
        } else if (station.href) {
            // Create anchor element
            const anchor = document.createElement("a");
            anchor.href = station.href;
            anchor.textContent = station.title;
            anchor.target = "_blank"; // Open in new tab
            anchor.classList.add("playButtonB", "btn-primaryB", "btnB");
            // Add anchor to the container
            buttonContainer.appendChild(anchor);
        }
    });

    // Your existing JavaScript code
    const buttons = document.querySelectorAll(".playButtonB");
    const audios = document.querySelectorAll("audio");

    buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            audios.forEach(function (audio, i) {
                if (index === i && audio.currentTime === 0) {
                    audio.src = button.dataset.src;
                    audio.play();
                } else {
                    audio.src = "";
                }
            });
        });
    });

}());


(function managePageD() {

    function hideContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.add("hide");
    }

    function showContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.remove("hide");
    }

    function resetPage() {
        hideContainer(".containerC");
        showContainer(".containerD");
    }

    function exitClickHandler() {
        resetPage();

    }
    const closeModal = document.querySelector(".exitC");
    closeModal.addEventListener("click", exitClickHandler);
}());
