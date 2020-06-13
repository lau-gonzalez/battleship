/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ButtonPosition from '../../components/ButtonPosition';
import { selectPosition } from '../../actions';

const props = {
  name: 'CR',
  onButtonClick: () => {},
};

function shallowWithRedux(component,
  { initialState, store = createStore(selectPosition, initialState) } = {}) {
  return {
    ...shallow(<Provider store={store}>{component}</Provider>),
  };
}

describe('../../components/Header', () => {
  it('should render correct', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallowWithRedux(<ButtonPosition {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
