import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import DonorAllTime from 'modules/Donor/AllTime/DonorAllTime';
import DonorMonthly from 'modules/Donor/Monthly/DonorMonthly';
import Header from 'modules/Donor/AllTime/Header';

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
const Donor = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <>
      <h1>Donor Statistics</h1>
      <Header setActiveTab={() => setActiveTab('2')} />
      <Tabs type="card" css={styles.tabbedContent} activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Monthly" key="1" css={styles.tabPaneContent}>
          <DonorMonthly />
        </TabPane>
        <TabPane tab="All-Time" key="2" css={styles.tabPaneContent}>
          <DonorAllTime />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Donor;
