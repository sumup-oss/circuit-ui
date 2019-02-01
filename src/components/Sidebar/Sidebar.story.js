import React, { Fragment } from 'react';
import { range } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import Sidebar from '.';

storiesOf(`${GROUPS.COMPONENTS}|Sidebar`, module)
  .addDecorator(withTests('Sidebar'))
  .add(
    'Sidebar',
    withInfo()(() => {
      const open = boolean('open', false);
      const selected = select('selected', range(0, 4), 0);
      return (
        <Fragment>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '600px',
              width: '400px',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Sidebar open={open} onClose={() => null}>
              <Sidebar.Header>Header</Sidebar.Header>
              <Sidebar.NavList>
                {range(0, 4).map(i => (
                  <Sidebar.NavItem
                    key={i}
                    selected={i === Number(selected)}
                    onClick={() => null}
                  >
                    Item #{i}
                  </Sidebar.NavItem>
                ))}
              </Sidebar.NavList>
            </Sidebar>
            <h1>HELLLLLLO</h1>
          </div>
        </Fragment>
      );
    })
  );
