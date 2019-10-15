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
import isPropValid from '@emotion/is-prop-valid';

import { childrenPropType } from '../../util/shared-prop-types';
import { textMega, textKilo, textGiga } from '../../styles/style-helpers';
import { sizes } from '../../styles/constants';

const { BIT, BYTE, KILO, MEGA, GIGA } = sizes;

const baseStyles = ({ theme }) => css`
  label: list;
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

const sizeStyles = ({ theme, size }) => {
  if (!size) {
    return null;
  }
  const settings = {
    [KILO]: {
      marginBottom: theme.spacings[KILO],
      paddingLeft: theme.spacings[KILO],
      marginLeft: theme.spacings[BIT],
      type: textKilo({ theme })
    },
    [MEGA]: {
      marginBottom: theme.spacings[BYTE],
      paddingLeft: theme.spacings[KILO],
      marginLeft: theme.spacings[KILO],
      type: textMega({ theme })
    },
    [GIGA]: {
      marginBottom: theme.spacings[KILO],
      paddingLeft: theme.spacings[MEGA],
      marginLeft: theme.spacings[KILO],
      type: textGiga({ theme })
    }
  };
  const { marginBottom, paddingLeft, marginLeft, type } = settings[size];
  return css`
    label: ${`list--${size}`};
    padding-left: ${paddingLeft};
    ${type};

    li {
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};
    }

    ul,
    ol {
      margin-left: ${marginLeft};
    }
  `;
};

const marginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: text--no-margin;
    margin-bottom: 0;
  `;

const StyledList = styled('ol', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'size'
})`
  ${baseStyles};
  ${sizeStyles};
  ${marginStyles};
`;

/**
 * A list, which can be ordered or unordered
 */
const List = ({ ordered, ...otherProps }) => (
  <StyledList as={ordered ? 'ol' : 'ul'} {...otherProps} />
);

List.KILO = KILO;
List.MEGA = MEGA;
List.GIGA = GIGA;

List.propTypes = {
  /**
   * The <li> elements you want to show as a list
   */
  children: childrenPropType,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf([List.KILO, List.MEGA, List.GIGA]),
  /**
   * Whether the list should be presented as an <ol>
   */
  ordered: PropTypes.bool,
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin: PropTypes.bool
};

List.defaultProps = {
  size: List.KILO,
  ordered: false,
  noMargin: false
};

/**
 * @component
 */
export default List;
