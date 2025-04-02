import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error">404</div>
      <br />
      <br />
      <span className="info">File not found</span>
      <img
        src="https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif"
        className="static"
        alt="404-error"
      />
      <div className="home-button">
        <Link to="/">Go To Home</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
