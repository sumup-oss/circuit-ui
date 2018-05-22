import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, omit } from 'lodash/fp';

import LoadingButton from './components/LoadingButton';
import { LOADING_STATES, EXIT_ANIMATION_DURATION } from './constants';
import { BUTTON_PROP_TYPES, BUTTON_DEFAULT_PROPS } from '../Button/constants';
import { isActive, isDisabled, isSuccess } from './utils';

class Container extends Component {
  static propTypes = {
    ...BUTTON_PROP_TYPES,
    isLoading: PropTypes.bool,
    exitAnimationDuration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onAnimationComplete: PropTypes.func
  };

  static defaultProps = {
    ...BUTTON_DEFAULT_PROPS,
    isLoading: false,
    exitAnimationDuration: EXIT_ANIMATION_DURATION,
    onAnimationComplete: noop
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isLoading } = nextProps;
    const { loadingState } = prevState;

    if (isLoading && isDisabled(loadingState)) {
      return {
        loadingState: LOADING_STATES.ACTIVE
      };
    }

    if (!isLoading && isActive(loadingState)) {
      return {
        loadingState: LOADING_STATES.SUCCESS
      };
    }

    return null;
  }

  state = {
    loadingState: LOADING_STATES.DISABLED
  };

  componentDidUpdate(prevProps, prevState) {
    const { loadingState } = this.state;
    const { exitAnimationDuration } = this.props;

    if (isSuccess(loadingState) && prevState.loadingState !== loadingState) {
      setTimeout(this.onAnimationComplete, exitAnimationDuration);
    }
  }

  onAnimationComplete = () => {
    const { onAnimationComplete } = this.props;

    if (onAnimationComplete) {
      onAnimationComplete();
    }

    this.setState({
      loadingState: LOADING_STATES.DISABLED
    });
  };

  render() {
    const { loadingState } = this.state;
    const props = omit(
      ['onAnimationComplete', 'isLoading', 'exitAnimationDuration'],
      this.props
    );
    const isLoading = isActive(loadingState) || isSuccess(loadingState);

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
