import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const ApplyJobs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [resume, setResume] = useState(null);

  const OnformSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    if (name === "") {
      alert("Please fill the name first");
    } else if (!resume) {
      alert("Please upload your resume");
    } else {
      alert("Your Job Application has been Applied Successfully");
      navigate("/Jobs");
    }
  };

  return (
    <div className="apply-job">
      <div className="container">
        <header className="header">
          <h1 className="post-job">Fill the form</h1>
        </header>
        <form onSubmit={OnformSubmit}>
          <div className="form-group">
            <label id="name-label" htmlFor="name">
              Enter Your Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Your Resume</label>
            <input
              type="file"
              id="myFile"
              name="filename"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobs;
