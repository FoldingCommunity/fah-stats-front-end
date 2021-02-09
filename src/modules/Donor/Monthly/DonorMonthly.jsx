import DataTable from 'elements/DataTable/DataTable';
import Header from 'modules/Donor/Monthly/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { PrettyCount } from 'utils/format';
import { Link } from 'react-router-dom';
import { Statistic, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

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
const getStyles = (num) => {
  let ret = {};

  if (num > 0) {
    ret = {
      color: { color: '#3f8600' },
      arrow: <ArrowUpOutlined />,
    };
  } else if (num < 0) {
    ret = {
      color: { color: '#cf1322' },
      arrow: <ArrowDownOutlined />,
    };
  }

  return ret;
};
const DonorMonthly = () => {
  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 50,
      render: (rank) => <PrettyCount count={rank} />,
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      width: 100,
      render: (change, data) => {
        const statStyles = getStyles(change);
        return (
          <>
            { data?.previous_rank ? (
              <>
                <Statistic
                  value={Math.abs(change)}
                  valueStyle={statStyles.color}
                  prefix={statStyles.arrow}
                />
                <span>Prev: </span>
                <PrettyCount count={data.previous_rank} />
              </>
            ) : <Tag color="#fe6215">NEW</Tag> }
          </>
        );
      },
      sorter: (a, b) => a.change - b.change,
    },
    {
      title: 'Donor Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (text, data) => (
        <span css={styles.dNameIdContainer}>
          <Link css={styles.dName} target="_blank" to={`/donor/${data.id}`}>{text}</Link>
          <span css={styles.dId}>{data.id}</span>
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
  ];

  return (
    <>
      <Header />
      <DataTable
        columns={columns}
        dataSource={stats?.donorMonthly}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    </>
  );
};

export default DonorMonthly;
