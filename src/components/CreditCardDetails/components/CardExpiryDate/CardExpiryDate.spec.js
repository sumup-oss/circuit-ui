import React from 'react';

import CardExpiryDate from '.';

describe('CardExpiryDate', () => {
  const inputSelector = 'WithTheme(Input)';
  it('should render a Label', () => {
    const wrapper = shallow(<CardExpiryDate />);
    expect(wrapper.find('Label')).toHaveLength(1);
  });

  it('should render an Input', () => {
    const wrapper = shallow(<CardExpiryDate />);
    expect(wrapper.find(inputSelector)).toHaveLength(1);
  });

  it('should pass the placeholder to the Input', () => {
    const wrapper = shallow(<CardExpiryDate />);
    const actual = wrapper.find(inputSelector).props().placeholder;
    expect(actual).toBeTruthy();
  });

  it('should pass the id to the Input', () => {
    const wrapper = shallow(<CardExpiryDate />);
    const actual = wrapper.find(inputSelector).props().id;
    expect(actual).toBeTruthy();
  });

  it('should spread any other props on the Input', () => {
    const wrapper = shallow(<CardExpiryDate foo="bar" />);
    const actual = wrapper.find(inputSelector).props().foo;
    expect(actual).toBeTruthy();
  });
});
