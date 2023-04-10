const inputElement = document.getElementById("myFile");
inputElement.addEventListener("change", handleFiles, false);
  const reprodutor =  document.getElementById("my-audio")
function handleFiles() {
  const fileList = this.files;
  const audio = document.createElement("audio");
  audio.src = URL.createObjectURL(fileList[0]);
  reprodutor.src = audio.src
  window.URL = audio.src

  document.body.appendChild(audio);
}

function playAudio() {
  const audio = document.getElementById("my-audio");
  audio.play();
}

function pauseAudio() {
  const audio = document.getElementById("my-audio");
  audio.pause();
}
