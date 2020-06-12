/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BoardConnected from '../containers/BoardConnected';

export default function Game(props) {
  const { gamePhase, inputName, player } = props;

  useEffect(() => {
    if (gamePhase === 'endGame') {
      props.history.push('/final');
    }
  // eslint-disable-next-line react/destructuring-assignment
  }, [gamePhase, props.history]);

  return (
    <div>
      <div className="options container">
        <div className="col-md-6 col-sm-12 d-flex flex-row justify-content-center flex-wrap">
          <div className="col-md-12 mb-3">
            <h2 className="text-center">{!inputName ? 'Player' : inputName}</h2>
          </div>
          <div className="col-md-12">
            <BoardConnected className="playerBoard" boardType="playerBoard" />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-row justify-content-center flex-wrap">
          <div className="col-md-12 mb-3">
            <h2 className="text-center">CPU</h2>
          </div>
          <div className="col-md-12">
            <BoardConnected className="enemyBoard" boardType="enemyBoard" />
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end mb-3">
        <h3 className="mr-3">
          Playing:
          <span>
            {' '}
            {player}
          </span>
        </h3>
        <button type="button" className="btn btn-secondary mr-4" onClick={() => { props.history.push('/'); window.location.reload(true); }}>
          Surrender
        </button>
      </div>
    </div>
  );
}

Game.propTypes = {
  gamePhase: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
};
