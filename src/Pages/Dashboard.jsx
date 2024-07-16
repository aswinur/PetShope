import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Profile from '../Components/Profile'
import Table from 'react-bootstrap/Table';
import Sell from '../Components/Sell';
import { deletePet, userPets } from '../Services/allApis';
import server_url from '../Services/server_url'
import { useContext } from 'react';
import { addPetResponseContext, editPetResponseContext } from '../ContextApi/ContextApi';
import EditSell from '../Components/EditSell';
import { toast } from 'react-toastify';

function Dashboard() {
  const { addPetResponse, setAddPetResponse } = useContext(addPetResponseContext)
  const {editPetResponse, setEditPetResponse}=useContext(editPetResponseContext)

  const [user, setUser] = useState("")
  const [pets, setPets] = useState([])
  useEffect(() => {
    setUser(sessionStorage.getItem("username"))
    getData()
  }, [addPetResponse,editPetResponse])
  console.log(pets);
  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await userPets(header)
    if (result.status == 200) {
      setPets(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result=await deletePet(id,header)
    if(result.status==200){
      toast.success("Deleted successfully")
      getData()
    }else{
      toast.error(result.response.data)
    }
  }
  return (
    <>
      <div className='mt-5 p-3'>
        <div className='d-flex align-items-center justify-content-between'>
          <Profile />
          <Sell />

        </div>

        <Table striped bordered hover>
          <thead>
            <tr><h1>Your Pets {user}</h1></tr>
            <tr>
              <th>Image</th>
              <th>Bread</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          {
            pets.length > 0 ?
              pets.map(item => (
                <tbody>
                  <tr>
                    <td><img style={{ width: '150px' }} src={`${server_url}/uploads/${item.petImage}`} alt="" /></td>
                    <td>{item.bread}</td>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>
                      <tr>
                        <EditSell pets={item} />
                      </tr>
                      <tr>
                        <button onClick={()=>{handleDelete(item?._id)}} className="btn me-3" ><i className="fa-solid fa-trash fa-xl" style={{ color: '#e1141e' }} /> </button>
                      </tr>
                    </td>
                  </tr>
                </tbody>
              ))
              :
              <tbody><h2>No data...</h2></tbody>
          }

        </Table>
      </div>
    </>
  )
}

export default Dashboard