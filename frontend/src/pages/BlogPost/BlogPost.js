import React, { useState } from 'react';
import styles from './BlogPost.module.css'; // Assuming you have an external CSS module

const BlogPost = () => {
  const [post, setPost] = useState({
    title: '',
    subtitle: '',
    content: '',
    tags: [],
    coverImage: null
  });
  const [currentTag, setCurrentTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost({ ...post, coverImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag && !post.tags.includes(currentTag)) {
      setPost({ ...post, tags: [...post.tags, currentTag] });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setPost({
      ...post,
      tags: post.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="mb-4 d-flex justify-content-end">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="btn btn-primary me-2"
        >
          {previewMode ? 'Edit Mode' : 'Preview'}
        </button>
        <button className="btn btn-success">
          Publish
        </button>
      </div>

      {!previewMode ? (
        <div className="mb-4">
          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="form-label">Cover Image</label>
            <div className="position-relative">
              {post.coverImage ? (
                <div className="position-relative">
                  <img
                    src={post.coverImage}
                    alt="Cover"
                    className="img-fluid rounded mb-2"
                  />
                  <button
                    onClick={() => setPost({ ...post, coverImage: null })}
                    className="btn btn-danger position-absolute top-0 end-0"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="border border-dashed p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="d-none"
                    id="coverImage"
                  />
                  <label
                    htmlFor="coverImage"
                    className="cursor-pointer text-primary"
                  >
                    Upload Cover Image
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter your title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="form-control form-control-lg mb-2"
          />

          {/* Subtitle Input */}
          <input
            type="text"
            placeholder="Enter a subtitle"
            value={post.subtitle}
            onChange={(e) => setPost({ ...post, subtitle: e.target.value })}
            className="form-control form-control-md mb-4"
          />

          {/* Tags Input */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="badge bg-secondary d-flex align-items-center"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="btn-close btn-close-white ms-2"
                  aria-label="Close"
                ></button>
              </span>
            ))}
            <div className="d-flex">
              <input
                type="text"
                placeholder="Add tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="form-control me-2"
              />
              <button
                onClick={addTag}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <textarea
            placeholder="Write your blog post content here..."
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="form-control"
            rows="10"
          />
        </div>
      ) : (
        /* Preview Mode */
        <div className={`prose ${styles.preview}`}>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt="Cover"
              className="img-fluid rounded mb-4"
            />
          )}
          <h1 className="display-4">{post.title || 'Untitled'}</h1>
          {post.subtitle && (
            <h2 className="lead text-muted">{post.subtitle}</h2>
          )}
          {post.tags.length > 0 && (
            <div className="mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-secondary me-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
