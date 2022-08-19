import React from 'react';
const Game = (games) => {
  games = games.gameList.games;
  console.log(games);
  return (
    <div>
      {
        games.map((game) => {
          console.log(game)
          return (
            <div className="game_container" key={game.appid}>
              <header className="game_name">
                Name: {game.name}
              </header>
            </div>
          );
        })
      }

    </div>
  );

}

export default Game;
