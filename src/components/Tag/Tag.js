import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';

import { eitherOrPropType } from '../../util/shared-prop-types';
import { textMega, shadowBorder } from '../../styles/style-helpers';
import DefaultCloseButton from '../CloseButton';

const closeButtonStyles = ({ theme }) => css`
  label: tag__close-button;
  margin-left: ${theme.spacings.kilo};
  vertical-align: middle;
`;

const closeButtonSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag__close-button--selected;

    > svg {
      fill: ${theme.colors.white};
      vertical-align: inherit;
    }
  `;

const CloseButton = styled(DefaultCloseButton)(
  closeButtonStyles,
  closeButtonSelectedStyles
);

const tagStyles = ({ theme }) => css`
  label: tag;
  border-radius: ${theme.borderRadius.mega};

  ${textMega({ theme })};
  ${shadowBorder(theme.colors.n300)};
  padding: ${theme.spacings.bit} ${theme.spacings.kilo};
  cursor: default;
  display: inline-block;
`;

const tagSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag--selected;
    background-color: ${theme.colors.p500};
    ${shadowBorder(theme.colors.p500)};
    color: ${theme.colors.white};
  `;

const tagClickableStyles = ({ onClick, theme }) =>
  onClick &&
  css`
    label: tag--clickable;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.n300};
      ${shadowBorder(theme.colors.n300)};
    }
  `;

const iconStyles = ({ theme }) => css`
  label: tag__icon;
  margin-right: ${theme.spacings.bit};
  display: inline-block;
  width: ${theme.spacings.mega};
  height: ${theme.spacings.mega};
  vertical-align: middle;

  > svg {
    vertical-align: top;
  }
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
  ${tagStyles};
  ${tagSelectedStyles};
  ${tagClickableStyles};
`;

/**
 * Tag component
 */
const Tag = ({
  children,
  icon,
  onRemove,
  labelRemoveButton,
  selected,
  ...props
}) => (
  <TagElement {...{ selected, ...props }}>
    {!onRemove && icon && (
      <IconContainer {...{ selected }}>{icon}</IconContainer>
    )}
    {children}
    {onRemove && (
      <CloseButton
        onClick={onRemove}
        selected={selected}
        label={labelRemoveButton}
      />
    )}
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
   * Text label for the remove icon for screen readers.
   * Important for accessibility.
   */
  labelRemoveButton: PropTypes.string,
  /**
   * Triggers selected styles on the tag.
   */
  selected: PropTypes.bool
};

Tag.defaultProps = {
  children: null,
  icon: null,
  onRemove: null,
  selected: false,
  labelRemoveButton: 'remove'
};

/**
 * @component
 */
export default Tag;
