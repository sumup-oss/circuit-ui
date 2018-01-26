import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { size } from 'polished';

import { themePropType } from '../../util/shared-prop-types';

const containerStyles = css`
  label: icon-input;
  display: inline-block;
  position: relative;
`;

const IconInputContainer = styled('div', { label: 'IconInputContainer' })(
  containerStyles
);

const iconBaseStyles = ({ theme }) => css`
  label: icon-input__icon;
  position: absolute;
  ${size(theme.spacings.mega)};
  top: 50%;
  transform: translateY(-50%);
`;

const iconLeftStyles = ({ theme, iconPosition }) =>
  iconPosition === 'left' &&
  css`
    label: icon-input__icon--left;
    left: ${theme.spacings.kilo};
    right: auto;
  `;

const iconRightStyles = ({ theme, iconPosition }) =>
  iconPosition === 'right' &&
  css`
    label: icon-input__icon--right;
    right: ${theme.spacings.kilo};
    left: auto;
  `;

const iconDisabledStyles = css`
  label: icon-input__icon--disabled;
  opacity: 0.4;
  pointer-events: none;
`;

const inputLeftStyles = ({ theme, iconPosition }) =>
  iconPosition === 'left' &&
  css`
    label: icon-input__input--left;
    padding-left: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const inputRightStyles = ({ theme, iconPosition }) =>
  iconPosition === 'right' &&
  css`
    label: icon-input__input--right;
    padding-right: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

/**
 * Used to wrap inputs or selects that have an icon overlay. Takes two
 * render props (input and icon).
 */
const IconInputWrapper = ({ iconPosition, theme, selector, input, icon }) => {
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
    <IconInputContainer data-selector={selector}>
      {input({ className: inputClassName })}
      {icon({
        className: iconClassName,
        disabledClassName: iconDisabledStyles
      })}
    </IconInputContainer>
  );
};

IconInputWrapper.propTypes = {
  theme: themePropType.isRequired,
  /**
   * Render prop that should render the element receiving an
   * icon overlay (i.e, input or select). Receives a
   * className prop that adds appropriate padding on the
   * side of the icon.
   */
  input: PropTypes.func.isRequired,
  /**
   * Render prop that should render the overlay icon or element.
   * Receives a className and a disabledClassName prop. className
   * positions the icon according to the iconPosition prop.
   * disabledClassName can be used on the icon to update the icon
   * style when the input is disabled.
   */
  icon: PropTypes.func.isRequired,
  selector: PropTypes.string.isRequired,
  /**
   * Position the icon render prop should show. Affects the
   * className passed to the render prop.
   */
  iconPosition: PropTypes.oneOf(['left', 'right'])
};

IconInputWrapper.defaultProps = {
  iconPosition: 'left'
};

/**
 * @component
 */
export default withTheme(IconInputWrapper);
