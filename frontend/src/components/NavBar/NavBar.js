import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBlog,
  FaUsers,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("admin");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { title: "Home", icon: <FaHome />, path: "/" },
    { title: "Blog", icon: <FaBlog />, path: "/" },
    { title: "About", icon: <FaUsers />, path: "/" },
    { title: "Contact", icon: <FaEnvelope />, path: "/" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Krishna Da , Implement your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
        isOpen ? styles.navbarOpen : ""
      }`}
    >
      <div className="container">
        <div className={styles.navbarContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <span className={styles.logoText}>
                Campus<span className={styles.logoAccent}>Blog</span>
              </span>
            </Link>
          </div>

          {/* Menu and Search */}
          <div className={`${styles.navMenu} ${isOpen ? styles.show : ""}`}>
            <ul className={styles.navList}>
              {navItems.map((item, index) => (
                <li key={index} className={styles.navItem}>
                  <Link
                    to={item.path}
                    className={styles.navLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navText}>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search Bar */}
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
            </div>

            {/* Conditional Button Rendering */}
            <div className={styles.authButtons}>
              {isLoggedIn ? (
                userType === "admin" ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={`btn ${styles.authButton} btn-outline-success me-2`}
                    >
                      <MdDashboard size={24} className="me-2" />
                      Dashboard
                    </Link>
                    <button
                      className={`btn ${styles.authButton} btn-primary`}
                      onClick={handleLogout}
                    >
                      {" "}
                      <FiLogOut size={24} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile/kartik"
                      className={`btn ${styles.authButton} me-2`}
                    >
                      {" "}
                      <FaUserCircle
                        style={{ width: "40px", height: "40px", color: "blue" }}
                      />{" "}
                    </Link>
                    <button
                      className={`btn ${styles.authButton} btn-danger`}
                      onClick={handleLogout}
                    >
                      {" "}
                      <FiLogOut /> Logout
                    </button>
                  </>
                )
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={`btn ${styles.authButton} btn-outline-primary me-2`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={`btn ${styles.authButton} btn-primary`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className={`${styles.toggleButton} d-lg-none`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
