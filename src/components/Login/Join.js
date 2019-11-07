import React from 'react';
import { injectState } from 'freactal';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

import Login from 'components/Login/Login';
import SelectRoleForm from 'components/forms/SelectRoleForm';
import ConsentForm from 'components/forms/ConsentForm';
import { withApi } from 'services/api';
import { startAnalyticsTiming, TRACKING_EVENTS } from 'services/analyticsTracking';

import Column from 'uikit/Column';
import Wizard from 'uikit/Wizard';
import { JoinH2, JoinH3 } from 'uikit/Headings';
import { Paragraph } from 'uikit/Core';

export const ButtonsDiv = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: solid 1px ${props => props.theme.greyScale4};
  padding-top: 20px;
  min-height: 60px;
  background: ${({ theme }) => theme.white};
`;

const JoinContainer = styled(Column)`
  width: 830px;
  margin: auto;
`;

export const JoinPageHeader = withTheme(({ theme }) => (
  <JoinH2 mt="25px" mb="35px">
    Join Kids First Data Resource Portal
  </JoinH2>
));

const JoinContent = compose(
  injectState,
  withRouter,
  withTheme,
  withApi,
  lifecycle({
    componentDidMount() {
      startAnalyticsTiming(TRACKING_EVENTS.labels.joinProcess);
    },
  }),
)(({ state: { loggedInUser }, effects: { setToast, closeToast }, history, theme, api }) => (
  <JoinContainer>
    <Column className={`${theme.card}`}>
      <Wizard
        HeaderComponent={() => <JoinPageHeader />}
        steps={[
          {
            title: 'Connect',
            render: ({ nextStep }) => (
              <div className={theme.column}>
                <JoinH3>Select a way to connect to the Kids First Data Resource Portal</JoinH3>
                <Paragraph my="16">
                  Your information will be kept confidential and secure and is not shared with any
                  of these providers.
                </Paragraph>
                <Login
                  shouldNotRedirect={true}
                  onFinish={user => {
                    if (!user.roles || user.roles.length === 0 || !user.acceptedTerms) {
                      nextStep();
                    } else {
                      history.push('/dashboard');
                    }
                  }}
                />
              </div>
            ),
            renderButtons: () => <div />,
            canGoBack: true,
          },
          {
            title: 'Basic Info',
            render: ({ disableNextStep, nextStep, prevStep, nextDisabled, prevDisabled }) => (
              <div className={theme.column}>
                <JoinH3>Tell us about yourself</JoinH3>
                <Paragraph my="16px">
                  Please provide information about yourself to help us personalize your experience.
                </Paragraph>
                <SelectRoleForm
                  onValidateFinish={errors => disableNextStep(!!Object.keys(errors).length)}
                  onValidChange={isValid => disableNextStep(!isValid)}
                  {...{ nextStep, nextDisabled, prevDisabled, api }}
                />
              </div>
            ),
            canGoBack: true,
          },
          {
            title: 'Consent',
            render: ({ disableNextStep, nextStep, prevStep, nextDisabled, prevDisabled }) => (
              <ConsentForm
                {...{
                  disableNextStep,
                  nextStep,
                  prevStep,
                  nextDisabled,
                  prevDisabled,
                  history,
                }}
              />
            ),
            canGoBack: false,
          },
        ]}
      />
    </Column>
  </JoinContainer>
));

export default JoinContent;