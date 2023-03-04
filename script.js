const buttons = document.querySelectorAll(".playButton");
const audios = document.querySelectorAll("audio");

buttons.forEach((button, buttonIndex) => {
  button.addEventListener("click", () => {
    buttons.forEach((button) => button.classList.remove("blue"));

    audios.forEach((audio, audioIndex) => {
      if (buttonIndex !== audioIndex || audio.currentTime > 0) {
        audio.src = "";
      } else {
        button.classList.add("blue")
        audio.src = button.dataset.src;
        audio.play();
      }
    });
  });
});

