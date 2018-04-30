import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { START_DATE, END_DATE } from 'react-dates/constants';

import { RangePickerController } from '../Calendar';
import Button from '../Button';
import { textKilo } from '../../styles/style-helpers';

class CalendarButton extends Component {
  state = { startDate: null, endDate: null, focusedInput: null };
  buttonRef = null;

  _onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });

    this._onFocusChange(endDate ? START_DATE : END_DATE);
  };

  _onFocusChange = focusedInput => this.setState({ focusedInput });

  _onClear = () =>
    this.setState({ startDate: null, endDate: null, focusedInput: null });

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

  _handleConfirm = () => {
    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      return;
    }

    this.props.onDatesRangeChange({ startDate, endDate });
    this._onFocusChange(null);
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;
    const isFilled = !!(startDate && endDate);

    return (
      <CalendarButtonWrap>
        <Button
          primary={isOpen || isFilled}
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
              onOutsideClick={this._onOutsideClick}
              numberOfMonths={2}
              calendarInfoPosition="bottom"
              renderCalendarInfo={() => (
                <CalendarInfo>
                  <InfoButton onClick={this._onClear}>Clear</InfoButton>
                  <InfoButton primary onClick={this._handleConfirm}>
                    Apply
                  </InfoButton>
                </CalendarInfo>
              )}
            />
          </CalendarWrap>
        )}
      </CalendarButtonWrap>
    );
  }
}

const calendarInfoBase = () => css`
  text-align: right;
  margin: 0 23px 0; /* based on react dates */
  padding: 0 0 10px 0;
`;

const CalendarInfo = styled('div')(calendarInfoBase);

const buttonBase = ({ theme, primary }) => css`
  border: none;
  background: none;

  ${textKilo({ theme })};
  margin-left: ${theme.spacings.kilo}};
  cursor: pointer;
  color: ${primary ? theme.colors.b500 : theme.colors.n900};
`;

const InfoButton = styled('span')(buttonBase);

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
