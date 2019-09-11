import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { compose } from 'recompose';
import { injectState } from 'freactal';
import { withTheme } from 'emotion-theming';
import HouseIcon from 'react-icons/lib/fa/home';
import DatabaseIcon from 'react-icons/lib/fa/database';
import styled from 'react-emotion';
import ExploreDataIcon from 'icons/ExploreDataIcon';

import logoPath from 'assets/logo-kids-first-data-portal.svg';
import Dropdown from 'uikit/Dropdown';
import Row from 'uikit/Row';
import { uiLogout } from 'components/LogoutButton';
import { COHORT_BUILDER_PATH } from 'common/constants';
import { withApi } from 'services/api';
import {
  NavLink,
  DropdownLink,
  HeaderContainer,
  GradientAccent,
  HeaderContent,
  Logo,
  NavigationGravatar,
  LinkAsButton,
  NavBarList,
  NavbarDropdownWrapper,
  NavbarDropdownOptionsContainer,
  DropdownRow,
  MenuLabelContainer,
} from './ui';
import AppsMenu, { DropDownState } from './AppsMenu';

const ExploreDataIconStyled = styled(ExploreDataIcon)`
  top: 3px;
  position: relative;
  fill: currentColor;
`;

const BetaNavLink = styled(NavLink, {
  shouldForwardProp: prop => !['currentPathName'].includes(prop),
})`
  &:after {
    content: 'beta';
    vertical-align: super;
    font-size: 9px;
    text-transform: uppercase;
    padding-left: 3px;
  }
`;

const Header = ({
  state: { loggedInUser },
  effects: { setUser, setToken, clearIntegrationTokens },
  theme,
  history,
  match: { path },
  api,
}) => {
  const canSeeProtectedRoutes =
    loggedInUser &&
    (loggedInUser.roles &&
      loggedInUser.roles[0] &&
      loggedInUser.acceptedTerms &&
      path !== '/join' &&
      path !== '/');
  const currentPathName = history.location.pathname;
  return (
    <DropDownState
      render={({ isDropdownVisible, toggleDropdown, setDropdownVisibility }) => (
        <HeaderContainer>
          <GradientAccent />
          <HeaderContent>
            <Row>
              <Link to="/dashboard">
                <Logo src={logoPath} alt="Kids First Logo" />
              </Link>
              {canSeeProtectedRoutes && (
                <NavBarList ml={40}>
                  <li>
                    <NavLink currentPathName={currentPathName} to="/dashboard">
                      <HouseIcon /> <Trans>Dashboard</Trans>
                    </NavLink>
                  </li>
                  <li>
                    <BetaNavLink currentPathName={currentPathName} to={COHORT_BUILDER_PATH}>
                      <ExploreDataIconStyled /> <Trans>Explore Data</Trans>
                    </BetaNavLink>
                  </li>
                  <li>
                    <NavLink currentPathName={currentPathName} to={`/search/file`}>
                      <DatabaseIcon /> <Trans>File Repository</Trans>
                    </NavLink>
                  </li>
                </NavBarList>
              )}
            </Row>
            <NavBarList justify={'flex-end'}>
              {!loggedInUser && (
                <li>
                  {path === '/' ? (
                    <LinkAsButton to="/join">
                      <Trans>Join now</Trans>
                    </LinkAsButton>
                  ) : (
                    <LinkAsButton to="/">
                      <Trans>Login</Trans>
                    </LinkAsButton>
                  )}
                </li>
              )}

              <AppsMenu />

              {loggedInUser && canSeeProtectedRoutes && (
                <Dropdown
                  align="left"
                  isOpen={isDropdownVisible}
                  onToggle={toggleDropdown}
                  onOuterClick={() => setDropdownVisibility(false)}
                  items={[
                    <DropdownLink
                      onClick={toggleDropdown}
                      to={{
                        pathname: `/profile`,
                        hash: '#aboutMe',
                        state: { refreshProfile: true },
                      }}
                    >
                      <Trans>My Profile</Trans>
                    </DropdownLink>,
                    <DropdownLink
                      onClick={toggleDropdown}
                      to={{
                        pathname: `/profile`,
                        hash: '#settings',
                        state: { refreshProfile: true },
                      }}
                    >
                      Settings
                    </DropdownLink>,
                    <DropdownLink
                      to={`/dashboard`}
                      separated
                      onClick={e => {
                        e.preventDefault();
                        toggleDropdown();
                        uiLogout({ history, setToken, setUser, clearIntegrationTokens, api });
                      }}
                    >
                      <Trans>Logout</Trans>
                    </DropdownLink>,
                  ]}
                  ItemWrapperComponent={props => <div {...props} />}
                  ContainerComponent={NavbarDropdownWrapper}
                  OptionsContainerComponent={NavbarDropdownOptionsContainer}
                  LabelContainer={MenuLabelContainer}
                >
                  <NavigationGravatar email={loggedInUser.email || ''} size={39} />
                  <DropdownRow>{loggedInUser.firstName}</DropdownRow>
                </Dropdown>
              )}
            </NavBarList>
          </HeaderContent>
        </HeaderContainer>
      )}
    />
  );
};

export default compose(
  injectState,
  withTheme,
  withRouter,
  withApi,
)(Header);
