import React from 'react';

import RadioButton from '.';

const selector = 'pw';

describe('RadioButton', () => {
  /**
   * Stylesheet tests.
   */
  it('should render with default styles', () => {
    const actual = create(<RadioButton {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const actual = create(<RadioButton disabled {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles', () => {
    const actual = create(<RadioButton invalid {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const wrapper = shallow(<RadioButton {...{ selector }} />);
    const actual = wrapper.find('RadioButtonInput').prop('checked');
    expect(actual).toBeFalsy();
  });

  it('should call onChange when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<RadioButton {...{ onToggle }} />);
    const label = wrapper.find('RadioButtonLabel');
    label.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
