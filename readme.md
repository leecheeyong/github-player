# Github Player
Music player hosted on Github Pages, powered by Github Actions. Web player that serves mp3 files.

## How it works ?
- [index.js](/index.js) - Fetches data from a YouTube playlist
- Then, it'll download them one by one and save those audio to [/music](/music) directory in the repository
- It'll also create a list that helps user to search for their music [playlist.json](/playlist.json)
- Github pages will then deploy everything and serve [index.html](/index.html) - the player and the assets

## About
This project is mainly an improved version of [codingstudios' yt-player](https://github.com/codingstudios/yt-player) by the same author [@leecheeyong](https://github.com/leecheeyong). 

This project offers better user experience, bug fixes, higher quality audio, more features, more reliable, user friendly and well optimized for browsers. It still uses the original design despite that many things were changed. 

## Like this project ?
Feel free to give this project a star and also give a follow to the contributors. If you're planning to use any code from this project, please do give
credit to this repository & the author.

## License 
This project is available as open source under the terms of the [AGPL-3.0 License](/LICENSE)
