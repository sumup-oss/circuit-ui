import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { injectGlobal, css } from 'react-emotion';
import { withTheme } from 'emotion-theming';

import Card from '../Card';
import { childrenPropType, themePropType } from '../../util/shared-prop-types';
import { mapValues } from '../../util/fp';

export const TRANSITION_DURATION = 200;
const TOP_MARGIN = '10vh';
const TRANSFORM_Y_FLOATING = '10vh';
const FLOATING_TRANSITION = `${TRANSITION_DURATION}ms ease-in-out`;
// eslint-disable-next-line max-len
const FIXED_TRANSITION = `${TRANSITION_DURATION}ms cubic-bezier(0, 0.37, 0.64, 1)`;

/**
 * React Modal styles.
 * Documentation: http://reactcommunity.org/react-modal/styles/classes.html
 */

const cardStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.untilMedium`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: initial;
    position: relative;
  `};
`;

const modalClassName = {
  base: ({ theme }) => css`
    outline: none;

    ${theme.mq.untilMedium`
      bottom: 0;
      max-height: 80vh;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      position: fixed;
      transform: translateY(100%);
      transition: transform ${FIXED_TRANSITION};
      width: 100%;
      width: 100vw;
    `};

    ${theme.mq.medium`
      transition: transform ${FLOATING_TRANSITION},
        opacity ${FLOATING_TRANSITION};
      margin: ${TOP_MARGIN} auto auto;
      max-height: 90vh;
      max-width: 90%;
      min-width: 450px;
      opacity: 0;
      position: relative;
      transform: translateY(${TRANSFORM_Y_FLOATING});
    `};

    ${theme.mq.big`
      max-width: 750px;
    `};

    ${theme.mq.huge`
      max-width: 850px;
    `};
  `,
  afterOpen: ({ theme }) => css`
    ${theme.mq.untilMedium`
      transform: translateY(0);
    `};

    ${theme.mq.medium`
      opacity: 1;
      transform: translateY(0);
    `};
  `,
  /* eslint-disable max-len */
  beforeClose: ({ theme }) => css`
    ${theme.mq.untilMedium`
       transform: translateY(100%);
    `};

    ${theme.mq.medium`
       opacity: 0;
       transform: translateY(${TRANSFORM_Y_FLOATING});
    `};
  `
  /* eslint-enable max-len */
};

const overlayClassName = {
  base: ({ theme }) => css`
    background: rgba(61, 66, 76, 0.25);
    bottom: 0;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 200ms ease-in-out;
    z-index: 1000;

    ${theme.mq.medium`
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
    `};
  `,
  afterOpen: () => css`
    opacity: 1;
  `,
  beforeClose: () => css`
    opacity: 0;
  `
};

/**
 * Global body styles
 */

/* eslint-disable no-unused-expressions */
injectGlobal`
   /* Remove scroll on the body when react-modal is open */
  .ReactModal__Body--open {
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: auto;
    width: 100vw;
  }

  /*
   * This is a fix for IOS browsers which doesn't respect
   * 'overflow: hidden' on body it makes the body scrollable.
   *
   * Related issue: https://bugs.webkit.org/show_bug.cgi?id=153852
   */
  .ReactModal__Body-ios.ReactModal__Body--open {
    position: fixed;
  }
`;
/* eslint-enable no-unused-expressions */

/**
 * Circuit UI's wrapper component for ReactModal.
 */
// TODO:
// - implement Safari fix scroll position.
const Modal = ({
  children,
  title,
  onClose,
  contentLabel,
  theme,
  ...otherProps
}) => {
  // TODO: can we do this better?
  ReactModal.setAppElement(document.body);
  const getClassValues = mapValues(styleFn => styleFn({ theme }));
  const reactModalProps = {
    ...otherProps,
    className: getClassValues(modalClassName),
    overlayClassName: getClassValues(overlayClassName),
    contentLabel,
    onRequestClose: onClose,
    closeTimeoutMS: TRANSITION_DURATION,
    children: <Card className={cardStyles({ theme })}>{children()}</Card>
  };

  return <ReactModal {...reactModalProps} />;
};

Modal.propTypes = {
  children: childrenPropType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  theme: themePropType.isRequired,
  title: PropTypes.string.isRequired,
  contentLabel: PropTypes.string,
  noCloseIcon: PropTypes.bool
};

Modal.defaultProps = {
  contentLabel: 'Modal',
  noCloseIcon: false
};

/**
 * @component
 */
export default withTheme(Modal);
