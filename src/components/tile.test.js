import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon'
import Tile from './tile';

const CLICK = 'click';

test('renders a tile with an available position number', () => {
  const tile = shallow(<Tile position={1} />);
  const tileText = tile.getElement().props.children;
  expect(tileText).toBe(1);
});

test('renders a tile with a players token', () => {
  const tile = shallow(<Tile position={'X'} />);
  const tileText = tile.getElement().props.children;
  expect(tileText).toEqual('X');
});

test('returns its position when clicked', () => {
  const position = 1;
  const onClickFunction = sinon.spy();
  const tile = mount(
    <Tile
      position={position}
      onClick={onClickFunction(position)}
    />
  );
  tile.simulate(CLICK);
  expect(onClickFunction.calledWith(position)).toBe(true);
});

test('returns its token when clicked', () => {
  const token = 'X';
  const onClickFunction = sinon.spy();
  const tile = mount(
    <Tile
      position={0}
      onClick={onClickFunction(token)}
    />
  );
  tile.simulate(CLICK);
  expect(onClickFunction.calledWith(token)).toBe(true);
});
