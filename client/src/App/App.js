import React, { Component, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './HomePage';
import Article from './ArticlePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<Article path="news" />} />
      <Route path="/update/:id" element={<Article path="update"/>} />
    </Routes>
  );
};

export default App;