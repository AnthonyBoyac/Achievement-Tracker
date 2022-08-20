import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';
import configData from './config.json';

// store all games the user has with achievements enabled
var allGames = {};
var allGamesAchievements = [];
// TODO: add below - it's used for each game component - links to game's guide
// 'https://steamcommunity.com/app/' + <appid> + '/guides/'

let fetchRequest = new Promise((resolve, reject) => {
  fetch('IPlayerService/GetOwnedGames/v1/?key=' + configData.apiKey + '&steamid=' + configData.steamId + '&include_appinfo=true&include_played_free_games=true&appids_filter=0')
  .then(res => res.json())
  .then(res => {
    allGames = res.response;
    // console.log(allGamesAchievements)
    // allGames.games.forEach(game => {
    //   fetch('ISteamUserStats/GetSchemaForGame/v0002/?key=' + configData.apiKey + '&appid=' + game.appid + '&l=english&format=json')
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    // })
  });
  setTimeout(() => {
    allGames.games.forEach((game, index) => {
      if (game.appid === 599390 || game.appid === 359550 || game.appid === 623990) {
  
      } else {
        fetch('ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + game.appid + '&key=' + configData.apiKey + '&steamid=' + configData.steamId)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          allGamesAchievements.push(res.playerstats)
        })
      }
  
    })

  }, 2000)
  setTimeout(() => {
    resolve();
  }, 5000);

})
fetchRequest.then(() => {
  console.log(allGamesAchievements)
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Game gameList={allGames} gameAchievement={allGamesAchievements} />
  );
})



