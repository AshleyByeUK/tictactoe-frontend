import React from 'react';
import { mount } from 'enzyme';
import MockApiConsumer from '../game/mock-api-consumer';
import Game from './game';

const CLICK = 'click';
const DRAW = 'draw';
const GAME_TILE = '.game-tile';
const GAME_STATUS = '.game-status';
const LAST_MOVE = '.game-last-move';
const NEW_GAME_BUTTON = '.game-new-game';
const PLAYING = 'playing';
const WIN = 'win';
let apiConsumer;

function startNewgame(numberOfTurnsToBeTested, gameStateAfterFinalTurn) {
  apiConsumer = new MockApiConsumer(numberOfTurnsToBeTested, gameStateAfterFinalTurn);
  const game = mount(
    <Game
      onNewGame={(options) => apiConsumer.makeNewGame(options)}
      onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
    />);

  expect(game.state().tiles.length).toEqual(0);
  game.find(NEW_GAME_BUTTON).simulate(CLICK);
  return game;
}

function clickEachTileForPositionInTurn(positions, game) {
  positions.forEach((position) => clickTileForPosition(position, game));
}

function clickTileForPosition(position, game) {
  game.find(GAME_TILE).at(position - 1).simulate(CLICK);
}

function expectTileAtEachPositionToHaveText(positions, game) {
  for (let position in positions) {
    const text = positions[position];
    expectTileAtPositionToHaveText(position, text, game);
  }
}

function expectTileAtPositionToHaveText(position, text, game) {
  expect(game.find(GAME_TILE).at(position - 1).text()).toEqual(text);
}

function expectNumberOfTimePlayTurnWasCalledToBe(numberOfTimes) {
  expect(apiConsumer.playTurnWasCalled(numberOfTimes)).toBe(true);
}

function expectLastMoveTextToBe(text, game) {
  expect(game.find(LAST_MOVE).text()).toEqual(text);
}

function expectGameStatusTextToBe(text, game) {
  expect(game.find(GAME_STATUS).text()).toBe(text);
}

test('can make a new 3x3 game', () => {
  const game = startNewgame(0, PLAYING);

  expect(apiConsumer.makeNewGameWasCalled()).toBe(true);
  expectTileAtEachPositionToHaveText(
    {1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'},
    game);
});

test('can get a human players move', () => {
  const numberOfTurnsToBeTested = 1;
  const game = startNewgame(numberOfTurnsToBeTested, PLAYING);

  clickTileForPosition(1, game);

  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsToBeTested);
  expectTileAtPositionToHaveText(1, 'X', game);
});

test('does not try to play a turn on a taken position', () => {
  const numberOfTurnsToBeTested = 1;
  const game = startNewgame(numberOfTurnsToBeTested, PLAYING);

  clickEachTileForPositionInTurn([1, 1], game);

  expectTileAtPositionToHaveText(1, 'X', game);
  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsToBeTested);
});

test('alternates players turns', () => {
  const numberOfTurnsToBeTested = 2;
  const game = startNewgame(numberOfTurnsToBeTested, PLAYING);

  clickTileForPosition(1, game);
  expectTileAtPositionToHaveText(1, 'X', game);
  expectLastMoveTextToBe('Player 1 played in position 1', game);

  clickTileForPosition(2, game);
  expectTileAtPositionToHaveText(2, 'O', game);
  expectLastMoveTextToBe('Player 2 played in position 2', game);

  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsToBeTested);
});

test('does not allow moves to be made once the game is over', () => {
  const numberOfTurnsUntilWin = 5;
  const game = startNewgame(numberOfTurnsUntilWin, WIN);

  clickEachTileForPositionInTurn([1, 4, 2, 5, 3, 6, 7, 8, 9], game);

  expectTileAtEachPositionToHaveText(
    {1: 'X', 2: 'X', 3: 'X', 4: 'O', 5: 'O', 6: '6', 7: '7', 8: '8', 9: '9'},
    game);
  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsUntilWin);
});

test('does not allow moves to be made once the game is drawn', () => {
  const numberOfTurnsUntilDraw = 9;
  const game = startNewgame(numberOfTurnsUntilDraw, DRAW);

  clickEachTileForPositionInTurn([1, 2, 3, 5, 4, 6, 8, 7, 9], game);

  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsUntilDraw);
  expectGameStatusTextToBe('Game over! It\'s a draw', game);
});

test('does not allow moves to be made once player one has won', () => {
  const numberOfTurnsUntilWin = 5;
  const game = startNewgame(numberOfTurnsUntilWin, WIN);

  clickEachTileForPositionInTurn([1, 4, 2, 5, 3], game);

  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsUntilWin);
  expectGameStatusTextToBe('Game over! Player 1 won', game);
});

test('does not allow moves to be made once player two has won', () => {
  const numberOfTurnsUntilWin = 6;
  const game = startNewgame(numberOfTurnsUntilWin, WIN);

  clickEachTileForPositionInTurn([1, 4, 2, 5, 9, 6], game);

  expectNumberOfTimePlayTurnWasCalledToBe(numberOfTurnsUntilWin);
  expectGameStatusTextToBe('Game over! Player 2 won', game);
});
