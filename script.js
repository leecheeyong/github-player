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
    name = decodeURIComponent(name);
    track = decodeURIComponent(track);
    audio.src = `${track}`;
    currentTrack = list.find(e=> decodeURIComponent(e.track) == track && decodeURIComponent(e.title) == name).trackNumber - 1;
    currentTrackName.textContent = name;
    audio.play();
    if ("mediaSession" in navigator) { navigator.mediaSession.metadata = new MediaMetadata({ title: `${name}` }); }
    navigator.mediaSession.playbackState = 'playing';
    control.innerHTML = pauseButton;
    playing = true;
}

window.onload = () => {
var playing = false;
fetchPlaylist();
function fetchPlaylist() {
fetch(`./playlist.json`).then(r=>r.json()).then(r=> {
    list = r;
    r.forEach(e => {
        var music = document.createElement("div");
        music.textContent = decodeURIComponent(e.title);
        music.onclick = () => {
            playAudio(e.track, e.title);
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
function playPause() {
if(!list) return;
    if(!currentTrack && !currentTrackName) return playAudio(list[0].track, list[0].title);
    if (!playing) {
        playing = true;
        audio.play();
        navigator.mediaSession.playbackState = 'playing';
        control.innerHTML = pauseButton;
    } else {
        playing = false;
        audio.pause();
        navigator.mediaSession.playbackState = 'paused';
        control.innerHTML = playButton;
    }
}
control.addEventListener("click", () => playPause());
/* https://web.dev/media-session/ */

navigator.mediaSession.setActionHandler('play', () => playPause());
navigator.mediaSession.setActionHandler('pause', () => playPause());

audio.addEventListener("ended", () => {
    if(currentTrack == list.length) return;
    playAudio(list[currentTrack + 1].track, list[currentTrack + 1].title);
})
    
function playPrevious() {
 if(!list) return;
    if(!currentTrack && !currentTrackName) return playAudio(list[0].track, list[0].title);
    if(currentTrack == 1) return;
    playAudio(list[currentTrack - 1].track, list[currentTrack - 1].title);
}

document.getElementById("previous").addEventListener("click", () => playPrevious());
navigator.mediaSession.setActionHandler('previoustrack', () => playPrevious());

function playNext() {
  if(!list) return;
  if(!currentTrack && !currentTrackName) return playAudio(list[0].track, list[0].title);
  if(currentTrack == list.length) return;
  playAudio(list[currentTrack + 1].track, list[currentTrack + 1].title);
}
    
document.getElementById("next").addEventListener("click", () => playNext());
navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
 
function updatePositionState() {
  if ('setPositionState' in navigator.mediaSession) {
    navigator.mediaSession.setPositionState({
      duration: audio.duration,
      position: audio.currentTime,
    });
  }
}
audio.ontimeupdate = function () {
    updatePositionState();
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
