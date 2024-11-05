import React, { useState, useMemo } from "react";
import styles from "./HomePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaThumbsUp, FaComment, FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

const blogs = [
  {
    id: 1,
    author: "Arijit Mondol",
    title: "My First Blog Post",
    content:
      "This is the content of my first blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730493750/majrahgaz8cbgeieyp0z.png",
    likes: 25,
    comments: 10,
    createAt: "2024-11-04",
  },
  {
    id: 2,
    author: "Mr Kartik Barman",
    title: "My 2nd Blog Post",
    content:
      "This is the content of my second blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730486369/cld-sample-4.jpg",
    likes: 15,
    comments: 5,
    createAt: "2024-11-03",
  },
  {
    id: 3,
    author: "Kartik Barman",
    title: "My 3rd Blog Post",
    content:
      "This is the content of my third blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730493114/dhtu4a1dvusglybhxxav.png",
    likes: 30,
    comments: 12,
    createAt: "2024-11-02",
  },
  {
    id: 4,
    author: "Dipayan Dey",
    title: "My 4th Blog Post",
    content:
      "This is the content of my fourth blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730486367/samples/man-on-a-escalator.jpg",
    likes: 20,
    comments: 8,
    createAt: "2024-11-01",
  },
  {
    id: 5,
    author: "Mr Kartik Barman",
    title: "My 5th Blog Post",
    content:
      "This is the content of my fifth blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730486360/samples/cloudinary-group.jpg",
    likes: 40,
    comments: 15,
    createAt: "2024-10-31",
  },
  {
    id: 6,
    author: "Mr Kartik Barman",
    title: "My 6th Blog Post",
    content:
      "This is the content of my sixth blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730486364/samples/shoe.jpg",
    likes: 40,
    comments: 15,
    createAt: "2024-10-30",
  },
  {
    id: 6,
    author: "Mr Kartik Barman",
    title: "My 6th Blog Post",
    content:
      "This is the content of my sixth blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730486364/samples/shoe.jpg",
    likes: 40,
    comments: 15,
    createAt: "2024-10-30",
  },
  {
    id: 6,
    author: "Mr Kartik Barman",
    title: "My 6th Blog Post",
    content:
      "This is the content of my sixth blog post. It is a long piece of text that will be truncated in the preview.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730486364/samples/shoe.jpg",
    likes: 40,
    comments: 15,
    createAt: "2024-11-05",
  },
];

const ITEMS_PER_PAGE = 6;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const sortedBlogs = useMemo(() => 
    [...blogs].sort((a, b) => new Date(b.createAt) - new Date(a.createAt)),
    []
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
              <div key={blog.id} className="col-md-4">
                <div className={`card h-100 ${styles.card}`}>
                  <img
                    src={blog.image}
                    className={`${styles.banner}`}
                    alt={blog.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold"><Link to={`/blog/${blog.id}`}>{blog.title}</Link></h5>
                    <p className="card-text m-0 text-muted">
                      <small><strong>Author:</strong> {blog.author}</small>
                    </p>
                    <p className="card-text m-0 text-muted mb-3">
                      <small><strong>Published:</strong> {blog.createAt}</small>
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
                        <FaComment /> {blog.comments}
                      </button>
                      <button className={`btn btn-outline-success ${styles.actionButton}`}>
                        <FaShareAlt /> Share
                      </button>
                    </div>
                  </div>
                </div>
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
