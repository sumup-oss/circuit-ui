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
import { css } from '@emotion/react';

import { render, axe, userEvent, screen } from '../../util/test-utils';
import { ClickEvent } from '../../types/events';

import { Anchor } from './Anchor';

describe('Anchor', () => {
  const baseProps = { children: 'Anchor' };

  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = render(
        <Anchor {...baseProps} href="https://sumup.com" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with custom styles', () => {
      const { container } = render(
        <Anchor
          {...baseProps}
          href="https://sumup.com"
          css={css`
            color: rebeccapurple;
          `}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should render as a `span` when neither href nor onClick is passed', () => {
      const { container } = render(<Anchor {...baseProps} />);
      const actual = container.querySelector('span');
      expect(actual).toBeVisible();
    });

    it('should render as an `a` when an href (and onClick) is passed', () => {
      const { container } = render(
        <Anchor {...baseProps} href="https://sumup.com" onClick={jest.fn} />,
      );
      const actual = container.querySelector('a');
      expect(actual).toBeVisible();
    });

    it('should render as a `button` when an onClick is passed', () => {
      const { container } = render(<Anchor {...baseProps} onClick={jest.fn} />);
      const actual = container.querySelector('button');
      expect(actual).toBeVisible();
    });

    it('should call the onClick handler when rendered as a link', async () => {
      const onClick = jest.fn((event: ClickEvent) => {
        event.preventDefault(); // navigation is not implemented in jsdom
      });
      render(
        <Anchor {...baseProps} href="https://sumup.com" onClick={onClick} />,
      );

      await userEvent.click(screen.getByRole('link'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call the onClick handler when rendered as a button', async () => {
      const onClick = jest.fn();
      render(<Anchor {...baseProps} onClick={onClick} />);

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref for a button', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Anchor {...baseProps} onClick={jest.fn} ref={tref} />,
      );
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });

    it('should accept a working ref for a link', () => {
      const tref = createRef<any>();
      const { container } = render(
        <Anchor {...baseProps} href="https://sumup.com" ref={tref} />,
      );
      const anchor = container.querySelector('a');
      expect(tref.current).toBe(anchor);
    });

    it('should accept a working ref for a span', () => {
      const tref = createRef<any>();
      const { container } = render(<Anchor {...baseProps} ref={tref} />);
      const span = container.querySelector('span');
      expect(tref.current).toBe(span);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(
        <Anchor {...baseProps} href="https://sumup.com" onClick={jest.fn} />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
