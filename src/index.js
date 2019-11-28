import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.4.0";
// pages for this product
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/signupPage/signupPage.jsx";
import GraphicDesignBlogs from "views/GraphicDesignBlogs/GraphicDesignBlogs.jsx";
import postBlogPage from "views/postBlog/postBlog.jsx";
import showBlogPage from "views/ShowBlog/showBlog.jsx";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/signin-page" component={LoginPage} />
      <Route path="/signup-page" component={SignupPage} />
      <Route path="/GraphicDesign-blogs" component={GraphicDesignBlogs} />
      <Route path="/postBlog-page" component={postBlogPage} />
      <Route path="/showBlog-page" component={showBlogPage} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
