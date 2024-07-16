import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Footer() {
  return (
    <>
      <div className="border mt-5 ">
        <Container className='mt-5 d-flex'>
          <Row>
            <Col xs={4}>
              <Row style={{ fontSize: '25px' }}>About As</Row><br />
              <Row>It is a long established fact that a reader will be distracted by the readable content
                of a page when looking at its layout.The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters</Row>
            </Col>

            <Col>
              <Row style={{ fontSize: '25px' }}>Our Servises</Row><br />
              <Row>
                <div>
                  <ul>
                    <li><a href="/" target='_blank'>Buy Pets</a></li>
                    <li><a href="/">Sell Pets</a></li>
                    <li><a href="/">Buy Petfoods</a></li>
                    <li><a href="/">Sell Petfoods</a></li>
                  </ul>
                </div>
              </Row>
            </Col>

            <Col>
              <Row style={{ fontSize: '25px' }}>Connect With As</Row><br />
              <Row>
                <div className='justify-content-between'>
                  <a href="/"><i class="fa-brands fa-facebook fa-2xl" /></a>&nbsp;&nbsp;&nbsp;
                  <a href="/"><i class="fa-brands fa-twitter-square fa-2xl" /></a>&nbsp;&nbsp;&nbsp;
                  <a href="/"><i class="fa-brands fa-instagram fa-2xl" /></a>&nbsp;&nbsp;&nbsp;
                  <a href="/"><i class="fa-brands fa-linkedin fa-2xl" /></a>
                </div>
              </Row>
            </Col>
          </Row>

        </Container>
        <div className='mb-3 mt-4 justify-content-center  d-flex'> &copy; {new Date().getFullYear()} PetShope</div>
      </div>
    </>
  )
}

export default Footer