import React from 'react'
import useUpcomingMovies from '../../../hooks/useUpcomingMovies'
import './UpcomingMovieSlide.style.css'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../components/MovieCard/MovieCard';
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
const UpcomingMoviesSlide = () => {
    const { data,isError,error } = useUpcomingMovies();
    if(data==undefined){
        return <h1>undefined</h1>
    }
    if(isError){
        return <h1>{error.message}</h1>
    }
    return (
        <div>
            <h3>UPcomingMovies</h3>
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

export default UpcomingMoviesSlide
