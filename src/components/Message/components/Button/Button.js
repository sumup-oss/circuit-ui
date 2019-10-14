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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const CENTER = 'center';
const TOP = 'top';

const baseStyles = ({ theme }) => css`
  label: message__button;
  display: block;
  padding-left: ${theme.spacings.giga};
  margin-top: ${theme.spacings.mega};
  margin-left: auto;
  flex-grow: 0;
  flex-shrink: 0;

  ${theme.mq.kilo} {
    margin-top: 0;
  }
`;

const alignmentStyles = ({ align }) => {
  const alignments = {
    [CENTER]: 'center',
    [TOP]: 'flex-start'
  };
  return css`
    label: ${`message__button--${align}`};
    align-self: ${alignments[align]};
  `;
};

/**
 * Button used in the Message component. Used for styling and aligment
 * purposes only.
 */
const MessageButton = styled('div')(baseStyles, alignmentStyles);

MessageButton.TOP = TOP;
MessageButton.CENTER = CENTER;

MessageButton.propTypes = {
  /**
   * Button
   */
  children: PropTypes.element.isRequired,
  /**
   * Vertical alignment
   */
  align: PropTypes.oneOf([MessageButton.TOP, MessageButton.CENTER])
};

MessageButton.defaultProps = {
  align: MessageButton.CENTER
};

/**
 * @component
 */
export default MessageButton;
