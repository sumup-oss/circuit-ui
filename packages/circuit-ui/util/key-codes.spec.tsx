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

import { describe, expect, it } from 'vitest';

import {
  isArrowDown,
  isArrowLeft,
  isArrowRight,
  isArrowUp,
  isEnter,
  isEscape,
  isSpacebar,
} from './key-codes';

describe('key codes', () => {
  const events = {
    enter: new KeyboardEvent('keydown', {
      keyCode: 13,
      key: 'Enter',
      code: 'Enter',
    }),
    escape: new KeyboardEvent('keydown', {
      keyCode: 27,
      key: 'Escape',
      code: 'ArrowDown',
    }),
    space: new KeyboardEvent('keydown', {
      keyCode: 32,
      key: ' ',
      code: 'Space',
    }),
    arrowLeft: new KeyboardEvent('keydown', {
      keyCode: 37,
      key: 'ArrowLeft',
      code: 'ArrowLeft',
    }),
    arrowUp: new KeyboardEvent('keydown', {
      keyCode: 38,
      key: 'ArrowUp',
      code: 'ArrowUp',
    }),
    arrowRight: new KeyboardEvent('keydown', {
      keyCode: 39,
      key: 'ArrowRight',
      code: 'ArrowRight',
    }),
    arrowDown: new KeyboardEvent('keydown', {
      keyCode: 40,
      key: 'ArrowDown',
      code: 'ArrowDown',
    }),
  };

  describe('isEnter', () => {
    it('should return true if the enter key was pressed', () => {
      const actual = isEnter(events.enter);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isEnter(events.space);
      expect(actual).toBeFalsy();
    });
  });

  describe('isEscape', () => {
    it('should return true if the escape key was pressed', () => {
      const actual = isEscape(events.escape);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isEscape(events.enter);
      expect(actual).toBeFalsy();
    });
  });

  describe('isSpacebar', () => {
    it('should return true if the spacebar was pressed', () => {
      const actual = isSpacebar(events.space);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isSpacebar(events.enter);
      expect(actual).toBeFalsy();
    });
  });

  describe('isArrowLeft', () => {
    it('should return true if the arrow left key was pressed', () => {
      const actual = isArrowLeft(events.arrowLeft);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isArrowLeft(events.enter);
      expect(actual).toBeFalsy();
    });
  });

  describe('isArrowUp', () => {
    it('should return true if the arrow up key was pressed', () => {
      const actual = isArrowUp(events.arrowUp);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isArrowUp(events.enter);
      expect(actual).toBeFalsy();
    });
  });

  describe('isArrowRight', () => {
    it('should return true if the arrow right key was pressed', () => {
      const actual = isArrowRight(events.arrowRight);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isArrowRight(events.enter);
      expect(actual).toBeFalsy();
    });
  });

  describe('isArrowDown', () => {
    it('should return true if the arrow down key was pressed', () => {
      const actual = isArrowDown(events.arrowDown);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const actual = isArrowDown(events.enter);
      expect(actual).toBeFalsy();
    });
  });
});
