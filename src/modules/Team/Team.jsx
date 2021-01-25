import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getTeam } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'modules/Team/Header';

const Team = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeam({}));
  }, []);

  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Founder',
      dataIndex: 'founder',
      key: 'founder',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.founder.localeCompare(b.founder),
    },
    {
      title: 'WUs',
      dataIndex: 'wus',
      key: 'wus',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.wus - b.wus,
    },
  ];

  return (
    <>
      <Header />
      <DataTable
        columns={columns}
        dataSource={stats?.team}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default Team;
