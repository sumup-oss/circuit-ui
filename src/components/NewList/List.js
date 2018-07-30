import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { sizes } from '../../styles/constants';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const List = props => {
  const { children, component: Component, subheader, ...other } = props;

  const StyledComponent = styled(Component)`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    ${({ theme, gutter }) => css`
      padding-left: ${theme.spacings[gutter]};
      padding-right: ${theme.spacings[gutter]};
    `};
  `;

  return (
    <StyledComponent {...other}>
      {subheader}
      {children}
    </StyledComponent>
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
  subheader: PropTypes.node
};

List.defaultProps = {
  children: null,
  component: 'ul',
  subheader: null,
  className: null,
  gutter: List.KILO
};

export default List;
