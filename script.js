(function manageRadiosAndModal() {
    // Configuration object for selectors and settings
    const CONFIG = {
        audio: {
            preload: "none",
            volume: 1.0 // Default volume (100%)
        },
        linkButton: {
            className: "linkButton btnB-primary btnB",
            destination: "#lastSongModal",
            text: "Last Song Played"
        },
        playButton: {
            className: "playButton btnA-primary btnA"
        },
        selectors: {
            container: "#radioButtonContainer",
            modal: "#lastSongModal",
            modalClose: "#modalClose"
        }
    };

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
        src: "https://relay4.radiotoolkit.com/svoefm",
        title: "CBOE FM"
    }, {
        src: "https://relay.radiotoolkit.com/rcmdeep",
        title: "Relax Club Music"
    }, {
        src: "https://relay4.radiotoolkit.com/spdeep",
        title: "SoundPark #Deep"
    }, {
        src: "https://relay4.radiotoolkit.com/spclassic",
        title: "SoundPark Classic"
    }, {
        src: "https://relay4.radiotoolkit.com/delishdeephd",
        title: "Delish Deep"
    }, {
        src: "https://myradio24.org/5129",
        title: "BEST DEEP FM"
    }, {
        src: "https://stream.deep1.ru/deep1aac",
        title: "DEEP ONE"
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
        src: "https://luxury.radiotoolkit.com:8000/radio",
        title: "Luxury Music"
    }, {
        src: "https://radio.nueuphoria.com:8443/live",
        title: "Nu Euphoria"
    }, {
        src: "https://neos.win:48488/1",
        title: "Cavo Paradiso"
    }, {
        src: "https://listen4.myradio24.com/sohofm",
        title: "Soho FM"
    }, {
        src: "https://myradio24.org/5967",
        title: "90s Eurodance"
    }, {
        src: "https://stream06.pcradio.ru/Vintazh_kafe-hi",
        title: "Coffee FM"
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
    }]; //

    // Get button container (with early exit)
    const buttonContainer = document.querySelector(CONFIG.selectors.container);
    if (!buttonContainer) {
        return; // Exit if container not found
    }

    // Audio setup with volume control
    const audio = document.createElement("audio");
    audio.preload = CONFIG.audio.preload;
    audio.volume = CONFIG.audio.volume; // Set default volume here
    document.body.appendChild(audio);

    // Play button creator
    function createPlayButton(station) {
        const button = document.createElement("button");
        button.className = CONFIG.playButton.className;
        button.textContent = station.title;
        button.dataset.src = station.src;
        button.dataset.radioButton = "";
        button.setAttribute("aria-label", "Play " + station.title);
        return button;
    }

    // Better play handler
    function handlePlayButtonClick(src, button) {
        const isSameStream = audio.src === src;

        if (isSameStream) {
            if (audio.paused) {
                audio.play();
                button.classList.add("played");
            } else {
                audio.pause();
                button.classList.remove("played");
            }
        } else {
            audio.src = src;
            audio.play();

            const allButtons = buttonContainer.querySelectorAll(
                "[data-radio-button]"
            );
            allButtons.forEach(function (btn) {
                btn.classList.remove("played");
            });
            button.classList.add("played");
        }
    }

    // Modal functions
    function openModal(target) {
        const modal = document.querySelector(target);
        if (modal) {
            modal.classList.add("active");
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("active");
        }
    }

    function setupModalHandlers() {
        const linkBtn = document.createElement("button");
        linkBtn.className = CONFIG.linkButton.className;
        linkBtn.textContent = CONFIG.linkButton.text;
        linkBtn.dataset.destination = CONFIG.linkButton.destination;
        linkBtn.dataset.linkButton = "";
        linkBtn.setAttribute("aria-label", CONFIG.linkButton.text);
        buttonContainer.appendChild(linkBtn);

        linkBtn.addEventListener("click", function () {
            openModal(linkBtn.dataset.destination);
        });

        const modal = document.querySelector(CONFIG.selectors.modal);
        const closeBtn = modal?.querySelector(CONFIG.selectors.modalClose);

        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                closeModal(modal);
            });
        }

        window.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                closeModal(modal);
            }
        });
    }

    radioStations.forEach(function (station) {
        buttonContainer.appendChild(createPlayButton(station));
    });

    // Event delegation with closest()
    buttonContainer.addEventListener("click", function (e) {
        const button = e.target.closest("[data-radio-button]");
        if (!button) {
            return; // Exit if not a radio button
        }
        handlePlayButtonClick(button.dataset.src, button);
    });

    // Setup modal
    setupModalHandlers();
}());
