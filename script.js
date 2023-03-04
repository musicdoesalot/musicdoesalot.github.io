const buttons = document.querySelectorAll(".playButton");
const audios = document.querySelectorAll("audio");

buttons.forEach(function playButton(button, buttonIndex) {
    button.addEventListener("click", function () {
        buttons.forEach(function (button) {
            button.classList.remove("blue");
        });
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
