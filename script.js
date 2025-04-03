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
        src: "https://relay2.radiotoolkit.com/svoefm",
        title: "CBOE FM"
    }, {
        src: "https://relay2.radiotoolkit.com/rcmdeep",
        title: "Relax Club Music"
    }, {
        src: "https://relay1.radiotoolkit.com/spdeep",
        title: "SoundPark #Deep"
    }, {
        src: "https://relay2.radiotoolkit.com/spclassic",
        title: "SoundPark Classic"
    }, {
        src: "https://relay2.radiotoolkit.com/delishdeep",
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
    }];
    // Define the link button for the modal
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

    /**
     * Create a play button for a given radio station.
     * Uses regular functions and adds ARIA attributes for accessibility.
     */
    function createPlayButton(station) {
        const button = document.createElement("button");
        button.classList.add("playButton", "btnA-primary", "btnA");
        button.dataset.src = station.src;
        button.textContent = station.title;
        button.setAttribute("aria-label", "Play " + station.title);
        return button;
    }

    /**
     * Setup and return a single audio element.
     */
    function setupAudioPlayer() {
        const audio = document.createElement("audio");
        audio.preload = "none";
        document.body.appendChild(audio);
        return audio;
    }

    /**
     * Setup modal handlers including creating the modal link button,
     * and adding extra behavior such as closing modal when clicking outside it
     * or pressing the ESC key.
     */
    function setupModalHandlers() {
        // Function to open modal given its target selector.
        function openModal(target) {
            const modal = document.querySelector(target);
            if (modal) {
                modal.classList.add("active");
            }
        }

        // Create and append the link button for opening the modal.
        const linkBtn = document.createElement("button");
        linkBtn.className = linkButton.className;
        linkBtn.textContent = linkButton.text;
        linkBtn.setAttribute("data-destination", linkButton.destination);
        linkBtn.setAttribute("aria-label", linkButton.text);
        buttonContainer.appendChild(linkBtn);

        // Add event listener to open modal when linkBtn is clicked.
        linkBtn.addEventListener("click", function () {
            openModal(linkBtn.getAttribute("data-destination"));
        });

        // Add event listener to close modal when the close element is clicked.
        const closeModalElement = document.querySelector(".close");
        if (closeModalElement) {
            closeModalElement.addEventListener("click", function () {
                const modal = document.querySelector(".modal");
                if (modal) {
                    modal.classList.remove("active");
                }
            });
        }

        // Optional: Close modal if user clicks outside modal content.
        window.addEventListener("click", function (event) {
            const modal = document.querySelector(".modal");
            if (
                modal &&
                modal.classList.contains("active") &&
                event.target === modal
            ) {
                modal.classList.remove("active");
            }
        });

        // Optional enhancement: Close modal on ESC key press.
        document.addEventListener("keydown", function (event) {
            const modal = document.querySelector(".modal");
            if (
                modal &&
                modal.classList.contains("active") &&
                event.key === "Escape"
            ) {
                modal.classList.remove("active");
            }
        });
    }

    // Setup a single audio element.
    const audio = setupAudioPlayer();

    // Create and append play buttons for each radio station.
    radioStations.forEach(function (station) {
        const button = createPlayButton(station);
        buttonContainer.appendChild(button);
    });

    // Use event delegation on the button container for play buttons.
    buttonContainer.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("playButton")) {
            const src = target.dataset.src;
            // Compare the current audio src using a simple string comparison.
            if (audio.src === src) {
                // Toggle play/pause on the current station.
                if (audio.paused) {
                    audio.play();
                    target.classList.add("played");
                } else {
                    audio.pause();
                    target.classList.remove("played");
                }
            } else {
                // Play the new station.
                audio.src = src;
                audio.play();
                // Remove 'played' class from all play buttons.
                const playButtons = buttonContainer.querySelectorAll(
                    ".playButton"
                );
                Array.prototype.forEach.call(playButtons, function (btn) {
                    btn.classList.remove("played");
                });
                target.classList.add("played");
            }
        }
    });

    // Initialize modal handlers.
    setupModalHandlers();
}());
