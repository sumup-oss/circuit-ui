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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { withState } from 'recompose';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import State from '../State';
import Checkbox from './Checkbox';

storiesOf(`${GROUPS.FORMS}|Checkbox`, module)
  .addDecorator(withTests('Checkbox'))
  .add(
    'Default Checkbox',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onChange"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onChange }) => (
          <Checkbox
            value={isChecked}
            name="checkbox"
            onChange={e => {
              action('Checkbox clicked')(e);
              onChange(e);
            }}
            checked={isChecked}
          >
            {isChecked ? 'Checked' : 'Unchecked'}
          </Checkbox>
        )}
      </State>
    ))
  )
  .add(
    'Invalid Checkbox',
    withInfo()(() => (
      <State
        initial={false}
        name="isChecked"
        updaterName="onChange"
        updater={isChecked => !isChecked}
      >
        {({ isChecked, onChange }) => (
          <Checkbox
            value="true"
            name="checkbox"
            onChange={e => {
              action('Checkbox clicked')(e);
              onChange(e);
            }}
            checked={isChecked}
            validationHint={text('Validation hint', 'Something is wrong.')}
            invalid
          >
            {text('Label', 'Error')}
          </Checkbox>
        )}
      </State>
    ))
  )
  .add(
    'Disabled Checkbox',
    withInfo()(() => (
      <Checkbox value="checkbox" name="checkbox" disabled>
        {text('Label', 'Disabled')}
      </Checkbox>
    ))
  )
  .add(
    'Multiple Checkboxes',
    withInfo()(() => {
      const initialValues = { apples: false, bananas: false, oranges: false };
      const withCheckboxes = withState('values', 'onChange', initialValues);
      const MultipleCheckboxes = withCheckboxes(({ values, onChange }) => (
        <div>
          <Checkbox
            value="apples"
            name="checkbox"
            onChange={() => onChange({ ...values, apples: !values.apples })}
            checked={values.apples}
          >
            Apples
          </Checkbox>
          <Checkbox
            value="bananas"
            name="checkbox"
            onChange={() => onChange({ ...values, bananas: !values.bananas })}
            checked={values.bananas}
          >
            Bananas
          </Checkbox>
          <Checkbox
            value="oranges"
            name="checkbox"
            onChange={() => onChange({ ...values, oranges: !values.oranges })}
            checked={values.oranges}
          >
            Oranges
          </Checkbox>
        </div>
      ));
      return <MultipleCheckboxes />;
    })
  );
