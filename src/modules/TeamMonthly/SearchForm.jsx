import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
} from 'antd';
import { css } from '@emotion/react';
import { getTeamMonthly } from 'store/stats/actions';
import { useDispatch } from 'react-redux';

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
  titleSelect: css`
    font-size: 1.6rem;
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
    margin: 2rem 0;
  `,
};
const SearchForm = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);

  useEffect(() => {
    dispatch(getTeamMonthly({ month, year }));
  }, [month, year]);

  return (
    <Form
      css={styles.container}
    >
      <h1 css={styles.title}>
        <span>Team Statistics for </span>
        <Select
          css={[styles.width10, styles.titleSelect]}
          value={month}
          onChange={setMonth}
        >
          { MONTHS.map((m, i) => <Select.Option value={(i + 1)}>{m}</Select.Option>) }
        </Select>
        <Select
          css={[styles.width10, styles.titleSelect]}
          value={year}
          onChange={setYear}
        >
          { YEARS().map((y) => <Select.Option value={y}>{y}</Select.Option>) }
        </Select>
      </h1>
    </Form>
  );
};

export default SearchForm;
