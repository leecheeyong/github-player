// handcoded by Chee Yong Lee
// view license https://github.com/CodingStudios/google-drive-player
const playlist = document.getElementById("playlist");
const slidebar = document.getElementById("slidebar");
const pauseButton = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 255);"><path d="M8 7h3v10H8zm5 0h3v10h-3z"></path></svg>';
const playButton = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255,255,255,255);"><path d="M7 6v12l10-6z"></path></svg>'
var currentTrack = 0;
var list = [];
var timestamp = document.getElementById("timestamp");
const audio = new Audio();
const control = document.getElementById("control");
var currentTrackName = document.getElementById("nowPlaying");

function playAudio(track, name) {
    audio.src = `${track}`;
    currentTrack = list.find(e=> e.track == track).trackNumber;
    currentTrackName.textContent = name;
    audio.play();
    control.innerHTML = pauseButton;
    playing = true;
}

window.onload = () => {
var playing = false;
fetchPlaylist();
function fetchPlaylist() {
fetch(`./playlist.json`).then(r=>r.json()).then(r=> {
    list = decodeURIComponent(r);
    r.forEach(e => {
        var music = document.createElement("div");
        music.textContent = decodeURIComponent(e.title);
        music.onclick = () => {
            playAudio(decodeURIComponent(e.track), decodeURIComponent(e.title));
        }     
        music.classList.add("music");
       playlist.appendChild(music);
    })
});
}
/*playlist.onscroll = () => {
    if(playlist.scrollTop + playlist.clientHeight >= playlist.scrollHeight) {
        fetchPlaylist();
    }
}*/
control.addEventListener("click", () => {
    if(!list) return;
    if(!currentTrack && !currentTrackName) return playAudio(list[0].track, list[0].title);
    if (!playing) {
        playing = true;
        audio.play();
        control.innerHTML = pauseButton;
    } else {
        playing = false;
        audio.pause();
        control.innerHTML = playButton;
    }
})

audio.addEventListener("ended", () => {
    if(currentTrack == list.length) return;
    playAudio(list[currentTrack + 1].track, list[currentTrack].title);
})

document.getElementById("previous").addEventListener("click", () => {
    if(!list) return;
    if(!currentTrack && !currentTrackName) return playAudio(1, list[0].title);
    if(currentTrack == 1) return;
    playAudio(list[currentTrack - 1].track, list[currentTrack - 2].title);
});

document.getElementById("next").addEventListener("click", () => {
    if(!list) return;
    if(!currentTrack && !currentTrackName) return playAudio(1, list[0].title);
    if(currentTrack == list.length) return;
    playAudio(list[currentTrack + 1].track, list[currentTrack].title);
});

audio.ontimeupdate = function () {
    timestamp.textContent = timeFormat(audio.currentTime);
   slidebar.value = audio.currentTime / audio.duration * 100;
}

slidebar.oninput = (e) => {
  audio.currentTime = audio.duration / 100 * slidebar.value, audio.duration;
}

function timeFormat(ct) {
    minutes = Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);
  
    if (seconds < 10) {
      seconds = "0"+seconds;
    }
  
    return minutes + ":" + seconds;
}

}
