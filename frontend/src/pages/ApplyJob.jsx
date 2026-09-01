import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ApplyJob() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const jobId = searchParams.get("jobId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get logged-in user's email
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Check login
    if (!token || !email) {
      setMessage("Please login before applying.");
      return;
    }

    if (!jobId) {
      setMessage("Job information is missing.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/applications?jobId=${jobId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            applicantName: name,
            applicantEmail: email,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Application failed");
      }

      setMessage(
        "Application submitted successfully! 🎉"
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Application error:", error);

      setMessage(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Apply for Job</h1>

        <p>
          Submit your application below.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}

          <label>Email</label>

          <input
            type="email"
            value={email}
            readOnly
            required
          />

          <small>
            Using your registered account email.
          </small>

          {/* Submit */}

          <button
            type="submit"
            className="submit-application-button"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default ApplyJob;