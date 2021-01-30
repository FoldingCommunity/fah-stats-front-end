import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getTeam } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'modules/Team/AllTime/Header';
import { css } from '@emotion/react';
import { Tooltip } from 'antd';
import { PrettyCount } from 'utils/format';
import TeamLogo from 'modules/Team/TeamLogo';
import { Link } from 'react-router-dom';

const styles = {
  dNameIdContainer: css`
    display: flex;
    .ant-skeleton-image {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
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
const setupURL = (url) => ((url && !url.includes('http')) ? `https://${url}` : url);
const TeamAllTime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeam({}));
  }, []);

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
          <Tooltip title={setupURL(data?.url)}>
            <a target="_blank" rel="noopener noreferrer" href={setupURL(data?.url)}>
              <TeamLogo logo={data?.logo} />
            </a>
          </Tooltip>
          <Link css={styles.dName} target="_blank" to={`/team/${data.team}`}>{text}</Link>
          <span css={styles.dId}>{data.team}</span>
        </span>
      ),
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'right',
      width: 200,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a.credit - b.credit,
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
    {
      title: 'Founder',
      dataIndex: 'founder',
      key: 'founder',
      width: 200,
      render: (count) => <PrettyCount count={count} />,
      sorter: (a, b) => a?.founder?.localeCompare(b?.founder),
    },
  ];

  return (
    <>
      <Header />
      <DataTable
        columns={columns}
        dataSource={stats?.team}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </>
  );
};

export default TeamAllTime;
