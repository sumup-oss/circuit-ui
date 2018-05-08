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
  width: 100%;
`;

const ItemsWrapper = styled('div')`
  position: relative;
  height: 0px;
  overflow: visible;
  margin-top: ${props => props.theme.spacings.bit};
`;

const cardBaseStyles = ({ theme }) => css`
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
`;

const Items = styled(Card)`
  position: absolute;
  min-width: unset !important;
  top: 0;
  left: 0;
  right: 0;
  ${cardBaseStyles};
`;

Items.defaultProps = Card.defaultProps;

const itemBaseStyles = ({ theme }) => css`
  cursor: pointer;
  padding: 0 0 ${theme.spacings.byte} 0;
  margin: 0;
  &:last-of-type {
    padding-bottom: 0;
  }
  ${textMega({ theme })};
`;

const itemHighlight = ({ selected, theme }) =>
  selected &&
  css`
    color: ${theme.colors.b500};
  `;

const Item = styled('div')`
  ${itemBaseStyles};
  ${itemHighlight};
`;

const filterItems = inputValue => item =>
  !inputValue || item.toLowerCase().includes(inputValue.toLowerCase());

// const AutoComplete = () => (

class AutoComplete extends Component {
  state = { inputValue: '' };

  _handleStateChange = ({ type, inputValue }) => {
    const resetEvents = [
      Downshift.stateChangeTypes.blurInput,
      Downshift.stateChangeTypes.keyDownEscape
    ];

    if (resetEvents.includes(type)) {
      this.setState({ inputValue: '' });
    } else if (type === Downshift.stateChangeTypes.mouseUp) {
      this.setState({ inputValue: inputValue || '' });
    } else {
      this.setState({ inputValue });
    }
  };

  _handleChange = value => {
    this.props.handleChange(value);
    this.setState({ inputValue: '' });
  };

  _handleOuterClick = () => this.setState({ inputValue: '' });

  render() {
    const { items, handleChange, ...inputProps } = this.props;
    const { inputValue } = this.state;

    return (
      <Downshift
        onSelect={this._handleChange}
        onStateChange={this._handleStateChange}
        onOuterClick={this._handleOuterClick}
        inputValue={inputValue}
      >
        {({
          getRootProps,
          getInputProps,
          getItemProps,
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

/**
 * Describe your component here.
 */
// const Autocomplete = styled('element')(baseStyles);

AutoComplete.propTypes = {
  /**
   * handleChange function that will receive the input
   */
  handleChange: PropTypes.func.isRequired,

  /**
   * A
   */
  // items: PropTypes.arrayOf(PropTypes.object).isRequired
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

AutoComplete.defaultProps = {};

/**
 * @component
 */
export default AutoComplete;
