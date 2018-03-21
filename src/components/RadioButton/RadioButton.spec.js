import React from 'react';

import RadioButton from '.';

describe('RadioButton', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<RadioButton />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with checked styles', () => {
    const actual = create(<RadioButton checked />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const actual = create(<RadioButton disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles', () => {
    const actual = create(<RadioButton invalid />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <RadioButton name="radio">Radio button</RadioButton>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const wrapper = shallow(<RadioButton />);
    const actual = wrapper.find('RadioButtonInput').prop('checked');
    expect(actual).toBeFalsy();
  });

  it('should call onChange when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<RadioButton {...{ onToggle }} />);
    const label = wrapper.find('RadioButtonInput');
    label.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
