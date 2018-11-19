import React from 'react'
import { Hero, Container, Title } from 'reactbulma';
import Game from './components/game';

export default class App extends React.Component {
  render() {
    return (
      [<Hero primary bold key={1}>
        <Hero.Body>
          <Container>
            <Title>
              TicTacToe
            </Title>
          </Container>
        </Hero.Body>
    </Hero>,
    <Game
      onNewGame={(options) => this.props.gameService.makeNewGame(options)}
      onPlayTurn={(game, move) => this.props.gameService.playTurn(game, move)}
      key={2}
    />]
    )
  }
}
