import React from 'react';

import { CardHeader } from '../..';

describe('CardHeader', () => {
  /**
   * Style tests.
   */

  it('should have the correct styles', () => {
    const actual = create(<CardHeader />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */

  it('should render a close button when an onClose prop is passed', () => {
    const wrapper = shallow(<CardHeader onClose={() => {}} />)
      .children()
      .dive();
    const actual = wrapper.find('CloseButton');
    expect(actual).toHaveLength(1);
  });

  it('should call the onClose prop when the close button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<CardHeader onClose={onClose} />)
      .children()
      .dive();
    wrapper.find('CloseButton').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
