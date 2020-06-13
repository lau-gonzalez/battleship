/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ButtonShip from '../../components/ButtonShip';
import { selectShip } from '../../actions';

const props = {
  name: 'CR',
  displayName: 'Carrier',
  onButtonClick: () => {},
};

function shallowWithRedux(component,
  { initialState, store = createStore(selectShip, initialState) } = {}) {
  return {
    ...shallow(<Provider store={store}>{component}</Provider>),
  };
}

describe('../../components/Header', () => {
  it('should render correct', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallowWithRedux(<ButtonShip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
