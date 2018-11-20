import React from 'react';
import { Level } from 'reactbulma';

export default class GamePart extends React.Component {
  render() {
    return (
      <Level>
        <Level.Item>
          {this.props.render()};
        </Level.Item>
      </Level>
    );
  }
}
