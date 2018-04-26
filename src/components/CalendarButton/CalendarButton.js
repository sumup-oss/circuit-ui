import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { START_DATE } from 'react-dates/constants';

import { RangePickerController } from '../Calendar';
import Button from '../Button';

class CalendarButton extends Component {
  state = { startDate: null, endDate: null, focusedInput: null };
  buttonRef = null;

  _onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });

    if (startDate && endDate) {
      this.props.onDatesRangeChange({ startDate, endDate });
    }
  };

  _onFocusChange = focusedInput => this.setState({ focusedInput });

  _onButtonClick = () =>
    this.setState(({ focusedInput }) => ({
      focusedInput: focusedInput !== null ? null : START_DATE
    }));

  _currentSelection = () => {
    const { startDate, endDate } = this.state;

    if (!startDate && !endDate) {
      return 'Dates';
    }

    return `${this._toDate(startDate)} - ${this._toDate(endDate)}`;
  };

  _toDate = date => (date ? date.format('MMM DD') : '');

  _onButtonRef = ref => {
    this.buttonRef = ref;
  };

  _onOutsideClick = ({ target }) => {
    if (this.buttonRef) {
      // TODO: May be implement forwardRef after we upgrade to 16.3 or elementRef
      // eslint-disable-next-line react/no-find-dom-node
      const buttonDomNode = findDOMNode(this.buttonRef);

      if (!buttonDomNode.contains(target)) {
        this._onFocusChange(null);
      }
    }
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;

    return (
      <CalendarButtonWrap>
        <Button
          primary={isOpen}
          ref={this._onButtonRef}
          onClick={this._onButtonClick}
        >
          {this._currentSelection()}
        </Button>
        {isOpen && (
          <CalendarWrap>
            <RangePickerController
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this._onDatesChange}
              focusedInput={focusedInput}
              onFocusChange={this._onFocusChange}
              onOutsideClick={this._onOutsideClick}
            />
          </CalendarWrap>
        )}
      </CalendarButtonWrap>
    );
  }
}

const baseStyles = () => css`
  label: button_calendar;
`;

const CalendarWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

const CalendarButtonWrap = styled('div')`
  ${baseStyles};
`;

/**
 * Describe your component here.
 */

CalendarButton.propTypes = {
  /**
   * Callback to receive the set of dates when the user selects them.
   */
  onDatesRangeChange: PropTypes.func.isRequired
};

CalendarButton.defaultProps = {};

/**
 * @component
 */
export default CalendarButton;
