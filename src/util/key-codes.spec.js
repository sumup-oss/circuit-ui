import { isEnter, isSpacebar } from './key-codes';

describe('key codes', () => {
  describe('isEnter', () => {
    it('should return true if the enter key was pressed', () => {
      const event = { keyCode: 13, key: 'Enter', code: 'Enter' };
      const actual = isEnter(event);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const event = { keyCode: 32, key: ' ', code: 'Space' };
      const actual = isEnter(event);
      expect(actual).toBeFalsy();
    });
  });

  describe('isSpacebar', () => {
    it('should return true if the spacebar was pressed', () => {
      const event = { keyCode: 32, key: ' ', code: 'Space' };
      const actual = isSpacebar(event);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const event = { keyCode: 13, key: 'Enter', code: 'Enter' };
      const actual = isSpacebar(event);
      expect(actual).toBeFalsy();
    });
  });
});
