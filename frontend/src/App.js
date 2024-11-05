import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import BlogDetailsPage from "./pages/Blog/BlogDetailsPage";
import Layout from "./components/Layout/Layout";
import BlogPost from "./pages/BlogPost/BlogPost";
import SignUp from "./pages/Auth/SignUp/SignUp";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="blog/:id" element={<BlogDetailsPage />} />
          <Route path="/create-post" element={<BlogPost />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
