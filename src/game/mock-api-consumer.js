import Game from "./game";
import Player from "./player";

export default class MockApiConsumer {
  #makeNewGameCalled = false;
  #timesPlayTurnCalled = 0;
  #numberOfMovesToBePlayed;

  constructor(numberOfMovesToBePlayed) {
    this.#numberOfMovesToBePlayed = numberOfMovesToBePlayed;
  }

  makeNewGame(gameOptions) {
    this.#makeNewGameCalled = true;
    return this._buildGame(gameOptions);
  }

  _buildGame(options) {
    const playerOne = new Player(options.getPlayerOneType(), options.getPlayerOneToken(), options.getPlayerOneName());
    const playerTwo = new Player(options.getPlayerTwoType(), options.getPlayerTwoToken(), options.getPlayerTwoName());
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const playing = true;
    return new Game(playerOne, playerTwo, board, playing);
  }

  makeNewGameWasCalled() {
    return this.#makeNewGameCalled;
  }

  playTurn(game, move) {
    this.#timesPlayTurnCalled++;
    const player = game.getCurrentPlayer();
    let board = game.getBoard();
    board[move] = player.getToken();
    const playing = this.#timesPlayTurnCalled < this.#numberOfMovesToBePlayed;
    return new Game(game.getOtherPlayer(), game.getCurrentPlayer(), board, playing);
  }

  playTurnWasCalled(numberOfTimes) {
    return this.#timesPlayTurnCalled === numberOfTimes;
  }
}
