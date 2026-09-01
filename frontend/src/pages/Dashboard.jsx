import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/applications/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load applications");
      }

      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load applications.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(applicationId, newStatus) {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    setUpdatingId(applicationId);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/applications/${applicationId}/status?status=${encodeURIComponent(
          newStatus
        )}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedApplication = await response.json();

      setApplications((previous) =>
        previous.map((application) =>
          application.id === updatedApplication.id
            ? updatedApplication
            : application
        )
      );
    } catch (error) {
      console.error(error);
      setError("Unable to update application status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "interview"
  ).length;

  const selected = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "selected"
  ).length;

  const inProgress = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "applied"
  ).length;

  const userName =
    localStorage.getItem("name") || "there";

  return (
    <div className="dashboard-page">

      {/* Hero */}

      <section className="dashboard-hero">

        <div className="dashboard-welcome">

          <span className="dashboard-eyebrow">
            YOUR JOB SEARCH
          </span>

          <h1>
            Welcome back,{" "}
            <span>{userName}</span> 👋
          </h1>

          <p>
            Keep track of your applications,
            interviews and career progress all
            in one place.
          </p>

        </div>

        <Link
          to="/jobs"
          className="dashboard-browse-button"
        >
          Browse Jobs →
        </Link>

      </section>

      {/* Statistics */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon blue">
            📄
          </div>

          <div>
            <span>Total Applications</span>
            <strong>{totalApplications}</strong>
          </div>

        </div>

        <div className="dashboard-stat-card">

          <div className="stat-icon purple">
            🎯
          </div>

          <div>
            <span>Interviews</span>
            <strong>{interviews}</strong>
          </div>

        </div>

        <div className="dashboard-stat-card">

          <div className="stat-icon green">
            ✓
          </div>

          <div>
            <span>Selected</span>
            <strong>{selected}</strong>
          </div>

        </div>

        <div className="dashboard-stat-card">

          <div className="stat-icon orange">
            ⏳
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
          </div>

        </div>

      </section>

      {/* Applications */}

      <section className="dashboard-applications">

        <div className="dashboard-section-header">

          <div>
            <span className="section-label">
              APPLICATION TRACKER
            </span>

            <h2>
              My Applications
            </h2>

            <p>
              Monitor the progress of your job
              applications.
            </p>
          </div>

          <Link to="/jobs">
            Find More Jobs →
          </Link>

        </div>

        {/* Loading */}

        {loading && (
          <div className="dashboard-message">
            <div className="loading-spinner"></div>
            <p>Loading your applications...</p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="dashboard-message error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          applications.length === 0 && (
            <div className="empty-applications">

              <div className="empty-icon">
                📋
              </div>

              <h3>
                No applications yet
              </h3>

              <p>
                Start exploring jobs and submit
                your first application.
              </p>

              <Link
                to="/jobs"
                className="empty-button"
              >
                Explore Jobs →
              </Link>

            </div>
          )}

        {/* Application Cards */}

        {!loading &&
          !error &&
          applications.length > 0 && (

            <div className="modern-application-list">

              {applications.map((application) => {

                const status =
                  application.status || "Applied";

                const statusClass =
                  status.toLowerCase();

                return (
                  <div
                    className="modern-application-card"
                    key={application.id}
                  >

                    <div className="application-company-logo">
                      {application.job?.company
                        ?.charAt(0)
                        ?.toUpperCase() || "J"}
                    </div>

                    <div className="modern-application-info">

                      <h3>
                        {application.job?.title ||
                          "Job"}
                      </h3>

                      <p className="application-company">
                        {application.job?.company ||
                          "Company"}
                      </p>

                      <div className="application-meta">

                        <span>
                          📍{" "}
                          {application.job?.location ||
                            "Location"}
                        </span>

                        <span>
                          💼{" "}
                          {application.job?.type ||
                            "Job Type"}
                        </span>

                      </div>

                    </div>

                    <div className="application-right">

                      <span
                        className={`modern-status ${statusClass}`}
                      >
                        <span className="status-dot"></span>
                        {status}
                      </span>

                      <span className="application-number">
                        Application #{application.id}
                      </span>

                      <select
                        value={status}
                        disabled={
                          updatingId ===
                          application.id
                        }
                        onChange={(e) =>
                          updateStatus(
                            application.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Applied">
                          Applied
                        </option>

                        <option value="Interview">
                          Interview
                        </option>

                        <option value="Selected">
                          Selected
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>
                      </select>

                      {updatingId ===
                        application.id && (
                        <small>
                          Updating...
                        </small>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </section>

    </div>
  );
}

export default Dashboard;