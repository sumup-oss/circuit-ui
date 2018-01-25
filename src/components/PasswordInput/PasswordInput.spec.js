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
    const wrapper = mount(<PasswordInput />);
    const actual = wrapper.find('input').prop('type');
    expect(actual).toBe('password');
  });

  it('should toggle type between "password" and "text" by clicking the eye icon', () => {
    const wrapper = shallow(<PasswordInput />).dive();
    const button = wrapper.find('Styled(button)');
    button.simulate('click');
    const actualFirstClick = wrapper.find('Styled(input)').prop('type');
    expect(actualFirstClick).toBe('text');
    button.simulate('click');
    const actualSecondClick = wrapper.find('Styled(input)').prop('type');
    expect(actualSecondClick).toBe('password');
  });
});
