import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import MockApiConsumer from './game/mock-api-consumer';

const apiConsumer = new MockApiConsumer(5, 'win');
ReactDOM.render(<Game
  onNewGame={(options) => apiConsumer.makeNewGame(options)}
  onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
/>, document.getElementById('root'));
