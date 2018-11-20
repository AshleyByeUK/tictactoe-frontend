import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';

it("has the title TicTacToe", () => {
  const header = shallow(<Header />);
  expect(header).toMatchSnapshot();
});
