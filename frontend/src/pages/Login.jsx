import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // =========================
      // LOGIN
      // =========================

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const token = await response.text();

      if (!response.ok) {
        throw new Error(
          token || "Invalid email or password"
        );
      }

      // =========================
      // SAVE JWT
      // =========================

      localStorage.setItem(
        "token",
        token
      );

      // Save email for existing features
      localStorage.setItem(
        "email",
        email
      );

      // =========================
      // GET USER DETAILS
      // =========================

      const userResponse = await fetch(
        "http://localhost:8080/api/auth/me",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error(
          "Unable to load user details"
        );
      }

      const user =
        await userResponse.json();

      // Save user's name
      localStorage.setItem(
        "name",
        user.name
      );

      setMessage(
        "Login successful! 🎉"
      );

      // Go to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {

      console.error(error);

      // Remove invalid login data
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");

      setMessage(
        error.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to your JobTrack account
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* Password */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* Login */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* Message */}

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        {/* Register */}

        <p className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;