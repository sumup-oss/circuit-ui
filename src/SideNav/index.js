import React from 'react';
import withStyles from '../../util/withStyles';
import styles from './index.scss';

const SideNavComponent = props => {
  const status = props.expanded ? 'expanded' : 'collapsed';
  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, {
      expanded: props.expanded
    })
  );

  return (
    <div className={`layout-sidenav layout-sidenav--${status}`}>
      <ul className={`sidenav-list sidenav-list--${status}`}>
        {childrenWithProps}
      </ul>
    </div>
  );
};

const MenuItemComponent = props => {
  const itemLinkStatus = props.isActive ? 'sidenav-item-link--active' : '';
  const itemTextStatus = props.expanded ? 'expanded' : 'collapsed';
  let click = () => {};
  if (props.onClick) click = props.onClick;

  return (
    <li className="sidenav-item " onClick={click}>
      <a className={`sidenav-item-link ${itemLinkStatus}`}>
        <span className="sidenav-icon--container">
          {React.cloneElement(props.icon, {
            className: 'icon sidenav-icon',
            viewBox: '0 0 24 24',
            width: '20',
            height: '20'
          })}
        </span>
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
