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
