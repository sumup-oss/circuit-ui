/**
 * Isomorphic CSS style loader for Webpack
 * Lightly adapted from https://github.com/kriasoft/isomorphic-style-loader
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const contextTypes = {
  insertCss: PropTypes.func
};

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends Component {
      componentWillMount() {
        const noop = () => {};
        const insertCss = this.context.insertCss || noop;
        this.removeCss = insertCss(...styles);
      }

      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    const displayName =
      ComposedComponent.displayName || ComposedComponent.name || 'Component';

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.contextTypes = contextTypes;
    WithStyles.ComposedComponent = ComposedComponent;

    if (STORYBOOK === true) {
      WithStyles.propTypes = ComposedComponent.propTypes;
      WithStyles.displayName = displayName;
    }

    return hoistStatics(WithStyles, ComposedComponent);
  };
}

export default withStyles;
