import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';

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
    const {
      onClick,
      children,
      className: classes,
      disabled,
      ...otherProps
    } = this.props;
    const { loading } = this.state;

    const className = classNames(classes, {
      'btn--loading': loading,
      'btn--disabled': loading
    });

    const props = {
      ...otherProps,
      className,
      onClick: onClick ? e => this.setPromise(onClick(e)) : () => {}
    };

    const isDisabled = disabled || loading;

    return (
      <Button disabled={isDisabled} {...props}>
        {children}
        <span className="spinner" />
      </Button>
    );
  }
}

LoadingButton.contextTypes = {
  form: PropTypes.shape({ onSubmit: PropTypes.func })
};

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default LoadingButton;
