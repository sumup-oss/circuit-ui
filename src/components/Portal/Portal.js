/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ownerDocument from '../../util/ownerDocument';

function getContainer(container, defaultContainer) {
  // eslint-disable-next-line no-param-reassign
  container = typeof container === 'function' ? container() : container;
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  // eslint-disable-next-line react/no-find-dom-node
  return ownerDocument(ReactDOM.findDOMNode(element));
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
class Portal extends React.Component {
  componentDidMount() {
    this.setMountNode(this.props.container);

    // Only rerender if needed
    if (!this.props.disablePortal) {
      this.forceUpdate(this.props.onRendered);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.container !== this.props.container ||
      prevProps.disablePortal !== this.props.disablePortal
    ) {
      this.setMountNode(this.props.container);

      // Only rerender if needed
      if (!this.props.disablePortal) {
        this.forceUpdate(this.props.onRendered);
      }
    }
  }

  componentWillUnmount() {
    this.mountNode = null;
  }

  setMountNode(container) {
    if (this.props.disablePortal) {
      // eslint-disable-next-line react/no-find-dom-node
      this.mountNode = ReactDOM.findDOMNode(this).parentElement;
      return;
    }

    this.mountNode = getContainer(container, getOwnerDocument(this).body);
  }

  /**
   * @public
   */
  getMountNode = () => this.mountNode;

  render() {
    const { children, disablePortal } = this.props;

    if (disablePortal) {
      return children;
    }

    return this.mountNode
      ? ReactDOM.createPortal(children, this.mountNode)
      : null;
  }
}

Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: PropTypes.func
};

Portal.defaultProps = {
  disablePortal: false,
  container: null,
  onRendered: () => {}
};

export default Portal;
