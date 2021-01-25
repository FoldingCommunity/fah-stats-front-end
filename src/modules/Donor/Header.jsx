import React from 'react';
import { css } from '@emotion/react';

const styles = {
  container: css`
    margin: 1rem;
  `,
  title: css`
    margin: 2rem 0;
  `,
};
const Header = () => (
  <div css={styles.container}>
    <h1 css={styles.title}>Donor Statistics</h1>
  </div>
);

export default Header;
