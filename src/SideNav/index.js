import React, { Component } from 'react';
import withStyles from '../../util/withStyles';
import styles from './index.scss';
import { NavOverviewIcon } from '../../src/Icons';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  selectOption(option) {
    this.setState({ option });
  }

  render() {
    const status = this.state.expanded ? 'expanded' : 'collapsed';
    return (
      <div>
        <div
          className={`layout-sidenav layout-sidenav--${status}`}
          onClick={() => {
            this.setState({ expanded: !this.state.expanded });
          }}
        >
          <div>
            <ul className={`sidenav-list sidenav-list--${status}`}>
              <MenuItem isActive={true} expanded={this.state.expanded} />
              <MenuItem isActive={false} expanded={this.state.expanded} />
              <MenuItem isActive={false} expanded={this.state.expanded} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const MenuItem = props => {
  const itemLinkStatus = props.isActive ? 'sidenav-item-link--active' : '';
  const itemTextStatus = props.expanded ? 'expanded' : 'collapsed';
  return (
    <li className="sidenav-item ">
      <a className={`sidenav-item-link ${itemLinkStatus}`}>
        <span className="sidenav-icon--container">
          <NavOverviewIcon width={20} height={20} />
        </span>
        <span
          className={`sidenav-item-text sidenav-item-text--${itemTextStatus}`}
        >
          Overview
        </span>
      </a>
    </li>
  );
};

export default withStyles(styles)(SideNav);
