import React from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import ProjectActive from 'modules/Project/Active/ProjectActive';
import Server from 'modules/Project/Server/Server';
import Os from 'modules/Project/Os/Os';

const { TabPane } = Tabs;
const styles = {
  tabbedContent: css`
    .ant-tabs-nav {
      margin: 0;
      padding: 0;
    }
  `,
  tabPaneContent: css`
    background-color: white;
    padding: 1rem;
  `,
};
const Team = () => (
  <>
    <h1>Project & Server Statistics</h1>
    <Tabs type="card" css={styles.tabbedContent}>
      <TabPane tab="Active Projects" key="1" css={styles.tabPaneContent}>
        <ProjectActive />
      </TabPane>
      <TabPane tab="Servers" key="2" css={styles.tabPaneContent}>
        <Server />
      </TabPane>
      <TabPane tab="OS" key="3" css={styles.tabPaneContent}>
        <Os />
      </TabPane>
    </Tabs>
  </>
);

export default Team;
