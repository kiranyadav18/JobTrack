import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    education: "",
    skills: "",
    summary: "",
    linkedin: "",
    github: "",
    preferredJobType: "",
    preferredLocation: "",
    expectedSalary: "",
  });

  const [applications, setApplications] = useState([]);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
    loadApplications();
  }, []);

  // =========================
  // LOAD PROFILE
  // =========================

  async function loadProfile() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load profile");
      }

      const data = await response.json();

      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        jobTitle: data.jobTitle || "",
        education: data.education || "",
        skills: data.skills || "",
        summary: data.summary || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        preferredJobType:
          data.preferredJobType || "",
        preferredLocation:
          data.preferredLocation || "",
        expectedSalary:
          data.expectedSalary || "",
      });

      // Keep navbar/profile data synchronized
      localStorage.setItem(
        "name",
        data.name || ""
      );

      localStorage.setItem(
        "email",
        data.email || ""
      );

    } catch (err) {
      console.error(err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // LOAD APPLICATIONS
  // =========================

  async function loadApplications() {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://localhost:8080/api/applications/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }

    } catch (err) {
      console.error(
        "Unable to load applications:",
        err
      );
    }
  }

  // =========================
  // HANDLE INPUT
  // =========================

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // =========================
  // SAVE PROFILE
  // =========================

  async function handleSave() {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/auth/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(profile),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to update profile"
        );
      }

      const updatedProfile =
        await response.json();

      setProfile({
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
        location: updatedProfile.location || "",
        jobTitle:
          updatedProfile.jobTitle || "",
        education:
          updatedProfile.education || "",
        skills:
          updatedProfile.skills || "",
        summary:
          updatedProfile.summary || "",
        linkedin:
          updatedProfile.linkedin || "",
        github:
          updatedProfile.github || "",
        preferredJobType:
          updatedProfile.preferredJobType || "",
        preferredLocation:
          updatedProfile.preferredLocation || "",
        expectedSalary:
          updatedProfile.expectedSalary || "",
      });

      // Update navbar data
      localStorage.setItem(
        "name",
        updatedProfile.name || ""
      );

      localStorage.setItem(
        "email",
        updatedProfile.email || ""
      );

      setEditing(false);

      setMessage(
        "Profile updated successfully! ✓"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to update profile. Please try again."
      );

    } finally {
      setSaving(false);
    }
  }

  // =========================
  // CANCEL EDIT
  // =========================

  function handleCancel() {
    setEditing(false);
    setMessage("");
    setError("");

    loadProfile();
  }

  // =========================
  // STATISTICS
  // =========================

  const totalApplications =
    applications.length;

  const interviews =
    applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        "interview"
    ).length;

  const selected =
    applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        "selected"
    ).length;

  const rejected =
    applications.filter(
      (application) =>
        application.status?.toLowerCase() ===
        "rejected"
    ).length;

  // =========================
  // SKILLS
  // =========================

  const skillList = profile.skills
    ? profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0)
    : [];

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="professional-profile">

      {/* =================================
          PROFILE HEADER
      ================================= */}

      <section className="profile-top">

        <div className="profile-top-left">

          <div className="large-profile-avatar">
            {profile.name
              ?.charAt(0)
              ?.toUpperCase() || "U"}
          </div>

          <div>

            <span className="profile-label">
              MY PROFILE
            </span>

            <h1>
              {profile.name || "Your Name"}
            </h1>

            <p className="profile-role">
              {profile.jobTitle ||
                "Add your professional title"}
            </p>

            <div className="profile-location">

              <span>
                📍{" "}
                {profile.location ||
                  "Add your location"}
              </span>

              <span className="profile-active">
                ● Available
              </span>

            </div>

          </div>

        </div>

        <div className="profile-actions">

          {!editing ? (
            <button
              className="edit-profile-button"
              onClick={() => {
                setEditing(true);
                setMessage("");
                setError("");
              }}
            >
              ✎ Edit Profile
            </button>
          ) : (
            <>
              <button
                className="cancel-profile-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                className="save-profile-button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Profile"}
              </button>
            </>
          )}

        </div>

      </section>

      {/* =================================
          MESSAGES
      ================================= */}

      {message && (
        <div className="profile-success">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="profile-error">
          ⚠️ {error}
        </div>
      )}

      {/* =================================
          STATISTICS
      ================================= */}

      <section className="profile-statistics">

        <div className="profile-stat">

          <span className="profile-stat-icon">
            📄
          </span>

          <div>
            <strong>
              {totalApplications}
            </strong>

            <p>
              Applications
            </p>
          </div>

        </div>

        <div className="profile-stat">

          <span className="profile-stat-icon">
            🎯
          </span>

          <div>
            <strong>
              {interviews}
            </strong>

            <p>
              Interviews
            </p>
          </div>

        </div>

        <div className="profile-stat">

          <span className="profile-stat-icon">
            ✓
          </span>

          <div>
            <strong>
              {selected}
            </strong>

            <p>
              Selected
            </p>
          </div>

        </div>

        <div className="profile-stat">

          <span className="profile-stat-icon">
            ✕
          </span>

          <div>
            <strong>
              {rejected}
            </strong>

            <p>
              Rejected
            </p>
          </div>

        </div>

      </section>

      {/* =================================
          ABOUT ME
      ================================= */}

      <section className="profile-card">

        <div className="profile-card-heading">

          <div>
            <span>
              ABOUT ME
            </span>

            <h2>
              Professional Summary
            </h2>
          </div>

        </div>

        {editing ? (
          <textarea
            name="summary"
            value={profile.summary}
            onChange={handleChange}
            placeholder="Tell recruiters about yourself, your experience, goals and strengths..."
            rows="5"
            className="profile-textarea"
          />
        ) : (
          <p className="profile-summary">
            {profile.summary ||
              "Add a short professional summary to tell recruiters about yourself."}
          </p>
        )}

      </section>

      {/* =================================
          PERSONAL INFORMATION
      ================================= */}

      <section className="profile-card">

        <div className="profile-card-heading">

          <div>
            <span>
              PERSONAL INFORMATION
            </span>

            <h2>
              Your Details
            </h2>
          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-field-modern">

            <label>
              Full Name
            </label>

            {editing ? (
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            ) : (
              <p>
                {profile.name || "Not added"}
              </p>
            )}

          </div>

          <div className="profile-field-modern">

            <label>
              Email Address
            </label>

            <p>
              {profile.email}
            </p>

            <small>
              Email cannot be changed
            </small>

          </div>

          <div className="profile-field-modern">

            <label>
              Phone Number
            </label>

            {editing ? (
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
            ) : (
              <p>
                {profile.phone ||
                  "Not added"}
              </p>
            )}

          </div>

          <div className="profile-field-modern">

            <label>
              Location
            </label>

            {editing ? (
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Hyderabad, India"
              />
            ) : (
              <p>
                {profile.location ||
                  "Not added"}
              </p>
            )}

          </div>

        </div>

      </section>

      {/* =================================
          PROFESSIONAL INFORMATION
      ================================= */}

      <section className="profile-card">

        <div className="profile-card-heading">

          <div>
            <span>
              PROFESSIONAL PROFILE
            </span>

            <h2>
              Education & Skills
            </h2>
          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-field-modern">

            <label>
              Current / Desired Job Title
            </label>

            {editing ? (
              <input
                name="jobTitle"
                value={profile.jobTitle}
                onChange={handleChange}
                placeholder="Java Full Stack Developer"
              />
            ) : (
              <p>
                {profile.jobTitle ||
                  "Not added"}
              </p>
            )}

          </div>

          <div className="profile-field-modern">

            <label>
              Education
            </label>

            {editing ? (
              <input
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="B.Tech / B.E / MCA"
              />
            ) : (
              <p>
                {profile.education ||
                  "Not added"}
              </p>
            )}

          </div>

        </div>

        <div className="profile-skills-area">

          <label>
            Skills
          </label>

          {editing ? (
            <input
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="Java, Spring Boot, React, MySQL, Git"
            />
          ) : (
            <div className="profile-skill-list">

              {skillList.length > 0 ? (
                skillList.map(
                  (skill, index) => (
                    <span key={index}>
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p>
                  No skills added yet.
                </p>
              )}

            </div>
          )}

          {editing && (
            <small>
              Separate skills with commas.
            </small>
          )}

        </div>

      </section>

      {/* =================================
          CAREER PREFERENCES
      ================================= */}

      <section className="profile-card">

        <div className="profile-card-heading">

          <div>
            <span>
              CAREER PREFERENCES
            </span>

            <h2>
              What are you looking for?
            </h2>
          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-field-modern">

            <label>
              Preferred Job Type
            </label>

            {editing ? (
              <select
                name="preferredJobType"
                value={profile.preferredJobType}
                onChange={handleChange}
              >
                <option value="">
                  Select job type
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>
              </select>
            ) : (
              <p>
                {profile.preferredJobType ||
                  "Not added"}
              </p>
            )}

          </div>

          <div className="profile-field-modern">

            <label>
              Preferred Location
            </label>

            {editing ? (
              <input
                name="preferredLocation"
                value={profile.preferredLocation}
                onChange={handleChange}
                placeholder="Hyderabad / Remote"
              />
            ) : (
              <p>
                {profile.preferredLocation ||
                  "Not added"}
              </p>
            )}

          </div>

          <div className="profile-field-modern">

            <label>
              Expected Salary
            </label>

            {editing ? (
              <input
                name="expectedSalary"
                value={profile.expectedSalary}
                onChange={handleChange}
                placeholder="₹5 - 8 LPA"
              />
            ) : (
              <p>
                {profile.expectedSalary ||
                  "Not added"}
              </p>
            )}

          </div>

        </div>

      </section>

      {/* =================================
          SOCIAL LINKS
      ================================= */}

      <section className="profile-card">

        <div className="profile-card-heading">

          <div>
            <span>
              ONLINE PRESENCE
            </span>

            <h2>
              Professional Links
            </h2>
          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-field-modern">

            <label>
              LinkedIn
            </label>

            {editing ? (
              <input
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourname"
              />
            ) : (
              profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-social-link"
                >
                  🔗 View LinkedIn Profile →
                </a>
              ) : (
                <p>
                  Not added
                </p>
              )
            )}

          </div>

          <div className="profile-field-modern">

            <label>
              GitHub
            </label>

            {editing ? (
              <input
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="https://github.com/yourname"
              />
            ) : (
              profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-social-link"
                >
                  💻 View GitHub Profile →
                </a>
              ) : (
                <p>
                  Not added
                </p>
              )
            )}

          </div>

        </div>

      </section>

      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <section className="profile-quick-actions">

        <Link to="/jobs">
          <span>💼</span>

          <div>
            <strong>
              Find More Jobs
            </strong>

            <p>
              Explore new opportunities
            </p>
          </div>

          <b>→</b>
        </Link>

        <Link to="/dashboard">
          <span>📊</span>

          <div>
            <strong>
              Application Dashboard
            </strong>

            <p>
              Track your applications
            </p>
          </div>

          <b>→</b>
        </Link>

      </section>

    </div>
  );
}

export default Profile;