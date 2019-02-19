import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import HtmlElement from '../../../HtmlElement';

const defaultTabStyles = ({ theme }) => css`
  display: inline-block;
  text-align: center;
  padding: ${theme.spacings.kilo} ${theme.spacings.tera};
  color: ${theme.colors.n500};
  text-decoration: none;
  cursor: pointer;

  white-space: nowrap;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const selectedTabStyles = ({ theme, selected }) =>
  selected &&
  css`
    color: initial !important;
    position: relative;

    ::after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 4px;
      background: ${theme.colors.p500};
    }
  `;

/**
 * Describe Tab here.
 */
const Tab = styled(HtmlElement)(defaultTabStyles, selectedTabStyles);

Tab.propTypes = {
  /**
   * Triggers selected styles of the component
   */
  selected: PropTypes.bool,
  /**
   * The HTML element to render. In case for a React component, use element={() => Element}
   */
  element: PropTypes.string
};

Tab.defaultProps = {};

/**
 * @component
 */
export default Tab;
