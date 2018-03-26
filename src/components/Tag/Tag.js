import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { eitherOrPropType } from '../../util/shared-prop-types';
import { textMega } from '../../styles/style-helpers';
import DefaultCloseButton from '../CloseButton';

const closeButtonStyles = ({ theme }) => css`
  label: tag__close-button;
  margin-left: ${theme.spacings.kilo};
  vertical-align: -1px;
`;

const closeButtonSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag__close-button--selected;

    > svg {
      fill: ${theme.colors.white};
    }
  `;

const CloseButton = styled(DefaultCloseButton)(
  closeButtonStyles,
  closeButtonSelectedStyles
);

const tagStyles = ({ theme }) => css`
  label: tag;
  padding: ${theme.spacings.bit} ${theme.spacings.kilo};
  border-radius: ${theme.borderRadius.mega};
  border: 1px solid ${theme.colors.n300};
  ${textMega({ theme })};
  cursor: default;
`;

const tagSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag--selected;
    background-color: ${theme.colors.p500};
    color: ${theme.colors.white};
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

const iconStyles = ({ theme }) => css`
  label: tag__icon;
  vertical-align: -2px;
  margin-right: ${theme.spacings.bit};
`;

const iconSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag__icon--selected;

    > svg {
      fill: ${theme.colors.white};
    }
  `;

const IconContainer = styled('span')`
  ${iconStyles} ${iconSelectedStyles};
`;
const TagElement = styled('span')`
  ${tagStyles}
  ${tagSelectedStyles}
  ${tagClickableStyles}
`;

/**
 * Tag component
 */
const Tag = ({ children, icon, onRemove, selected, ...props }) => (
  <TagElement {...{ selected, ...props }}>
    {!onRemove &&
      icon && <IconContainer {...{ selected }}>{icon}</IconContainer>}
    {children}
    {onRemove && <CloseButton {...{ onClick: onRemove, selected }} />}
  </TagElement>
);

Tag.propTypes = {
  /**
   * The content of the tag.
   */
  children: PropTypes.node,
  /**
   * An optional  tag's icon.
   */
  icon: eitherOrPropType('icon', 'onRemove', PropTypes.element),
  /**
   * Renders a close button inside the tag and calls the provided function
   * when the button is clicked.
   */
  onRemove: eitherOrPropType('icon', 'onRemove', PropTypes.func),
  /**
   * Triggers selected styles on the tag.
   */
  selected: PropTypes.bool
};

Tag.defaultProps = {
  children: null,
  icon: null,
  onRemove: null,
  selected: false
};

/**
 * @component
 */
export default Tag;
