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
import { includes, isString, isEmpty } from 'lodash/fp';

import SearchInput from '../SearchInput';
import CloseButton from '../CloseButton';
import Card from '../Card';
import { textMega } from '../../styles/style-helpers';
import {
  childrenPropType,
  deprecatedPropType
} from '../../util/shared-prop-types';

const MIN_INPUT_LENGTH = 2;

const autoCompleteWrapperStyles = ({ theme }) => css`
  label: input__container;
  position: relative;
  min-width: 150px;

  label > &,
  label + & {
    margin-top: ${theme.spacings.bit};
  }
`;

const AutoCompleteWrapper = styled('div')(autoCompleteWrapperStyles);

const ClearButton = styled(CloseButton)`
  label: input__button-clear;
  pointer-events: all !important;
`;

const baseOptionsWrapperStyles = ({ theme }) => css`
  position: relative;
  height: 0px;
  overflow: visible;
  margin-top: ${theme.spacings.bit};
  z-index: ${theme.zIndex.popover};
`;

const OptionsWrapper = styled('div')(baseOptionsWrapperStyles);

const optionsBaseStyles = ({ theme }) => css`
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Options = styled(Card)(optionsBaseStyles);

Options.defaultProps = Card.defaultProps;

const optionBaseStyles = ({ theme }) => css`
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

const optionHighlight = ({ selected, theme }) =>
  selected &&
  css`
    color: ${theme.colors.p500};
  `;

const Option = styled('div')(optionBaseStyles, optionHighlight);

const defaultFilterOptions = (options, inputValue) => {
  if (!inputValue || inputValue.length < MIN_INPUT_LENGTH) {
    return options;
  }
  return options.filter(option => {
    const value = isString(option) ? option : option.value;
    return includes(inputValue.toLowerCase(), value.toLowerCase());
  });
};

const optionsPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      children: childrenPropType
    })
  ])
);

/**
 * Basic AutoCompleteInput input with styled suggestions list
 */
export default class AutoCompleteInput extends Component {
  static propTypes = {
    /**
     * A collection of options that can be selected. An option can be a string
     * or an object with a `value` and an optional `children` property.
     * Additional properties are spread on the option element.
     */
    options: optionsPropType.isRequired,
    /**
     * Callback function that is called when the user selects a value
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Callback function that is called as the user is typing
     */
    onInputValueChange: PropTypes.func,
    /**
     * A function that receives all items and the current input value
     * and returns the filtered items.
     */
    filterOptions: PropTypes.func,
    /**
     * The maximum number of suggestions to show to the user
     */
    maxNumberOfOptions: PropTypes.number,
    /**
     * Whether to clean the input after a value is selected
     */
    clearOnSelect: PropTypes.bool,
    /**
     * Whether to show a button that clears the selection when clicked
     */
    showClear: PropTypes.bool,
    /**
     * @deprecated
     */
    items: deprecatedPropType(
      optionsPropType,
      [
        'The "items" prop has been deprecated.',
        `Use the "options" prop instead.`
      ].join(' ')
    )
  };

  static defaultProps = {
    filterOptions: defaultFilterOptions,
    maxNumberOfOptions: 7,
    clearOnSelect: false,
    showClear: false
  };

  handleChange = value => {
    const { clearOnSelect, onChange } = this.props;

    if (value) {
      onChange(value);

      if (clearOnSelect) {
        this.handleClear();
      }
    }
  };

  handleClear = () => {
    if (this.downshiftRef) {
      this.downshiftRef.clearSelection();
    }
  };

  handleDownShiftRef = ref => {
    this.downshiftRef = ref;
  };

  render() {
    const {
      items,
      options = items,
      onChange,
      clearOnSelect,
      onInputValueChange,
      filterOptions,
      maxNumberOfOptions,
      showClear,
      ...inputProps
    } = this.props;

    const renderSuffix = props =>
      showClear ? <ClearButton {...props} onClick={this.handleClear} /> : null;

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
          const filteredOptions = filterOptions(options, inputValue);
          const maxOptions = filteredOptions.slice(0, maxNumberOfOptions);

          return (
            <AutoCompleteWrapper {...getRootProps({ refKey: 'innerRef' })}>
              <SearchInput
                {...getInputProps(inputProps)}
                noMargin
                renderSuffix={renderSuffix}
              />
              {isOpen && !isEmpty(maxOptions) && (
                <OptionsWrapper>
                  <Options spacing={Card.MEGA}>
                    {maxOptions.map((option, index) => {
                      const item = isString(option)
                        ? { value: option }
                        : option;
                      const { value, children = value, ...rest } = item;
                      return (
                        <Option
                          {...getItemProps({ item: value })}
                          key={value}
                          selected={index === highlightedIndex}
                          {...rest}
                        >
                          {children}
                        </Option>
                      );
                    })}
                  </Options>
                </OptionsWrapper>
              )}
            </AutoCompleteWrapper>
          );
        }}
      </Downshift>
    );
  }
}
