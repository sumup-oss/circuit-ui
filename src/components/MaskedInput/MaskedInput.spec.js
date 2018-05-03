import React from 'react';

import MaskedInput from '.';

describe('MaskedInput', () => {
  /**
   * Logic tests.
   */
  it('should render an Input', () => {
    const wrapper = render(<MaskedInput mask={[/\d/]} />);
    const input = wrapper.find('input');
    expect(input).toBeTruthy();
  });

  it('should forward props to Input', () => {
    const wrapper = mount(<MaskedInput mask={[/\d/]} disabled />);
    const input = wrapper.find('Input');
    const actual = input.prop('disabled');
    expect(actual).toBeTruthy();
  });

  it('should set the deepRef on Input', () => {
    const wrapper = mount(<MaskedInput mask={[/\d/]} />);
    const input = wrapper.find('Input');
    const actual = input.prop('deepRef');
    expect(actual).toBeTruthy();
  });
});
