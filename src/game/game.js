export default class Game {
  #currentPlayer;
  #otherPlayer;
  #board;
  #gameOver;

  constructor(firstPlayer, secondPlayer, board, playing) {
    this.#currentPlayer = firstPlayer;
    this.#otherPlayer = secondPlayer;
    this.#board = board;
    this.#gameOver = !playing;
  }

  getBoard() {
    return this.#board;
  }

  getCurrentPlayer() {
    return this.#currentPlayer;
  }

  getOtherPlayer() {
    return this.#otherPlayer;
  }

  isOver() {
    return this.#gameOver;
  }
}
