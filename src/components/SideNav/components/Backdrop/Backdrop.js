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
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import Fade from '../Fade';
import transitions from '../../transitions';

const baseStyles = css`
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-tap-highlight-color: transparent;
  background-color: rgba(0, 0, 0, 0.5);
`;

const visibilityStyles = ({ invisible }) =>
  invisible &&
  css`
    background-color: transparent;
  `;

const Shadow = styled.div`
  ${baseStyles} ${visibilityStyles};
`;

function Backdrop(props) {
  const { className, invisible, open, transitionDuration, ...other } = props;

  return (
    <Fade appear in={open} timeout={transitionDuration} {...other}>
      <Shadow invisible={invisible} aria-hidden="true" />
    </Fade>
  );
}

Backdrop.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ])
};

Backdrop.defaultProps = {
  className: null,
  invisible: false,
  transitionDuration: {
    enter: transitions.duration.enteringScreen,
    exit: transitions.duration.leavingScreen
  }
};

export default Backdrop;
