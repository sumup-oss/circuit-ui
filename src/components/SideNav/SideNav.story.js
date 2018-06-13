import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import SideNav from './SideNav';
import SideNavItem from './components/SideNavItem';
import FavoriteIcon from './components/icons/favorite.svg';

/* eslint-disable */
const Link = ({ onClick, href, children }) => (
  <div
    onClick={e => {
      e.preventDefault();
      onClick(href);
    }}
  >
    {children}
  </div>
);
/* eslint-enabled */

const routes = [
  {
    label: 'Foo',
    href: 'https://foo.com'
  },
  {
    label: 'Bar',
    href: 'https://bar.com'
  },
  {
    label: 'Baz',
    href: 'https://baz.com'
  }
];

// Just an example. Usually your router of choice would take
// care of these things.
class NavState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'https://foo.com'
    };

    this.handleChangeRoute = this.handleChangeRoute.bind(this);
  }

  handleChangeRoute(route) {
    action('changed route')(route);
    this.setState({ route });
  }

  render() {
    return this.props.children(this.state.route, this.handleChangeRoute);
  }
}

storiesOf(`${GROUPS.NAVIGATION}|SideNav`, module)
  .addDecorator(withTests('SideNav'))
  .add(
    'SideNav',
    withInfo()(() => (
      <NavState>
        {(route, handleChangeRoute) => (
          <SideNav>
            {routes.map(({ label, href }) => (
              <Link href={href} onClick={handleChangeRoute}>
                <SideNavItem isActive={route === href} icon={FavoriteIcon}>
                  {label}
                </SideNavItem>
              </Link>
            ))}
          </SideNav>
        )}
      </NavState>
    ))
  );
