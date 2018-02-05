import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { typeMarginResets } from '../../styles/global-styles';
import { childrenPropType } from '../../util/shared-prop-types';
import HtmlElement from '../HtmlElement/HtmlElement';
import { textMega, textKilo } from '../../styles/style-helpers';
import { BIT, BYTE, KILO, MEGA } from '../../util/sizes';

const baseStyles = ({ theme }) => css`
  label: list;
  font-weight: ${theme.fontWeight.regular};
  ${typeMarginResets};
`;

const sizeStyles = ({ theme, size }) => {
  const settings = {
    [KILO]: {
      marginBottom: theme.spacings[KILO],
      marginLeft: theme.spacings[BIT],
      type: textKilo({ theme })
    },
    [MEGA]: {
      marginBottom: theme.spacings[BYTE],
      marginLeft: theme.spacings[BIT],
      type: textMega({ theme })
    }
  };
  const { marginBottom, marginLeft, type } = settings[size];
  return css`
    label: list--${size};
    ${type}
    li {
      margin-bottom: ${marginBottom};
      margin-left: ${marginLeft};
    }
    ul {
      margin-left: ${marginLeft};
    }
  `;
};

const ListElement = props => (
  <HtmlElement
    blacklist={['size', 'ordered']}
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
  size: PropTypes.oneOf([KILO, MEGA]),
  /**
   * Whether the list should be presented as an <ol>
   */
  ordered: PropTypes.bool
};

List.defaultProps = {
  size: KILO,
  ordered: false
};

/**
 * @component
 */
export default List;
