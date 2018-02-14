import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { childrenPropType } from '../../util/shared-prop-types';
import HtmlElement from '../HtmlElement/HtmlElement';
import { textMega, textKilo } from '../../styles/style-helpers';
import { sizes } from '../../styles/constants';

const { BIT, BYTE, KILO, MEGA } = sizes;

const baseStyles = ({ theme }) => css`
  label: list;
  font-weight: ${theme.fontWeight.regular};
`;

const sizeStyles = ({ theme, size }) => {
  const settings = {
    [KILO]: {
      marginBottom: theme.spacings[KILO],
      marginLeft: theme.spacings[BIT],
      nestedLeft: theme.spacings[KILO],
      type: textKilo({ theme })
    },
    [MEGA]: {
      marginBottom: theme.spacings[BYTE],
      marginLeft: theme.spacings[BIT],
      nestedLeft: theme.spacings[KILO],
      type: textMega({ theme })
    }
  };
  const { nestedLeft, marginBottom, marginLeft, type } = settings[size];
  return css`
    label: list--${size};
    margin-left: ${marginLeft};
    ${type} li {
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};
    }
    ul,
    ol {
      margin-left: ${nestedLeft};
    }
  `;
};

const ListElement = props => (
  <HtmlElement
    blacklist={{ size: true, ordered: true }}
    element={({ ordered }) => (ordered ? 'ol' : 'ul')}
    {...props}
  />
);

/**
 * A list, which can be ordered or unordered
 */
const List = styled(ListElement)(baseStyles, sizeStyles);

List.KILO = KILO;
List.MEGA = MEGA;

List.propTypes = {
  /**
   * The <li> elements you want to show as a list
   */
  children: childrenPropType,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf([List.KILO, List.MEGA]),
  /**
   * Whether the list should be presented as an <ol>
   */
  ordered: PropTypes.bool
};

List.defaultProps = {
  size: List.KILO,
  ordered: false
};

/**
 * @component
 */
export default List;
