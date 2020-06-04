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

import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { ClassNames } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import noScroll from 'no-scroll';
import { mapValues } from 'lodash/fp';

import { themePropType } from '../../util/shared-prop-types';
import { isFunction } from '../../util/type-check';
import IS_IOS from '../../util/ios';

export const TRANSITION_DURATION = 200;
export const DEFAULT_APP_ELEMENT = '#root';
export const APP_ELEMENT_PROP_TYPE = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node
]);

const TOP_MARGIN = '10vh';
const TRANSFORM_Y_FLOATING = '10vh';
const FLOATING_TRANSITION = `${TRANSITION_DURATION}ms ease-in-out`;
const FIXED_TRANSITION = `${TRANSITION_DURATION}ms cubic-bezier(0, 0.37, 0.64, 1)`;

/**
 * React Modal styles.
 * Documentation: http://reactcommunity.org/react-modal/styles/classes.html
 */

const modalClassName = css => ({
  base: ({ theme }) => css`
    label: modal;
    outline: none;

    ${theme.mq.untilKilo} {
      bottom: 0;
      max-height: 80vh;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      position: fixed;
      transform: translateY(100%);
      transition: transform ${FIXED_TRANSITION};
      width: 100%;
      width: 100vw;
    }

    ${theme.mq.kilo} {
      transition: transform ${FLOATING_TRANSITION},
        opacity ${FLOATING_TRANSITION};
      margin: ${TOP_MARGIN} auto auto;
      max-height: 90vh;
      max-width: 90%;
      min-width: 450px;
      opacity: 0;
      position: relative;
      transform: translateY(${TRANSFORM_Y_FLOATING});
    }

    ${theme.mq.mega} {
      max-width: 750px;
    }

    ${theme.mq.giga} {
      max-width: 850px;
    }
  `,
  afterOpen: ({ theme }) => css`
    label: modal--after-open;
    ${theme.mq.untilKilo} {
      transform: translateY(0);
    }

    ${theme.mq.kilo} {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  beforeClose: ({ theme }) => css`
    label: modal--before-close;
    ${theme.mq.untilKilo} {
      transform: translateY(100%);
    }

    ${theme.mq.kilo} {
      opacity: 0;
      transform: translateY(${TRANSFORM_Y_FLOATING});
    }
  `
});

const overlayClassName = css => ({
  base: ({ theme }) => css`
    label: modal__overlay;
    background: ${theme.colors.overlay};
    bottom: 0;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 200ms ease-in-out;
    z-index: ${theme.zIndex.modal};

    ${theme.mq.kilo} {
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
    }
  `,
  afterOpen: () => css`
    label: modal__overlay--after-open;
    opacity: 1;
  `,
  beforeClose: () => css`
    label: modal__overlay--before-close;
    opacity: 0;
  `
});

/**
 * Circuit UI's wrapper component for ReactModal. Uses the Card component
 * to wrap content passed as the children prop. Don't forget to set
 * the aria prop when using this.
 * http://reactcommunity.org/react-modal/accessibility/#aria
 */
const Modal = ({
  children,
  onClose,
  contentLabel,
  theme,
  appElement,
  ...props
}) => {
  ReactModal.setAppElement(appElement);
  const getClassValues = mapValues(styleFn => styleFn({ theme }));
  return (
    <ClassNames>
      {({ css }) => {
        const reactModalProps = {
          className: getClassValues(modalClassName(css)),
          overlayClassName: getClassValues(overlayClassName(css)),
          htmlOpenClassName: 'ReactModal__Html--open',
          contentLabel,
          onAfterOpen: () => IS_IOS && noScroll.on(),
          onAfterClose: () => IS_IOS && noScroll.off(),
          onRequestClose: onClose,
          closeTimeoutMS: TRANSITION_DURATION,
          ...props
        };
        return (
          <ReactModal {...reactModalProps}>
            {isFunction(children) ? children() : children}
          </ReactModal>
        );
      }}
    </ClassNames>
  );
};

Modal.propTypes = {
  /**
   * Render prop for the content of the Modal, can be either function
   * or a React Node
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * Determines if the modal is visible or not.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Function to close the modal. Passed down to the children
   * render prop.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The Circuit UI theme.
   */
  theme: themePropType.isRequired,
  /**
   * React Modal's accessibility string.
   */
  contentLabel: PropTypes.string,
  /**
   * The element that should be used as root for the
   * React portal used to display the modal. See
   * http://reactcommunity.org/react-modal/accessibility/#app-element
   */
  appElement: APP_ELEMENT_PROP_TYPE
};

Modal.defaultProps = {
  contentLabel: 'Modal',
  appElement: DEFAULT_APP_ELEMENT
};

/**
 * @component
 */
export default withTheme(Modal);
