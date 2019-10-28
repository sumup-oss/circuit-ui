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

import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: message;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${theme.mq.kilo} {
    flex-direction: row;
  }
`;

/**
 * A Message component for alerts, updates and notifications.
 */
const Message = styled('div')(baseStyles);

Message.propTypes = {
  /**
   * Content to be rendered inside the Message.
   * Supports a special MessageIcon and MessageButton.
   */
  children: childrenPropType
};

/**
 * @component
 */
export default Message;
