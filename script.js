const buttons = document.querySelectorAll(".playButton");
const audios = document.querySelectorAll("audio");

function playButton(button, buttonIndex) {
    button.addEventListener("click", function () {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("blue");
        }
        for (let i = 0; i < audios.length; i++) {
            if (buttonIndex !== i || audios[i].currentTime > 0) {
                audios[i].src = "";
            } else {
                button.classList.add("blue");
                audios[i].src = button.dataset.src;
                audios[i].play();
            }
        }
    });
}

for (let i = 0; i < buttons.length; i++) {
    playButton(buttons[i], i);
}
