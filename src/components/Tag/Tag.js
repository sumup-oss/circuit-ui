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

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import {
  eitherOrPropType,
  childrenPropType,
  deprecatedPropType
} from '../../util/shared-prop-types';
import { textMega, shadowBorder } from '../../styles/style-helpers';
import CloseButton from '../CloseButton';

const tagStyles = ({ theme }) => css`
  label: tag;
  display: inline-flex;
  align-items: center;
  border-radius: ${theme.borderRadius.mega};
  ${textMega({ theme })};
  ${shadowBorder(theme.colors.n300)};
  padding: ${theme.spacings.bit} ${theme.spacings.kilo};
  cursor: default;
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

const tagSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag--selected;
    background-color: ${theme.colors.p500};
    ${shadowBorder(theme.colors.p500)};
    color: ${theme.colors.white};
  `;

const tagSelectedClickableStyles = ({ selected, onClick, theme }) =>
  selected &&
  onClick &&
  css`
    label: tag--selected--clickable;
    &:hover {
      background-color: ${theme.colors.p500};
      ${shadowBorder(theme.colors.p500)};
    }
  `;

const iconStyles = ({ theme }) => css`
  label: tag__icon;
  display: flex;
  align-items: center;
  width: ${theme.spacings.mega};
  height: ${theme.spacings.mega};
`;

const iconSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: tag__icon--selected;

    > svg {
      fill: ${theme.colors.white};
    }
  `;

const prefixIconStyles = ({ theme, hasPrefix }) =>
  hasPrefix &&
  css`
    label: tag__icon--prefix;
    margin-right: ${theme.spacings.byte};
  `;

const suffixIconStyles = ({ theme }) =>
  css`
    label: tag__icon--suffix;
    margin-left: ${theme.spacings.byte};
  `;

const prefixStyles = ({ theme, selected }) => css`
  ${iconStyles({ theme })}
  ${iconSelectedStyles({ theme, selected })}
  ${prefixIconStyles({ theme, hasPrefix: true })}
`;

const suffixStyles = ({ theme, selected }) => css`
  ${iconStyles({ theme })}
  ${iconSelectedStyles({ theme, selected })}
  ${suffixIconStyles({ theme })}
`;

const IconContainer = styled('div')`
  ${iconStyles};
  ${iconSelectedStyles};
  ${prefixIconStyles};
`;

const TagElement = styled('div')`
  ${tagStyles};
  ${tagClickableStyles};
  ${tagSelectedStyles};
  ${tagSelectedClickableStyles};
`;

/**
 * Tag component
 */
const Tag = ({
  children,
  icon,
  renderPrefix: RenderPrefix,
  renderSuffix: RenderSuffix,
  onRemove,
  labelRemoveButton,
  selected,
  ...props
}) => {
  const prefix = RenderPrefix && (
    <RenderPrefix css={theme => prefixStyles({ theme, selected })} />
  );
  const suffix = RenderSuffix && (
    <RenderSuffix css={theme => suffixStyles({ theme, selected })} />
  );

  return (
    <TagElement {...{ selected, ...props }}>
      {!onRemove && icon && (
        <IconContainer hasPrefix {...{ selected }}>
          {icon}
        </IconContainer>
      )}

      {!icon && !onRemove && prefix}

      {children}

      {onRemove && (
        <CloseButton
          label={labelRemoveButton}
          data-testid="tag-close"
          onClick={onRemove}
        />
      )}

      {!onRemove && suffix}
    </TagElement>
  );
};

Tag.propTypes = {
  /**
   * The content of the tag.
   */
  children: childrenPropType,
  /**
   * @deprecated
   * An optional  tag's icon.
   */
  icon: deprecatedPropType(
    eitherOrPropType('icon', 'onRemove', PropTypes.element),
    'The icon prop has been deprecated in favour of the renderPrefix prop.'
  ),
  /**
   * Render prop that should render a left-aligned icon or element.
   */
  renderPrefix: eitherOrPropType('renderPrefix', 'onRemove', PropTypes.func),
  /**
   * Render prop that should render a right-aligned icon or element.
   */
  renderSuffix: eitherOrPropType('renderSuffix', 'onRemove', PropTypes.func),
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
  renderPrefix: null,
  renderSuffix: null,
  onRemove: null,
  selected: false,
  labelRemoveButton: 'remove'
};

/**
 * @component
 */
export default Tag;
