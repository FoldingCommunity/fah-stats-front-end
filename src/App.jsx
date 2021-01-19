import { Provider } from 'react-redux';
import React from 'react';
import './App.less';
import Header from 'modules/Header/Header';
import Routes from 'utils/Routes';
import store from 'store';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Header />
      <Routes />
    </div>
  </Provider>
);

export default App;
