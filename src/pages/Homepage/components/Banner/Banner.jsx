import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css'
const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
   
    if (isLoading) {
        return <Spinner className='spin-spin' animation="border" />;
    }
    if (isError) {
        return <Alert key='danger' variant='danger'>
            {error.message}
        </Alert>
    }
    return (
        <div style={{
            backgroundImage: "url(https://image.tmdb.org/t/p/w400/" + `${data.results[0].poster_path}` + ")"
        }} className='banner'>
            <div className='banner-text-area'>
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    )
}

export default Banner
