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

const ToggleTextWrapper = styled('div', { label: 'ToggleTextWrapper' })(
  textWrapperStyles
);

const labelStyles = css`
  label: toggle__label;
  vertical-align: 1px;
`;

const ToggleLabel = styled(Text, { label: 'ToggleLabel' })(labelStyles);
ToggleLabel.propTypes = Text.propTypes;
ToggleLabel.defaultProps = Text.defaultProps;

const explanationStyles = ({ theme }) => css`
  label: toggle__explanation;
  color: ${theme.colors.n500};
`;

const ToggleExplanation = styled(Text, { label: 'ToggleExplanation' })(
  explanationStyles
);
ToggleExplanation.propTypes = Text.propTypes;
ToggleExplanation.defaultProps = Text.defaultProps;

const toggleWrapperStyles = css`
  label: toggle;
  display: flex;
  flex-align: flex-start;
`;

const toggleWrapperMarginStyles = ({ theme, withMargin }) =>
  withMargin &&
  css`
    label: toggle--with-margin;
    margin-bottom: ${theme.spacings.mega};
  `;

const ToggleWrapper = styled('div', { label: 'ToggleWrapper' })(
  toggleWrapperStyles,
  toggleWrapperMarginStyles
);

/**
 * Describe your component here.
 */
const Toggle = ({ label, explanation, withMargin, ...props }) => (
  <ToggleWrapper {...{ withMargin }}>
    <Switch {...props} />
    <ToggleTextWrapper>
      <ToggleLabel element="label" size="kilo">
        {label}
      </ToggleLabel>
      {explanation && (
        <ToggleExplanation size="kilo">{explanation}</ToggleExplanation>
      )}
    </ToggleTextWrapper>
  </ToggleWrapper>
);

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  withMargin: PropTypes.bool,
  explanation: PropTypes.string
};

Toggle.defaultProps = {
  withMargin: true,
  explanation: null
};

/**
 * @component
 */
export default Toggle;
