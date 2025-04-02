import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  // ✅ Import Navigate
import './App.css';
import Home from './components/Home';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';
import SaveJobs from './components/SaveJobs';
import Discussion from './components/Discussion';
// import ErrorPage from './components/ErrorPage';
import ApplyJobs from './components/ApplyJobs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/apply-jobs" element={<ApplyJobs />} />
        <Route path="/saved-job" element={<SaveJobs />} />
        <Route path="/discussion" element={<Discussion />} />

        {/* If user enters an invalid route, redirect them to Home */}
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
