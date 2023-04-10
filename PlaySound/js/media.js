const inputElement = document.getElementById("myFile");
inputElement.addEventListener("change", handleFiles, false);
const reprodutor = document.getElementById("my-audio")
const audio = document.createElement("audio");
let iconPlay = document.querySelectorAll("i")
let titulo = document.getElementById("titulo")
let lista = document.querySelector(".lista")



function handleFiles() {
    const fileList = this.files;
    titulo.innerHTML = fileList[0].name
    audio.src = URL.createObjectURL(fileList[0]);
    reprodutor.src = audio.src
    document.body.appendChild(audio);
}

function playAudio() {
    const audio = document.getElementById("my-audio");
    audio.play();
    iconPlay[1].innerHTML = "pause"
}

function pauseAudio() {
    const audio = document.getElementById("my-audio");
    iconPlay[1].innerHTML = "play_arrow"
    audio.pause();
}


function myFunction(x) {
    x.classList.toggle("change");
    lista.classList.toggle("lista1")
}
