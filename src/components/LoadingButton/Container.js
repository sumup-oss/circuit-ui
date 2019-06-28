/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, omit } from 'lodash/fp';

import LoadingButton from './components/LoadingButton';
import { LOADING_STATES, EXIT_ANIMATION_DURATION } from './constants';
import { BUTTON_PROP_TYPES, BUTTON_DEFAULT_PROPS } from '../Button/constants';
import { isActive, isDisabled, isSuccess, isError } from './utils';

const { DISABLED, ACTIVE, SUCCESS, ERROR } = LOADING_STATES;

class Container extends Component {
  static SUCCESS = SUCCESS;

  static ERROR = ERROR;

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

  state = {
    loadingState: DISABLED
  };

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

  componentDidUpdate(prevProps, prevState) {
    const { loadingState } = this.state;
    const { exitAnimationDuration, exitAnimation } = this.props;

    if (!isActive(loadingState) && prevState.loadingState !== loadingState) {
      if (!exitAnimation) {
        this.onAnimationComplete();
      } else {
        this.timeout = setTimeout(
          this.onAnimationComplete,
          exitAnimationDuration
        );
      }
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
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
