import { isOptional, getInputClasses, setFormErrors } from './service';

describe('Forms service', () => {
  describe('isOptional', () => {
    it('should be optional when meta info says not required', () => {
      const meta = { required: false };
      const expected = true;
      const actual = isOptional({ meta });
      expect(actual).toEqual(expected);
    });
    it('should never style as optional if styleAsOptional is false', () => {
      const meta = { required: false };
      const expected = false;
      const actual = isOptional({ meta, styleAsOptional: false });
      expect(actual).toEqual(expected);
    });
  });

  describe('getInputClasses', () => {
    it('should always at least return the `input` classname', () => {
      const actual = getInputClasses();
      const expected = 'input';
      expect(actual).toContain(expected);
    });
    it('should have an optional class if field is not required', () => {
      const config = { optional: true };
      const actual = getInputClasses(config);
      const expected = 'input--optional';
      expect(actual).toContain(expected);
    });
  });

  describe('setFormErrors', () => {
    const field = 'foo';
    const error = 'bar';
    let formData = null;
    beforeEach(() => {
      formData = {
        errors: {
          foo: {}
        },
        warnings: []
      };
    });

    it('should set errors for a specified field', () => {
      const newForm = setFormErrors(field, { [error]: true }, formData);
      const actual = newForm.errors[field][error];
      expect(actual).toBe(true);
    });

    it('should set the property "valid" to false, if errors are found', () => {
      const newForm = setFormErrors(field, { [error]: true }, formData);
      const actual = newForm.valid;
      expect(actual).toBe(false);
    });

    it('should set the property "valid" to true, if errors are treated as warnings', () => {
      const newForm = setFormErrors(
        field,
        { [error]: true },
        { ...formData, warnings: { [field]: [error] } }
      );
      const actual = newForm.valid;
      expect(actual).toBe(true);
    });
  });
});
