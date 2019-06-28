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

import { LOADING_STATES } from './constants';

import * as utils from './utils';

describe('LoadingButton utils', () => {
  describe('isActive()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(utils.isActive(LOADING_STATES.DISABLED)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(utils.isActive(LOADING_STATES.ACTIVE)).toBeTruthy();
    });
  });

  describe('isDisabled()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(utils.isDisabled(LOADING_STATES.ACTIVE)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(utils.isDisabled(LOADING_STATES.DISABLED)).toBeTruthy();
    });
  });

  describe('isSuccess()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(utils.isSuccess(LOADING_STATES.DISABLED)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(utils.isSuccess(LOADING_STATES.SUCCESS)).toBeTruthy();
    });
  });

  describe('isError()', () => {
    describe('not equal', () => {
      it('should return false', () => {
        expect(utils.isError(LOADING_STATES.DISABLED)).toBeFalsy();
      });
    });

    it('should return true', () => {
      expect(utils.isError(LOADING_STATES.ERROR)).toBeTruthy();
    });
  });
});
