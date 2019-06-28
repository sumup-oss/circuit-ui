/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import SubNavList from '../SubNavList';
import NavLabel from '../NavLabel';
import hasSelectedChild from '../NavItem/utils';
import { childrenPropType } from '../../../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: nav-aggregator;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  margin: ${theme.spacings.mega};
  padding: ${theme.spacings.bit};
  cursor: pointer;
  color: ${theme.colors.n500};
  fill: ${theme.colors.n500};
`;

const hoverStyles = ({ theme, selected }) =>
  !selected &&
  css`
    label: nav-aggregator--hover;
    &:hover {
      color: ${theme.colors.n300};
      fill: ${theme.colors.n300};
    }
  `;

const selectedStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: nav-aggregator--active;
    color: ${theme.colors.n100};
  `;

const AggregatorContainer = styled.div(baseStyles, hoverStyles, selectedStyles);

class Aggregator extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { children } = this.props;
    const shouldClose =
      (hasSelectedChild(prevProps.children) || prevState.open) &&
      !hasSelectedChild(children);

    if (shouldClose) {
      this.closeAggregator();
    }
  }

  closeAggregator = () => {
    this.setState({ open: false });
  };

  toggleAggregator = () => {
    const { onClick } = this.props;

    this.setState(prevState => ({ open: !prevState.open }));
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { children, label, defaultIcon, selectedIcon } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <AggregatorContainer
          selected={hasSelectedChild(children)}
          onClick={this.toggleAggregator}
        >
          {defaultIcon && selectedIcon && open ? selectedIcon : defaultIcon}
          <NavLabel>{label}</NavLabel>
        </AggregatorContainer>
        {children && <SubNavList visible={open}>{children}</SubNavList>}
      </Fragment>
    );
  }
}

Aggregator.propTypes = {
  /**
   * The children component passed to the NavAggregator
   */
  children: childrenPropType,
  /**
   * The label of NavAggregator
   */
  label: PropTypes.string,
  /**
   * The icon to be shown when the NavAggregator is not selected
   */
  defaultIcon: PropTypes.node,
  /**
   * The icon to be shown when the NavAggregator is selected
   */
  selectedIcon: PropTypes.node,
  /**
   * The onClick method to handle the click event on the NavAggregator
   */
  onClick: PropTypes.func
};

Aggregator.defaultProps = {
  children: null,
  label: '',
  defaultIcon: '',
  selectedIcon: '',
  onClick: null
};

/**
 * @component
 */
export default Aggregator;
