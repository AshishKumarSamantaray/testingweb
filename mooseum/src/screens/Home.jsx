import React from 'react'
import Nav from '../frontendComponents/Nav'
import Gallery from '../frontendComponents/Gallery'
import BlogsAndNews from '../frontendComponents/BlogsAndNews'
import HomeScreen from '../frontendComponents/HomeScreen'
const Home = () => {
  return (
    <div>
      <Nav/>
      <HomeScreen/>
      <Gallery/>
      <BlogsAndNews/>
    </div>
  )
}

export default Home