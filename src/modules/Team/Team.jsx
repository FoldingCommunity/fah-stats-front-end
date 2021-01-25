import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getTeam } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'modules/Team/Header';
import { css } from '@emotion/react';
import { Tooltip } from 'antd';

const DEFAULT_LOGO = '/logo.png';
const styles = {
  teamNameId: css`
    display: flex;
    > a img {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
    .ant-skeleton-image {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
    > span {
      flex: 1;
      text-align: right;
      margin-left: 0.5rem;
      color: #CCCCCC;
    }
  `,
};
const setupURL = (url) => ((url && !url.includes('http')) ? `https://${url}` : url);
const imageLoad = (data) => {
  let logo = data?.logo?.replace('http:', 'https:');
  if (!logo || (logo && logo.includes('foldingathome.org') && logo.includes('folding-at-home-logo.png'))) {
    logo = DEFAULT_LOGO;
  }
  return logo;
};
const setDefaultImage = (el) => {
  // eslint-disable-next-line no-param-reassign
  el.target.src = DEFAULT_LOGO;
};
const Team = () => {
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
      render: (text, data) => (
        <span css={styles.teamNameId}>
          <a target="_blank" rel="noopener noreferrer" href={setupURL(data?.url)}>
            <Tooltip title={setupURL(data?.url)}>
              <img alt="" src={imageLoad(data)} onError={setDefaultImage} />
            </Tooltip>
          </a>
          {text}
          <span>{data.team}</span>
        </span>
      ),
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
      title: 'Founder',
      dataIndex: 'founder',
      key: 'founder',
      render: (text) => text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      sorter: (a, b) => a.founder.localeCompare(b.founder),
    },
  ];

  return (
    <>
      <h1>Team Statistics</h1>
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
