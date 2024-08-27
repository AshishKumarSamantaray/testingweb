import React, { useEffect } from 'react'
import Nav from '../frontendComponents/Nav'
import Gallery from '../frontendComponents/Gallery'
import BlogsAndNews from '../frontendComponents/BlogsAndNews'
import HomeScreen from '../frontendComponents/HomeScreen'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const Home = () => {

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
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