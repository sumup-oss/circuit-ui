import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { themePropType } from '../../util/shared-prop-types';
import { textMega } from '../../styles/style-helpers';
import DefaultCloseButton from '../CloseButton';

const closeButtonStyles = ({ selected, theme }) => css`
  label: tag__close-button;
  margin-left: ${theme.spacings.kilo};
  vertical-align: -1px;

  > svg {
    fill: ${selected && theme.colors.white};
  }
`;

const CloseButton = styled(DefaultCloseButton)(closeButtonStyles);

const tagStyles = ({ selected, theme }) => css`
  label: tag;
  padding: ${theme.spacings.bit} ${theme.spacings.kilo};
  border-radius: ${theme.borderRadius.mega};
  border: 1px solid ${theme.colors.n300};
  background-color: ${selected ? theme.colors.b500 : theme.colors.n100};
  color: ${selected && theme.colors.white};
  ${textMega({ theme })};
  cursor: default;
`;

const tagClickableStyles = ({ onClick, theme }) =>
  onClick &&
  css`
    label: tag--clickable;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.n300};
    }
  `;

const iconStyles = ({ selected, theme }) => css`
  label: tag__icon;
  vertical-align: -2px;
  margin-right: ${theme.spacings.bit};

  > svg {
    fill: ${selected && theme.colors.white};
  }
`;

const IconContainer = styled('span')(iconStyles);
const TagElement = styled('span')(tagStyles, tagClickableStyles);

const allowIcon = (onRemove, icon) => {
  if (onRemove && icon) {
    console.warn("When tag has onRemove prop it doesn't allow icon.");
  }

  return !onRemove && icon;
};

/**
 * Tag component
 */
const Tag = ({ children, icon, onRemove, selected, ...props }) => (
  <TagElement {...{ selected, ...props }}>
    {allowIcon(onRemove, icon) && (
      <IconContainer {...{ selected }}>{icon}</IconContainer>
    )}
    {children}
    {onRemove && <CloseButton {...{ onClick: onRemove, selected }} />}
  </TagElement>
);

Tag.propTypes = {
  /**
   * The tag's text.
   */
  children: PropTypes.node,

  /**
   * The tag's icon.
   * *Cannot be used when onRemove is provided. The icon doesn't appear.*
   */
  icon: PropTypes.element,

  /**
   * onRemove is called when user clicks Close Button.
   * When providing this function a close button appears inside the tag.
   */
  onRemove: PropTypes.func,

  /**
   * Makes the tag selected.
   */
  selected: PropTypes.bool
};

/**
 * @component
 */
export default Tag;
