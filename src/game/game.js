export default class Game {
  #gameState;

  constructor(gameState) {
    this.#gameState = gameState;
  }

  getBoard() {
    return this.#gameState.getBoard();
  }

  getCurrentPlayer() {
    return this.#gameState.getCurrentPlayer();
  }

  getOtherPlayer() {
    return this.#gameState.getOtherPlayer();
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
