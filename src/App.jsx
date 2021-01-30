import { Provider } from 'react-redux';
import React from 'react';
import { css } from '@emotion/react';
import './App.less';
import Header from 'modules/Header/Header';
import Routes from 'utils/Routes';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { ProgressBar } from 'react-fetch-progressbar';

const styles = {
  container: css`
    margin: 0 auto;
    @media (min-width:768px) {
      width: 100%;
    }
    @media (min-width:992px) {
      width: 970px;
    }
    @media (min-width:1200px) {
      width: 1170px;
    }
  `,
  containerHeader: css`
    padding: 0 1rem;
  `,
  containerBody: css`
    padding: 1rem;
  `,
  header: css`
    padding: 0;
    background: #383838 none repeat scroll 0% 0%;
    box-shadow: black 0px 0px 8px 0px;
  `,
};
const oldStyles = {
  progressBar: {
    backgroundColor: '#fe6215',
    height: '3px',
    opacity: '0.75',
    position: 'fixed',
  },
};
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div css={styles.header}>
        <ProgressBar style={oldStyles.progressBar} />
        <div css={[styles.container, styles.containerHeader]}><Header /></div>
      </div>
      <div css={[styles.container, styles.containerBody]}><Routes /></div>
    </BrowserRouter>
  </Provider>
);

export default App;
