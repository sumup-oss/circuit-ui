import React, { Component } from 'react';
import styled from 'react-emotion';
import { range } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// import { action } from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs/react';

import withTests from '../../util/withTests';
import List from '.';

const Item = styled(List.Item)`
  min-width: 320px;
`;

class ListContainer extends Component {
  state = { selected: 0 };

  handleClick = selected => () => this.setState({ selected });

  render() {
    const { selected } = this.state;
    const padding = knobs.select(
      'padding',
      [List.Item.KILO, List.Item.MEGA, List.Item.GIGA],
      List.Item.GIGA
    );

    return (
      <List>
        {range(1, 6).map(i => (
          <Item
            key={i}
            selected={selected === i}
            onClick={this.handleClick(i)}
            padding={padding}
          >
            Item #{i}
          </Item>
        ))}
      </List>
    );
  }
}

storiesOf('ListView', module)
  .addDecorator(withTests('ListView'))
  .add('ListView', withInfo()(() => <ListContainer />));
