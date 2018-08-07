import React, { Fragment, createElement } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { standard } from '../../../../src/themes';

const Type = ({ size, component, ...props }) => (
  <ThemeProvider theme={standard}>
    {createElement(component, {
      children: <Fragment>A better way to get {size}.</Fragment>,
      size,
      ...props
    })}
  </ThemeProvider>
);

Type.propTypes = {
  component: PropTypes.object.isRequired, // eslint-disable-line
  size: PropTypes.string.isRequired
};

export default Type;
