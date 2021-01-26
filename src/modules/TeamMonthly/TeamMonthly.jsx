import DataTable from 'elements/DataTable/DataTable';
import Header from 'modules/TeamMonthly/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';

const styles = {
  dNameIdContainer: css`
    display: flex;
  `,
  dName: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  dId: css`
    flex: 1;
    text-align: right;
    margin-left: 0.5rem;
    color: #CCCCCC;
  `,
};
const TeamMonthly = () => {
  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Team Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (text, data) => (
        <span css={styles.dNameIdContainer}>
          <span css={styles.dName}>{text}</span>
          <span css={styles.dId}>{data.team}</span>
        </span>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'right',
      width: 200,
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.credit - b.credit,
    },
    {
      title: 'WUs',
      dataIndex: 'wus',
      key: 'wus',
      align: 'right',
      width: 200,
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.wus - b.wus,
    },
  ];

  return (
    <>
      <h1>Team Monthly Statistics</h1>
      <Header />
      <DataTable
        columns={columns}
        dataSource={stats?.teamMonthly}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default TeamMonthly;
