import React from 'react';
import GameOptions from '../game/game-options';
import Board from "./board";

export default class Game extends React.Component {
  #game;

  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
    };
  }

  handleStartNewGame() {
    const options = new GameOptions();
    this.#game = this.props.onNewGame(options);
    this.setState({
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
      tiles: this.#game.getBoard(),
    });
  }

  status(game) {
    if (game.isOver()) {
      return '';
    } else {
      return 'Next player: ' + game.getCurrentPlayer().getName();
    }
  }

  render() {
    const status = this.#game == null ? '' : this.status(this.#game);
    const board = this.#game == null ?
      <div className="game-board hidden"></div> :
      <div>
        <div className="game-board">
          <Board
            tiles={this.state.tiles}
            onClick={(position) => this.handleSelectTile(position)}
          />
        </div>
        <div className="game-info">
          <div className="game-status">{status}</div>
        </div>
      </div>;
    return (
      <div className="game">
        <div className="game-menu">
          <button
            className="game-new-game"
            onClick={() => this.handleStartNewGame()}
          >
            Play a game
          </button>
        </div>
        {board}
      </div>
    );
  }
}
