import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import TeamAllTime from 'modules/Team/AllTime/TeamAllTime';
import TeamMonthly from 'modules/Team/Monthly/TeamMonthly';
import Header from 'modules/Team/AllTime/Header';

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
const Team = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <>
      <h1>Team Statistics</h1>
      <Header setActiveTab={() => setActiveTab('2')} />
      <Tabs type="card" css={styles.tabbedContent} activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Monthly" key="1" css={styles.tabPaneContent}>
          <TeamMonthly />
        </TabPane>
        <TabPane tab="All-Time" key="2" css={styles.tabPaneContent}>
          <TeamAllTime />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Team;
