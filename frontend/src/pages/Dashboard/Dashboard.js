import React from "react";
import styles from "./Dashboard.module.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "Exploring React Components",
    content: "This is a brief summary of the blog post content...",
    date: "2024-11-04",
  },
  {
    id: 2,
    title: "Introduction to JavaScript ES6",
    content: "A summary of what ES6 brings to the table...",
    date: "2024-11-02",
  },
  {
    id: 3,
    title: "Understanding CSS Flexbox",
    content: "This post covers the basics of Flexbox layout...",
    date: "2024-10-29",
  },
  {
    id:4 ,
    title: "Basic Understind C Programming",
    content: "This is a brief summary of the blog post content...",
    date: "2024-11-04",
  },
  {
    id: 5,
    title: "Introduction to Pyhton",
    content: "A summary of what ES6 brings to the table...",
    date: "2024-11-02",
  },
  {
    id: 6,
    title: "Understanding CSS Media Query",
    content: "This post covers the basics of Flexbox layout...",
    date: "2024-10-29",
  },
];

const Dashboard = () => {
  return (
    <div className={`${styles.dashboard} container mt-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`${styles.dashboardTitle} fw-bold`}>My Blogs</h2>
        <button className={`btn ${styles.addButton}`}>
          <FaPlus /> Add Blog
        </button>
      </div>

      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-4">
            <div className={`card h-100 ${styles.blogCard}`}>
              <div className="card-body">
                <h5 className={`card-title ${styles.cardTitle}`}>{blog.title}</h5>
                <p className="text-muted mb-1">
                  <small>{blog.date}</small>
                </p>
                <p className={`card-text ${styles.cardContent}`}>
                  {blog.content}
                </p>
                <div className="d-flex justify-content-end">
                  <button className={`btn ${styles.actionButton} me-2`}>
                    <FaEdit /> Edit
                  </button>
                  <button className={`btn ${styles.actionButton}`}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
