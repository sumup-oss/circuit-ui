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
} from '../../util/test-utils.js';

import { ColorInput } from './ColorInput.js';

describe('ColorInput', () => {
  const baseProps = { label: 'Car color' };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<ColorInput {...baseProps} inputClassName={className} />);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, textInput] = screen.getAllByLabelText(baseProps.label);
    expect(textInput?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<ColorInput {...baseProps} ref={ref} />);
    const [input] = screen.getAllByLabelText(baseProps.label);
    expect(ref.current).toBe(input);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ColorInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('semantics', () => {
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
    it('should render as disabled', async () => {
      render(<ColorInput {...baseProps} disabled />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      expect(colorInput).toBeDisabled();
      expect(textInput).toBeDisabled();
    });
    it('should render as read-only', async () => {
      render(<ColorInput {...baseProps} readOnly />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);
      expect(colorInput).toBeDisabled();
      expect(textInput).toHaveAttribute('readonly');
    });

    it('should render as required', async () => {
      render(<ColorInput {...baseProps} required />);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, textInput] = screen.getAllByLabelText(baseProps.label);
      expect(textInput).toBeRequired(); // text input
    });
  });

  describe('state', () => {
    it('should display a default value on both inputs', () => {
      render(<ColorInput {...baseProps} defaultValue="#ff11bb" />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      expect(colorInput).toHaveValue('#ff11bb');
      expect(textInput).toHaveValue('ff11bb');
    });

    it('should display an initial value', () => {
      render(<ColorInput {...baseProps} value="#ff11bb" />);

      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      expect(colorInput).toHaveValue('#ff11bb');
      expect(textInput).toHaveValue('ff11bb');
    });

    it('should ignore an invalid value', () => {
      render(<ColorInput {...baseProps} value="#ffg" />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      expect(colorInput).toHaveValue('#000000');
      expect(textInput).toHaveValue('ffg');
    });
  });

  describe('user interactions', () => {
    const newValue = '00ff00';

    it('should update text input if color input changes', async () => {
      const onChange = vi.fn();
      render(<ColorInput {...baseProps} onChange={onChange} />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      fireEvent.input(colorInput, { target: { value: `#${newValue}` } });

      expect(textInput).toHaveValue(newValue.replace('#', ''));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: `#${newValue}`,
          }),
        }),
      );
    });

    it('should update color input if text input changes', async () => {
      const onChange = vi.fn();
      render(<ColorInput {...baseProps} onChange={onChange} />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      await userEvent.type(textInput, newValue);

      expect(colorInput).toHaveValue(`#${newValue}`);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: `#${newValue}`,
          }),
        }),
      );
    });

    it('should handle paste events', async () => {
      const onChange = vi.fn();
      render(<ColorInput {...baseProps} onChange={onChange} />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      await userEvent.click(textInput);
      await userEvent.paste(`#${newValue}`);

      expect(colorInput).toHaveValue(`#${newValue}`);
      expect(textInput).toHaveValue(newValue);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: `#${newValue}`,
          }),
        }),
      );
    });

    it('should ignore invalid paste event', async () => {
      const onChange = vi.fn();
      render(<ColorInput {...baseProps} onChange={onChange} />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      await userEvent.click(textInput);
      await userEvent.paste('obviously invalid');

      expect(colorInput).toHaveValue('#000000');
      expect(textInput).toHaveValue('obviou');
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should allow pasting color without '#'", async () => {
      const onChange = vi.fn();
      render(<ColorInput {...baseProps} onChange={onChange} />);
      const [colorInput, textInput] = screen.getAllByLabelText(baseProps.label);

      await userEvent.click(textInput);
      await userEvent.paste(newValue);

      expect(colorInput).toHaveValue(`#${newValue}`);
      expect(textInput).toHaveValue(newValue);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: `#${newValue}`,
          }),
        }),
      );
    });
  });
});
