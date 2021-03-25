import React, { useState, useEffect } from 'react';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { css } from '@emotion/react';
import { getDonorMyself, clearDonorMyself } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';
import DonorCard from 'modules/Donor/DonorCard';

const styles = {
  container: css`
    margin: 1rem 0;
  `,
  width5: css`
    width: 5rem;
  `,
  width10: css`
    width: 10rem;
  `,
  width15: css`
    width: 15rem;
  `,
  searchInput: css`
    position: relative;
  `,
  clearIcon: css`
    position: absolute;
    right: 0;
    margin: 0.15rem;
    padding: 0.35rem;
    cursor: pointer;
    background-color: white;
  `,
  teams: css`
    > div {
      margin-bottom: 1rem;
    }
  `,
  CertificateLink: css`
    margin-left: 0.5rem;
  `,
};
const MeAndTeams = () => {
  const dispatch = useDispatch();
  const [donorName, setDonorName] = useState();

  useEffect(() => {
    dispatch(getDonorMyself({}));
  }, []);
  const triggerSearch = () => {
    dispatch(getDonorMyself({ donorName }));
  };
  const clearSearch = () => {
    setDonorName();
    dispatch(clearDonorMyself());
  };
  const stats = useSelector((state) => state.stats);
  const myself = stats?.myself?.[0];

  return myself ? (
    <DonorCard donor={myself} editAction={clearSearch} />
  ) : (
    <Form
      css={styles.container}
      onFinish={triggerSearch}
    >
      <div>
        <span css={styles.searchInput}>
          <Input
            placeholder="Look up my Donor Name"
            type="text"
            value={donorName}
            onChange={(event) => setDonorName(event.target.value)}
            css={styles.width15}
          />
          { donorName && (
            <CloseCircleOutlined
              css={styles.clearIcon}
              onClick={clearSearch}
            />
          ) }
        </span>
        <Button type="primary" htmlType="submit">
          <SearchOutlined />
          Lookup
        </Button>
      </div>
    </Form>
  );
};

export default MeAndTeams;
