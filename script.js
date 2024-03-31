/*global YT */
/*jslint browser:true */
/*jslint devel: true */

document.querySelector('.closeA').addEventListener('click', function() {
    document.querySelector('.btnA').blur();
});

window.onload = function () {
    const container = document.querySelector(".video-container");
    container.classList.add("slide");
    const wrapper = document.querySelector(".wrapA");
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
        //playerOptions.events.onStateChange = onPlayerStateChange;
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
        videoId: ["_iOELSVXohc", "T42qMaYrhZQ",
            "rDBbaGCCIhk", "sbQIEg9r2e4"
        ]
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
    const exit = document.querySelector(".exitA");
    exit.addEventListener("click", exitClickHandler);
}());
(function manageOpenModel() {
    function openModal(target) {
        const modal = document.querySelector(target);
        modal.classList.add("active");
        modal.querySelector(".curtain").classList.add("slide");
        modal.querySelector(".wrapB").classList.add("visible");
    }

    function addPlayerToButtons() {
        const modalButtons = document.querySelectorAll(".playButtonA");
        modalButtons.forEach(function (button, index) {
            button.addEventListener("click", function (event) {
                modalButtons.forEach(function (markAsPlayed) {
                    markAsPlayed.classList.remove("played");
                });
                button.classList.add("played");
                //const target = event.currentTarget.dataset.destination;
                //openModal(target);
                openModal(event.currentTarget.dataset.destination);
                if (index === 0) {
                    //Listening
                    players.add(".buttonA", {
                        videoId: "yq5KBfbmark"
                    });
                } else if (index === 1) {
                    //Live Performance
                    players.add(".buttonB", {
                        videoId: "5xUUqjLMpOw"
                    });
                } else if (index === 2) {
                    //On Loop
                    players.add(".buttonC", {
                        playerVars: {
                            loop: 1,
                            playlist: "Nbp8XZnzfT8"
                        }
                    });
                } else if (index === 3) {
                    //Audio Visual
                    players.add(".buttonD", {
                        videoId: "49ohUZeHjP8"
                    });
                } else if (index === 4) {
                    //Lyric Video
                    players.add(".buttonE", {
                        videoId: "844Nx8ODOAg"
                    });
                } else if (index === 5) {
                    //Music Video
                    players.add(".buttonF", {
                        videoId: "D7lT8T0JNjc"
                    });
                } else if (index === 6) {
                    //From The Vault
                    players.add(".buttonG", {
                        videoId: "87vA2hx0je8"
                    });
                } else if (index === 7) {
                    //Mystery Box
                    players.add(".buttonH", {
                        videoId: "hciKsIzybGY"
                    });
                } else if (index === 8) {
                    //Cover
                    players.add(".buttonI", {
                        videoId: "ZfyR0skpsms"
                    });
                } else if (index === 9) {
                    //Remix
                    players.add(".buttonJ", {
                        videoId: "Aqz9-0NEqS8"
                    });
                } else if (index === 10) {
                    //Instrumental
                    players.add(".buttonK", {
                        videoId: "qYEooPeyz5M"
                    });
                } else if (index === 11) {
                    //Original Mix
                    players.add(".buttonL", {
                        videoId: "3MvgQXbWpQg"
                    });
                    //Foreign
                } else if (index === 12) {
                    players.add(".buttonM", {
                        videoId: "-ZwsSieOPXU"
                    });
                    //Acoustic
                } else if (index === 13) {
                    players.add(".buttonN", {
                        videoId: "SSdebtSqjEs"
                    });
                } else if (index === 14) {
                    //Music of the soul...
                    players.add(".buttonO", {
                        videoId: "C0Z99nrMAX0"
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
        modal.querySelector(".curtain").classList.add("hide");
        modal.querySelector(".wrapB").classList.remove("visible");
        removePlayer();
    }

    function addCloseEventToModals() {
        const closeModals = document.querySelectorAll(".closeA");
        closeModals.forEach(function (modal) {
            modal.addEventListener("click", function (event) {
                //const currentModal = event.target.closest(".modal");
                //closeModal(currentModal);
                closeModal(event.target.closest(".modalA"));
            });
        });
    }
    addCloseEventToModals();
}());
(function managePageB() {

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

        const buttons = document.querySelectorAll(".playButtonA");
        buttons.forEach(function (button) {
            button.classList.remove("played");
        });
    }

    const exit = document.querySelector(".exitB");
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
        buttonClass: "linkButton btnD-primary btnD",
        title: "Last Song Played"
    }];
    const buttonContainer = document.querySelector(".buttonContainerB");

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
            button.classList.add("playButtonB", "btnB-primary", "btnB");
            button.dataset.src = station.src;
            button.textContent = station.title;

            // Add button to the container
            buttonContainer.appendChild(button);
        } else if (station.buttonClass) {
            button.className = station.buttonClass;
            button.textContent = station.title;
            button.classList.add("linkButton", "btnC-primary", "btnC");
            button.setAttribute("data-destination", "#lb"); // Added this line
            buttonContainer.appendChild(button);
        }
    });

    const buttons = document.querySelectorAll(".playButtonB");
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
        const closeModals = document.querySelectorAll(".closeB");

        closeModals.forEach(function (modal) {
            modal.addEventListener("click", function () {
                //closeModal(event.target.closest(".modalB"));
                closeModal(document.querySelector(".modalB"));
            });
        });
    }
    addCloseEventToModal();
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
        hideContainer(".containerC");
        showContainer(".containerD");
        window.scrollTo(0, 0);
    }

    function exitClickHandler() {
        const buttons = document.querySelectorAll(".playButtonB");
        const audios = document.querySelectorAll("audio");

        audios.forEach(function (audio) {
            audio.src = "";
        });
        buttons.forEach(function (button) {
            button.classList.remove("played");
        });

        resetPage();
    }
    const exit = document.querySelector(".exitC");
    exit.addEventListener("click", exitClickHandler);
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
        hideContainer(".containerD");
        showContainer(".containerB");
    }

    function exitClickHandler() {
        resetPage();
    }
    const exit = document.querySelector(".exitD");
    exit.addEventListener("click", exitClickHandler);
}());
