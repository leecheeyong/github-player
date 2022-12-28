const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

module.exports = async (musics) => {
    const browser = await puppeteer.launch();
    for(i in musics) {
    if(fs.existsSync(`./lyrics/${musics[i].slice(0, -4)}.txt`))return;
    console.log(`Fetching lyrics: ${musics[i].slice(0, -4)}`);
    try {
    const page = await browser.newPage();
    const name = musics[i].slice(0, -4).toLowerCase()
    .split("lyrics").join("")
    .split("official").join("")
    .split("mv").join("")
    .split("video").join("")
    .split("audio").join("")
    .split("(").join("").split(")").join("")
    .split("[").join("").split("]").join("")
    .split("【").join("").split("】").join("")
    .split("「").join("").split("」").join("")
    .split("《").join("").split("》").join("")
    .split("♪").join("").split("動態歌詞").join("")
    .split("cover").join("").split("mp3").join("")
    .split("ost").join("").split("歌词版").join("")
    .split("4k").join("").replace(/\s+/g,' ').trim();
        
    console.log("Browser Started");
        
    await page.goto(`https://www.google.com/search?q=site:mojim.com ${name}`, {waitUntil: 'networkidle0'});
        
    console.log("Scraping Google");
        
    await page.waitForSelector(".LC20lb", {visible: true});
    const searchResults = await page.$$eval(".LC20lb", els => 
    els.map(e => e.parentNode.href));
    if(!searchResults[0]) throw new Error("Google Search not found");
    
    console.log("Scraping Mojim", searchResults[0]);
        
    const { data } = await axios.get(`${searchResults[0]}`);
    const $ = cheerio.load(data);
    const lyrics = $('dd.fsZx3').toArray().map((x) => {
        const ele = $(x);
        ele.find("ol").remove();
        ele.find("a").remove();
        ele.find("br").replaceWith("\n");
        return ele.text().split("更多更詳盡歌詞 在").join("");
    })
    .join("\n")
    .trim();
    console.log("Processing Lyrics");
    if(!lyrics) throw new Error("Lyrics not found");
    console.log(`Lyrics: ${name}`);
    fs.writeFileSync(`./lyrics/${musics[i].slice(0, -4)}.txt`, `${lyrics}`);
    }catch(e) {
        console.log(e)
    }
    }
  await browser.close()
}
