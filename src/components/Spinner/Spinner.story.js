import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Spinner from './Spinner';

const Container = styled('div')(
  ({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.n500};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 50px;
  `
);

storiesOf(`${GROUPS.COMPONENTS}|Spinner`, module)
  .addDecorator(withTests('Spinner'))
  .add(
    'Spinner',
    withInfo()(() => (
      <Container>
        <Spinner
          dark={boolean('Show dark variant', false)}
          size={select(
            'Size',
            {
              [Spinner.MEGA]: 'Mega',
              [Spinner.KILO]: 'Kilo',
              [Spinner.GIGA]: 'Giga'
            },
            Spinner.GIGA
          )}
        />
      </Container>
    ))
  );
