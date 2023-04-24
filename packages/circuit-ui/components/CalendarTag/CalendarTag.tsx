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

import { Component, createRef } from 'react';
import styled from '@emotion/styled';
import type { Moment } from 'moment';

import type { ClickEvent } from '../../types/events.js';
import { RangePickerController } from '../Calendar/index.js';
import Tag from '../Tag/index.js';

export interface CalendarTagProps {
  /**
   * Callback to receive the set of dates when the user selects them.
   */
  onDatesRangeChange: (range: DateRange) => void;
  /**
   * Function that's called when the date tag is clicked.
   */
  onClick?: (event: ClickEvent) => void;
}

type CalendarTagState = DateRange & {
  focusedInput: FocusedInput;
};

type CalendarDate = Moment | null;
type DateRange = {
  startDate: CalendarDate;
  endDate: CalendarDate;
};
type FocusedInput = 'startDate' | 'endDate' | null;

const START_DATE = 'startDate';

const CalendarWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

function toDate(date: CalendarDate) {
  return date ? date.format('MMM DD') : '';
}

export class CalendarTag extends Component<CalendarTagProps, CalendarTagState> {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  tagRef = createRef<HTMLDivElement & HTMLButtonElement>();

  handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: CalendarDate;
    endDate: CalendarDate;
  }) => {
    this.setState({ startDate, endDate });

    if (startDate && endDate) {
      this.props.onDatesRangeChange({ startDate, endDate });
    }
  };

  handleFocusChange = (focusedInput: FocusedInput) => {
    this.setState({ focusedInput });
  };

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

  render() {
    const { onDatesRangeChange, ...props } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;

    return (
      <div {...props}>
        <Tag selected={isOpen} ref={this.tagRef} onClick={this.handleTagClick}>
          {this.getDateRangePreview()}
        </Tag>
        {isOpen && (
          <CalendarWrap>
            <RangePickerController
              initialVisibleMonth={null}
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.handleDatesChange}
              focusedInput={focusedInput}
              onFocusChange={this.handleFocusChange}
              onOutsideClick={this.handleOutsideClick}
            />
          </CalendarWrap>
        )}
      </div>
    );
  }
}
