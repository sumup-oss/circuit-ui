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
`;

const ToggleTextWrapper = styled('label')`
  ${textWrapperStyles};
`;

const labelStyles = css`
  label: toggle__label;
  padding-top: 2px;
`;

const ToggleLabel = styled(Text)`
  ${labelStyles};
`;
ToggleLabel.propTypes = Text.propTypes;
ToggleLabel.defaultProps = Text.defaultProps;

const explanationStyles = ({ theme }) => css`
  label: toggle__explanation;
  color: ${theme.colors.n500};
`;

const ToggleExplanation = styled(Text)`
  ${explanationStyles};
`;
ToggleExplanation.propTypes = Text.propTypes;
ToggleExplanation.defaultProps = Text.defaultProps;

const toggleWrapperStyles = ({ theme }) => css`
  label: toggle;
  display: flex;
  flex-align: flex-start;
  margin-bottom: ${theme.spacings.mega};
`;

const toggleWrapperNoMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: toggle--no-margin;
    margin-bottom: 0;
  `;

const toggleWrapperReversedStyles = ({ theme, reversed }) =>
  reversed &&
  css`
    flex-direction: row-reverse;
    label {
      margin-left: 0;
      margin-right: ${theme.spacings.kilo};
    }
  `;

const ToggleWrapper = styled('div')`
  ${toggleWrapperStyles}
  ${toggleWrapperNoMarginStyles}
  ${toggleWrapperReversedStyles};
`;

/**
 * A toggle component with support for labels and additional explanations.
 */
const Toggle = ({ label, explanation, noMargin, reversed, ...props }) => {
  const switchId = uniqueId('toggle-switch_');
  const labelId = uniqueId('toggle-label_');
  return (
    <ToggleWrapper {...{ noMargin, reversed }}>
      <Switch {...props} aria-labelledby={labelId} id={switchId} />
      {(label || explanation) && (
        <ToggleTextWrapper id={labelId} htmlFor={switchId}>
          {label && (
            <ToggleLabel size={Text.KILO} noMargin>
              {label}
            </ToggleLabel>
          )}
          {explanation && (
            <ToggleExplanation size={Text.KILO} noMargin>
              {explanation}
            </ToggleExplanation>
          )}
        </ToggleTextWrapper>
      )}
    </ToggleWrapper>
  );
};

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
   * Adds the ability of the component to be right-aligned.
   */
  reversed: PropTypes.bool
};

Toggle.defaultProps = {
  label: null,
  explanation: null,
  noMargin: false,
  reversed: false
};

/**
 * @component
 */
export default Toggle;
