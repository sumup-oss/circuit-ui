import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce as debounceFn } from 'lodash/fp';
import { isOptional, getInputClasses } from '../service';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';

class Input extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    dirty: PropTypes.bool,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    getRef: PropTypes.func,
    id: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    styleAsOptional: PropTypes.bool,
    type: PropTypes.string,
    validations: PropTypes.object,
    value: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.generateDebouncedHandler(props);
    this.state = { value: props.value };
    this.nativeInput = null;
  }

  onChange(e) {
    this.setState({ value: e.target.value });
    e.persist();
    this.debouncedChange(e);
  }

  generateDebouncedHandler(props) {
    const { onChange, debounce } = props;
    this.debouncedChange =
      debounce === undefined ? onChange : debounceFn(onChange, debounce);
  }

  componentWillReceiveProps(props) {
    this.generateDebouncedHandler(props);
    this.setState({ value: props.value });
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => this.nativeInput.focus());
    }
  }

  render() {
    const {
      className,
      dirty,
      disabled,
      errors,
      getRef,
      id,
      meta,
      name,
      onBlur,
      onFocus,
      onKeyDown,
      placeholder,
      styleAsOptional,
      type,
      validations
    } = this.props;

    const optional = isOptional({ validations, meta, styleAsOptional });
    const inputProps = {
      className: getInputClasses({
        errors,
        dirty,
        disabled,
        className,
        optional
      }),
      name,
      id,
      disabled,
      onBlur,
      onChange: this.onChange,
      onFocus,
      onKeyDown,
      placeholder,
      type: type || 'text',
      value: this.state.value,
      ref: node => {
        this.nativeInput = node;
        if (getRef) {
          getRef(node);
        }
      }
    };

    return <input {...inputProps} />;
  }
}

const input = withStyles(styles)(Input);
export default input;
