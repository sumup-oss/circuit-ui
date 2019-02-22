import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as knobs from '@storybook/addon-knobs/react';
import { range } from '../../util/fp';

import withTests from '../../util/withTests';
import Tabs from '.';
import Tab from './components/Tab';

const sizeMap = {
  desktop: '80px',
  mobile: '64px'
};

const StyledTabs = styled(Tabs)`
  height: ${props => console.log(props) || sizeMap[props.size]};
  padding: 0 ${props => (props.extraPadding ? '16px' : 0)};
  color: #090909;
`;

class TabsStory extends Component {
  state = { selected: 0 };

  render() {
    const { size, extraPadding, stretched } = this.props;
    const { selected } = this.state;

    return (
      <StyledTabs stretched={stretched} size={size} extraPadding={extraPadding}>
        {[
          ...range(0, 3).map(i => (
            <Tab
              key={i}
              selected={i === selected}
              onClick={() => this.setState({ selected: i })}
            >
              Tab #{i + 1}
            </Tab>
          )),
          <Tab
            key={3}
            as="a"
            href="https://www.google.com"
            target="_blank"
            onClick={() => {}}
          >
            Tab Link
          </Tab>
        ]}
      </StyledTabs>
    );
  }
}

TabsStory.propTypes = {
  size: PropTypes.string.isRequired,
  extraPadding: PropTypes.bool.isRequired,
  stretched: PropTypes.bool.isRequired
};

storiesOf('Tabs', module)
  .addDecorator(withTests('Tabs'))
  .add(
    'Tabs',
    withInfo()(() => (
      <div style={{ width: '600px' }}>
        <TabsStory
          size={knobs.select(
            'with external CSS: size',
            ['desktop', 'mobile'],
            'desktop'
          )}
          extraPadding={knobs.boolean(
            'with external CSS: extra padding',
            false
          )}
          stretched={knobs.boolean('stretched', false)}
        />
      </div>
    ))
  );
