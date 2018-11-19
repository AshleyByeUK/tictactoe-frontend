import axios from 'axios';
import Game from './game';
import GameState from './game-state';
import Player from './player';

export default class GameService {
  #apiUrl;
  #newGameUrl = '/game/new';
  #playTurnUrl = '/game/play';

  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
  }

  makeNewGame(gameOptions) {
    return axios.post(this.#apiUrl + this.#newGameUrl, this._newGameRequest(gameOptions))
      .then(result => {
        const gameState = this._createGameStateFromResult(result.data);
        return new Game(gameState);
      })
      .catch(error => console.log(error));
  }

  _newGameRequest(gameOptions) {
    return {
      "game": {
        "board_size": 3
      },
      "players": {
        "player_one": {
          "name": gameOptions.getPlayerOneName(),
          "token": gameOptions.getPlayerOneToken(),
          "type": gameOptions.getPlayerOneType()
        },
        "player_two": {
          "name": gameOptions.getPlayerTwoName(),
          "token": gameOptions.getPlayerTwoToken(),
          "type": gameOptions.getPlayerTwoType()
        }
      }
    };
  }

  playTurn(gameState, move) {
    return axios.post(this.#apiUrl + this.#playTurnUrl, this._playTurnRequest(gameState, move))
      .then(result => {
        const gameState = this._createGameStateFromResult(result.data);
        return new Game(gameState);
      })
      .catch(error => console.log(error));
  }

  _playTurnRequest(gameState, move) {
    return {
      "game": {
        "board": gameState.getBoard(),
        "current_player": gameState.getCurrentPlayer(),
        "state": gameState.getState()
      },
      "move": {
        "position": move + 1
      },
      "players": {
        "player_one": {
          "name": gameState.getPlayerOne().getName(),
          "token": gameState.getPlayerOne().getToken(),
          "type": gameState.getPlayerOne().getType()
        },
        "player_two": {
          "name": gameState.getPlayerTwo().getName(),
          "token": gameState.getPlayerTwo().getToken(),
          "type": gameState.getPlayerTwo().getType()
        }
      }
    };
  }

  _createGameStateFromResult(json) {
    const playerOne = this._createPlayerFromResult(json.players.player_one);
    const playerTwo = this._createPlayerFromResult(json.players.player_two);
    const gameState = new GameState();
    gameState.setCurrentPlayer(json.game.current_player);
    gameState.setPlayerOne(playerOne);
    gameState.setPlayerTwo(playerTwo);
    gameState.setBoard(json.game.board);
    gameState.setState(json.game.state);
    gameState.setResult(json.game.result);
    gameState.setWinner(json.game.winner);
    return gameState;
  }

  _createPlayerFromResult(player) {
    return new Player(
      player.type,
      player.token,
      player.name);
  }
}
