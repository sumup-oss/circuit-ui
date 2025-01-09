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

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { render, screen, axe } from '../../util/test-utils.js';

import { Modal } from './Modal.js';

vi.mock('../../hooks/useMedia/useMedia.js');

describe('Modal', () => {
  const props = {
    onClose: vi.fn(),
    open: false,
    closeButtonLabel: 'Close',
    children: 'Modal dialog content',
  };

  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  });

  let originalHTMLDialogElement: typeof window.HTMLDialogElement;

  beforeEach(() => {
    originalHTMLDialogElement = window.HTMLDialogElement;
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
    Object.defineProperty(window, 'HTMLDialogElement', {
      writable: true,
      value: originalHTMLDialogElement,
    });
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Modal {...props} ref={ref} />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(ref.current).toBe(dialog);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Modal {...props} className={className} />);
    // eslint-disable-next-line testing-library/no-container
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog?.className).toContain(className);
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Modal {...props} open />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
