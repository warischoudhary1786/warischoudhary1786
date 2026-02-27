import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-wrap">
      <form className="card auth-card" onSubmit={onSubmit}>
        <h1>Welcome back</h1>
        <p>Sign in to ProConnect</p>
        <input name="email" type="email" placeholder="Email" onChange={onChange} value={form.email} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          value={form.password}
          minLength={8}
          required
        />
        {error && <div className="error-text">{error}</div>}
        <button className="btn-primary" disabled={submitting} type="submit">
          {submitting ? "Signing in..." : "Login"}
        </button>
        <p>
          New here? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}
