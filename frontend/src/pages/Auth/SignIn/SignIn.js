import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className={`card p-4 ${styles.signInCard}`}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${styles.inputGroup}`}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={`mb-4 ${styles.inputGroup}`}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={`btn w-100 ${styles.submitButton}`}>
            Sign In
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
