import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';
import configData from './config.json';

// store all games the user has with achievements enabled
var gameList = [];
// TODO: add below - it's used for each game component - links to game's guide
// 'https://steamcommunity.com/app/' + <appid> + '/guides/'

function fetchGames() {
  fetch('IPlayerService/GetOwnedGames/v1/?key=' + configData.apiKey + '&steamid=' + configData.steamId + '&include_appinfo=true&include_played_free_games=true&appids_filter=0')
  .then(res => res.json())
  .then(res => {
    res.response.games.forEach((game, index) => {
      gameList.push({
        gameName: game.name,
        id: game.appid,
        gameImage: game.img_icon_url,
        achievements: []
      })
      if ((res.response.games.length - 1) === index) {
        console.log("fetch achievements call")
        console.log(gameList)
        fetchAchievements();
      }
    })
  });
}

function fetchAchievements() {
  gameList.forEach((game, index) => {
    fetch('ISteamUserStats/GetSchemaForGame/v0002/?key=' + configData.apiKey + '&appid=' + game.id + '&l=english&format=json')
    .then(res => res.json())
    .then(res => {
      game.achievements = res.game.availableGameStats.achievements
    })
    if ((gameList.length - 1) === index ) {
      console.log("fetch completed achievements call")
      console.log(gameList)
      fetchCompletedAchievements();
    }
  })
}

function fetchCompletedAchievements() {
  gameList.forEach((game, index) => {
    console.log(game.achievements.length)
    if (game.achievements.length === 0) {
      // do nothing
    } else {
      fetch('ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + game.id + '&key=' + configData.apiKey + '&steamid=' + configData.steamId)
      .then(res => res.json())
      .then(res => {
          game.achievements.forEach((achievement, index) => {
            achievement.achieved = res.playerstats.achievements[index].achieved
          })
          if (index === (gameList.length - 1)) {
            console.log("rendering component")
            renderComponent();
          }
      })
    }
  })
}
fetchGames();

function renderComponent() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Game gameList={gameList} />
  );
}



