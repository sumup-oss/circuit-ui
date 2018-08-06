import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import { sizes } from '../../../../styles/constants';
import { themePropType } from '../../../../util/shared-prop-types';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const getListStyles = ({ theme, gutter }) => css`
  /* display: flex;
flex-direction: column;
position: relative;
list-style: none; */
  margin: 0;
  padding: 0;
  padding-left: ${theme.spacings[gutter]};
  padding-right: ${theme.spacings[gutter]};
`;

const List = props => {
  const {
    children,
    component: Component,
    subheader,
    gutter,
    theme,
    ...other
  } = props;

  const listStyles = getListStyles(props);

  return (
    <Component {...other} css={listStyles}>
      {subheader}
      {children}
    </Component>
  );
};

List.BYTE = BYTE;
List.KILO = KILO;
List.MEGA = MEGA;
List.GIGA = GIGA;

List.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  /**
   * The list's gutter
   */
  gutter: PropTypes.oneOf([List.BYTE, List.KILO, List.MEGA, List.GIGA]),
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,
  theme: themePropType.isRequired
};

List.defaultProps = {
  children: null,
  component: 'ul',
  subheader: null,
  className: null,
  gutter: List.KILO
};

export default withTheme(List);
