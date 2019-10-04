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
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import Popover from './Popover';
import Button from '../Button';

const positions = [Popover.TOP, Popover.BOTTOM, Popover.LEFT, Popover.RIGHT];
const alignments = [Popover.START, Popover.END, Popover.CENTER];

class PopoverContainer extends Component {
  state = { isOpen: false };

  render() {
    const { closeOnButtonClick, ...restProps } = this.props;
    const { isOpen } = this.state;

    return (
      <Popover
        {...this.state}
        {...restProps}
        renderPopover={() => (
          <div
            style={{
              background: '#EEEEEE',
              padding: '10px',
              width: '200px'
            }}
          >
            Popover Content {typeof closeOnButtonClick}
          </div>
        )}
        renderReference={() => (
          <Button
            primary={isOpen}
            size={Button.KILO}
            onClick={() => this.setState({ isOpen: true })}
          >
            Button
          </Button>
        )}
        onReferenceClickClose={() =>
          closeOnButtonClick && this.setState({ isOpen: false })
        }
        onOutsideClickClose={() => this.setState({ isOpen: false })}
      />
    );
  }
}

PopoverContainer.propTypes = {
  closeOnButtonClick: PropTypes.bool.isRequired
};

storiesOf(`${GROUPS.COMPONENTS}|Popover`, module)
  .addParameters({ jest: ['Popover'] })
  .add('Default Popover', () => (
    <div>
      <PopoverContainer
        position={select('position', positions, Popover.BOTTOM)}
        align={select('align', alignments, Popover.START)}
        closeOnButtonClick={boolean('closeOnButton', false)}
      />
    </div>
  ));
