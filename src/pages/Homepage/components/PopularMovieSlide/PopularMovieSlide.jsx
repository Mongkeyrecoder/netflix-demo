import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Spinner from 'react-bootstrap/Spinner';
import './popularmovieslide.style.css'
import { Alert } from 'bootstrap';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1224, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery()
  
  if (isLoading) {
    return <Spinner className='slide-spin' animation="border" />
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }
  if(data==undefined){
    return <h1>DATA 없음</h1>
  }
  return (
    <div>
      <h3>Popular Movies</h3>
      <Carousel
      infinite={true}
      centerMode={true}
      itemClass='movie-slider p-1 custom-item-class'
      containerClass='carousel-container'
      responsive={responsive}
      
      >
        {
          data?.results.map((item,i)=>{
            return <MovieCard item={item} key={i}/>
          })
        }
      </Carousel>
    </div>
  )
}

export default PopularMovieSlide
