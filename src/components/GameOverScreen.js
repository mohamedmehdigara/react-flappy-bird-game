// GameOverScreen.js
import React from 'react';
import PropTypes from 'prop-types';

const GameOverScreen = ({ restartGame }) => {
  return (
    <div>
      <p>Game Over!</p>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

GameOverScreen.propTypes = {
  restartGame: PropTypes.func.isRequired,
};

export default GameOverScreen;
