/**
 * Copyright 2021, SumUp Ltd.
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

import { createRef, FC } from 'react';
import { IconProps, SumUpCard } from '@sumup/icons';

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
  userEvent,
} from '../../util/test-utils';
import Body from '../Body';
import Badge from '../Badge';

import { ListItem, ListItemProps } from './ListItem';

describe('ListItem', () => {
  function renderListItem<T>(renderFn: RenderFn<T>, props: ListItemProps) {
    return renderFn(<ListItem {...props} />);
  }

  const baseProps = {
    label: 'Label',
  };

  describe('styles', () => {
    it('should render the action variant ListItem by default', () => {
      const wrapper = renderListItem(create, baseProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a navigation variant ListItem', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        variant: 'navigation',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a leading icon', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        leadingComponent: SumUpCard as FC<IconProps>,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom leading component', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        leadingComponent: (
          <Badge variant="alert" circle>
            3
          </Badge>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        label: <Body size="one">Label</Body>,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a details line', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        details: 'Details',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom details line', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        details: <Body size="two">Details</Body>,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a trailing label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        trailingLabel: 'Trailing label',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom trailing label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        trailingLabel: (
          <Body size="one" variant="highlight">
            Trailing label
          </Body>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with trailing details', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        trailingLabel: 'Trailing label',
        trailingDetails: 'Trailing details',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with custom trailing details', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        trailingLabel: 'Trailing label',
        trailingDetails: (
          <Body size="two" variant="subtle">
            Trailing details
          </Body>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom trailing component', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        trailingComponent: <Badge variant="promo">Promo</Badge>,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a selected ListItem', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        selected: true,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a disabled ListItem', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        disabled: true,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should not render a trailing section with details but no label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        trailingDetails: 'Trailing details',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render as a link when the href prop is passed', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        href: 'https://sumup.com',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render as a button when the onClick prop is passed', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        onClick: jest.fn(),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should call the onClick handler when clicked', async () => {
      const props = {
        ...baseProps,
        onClick: jest.fn(),
      };
      const { getByRole } = renderListItem(render, props);

      await userEvent.click(getByRole('button'));

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref', () => {
      const tref = createRef<any>();
      const { container } = renderListItem(render, {
        ...baseProps,
        ref: tref,
      });
      const listItem = container.firstChild;
      expect(tref.current).toBe(listItem);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderListItem(renderToHtml, {
        ...baseProps,
        variant: 'navigation',
        leadingComponent: SumUpCard as FC<IconProps>,
        details: 'Details',
        trailingLabel: 'Trailing label',
        trailingDetails: 'Trailing details',
        onClick: jest.fn(),
      });
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
