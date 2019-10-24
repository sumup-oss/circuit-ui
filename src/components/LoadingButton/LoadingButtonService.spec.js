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

import { DISABLED, ACTIVE, SUCCESS, ERROR } from './constants';

import * as Service from './LoadingButtonService';

describe('LoadingButtonService', () => {
  describe('isActive()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(Service.isActive(DISABLED)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(Service.isActive(ACTIVE)).toBeTruthy();
    });
  });

  describe('isDisabled()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(Service.isDisabled(ACTIVE)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(Service.isDisabled(DISABLED)).toBeTruthy();
    });
  });

  describe('isSuccess()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(Service.isSuccess(DISABLED)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(Service.isSuccess(SUCCESS)).toBeTruthy();
    });
  });

  describe('isError()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(Service.isError(DISABLED)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(Service.isError(ERROR)).toBeTruthy();
    });
  });
});
