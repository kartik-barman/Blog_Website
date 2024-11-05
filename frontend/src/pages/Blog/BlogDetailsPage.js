import React, { useState } from "react";
import styles from "./BlogDetails.module.css";
import { FaUserAlt, FaRegCalendarAlt, FaRegCommentAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  const blogPost = {
    id: 1,
    title: "My First Blog Post",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sint repellat assumenda praesentium, ipsa perferendis odio asperiores nisi tempore vitae, delectus enim veniam debitis animi quas. Molestias quae natus nisi necessitatibus, dignissimos, cumque laudantium iure voluptatibus, sint aliquam vel voluptas! Nam eveniet reprehenderit alias ducimus porro ad. Corporis nisi, ullam, quos deleniti repudiandae, dolorum iusto iste minima pariatur nulla alias? Praesentium dolorem architecto error rerum quia. At quos laborum sint ratione quasi dicta voluptas quae officia aliquam, ab mollitia odio tempore. Quidem qui nam illum molestias voluptatum possimus repellat dolorem quaerat sequi a repellendus, hic quis esse voluptas quo officia facilis et explicabo facere error recusandae nihil. Porro, tenetur non? Aperiam illum nam nobis veritatis voluptas commodi facere laboriosam dolorem molestias repellendus, at maiores, iusto architecto labore debitis quis est. Impedit aliquid sint libero illum excepturi itaque recusandae veritatis nam animi vero. Saepe nihil fugiat nam ab blanditiis minus quae laudantium laboriosam quaerat maxime.",
    image:
      "https://res.cloudinary.com/dewwngmuf/image/upload/v1730493114/dhtu4a1dvusglybhxxav.png",
    author: "Kartik Barman",
    publishedDate: "2024-10-01",
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (name && email && commentText) {
      const newComment = {
        id: comments.length + 1,
        author: name,
        email,
        text: commentText,
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setName("");
      setEmail("");
      setCommentText("");
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className={`${styles.mainCard} shadow-lg`}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <img
            src={blogPost.image}
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
                <span>{blogPost.publishedDate}</span>
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
                  <h2 className="h4 mb-0">Comments ({comments.length})</h2>
                </div>

                {/* Comments List */}
                <div className={styles.commentsSection}>
                  {comments.length === 0 ? (
                    <div className={styles.emptyComments}>
                      <FaRegCommentAlt size={32} className="text-muted mb-2" />
                      <p className="text-muted mb-0">
                        Be the first to comment!
                      </p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className={styles.commentCard}>
                        <div className="d-flex">
                          <div className={styles.commentAvatar}>
                            {comment.author[0].toUpperCase()}
                          </div>
                          <div className="ms-3 flex-grow-1">
                            <div className="fw-bold">{comment.author}</div>
                            <small className="text-muted">
                              {comment.timestamp}
                            </small>
                            <p className="mt-2 mb-0">{comment.text}</p>
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
