import {
  defaultTo,
  flow,
  identity,
  keys,
  reduce,
  pickBy,
  includes
} from 'lodash/fp';

export const getActiveErrors = flow(pickBy(identity), keys);

export const getErrorMessages = ({ data, messages = {}, translateFn } = {}) =>
  flow(
    defaultTo([]),
    reduce((activeMsgs, error) => {
      const message = messages[error];

      if (!message) {
        return activeMsgs;
      }

      const messageType = typeof message;

      if (!includes(messageType, ['string', 'function'])) {
        throw new TypeError(
          'Error messages must be either a string or a function.'
        );
      }

      const translatedMsg =
        messageType === 'string' ? translateFn(message) : message(data);
      return [...activeMsgs, translatedMsg];
    }, [])
  );
