import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Popover from './Popover';
import Button from '../Button';

const positions = [Popover.TOP, Popover.BOTTOM, Popover.LEFT, Popover.RIGHT];
const alignments = [Popover.START, Popover.END, Popover.CENTER];

class PopoverContainer extends Component {
  state = { isOpen: false };

  render() {
    const { closeOnButtonClick, ...restProps } = this.props;

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
            Popover Content
          </div>
        )}
        renderReference={({ isOpen }) => (
          <Button
            primary={isOpen}
            size={Button.KILO}
            onClick={() => this.setState({ isOpen: true })}
          >
            Button
          </Button>
        )}
        onButtonClose={() =>
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
  .addDecorator(withTests('Popover'))
  .add(
    'Default Popover',
    withInfo()(() => (
      <div>
        <PopoverContainer
          position={select('position', positions, Popover.BOTTOM)}
          align={select('align', alignments, Popover.START)}
          closeOnButtonClick={boolean('closeOnButton', false)}
        />
      </div>
    ))
  );
