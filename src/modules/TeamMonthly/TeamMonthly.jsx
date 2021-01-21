import {
  Statistic, Space, Typography,
} from 'antd';
import DataTable from 'elements/DataTable/DataTable';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { getTeamsMonthly } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const { Text } = Typography;
const TeamMonthly = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamsMonthly({}));
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
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'right',
      render: (text) => text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.credit - b.credit,
    },
    {
      title: 'WUs',
      dataIndex: 'wus',
      key: 'wus',
      align: 'right',
      render: (text) => text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.wus - b.wus,
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Change',
      key: 'change',
      render: (text, record) => {
        if (record.prev_rank) {
          const change = parseInt(record.prev_rank - record.rank, 10) || 0;
          let color; let
            arrow;
          if (change !== 0) {
            color = change < 0 ? '#cf1322' : '#3f8600';
            arrow = change < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />;
          }
          return (
            <Statistic
              value={change}
              valueStyle={{ color }}
              prefix={arrow}
            />
          );
        }
        return null;
      },
      sorter: (a, b) => (
        (parseInt(b.prev_rank - b.rank, 10) || 0) - (parseInt(a.prev_rank - a.rank, 10) || 0)
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={stats?.teamsMonthly?.results}
      pagination={{ defaultPageSize: 100 }}
    />
  );
};

export default TeamMonthly;
