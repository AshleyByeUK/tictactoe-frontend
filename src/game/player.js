export default class Player {
  #type;
  #token;
  #name;

  constructor(type, token, name) {
    this.#type = type;
    this.#token = token;
    this.#name = name;
  }

  getType() {
    return this.#type;
  }

  getToken() {
    return this.#token;
  }

  getName() {
    return this.#name;
  }
}
