import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
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