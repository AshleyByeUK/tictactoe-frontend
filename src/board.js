import React from 'react';
import Tile from './tile'

export default class Board extends React.Component {
  renderTile(position) {
    return (
      <Tile position={this.props.tiles[position]} />
    )
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
        </div>
        <div className="board-row">
          {this.renderTile(3)}
          {this.renderTile(4)}
          {this.renderTile(5)}
        </div>
        <div className="board-row">
          {this.renderTile(6)}
          {this.renderTile(7)}
          {this.renderTile(8)}
        </div>
      </div>
    )
  }
}
