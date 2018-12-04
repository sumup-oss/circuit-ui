import React from 'react';

import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = shallow(
        <PaginationButton currentPage={1} onClick={jest.fn()} />
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles when have plain false', () => {
      const actual = shallow(
        <PaginationButton currentPage={1} onClick={jest.fn()} plain />
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('interactions', () => {
    it('should call method onClick with currentPage passed from props', () => {
      const props = {
        currentPage: 13,
        onClick: jest.fn()
      };
      const component = shallow(<PaginationButton {...props} />);
      component.simulate('click');
      expect(props.onClick).toHaveBeenCalledWith(13);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <PaginationButton currentPage={1} onClick={jest.fn()} />
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
