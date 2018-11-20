import React from 'react';
import { Hero, Container, Title } from 'reactbulma';

export default class Header extends React.Component {
  render() {
    return (
      <Hero primary bold>
        <Hero.Body>
          <Container>
            <Title>
              TicTacToe
            </Title>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
}
