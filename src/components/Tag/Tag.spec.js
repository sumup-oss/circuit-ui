/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import Tag from '.';

describe('Tag', () => {
  const DummyIcon = () => (
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path />
    </svg>
  );

  /**
   * Style tests.
   */
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

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Tag>Tag</Tag>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  describe('when is removable', () => {
    const props = {
      onRemove: jest.fn()
    };

    it('should render a close button', () => {
      const component = shallow(<Tag {...props}>SomeTest</Tag>);
      expect(component.find('CloseButton')).toHaveLength(1);
    });

    it('should calls onRemove when click close', () => {
      const component = shallow(<Tag {...props}>SomeTest</Tag>);

      component.find('CloseButton').simulate('click');

      expect(props.onRemove).toBeCalled();
    });
  });

  describe('when has icon', () => {
    const props = {
      icon: <DummyIcon />
    };

    it('should render with icon', () => {
      const component = shallow(<Tag {...props}>SomeTest</Tag>);
      expect(component.find('DummyIcon')).toHaveLength(1);
    });

    it('gives priority to close button when a removable', () => {
      const onRemove = jest.fn();

      const component = shallow(<Tag {...{ onRemove, props }}>SomeTest</Tag>);

      expect(component.find('DummyIcon')).toHaveLength(0);
      expect(component.find('CloseButton')).toHaveLength(1);
    });

    it('warns about icon + removable', () => {
      jest.spyOn(console, 'error');
      const onRemove = jest.fn();

      shallow(<Tag {...{ onRemove, ...props }}>SomeTest</Tag>);

      expect(console.error).toHaveBeenCalled();
    });
  });
});
