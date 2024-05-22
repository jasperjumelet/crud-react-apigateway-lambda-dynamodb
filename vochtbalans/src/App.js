import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';

import AddItem from './components/AddItem';
import Item from './components/Item';
import ItemList from './components/Itemlist';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/item" element={<ItemList/>} />
          <Route path="/add" element={<AddItem/>} />
          <Route path="/items/:id" element={<Item/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
