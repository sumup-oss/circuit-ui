---
"@sumup-oss/circuit-ui": major
---

Redesigned the SideNavigation component API and layout.

The component now uses a `groups: NavigationGroup[]` prop to organize navigation items into labeled groups, including support for nested items.
The `primaryNavigationLabel` and `secondaryNavigationLabel` props have been removed, and labels are now passed as part of the `groups` prop.

The SideNavigation component now supports a `logo` prop, and can be used as a standalone navigation component.
An app-level custom property, `--side-navigation-width`, has been added to help consumers account for the SideNavigation width in their layouts.
