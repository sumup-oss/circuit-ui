import React from 'react';

import Tag from '.';

describe('Tag', () => {
  const DummyIcon = () => (
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path />
    </svg>
  );

  describe('when is default', () => {
    const props = {};

    it('should render with default styles', () => {
      const component = create(<Tag {...props}>SomeTest</Tag>);
      expect(component).toMatchSnapshot();
    });
  });

  describe('when is clickable', () => {
    const props = {
      onClick: jest.fn()
    };

    it('should render with clickable styles', () => {
      const component = create(<Tag {...props}>SomeTest</Tag>);
      expect(component).toMatchSnapshot();
    });
  });

  describe('when is selected', () => {
    const props = {
      selected: true
    };

    it('should render with selected styles', () => {
      const component = create(<Tag {...props}>SomeTest</Tag>);
      expect(component).toMatchSnapshot();
    });

    it('should change the given icon color', () => {
      const component = create(
        <Tag {...{ icon: <DummyIcon />, ...props }}>SomeTest</Tag>
      );
      expect(component).toMatchSnapshot();
    });

    it('should change the close icon color', () => {
      const onRemove = jest.fn();

      const component = create(<Tag {...{ onRemove, ...props }}>SomeTest</Tag>);

      expect(component).toMatchSnapshot();
    });
  });

  describe('when is removable', () => {
    const props = {
      onRemove: jest.fn()
    };

    it('should render a close button', () => {
      const component = shallow(<Tag {...props}>SomeTest</Tag>).dive();
      expect(component.find('CloseButton')).toHaveLength(1);
    });

    it('should calls onRemove when click close', () => {
      const component = shallow(<Tag {...props}>SomeTest</Tag>).dive();

      component.find('CloseButton').simulate('click');

      expect(props.onRemove).toBeCalled();
    });
  });

  describe('when has icon', () => {
    const props = {
      icon: <DummyIcon />
    };

    it('should render with icon', () => {
      const component = shallow(<Tag {...props}>SomeTest</Tag>).dive();
      expect(component.find('DummyIcon')).toHaveLength(1);
    });

    it('gives priority to close button when a removable', () => {
      const onRemove = jest.fn();

      const component = shallow(
        <Tag {...{ onRemove, props }}>SomeTest</Tag>
      ).dive();

      expect(component.find('DummyIcon')).toHaveLength(0);
      expect(component.find('CloseButton')).toHaveLength(1);
    });

    it('warns about icon + removable', () => {
      jest.spyOn(console, 'warn');
      const onRemove = jest.fn();

      const component = shallow(
        <Tag {...{ onRemove, ...props }}>SomeTest</Tag>
      ).dive();

      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
});
