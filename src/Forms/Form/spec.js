import { onChangeForm, createFormState } from './index';

describe('createFormState', () => {
  it('should accept initial values', () => {
    const form = createFormState(['name', 'fruit'], {
      values: {
        name: 'Jane',
        fruit: 'Pears'
      }
    });
    expect(form.values.name).toBeTruthy();
    expect(form.values.fruit).toBeTruthy();
  });
});

describe('Merging form values', () => {
  it('should correctly go from zero to single element', () => {
    const form = {
      values: {
        fruits: []
      }
    };
    const nextForm = {
      values: {
        fruits: ['a']
      }
    };
    const actual = onChangeForm(form, nextForm);
    const expected = nextForm;
    expect(actual).toEqual(expected);
  });
  it('should correctly pick new arrays', () => {
    const form = {
      values: {
        fruits: ['Apples', 'Oranges']
      }
    };
    const nextForm = {
      values: {
        fruits: ['Apples']
      }
    };
    const actual = onChangeForm(form, nextForm);
    const expected = nextForm;
    expect(actual).toEqual(expected);
  });
  it('should correctly merge objects', () => {
    const ERRORS = {
      required: false,
      pattern: true
    };

    const form = {
      errors: {
        name: {},
        color: ERRORS
      }
    };

    const nextForm = {
      errors: {
        name: ERRORS,
        color: {}
      }
    };

    const expected = {
      errors: {
        name: ERRORS,
        color: ERRORS
      }
    };

    const actual = onChangeForm(form, nextForm);
    expect(actual).toEqual(expected);
  });
});
