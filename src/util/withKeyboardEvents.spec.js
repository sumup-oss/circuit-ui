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

import { createOnKeyDown } from './withKeyboardEvents';

describe('withKeyboardEvents', () => {
  describe('createOnKeyDown', () => {
    it('should return a keyDown handler', () => {
      const onClick = jest.fn();
      const onKeyDown = createOnKeyDown(onClick);

      expect(typeof onKeyDown).toBe('function');
      expect(onKeyDown).toHaveLength(1);
    });

    it('should call the onClick function if the enter key is pressed', () => {
      const onClick = jest.fn();
      const event = { keyCode: 13 };
      const onKeyDown = createOnKeyDown(onClick);

      onKeyDown(event);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(event);
    });

    it('should call the onClick function if the spacebar is pressed', () => {
      const onClick = jest.fn();
      const event = { keyCode: 32 };
      const onKeyDown = createOnKeyDown(onClick);

      onKeyDown(event);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(event);
    });
  });
});
