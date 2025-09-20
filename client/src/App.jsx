import React from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./pages/Home";
import Blogs from "./pages/Blog";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Login from "./pages/login";

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
