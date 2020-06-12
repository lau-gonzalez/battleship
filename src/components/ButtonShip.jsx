/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonShip(props) {
  const { name, onButtonClick, displayName } = props;

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mr-3 mb-3"
        name={name}
        onClick={(e) => { onButtonClick(e.target.name); }}
      >
        {displayName}
      </button>

    </div>
  );
}

ButtonShip.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
