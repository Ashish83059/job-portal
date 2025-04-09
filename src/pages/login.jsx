import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Make sure this file is named exactly as imported

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  
    console.log('Typed Email:', email);
    console.log('Typed Password:', password);
    console.log('Check Email:', email.trim() === 'user@example.com');
    console.log('Check Password:', password.trim() === 'password123');
  
    if (email.trim() === 'user@example.com' && password.trim() === 'password123') {
      console.log('✅ Login successful. Saving to localStorage...');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');

    } else {
      console.log('❌ Invalid credentials');
      alert('Invalid credentials');
    }
  };
  
  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="form">
        <p className="title">Login</p>
        <p className="message">Login to your job portal account.</p>

        {/* Email Input */}
        <label>
          <input
            required
            placeholder=""
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        {/* Password Input */}
        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Submit Button */}
        <button type="submit" className="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
