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

import {
  create,
  renderToHtml,
  axe,
  render,
  act,
  userEvent,
} from '../../util/test-utils';

import { Tag } from './Tag';

const DummyIcon = (props: any) => <div data-testid="tag-icon" {...props} />;

describe('Tag', () => {
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
      onClick: jest.fn(),
    };

    it('should render with clickable styles', () => {
      const component = create(<Tag {...props}>SomeTest</Tag>);
      expect(component).toMatchSnapshot();
    });
  });

  describe('when is selected', () => {
    const props = {
      selected: true,
    };

    it('should render with selected styles', () => {
      const component = create(<Tag {...props}>SomeTest</Tag>);
      expect(component).toMatchSnapshot();
    });

    it('should change the given icon color', () => {
      const component = create(
        <Tag {...{ prefix: DummyIcon, ...props }}>SomeTest</Tag>,
      );
      expect(component).toMatchSnapshot();
    });

    it('should change the close icon color', () => {
      const onRemove = jest.fn();

      const component = create(<Tag {...{ onRemove, ...props }}>SomeTest</Tag>);

      expect(component).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<HTMLButtonElement & HTMLDivElement>();
      const { container } = render(<Tag ref={tref} onClick={jest.fn()} />);
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
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
      onRemove: jest.fn(),
    };

    it('should render a close button', () => {
      const { getByTestId } = render(<Tag {...props}>SomeTest</Tag>);
      expect(getByTestId('tag-close')).not.toBeNull();
    });

    it('should call onRemove when closed', () => {
      const { getByTestId } = render(<Tag {...props}>SomeTest</Tag>);

      act(() => {
        userEvent.click(getByTestId('tag-close'));
      });

      expect(props.onRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('when a suffix prop is passed', () => {
    const props = {
      suffix: DummyIcon,
    };

    it('should render with suffix', () => {
      const { getByTestId } = render(<Tag {...props}>SomeTest</Tag>);
      expect(getByTestId('tag-icon')).not.toBeNull();
    });
  });

  describe('when a prefix prop is passed', () => {
    const props = {
      prefix: DummyIcon,
    };

    it('should render with a prefix', () => {
      const { getByTestId } = render(<Tag {...props}>SomeTest</Tag>);
      expect(getByTestId('tag-icon')).not.toBeNull();
    });
  });
});
