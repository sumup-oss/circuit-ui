import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'react-emotion';
import { withTheme } from 'emotion-theming';

import Input from '../Input';
import HtmlElement from '../HtmlElement';
import { childrenPropType, themePropType } from '../../util/shared-prop-types';

const currencyBaseStyles = ({ theme }) => css`
  color: ${theme.colors.b700};
`;

const currencyStyle = ({ theme, className }) =>
  cx(currencyBaseStyles({ theme }), className);

/**
 * SearchInput component for forms.
 */
const CurrencyInput = ({
  children,
  currencyPosition,
  currency,
  theme,
  ...props
}) => (
  <Input
    prefix={({ className }) =>
      currencyPosition === 'left' && (
        <HtmlElement className={currencyStyle({ theme, className })}>
          {currency}
        </HtmlElement>
      )
    }
    suffix={({ className }) =>
      currencyPosition === 'right' && (
        <HtmlElement className={currencyStyle({ theme, className })}>
          {currency}
        </HtmlElement>
      )
    }
    {...{ theme, ...props }}
  >
    {children}
  </Input>
);

/**
 * Triggers disabled styles on the component. This is also forwarded as
 * attribute to the <input> element.
 */
CurrencyInput.propTypes = {
  theme: themePropType.isRequired,
  children: childrenPropType,
  currencyPosition: PropTypes.oneOf(['left', 'right']),
  textAlign: PropTypes.oneOf(['left', 'right']),
  currency: PropTypes.string
};

CurrencyInput.defaultProps = {
  children: null,
  currencyPosition: 'right',
  textAlign: 'right',
  currency: '€'
};

/**
 * @component
 */
export default withTheme(CurrencyInput);
