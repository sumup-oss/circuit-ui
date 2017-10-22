import { createFormState } from './index';

describe('createFormState', () => {
  it('should accept initial values', () => {
    const form = createFormState(['name'], {
      values: {
        name: 'Jane'
      }
    });
    expect(form.values.name).toBeTruthy();
  });
});
