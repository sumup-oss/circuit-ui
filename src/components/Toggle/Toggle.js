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

const ToggleWrapper = styled('div')`
  ${toggleWrapperStyles} ${toggleWrapperNoMarginStyles};
`;

/**
 * A toggle component with support for labels and additional explanations.
 */
const Toggle = ({ label, explanation, noMargin, ...props }) => {
  const switchId = uniqueId('toggle-switch_');
  const labelId = uniqueId('toggle-label_');
  return (
    <ToggleWrapper {...{ noMargin }}>
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
  noMargin: PropTypes.bool
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
