import {
  Space, Typography,
} from 'antd';
import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getTeam } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from 'modules/Team/SearchForm';

const { Text } = Typography;
const Team = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeam({}));
  }, []);

  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      defaultSortOrder: 'ascend',
      render: (text, record) => (
        <Space direction="horizontal">
          <Text>{ text }</Text>
          { record.prev_rank && (
          <Text style={{ fontSize: '0.8rem' }} disabled>
            / Prev:
            { record.prev_rank }
          </Text>
          ) }
        </Space>
      ),
      sorter: (a, b) => a.rank - b.rank,
    },
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
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      align: 'right',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.wus - b.wus,
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
      <SearchForm />
      <DataTable
        columns={columns}
        dataSource={stats?.team}
        pagination={{ defaultPageSize: 100 }}
      />
    </>
  );
};

export default Team;
