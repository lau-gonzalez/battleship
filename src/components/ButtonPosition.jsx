/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonShip(props) {
  const { name, onButtonClick } = props;
  return (
    <div>
      <button
        type="button"
        className="btn btn-dark mr-3"
        name={name}
        onClick={(e) => { onButtonClick(e.target.name); }}
      >
        {name}
      </button>

    </div>
  );
}

ButtonShip.propTypes = {
  name: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
