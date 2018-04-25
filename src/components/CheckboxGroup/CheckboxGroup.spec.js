import React from 'react';

import CheckboxGroup from '.';

describe('CheckboxGroup', () => {
  const onChange = jest.fn();
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
    const actual = create(<CheckboxGroup {...{ options, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div role="group" aria-label="Choose your favourite options">
        <CheckboxGroup {...{ options, value, onChange }} />
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should check the currently active Checkboxes', () => {
    const wrapper = shallow(
      <CheckboxGroup {...{ options, value, onChange }} />
    );
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
