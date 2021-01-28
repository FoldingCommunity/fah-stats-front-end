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
    margin: 1rem 0;
  `,
  width10: css`
    width: 10rem;
  `,
  width12: css`
    width: 12rem;
  `,
};
const Header = () => {
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
      <Select
        css={styles.width12}
        value={month}
        onChange={setMonth}
        key="month"
      >
        { MONTHS.map((m, i) => <Select.Option key={m} value={(i + 1)}>{m}</Select.Option>) }
      </Select>
      <Select
        css={styles.width10}
        value={year}
        onChange={setYear}
        key="year"
      >
        { YEARS().map((y) => <Select.Option key={y} value={y}>{y}</Select.Option>) }
      </Select>
    </Form>
  );
};

export default Header;
