import React from 'react';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  it('should render and match the snapshot when closed', () => {
    const props = {
      open: false,
      onClose: jest.fn()
    };
    const actual = create(<Sidebar {...props} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render and match snapshot when open', () => {
    const props = {
      open: true,
      onClose: jest.fn()
    };
    const actual = create(<Sidebar {...props} />);
    expect(actual).toMatchSnapshot();
  });

  it('should dispatch onClose when CloseButton is clicked', () => {
    const props = {
      open: true,
      onClose: jest.fn()
    };
    const actual = mount(<Sidebar {...props} />);
    actual.find('CloseButton').simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Sidebar />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
