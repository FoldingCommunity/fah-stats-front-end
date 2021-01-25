import DataTable from 'elements/DataTable/DataTable';
import Header from 'modules/TeamMonthly/Header';
import React from 'react';
import { useSelector } from 'react-redux';

const TeamMonthly = () => {
  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.credit - b.credit,
    },
    {
      title: 'WUs',
      dataIndex: 'wus',
      key: 'wus',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.wus - b.wus,
    },
    {
      title: 'Team ID',
      dataIndex: 'team',
      key: 'team',
      sorter: (a, b) => a.team - b.team,
    },
  ];

  return (
    <>
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
