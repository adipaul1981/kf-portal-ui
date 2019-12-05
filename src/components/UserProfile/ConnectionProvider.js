import React from 'react';
import { injectState } from 'freactal';
import PropTypes from 'prop-types';
import { Card, Icon, Typography } from 'antd';
import { compose, setPropTypes } from 'recompose';
import FBIcon from 'react-icons/lib/fa/facebook';
import OrcidIcon from 'icons/OrcidIcon';

import { FACEBOOK, GOOGLE, ORCID } from 'common/constants';
import gicon from 'assets/google-icon.png';

const { Text } = Typography;

const KNOWN_PROVIDERS = [GOOGLE, FACEBOOK, ORCID];

const icons = {
  [GOOGLE]: <img src={gicon} style={{ width: 18, height: 18 }} alt={'google'} />,
  [FACEBOOK]: <FBIcon color="#428bca" size={20} />,
  [ORCID]: <OrcidIcon size={20} />,
};

const isConnectedWithKnownProvider = provider => {
  return KNOWN_PROVIDERS.includes(provider);
};

const ConnectionProvider = props => {
  const {
    userEmail,
    state: { loginProvider },
  } = props;

  if (!isConnectedWithKnownProvider(loginProvider)) {
    return null;
  }
  return (
    <Card
      style={{
        width: '1200px',
        borderRadius: '10px',
      }}
    >
      <React.Fragment>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        <Text> {`You are connected with ${loginProvider}`} </Text>
        {icons[loginProvider]}
        <Text> {` using this email address : ${userEmail}`} </Text>
      </React.Fragment>
    </Card>
  );
};

const Enhanced = compose(
  injectState,
  setPropTypes({
    state: PropTypes.shape({
      loginProvider: PropTypes.string,
    }).isRequired,
    userEmail: PropTypes.string.isRequired,
  }),
)(ConnectionProvider);

export default Enhanced;
