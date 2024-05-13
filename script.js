window.onload = function () {
    const container = document.querySelector(".video-containerA");
    const heartPiece = document.querySelector(".heart");
    const exitButton = document.querySelector(".exitA");

    // Make the heart piece visible
    heartPiece.classList.add("visible");

    // Add event listener to the heart piece
    heartPiece.addEventListener("transitionend", function () {
        container.classList.add("slide");
    });

    // Add event listener to the container
    container.addEventListener("transitionend", function (event) {
        if (event.propertyName !== "transform") {
            return;
        }
        exitButton.classList.add("visible");
    });
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

    function addPlayer(video, playerOptions) {
        playerOptions.playerVars = playerOptions.playerVars || {};
        video.dataset.shuffle = playerOptions.shuffle;
        playerOptions.events = playerOptions.events || {};
        playerOptions.events.onReady = onPlayerReady;
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
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3
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
    players.add(".playA", {
        playerVars: {
            list: "PLlotB_y9MoPmg6IhXa63Dvb30MJIHpzi2",
            listType: "playlist"
        },
        shuffle: true
    });
}

(function manageExitA() {
    function hideContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.add("hide");
    }

    function showContainer(containerSelector, heartSelector, exitSelector) {
        const container = document.querySelector(containerSelector);
        const heartPiece = document.querySelector(heartSelector);
        const exitButton = document.querySelector(exitSelector);

        container.classList.remove("hide");


        heartPiece.addEventListener("animationend", function () {
            //if (e.propertyName !== 'opacity') return;
            container.classList.add("slide");
        });

        container.addEventListener("animationend", function (event) {
            if (event.animationName !== "slide") {
                return;
            }
            exitButton.classList.add("visible");
        });
    }

    function removePlayer() {
        videoPlayer.destroyPlayers();
    }

    function resetPage() {
        hideContainer(".video-containerA");
        showContainer(
            ".video-containerB",
            ".video-containerB .heart",
            ".exitB"
        );
        removePlayer();
    }

    function exitClickHandler() {
        resetPage();
        players.add(".playB", {
            playerVars: {
                list: "PLlotB_y9MoPlnu6HqLFkPaOLTn-sCPEW3",
                listType: "playlist",
                loop: 0
            }
        });
    }
    const exit = document.querySelector(".exitA");
    exit.addEventListener("click", exitClickHandler);
}());

(function manageExitB() {
    function hideContainer(containerSelector) {
        const container = document.querySelector(containerSelector);
        container.classList.add("hide");
    }

    function showContainer(containerSelector, heartSelector, exitSelector) {
        const container = document.querySelector(containerSelector);
        const heartPiece = document.querySelector(heartSelector);
        const exitButton = document.querySelector(exitSelector);

        container.classList.remove("hide");
        heartPiece.addEventListener("animationend", function () {
            //if (e.propertyName !== 'opacity') return;
            container.classList.add("slide");
        });

        container.addEventListener("animationend", function (event) {
            if (event.animationName !== "slide") {
                return;
            }
            exitButton.classList.add("visible");
        });
    }

    function removePlayer() {
        videoPlayer.destroyPlayers();
    }

    function resetPage() {
        hideContainer(".video-containerB");
        showContainer(
            ".video-containerC",
            ".video-containerC .heart",
            ".exitC"
        );
        removePlayer();
    }

    function exitClickHandler() {
        resetPage();
        players.add(".playC", {
            playerVars: {
                list: "PLlotB_y9MoPlvAJM52qOYh9FA8VonzVki",
                listType: "playlist"
            },
            shuffle: true
        });
    }

    const exit = document.querySelector(".exitB");
    exit.addEventListener("click", exitClickHandler);
}());

(function manageExitC() {
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
        hideContainer(".outer-containerA");
        showContainer(".outer-containerB");
        removePlayer();
    }

    function exitClickHandler() {
        resetPage();
    }

    const exit = document.querySelector(".exitC");
    exit.addEventListener("click", exitClickHandler);
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
        src: "https://www.liveradio.es/" +
        "http://62.16.40.250:8000/uralsoundfm",
        title: "URALSOUND FM"
    }, {
        src: "https://stream.radiojar.com/9ndpdg3c0s8uv",
        title: "Athens Up Radio"
    }, {
        src: "https://stream.nightride.fm/nightride.mp3",
        title: "Nightride FM"
    }, {
        src: "https://waveretro.ru:8443/stream",
        title: "RetroWave.One"
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
        buttonClass: "linkButton btnB-primary btnB",
        title: "Last Song Played"
    }];

    const buttonContainer = document.querySelector(".buttonContainerA");

    // Create audio and button elements for each station
    radioStations.forEach(function (station) {
        const button = document.createElement("button");
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
            button.classList.add("playButtonA", "btnA-primary", "btnA");
            button.dataset.src = station.src;
            button.textContent = station.title;

            // Add button to the container
            buttonContainer.appendChild(button);
        } else if (station.buttonClass) {
            button.className = station.buttonClass;
            button.textContent = station.title;
            button.classList.add("linkButton", "btnB-primary", "btnB");
            button.setAttribute("data-destination", "#lb"); // Added this line
            buttonContainer.appendChild(button);
        }
    });

    const buttons = document.querySelectorAll(".playButtonA");
    const audios = document.querySelectorAll("audio");

    buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            // If the button already has 'played' class, remove it
            if (button.classList.contains("played")) {
                button.classList.remove("played");
            } else {
                // Remove 'played' class from all buttons
                buttons.forEach(function (markAsPlayed) {
                    markAsPlayed.classList.remove("played");
                });
                // Add 'played' class to the clicked button
                button.classList.add("played");
            }

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

(function manageLinkButtonOpen() {

    function openModal(target) {
        const modal = document.querySelector(target);
        modal.classList.add("active");
    }

    function addLinkToButton() {
        const modalButton = document.querySelector(".linkButton");
        modalButton.addEventListener("click", function (event) {
            //const target = event.currentTarget.dataset.destination;
            //openModal(target);
            openModal(event.currentTarget.dataset.destination);
        });
    }
    addLinkToButton();

}());

(function manageLinkButtonClose() {

    function closeModal(modal) {
        modal.classList.remove("active");
    }

    function addCloseEventToModal() {
        const closeModalElement = document.querySelector(".closeA");
        closeModalElement.addEventListener("click", function () {
            closeModal(document.querySelector(".modalA"));
        });
    }
    addCloseEventToModal();
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
        hideContainer(".containerB");
        showContainer(".containerC");
        window.scrollTo(0, 0);
    }

    function exitClickHandler() {
        const buttons = document.querySelectorAll(".playButtonA");
        const audios = document.querySelectorAll("audio");

        audios.forEach(function (audio) {
            audio.src = "";
        });
        buttons.forEach(function (button) {
            button.classList.remove("played");
        });

        resetPage();
    }
    const exit = document.querySelector(".exitD");
    exit.addEventListener("click", exitClickHandler);
}());

(function manageOpenModel() {
    function openModal(target) {
        const modal = document.querySelector(target);
        const container = modal.querySelector(".inner-modalB");
        const heartPiece = modal.querySelector(".heart");
        const closeButton = modal.querySelector(".closeB");

        modal.classList.add("active");
        modal.querySelector(".heart").classList.add("visible");

        heartPiece.addEventListener("transitionend", function () {
            container.classList.add("slide");
        });

        container.addEventListener("transitionend", function (event) {
            if (event.propertyName !== "transform") {
                return;
            }
            closeButton.classList.add("visible");
        });
    }

    function addPlayerToButtons() {
        const button = document.querySelector(".playbuttonB");

        button.addEventListener("click", function (event) {
            openModal(event.currentTarget.dataset.destination);
            players.add(".buttonA", {
                videoId: "yq5KBfbmark"
            });

            // Disable the button after it is clicked once
            button.disabled = true;

            // Change the title attribute to "Closed"
            button.title = "Closed";
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
        removePlayer();
    }

    function addCloseEventToModal() {
        const closeModalElement = document.querySelector(".closeB");
        closeModalElement.addEventListener("click", function () {
            closeModal(document.querySelector(".modalB"));
        });
    }
    addCloseEventToModal();
}());
