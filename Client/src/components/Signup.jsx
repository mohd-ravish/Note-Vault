import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Axios from "axios";
import Footer from "./Footer";
import "./css/login-signup.css";

function Signup() {

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

    const inputDetails = (event) => {
        setDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const submitDetails = (event) => {
        event.preventDefault();
        if (details.name !== "" && details.email !== "" && details.password !== "") {
            Axios.post("http://localhost:4500/signup", details)
                .then(toast.success("User Registered!", {
                    position: toast.POSITION.TOP_CENTER
                }))
                setDetails({
                    name: "",
                    email : "",
                    password : ""
                })
        }
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
                    <form action="" onSubmit={submitDetails}>
                        <h2>SIGN UP</h2>
                        <div>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input
                                onChange={inputDetails}
                                type="text" placeholder="Enter Name"
                                className="input"
                                name="name"
                                value={details.name}
                                autoComplete="off"
                                required />
                            {/* {errors.name && <span className="text-danger">{errors.name}</span>} */}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                onChange={inputDetails}
                                type="email" placeholder="Enter Email"
                                className="input"
                                name="email"
                                value={details.email}
                                required />
                            {/* {errors.email && <span className="text-danger">{errors.email}</span>} */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                onChange={inputDetails}
                                type="password" placeholder="Enter Password"
                                className="input"
                                name="password"
                                value={details.password}
                                required />
                            {/* {errors.password && <span className="text-danger">{errors.password}</span>} */}
                        </div>
                        <button type="submit" className="login-button"> Sign Up</button>
                        <p>You are agree to our terms and policies</p>
                        <div className="login-create">
                            <Link to="/" className="login-create-button">Already have an Account</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;