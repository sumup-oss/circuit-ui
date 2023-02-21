import { action } from '@storybook/addon-actions';
import { TrackingRoot, TrackingView } from '@sumup/collector';

export function withTrackingAction(Story) {
  return (
    <TrackingRoot name="tracking-root" onDispatch={action('Tracking event')}>
      <TrackingView name="tracking-view">
        <Story />
      </TrackingView>
    </TrackingRoot>
  );
}
