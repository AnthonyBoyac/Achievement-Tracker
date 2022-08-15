import './App.css';
import React, { useEffect } from 'react';
import configData from './config.json';
function App() {
  var allGames = {};
  useEffect(() => {
    // fetch('IPlayerService/GetOwnedGames/v1/?key=' + configData.apiKey + '&steamid=' + confidData.steamid + '&include_appinfo=true&include_played_free_games=true&appids_filter=0')
    //   .then(res => res.json())
    //   .then(res => {
    //     for (var i = 0; i < res.response.game_count; i++) {
    //       allGames[res.response.games[i].name] = res.response.games[i].appid;
    //     }
    //     console.log(configData)
    //     // console.log(res.response.game_count)
    //     // console.log('Output: ', allGames);
    //     Object.entries(allGames).forEach(game => {
    //     fetch('ISteamUserStats/GetSchemaForGame/v0002/?key=' + configData.apiKey + '&appid=' + game[1] + '&l=english&format=json')
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    //     })
    //   });
  }, []
  );

var textTest = 'ma maaaan';
  return (
    <div className="App">
      <header className="App-header">
        Here we are {textTest}
      </header>
    </div>
  );
}

export default App;
