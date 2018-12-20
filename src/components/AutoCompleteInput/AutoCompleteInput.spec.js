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

    console.log(wrapper.debug());

    const item = wrapper.find('Items Item');

    expect(item).toHaveLength(1);
    expect(item.text()).toEqual('2222222222222');
  });
});
