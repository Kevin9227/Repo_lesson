const ficheiros = document.getElementById("myFile");
ficheiros.addEventListener("change", handleFiles, false);
const reprodutor = document.getElementById("my-audio")
//const audio = document.createElement("audio");
 
let iconPlay = document.querySelectorAll("i")
 
let inicio = document.getElementById("inicio")
let final = document.getElementById("final")
let lista = document.querySelector(".lista")
let gif = document.querySelector("img")
let audio = document.getElementById("my-audio");
let playPauseIcon = document.getElementById("play-pause-icon");
let audioRange = document.getElementById("audio-range");
let titulo = document.getElementById("titulo");
let artista = document.getElementById("artista");
let albumArt = document.getElementById("album-art");
let playlist = [];  // Array para armazenar as músicas na playlist
let currentIndex = 0;  // Índice da música atual

// Função para carregar músicas
function loadMusic(event) {
    
    musicFiles = Array.from(event.target.files);
    if (musicFiles.length > 0) {
        playMusic(0); // Começar com a primeira música
        togglePlayPause()
        // Adicionar músicas à playlist
    }
}
 // Função para adicionar músicas à playlist
/*  function adicionarMusica() {
    const files = document.getElementById("myFile").files;

    for (let file of ficheiros) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Criar uma nova música para a playlist
            const music = {
                title: file.name,
                artist: 'Desconhecido', // Se quiser, você pode usar a biblioteca jsmediatags para buscar o artista
                albumArt: 'https://i1.sndcdn.com/artworks-AlkCxNKtoNyprK4d-KMCozg-t500x500.jpg', // A capa do álbum (use a que preferir)
                src: e.target.result  // Caminho para o arquivo de áudio
            };
            playlist.push(music);
            atualizarPlaylist();
        };

        reader.readAsDataURL(file); // Lê o arquivo e converte em URL
    }
} */
// Função para tocar música
function playMusic(index) {
    const music = musicFiles[index];
    const reader = new FileReader();
    reader.onload = function (e) {
        audio.src = e.target.result;
        audio.play();
        updateMusicDetails(music);
    };
    reader.readAsDataURL(music);

}

// Atualizar título, artista e capa do álbum
function updateMusicDetails(music) {
    const musicName = music.name.split('.')[0]; // Nome da música sem extensão
    titulo.textContent = musicName;
    artista.textContent = "Artista Desconhecido"; // Você pode adicionar um campo para artista, se necessário
    albumArt.src = "https://cdn-icons-png.flaticon.com/512/3844/3844724.png"; // Defina uma capa padrão ou extraia do arquivo se possível
}

// Função de play/pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.textContent = "pause";
    } else {
        audio.pause();
        playPauseIcon.textContent = "play_arrow";
    }
}

// Função para avançar a música
function nextAudio() {
    if (currentIndex < musicFiles.length - 1) {
        currentIndex++;
        playMusic(currentIndex);
    }
}

// Função para retroceder a música
function prevAudio() {
    if (currentIndex > 0) {
        currentIndex--;
        playMusic(currentIndex);
    }
}

// Atualizar a barra de progresso com o tempo da música
audio.ontimeupdate = function () {
    let currentTime = audio.currentTime;
    let duration = audio.duration;
    if (!isNaN(duration)) {
        let value = (currentTime / duration) * 100;
        audioRange.value = value;
        
        // Atualizar tempo
        document.getElementById("inicio").textContent = formatTime(currentTime);
        document.getElementById("final").textContent = formatTime(duration);
    }
    if( currentTime == duration){
        nextAudio()
    }
};

// Formatar o tempo (ex: 01:30)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Mover a música para a posição escolhida na barra
function seekAudio() {
    const seekTime = (audioRange.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function handleFiles(nf) {
    if (nf = 0) {
        const fileList = this.files;
        console.log(fileList)
        titulo.innerHTML = fileList[0].name
        inicio.innerHTML = '5'
        console.log(fileList)
        audio.src = URL.createObjectURL(fileList[0]);
        reprodutor.src = audio.src
    } else {
        const fileList = this.files;
        titulo.innerHTML = fileList[nf].name
        console.log(fileList)
        audio.src = URL.createObjectURL(fileList[nf]);
        reprodutor.src = audio.src
    }
    listdereproducao()

    /*const fileList = this.files;
    titulo.innerHTML = fileList[nf].name
    console.log(fileList)
    audio.src = URL.createObjectURL(fileList[nf]);
    reprodutor.src = audio.src
    //document.body.appendChild(audio);
    listdereproducao();*/
}
var no = 0

 

function myFunction(x) {
    x.classList.toggle("change");
    lista.classList.toggle("clearfix")
}

function listdereproducao() {
    if (ficheiros.files.length > 0) {
        for (i = 0; i <= ficheiros.files.length; i++) {
            lista.innerHTML +=
                ` <p onclick="playMusic(${i})">${ficheiros.files[i].name}</p>
                `
        }
    }
}

/* function avancar(next) {
    const audio = document.getElementById("my-audio");
    audio.play();
}

function recuar(back) {
    const audio = document.getElementById("my-audio");
    audio.play();
}
 */

 