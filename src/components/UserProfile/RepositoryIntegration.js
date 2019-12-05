import React from 'react';
import {Card, Col, Divider, Row, Typography} from 'antd';
import ExternalLink from 'uikit/ExternalLink';
import {dcfWebRoot, gen3WebRoot} from 'common/injectGlobals';
import Integration from './Integration';
import kfFrameworkServicesLogo from 'assets/kids-first-framework-services.svg';
import dcfLogo from 'assets/logo-dcf.svg';
import {DCF, GEN3} from 'common/constants';

const { Title, Paragraph } = Typography;

const RepositoryIntegration = () => {
  return (
    <Card
      title={
        <Title
          level={3}
          style={{
            color: 'rgb(43, 56, 143)',
          }}
        >
          Data Repository Integrations
        </Title>
      }
      style={{
        width: '1200px',
        borderRadius: '10px',
      }}
      headStyle={{
        color: 'rgb(43, 56, 143)',
        backgroundColor: 'rgb(237,238,241)',
        paddingBottom: '14px',
        paddingTop: '14px',
        paddingLeft: '32px',
        paddingRight: '32px',
      }}
      bodyStyle={{
        padding: '32px',
      }}
    >
      <Row>
        <Col span={24}>
          <Paragraph>
            The Kids First DRC provides the ability to integrate across different data repositories
            for pediatric research. By connecting to each integration (powered by{' '}
            <ExternalLink href={gen3WebRoot}>Gen3</ExternalLink>), you will immediately have the
            ability to analyze the data available from these repositories in Cavatica through this
            portal. Please remember that it is your responsibility to follow any data use
            limitations with controlled access data.
          </Paragraph>
          <Divider style={{ marginBottom: '24px' }} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Integration
            fence={GEN3}
            logo={
              <a href={gen3WebRoot} target="_blank">
                <img
                  src={kfFrameworkServicesLogo}
                  alt="Kids First Framework Services logo"
                  height="45px"
                />
              </a>
            }
            description={`Access all released Kids First controlled access data by connecting your account using your NIH login credentials.`}
          />
        </Col>
        <Col span={12}>
          <Integration
            fence={DCF}
            logo={
              <a href={dcfWebRoot} target="_blank">
                <img src={dcfLogo} alt="Data Commons Framework Logo" height="45px" />
              </a>
            }
            description={`Access select NCI controlled access data by connecting your account using your NIH login credentials.`}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default RepositoryIntegration;