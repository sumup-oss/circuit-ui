import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';
import PropTypes from 'prop-types';

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);
AllTheProviders.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
