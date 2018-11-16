import Game from "./game";
import Player from "./player";
import GameState from "./game-state";

export default class MockApiConsumer {
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
    return this._buildGame(gameOptions);
  }

  _buildGame(options) {
    const playerOne = new Player(options.getPlayerOneType(), options.getPlayerOneToken(), options.getPlayerOneName());
    const playerTwo = new Player(options.getPlayerTwoType(), options.getPlayerTwoToken(), options.getPlayerTwoName());
    const gameState = new GameState();
    gameState.setCurrentPlayer(playerOne);
    gameState.setOtherPlayer(playerTwo);
    gameState.setBoard([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    gameState.setState('playing');
    return new Game(gameState);
  }

  makeNewGameWasCalled() {
    return this.#makeNewGameCalled;
  }

  playTurn(game, move) {
    this.#timesPlayTurnCalled++;
    const gameState = new GameState();
    gameState.setCurrentPlayer(game.getOtherPlayer());
    gameState.setOtherPlayer(game.getCurrentPlayer());
    gameState.setBoard(this._newBoardForMove(game, move));
    gameState.setState(this._computeNextState());
    gameState.setResult(this.#gameResultAfterFinalMove);
    gameState.setWinner(game.getCurrentPlayer().getName());
    return new Game(gameState);
  }

  _newBoardForMove(game, move) {
    const player = game.getCurrentPlayer();
    const board = game.getBoard().slice();
    board[move] = player.getToken();
    return board;
  }

  _computeNextState() {
    return this.#timesPlayTurnCalled >= this.#numberOfMovesToBeTested ?
      this.#gameResultAfterFinalMove :
      'playing';
  }

  playTurnWasCalled(numberOfTimes) {
    return this.#timesPlayTurnCalled === numberOfTimes;
  }
}
