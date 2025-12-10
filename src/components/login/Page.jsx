import { useState } from "react";
import { NavLink } from "react-router";
import "./Page.css";

function Page({ setIsAuth, navigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { email, password } = form;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }
    localStorage.setItem("auth", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    setIsAuth(true);
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>

          <div className="form-group">
            <label>Email Address :</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`input-box ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <p className="error-text mt-0 mb-0 fw-bold">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`input-box ${errors.password ? "input-error" : ""}`}
            />
            {errors.password && <p className="error-text mt-0 mb-0 fw-bold">{errors.password}</p>}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="signup-text">
            Don't have an account?
            <NavLink to="/signup" className="signup-link text-decoration-none text-primary">
              Signup
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Page;
