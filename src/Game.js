import React from 'react';
import './Game.css';
const Game = (games) => {
  games = games.gameList.games;
  console.log(games);
  return (
    <div className="game_container">
      {
        games.map((game) => {
          console.log(game);
          return (
            <div className="game" key={game.appid}>
              Name: {game.name}
            </div>
          );
        })
      }

    </div>
  );

}

export default Game;
