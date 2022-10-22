const ytdl = require('ytdl-core');
const fs = require('fs');
const yts = require('yt-search');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
const content = [];
var count = 0;
const music = fs.readdirSync('./music').filter(file => file.endsWith('.mp3'));

music.forEach(async (file) => {
  try {
    const video = await yts(file.slice(0, -4));
    const stream = ytdl(video?.all[0].url, { filter: 'audioonly' });
    count++;
    content.push({
      name: `${video?.all[0]?.title}`,
      track: `./music/${file}`,
      id: `${video?.all[0]?.videoId}`,
      trackNumber: count
    });
    fs.writeFileSync("./playlist.json", JSON.stringify(content));
    const stats = fs.statSync(`./music/${file}`);
    const fileSizeInBytes = stats.size;
    const size = fileSizeInBytes / (1024*1024);
    if(size > 1) return;
    ffmpeg(stream)
          .audioBitrate(128)
          .format('mp3')
          .save(fs.createWriteStream(`./music/${file}`, { flags: 'a' }));
  }catch(e) {console.log(e)}
})

