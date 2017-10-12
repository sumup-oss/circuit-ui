import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class LoadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.submitListener = null;
    this.isUnmounting = false;
    this.stopLoading = this.stopLoading.bind(this);
  }

  stopLoading(res) {
    if (!this.isUnmounting) {
      this.setState({ loading: false });
    }
    return res;
  }

  componentWillMount() {
    const { form } = this.context;
    if (form) {
      this.submitListener = form.onSubmit(pr => this.setPromise(pr));
    }
  }

  componentWillUnmount() {
    this.isUnmounting = true;
    if (this.submitListener) {
      this.submitListener();
      this.submitListener = null;
    }
  }

  setPromise(promise) {
    if (promise && typeof promise.then === 'function') {
      promise.then(this.stopLoading).catch(err => {
        this.stopLoading();
        return Promise.reject(err);
      });
      this.setState({ promise, loading: true });
    }
  }

  render() {
    const { onClick, children, ...otherProps } = this.props;

    const className = classNames(this.props.className, {
      'btn--loading': this.state.loading,
      'btn--disabled': this.state.loading
    });

    const props = {
      ...otherProps,
      className,
      onClick: onClick ? e => this.setPromise(onClick(e)) : () => {}
    };

    const disabled = this.props.disabled || this.state.loading;

    return (
      <button disabled={disabled} {...props}>
        {children}
        <span className="spinner" />
      </button>
    );
  }
}

LoadingButton.contextTypes = {
  form: PropTypes.shape({ onSubmit: PropTypes.func })
};

export default LoadingButton;
