import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import server_url from '../Services/server_url'
import './card.css'

function PetCard(pets) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(pets);

    // const handleLiked=()=>{
    //     console.log("hai");
    // }
    return (
        <>
        
           {/* <Card style={{ width: '20rem' , boxShadow: '1px 1px 15px 5px green'}}  className='mb-4 card'>  */}
            <Card style={{ width: '20rem' }} className='mb-4 card'>
                {/* <button className="btn border mt-3 mb-3" style={{ width: '40px' }} >
                    <i className="fa-solid fa-heart-circle-plus" style={{ color: '#fd0896' }}></i>
                </button> */}
                <Card.Img className='mt-3' variant="top" style={{ height: '200px' }} src={`${server_url}/uploads/${pets.pets.petImage}`} />
                <Card.Body>
                    <Card.Title>Bread : {pets.pets.bread}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Colour : {pets.pets.colour}</ListGroup.Item>
                    <ListGroup.Item>Age : {pets.pets.age}</ListGroup.Item>
                    <ListGroup.Item>Price : ₹{pets.pets.price}</ListGroup.Item>
                </ListGroup>
                <Card.Body>                 
                    <Card.Link onClick={handleShow} style={{textDecoration:'none'}} className='btn text-success'>Click for more...</Card.Link>
                </Card.Body>
            </Card>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    {/* <button className="btn border mt-3 mb-3" style={{ width: '40px' }}>
                        <i className="fa-solid fa-heart-circle-plus" style={{ color: '#fd0896' }}></i>
                    </button>&nbsp;&nbsp; */}
                    <Modal.Title><h2>{pets.pets.bread}</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img style={{ height: '250px' }} src={`${server_url}/uploads/${pets.pets.petImage}`} alt="" />
                            <h4 className='mt-2'>More : {pets.pets.moreInfo}</h4>
                        </Col>
                        <Col>
                        <h4> {pets.pets.sex}</h4>
                            <h4>Colour : {pets.pets.colour}</h4>
                            <h4>Age : {pets.pets.age}</h4>
                            <h4>Price : {pets.pets.price}</h4>
                           
                            {/* <h4>Category : {pets.pets.category}</h4> */}
                            <h4>date : {pets.pets.date}</h4>
                        </Col>
                    </Row>
                    <div className='mt-3'>
                        <h5>Phone : +91 {pets.pets.phone}</h5>
                        <h5>Location : {pets.pets.location}</h5>
                    </div>
                </Modal.Body>

                {/* <button className='btn btn-success'>buy</button> */}

            </Modal>
        </>
    )
}

export default PetCard