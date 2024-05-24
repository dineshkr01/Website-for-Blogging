import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import{
  createBrowserRouter, 
  RouterProvider , 
  Route ,
} from "react-router-dom";
import UserProfile from './components/UserProfile.jsx';


const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
  },
  {
    path: 'UserProfile', 
    element: <UserProfile/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
