import React from 'react';

import RestrictedInput from '.';

describe('RestrictedInput', () => {
  it('should render an Input', () => {
    const wrapper = shallow(<RestrictedInput />);
    const themedInput = wrapper.find('WithTheme(Input)');
    expect(themedInput).toHaveLength(1);
  });

  it('should overwrite the keyDown handler on the Input, when filtered keys are provided', () => {
    const wrapper = shallow(<RestrictedInput filteredKeys={['e']} />);
    const themedInput = wrapper.find('WithTheme(Input)');
    const actual = themedInput.props('onKeyDown');
    expect(actual).toBeTruthy();
  });

  it('should overwrite the focus handler on the input', () => {
    const wrapper = shallow(<RestrictedInput />);
    const themedInput = wrapper.find('WithTheme(Input)');
    const actual = themedInput.props('onFocus');
    expect(actual).toBeTruthy();
  });

  it('should overwrite the mouseUp handler on the Input', () => {
    const wrapper = shallow(<RestrictedInput />);
    const themedInput = wrapper.find('WithTheme(Input)');
    const actual = themedInput.props('onMouseUp');
    expect(actual).toBeTruthy();
  });
});
