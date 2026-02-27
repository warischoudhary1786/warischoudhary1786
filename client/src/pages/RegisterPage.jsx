import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-wrap">
      <form className="card auth-card" onSubmit={onSubmit}>
        <h1>Create account</h1>
        <p>Join your professional network</p>
        <input name="name" type="text" placeholder="Full name" onChange={onChange} value={form.name} required />
        <input name="email" type="email" placeholder="Email" onChange={onChange} value={form.email} required />
        <input
          name="password"
          type="password"
          placeholder="Password (min 8 chars)"
          onChange={onChange}
          value={form.password}
          minLength={8}
          required
        />
        {error && <div className="error-text">{error}</div>}
        <button className="btn-primary" disabled={submitting} type="submit">
          {submitting ? "Creating account..." : "Register"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
