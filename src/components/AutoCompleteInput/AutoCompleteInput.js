import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Downshift from 'downshift';

import SearchInput from '../SearchInput';
import Card from '../Card';
import { textMega } from '../../styles/style-helpers';
import { KILO } from '../../util/constants';

const AutoCompleteWrapper = styled('div')`
  label: input__container
  position: relative;
  min-width: 150px;
`;

const ItemsWrapper = styled('div')`
  position: relative;
  height: 0px;
  overflow: visible;
  margin-top: ${props => props.theme.spacings.bit};
`;

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
  padding: 0 0 ${theme.spacings.byte} 0;
  margin: 0;
  ${textMega({ theme })};
  &:last-of-type {
    padding-bottom: 0;
  }
`;

const itemHighlight = ({ selected, theme }) =>
  selected &&
  css`
    color: ${theme.colors.b500};
  `;

const Item = styled('div')(itemBaseStyles, itemHighlight);

const filterItems = inputValue => item =>
  !inputValue || item.toLowerCase().includes(inputValue.toLowerCase());

/**
 * Basic AutoCompleteInput input with styled suggestions list
 */
export default class AutoCompleteInput extends Component {
  static propTypes = {
    /**
     * handleChange function that will receive the input
     */
    handleChange: PropTypes.func.isRequired,

    /**
     * If true, will clean the input after a value ie selected
     */
    clearOnSelect: PropTypes.bool,

    /**
     * Array of items (strings) the can be selected
     */
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  static defaultProps = {
    clearOnSelect: false
  };

  _handleChange = value => {
    const { clearOnSelect, handleChange } = this.props;

    if (value) {
      handleChange(value);

      if (clearOnSelect && this._downshiftRef) {
        this._downshiftRef.clearSelection();
      }
    }
  };

  _handleDownShiftRef = ref => {
    this._downshiftRef = ref;
  };

  render() {
    const { items, handleChange, ...inputProps } = this.props;

    return (
      <Downshift ref={this._handleDownShiftRef} onSelect={this._handleChange}>
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          inputValue,
          isOpen,
          highlightedIndex
        }) => {
          const filteredItems = items.filter(filterItems(inputValue));

          return (
            <AutoCompleteWrapper {...getRootProps({ refKey: 'innerRef' })}>
              <SearchInput
                {...getInputProps({ ...inputProps })}
                noMargin
                renderSuffix={() => null}
              />
              {isOpen &&
                !!filteredItems.length && (
                  <ItemsWrapper>
                    <Items spacing={KILO}>
                      {filteredItems.map((item, index) => (
                        <Item
                          {...getItemProps({ item })}
                          key={item}
                          selected={index === highlightedIndex}
                        >
                          {item}
                        </Item>
                      ))}
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
