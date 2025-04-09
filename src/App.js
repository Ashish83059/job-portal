import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Jobs from './components/Jobs';
import PostJob from './components/PostJob';
import SaveJobs from './components/SaveJobs';
import Discussion from './components/Discussion';
import ApplyJobs from './components/ApplyJobs';
import Dashboard from './components/Dashboard';
import Login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route is public */}
        <Route path="/login" element={<Login />} />

        {/* All other routes are protected */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        } />
        <Route path="/post-job" element={
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        } />
        <Route path="/apply-jobs" element={
          <ProtectedRoute>
            <ApplyJobs />
          </ProtectedRoute>
        } />
        <Route path="/saved-job" element={
          <ProtectedRoute>
            <SaveJobs />
          </ProtectedRoute>
        } />
        <Route path="/discussion" element={
          <ProtectedRoute>
            <Discussion />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
