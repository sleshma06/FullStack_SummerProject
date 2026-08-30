import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Use at least 6 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      showToast(
        `Welcome to StudentSpend, ${form.name.split(" ")[0]}! ✨`,
        "success",
      );
      navigate("/dashboard");
    } catch (err) {
      showToast(err.message || "Signup failed — try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      quote={
        <>
          Small expenses add up.{" "}
          <span>Good thing you're keeping an eye on them.</span>
        </>
      }
    >
      <div className="auth-head">
        <span className="eyebrow">Get started</span>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">
          Takes less than a minute — no bank details needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="signup-name">
            Name
          </label>
          <input
            id="signup-name"
            className={`input${errors.name ? " has-error" : ""}`}
            placeholder="Alex Sharma"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            className={`input${errors.email ? " has-error" : ""}`}
            placeholder="you@university.edu"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field-row">
          <div className="field">
            <label className="field-label" htmlFor="signup-password">
              Password
            </label>
            <div className="input-wrap">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                className={`input${errors.password ? " has-error" : ""}`}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <div className="field">
            <label className="field-label" htmlFor="signup-confirm">
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type={showPassword ? "text" : "password"}
              className={`input${errors.confirm ? " has-error" : ""}`}
              placeholder="••••••••"
              value={form.confirm}
              onChange={(e) => set("confirm", e.target.value)}
            />
            {errors.confirm && (
              <span className="field-error">{errors.confirm}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          style={{ marginTop: "var(--space-2)" }}
          disabled={submitting}
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="auth-foot">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  );
}
