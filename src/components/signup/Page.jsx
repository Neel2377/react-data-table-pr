import React, { useState } from "react";
import { NavLink } from "react-router";
import "./Page.css";

function Page({ navigate }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some((u) => u.email === form.email);
    if (exists) {
      alert("Email already exists");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup Successful");
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <form onSubmit={handleSignup} className="auth-form">
          <h2 className="auth-title">Create Account</h2>

          <div className="form-group">
            <label>Username :</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`input-box ${errors.username ? "input-error" : ""}`}
            />
            {errors.username && <p className="error-text mt-0 mb-0 fw-bold">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label>Email :</label>
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

          <button type="submit" className="auth-btn">
            Sign Up
          </button>

          <p className="switch-text">
            Already have an account?
            <NavLink to="/login" className="switch-link text-decoration-none text-primary">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Page;
