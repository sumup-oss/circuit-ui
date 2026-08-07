import {
  Illustration,
  type IllustrationProps,
  NAMES,
} from '@sumup-oss/illustrations';

export default {
  title: 'Features/Illustrations',
  component: Illustration,
  tags: ['status:stable'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: NAMES,
    },
    size: {
      control: { type: 'number', value: 240 },
    },
  },
};

export const IllustrationComponent = (args: IllustrationProps) => (
  <Illustration {...args} />
);

IllustrationComponent.args = {
  name: 'celebration',
};
