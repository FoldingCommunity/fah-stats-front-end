import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';
import { css } from '@emotion/react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const CURRENT_YEAR = (new Date()).getFullYear();
const CURRENT_MONTH = (new Date()).getMonth() + 1;
const YEARS = () => {
  const list = [];
  (new Array(5)).fill(0).forEach((i, j) => {
    list.push(CURRENT_YEAR - j);
  });
  return list;
};
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
  title: css`
    font-size: 1.4rem;
  `,
};
const SearchForm = () => {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [searchType, setSearchType] = useState('Team Name');

  return (
    <Form
      css={styles.container}
    >
      <h2 css={styles.title}>
        <span>Team Statistics for </span>
        <Select
          css={styles.width10}
          value={month}
          onChange={setMonth}
        >
          { MONTHS.map((m, i) => <Select.Option value={(i + 1)}>{m}</Select.Option>) }
        </Select>
        <Select
          css={styles.width5}
          value={year}
          onChange={setYear}
        >
          { YEARS().map((y) => <Select.Option value={y}>{y}</Select.Option>) }
        </Select>
      </h2>
      <div>
        <Input
          placeholder="Search"
          type="text"
          css={styles.width10}
        />
        <Select
          value={searchType}
          onChange={setSearchType}
          css={styles.width10}
        >
          <Select.Option value="team_name">Team Name</Select.Option>
          <Select.Option value="team_id">Team ID</Select.Option>
        </Select>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
