import { Provider } from 'react-redux';
import React from 'react';
import './App.less';
import Header from 'modules/Header/Header';
import Routes from 'utils/Routes';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  </Provider>
);

export default App;
