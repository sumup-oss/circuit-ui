import { identity, flow, isEmpty, isEqual } from 'lodash/fp';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getActiveErrors, getErrorMessages } from './service';
import styles from './index.scss';
import withStyles from '../../../util/withStyles';

class ValidationList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      values: PropTypes.object
    }),
    errors: PropTypes.object
  };

  static defaultProps = {
    translateFn: identity
  };

  constructor(props) {
    super(props);

    this.ERROR_DELAY = 500;
    this.INTERACTION_THRESHOLD = 0;

    this.state = {
      isVisible: false,
      timeoutId: null,
      lastInteractionTime: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const shouldUpdate = this.shouldComponentUpdate(nextProps, this.state);

    if (!shouldUpdate) {
      return;
    }

    this.setState(prevState => {
      const {
        timeoutId: prevTimeoutId,
        lastInteractionTime: prevLastInteractionTime
      } = prevState;
      const lastInteractionTime = new Date();
      const timeSinceLastInteraction =
        lastInteractionTime - prevLastInteractionTime;
      const timeoutId = this.createVisibilityTimeout();

      clearTimeout(prevTimeoutId);

      if (timeSinceLastInteraction > this.INTERACTION_THRESHOLD) {
        return {
          ...prevState,
          lastInteractionTime,
          timeoutId,
          isVisible: false
        };
      }

      const activeErrorMsgs = this.getActiveErrorMsgs(nextProps);
      if (activeErrorMsgs.length) {
        return {
          ...prevState,
          lastInteractionTime,
          timeoutId
        };
      }

      return {
        ...prevState,
        lastInteractionTime,
        isVisible: false
      };
    });
  }

  createVisibilityTimeout() {
    return setTimeout(() => {
      this.setState(prevState => ({ ...prevState, isVisible: true }));
    }, this.ERROR_DELAY);
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(
    { field, errors, data, dirty, messages },
    { isVisible } = {}
  ) {
    if (!field || isEmpty(data)) {
      return dirty && !isEmpty(messages);
    }
    const { isVisible: prevIsVisible } = this.state;
    const { errors: prevErrors } = this.props;
    const value = !isEmpty(this.props.data) && this.props.data.values[field];
    const nextValue = !isEmpty(data) && data.values[field];
    const valueChanged = value !== nextValue;
    const errorsChanged = !isEqual(errors, prevErrors);
    const visibilityChanged = prevIsVisible !== isVisible;
    return Boolean(
      dirty && messages && (valueChanged || visibilityChanged || errorsChanged)
    );
  }

  getActiveErrorMsgs(props = this.props) {
    const { errors, data, messages, translateFn } = props;

    return flow(
      getActiveErrors,
      getErrorMessages({ data, messages, translateFn })
    )(errors);
  }

  render() {
    const { isVisible } = this.state;
    const activeErrorMsgs = !isVisible ? [] : this.getActiveErrorMsgs();
    const style = activeErrorMsgs.length
      ? { marginTop: '-18px' }
      : { marginTop: '0px' };

    return (
      <ul className="validation-list" style={style}>
        {activeErrorMsgs.map((v, k) => (
          <li
            key={`key-${k}`}
            dangerouslySetInnerHTML={{
              __html: v
            }}
          />
        ))}
      </ul>
    );
  }
}

export default withStyles(styles)(ValidationList);
