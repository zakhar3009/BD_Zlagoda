import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error from './pages/Error/Error.jsx'
import Home from './pages/Home/Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shop from './pages/Shop/Shop.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
