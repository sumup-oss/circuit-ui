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

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
} from '../../util/test-utils';
import Body from '../Body';
import Headline from '../Headline';

import { ListItemGroup, ListItemGroupProps } from './ListItemGroup';

describe('ListItemGroup', () => {
  function renderListItemGroup<T>(
    renderFn: RenderFn<T>,
    props: ListItemGroupProps,
  ) {
    return renderFn(<ListItemGroup {...props} />);
  }

  const items = [
    { id: 1, label: 'First item' },
    { id: 2, label: 'Second item' },
    { id: 3, label: 'Third item' },
  ];

  const baseProps = {
    items: items.map((item) => ({
      key: item.id,
      label: (
        <Body size="one" noMargin>
          {item.label}
        </Body>
      ),
      selected: item.id === 1,
    })),
    label: (
      <Headline as="h4" size="four" noMargin>
        Group label
      </Headline>
    ),
  };

  describe('styles', () => {
    it('should render the inset variant ListItemGroup by default', () => {
      const wrapper = renderListItemGroup(create, baseProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a plain variant ListItemGroup', () => {
      const wrapper = renderListItemGroup(create, {
        ...baseProps,
        variant: 'plain',
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItemGroup with a hidden label', () => {
      const wrapper = renderListItemGroup(create, {
        ...baseProps,
        hideLabel: true,
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a ListItemGroup with a details line', () => {
      const wrapper = renderListItemGroup(create, {
        ...baseProps,
        details: (
          <Body size="two" noMargin>
            Group details
          </Body>
        ),
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should accept a working ref', () => {
      const tref = createRef<any>();
      const { container } = renderListItemGroup(render, {
        ...baseProps,
        ref: tref,
      });
      const listItemGroup = container.firstChild;
      expect(tref.current).toBe(listItemGroup);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderListItemGroup(renderToHtml, {
        ...baseProps,
        label: (
          <Headline as="h4" size="four" noMargin>
            Group label
          </Headline>
        ),
        details: (
          <Body size="two" noMargin>
            Group details
          </Body>
        ),
      });
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
