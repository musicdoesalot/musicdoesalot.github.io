const buttons = document.querySelectorAll(".playButton");
const audios = document.querySelectorAll("audio");

buttons.forEach(function playButton(button, index) {
    button.addEventListener("click", function () {
        buttons.forEach((button) => button.classList.remove("blue"));

        audios.forEach(function audio(audio, audioIndex) {
            if (buttonIndex !== audioIndex || audio.currentTime > 0) {
                audio.src = "";
            } else {
                button.classList.add("blue");
                audio.src = button.dataset.src;
                audio.play();
            }
        });
    });
});
