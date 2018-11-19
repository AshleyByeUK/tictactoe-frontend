import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import GameService from './game/game-service';

const API_URL = 'http://localhost:9292/api/v1'

const gameService = new GameService(API_URL);
ReactDOM.render(<Game
  onNewGame={(options) => gameService.makeNewGame(options)}
  onPlayTurn={(game, move) => gameService.playTurn(game, move)}
/>, document.getElementById('root'));
