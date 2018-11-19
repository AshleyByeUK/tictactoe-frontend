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
      onPlayTurn={(gameState, move) => apiConsumer.playTurn(gameState, move)}
    />);

  expect(game.state().tiles.length).toEqual(0);
  game.find(NEW_GAME_BUTTON).simulate(CLICK);
  game.update();
  return game;
}

function clickEachTileForPositionInTurn(positions, game, assertions) {
  if (positions.length == 0) {
    assertions();
  } else {
    clickTileForPosition(positions[0], game);
    setImmediate(() => {
      game.update();
      clickEachTileForPositionInTurn(positions.slice(1, positions.length), game, assertions);
    });
  }
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

function expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTimes) {
  expect(apiConsumer.playTurnWasCalled(numberOfTimes)).toBe(true);
}

function expectLastMoveTextToBe(text, game) {
  expect(game.find(LAST_MOVE).text()).toEqual(text);
}

function expectGameStatusTextToBe(text, game) {
  expect(game.find(GAME_STATUS).text()).toBe(text);
}

test('can make a new 3x3 game', (done) => {
  const game = startNewgame(0, PLAYING);

  setImmediate(() => {
    game.update();
    expect(apiConsumer.makeNewGameWasCalled()).toBe(true);
    expectTileAtEachPositionToHaveText(
      {1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'},
      game);
    done();
  });
});

test('can get a human players move', (done) => {
  const numberOfTurnsToBeTested = 1;
  const game = startNewgame(numberOfTurnsToBeTested, PLAYING);

  setImmediate(() => {
    game.update();
    clickTileForPosition(1, game);
    setImmediate(() => {
      game.update();
      expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsToBeTested);
      expectTileAtPositionToHaveText(1, 'X', game);
      done();
    });
  });
});

test('does not try to play a turn on a taken position', (done) => {
  const numberOfTurnsToBeTested = 1;
  const game = startNewgame(numberOfTurnsToBeTested, PLAYING);

  const assertions = function() {
    expectTileAtPositionToHaveText(1, 'X', game);
    expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsToBeTested);
    done();
  };

  setImmediate(() => {
    game.update();
    clickEachTileForPositionInTurn([1, 1], game, assertions);
  });
});

test('alternates players turns', (done) => {
  const numberOfTurnsToBeTested = 2;
  const game = startNewgame(numberOfTurnsToBeTested, PLAYING);

  setImmediate(() => {
    game.update();
    clickTileForPosition(1, game);
    setImmediate(() => {
      game.update();
      expectTileAtPositionToHaveText(1, 'X', game);
      expectLastMoveTextToBe('Player 1 played in position 1', game);

      clickTileForPosition(2, game);
      setImmediate(() => {
        game.update();
        expectTileAtPositionToHaveText(2, 'O', game);
        expectLastMoveTextToBe('Player 2 played in position 2', game);

        expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsToBeTested);
        done();
      });
    });
  });
});

test('does not allow moves to be made once the game is over', (done) => {
  const numberOfTurnsUntilWin = 5;
  const game = startNewgame(numberOfTurnsUntilWin, WIN);

  const assertions = function() {
    expectTileAtEachPositionToHaveText(
      {1: 'X', 2: 'X', 3: 'X', 4: 'O', 5: 'O', 6: '6', 7: '7', 8: '8', 9: '9'},
      game);
    expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsUntilWin);
    done();
  };

  setImmediate(() => {
    game.update();
    clickEachTileForPositionInTurn([1, 4, 2, 5, 3, 6, 7, 8, 9], game, assertions);
  });
});

test('does not allow moves to be made once the game is drawn', (done) => {
  const numberOfTurnsUntilDraw = 9;
  const game = startNewgame(numberOfTurnsUntilDraw, DRAW);

  const assertions = function() {
    expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsUntilDraw);
    expectGameStatusTextToBe('Game over! It\'s a draw', game);
    done();
  };

  setImmediate(() => {
    game.update();
    clickEachTileForPositionInTurn([1, 2, 3, 5, 4, 6, 8, 7, 9], game, assertions);
  });
});

test('does not allow moves to be made once player one has won', (done) => {
  const numberOfTurnsUntilWin = 5;
  const game = startNewgame(numberOfTurnsUntilWin, WIN);

  const assertions = function() {
    expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsUntilWin);
    expectGameStatusTextToBe('Game over! Player 1 won', game);
    done();
  };

  setImmediate(() => {
    game.update();
    clickEachTileForPositionInTurn([1, 4, 2, 5, 3], game, assertions);
  });
});

test('does not allow moves to be made once player two has won', (done) => {
  const numberOfTurnsUntilWin = 6;
  const game = startNewgame(numberOfTurnsUntilWin, WIN);

  const assertions = function() {
    expectNumberOfTimesPlayTurnWasCalledToBe(numberOfTurnsUntilWin);
    expectGameStatusTextToBe('Game over! Player 2 won', game);
    done();
  };

  setImmediate(() => {
    game.update();
    clickEachTileForPositionInTurn([1, 4, 2, 5, 9, 6], game, assertions);
  });
});
