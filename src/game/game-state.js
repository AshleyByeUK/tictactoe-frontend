export default class GameState {
  #currentPlayer;
  #otherPlayer;
  #board;
  #state;
  #result;
  #winner;

  getCurrentPlayer() {
    return this.#currentPlayer;
  }

  setCurrentPlayer(player) {
    this.#currentPlayer = player;
  }

  getOtherPlayer() {
    return this.#otherPlayer;
  }

  setOtherPlayer(player) {
    this.#otherPlayer = player;
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
