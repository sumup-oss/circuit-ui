import React from 'react';

import Checkbox from '.';

const name = 'name';
const onChange = jest.fn();

describe('Checkbox', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Checkbox {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with checked styles when passed the checked prop', () => {
    const actual = create(<Checkbox checked {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Checkbox disabled {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Checkbox invalid {...{ name, onChange }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div>
        <Checkbox {...{ name, onChange }}>Label</Checkbox>
      </div>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const wrapper = shallow(<Checkbox {...{ name, onChange }} />);
    const actual = wrapper.find('CheckboxInput').props().checked;
    expect(actual).toBeFalsy();
  });

  it('should call onChange when toggled', () => {
    const wrapper = shallow(<Checkbox {...{ name, onChange }} />);
    const label = wrapper.find('CheckboxInput');
    label.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
