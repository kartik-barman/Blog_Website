import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { uploadFile } from "../helper/Upload.js";

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to Create a new user
 *________________________________________________________________________________________*/
export const createUserApi = async (req, res) => {
    const {avatar, username, email,phone, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        ...req.body,
        avatar,
        username,
        email,
        phone,
        password: hashedPassword
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: savedUser
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({ message: error.message });
    }
  }

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to login user
 *________________________________________________________________________________________*/

export const loginUserApi = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
  
      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          avatar : user.avatar,
          id: user._id,
          username: user.username,
          email: user.email,
          phone : user.phone,
          isAdmin : user.isAdmin
        }
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
  }

/**_______________________________________________________________________________________*
 * 
 *                            Funtion to Update User Details
 *________________________________________________________________________________________*/
export const userDetailsUpdateApi = async (req, res) => {
    const id = req.params.id;
    const { bio, username, email, phone, address } = req.body;

    let avatarUrl; 

    try {
        if (req.file) {
            avatarUrl = await uploadFile(req.file.path);
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                avatar: avatarUrl || undefined, 
                bio,
                username,
                email,
                phone,
                address,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Profile updated successfully",
            user: updatedUser, // Return the updated user object
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
        });
    }
};