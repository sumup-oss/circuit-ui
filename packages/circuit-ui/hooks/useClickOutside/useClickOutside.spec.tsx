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

import { useRef, useState } from 'react';

import { render, userEvent } from '../../util/test-utils';

import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  function MockComponent({ onClickOutside, isActive = true }) {
    const ref = useRef<HTMLButtonElement>(null);

    useClickOutside(ref, onClickOutside, isActive);

    return <button ref={ref}>Click outside</button>;
  }

  it('should call the callback when clicking outside the element', () => {
    const onClickOutside = jest.fn();
    render(<MockComponent onClickOutside={onClickOutside} />);
    userEvent.click(document.body);

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when clicking (inside) the element', () => {
    const onClickOutside = jest.fn();
    const { getByRole } = render(
      <MockComponent onClickOutside={onClickOutside} />,
    );

    userEvent.click(getByRole('button'));

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not call the callback when clicking inside the element and the target element is removed', () => {
    function MockRemoveComponent({ onClickOutside, isActive = true }) {
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

    const onClickOutside = jest.fn();
    const { getByRole } = render(
      <MockRemoveComponent onClickOutside={onClickOutside} />,
    );

    userEvent.click(getByRole('button'));

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not call the callback when the listener is inactive', () => {
    const onClickOutside = jest.fn();
    render(<MockComponent onClickOutside={onClickOutside} isActive={false} />);

    userEvent.click(document.body);

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
