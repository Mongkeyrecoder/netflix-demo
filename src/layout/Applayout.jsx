import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Applayout = () => {
    let navigate=useNavigate()
    const [keyword,setKeyword]=useState('')
    const searchByKeyword=(e)=>{
        e.preventDefault()
        navigate(`/movies?q=${keyword}`)
        setKeyword('')
        document.getElementById('input').value=''
    }
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" variant='dark'>
                <Container fluid>
                    <Navbar.Brand >
                        <img onClick={()=>{navigate('/')}} width={100} src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940" alt="netflix" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to="/" className='navLink'>Home</Link>
                            <Link to="/movies" className='navLink'>movies</Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control id="input" onChange={(e)=>{setKeyword(e.target.value)}}
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-danger" onClick={searchByKeyword}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </div>


    )
}

export default Applayout
