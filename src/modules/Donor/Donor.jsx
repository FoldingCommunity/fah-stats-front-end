import DataTable from 'elements/DataTable/DataTable';
import React, { useEffect } from 'react';
import { getDonor } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import Header from 'modules/Donor/Header';

const styles = {
  donorNameId: css`
    display: flex;
    > span {
      flex: 1;
      text-align: right;
      margin-left: 0.5rem;
      color: #CCCCCC;
    }
  `,
};
const Donor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDonor({}));
  }, []);

  const stats = useSelector((state) => state.stats);
  const columns = [
    {
      title: 'Donor Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, data) => (
        <span css={styles.donorNameId}>
          {text}
          <span>
            {data.id}
          </span>
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
  ];

  return (
    <>
      <h1>Donor Statistics</h1>
      <Header />
      <DataTable
        columns={columns}
        dataSource={stats?.donors}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};

export default Donor;
