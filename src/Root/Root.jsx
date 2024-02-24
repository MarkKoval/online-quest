import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from '../Components/Login/login';
import DataPage from '../Components/DataPage/DataPage';

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/DaTaPaGe" element={<DataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
