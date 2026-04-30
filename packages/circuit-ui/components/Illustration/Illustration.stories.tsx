import { Illustration } from './Illustration.js';

export default {
  title: 'Components/Illustration',
  component: Illustration,
  tags: ['status:stable'],
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
};

export const Base = () => (
  <Illustration variant="success" />
);
