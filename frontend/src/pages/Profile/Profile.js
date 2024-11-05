import React, { useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Dashboard from "../Dashboard/Dashboard";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    avatar : avatar,
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    address: "",
    bio: ""
  });

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); 
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Update localStorage with new data
    // localStorage.setItem("username", formData.username);
    // localStorage.setItem("email", formData.email);
    // localStorage.setItem("phone", formData.phone);
    // localStorage.setItem("address", formData.address); 
    const dataToSend = new FormData();
    dataToSend.append("username", formData.username);
    dataToSend.append("email", formData.email);
    dataToSend.append("phone", formData.phone);
    dataToSend.append("address", formData.address);
    dataToSend.append("bio", formData.bio);
    if (avatar) {
      dataToSend.append("avatar", avatar); 
    }
    console.log(dataToSend);

    try {
      const response = await axios.put(`http://localhost:5000/api/users/update/${userId}`, dataToSend);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error("Error :", error)
    }

    setEdit(false); 
  };

  return (
    <>
      {edit ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
          <div className={`card p-4 ${styles.profileCard}`}>
            <div className="text-center">
              <img
                src={avatar ? URL.createObjectURL(avatar) : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"}
                alt="Profile"
                className={`${styles.profileImage} mb-3`}
              />
            </div>
            <div className="mt-4">
              <div className={`d-flex align-items-center mb-3 ${styles.editInfoGroup}`}>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  className={styles.editInput} 
                  onChange={handleOnChangeInput} 
                />
              </div>
              <div className={`d-flex align-items-center mb-3 ${styles.editInfoGroup}`}>
                <input 
                  type="text" 
                  name="bio" 
                  placeholder="Add Bio" 
                  className={styles.editInput} 
                  value={formData.bio}
                  onChange={handleOnChangeInput}
                />
              </div>
              <div className={`d-flex align-items-center mb-3 ${styles.editInfoGroup}`}>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  className={styles.editInput} 
                  onChange={handleOnChangeInput} 
                />
              </div>
              <div className={`d-flex align-items-center mb-3 ${styles.editInfoGroup}`}>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  className={styles.editInput} 
                  onChange={handleOnChangeInput} 
                />
              </div>
              <div className={`d-flex align-items-center ${styles.editInfoGroup}`}>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  className={styles.editInput} 
                  placeholder="Add Address" 
                  onChange={handleOnChangeInput} 
                />
              </div>
              <div className={`mt-3 ${styles.infoGroup}`}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className={`btn ${styles.editButton}`} onClick={handleSave}>
                <FaUserEdit className="me-2" /> Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className={`card p-4 ${styles.profileCard}`}>
            <div className="text-center">
              <img
                src={avatar ? URL.createObjectURL(avatar) : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"}
                alt="Profile"
                className={`${styles.profileImage} mb-3`}
              />
              <h3 className="fw-bold mb-1">{formData.username}</h3>
              <p className="text-muted"></p>
            </div>
            <div className="mt-4">
              <div className={`d-flex align-items-center mb-3 ${styles.infoGroup}`}>
                <FaEnvelope className={styles.icon} />
                <span className={styles.infoText}>{formData.email}</span>
              </div>
              <div className={`d-flex align-items-center mb-3 ${styles.infoGroup}`}>
                <FaPhone className={styles.icon} />
                <span className={styles.infoText}>{formData.phone}</span>
              </div>
              <div className={`d-flex align-items-center ${styles.infoGroup}`}>
                <FaMapMarkerAlt className={styles.icon} />
                <span className={styles.infoText}>{formData.address || "Mathabhanga, Coochbehar, West Bengal"}</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className={`btn ${styles.editButton}`} onClick={() => setEdit(true)}>
                <FaUserEdit className="me-2" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
      <hr />
      <Dashboard />
    </>
  );
};

export default Profile;
