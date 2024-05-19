import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';

import AddItem from './components/AddItem';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/add" element={<AddItem/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
