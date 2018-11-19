export default class GameOptions {
  #playerOneType = 'human';
  #playerOneToken = 'X';
  #playerOneName = 'Player 1';
  #playerTwoType = 'human';
  #playerTwoToken = 'O';
  #playerTwoName = 'Player 2';
  #boardSize = 3;

  getPlayerOneType() {
    return this.#playerOneType;
  }

  setPlayerOneType(type) {
    this.#playerOneType = type;
  }

  getPlayerOneToken() {
    return this.#playerOneToken;
  }

  setPlayerOneToken(token) {
    this.#playerOneToken = token;
  }

  getPlayerOneName() {
    return this.#playerOneName;
  }

  setPlayerOneName(name) {
    this.#playerOneName = name;
  }

  getPlayerTwoType() {
    return this.#playerTwoType;
  }

  setPlayerTwoType(type) {
    this.#playerTwoType = type;
  }

  getPlayerTwoToken() {
    return this.#playerTwoToken;
  }

  setPlayerTwoToken(token) {
    this.#playerTwoToken = token;
  }

  getPlayerTwoName() {
    return this.#playerTwoName;
  }

  setPlayerTwoName(name) {
    this.#playerTwoName = name;
  }

  getBoardSize() {
    return this.#boardSize();
  }

  setBoardSize(size) {
    this.#boardSize = size;
  }
}
