import { Link } from "react-router-dom";

function About() {
  return (
    <div className="modern-about-page">

      {/* Hero */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-eyebrow">
            ABOUT JOBTRACK
          </span>

          <h1>
            Your job search,
            <span> organized.</span>
          </h1>

          <p>
            JobTrack helps job seekers discover opportunities,
            manage applications, and stay on top of their
            career journey — all in one simple platform.
          </p>

          <div className="about-hero-buttons">

            <Link
              to="/jobs"
              className="about-primary-button"
            >
              Explore Jobs →
            </Link>

            <Link
              to="/dashboard"
              className="about-secondary-button"
            >
              Go to Dashboard
            </Link>

          </div>

        </div>

        <div className="about-hero-visual">

          <div className="floating-card main-card">

            <div className="visual-top">
              <span className="visual-icon">
                ✓
              </span>

              <span className="visual-status">
                Application
              </span>
            </div>

            <h3>
              Java Developer
            </h3>

            <p>
              Tech Solutions
            </p>

            <div className="visual-progress">
              <span></span>
            </div>

            <small>
              Application submitted
            </small>

          </div>

          <div className="floating-card small-card">

            <strong>
              4
            </strong>

            <span>
              Applications
            </span>

          </div>

          <div className="floating-card interview-card">

            <span>
              🎯
            </span>

            <div>
              <strong>
                Interview
              </strong>

              <small>
                Stay prepared
              </small>
            </div>

          </div>

        </div>

      </section>


      {/* Mission */}

      <section className="about-mission">

        <div className="about-section-heading">

          <span>
            OUR MISSION
          </span>

          <h2>
            Make the job search
            <br />
            less stressful.
          </h2>

        </div>

        <div className="about-mission-text">

          <p>
            Searching for a job can quickly become
            overwhelming. Applications get lost,
            interview dates are forgotten, and it can
            be difficult to remember where you applied.
          </p>

          <p>
            JobTrack brings everything together in one
            place so you can focus on what matters most:
            finding the right opportunity and building
            your career.
          </p>

        </div>

      </section>


      {/* Features */}

      <section className="about-features-section">

        <div className="about-section-heading center">

          <span>
            EVERYTHING YOU NEED
          </span>

          <h2>
            Built for a smarter
            <br />
            job search.
          </h2>

          <p>
            Simple tools designed to help you stay
            organized throughout your career journey.
          </p>

        </div>


        <div className="modern-about-features">

          <div className="about-feature-card">

            <div className="about-feature-icon blue">
              🔎
            </div>

            <h3>
              Discover Jobs
            </h3>

            <p>
              Search through available opportunities
              using job title, company, location,
              job type and experience.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon purple">
              📝
            </div>

            <h3>
              Apply Easily
            </h3>

            <p>
              Submit applications quickly and keep
              your job search information organized.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon green">
              📊
            </div>

            <h3>
              Track Progress
            </h3>

            <p>
              Monitor whether an application is Applied,
              Interview, Selected or Rejected.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon orange">
              🔐
            </div>

            <h3>
              Secure Account
            </h3>

            <p>
              User authentication and JWT-based security
              help protect your JobTrack account.
            </p>

          </div>

        </div>

      </section>


      {/* How it works */}

      <section className="about-how-section">

        <div className="about-section-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            From searching
            <br />
            to getting hired.
          </h2>

        </div>


        <div className="about-steps">

          <div className="about-step">

            <div className="step-number">
              01
            </div>

            <div>
              <h3>
                Find an opportunity
              </h3>

              <p>
                Browse jobs and use filters to find
                positions that match your goals.
              </p>
            </div>

          </div>


          <div className="about-step">

            <div className="step-number">
              02
            </div>

            <div>
              <h3>
                Submit your application
              </h3>

              <p>
                Open a job, review the details and
                submit your application.
              </p>
            </div>

          </div>


          <div className="about-step">

            <div className="step-number">
              03
            </div>

            <div>
              <h3>
                Track your progress
              </h3>

              <p>
                Follow every application from
                submission through the hiring process.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="about-cta">

        <div>

          <span>
            READY TO GET STARTED?
          </span>

          <h2>
            Your next opportunity
            <br />
            could be one search away.
          </h2>

        </div>

        <Link
          to="/jobs"
          className="about-cta-button"
        >
          Find Your Next Job →
        </Link>

      </section>

    </div>
  );
}

export default About;