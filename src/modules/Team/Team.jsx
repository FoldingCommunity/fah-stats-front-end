import React from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import TeamAllTime from 'modules/Team/AllTime/TeamAllTime';
import TeamMonthly from 'modules/Team/Monthly/TeamMonthly';

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
    <h1>Team Statistics</h1>
    <Tabs type="card" css={styles.tabbedContent}>
      <TabPane tab="Monthly" key="1" css={styles.tabPaneContent}>
        <TeamMonthly />
      </TabPane>
      <TabPane tab="All-Time" key="2" css={styles.tabPaneContent}>
        <TeamAllTime />
      </TabPane>
    </Tabs>
  </>
);

export default Team;
