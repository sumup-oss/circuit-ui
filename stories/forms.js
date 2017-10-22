import React from 'react';
import { withState } from 'recompose';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ValidatedInput, Form, createFormState } from '..';

storiesOf('Forms', module).add('Input', () => {
  const formState = createFormState(['name'], {
    validations: {
      name: { required: true }
    },
    messages: {
      name: { required: 'Your name is required' }
    }
  });

  const withFormState = withState('form', 'onUpdateForm', formState);
  const MyForm = withFormState(({ form, onUpdateForm }) => (
    <Form data={form} onChange={onUpdateForm} onSubmit={action('onSubmit')}>
      <ValidatedInput field="name" label="My name" />
    </Form>
  ));

  return <MyForm />;
});
