export default class Game {
  #gameState;

  constructor(gameState) {
    this.#gameState = gameState;
  }

  getPlayerOne() {
    return this.#gameState.getPlayerOne();
  }

  getPlayerTwo() {
    return this.#gameState.getPlayerTwo();
  }

  getCurrentPlayer() {
    return this.#gameState.getCurrentPlayer();
  }

  getBoard() {
    return this.#gameState.getBoard();
  }

  getState() {
    return this.#gameState.getState();
  }

  isOver() {
    return this.#gameState.getState() !== 'playing';
  }

  isWon() {
    return this.isOver() && this.#gameState.getResult() === 'win';
  }

  getWinner() {
    return this.#gameState.getWinner();
  }
}
