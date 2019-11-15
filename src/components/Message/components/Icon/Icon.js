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
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { ReactComponent as MessageSuccess } from '../../message-success.svg';
import { ReactComponent as MessageError } from '../../message-error.svg';
import MessageWarning from '../MessageWarning';

const ICON_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const ICON_MAP = {
  [ICON_TYPES.SUCCESS]: MessageSuccess,
  [ICON_TYPES.ERROR]: MessageError,
  [ICON_TYPES.WARNING]: MessageWarning
};

const baseStyles = ({ theme }) => css`
  label: message__icon;
  display: block;
  margin: 0 0 ${theme.spacings.mega} 0;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 0;

  ${theme.mq.kilo} {
    margin: 0 ${theme.spacings.mega} 0 0;
  }
`;

/**
 * Icon used in the Message component. Used for styling and alignment
 * purposes only.
 */
const MessageIconContainer = styled('div')(baseStyles);

const MessageIcon = ({ type, children }) => {
  const Icon = ICON_MAP[type];

  return (
    <MessageIconContainer>{Icon ? <Icon /> : children}</MessageIconContainer>
  );
};

MessageIcon.SUCCESS = ICON_TYPES.SUCCESS;
MessageIcon.ERROR = ICON_TYPES.ERROR;
MessageIcon.WARNING = ICON_TYPES.WARNING;

MessageIcon.propTypes = {
  /**
   * A custom icon to display.
   */
  children: PropTypes.element,
  /**
   * The icon type. Overrides a custom icon.
   */
  type: PropTypes.oneOf([
    MessageIcon.SUCCESS,
    MessageIcon.ERROR,
    MessageIcon.WARNING
  ])
};

/**
 * @component
 */
export default MessageIcon;
