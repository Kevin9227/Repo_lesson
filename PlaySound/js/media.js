const ficheiros = document.getElementById("myFile");
ficheiros.addEventListener("change", handleFiles, false);
const reprodutor = document.getElementById("my-audio")
const audio = document.createElement("audio");
let iconPlay = document.querySelectorAll("i")
let titulo = document.getElementById("titulo")
let lista = document.querySelector(".lista")
let gif = document.querySelector("img")




function handleFiles() {
    const fileList = this.files;
    titulo.innerHTML = fileList[0].name
    audio.src = URL.createObjectURL(fileList[0]);
    reprodutor.src = audio.src
    document.body.appendChild(audio);
    listdereproducao();
}

function playAudio() {
    const audio = document.getElementById("my-audio");
    audio.play();
    iconPlay[1].innerHTML = "pause";
    gif.style.opacity = "100%"
}

function pauseAudio() {
    const audio = document.getElementById("my-audio");
    iconPlay[1].innerHTML = "play_arrow"
    audio.pause();
    gif.style.opacity = "0%"
}


function myFunction(x) {
    x.classList.toggle("change");
    lista.classList.toggle("lista1")
}

function listdereproducao() {
    if (ficheiros.files.length > 0) {
        for (i = 0; i <= ficheiros.files.length; i++) {
            lista.innerHTML += `
                <p>${ficheiros.files[i].name}</p>
                `

        }
    }
}
