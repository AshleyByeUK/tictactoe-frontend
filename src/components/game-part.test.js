import React from 'react';
import { mount } from 'enzyme';
import GamePart from './game-part';

it("renders the component passed to it", () => {
  const data = 'test data';
  const gameInfo = mount(<GamePart render={() => (
      <div className="data">{data}</div>
    )} />);
  expect(gameInfo.find('.data').text()).toEqual(data);
});
