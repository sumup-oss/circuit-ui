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

/** @jsxImportSource @emotion/react */

'use client';

import { Component, createRef } from 'react';
import { css } from '@emotion/react';
import type { Moment } from 'moment';

import type { ClickEvent } from '../../../types/events.js';
import styled from '../../../styles/styled.js';
import { RangePickerController } from '../Calendar/index.js';
import { Tag } from '../../Tag/index.js';
import { ButtonGroup } from '../../ButtonGroup/index.js';
import { END_DATE, START_DATE } from '../Calendar/constants.js';

export interface CalendarTagTwoStepProps {
  /**
   * Callback to receive the set of dates when the user selects them.
   */
  onDatesRangeChange: (range: DateRange) => void;
  /**
   * Function that's called when the date tag is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Label for the clear action
   */
  clearButtonLabel: string;

  /**
   * Label for the confirm action
   */
  confirmButtonLabel: string;
}

type CalendarTagTwoStepState = DateRange & {
  focusedInput: FocusedInput;
};

type CalendarDate = Moment | null;
type DateRange = {
  startDate: CalendarDate;
  endDate: CalendarDate;
};
type FocusedInput = 'startDate' | 'endDate' | null;

const buttonGroupStyles = () => css`
  /* based on react dates */
  padding: 0 23px 18px 0;
`;

const CalendarWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

function toDate(date: CalendarDate) {
  return date ? date.format('MMM DD') : '';
}

/**
 * @legacy
 *
 * Component composed from a <Tag /> and a <RangePickerController /> that has
 * two step process where the user has to click "Apply" to trigger onChange
 */
export class CalendarTagTwoStep extends Component<
  CalendarTagTwoStepProps,
  CalendarTagTwoStepState
> {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  tagRef = createRef<HTMLDivElement & HTMLButtonElement>();

  handleDatesChange = ({ startDate, endDate }: DateRange) => {
    this.setState({ startDate, endDate });

    this.handleFocusChange(endDate ? START_DATE : END_DATE);
  };

  handleFocusChange = (focusedInput: FocusedInput) =>
    this.setState({ focusedInput });

  handleClear = () =>
    this.setState({ startDate: null, endDate: null, focusedInput: null });

  handleTagClick = (event: ClickEvent) => {
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

  handleOutsideClick = ({ target }: MouseEvent) => {
    if (
      this.tagRef.current &&
      !this.tagRef.current.contains(target as HTMLElement)
    ) {
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
    const {
      clearButtonLabel,
      confirmButtonLabel,
      onDatesRangeChange,
      ...props
    } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;
    const isFilled = Boolean(startDate && endDate);

    return (
      <div {...props}>
        <Tag
          selected={isOpen || isFilled}
          ref={this.tagRef}
          onClick={this.handleTagClick}
        >
          {this.getDateRangePreview()}
        </Tag>
        {isOpen && (
          <CalendarWrapper>
            {/* @ts-expect-error This worked before the component was converted to TypeScript */}
            <RangePickerController
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.handleDatesChange}
              onOutsideClick={this.handleOutsideClick}
              numberOfMonths={2}
              calendarInfoPosition="bottom"
              renderCalendarInfo={() => (
                <ButtonGroup
                  css={buttonGroupStyles}
                  align="right"
                  actions={{
                    primary: {
                      size: 's',
                      children: confirmButtonLabel,
                      onClick: this.handleConfirm,
                    },
                    secondary: {
                      size: 's',
                      children: clearButtonLabel,
                      onClick: this.handleClear,
                    },
                  }}
                />
              )}
            />
          </CalendarWrapper>
        )}
      </div>
    );
  }
}
