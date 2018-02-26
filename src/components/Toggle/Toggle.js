import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { Switch } from './components';
import Text from '../Text';

const textWrapperStyles = ({ theme }) => css`
  label: toggle__text-wrapper;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: ${theme.spacings.kilo};
`;

const ToggleTextWrapper = styled('div')`
  ${textWrapperStyles};
`;

const labelStyles = css`
  label: toggle__label;
  vertical-align: 1px;
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

const toggleWrapperStyles = css`
  label: toggle;
  display: flex;
  flex-align: flex-start;
`;

const toggleWrapperMarginStyles = ({ theme, margin }) =>
  margin &&
  css`
    label: toggle--with-margin;
    margin-bottom: ${theme.spacings.mega};
  `;

const ToggleWrapper = styled('div')`
  ${toggleWrapperStyles} ${toggleWrapperMarginStyles};
`;

/**
 * A toggle component with support for labels and additional explanations.
 */
const Toggle = ({ label, explanation, margin, ...props }) => (
  <ToggleWrapper {...{ margin }}>
    <Switch {...props} />
    {label &&
      explanation && (
        <ToggleTextWrapper>
          {label && (
            <ToggleLabel element="label" size={Text.KILO}>
              {label}
            </ToggleLabel>
          )}
          {explanation && (
            <ToggleExplanation size={Text.KILO}>
              {explanation}
            </ToggleExplanation>
          )}
        </ToggleTextWrapper>
      )}
  </ToggleWrapper>
);

Toggle.propTypes = {
  label: PropTypes.string,
  explanation: PropTypes.string,
  margin: PropTypes.bool
};

Toggle.defaultProps = {
  label: null,
  explanation: null,
  margin: true
};

/**
 * @component
 */
export default Toggle;
