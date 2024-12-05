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
// 경로 2가지
// nav바에서 클릭해서 온경우 => popularMovie 보여주기
// keyword를 입력해서 온경 => keyword와 관련된 영화들을 보여줌
const Moviepage = ({ item }) => {
  const [genId,setgen]=useState(0)
  const [page, setpage] = useState(1);
  const [UD, setUD] = useState('Up')
  const [query, setQuery] = useSearchParams()
  const keyword = query.get('q')
  console.log('qqq', keyword)
  let navigate=useNavigate()
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, UD,genId })
  useEffect(() => {
    //컴포넌트 언마운트될때 다시 page=1로 고침
    return () => {
      setpage(1)
      setgen(0)
    };
  }, [])
  useEffect(()=>{
    setpage(1)
    
  },[genId])
  if (isError) {
    setTimeout(()=>{
      navigate('/')
    },1000)
    return <h1>{error.message}</h1>
  }
  if (data == undefined) {
    //api로 데이터 받을때 안되는 데이터가 섞여들어와서 제거
    return <h1>NO DATA</h1>
  }
  if(isLoading){
   console.log(isLoading)
  }
  if (data.results == undefined) {
    //error요소 제거
    console.log('data', data)
    return <h1>No data</h1>
  }
  const handlePageClick = (page) => {
    setpage(page.selected + 1)
  }
  const genChange=(num)=>{
    setgen(num)
    setpage(1)
  }
  if(data.results.length==1){
    return<h1>데이터없음</h1>
  }
  console.log(data)
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <DropdownButton id="dropdown-basic-button" title="인기도순 정렬">
            <Dropdown.Item onClick={() => { setUD('UD') }}>인기도순 오름차순</Dropdown.Item>
            <Dropdown.Item onClick={() => { setUD('Down') }}>인기도순 내림차순</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="장르별" style={{marginTop:'20px'}}>
            <Dropdown.Item onClick={()=>{genChange(28)}}>Action</Dropdown.Item>
            <Dropdown.Item onClick={()=>{genChange(12)}}>Adeventure</Dropdown.Item>
            <Dropdown.Item onClick={()=>{genChange(16)}}>Animation</Dropdown.Item>
            <Dropdown.Item onClick={()=>{genChange(35)}}>Comedy</Dropdown.Item>
            <Dropdown.Item onClick={()=>{genChange(80)}}>Crime</Dropdown.Item>
            <Dropdown.Item onClick={()=>{genChange(18)}}>Drama</Dropdown.Item>
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
