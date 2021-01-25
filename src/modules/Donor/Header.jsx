import React, { useState } from 'react';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { css } from '@emotion/react';
import { getDonor } from 'store/stats/actions';
import { useDispatch } from 'react-redux';

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
    padding: 0.5rem;
    cursor: pointer;
  `,
};
const Header = () => {
  const dispatch = useDispatch();
  const [donorName, setdonorName] = useState();
  const triggerSearch = () => {
    dispatch(getDonor({ donorName }));
  };
  const clearSearch = () => {
    setdonorName();
    dispatch(getDonor({}));
  };

  return (
    <Form
      css={styles.container}
      onFinish={triggerSearch}
    >
      <div>
        <span css={styles.searchInput}>
          <Input
            placeholder="Search Donor Name"
            type="text"
            value={donorName}
            onChange={(event) => setdonorName(event.target.value)}
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
          Search
        </Button>
      </div>
    </Form>
  );
};

export default Header;
