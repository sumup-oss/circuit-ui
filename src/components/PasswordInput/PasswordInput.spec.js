import React from 'react';

import { PasswordInput } from '.';

const selector = 'pw';

describe('PasswordInput', () => {
  it('should render with default styles', () => {
    const actual = create(<PasswordInput {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const actual = create(<PasswordInput disabled {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should have type password by default', () => {
    const wrapper = shallow(<PasswordInput {...{ selector }} />)
      .dive()
      .dive()
      .dive();
    const actual = wrapper.find('Input').prop('type');
    expect(actual).toBe('password');
  });

  it('should toggle type between "password" and "text" by clicking the eye icon', () => {
    const wrapper = mount(<PasswordInput {...{ selector }} />);
    const button = wrapper.find('button');
    button.simulate('click');
    const actualTypeOne = wrapper.find('input').prop('type');
    const actualIconOne = wrapper.text();
    // Updates type
    expect(actualTypeOne).toBe('text');
    // Updates icon
    expect(actualIconOne).toBe('eye-off.svg');
    button.simulate('click');
    const actualTypeTwo = wrapper.find('input').prop('type');
    const actualIconTwo = wrapper.text();
    // Updates type
    expect(actualTypeTwo).toBe('password');
    // Updates icon
    expect(actualIconTwo).toBe('eye.svg');
  });
});
