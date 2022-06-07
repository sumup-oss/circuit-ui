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

import { createRef } from 'react';

import {
  create,
  render,
  renderToHtml,
  axe,
  userEvent,
  fireEvent,
  waitFor,
} from '../../util/test-utils';
import { InputElement } from '../Input';

import CopyInput from '.';

describe('CopyInput', () => {
  const baseProps = {
    label: 'API token',
    copyButtonLabel: 'Copy',
    value: 'copy-me',
    // eslint-disable-next-line no-console
    onError: console.error,
  };

  beforeAll(() => {
    // @ts-expect-error Can be overridden in JS DOM
    navigator.clipboard = { writeText: jest.fn() };
  });

  it('should render with default styles', () => {
    const actual = create(<CopyInput {...baseProps} />);
    expect(actual).toMatchSnapshot();
  });

  // Unfortunately, this test doesn't work. I suspect that the `document.getSelection()` API isn't properly supported in JS DOM.
  it.skip('should highlight the value on focus', () => {
    const { getByRole } = render(<CopyInput {...baseProps} />);

    userEvent.click(getByRole('textbox'));

    expect(document.getSelection()?.toString()).toBe(baseProps.value);
  });

  describe('when pressing the copy button', () => {
    it('should copy the value to the clipboard', () => {
      const { getByRole } = render(<CopyInput {...baseProps} />);

      fireEvent.click(getByRole('button', { name: baseProps.copyButtonLabel }));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        baseProps.value,
      );
    });

    it('should copy the value to the clipboard if the Clipboard API is not supported', () => {
      // @ts-expect-error Can be overridden in JS DOM
      navigator.clipboard = undefined;
      document.execCommand = jest.fn();

      const { getByRole } = render(<CopyInput {...baseProps} />);

      fireEvent.click(getByRole('button', { name: baseProps.copyButtonLabel }));

      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('should call the onSuccess callback', () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { getByRole } = render(
        <CopyInput {...baseProps} onSuccess={onSuccess} onError={onError} />,
      );

      fireEvent.click(getByRole('button', { name: baseProps.copyButtonLabel }));

      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it('should call the onError callback when copying fails', async () => {
      // @ts-expect-error Can be overridden in JS DOM
      navigator.clipboard = {
        writeText: jest.fn().mockRejectedValueOnce('Error'),
      };

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { getByRole } = render(
        <CopyInput {...baseProps} onSuccess={onSuccess} onError={onError} />,
      );

      fireEvent.click(getByRole('button', { name: baseProps.copyButtonLabel }));

      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
      });
    });
  });

  describe('when copying the value', () => {
    it('should call the onSuccess callback', () => {
      const onSuccess = jest.fn();

      const { getByRole } = render(
        <CopyInput {...baseProps} onSuccess={onSuccess} />,
      );

      fireEvent.click(getByRole('textbox'));
      fireEvent.copy(getByRole('textbox'));

      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should accept a working ref', () => {
    const tref = createRef<InputElement>();
    const { container } = render(<CopyInput {...baseProps} ref={tref} />);
    const input = container.querySelector('input');
    expect(tref.current).toBe(input);
  });

  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CopyInput {...baseProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
