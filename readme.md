# Github Player
Music player hosted on Github Pages, powered by Github Actions.

## How it works ?
- [index.js](/index.js) - Fetches data from a YouTube playlist
- Then, it'll download them one by one and save to [/music](/music) directory in the repository
- It'll also create a list that helps user to search for their music [playlist.json](/playlist.json)
- Github pages will then deploy everything and serve [index.html](/index.html) - the player and the assets

## About
This project is mainly an improved version of [codingstudios](https://github.com/codingstudios/yt-player) by the same author. 
This project offers better user experience, bug fixes, more features, more reliable and user friendly. It still uses the original design despite that
many things were changed.

