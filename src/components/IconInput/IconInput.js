import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'react-emotion';
import { withTheme } from 'emotion-theming';

import { size } from 'polished';
import Input from '../Input';

import { themePropType, childrenPropType } from '../../util/shared-prop-types';

const iconBaseStyles = ({ theme }) => css`
  label: input__icon;
  position: absolute;
  ${size(theme.spacings.mega)};
  top: 50%;
  transform: translateY(-50%);
`;

const iconLeftStyles = ({ theme }) => css`
  label: input__icon--left;
  left: ${theme.spacings.kilo};
  right: auto;
`;

const iconRightStyles = ({ theme }) => css`
  label: input__icon--right;
  right: ${theme.spacings.kilo};
  left: auto;
`;

const inputLeftStyles = ({ theme, iconLeft }) =>
  iconLeft &&
  css`
    label: input--icon-left;
    padding-left: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const inputRightStyles = ({ theme, iconRight }) =>
  iconRight &&
  css`
    label: input--icon-right;
    padding-right: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

/**
 * Renders inputs that have an icon overlay. Takes the icon(s) as a render prop.
 */
const IconInput = ({ children, iconLeft, iconRight, theme, ...props }) => {
  const iconLeftClassName = cx(
    iconBaseStyles({ theme }),
    iconLeftStyles({ theme })
  );

  const iconRightClassName = cx(
    iconBaseStyles({ theme }),
    iconRightStyles({ theme })
  );

  const inputClassName = cx(
    inputLeftStyles({ theme, iconLeft: !!iconLeft }),
    inputRightStyles({ theme, iconRight: !!iconRight })
  );

  return (
    <Input {...props} className={inputClassName}>
      {iconLeft && iconLeft({ className: iconLeftClassName })}
      {children}
      {iconRight && iconRight({ className: iconRightClassName })}
    </Input>
  );
};

IconInput.propTypes = {
  theme: themePropType.isRequired,
  children: childrenPropType,
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  iconLeft: PropTypes.func,
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  iconRight: PropTypes.func
};

IconInput.defaultProps = {
  children: null,
  iconLeft: null,
  iconRight: null
};

/**
 * @component
 */
export default withTheme(IconInput);
