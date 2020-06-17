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

import { START_DATE } from 'react-dates/constants';

import { RangePickerController } from '../Calendar';
import Tag from '../Tag';

const CalendarWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacings.byte};
`;

class CalendarTag extends Component {
  static propTypes = {
    /**
     * Callback to receive the set of dates when the user selects them.
     */
    onDatesRangeChange: PropTypes.func.isRequired,
    /**
     * Data that is dispatched with the tracking event.
     */
    tracking: PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.string,
      customParameters: PropTypes.object
    })
  };

  state = { startDate: null, endDate: null, focusedInput: null };

  buttonRef = null; // eslint-disable-line react/sort-comp

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });

    if (startDate && endDate) {
      this.props.onDatesRangeChange({ startDate, endDate });
    }
  };

  handleFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  handleButtonClick = () =>
    this.setState(({ focusedInput }) => ({
      focusedInput: focusedInput !== null ? null : START_DATE
    }));

  getDateRangePreview = () => {
    const { startDate, endDate } = this.state;

    if (!startDate && !endDate) {
      return 'Dates';
    }

    return `${this.toDate(startDate)} - ${this.toDate(endDate)}`;
  };

  toDate = date => (date ? date.format('MMM DD') : '');

  handleButtonRef = ref => {
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

  render() {
    const { onDatesRangeChange, tracking, ...props } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const { label, component = 'calendar-tag', customParameters } =
      tracking || {};
    const isOpen = focusedInput !== null;

    return (
      <div {...props}>
        <Tag
          selected={isOpen}
          ref={this.handleButtonRef}
          onClick={this.handleButtonClick}
          tracking={{
            label,
            component,
            customParameters
          }}
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
