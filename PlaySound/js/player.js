const ficheiros = document.getElementById("myFile");
const reprodutor = document.getElementById("my-audio");
const inicio = document.getElementById("inicio");
const final = document.getElementById("final");
const lista = document.querySelector(".lista");
const playPauseIcon = document.getElementById("play-pause-icon");
const audioRange = document.getElementById("audio-range");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const albumArt = document.getElementById("album-art");

class Player {
    constructor(audioElement) {
        this.audio = audioElement;
        this.files = [];
        this.currentIndex = 0;
        this.isLooping = false;
        this.isShuffling = false;

        this.audio.ontimeupdate = () => this.updateProgress();
        this.audio.onended = () => {
            if (this.isLooping && this.files.length === 1) {
                this.audio.currentTime = 0;
                this.audio.play();
            } else {
                this.next();
            }
        };

        // Volume padrão: 70%
        this.audio.volume = 0.7;
    }

    loadFiles(event) {
        this.files = Array.from(event.target.files || []);
        this.currentIndex = 0;
        this.renderPlaylist();
        if (this.files.length > 0) this.play(0);
    }

    async play(index) {
        if (typeof index === 'number') this.currentIndex = index;
        const file = this.files[this.currentIndex];
        if (!file) return;

        const url = URL.createObjectURL(file);
        this.audio.src = url;
        try {
            await this.audio.play();
        } catch (e) {
            // autoplay pode falhar; apenas atualizamos o ícone
        }
        this.updatePlayIcon();
        this.updateMusicDetails(file);
        this.renderPlaylist();
    }

    togglePlayPause() {
        if (this.audio.paused) this.audio.play(); else this.audio.pause();
        this.updatePlayIcon();
    }

    updatePlayIcon() {
        playPauseIcon.textContent = this.audio.paused ? 'play_arrow' : 'pause';
    }

    next() {
        if (this.isShuffling && this.files.length > 1) {
            this.currentIndex = Math.floor(Math.random() * this.files.length);
        } else if (this.currentIndex < this.files.length - 1) {
            this.currentIndex++;
        } else if (this.isLooping) {
            this.currentIndex = 0;
        } else {
            return;
        }
        this.play();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.play();
        }
    }

    seek() {
        const seekTime = (audioRange.value / 100) * this.audio.duration;
        if (!isNaN(seekTime)) this.audio.currentTime = seekTime;
    }

    updateProgress() {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        if (!isNaN(duration) && duration > 0) {
            const value = (currentTime / duration) * 100;
            audioRange.value = value;
            inicio.textContent = formatTime(currentTime);
            final.textContent = formatTime(duration);
        }
    }

    updateMusicDetails(file) {
        const musicName = file.name.split('.').slice(0, -1).join('.') || file.name;
        titulo.textContent = musicName;
        artista.textContent = 'Artista Desconhecido';
        albumArt.src = 'https://cdn-icons-png.flaticon.com/512/3844/3844724.png';
    }

    renderPlaylist() {
        const container = document.querySelector('.lista .clearfix') || lista;
        container.innerHTML = '';
        for (let i = 0; i < this.files.length; i++) {
            const item = document.createElement('p');
            item.textContent = this.files[i].name;
            item.setAttribute('onclick', `playMusic(${i})`);
            item.style.fontWeight = i === this.currentIndex ? 'bold' : 'normal';
            item.style.color = i === this.currentIndex ? '#ff6b9d' : 'inherit';
            item.style.cursor = 'pointer';
            container.appendChild(item);
        }
    }
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const player = new Player(reprodutor);
window.loadMusic = (e) => player.loadFiles(e);
window.togglePlayPause = () => player.togglePlayPause();
window.nextAudio = () => player.next();
window.prevAudio = () => player.prev();
window.seekAudio = () => player.seek();
window.playMusic = (i) => player.play(i);
window.setVolume = (v) => { player.audio.volume = v / 100; };
window.toggleMute = () => { 
    player.audio.muted = !player.audio.muted;
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) muteBtn.textContent = player.audio.muted ? 'volume_off' : 'volume_up';
};
window.toggleLoop = () => {
    player.isLooping = !player.isLooping;
    const loopBtn = document.getElementById('loop-btn');
    if (loopBtn) loopBtn.style.opacity = player.isLooping ? '1' : '0.5';
};
window.toggleShuffle = () => {
    player.isShuffling = !player.isShuffling;
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) shuffleBtn.style.opacity = player.isShuffling ? '1' : '0.5';
};

if (ficheiros) ficheiros.addEventListener('change', player.loadFiles.bind(player));
