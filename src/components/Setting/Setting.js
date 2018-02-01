import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Toggle from '../Toggle';
import Text from '../Text';

const textWrapperStyles = ({ theme }) => css`
  label: setting__text-wrapper;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: ${theme.spacings.kilo};
`;

const SettingTextWrapper = styled('div', { label: 'SettingTextWrapper' })(
  textWrapperStyles
);

const labelStyles = css`
  label: setting__label;
  vertical-align: 1px;
`;

const SettingLabel = styled(Text, { label: 'SettingLabel' })(labelStyles);

const explanationStyles = ({ theme }) => css`
  label: setting__explanation;
  color: ${theme.colors.n500};
`;

const SettingExplanation = styled(Text, { label: 'SettingExplanation' })(
  explanationStyles
);

const settingWrapperStyles = css`
  label: setting;
  display: flex;
  flex-align: flex-start;
`;

const settingWrapperMarginStyles = ({ theme, withMargin }) =>
  withMargin &&
  css`
    label: setting--with-margin;
    margin-bottom: ${theme.spacings.mega};
  `;

const SettingWrapper = styled('div', { label: 'SettingWrapper' })(
  settingWrapperStyles,
  settingWrapperMarginStyles
);

/**
 * Describe your component here.
 */
const Setting = ({ label, explanation, withMargin, ...props }) => (
  <SettingWrapper {...{ withMargin }}>
    <Toggle {...props} />
    <SettingTextWrapper>
      <SettingLabel element="label" size="mega">
        {label}
      </SettingLabel>
      {explanation && (
        <SettingExplanation element="p" size="kilo">
          {explanation}
        </SettingExplanation>
      )}
    </SettingTextWrapper>
  </SettingWrapper>
);

Setting.propTypes = {
  label: PropTypes.string.isRequired,
  withMargin: PropTypes.bool,
  explanation: PropTypes.string
};

Setting.defaultProps = {
  withMargin: true,
  explanation: null
};

/**
 * @component
 */
export default Setting;
