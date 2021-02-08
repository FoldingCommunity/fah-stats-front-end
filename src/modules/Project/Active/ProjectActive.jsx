import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getProject } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PrettyCount } from 'utils/format';
import { dotCompare } from 'utils/sort';
import { Link } from 'react-router-dom';

const ProjectActive = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject({}));
  }, []);

  const stats = useSelector((state) => state.stats);
  const setFilters = (field) => ({
    filters: [...new Set(stats?.project?.map((item) => item[field]))]
      .map((item) => ({ text: item, value: item })),
    onFilter: (value, record) => record[field].indexOf(value) === 0,
  });
  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      fixed: 'left',
      render: (text) => (
        <Link target="_blank" to={`/project/${text}`}>{text}</Link>
      ),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Server IP',
      dataIndex: 'ws',
      key: 'ws',
      width: 200,
      sorter: (a, b) => dotCompare(a?.ws, b?.ws),
      ...setFilters('ws'),
    },
    {
      title: 'Atoms',
      dataIndex: 'atoms',
      key: 'atoms',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.atoms - b.atoms,
    },
    {
      title: 'Timeout (days)',
      dataIndex: 'timeout',
      key: 'timeout',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={(count / 60 / 60 / 24)} maximumFractionDigits={2} />,
      sorter: (a, b) => a.timeout - b.timeout,
    },
    {
      title: 'Deadline (days)',
      dataIndex: 'deadline',
      key: 'deadline',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={(count / 60 / 60 / 24)} maximumFractionDigits={2} />,
      sorter: (a, b) => a.deadline - b.deadline,
    },
    {
      title: 'Base Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'right',
      width: 100,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.credit - b.credit,
    },
    {
      title: 'Core',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      sorter: (a, b) => a?.type?.localeCompare(b?.type),
      ...setFilters('type'),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      width: 200,
      sorter: (a, b) => a?.contact?.localeCompare(b?.contact),
      ...setFilters('contact'),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={stats?.project}
      pagination={{ defaultPageSize: 10, showSizeChanger: true }}
    />
  );
};

export default ProjectActive;
