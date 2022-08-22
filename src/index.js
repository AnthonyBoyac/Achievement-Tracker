import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';
import configData from './config.json';

// store all games the user has with achievements enabled
var gameList = [];
// TODO: add below - it's used for each game component - links to game's guide
// 'https://steamcommunity.com/app/' + <appid> + '/guides/'

let fetchRequest = new Promise((resolve, reject) => {
  fetch('IPlayerService/GetOwnedGames/v1/?key=' + configData.apiKey + '&steamid=' + configData.steamId + '&include_appinfo=true&include_played_free_games=true&appids_filter=0')
  .then(res => res.json())
  .then(res => {
    res.response.games.forEach((game) => {
      gameList.push({
        gameName: game.name,
        id: game.appid,
        gameImage: game.img_icon_url,
        achievements: []
      })
    })

    gameList.forEach(game => {
      fetch('ISteamUserStats/GetSchemaForGame/v0002/?key=' + configData.apiKey + '&appid=' + game.id + '&l=english&format=json')
      .then(res => res.json())
      .then(res => {
        game.achievements = res.game.availableGameStats.achievements
      })
    })
  });
  setTimeout(() => {
    gameList.forEach((game) => {
      if (game.id === 599390 || game.id === 359550 || game.id === 623990) {
  
      } else {
        fetch('ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + game.id + '&key=' + configData.apiKey + '&steamid=' + configData.steamId)
        .then(res => res.json())
        .then(res => {
          game.achievements.forEach((achievement, index) => {
            achievement.achieved = res.playerstats.achievements[index].achieved
          })
        })
      }
  
    })

  }, 2000)
  setTimeout(() => {
    resolve();
  }, 6000);

})
fetchRequest.then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Game gameList={gameList} />
  );
})



