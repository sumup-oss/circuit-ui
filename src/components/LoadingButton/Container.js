import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, omit } from 'lodash/fp';

import LoadingButton from './components/LoadingButton';
import { LOADING_STATES, EXIT_ANIMATION_DURATION } from './constants';
import { BUTTON_PROP_TYPES, BUTTON_DEFAULT_PROPS } from '../Button/constants';
import { isActive, isDisabled, isSuccess, isError } from './utils';

const { DISABLED, ACTIVE, SUCCESS, ERROR } = LOADING_STATES;

class Container extends Component {
  static propTypes = {
    ...BUTTON_PROP_TYPES,
    isLoading: PropTypes.bool,
    exitAnimationDuration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    exitAnimation: PropTypes.oneOf([SUCCESS, ERROR]),
    onAnimationComplete: PropTypes.func
  };

  static defaultProps = {
    ...BUTTON_DEFAULT_PROPS,
    isLoading: false,
    exitAnimationDuration: EXIT_ANIMATION_DURATION,
    exitAnimation: null,
    onAnimationComplete: noop
  };

  static SUCCESS = SUCCESS;
  static ERROR = ERROR;

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoading, exitAnimation } = nextProps;
    const { loadingState } = prevState;

    // Component still on exitAnimation status
    if (isSuccess(loadingState) || isError(loadingState)) {
      return null;
    }

    // Component on initial disabled status
    if (isLoading && isDisabled(loadingState)) {
      return {
        loadingState: ACTIVE
      };
    }

    // Component on active status but finished loading
    if (!isLoading && isActive(loadingState)) {
      return {
        loadingState: exitAnimation || DISABLED
      };
    }

    return null;
  }

  state = {
    loadingState: DISABLED
  };

  componentDidUpdate(prevProps, prevState) {
    const { loadingState } = this.state;
    const { exitAnimationDuration, exitAnimation } = this.props;

    if (!isActive(loadingState) && prevState.loadingState !== loadingState) {
      if (!exitAnimation) {
        this.onAnimationComplete();
      } else {
        setTimeout(this.onAnimationComplete, exitAnimationDuration);
      }
    }
  }

  onAnimationComplete = () => {
    const { onAnimationComplete } = this.props;

    if (onAnimationComplete) {
      onAnimationComplete();
    }

    this.setState({
      loadingState: DISABLED
    });
  };

  render() {
    const { loadingState } = this.state;
    const props = omit(
      ['onAnimationComplete', 'isLoading', 'exitAnimationDuration'],
      this.props
    );
    const isLoading =
      isActive(loadingState) ||
      isSuccess(loadingState) ||
      isError(loadingState);

    return (
      <LoadingButton
        {...props}
        loadingState={loadingState}
        isLoading={isLoading}
      />
    );
  }
}

export default Container;
