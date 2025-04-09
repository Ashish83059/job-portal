import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');  // ✅ clear login flag
    navigate('/login');                    // 🔁 redirect to login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Dashboard</h1>
      <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '100px',
    backgroundColor: '#f4f4f4',
    height: '100vh'
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px'
  },
  logoutBtn: {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default Dashboard;
