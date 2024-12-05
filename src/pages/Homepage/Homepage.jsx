import React from 'react'
import Banner from './components/Banner/Banner'
import './Homepage.style.css'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import UpcomingMoviesSlide from './UpcomingMoviesSlide/UpcomingMoviesSlide'
import TopRatedSlide from './TopRatedSlide/TopRatedSlide'
const Homepage = () => {
  // 1. 배너 => popular 영화를 들고와서 첫번째 아이템을 보여주자
  // 2. popular movie
  // 3. top rated movie
  // 4. upcoming movie

  return (
    <div className='home'>
      <Banner/>
      <PopularMovieSlide/>
      <UpcomingMoviesSlide/>
      <TopRatedSlide/>
    </div>
  )
}

export default Homepage
