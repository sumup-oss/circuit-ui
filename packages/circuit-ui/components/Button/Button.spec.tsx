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
  render,
  renderToHtml,
  axe,
  RenderFn,
  act,
  userEvent,
} from '../../util/test-utils';

import { Button, ButtonProps } from './Button';

describe('Button', () => {
  function renderButton<T>(renderFn: RenderFn<T>, props: ButtonProps) {
    return renderFn(<Button {...props} />);
  }

  const baseProps = { children: 'Button' };

  describe('business logic', () => {
    it('should render as a link when passed the href prop', () => {
      const props = {
        ...baseProps,
        'href': '#',
        'onClick': jest.fn(),
        'data-testid': 'link-button',
      };
      const { getByTestId } = renderButton(render, props);
      const buttonEl = getByTestId('link-button');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should call the onClick handler when clicked', () => {
      const props = {
        ...baseProps,
        'onClick': jest.fn(),
        'data-testid': 'link-button',
      };
      const { getByTestId } = renderButton(render, props);

      act(() => {
        userEvent.click(getByTestId('link-button'));
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    /**
     * Should accept a working ref for button
     */
    it('should accept a working ref for a button', () => {
      const tref = React.createRef<HTMLButtonElement & HTMLAnchorElement>();
      const { container } = render(
        <Button ref={tref}>This is a button</Button>,
      );
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });

    /**
     * Should accept a working ref for link
     */
    it('should accept a working ref for a link', () => {
      const tref = React.createRef<HTMLButtonElement & HTMLAnchorElement>();
      const { container } = render(
        <Button href="http://sumup.com" ref={tref}>
          Link button
        </Button>,
      );
      const button = container.querySelector('a');
      expect(tref.current).toBe(button);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Button>Button</Button>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
