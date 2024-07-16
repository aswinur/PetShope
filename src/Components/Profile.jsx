import React, { useContext, useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../ContextApi/AuthContext';
import server_url from '../Services/server_url'
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { updateProfile } from '../Services/allApis';

function Profile() {
    const { authStatus, setAuthStatus } = useContext(TokenAuthContext)
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        id: "", username: "", password: "", profile: ""
    });
    const [existingProfile, setExistingProfile] = useState("")
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
            // console.log(userDetails);
            setUser({ id: userDetails._id, username: userDetails.username, email: userDetails.email, password: userDetails.password, profile: "" })
            setExistingProfile(userDetails.profile)
        }
    }, [])

    useEffect(() => {
        if (user.profile) {
            setPreview(URL.createObjectURL(user.profile))
        }
        else {
            setPreview("")
        }
    }, [user.profile])

    // console.log(user);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        navigate('/')
        setAuthStatus(false)
    }
    const handleProfileUpdate=async()=>{
        console.log(user);
        const {username,password,email,profile}=user
        if(! username || ! password || ! email){
            toast.warning("Enter valid inputs")
        }
        else{
            const formData=new FormData()
            formData.append("username",username)
            formData.append("password",password)
            formData.append("email",email)
            preview?formData.append("profile",profile):formData.append("profile",existingProfile)

            const header={
                "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type":preview?"multipart/form-data":"application/json"
            }
            const result=await updateProfile(header,formData)
            if(result.status==200){
                console.log(result.data);
                toast.success("Profile successfully updated")
                sessionStorage.setItem("userDetails",JSON.stringify(result.data))
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <i onClick={handleShow} className="fa-solid fa-bars fa-2xl mx-3" style={{ color: "#06d068" }} />

            <Offcanvas show={show} onHide={handleClose} backdrop="static" size="sm">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <button className="btn btn-outline-danger mt-3 align-items-bottom" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket" />
                            Logout
                        </button></Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <label >
                        <input type="file" style={{ display: 'none' }} onChange={(e) => setUser({ ...user, profile: e.target.files[0] })} />
                        {
                            existingProfile == "" ?
                                <img style={{ width: '150px' }} className='mt-5 mx-4' src={preview ? preview :"https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-28.png"} alt="" />
                                :
                                <img style={{ width: '150px' }} className='mt-5 mx-4' src={preview ? preview :`${server_url}/uploads/${existingProfile}`} alt="" />
                        }
                    </label>

                    <Form className='mt-4'>
                        <Form.Group className="mb-4" controlId="user">
                            <Form.Control type="email" value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control type="email" value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </Form.Group>
                    </Form>

                    {/* <i className="fa-solid fa-gear"/>
                    Settings */}
                                <button className='btn btn-success' onClick={handleProfileUpdate}> Update</button>

                </Offcanvas.Body>
            </Offcanvas>


        </>
    )
}

export default Profile