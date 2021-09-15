/**
 * Copyright 2020, SumUp Ltd.
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
import { css } from '@emotion/core';

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
  act,
  userEvent,
} from '../../util/test-utils';
import { ClickEvent } from '../../types/events';

import { Anchor, AnchorProps } from './Anchor';

describe('Anchor', () => {
  function renderAnchor<T>(renderFn: RenderFn<T>, props: AnchorProps) {
    return renderFn(<Anchor {...props} />);
  }

  const baseProps = { children: 'Anchor' };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderAnchor(create, {
        ...baseProps,
        href: 'https://sumup.com',
      });
      expect(actual).toMatchSnapshot();
    });

    it('should render with custom styles', () => {
      const actual = renderAnchor(create, {
        ...baseProps,
        href: 'https://sumup.com',
        css: css`
          color: rebeccapurple;
        `,
      });
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should render as a `span` when neither href nor onClick is passed', () => {
      const { container } = renderAnchor(render, baseProps);
      const actual = container.querySelector('span');
      expect(actual).toBeVisible();
    });

    it('should render as an `a` when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
      };
      const { container } = renderAnchor(render, props);
      const actual = container.querySelector('a');
      expect(actual).toBeVisible();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: jest.fn() };
      const { container } = renderAnchor(render, props);
      const actual = container.querySelector('button');
      expect(actual).toBeVisible();
    });

    it('should call the onClick handler when rendered as a link', () => {
      const props = {
        ...baseProps,
        'href': 'https://sumup.com',
        'onClick': jest.fn((event: ClickEvent) => {
          event.preventDefault();
        }),
        'data-testid': 'anchor',
      };
      const { getByTestId } = renderAnchor(render, props);

      act(() => {
        userEvent.click(getByTestId('anchor'));
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should call the onClick handler when rendered as a button', () => {
      const props = {
        ...baseProps,
        'onClick': jest.fn(),
        'data-testid': 'anchor',
      };
      const { getByTestId } = renderAnchor(render, props);

      act(() => {
        userEvent.click(getByTestId('anchor'));
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref for a button', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Anchor onClick={jest.fn()} ref={tref}>
          button
        </Anchor>,
      );
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });

    it('should accept a working ref for a link', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Anchor href="https://sumup.com" ref={tref}>
          link
        </Anchor>,
      );
      const anchor = container.querySelector('a');
      expect(tref.current).toBe(anchor);
    });

    it('should accept a working ref for a span', () => {
      const tref = createRef<any>();
      const { container } = render(<Anchor ref={tref}>span</Anchor>);
      const span = container.querySelector('span');
      expect(tref.current).toBe(span);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
      };
      const wrapper = renderAnchor(renderToHtml, props);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
