import React from 'react';
import './App.css';
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
