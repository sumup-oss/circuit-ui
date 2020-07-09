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

const baseStyles = css`
  label: inline-message;
`;

const marginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;

const createLeftBorderStyles = colorName => ({ theme, size, type }) => {
  const colors = {
    danger: theme.colors.danger,
    success: theme.colors.success,
    warning: theme.colors.warning,
  };

  const textColors = {
    danger: theme.colors.danger,
    success: theme.colors.black,
    warning: theme.colors.black,
  };

  return (
    colorName === type &&
    css`
      label: ${`inline-message--${type}`};
      color: ${textColors[type]};
      position: relative;
      margin-bottom: ${theme.spacings.mega};

      &:before {
        display: inline-block;
        border-top-right-radius: ${theme.borderRadius[size]};
        border-bottom-right-radius: ${theme.borderRadius[size]};
        content: '';
        position: absolute;
        left: -${theme.spacings[size]};
        top: 0;
        height: 100%;
        background-color: ${colors[type]};
        width: 3px;
      }
    `
  );
};

const successStyles = createLeftBorderStyles('success');
const warningStyles = createLeftBorderStyles('warning');
const dangerStyles = createLeftBorderStyles('danger');

/**
 * An inline message displayed inside a Card.
 */
const InlineMessage = styled('p')(
  baseStyles,
  dangerStyles,
  successStyles,
  warningStyles,
  marginStyles,
);

InlineMessage.propTypes = {
  /**
   * Indicates the color of the left border and text in the message.
   */
  type: PropTypes.oneOf(['danger', 'success', 'warning']),
  /**
   * Should correspond to the size provided to the surrounding Card component.
   */
  size: PropTypes.oneOf(['mega', 'giga']),
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin: PropTypes.bool,
};

InlineMessage.defaultProps = {
  size: 'giga',
  noMargin: false,
};

/**
 * @component
 */
export default InlineMessage;
