import React from 'react';
import { Button, Container, Content, Level, Section, SubTitle, Title } from 'reactbulma';
import GameOptions from '../game/game-options';
import Board from "./board";
import GamePart from './game-part';
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
      })});
  }

  handleSelectTile(position) {
    const tile = this.state.tiles[position];
    if (this.state.isOver || !Number.isInteger(tile)) {
      return;
    }
    const gameState = this._getCurrentGameState();
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
      })});
  }

  _getCurrentGameState() {
    const gameState = new GameState();
    gameState.setCurrentPlayer(this.state.currentPlayer);
    gameState.setPlayerOne(this.state.playerOne);
    gameState.setPlayerTwo(this.state.playerTwo);
    gameState.setBoard(this.state.tiles);
    gameState.setState(this.state.gameState);
    return gameState;
  }

  status() {
    if (this.state.isOver) {
      return <p>&nbsp;</p>;
    } else {
      return 'Next player: ' + (this.state.currentPlayer === 1 ? this.state.playerOne.getName() : this.state.playerTwo.getName());
    }
  }

  result() {
    if (this.state.isOver) {
      return <p>Game over! {this.state.isWon ? this.state.winner + ' won' : 'It\'s a draw'}</p>;
    } else {
      return <p>Playing...</p>;
    }
  }

  lastMove() {
    if (this.state.lastPosition === '') {
      return <p>&nbsp;</p>;
    } else {
      return (this.state.currentPlayer === 1 ? this.state.playerTwo.getName() : this.state.playerOne.getName()) + ' played in position ' + this.state.lastPosition;
    }
  }

  render() {
    const status = this.state.inProgress ? this.status() : '';
    const lastMove = this.state.inProgress ? this.lastMove() : '';
    const result = this.state.inProgress ? this.result() : '';
    const gameElements = this.state.inProgress ?
      <Container>
        <Content>
          <GamePart render={() => (
            <Title className="game-result">{result}</Title>
          )} />
          <GamePart render={() => (
            <SubTitle className="game-status">{status}</SubTitle>
          )} />
          <GamePart render={() => (
            <SubTitle className="game-last-move">{lastMove}</SubTitle>
          )} />
          <GamePart render={() => (
            <Board className="game-board"
              tiles={this.state.tiles}
              onClick={(position) => this.handleSelectTile(position)}
            />
          )} />
        </Content>
      </Container>:
      <Container></Container>;
    return (
      <Section>
        <Container>
          <GamePart render={() => (
            <Button primary
              className="game-new-game"
              onClick={() => this.handleStartNewGame()}>
              Play a game
            </Button>
          )} />
        </Container>,
        {gameElements}
      </Section>
    );
  }
}
