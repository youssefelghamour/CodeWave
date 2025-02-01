import React, { Component, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './HomePage';
import Article from './ArticlePage';
import Admin from './Admin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<Article path="news" />} />
      <Route path="/update/:id" element={<Article path="update"/>} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;