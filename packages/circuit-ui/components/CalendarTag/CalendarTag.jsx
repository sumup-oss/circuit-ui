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
import { START_DATE } from 'react-dates/constants';

import { RangePickerController } from '../Calendar';
import Tag from '../Tag';

const CalendarWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

function toDate(date) {
  return date ? date.format('MMM DD') : '';
}

class CalendarTag extends Component {
  static propTypes = {
    /**
     * Callback to receive the set of dates when the user selects them.
     */
    onDatesRangeChange: PropTypes.func.isRequired,
    /**
     * Function that's called when the date tag is clicked.
     */
    onClick: PropTypes.func,
  };

  state = { startDate: null, endDate: null, focusedInput: null };

  tagRef = null; // eslint-disable-line react/sort-comp

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });

    if (startDate && endDate) {
      this.props.onDatesRangeChange({ startDate, endDate });
    }
  };

  handleFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

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

  render() {
    const { onDatesRangeChange, ...props } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const isOpen = focusedInput !== null;

    return (
      <div {...props}>
        <Tag
          selected={isOpen}
          ref={this.handleTagRef}
          onClick={this.handleTagClick}
        >
          {this.getDateRangePreview()}
        </Tag>
        {isOpen && (
          <CalendarWrap>
            <RangePickerController
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

/**
 * @component
 */
export default CalendarTag;
