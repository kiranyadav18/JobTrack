import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [selectedTypes, setSelectedTypes] =
    useState([]);

  const [selectedExperience, setSelectedExperience] =
    useState([]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Unable to load jobs. Please try again."
        );
        setLoading(false);
      });
  }, []);

  function handleTypeChange(type) {
    setSelectedTypes((previous) => {
      if (previous.includes(type)) {
        return previous.filter(
          (item) => item !== type
        );
      }

      return [...previous, type];
    });
  }

  function handleExperienceChange(experience) {
    setSelectedExperience((previous) => {
      if (previous.includes(experience)) {
        return previous.filter(
          (item) => item !== experience
        );
      }

      return [...previous, experience];
    });
  }

  function clearFilters() {
    setSearch("");
    setLocation("");
    setSelectedTypes([]);
    setSelectedExperience([]);
  }

  const filteredJobs = jobs.filter((job) => {

    const jobTitle =
      job.title?.toLowerCase() || "";

    const jobCompany =
      job.company?.toLowerCase() || "";

    const jobLocation =
      job.location?.toLowerCase() || "";

    const jobType =
      job.type?.toLowerCase() || "";

    const jobExperience =
      job.experience?.toLowerCase() || "";

    const searchText =
      search.toLowerCase();

    const matchesSearch =
      jobTitle.includes(searchText) ||
      jobCompany.includes(searchText);

    const matchesLocation =
      jobLocation.includes(
        location.toLowerCase()
      );

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some(
        (type) =>
          jobType === type.toLowerCase()
      );

    const matchesExperience =
      selectedExperience.length === 0 ||
      selectedExperience.some(
        (experience) =>
          jobExperience ===
          experience.toLowerCase()
      );

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesExperience
    );
  });

  return (
    <div className="modern-jobs-page">

      {/* Hero */}

      <section className="jobs-hero">

        <div className="jobs-hero-content">

          <span className="jobs-eyebrow">
            CAREER OPPORTUNITIES
          </span>

          <h1>
            Find work that
            <span> moves you forward.</span>
          </h1>

          <p>
            Discover opportunities from companies
            looking for talented people like you.
          </p>

        </div>

        <div className="jobs-search-box">

          <div className="search-input-wrapper">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Job title or company"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="search-input-wrapper">
            <span>📍</span>

            <input
              type="text"
              placeholder="City or location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />
          </div>

          <button
            type="button"
            onClick={() => {}}
          >
            Search Jobs
          </button>

        </div>

      </section>

      {/* Main */}

      <div className="jobs-main">

        {/* Filters */}

        <aside className="modern-filters">

          <div className="filter-heading">

            <div>
              <span>FILTERS</span>
              <h2>Refine results</h2>
            </div>

            {(selectedTypes.length > 0 ||
              selectedExperience.length > 0 ||
              search ||
              location) && (
              <button
                type="button"
                onClick={clearFilters}
              >
                Clear
              </button>
            )}

          </div>

          {/* Job Type */}

          <div className="filter-group">

            <h3>Job Type</h3>

            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedTypes.includes(
                  "Full Time"
                )}
                onChange={() =>
                  handleTypeChange("Full Time")
                }
              />
              <span className="custom-checkbox"></span>
              <span>Full Time</span>
            </label>

            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedTypes.includes(
                  "Part Time"
                )}
                onChange={() =>
                  handleTypeChange("Part Time")
                }
              />
              <span className="custom-checkbox"></span>
              <span>Part Time</span>
            </label>

            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedTypes.includes(
                  "Internship"
                )}
                onChange={() =>
                  handleTypeChange("Internship")
                }
              />
              <span className="custom-checkbox"></span>
              <span>Internship</span>
            </label>

          </div>

          {/* Experience */}

          <div className="filter-group">

            <h3>Experience</h3>

            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedExperience.includes(
                  "Fresher"
                )}
                onChange={() =>
                  handleExperienceChange(
                    "Fresher"
                  )
                }
              />
              <span className="custom-checkbox"></span>
              <span>Fresher</span>
            </label>

            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedExperience.includes(
                  "1-3 Years"
                )}
                onChange={() =>
                  handleExperienceChange(
                    "1-3 Years"
                  )
                }
              />
              <span className="custom-checkbox"></span>
              <span>1–3 Years</span>
            </label>

            <label className="filter-option">
              <input
                type="checkbox"
                checked={selectedExperience.includes(
                  "3+ Years"
                )}
                onChange={() =>
                  handleExperienceChange(
                    "3+ Years"
                  )
                }
              />
              <span className="custom-checkbox"></span>
              <span>3+ Years</span>
            </label>

          </div>

        </aside>

        {/* Results */}

        <main className="modern-job-results">

          <div className="results-top">

            <div>
              <span className="results-label">
                OPPORTUNITIES
              </span>

              <h2>
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "job"
                  : "jobs"}{" "}
                found
              </h2>
            </div>

            <span className="results-count">
              Showing relevant positions
            </span>

          </div>

          {loading && (
            <div className="jobs-loading">
              <div className="loading-spinner"></div>
              <p>Finding opportunities...</p>
            </div>
          )}

          {error && (
            <div className="jobs-error">
              ⚠️ {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredJobs.length === 0 && (
              <div className="no-jobs">

                <div>🔎</div>

                <h3>
                  No matching jobs
                </h3>

                <p>
                  Try changing your search or
                  filters.
                </p>

                <button
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>
            )}

          {!loading &&
            !error &&
            filteredJobs.length > 0 && (

              <div className="modern-job-list">

                {filteredJobs.map((job) => (

                  <article
                    className="modern-job-card"
                    key={job.id}
                  >

                    <div className="job-card-top">

                      <div className="modern-company-logo">
                        {job.company
                          ?.charAt(0)
                          ?.toUpperCase() || "J"}
                      </div>

                      <div className="job-card-title">

                        <h3>
                          {job.title}
                        </h3>

                        <p>
                          {job.company}
                        </p>

                      </div>

                      <span className="job-type-badge">
                        {job.type}
                      </span>

                    </div>

                    <div className="job-card-meta">

                      <span>
                        📍 {job.location}
                      </span>

                      <span>
                        💰 {job.salary}
                      </span>

                      <span>
                        🎓 {job.experience}
                      </span>

                    </div>

                    <div className="job-card-bottom">

                      <span className="job-posted">
                        ✦ Actively hiring
                      </span>

                      <Link
                        to={`/jobs/${job.id}`}
                        className="view-job-button"
                      >
                        View Job →
                      </Link>

                    </div>

                  </article>

                ))}

              </div>
            )}

        </main>

      </div>

    </div>
  );
}

export default Jobs;