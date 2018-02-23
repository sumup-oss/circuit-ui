import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'react-emotion';
import { size } from 'polished';
import Input from '../Input';

import { themePropType } from '../../util/shared-prop-types';

const LEFT = 'left';
const RIGHT = 'right';

const iconBaseStyles = ({ theme }) => css`
  label: icon-input__icon;
  position: absolute;
  ${size(theme.spacings.mega)};
  top: 50%;
  transform: translateY(-50%);
`;

const iconLeftStyles = ({ theme, iconPosition }) =>
  iconPosition === LEFT &&
  css`
    label: icon-input__icon--left;
    left: ${theme.spacings.kilo};
    right: auto;
  `;

const iconRightStyles = ({ theme, iconPosition }) =>
  iconPosition === RIGHT &&
  css`
    label: icon-input__icon--right;
    right: ${theme.spacings.kilo};
    left: auto;
  `;

const inputLeftStyles = ({ theme, iconPosition }) =>
  iconPosition === LEFT &&
  css`
    label: icon-input__input--left;
    padding-left: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const inputRightStyles = ({ theme, iconPosition }) =>
  iconPosition === RIGHT &&
  css`
    label: icon-input__input--right;
    padding-right: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

/**
 * Renders inputs or selects that have an icon overlay. Takes the icon as a
 * render prop.
 */
const IconInput = ({ children, iconPosition, theme, ...props }) => {
  const iconClassName = cx(
    iconBaseStyles({ theme }),
    iconLeftStyles({ theme, iconPosition }),
    iconRightStyles({ theme, iconPosition })
  );

  const inputClassName = cx(
    inputLeftStyles({ theme, iconPosition }),
    inputRightStyles({ theme, iconPosition })
  );

  return (
    <Input {...props} className={inputClassName}>
      {children({ className: iconClassName })}
    </Input>
  );
};

IconInput.LEFT = LEFT;
IconInput.RIGHT = RIGHT;

IconInput.propTypes = {
  theme: themePropType.isRequired,
  /**
-   * Render prop that should render the overlay icon or element.
-   * Receives a className prop. The className positions the icon according to
    * the iconPosition prop.
-   */
  children: PropTypes.func.isRequired,
  /**
   * Position the icon render prop should show. Affects the
   * className passed to the render prop.
   */
  iconPosition: PropTypes.oneOf([IconInput.LEFT, IconInput.RIGHT])
};

IconInput.defaultProps = {
  iconPosition: IconInput.LEFT
};

/**
 * @component
 */
export default IconInput;
