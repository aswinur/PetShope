import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
// import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import { userLogin, userRegister } from '../Services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../ContextApi/AuthContext';

function Auth() {
    const {authStatus, setAuthStatus}=useContext(TokenAuthContext)
    const [status, setStatus] = useState(true)
    const [data, setData] = useState({
        username: "", email: "", password: ""
    })
    const navigate=useNavigate()
    // console.log(data);

    const changeStatus = () => {
        setStatus(!status)
    }

    const handleRegister = async () => {
        // console.log(data);
        const { username, email, password } = data
        if (!username || !email || !password) {
            toast.warning("Invalid details!!! Enter form details properly...")
        } 
        else {
            const result = await userRegister(data)
            console.log(result);
            if (result.status == 201) {
                toast.success("Registration Successfull...")
                setData({ username: "", password: "", email: "" })
                setStatus(true)
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
   
    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("Invalid details... Enter form details properly..")
        }
        else {
            const result = await userLogin({ email, password })
            console.log(result);
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.userDetails))
                toast.success("Login successfull...")
                navigate('/all-pets')
                setAuthStatus(true)
            }
            else{
                toast.error(result.response.data)
            }

        }
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '100vh' }}>
                <div className="shadow border w-60 p-4">
                    <Row>
                        <Col sm={12} md={6} className='d-flex'>
                            <img src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" className='img-fluid d-block' alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                !status ?
                                    <h3>Register</h3>
                                    :
                                    <h3>Login</h3>
                            }
                            <div className="mt-4">
                                {
                                    !status &&
                                    <FloatingLabel controlid="user" label='Username' className='mb-3'>
                                        <Form.Control type='text' placeholder='username' onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                    </FloatingLabel>
                                }
                                <FloatingLabel controlid="floatingInput" label='Emale address' className='mb-3'>
                                    <Form.Control type='emale' placeholder='name@example.com' onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlid="floatingPassword" label='Password' >
                                    <Form.Control type='password' placeholder='password' onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                </FloatingLabel>
                            </div>

                            <div className="mt-3 d-flex justify-content-between">
                                {status ?
                                    <button className="btn btn-success" onClick={handleLogin}>
                                        <span>Login</span>
                                    </button>
                                    :
                                    <button className="btn btn-success" onClick={handleRegister}>
                                        <span>Register</span>
                                    </button>
                                }

                                <button className="btn btn-link" onClick={changeStatus}>
                                    {
                                        status ?
                                            <span>Are you new?</span>
                                            :
                                            <span>Already a user?</span>
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Auth