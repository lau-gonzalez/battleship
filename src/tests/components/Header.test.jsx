/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { error } from '../../actions';

const props = {
  gamePhase: 'pregamePhase',
  messageError: 'Select Ship!',
  onError: () => {},
};

function shallowWithRedux(component,
  { initialState, store = createStore(error, initialState) } = {}) {
  return {
    ...shallow(<Provider store={store}>{component}</Provider>),
  };
}

describe('../../components/Header', () => {
  it('should render correct', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallowWithRedux(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
