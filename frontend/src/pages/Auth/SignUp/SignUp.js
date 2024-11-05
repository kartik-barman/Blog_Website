import React, { useState } from "react";
import axios from "axios"
import styles from "./SignUp.module.css";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone : "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/users/register", formData);
    const result = res.data;
    console.log(result);
    console.log(formData);
    navigate("/signin")
    setFormData({
      username : "",
      email : "",
      password : ""
    })
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className={`card p-4 ${styles.signUpCard}`}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${styles.inputGroup}`}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
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
          <div className={`mb-3 ${styles.inputGroup}`}>
            <FaPhoneAlt className={styles.icon} />
            <input
              type="number"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/signin" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
