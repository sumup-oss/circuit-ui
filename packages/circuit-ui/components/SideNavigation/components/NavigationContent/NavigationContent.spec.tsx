import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';
import { describe, expect, it, vi } from 'vitest';

import { NavigationContent } from './NavigationContent.js';
import { Shop, ShopFilled } from '@sumup-oss/icons';

const baseProps = {
  groups: [
    {
      id: 'group1',
      label: 'Group 1',
      items: [
        {
          label: 'Item 1',
          href: '#',
          icon: Shop,
          activeIcon: ShopFilled,
        },
        {
          label: 'Item 2',
          href: '#',
          icon: Shop,
          activeIcon: ShopFilled,
        },
      ],
    },
    {
      id: 'group2',
      label: 'Group 2',
      items: [
        {
          label: 'Item 3',
          href: '#',
          icon: Shop,
          activeIcon: ShopFilled,
        },
        {
          label: 'Item 4',
          href: '#',
          icon: Shop,
          activeIcon: ShopFilled,
        },
      ],
    },
  ],
  onClose: vi.fn(),
};

describe('NavigationContent', () => {
  it('should render skip link', () => {
    render(
      <NavigationContent
        {...baseProps}
        skipNavigationHref="/main"
        skipNavigationLabel="skip navigation"
      />,
    );
    expect(
      screen.getByRole('link', { name: /skip navigation/i }),
    ).toBeInTheDocument();
  });

  it('should render logo', () => {
    render(<NavigationContent {...baseProps} logo={<p>Logo</p>} />);
    expect(screen.getByText('Logo')).toBeVisible();
  });

  it('should render navigation items', async () => {
    render(<NavigationContent {...baseProps} />);
    expect(
      screen.getByRole('navigation', { name: 'Group 1' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Item 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Item 2' })).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Group 2' }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole('link', { name: 'Item 1' }));
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NavigationContent {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
