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
const SearchForm = () => (
  <div
    css={styles.container}
  >
    <h1 css={styles.title}>
      <span>OS Statistics</span>
    </h1>
  </div>
);

export default SearchForm;
