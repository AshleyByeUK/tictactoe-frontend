import React from 'react';
import GameOptions from '../game/game-options';
import Board from "./board";

export default class Game extends React.Component {
  #game;

  constructor(props) {
    super(props);
    this.state = {
      lastPosition: null,
      tiles: [],
    };
  }

  handleStartNewGame() {
    const options = new GameOptions();
    this.#game = this.props.onNewGame(options);
    this.setState({
      lastPosition: null,
      tiles: this.#game.getBoard(),
    });
  }

  handleSelectTile(position) {
    const tile = this.state.tiles[position];
    if (this.#game.isOver() || !Number.isInteger(tile)) {
      return;
    }
    this.#game = this.props.onPlayTurn(this.#game, position);
    this.setState({
      lastPosition: position + 1,
      tiles: this.#game.getBoard(),
    });
  }

  status(game) {
    if (game.isOver()) {
      return 'Game over! ' + (game.isWon() ? game.getWinner() + ' won' : 'It\'s a draw');
    } else {
      return 'Next player: ' + game.getCurrentPlayer().getName();
    }
  }

  lastMove(game) {
    if (this.state.lastPosition == null) {
      return '';
    } else {
      return game.getOtherPlayer().getName() + ' played in position ' + this.state.lastPosition;
    }
  }

  render() {
    const status = this.#game == null ? '' : this.status(this.#game);
    const lastMove = this.#game == null? '' : this.lastMove(this.#game);
    const gameElements = this.#game == null ?
      <div className="game-board hidden"></div> :
      <div className="game">
        <div className="game-header">
          <div className="game-status">{status}</div>
        </div>
        <div className="game-board">
          <Board
            tiles={this.state.tiles}
            onClick={(position) => this.handleSelectTile(position)}
          />
        </div>
        <div className="game-footer">
          <div className="game-last-move">{lastMove}</div>
        </div>
      </div>;
    return (
      <div className="game-container">
        <div className="game-menu">
          <button
            className="game-new-game"
            onClick={() => this.handleStartNewGame()}
          >
            Play a game
          </button>
        </div>
        {gameElements}
      </div>
    );
  }
}
