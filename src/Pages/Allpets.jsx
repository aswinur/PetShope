import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { allPets } from '../Services/allApis'
import PetCard from '../Components/PetCard'
import Profile from '../Components/Profile'

function Allpets() {
  const [allpets, setAllpets] = useState([])
  const [logStatus, setLogStatus] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getData()
      setLogStatus(true)
    }
    else {
      console.log("Login First");
      setLogStatus(false)
    }

  }, [search])
  // console.log(allpets);

  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await allPets(header, search)
    if (result.status == 200) {
      setAllpets(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  return (
    <>
      <div className="p-3 mt-4">
        <Profile />
      </div>
      <div className="sell mt-5 d-flex justify-content-evenly" >
        <input className='form-control w-25 ' onChange={(e) => { setSearch(e.target.value) }} type="text" name='' placeholder='Enter A Bread for search' id='' />
        <Link className="btn btn-success" to={'/dash'} >Go To Dashboard</Link>
      </div>

      {/* <div className='mt-5  d-flex justify-content-evenly' >
        <div className=' text-center '>
          <img src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" alt="" style={{ borderRadius: '50%', width: '100px', height: '100px', filter: 'drop-shadow(6px 6px 8px  green)' }} /><br />
          <span className=' text-success' style={{ fontSize: '25px' }}>Dog</span>
        </div>
        <div className=' text-center'>
          <img src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" alt="" style={{ borderRadius: '50%', width: '100px', height: '100px', filter: 'drop-shadow(6px 6px 8px  green)' }} /><br />
          <span className=' text-success' style={{ fontSize: '25px' }}>Cat</span>
        </div>
        <div className=' text-center'>
          <img src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" alt="" style={{ borderRadius: '50%', width: '100px', height: '100px', filter: 'drop-shadow(6px 6px 8px  green)' }} /><br />
          <span className=' text-success' style={{ fontSize: '25px' }}>Bird</span>
        </div>
        <div className=' text-center'>
          <img src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" alt="" style={{ borderRadius: '50%', width: '100px', height: '100px', filter: 'drop-shadow(6px 6px 8px  green)' }} /><br />
          <span className=' text-success' style={{ fontSize: '25px' }}>Fish</span>
        </div>
        <div className=' text-center'>
          <img src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" alt="" style={{ borderRadius: '50%', width: '100px', height: '100px', filter: 'drop-shadow(6px 6px 8px  green)' }} /><br />
          <span className=' text-success' style={{ fontSize: '25px' }}>Others</span>
        </div>
      </div> */}

      {
        logStatus ?
          <div className='mt-5 row justify-content-center'>
            {
              allpets.length > 0 ?
                allpets.map(item => (
                  <PetCard pets={item} />
                ))
                :
                <h1 className='p-5 text-danger text-center'>No pets available</h1>
            }
          </div>
          :
          <h2>Please Login First</h2>
      }


    </>
  )
}

export default Allpets