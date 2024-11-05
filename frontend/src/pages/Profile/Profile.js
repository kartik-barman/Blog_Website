import React from "react";
import styles from "./Profile.module.css";
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Dashboard from "../Dashboard/Dashboard";

const Profile = () => {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className={`card p-4 ${styles.profileCard}`}>
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/dewwngmuf/image/upload/v1730493114/dhtu4a1dvusglybhxxav.png"
            alt="Profile"
            className={`${styles.profileImage} mb-3`}
          />
          <h3 className="fw-bold mb-1">Kartik Barman</h3>
          <p className="text-muted">Professional Web Developer</p>
        </div>
        <div className="mt-4">
          <div className={`d-flex align-items-center mb-3 ${styles.infoGroup}`}>
            <FaEnvelope className={styles.icon} />
            <span className={styles.infoText}>developerkartik@gmail.com</span>
          </div>
          <div className={`d-flex align-items-center mb-3 ${styles.infoGroup}`}>
            <FaPhone className={styles.icon} />
            <span className={styles.infoText}>+91 865336744</span>
          </div>
          <div className={`d-flex align-items-center ${styles.infoGroup}`}>
            <FaMapMarkerAlt className={styles.icon} />
            <span className={styles.infoText}>Mathabhanga,Coochbehar,West Bengal</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className={`btn ${styles.editButton}`}>
            <FaUserEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
    <hr />
    <Dashboard />
    </>
  );
};

export default Profile;
