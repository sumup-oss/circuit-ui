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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { axe, render, screen, userEvent } from '../../../util/test-utils.js';

import { DateSegment } from './DateSegment.js';

describe('DateSegment', () => {
  const props = {
    'aria-label': 'Month',
    placeholder: 'mm',
    value: 5,
    defaultValue: 3,
    min: 1,
    max: 12,
    step: 3,
    onChange: vi.fn(),
    focus: {
      previous: vi.fn(),
      next: vi.fn(),
      props: { 'data-focus-list': 'focus-id' },
    },
  };

  describe('semantics', () => {
    it('should have an accessible name', () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAccessibleName('Month');
    });

    it('should have the required aria attributes for its spinbutton role', () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuenow', '5');
      expect(input).toHaveAttribute('aria-valuemin', '1');
      expect(input).toHaveAttribute('aria-valuemax', '12');
    });

    it('should use the numeric keyboard on touchscreen devices', () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('inputmode', 'numeric');
      expect(input).toHaveAttribute('enterkeyhint', 'next');
    });
  });

  describe('interactions', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should change the value when typing a number', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '3');
      expect(props.onChange).toHaveBeenCalledWith(3);
    });

    it('should not change the value when typing a string', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, 'foo');
      expect(props.onChange).toHaveBeenCalledWith('');
    });

    it('should move the focus to the next segment when typing any other digit would exceed the maximum value', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '2');
      expect(props.focus.next).toHaveBeenCalled();
    });

    it.each(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'])(
      'should not change the value when pressing the %s key when the input is disabled',
      async (key) => {
        render(<DateSegment {...props} disabled />);
        const input = screen.getByRole('spinbutton');
        await userEvent.type(input, `{${key}}`);
        expect(props.onChange).not.toHaveBeenCalled();
      },
    );
    it.each(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'])(
      'should not change the value when pressing the %s key when the input is read-only',
      async (key) => {
        render(<DateSegment {...props} readOnly />);
        const input = screen.getByRole('spinbutton');
        await userEvent.type(input, `{${key}}`);
        expect(props.onChange).not.toHaveBeenCalled();
      },
    );

    it.each(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'])(
      'should set the default value when pressing the %s key',
      async (key) => {
        render(<DateSegment {...props} value="" />);
        const input = screen.getByRole('spinbutton');
        await userEvent.type(input, `{${key}}`);
        expect(props.onChange).toHaveBeenCalledWith(3);
      },
    );

    it('should increment the value when pressing the ArrowUp key', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowUp}');
      expect(props.onChange).toHaveBeenCalledWith(6);
    });

    it('should decrement the value when pressing the ArrowDown key', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowDown}');
      expect(props.onChange).toHaveBeenCalledWith(4);
    });

    it('should increment the value by the step amount when pressing the PageUp key', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{PageUp}');
      expect(props.onChange).toHaveBeenCalledWith(8);
    });

    it('should decrement the value by the step amount when pressing the PageDown key', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{PageDown}');
      expect(props.onChange).toHaveBeenCalledWith(2);
    });

    it('should set the minimum value when pressing the Home key', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{Home}');
      expect(props.onChange).toHaveBeenCalledWith(1);
    });

    it('should set the maximum value when pressing the End key', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{End}');
      expect(props.onChange).toHaveBeenCalledWith(12);
    });

    it('should move focus to the previous segment when pressing the ArrowLeft key when the input is empty', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowLeft}');
      expect(props.focus.previous).toHaveBeenCalled();
    });

    it('should move focus to the previous segment when pressing the ArrowLeft key when the cursor is at the start of the input', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowLeft}{ArrowLeft}');
      expect(props.focus.previous).toHaveBeenCalled();
    });

    it('should move focus to the next segment when pressing the ArrowLeft key when the input is read-only', async () => {
      render(<DateSegment {...props} readOnly />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowLeft}');
      expect(props.focus.previous).toHaveBeenCalled();
    });

    it('should move focus to the next segment when pressing the ArrowRight key when the input is empty', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowRight}');
      expect(props.focus.next).toHaveBeenCalled();
    });

    it('should move focus to the next segment when pressing the ArrowRight key when the cursor is at the end of the input', async () => {
      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowLeft}{ArrowRight}{ArrowRight}');
      expect(props.focus.next).toHaveBeenCalled();
    });

    it('should move focus to the next segment when pressing the ArrowRight key when the input is read-only', async () => {
      render(<DateSegment {...props} readOnly />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{ArrowRight}');
      expect(props.focus.next).toHaveBeenCalled();
    });

    it('should move focus to the previous segment when pressing the Backspace key when the input is empty', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{Backspace}');
      expect(props.focus.previous).toHaveBeenCalled();
    });

    it('should move focus to the next segment when pressing the Delete key when the input is empty', async () => {
      render(<DateSegment {...props} value="" />);
      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '{Delete}');
      expect(props.focus.next).toHaveBeenCalled();
    });
  });

  describe('layout', () => {
    it('should adjust the width of the input to its content', async () => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValueOnce({
        width: 24,
      } as DOMRect);

      render(<DateSegment {...props} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveStyle('--width: 25px');
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<DateSegment {...props} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
