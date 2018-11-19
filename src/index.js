import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import ApiConsumer from './game/api-consumer';

const API_URL = 'http://localhost:9292/api/v1'

const apiConsumer = new ApiConsumer(API_URL);
ReactDOM.render(<Game
  onNewGame={(options) => apiConsumer.makeNewGame(options)}
  onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
/>, document.getElementById('root'));
