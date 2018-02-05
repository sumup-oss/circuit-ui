import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { textKilo } from '../../styles/style-helpers';

const baseStyles = css`
  label: tooltip;
  position: relative;
  display: inline-block;

  &:hover {
    > span {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const arrowAligns = theme => ({
  center: `left: 50%`,
  right: `left: ${theme.spacings.mega}`,
  left: `right: ${theme.spacings.mega}`
});

const tooltipAlign = {
  center: `
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  `,
  right: 'left: 50%;',
  left: 'right: 50%;'
};

const tooltipTextStyles = ({ align, theme }) => css`
  label: tooltip_text;
  visibility: hidden;
  opacity: 0;
  width: max-content;
  min-width: 60px;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  text-align: center;
  border-radius: ${theme.borderRadius.mega};
  padding: ${theme.spacings.byte};
  position: absolute;
  z-index: 1;
  bottom: 125%;
  ${tooltipAlign[align]};
  transition: opacity 0.3s;
  ${textKilo({ theme })};

  &:after {
    content: '';
    position: absolute;
    margin-left: -${theme.spacings.bit};
    border-width: ${theme.spacings.bit};
    border-style: solid;
    border-color: ${theme.colors.black} transparent transparent transparent;
    top: 100%;
    ${arrowAligns(theme)[align]};
  }
`;

const TooltipContainer = styled('span')(tooltipTextStyles);
const TooltipElement = styled('div')(baseStyles);

/**
 * A Tooltip wrapper in order to show tooltips on top of other
 * components.
 */
const Tooltip = ({ children, content, align, ...props }) => (
  <TooltipElement {...props}>
    <TooltipContainer {...{ align }}>{content}</TooltipContainer>
    {children}
  </TooltipElement>
);

Tooltip.Center = 'center';
Tooltip.Left = 'left';
Tooltip.Right = 'right';

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,

  /**
   * The content inside of the tooltip being shown.
   */
  content: PropTypes.node.isRequired,
  /**
   * The alignment of the tooltip.
   * It can be right, left or centered.
   */
  align: PropTypes.oneOf([Tooltip.Center, Tooltip.Right, Tooltip.Left])
};

Tooltip.defaultProps = {
  align: Tooltip.Center
};

export default Tooltip;
