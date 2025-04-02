import { useState } from "react";
import "./index.css";

const experience = [
  { label: "0-1 year", min: 0, max: 1 },
  { label: "2-3 years", min: 2, max: 3 },
  { label: "4-5 years", min: 4, max: 5 },
  { label: "5+ years", min: 5, max: 10 },
];

const Filter = ({
  setFilteredJobs,
  handleJobFilter,
  handleExperienceFilter,
  searchEvent,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(experience.length).fill(false)
  );

  const handleOnChange = (position) => {
    setCheckedState((prevState) => {
      const newState = [...prevState];
      newState[position] = !newState[position];

      // Pass only selected experiences
      const selectedExperience = experience.filter((_, index) => newState[index]);
      handleExperienceFilter(selectedExperience);
      
      return newState;
    });
  };

  return (
    <>
      <div className="filter-page">
        <div className="search-box">
          {/* Job Search */}
          <div className="search">
            <h3>Search Jobs</h3>
            <div className="job-search">
              <input
                type="text"
                className="search-term"
                placeholder="Search Here"
                onChange={searchEvent}
              />
            </div>
          </div>

          {/* Job Category Filter */}
          <div className="filter">
            <div className="job-category">
              <h4>Categories</h4>
              <ul>
                {["Frontend", "Backend", "DevOps", "Full Stack", "Digital Marketing"].map(
                  (category) => (
                    <li key={category} onClick={handleJobFilter}>
                      {category}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Experience Filter */}
            <div className="job-category">
              <h4>Experience</h4>
              <ul className="checkbox">
                {experience.map((exp, index) => (
                  <li key={exp.label}>
                    <label>
                      <input
                        name={exp.label}
                        type="checkbox"
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />
                      {exp.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
