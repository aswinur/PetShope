import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { sellpet } from '../Services/allApis';
import { addPetResponseContext } from '../ContextApi/ContextApi';

function Sell() {
    const {addPetResponse, setAddPetResponse}=useContext(addPetResponseContext)
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("");
    const [petdata, setPetdata] = useState({
        bread:"",colour:"",age:"",price:"",sex:"",category:"",date:"",moreInfo:"",phone:"",location:"",petImage:""
    })
    const [imageStatus,setImageStatus]=useState(false)
    useEffect(() => {
        console.log(petdata);
        if (petdata.petImage.type == "image/jpg" || petdata.petImage.type == "image/png" || petdata.petImage.type == "image/jpeg") {
            // console.log("Image is correct format");
            // console.log(URL.createObjectURL(petdata.petImage));
            setImageStatus(false)
            setPreview(URL.createObjectURL(petdata.petImage))
        }
        else {
            console.log("invalid image format... image should be jpg,png or jpeg");
            setImageStatus(true)
            setPreview("")
        }
    }, [petdata.petImage])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSell = async() =>{
        const {bread,colour,age,price,sex,category,date,moreInfo,petImage,phone,location}=petdata
        if(!bread || !colour ||!age ||!price || !sex ||!category ||!date  ||!petImage ||!phone ||!location){
            toast.warning("Invalid inputs... Enter valid input date in every fields...")
        }
        else{
            const formData = new FormData()
            formData.append("bread", bread)
            formData.append("colour", colour)
            formData.append("age", age)
            formData.append("price", price)
            formData.append("sex", sex)
            formData.append("category", category)
            formData.append("date", date)
            formData.append("moreInfo", moreInfo)
            formData.append("phone", phone)
            formData.append("location", location)
            formData.append("petImage", petImage)

            const token=sessionStorage.getItem("token")
            const requestHeader = { 
                 "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result=await sellpet(formData,requestHeader)
            if(result.status==200){
                toast.success("Pet added successfully")
                setPetdata({
                    bread:"",colour:"",age:"",price:"",sex:"",category:"",date:"",moreInfo:"",phone:"",location:"",petImage:""
                })
                handleClose() 
                setAddPetResponse(result)            
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <div className="sell mt-5 mx-5 my-5">
                <Button variant="outline-success" onClick={handleShow}>Click To Sell Your Pet
                </Button>{' '}
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Sell a Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label >
                                <input type="file" style={{ display: 'none' }}  onChange={(e)=>{setPetdata({...petdata,petImage:e.target.files[0]})}}/>
                                <img style={{ width: '200px' }} src={preview?preview:"https://static.thenounproject.com/png/11204-200.png"} alt="im" className="img-fluid" />
                            </label>
                            {
                                imageStatus &&
                                <p className="text-danger">invalid image format... image should be jpg,png or jpeg</p>
                            }
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Bread" className="mb-3">
                                <Form.Control type="text" placeholder="Bread" onChange={(e)=>{setPetdata({...petdata,bread:e.target.value})}}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Colour" className="mb-3">
                                <Form.Control type="text" placeholder="Colour" onChange={(e)=>{setPetdata({...petdata,colour:e.target.value})}}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Age" className="mb-3">
                                <Form.Control type="number" placeholder="Age" onChange={(e)=>{setPetdata({...petdata,age:e.target.value})}}/>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
                        <Form.Control type="number" placeholder="Price" onChange={(e)=>{setPetdata({...petdata,price:e.target.value})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Sex" className="mb-3">
                        <Form.Select onChange={(e)=>{setPetdata({...petdata,sex:e.target.value})}}>
                            <option disabled hidden selected>Sex</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Pair</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Category" className="mb-3">
                        <Form.Select onChange={(e)=>{setPetdata({...petdata,category:e.target.value})}}>                  
                            <option disabled selected>Category</option>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Fish</option>
                            <option>Others</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control type="text" placeholder="Date" value={new Date()} onChange={(e)=>{setPetdata({...petdata,date:new Date()})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="More information" className="mb-3">
                        <Form.Control type="text" placeholder="More information" onChange={(e)=>{setPetdata({...petdata,moreInfo:e.target.value})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3">
                        <Form.Control type="number" placeholder="Phone" onChange={(e)=>{setPetdata({...petdata,phone:e.target.value})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Location" className="mb-3">
                        <Form.Control type="text" placeholder="Location" onChange={(e)=>{setPetdata({...petdata,location:e.target.value})}}/>
                    </FloatingLabel>
                </Modal.Body>

                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSell}>
                        Sell
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default Sell