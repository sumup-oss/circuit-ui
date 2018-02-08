import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { textKilo } from '../../styles/style-helpers';

const CENTER = 'center';
const RIGHT = 'right';
const LEFT = 'left';

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

const arrowAlignsStyles = ({ align, theme }) =>
  ({
    center: css`
      label: tooltip__text-arrow--center;
      &::after {
        left: 50%;
      }
    `,
    right: css`
      label: tooltip__text-arrow--right;
      &::after {
        left: ${theme.spacings.mega};
      }
    `,
    left: css`
      label: tooltip__text-arrow--left;
      &::after {
        right: ${theme.spacings.mega};
      }
    `
  }[align]);

const tooltipTextAlignStyles = ({ align }) =>
  ({
    center: css`
      label: tooltip__text--center;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    `,
    right: css`
      label: tooltip__text--right;
      left: 50%;
    `,
    left: css`
      label: tooltip__text--left;
      right: 50%;
    `
  }[align]);

const tooltipTextStyles = ({ theme }) => css`
  label: tooltip__text;
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
  transition: opacity 0.3s;
  ${textKilo({ theme })};

  &::after {
    content: '';
    position: absolute;
    margin-left: -${theme.spacings.bit};
    border-width: ${theme.spacings.bit};
    border-style: solid;
    border-color: ${theme.colors.black} transparent transparent transparent;
    top: 100%;
  }
`;

const TooltipContainer = styled('span')(
  tooltipTextStyles,
  tooltipTextAlignStyles,
  arrowAlignsStyles
);
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

Tooltip.CENTER = CENTER;
Tooltip.RIGHT = RIGHT;
Tooltip.LEFT = LEFT;

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * The content inside of the tooltip being shown.
   */
  content: PropTypes.node.isRequired,
  /**
   * The alignment of the tooltip.
   * It can be right, left or centered.
   */
  align: PropTypes.oneOf([Tooltip.CENTER, Tooltip.RIGHT, Tooltip.LEFT])
};

Tooltip.defaultProps = {
  align: Tooltip.Center
};

export default Tooltip;
