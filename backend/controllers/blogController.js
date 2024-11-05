import Blog from "../models/Blog.js";

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to get All Blog
 *________________________________________________________________________________________*/
export const getAllBlogApi = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to get indivisual Blog
 *________________________________________________________________________________________*/

export const getBlogApi = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success : false,
        msg : "blog not found!"
      })
    }
    res.status(200).json({
      success : true,
      msg : "fetch blog..",
      blog
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      msg : "internal server error"
    })
  }
}

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to post Blog
 *________________________________________________________________________________________*/

export const postBlogApi = async (req, res) => {
  const { banner, title, content, author } = req.body;
  try {
    const blog = new Blog({ banner, title, content, author });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to update indivisual Blog
 *________________________________________________________________________________________*/
export const updateBlogApi = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to delete indivisual Blog
 *________________________________________________________________________________________*/
export const deleteBlogApi = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to post like Blog
 *________________________________________________________________________________________*/
export const createlikeApi = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.likes += 1;
    await blog.save();
    res.status(200).json({ message: "Blog liked", likes: blog.likes });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      msg: "internal server error!",
    });
  }
};

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to post commentc for Blog
 *________________________________________________________________________________________*/
export const createCommentApi = async (req, res) => {
  const { username, message } = req.body;
  const blogId = req.params.blogId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({
      username,
      message,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      msg: "internal server error!",
    });
  }
};
