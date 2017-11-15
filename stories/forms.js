import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from 'recompose';
import { action } from '@storybook/addon-actions';
import { noop } from 'lodash/fp';
import {
  ValidatedInput,
  ValidatedSelect,
  ValidatedRadioButton,
  ValidatedCheckbox,
  ValidatedTextarea,
  InputGroup,
  Form,
  onChangeForm,
  createFormState
} from '..';

const INITIAL_STATE = createFormState(['name', 'fruit', 'color'], {
  values: {
    fruit: 'apples'
  },
  validations: {
    name: { required: true },
    fruit: { required: true },
    color: { required: false }
  },
  messages: {
    name: { required: 'Your name is required' },
    fruit: { required: 'Your favorite fruit is required' }
  }
});

const INITIAL_STATE_CHECKBOXES = createFormState(['name', 'fruit', 'color'], {
  values: {
    name: []
  },
  validations: {
    name: { required: false }
  },
  messages: {
    name: { required: 'Your name is required' }
  }
});

const withFormState = withState('data', 'onUpdate', INITIAL_STATE);
const withCheckboxFormState = withState(
  'data',
  'onUpdate',
  INITIAL_STATE_CHECKBOXES
);

storiesOf('Forms', module)
  .add('ValidatedInput', () => {
    const MyInputForm = withFormState(({ data, onUpdate }) => (
      <div>
        <Form
          data={data}
          onChange={newData =>
            onUpdate(prevData => onChangeForm(prevData, newData))}
          onSubmit={action('onSubmit')}
        >
          <ValidatedInput name="name" id="name" field="name" label="My name" />
          <ValidatedInput
            field="fruit"
            id="fruit"
            name="fruit"
            label="My favorite fruit"
            disabled={true}
          />
          <ValidatedInput
            field="color"
            id="color"
            name="color"
            label="My favorite color"
          />
        </Form>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    ));
    return <MyInputForm />;
  })
  .add('ValidatedSelect', () => {
    const MySelectForm = withFormState(({ data, onUpdate }) => (
      <Form
        data={data}
        onChange={newData =>
          onUpdate(prevData => onChangeForm(prevData, newData))}
        onSubmit={action('onSubmit')}
      >
        <ValidatedSelect field="name" label="Your name">
          <option value="">Pick your name</option>
          <option value="Heinz">Heinz</option>
          <option value="Heinrich">Heinrich</option>
          <option value="Helga">Helga</option>
        </ValidatedSelect>
        <ValidatedSelect
          field="fruit"
          label="Your favorite fruit"
          disabled={true}
        >
          <option value="">Pick a fruit</option>
          <option value="apples">Apples</option>
          <option value="bananas">Bananas</option>
          <option value="fruit loops">Fruit loops</option>
        </ValidatedSelect>
        <ValidatedSelect field="color" label="Your favorite color">
          <option value="">Pick a color</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </ValidatedSelect>
      </Form>
    ));
    return <MySelectForm />;
  })
  .add('ValidatedRadioButton', () => {
    const MyRadioForm = withFormState(({ data, onUpdate }) => (
      <Form
        data={data}
        onChange={newData =>
          onUpdate(prevData => onChangeForm(prevData, newData))}
        onSubmit={action('onSubmit')}
      >
        <InputGroup>
          <ValidatedRadioButton
            name="name-heinz"
            id="name-heinz"
            field="name"
            value="Heinz"
            label="Heinz"
          />
          <ValidatedRadioButton
            name="name-helga"
            id="name-helga"
            field="name"
            value="Helga"
            label="Helga"
          />
          <ValidatedRadioButton
            field="name"
            name="name-heinrich"
            id="name-heinrich"
            value="Heinrich"
            label="Heinrich"
          />
        </InputGroup>
      </Form>
    ));
    return <MyRadioForm />;
  })
  .add('ValidatedTextarea', () => {
    const MyTextareaForm = withFormState(({ data, onUpdate }) => (
      <Form
        data={data}
        onChange={newData =>
          onUpdate(prevData => onChangeForm(prevData, newData))}
        onSubmit={action('onSubmit')}
      >
        <ValidatedTextarea field="name" name="name" id="name" label="My name" />
        <ValidatedTextarea
          field="fruit"
          name="fruit"
          id="fruit"
          label="Your favorite fruit"
        />
        <ValidatedTextarea
          field="color"
          name="color"
          id="color"
          label="Describe your favorite color"
        />
      </Form>
    ));
    return <MyTextareaForm />;
  })
  .add('ValidatedCheckbox', () => {
    const MyCheckboxForm = withCheckboxFormState(({ data, onUpdate }) => (
      <Form
        data={data}
        onChange={newData =>
          onUpdate(prevData => onChangeForm(prevData, newData))}
        onSubmit={noop}
      >
        <InputGroup>
          <ValidatedCheckbox
            name="name-heinz"
            id="name-heinz"
            field="name"
            value="Heinz"
            label="Heinz"
          />
          <ValidatedCheckbox
            name="name-helga"
            id="name-helga"
            field="name"
            value="Helga"
            label="Helga"
          />
          <ValidatedCheckbox
            field="name"
            name="name-heinrich"
            id="name-heinrich"
            value="Heinrich"
            label="Heinrich"
          />
        </InputGroup>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Form>
    ));
    return <MyCheckboxForm />;
  });
