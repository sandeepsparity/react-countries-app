import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import DisplayCountries from './components/DisplayCountries';
import Table from './components/Table';

function App(): JSX.Element {
  return (
    <div className="App">
      <Header/>
      <DisplayCountries/>
      <Table/>
    </div>
  );
}

export default App;
