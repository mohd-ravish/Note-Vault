import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import Footer from "./Footer";

function Login() {

    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const [section, setSection] = useState(false)
    const [signupDetails, setSignupDetails] = useState({
        username: "",
        password: "",
    })
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    })

    const inputSignupDetails = (event) => {
        setSignupDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const inputLoginDetails = (event) => {
        setLoginDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const submitSignupDetails = (event) => {
        event.preventDefault();
        if (signupDetails.username !== "" && signupDetails.password !== "") {
            Axios.post("http://localhost:4500/signup", signupDetails)
                .then(res => {
                    if (res.data === "Success") {
                        toast.success("User Registered!", {
                            position: toast.POSITION.TOP_CENTER
                        })
                        setSignupDetails({
                            username: "",
                            password: "",
                        })
                        setSection(false)
                    } else {
                        toast.error("Username already taken!", {
                            position: toast.POSITION.TOP_CENTER
                        })
                        setSignupDetails({
                            username: "",
                            password: "",
                        })

                    }
                })
        }
    }

    const submitLoginDetails = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:4500/login", loginDetails)
            .then(res => {
                if (res.data === "Success") {
                    navigate("/notes")
                } else if (res.data === "WrongPassword") {
                    toast.error("Wrong Password!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    setLoginDetails({
                        username: "",
                        password: ""
                    })
                } else {
                    toast.error("User Not Registered!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    setLoginDetails({
                        username: "",
                        password: ""
                    })
                }
            })
    }

    return (
        <div>
            {!section ? (
                <div>
                    <header>
                        <img src="assets/notes.png" alt="logo"></img>
                        <h1>Note-Vault </h1>
                    </header>
                    <ToastContainer />
                    <div className='login-container'>
                        <div className='login-box'>
                            <form action="" onSubmit={submitLoginDetails} >
                                <h2>LOGIN</h2>
                                <div>
                                    <label htmlFor="username"><strong>Username</strong></label>
                                    <input
                                        className='input'
                                        onChange={inputLoginDetails}
                                        type="text"
                                        placeholder="Enter Username"
                                        name="username"
                                        value={loginDetails.username}
                                        required />
                                    {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                                </div>
                                <div>
                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <input
                                        className='input'
                                        onChange={inputLoginDetails}
                                        type="password"
                                        placeholder="Enter Password"
                                        name="password"
                                        value={loginDetails.password}
                                        required />
                                    {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                                </div>
                                <button type="submit" className="login-button"> Log in</button>
                                <p>You are agree to our terms and policies</p>
                                <button onClick={() => setSection(true)} className="login-create-button">Create Account</button>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <div>
                    <header>
                        <img src="assets/notes.png" alt="logo"></img>
                        <h1>Note-Vault </h1>
                    </header>
                    <ToastContainer />
                    <div className='login-container'>
                        <div className='login-box'>
                            <form action="" onSubmit={submitSignupDetails}>
                                <h2>SIGN UP</h2>
                                <div>
                                    <label htmlFor="username"><strong>Username</strong></label>
                                    <input
                                        onChange={inputSignupDetails}
                                        type="text" placeholder="Enter Username"
                                        className="input"
                                        name="username"
                                        value={signupDetails.username}
                                        autoComplete="off"
                                        required />
                                    {/* {errors.name && <span className="text-danger">{errors.name}</span>} */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <input
                                        onChange={inputSignupDetails}
                                        type="password" placeholder="Enter Password"
                                        className="input"
                                        name="password"
                                        value={signupDetails.password}
                                        required />
                                    {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="password"><strong>Confirm Password</strong></label>
                                    <input
                                        onChange={inputSignupDetails}
                                        type="password" placeholder="Confirm Password"
                                        className="input"
                                        name="confirmPassword"
                                        value={signupDetails.confirmPassword}
                                        required />
                                </div> */}
                                <button type="submit" className="login-button"> Sign Up</button>
                                <p>You are agree to our terms and policies</p>
                                <button onClick={() => setSection(false)} className="login-create-button">Already have an Account</button>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default Login;