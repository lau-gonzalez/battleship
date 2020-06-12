/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import Game from '../containers/GameConnected';
import Header from '../containers/HeaderConnected';

export default function BattleshipGameContainer(props) {
  return (
    <div>
      <div className="container-fluid">
        <Header />
        <Game history={props.history} />
      </div>
    </div>
  );
}
