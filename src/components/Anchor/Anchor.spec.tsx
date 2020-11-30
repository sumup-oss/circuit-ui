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

import React from 'react';

import {
  create,
  render,
  renderToHtml,
  axe,
  RenderFn,
  act,
  userEvent,
} from '../../util/test-utils';

import { Anchor, AnchorProps } from './Anchor';

describe('Anchor', () => {
  function renderAnchor<T>(renderFn: RenderFn<T>, props: AnchorProps) {
    return renderFn(<Anchor {...props} />);
  }

  const baseProps = { children: 'Anchor' };

  describe('styles', () => {
    it('should render as a `span` when neither href nor onClick is passed', () => {
      const actual = renderAnchor(create, baseProps);
      expect(actual).toMatchSnapshot();
    });

    it('should render as an `a` when an href (and onClick) is passed', () => {
      const props = {
        ...baseProps,
        href: 'https://sumup.com',
        onClick: jest.fn(),
      };
      const actual = renderAnchor(create, props);
      expect(actual).toMatchSnapshot();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const props = { ...baseProps, onClick: jest.fn() };
      const actual = renderAnchor(create, props);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should call the onClick handler when rendered as a link', () => {
      const props = {
        ...baseProps,
        'href': 'https://sumup.com',
        'onClick': jest.fn((event) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

    /**
     * Should accept a working ref for "button"
     */
    it('should accept a working ref for a "button"', () => {
      const tref = React.createRef<any>();
      const { container } = render(
        <Anchor ref={tref}>This is a span as button</Anchor>,
      );
      const button = container.querySelector('span');
      expect(tref.current).toBe(button);
    });

    /**
     * Should accept a working ref for link
     */
    it('should accept a working ref for a link', () => {
      const tref = React.createRef<any>();
      const { container } = render(
        <Anchor href="http://sumup.com" ref={tref}>
          Link button
        </Anchor>,
      );
      const anchor = container.querySelector('a');
      expect(tref.current).toBe(anchor);
    });

    /**
     * Should accept a working ref for span
     */
    it('should accept a working ref for a span', () => {
      const tref = React.createRef<any>();
      const { container } = render(<Anchor ref={tref}>Text button</Anchor>);
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
