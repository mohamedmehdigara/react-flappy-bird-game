import React from 'react';
import ReactDOM from 'react-dom';
import GameMenu from './components/GameMenu';

const App = () => {
  return (
    <GameMenu />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
