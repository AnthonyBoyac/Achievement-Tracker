import React from 'react';
import './Game.css';
const Game = (props) => {
  let games = props.gameList;
  return (
    <div className="game_container">
      {
        games.map((game) => {
          try {
            let displayAchievements = game.achievements.map((achievement) => {
              return (
                <div className="game_achievement">
                {achievement.name}
              </div>
              )
            })
            return (
              <div className="game" key={game.id}>
                Name: {game.name}
                {displayAchievements}
              </div>
            );
          } catch (error) {
            console.log("gone too far")
          }

        })
      }

    </div>
  );

}

export default Game;
