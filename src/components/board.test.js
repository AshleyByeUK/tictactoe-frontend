import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon'
import Board from './board';

const BOARD_ROW = '.board-row';
const CLICK = 'click';
const GAME_TILE = '.game-tile';

test('a 3x3 board has 3 rows', () => {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = shallow(<Board tiles={tiles} />);
  expect(board.find(BOARD_ROW).length).toBe(3);
});

test('a 3x3 board row has 3 tiles and 9 tiles in total', () => {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = mount(<Board tiles={tiles} />);
  const rows = board.find(BOARD_ROW);
  expect(rows.first().find(GAME_TILE).length).toBe(3);
  expect(rows.find(GAME_TILE).length).toBe(9);
});

test('an empty 3x3 board displays available position numbers', () => {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = mount(<Board tiles={tiles} />);
  const allTiles = board.find(GAME_TILE);
  allTiles.forEach(
    (t, index) => {
      expect(t.text()).toBe((tiles[index]).toString());
    });
});

test('a 3x3 board with displays a token or available position numbers', () => {
  const tiles = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 8, 9];
  const board = mount(<Board tiles={tiles} />);
  const allTiles = board.find(GAME_TILE);
  allTiles.forEach(
    (t, index) => {
      expect(t.text()).toBe((tiles[index]).toString());
    });
});

test('an empty tile returns its position when clicked', () => {
  const onClickFunction = sinon.spy();
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = mount(<Board tiles={tiles} onClick={() => onClickFunction(0)} />);
  const tile = board.find(GAME_TILE).first().simulate(CLICK);
  expect(onClickFunction.calledWith(0)).toBe(true);
});
