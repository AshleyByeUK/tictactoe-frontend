import React from 'react';
import GameOptions from '../game/game-options';
import Board from "./board";
import GameState from '../game/game-state';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      currentPlayer: null,
      playerOne: null,
      playerTwo: null,
      tiles: [],
      gameState: null,
      lastPosition: '',
      isOver: false,
      isWon: false,
      winner: '',
    };
  }

   handleStartNewGame() {
    const options = new GameOptions();
    this.props.onNewGame(options)
      .then(game => {this.setState({
        inProgress: true,
        currentPlayer: game.getCurrentPlayer(),
        playerOne: game.getPlayerOne(),
        playerTwo: game.getPlayerTwo(),
        tiles: game.getBoard(),
        gameState: game.getState(),
        lastPosition: '',
        isOver: false,
        isWon: false,
        winner: '',
      })})
      .catch(err => console.log(err));
  }

  handleSelectTile(position) {
    const tile = this.state.tiles[position];
    if (this.state.isOver || !Number.isInteger(tile)) {
      return;
    }
    const gameState = new GameState();
    gameState.setCurrentPlayer(this.state.currentPlayer);
    gameState.setPlayerOne(this.state.playerOne);
    gameState.setPlayerTwo(this.state.playerTwo);
    gameState.setBoard(this.state.tiles);
    gameState.setState(this.state.gameState);
    // const game = this.props.onPlayTurn(gameState, position);
    // this.setState({
    //   inProgress: true,
    //   currentPlayer: game.getCurrentPlayer(),
    //   otherPlayer: game.getOtherPlayer(),
    //   tiles: game.getBoard(),
    //   lastPosition: position + 1,
    //   isOver: game.isOver(),
    //   isWon: game.isWon(),
    //   winner: game.getWinner(),
    // });
    this.props.onPlayTurn(gameState, position)
      .then(game => {this.setState({
        inProgress: true,
        currentPlayer: game.getCurrentPlayer(),
        playerOne: game.getPlayerOne(),
        playerTwo: game.getPlayerTwo(),
        tiles: game.getBoard(),
        gameState: game.getState(),
        lastPosition: position + 1,
        isOver: game.isOver(),
        isWon: game.isWon(),
        winner: game.getWinner(),
      })})
      .catch(err => console.log(err));
  }

  status() {
    if (this.state.isOver) {
      return 'Game over! ' + (this.state.isWon ? this.state.winner + ' won' : 'It\'s a draw');
    } else {
      return 'Next player: ' + (this.state.currentPlayer === 1 ? this.state.playerOne.getName() : this.state.playerTwo.getName());
    }
  }

  lastMove() {
    if (this.state.lastPosition === '') {
      return '';
    } else {
      return (this.state.currentPlayer === 1 ? this.state.playerTwo.getName() : this.state.playerOne.getName()) + ' played in position ' + this.state.lastPosition;
    }
  }

  render() {
    const status = this.state.inProgress ? this.status() : '';
    const lastMove = this.state.inProgress ? this.lastMove() : '';
    const gameElements = this.state.inProgress ?
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
      </div>:
      <div className="game"></div>;
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
