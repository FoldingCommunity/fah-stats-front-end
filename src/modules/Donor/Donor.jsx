import React from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import DonorAllTime from 'modules/Donor/AllTime/DonorAllTime';
import DonorMonthly from 'modules/Donor/Monthly/DonorMonthly';

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
    <h1>Donor Statistics</h1>
    <Tabs type="card" css={styles.tabbedContent}>
      <TabPane tab="Monthly" key="1" css={styles.tabPaneContent}>
        <DonorMonthly />
      </TabPane>
      <TabPane tab="All-Time" key="2" css={styles.tabPaneContent}>
        <DonorAllTime />
      </TabPane>
    </Tabs>
  </>
);

export default Team;
