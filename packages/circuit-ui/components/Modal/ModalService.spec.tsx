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

import { renderHook, act } from '../../util/test-utils.js';

import { getKeyboardFocusableElements, useScrollLock } from './ModalService.js';

describe('DialogService', () => {
  describe('getKeyboardFocusableElements', () => {
    it('should return empty array if element is empty', () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const result = getKeyboardFocusableElements(document.body);
      expect(result).toEqual([]);
    });

    it('should not return an a tag without href', () => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      const result = getKeyboardFocusableElements(document.body);
      expect(result).toEqual([]);
    });

    it('should not return a disabled element', () => {
      const input = document.createElement('input');
      input.setAttribute('disabled', 'true');
      document.body.appendChild(input);
      const result = getKeyboardFocusableElements(document.body);
      expect(result).toEqual([]);
    });

    it('should not return an element with aria-hidden', () => {
      const input = document.createElement('input');
      input.setAttribute('aria-hidden', 'true');
      document.body.appendChild(input);
      const result = getKeyboardFocusableElements(document.body);
      expect(result).toEqual([]);
    });

    it('should return an array of focusable elements', () => {
      const container = document.createElement('div');
      container.setAttribute('tabindex', '0');
      const button = document.createElement('button');
      const input = document.createElement('input');
      const a = document.createElement('a');
      a.setAttribute('href', 'showSignature(xyz)');
      const textarea = document.createElement('textarea');
      const select = document.createElement('select');
      const details = document.createElement('details');

      document.body.append(
        container,
        button,
        input,
        a,
        textarea,
        select,
        details,
      );

      const result = getKeyboardFocusableElements(document.body);
      expect(result).toEqual(
        expect.arrayContaining([
          button,
          input,
          a,
          textarea,
          select,
          details,
          container,
        ]),
      );
    });
  });
  describe('useScrollLock', () => {
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    });

    Object.defineProperty(window, 'scrollY', { value: 1, writable: true });

    beforeEach(() => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.documentElement.style.setProperty('--scroll-y', '');
    });

    it('locks the scroll when `isLocked` is true', () => {
      document.documentElement.style.setProperty('--scroll-y', '100px');

      const { rerender } = renderHook(
        ({ isLocked }) => useScrollLock(isLocked),
        {
          initialProps: { isLocked: false },
        },
      );

      rerender({ isLocked: true });

      expect(document.body.style.position).toBe('fixed');
      expect(document.body.style.top).toBe('-100px');
    });

    it('unlocks the scroll when `isLocked` is false', () => {
      document.body.style.top = '-100px';

      const { rerender } = renderHook(
        ({ isLocked }) => useScrollLock(isLocked),
        {
          initialProps: { isLocked: true },
        },
      );

      rerender({ isLocked: false });

      expect(document.body.style.position).toBe('');
      expect(document.body.style.top).toBe('');
      expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
    });

    it('updates `--scroll-y` on scroll', () => {
      global.requestAnimationFrame = vi
        .fn()
        .mockImplementation((callback: () => void) => callback());

      renderHook(() => useScrollLock(false));

      act(() => {
        window.scrollY = 200;
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      });

      expect(
        document.documentElement.style.getPropertyValue('--scroll-y'),
      ).toBe('200px');
    });
  });
});
