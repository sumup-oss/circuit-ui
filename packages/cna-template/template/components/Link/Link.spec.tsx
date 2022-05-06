import { render, screen, axe } from '../../test-utils';

import { Link, LinkProps } from './Link';

describe('Link', () => {
  /**
   * Having a separate rendering function for your components makes it easier
   * to render a separate component for each test and reduces boilerplate.
   */
  function renderLink(props: LinkProps, options = {}) {
    return render(<Link {...props} />, options);
  }

  /**
   * Default props help you have sensible defaults that work for most tests.
   * You can pass in custom props to customize rendering for your current test.
   */
  const defaultProps = {
    href: '/example',
    children: 'Go to the example',
  };

  it('should render an anchor', () => {
    renderLink(defaultProps);

    const link = screen.getByRole('link');

    expect(link).toHaveTextContent(defaultProps.children);
    expect(link.href).toBe(process.env.SITE_BASEURL + defaultProps.href);
  });

  /**
   * An automatic accessibility test only covers basic best practices.
   * You will still need to test manually to ensure full accessibility.
   */
  it('should meet accessibility guidelines', async () => {
    const { baseElement } = renderLink(defaultProps);
    const actual = await axe(baseElement);
    expect(actual).toHaveNoViolations();
  });
});
