import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { childrenPropType } from '../../util/shared-prop-types';
import HtmlElement from '../HtmlElement';
import { textMega, textKilo, textGiga } from '../../styles/style-helpers';
import { sizes } from '../../styles/constants';

const { BIT, BYTE, KILO, MEGA, GIGA } = sizes;

const baseStyles = ({ theme }) => css`
  label: list;
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

const sizeStyles = ({ theme, size }) => {
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

// TODO: refactor with Emotion 10 as prop
// eslint-disable-next-line react/prop-types
const ListElement = ({ ordered, ...otherProps }) => (
  <HtmlElement
    blacklist={{ size: true, noMargin: true }}
    element={ordered ? 'ol' : 'ul'}
    {...otherProps}
  />
);

/**
 * A list, which can be ordered or unordered
 */
const List = styled(ListElement)`
  ${baseStyles};
  ${sizeStyles};
  ${marginStyles};
`;

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
