import React, { useEffect, useState } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { Route, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import MovieCard from '../Homepage/components/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Moviepage.style.css'
import { faL } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

// 경로 2가지
// nav바에서 클릭해서 온경우 => popularMovie 보여주기
// keyword를 입력해서 온경 => keyword와 관련된 영화들을 보여줌
const Moviepage = ({ item }) => {
  const [genId, setgen] = useState(0)
  const [page, setpage] = useState(1);
  const [UD, setUD] = useState('Up')
  const [query, setQuery] = useSearchParams()
  const keyword = query.get('q')
  console.log('qqq', keyword)
  let navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useSearchMovieQuery({ keyword, page, UD, genId })
  const gotoHome = () => {
    navigate('/')
  }
  useEffect(() => {
    setpage(1)
    setgen(0)
   
  }, [])

  useEffect(() => {
    setpage(1)

  }, [genId])
  useEffect(() => {
    console.log(genId)
  })
  if (isError) {

    return (
      <div>
      
        <Button style={{ marginRight: "10px" }} onClick={() => { refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { gotoHome() }} variant="warning">홈으로 가기</Button>
      </div>

    )
  }

  if (data == undefined) {
    //api로 데이터 받을때 안되는 데이터가 섞여들어와서 제거

    return (
      <div>
       
        <Button style={{ marginRight: "10px" }} onClick={() => { refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { gotoHome() }} variant="warning">홈으로 가기</Button>
      </div>
    )
  }
  console.log('movie page results', data)
  if (isLoading) {
    console.log(isLoading)
  }
  if (data.results == undefined) {
    return (
      <div>
        <Button style={{ marginRight: "10px" }} onClick={() => { refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { gotoHome() }} variant="warning">홈으로 가기</Button>
      </div>
    )

  }
  const handlePageClick = (page) => {
    setpage(page.selected + 1)
  }
  const genChange = (num) => {
    setgen(num)
    setpage(1)
    refetch()

  }
  const getUD=(ud)=>{
    setUD(ud);
    refetch()
  }
  console.log('moviepage', data)
  if (data.results.length == 1) {

    return (
      <div>

        <Button style={{ marginRight: "10px" }} onClick={() => { refetch() }} variant="danger">재호출</Button>
        <Button onClick={() => { navigate('/') }} variant="warning">홈으로 가기</Button>
      </div>
    )
  }

  return (
    <Container className='movie-page'>
      <Row>
        <Col lg={4} xs={12}>
          <DropdownButton id="dropdown-basic-button" title="인기도순 정렬">
            <Dropdown.Item onClick={() => { getUD('UD') }}>인기도순 오름차순</Dropdown.Item>
            <Dropdown.Item onClick={() => { getUD('Down') }}>인기도순 내림차순</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="장르별" style={{ marginTop: '20px' }}>
            <Dropdown.Item onClick={() => { genChange(28) }}>Action</Dropdown.Item>
            <Dropdown.Item onClick={() => { genChange(12) }}>Adeventure</Dropdown.Item>
            <Dropdown.Item onClick={() => { genChange(16) }}>Animation</Dropdown.Item>
            <Dropdown.Item onClick={() => { genChange(35) }}>Comedy</Dropdown.Item>
            <Dropdown.Item onClick={() => { genChange(80) }}>Crime</Dropdown.Item>
            <Dropdown.Item onClick={() => { genChange(18) }}>Drama</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {
              data.results.map((item, index) => {
                return <Col className='movie-page' key={index} lg={4} xs={6}> <MovieCard item={item} /> </Col>
              })
            }
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} // 전체페이지
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Moviepage
