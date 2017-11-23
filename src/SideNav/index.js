import React, { Component, Element } from 'react';
import withStyles from '../../util/withStyles';
import styles from './index.scss';
import { NavOverviewIcon } from '../../src/Icons';

const SideNavComponent = props => {
  const status = props.expanded ? 'expanded' : 'collapsed';
  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { expanded: props.expanded })
  );
  
  return (
    <div>
      <div className={`layout-sidenav layout-sidenav--${status}`}>
        <div>
          <ul className={`sidenav-list sidenav-list--${status}`}>
            {childrenWithProps}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MenuItemComponent = props => {
  const itemLinkStatus = props.isActive ? 'sidenav-item-link--active' : '';
  const itemTextStatus = props.expanded ? 'expanded' : 'collapsed';

  return (
    <li className="sidenav-item ">
      <a className={`sidenav-item-link ${itemLinkStatus}`}>
        <span className="sidenav-icon--container">{props.icon}</span>
        <span
          className={`sidenav-item-text sidenav-item-text--${itemTextStatus}`}
        >
          {props.children}
        </span>
      </a>
    </li>
  );
};

const SideNav = withStyles(styles)(SideNavComponent);
const MenuItem = withStyles(styles)(MenuItemComponent);

export { SideNav, MenuItem };
