import React from 'react'
import './TopRatedSlide.style.css'
import useTopRatedQuery from '../../../hooks/useTopRatedMovies'
import MovieCard from '../components/MovieCard/MovieCard';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Spinner from 'react-bootstrap/Spinner';

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
const TopRatedSlide = () => {
  const { data } = useTopRatedQuery();

  if (data == undefined) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  return (
    <div>
      <h3>Top Rated MOVIES</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass='movie-slider p-1 custom-item-class'
        containerClass='carousel-container'
        responsive={responsive}
      >
        {
          data?.map((item, i) => {
            return <MovieCard item={item} key={i} />
          })
        }
      </Carousel>
    </div>
  )
}

export default TopRatedSlide
