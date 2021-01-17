import React from 'react';
import './App.less';
import Header from 'modules/Header/Header';
import Routes from 'modules/Config/Routes';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
