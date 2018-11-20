import React from 'react'
import Header from './components/header';
import Game from './components/game';

export default class App extends React.Component {
  render() {
    return (
      [<Header key={1} />,
      <Game
        onNewGame={(options) => this.props.gameService.makeNewGame(options)}
        onPlayTurn={(game, move) => this.props.gameService.playTurn(game, move)}
        key={2}
      />]
    );
  }
}
