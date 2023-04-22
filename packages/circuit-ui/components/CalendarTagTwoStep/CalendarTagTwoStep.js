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

import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { START_DATE, END_DATE } from 'react-dates/constants';

import { RangePickerController } from '../Calendar';
import Tag from '../Tag';
import { typography } from '../../styles/style-mixins';

const calendarInfoBase = () => css`
  text-align: right;
  margin: 0 23px 0; /* based on react dates */
  padding: 0 0 10px 0;
`;

const CalendarInfo = styled('div')(calendarInfoBase);

const buttonBase = ({ theme, primary }) => css`
  border: none;
  background: none;

  ${typography('two')(theme)};
  margin-left: ${theme.spacings.kilo}};
  cursor: pointer;
  color: ${primary ? 'var(--cui-fg-accent)' : 'var(--cui-fg-normal'};
`;

const InfoButton = styled('span')(buttonBase);

const CalendarWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

function toDate(date) {
  return date ? date.format('MMM DD') : '';
}

/**
 * Component composed from a <Tag /> and a <RangePickerController /> that has
 * two step process where the user has to click "Apply" to trigger onChange
 */
export default class CalendarTagTwoStep extends Component {
  static propTypes = {
    /**
     * Callback to receive the set of dates when the user confirms them.
     */
    onDatesRangeChange: PropTypes.func.isRequired,

    /**
     * Text for the clear button
     */
    clearText: PropTypes.string,

    /**
     * Text for the confirm button
     */
    confirmText: PropTypes.string,
    /**
     * Function that's called when the date tag is clicked.
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    clearText: 'Clear',
    confirmText: 'Apply',
  };

  state = { startDate: null, endDate: null, focusedInput: null };

  tagRef = null; // eslint-disable-line react/sort-comp

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });

    this.handleFocusChange(endDate ? START_DATE : END_DATE);
  };

  handleFocusChange = (focusedInput) => this.setState({ focusedInput });

  handleClear = () =>
    this.setState({ startDate: null, endDate: null, focusedInput: null });

  handleTagClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    this.setState(({ focusedInput }) => ({
      focusedInput: focusedInput !== null ? null : START_DATE,
    }));
  };

  getDateRangePreview = () => {
    const { startDate, endDate } = this.state;

    if (!startDate && !endDate) {
      return 'Dates';
    }

    return `${toDate(startDate)} - ${toDate(endDate)}`;
  };

  handleTagRef = (ref) => {
    this.tagRef = ref;
  };

  handleOutsideClick = ({ target }) => {
    if (this.tagRef && !this.tagRef.contains(target)) {
      this.handleFocusChange(null);
    }
  };

  handleConfirm = () => {
    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      return;
    }

    this.props.onDatesRangeChange({ startDate, endDate });
    this.handleFocusChange(null);
  };

  render() {
    const { clearText, confirmText, onDatesRangeChange, ...props } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;
    const isFilled = !!(startDate && endDate);

    return (
      <div {...props}>
        <Tag
          selected={isOpen || isFilled}
          ref={this.handleTagRef}
          onClick={this.handleTagClick}
        >
          {this.getDateRangePreview()}
        </Tag>
        {isOpen && (
          <CalendarWrapper>
            <RangePickerController
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.handleDatesChange}
              focusedInput={focusedInput}
              onOutsideClick={this.handleOutsideClick}
              numberOfMonths={2}
              calendarInfoPosition="bottom"
              renderCalendarInfo={() => (
                <CalendarInfo>
                  <InfoButton onClick={this.handleClear}>
                    {clearText}
                  </InfoButton>
                  <InfoButton primary onClick={this.handleConfirm}>
                    {confirmText}
                  </InfoButton>
                </CalendarInfo>
              )}
            />
          </CalendarWrapper>
        )}
      </div>
    );
  }
}
