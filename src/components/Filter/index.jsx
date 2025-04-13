import { useState } from "react";
import "./index.css";

const experienceRanges = [
  { label: "0-1 year", min: 0, max: 1 },
  { label: "2-3 years", min: 2, max: 3 },
  { label: "4-5 years", min: 4, max: 5 },
  { label: "5+ years", min: 5, max: 50 }, // high max to cover wide range
];

// Utility: parse "2-3 years", "5+ years", or numeric string
const parseExperienceValue = (exp) => {
  if (typeof exp === "number") return exp;

  if (typeof exp === "string") {
    if (exp.includes("+")) return parseInt(exp);
    if (exp.includes("-")) return parseInt(exp.split("-")[0]);
    return parseInt(exp);
  }

  return NaN;
};

const Filter = ({
  setFilteredJobs,
  handleJobFilter,
  allJobs,
  searchEvent,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(experienceRanges.length).fill(false)
  );

  const handleOnChange = (position) => {
    const newState = [...checkedState];
    newState[position] = !newState[position];
    setCheckedState(newState);

    const selectedRanges = experienceRanges.filter((_, index) => newState[index]);

    if (selectedRanges.length === 0) {
      setFilteredJobs(allJobs); // No filters = show all
      return;
    }

    const filtered = allJobs.filter((job) => {
      const jobExp = parseExperienceValue(job.experience);
      if (isNaN(jobExp)) return false;

      return selectedRanges.some(
        (range) => jobExp >= range.min && jobExp <= range.max
      );
    });

    setFilteredJobs(filtered);
  };

  return (
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

        {/* Category Filter */}
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
              {experienceRanges.map((exp, index) => (
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
  );
};

export default Filter;
