import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getServer } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PrettyCount } from 'utils/format';

const ServerStat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServer());
  }, []);

  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Server IP',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      fixed: 'left',
      sorter: (a, b) => a?.address?.localeCompare(b?.address),
    },
    {
      title: 'Host',
      dataIndex: 'host',
      key: 'host',
      width: 200,
      sorter: (a, b) => a?.host?.localeCompare(b?.host),
    },
    {
      title: 'Type',
      dataIndex: 'is_cs',
      key: 'is_cs',
      width: 100,
      render: (isCS, server) => (isCS && !server?.jobs?.total ? 'CS' : 'WS'),
      sorter: (a, b) => (a?.is_cs ? 'CS' : 'WS').localeCompare(b?.is_cs ? 'CS' : 'WS'),
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      width: 100,
      sorter: (a, b) => a?.version?.localeCompare(b?.version),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      width: 200,
      sorter: (a, b) => a?.contact?.localeCompare(b?.contact),
    },
    {
      title: 'Assign Rate',
      dataIndex: 'assign_rate',
      key: 'assign_rate',
      width: 100,
      align: 'right',
      render: (count) => (
        <>
          <PrettyCount count={(count * 60 * 60)} maximumFractionDigits={2} />
          <span> / hr</span>
        </>
      ),
      sorter: (a, b) => a.assign_rate - b.assign_rate,
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={stats?.server}
      pagination={{ defaultPageSize: 10, showSizeChanger: true }}
    />
  );
};

export default ServerStat;
