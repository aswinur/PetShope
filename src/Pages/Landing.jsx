import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PetCard from '../Components/PetCard';
import { homePets } from '../Services/allApis';

function Landing() {
  const [token, setToken] = useState("")
  const [pets, setPets] = useState([])
  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
    getHomePets()
  }, [])

  const getHomePets = async () => {
    const result = await homePets()
    // console.log(result);
    if (result.status == 200) {
      setPets(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }
  console.log(pets);

  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          {/* <ExampleCarouselImage text="First slide" /> */}
          <img style={{ height: '90vh', width: "100%" }} src="https://wallpapers.com/images/hd/three-golden-retriever-baby-dogs-fslbs3tert4zvcbd.jpg" alt="" />

          <Carousel.Caption>
            <h1 className='text-success' style={{fontSize:'70px'}}>PetShope</h1>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          {/* <ExampleCarouselImage text="Second slide" /> */}
          <img style={{ height: '90vh', width: "100%" }} src="https://png.pngtree.com/background/20230613/original/pngtree-group-of-different-colored-birds-on-a-branch-picture-image_3425217.jpg" alt="" />

          <Carousel.Caption>
            <h1 className='text-success' style={{fontSize:'70px'}}>Sell Your Pet</h1>
            <p>You can sell your pets here...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <ExampleCarouselImage text="Third slide" /> */}
          <img style={{ height: '90vh', width: "100%" }} src="https://w0.peakpx.com/wallpaper/367/592/HD-wallpaper-rottweiler-big-black-dog-pets-green-grass-dog-on-the-grass-dogs.jpg" alt="" />

          <Carousel.Caption>
            <h1 className='text-success' style={{fontSize:'70px'}}>Buy Pets</h1>
            <p>
              You can easily Buy pets from here...
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* {
        token ?
          <div className="sell mt-5 d-flex justify-content-evenly" >
            <input className='form-control w-25 ' onChange={(e)=>{setSearch(e.target.value)}} type="text" name='' placeholder='Enter Bread for search' id='' />
            <Link className="btn btn-success" to={'/dash'} >Click to sell...</Link>
          </div>
          : */}
      <div className="sell mt-5 d-flex justify-content-center" >
        <Link className="btn btn-success" to={'/auth'} >Get Start...</Link>
        {/* <Button variant="outline-success" className='justify-content-center'>Get Start...</Button>{' '} */}
      </div>

      <div className='mt-5 row justify-content-center'>
        {
          pets.length > 0 ?
            pets.map(item => (
              <PetCard pets={item} />
            ))
            :
            <h2>No pets available</h2>
        }


      </div>



    </>
  )
}

export default Landing