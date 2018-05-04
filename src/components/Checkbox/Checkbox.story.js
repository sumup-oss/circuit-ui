import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withState } from 'recompose';

import withTests from '../../util/withTests';
import State from '../State';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
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
            invalid
          >
            Error
          </Checkbox>
        )}
      </State>
    ))
  )
  .add(
    'Disabled Checkbox',
    withInfo()(() => (
      <Checkbox value="checkbox" name="checkbox" disabled>
        Disabled
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
