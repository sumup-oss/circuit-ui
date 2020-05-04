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
  render,
  renderToHtml,
  axe,
  RenderFn,
  act,
  userEvent
} from '../../util/test-utils';

import { Button, ButtonProps } from './Button';

describe('Button', () => {
  function renderButton(renderFn: RenderFn, props: ButtonProps) {
    return renderFn(<Button {...props} />);
  }

  const baseProps = { children: 'Button' };

  describe('styles', () => {
    it('should render a primary button by default', () => {
      const wrapper = renderButton(create, baseProps);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a secondary button', () => {
      const wrapper = renderButton(create, {
        ...baseProps,
        variant: 'secondary'
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a tertiary button', () => {
      const wrapper = renderButton(create, {
        ...baseProps,
        variant: 'tertiary'
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a kilo button', () => {
      const wrapper = renderButton(create, { ...baseProps, size: 'kilo' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a mega button', () => {
      const wrapper = renderButton(create, { ...baseProps, size: 'mega' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a giga button', () => {
      const wrapper = renderButton(create, { ...baseProps, size: 'giga' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a disabled button', () => {
      const wrapper = renderButton(create, { ...baseProps, disabled: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a stretched button', () => {
      const wrapper = renderButton(create, { ...baseProps, stretch: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should render as a link when passed the href prop', () => {
      const props = {
        ...baseProps,
        href: '#',
        onClick: jest.fn(),
        'data-testid': 'link-button'
      };
      const { getByTestId } = renderButton(render, props);
      const buttonEl = getByTestId('link-button');
      expect(buttonEl.tagName).toBe('A');
      expect(buttonEl).toHaveAttribute('href');
    });

    it('should call the onClick handler when clicked', () => {
      const props = {
        ...baseProps,
        onClick: jest.fn(),
        'data-testid': 'link-button'
      };
      const { getByTestId } = renderButton(render, props);

      act(() => {
        userEvent.click(getByTestId('link-button'));
      });

      expect(props.onClick).toHaveBeenCalledTimes(1);
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
