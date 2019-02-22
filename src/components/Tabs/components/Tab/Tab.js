import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import Element from '../../../Element';

const defaultTabStyles = ({ theme }) => css`
  label: tab;
  padding: ${theme.spacings.kilo} ${theme.spacings.tera};
  color: ${theme.colors.n500};
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border: none;

  white-space: nowrap;
  height: 100%;
  align-items: center;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  outline: none;
`;

const selectedTabStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: tab--selected;
    color: initial !important;
    position: relative;

    ::after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: ${theme.spacings.bit};
      background: ${theme.colors.p500};
    }
  `;

/**
 * Tab component that represents a single tab inside a Tabs wrapper
 */
const Tab = styled(({ selected, ...props }) => (
  <Element {...props} aria-selected={selected} role="tab" />
))(defaultTabStyles, selectedTabStyles);

Tab.propTypes = {
  /**
   * className prop passed
   */
  className: PropTypes.string,
  /**
   * Triggers selected styles of the component
   */
  selected: PropTypes.bool,
  /**
   * The HTML element or React component to render.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Tab.defaultProps = {
  as: 'button',
  role: 'tab',
  selected: false
};

/**
 * @component
 */
export default Tab;
