import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Notfoundpage.style.css'
import { faArrowLeft, faArrowRight,  faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Notfoundpage = () => {
    let navigate=useNavigate()
    return (
        <div className='not-main'>
            <Row>
                <Col lg={8}>
                    <img className='notfound-image' src='https://b1547017.smushcdn.com/1547017/wp-content/uploads/2018/09/shutterstock_479042983.jpg?size=2160x1727&lossy=1&strip=1&webp=1' alt='error-robot' />
                </Col>
                <Col lg={4} className='not-contet'>
                    <div className='notfound-content'>
                        <div>
                            <h1>잘못된 페이지입니다</h1>
                            <div className='line'>
                                <FontAwesomeIcon onClick={()=>{navigate(-1)}} icon={faArrowLeft} />
                                <FontAwesomeIcon onClick={()=>{navigate('/')}} icon={faHouse} />
                                <FontAwesomeIcon onClick={()=>{navigate(1)}} icon={faArrowRight}/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Notfoundpage
