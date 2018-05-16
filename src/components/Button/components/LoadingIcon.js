import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { size as sizeMixin } from 'polished';

import { sizes } from '../../../styles/constants';
import { values } from '../../../util/fp';

import PureSpinner from '../../Spinner';
import SuccessSvg from './icons/success.svg';
import { LOADING_STATES, SIZE_PROP_TYPE } from '../constants';

const { KILO, MEGA, GIGA } = sizes;

const iconEnter = keyframes`
  0% {
    opacity: 1;
    transform: scale3d(0, 0, 0);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const iconBaseStyles = css`
  transform: scale3d(0, 0, 0);
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  ${sizeMixin('100%')};
`;

const iconVisibleStyles = ({ visible }) =>
  visible &&
  css`
    animation: ${iconEnter} 200ms ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `;

const SuccessIcon = styled(SuccessSvg)(iconBaseStyles, iconVisibleStyles);

// TODO: use default animation after merging.
const centeredStyles = css`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const sizeStyles = ({ theme, size }) => {
  const sizeMap = {
    [KILO]: theme.spacings.mega,
    [MEGA]: theme.spacings.giga,
    [GIGA]: theme.spacings.tera
  };

  const sizeValue = sizeMap[size] || sizeMap.GIGA;

  return css`
    label: spinner--${size.toLowerCase()};
    ${sizeMixin(sizeValue)};
  `;
};

const SuccessContainer = styled('div')(centeredStyles, sizeStyles);

const Spinner = styled(PureSpinner)(sizeStyles, centeredStyles);

const Success = ({ size, ...props }) => (
  <SuccessContainer size={size}>
    <SuccessIcon {...props} />
  </SuccessContainer>
);

Success.propTypes = {
  size: PropTypes.oneOf(SIZE_PROP_TYPE)
};

Success.defaultProps = {
  size: GIGA
};

const LoadingIcon = ({ loadingState, size }) => (
  <Fragment>
    <Spinner size={size} active={loadingState === LOADING_STATES.ACTIVE} />
    <Success size={size} visible={loadingState === LOADING_STATES.SUCCESS} />
  </Fragment>
);

LoadingIcon.propTypes = {
  loadingState: PropTypes.oneOf(values(LOADING_STATES)).isRequired,
  size: PropTypes.string.isRequired
};

/**
 * @component
 */
export default LoadingIcon;
