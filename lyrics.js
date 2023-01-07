const { fetch, setRelays } = require("fetch-relay");
const decode = require('html-entities').decode;
const cheerio = require('cheerio');


setRelays(['https://cors-relay.vercel.app', 'https://proxy-3-one.vercel.app/', 'https://fetches-red.vercel.app', 'https://relay-1.vercel.app', 'https://relay-2.vercel.app', 'https://relay-3.vercel.app', 'https://relay-4.vercel.app', 'https://relay-5.vercel.app']);

function removeChorus(lyrics) {
    return lyrics.replace(/\[[^\]]+\]\n?/g, "");
}

module.exports = (songName) => {
    return fetch({ url: encodeURI(`https://genius.com/api/search/multi?per_page=1&q=${songName}`), headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'} }).then(({ data }) => {
        const song = {
            artist: data.response.sections[0].hits[0].result.primary_artist.name,
            title:  data.response.sections[0].hits[0].result.title,
            cover:  data.response.sections[0].hits[0].result.song_art_image_url,
            url:   data.response.sections[0].hits[0].result.url,
        };
        return fetch({ url: data.response.sections[0].hits[0].result.url }).then(response => {
            var { data } = response;
            const $ = cheerio.load(data);

            const selectors = [
                () => $(".lyrics").text().trim(),
                () =>
                    $("div[class*='Lyrics__Container']")
                        .toArray()
                        .map((x) => {
                            const ele = $(x);
                            ele.find("br").replaceWith("\n");
                            return ele.text();
                        })
                        .join("\n")
                        .trim(),
            ];
            
        for (const x of selectors) {
            const lyrics = x();
            if (lyrics?.length) {
                return removeChorus ? removeChorus(lyrics) : lyrics;
            }
        }
        });
    });
};
