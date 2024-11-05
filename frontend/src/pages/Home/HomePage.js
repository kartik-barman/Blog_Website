import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaThumbsUp, FaComment, FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

const ITEMS_PER_PAGE = 6;

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        const result = response.data;
        console.log(result);
        setBlogs(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [blogs]
  );

  const totalPages = Math.ceil(sortedBlogs.length / ITEMS_PER_PAGE);

  const getCurrentBlogs = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedBlogs.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <WelcomeSection />

      <div id="blogSection" className={`${styles.gradient} p-4`}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Latest <span>Blog</span></h2>
          <div className={styles.decorativeLine}></div>
        </div>

        <div className="container">
          <div className="row g-4">
            {getCurrentBlogs().map((blog) => (
              <div key={blog._id} className="col-md-4">
                <Link to={`/blog/${blog._id}`} className={`card h-100 ${styles.card} text-decoration-none`}>
                  <img
                    src={blog.banner || "https://via.placeholder.com/300"} // Use a placeholder if no image provided
                    className={`${styles.banner}`}
                    alt={blog.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{blog.title}</h5>
                    <p className="card-text m-0 text-muted">
                      <small><strong>Author:</strong> {blog.author}</small>
                    </p>
                    <p className="card-text m-0 text-muted mb-3">
                      <small><strong>Published:</strong> {new Date(blog.createdAt).toLocaleDateString()}</small>
                    </p>
                    <p className="card-text">
                      {blog.content.length > 100
                        ? `${blog.content.substring(0, 100)}...`
                        : blog.content}
                    </p>
                    <div className="d-flex justify-content-between mt-auto">
                      <button className={`btn btn-outline-danger ${styles.actionButton}`}>
                        <FaThumbsUp /> {blog.likes}
                      </button>
                      <button className={`btn btn-outline-info ${styles.actionButton}`}>
                        <FaComment /> {blog.comments.length}
                      </button>
                      <button className={`btn btn-outline-success ${styles.actionButton}`}>
                        <FaShareAlt /> Share
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <button 
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            {getPageNumbers().map((number, index) => (
              number === '...' ? (
                <span key={`dots-${index}`} className={styles.paginationDots}>...</span>
              ) : (
                <button
                  key={number}
                  className={`${styles.pageButton} ${currentPage === number ? styles.activeButton : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              )
            ))}

            <button 
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
