import React from 'react';

import { PasswordInput } from '.';
import Label from '../Label';

describe('PasswordInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<PasswordInput />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const actual = create(<PasswordInput disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should have type password by default', () => {
    const wrapper = shallow(<PasswordInput />)
      .dive()
      .dive()
      .dive();
    const actual = wrapper.find('Input').prop('type');
    expect(actual).toBe('password');
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="id">
        <PasswordInput id="id" />Password
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should toggle type between "password" and "text" by clicking the eye icon', () => {
    const wrapper = mount(<PasswordInput />);
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
