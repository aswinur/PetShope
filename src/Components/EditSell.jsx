import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import base_url from '../Services/server_url';
import { editPet } from '../Services/allApis';
import { toast } from 'react-toastify';
import { editPetResponseContext } from '../ContextApi/ContextApi';

function EditSell(pets) { 
    const {editPetResponse, setEditPetResponse}=useContext(editPetResponseContext)
    // console.log(pets,"from edit");
    const [petdata, setPetdata] = useState({
        id: pets.pets._id, bread: pets.pets.bread, colour: pets.pets.colour, age: pets.pets.age, price: pets.pets.price, sex: pets.pets.sex, category: pets.pets.category, date: pets.pets.date, moreInfo: pets.pets.moreInfo, phone: pets.pets.phone, location: pets.pets.location, petImage: ""
    })
    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")
    useEffect(() => {
        if (petdata.petImage.type == "image/jpg" || petdata.petImage.type == "image/jpeg" || petdata.petImage.type == "image/png") {
            setImgStatus(false)
            setPreview(URL.createObjectURL(petdata.petImage))
        } else {
            setImgStatus(true)
            setPreview("")
        }
    }, [petdata.petImage])

    const handleUpdate = async () => {
        console.log(petdata);
        const { bread, colour, age, price, sex, category, date, moreInfo, petImage, phone, location } = petdata
        if (!bread || !colour || !age || !price || !sex || !category || !date || !moreInfo || !phone || !location) {
            toast.warning("Invalid inputs... Enter valid input date in every fields...")
        }
        else {
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
            preview ? formData.append("petImage", petdata.petImage) : formData.append("petImage", pets.petImage)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editPet(petdata.id, formData, reqHeader)
                if (result.status == 200) {
                    toast.success(`project ${petdata.bread} updated successfully`)
                    handleClose()
                    setEditPetResponse(result)
                }
                else {
                    toast.warning(result.response.data)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editPet(petdata.id, formData, reqHeader)
                if (result.status == 200) {
                    toast.success(`project ${petdata.bread} updated successfully`)
                    handleClose()
                    setEditPetResponse(result)
                }
                else {
                    toast.warning(result.response.data)
                }
            }
        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPreview("")
        setPetdata({
            id: pets.pets._id, bread: pets.pets.bread, colour: pets.pets.colour, age: pets.pets.age, price: pets.pets.price, sex: pets.pets.sex, category: pets.pets.category, date: pets.pets.date, moreInfo: pets.pets.moreInfo, phone: pets.pets.phone, location: pets.pets.location, petImage: ""
        })
    }
    const handleShow = () => setShow(true);
    
    return (
        <>
            <button className="btn me-3" onClick={handleShow} ><i className="fa-solid fa-pen-to-square fa-xl" /> </button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit your Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label >
                                <input type="file" style={{ display: 'none' }} onChange={(e) => { setPetdata({ ...petdata, petImage: e.target.files[0] }) }} />
                                <img style={{ width: '200px' }} src={preview ? preview : `${base_url}/uploads/${pets.pets.petImage}`} alt="im" className="img-fluid" />
                            </label>
                            {
                                imgStatus &&
                                <p className="text-danger">Image extention is invalid! Image should be jpg,jpeg or png. </p>
                            }

                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Bread" className="mb-3">
                                <Form.Control type="text" placeholder="Bread" value={petdata.bread} onChange={(e) => { setPetdata({ ...petdata, bread: e.target.value }) }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Colour" className="mb-3">
                                <Form.Control type="text" placeholder="Colour" value={petdata.colour} onChange={(e) => { setPetdata({ ...petdata, colour: e.target.value }) }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Age" className="mb-3">
                                <Form.Control type="text" placeholder="Age" value={petdata.age} onChange={(e) => { setPetdata({ ...petdata, age: e.target.value }) }} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
                        <Form.Control type="text" placeholder="Price" value={petdata.price} onChange={(e) => { setPetdata({ ...petdata, price: e.target.value }) }} />
                    </FloatingLabel >
                    <FloatingLabel controlId="floatingInput" label="Sex" className="mb-3" onChange={(e) => { setPetdata({ ...petdata, sex: e.target.value }) }}>
                        <Form.Select value={petdata.sex}>
                            <option>Sex</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Pair</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Category" className="mb-3" onChange={(e) => { setPetdata({ ...petdata, category: e.target.value }) }}>
                        <Form.Select value={petdata.category}>
                            <option>Category</option>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Fish</option>
                            <option>Others</option>
                        </Form.Select>
                    </FloatingLabel>
                    {/* <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control type="date" placeholder="Date" value={petdata.date} onChange={(e) => { setPetdata({ ...petdata, date: e.target.value }) }} />
                    </FloatingLabel> */}
                    <FloatingLabel controlId="floatingInput" label="More information" className="mb-3">
                        <Form.Control type="text" placeholder="More information" value={petdata.moreInfo} onChange={(e) => { setPetdata({ ...petdata, moreInfo: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3">
                        <Form.Control type="text" placeholder="Phone" value={petdata.phone} onChange={(e) => { setPetdata({ ...petdata, phone: e.target.value }) }} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Location" className="mb-3">
                        <Form.Control type="text" placeholder="Location" value={petdata.location} onChange={(e) => { setPetdata({ ...petdata, location: e.target.value }) }} />
                    </FloatingLabel>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditSell