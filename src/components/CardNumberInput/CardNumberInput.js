import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { flow, toPairs, map, keys } from '../../util/fp';
import Input from '../Input';
import { disableVisually } from '../../styles/style-helpers';

const schemeListStyles = ({ theme }) => css`
  label: card-number-input__scheme-list;
  bottom: 100%;
  list-style: none;
  position: absolute;
  overflow-x: auto;
  right: 0;
  text-align: right;
  white-space: nowrap;

  ${theme.mq.medium`
    right: 0;
    width: auto;
    text-align: right;
  `};
`;

const schemeListLongStyles = ({ supportedCardSchemes }) => {
  const numberOfSupportedSchemes = keys(supportedCardSchemes).length;

  if (numberOfSupportedSchemes < 6) {
    return '';
  }

  return css`
    label: card-number-input__scheme-list--long;
    bottom: -100%;
    left: 0;
    width: 100%;
    text-align: left;
  `;
};

const SchemeList = styled('ul')`
  ${schemeListStyles};
  ${schemeListLongStyles};
`;

const schemeIconWrapperStyles = ({ theme }) => css`
  label: card-number-input__scheme-icon-wrapper;
  display: inline-block;

  &:not(:last-of-type) {
    margin-right: ${theme.spacings.byte};
  }

  & > svg {
    width: auto;
    height: 23px;
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
  supportedCardSchemes,
  detectedCardScheme,
  value,
  ...props
}) => (
  <Input value={value} {...props}>
    <SchemeList {...{ supportedCardSchemes }}>
      {flow(
        toPairs,
        map(([cardScheme, IconComponent]) => {
          const disabled =
            value &&
            value.length &&
            ((!detectedCardScheme && !detectedCardScheme.length) ||
              detectedCardScheme !== cardScheme);
          return (
            <SchemeIconWrapper {...{ disabled, key: cardScheme }}>
              <IconComponent />
            </SchemeIconWrapper>
          );
        })
      )(supportedCardSchemes)}
    </SchemeList>
  </Input>
);

CardNumberInput.propTypes = {
  /**
   * Card scheme icon components.
   */
  supportedCardSchemes: PropTypes.objectOf(PropTypes.func).isRequired,
  /**
   * The detected card scheme.
   */
  detectedCardScheme: PropTypes.string.isRequired,
  /**
   * The card number.
   */
  value: PropTypes.string.isRequired
};

CardNumberInput.defaultProps = {};
/**
 * @component
 */
export default CardNumberInput;
