import { render, axe, screen } from '../../test-utils';

import { DocCard } from './DocCard';

describe('DocCard', () => {
  const baseProps = {
    title: 'Title',
    description: 'This is a description',
    href: 'https://example.com',
  };

  // An automatic accessibility test only covers basic best practices.
  // You will still need to test manually to ensure full accessibility.
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<DocCard {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('should have a link description', () => {
    render(<DocCard {...baseProps} />);
    const linkEl = screen.getByRole('link');
    expect(linkEl).toHaveAccessibleName(baseProps.title);
    expect(linkEl).toHaveAccessibleDescription(baseProps.description);
  });
});
