import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from './App';

/**
 * defaultProps help you have sensible defaults that work
 * for most tests.
 */
const defaultProps = {
  // This will look more complex for real component.
};

/**
 * Having a dedicated test render function for your component
 * makes it easy to keep your tests decoupled and reduces
 * boilerplate.
 */
const renderApp = (props = {}) =>
  render(<App {...{ ...defaultProps, ...props }} />);

describe('App', () => {
  afterEach(cleanup);

  /**
   * Testing by what your user sees gives you more confidence
   * in your tests.
   */
  it('should show a title inside the card', () => {
    const { getByText } = renderApp();
    const heading = getByText('Welcome to SumUp React', { selector: 'h2' });
    expect(heading).not.toBeNull();
  });

  /**
   * For something like a logo, it might make sense to use a test-id
   * data attribute.
   */
  it('should show the SumUp logo', () => {
    const { queryByTestId } = renderApp();
    expect(queryByTestId('sumup-logo')).toBeInTheDocument();
  });
});
