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

import { handleKeyDown, handleCarretPosition } from './RestrictedInputService';

describe('RestrictedInputService', () => {
  const baseEvent = {
    preventDefault: jest.fn(),
    target: {
      setSelectionRange: jest.fn()
    }
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('filtering key events', () => {
    it('should register the custom handler when passed an empty set of keys', () => {
      const onKeyDownMock = jest.fn();
      const userWhitelistedKeys = [];
      const keyEvent = { ...baseEvent, key: 'c' };
      handleKeyDown(onKeyDownMock, userWhitelistedKeys)(keyEvent);
      expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    });

    it('should register whitelisted keys', () => {
      const onKeyDownMock = jest.fn();
      const userWhitelistedKeys = ['e'];
      const keyEvent = { ...baseEvent, key: 'e' };
      handleKeyDown(onKeyDownMock, userWhitelistedKeys)(keyEvent);
      expect(keyEvent.preventDefault).not.toHaveBeenCalled();
      expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    });

    it('should not register disallowed keys', () => {
      const onKeyDownMock = jest.fn();
      const userWhitelistedKeys = ['e'];
      const keyEvent = { ...baseEvent, key: 'f' };
      handleKeyDown(onKeyDownMock, userWhitelistedKeys)(keyEvent);
      expect(keyEvent.preventDefault).toHaveBeenCalled();
      expect(onKeyDownMock).not.toHaveBeenCalled();
    });

    it('should register keys from the default whitelist', () => {
      const onKeyDownMock = jest.fn();
      const userWhitelistedKeys = ['1'];
      const handler = handleKeyDown(onKeyDownMock, userWhitelistedKeys);
      const defaultKeys = [
        'Tab',
        'Return',
        'Delete',
        'Backspace',
        'Meta',
        'Control',
        'Alt',
        'F5',
        'Unidentified'
      ];

      defaultKeys.forEach((key, index) => {
        const keyEvent = { ...baseEvent, key };
        handler(keyEvent);
        expect(keyEvent.preventDefault).not.toHaveBeenCalled();
        expect(onKeyDownMock).toHaveBeenCalledTimes(index + 1);
      });
    });

    it("should register keys when the event's `key` property is undefined", () => {
      const onKeyDownMock = jest.fn();
      const userWhitelistedKeys = ['1'];
      const handler = handleKeyDown(onKeyDownMock, userWhitelistedKeys);
      const keyEvent = { ...baseEvent, key: undefined };

      handler(keyEvent);
      expect(keyEvent.preventDefault).not.toHaveBeenCalled();
      expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('fixing carret position', () => {
    it('should stick the carret to the right', () => {
      const handler = handleCarretPosition(() => {}, false);
      const event = {
        ...baseEvent,
        target: {
          ...baseEvent.target,
          value: 'foobar'
        }
      };
      const expectedArgs = [
        event.target.value.length,
        event.target.value.length
      ];
      handler(event);
      expect(event.target.setSelectionRange).toHaveBeenLastCalledWith(
        ...expectedArgs
      );
    });

    it('should stick the carret to the left', () => {
      const handler = handleCarretPosition(() => {}, true);
      const event = {
        ...baseEvent,
        target: {
          ...baseEvent.target,
          value: 'foobar'
        }
      };
      const expectedArgs = [0, 0];
      handler(event);
      expect(event.target.setSelectionRange).toHaveBeenLastCalledWith(
        ...expectedArgs
      );
    });

    it('should call the outer handler', () => {
      const outerHandler = jest.fn();
      const handler = handleCarretPosition(outerHandler, true);
      const event = {
        ...baseEvent,
        target: {
          ...baseEvent.target,
          value: 'foobar'
        }
      };
      handler(event);
      expect(outerHandler).toHaveBeenCalled();
    });
  });
});
