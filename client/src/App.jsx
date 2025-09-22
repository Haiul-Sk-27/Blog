import React from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./pages/Home";
import Blogs from "./pages/Blog";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import UpdateBlog from "./pages/UpdateBlog";
import CreateBlog from "./pages/CreateBlog";
import YourBlog from "./pages/YourBlog";
import Comments from "./pages/Comments";

const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/></>
  },
  {
    path:'/blogs',
    element:<><Navbar/><Blogs/></>
  },
  {
    path:"/about",
    element:<><Navbar/><About/></>
  },
  {
    path:'/login',
    element:<><Navbar/><Login/></>
  },
  {
    path:'/signUp',
    element:<><Navbar/><SignUp/></>
  },
  {
    path:'/dashboard',
    element:<><Navbar/><Dashboard/></>,
    children:[
      {
        path: "write-blog",
        element:<><CreateBlog/></>
      },
      {
        path: "write-blog/:blogId",
        element: <><UpdateBlog /></>
      },
      {
        path: "your-blog",
        element:<YourBlog/>
      },
      {
        path: "comments",
        element:<Comments/>
      },
      {
        path: "profile",
        element:<Profile/>
      },
    ]
  }
])

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
