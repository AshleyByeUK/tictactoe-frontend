import React from 'react';
import { mount, shallow } from 'enzyme';
import MockApiConsumer from '../game/mock-api-consumer';
import Game from './game';

test('can make a new 3x3 game', () => {
  const apiConsumer = new MockApiConsumer(9);
  const game = mount(<Game onNewGame={(options) => apiConsumer.makeNewGame(options)} />);

  expect(game.state().tiles.length).toEqual(0);
  game.find('.game-new-game').simulate('click');

  expect(apiConsumer.makeNewGameWasCalled()).toBe(true);
  expect(game.state().tiles.length).toEqual(9);
  expect(game.find('.tile').length).toBe(9);
});

test('can get a human players move', () => {
  const apiConsumer = new MockApiConsumer(9);
  const game = mount(<Game
    onNewGame={(options) => apiConsumer.makeNewGame(options)}
    onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
  />);

  game.find('.game-new-game').simulate('click');
  expect(game.find('.tile').first().text()).toEqual('1');
  game.find('.tile').first().simulate('click');

  expect(apiConsumer.playTurnWasCalled(1)).toBe(true);
  expect(game.find('.tile').first().text()).toEqual('X');
});

test('does not try to play a turn on a taken position', () => {
  const apiConsumer = new MockApiConsumer(9);
  const game = mount(<Game
    onNewGame={(options) => apiConsumer.makeNewGame(options)}
    onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
  />);

  game.find('.game-new-game').simulate('click');
  expect(game.find('.tile').first().text()).toEqual('1');
  game.find('.tile').first().simulate('click');
  game.find('.tile').first().simulate('click');

  expect(apiConsumer.playTurnWasCalled(1)).toBe(true);
  expect(game.find('.tile').first().text()).toEqual('X');
});

test('alternates players turns', () => {
  const apiConsumer = new MockApiConsumer(9);
  const game = mount(<Game
    onNewGame={(options) => apiConsumer.makeNewGame(options)}
    onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
  />);

  game.find('.game-new-game').simulate('click');
  expect(game.find('.tile').first().text()).toEqual('1');
  game.find('.tile').at(0).simulate('click');
  game.find('.tile').at(1).simulate('click');

  expect(apiConsumer.playTurnWasCalled(2)).toBe(true);
  expect(game.find('.tile').at(0).text()).toEqual('X');
  expect(game.find('.tile').at(1).text()).toEqual('O');
});

test('does not allow moves to be made once the game is over', () => {
  const apiConsumer = new MockApiConsumer(5);
  const game = mount(<Game
    onNewGame={(options) => apiConsumer.makeNewGame(options)}
    onPlayTurn={(game, move) => apiConsumer.playTurn(game, move)}
  />);

  game.find('.game-new-game').simulate('click');
  expect(game.find('.tile').first().text()).toEqual('1');
  game.find('.tile').at(0).simulate('click');
  game.find('.tile').at(3).simulate('click');
  game.find('.tile').at(1).simulate('click');
  game.find('.tile').at(4).simulate('click');
  game.find('.tile').at(2).simulate('click');
  game.find('.tile').at(5).simulate('click');
  game.find('.tile').at(6).simulate('click');
  game.find('.tile').at(7).simulate('click');
  game.find('.tile').at(8).simulate('click');

  expect(apiConsumer.playTurnWasCalled(5)).toBe(true);
  expect(game.find('.tile').at(0).text()).toEqual('X');
  expect(game.find('.tile').at(1).text()).toEqual('X');
  expect(game.find('.tile').at(2).text()).toEqual('X');
  expect(game.find('.tile').at(3).text()).toEqual('O');
  expect(game.find('.tile').at(4).text()).toEqual('O');
  expect(game.find('.tile').at(5).text()).toEqual('6');
  expect(game.find('.tile').at(6).text()).toEqual('7');
  expect(game.find('.tile').at(7).text()).toEqual('8');
  expect(game.find('.tile').at(8).text()).toEqual('9');
});
