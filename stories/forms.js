import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  ValidatedInput,
  ValidatedSelect,
  Form,
  onChangeForm,
  createFormState
} from '..';

class MyForm extends Component {
  constructor(props) {
    super(props);
    const formState = createFormState(['name', 'fruit'], {
      validations: {
        name: { required: true },
        fruit: { required: true }
      },
      messages: {
        name: { required: 'Your name is required' },
        fruit: { required: 'Your favorite fruit is required' }
      }
    });

    this.state = formState;
    this.onChange = this.onChange.bind(this);
  }

  onChange(form) {
    this.setState(prevState => onChangeForm(prevState, form));
  }

  render() {
    return (
      <div>
        <Form
          data={this.state}
          onChange={this.onChange}
          onSubmit={action('onSubmit')}
        >
          <ValidatedInput field="name" label="My name" />
          <ValidatedSelect field="fruit" label="Your favorite fruit">
            <option value="">Pick a fruit</option>
            <option value="apples">Apples</option>
            <option value="bananas">Bananas</option>
            <option value="fruit loops">Fruit loops</option>
          </ValidatedSelect>
        </Form>
      </div>
    );
  }
}

storiesOf('Forms', module).add('Input', () => <MyForm />);
