# Github Player
Music player hosted on Github Pages, powered by Github Actions. Web player that serves mp3 files.

## Features
- **Lyrics** - Scrapes lyrics from google
- **Support for quick actions** - Buttons like skip/pause/play will work
- **Well optimized** - Easy on browsers
- **Pick & Play** - Categorize your music (group them together)

## How it works ?
- [index.js](/index.js) - Fetches data from a YouTube playlist
- Then, it'll download them one by one and save those audio to [/music](/music) directory in the repository
- It'll also create a list that helps user to search for their music [playlist.json](/playlist)
- Github pages will then deploy everything and serve [index.html](/index.html) - the player and the assets
- Check out [stats.md](./stats.md) for all the useful stats

## About
This project is mainly an improved version of [codingstudios' yt-player](https://github.com/codingstudios/yt-player) by the same author [@leecheeyong](https://github.com/leecheeyong). 

This project offers better user experience, bug fixes, higher quality audio, more features, more reliable, user friendly and well optimized for browsers. It still uses the original design despite that many things were changed. 

## Getting Started
1. Fork this repository
2. You can choose to delete all the existing .mp3 files in [/music](/music) by running a script 
3. Goto [index.js](/indde.js) & change the value of `PLAYLIST_ID`
4. **"Run"** the github action

## Like this project ?
Feel free to give this project a star and also give a follow to the contributors. If you're planning to use any code from this project, please do give
credit to this repository & the author.

## License 
This project is available as open source under the terms of the [AGPL-3.0 License](/LICENSE)
