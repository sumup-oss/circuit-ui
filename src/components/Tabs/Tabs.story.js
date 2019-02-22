import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as knobs from '@storybook/addon-knobs/react';

import withTests from '../../util/withTests';

/*
import TabList from './components/TabList';
import TabPanel from './components/TabPanel';
import Tab from './components/Tab';
*/

import { TabList, TabPanel, Tab } from '../..';

const sizeMap = {
  desktop: '80px',
  mobile: '64px'
};

const StyledTabList = styled(TabList)`
  height: ${props => sizeMap[props.size]};
  padding: 0 ${props => (props.extraPadding ? '16px' : 0)};
  color: #090909;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 12px;
`;

class TabsStory extends Component {
  state = { selected: 0 };

  render() {
    const { size, extraPadding, stretched } = this.props;
    const { selected } = this.state;

    return (
      <Fragment>
        <StyledTabList
          stretched={stretched}
          size={size}
          extraPadding={extraPadding}
        >
          <Tab
            selected={selected === 0}
            onClick={() => this.setState({ selected: 0 })}
          >
            Tab #1
          </Tab>
          <Tab
            selected={selected === 1}
            onClick={() => this.setState({ selected: 1 })}
          >
            Tab #2
          </Tab>
          <Tab
            selected={selected === 2}
            onClick={() => this.setState({ selected: 2 })}
          >
            Tab #3
          </Tab>
          <Tab
            as="a"
            href="https://www.google.com"
            target="_blank"
            onClick={() => {}}
          >
            Tab Link
          </Tab>
        </StyledTabList>
        <StyledTabPanel>TabPanel content</StyledTabPanel>
      </Fragment>
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
