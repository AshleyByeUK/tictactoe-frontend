import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon'
import Board from './board';

test('a 3x3 board has 3 rows', () => {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = shallow(<Board tiles={tiles} />);
  expect(board.find('.board-row').length).toBe(3);
});

test('a 3x3 board row has 3 tiles and 9 tiles in total', () => {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = mount(<Board tiles={tiles} />);
  const rows = board.find('.board-row');
  expect(rows.first().find('.tile').length).toBe(3);
  expect(rows.find('.tile').length).toBe(9);
});

test('an empty 3x3 board displays available position numbers', () => {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = mount(<Board tiles={tiles} />);
  const allTiles = board.find('.tile');
  allTiles.forEach(
    (t, index) => {
      expect(t.text()).toBe((tiles[index]).toString());
    });
});

test('an empty tile returns its position when clicked', () => {
  const onClickFunction = sinon.spy();
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const board = mount(<Board tiles={tiles} onClick={onClickFunction(0)} />);
  const tile = board.find('.tile').first().simulate('click');
  expect(onClickFunction.calledWith(0)).toBe(true);
});
