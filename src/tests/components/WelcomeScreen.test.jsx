/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { shallow } from 'enzyme';
import WelcomeScreen from '../../components/WelcomeScreen';

describe('../../components/WelcomeScreen', () => {
  it('should work', () => {
    const onSubmitWelcome = (input) => console.log(input);
    const wrapper = shallow(
      <WelcomeScreen
        onSubmitWelcome={onSubmitWelcome}
      />,
    );
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });
});
