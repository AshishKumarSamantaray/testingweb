import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './screens/Home.jsx'
import AboutUs from './screens/AboutUs.jsx'
import Museum from './screens/Museum.jsx'
import ContactUs from './screens/ContactUs.jsx'
import FilterPage from './screens/FilterPage.jsx'
import { data } from 'autoprefixer'

let museumDets=[
  {
    vidsrc: '../public/videos/museum2.mp4',
    imgsrc:"https://images.pexels.com/photos/1481464/pexels-photo-1481464.jpeg?auto=compress&cs=tinysrgb&w=800",
    museumName:"Indian Museum",
    museumLocation:"Kolkata, West Bengal",
    museumLocationURL:"",
    inTime:"11:00",
    outTime:"05:00",
    am:"Am",
    pm:"Pm",
    local:"Jawaharlal Nehru Rd, Fire Brigade Head Quarter",
    sublocal:"New market area, Dharmatala, Taltala, Kolkata, West Bengal 700016"
  }
]

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<AboutUs/>
      },
      {
        path:"museums",
        element:<FilterPage/>
      },
      {
        path:"contact",
        element: <ContactUs/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)