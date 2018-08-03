import React from 'react';
import styled, { css } from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { GROUPS } from '../.././../.storybook/hierarchySeparators';
import Slide from './Slide';
import Card from '../Card';
import Toggle from '../Toggle';
import State from '../State/State';

const Container = styled.div`
  height: 180px;
`;

const Wrapper = styled.div`
  width: 200px;
`;

const cardStyles = css`
  z-index: 1;
  position: relative;
`;

storiesOf(`${GROUPS.LAYOUT}|Slide`, module)
  //   .addDecorator(withTests('SideNavItem'))
  .add(
    'Slide',
    withInfo()(() => (
      <State
        initial={false}
        name="on"
        updaterName="onToggle"
        updater={on => !on}
      >
        {({ onToggle, on }) => (
          <Container>
            <Wrapper>
              <Toggle
                label="Toggle me"
                onToggle={e => {
                  action('Toggle clicked')(e);
                  onToggle(e);
                }}
                {...{ on }}
              />
              <Slide direction="right" in={on} mountOnEnter unmountOnExit>
                <Card className={cardStyles}>Content</Card>
              </Slide>
            </Wrapper>
          </Container>
        )}
      </State>
    ))
  );
