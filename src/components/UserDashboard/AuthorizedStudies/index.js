import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { injectState } from 'freactal';
import { isEmpty } from 'lodash';

import { TealActionButton } from 'uikit/Button';
import CardHeader from 'uikit/Card/CardHeader';
import ChartContentSpinner from 'components/Charts/ChartContentSpinner';
import DownloadController from 'icons/DownloadController';

import StudiesConnected from './StudiesConnected';
import { fenceConnectionInitializeHoc } from 'stateProviders/provideFenceConnections';

import AccessGate from '../../AccessGate';
import { DashboardCard } from '../styles';
import Info from '../Info';

const AuthorizedStudies = compose(
  injectState,
  fenceConnectionInitializeHoc,
)(
  ({
    state: { loggedInUser, fenceConnectionsInitialized, fenceConnections, fenceAuthStudies },
  }) => {
    const Header = (
      <CardHeader title="Authorized Studies" badge={fenceAuthStudies.length || null} />
    );

    const inactive = !fenceConnectionsInitialized;
    return (
      // TODO EXTRACT DashboardCard to UserDashboard/index.js
      <DashboardCard Header={Header} inactive={inactive} scrollable={!isEmpty(fenceConnections)}>
        {inactive ? (
          <ChartContentSpinner />
        ) : isEmpty(fenceConnections) ? (
          <Fragment>
            <AccessGate
              mt={'40px'}
              Icon={DownloadController}
              title="Access Controlled Data"
              detail={
                <span>
                  To access controlled study files,{' '}
                  <strong>connect to our data repository partners.</strong>
                </span>
              }
            >
              <TealActionButton>
                <Link to={`/user/${loggedInUser.egoId}#settings`}>Settings</Link>
              </TealActionButton>
            </AccessGate>
            <Info
              link={{
                url:
                  'https://kidsfirstdrc.org/support/studies-and-access/#applying-for-data-access',
                text: 'applying for data access.',
              }}
            />
          </Fragment>
        ) : (
          <StudiesConnected />
        )}
      </DashboardCard>
    );
  },
);

export default AuthorizedStudies;
