import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Result } from 'antd';

const styles = {
  container: css`
    margin: 1rem;
  `,
  note: css`
    margin-bottom: 3rem;
  `,
};
const Missing = () => {
  const location = useLocation();

  return (
    <div css={styles.container}>
      <Result
        status="warning"
        title="Page Not Found!"
        extra={(
          <>
            <div css={styles.note}>
              { `Your requested page ${location.pathname} was not found.` }
            </div>
            <Link to="/">Take me back Home</Link>
          </>
        )}
      />
    </div>
  );
};

export default Missing;
