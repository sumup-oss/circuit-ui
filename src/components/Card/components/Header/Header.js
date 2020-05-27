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
import { useClickTrigger } from '@sumup/collector';

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

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
const CardHeaderContainer = styled('header')`
  ${baseStyles};
  ${noHeadingStyles};
`;

const CardHeader = ({
  onClose,
  children,
  labelCloseButton,
  trackingLabel,
  ...props
}) => {
  const dispatch = useClickTrigger();
  const handler = e => {
    dispatch({ label: trackingLabel, component: 'close-button' });
    onClose(e);
  };

  return (
    <CardHeaderContainer {...props}>
      {children}
      {onClose && (
        <CloseButton
          onClick={handler}
          label={labelCloseButton}
          data-testid="header-close"
        />
      )}
    </CardHeaderContainer>
  );
};

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
  /**
   * Tracking Label. It will be treated as label payload for tracking event.
   */
  trackingLabel: PropTypes.string
};

CardHeader.defaultProps = {
  onClose: null,
  children: null
};

/**
 * @component
 */
export default CardHeader;
