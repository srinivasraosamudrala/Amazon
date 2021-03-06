import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/components/Routes/Main';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
