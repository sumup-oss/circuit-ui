import { Dispatch } from '@sumup/collector/build/types';

export interface TrackingProps {
  /**
   * Whether to dispatch a tracking event when a user interacts with the component. Default: false.
   */
  enableTracking: boolean;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  trackingPayload: Dispatch;
}
