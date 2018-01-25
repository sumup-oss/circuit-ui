import React from 'react';

import { PasswordInput } from '.';

describe('PasswordInput', () => {
  it('should with default styles', () => {
    const actual = create(<PasswordInput />);
    expect(actual).toMatchSnapshot();
  });

  it('should with disabled styles', () => {
    const actual = create(<PasswordInput disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should have type password by default', () => {
    const wrapper = shallow(<PasswordInput />).dive();
    const actual = wrapper.find('password-input__input').prop('type');
    expect(actual).toBe('password');
  });

  it('should toggle type between "password" and "text" by clicking the eye icon', () => {
    const wrapper = shallow(<PasswordInput />).dive();
    const button = wrapper.find('svg-button');
    button.simulate('click');
    const actualFirstClick = wrapper.find('password-input__input').prop('type');
    expect(actualFirstClick).toBe('text');
    button.simulate('click');
    const actualSecondClick = wrapper
      .find('password-input__input')
      .prop('type');
    expect(actualSecondClick).toBe('password');
  });
});
