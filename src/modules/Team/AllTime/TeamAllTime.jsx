import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getTeam } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'modules/Team/AllTime/Header';
import { css } from '@emotion/react';
import { Tooltip } from 'antd';
import { PrettyCount } from 'utils/format';

const DEFAULT_LOGO = '/logo.png';
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
  dLogo: css`
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
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
          <a target="_blank" rel="noopener noreferrer" href={setupURL(data?.url)}>
            <Tooltip title={setupURL(data?.url)}>
              <img alt="" src={imageLoad(data)} onError={setDefaultImage} css={styles.dLogo} />
            </Tooltip>
          </a>
          <span css={styles.dName}>{text}</span>
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
