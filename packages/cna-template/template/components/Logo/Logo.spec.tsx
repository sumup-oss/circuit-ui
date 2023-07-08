import { render, axe } from '../../test-utils';

import { Logo } from './Logo';

describe('Logo', () => {
  it.todo('should link to the SumUp website');

  // An automatic accessibility test only covers basic best practices.
  // You will still need to test manually to ensure full accessibility.
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Logo />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
