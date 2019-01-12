import { Component } from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '../../util/type-check';

class State extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initial: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    updaterName: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { initial, name } = props;
    const initialStateValue = isFunction(initial) ? initial(props) : initial;
    this.state = {
      [name]: initialStateValue
    };
  }

  render() {
    const { children, name, updaterName, updater } = this.props;

    const props = {
      [name]: this.state[name],
      [updaterName]: data => {
        this.setState(prevState => ({
          [name]: updater(prevState[name], data)
        }));
      }
    };

    return children(props);
  }
}

/**
 * @component
 */
export default State;
