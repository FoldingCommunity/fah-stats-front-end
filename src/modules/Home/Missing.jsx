import React from 'react';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Result, Button } from 'antd';

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
            <Button type="primary" key="console">Go Home</Button>
          </>
        )}
      />
    </div>
  );
};

export default Missing;
