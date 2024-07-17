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
            button.classList.add("playButton", "btnA-primary", "btnA");
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

    const buttons = document.querySelectorAll(".playButton");
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
        const closeModalElement = document.querySelector(".close");
        closeModalElement.addEventListener("click", function () {
            closeModal(document.querySelector(".modal"));
        });
    }
    addCloseEventToModal();
}());
