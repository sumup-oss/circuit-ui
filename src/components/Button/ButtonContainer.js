import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { omit } from '../../util/fp';
import { sizes } from '../../styles/constants';
import { Button, LoadingIcon } from './components';
import {
  LOADING_STATES,
  EXIT_ANIMATION_DURATION,
  SIZE_PROP_TYPE
} from './constants';

const { KILO, MEGA, GIGA } = sizes;

const ContentWrapper = styled('div')`
  position: relative;
`;

const childrenWrapperStyles = ({ theme }) => css`
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity ${theme.transitions.default},
    transform ${theme.transitions.default};
`;

const childrenWrapperLoadingStyles = ({ loadingState }) =>
  loadingState !== LOADING_STATES.INACTIVE &&
  css`
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  `;

const ChildrenWrapper = styled('div')`
  ${childrenWrapperStyles};
  ${childrenWrapperLoadingStyles};
`;

/**
 * @component
 */
export default class ButtonContainer extends Component {
  static KILO = KILO;
  static MEGA = MEGA;
  static GIGA = GIGA;
  static propTypes = {
    /**
     * Children nodes. Automatically wrapped in a div, so you can pass multiple
     * elements.
     */
    children: PropTypes.node.isRequired,
    /**
     * Standard onClick function. If used on an anchor this can be used to
     * cause additional side-effects like tracking.
     */
    onClick: PropTypes.func,
    /**
     * Callback for when the button's success/error animations are complete.
     * Receives the original promise returned from onClick.
     */
    onAnimationComplete: PropTypes.func,
    /**
     * Delay to wait before showing loading state.
     */
    loadingDelay: PropTypes.number,
    /**
     * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
     */
    size: SIZE_PROP_TYPE
  };

  static defaultProps = {
    onClick: null,
    loadingDelay: 500,
    size: MEGA,
    onAnimationComplete: null
  };

  state = {
    timeoutId: null,
    loadingState: LOADING_STATES.INACTIVE
  };

  componentWillUnmount() {
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  handleClick = e => {
    const { onClick, loadingDelay } = this.props;
    const { timeoutId: existingTimeoutId } = this.state;

    if (!onClick || existingTimeoutId) {
      return;
    }

    const handlingClick = onClick(e);

    if (!handlingClick || !handlingClick.then) {
      return;
    }

    const timeoutId = setTimeout(() => {
      this.setState({ loadingState: LOADING_STATES.ACTIVE });
    }, loadingDelay);

    this.setState({ timeoutId });

    handlingClick.then(this.handleSuccess).catch(this.handleError);
  };

  // TODO: should these be handlers? They are not handling an
  // event. They are callbacks.
  handleSuccess = resolved => {
    const { onAnimationComplete } = this.props;

    const timeoutId = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete(resolved);
      }
      this.handleFinally();
    }, EXIT_ANIMATION_DURATION);

    this.setState({ timeoutId, loadingState: LOADING_STATES.SUCCESS });
  };

  handleError = () => {
    // TODO: we can add this, if we want an error icon to show.
    // this.setState({ loadingState: LOADING_STATES.ERROR });
    this.handleFinally();
  };

  // TODO: use real .finally() on Promise, once it's supported.
  handleFinally = () => {
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    this.setState({ loadingState: LOADING_STATES.INACTIVE, timeoutId: null });
  };

  render() {
    const { children, onClick: outerOnClick, size, ...props } = this.props;
    const { loadingState } = this.state;
    const onClick = outerOnClick ? this.handleClick : outerOnClick;
    const buttonProps = {
      ...omit(['onAnimationComplete'], props),
      size,
      onClick
    };

    return (
      <Button {...buttonProps}>
        <ContentWrapper>
          {onClick && (
            <LoadingIcon
              {...{
                loadingState,
                size,
                exitAnimationDuration: EXIT_ANIMATION_DURATION
              }}
            />
          )}
          <ChildrenWrapper {...{ loadingState }}>{children}</ChildrenWrapper>
        </ContentWrapper>
      </Button>
    );
  }
}
