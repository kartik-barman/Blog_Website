// Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className={styles.brandName}>CampusBlog</div>
            <p>Discover amazing stories and insights from our community of writers and thinkers.</p>
            <div className="mt-3">
              <FaFacebookF className={styles.socialIcon} size={20} />
              <FaTwitter className={styles.socialIcon} size={20} />
              <FaInstagram className={styles.socialIcon} size={20} />
              <FaLinkedinIn className={styles.socialIcon} size={20} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className={styles.sectionTitle}>Quick Links</h5>
            <a href="#" className={styles.footerLink}>Home</a>
            <a href="#" className={styles.footerLink}>About</a>
            <a href="#" className={styles.footerLink}>Blog</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className={styles.sectionTitle}>Categories</h5>
            <a href="#" className={styles.footerLink}>Technology</a>
            <a href="#" className={styles.footerLink}>Lifestyle</a>
            <a href="#" className={styles.footerLink}>Travel</a>
            <a href="#" className={styles.footerLink}>Food</a>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className={styles.sectionTitle}>Newsletter</h5>
            <p>Subscribe to our newsletter for the latest updates and stories.</p>
            <div className="mt-3 d-flex flex-column flex-md-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={styles.subscribeInput}
              />
              <button className={styles.subscribeButton}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p className="mb-0">
            © {new Date().getFullYear()} CampusBlog. Made with{' '}
            <FaHeart style={{ color: '#ff4757' }} /> by Kartik Barman
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;