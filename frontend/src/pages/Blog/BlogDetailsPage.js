import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BlogDetails.module.css";
import { FaUserAlt, FaRegCalendarAlt, FaRegCommentAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlogPost(response.data.blog);
    } catch (error) {
      setError("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (name && email && commentText) {
      const newComment = {
        username: name,
        message: commentText,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(`http://localhost:5000/api/blogs/comment/${blogPost._id}`, newComment);
      console.log(response);
      fetchPost();
      // Update the blog post with the new comment
      setBlogPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));

      // Reset form fields
      setName("");
      setEmail("");
      setCommentText("");
    } else {
      alert("Please fill in all fields");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!blogPost) return <p>Blog post not found.</p>;

  return (
    <div className="container py-5 mt-5">
      <div className={`${styles.mainCard} shadow-lg`}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <img
            src={blogPost.banner}
            className={styles.bannerImage}
            alt={blogPost.title}
          />
          <div className={styles.heroOverlay}>
            <h1 className="display-4 fw-bold text-white mb-4">
              {blogPost.title}
            </h1>
            <div className="d-flex gap-4 text-white">
              <div className="d-flex align-items-center">
                <FaUserAlt className="me-2" size={16} />
                <span>{blogPost.author}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaRegCalendarAlt className="me-2" size={16} />
                <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="lead mb-5">{blogPost.content}</p>

              {/* Comments Section */}
              <div className="mt-5">
                <div className="d-flex align-items-center mb-4">
                  <FaRegCommentAlt size={20} className="me-2" />
                  <h2 className="h4 mb-0">Comments ({blogPost.comments.length})</h2>
                </div>

                {/* Comments List */}
                <div className={styles.commentsSection}>
                  {blogPost.comments.length === 0 ? (
                    <div className={styles.emptyComments}>
                      <FaRegCommentAlt size={32} className="text-muted mb-2" />
                      <p className="text-muted mb-0">
                        Be the first to comment!
                      </p>
                    </div>
                  ) : (
                    blogPost.comments.map((comment, index) => (
                      <div key={index} className={styles.commentCard}>
                        <div className="d-flex">
                          <div className={styles.commentAvatar}>
                            {comment.username[0].toUpperCase()}
                          </div>
                          <div className="ms-3 flex-grow-1">
                            <div className="fw-bold">{comment.username}</div>
                            <small className="text-muted">
                              {new Date(comment.createdAt).toLocaleString()}
                            </small>
                            <p className="mt-2 mb-0">{comment.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Form */}
                <div className={`${styles.commentForm} mt-5`}>
                  <h3 className="h5 mb-4">Leave a Comment</h3>
                  <form onSubmit={handleCommentSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className={`form-control ${styles.formInput}`}
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className={`form-control ${styles.formInput}`}
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          className={`form-control ${styles.formInput}`}
                          rows="4"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Your Comment"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className={styles.submitButton}>
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
