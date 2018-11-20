import Game from "../game/game";
import Player from "../game/player";
import GameState from "../game/game-state";

export default class FakeGameService {
  #makeNewGameCalled = false;
  #timesPlayTurnCalled = 0;
  #numberOfMovesToBeTested;
  #gameResultAfterFinalMove;

  constructor(numberOfMovesToBeTested, gameResultAfterFinalMove) {
    this.#numberOfMovesToBeTested = numberOfMovesToBeTested;
    this.#gameResultAfterFinalMove = gameResultAfterFinalMove;
  }

  makeNewGame(gameOptions) {
    this.#makeNewGameCalled = true;
    const game = this._buildGame(gameOptions);
    return new Promise(function(resolve, reject) {
      resolve(game)
    });
  }

  _buildGame(options) {
    const playerOne = new Player(options.getPlayerOneType(), options.getPlayerOneToken(), options.getPlayerOneName());
    const playerTwo = new Player(options.getPlayerTwoType(), options.getPlayerTwoToken(), options.getPlayerTwoName());
    const gameState = new GameState();
    gameState.setCurrentPlayer(1);
    gameState.setPlayerOne(playerOne);
    gameState.setPlayerTwo(playerTwo);
    gameState.setBoard([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    gameState.setState('playing');
    return new Game(gameState);
  }

  makeNewGameWasCalled() {
    return this.#makeNewGameCalled;
  }

  playTurn(gameState, move) {
    this.#timesPlayTurnCalled++;
    const newGameState = this._generateNewGameState(gameState, move);
    const game = new Game(newGameState);
    return new Promise(function(resolve, reject) {
      resolve(game);
    });
  }

  _generateNewGameState(gameState, move) {
    const newGameState = new GameState();
    newGameState.setPlayerOne(gameState.getPlayerOne());
    newGameState.setPlayerTwo(gameState.getPlayerTwo());
    newGameState.setCurrentPlayer(this._computeNextPlayer(gameState));
    newGameState.setBoard(this._newBoardForMove(gameState, move));
    newGameState.setState(this._computeNextState());
    newGameState.setResult(this.#gameResultAfterFinalMove);
    newGameState.setWinner(this._computeWinner(gameState));
    return newGameState;
  }

  _computeNextPlayer(gameState) {
    return gameState.getCurrentPlayer() === 1 ? 2 : 1;
  }

  _newBoardForMove(gameState, move) {
    const player = gameState.getCurrentPlayer() === 1 ? gameState.getPlayerOne() : gameState.getPlayerTwo();
    const board = gameState.getBoard().slice();
    board[move] = player.getToken();
    return board;
  }

  _computeNextState() {
    return this.#timesPlayTurnCalled >= this.#numberOfMovesToBeTested ?
      this.#gameResultAfterFinalMove :
      'playing';
  }

  _computeWinner(gameState) {
    return gameState.getCurrentPlayer() === 1 ? gameState.getPlayerOne().getName() : gameState.getPlayerTwo().getName();
  }

  playTurnWasCalled(numberOfTimes) {
    return this.#timesPlayTurnCalled === numberOfTimes;
  }
}
