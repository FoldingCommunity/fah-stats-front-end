import React, { useState } from 'react';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { css } from '@emotion/react';
import { getTeam } from 'store/stats/actions';
import { useDispatch } from 'react-redux';

const styles = {
  container: css`
    margin: 1rem;
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
  title: css`
    margin: 2rem 0 1rem;
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
  const [teamName, setTeamName] = useState();
  const triggerSearch = () => {
    dispatch(getTeam({ teamName }));
  };
  const clearSearch = () => {
    setTeamName();
    dispatch(getTeam({}));
  };

  return (
    <Form
      css={styles.container}
      onFinish={triggerSearch}
    >
      <h1 css={styles.title}>Team Statistics</h1>
      <div>
        <span css={styles.searchInput}>
          <Input
            placeholder="Search Team Name"
            type="text"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            css={styles.width15}
          />
          { teamName && (
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
