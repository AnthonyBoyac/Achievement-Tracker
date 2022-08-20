import React from 'react';
import './Game.css';
const Game = (props) => {
  let games = props.gameList.games;
  let gamesAchievements = props.gameAchievement;
  let index = 0;
  console.log(games)
  console.log(gamesAchievements)
  return (
    <div className="game_container">
      {
        games.map((game) => {
          // TODO: can't use index because both lists are unordered, find another way
          try {
            console.log(gamesAchievements[index])
            console.log(index)
            let displayAchievements = gamesAchievements[index].achievements.forEach((achievement) => {
              <div className="game_achievement">
                {achievement.apiname}
              </div>
            })
            index++;
            return (
              <div className="game" key={game.appid}>
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
