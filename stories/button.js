import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { mount } from '../util/enzyme';
import expect from 'expect';
import { specs, describe, it } from 'storybook-addon-specifications'

import { Button, LoadingButton } from '..';

storiesOf('Buttons', module)
  .add('Button', () => {
    const story = (
      <Button className="btn btn--highlight" onClick={action('clicked')}>Hello Button</Button>
    );

    specs(() => describe('Buttons', function () {
      it('Should have the Hello Button label', function () {
        let output = mount(story);
        expect(output.text()).toContain('Hello Button');
      });
    }));

    return story;
  })
  .add('LoadingButton', () => (
    <LoadingButton
      className="btn btn--highlight"
      onClick={action('clicked')}>
      Loading!
    </LoadingButton>
  ));

