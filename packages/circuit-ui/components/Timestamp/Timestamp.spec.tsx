/**
 * Copyright 2024, SumUp Ltd.
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MockDate from 'mockdate';
import { createRef } from 'react';

import { render, screen, axe, act } from '../../util/test-utils.js';

import { Timestamp } from './Timestamp.js';

describe('Calendar', () => {
  beforeEach(() => {
    MockDate.set('2020-01-01T01:00+01:00');
  });

  const baseProps = {
    datetime: '2020-01-01T00:00+01:00[Europe/Berlin]',
  };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Timestamp {...baseProps} className={className} />);
    const element = screen.getByRole('time');
    expect(element?.className).toContain(className);
  });

  it('should forward a ref to the outer element', () => {
    const ref = createRef<HTMLTimeElement>();
    render(<Timestamp {...baseProps} ref={ref} />);
    const element = screen.getByRole('time');
    expect(ref.current).toBe(element);
  });

  it('should have a valid `datetime` attribute', () => {
    render(<Timestamp {...baseProps} />);
    const element = screen.getByRole('time');
    expect(element).toHaveAttribute('datetime', '2020-01-01T00:00:00+01:00');
  });

  describe('absolute variant', () => {
    it('should display a narrow human-readable date time', () => {
      render(
        <Timestamp {...baseProps} variant="absolute" formatStyle="narrow" />,
      );
      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('1/1/20');
    });

    it('should display a short human-readable date time', () => {
      render(
        <Timestamp {...baseProps} variant="absolute" formatStyle="short" />,
      );
      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('Jan 1, 2020');
    });

    it('should display a long human-readable date time', () => {
      render(
        <Timestamp {...baseProps} variant="absolute" formatStyle="long" />,
      );
      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('January 1, 2020');
    });

    describe('with time', () => {
      it('should display a narrow human-readable date time', () => {
        render(
          <Timestamp
            {...baseProps}
            variant="absolute"
            formatStyle="narrow"
            includeTime
          />,
        );
        const element = screen.getByRole('time');
        expect(element).toHaveTextContent('1/1/20, 12:00 AM');
      });

      it('should display a short human-readable date time', () => {
        render(
          <Timestamp
            {...baseProps}
            variant="absolute"
            formatStyle="short"
            includeTime
          />,
        );
        const element = screen.getByRole('time');
        expect(element).toHaveTextContent('Jan 1, 2020, 12:00 AM');
      });

      it('should display a long human-readable date time', () => {
        render(
          <Timestamp
            {...baseProps}
            variant="absolute"
            formatStyle="long"
            includeTime
          />,
        );
        const element = screen.getByRole('time');
        expect(element).toHaveTextContent('January 1, 2020 at 12:00 AM');
      });
    });
  });

  describe('relative variant', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should display a narrow human-readable date time', () => {
      render(
        <Timestamp {...baseProps} variant="relative" formatStyle="narrow" />,
      );
      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('1h ago');
    });

    it('should display a short human-readable date time', () => {
      render(
        <Timestamp {...baseProps} variant="relative" formatStyle="short" />,
      );
      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('1 hr. ago');
    });

    it('should display a long human-readable date time', () => {
      render(
        <Timestamp {...baseProps} variant="relative" formatStyle="long" />,
      );
      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('1 hour ago');
    });

    it('should update the time after an interval', () => {
      render(
        <Timestamp
          datetime="2020-01-01T01:01+01:00[Europe/Berlin]"
          variant="relative"
          formatStyle="narrow"
        />,
      );

      const element = screen.getByRole('time');
      expect(element).toHaveTextContent('in 1m');

      act(() => {
        vi.advanceTimersByTime(10 * 1000);
      });

      expect(element).toHaveTextContent('in 50s');
    });
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Timestamp {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
