import React from 'react';

export default function Tile(props) {
  return (
    <button className='game-tile' onClick={props.onClick}>
      {props.position}
    </button>
  );
}
