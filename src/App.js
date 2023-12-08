// App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroductionScreen from './IntroductionScreen';
import Shop from './Shop';

// import CategoriesScreen from './CategoriesScreen';

export default function App() {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/" element = {<IntroductionScreen/>} />
          <Route path="/shop" element = {<Shop/>} />
          {/* <Route path="/categories" component={CategoriesScreen} /> */}
          {/* Add more routes for other screens */}
          </Routes>
      </div>
    </Router>
  );
}



