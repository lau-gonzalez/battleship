/* eslint linebreak-style: ["error", "windows"] */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonShip from '../containers/ButtonShipConnected';
import ButtonPosition from '../containers/ButtonPositionConnected';

export default function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { gamePhase, messageError, onError } = props;
  const [status, setStatus] = useState();

  useEffect(() => {
    if (messageError !== 'empty' && messageError) {
      document.getElementById('alert').style.display = 'block';
      setTimeout(() => {
        document.getElementById('alert').style.display = 'none';
        onError('empty');
      }, 2000);
    }
    if (gamePhase === 'battle') {
      document.getElementById('buttons_ship').style.display = 'none';
      document.getElementById('buttons_pos').style.display = 'none';
      setStatus('Start Battle!');
    }
  }, [gamePhase, messageError, onError]);

  return (
    <div className="">
      <div className="col-md-12"><h2 className="h2_options">{status}</h2></div>
      <div id="buttons_ship" className="buttons">
        <ButtonShip name="CR" displayName="Carrier" />
        <ButtonShip name="C1" displayName="Cruiser 1" />
        <ButtonShip name="C2" displayName="Cruiser 2" />
        <ButtonShip name="C3" displayName="Cruiser 3" />
        <ButtonShip name="S" displayName="Sub" />
      </div>
      <div id="buttons_pos" className="buttons">
        <ButtonPosition name="vertical" />
        <ButtonPosition name="horizontal" />
      </div>
      <div className="alert alert-danger text-center" id="alert" role="alert">
        {messageError}
      </div>
    </div>
  );
}

Header.propTypes = {
  gamePhase: PropTypes.string.isRequired,
  onError: PropTypes.func.isRequired,
};
