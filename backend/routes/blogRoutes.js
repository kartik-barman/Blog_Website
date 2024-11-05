import express from "express";
import Blog from "../models/Blog.js";
import {
  createCommentApi,
  createlikeApi,
  deleteBlogApi,
  getAllBlogApi,
  getBlogApi,
  postBlogApi,
  updateBlogApi,
} from "../controllers/blogController.js";

const router = express.Router();

// Create Blog
router.post("/create", postBlogApi);

// Get All Blogs
router.get("/", getAllBlogApi);

// get one blog
router.get("/:blogId", getBlogApi);

// Update Blog
router.put("/update/:id", updateBlogApi);

// Delete Blog
router.delete("/delete/:id", deleteBlogApi);

// Post Like
router.post("/like/:blogId", createlikeApi);
// Post comments
router.post("/comment/:blogId", createCommentApi);

export default router;
