import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HelloWorld from './hello-world'

test('Hello World', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HelloWorld />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div')
  expect(result.props.children).toEqual('Hello World')
});
