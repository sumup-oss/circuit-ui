import React from 'react';

import { CardHeader } from '../..';

describe('CardHeader', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CardHeader />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CardHeader />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
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
