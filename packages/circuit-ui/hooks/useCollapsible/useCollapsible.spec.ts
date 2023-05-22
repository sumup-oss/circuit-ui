/**
 * Copyright 2021, SumUp Ltd.
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
import { MouseEvent } from 'react';

import { renderHook, act, waitFor } from '../../util/test-utils.js';

import { useCollapsible, getHeight } from './useCollapsible.js';

describe('useCollapsible', () => {
  it('should return the open state and a toggle callback', () => {
    const { result } = renderHook(() => useCollapsible());
    const { isOpen, toggleOpen } = result.current;

    expect(isOpen).toBeFalsy();
    expect(typeof toggleOpen).toBe('function');
  });

  it('should accept an initial state', () => {
    const initialOpen = true;
    const { result } = renderHook(() => useCollapsible({ initialOpen }));
    const { isOpen } = result.current;

    expect(isOpen).toBeTruthy();
  });

  it('should accept a custom id', () => {
    const id = 'foo';
    const { result } = renderHook(() => useCollapsible({ id }));
    const { getButtonProps, getContentProps } = result.current;

    const buttonProps = getButtonProps();
    const contentProps = getContentProps();

    expect(buttonProps['aria-controls']).toBe(id);
    expect(contentProps.id).toBe(id);
  });

  it('should call a custom onClick prop on the button element', () => {
    const customProps = { onClick: vi.fn() };
    const event = { fizz: 'buzz' } as unknown as MouseEvent;
    const { result } = renderHook(() => useCollapsible());
    const { getButtonProps } = result.current;

    const actual = getButtonProps(customProps);

    act(() => {
      actual.onClick(event);
    });

    expect(customProps.onClick).toHaveBeenCalledTimes(1);
    expect(customProps.onClick).toHaveBeenCalledWith(event);
  });

  it('should add custom styles to the content element', () => {
    const customProps = { style: { color: 'red' } };
    const { result } = renderHook(() => useCollapsible());
    const { getContentProps } = result.current;

    const actual = getContentProps(customProps);
    const expected = expect.objectContaining({
      style: expect.objectContaining({ color: 'red' }),
    });

    expect(actual).toEqual(expected);
  });

  describe('when closed', () => {
    const initialOpen = false;

    it('should return a getter for the button props', () => {
      const { result } = renderHook(() => useCollapsible({ initialOpen }));
      const { getButtonProps } = result.current;

      const actual = getButtonProps();
      const expected = expect.objectContaining({
        'onClick': expect.any(Function),
        'aria-controls': expect.any(String),
        'aria-expanded': 'false',
      });

      expect(actual).toEqual(expected);
    });

    it('should return a getter for the content props', () => {
      const { result } = renderHook(() => useCollapsible({ initialOpen }));
      const { getContentProps } = result.current;

      const actual = getContentProps();
      const expected = expect.objectContaining({
        'ref': { current: null },
        'id': expect.any(String),
        'style': {
          overflowY: 'hidden',
          willChange: 'height',
          opacity: 0,
          height: 0,
          transition: 'all 200ms ease-in-out',
          visibility: 'hidden',
        },
        'aria-hidden': 'true',
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('when open', () => {
    const initialOpen = true;

    it('should return a getter for the button props', () => {
      const { result } = renderHook(() => useCollapsible({ initialOpen }));
      const { getButtonProps } = result.current;

      const actual = getButtonProps();
      const expected = expect.objectContaining({
        'onClick': expect.any(Function),
        'aria-controls': expect.any(String),
        'aria-expanded': 'true',
      });

      expect(actual).toEqual(expected);
    });

    it('should return a getter for the content props', () => {
      const { result } = renderHook(() => useCollapsible({ initialOpen }));
      const { getContentProps } = result.current;

      const actual = getContentProps();
      const expected = expect.objectContaining({
        'ref': { current: null },
        'id': expect.any(String),
        'style': {
          overflowY: 'visible',
          willChange: 'height',
          opacity: 1,
          height: 'auto',
          transition: 'all 200ms ease-in-out',
          visibility: 'visible',
        },
        'aria-hidden': undefined,
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('toggling', () => {
    it('should toggle the open state when the button is clicked', async () => {
      const event = { fizz: 'buzz' } as unknown as MouseEvent;
      const { result } = renderHook(() => useCollapsible());
      const { getButtonProps } = result.current;

      expect(result.current.isOpen).toBeFalsy();

      act(() => {
        getButtonProps().onClick(event);
      });

      await waitFor(() => {
        expect(result.current.isOpen).toBeTruthy();
      });
    });

    it('should toggle the open state when the callback is called', async () => {
      const { result } = renderHook(() => useCollapsible());

      expect(result.current.isOpen).toBeFalsy();

      act(() => {
        result.current.toggleOpen();
      });

      await waitFor(() => {
        expect(result.current.isOpen).toBeTruthy();
      });
    });
  });

  describe('getHeight', () => {
    it('should return "auto" when the element is falsy', () => {
      const element = { current: null };
      const actual = getHeight(element);
      const expected = 'auto';
      expect(actual).toBe(expected);
    });

    it('should return "auto" when the current element is falsy', () => {
      const element = { current: null };
      const actual = getHeight(element);
      const expected = 'auto';
      expect(actual).toBe(expected);
    });

    it('should return the scroll height in pixels for the element', () => {
      const element = { scrollHeight: 20 } as HTMLElement;
      const ref = { current: element };
      const actual = getHeight(ref);
      const expected = '20px';
      expect(actual).toBe(expected);
    });
  });
});
