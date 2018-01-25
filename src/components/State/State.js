import { Component } from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '../../util/type-check';

export default class State extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialState: PropTypes.any.isRequired,
    stateName: PropTypes.string.isRequired,
    stateUpdaterName: PropTypes.string.isRequired,
    stateUpdater: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    const { initialState, stateName } = props;
    const initialStateValue = isFunction(initialState)
      ? initialState(props)
      : initialState;
    this.state = {
      [stateName]: initialStateValue
    };
  }

  render() {
    const { children, stateName, stateUpdaterName, stateUpdater } = this.props;

    const props = {
      [stateName]: this.state[stateName],
      [stateUpdaterName]: () => {
        this.setState(prevState => ({
          [stateName]: stateUpdater(prevState[stateName])
        }));
      }
    };

    return children(props);
  }
}
