import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Button from '../../../Button';
import LoadingIcon from '../LoadingIcon';
import { LOADING_STATES } from '../../constants';
import {
  BUTTON_PROP_TYPES,
  BUTTON_DEFAULT_PROPS
} from '../../../Button/constants';

const childrenWrapperStyles = ({ theme }) => css`
  opacity: 1;
  transform: translate(0, 0);
  transition: opacity ${theme.transitions.default},
    transform ${theme.transitions.default};
`;

const childrenWrapperLoadingStyles = ({ loadingState }) =>
  loadingState !== LOADING_STATES.DISABLED &&
  css`
    opacity: 0;
    transform: translate(0, 100%);
  `;

const ChildrenWrapper = styled.div`
  ${childrenWrapperStyles};
  ${childrenWrapperLoadingStyles};
`;

const LoadingButton = ({
  loadingState,
  size,
  children,
  onClick,
  isLoading,
  ...otherProps
}) => (
  <Button
    {...otherProps}
    size={size}
    onClick={isLoading ? null : onClick}
    isLoading={isLoading}
  >
    <Fragment>
      <LoadingIcon size={size} loadingState={loadingState} />
      <ChildrenWrapper loadingState={loadingState}>{children}</ChildrenWrapper>
    </Fragment>
  </Button>
);

LoadingButton.propTypes = {
  ...BUTTON_PROP_TYPES,
  loadingState: PropTypes.oneOf([
    LOADING_STATES.DISABLED,
    LOADING_STATES.ACTIVE,
    LOADING_STATES.SUCCESS,
    LOADING_STATES.ERROR
  ]),
  isLoading: PropTypes.bool
};

LoadingButton.defaultProps = {
  ...BUTTON_DEFAULT_PROPS,
  loadingState: LOADING_STATES.DISABLED,
  isLoading: false
};

export default LoadingButton;
