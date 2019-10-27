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

import { directions } from '../../../../styles/constants';

const alignmentStyles = ({ theme, align }) =>
  align === directions.RIGHT &&
  css`
    label: card__footer--right;
    ${theme.mq.kilo} {
      justify-content: flex-end;
    }
  `;

const baseStyles = ({ theme }) => css`
  label: card__footer;
  display: block;
  width: 100%;
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo} {
    align-items: center;
    display: flex;
    margin-top: ${theme.spacings.mega};
  }
`;

/**
 * Footer used in the Card component. Used for styling and aligment
 * purposes only.
 */
const ModalFooter = styled('footer')(baseStyles, alignmentStyles);

ModalFooter.LEFT = directions.LEFT;
ModalFooter.RIGHT = directions.RIGHT;

ModalFooter.propTypes = {
  /**
   * Buttons wrapped in a ButtonGroup.
   */
  children: PropTypes.element,
  /**
   * Direction to align the content. Either left/right
   */
  align: PropTypes.oneOf([ModalFooter.LEFT, ModalFooter.RIGHT])
};

ModalFooter.defaultProps = {
  align: ModalFooter.RIGHT
};

/**
 * @component
 */
export default ModalFooter;
