import React from 'react';

import SecurityCodeInput from '.';

describe('SecurityCodeInput', () => {
  const inputSelector = 'WithTheme(Input)';
  it('should render a Label', () => {
    const wrapper = shallow(<SecurityCodeInput />);
    expect(wrapper.find('SecurityCodeLabel')).toHaveLength(1);
  });

  it('should render an Input', () => {
    const wrapper = shallow(<SecurityCodeInput />);
    expect(wrapper.find(inputSelector)).toHaveLength(1);
  });

  it('should pass the placeholder to the Input', () => {
    const wrapper = shallow(<SecurityCodeInput />);
    const actual = wrapper.find(inputSelector).props().placeholder;
    expect(actual).toBeTruthy();
  });

  it('should pass the id to the Input', () => {
    const wrapper = shallow(<SecurityCodeInput />);
    const actual = wrapper.find(inputSelector).props().id;
    expect(actual).toBeTruthy();
  });

  it('should spread any other props on the Input', () => {
    const wrapper = shallow(<SecurityCodeInput foo="bar" />);
    const actual = wrapper.find(inputSelector).props().foo;
    expect(actual).toBeTruthy();
  });
});
