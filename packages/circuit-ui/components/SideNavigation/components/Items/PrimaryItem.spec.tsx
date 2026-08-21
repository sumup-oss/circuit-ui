import {
  render,
  userEvent,
  waitFor,
  screen,
} from '../../../../util/test-utils.js';
import { describe, expect, it, vi } from 'vitest';
import { PrimaryItem } from './PrimaryItem.js';
import { Favourite } from '@sumup-oss/icons';

const baseProps = {
  icon: () => <Favourite data-testid="icon" />,
  activeIcon: () => <Favourite data-testid="active-icon" />,
  label: 'Item',
  href: '#',
  onClose: vi.fn(),
  onClick: vi.fn(),
};

const baseExpandableProps = {
  icon: () => <Favourite data-testid="icon" />,
  activeIcon: () => <Favourite data-testid="active-icon" />,
  label: 'Item',
  secondaryItems: [{ label: 'Secondary', href: '#' }],
  onClick: vi.fn(),
  onClose: vi.fn(),
};

describe('PrimaryItem', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render as Link', () => {
    render(<PrimaryItem {...baseProps} />);
    expect(screen.getByRole('link', { name: 'Item' })).toBeVisible();
  });
  it('should render as button', () => {
    render(
      <PrimaryItem
        {...baseProps}
        href={undefined}
        secondaryItems={[]}
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Item' })).toBeVisible();
  });
  it('should render as an external link', () => {
    render(
      <PrimaryItem
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
  it('should call onClose and onClick when clicked', async () => {
    render(<PrimaryItem {...baseProps} />);
    await userEvent.click(screen.getByRole('link', { name: 'Item' }));
    expect(baseProps.onClose).toHaveBeenCalledTimes(1);
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });
  it('should not call onClose when clicked if it has secondary items', async () => {
    render(<PrimaryItem {...baseExpandableProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Item' }));
    expect(baseExpandableProps.onClose).not.toHaveBeenCalled();
  });
  it('should render as primary element with secondary items', async () => {
    render(<PrimaryItem {...baseExpandableProps} />);
    const item = screen.getByRole('button', { name: 'Item' });
    expect(item).toBeVisible();
    expect(item).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(item);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Secondary' })).toBeVisible();
    });
    expect(item).toHaveAttribute('aria-expanded', 'true');
  });
  it('should render as active primary element with secondary items', () => {
    render(<PrimaryItem {...baseExpandableProps} onClick={vi.fn()} isActive />);
    expect(screen.getByRole('button', { name: 'Item' })).toBeVisible();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-icon')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Item' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
