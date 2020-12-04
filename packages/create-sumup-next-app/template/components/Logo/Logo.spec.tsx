import React from 'react';

import { render, axe } from '../../test-utils';

import { Logo } from './Logo';

describe('Logo', () => {
  /**
   * Having a separate rendering function for your components makes it easier
   * to render a separate component for each test and reduces boilerplate.
   */
  function renderLogo(props = {}, options = {}) {
    return render(<Logo {...props} />, options);
  }

  /**
   * For styled components it can be useful to write snapshot testing.
   * In this case, we want to ensure that an anchor has hover, focus,
   * and active styles.
   */
  it('should render with default styles', () => {
    const { container } = renderLogo();
    expect(container).toMatchSnapshot();
  });

  /**
   * An automatic accessibility test only covers basic best practices.
   * You will still need to test manually to ensure full accessibility.
   */
  it('should meet accessibility guidelines', async () => {
    const { baseElement } = renderLogo();
    const actual = await axe(baseElement);
    expect(actual).toHaveNoViolations();
  });
});
