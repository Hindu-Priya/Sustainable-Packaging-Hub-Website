
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroductionScreen from './IntroductionScreen';
import Shop from './Shop';
import LoginForm from './LoginForm';

// import CategoriesScreen from './CategoriesScreen';

export default function App() {
  return (
    <Router>
      <div>
      <Routes>
      <Route path="/user/:userName" element={<IntroductionScreen/> }/>
        < Route path="/" element={<LoginForm />} />
          <Route path="/shop/:userName" element = {<Shop/>} />
          </Routes>
      </div>
    </Router>
  );
}



