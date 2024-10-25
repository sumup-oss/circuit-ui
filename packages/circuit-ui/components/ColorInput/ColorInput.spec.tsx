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

import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import {
  render,
  axe,
  screen,
  fireEvent,
  userEvent,
} from '../../util/test-utils';
import type { InputElement } from '../Input/index';

import { ColorInput } from './ColorInput';

describe('ColorInput', () => {
  const baseProps = { label: 'Car color', pickerLabel: 'Pick car color' };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <ColorInput {...baseProps} inputClassName={className} />,
    );
    const input = container.querySelector('input[type="text"]');
    expect(input?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<InputElement>();
    const { container } = render(<ColorInput {...baseProps} ref={ref} />);
    const input = container.querySelector("input[type='color']");
    expect(ref.current).toBe(input);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ColorInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <ColorInput {...baseProps} aria-describedby={customDescriptionId} />
        </>,
      );
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        customDescription,
      );
    });
  });

  it('should set value and default value on both inputs', () => {
    const { container } = render(
      <ColorInput {...baseProps} defaultValue="#ff11bb" />,
    );
    const colorPicker = container.querySelector(
      "input[type='color']",
    ) as HTMLInputElement;
    const colorInput = container.querySelector(
      "input[type='text']",
    ) as HTMLInputElement;
    expect(colorPicker.value).toBe('#ff11bb');
    expect(colorInput.value).toBe('ff11bb');
  });

  describe('Synchronization', () => {
    it('should update text input if color input changes', async () => {
      const { container } = render(<ColorInput {...baseProps} />);
      const colorPicker = container.querySelector(
        "input[type='color']",
      ) as HTMLInputElement;
      const newValue = '#00ff00';

      fireEvent.input(colorPicker, { target: { value: newValue } });

      const colorInput = container.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;
      expect(colorInput.value).toBe(newValue.replace('#', ''));
    });

    it('should update color input if text input changes', async () => {
      const { container } = render(<ColorInput {...baseProps} />);
      const colorInput = container.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;
      const newValue = '00ff00';

      await userEvent.type(colorInput, newValue);

      const colorPicker = container.querySelector(
        "input[type='color']",
      ) as HTMLInputElement;
      expect(colorPicker.value).toBe(`#${newValue}`);
    });
  });

  describe('OnChange events', () => {
    it('should trigger onChange event when color picker changes', async () => {
      const onChange = vi.fn();
      const { container } = render(
        <ColorInput {...baseProps} onChange={onChange} />,
      );

      const colorPicker = container.querySelector(
        "input[type='color']",
      ) as HTMLInputElement;

      fireEvent.input(colorPicker, { target: { value: '#00ff00' } });

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should trigger onChange event when color hex input changes', async () => {
      const onChange = vi.fn();
      const { container } = render(
        <ColorInput {...baseProps} onChange={onChange} />,
      );

      const colorInput = container.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;

      await userEvent.type(colorInput, '00ff00');

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Paste', () => {
    it('should handle paste events', async () => {
      const { container } = render(<ColorInput {...baseProps} />);
      const colorInput = container.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;

      await userEvent.click(colorInput);
      await userEvent.paste('#00ff00');

      const colorPicker = container.querySelector(
        "input[type='color']",
      ) as HTMLInputElement;
      expect(colorPicker.value).toBe('#00ff00');
      expect(colorInput.value).toBe('00ff00');
    });

    it('should ignore invalid paste event', async () => {
      const { container } = render(<ColorInput {...baseProps} />);
      const colorInput = container.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;

      await userEvent.click(colorInput);
      await userEvent.paste('obviously invalid');

      const colorPicker = container.querySelector(
        "input[type='color']",
      ) as HTMLInputElement;
      expect(colorPicker.value).toBe('#000000');
      expect(colorInput.value).toBe('');
    });

    it("should allow pasting color without '#'", async () => {
      const { container } = render(<ColorInput {...baseProps} />);
      const colorInput = container.querySelector(
        "input[type='text']",
      ) as HTMLInputElement;

      await userEvent.click(colorInput);
      await userEvent.paste('00ff00');

      const colorPicker = container.querySelector(
        "input[type='color']",
      ) as HTMLInputElement;
      expect(colorPicker.value).toBe('#00ff00');
      expect(colorInput.value).toBe('00ff00');
    });
  });
});
