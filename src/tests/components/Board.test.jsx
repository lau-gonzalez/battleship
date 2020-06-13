/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import Board from '../../components/Board';
import { preGameBoard } from '../../actions';

const props = {
  playerBoard: [],
  enemyBoard: [],
  selectedPiece: 'CR',
  selectedPos: 'horizontal',
  gamePhase: 'pregamePhase',
  getCursorOnEnter: () => {},
};

function shallowWithRedux(component,
  { initialState, store = createStore(preGameBoard, initialState) } = {}) {
  return {
    ...shallow(<Provider store={store}>{component}</Provider>),
  };
}

describe('../../components/Header', () => {
  it('should render correct', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallowWithRedux(<Board {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
