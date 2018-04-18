import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { hideVisually } from 'polished';

import { flow, toPairs, map, keys } from '../../../../util/fp';
import Input from '../../../Input';
import Label from '../../../Label';
import {
  isDisabledSchemeIcon,
  hasDetectedScheme,
  shouldRenderSchemesUnderInput
} from './CardNumberInputService';
import { disableVisually } from '../../../../styles/style-helpers';

const schemeListStyles = ({ theme }) => css`
  label: card-number-input__scheme-list;
  bottom: 100%;
  display: block;
  list-style: none;
  position: absolute;
  overflow-x: auto;
  right: 0;
  text-align: right;
  white-space: nowrap;
  opacity: 1;
  transition: opacity ${theme.transitions.default};

  ${theme.mq.medium`
    right: 0;
    width: auto;
    text-align: right;
  `};
`;

const schemeListHiddenStyles = ({ acceptedCardSchemes }) =>
  !keys(acceptedCardSchemes).length &&
  css`
    label: card-number-input__scheme-list--hidden;
    opacity: 0;
  `;

const schemeListLongStyles = ({ theme, acceptedCardSchemes }) =>
  shouldRenderSchemesUnderInput(acceptedCardSchemes)
    ? css`
        label: card-number-input__scheme-list--long;
        ${theme.mq.untilMedium`
      top: -75%;
      top: calc(100% + ${theme.spacings.bit});
      bottom: initial;
      left: 0;
      width: 100%;
      text-align: left;
    `};
      `
    : '';

const SchemeList = styled('ul')`
  ${schemeListStyles};
  ${schemeListLongStyles};
  ${schemeListHiddenStyles};
`;

const AccessibleCardSchemeInfo = styled('div')`
  ${hideVisually()};
`;

const inputLongStyles = ({ theme, acceptedCardSchemes, className }) =>
  shouldRenderSchemesUnderInput(acceptedCardSchemes)
    ? css`
        label: card-number-input__input--long;
        ${theme.mq.untilMedium`
          margin-bottom: ${theme.spacings.tera};
          margin-bottom: calc(${theme.spacings.tera} + ${theme.spacings.bit});
          ${className};
        `};
      `
    : className;

const schemeIconWrapperStyles = ({ theme }) => css`
  label: card-number-input__scheme-icon-wrapper;
  display: inline-block;

  &:not(:last-of-type) {
    margin-right: ${theme.spacings.bit};
  }

  & > svg {
    width: auto;
    height: ${theme.iconSizes.kilo};
  }
`;

const schemeIconWrapperDisabledStyles = ({ disabled }) =>
  disabled &&
  css`
    label: card-number-input__scheme-icon-wrapper--disabled;
    ${disableVisually()};
    opacity: 0.2;
  `;

const SchemeIconWrapper = styled('li')`
  ${schemeIconWrapperStyles};
  ${schemeIconWrapperDisabledStyles};
`;

/**
 * Describe your component here.
 */
const CardNumberInput = ({
  acceptedCardSchemes,
  detectedCardScheme,
  value,
  className,
  id,
  label,
  // eslint-disable-next-line
  theme,
  supportedSchemesLabel,
  detectedSchemeLabel,
  ...props
}) => {
  const supportedSchemesText = `${supportedSchemesLabel}: ${keys(
    acceptedCardSchemes
  ).join(', ')}.`;
  const detectedSchemesText =
    hasDetectedScheme(detectedCardScheme) &&
    `${detectedSchemeLabel}: ${detectedCardScheme}`;
  return (
    <Fragment>
      <AccessibleCardSchemeInfo>
        {supportedSchemesText}
      </AccessibleCardSchemeInfo>
      <AccessibleCardSchemeInfo aria-live="polite">
        {detectedSchemesText}
      </AccessibleCardSchemeInfo>
      <Label htmlFor={id}>{label}</Label>
      <Input
        value={value}
        type="tel"
        id={id}
        autoComplete="cc-number"
        placeholder="•••• •••• •••• ••••"
        {...props}
        wrapperClassName={inputLongStyles({
          theme,
          acceptedCardSchemes,
          className
        })}
      >
        <SchemeList {...{ acceptedCardSchemes }} aria-hidden="true">
          {flow(
            toPairs,
            map(([cardScheme, IconComponent]) => (
              <SchemeIconWrapper
                disabled={isDisabledSchemeIcon(
                  value,
                  detectedCardScheme,
                  cardScheme
                )}
                key={cardScheme}
              >
                <IconComponent />
              </SchemeIconWrapper>
            ))
          )(acceptedCardSchemes)}
        </SchemeList>
      </Input>
    </Fragment>
  );
};

CardNumberInput.propTypes = {
  /**
   * Card scheme icon components.
   */
  acceptedCardSchemes: PropTypes.objectOf(PropTypes.func).isRequired,
  /**
   * The detected card scheme.
   */
  detectedCardScheme: PropTypes.string,
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string,
  /**
   * The card number.
   */
  value: PropTypes.string,
  /**
   * A label for the supported schemes. Visually hidden, but
   * accessible to screen readers.
   */
  supportedSchemesLabel: PropTypes.string,
  /**
   * A label for the detected scheme. Visually hidden,
   * but accessible to screen readers.
   */
  detectedSchemeLabel: PropTypes.string,
  /**
   * Override styles for the Input component.
   */
  className: PropTypes.string
};

CardNumberInput.defaultProps = {
  label: 'Card number',
  id: 'cui-cc-card-number',
  className: '',
  detectedCardScheme: '',
  supportedSchemesLabel: 'Supported card schemes',
  detectedSchemeLabel: 'Detected scheme',
  value: ''
};

/**
 * @component
 */
export default withTheme(CardNumberInput);
