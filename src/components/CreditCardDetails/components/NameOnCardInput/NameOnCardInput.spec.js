import React from 'react';

import NameOnCardInput from '.';

describe('NameOnCardInput', () => {
  const inputSelector = 'WithTheme(Input)';
  it('should render a Label', () => {
    const wrapper = shallow(<NameOnCardInput />);
    expect(wrapper.find('Label')).toHaveLength(1);
  });

  it('should render an Input', () => {
    const wrapper = shallow(<NameOnCardInput />);
    expect(wrapper.find(inputSelector)).toHaveLength(1);
  });

  it('should pass the id to the Input', () => {
    const wrapper = shallow(<NameOnCardInput />);
    const actual = wrapper.find(inputSelector).props().id;
    expect(actual).toBeTruthy();
  });

  it('should spread any other props on the Input', () => {
    const wrapper = shallow(<NameOnCardInput foo="bar" />);
    const actual = wrapper.find(inputSelector).props().foo;
    expect(actual).toBeTruthy();
  });
});
