import React from 'react';
import Button from './Button';

describe('Button', () => {
  it('should render a plain button', () => {
    const wrapper = mount(<Button plain>Plain Button</Button>);
    const actual = wrapper.find('PlainButton');
    expect(actual).toExist();
  });

  it('should render a regular button', () => {
    const wrapper = mount(<Button>Regular Button</Button>);
    const actual = wrapper.find('RegularButton');
    expect(actual).toExist();
  });
});
