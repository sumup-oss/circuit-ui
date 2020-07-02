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

import { uniqueId } from '../../util/id';

import { Switch } from './components';
import Text from '../Text';

const textWrapperStyles = ({ theme }) => css`
  label: toggle__text-wrapper;
  display: block;
  margin-left: ${theme.spacings.kilo};
  cursor: pointer;

  ${theme.mq.untilKilo} {
    margin-left: 0;
    margin-right: ${theme.spacings.kilo};
  }
`;

const ToggleTextWrapper = styled('label')(textWrapperStyles);

const labelStyles = css`
  label: toggle__label;
  padding-top: 2px;
`;

const ToggleLabel = styled(Text)(labelStyles);

ToggleLabel.propTypes = Text.propTypes;
ToggleLabel.defaultProps = Text.defaultProps;

const explanationStyles = ({ theme }) => css`
  label: toggle__explanation;
  color: ${theme.colors.n500};
`;

const ToggleExplanation = styled(Text)(explanationStyles);

ToggleExplanation.propTypes = Text.propTypes;
ToggleExplanation.defaultProps = Text.defaultProps;

const toggleWrapperStyles = ({ theme }) => css`
  label: toggle;
  display: flex;
  flex-align: flex-start;
  margin-bottom: ${theme.spacings.mega};

  ${theme.mq.untilKilo} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const toggleWrapperNoMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: toggle--no-margin;
    margin-bottom: 0;
  `;

const ToggleWrapper = styled('div')(
  toggleWrapperStyles,
  toggleWrapperNoMarginStyles
);

/**
 * A toggle component with support for labels and additional explanations.
 */
const Toggle = React.forwardRef(
  ({ label, explanation, noMargin, ...props }, ref) => {
    const switchId = uniqueId('toggle-switch_');
    const labelId = uniqueId('toggle-label_');
    return (
      <ToggleWrapper {...{ noMargin }}>
        <Switch {...props} aria-labelledby={labelId} id={switchId} ref={ref} />
        {(label || explanation) && (
          <ToggleTextWrapper id={labelId} htmlFor={switchId}>
            {label && (
              <ToggleLabel size="kilo" noMargin>
                {label}
              </ToggleLabel>
            )}
            {explanation && (
              <ToggleExplanation size="kilo" noMargin>
                {explanation}
              </ToggleExplanation>
            )}
          </ToggleTextWrapper>
        )}
      </ToggleWrapper>
    );
  }
);

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  /**
   * Describes the function of the toggle. Should not change depending on the state.
   */
  label: PropTypes.string,
  /**
   * Further explanation of the toggle. Can change depending on the state.
   */
  explanation: PropTypes.string,
  /**
   * Removes the default bottom margin from the input.
   */
  noMargin: PropTypes.bool,
  /**
   * The ref to the html button dom element
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

Toggle.defaultProps = {
  label: null,
  explanation: null,
  noMargin: false
};

/**
 * @component
 */
export default Toggle;
