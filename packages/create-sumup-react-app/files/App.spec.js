import React from 'react';
import { render } from 'react-testing-library';

import App from './App.js';

/**
 * Having a separate rendering function for your components
 * makes it easier to render a separate component for each
 * test and reduces boilerplate.
 *
 * defaultProps help you have sensible defaults that work
 * for most tests. You can pass in custom props to customize
 * rendering for your current test.
 * */
const defaultProps = {
  // This will look more complex for real component.
};
const renderApp = (props = {}) =>
  render(<App {...{ ...defaultProps, ...props }} />);

describe('App', () => {
  /**
   * Testing by what your user sees gives you more confidence
   * in your tests.
   * */
  it('should show a title inside the card', () => {
    const { getByText } = renderApp();
    const heading = getByText('Welcome to SumUp React', { selector: 'h2' });
    expect(heading).not.toBeNull();
  });

  /**
   * For something like a logo, it might make sense to use a test-id
   * data attribute.
   * */
  it('should show the SumUp logo', () => {
    const { queryByTestId } = renderApp();
    expect(queryByTestId('sumup-logo')).toBeInTheDocument();
  });
});
