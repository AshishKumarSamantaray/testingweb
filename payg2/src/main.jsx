import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Layout from "./layout.jsx";
import Contactus from "./contactus.jsx";
import Downloadticket from "./downloadticket.jsx";
import Test from "./test.jsx";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path='' element={<App />} />
            <Route path='download' element={<Downloadticket/>} />
            <Route path='test' element={<Test/>} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
