/**
 * Copyright 2024, SumUp Ltd.
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

import type { DatePart } from '../DateInputService.js';
import type { PlainDateState } from '../hooks/usePlainDateState.js';
import classes from '../DateInput.module.css';

import { DateSegment, type DateSegmentProps } from './DateSegment.js';

export interface PlainDateSegmentsProps
  extends Pick<
    DateSegmentProps,
    | 'focus'
    | 'required'
    | 'invalid'
    | 'disabled'
    | 'readOnly'
    | 'aria-describedby'
  > {
  parts: DatePart[];
  state: PlainDateState;
  yearInputLabel: string;
  monthInputLabel: string;
  dayInputLabel: string;
  autoComplete?: 'bday';
}

export function PlainDateSegments({
  parts,
  state,
  yearInputLabel,
  monthInputLabel,
  dayInputLabel,
  'aria-describedby': descriptionId,
  autoComplete,
  ...props
}: PlainDateSegmentsProps) {
  return parts.map((part, index) => {
    switch (part.type) {
      case 'year':
        return (
          <DateSegment
            key={part.type}
            aria-label={yearInputLabel}
            // Only associate the first segment with the validation hint to reduce verbosity
            aria-describedby={index === 0 ? descriptionId : undefined}
            autoComplete={autoComplete === 'bday' ? 'bday-year' : undefined}
            {...props}
            {...state.props.year}
          />
        );
      case 'month':
        return (
          <DateSegment
            key={part.type}
            aria-label={monthInputLabel}
            aria-describedby={index === 0 ? descriptionId : undefined}
            autoComplete={autoComplete === 'bday' ? 'bday-month' : undefined}
            {...props}
            {...state.props.month}
          />
        );
      case 'day':
        return (
          <DateSegment
            key={part.type}
            aria-label={dayInputLabel}
            aria-describedby={index === 0 ? descriptionId : undefined}
            autoComplete={autoComplete === 'bday' ? 'bday-day' : undefined}
            {...props}
            {...state.props.day}
          />
        );
      case 'literal':
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: The order of the literals is static
            key={part.type + index}
            className={classes.literal}
            aria-hidden="true"
          >
            {part.value}
          </div>
        );
      default:
        return null;
    }
  });
}
