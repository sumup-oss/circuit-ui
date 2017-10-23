import { createFormState } from './index';

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
