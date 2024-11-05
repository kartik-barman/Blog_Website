import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { _id: false }); 

const blogSchema = new mongoose.Schema({
  banner : {
    type : String,
    required : true
  },
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String,
    required: true 
  },
  likes: {
    type: Number, 
    default: 0 
  },
  comments: [commentSchema], 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Blog', blogSchema);
