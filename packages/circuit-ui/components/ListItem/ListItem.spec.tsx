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

import { createRef } from 'react';
import { SumUpCard } from '@sumup/icons';

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
  act,
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

    it('should render a ListItem with a prefix icon', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        prefix: SumUpCard,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom prefix', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        prefix: (
          <Badge variant="danger" circle>
            3
          </Badge>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        label: (
          <Body size="one" noMargin>
            Label
          </Body>
        ),
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
        details: (
          <Body size="two" noMargin>
            Details
          </Body>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a suffix label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffixLabel: 'Suffix label',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom suffix label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffixLabel: (
          <Body size="one" variant="highlight" noMargin>
            Suffix label
          </Body>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a suffix details line', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffixLabel: 'Suffix label',
        suffixDetails: 'Suffix details',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom suffix details line', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffixLabel: 'Suffix label',
        suffixDetails: (
          <Body size="two" variant="subtle" noMargin>
            Suffix details
          </Body>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItem with a custom suffix', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffix: <Badge variant="promo">Promo</Badge>,
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
    it('should not render a ListItem with a suffix details line without a suffix label', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffixDetails: 'Suffix details',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render a ListItem with both a suffix label and a custom suffix', () => {
      const wrapper = renderListItem(create, {
        ...baseProps,
        suffixLabel: 'Suffix label',
        suffix: <Badge variant="promo">Promo</Badge>,
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

    it('should call the onClick handler when clicked', () => {
      const props = {
        ...baseProps,
        onClick: jest.fn(),
      };
      const { getByRole } = renderListItem(render, props);

      act(() => {
        userEvent.click(getByRole('button'));
      });

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
        prefix: SumUpCard,
        details: 'Details',
        suffixLabel: 'Suffix label',
        suffixDetails: 'Suffix details',
        onClick: jest.fn(),
      });
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
