import React from 'react';

import AutoCompleteInput from '.';

describe('AutoCompleteInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<AutoCompleteInput onChange={() => {}} items={[]} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should filter items when input is changed', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <AutoCompleteInput
        onChange={handleChange}
        items={['1111111111111', '2222222222222', '3333333333333']}
      />
    );

    wrapper.find('input').simulate('change', { target: { value: '222' } });

    expect(
      wrapper
        .find('#downshift-1-item-0')
        .first()
        .text()
    ).toBe('2222222222222');
  });
});
