import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function Header() {
  return (
    <>
      {/* <Navbar className="bg-body-tertiary "> */}
      <Navbar className="bg-success ">
        <Container className='justify-content-between collaps'>
          <Navbar.Brand href="#home">
           
            <i class="fa-solid fa-dog fa-bounce fa-2xl"></i>
            <span style={{ fontSize: '35px' }}>PetShope</span>
          </Navbar.Brand>
          <button className="navbar-toggler btn-outline-light" data-bs-toggle="collapse"
            data-bs-target="#collpaslbleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Nav className="justify-content-end collapse navbar-collapse" id='collpaslbleNavbar'>
            <Nav.Link href="/all-pets" className="nav-item"><h5>Home</h5></Nav.Link>
            {/* <Nav.Link href="#features" className="nav-item"><h5>Features</h5></Nav.Link> */}
            {/* <Nav.Link href="/liked" className="nav-item"><h5>Liked</h5></Nav.Link> */}
            
          </Nav>

        </Container>
      </Navbar>

    </>
  )
}

export default Header