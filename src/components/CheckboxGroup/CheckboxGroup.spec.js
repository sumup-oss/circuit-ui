import React from 'react';

import CheckboxGroup from '.';

describe('CheckboxGroup', () => {
  const options = [
    {
      label: 'Option 1',
      value: 'first'
    },
    {
      label: 'Option 2',
      value: 'second'
    },
    {
      label: 'Option 3',
      value: 'third'
    }
  ];
  const value = ['second', 'third'];

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CheckboxGroup {...{ options }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CheckboxGroup {...{ options, value }} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should check the currently active Checkboxes', () => {
    const wrapper = shallow(<CheckboxGroup {...{ options, value }} />);
    const first = wrapper
      .find('Checkbox')
      .at(1)
      .dive()
      .find('CheckboxInput')
      .prop('checked');
    const second = wrapper
      .find('Checkbox')
      .at(2)
      .dive()
      .find('CheckboxInput')
      .prop('checked');
    const actual = first && second;
    expect(actual).toBeTruthy();
  });
});
