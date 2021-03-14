import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { PrettyCount } from 'utils/format';
import { Link } from 'react-router-dom';
import { Statistic, Tag, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { getDonorMonthly } from 'store/stats/actions';

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
const DonorMonthlyMini = () => {
  const stats = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    const CURRENT_YEAR = (new Date()).getFullYear();
    const CURRENT_MONTH = (new Date()).getMonth() + 1;
    dispatch(getDonorMonthly({ year: CURRENT_YEAR, month: CURRENT_MONTH }));
  }, []);

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
      width: 90,
      render: (change, data) => {
        const statStyles = getStyles(change);
        return (
          <>
            { data?.previous_rank ? (
              <Tooltip title={`Prev: ${data.previous_rank}`}>
                <Statistic
                  value={Math.abs(change)}
                  valueStyle={statStyles.color}
                  prefix={statStyles.arrow}
                />
              </Tooltip>
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
      render: (text, data) => (
        <span css={styles.dNameIdContainer}>
          <Link css={styles.dName} target="_blank" to={`/donor/${data.id}`}>{text}</Link>
          <span css={styles.dId}>{data.id}</span>
        </span>
      ),
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={stats?.donorMonthly}
      pagination={{ defaultPageSize: 10, showSizeChanger: false }}
    />
  );
};

export default DonorMonthlyMini;
