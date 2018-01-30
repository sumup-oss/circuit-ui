import React from 'react';

import { RadioInput } from '.';

const selector = 'pw';

describe('RadioInput', () => {
  /**
   * Stylesheet tests.
   */
  it('should render with default styles', () => {
    const actual = create(<RadioInput {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const actual = create(<RadioInput disabled {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles', () => {
    const actual = create(<RadioInput invalid {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should be unchecked by default', () => {
    const wrapper = shallow(<RadioInput {...{ selector }} />);
    const actual = wrapper.find('RadioInputInput').prop('checked');
    expect(actual).toBeFalsy();
  });

  /**
   * Logic tests.
   */
  it('should call onChange when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<RadioInput {...{ onToggle }} />);
    const label = wrapper.find('RadioInputLabel');
    label.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
