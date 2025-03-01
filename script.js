(function manageRadiosAndModal() {

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
        title: "SoundPark #Deep"
    }, {
        src: "https://getradio.me/spclassic",
        title: "SoundPark Classic"
    }, {
        src: "https://getradio.me/delishdeep",
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
        src: "https://strm112.1.fm/atr_mobile_mp3",
        title: "Amsterdam Trance"
    }, {
        src: "https://myradio24.org/5967",
        title: "90s Eurodance"
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
    }];

    // Define link button for modal
    const linkButton = {
        className: "linkButton btnB-primary btnB",
        destination: "#lb",
        text: "Last Song Played"
    };

    // Get button container
    const buttonContainer = document.querySelector(".buttonContainerA");
    if (!buttonContainer) {
        return; // Exit if container not found
    }
    // Create single audio element
    const audio = document.createElement("audio");
    audio.preload = "none";
    document.body.appendChild(audio);

    // Create play buttons for each station
    radioStations.forEach(function (station) {
        const button = document.createElement("button");
        button.classList.add("playButton", "btnA-primary", "btnA");
        button.dataset.src = station.src;
        button.textContent = station.title;
        buttonContainer.appendChild(button);
    });

    // Add event listeners to play buttons
    const playButtons = document.querySelectorAll(".playButton");
    playButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const src = button.dataset.src;
            if (audio.src === src) {
                // Toggle play/pause for the current station
                if (audio.paused) {
                    audio.play();
                    button.classList.add("played");
                } else {
                    audio.pause();
                    button.classList.remove("played");
                }
            } else {
                // Play a new station
                audio.src = src;
                audio.play();
                playButtons.forEach(function (btn) {
                    btn.classList.remove("played");
                });
                button.classList.add("played");
            }
        });
    });

    // Create link button for modal
    const linkBtn = document.createElement("button");
    linkBtn.className = linkButton.className;
    linkBtn.textContent = linkButton.text;
    linkBtn.dataset.destination = linkButton.destination;
    buttonContainer.appendChild(linkBtn);

    // Modal handling functions
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

    // Add event listener to link button
    linkBtn.addEventListener("click", function () {
        openModal(linkBtn.dataset.destination);
    });

    // Add close event to modal
    const closeModalElement = document.querySelector(".close");
    if (closeModalElement) {
        closeModalElement.addEventListener("click", function () {
            closeModal(document.querySelector(".modal"));
        });
    }
}());
