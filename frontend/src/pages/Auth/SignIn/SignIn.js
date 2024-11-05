import React, { useContext, useState } from "react";
import axios from "axios"
import styles from "./SignIn.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/AuthContext";

const SignIn = () => {
  const {isLoggedIn, setIsLoggedIn, setIsAdmin} = useContext(AuthContext);
  console.log(isLoggedIn);
  const navigate = useNavigate()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      const result = response.data;
      const {success, message , user, token} = result;
      if (success) {
        setIsLoggedIn(true)
        setIsAdmin(user.isAdmin)
        console.log("Login successful:", result);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("phone", user.phone);
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", user.isAdmin)
        navigate("/")

      } else {
        console.log("Login failed:", result.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error during login:", error.message);
      }
    }
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
