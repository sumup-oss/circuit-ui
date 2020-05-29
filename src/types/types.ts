import { Dispatch } from '@sumup/collector/build/types';

export interface TrackingProps {
  /**
   * Set enable to activate tracking mechanism. Default: false.
   */
  enableTracking: boolean;
  /**
   * Dispatch
   */
  trackingPayload: Dispatch;
}
