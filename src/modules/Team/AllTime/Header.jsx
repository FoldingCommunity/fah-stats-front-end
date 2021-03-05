import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
const Header = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState();
  const triggerSearch = () => {
    setActiveTab('2');
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

Header.propTypes = {
  setActiveTab: PropTypes.func, // eslint-disable-line
};

export default Header;
