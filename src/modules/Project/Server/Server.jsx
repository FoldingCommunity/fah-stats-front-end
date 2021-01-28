import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getServer } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PrettyCount } from 'utils/format';
import { dotCompare } from 'utils/sort';

const Server = () => {
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
      dataIndex: 'type',
      key: 'type',
      width: 100,
      sorter: (a, b) => a?.type?.localeCompare(b?.type),
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      width: 100,
      sorter: (a, b) => dotCompare(a?.version, b?.version),
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
    {
      title: 'Project Types',
      dataIndex: 'types',
      key: 'types',
      width: 200,
      fixed: 'left',
      render: (types) => types && Object.keys(types)?.join(', '),
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

export default Server;
