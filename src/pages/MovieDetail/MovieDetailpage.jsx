import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { Col, Container, Row } from 'react-bootstrap';
import { useReviewsQuery } from '../../hooks/useRevies';
import { useQueries, useQuery } from '@tanstack/react-query';
import Carousel from 'react-multi-carousel';
import Spinner from 'react-bootstrap/Spinner';

import api from '../../utils/api';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './MovieDetailpage.style.css'
import MovieCard from '../Homepage/components/MovieCard/MovieCard';
const MovieDetailpage = () => {

  const { id } = useParams();
  const fetchDetail = (id) => {
    console.log(id)
    return api.get(`/3/movie/${id}`)
  }
  const fetchReviews = (id) => {
    return api.get(`/3/movie/${id}/reviews`)
  }
  const fetchRecommendation = (id) => {
    return api.get(`/3/movie/${id}/recommendations`)
  }
  const { data } = useQueries({
    queries: [
      {
        queryKey: ['detail'], queryFn: () => fetchDetail(id)
      },
      {
        queryKey: ['review'], queryFn: () => fetchReviews(id)
      },
      {
        queryKey: ['recommendation'], queryFn: () => fetchRecommendation(id)
      }
    ],
    retry: 3,

    combine: (results) => {
      return (
        {
          data: results.map((result) => {
            return (result.data)
          })
        }
      )
    }
  })
  let navigate = useNavigate()
  const gotoHome = () => {
    navigate('/')
  }

  if (data[0] == undefined) {
    return (
      <div>
       
        <Button style={{ marginRight: "10px" }} onClick={() => { data.refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { gotoHome() }} variant="warning">홈으로 가기</Button>
      </div>
    )
  }
  if (data[1] == undefined) {
    return (
      <div>
       
        <Button style={{ marginRight: "10px" }} onClick={() => { data.refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { gotoHome() }} variant="warning">홈으로 가기</Button>
      </div>
    )
  }
  if (data[2] == undefined) {
    return (
      <div>
      
        <Button style={{ marginRight: "10px" }} onClick={() => { data.refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { gotoHome() }} variant="warning">홈으로 가기</Button>
      </div>
    )
  }

  if (data[0] == undefined || '') {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  }

  let money = String(data[0].data.revenue)

  let revenueNew = ''
  for (let i = 0; i < money.length; i++) {
    if (i == 0) {
      revenueNew += money[i]
      continue
    }
    if (i % 3 == 0) {
      revenueNew += '.'
      revenueNew += money[i]
    }
    else {
      revenueNew += money[i]
    }
  }
  let budget = String(data[0].data.budget);
  let bugetNew = ''
  for (let i = 0; i < budget.length; i++) {
    if (i == 0) {
      bugetNew += budget[i]
      continue
    }
    if (i % 3 == 0) {
      bugetNew += '.'
      bugetNew += budget[i]
    }
    else {
      bugetNew += budget[i]
    }
  }
  console.log('movieDetail ', data)
  let rcmovie = data[2].data.results
  let reviews = data[1].data.results

  return (
    <div>
      <Container>
        <Row>
          <Col lg={4}>
            <img src={`https://image.tmdb.org/t/p/w400/${data[0].data.poster_path}`} alt="dd" />
          </Col>
          <Col lg={8}>
            <div className='content'>
              {
                data[0].data.genres.map((item, i) => {
                  return (
                    <Button key={i} variant="danger">{item.name}</Button>
                  )
                })
              }
              <h1 style={{ marginTop: '50px' }}>{data[0].data.original_title}</h1>
              <h3 style={{ marginTop: '30px' }}>{data[0].data.tagline}</h3>
              <div className='rate'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX1xRgAAAD+zBn5yBhpVQrGnxPgtBb4xxiRdA5QQAgOCwGtixFTQwj8yxnTqhWMcQ7rvRd0XQu1khE5LgZmUgphTgnLoxQyKAU7LwaHbA1IOgeXeQ//0xrwwRjmuRfBmxNENwajgxAYEwJ+ZQzQpxS6lhJ3Xwyefw+ohxAsIwQdGANcSgkhGwOwjhGCaQ0nHwR6R0fmAAAEu0lEQVR4nO2b6XqqOhhGTaLEtjvWobZ1ALTa+dje/90diRXIoJvsAFKed/3CJMK3GBIy0OkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADABaAaTKYKPTlBHP9zJpfZso4lBOPKsfX9iE4FRJ9dhekuURSzu67B3ehg3+FmXkISH4un9kzJ1zr4OYMHQf0oU2YL0Q8eEI3bJFA615MlP38KrZmEJoY39ryUhzFNryO90nMruIimYV9Yjy0ZyOD4wJp5XciQkNXweKXon8YZPsvYWOxlSEjAGmu4kBGwtachCXlTDUcyAjHzNfxDm2q4kpHRqa8hiVlDDcnB8MHbcE6bajhMHiBqz3MxJBFvqGHSXPCoBENZKzfRcMxONoduhq+ioYZJc8GenQxv4p2l7u031fBlnylenQwHgtHwSU+9baphUgeKjZvh/tEVb7/G8InZ4vqrIbv/NYYk3Oe9Oxue6sGcMOQsgZ+LuzrDJN4TWecMhw6GjEbxbv02HnBahqSr4Zidag7PGXaKGzL2Njn+GgW0fsOFMJ+pMg1pT6l2N9z7MroadgUbV2i41Fuih9BX0dVwRcWiQsO1sddvT0FnQ0LFKN3+KN3Qwp3ns1jM8OM63YxyWepwVUWGpOc3AFfMcJU1gdtluvl+V4vh3O8iFjTMevW7rHd41a3FkARelU1Bw6x30M+aw01Nhjdet2kxw8cs7tE23VxUYPj59WmkzbzeVosZTrJWfpX1Dp/Lfw4jKqgR0Usdhtmt+XSbxV6+YbIL2tUSRzUYPuQGn7KohuqoYjnvpfvOpP5KUYvh8kMvtmdZjaExpF6Pofn8k/+qMtxdxPDLNPysylB/ta/HcG0afrXKkPZMw9d2GRrFCIlpqwwtE9uDdhnSb8MwbJPhhJpzhk+sXYbmvO9Kt/7lhswYlx+JlhkazUW/ZYZmuTGj5fctLmhoTm1vedsM9fmYqHWGenOxT2qXobhVi727GJqzOQ001EOfOhm6zB9ezFCbcpoJB0OnOeBLGeo32htzMTSWbzStjz9JgleL9VwMRd/FUH99qsuQTpSkgBc35ObU/7mxNn0OsS5DoQ5jJoUKGQaUBvoI6HlDrdauz1A58Lcwhm5PGM5X13oS+VmLaxkRZowtVxcwfKR6BXBFixraWdtX7s3H29joiW5qMuTbfMqm8DW0c283tNKvy1BpLpK7THgYyoMXNIzrmF2TMyb5lGR9qIfhy4k1wlZCH0Enw3wNIFu5fzeUS4QLGo7qmOWWhorQUE9wMjx81VDQMPJbUeNimJ/1MpRdDI8LSAzDiWWN/NqrnnEyzL8RT3wM0/bNMNyYa+ZefJe2ORjmmwv5ndo/Gt6kMRuGYxpoq4ln3mv3TvXc1PeKd3mcUCsktLZZGhqjjiqPr53srjO+kIs46+Tn8b57JSxODOOeily9wrdK2v3hYU9/x4dCA/WfTJ4xfX95tqHyEaV2lF5PfoQRLX5ObzcWpXyPyDQOMtyS1jlfiNnSbPvOKWr5h0RBxTCI9iejgu8tm4P/ulIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ/kfV59xgQ6j6wsAAAAASUVORK5CYII=" alt="rate" />
                <span>{data[0].data.vote_average}</span>
                <img src="data:image/png;base64,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" alt="" />
                <img src="data:image/png;base64,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" alt="" />
              </div>
              <p className='overview'>
                {data[0].data.overview}
              </p>
              <div>
                <Button variant="warning">budget</Button> <span>{bugetNew}</span>
              </div>
              <div>
                <Button variant="warning">revenue</Button> <span>{revenueNew}</span>
              </div>
              <div>
                <Button variant="warning">Release-Date</Button> <span>{data[0].data.release_date}</span>
              </div>
              <div>
                <Button variant="warning">Run TIME</Button> <span>{data[0].data.runtime}</span>
              </div>
              <div>
                <OffCanvasExample placement={'bottom'} name={'추천영화'} rcmovie={rcmovie} />
              </div>
            </div>




          </Col>
        </Row>


      </Container>
      <Reviews review={reviews} />

    </div>
  )
}


function Reviews({ review }) {
  if (review.length == 0) {
    return <h1 style={{ textAlign: 'center', marginTop: '30px' }}>리뷰가 없습니다</h1>
  }
  console.log(review)
  return (
    <div>
      {
        review.map((item, i) => {
          console.log('item', item)
          return (
            <div key={i} className='reviews'>
              <div className="card-content">
                <h1>{item.author}</h1>
                <p className='card-description'>
                  {item.content}
                </p>
                <input type="checkbox" className='card-content__more-btn' />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
function OffCanvasExample({ name, rcmovie, ...props }) {

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        {name}
      </Button>
      <Offcanvas className='offcan' show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>추천영화</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Carousel
            infinite={true}
            centerMode={true}
            itemClass='movie-slider p-1 custom-item-class'
            containerClass='carousel-container'
            responsive={responsive}

          >
            {
              rcmovie.map((item, i) => {
                return (
                  <MovieCard key={i} item={item} />
                )
              })

            }
          </Carousel>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default MovieDetailpage
