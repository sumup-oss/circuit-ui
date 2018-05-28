import React from 'react';

import RadioButtonGroup from '.';

describe('RadioButtonGroup', () => {
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
  const value = 'second';

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<RadioButtonGroup {...{ options }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles', () => {
    const actual = create(<RadioButtonGroup noMargin {...{ options }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div role="group" aria-label="Choose your favourite option">
        <RadioButtonGroup {...{ options, value }} />
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should check the currently active RadioButton', () => {
    const wrapper = shallow(<RadioButtonGroup {...{ options, value }} />);
    const actual = wrapper
      .find('RadioButton')
      .at(1)
      .dive()
      .find('RadioButtonInput')
      .prop('checked');
    expect(actual).toBeTruthy();
  });
});
