import { mergeNewValue, isChecked } from './service';

describe('Checkboxes', () => {
  describe('determining checked status', () => {
    it('should be checked if its value is in the list of form values', () => {
      const data = {
        values: {
          name: ['Helga', 'Harrold']
        }
      };
      const actual = isChecked({
        value: 'Helga',
        field: 'name',
        form: { data }
      });
      expect(actual).toBeTruthy();
    });
    it('should not be checked if its value is not in the list', () => {
      const data = {
        values: {
          name: ['Helga', 'Harrold']
        }
      };
      const actual = isChecked({ value: 'Dan', field: 'name', form: { data } });
      expect(actual).toBeFalsy();
    });
  });
  describe('merging new values', () => {
    it('should remove a value if it is already selected', () => {
      const current = ['a', 'b', 'c'];
      const actual = mergeNewValue(current, 'a');
      const expected = ['b', 'c'];
      expect(actual).toEqual(expected);
    });
    it('should go from one one value to two values correctly', () => {
      const current = ['a'];
      const actual = mergeNewValue(current, 'b');
      const expected = ['a', 'b'];
      expect(actual).toEqual(expected);
    });
    it('should go from one value to zero values correctly', () => {
      const current = ['a'];
      const actual = mergeNewValue(current, 'a');
      const expected = [];
      expect(actual).toEqual(expected);
    });
    it('should go from zero values to one value correctly', () => {
      const current = [];
      const actual = mergeNewValue(current, 'a');
      const expected = ['a'];
      expect(actual).toEqual(expected);
    });
  });
});
