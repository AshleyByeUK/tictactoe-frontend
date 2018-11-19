import React from 'react';
import ReactDOM from 'react-dom';
import GameService from './game/game-service';
import App from './app';
import './index.css'

let API_URL;
if (process.env.NODE_ENV === "production") {
  API_URL = 'https://ruby-tictactoe-api.herokuapp.com/api/v1'
} else {
  API_URL = 'http://localhost:9292/api/v1';
}

const gameService = new GameService(API_URL);

ReactDOM.render(
  <App gameService={gameService} />, document.getElementById('root'));
