import React from 'react';

import Element from './Element';

describe('Element', () => {
  it('should render as basic html component', () => {
    const wrapper = shallow(<Element as="span" />);
    expect(wrapper.name()).toEqual('span');
  });

  it('should render as custom react component', () => {
    const Custom = () => <div>custom</div>;
    const wrapper = shallow(<Custom />);
    expect(wrapper.text()).toEqual('custom');
  });
});
