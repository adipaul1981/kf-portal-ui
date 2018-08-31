import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withTheme } from 'emotion-theming';
import RightIcon from 'react-icons/lib/fa/angle-right';
import { Trans } from 'react-i18next';
import { withApi } from '../services/api';

import Login from 'components/Login';
import SplashPage from 'components/SplashPage';

import { Link, Section } from 'uikit/Core';
import { H2 } from 'uikit/Headings';
import { JoinH2 } from '../uikit/Headings';

const LoginPage = compose(withRouter, withTheme, withApi)(({ history, location, theme, api }) => (
  <SplashPage>
    <JoinH2 mt="9px" mb="40px">
      <Trans>Log in</Trans>
    </JoinH2>

    <Login
      api={api}
      shouldNotRedirect={true}
      onFinish={user => {
        if (!user.roles || user.roles.length === 0 || !user.acceptedTerms) {
          history.push('/join');
        } else if (['/', '/join'].includes(location.pathname)) {
          history.push('/dashboard');
        }
      }}
    />
    <Section textAlign="center" borderTop={`1px solid ${theme.greyScale8}`} mt={2} p={2}>
      <Trans>New to Kids First Data Resource Portal?</Trans>{' '}
      <Link bare primary bold to="/join">
        <Trans>Join now</Trans>
        <RightIcon />
      </Link>
    </Section>
  </SplashPage>
));
export default LoginPage;
