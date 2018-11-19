export default class GameState {
  #playerOne
  #playerTwo
  #currentPlayer;
  #board;
  #state;
  #result;
  #winner;

  getPlayerOne() {
    return this.#playerOne;
  }

  setPlayerOne(player) {
    this.#playerOne = player;
  }

  getPlayerTwo() {
    return this.#playerTwo;
  }

  setPlayerTwo(player) {
    this.#playerTwo = player;
  }

  getCurrentPlayer() {
    return this.#currentPlayer;
  }

  setCurrentPlayer(number) {
    this.#currentPlayer = number;
  }

  getBoard() {
    return this.#board;
  }

  setBoard(board) {
    this.#board = board;
  }

  getState() {
    return this.#state;
  }

  setState(state) {
    this.#state = state;
  }

  getResult() {
    return this.#result;
  }

  setResult(result) {
    this.#result = result;
  }

  getWinner() {
    return this.#winner;
  }

  setWinner(winner) {
    this.#winner = winner;
  }
}
