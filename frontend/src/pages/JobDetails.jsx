import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Job not found");
        }

        return response.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load job details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="job-details-page">

      <div className="job-details-header">

        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <div>
          <h1>{job.title}</h1>
          <p>{job.company}</p>
        </div>

      </div>

      <div className="job-details-layout">

        <main className="job-description">

          <h2>Job Description</h2>

          <p>
            We are looking for a motivated developer
            to join our development team.
          </p>

          <h2>Responsibilities</h2>

          <ul>
            <li>Develop and maintain applications.</li>
            <li>Build REST APIs using Spring Boot.</li>
            <li>Work with databases.</li>
            <li>Write clean and maintainable code.</li>
            <li>Collaborate with other developers.</li>
          </ul>

          <h2>Requirements</h2>

          <ul>
            <li>Good knowledge of Java.</li>
            <li>Understanding of OOP concepts.</li>
            <li>Basic knowledge of SQL.</li>
            <li>Knowledge of Spring Boot is preferred.</li>
          </ul>

        </main>

        <aside className="job-sidebar">

          <h3>Job Information</h3>

          <p>📍 {job.location}</p>
          <p>💼 {job.type}</p>
          <p>💰 {job.salary}</p>

          <Link
            to={`/apply?jobId=${job.id}`}
            className="apply-large"
          >
            Apply Now
          </Link>

        </aside>

      </div>

    </div>
  );
}

export default JobDetails;