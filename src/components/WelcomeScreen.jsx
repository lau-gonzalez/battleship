/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';
import ship from '../img/ship.png';

export default function WelcomeScreen(props) {
  const { onSubmitWelcome } = props;
  return (
    <div className="container-fluid d-flex bg-primary welcome justify-content-center flex-column align-items-center">
      <img src={ship} alt="ship" />
      <div className="col-md-4 text-center">
        <h1 className="mb-4">Battleship</h1>
        <form onSubmit={(e) => { e.preventDefault(); onSubmitWelcome(e.target.welcome.value); props.history.push('/battleship'); }}>
          <input type="text" name="welcome" className="form-control mb-3" placeholder="Enter Name" required />
          <button type="submit" className="btn btn-dark">
            Start Battle!
          </button>
        </form>
      </div>
    </div>
  );
}

WelcomeScreen.propTypes = {
  onSubmitWelcome: PropTypes.func.isRequired,
};
