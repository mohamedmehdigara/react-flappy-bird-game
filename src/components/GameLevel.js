import React, { useState } from "react";
import styled from "styled-components";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

const GameLevelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  margin: 10px;
`;

const ScoreComponent = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: black;
`;

const EnemiesRemainingComponent = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: black;
`;

const GameLevelTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
`;

const ButtonBase = styled.button`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const PauseButton = styled(ButtonBase)`
  background-color: gray;
  color: black;
`;

const RestartButton = styled(ButtonBase)`
  background-color: green;
  color: white;
  pointer-events: ${(props) => (props.loading ? "none" : "auto")};
`;

const ProgressBar = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ProgressIndicator = styled.div`
  background-color: #007bff;
  width: ${(props) => props.progress}%;
  height: 100%;
  position: absolute;
  left: 0;
`;

const PositionedDiv = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const PowerUp = styled(PositionedDiv)`
  background-color: green;
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const Obstacle = styled(PositionedDiv)`
  background-color: red;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const GameLevel = ({ level, loading, score, enemiesRemaining, progress }) => {
  const [isGamePaused, setIsGamePaused] = useState(false);

  const levels = ["Level 1", "Level 2", "Level 3"];
  const gameLevel = levels[level];

  const handlePauseToggle = () => {
    setIsGamePaused(!isGamePaused);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <GameLevelContainer key={level}>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <ScoreComponent>Score: {score}</ScoreComponent>
          <EnemiesRemainingComponent>
            Enemies Remaining: {enemiesRemaining}
          </EnemiesRemainingComponent>
          <GameLevelTitle>{gameLevel}</GameLevelTitle>
          <Game
            gameState={isGamePaused ? "paused" : "playing"}
            onLevelComplete={() => {
              console.log("Level completed!");
            }}
          />
          <PauseButton onClick={handlePauseToggle}>
            {isGamePaused ? "Resume" : "Pause"}
          </PauseButton>
          <RestartButton loading={loading} onClick={handleRestart}>
            Restart
          </RestartButton>
          <ProgressBar>
            <ProgressIndicator progress={progress} />
          </ProgressBar>
          <PowerUp
            top={Math.random() * (window.innerHeight - 100) + 100}
            left={Math.random() * (window.innerWidth - 100) + 100}
          />
          <Obstacle
            top={Math.random() * (window.innerHeight - 50) + 50}
            left={Math.random() * (window.innerWidth - 100) + 100}
          />
          <Leaderboard />
        </>
      )}
    </GameLevelContainer>
  );
};

export default GameLevel;
