import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import Tile from './tile'

test('renders a tile with an available position number', () => {
  const renderer = TestRenderer.create(<Tile value={1} />);
  const instance = renderer.root;
  const tile = instance.find(
    (el => el.type == 'button')
  )

  expect(tile.type).toBe('button')
  expect(tile.props.children).toEqual(1)
});

test('renders a tile with a players token', () => {
  const renderer = TestRenderer.create(<Tile value={'X'} />);
  const instance = renderer.root;
  const tile = instance.find(
    (el => el.type == 'button')
  )

  expect(tile.type).toBe('button')
  expect(tile.props.children).toEqual('X')
});

test('returns its value when clicked', () => {
  const position = 1
  const onClickFunction = jest.fn((i) => i)
  const renderer = TestRenderer.create(
    <Tile
      value={position}
      onClick={onClickFunction(position)}
    />
  );
  const instance = renderer.root;
  const tile = instance.find(
    (el => el.type == 'button')
  )

  ReactTestUtils.Simulate.click(tile);

  expect(onClickFunction.mock.results[0].value).toBe(1)
});
