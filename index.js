const PLAYLIST_ID = "PLZWWMH435D5qGlDo-h3ML7gCi6EXGr9Cw";
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const getSize = require('get-folder-size');
const { performance } = require('perf_hooks');
const ytdl = require('ytdl-core');
const search = require("youtube-sr").default;
const fs = require('fs');
const { Collection } = require('@discordjs/collection');
const collection = new Set();
const collection2 = new Collection();
const path = require('path');
const downloaded = [];
const cannot = [ ];
const content = [];
const playlist = [];
const thisDownload = [];

const all = [];
var trackNumber = 0;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getAudio = (video) => new Promise((resolve, reject) => {
    var stream = ytdl(video?.url, { filter: 'audioonly' });
    var file = fs.createWriteStream(`./music/${video?.title.split("/").join(" ").split(".").join(" ")}.mp3`);
    ffmpeg(stream)
    .format('mp3') 
    .save(file) 
    .on('end', () => {
        collection.add(`${video?.title}`); 
        resolve(`Done ${video?.title}`);
    })  
});        

async function run() {
    var jobStartTime = performance.now();
    const dir = fs.readdirSync('./music').filter(file => file.endsWith('.mp3'));
    for (i in dir) {
      //  fs.unlinkSync(`./music/${dir[i]}`);
        collection.add(dir[i].slice(0, -4));
        downloaded.push(dir[i].slice(0, -4));
    }      
    await wait(5000);  
    const data = (await search.getPlaylist(PLAYLIST_ID).then(playlist => playlist.fetch()));
    if(!Array.isArray(data?.videos)) throw new Error("No videos found"); 
     var videos = data.videos;  
    var startDownloadTime = performance.now();
     for(i in videos) { 
        all.push(videos[i].title);   
        collection2.set(videos[i].title, videos[i].url);
       if(!collection.has(videos[i]?.title.split("/").join(" ").split(".").join(" "))) { 
        try {
         console.log(await getAudio(videos[i]));  
         downloaded.push(videos[i]?.title);
         thisDownload.push(videos[i]?.title);
         console.log(downloaded.length, videos.length, i)
        }catch(e) {console.log(e)}
       }   
    }
    var endDownloadTime = performance.now();
    console.log(all.length, downloaded.length);
    const music = fs.readdirSync('./music').filter(file => file.endsWith('.mp3'));
    for(i in music){
      trackNumber++;
        content.push({
            title: `${encodeURIComponent(music[i].slice(0, -4))}`,
            track: `./music/${encodeURIComponent(music[i])}`,
            trackNumber
        })
      await lyrics(music[i].slice(0, -4));
      }
    for (let i = 0; i < content.length; i += 20) {
         playlist.push(content.slice(i, i + 20));
    }
    playlist.forEach((e, i) => {
          fs.writeFileSync(`./playlist/playlist-${i}.json`, JSON.stringify({
            page: i,
            list: e,
            totalPages: playlist.length
        }));
    })
    fs.writeFileSync(`./playlist/playlist.json`, JSON.stringify(content));
    const statsPlaylist = fs.statSync("./playlist/playlist.json");
    function bts(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };
    var jobEndTime = performance.now();
    getSize('./music', (err, size) => 
      fs.writeFileSync(`./stats.md`, 
 `## Github Player Stats\n\n#### **Total audio files**: ${music.length}\n\n#### **Total size of audio files**: ${bts(size)}\n\n#### **Playlist index file size**: ${bts(statsPlaylist.size)}\n\n#### **Current download**: ${thisDownload.length}\n\n#### **Download time consumed**: ${msTmin(endDownloadTime - startDownloadTime)} minutes\n\n#### **Total job time consumed**: ${msTmin(jobEndTime - jobStartTime)} minutes`
    ));
};

run();

async function lyrics(title) {
  const query = title.toLowerCase()
  .replace("lyrics", "")
  .replace("official", "")
  .replace("mv", "")
  .replace("video", "")
  .replace("(", "").replace(")", "")
  .replace("[", "").replace("]", "")
  .replace("【", "").replace("】", "")
  .replace("「", "").replace("」", "")
  .replace("《", "").replace("》", "")
  .split("-");
  try {
   if(!query) return;  
    const { lyrics } = (await axios.get(`https://some-random-api.ml/lyrics?title=${query.join(" ")}`)).data;
    if(!lyrics) return;
    fs.writeFileSync(`./lyrics/${title}.txt`, `${lyrics}`);
  }catch(e) {}
}

function msTmin(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

process.on('uncaughtException', async function (err) {
   console.log(err)
});  
