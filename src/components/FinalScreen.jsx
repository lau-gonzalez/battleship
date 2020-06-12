/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';
import loser from '../img/loser.png';
import winner from '../img/winner.png';

export default function FinalScreen(props) {
  const { gamePhase } = props;
  return (
    <div className="container-fluid d-flex bg-primary welcome justify-content-center flex-row align-items-center">
      <div className="col-md-4 text-center d-flex  flex-column align-items-center">

        {gamePhase === 'You Lose!' ? <img src={loser} alt="loser" /> : <img src={winner} alt="winner" />}
        <h1 className="mb-4">{gamePhase}</h1>
        <button type="button" className="btn btn-secondary" onClick={() => { props.history.push('/'); window.location.reload(true); }}>
          Play Again!
        </button>
      </div>
    </div>
  );
}

FinalScreen.propTypes = {
  gamePhase: PropTypes.string.isRequired,
};
