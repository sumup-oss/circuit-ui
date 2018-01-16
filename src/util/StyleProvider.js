import { Component } from 'react';
import PropTypes from 'prop-types';

export default class StyleProvider extends Component {
  getChildContext() {
    return { insertCss: this.props.insertCss };
  }

  render() {
    return this.props.children;
  }
}

StyleProvider.childContextTypes = {
  insertCss: PropTypes.func
};
