import React from 'react';
import Button from './Button';

describe('Button', () => {
  it('should render a plain button', () => {
    const wrapper = shallow(<Button plain>Plain Button</Button>);
    const actual = wrapper.find('PlainButton');
    expect(actual).not.toBeEmpty();
  });

  it('should render a regular button', () => {
    const wrapper = shallow(<Button>Regular Button</Button>);
    const actual = wrapper.find('RegularButton');
    expect(actual).not.toBeEmpty();
  });
});
