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
import { sizes, colorNames } from '../../styles/constants';

const { SUCCESS, DANGER, WARNING } = colorNames;
const { MEGA, GIGA } = sizes;

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
    [DANGER]: theme.colors.danger,
    [SUCCESS]: theme.colors.success,
    [WARNING]: theme.colors.warning
  };

  const textColors = {
    [DANGER]: theme.colors.danger,
    [SUCCESS]: theme.colors.black,
    [WARNING]: theme.colors.black
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

const successStyles = createLeftBorderStyles(SUCCESS);
const warningStyles = createLeftBorderStyles(WARNING);
const dangerStyles = createLeftBorderStyles(DANGER);

/**
 * An inline message displayed inside a Card.
 */
const InlineMessage = styled('p')(
  baseStyles,
  dangerStyles,
  successStyles,
  warningStyles,
  marginStyles
);

InlineMessage.DANGER = DANGER;
InlineMessage.SUCCESS = SUCCESS;
InlineMessage.WARNING = WARNING;

InlineMessage.MEGA = MEGA;
InlineMessage.GIGA = GIGA;

InlineMessage.propTypes = {
  /**
   * Indicates the color of the left border and text in the message.
   */
  type: PropTypes.oneOf([
    InlineMessage.DANGER,
    InlineMessage.SUCCESS,
    InlineMessage.WARNING
  ]),
  /**
   * Should correspond to the size provided to the surrounding Card component.
   */
  size: PropTypes.oneOf([InlineMessage.MEGA, InlineMessage.GIGA]),
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin: PropTypes.bool
};

InlineMessage.defaultProps = {
  size: InlineMessage.GIGA,
  noMargin: false
};

/**
 * @component
 */
export default InlineMessage;
