import './App.css';
import React, { useEffect } from 'react';
function App() {
  var allGames = {};
  useEffect(() => {
    fetch('IPlayerService/GetOwnedGames/v1/?key=&steamid=76561198429268611&include_appinfo=true&include_played_free_games=true&appids_filter=0')
      .then(res => res.json())
      .then(res => {
        for (var i = 0; i < res.response.game_count; i++) {
          allGames[res.response.games[i].name] = res.response.games[i].appid;
        }
        console.log(res.response.game_count)
        console.log('Output: ', allGames);
        Object.entries(allGames).forEach(game => {
        fetch('ISteamUserStats/GetSchemaForGame/v0002/?key=&appid=' + game[1] + '&l=english&format=json')
        .then(res => res.json())
        .then(res => console.log(res))
        })
      });
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
