import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import Footer from "./Footer";
import "./css/login-signup.css";

function Login() {

    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    const inputDetails = (event) => {
        setDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const navigate = useNavigate();

    const submitDetails = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:4500/login", details)
            .then(res => {
                if (res.data === "Success") {
                    navigate("/notes")
                } else {
                    toast.error("No record exists!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    setDetails({
                        email : "",
                        password : ""
                    })
                }
            })
        // .catch(err => console.log(err))
    }

    return (
        <div>
            <header>
                <img src="assets/notes.png" alt="logo"></img>
                <h1>Note-Vault </h1>
            </header>
            <ToastContainer />
            <div className='login-container'>
                <div className='login-box'>
                    <form action="" onSubmit={submitDetails} >
                        <h2>LOGIN</h2>
                        <div>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                className='input'
                                onChange={inputDetails}
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={details.email}
                                required />
                            {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                        </div>
                        <div>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                className='input'
                                onChange={inputDetails}
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={details.password}
                                required />
                            {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                        </div>
                        <button type="submit" className="login-button"> Log in</button>
                        <p>You are agree to our terms and policies</p>
                        <div className="login-create">
                            <Link to="/signup" className="login-create-button">Create Account</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;