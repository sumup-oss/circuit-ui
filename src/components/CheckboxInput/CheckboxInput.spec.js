import React from 'react';

import { CheckboxInput } from '.';

const selector = 'pw';

describe('CheckboxInput', () => {
  /**
   * Stylesheet tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CheckboxInput {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const actual = create(<CheckboxInput disabled {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles', () => {
    const actual = create(<CheckboxInput invalid {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should be unchecked by default', () => {
    const wrapper = shallow(<CheckboxInput {...{ selector }} />);
    const actual = wrapper.find('CheckboxInputInput').prop('checked');
    expect(actual).toBeFalsy();
  });

  /**
   * Logic tests.
   */
  it('should call onToggle when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<CheckboxInput {...{ onToggle }} />);
    const label = wrapper.find('CheckboxInputLabel');
    label.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
