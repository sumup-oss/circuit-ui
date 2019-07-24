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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { hideVisually } from 'polished';

import {
  deprecatedPropType,
  themePropType
} from '../../../../util/shared-prop-types';
import { flow, toPairs, map, keys } from '../../../../util/fp';
import MaskedInput from '../../../MaskedInput';
import Label from '../../../Label';
import {
  isDisabledSchemeIcon,
  hasDetectedScheme,
  shouldRenderSchemesUnderInput,
  CARD_NUMBER_MASK
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

  ${theme.mq.kilo} {
    right: 0;
    width: auto;
    text-align: right;
  }
`;

const schemeListHiddenStyles = ({ acceptedCardSchemes }) =>
  !keys(acceptedCardSchemes).length &&
  css`
    label: card-number-input__scheme-list--hidden;
    opacity: 0;
  `;

const schemeListLongStyles = ({ theme, acceptedCardSchemes }) =>
  shouldRenderSchemesUnderInput(acceptedCardSchemes) &&
  css`
    label: card-number-input__scheme-list--long;
    ${theme.mq.untilKilo} {
      top: -75%;
      top: calc(100% + ${theme.spacings.bit});
      bottom: initial;
      left: 0;
      width: 100%;
      text-align: left;
    }
  `;

const SchemeList = styled('ul')`
  ${schemeListStyles};
  ${schemeListLongStyles};
  ${schemeListHiddenStyles};
`;

const AccessibleCardSchemeInfo = styled('div')`
  ${hideVisually()};
`;

const inputLongStyles = ({ theme, acceptedCardSchemes }) =>
  shouldRenderSchemesUnderInput(acceptedCardSchemes) &&
  css`
    label: card-number-input__input--long;
    ${theme.mq.untilKilo} {
      margin-bottom: ${theme.spacings.tera};
      margin-bottom: calc(${theme.spacings.tera} + ${theme.spacings.bit});
    }
  `;

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
 * A credit card number input.
 */
const CardNumberInput = ({
  acceptedCardSchemes,
  detectedCardScheme,
  value,
  id,
  label,
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
      <MaskedInput
        value={value}
        type="tel"
        id={id}
        autoComplete="cc-number"
        placeholder="•••• •••• •••• ••••"
        wrapperStyles={inputLongStyles({
          theme,
          acceptedCardSchemes
        })}
        guide={false}
        mask={CARD_NUMBER_MASK}
        {...props}
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
      </MaskedInput>
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
   * @deprecated
   * Override styles for the Input component.
   */
  className: deprecatedPropType(
    PropTypes.string,
    [
      'Emotion 10 uses style objects instead of classnames.',
      `Use Emotion's "css" prop instead.`
    ].join(' ')
  ),
  theme: themePropType
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
