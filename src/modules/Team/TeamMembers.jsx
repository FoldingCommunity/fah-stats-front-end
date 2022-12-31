import DataTable from 'elements/DataTable/DataTable';
import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { PrettyCount } from 'utils/format';
import { Link } from 'react-router-dom';

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
const teamMembers = () => {
  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Rank (team)',
      fixed: 'left',
      width: 50,
      render: (text, data) => (stats?.teamMembers.indexOf(data) + 1),
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'Rank (project)',
      dataIndex: 'rank',
      key: 'rank',
      fixed: 'left',
      width: 50,
      render: (rank) => <PrettyCount count={rank} />,
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: 'Donor Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (text, data) => (
        <span css={styles.dNameIdContainer}>
          <Link css={styles.dName} to={`/donor/id/${data.id}`}>{text}</Link>
          <span css={styles.dId}>{data.id}</span>
        </span>
      ),
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      align: 'right',
      width: 200,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'WUs',
      dataIndex: 'wus',
      key: 'wus',
      align: 'right',
      width: 200,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.wus - b.wus,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        dataSource={stats?.teamMembers}
        pagination={{ defaultPageSize: 100, showSizeChanger: true }}
      />
    </>
  );
};

export default teamMembers;
