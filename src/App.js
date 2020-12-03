import React, { Fragment } from 'react';
import './App.less';
import { PageHeader } from 'antd';
import DataTabs from './DataTabs';

const App = () => {
  return (
    <div className="App">
      <PageHeader
        title={(
          <Fragment>
            <img alt='FOLDING@HOME' src='/logo-2.png' height='50' />
          </Fragment>
        )}
      />
      <div style={{ padding: '0 24px' }}>
        <DataTabs />
      </div>
    </div>
  );
}

export default App;
