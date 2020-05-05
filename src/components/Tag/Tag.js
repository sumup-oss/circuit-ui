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
  childrenPropType
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

const TagElement = styled('div')`
  ${tagStyles};
  ${tagClickableStyles};
  ${tagSelectedStyles};
  ${tagSelectedClickableStyles};
`;

const prefixStyles = ({ theme }) => css`
  label: tag__prefix;
  margin-left: -${theme.spacings.bit};
  margin-right: ${theme.spacings.bit};
`;

const suffixStyles = ({ theme }) => css`
  label: tag__suffix;
  margin-left: ${theme.spacings.bit};
  margin-right: -${theme.spacings.bit};
`;

const closeButtonStyles = () => css`
  label: tag__close-button;
  padding: 0;
`;

const RemoveButton = styled(CloseButton)(suffixStyles, closeButtonStyles);

/**
 * Tag component
 */
const Tag = ({
  children,
  prefix: Prefix,
  suffix: Suffix,
  onRemove,
  labelRemoveButton,
  selected,
  ...props
}) => {
  const prefixElement = Prefix && (
    <Prefix
      selected={selected}
      css={theme => prefixStyles({ theme, selected })}
    />
  );
  const suffixElement = Suffix && (
    <Suffix
      selected={selected}
      css={theme => suffixStyles({ theme, selected })}
    />
  );

  return (
    <TagElement {...{ selected, ...props }}>
      {prefixElement}

      {children}

      {onRemove && (
        <RemoveButton
          variant={selected ? 'primary' : 'secondary'}
          selected={selected}
          label={labelRemoveButton}
          data-testid="tag-close"
          size="kilo"
          onClick={onRemove}
        />
      )}

      {!onRemove && suffixElement}
    </TagElement>
  );
};

Tag.propTypes = {
  /**
   * The content of the tag.
   */
  children: childrenPropType,
  /**
   * Render prop that should render a left-aligned icon or element.
   */
  prefix: PropTypes.func,
  /**
   * Render prop that should render a right-aligned icon or element.
   */
  suffix: eitherOrPropType('suffix', 'onRemove', PropTypes.func),
  /**
   * Renders a close button inside the tag and calls the provided function
   * when the button is clicked.
   */
  onRemove: eitherOrPropType('suffix', 'onRemove', PropTypes.func),
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
  prefix: null,
  suffix: null,
  onRemove: null,
  selected: false,
  labelRemoveButton: 'remove'
};

/**
 * @component
 */
export default Tag;
