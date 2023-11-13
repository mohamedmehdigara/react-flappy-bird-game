import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Game from './Game';
import Leaderboard from './Leaderboard';

// Styled components for styling
const StyledGameLevelContainer = styled.div`
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

const StyledScoreComponent = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: black;
`;

const StyledEnemiesRemainingComponent = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: black;
`;

const StyledGameLevelTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
`;

const StyledButtonBase = styled.button`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledPauseButton = styled(StyledButtonBase)`
  background-color: gray;
  color: black;
`;

const StyledRestartButton = styled(StyledButtonBase)`
  background-color: green;
  color: white;
  pointer-events: ${(props) => (props.loading ? 'none' : 'auto')};
`;

const StyledProgressBar = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledProgressIndicator = styled.div`
  background-color: #007bff;
  width: ${(props) => props.progress}%;
  height: 100%;
  position: absolute;
  left: 0;
`;

const StyledPositionedDiv = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const StyledPowerUp = styled(StyledPositionedDiv)`
  background-color: green;
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const StyledObstacle = styled(StyledPositionedDiv)`
  background-color: red;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

// GameLevel functional component
const GameLevel = ({ level, loading, score, enemiesRemaining, progress }) => {
  const [isGamePaused, setIsGamePaused] = useState(false);

  // Array of game levels
  const levels = ['Level 1', 'Level 2', 'Level 3'];
  const gameLevel = levels[level];

  // Toggle pause state
  const handlePauseToggle = useCallback(() => {
    setIsGamePaused((prev) => !prev);
  }, []);

  // Restart the game
  const handleRestart = useCallback(() => {
    // Reset game state here if needed
    setIsGamePaused(false);
  }, []);

  useEffect(() => {
    // Place your side effects or async operations here
    // Make sure to handle cleanup if necessary
  }, [/* dependencies */]);

  return (
    <StyledGameLevelContainer key={level}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <StyledScoreComponent>Score: {score}</StyledScoreComponent>
          <StyledEnemiesRemainingComponent>Enemies Remaining: {enemiesRemaining}</StyledEnemiesRemainingComponent>
          <StyledGameLevelTitle>{gameLevel}</StyledGameLevelTitle>
          <Game gameState={isGamePaused ? 'paused' : 'playing'} onLevelComplete={() => console.log('Level completed!')} />
          <StyledPauseButton onClick={handlePauseToggle}>{isGamePaused ? 'Resume' : 'Pause'}</StyledPauseButton>
          <StyledRestartButton loading={loading} onClick={handleRestart}>
            Restart
          </StyledRestartButton>
          <StyledProgressBar>
            <StyledProgressIndicator progress={progress} />
          </StyledProgressBar>
          <StyledPowerUp
            top={Math.random() * (window.innerHeight - 100) + 100}
            left={Math.random() * (window.innerWidth - 100) + 100}
          />
          <StyledObstacle
            top={Math.random() * (window.innerHeight - 50) + 50}
            left={Math.random() * (window.innerWidth - 100) + 100}
          />
          <Leaderboard />
        </>
      )}
    </StyledGameLevelContainer>
  );
};

export default GameLevel;
