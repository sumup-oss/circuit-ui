import { render, userEvent, screen } from '../../../../util/test-utils.js';
import { describe, expect, it, vi } from 'vitest';
import { SecondaryItem } from './SecondaryItem.js';

const baseProps = {
  label: 'Item',
  href: '#',
  onClick: vi.fn(),
  onClose: vi.fn(),
};

describe('SecondaryItem', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render as link', () => {
    render(<SecondaryItem {...baseProps} href="#" />);
    expect(screen.getByRole('link', { name: 'Item' })).toBeVisible();
  });
  it('should render as active link', () => {
    render(<SecondaryItem {...baseProps} href="#" isActive />);
    expect(screen.getByRole('link', { name: 'Item' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('should render as an external link', () => {
    render(
      <SecondaryItem
        {...baseProps}
        href="https://sumup.com"
        externalLabel="Opens in a new tab"
        target="_blank"
      />,
    );
    expect(
      screen.getByRole('link', { name: 'ItemOpens in a new tab' }),
    ).toBeVisible();
  });

  it('should call onClick and onClose when clicked', async () => {
    render(<SecondaryItem {...baseProps} />);
    await userEvent.click(screen.getByRole('link', { name: 'Item' }));
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
  });
});
