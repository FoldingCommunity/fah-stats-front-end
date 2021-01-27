import React from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import ProjectActive from 'modules/Project/Active/ProjectActive';

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
    </Tabs>
  </>
);

export default Team;
