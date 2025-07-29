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

import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { useRef, useState } from 'react';

import { render, userEvent, screen } from '../../util/test-utils.js';

import { useClickOutside } from './useClickOutside.js';

describe('useClickOutside', () => {
  beforeAll(() => {
    vi.spyOn(document, 'addEventListener');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function MockComponent({ onClickOutside = vi.fn(), isActive = true }) {
    const ref = useRef<HTMLButtonElement>(null);

    useClickOutside(ref, onClickOutside, isActive);

    return <button ref={ref}>Click outside</button>;
  }

  function MockComponents({ onClickOutside = vi.fn(), isActive = true }) {
    const button = useRef<HTMLButtonElement>(null);
    const list = useRef<HTMLUListElement>(null);

    useClickOutside([button, list], onClickOutside, isActive);

    return (
      <div>
        <button ref={button}>Click outside</button>
        <ul ref={list}>
          <li>Item</li>
        </ul>
      </div>
    );
  }

  it('should call the callback when clicking outside the element', async () => {
    const onClickOutside = vi.fn();
    render(<MockComponent onClickOutside={onClickOutside} />);
    await userEvent.click(document.body);

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('should call the callback when clicking outside the elements', async () => {
    const onClickOutside = vi.fn();
    render(<MockComponents onClickOutside={onClickOutside} />);
    await userEvent.click(document.body);

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when clicking (inside) the element', async () => {
    const onClickOutside = vi.fn();
    render(<MockComponent onClickOutside={onClickOutside} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not call the callback when clicking (inside) the elements', async () => {
    const onClickOutside = vi.fn();
    render(<MockComponents onClickOutside={onClickOutside} />);

    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('list'));

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not call the callback when clicking inside the element and the target element is removed', async () => {
    function MockRemoveComponent({
      onClickOutside = vi.fn(),
      isActive = true,
    }) {
      const ref = useRef<HTMLDivElement>(null);
      const [open, setOpen] = useState(true);

      useClickOutside(ref, onClickOutside, isActive);

      return (
        <div ref={ref}>
          {open && (
            <button onClick={() => setOpen(false)}>Click outside</button>
          )}
        </div>
      );
    }

    const onClickOutside = vi.fn();
    render(<MockRemoveComponent onClickOutside={onClickOutside} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not call the callback when the listener is inactive', async () => {
    const onClickOutside = vi.fn();
    render(<MockComponent onClickOutside={onClickOutside} isActive={false} />);

    await userEvent.click(document.body);

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not re-register the event listeners on re-render with unchanged args', () => {
    const onClickOutside = vi.fn();
    const { rerender } = render(
      <MockComponents onClickOutside={onClickOutside} isActive />,
    );

    rerender(<MockComponents onClickOutside={onClickOutside} isActive />);

    // `mousedown` and `click`
    expect(document.addEventListener).toHaveBeenCalledTimes(2);
  });
});
