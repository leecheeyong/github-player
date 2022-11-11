// handcoded by Chee Yong Lee
// view license https://github.com/leecheeyong/github-player
const playlist = document.getElementById("playlist");
const searchBar = document.getElementById("search");
var currentTrack = 0;
var list = [];
var loaded = [];
const queue = [];
var page = 0;

function debounce(cb, delay = 1000) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

function appendChild(e) {
    var music = document.createElement("div");
    music.textContent = decodeURIComponent(e.title);
    music.onclick = () => {
        if(queue.find(a => a.track === e.track)){
            var indx = queue.findIndex(i => i.track === e.track && i.title === e.title);
            queue.splice(indx, indx >= 0 ? 1 : 0);
            music.style.backgroundColor = "transparent";
        }else {
        queue.push({ title: e.title, track: e.track, trackNumber: queue.length + 1 });
        music.style.backgroundColor = "#383838";
        }
    }
    music.classList.add("music");
   playlist.appendChild(music);
}

function search(name) {
  if(!name) {
    loaded.forEach(e => {
       appendChild(e)
    })
  }else {
  playlist.replaceChildren();
  const result = list.filter(e=>decodeURIComponent(e.title).toLowerCase().split(" ").join("").includes(`${name}`.toLowerCase().split(" ").join("")));
  if(result.length == 0) {
     var music = document.createElement("div");
     music.textContent = "No Result"; music.classList.add("music"); playlist.appendChild(music);
  }else {
  result.forEach(e => {
    appendChild(e)
    })
  }
  }
}
searchBar.onkeydown = () => search(searchBar.value);

document.getElementById("save").addEventListener('click', () => {
  navigator.clipboard.writeText(JSON.stringify(queue));
  document.getElementById("save").textContent = "Copied!";
})

window.onload = () => {
fetchPlaylist();
fetch(`./playlist/playlist.json`).then(r=>r.json()).then(r=> { list = r });
function fetchPlaylist() {
fetch(`./playlist/playlist-${page}.json`).then(r=>r.json()).then(r=> {
    r.list.forEach(e => {
       appendChild(e)
    })
    page++;
    loaded = loaded.concat(r.list);
});
}
document.addEventListener('scroll', (event) => {
    if((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) {
        fetchPlaylist();
    }
});
}
