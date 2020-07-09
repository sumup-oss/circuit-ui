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
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { START_DATE, END_DATE } from 'react-dates/constants';

import { RangePickerController } from '../Calendar';
import Tag from '../Tag';
import { textKilo } from '../../styles/style-helpers';

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

const CalendarWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

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
     * Additional data that is dispatched with the tracking event.
     */
    tracking: PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.string,
      customParameters: PropTypes.object,
    }),
  };

  static defaultProps = {
    clearText: 'Clear',
    confirmText: 'Apply',
    tracking: {},
  };

  state = { startDate: null, endDate: null, focusedInput: null };

  buttonRef = null; // eslint-disable-line react/sort-comp

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });

    this.handleFocusChange(endDate ? START_DATE : END_DATE);
  };

  handleFocusChange = (focusedInput) => this.setState({ focusedInput });

  handleClear = () =>
    this.setState({ startDate: null, endDate: null, focusedInput: null });

  handleButtonClick = () =>
    this.setState(({ focusedInput }) => ({
      focusedInput: focusedInput !== null ? null : START_DATE,
    }));

  getDateRangePreview = () => {
    const { startDate, endDate } = this.state;

    if (!startDate && !endDate) {
      return 'Dates';
    }

    return `${this.toPreviewDate(startDate)} - ${this.toPreviewDate(endDate)}`;
  };

  toPreviewDate = (date) => (date ? date.format('MMM DD') : '');

  handleButtonRef = (ref) => {
    this.buttonRef = ref;
  };

  handleOutsideClick = ({ target }) => {
    if (this.buttonRef) {
      // TODO: May be implement forwardRef after we upgrade to 16.3 or elementRef
      // eslint-disable-next-line react/no-find-dom-node
      const buttonDomNode = findDOMNode(this.buttonRef);

      if (!buttonDomNode.contains(target)) {
        this.handleFocusChange(null);
      }
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
    const {
      clearText,
      confirmText,
      onDatesRangeChange,
      tracking,
      ...props
    } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;
    const isFilled = !!(startDate && endDate);

    return (
      <div {...props}>
        <Tag
          selected={isOpen || isFilled}
          ref={this.handleButtonRef}
          onClick={this.handleButtonClick}
          tracking={{ component: 'calendar-tag-two-step', ...tracking }}
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
