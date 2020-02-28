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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Downshift from 'downshift';
import { includes, isString } from 'lodash/fp';

import SearchInput from '../SearchInput';
import Card from '../Card';
import { textMega } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';

const MIN_INPUT_FILTER = 2;

const AutoCompleteWrapper = styled('div')`
  label: input__container
  position: relative;
  min-width: 150px;
`;

const baseItemsWrapperStyles = ({ theme }) => css`
  position: relative;
  height: 0px;
  overflow: visible;
  margin-top: ${theme.spacings.bit};
  z-index: ${theme.zIndex.popover};
`;

const ItemsWrapper = styled('div')(baseItemsWrapperStyles);

const itemsBaseStyles = ({ theme }) => css`
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Items = styled(Card)(itemsBaseStyles);

Items.defaultProps = Card.defaultProps;

const itemBaseStyles = ({ theme }) => css`
  cursor: pointer;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  ${textMega({ theme })};
  padding: 0 0 ${theme.spacings.byte} 0;

  &:last-of-type {
    padding-bottom: 0;
  }
`;

const itemHighlight = ({ selected, theme }) =>
  selected &&
  css`
    color: ${theme.colors.p500};
  `;

const Item = styled('div')(itemBaseStyles, itemHighlight);

const filterItems = inputValue => item => {
  const value = isString(item) ? item : item.value;
  return (
    !inputValue ||
    inputValue.length < MIN_INPUT_FILTER ||
    includes(inputValue.toLowerCase(), value.toLowerCase())
  );
};

/**
 * Basic AutoCompleteInput input with styled suggestions list
 */
export default class AutoCompleteInput extends Component {
  static propTypes = {
    /**
     * Callback function that is called when the user selects a value
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Callback function that is called as the user is typing
     */
    onInputValueChange: PropTypes.func,
    /**
     * If true, will clean the input after a value is selected
     */
    clearOnSelect: PropTypes.bool,
    /**
     * Array of items that can be selected. An item can be a string or
     * an object with a children and a value property
     */
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          value: PropTypes.string,
          children: childrenPropType
        })
      ])
    ).isRequired,
    /**
     * The maximum number of suggestions to show to the user
     */
    maxNumberOfItems: PropTypes.number
  };

  static defaultProps = {
    clearOnSelect: false,
    maxNumberOfItems: 7
  };

  handleChange = value => {
    const { clearOnSelect, onChange } = this.props;

    if (value) {
      onChange(value);

      if (clearOnSelect && this.downshiftRef) {
        this.downshiftRef.clearSelection();
      }
    }
  };

  handleDownShiftRef = ref => {
    this.downshiftRef = ref;
  };

  render() {
    const {
      items,
      onChange,
      clearOnSelect,
      onInputValueChange,
      maxNumberOfItems,
      ...inputProps
    } = this.props;

    return (
      <Downshift
        ref={this.handleDownShiftRef}
        onSelect={this.handleChange}
        onInputValueChange={onInputValueChange}
      >
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          inputValue,
          isOpen,
          highlightedIndex
        }) => {
          const filteredItems = items
            .filter(filterItems(inputValue))
            .slice(0, maxNumberOfItems);

          return (
            <AutoCompleteWrapper {...getRootProps({ refKey: 'innerRef' })}>
              <SearchInput
                {...getInputProps({ ...inputProps })}
                noMargin
                renderSuffix={() => null}
              />
              {isOpen && !!filteredItems.length && (
                <ItemsWrapper>
                  <Items spacing={Card.MEGA}>
                    {filteredItems.map((item, index) => {
                      const itemObj = isString(item) ? { value: item } : item;
                      const { value, children = value, ...rest } = itemObj;
                      return (
                        <Item
                          {...getItemProps({ item: value })}
                          key={value}
                          selected={index === highlightedIndex}
                          {...rest}
                        >
                          {children}
                        </Item>
                      );
                    })}
                  </Items>
                </ItemsWrapper>
              )}
            </AutoCompleteWrapper>
          );
        }}
      </Downshift>
    );
  }
}
