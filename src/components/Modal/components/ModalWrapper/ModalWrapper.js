import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import Card from '../../../Card';

const baseStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.untilKilo} {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: initial;
    position: relative;
  }
`;

const Wrapper = styled(Card)`
  ${baseStyles};
`;

Wrapper.defaultProps = Card.defaultProps;

const ModalWrapper = ({ ...props }) => (
  <Wrapper shadow={Card.TRIPLE} {...props} />
);

ModalWrapper.propTypes = {
  /*
   * Modal content
   */
  children: PropTypes.node.isRequired
};

/**
 * @component
 */
export default withTheme(ModalWrapper);
