import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Java Developer",
      company: "Tech Solutions",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹4 - 7 LPA",
    },
    {
      title: "Frontend Developer",
      company: "Digital Works",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹5 - 8 LPA",
    },
    {
      title: "Software Engineer",
      company: "Innovate Tech",
      location: "Chennai",
      type: "Full Time",
      salary: "₹4 - 6 LPA",
    },
  ];

  const popularSearches = [
    "Java Developer",
    "Frontend Developer",
    "Data Analyst",
    "Software Engineer",
  ];

  return (
    <div className="modern-home">

      {/* =================================
          HERO
      ================================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <span className="home-eyebrow">
            YOUR CAREER STARTS HERE
          </span>

          <h1>
            Find work that
            <br />
            <span>moves you forward.</span>
          </h1>

          <p>
            Discover jobs that match your skills,
            apply with confidence, and keep your
            entire job search organized in one place.
          </p>

          {/* Search */}

          <div className="home-search">

            <div className="home-search-input">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Job title, skills or company"
              />

            </div>

            <div className="home-search-input">

              <span>📍</span>

              <input
                type="text"
                placeholder="Location"
              />

            </div>

            <button
              onClick={() => navigate("/jobs")}
            >
              Search Jobs
            </button>

          </div>

          {/* Popular */}

          <div className="home-popular">

            <span>
              Popular:
            </span>

            {popularSearches.map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    navigate("/jobs")
                  }
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>


        {/* Hero visual */}

        <div className="home-hero-visual">

          <div className="home-glow"></div>

          <div className="home-job-preview">

            <div className="preview-top">

              <div className="preview-logo">
                T
              </div>

              <span className="preview-badge">
                Actively hiring
              </span>

            </div>

            <h3>
              Java Developer
            </h3>

            <p>
              Tech Solutions
            </p>

            <div className="preview-details">

              <span>
                📍 Hyderabad
              </span>

              <span>
                💼 Full Time
              </span>

              <span>
                💰 ₹4 - 7 LPA
              </span>

            </div>

            <div className="preview-bottom">

              <span>
                🎓 Fresher friendly
              </span>

              <button>
                View Job →
              </button>

            </div>

          </div>

          <div className="home-floating-card applications-card">

            <span>
              📊
            </span>

            <div>
              <strong>
                12
              </strong>

              <small>
                Applications tracked
              </small>
            </div>

          </div>

          <div className="home-floating-card success-card">

            <span>
              ✓
            </span>

            <div>
              <strong>
                Interview
              </strong>

              <small>
                Application #08
              </small>
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          STATS
      ================================= */}

      <section className="home-stats">

        <div>
          <strong>
            100+
          </strong>

          <span>
            Job Opportunities
          </span>
        </div>

        <div>
          <strong>
            50+
          </strong>

          <span>
            Companies
          </span>
        </div>

        <div>
          <strong>
            1 Place
          </strong>

          <span>
            For Your Applications
          </span>
        </div>

        <div>
          <strong>
            24/7
          </strong>

          <span>
            Career Tracking
          </span>
        </div>

      </section>


      {/* =================================
          FEATURED JOBS
      ================================= */}

      <section className="home-featured">

        <div className="home-section-header">

          <div>

            <span>
              OPPORTUNITIES
            </span>

            <h2>
              Featured Jobs
            </h2>

            <p>
              Explore opportunities that could
              be your next career move.
            </p>

          </div>

          <Link to="/jobs">
            View All Jobs →
          </Link>

        </div>


        <div className="home-job-grid">

          {jobs.map((job) => (

            <article
              className="home-job-card"
              key={job.title}
            >

              <div className="home-job-top">

                <div className="home-company-logo">
                  {job.company.charAt(0)}
                </div>

                <span>
                  {job.type}
                </span>

              </div>

              <h3>
                {job.title}
              </h3>

              <p className="home-company">
                {job.company}
              </p>

              <div className="home-job-info">

                <span>
                  📍 {job.location}
                </span>

                <span>
                  💰 {job.salary}
                </span>

              </div>

              <div className="home-job-bottom">

                <small>
                  ✦ Actively hiring
                </small>

                <Link to="/jobs">
                  View Job →
                </Link>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =================================
          WHY JOBTRACK
      ================================= */}

      <section className="home-why">

        <div className="home-why-content">

          <span>
            WHY JOBTRACK
          </span>

          <h2>
            Your entire job search,
            <br />
            <em>finally organized.</em>
          </h2>

          <p>
            Stop keeping track of applications in
            spreadsheets and notes. JobTrack gives
            you one clean place to manage your
            career journey.
          </p>

          <Link
            to="/about"
            className="home-learn-button"
          >
            Learn More About JobTrack →
          </Link>

        </div>


        <div className="home-benefits">

          <div className="home-benefit">

            <div>
              🔎
            </div>

            <section>
              <h3>
                Discover opportunities
              </h3>

              <p>
                Search jobs by title, company,
                location, type and experience.
              </p>
            </section>

          </div>


          <div className="home-benefit">

            <div>
              📝
            </div>

            <section>
              <h3>
                Apply with confidence
              </h3>

              <p>
                Keep your applications organized
                and easily accessible.
              </p>
            </section>

          </div>


          <div className="home-benefit">

            <div>
              📊
            </div>

            <section>
              <h3>
                Track every application
              </h3>

              <p>
                Follow your journey from Applied
                to Interview and Selected.
              </p>
            </section>

          </div>


          <div className="home-benefit">

            <div>
              🔐
            </div>

            <section>
              <h3>
                Keep your account secure
              </h3>

              <p>
                Your personal account is protected
                with authentication and JWT security.
              </p>
            </section>

          </div>

        </div>

      </section>


      {/* =================================
          HOW IT WORKS
      ================================= */}

      <section className="home-how">

        <div className="home-section-header center">

          <span>
            SIMPLE PROCESS
          </span>

          <h2>
            From searching to getting hired.
          </h2>

          <p>
            Three simple steps to keep your
            job search moving forward.
          </p>

        </div>


        <div className="home-steps">

          <div className="home-step">

            <span>
              01
            </span>

            <div className="step-icon">
              🔎
            </div>

            <h3>
              Find a Job
            </h3>

            <p>
              Search and filter opportunities
              that match your career goals.
            </p>

          </div>


          <div className="home-step">

            <span>
              02
            </span>

            <div className="step-icon">
              📝
            </div>

            <h3>
              Apply
            </h3>

            <p>
              Submit applications and keep
              all your opportunities organized.
            </p>

          </div>


          <div className="home-step">

            <span>
              03
            </span>

            <div className="step-icon">
              🎯
            </div>

            <h3>
              Track & Grow
            </h3>

            <p>
              Monitor your progress and stay
              focused on your next opportunity.
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          CTA
      ================================= */}

      <section className="home-cta">

        <div>

          <span>
            START YOUR JOURNEY
          </span>

          <h2>
            Your next opportunity
            <br />
            is waiting.
          </h2>

          <p>
            Start exploring jobs and take
            the next step in your career.
          </p>

        </div>

        <Link
          to="/jobs"
          className="home-cta-button"
        >
          Explore Jobs →
        </Link>

      </section>

    </div>
  );
}

export default Home;