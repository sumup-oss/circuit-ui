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

import CloseButton from '../../../CloseButton';
import { childrenPropType } from '../../../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: card__header;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.giga};
`;

const noHeadingStyles = ({ children }) =>
  !children[0] &&
  css`
    label: card__header--no-heading;
    justify-content: flex-end;
  `;

const CardHeaderContainer = styled('header')(baseStyles, noHeadingStyles);

const closeButtonStyles = ({ theme }) => css`
  margin-top: -${theme.spacings.byte};
  margin-right: -${theme.spacings.kilo};
  margin-bottom: -${theme.spacings.byte};
`;

const CardHeaderCloseButton = styled(CloseButton)(closeButtonStyles);

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
const CardHeader = ({
  onClose,
  children,
  labelCloseButton,
  tracking = {},
  ...props
}) => (
  <CardHeaderContainer {...props}>
    {children}
    {onClose && (
      <CardHeaderCloseButton
        onClick={onClose}
        label={labelCloseButton}
        data-testid="header-close"
        tracking={{ component: 'close-button', ...tracking }}
      />
    )}
  </CardHeaderContainer>
);

CardHeader.propTypes = {
  /**
   * Heading to be shown.
   */
  children: childrenPropType,
  /**
   * Callback for the close button. If not specified, the button won't
   * be shown.
   */
  onClose: PropTypes.func,
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  labelCloseButton: PropTypes.string,
};

CardHeader.defaultProps = {
  onClose: null,
  children: null,
};

/**
 * @component
 */
export default CardHeader;
