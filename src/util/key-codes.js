// event.keyCode has been deprecated and replaced by event.key,
// however not all browsers implement it yet.

export const isEnter = event =>
  'key' in event ? event.key === 'Enter' : event.keyCode === 13;

export const isSpacebar = event =>
  'key' in event ? event.key === ' ' : event.keyCode === 32;
